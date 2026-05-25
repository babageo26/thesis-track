# ThesisTrack — IGLPIS Dashboard

Aplikasi personal untuk memantau progres tesis secara realtime.
Dark mode · Vanilla JS (ES Modules) · localStorage · No build step needed.

---

## Struktur File

```
thesis-track/
├── index.html          ← Entry point HTML
├── README.md
└── src/
    ├── main.js         ← Boot, layout shell, routing, modal wiring
    ├── pages.js        ← Semua page renderer (Dashboard, Jurnal, dst.)
    ├── modals.js       ← Modal open/close, form save/delete, tag helpers
    ├── templates.js    ← Inject modal HTML ke DOM
    ├── state.js        ← Reactive state object
    ├── db.js           ← localStorage persistence + default data (IGLPIS schema)
    ├── utils.js        ← Helper: uid, today, deadlineLabel, groupByPhase, dll.
    └── style.css       ← Global stylesheet (dark mode, semua komponen)
```

---

## Cara Jalankan di Mac (VS Code)

### Option A — Live Server (paling mudah)

1. Install extension **Live Server** di VS Code  
   (ritwickdey.liveserver)
2. Buka folder `thesis-track/` di VS Code
3. Klik kanan `index.html` → **Open with Live Server**
4. Browser otomatis buka `http://127.0.0.1:5500`

### Option B — Vite (rekomendasi untuk development)

```bash
# Di dalam folder thesis-track/
npm create vite@latest . -- --template vanilla
# Hapus src/main.js bawaan Vite, pakai file src/ dari project ini
npm install
npm run dev
```

### Option C — Python simple server

```bash
cd thesis-track
python3 -m http.server 3000
# Buka http://localhost:3000
```

> ⚠️ **Jangan buka langsung sebagai file:// di browser.**  
> ES Modules butuh HTTP server karena CORS policy browser.

---

## Database Schema

Semua data disimpan di **localStorage** browser (persisten lintas sesi).

| Key             | Tipe           | Deskripsi                        |
|-----------------|----------------|----------------------------------|
| `tt_iglpis`     | `IglpisComponent[]` | 25 komponen algoritma IGLPIS |
| `tt_milestones` | `Milestone[]`  | Bab & tahap tesis + deadline     |
| `tt_jurnal`     | `JurnalEntry[]`| Catatan harian riset             |
| `tt_refs`       | `Referensi[]`  | Daftar referensi & paper         |
| `tt_notes`      | `QuickNote[]`  | Ide & catatan cepat              |

### IglpisComponent
```js
{
  id:       string,      // "4.5"
  phase:    string,      // "Phase 4 — SU Page 2 Spatial Pipeline"
  phaseNum: number,      // 4  (untuk sorting)
  title:    string,
  desc:     string,
  algos:    string[],    // ["Canny Edge Detection", ...]
  status:   "belum" | "riset" | "dikerjakan" | "testing" | "selesai",
  llm:      boolean,
  note:     string       // catatan implementasi bebas
}
```

### Milestone
```js
{
  id:       string,
  title:    string,
  desc:     string,
  deadline: string,      // "YYYY-MM-DD"
  progress: number,      // 0–100
  color:    string       // hex color e.g. "#7C3AED"
}
```

### JurnalEntry
```js
{
  id:    string,
  title: string,
  body:  string,
  date:  string          // "YYYY-MM-DD"
}
```

### Referensi
```js
{
  id:     string,
  title:  string,
  author: string,
  year:   string,
  url:    string,
  tags:   string[],
  note:   string
}
```

### QuickNote
```js
{
  id:    string,
  title: string,
  body:  string,
  tags:  string[],
  color: string,         // hex
  date:  string          // "YYYY-MM-DD"
}
```

---

## Export / Backup Data

Buka browser Console (F12) dan jalankan:

```js
// Export semua data sebagai JSON
const keys = ['tt_iglpis','tt_milestones','tt_jurnal','tt_refs','tt_notes'];
const backup = {};
keys.forEach(k => backup[k] = JSON.parse(localStorage.getItem(k) || '[]'));
console.log(JSON.stringify(backup, null, 2));

// Import dari backup
// Object.entries(backup).forEach(([k,v]) => localStorage.setItem(k, JSON.stringify(v)));
```

---

## Menambah Fitur / Halaman Baru

1. Tambah nav item di `main.js` → `buildShell()`
2. Tambah entry di `PAGE_META` dan `pages` map di `main.js`
3. Buat render function di `pages.js`
4. Tambah modal HTML di `templates.js` jika perlu
5. Tambah save/delete logic di `modals.js`
6. Tambah schema + default data di `db.js`

---

## Teknologi

- Vanilla JavaScript (ES Modules) — tanpa framework
- localStorage untuk persistensi
- Tabler Icons (webfont CDN)
- Google Fonts: Syne + JetBrains Mono
- CSS Variables untuk theming
