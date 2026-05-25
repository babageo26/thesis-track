// ============================================================
//  state.js — App state backed by Firebase Firestore
//  ThesisTrack · IGLPIS
// ============================================================
//
//  Alur data:
//  1. Boot → onAuthChange → user login → initFirebaseState()
//  2. initFirebaseState() → seed data jika kosong → subscribe realtime
//  3. Setiap perubahan Firestore → callback → state diupdate → render()
//  4. Setiap save (modals.js) → fsSet/fsDelete → Firestore update →
//     realtime listener terpanggil → UI auto-refresh
// ============================================================

import { fsSubscribe, fsSet, fsDelete,
         fsGetAll, seedIfEmpty }              from './firebase.js';
import { DEFAULT_IGLPIS, DEFAULT_MILESTONES,
         DEFAULT_JURNAL, DEFAULT_REFS,
         DEFAULT_NOTES }                      from './db.js';

// ── State object ─────────────────────────────────────────────
export const state = {
  iglpis:     [],
  milestones: [],
  jurnal:     [],
  refs:       [],
  notes:      [],
  user:       null,     // Firebase User object
  ready:      false,    // true setelah semua collection selesai load
};

// Callback dipanggil render() setelah state berubah
let _renderCallback = null;
export function setRenderCallback(fn) { _renderCallback = fn; }

function triggerRender() {
  if (_renderCallback) _renderCallback();
}

// Unsubscribe functions (untuk cleanup saat logout)
const _unsubs = [];

// ── Collections yang dikelola ─────────────────────────────────
const COLLECTIONS = ['iglpis', 'milestones', 'jurnal', 'refs', 'notes'];

const DEFAULTS = {
  iglpis:     DEFAULT_IGLPIS,
  milestones: DEFAULT_MILESTONES,
  jurnal:     DEFAULT_JURNAL,
  refs:       DEFAULT_REFS,
  notes:      DEFAULT_NOTES,
};

// ── Init state dari Firestore ─────────────────────────────────
export async function initFirebaseState() {
  // 1. Seed data default jika collection kosong (pertama kali login)
  for (const col of COLLECTIONS) {
    await seedIfEmpty(col, DEFAULTS[col]);
  }

  // 2. Subscribe realtime ke semua collection
  //    Setiap perubahan Firestore langsung update state + re-render
  let loadedCount = 0;

  for (const col of COLLECTIONS) {
    const unsub = fsSubscribe(col, (items) => {
      state[col] = items;
      loadedCount++;

      // Setelah semua collection pertama kali loaded, set ready
      if (loadedCount >= COLLECTIONS.length && !state.ready) {
        state.ready = true;
        document.getElementById('loading-screen').style.display = 'none';
      }

      // Re-render setiap ada update
      if (state.ready) triggerRender();
    });
    _unsubs.push(unsub);
  }
}

// ── Cleanup saat logout ───────────────────────────────────────
export function cleanupState() {
  _unsubs.forEach(unsub => unsub());
  _unsubs.length = 0;
  COLLECTIONS.forEach(col => { state[col] = []; });
  state.user  = null;
  state.ready = false;
}

// ── Persist helpers (dipanggil dari modals.js) ────────────────
//
//  Berbeda dengan versi localStorage, di sini persist()
//  menerima ITEM tunggal, bukan seluruh array.
//  Ini lebih efisien untuk Firestore (hanya tulis 1 dokumen).

/**
 * Simpan satu item ke Firestore.
 * @param {string} col   - nama collection
 * @param {object} item  - item dengan field 'id'
 */
export async function persistSet(col, item) {
  await fsSet(col, item);
  // Realtime listener akan otomatis update state + render
}

/**
 * Hapus satu item dari Firestore.
 * @param {string} col - nama collection
 * @param {string} id  - id item
 */
export async function persistDelete(col, id) {
  await fsDelete(col, id);
  // Realtime listener akan otomatis update state + render
}
