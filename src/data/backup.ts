// Backup do folderu lokalnego na komputerze (File System Access API).
// Użytkownik łączy folder raz; uchwyt trwa w IndexedDB między sesjami.
// Przy każdym zapisie modelu zapisujemy też snapshot JSON do tego folderu.
// Działa w Chrome/Edge (secure context: https i localhost). Fallback: pobranie pliku.
import type { ModelConfig } from './modelConfig';
import { loadReminders } from './surveyData';

const BACKUP_FILE = 'bs360-backup.json';
const IDB_NAME = 'bs360-backup';
const IDB_STORE = 'handles';
const IDB_KEY = 'dir';

export function backupSupported(): boolean {
  return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
}

// ── prosty wrapper IndexedDB dla jednego uchwytu katalogu ──
function idb(): Promise<IDBDatabase> {
  return new Promise((res, rej) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(IDB_STORE);
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
async function idbSet(val: unknown): Promise<void> {
  const db = await idb();
  await new Promise<void>((res, rej) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(val, IDB_KEY);
    tx.oncomplete = () => res();
    tx.onerror = () => rej(tx.error);
  });
}
async function idbGet<T>(): Promise<T | null> {
  const db = await idb();
  return new Promise((res, rej) => {
    const tx = db.transaction(IDB_STORE, 'readonly');
    const r = tx.objectStore(IDB_STORE).get(IDB_KEY);
    r.onsuccess = () => res((r.result as T) ?? null);
    r.onerror = () => rej(r.error);
  });
}
async function idbClear(): Promise<void> {
  const db = await idb();
  await new Promise<void>((res) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).delete(IDB_KEY);
    tx.oncomplete = () => res();
  });
}

type DirHandle = FileSystemDirectoryHandle & {
  queryPermission?: (o: { mode: string }) => Promise<PermissionState>;
  requestPermission?: (o: { mode: string }) => Promise<PermissionState>;
};

// Wybór folderu backupu przez użytkownika.
export async function pickBackupFolder(): Promise<string | null> {
  const picker = (window as unknown as { showDirectoryPicker: (o?: object) => Promise<DirHandle> }).showDirectoryPicker;
  const handle = await picker({ mode: 'readwrite' });
  await idbSet(handle);
  return handle.name;
}

// Nazwa zapamiętanego folderu (jeśli jest i mamy zgodę).
export async function storedFolderName(): Promise<string | null> {
  try {
    const handle = await idbGet<DirHandle>();
    if (!handle) return null;
    if (handle.queryPermission) {
      const p = await handle.queryPermission({ mode: 'readwrite' });
      if (p !== 'granted') return handle.name + ' (wymaga ponownej zgody)';
    }
    return handle.name;
  } catch { return null; }
}

export async function forgetBackupFolder(): Promise<void> {
  await idbClear();
}

// Zapis snapshotu do folderu. Zwraca true, gdy zapisano.
export async function writeBackup(model: ModelConfig): Promise<boolean> {
  try {
    const handle = await idbGet<DirHandle>();
    if (!handle) return false;
    if (handle.requestPermission) {
      const p = await handle.requestPermission({ mode: 'readwrite' });
      if (p !== 'granted') return false;
    }
    const snapshot = {
      app: 'Brain Stream Raport 360',
      savedAt: new Date().toISOString(),
      model,
      reminders: loadReminders(),
    };
    const fileHandle = await handle.getFileHandle(BACKUP_FILE, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(JSON.stringify(snapshot, null, 2));
    await writable.close();
    return true;
  } catch {
    return false;
  }
}

// Fallback: pobranie backupu jako plik (gdy brak File System Access API).
export function downloadBackup(model: ModelConfig): void {
  const snapshot = { app: 'Brain Stream Raport 360', savedAt: new Date().toISOString(), model, reminders: loadReminders() };
  const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = BACKUP_FILE;
  a.click();
  URL.revokeObjectURL(url);
}
