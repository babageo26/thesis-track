// ============================================================
//  zep.js — ZEP Memory API integration
//  ThesisTrack · Context & Conversation History
// ============================================================

const ZEP_API_KEY = import.meta.env.VITE_ZEP_API_KEY;
const ZEP_API_URL = 'https://api.getzep.com/api/v1';

// Create unique session ID based on user & date
export function getSessionId(userId) {
  const today = new Date().toISOString().split('T')[0];
  return `thesis-${userId}-${today}`;
}

/**
 * Add message ke ZEP memory
 * @param {string} sessionId - Session identifier
 * @param {string} role - 'user' or 'assistant'
 * @param {string} content - Message content
 * @param {Object} metadata - Optional metadata
 */
export async function addMessageToMemory(sessionId, role, content, metadata = {}) {
  if (!ZEP_API_KEY) {
    console.warn('ZEP API key not configured, skipping memory storage');
    return null;
  }

  try {
    const response = await fetch(`${ZEP_API_URL}/sessions/${sessionId}/memory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZEP_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role,
            content,
            timestamp: new Date().toISOString(),
          },
        ],
        metadata,
      }),
    });

    if (!response.ok) {
      console.error('ZEP API Error:', response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('Error adding message to ZEP:', err);
    return null;
  }
}

/**
 * Get session memory dari ZEP
 * @param {string} sessionId - Session identifier
 * @returns {Promise<Object>} Session memory data
 */
export async function getSessionMemory(sessionId) {
  if (!ZEP_API_KEY) {
    console.warn('ZEP API key not configured');
    return null;
  }

  try {
    const response = await fetch(`${ZEP_API_URL}/sessions/${sessionId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ZEP_API_KEY}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      console.error('ZEP API Error:', response.status);
      return null;
    }

    return await response.json();
  } catch (err) {
    console.error('Error getting session memory:', err);
    return null;
  }
}

/**
 * Save progress context ke ZEP sebagai summary
 * @param {string} sessionId - Session identifier
 * @param {Array} componentUpdates - Component updates
 * @param {string} summary - Summary text
 */
export async function saveProgressContext(sessionId, componentUpdates, summary) {
  if (!ZEP_API_KEY) {
    console.warn('ZEP API key not configured');
    return null;
  }

  const contextText = `
Progress Update Summary:
${summary}

Components Updated:
${componentUpdates.map(u => `- ${u.component_id}: ${u.status} (${u.note})`).join('\n')}

Timestamp: ${new Date().toISOString()}
  `.trim();

  return addMessageToMemory(sessionId, 'system', contextText, {
    type: 'progress_context',
    component_count: componentUpdates.length,
  });
}

/**
 * Search memory untuk relevant context
 * @param {string} sessionId - Session identifier
 * @param {string} query - Search query
 * @returns {Promise<Array>} Search results
 */
export async function searchMemory(sessionId, query) {
  if (!ZEP_API_KEY) {
    console.warn('ZEP API key not configured');
    return [];
  }

  try {
    const response = await fetch(`${ZEP_API_URL}/sessions/${sessionId}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ZEP_API_KEY}`,
      },
      body: JSON.stringify({
        text: query,
        limit: 5,
      }),
    });

    if (!response.ok) {
      console.error('ZEP Search Error:', response.status);
      return [];
    }

    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.error('Error searching memory:', err);
    return [];
  }
}
