// ============================================================
//  llm.js — Backend API integration untuk natural language parsing
//  ThesisTrack · LLM Progress Tracking
// ============================================================

// Backend API URL (akan auto-detect localhost vs production)
function getBackendURL() {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  // Production - use Vercel backend API
  return 'https://thesis-track-j6xfy37fl-babageo.vercel.app';
}

const BACKEND_API_URL = getBackendURL();

/**
 * Parse natural language progress update menggunakan Backend API
 * @param {string} userInput - Natural language input dari user
 * @param {Array} iglpisComponents - Daftar IGLPIS components untuk context
 * @returns {Promise<Object>} Parsed structured data
 */
export async function parseProgressUpdate(userInput, iglpisComponents) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/parse-progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput,
        iglpisComponents,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Backend API Error:', error);
      throw new Error(`API error: ${error.error || 'Unknown error'}`);
    }

    const parsed = await response.json();
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
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userMessage,
        conversationHistory,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API error: ${error.error || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.reply || '';
  } catch (err) {
    console.error('Error in chatWithLLM:', err);
    throw err;
  }
}
