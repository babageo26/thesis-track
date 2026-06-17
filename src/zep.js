// ============================================================
//  zep.js — ZEP Memory API integration (via Backend)
//  ThesisTrack · Context & Conversation History
// ============================================================

// Backend API URL
function getBackendURL() {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001';
  }
  // Production - use Vercel backend API
  return 'https://thesis-track-alpha.vercel.app';
}

const BACKEND_API_URL = getBackendURL();

// Create unique session ID based on user & date
export function getSessionId(userId) {
  const today = new Date().toISOString().split('T')[0];
  return `thesis-${userId}-${today}`;
}

/**
 * Add message ke ZEP memory via Backend
 * @param {string} sessionId - Session identifier
 * @param {string} role - 'user' or 'assistant'
 * @param {string} content - Message content
 * @param {Object} metadata - Optional metadata
 */
export async function addMessageToMemory(sessionId, role, content, metadata = {}) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/memory/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        role,
        content,
        metadata,
      }),
    });

    if (!response.ok) {
      console.error('Backend memory API Error:', response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('Error adding message to ZEP:', err);
    return null;
  }
}

/**
 * Get session memory dari ZEP via Backend
 * @param {string} sessionId - Session identifier
 * @returns {Promise<Object>} Session memory data
 */
export async function getSessionMemory(sessionId) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/memory/session/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      console.error('Backend memory API Error:', response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('Error getting session memory:', err);
    return null;
  }
}

/**
 * Save progress context ke ZEP sebagai summary via Backend
 * @param {string} sessionId - Session identifier
 * @param {Array} componentUpdates - Component updates
 * @param {string} summary - Summary text
 */
export async function saveProgressContext(sessionId, componentUpdates, summary) {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/memory/context`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId,
        componentUpdates,
        summary,
      }),
    });

    if (!response.ok) {
      console.error('Backend memory API Error:', response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('Error saving progress context:', err);
    return null;
  }
}

/**
 * Search memory untuk relevant context
 * Catatan: Tidak diimplementasi di backend untuk sekarang
 * @param {string} sessionId - Session identifier
 * @param {string} query - Search query
 * @returns {Promise<Array>} Search results
 */
export async function searchMemory(sessionId, query) {
  // TODO: Implement search endpoint di backend jika diperlukan
  console.log('Search memory not yet implemented. Session:', sessionId, 'Query:', query);
  return [];
}
