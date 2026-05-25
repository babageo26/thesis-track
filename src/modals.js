// ============================================================
//  modals.js — Modal open/close + form helpers
// ============================================================

import { state, persist } from './state.js';
import { uid, today }     from './utils.js';
import { render }         from './main.js';

// ── Tag helpers ──────────────────────────────────────────────
const tempTags  = { qn: [], ref: [] };
let   tempAlgos = [];

export function getTempTags(ctx)  { return tempTags[ctx]; }
export function getTempAlgos()    { return tempAlgos; }

function renderTagsUI(ctx) {
  const wrapId  = ctx === 'qn' ? 'qn-tags-wrap'  : 'ref-tags-wrap';
  const inputId = ctx === 'qn' ? 'qn-tag-input'  : 'ref-tag-input';
  const wrap  = document.getElementById(wrapId);
  const input = document.getElementById(inputId);
  if (!wrap || !input) return;

  // remove all chips (keep the input)
  [...wrap.querySelectorAll('.tag-chip')].forEach(c => c.remove());

  tempTags[ctx].forEach(tag => {
    const chip = document.createElement('div');
    chip.className = 'tag-chip';
    chip.innerHTML = `${tag} <span class="remove-tag" data-tag="${tag}" data-ctx="${ctx}">×</span>`;
    wrap.insertBefore(chip, input);
  });

  wrap.querySelectorAll('.remove-tag').forEach(el => {
    el.addEventListener('click', () => {
      tempTags[ctx] = tempTags[ctx].filter(t => t !== el.dataset.tag);
      renderTagsUI(ctx);
    });
  });
}

function renderAlgosUI() {
  const wrap  = document.getElementById('ig-algos-wrap');
  const input = document.getElementById('ig-algo-input');
  if (!wrap || !input) return;
  [...wrap.querySelectorAll('.algo-chip')].forEach(c => c.remove());
  tempAlgos.forEach(algo => {
    const chip = document.createElement('div');
    chip.className = 'algo-chip';
    chip.innerHTML = `${algo} <button data-algo="${algo}">×</button>`;
    chip.querySelector('button').addEventListener('click', () => {
      tempAlgos = tempAlgos.filter(a => a !== algo);
      renderAlgosUI();
    });
    wrap.insertBefore(chip, input);
  });
}

// ── Open / close ─────────────────────────────────────────────
export function openModal(id)  { document.getElementById(id)?.classList.add('open'); }
export function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }

// backdrop click closes
export function initBackdrops() {
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
}

// ── Tag key handler ───────────────────────────────────────────
export function handleTagKey(e, ctx) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault();
    const val = e.target.value.trim().replace(',', '');
    if (val && !tempTags[ctx].includes(val)) {
      tempTags[ctx].push(val);
      renderTagsUI(ctx);
    }
    e.target.value = '';
  }
}

// ── Algo key handler ──────────────────────────────────────────
export function handleAlgoKey(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    const val = e.target.value.trim();
    if (val && !tempAlgos.includes(val)) {
      tempAlgos.push(val);
      renderAlgosUI();
    }
    e.target.value = '';
  }
}

// ── Color selector ────────────────────────────────────────────
export function selectColor(el, ctx) {
  el.closest('.color-dots').querySelectorAll('.color-dot').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
}

function selectedColor(groupId) {
  return document.querySelector(`#${groupId} .color-dot.selected`)?.dataset.color || '#7C3AED';
}

// ── Quick Note ────────────────────────────────────────────────
export function openQuickNote() {
  tempTags.qn = [];
  document.getElementById('qn-title').value = '';
  document.getElementById('qn-body').value  = '';
  renderTagsUI('qn');
  document.querySelectorAll('#qn-colors .color-dot').forEach((d, i) => d.classList.toggle('selected', i === 0));
  openModal('modal-quicknote');
}

export async function saveQuickNote() {
  const body = document.getElementById('qn-body').value.trim();
  if (!body) return;
  state.notes.unshift({
    id:    uid(),
    title: document.getElementById('qn-title').value.trim(),
    body,
    tags:  [...tempTags.qn],
    color: selectedColor('qn-colors'),
    date:  today(),
  });
  await persist('notes');
  closeModal('modal-quicknote');
  render();
}

