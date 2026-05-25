// ============================================================
//  pages.js — Page rendering functions (Dashboard → IGLPIS)
// ============================================================

import { state, persist }                       from './state.js';
import { overallProgress, deadlineLabel,
         journalIcon, groupByPhase, today }      from './utils.js';
import { openQuickNote, openJurnalModal,
         openMilestoneModal, openRefModal,
         openIglpisModal, openCompNote,
         handleTagKey, handleAlgoKey,
         selectColor, closeModal }               from './modals.js';
import { navigate }                              from './main.js';

// ── Shared helpers ───────────────────────────────────────────
function setTopbarAction(html) {
  document.getElementById('topbar-action').innerHTML = html;
}

// ── DASHBOARD ────────────────────────────────────────────────
export function renderDashboard(c) {
  setTopbarAction('');
  const prog   = overallProgress(state.milestones);
  const done   = state.milestones.filter(m => m.progress === 100).length;
  const iglDone = state.iglpis.filter(x => x.status === 'selesai').length;

  const sortedMs = [...state.milestones]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 3);

  const recentJ = [...state.jurnal]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  const recentN = state.notes.slice(0, 3);

  c.innerHTML = `
    <div class="progress-wrap">
      <div class="progress-label">Progres Tesis</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <div class="progress-pct">${prog}%</div>
        <div class="progress-meta">${done}/${state.milestones.length} milestone selesai</div>
      </div>
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="width:${prog}%"></div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--purple2)">◎</div>
        <div class="stat-value">${state.milestones.length}</div>
        <div class="stat-label">Milestone</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--blue2)">📖</div>
        <div class="stat-value">${state.jurnal.length}</div>
        <div class="stat-label">Jurnal</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--amber2)">📝</div>
        <div class="stat-value">${state.notes.length}</div>
        <div class="stat-label">Quick Notes</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon" style="color:var(--green2)">✓</div>
        <div class="stat-value">${iglDone}</div>
        <div class="stat-label">IGLPIS Selesai</div>
      </div>
    </div>

    <div class="two-col">
      <div class="card">
        <div class="section-title">
          Deadline Terdekat
          <span class="see-all" id="goto-milestone">Lihat semua →</span>
        </div>
        ${sortedMs.length ? sortedMs.map(m => {
          const dl = deadlineLabel(m.deadline);
          return `<div class="milestone-item">
            <div class="milestone-header">
              <span class="milestone-name">${m.title}</span>
              <span class="milestone-deadline ${dl.cls}">${dl.text}</span>
            </div>
            <div class="milestone-track">
              <div class="milestone-fill" style="width:${m.progress}%;background:${m.color}"></div>
            </div>
          </div>`;
        }).join('') : '<div style="color:var(--text3);font-size:13px;padding:14px 0">Belum ada milestone</div>'}
      </div>

      <div style="display:flex;flex-direction:column;gap:16px">
        <div class="card" style="flex:1">
          <div class="section-title">
            Jurnal Terbaru
            <span class="see-all" id="goto-jurnal">Lihat →</span>
          </div>
          ${recentJ.map(j => `
            <div class="journal-item">
              <div class="journal-meta">
                <span>${journalIcon(j.title)}</span>
                <span class="journal-date">${j.date}</span>
              </div>
              <div class="journal-title">${j.title}</div>
              <div class="journal-preview">${j.body}</div>
            </div>
          `).join('') || '<div style="color:var(--text3);font-size:13px;padding:8px 0">Belum ada jurnal</div>'}
        </div>

        <div class="card" style="flex:1">
          <div class="section-title">
            Quick Notes
            <span class="see-all" id="goto-notes">Lihat →</span>
          </div>
          ${recentN.map(n => `
            <span class="note-tag" style="background:${n.color}22;color:${n.color};border:1px solid ${n.color}44">
              ${n.title.slice(0, 28)}${n.title.length > 28 ? '…' : ''}
            </span>
          `).join('') || '<div style="color:var(--text3);font-size:13px">Belum ada quick note</div>'}
        </div>
      </div>
    </div>
  `;

  c.querySelector('#goto-milestone')?.addEventListener('click', () => navigate('milestone'));
  c.querySelector('#goto-jurnal')?.addEventListener('click',    () => navigate('jurnal'));
  c.querySelector('#goto-notes')?.addEventListener('click',     () => navigate('notes'));
}

