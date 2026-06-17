// ============================================================
//  llm.js — OpenAI API integration untuk natural language parsing
//  ThesisTrack · LLM Progress Tracking
// ============================================================

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

/**
 * Parse natural language progress update menggunakan OpenAI GPT
 * @param {string} userInput - Natural language input dari user
 * @param {Array} iglpisComponents - Daftar IGLPIS components untuk context
 * @returns {Promise<Object>} Parsed structured data
 */
export async function parseProgressUpdate(userInput, iglpisComponents) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  // Build component list untuk context
  const componentsList = iglpisComponents
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

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
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
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API Error:', error);
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '{}';

    // Parse JSON response
    const parsed = JSON.parse(content);
    return parsed;
  } catch (err) {
    console.error('Error parsing progress update:', err);
    throw err;
  }
}

/**
 * Chat dengan LLM untuk mendapatkan insights tentang progress
 * @param {string} userMessage - User message
 * @param {Array} conversationHistory - Previous messages
 * @returns {Promise<string>} LLM response
 */
export async function chatWithLLM(userMessage, conversationHistory = []) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const messages = [
    {
      role: 'system',
      content: `Anda adalah AI assistant untuk membantu tracking progress tesis IGLPIS.
Berikan insight, suggestions, dan motivasi berdasarkan progress yang shared user.
Gunakan bahasa Indonesia yang natural dan encouraging.`,
    },
    ...conversationHistory,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  } catch (err) {
    console.error('Error in chatWithLLM:', err);
    throw err;
  }
}