// ── Jurnal ────────────────────────────────────────────────────
let editingJurnal = null;

export function openJurnalModal(id) {
  editingJurnal = id || null;
  const j = id ? state.jurnal.find(x => x.id === id) : null;
  document.getElementById('jurnal-modal-title').textContent = j ? 'Edit Jurnal' : 'Jurnal Baru';
  document.getElementById('j-title').value = j?.title || '';
  document.getElementById('j-date').value  = j?.date  || today();
  document.getElementById('j-body').value  = j?.body  || '';
  document.getElementById('j-delete-btn').style.display = j ? 'block' : 'none';
  openModal('modal-jurnal');
}

export async function saveJurnal() {
  const title = document.getElementById('j-title').value.trim();
  if (!title) return;
  const body  = document.getElementById('j-body').value.trim();
  const date  = document.getElementById('j-date').value;
  if (editingJurnal) {
    const j = state.jurnal.find(x => x.id === editingJurnal);
    if (j) Object.assign(j, { title, body, date });
  } else {
    state.jurnal.unshift({ id: uid(), title, body, date });
  }
  await persist('jurnal');
  closeModal('modal-jurnal');
  render();
}

export async function deleteJurnal() {
  if (!editingJurnal) return;
  state.jurnal = state.jurnal.filter(x => x.id !== editingJurnal);
  await persist('jurnal');
  closeModal('modal-jurnal');
  render();
}

// ── Milestone ─────────────────────────────────────────────────
let editingMilestone = null;

export function openMilestoneModal(id) {
  editingMilestone = id || null;
  const m = id ? state.milestones.find(x => x.id === id) : null;
  document.getElementById('ms-modal-title').textContent = m ? 'Edit Milestone' : 'Milestone Baru';
  document.getElementById('ms-title').value    = m?.title    || '';
  document.getElementById('ms-desc').value     = m?.desc     || '';
  document.getElementById('ms-date').value     = m?.deadline || today();
  document.getElementById('ms-progress').value = m?.progress ?? 0;
  const pctEl = document.getElementById('ms-pct-label');
  if (pctEl) pctEl.textContent = (m?.progress ?? 0) + '%';
  document.getElementById('ms-pct-show').textContent = (m?.progress ?? 0) + '%';
  document.getElementById('ms-delete-btn').style.display = m ? 'block' : 'none';
  document.querySelectorAll('#ms-colors .color-dot').forEach(d => {
    d.classList.toggle('selected', d.dataset.color === (m?.color || '#7C3AED'));
  });
  const range = document.getElementById('ms-progress');
  range.oninput = function () {
    document.getElementById('ms-pct-label').textContent  = this.value + '%';
    document.getElementById('ms-pct-show').textContent   = this.value + '%';
  };
  openModal('modal-milestone');
}

export async function saveMilestone() {
  const title = document.getElementById('ms-title').value.trim();
  if (!title) return;
  const entry = {
    title,
    desc:     document.getElementById('ms-desc').value.trim(),
    deadline: document.getElementById('ms-date').value,
    progress: parseInt(document.getElementById('ms-progress').value),
    color:    selectedColor('ms-colors'),
  };
  if (editingMilestone) {
    const m = state.milestones.find(x => x.id === editingMilestone);
    if (m) Object.assign(m, entry);
  } else {
    state.milestones.push({ id: uid(), ...entry });
  }
  await persist('milestones');
  closeModal('modal-milestone');
  render();
}

export async function deleteMilestone() {
  if (!editingMilestone) return;
  state.milestones = state.milestones.filter(x => x.id !== editingMilestone);
  await persist('milestones');
  closeModal('modal-milestone');
  render();
}

// ── Referensi ─────────────────────────────────────────────────
let editingRef = null;

export function openRefModal(id) {
  editingRef = id || null;
  const r = id ? state.refs.find(x => x.id === id) : null;
  document.getElementById('ref-modal-title').textContent = r ? 'Edit Referensi' : 'Referensi Baru';
  document.getElementById('ref-title').value  = r?.title  || '';
  document.getElementById('ref-author').value = r?.author || '';
  document.getElementById('ref-year').value   = r?.year   || '';
  document.getElementById('ref-url').value    = r?.url    || '';
  document.getElementById('ref-note').value   = r?.note   || '';
  document.getElementById('ref-delete-btn').style.display = r ? 'block' : 'none';
  tempTags.ref = r ? [...r.tags] : [];
  renderTagsUI('ref');
  openModal('modal-referensi');
}

