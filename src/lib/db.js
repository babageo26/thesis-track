/**
 * ============================================================
 * THESIS TRACK — DATABASE SCHEMA
 * Engine  : Dexie.js (IndexedDB wrapper, works offline)
 * File    : src/lib/db.js
 * ============================================================
 *
 * TABLES
 * ──────
 * milestones   — Bab / tahap tesis dengan deadline & progres
 * jurnal       — Entri jurnal riset harian
 * refs         — Referensi / paper / buku
 * notes        — Quick notes / ide cepat
 * iglpis       — Komponen algoritma IGLPIS framework
 *
 * INDEXEDDB LIMITS (browser)
 * ──────────────────────────
 * Ukuran   : tidak terbatas (bergantung disk)
 * Sync     : tidak otomatis antar device
 *            → Untuk sync Mac ↔ iPhone gunakan
 *              backend (Supabase / Firebase) di masa depan
 *
 * UPGRADE PATH
 * ────────────
 * Tambah versi baru di db.version(N).stores({...}) jika
 * kamu menambah kolom atau tabel baru, jangan edit versi lama.
 * ============================================================
 */

import Dexie from 'dexie'

export const db = new Dexie('ThesisTrackDB')

// ── v1 — skema awal ──────────────────────────────────────────
db.version(1).stores({
  /**
   * milestones
   * id        : string  — primary key (auto uuid)
   * title     : string  — nama bab / tahap
   * desc      : string  — deskripsi opsional
   * deadline  : string  — ISO date "YYYY-MM-DD"
   * progress  : number  — 0–100 persen
   * color     : string  — hex warna (#7C3AED)
   * createdAt : number  — Date.now()
   * updatedAt : number  — Date.now()
   */
  milestones: '++id, deadline, progress, createdAt',

  /**
   * jurnal
   * id        : string  — primary key
   * title     : string  — judul entri
   * body      : string  — isi catatan (plain text / markdown)
   * date      : string  — "YYYY-MM-DD"
   * createdAt : number
   * updatedAt : number
   */
  jurnal: '++id, date, createdAt',

  /**
   * refs  (referensi)
   * id     : string
   * title  : string  — judul paper / buku
   * author : string  — nama penulis
   * year   : number  — tahun terbit
   * url    : string  — DOI / URL
   * note   : string  — catatan singkat
   * tags   : string  — JSON array serialized ["bayesian","vision"]
   * createdAt : number
   */
  refs: '++id, author, year, createdAt',

  /**
   * notes  (quick notes)
   * id       : string
   * title    : string
   * body     : string
   * tags     : string  — JSON array serialized
   * color    : string  — hex
   * createdAt: number
   */
  notes: '++id, createdAt',

  /**
   * iglpis  (komponen algoritma IGLPIS framework)
   * id        : string  — bisa manual "4.5", "1.0", dsb.
   * phase     : string  — "Phase 4 — SU Page 2 Spatial Pipeline"
   * phaseNum  : number  — untuk sorting (1, 2, 3...)
   * title     : string  — nama komponen
   * desc      : string  — deskripsi singkat
   * algos     : string  — JSON array ["Canny Edge","SAM"]
   * status    : string  — "belum"|"riset"|"dikerjakan"|"testing"|"selesai"
   * llm       : number  — 0 atau 1 (boolean di IndexedDB)
   * note      : string  — catatan implementasi / hambatan
   * createdAt : number
   * updatedAt : number
   */
  iglpis: '++id, phaseNum, status, llm, createdAt',
})

// ── helper: serialize / deserialize array fields ─────────────
export const toArr = (val) => {
  if (Array.isArray(val)) return val
  try { return JSON.parse(val) } catch { return [] }
}
export const toJson = (arr) => JSON.stringify(Array.isArray(arr) ? arr : [])

