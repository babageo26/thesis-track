// ============================================================
//  llm-page.js — Chat interface untuk natural language progress tracking
//  ThesisTrack · AI Progress Tracker
// ============================================================

import { state } from './state.js';
import { parseProgressUpdate, chatWithLLM } from './llm.js';
import { persistSet } from './state.js';
import { getSessionId, addMessageToMemory, saveProgressContext } from './zep.js';
import { uid, today } from './utils.js';

function setTopbarAction(html) {
  document.getElementById('topbar-action').innerHTML = html;
}

let conversationHistory = [];
let sessionId = null;

export function renderLLMPage(c) {
  setTopbarAction('');
  sessionId = getSessionId(state.user?.uid || 'anonymous');

  c.innerHTML = `
    <div class="llm-container">
      <div class="llm-messages" id="llm-messages"></div>
      <div class="llm-input-area">
        <textarea
          id="llm-input"
          placeholder="Ceritakan progress Anda hari ini... Contoh: 'Hari ini sudah selesai OCR extraction untuk SU Page 1. Hasilnya bagus tapi perlu fine-tune confidence score.'"
          class="llm-textarea"
        ></textarea>
        <div class="llm-actions">
          <button id="llm-send-btn" class="btn-primary">Kirim</button>
          <button id="llm-parse-btn" class="btn-secondary">Parse & Update</button>
        </div>
      </div>
    </div>
  `;

  renderMessages(c);
  wireEventListeners(c);
  loadConversationHistory();
}

function renderMessages(c) {
  const messagesDiv = document.getElementById('llm-messages');
  if (!messagesDiv) return;

  const html = conversationHistory.map(msg => `
    <div class="llm-message ${msg.role}">
      <div class="llm-message-content">${escapeHtml(msg.content)}</div>
      <div class="llm-message-time">${msg.timestamp}</div>
    </div>
  `).join('');

  messagesDiv.innerHTML = html;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function wireEventListeners(c) {
  const sendBtn = document.getElementById('llm-send-btn');
  const parseBtn = document.getElementById('llm-parse-btn');
  const input = document.getElementById('llm-input');

  sendBtn?.addEventListener('click', () => handleChat(c, input));
  parseBtn?.addEventListener('click', () => handleParse(c, input));

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleChat(c, input);
    }
    if (e.key === 'Enter' && e.shiftKey) {
      handleParse(c, input);
    }
  });
}

async function handleChat(c, input) {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Add user message to conversation
  conversationHistory.push({
    role: 'user',
    content: userMessage,
    timestamp: formatTime(new Date()),
  });

  input.value = '';
  saveConversationHistory();
  renderMessages(c);

  // Store in ZEP
  await addMessageToMemory(sessionId, 'user', userMessage);

  try {
    // Get LLM response
    const response = await chatWithLLM(userMessage, conversationHistory);

    conversationHistory.push({
      role: 'assistant',
      content: response,
      timestamp: formatTime(new Date()),
    });

    saveConversationHistory();
    renderMessages(c);
    await addMessageToMemory(sessionId, 'assistant', response);
  } catch (err) {
    showError(c, `Error: ${err.message}`);
  }
}

async function handleParse(c, input) {
  const userMessage = input.value.trim();
  if (!userMessage) {
    showError(c, 'Silakan masukkan catatan progress terlebih dahulu');
    return;
  }

  try {
    // Show loading state
    input.disabled = true;
    const btn = document.getElementById('llm-parse-btn');
    if (btn) btn.textContent = 'Parsing...';

    // Parse natural language
    const parsed = await parseProgressUpdate(userMessage, state.iglpis);

    // Add user message
    conversationHistory.push({
      role: 'user',
      content: userMessage,
      timestamp: formatTime(new Date()),
    });

    // Process component updates
    const updatedComponents = [];
    if (parsed.component_updates?.length) {
      for (const update of parsed.component_updates) {
        const component = state.iglpis.find(c => c.id === update.component_id);
        if (component) {
          component.status = update.status;
          component.note = update.note;
          await persistSet('iglpis', component);
          updatedComponents.push(update);
        }
      }
    }

    // Create jurnal entry if specified
    let jurnalId = null;
    if (parsed.create_jurnal) {
      jurnalId = uid();
      const jurnalEntry = {
        id: jurnalId,
        title: parsed.create_jurnal.title,
        body: parsed.create_jurnal.body,
        date: today(),
      };
      await persistSet('jurnal', jurnalEntry);
    }

    // Save to ZEP
    await saveProgressContext(sessionId, updatedComponents, parsed.summary);

    // Show success message
    const summary = `
✓ Update berhasil!

${parsed.summary}

${updatedComponents.length > 0 ? `Komponen terupdate: ${updatedComponents.length}` : ''}
${jurnalId ? '✓ Jurnal entry dibuat' : ''}
    `.trim();

    conversationHistory.push({
      role: 'system',
      content: summary,
      timestamp: formatTime(new Date()),
    });

    input.value = '';
    saveConversationHistory();
    renderMessages(c);

    // Reset button
    if (btn) btn.textContent = 'Parse & Update';
    input.disabled = false;
  } catch (err) {
    showError(c, `Error parsing: ${err.message}`);
    const btn = c.getElementById('llm-parse-btn');
    if (btn) btn.textContent = 'Parse & Update';
    input.disabled = false;
  }
}

function showError(c, message) {
  const messagesDiv = document.getElementById('llm-messages');
  if (messagesDiv) {
    conversationHistory.push({
      role: 'system',
      content: `❌ ${message}`,
      timestamp: formatTime(new Date()),
    });
    saveConversationHistory();
    renderMessages(c);
  }
}

function loadConversationHistory() {
  // Load dari localStorage untuk sesi ini
  const stored = localStorage.getItem(`llm_history_${sessionId}`);
  if (stored) {
    try {
      conversationHistory = JSON.parse(stored);
    } catch (e) {
      conversationHistory = [];
    }
  }
}

function saveConversationHistory() {
  localStorage.setItem(`llm_history_${sessionId}`, JSON.stringify(conversationHistory));
}

function formatTime(date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
