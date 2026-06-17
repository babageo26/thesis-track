// ============================================================
//  llm-page.js — Chat interface untuk natural language progress tracking
//  ThesisTrack · AI Progress Tracker · Full CRUD
// ============================================================

import { state, persistSet, persistDelete } from './state.js';
import { parseProgressUpdate, chatWithLLM } from './llm.js';
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
  loadConversationHistory();

  c.innerHTML = `
    <div class="llm-container">
      <div class="llm-messages" id="llm-messages">
        ${conversationHistory.length === 0 ? `
          <div class="llm-welcome">
            <div style="font-size:28px;margin-bottom:12px">🤖</div>
            <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:8px">AI Progress Tracker</div>
            <div style="font-size:12px;color:var(--text3);line-height:1.6">
              Ceritakan progress Anda dalam bahasa natural.<br>
              Saya akan otomatis update data Anda.
            </div>
            <div style="margin-top:16px;display:flex;flex-direction:column;gap:6px">
              ${[
                '📝 "Hari ini sudah selesai OCR extraction SU Page 1"',
                '📚 "Tambah referensi paper SAM dari Meta tahun 2023"',
                '🎯 "Update milestone Bab 3 progress jadi 60%"',
                '💡 "Buat quick note tentang confidence threshold"',
                '🗑️ "Hapus jurnal kemarin yang salah"',
              ].map(ex => `
                <div class="llm-example" data-text="${ex.replace(/['"]/g, '')}">
                  ${ex}
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
      <div class="llm-input-area">
        <textarea
          id="llm-input"
          placeholder="Ceritakan progress, tambah data, atau minta update... (Ctrl+Enter untuk chat, Shift+Enter untuk parse & update)"
          class="llm-textarea"
          rows="3"
        ></textarea>
        <div class="llm-actions">
          <span style="font-size:11px;color:var(--text3)">Ctrl+Enter = Chat &nbsp;|&nbsp; Shift+Enter = Update Data</span>
          <div style="display:flex;gap:8px">
            <button id="llm-clear-btn" class="btn-ghost">Hapus Chat</button>
            <button id="llm-send-btn" class="btn-secondary">💬 Chat</button>
            <button id="llm-parse-btn" class="btn-primary">⚡ Parse & Update</button>
          </div>
        </div>
      </div>
    </div>
  `;

  renderMessages();
  wireEventListeners();
}

function renderMessages() {
  const messagesDiv = document.getElementById('llm-messages');
  if (!messagesDiv || conversationHistory.length === 0) return;

  messagesDiv.innerHTML = conversationHistory.map(msg => `
    <div class="llm-message ${msg.role}">
      <div class="llm-message-content">${formatContent(msg.content)}</div>
      <div class="llm-message-time">${msg.timestamp}</div>
    </div>
  `).join('');

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function wireEventListeners() {
  const sendBtn  = document.getElementById('llm-send-btn');
  const parseBtn = document.getElementById('llm-parse-btn');
  const clearBtn = document.getElementById('llm-clear-btn');
  const input    = document.getElementById('llm-input');

  sendBtn?.addEventListener('click',  () => handleChat(input));
  parseBtn?.addEventListener('click', () => handleParse(input));
  clearBtn?.addEventListener('click', () => {
    conversationHistory = [];
    saveConversationHistory();
    renderLLMPage(document.getElementById('content'));
  });

  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey)  { e.preventDefault(); handleChat(input); }
    if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); handleParse(input); }
  });

  // Click contoh
  document.querySelectorAll('.llm-example').forEach(el => {
    el.addEventListener('click', () => {
      const inputEl = document.getElementById('llm-input');
      if (inputEl) inputEl.value = el.dataset.text;
      inputEl?.focus();
    });
  });
}

// ── Handle Chat ──────────────────────────────────────────────
async function handleChat(input) {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage('user', userMessage);
  input.value = '';

  setBusy(true, 'llm-send-btn', '💬 Mengetik...');

  try {
    const response = await chatWithLLM(userMessage, conversationHistory.slice(-10));
    addMessage('assistant', response);
    await addMessageToMemory(sessionId, 'assistant', response);
  } catch (err) {
    addMessage('system', `❌ Error: ${err.message}`);
  } finally {
    setBusy(false, 'llm-send-btn', '💬 Chat');
  }
}

// ── Handle Parse & Full CRUD ─────────────────────────────────
async function handleParse(input) {
  const userMessage = input.value.trim();
  if (!userMessage) {
    addMessage('system', '❌ Silakan masukkan catatan progress terlebih dahulu');
    return;
  }

  addMessage('user', userMessage);
  input.value = '';

  setBusy(true, 'llm-parse-btn', '⚡ Parsing...');

  try {
    // Kirim semua state ke backend untuk context
    const parsed = await parseProgressUpdate(userMessage, {
      iglpis:     state.iglpis,
      milestones: state.milestones,
      jurnal:     state.jurnal,
      refs:       state.refs,
      notes:      state.notes,
    });

    const results = await applyAllChanges(parsed);

    // Save context ke ZEP
    await saveProgressContext(sessionId, results.components, parsed.summary || '');

    // Build result message
    const lines = ['✅ **Update Berhasil!**', ''];
    if (parsed.summary) lines.push(parsed.summary, '');
    if (results.total > 0) {
      if (results.components.length)  lines.push(`🔧 IGLPIS: ${results.components.length} komponen diupdate`);
      if (results.milestones.length)  lines.push(`🎯 Milestone: ${results.milestones.join(', ')}`);
      if (results.jurnal.length)      lines.push(`📖 Jurnal: ${results.jurnal.join(', ')}`);
      if (results.refs.length)        lines.push(`📚 Referensi: ${results.refs.join(', ')}`);
      if (results.notes.length)       lines.push(`💡 Quick Notes: ${results.notes.join(', ')}`);
    } else {
      lines.push('ℹ️ Tidak ada perubahan data terdeteksi');
    }

    addMessage('system', lines.join('\n'));

  } catch (err) {
    addMessage('system', `❌ Error parsing: ${err.message}`);
    console.error(err);
  } finally {
    setBusy(false, 'llm-parse-btn', '⚡ Parse & Update');
  }
}