// ── JURNAL ────────────────────────────────────────────────────
export function renderJurnal(c) {
  setTopbarAction(`<button id="btn-new-jurnal"><i class="ti ti-plus"></i> Tulis Hari Ini</button>`);
  document.getElementById('btn-new-jurnal')?.addEventListener('click', () => openJurnalModal());

  const sorted = [...state.jurnal].sort((a, b) => new Date(b.date) - new Date(a.date));

  c.innerHTML = sorted.length ? `
    <div style="max-width:720px;margin:0 auto">
      ${sorted.map(j => `
        <div style="display:flex;gap:16px;margin-bottom:20px">
          <div style="display:flex;flex-direction:column;align-items:center;padding-top:4px">
            <div style="width:10px;height:10px;border-radius:50%;background:var(--purple);flex-shrink:0"></div>
            <div style="width:1px;flex:1;background:var(--border);margin-top:6px"></div>
          </div>
          <div class="card" style="flex:1;cursor:pointer" data-jid="${j.id}">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <div style="font-size:16px;font-weight:700;color:var(--text)">${j.title}</div>
              <div style="font-size:11px;color:var(--text3);font-family:'JetBrains Mono',monospace">${j.date}</div>
            </div>
            <div style="font-size:13px;color:var(--text2);line-height:1.7;white-space:pre-wrap">${j.body}</div>
          </div>
        </div>
      `).join('')}
    </div>
  ` : `<div class="empty-state"><i class="ti ti-book"></i><p>Belum ada jurnal. Mulai tulis hari ini!</p></div>`;

  c.querySelectorAll('[data-jid]').forEach(el => {
    el.addEventListener('click', () => openJurnalModal(el.dataset.jid));
  });
}

// ── MILESTONE ─────────────────────────────────────────────────
export function renderMilestone(c) {
  setTopbarAction(`<button id="btn-new-ms"><i class="ti ti-plus"></i> Tambah Milestone</button>`);
  document.getElementById('btn-new-ms')?.addEventListener('click', () => openMilestoneModal());

  const sorted = [...state.milestones].sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  c.innerHTML = sorted.length ? sorted.map(m => {
    const dl = deadlineLabel(m.deadline);
    return `
      <div class="card" style="margin-bottom:12px;cursor:pointer" data-mid="${m.id}">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px">
          <div style="flex:1">
            <div style="font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px">${m.title}</div>
            ${m.desc ? `<div style="font-size:12px;color:var(--text2);margin-bottom:8px">${m.desc}</div>` : ''}
            <div style="display:flex;align-items:center;gap:10px;margin-top:10px">
              <div class="milestone-track" style="flex:1">
                <div class="milestone-fill" style="width:${m.progress}%;background:${m.color}"></div>
              </div>
              <span style="font-size:12px;font-family:'JetBrains Mono',monospace;color:${m.color};min-width:32px">${m.progress}%</span>
            </div>
          </div>
          <div style="text-align:right;flex-shrink:0">
            <div style="font-size:11px;font-family:'JetBrains Mono',monospace;color:var(--text3);margin-bottom:4px">${m.deadline}</div>
            <div class="milestone-deadline ${dl.cls}">${dl.text}</div>
          </div>
        </div>
      </div>
    `;
  }).join('') : `<div class="empty-state"><i class="ti ti-target"></i><p>Belum ada milestone</p></div>`;

  c.querySelectorAll('[data-mid]').forEach(el => {
    el.addEventListener('click', () => openMilestoneModal(el.dataset.mid));
  });
}

// ── REFERENSI ─────────────────────────────────────────────────
let refSearch    = '';
let refTagFilter = '';

export function renderReferensi(c) {
  setTopbarAction(`<button id="btn-new-ref"><i class="ti ti-plus"></i> Tambah Referensi</button>`);
  document.getElementById('btn-new-ref')?.addEventListener('click', () => openRefModal());

  const allTags  = [...new Set(state.refs.flatMap(r => r.tags))];
  const filtered = state.refs.filter(r => {
    const q = refSearch.toLowerCase();
    const matchSearch = !q || r.title.toLowerCase().includes(q)
                           || (r.author || '').toLowerCase().includes(q)
                           || r.tags.join(' ').toLowerCase().includes(q);
    const matchTag = !refTagFilter || r.tags.includes(refTagFilter);
    return matchSearch && matchTag;
  });

  c.innerHTML = `
    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input class="search-box" id="ref-search" placeholder="Cari referensi..." value="${refSearch}">
    </div>
    <div class="filter-tabs">
      <button class="filter-tab ${!refTagFilter ? 'active' : ''}" data-tag="">Semua (${state.refs.length})</button>
      ${allTags.map(t => `<button class="filter-tab ${refTagFilter === t ? 'active' : ''}" data-tag="${t}">${t}</button>`).join('')}
    </div>
    ${filtered.length ? filtered.map(r => `
      <div class="ref-item" data-rid="${r.id}">
        <div class="ref-title">${r.title}</div>
        <div class="ref-meta">${r.author || ''}${r.author && r.year ? ' · ' : ''}${r.year || ''}</div>
        ${r.url ? `<div style="font-size:11px;color:var(--blue2);margin-top:3px;font-family:'JetBrains Mono',monospace;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.url}</div>` : ''}
        ${r.note ? `<div class="ref-note">${r.note}</div>` : ''}
        <div style="margin-top:8px">${r.tags.map(t => `<span class="note-tag" style="background:rgba(124,58,237,0.15);color:var(--purple2);border:1px solid rgba(124,58,237,0.3)">${t}</span>`).join('')}</div>
      </div>
    `).join('') : `<div class="empty-state"><i class="ti ti-books"></i><p>Tidak ada referensi ditemukan</p></div>`}
  `;

  c.querySelector('#ref-search')?.addEventListener('input', e => {
    refSearch = e.target.value;
    renderReferensi(c);
  });
  c.querySelectorAll('[data-tag]').forEach(btn => {
    btn.addEventListener('click', () => { refTagFilter = btn.dataset.tag; renderReferensi(c); });
  });
  c.querySelectorAll('[data-rid]').forEach(el => {
    el.addEventListener('click', () => openRefModal(el.dataset.rid));
  });
}