// ── seed data: dijalankan sekali saat DB kosong ───────────────
export async function seedIfEmpty() {
  const count = await db.iglpis.count()
  if (count > 0) return   // sudah ada data, skip

  const now = Date.now()

  // ── milestones ──────────────────────────────────────────────
  await db.milestones.bulkAdd([
    { title: 'Bab 2 — Tinjauan Pustaka',        desc: '',                         deadline: '2026-05-20', progress: 65, color: '#7C3AED', createdAt: now, updatedAt: now },
    { title: 'Bab 3 — Metodologi',              desc: '',                         deadline: '2026-05-22', progress: 20, color: '#2563EB', createdAt: now, updatedAt: now },
    { title: 'Bab 4 — Implementasi & Eksperimen', desc: '',                       deadline: '2026-05-25', progress: 5,  color: '#16A34A', createdAt: now, updatedAt: now },
    { title: 'Bab 5 — Kesimpulan',              desc: '',                         deadline: '2026-06-10', progress: 0,  color: '#D97706', createdAt: now, updatedAt: now },
    { title: 'Sidang Tesis',                    desc: 'Presentasi akhir tesis',   deadline: '2026-07-01', progress: 0,  color: '#DC2626', createdAt: now, updatedAt: now },
    { title: 'Revisi & Pengumpulan',            desc: '',                         deadline: '2026-07-15', progress: 0,  color: '#7C3AED', createdAt: now, updatedAt: now },
  ])

  // ── jurnal ──────────────────────────────────────────────────
  await db.jurnal.bulkAdd([
    { title: 'Mulai eksplorasi dataset BERT',            body: 'Mengeksplorasi dataset untuk fine-tuning BERT. Mencoba beberapa preprocessing approach.', date: '2026-05-20', createdAt: now, updatedAt: now },
    { title: 'Debugging model — loss tidak konvergen',   body: 'Loss masih tidak konvergen setelah 10 epoch. Perlu cek learning rate scheduler dan batch size.', date: '2026-05-21', createdAt: now, updatedAt: now },
    { title: 'Review paper IGLPIS framework',            body: 'Membaca ulang full_framework.pdf dan memetakan setiap fase ke task implementasi konkret.', date: '2026-05-22', createdAt: now, updatedAt: now },
  ])

  // ── refs ────────────────────────────────────────────────────
  await db.refs.bulkAdd([
    { title: 'Segment Anything Model (SAM)',                   author: 'Kirillov et al.',  year: 2023, url: 'https://arxiv.org/abs/2304.02643', note: 'Foundation model untuk segmentasi interaktif. Relevan untuk Phase 4.5', tags: toJson(['segmentation','vision']),         createdAt: now },
    { title: 'Bayesian Spatial Inference for Cadastral Systems', author: 'Smith et al.',   year: 2021, url: '',                                  note: 'Pendekatan Bayesian untuk inferensi posisi kadaster berbasis evidence.',  tags: toJson(['bayesian','cadastral']),          createdAt: now },
    { title: 'Gaussian Mixture Models for Spatial Prior',       author: 'Bishop, C.',      year: 2006, url: '',                                  note: 'Reference klasik untuk GMM, digunakan di Phase 7 prior precomputation.',  tags: toJson(['GMM','prior']),                   createdAt: now },
  ])

  // ── notes ───────────────────────────────────────────────────
  await db.notes.bulkAdd([
    { title: 'Ide: Hybrid attention mechanism', body: 'Coba gabungkan spatial attention dengan semantic attention untuk likelihood computation', tags: toJson(['ide','algoritma']), color: '#7C3AED', createdAt: now },
    { title: 'TODO: Cek GPU quota',             body: 'Pastikan quota GPU cukup untuk SAM inference batch',                                      tags: toJson(['todo']),            color: '#D97706', createdAt: now },
    { title: 'Formula F1-score weighted',       body: 'F1 = 2 * (precision * recall) / (precision + recall) — gunakan weighted untuk kelas imbalance', tags: toJson(['formula']), color: '#2563EB', createdAt: now },
  ])

  // ── iglpis ──────────────────────────────────────────────────
  // id di-override manual supaya ID tetap "1.0", "4.5", dsb.
  // Dexie ++ hanya berlaku jika id tidak disediakan.
  // Solusi: gunakan put() dengan id manual.
  const components = [
    { id: '1.0',  phase: 'Phase 1 — Upload & Job Management',         phaseNum: 1,  title: 'Upload & Async Job Management',        desc: 'User upload dokumen, backend buat job_id, trigger async worker',                                algos: toJson(['Async queue','Job state machine']),                                                              status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.1',  phase: 'Phase 2 — Document Intelligence',           phaseNum: 2,  title: 'Page Classification',                   desc: 'Klasifikasi halaman SU Page 1, SU Page 2, Buku Tanah',                                          algos: toJson(['Layout classifier','Keyword detection']),                                                        status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.2',  phase: 'Phase 3 — SU Page 1 Textual Pipeline',      phaseNum: 3,  title: 'OCR Extraction SU Page 1',              desc: 'Ekstraksi teks raw dari SU halaman pertama',                                                    algos: toJson(['Vision OCR model']),                                                                             status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.3',  phase: 'Phase 3 — SU Page 1 Textual Pipeline',      phaseNum: 3,  title: 'Metadata Structured Extraction',         desc: 'Ekstraksi field terstruktur: nomor SU, desa, luas, tahun, hak',                                 algos: toJson(['Prompt-based JSON extraction']),                                                                 status: 'belum', llm: 1, note: '', createdAt: now, updatedAt: now },
    { id: '4.4',  phase: 'Phase 4 — SU Page 2 Spatial Pipeline',      phaseNum: 4,  title: 'Image Enhancement',                     desc: 'Gamma correction, contrast adjustment, histogram normalization',                                 algos: toJson(['Gamma correction','Contrast adjustment','Histogram normalization']),                              status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.5',  phase: 'Phase 4 — SU Page 2 Spatial Pipeline',      phaseNum: 4,  title: 'SAM Segmentation',                      desc: 'Segment Anything Model untuk mask polygon kadaster',                                            algos: toJson(['Segment Anything Model','Seed-based segmentation']),                                             status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.6',  phase: 'Phase 4 — SU Page 2 Spatial Pipeline',      phaseNum: 4,  title: 'Contour & Polygon Extraction',          desc: 'Deteksi tepi dan ekstraksi polygon dari hasil SAM',                                             algos: toJson(['Canny Edge Detection','Contour detection','Polygon approximation']),                              status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.7',  phase: 'Phase 4 — SU Page 2 Spatial Pipeline',      phaseNum: 4,  title: 'Geometric Regularization',              desc: 'Simplifikasi geometri, topologi, remove redundan vertices',                                    algos: toJson(['Simplify geometry','Topology preservation']),                                                    status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.8',  phase: 'Phase 4 — SU Page 2 Spatial Pipeline',      phaseNum: 4,  title: 'DPI-Based Scaling',                     desc: 'Konversi pixel ke meter berdasarkan DPI scan',                                                  algos: toJson(['DPI scaling formula']),                                                                          status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.9',  phase: 'Phase 4 — SU Page 2 Spatial Pipeline',      phaseNum: 4,  title: 'Internal Quality Evaluation',           desc: 'Skor reliabilitas sketch berdasarkan area diff & presisi',                                      algos: toJson(['Area difference','Intersection check','Precision/Recall proxy']),                                status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.10', phase: 'Phase 5 — Buku Tanah Pipeline',              phaseNum: 5,  title: 'OCR Extraction Buku Tanah',             desc: 'Ekstraksi teks dari halaman Buku Tanah',                                                        algos: toJson(['Vision OCR model']),                                                                             status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.11', phase: 'Phase 5 — Buku Tanah Pipeline',              phaseNum: 5,  title: 'Boundary Semantic Parsing',             desc: 'Ekstraksi semantik batas: utara sungai, timur jalan desa',                                     algos: toJson(['Prompt-based relation extraction']),                                                             status: 'belum', llm: 1, note: '', createdAt: now, updatedAt: now },
    { id: '6.0',  phase: 'Phase 6 — Constraint Consolidation',        phaseNum: 6,  title: 'Constraint Consolidation',              desc: 'Gabungkan metadata, shape features, reliability score, boundary semantics',                      algos: toJson(['Entity resolution','Synonym normalization']),                                                    status: 'belum', llm: 1, note: '', createdAt: now, updatedAt: now },
    { id: '7.0',  phase: 'Phase 7 — Prior Precomputation',            phaseNum: 7,  title: 'Prior Precomputation (Offline)',        desc: 'KDE dan GMM per desa untuk prior raster',                                                       algos: toJson(['Kernel Density Estimation','Gaussian Mixture Model','Analog block density']),                    status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '8.0',  phase: 'Phase 8 — Local Inference Window',          phaseNum: 8,  title: 'Local Inference Window',               desc: 'Resolve desa polygon, expand bounding box, generate grid 10m',                                  algos: toJson(['Spatial grid generation']),                                                                      status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.12', phase: 'Phase 9 — Bayesian Inference Engine',       phaseNum: 9,  title: 'Likelihood Computation',               desc: 'Hitung AreaLikelihood, BoundaryLikelihood, ShapeLikelihood, OrientationLikelihood per sel grid', algos: toJson(['Probabilistic scoring','Spatial likelihood']),                                                   status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.13', phase: 'Phase 9 — Bayesian Inference Engine',       phaseNum: 9,  title: 'Posterior Computation',                desc: 'Posterior(L) ∝ Prior(L) × Likelihood(L), normalisasi posterior',                                algos: toJson(['Bayesian update','Normalization']),                                                               status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.14', phase: 'Phase 9 — Bayesian Inference Engine',       phaseNum: 9,  title: 'MAP Estimation',                       desc: 'L_MAP = argmax Posterior',                                                                       algos: toJson(['Maximum A Posteriori']),                                                                         status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.15', phase: 'Phase 9 — Bayesian Inference Engine',       phaseNum: 9,  title: 'Credible Region Extraction',           desc: 'Sort grid by posterior, accumulate until α, raster to polygon',                                 algos: toJson(['Credible interval','Raster to vector']),                                                         status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '4.16', phase: 'Phase 9 — Bayesian Inference Engine',       phaseNum: 9,  title: 'Entropy Calculation',                  desc: 'H = -Σ P log P untuk uncertainty visualization',                                               algos: toJson(['Shannon entropy']),                                                                              status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '10.0', phase: 'Phase 10 — Result Storage',                 phaseNum: 10, title: 'Result Storage & Caching',            desc: 'Simpan MAP point, posterior raster, credible region, cache Redis',                              algos: toJson(['Redis caching','GeoJSON storage']),                                                              status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '11.0', phase: 'Phase 11 — Interactive Web Map',            phaseNum: 11, title: 'Interactive Web Map',                 desc: 'Probability heatmap, credible region polygons, MAP marker, layer controls',                      algos: toJson(['Mapbox GL','Deck.gl','WebGL heatmap']),                                                          status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '12.0', phase: 'Phase 12 — Human-in-the-Loop',              phaseNum: 12, title: 'Human-in-the-Loop Correction',        desc: 'Move/remove vertex, rotate polygon, undo, re-run inference',                                   algos: toJson(['Interactive geometry editing','Dynamic re-inference']),                                          status: 'belum', llm: 0, note: '', createdAt: now, updatedAt: now },
    { id: '7.x',  phase: 'Phase 7 — LLM Architecture',                phaseNum: 7,  title: 'LLM as Conversational Orchestrator',   desc: 'Chat-driven UI, LLM narasikan status backend, constraint clarification via chat',              algos: toJson(['Prompt engineering','State machine chat']),                                                      status: 'belum', llm: 1, note: '', createdAt: now, updatedAt: now },
    { id: 'OPT',  phase: 'Optional — Explanation Generation',         phaseNum: 13, title: 'Natural Language Explanation',         desc: 'LLM generate narasi penjelasan hasil Bayesian per klik',                                        algos: toJson(['Narrative generation']),                                                                         status: 'belum', llm: 1, note: '', createdAt: now, updatedAt: now },
  ]

  for (const c of components) {
    await db.iglpis.put(c)
  }
}
