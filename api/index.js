import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import axios from 'axios';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Explicit preflight handler
app.options('*', cors());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Parse progress update - Full CRUD semua collections
app.post('/api/parse-progress', async (req, res) => {
  try {
    const { userInput, state } = req.body;

    if (!userInput) {
      return res.status(400).json({ error: 'userInput is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const iglpisComponents = state?.iglpis || [];
    const milestones       = state?.milestones || [];
    const jurnal           = state?.jurnal || [];
    const refs             = state?.refs || [];
    const notes            = state?.notes || [];

    const iglpisList = iglpisComponents
      .map(c => `  ${c.id}: "${c.title}" (status: ${c.status}, note: "${c.note || '-'}")`)
      .join('\n');

    const milestonesList = milestones
      .map(m => `  ${m.id}: "${m.title}" (progress: ${m.progress}%, deadline: ${m.deadline})`)
      .join('\n');

    const jurnalList = jurnal
      .slice(-5)
      .map(j => `  ${j.id}: "${j.title}" (${j.date})`)
      .join('\n');

    const refsList = refs
      .slice(-5)
      .map(r => `  ${r.id}: "${r.title}" - ${r.author} (${r.year})`)
      .join('\n');

    const notesList = notes
      .slice(-5)
      .map(n => `  ${n.id}: "${n.title}"`)
      .join('\n');

    const systemPrompt = `Anda adalah AI assistant untuk ThesisTrack, app tracking progress tesis IGLPIS.
User memberikan instruksi dalam bahasa alami. Identifikasi operasi CRUD yang perlu dilakukan.

=== DATA TERSEDIA ===

IGLPIS Components (status: belum/riset/dikerjakan/testing/selesai):
${iglpisList || '  (kosong)'}

Milestones:
${milestonesList || '  (kosong)'}

Jurnal (5 terbaru):
${jurnalList || '  (kosong)'}

Referensi (5 terbaru):
${refsList || '  (kosong)'}

Quick Notes (5 terbaru):
${notesList || '  (kosong)'}

=== INSTRUKSI ===
Respond HANYA dengan JSON valid (tidak ada text lain di luar JSON):

{
  "iglpis_updates": [
    { "id": "4.2", "status": "testing", "note": "catatan baru" }
  ],
  "milestones": {
    "create": [
      { "title": "judul", "desc": "deskripsi", "deadline": "YYYY-MM-DD", "progress": 0, "color": "#7C3AED" }
    ],
    "update": [
      { "id": "existing-id", "title": "judul", "progress": 75, "deadline": "YYYY-MM-DD" }
    ],
    "delete": ["id-to-delete"]
  },
  "jurnal": {
    "create": [
      { "title": "judul jurnal", "body": "isi jurnal lengkap" }
    ],
    "update": [
      { "id": "existing-id", "title": "judul baru", "body": "isi baru" }
    ],
    "delete": ["id-to-delete"]
  },
  "refs": {
    "create": [
      { "title": "judul paper", "author": "nama author", "year": "2024", "url": "", "tags": ["tag1"], "note": "" }
    ],
    "update": [
      { "id": "existing-id", "title": "judul", "note": "catatan baru" }
    ],
    "delete": ["id-to-delete"]
  },
  "notes": {
    "create": [
      { "title": "judul note", "body": "isi note", "tags": ["tag1"], "color": "#7C3AED" }
    ],
    "update": [
      { "id": "existing-id", "title": "judul", "body": "isi baru" }
    ],
    "delete": ["id-to-delete"]
  },
  "summary": "ringkasan singkat operasi yang dilakukan"
}

Hanya isi field yang relevan. Jika tidak ada operasi untuk suatu collection, beri array/object kosong.
Untuk delete, gunakan ID yang EXACT dari data yang tersedia.
Untuk create milestone, gunakan warna hex yang menarik.
Jika user menyebut "hapus", "delete", "remove" → isi bagian delete yang relevan.
Jika user menyebut "tambah", "buat", "create", "catat" → isi bagian create.
Jika user menyebut "update", "ubah", "ganti", "edit" → isi bagian update.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userInput },
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content || '{}';

    // Clean JSON jika ada markdown code block
    const cleaned = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(cleaned);
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