// ── QUICK NOTES ───────────────────────────────────────────────
let noteSearch = '';

export function renderNotes(c) {
  setTopbarAction(`<button id="btn-new-note"><i class="ti ti-plus"></i> Quick Note</button>`);
  document.getElementById('btn-new-note')?.addEventListener('click', openQuickNote);

  const filtered = state.notes.filter(n => {
    if (!noteSearch) return true;
    const q = noteSearch.toLowerCase();
    return n.title.toLowerCase().includes(q)
        || n.body.toLowerCase().includes(q)
        || n.tags.join(' ').toLowerCase().includes(q);
  });

  c.innerHTML = `
    <div class="search-wrap">
      <i class="ti ti-search search-icon"></i>
      <input class="search-box" id="note-search" placeholder="Cari note..." value="${noteSearch}">
    </div>
    ${filtered.length ? filtered.map(n => `
      <div class="note-card" style="border-left-color:${n.color}">
        <div style="display:flex;align-items:start;justify-content:space-between">
          <div class="note-title">${n.title || 'Tanpa judul'}</div>
          <button class="delete-btn" data-nid="${n.id}"><i class="ti ti-trash"></i></button>
        </div>
        <div class="note-body">${n.body}</div>
        <div class="note-footer">
          <div>${n.tags.map(t => `<span class="note-tag" style="background:${n.color}22;color:${n.color};border:1px solid ${n.color}44">${t}</span>`).join('')}</div>
          <div class="note-time">${n.date}</div>
        </div>
      </div>
    `).join('') : `<div class="empty-state"><i class="ti ti-note"></i><p>Belum ada quick note</p></div>`}
  `;

  c.querySelector('#note-search')?.addEventListener('input', e => {
    noteSearch = e.target.value;
    renderNotes(c);
  });
  c.querySelectorAll('.delete-btn[data-nid]').forEach(btn => {
    btn.addEventListener('click', async () => {
      state.notes = state.notes.filter(n => n.id !== btn.dataset.nid);
      await persist('notes');
      renderNotes(c);
    });
  });
}

// ── IGLPIS ────────────────────────────────────────────────────
let iglpisFilter = 'all';

