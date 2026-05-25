// ============================================================
//  main.js — App entry point, layout, routing
// ============================================================

import { initState }                          from './state.js';
import { injectModals }                       from './templates.js';
import { initBackdrops, handleTagKey,
         handleAlgoKey, selectColor,
         openQuickNote, saveQuickNote,
         saveJurnal, deleteJurnal,
         saveMilestone, deleteMilestone,
         saveReferensi, deleteReferensi,
         saveIglpis, deleteIglpis,
         saveCompNote, closeModal }           from './modals.js';
import { renderDashboard, renderJurnal,
         renderMilestone, renderReferensi,
         renderNotes, renderIglpis }          from './pages.js';
import { today, formatDate }                  from './utils.js';

// ── Build static shell ───────────────────────────────────────
function buildShell() {
  document.getElementById('app').innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-logo">
        <div class="logo-title">ThesisTrack</div>
        <div class="logo-sub">IGLPIS · Progres Tesisku</div>
      </div>
      <ul class="nav-list" id="nav">
        <li class="nav-item active" data-page="dashboard">
          <i class="ti ti-layout-dashboard"></i> Dashboard
        </li>
        <li class="nav-item" data-page="jurnal">
          <i class="ti ti-book"></i> Jurnal
        </li>
        <li class="nav-item" data-page="milestone">
          <i class="ti ti-target"></i> Milestone
        </li>
        <li class="nav-item" data-page="referensi">
          <i class="ti ti-books"></i> Referensi
        </li>
        <li class="nav-item" data-page="notes">
          <i class="ti ti-note"></i> Quick Notes
        </li>
        <li class="nav-item" data-page="iglpis">
          <i class="ti ti-circuit-board"></i> IGLPIS
        </li>
      </ul>
      <div class="sidebar-bottom">
        <button class="quick-note-btn" id="sidebar-quick-note">
          <i class="ti ti-plus"></i> Quick Note
        </button>
      </div>
    </aside>

    <div class="main">
      <div class="topbar">
        <div>
          <div class="topbar-title" id="topbar-title">Dashboard</div>
          <div class="topbar-sub"   id="topbar-sub">${formatDate(today())}</div>
        </div>
        <div class="topbar-action" id="topbar-action"></div>
      </div>
      <div class="content" id="content"></div>
    </div>
  `;
}

// ── Navigation ───────────────────────────────────────────────
let currentPage = 'dashboard';

const PAGE_META = {
  dashboard: { title: 'Dashboard',          sub: formatDate(today()) },
  jurnal:    { title: 'Jurnal Riset',        sub: 'Catatan harian riset' },
  milestone: { title: 'Milestone & Deadline', sub: 'Tracking bab & tahap tesis' },
  referensi: { title: 'Referensi',           sub: 'Daftar referensi & bahan bacaan' },
  notes:     { title: 'Quick Notes',         sub: 'Ide dan catatan cepat' },
  iglpis:    { title: 'IGLPIS Framework',    sub: 'Integrated Geo-Legal Probabilistic Inference System' },
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

// ── Wire up modal buttons ────────────────────────────────────
function wireModals() {
  const wire = (id, fn) => document.getElementById(id)?.addEventListener('click', fn);

  // Quick Note
  wire('sidebar-quick-note', openQuickNote);
  wire('close-quicknote',    () => closeModal('modal-quicknote'));
  wire('cancel-quicknote',   () => closeModal('modal-quicknote'));
  wire('save-quicknote',     saveQuickNote);

  // Jurnal
  wire('close-jurnal',   () => closeModal('modal-jurnal'));
  wire('cancel-jurnal',  () => closeModal('modal-jurnal'));
  wire('save-jurnal',    saveJurnal);
  wire('j-delete-btn',   deleteJurnal);

  // Milestone
  wire('close-milestone',   () => closeModal('modal-milestone'));
  wire('cancel-milestone',  () => closeModal('modal-milestone'));
  wire('save-milestone',    saveMilestone);
  wire('ms-delete-btn',     deleteMilestone);

  // Referensi
  wire('close-referensi',   () => closeModal('modal-referensi'));
  wire('cancel-referensi',  () => closeModal('modal-referensi'));
  wire('save-referensi',    saveReferensi);
  wire('ref-delete-btn',    deleteReferensi);

  // IGLPIS
  wire('close-iglpis',   () => closeModal('modal-iglpis'));
  wire('cancel-iglpis',  () => closeModal('modal-iglpis'));
  wire('ig-save-btn',    saveIglpis);
  wire('ig-delete-btn',  deleteIglpis);

  // Comp Note
  wire('close-comp-note',   () => closeModal('modal-comp-note'));
  wire('cancel-comp-note',  () => closeModal('modal-comp-note'));
  wire('save-comp-note',    saveCompNote);

  // Tag inputs
  document.getElementById('qn-tag-input')?.addEventListener('keydown',  e => handleTagKey(e, 'qn'));
  document.getElementById('ref-tag-input')?.addEventListener('keydown', e => handleTagKey(e, 'ref'));
  document.getElementById('ig-algo-input')?.addEventListener('keydown', handleAlgoKey);

  // Tag wrap click-to-focus
  document.getElementById('qn-tags-wrap')?.addEventListener('click', () =>
    document.getElementById('qn-tag-input')?.focus());
  document.getElementById('ref-tags-wrap')?.addEventListener('click', () =>
    document.getElementById('ref-tag-input')?.focus());

  // Color dots
  document.querySelectorAll('.color-dot').forEach(dot => {
    dot.addEventListener('click', function () {
      const ctx = this.closest('#qn-colors') ? 'qn' : 'ms';
      selectColor(this, ctx);
    });
  });
}

// ── Boot ─────────────────────────────────────────────────────
function boot() {
  buildShell();
  injectModals();
  initState();
  initBackdrops();
  wireModals();

  document.getElementById('nav').addEventListener('click', e => {
    const li = e.target.closest('[data-page]');
    if (li) navigate(li.dataset.page);
  });

  render();
}

boot();
