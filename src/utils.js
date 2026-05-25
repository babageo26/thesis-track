// ============================================================
//  utils.js — Shared helpers
// ============================================================

export function today() {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function daysLeft(dateStr) {
  const d   = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((d - now) / 86_400_000);
}

export function deadlineLabel(dateStr) {
  const dl = daysLeft(dateStr);
  if (dl < 0)  return { cls: 'deadline-late',  text: `${Math.abs(dl)}h telat` };
  if (dl === 0) return { cls: 'deadline-late', text: 'Hari ini!' };
  if (dl <= 3)  return { cls: 'deadline-soon', text: `${dl}h lagi` };
  return           { cls: 'deadline-ok',   text: `${dl}h lagi` };
}

export function journalIcon(title) {
  const t = title.toLowerCase();
  if (t.includes('debug') || t.includes('error') || t.includes('bug')) return '🐛';
  if (t.includes('review') || t.includes('baca') || t.includes('paper')) return '📖';
  if (t.includes('ide') || t.includes('idea')) return '💡';
  return '⚡';
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function overallProgress(milestones) {
  if (!milestones.length) return 0;
  return Math.round(milestones.reduce((a, m) => a + m.progress, 0) / milestones.length);
}

/** Group IGLPIS components by phase, sorted by phaseNum */
export function groupByPhase(iglpis) {
  const map = {};
  iglpis.forEach(c => {
    if (!map[c.phase]) map[c.phase] = { name: c.phase, num: c.phaseNum, items: [] };
    map[c.phase].items.push(c);
  });
  return Object.values(map).sort((a, b) => a.num - b.num);
}
