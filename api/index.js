import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import axios from 'axios';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://babageo26.github.io',
  ],
  credentials: true,
}));
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Parse progress update
app.post('/api/parse-progress', async (req, res) => {
  try {
    const { userInput, iglpisComponents } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const componentsList = (iglpisComponents || [])
      .map(c => `${c.id}: ${c.title} (status: ${c.status})`)
      .join('\n');

    const systemPrompt = `Anda adalah assistant untuk tracking progress tesis IGLPIS.
User memberikan catatan progress dalam bahasa alami. Anda harus:

1. Identifikasi component IGLPIS mana yang di-refer (berdasarkan ID atau title)
2. Extract status update (belum/riset/dikerjakan/testing/selesai)
3. Extract notes/deskripsi perkembangan
4. Identify jika ada milestones atau referensi yang perlu di-update
5. Create jurnal entry jika relevan

Daftar IGLPIS Components:
${componentsList}

Respond HANYA dengan JSON (jangan ada text lain):
{
  "component_updates": [
    {
      "component_id": "4.2",
      "status": "testing",
      "note": "extracted note text"
    }
  ],
  "create_jurnal": {
    "title": "extracted title",
    "body": "full description"
  },
  "summary": "brief summary of the update"
}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '{}';
    const parsed = JSON.parse(content);

    res.json(parsed);
  } catch (err) {
    console.error('Parse error:', err);
    res.status(500).json({
      error: err.message || 'Error parsing progress update',
    });
  }
});

// Chat with LLM
app.post('/api/chat', async (req, res) => {
  try {
    const { userMessage, conversationHistory } = req.body;

    if (!userMessage) {
      return res.status(400).json({ error: 'userMessage is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const messages = [
      {
        role: 'system',
        content: `Anda adalah AI assistant untuk membantu tracking progress tesis IGLPIS.
Berikan insight, suggestions, dan motivasi berdasarkan progress yang shared user.
Gunakan bahasa Indonesia yang natural dan encouraging.`,
      },
      ...(conversationHistory || []),
      {
        role: 'user',
        content: userMessage,
      },
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = response.choices[0]?.message?.content || '';

    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    res.status(500).json({
      error: err.message || 'Error in chat',
    });
  }
});

// Add message to ZEP memory
app.post('/api/memory/add', async (req, res) => {
  try {
    const { sessionId, role, content, metadata } = req.body;

    if (!sessionId || !role || !content) {
      return res.status(400).json({
        error: 'sessionId, role, and content are required',
      });
    }

    if (!process.env.ZEP_API_KEY) {
      console.warn('ZEP API key not configured, skipping memory storage');
      return res.json({ warning: 'ZEP not configured', stored: false });
    }

    const zepResponse = await axios.post(
      `https://api.getzep.com/api/v1/sessions/${sessionId}/memory`,
      {
        messages: [
          {
            role,
            content,
            timestamp: new Date().toISOString(),
          },
        ],
        metadata,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.ZEP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ stored: true, data: zepResponse.data });
  } catch (err) {
    console.error('ZEP add memory error:', err.response?.data || err.message);
    res.json({
      warning: 'Failed to store in ZEP',
      stored: false,
      error: err.message,
    });
  }
});

// Get session memory from ZEP
app.get('/api/memory/session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!process.env.ZEP_API_KEY) {
      return res.json({ warning: 'ZEP not configured' });
    }

    const zepResponse = await axios.get(
      `https://api.getzep.com/api/v1/sessions/${sessionId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.ZEP_API_KEY}`,
        },
      }
    );

    res.json(zepResponse.data);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.json({ data: null });
    }
    console.error('ZEP get memory error:', err.message);
    res.status(500).json({
      error: 'Error retrieving session memory',
    });
  }
});

// Save progress context to ZEP
app.post('/api/memory/context', async (req, res) => {
  try {
    const { sessionId, componentUpdates, summary } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    if (!process.env.ZEP_API_KEY) {
      console.warn('ZEP API key not configured');
      return res.json({ warning: 'ZEP not configured', stored: false });
    }

    const contextText = `
Progress Update Summary:
${summary}

Components Updated:
${(componentUpdates || [])
  .map(u => `- ${u.component_id}: ${u.status} (${u.note})`)
  .join('\n')}

Timestamp: ${new Date().toISOString()}
    `.trim();

    const zepResponse = await axios.post(
      `https://api.getzep.com/api/v1/sessions/${sessionId}/memory`,
      {
        messages: [
          {
            role: 'system',
            content: contextText,
            timestamp: new Date().toISOString(),
          },
        ],
        metadata: {
          type: 'progress_context',
          component_count: (componentUpdates || []).length,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.ZEP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({ stored: true, data: zepResponse.data });
  } catch (err) {
    console.error('ZEP context error:', err.response?.data || err.message);
    res.json({
      warning: 'Failed to store context in ZEP',
      stored: false,
      error: err.message,
    });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

export default app;