// ── Apply All CRUD Changes ────────────────────────────────────
async function applyAllChanges(parsed) {
  const results = {
    components: [],
    milestones: [],
    jurnal:     [],
    refs:       [],
    notes:      [],
    total:      0,
  };

  // ── IGLPIS updates ────────────────────────────────────────
  for (const upd of parsed.iglpis_updates || []) {
    const comp = state.iglpis.find(c => c.id === upd.id);
    if (comp) {
      if (upd.status) comp.status = upd.status;
      if (upd.note !== undefined) comp.note = upd.note;
      await persistSet('iglpis', comp);
      results.components.push({ component_id: upd.id, status: upd.status, note: upd.note });
    }
  }

  // ── Milestones ────────────────────────────────────────────
  for (const item of parsed.milestones?.create || []) {
    const newItem = { id: uid(), title: item.title, desc: item.desc || '', deadline: item.deadline || today(), progress: item.progress ?? 0, color: item.color || '#7C3AED' };
    await persistSet('milestones', newItem);
    results.milestones.push(`+${item.title}`);
  }
  for (const item of parsed.milestones?.update || []) {
    const existing = state.milestones.find(m => m.id === item.id);
    if (existing) {
      const updated = { ...existing, ...item };
      await persistSet('milestones', updated);
      results.milestones.push(`~${existing.title}`);
    }
  }
  for (const id of parsed.milestones?.delete || []) {
    const existing = state.milestones.find(m => m.id === id);
    await persistDelete('milestones', id);
    results.milestones.push(`-${existing?.title || id}`);
  }

  // ── Jurnal ────────────────────────────────────────────────
  for (const item of parsed.jurnal?.create || []) {
    const newItem = { id: uid(), title: item.title, body: item.body || '', date: item.date || today() };
    await persistSet('jurnal', newItem);
    results.jurnal.push(`+${item.title}`);
  }
  for (const item of parsed.jurnal?.update || []) {
    const existing = state.jurnal.find(j => j.id === item.id);
    if (existing) {
      const updated = { ...existing, ...item };
      await persistSet('jurnal', updated);
      results.jurnal.push(`~${existing.title}`);
    }
  }
  for (const id of parsed.jurnal?.delete || []) {
    const existing = state.jurnal.find(j => j.id === id);
    await persistDelete('jurnal', id);
    results.jurnal.push(`-${existing?.title || id}`);
  }

  // ── Referensi ─────────────────────────────────────────────
  for (const item of parsed.refs?.create || []) {
    const newItem = { id: uid(), title: item.title, author: item.author || '', year: item.year || '', url: item.url || '', tags: item.tags || [], note: item.note || '' };
    await persistSet('refs', newItem);
    results.refs.push(`+${item.title}`);
  }
  for (const item of parsed.refs?.update || []) {
    const existing = state.refs.find(r => r.id === item.id);
    if (existing) {
      const updated = { ...existing, ...item };
      await persistSet('refs', updated);
      results.refs.push(`~${existing.title}`);
    }
  }
  for (const id of parsed.refs?.delete || []) {
    const existing = state.refs.find(r => r.id === id);
    await persistDelete('refs', id);
    results.refs.push(`-${existing?.title || id}`);
  }

  // ── Quick Notes ───────────────────────────────────────────
  for (const item of parsed.notes?.create || []) {
    const newItem = { id: uid(), title: item.title, body: item.body || '', tags: item.tags || [], color: item.color || '#7C3AED', date: today() };
    await persistSet('notes', newItem);
    results.notes.push(`+${item.title}`);
  }
  for (const item of parsed.notes?.update || []) {
    const existing = state.notes.find(n => n.id === item.id);
    if (existing) {
      const updated = { ...existing, ...item };
      await persistSet('notes', updated);
      results.notes.push(`~${existing.title}`);
    }
  }
  for (const id of parsed.notes?.delete || []) {
    const existing = state.notes.find(n => n.id === id);
    await persistDelete('notes', id);
    results.notes.push(`-${existing?.title || id}`);
  }

  results.total = results.components.length + results.milestones.length +
    results.jurnal.length + results.refs.length + results.notes.length;

  return results;
}

// ── Helpers ──────────────────────────────────────────────────
function addMessage(role, content) {
  conversationHistory.push({ role, content, timestamp: formatTime(new Date()) });
  saveConversationHistory();
  renderMessages();
  addMessageToMemory(sessionId, role, content).catch(() => {});
}

function setBusy(busy, btnId, label) {
  const btn   = document.getElementById(btnId);
  const input = document.getElementById('llm-input');
  if (btn)   { btn.textContent = label; btn.disabled = busy; }
  if (input)   input.disabled = busy;
}

function loadConversationHistory() {
  try {
    const stored = localStorage.getItem(`llm_history_${sessionId}`);
    conversationHistory = stored ? JSON.parse(stored) : [];
  } catch (e) {
    conversationHistory = [];
  }
}

function saveConversationHistory() {
  localStorage.setItem(`llm_history_${sessionId}`, JSON.stringify(conversationHistory.slice(-50)));
}

function formatTime(date) {
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function formatContent(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
