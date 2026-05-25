// ============================================================
//  templates.js — Inject all modal HTML into <body>
// ============================================================

export function injectModals() {
  const container = document.createElement('div');
  container.innerHTML = `

  <!-- ── Quick Note ──────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-quicknote">
    <div class="modal" style="max-width:480px">
      <div class="modal-header">
        <span class="modal-title">Quick Note</span>
        <button class="icon-btn" id="close-quicknote"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul (opsional)</label>
          <input type="text" id="qn-title" placeholder="Judul singkat...">
        </div>
        <div class="field-group">
          <label class="field-label">Catatan</label>
          <textarea id="qn-body" style="min-height:160px" placeholder="Tulis ide, algoritma, atau catatan cepat..."></textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Tag</label>
          <div class="tag-input-wrap" id="qn-tags-wrap">
            <input class="tag-real-input" id="qn-tag-input" placeholder="+ tag (Enter)">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Warna</label>
          <div class="color-dots" id="qn-colors">
            <div class="color-dot selected" style="background:#7C3AED" data-color="#7C3AED"></div>
            <div class="color-dot" style="background:#2563EB" data-color="#2563EB"></div>
            <div class="color-dot" style="background:#16A34A" data-color="#16A34A"></div>
            <div class="color-dot" style="background:#D97706" data-color="#D97706"></div>
            <div class="color-dot" style="background:#DC2626" data-color="#DC2626"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="cancel-quicknote">Batal</button>
        <button class="btn btn-primary" id="save-quicknote">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── Jurnal ───────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-jurnal">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="jurnal-modal-title">Jurnal Baru</span>
        <button class="icon-btn" id="close-jurnal"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul</label>
          <input type="text" id="j-title" placeholder="Judul entri jurnal...">
        </div>
        <div class="field-group">
          <label class="field-label">Tanggal</label>
          <input type="date" id="j-date">
        </div>
        <div class="field-group">
          <label class="field-label">Catatan Riset</label>
          <textarea id="j-body" style="min-height:180px" placeholder="Tulis catatan riset hari ini..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="j-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-jurnal">Batal</button>
        <button class="btn btn-primary" id="save-jurnal">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── Milestone ────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-milestone">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="ms-modal-title">Milestone Baru</span>
        <button class="icon-btn" id="close-milestone"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul Milestone</label>
          <input type="text" id="ms-title" placeholder="Nama bab atau tahap...">
        </div>
        <div class="field-group">
          <label class="field-label">Deskripsi (opsional)</label>
          <textarea id="ms-desc" style="min-height:60px" placeholder="Deskripsi singkat..."></textarea>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Deadline</label>
            <input type="date" id="ms-date">
          </div>
          <div class="field-group">
            <label class="field-label">Progres: <span id="ms-pct-label">0%</span></label>
            <div class="range-wrap">
              <input type="range" min="0" max="100" value="0" step="1" id="ms-progress">
              <span class="range-val" id="ms-pct-show">0%</span>
            </div>
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Warna</label>
          <div class="color-dots" id="ms-colors">
            <div class="color-dot selected" style="background:#7C3AED" data-color="#7C3AED"></div>
            <div class="color-dot" style="background:#2563EB" data-color="#2563EB"></div>
            <div class="color-dot" style="background:#16A34A" data-color="#16A34A"></div>
            <div class="color-dot" style="background:#D97706" data-color="#D97706"></div>
            <div class="color-dot" style="background:#DC2626" data-color="#DC2626"></div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="ms-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-milestone">Batal</button>
        <button class="btn btn-primary" id="save-milestone">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── Referensi ────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-referensi">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="ref-modal-title">Referensi Baru</span>
        <button class="icon-btn" id="close-referensi"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-group">
          <label class="field-label">Judul</label>
          <input type="text" id="ref-title" placeholder="Judul paper / buku...">
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Penulis</label>
            <input type="text" id="ref-author" placeholder="Nama penulis...">
          </div>
          <div class="field-group">
            <label class="field-label">Tahun</label>
            <input type="number" id="ref-year" placeholder="2024" min="1900" max="2030">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">URL / DOI</label>
          <input type="text" id="ref-url" placeholder="https://...">
        </div>
        <div class="field-group">
          <label class="field-label">Tag</label>
          <div class="tag-input-wrap" id="ref-tags-wrap">
            <input class="tag-real-input" id="ref-tag-input" placeholder="+ tag (Enter)">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Catatan</label>
          <textarea id="ref-note" style="min-height:70px" placeholder="Catatan singkat..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="ref-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-referensi">Batal</button>
        <button class="btn btn-primary" id="save-referensi">Simpan</button>
      </div>
    </div>
  </div>

  <!-- ── IGLPIS Komponen ───────────────────────────────── -->
  <div class="modal-backdrop" id="modal-iglpis">
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title" id="ig-modal-title">Komponen Baru</span>
        <button class="icon-btn" id="close-iglpis"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Fase</label>
            <input type="text" id="ig-phase" placeholder="Phase 4 — SU Page 2 Spatial Pipeline">
          </div>
          <div class="field-group">
            <label class="field-label">No. Fase</label>
            <input type="number" id="ig-phase-num" placeholder="4" min="1" max="20">
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">ID</label>
            <input type="text" id="ig-id" placeholder="4.5">
          </div>
          <div class="field-group">
            <label class="field-label">Judul</label>
            <input type="text" id="ig-title" placeholder="Nama komponen / algoritma...">
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Deskripsi</label>
          <textarea id="ig-desc" style="min-height:60px" placeholder="Penjelasan singkat komponen ini..."></textarea>
        </div>
        <div class="field-group">
          <label class="field-label">Algoritma <span style="color:var(--text3);font-size:11px">(Enter untuk tambah)</span></label>
          <div class="algo-input-wrap" id="ig-algos-wrap">
            <input class="algo-real-input" id="ig-algo-input" placeholder="Nama algoritma...">
          </div>
        </div>
        <div class="field-row">
          <div class="field-group">
            <label class="field-label">Status</label>
            <select id="ig-status">
              <option value="belum">Belum Mulai</option>
              <option value="riset">Riset</option>
              <option value="dikerjakan">Dikerjakan</option>
              <option value="testing">Testing</option>
              <option value="selesai">Selesai</option>
            </select>
          </div>
          <div class="field-group" style="display:flex;align-items:flex-end;padding-bottom:4px">
            <label class="llm-toggle">
              <input type="checkbox" id="ig-llm">
              <i class="ti ti-robot"></i> Pakai LLM
            </label>
          </div>
        </div>
        <div class="field-group">
          <label class="field-label">Catatan Implementasi</label>
          <textarea id="ig-note" style="min-height:90px" placeholder="Hambatan, referensi kode, progress teknis..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-danger" id="ig-delete-btn" style="margin-right:auto;display:none">Hapus</button>
        <button class="btn btn-ghost" id="cancel-iglpis">Batal</button>
        <button class="btn btn-primary" id="ig-save-btn">Tambah</button>
      </div>
    </div>
  </div>

  <!-- ── Comp Note ────────────────────────────────────── -->
  <div class="modal-backdrop" id="modal-comp-note">
    <div class="modal" style="max-width:440px">
      <div class="modal-header">
        <span class="modal-title" id="cn-modal-title">Catatan Implementasi</span>
        <button class="icon-btn" id="close-comp-note"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <textarea id="cn-body" style="min-height:140px" placeholder="Catatan implementasi, hambatan, referensi kode..."></textarea>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" id="cancel-comp-note">Batal</button>
        <button class="btn btn-primary" id="save-comp-note">Simpan</button>
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(container);
}
