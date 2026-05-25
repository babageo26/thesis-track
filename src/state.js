// ============================================================
//  state.js — Reactive application state
// ============================================================

import { loadAll, saveKey } from './db.js';

export const state = {
  iglpis:     [],
  milestones: [],
  jurnal:     [],
  refs:       [],
  notes:      [],
};

export function initState() {
  const data = loadAll();
  Object.assign(state, data);
}

export async function persist(key) {
  saveKey(key, state[key]);
}