export async function saveReferensi() {
  const title = document.getElementById('ref-title').value.trim();
  if (!title) return;
  const entry = {
    title,
    author: document.getElementById('ref-author').value.trim(),
    year:   document.getElementById('ref-year').value,
    url:    document.getElementById('ref-url').value.trim(),
    note:   document.getElementById('ref-note').value.trim(),
    tags:   [...tempTags.ref],
  };
  if (editingRef) {
    const r = state.refs.find(x => x.id === editingRef);
    if (r) Object.assign(r, entry);
  } else {
    state.refs.push({ id: uid(), ...entry });
  }
  await persist('refs');
  closeModal('modal-referensi');
  render();
}

export async function deleteReferensi() {
  if (!editingRef) return;
  state.refs = state.refs.filter(x => x.id !== editingRef);
  await persist('refs');
  closeModal('modal-referensi');
  render();
}

// ── IGLPIS component ──────────────────────────────────────────
let editingIglpis = null;

export function openIglpisModal(id) {
  editingIglpis = id || null;
  const c = id ? state.iglpis.find(x => x.id === id) : null;
  document.getElementById('ig-modal-title').textContent  = c ? 'Edit Komponen' : 'Komponen Baru';
  document.getElementById('ig-save-btn').textContent     = c ? 'Simpan'        : 'Tambah';
  document.getElementById('ig-phase').value     = c?.phase    || '';
  document.getElementById('ig-phase-num').value = c?.phaseNum || '';
  document.getElementById('ig-id').value        = c?.id       || '';
  document.getElementById('ig-title').value     = c?.title    || '';
  document.getElementById('ig-desc').value      = c?.desc     || '';
  document.getElementById('ig-status').value    = c?.status   || 'belum';
  document.getElementById('ig-llm').checked     = c?.llm      || false;
  document.getElementById('ig-note').value      = c?.note     || '';
  document.getElementById('ig-delete-btn').style.display = c ? 'block' : 'none';
  tempAlgos = c ? [...c.algos] : [];
  renderAlgosUI();
  openModal('modal-iglpis');
}

export async function saveIglpis() {
  const title = document.getElementById('ig-title').value.trim();
  const phase = document.getElementById('ig-phase').value.trim();
  if (!title || !phase) return;
  const newId = document.getElementById('ig-id').value.trim() || uid();
  const entry = {
    id:       newId,
    phase,
    phaseNum: parseInt(document.getElementById('ig-phase-num').value) || 99,
    title,
    desc:     document.getElementById('ig-desc').value.trim(),
    algos:    [...tempAlgos],
    status:   document.getElementById('ig-status').value,
    llm:      document.getElementById('ig-llm').checked,
    note:     document.getElementById('ig-note').value.trim(),
  };
  if (editingIglpis) {
    const idx = state.iglpis.findIndex(x => x.id === editingIglpis);
    if (idx > -1) state.iglpis[idx] = entry;
  } else {
    state.iglpis.push(entry);
  }
  await persist('iglpis');
  closeModal('modal-iglpis');
  render();
}

export async function deleteIglpis() {
  if (!editingIglpis) return;
  state.iglpis = state.iglpis.filter(x => x.id !== editingIglpis);
  await persist('iglpis');
  closeModal('modal-iglpis');
  render();
}

// ── Component note (quick note modal on IGLPIS item) ──────────
let compNoteTarget = null;

export function openCompNote(id) {
  compNoteTarget = id;
  const c = state.iglpis.find(x => x.id === id);
  document.getElementById('cn-modal-title').textContent = c?.title || 'Catatan';
  document.getElementById('cn-body').value = c?.note || '';
  openModal('modal-comp-note');
}

export async function saveCompNote() {
  const c = state.iglpis.find(x => x.id === compNoteTarget);
  if (c) {
    c.note = document.getElementById('cn-body').value.trim();
    await persist('iglpis');
  }
  closeModal('modal-comp-note');
  render();
}