export function renderIglpis(c) {
  setTopbarAction(`<button id="btn-new-ig"><i class="ti ti-plus"></i> Tambah Komponen</button>`);
  document.getElementById('btn-new-ig')?.addEventListener('click', () => openIglpisModal());

  const total   = state.iglpis.length;
  const done    = state.iglpis.filter(x => x.status === 'selesai').length;
  const riset   = state.iglpis.filter(x => x.status === 'riset').length;
  const working = state.iglpis.filter(x => x.status === 'dikerjakan' || x.status === 'testing').length;
  const pct     = total ? Math.round(done / total * 100) : 0;

  const filterOpts = [
    { key: 'all',        label: `Semua (${total})` },
    { key: 'belum',      label: `Belum Mulai (${total - done - riset - working})` },
    { key: 'riset',      label: `Riset (${riset})` },
    { key: 'dikerjakan', label: `Dikerjakan / Testing (${working})` },
    { key: 'selesai',    label: `Selesai (${done})` },
  ];

  const phases = groupByPhase(state.iglpis);

  c.innerHTML = `
    <div class="overall-progress">
      <div class="progress-label">Progres Implementasi</div>
      <div style="display:flex;align-items:flex-end;justify-content:space-between">
        <div class="progress-pct">${pct}%</div>
        <div class="progress-meta">${done}/${total} komponen selesai</div>
      </div>
      <div class="progress-bar-track" style="margin-top:12px">
        <div class="progress-bar-fill" style="width:${pct}%"></div>
      </div>
    </div>

    <div class="iglpis-stats">
      <div class="stat-card"><div class="stat-value" style="color:var(--text3)">${total - done - riset - working}</div><div class="stat-label">Belum Mulai</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--amber2)">${riset}</div><div class="stat-label">Riset</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--blue2)">${working}</div><div class="stat-label">Dikerjakan / Testing</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--green2)">${done}</div><div class="stat-label">Selesai</div></div>
    </div>

    <div class="filter-tabs">
      ${filterOpts.map(f => `<button class="filter-tab ${iglpisFilter === f.key ? 'active' : ''}" data-filter="${f.key}">${f.label}</button>`).join('')}
    </div>

    ${phases.map(ph => {
      const items = iglpisFilter === 'all' ? ph.items : ph.items.filter(x => {
        if (iglpisFilter === 'dikerjakan') return x.status === 'dikerjakan' || x.status === 'testing';
        return x.status === iglpisFilter;
      });
      if (!items.length && iglpisFilter !== 'all') return '';
      const phDone = ph.items.filter(x => x.status === 'selesai').length;
      const phPct  = ph.items.length ? Math.round(phDone / ph.items.length * 100) : 0;

      return `
        <div class="phase-block" id="ph-${ph.num}">
          <div class="phase-header">
            <div style="display:flex;align-items:center;gap:8px">
              <i class="ti ti-chevron-down chevron" style="font-size:14px;color:var(--text3)"></i>
              <span class="phase-title">${ph.name}</span>
            </div>
            <div class="phase-meta">
              <span class="phase-progress">${phDone}/${ph.items.length} selesai</span>
              <span class="phase-pct">${phPct}%</span>
            </div>
          </div>
          <div class="phase-progress-bar">
            <div class="phase-progress-fill" style="width:${phPct}%"></div>
          </div>
          <div class="component-list">
            ${items.map(comp => {
              const dotCls = { belum: 'dot-belum', riset: 'dot-riset', dikerjakan: 'dot-dikerjakan', testing: 'dot-testing', selesai: 'dot-selesai' }[comp.status] || 'dot-belum';
              return `
                <div class="component-item">
                  <div class="component-dot ${dotCls}"></div>
                  <div class="component-info">
                    <div class="component-id">${comp.id}</div>
                    <div class="component-name">${comp.title}</div>
                    <div class="component-desc">${comp.desc}</div>
                    <div class="component-algos">
                      ${comp.algos.map(a => `<span class="algo-tag">${a}</span>`).join('')}
                      ${comp.llm ? '<span class="llm-badge">LLM</span>' : ''}
                    </div>
                    ${comp.note ? `<div class="comp-note-view">${comp.note}</div>` : ''}
                  </div>
                  <div class="component-actions">
                    <select class="status-select" data-cid="${comp.id}">
                      <option value="belum"      ${comp.status === 'belum'      ? 'selected' : ''}>Belum Mulai</option>
                      <option value="riset"      ${comp.status === 'riset'      ? 'selected' : ''}>Riset</option>
                      <option value="dikerjakan" ${comp.status === 'dikerjakan' ? 'selected' : ''}>Dikerjakan</option>
                      <option value="testing"    ${comp.status === 'testing'    ? 'selected' : ''}>Testing</option>
                      <option value="selesai"    ${comp.status === 'selesai'    ? 'selected' : ''}>Selesai</option>
                    </select>
                    <button class="icon-btn" data-note-cid="${comp.id}" title="Catatan"><i class="ti ti-note"></i></button>
                    <button class="icon-btn" data-edit-cid="${comp.id}" title="Edit"><i class="ti ti-pencil"></i></button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;

  // filter tabs
  c.querySelectorAll('[data-filter]').forEach(btn => {
    btn.addEventListener('click', () => { iglpisFilter = btn.dataset.filter; renderIglpis(c); });
  });

  // phase collapse
  c.querySelectorAll('.phase-header').forEach(header => {
    header.addEventListener('click', () => header.closest('.phase-block').classList.toggle('phase-collapsed'));
  });

  // status select inline
  c.querySelectorAll('.status-select[data-cid]').forEach(sel => {
    sel.addEventListener('change', async () => {
      const comp = state.iglpis.find(x => x.id === sel.dataset.cid);
      if (comp) { comp.status = sel.value; await persist('iglpis'); renderIglpis(c); }
    });
  });

  // note button
  c.querySelectorAll('[data-note-cid]').forEach(btn => {
    btn.addEventListener('click', () => openCompNote(btn.dataset.noteCid));
  });

  // edit button
  c.querySelectorAll('[data-edit-cid]').forEach(btn => {
    btn.addEventListener('click', () => openIglpisModal(btn.dataset.editCid));
  });
}
