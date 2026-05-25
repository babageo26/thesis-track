// ============================================================
//  main.js — App boot dengan Firebase Auth
//  ThesisTrack · Firebase version
// ============================================================

import { onAuthChange, loginWithGoogle,
         logout, saveUserMeta }              from './firebase.js';
import { state, initFirebaseState,
         cleanupState, setRenderCallback }   from './state.js';
import { injectModals }                      from './templates.js';
import { initBackdrops, handleTagKey,
         handleAlgoKey, selectColor,
         openQuickNote, saveQuickNote,
         saveJurnal, deleteJurnal,
         saveMilestone, deleteMilestone,
         saveReferensi, deleteReferensi,
         saveIglpis, deleteIglpis,
         saveCompNote, closeModal }          from './modals.js';
import { renderDashboard, renderJurnal,
         renderMilestone, renderReferensi,
         renderNotes, renderIglpis }         from './pages.js';
import { today, formatDate }                 from './utils.js';

// ── Build app shell ───────────────────────────────────────────
function buildShell(user) {
  const avatar = user.photoURL
    ? `<img src="${user.photoURL}" style="width:28px;height:28px;border-radius:50%;object-fit:cover;">`
    : `<div style="width:28px;height:28px;border-radius:50%;background:var(--purple);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:white">${(user.displayName||'U')[0].toUpperCase()}</div>`;

  document.getElementById('app').innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-title">ThesisTrack</div>
        <div class="logo-sub">IGLPIS · Progres Tesisku</div>
      </div>
      <ul class="nav-list" id="nav">
        <li class="nav-item active" data-page="dashboard"><i class="ti ti-layout-dashboard"></i> Dashboard</li>
        <li class="nav-item" data-page="jurnal"><i class="ti ti-book"></i> Jurnal</li>
        <li class="nav-item" data-page="milestone"><i class="ti ti-target"></i> Milestone</li>
        <li class="nav-item" data-page="referensi"><i class="ti ti-books"></i> Referensi</li>
        <li class="nav-item" data-page="notes"><i class="ti ti-note"></i> Quick Notes</li>
        <li class="nav-item" data-page="iglpis"><i class="ti ti-circuit-board"></i> IGLPIS</li>
      </ul>
      <div class="sidebar-bottom">
        <button class="quick-note-btn" id="sidebar-quick-note">
          <i class="ti ti-plus"></i> Quick Note
        </button>
        <div style="
          display:flex;align-items:center;gap:8px;
          margin-top:10px;padding:8px 4px;
          border-top:1px solid var(--border);
        ">
          ${avatar}
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.displayName || 'User'}</div>
            <div style="font-size:10px;color:var(--text3);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${user.email || ''}</div>
          </div>
          <button id="btn-logout" title="Logout" style="
            background:none;border:1px solid var(--border);
            color:var(--text3);border-radius:6px;
            padding:4px 6px;cursor:pointer;font-size:13px;
            transition:all 0.15s;
          "><i class="ti ti-logout"></i></button>
        </div>
      </div>
    </aside>

    <div class="main">
      <div class="topbar">
        <div>
          <div class="topbar-title" id="topbar-title">Dashboard</div>
          <div class="topbar-sub" id="topbar-sub">${formatDate(today())}</div>
        </div>
        <div style="display:flex;align-items:center;gap:10px">
          <div style="font-size:10px;color:var(--green2);font-family:'JetBrains Mono',monospace;
               background:rgba(22,163,74,0.1);border:1px solid rgba(22,163,74,0.2);
               padding:3px 8px;border-radius:99px;display:flex;align-items:center;gap:5px">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--green2);display:inline-block"></span>
            Realtime Sync
          </div>
          <div class="topbar-action" id="topbar-action"></div>
        </div>
      </div>
      <div class="content" id="content">
        <div class="empty-state" style="padding-top:80px">
          <div style="
            width:36px;height:36px;border-radius:50%;
            border:3px solid var(--border);
            border-top-color:var(--purple);
            animation:spin 0.8s linear infinite;
            margin:0 auto 16px;
          "></div>
          <p>Memuat data...</p>
          <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
        </div>
      </div>
    </div>
  `;
}

// ── Navigation ────────────────────────────────────────────────
let currentPage = 'dashboard';

const PAGE_META = {
  dashboard: { title: 'Dashboard',           sub: formatDate(today()) },
  jurnal:    { title: 'Jurnal Riset',         sub: 'Catatan harian riset' },
  milestone: { title: 'Milestone & Deadline', sub: 'Tracking bab & tahap tesis' },
  referensi: { title: 'Referensi',            sub: 'Daftar referensi & bahan bacaan' },
  notes:     { title: 'Quick Notes',          sub: 'Ide dan catatan cepat' },
  iglpis:    { title: 'IGLPIS Framework',     sub: 'Integrated Geo-Legal Probabilistic Inference System' },
};

export function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.page === page);
  });
  const meta = PAGE_META[page] || {};
  document.getElementById('topbar-title').textContent = meta.title || page;
  document.getElementById('topbar-sub').textContent   = meta.sub   || '';
  render();
}

export function render() {
  if (!state.ready) return;
  const c = document.getElementById('content');
  if (!c) return;
  const pages = {
    dashboard: renderDashboard,
    jurnal:    renderJurnal,
    milestone: renderMilestone,
    referensi: renderReferensi,
    notes:     renderNotes,
    iglpis:    renderIglpis,
  };
  (pages[currentPage] || renderDashboard)(c);
}

// ── Modal wiring ──────────────────────────────────────────────
function wireModals() {
  const wire = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);

  wire('sidebar-quick-note', openQuickNote);
  wire('close-quicknote',    () => closeModal('modal-quicknote'));
  wire('cancel-quicknote',   () => closeModal('modal-quicknote'));
  wire('save-quicknote',     saveQuickNote);

  wire('close-jurnal',  () => closeModal('modal-jurnal'));
  wire('cancel-jurnal', () => closeModal('modal-jurnal'));
  wire('save-jurnal',   saveJurnal);
  wire('j-delete-btn',  deleteJurnal);

  wire('close-milestone',  () => closeModal('modal-milestone'));
  wire('cancel-milestone', () => closeModal('modal-milestone'));
  wire('save-milestone',   saveMilestone);
  wire('ms-delete-btn',    deleteMilestone);

  wire('close-referensi',  () => closeModal('modal-referensi'));
  wire('cancel-referensi', () => closeModal('modal-referensi'));
  wire('save-referensi',   saveReferensi);
  wire('ref-delete-btn',   deleteReferensi);

  wire('close-iglpis',  () => closeModal('modal-iglpis'));
  wire('cancel-iglpis', () => closeModal('modal-iglpis'));
  wire('ig-save-btn',   saveIglpis);
  wire('ig-delete-btn', deleteIglpis);

  wire('close-comp-note',  () => closeModal('modal-comp-note'));
  wire('cancel-comp-note', () => closeModal('modal-comp-note'));
  wire('save-comp-note',   saveCompNote);

  document.getElementById('qn-tag-input')?.addEventListener('keydown',  e => handleTagKey(e, 'qn'));
  document.getElementById('ref-tag-input')?.addEventListener('keydown', e => handleTagKey(e, 'ref'));
  document.getElementById('ig-algo-input')?.addEventListener('keydown', handleAlgoKey);

  document.getElementById('qn-tags-wrap')?.addEventListener('click',
    () => document.getElementById('qn-tag-input')?.focus());
  document.getElementById('ref-tags-wrap')?.addEventListener('click',
    () => document.getElementById('ref-tag-input')?.focus());

  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function () { selectColor(this); });
  });

  wire('btn-logout', async () => {
    cleanupState();
    document.getElementById('app').innerHTML = '';
    await logout();
  });
}

// ── Auth flow ─────────────────────────────────────────────────
function showLoginScreen() {
  document.getElementById('loading-screen').style.display = 'none';
  const loginScreen = document.getElementById('login-screen');
  loginScreen.style.display = 'flex';

  document.getElementById('btn-google-login').addEventListener('click', async () => {
    document.getElementById('btn-google-login').textContent = 'Menghubungkan...';
    document.getElementById('btn-google-login').disabled = true;
    try {
      await loginWithGoogle();
      // onAuthChange akan handle sisanya
    } catch (err) {
      document.getElementById('btn-google-login').innerHTML = `
        <svg width="18" height="18" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.3-.15-2.6-.4-3.9z"/>
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.8 1.2 8 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
          <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.2C29.3 35.2 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8H6.3C9.7 35.7 16.3 40 24 40v4z"/>
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.1-2.1 3.9-3.8 5.2l6.2 5.2C37.3 40.1 44 35 44 24c0-1.3-.15-2.6-.4-3.9z"/>
        </svg>
        Masuk dengan Google
      `;
      document.getElementById('btn-google-login').disabled = false;
    }
  });
}

async function onUserLogin(user) {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('loading-screen').style.display = 'flex';
  document.getElementById('loading-status').textContent = 'Menyinkronkan data...';

  state.user = user;
  await saveUserMeta(user);

  buildShell(user);
  injectModals();
  initBackdrops();
  wireModals();

  setRenderCallback(render);

  document.getElementById('nav').addEventListener('click', e => {
    const li = e.target.closest('[data-page]');
    if (li) navigate(li.dataset.page);
  });

  await initFirebaseState();
  // loading screen disembunyikan oleh state.js setelah semua collection loaded
}

// ── Boot ──────────────────────────────────────────────────────
onAuthChange(async (user) => {
  if (user) {
    await onUserLogin(user);
  } else {
    showLoginScreen();
  }
});
