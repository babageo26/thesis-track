// ============================================================
//  db.js — Default data (seed) untuk Firestore
//  ThesisTrack · IGLPIS
// ============================================================
//
//  File ini hanya berisi data default yang akan di-seed ke
//  Firestore pada saat user pertama kali login.
//  Tidak ada localStorage di sini — semua persistence via Firebase.
//
//  FIRESTORE SCHEMA
//  ─────────────────
//  users/{uid}/iglpis/{id}      → IglpisComponent
//  users/{uid}/milestones/{id}  → Milestone
//  users/{uid}/jurnal/{id}      → JurnalEntry
//  users/{uid}/refs/{id}        → Referensi
//  users/{uid}/notes/{id}       → QuickNote
//
// ============================================================

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function today() {
  return new Date().toISOString().split('T')[0];
}

// ── Default IGLPIS (25 komponen dari full_framework.pdf) ──────
export const DEFAULT_IGLPIS = [
  {
    id: '1.0', phase: 'Phase 1 — Upload & Job Management', phaseNum: 1,
    title: 'Upload & Async Job Management',
    desc: 'User upload dokumen, backend buat job_id, trigger async worker',
    algos: ['Async queue', 'Job state machine'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.1', phase: 'Phase 2 — Document Intelligence', phaseNum: 2,
    title: 'Page Classification',
    desc: 'Klasifikasi halaman SU Page 1, SU Page 2, Buku Tanah',
    algos: ['Layout classifier', 'Keyword detection'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.2', phase: 'Phase 3 — SU Page 1 Textual Pipeline', phaseNum: 3,
    title: 'OCR Extraction SU Page 1',
    desc: 'Ekstraksi teks raw dari SU halaman pertama',
    algos: ['Vision OCR model'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.3', phase: 'Phase 3 — SU Page 1 Textual Pipeline', phaseNum: 3,
    title: 'Metadata Structured Extraction',
    desc: 'Ekstraksi field terstruktur: nomor SU, desa, luas, tahun, hak',
    algos: ['Prompt-based JSON extraction'],
    status: 'belum', llm: true, note: ''
  },
  {
    id: '4.4', phase: 'Phase 4 — SU Page 2 Spatial Pipeline', phaseNum: 4,
    title: 'Image Enhancement',
    desc: 'Gamma correction, contrast adjustment, histogram normalization untuk garis kadaster tipis',
    algos: ['Gamma correction', 'Contrast adjustment', 'Histogram normalization'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.5', phase: 'Phase 4 — SU Page 2 Spatial Pipeline', phaseNum: 4,
    title: 'SAM Segmentation',
    desc: 'Segment Anything Model untuk menghasilkan binary mask polygon kadaster',
    algos: ['Segment Anything Model', 'Seed-based segmentation'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.6', phase: 'Phase 4 — SU Page 2 Spatial Pipeline', phaseNum: 4,
    title: 'Contour & Polygon Extraction',
    desc: 'Deteksi tepi dan ekstraksi polygon dari hasil SAM',
    algos: ['Canny Edge Detection', 'Contour detection', 'Polygon approximation'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.7', phase: 'Phase 4 — SU Page 2 Spatial Pipeline', phaseNum: 4,
    title: 'Geometric Regularization',
    desc: 'Simplifikasi geometri, preservasi topologi, remove redundan vertices',
    algos: ['Simplify geometry', 'Topology preservation'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.8', phase: 'Phase 4 — SU Page 2 Spatial Pipeline', phaseNum: 4,
    title: 'DPI-Based Scaling',
    desc: 'Konversi pixel ke meter berdasarkan DPI scan · Scale = DPI / 0.0254',
    algos: ['DPI scaling formula'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.9', phase: 'Phase 4 — SU Page 2 Spatial Pipeline', phaseNum: 4,
    title: 'Internal Quality Evaluation',
    desc: 'Skor reliabilitas sketch: area diff, intersection check, precision/recall proxy',
    algos: ['Area difference', 'Intersection check', 'Precision/Recall proxy'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.10', phase: 'Phase 5 — Buku Tanah Pipeline', phaseNum: 5,
    title: 'OCR Extraction Buku Tanah',
    desc: 'Ekstraksi teks dari halaman Buku Tanah',
    algos: ['Vision OCR model'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.11', phase: 'Phase 5 — Buku Tanah Pipeline', phaseNum: 5,
    title: 'Boundary Semantic Parsing',
    desc: 'Ekstraksi semantik batas: utara sungai, timur jalan desa',
    algos: ['Prompt-based relation extraction'],
    status: 'belum', llm: true, note: ''
  },
  {
    id: '6.0', phase: 'Phase 6 — Constraint Consolidation', phaseNum: 6,
    title: 'Constraint Consolidation',
    desc: 'Gabungkan metadata, shape features, reliability score, boundary semantics → Unified Constraint JSON',
    algos: ['Entity resolution', 'Synonym normalization'],
    status: 'belum', llm: true, note: ''
  },
  {
    id: '7.0', phase: 'Phase 7 — Prior Precomputation', phaseNum: 7,
    title: 'Prior Precomputation (Offline)',
    desc: 'KDE dan GMM per desa untuk prior raster · output: prior_raster_desa.tif',
    algos: ['Kernel Density Estimation', 'Gaussian Mixture Model', 'Analog block density'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '8.0', phase: 'Phase 8 — Local Inference Window', phaseNum: 8,
    title: 'Local Inference Window',
    desc: 'Resolve desa polygon, expand bounding box, generate grid resolusi 10m',
    algos: ['Spatial grid generation'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.12', phase: 'Phase 9 — Bayesian Inference Engine', phaseNum: 9,
    title: 'Likelihood Computation',
    desc: 'Hitung AreaLikelihood, BoundaryLikelihood, ShapeLikelihood, OrientationLikelihood, AnalogLikelihood per grid cell',
    algos: ['Probabilistic scoring', 'Spatial likelihood functions'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.13', phase: 'Phase 9 — Bayesian Inference Engine', phaseNum: 9,
    title: 'Posterior Computation',
    desc: 'Posterior(L) ∝ Prior(L) × Likelihood(L) · normalisasi posterior',
    algos: ['Bayesian update', 'Normalization'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.14', phase: 'Phase 9 — Bayesian Inference Engine', phaseNum: 9,
    title: 'MAP Estimation',
    desc: 'L_MAP = argmax Posterior(L)',
    algos: ['Maximum A Posteriori'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.15', phase: 'Phase 9 — Bayesian Inference Engine', phaseNum: 9,
    title: 'Credible Region Extraction',
    desc: 'Sort grid by posterior desc, accumulate until α (50/75/90/95%), raster to polygon',
    algos: ['Credible interval accumulation', 'Raster to vector'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '4.16', phase: 'Phase 9 — Bayesian Inference Engine', phaseNum: 9,
    title: 'Entropy Calculation',
    desc: 'H = -Σ P log P untuk uncertainty visualization & reliability score',
    algos: ['Shannon entropy'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '10.0', phase: 'Phase 10 — Result Storage', phaseNum: 10,
    title: 'Result Storage & Caching',
    desc: 'Simpan MAP point, posterior raster, credible region polygons · Cache Redis',
    algos: ['Redis caching', 'GeoJSON storage', 'Raster store'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '11.0', phase: 'Phase 11 — Interactive Web Map', phaseNum: 11,
    title: 'Interactive Web Map',
    desc: 'Probability heatmap, credible region polygons, MAP marker, layer controls, confidence slider',
    algos: ['Mapbox GL', 'Deck.gl', 'WebGL heatmap'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '12.0', phase: 'Phase 12 — Human-in-the-Loop', phaseNum: 12,
    title: 'Human-in-the-Loop Correction',
    desc: 'Move/remove vertex, rotate polygon, undo, re-run Bayesian inference dinamis',
    algos: ['Interactive geometry editing', 'Dynamic re-inference'],
    status: 'belum', llm: false, note: ''
  },
  {
    id: '7.x', phase: 'Phase 7 — LLM Orchestration Layer', phaseNum: 7,
    title: 'LLM as Conversational Orchestrator',
    desc: 'Chat-driven UI · LLM narasikan status backend · constraint clarification · what-if simulation',
    algos: ['Prompt engineering', 'State machine chat', 'Async status narration'],
    status: 'belum', llm: true, note: ''
  },
  {
    id: 'OPT', phase: 'Optional — Explanation Generation', phaseNum: 13,
    title: 'Natural Language Explanation',
    desc: 'LLM generate narasi penjelasan hasil Bayesian per klik "Explain Result"',
    algos: ['Narrative generation', 'Evidence summarization'],
    status: 'belum', llm: true, note: ''
  },
];

export const DEFAULT_MILESTONES = [
  { id: 'm1', title: 'Bab 2 — Tinjauan Pustaka',          desc: '', deadline: '2026-05-20', progress: 65, color: '#7C3AED' },
  { id: 'm2', title: 'Bab 3 — Metodologi',                desc: '', deadline: '2026-05-22', progress: 20, color: '#2563EB' },
  { id: 'm3', title: 'Bab 4 — Implementasi & Eksperimen', desc: '', deadline: '2026-05-25', progress: 5,  color: '#16A34A' },
  { id: 'm4', title: 'Bab 5 — Kesimpulan',                desc: '', deadline: '2026-06-10', progress: 0,  color: '#D97706' },
  { id: 'm5', title: 'Sidang Tesis',                       desc: 'Presentasi akhir tesis', deadline: '2026-07-01', progress: 0, color: '#DC2626' },
  { id: 'm6', title: 'Revisi & Pengumpulan',               desc: '', deadline: '2026-07-15', progress: 0,  color: '#7C3AED' },
];

export const DEFAULT_JURNAL = [
  {
    id: 'j1', date: '2026-05-20',
    title: 'Mulai eksplorasi dataset BERT',
    body:  'Mengeksplorasi dataset untuk fine-tuning BERT. Mencoba beberapa preprocessing approach.',
  },
  {
    id: 'j2', date: '2026-05-21',
    title: 'Debugging model — loss tidak konvergen',
    body:  'Loss masih tidak konvergen setelah 10 epoch. Perlu cek learning rate scheduler dan batch size.',
  },
  {
    id: 'j3', date: '2026-05-22',
    title: 'Review paper IGLPIS framework',
    body:  'Membaca ulang full_framework.pdf dan memetakan setiap fase ke task implementasi.',
  },
];

export const DEFAULT_REFS = [
  {
    id: 'r1', title: 'Segment Anything Model (SAM)',
    author: 'Kirillov et al.', year: '2023',
    url: 'https://arxiv.org/abs/2304.02643',
    tags: ['segmentation', 'vision'],
    note: 'Foundation model untuk segmentasi interaktif. Relevan untuk Phase 4.5',
  },
  {
    id: 'r2', title: 'Bayesian Spatial Inference for Cadastral Systems',
    author: 'Smith et al.', year: '2021',
    url: '', tags: ['bayesian', 'cadastral'],
    note: 'Pendekatan Bayesian untuk inferensi posisi kadaster berbasis evidence.',
  },
  {
    id: 'r3', title: 'Pattern Recognition and Machine Learning',
    author: 'Bishop, C.', year: '2006',
    url: '', tags: ['GMM', 'prior', 'bayesian'],
    note: 'Reference klasik untuk GMM, digunakan di Phase 7.',
  },
];

export const DEFAULT_NOTES = [
  {
    id: 'n1', date: '2026-05-21', color: '#7C3AED',
    title: 'Ide: Hybrid attention mechanism',
    body:  'Coba gabungkan spatial attention dengan semantic attention untuk likelihood computation',
    tags:  ['ide', 'algoritma'],
  },
  {
    id: 'n2', date: '2026-05-22', color: '#D97706',
    title: 'TODO: Cek GPU quota',
    body:  'Pastikan quota GPU cukup untuk SAM inference batch sebelum mulai eksperimen skala penuh',
    tags:  ['todo'],
  },
  {
    id: 'n3', date: '2026-05-22', color: '#2563EB',
    title: 'Formula F1-score weighted',
    body:  'F1 = 2 * (precision * recall) / (precision + recall) — gunakan weighted untuk kelas imbalance',
    tags:  ['formula'],
  },
];
