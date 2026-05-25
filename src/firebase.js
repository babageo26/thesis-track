// ============================================================
//  firebase.js — Firebase init, Auth & Firestore helpers
//  ThesisTrack · IGLPIS
// ============================================================
//
//  ⚠️  GANTI NILAI DI BAGIAN firebaseConfig DENGAN MILIKMU
//      Cara dapat config: lihat README.md bagian "Setup Firebase"
// ============================================================

import { initializeApp }                        from 'firebase/app';
import { getAuth, GoogleAuthProvider,
         signInWithPopup, signOut,
         onAuthStateChanged }                   from 'firebase/auth';
import { getFirestore, doc, collection,
         getDoc, setDoc, deleteDoc,
         onSnapshot, writeBatch,
         serverTimestamp }                      from 'firebase/firestore';

// ── 1. PASTE KONFIGURASI FIREBASE KAMU DI SINI ───────────────
//
//   Cara dapat:
//   Firebase Console → Project Settings → Your apps → Web app → SDK snippet
//
const firebaseConfig = {
  apiKey:            "AIzaSyCn7qGtB-x0icxG6l4HVI31HlZcBgkoR6s",
  authDomain:        "mythesis-ba271.firebaseapp.com",
  projectId:         "mythesis-ba271",
  storageBucket:     "mythesis-ba271.firebasestorage.app",
  messagingSenderId: "293637871197",
  appId:             "1:293637871197:web:6aef04f68906bcf5491fb4",
};
// ─────────────────────────────────────────────────────────────

// Init Firebase
const app  = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// ── Auth helpers ─────────────────────────────────────────────

/** Login dengan Google Popup */
export async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    console.error('Login error:', err);
    throw err;
  }
}

/** Logout */
export async function logout() {
  await signOut(auth);
}

/** Pantau status login. callback(user | null) */
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

/** UID user yang sedang login */
export function currentUID() {
  return auth.currentUser?.uid || null;
}

// ── Firestore path helpers ────────────────────────────────────
//
//  Struktur Firestore:
//
//  users/
//    {uid}/
//      meta/
//        info  → { displayName, email, photoURL, lastSeen }
//      iglpis/
//        {componentId} → IglpisComponent
//      milestones/
//        {milestoneId} → Milestone
//      jurnal/
//        {jurnalId}    → JurnalEntry
//      refs/
//        {refId}       → Referensi
//      notes/
//        {noteId}      → QuickNote
//

function userCol(colName) {
  const uid = currentUID();
  if (!uid) throw new Error('Not logged in');
  return collection(db, 'users', uid, colName);
}

function userDoc(colName, docId) {
  const uid = currentUID();
  if (!uid) throw new Error('Not logged in');
  return doc(db, 'users', uid, colName, docId);
}

// ── CRUD Firestore ────────────────────────────────────────────

/**
 * Simpan / update satu dokumen.
 * @param {string} colName  - 'iglpis' | 'milestones' | 'jurnal' | 'refs' | 'notes'
 * @param {object} item     - harus punya field 'id'
 */
export async function fsSet(colName, item) {
  const ref = userDoc(colName, item.id);
  await setDoc(ref, { ...item, _updatedAt: serverTimestamp() }, { merge: true });
}

/**
 * Hapus satu dokumen.
 */
export async function fsDelete(colName, itemId) {
  const ref = userDoc(colName, itemId);
  await deleteDoc(ref);
}

/**
 * Ambil semua dokumen dalam satu collection (sekali, saat boot).
 * Mengembalikan Array item.
 */
export async function fsGetAll(colName) {
  const { getDocs } = await import('firebase/firestore');
  const col   = userCol(colName);
  const snap  = await getDocs(col);
  return snap.docs.map(d => {
    const data = d.data();
    delete data._updatedAt;  // buang field internal Firestore
    return data;
  });
}

/**
 * Subscribe realtime ke satu collection.
 * callback dipanggil setiap ada perubahan dengan Array item terbaru.
 * Mengembalikan unsubscribe function.
 */
export function fsSubscribe(colName, callback) {
  const col = userCol(colName);
  return onSnapshot(col, snap => {
    const items = snap.docs.map(d => {
      const data = d.data();
      delete data._updatedAt;
      return data;
    });
    callback(items);
  }, err => {
    console.error(`Firestore ${colName} error:`, err);
  });
}

/**
 * Seed data default ke Firestore (hanya saat pertama kali login,
 * jika collection masih kosong).
 */
export async function seedIfEmpty(colName, defaultData) {
  const { getDocs } = await import('firebase/firestore');
  const col  = userCol(colName);
  const snap = await getDocs(col);
  if (snap.empty) {
    const batch = writeBatch(db);
    defaultData.forEach(item => {
      const ref = userDoc(colName, item.id);
      batch.set(ref, { ...item, _updatedAt: serverTimestamp() });
    });
    await batch.commit();
    console.log(`[Firebase] Seeded ${defaultData.length} items → ${colName}`);
  }
}

/**
 * Simpan info user ke Firestore saat login.
 */
export async function saveUserMeta(user) {
  const ref = userDoc('meta', 'info');
  await setDoc(ref, {
    displayName: user.displayName || '',
    email:       user.email       || '',
    photoURL:    user.photoURL    || '',
    lastSeen:    serverTimestamp(),
  }, { merge: true });
}
