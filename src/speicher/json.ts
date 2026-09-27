// ─────────────────────────────────────────────────────────────────────────────
// Die JSON-Dateien im App-Datenordner (nativ): `tagebuch.json` und
// `dokumente.json`. Gelesen und geschrieben wird über die Tauri-Commands
// `json_lese` / `json_schreibe` / `json_pfad`; die Rust-Seite lässt nur diese
// beiden Namen zu, schreibt atomar und legt vorher `<name>.bak.json` ab.
// Nur „Datei fehlt“ ist ein leerer Bestand — eine leere oder halbe Datei ist ein
// Fehler, damit nie eine leere Kopie über echte Daten geschrieben wird.
// ─────────────────────────────────────────────────────────────────────────────

export type JsonDatei = 'tagebuch.json' | 'dokumente.json';

/** `tagebuch.json` → `tagebuch.bak.json` (so nennt die Rust-Seite die Sicherungskopie). */
export function sicherungName(datei: JsonDatei): string {
  return datei.replace(/\.json$/, '.bak.json');
}

/** Text der Datei → Rohdaten; wirft mit Hinweis auf die Sicherungskopie, wenn die Datei kein JSON ist. */
export function parseJsonDatei(text: string | null, datei: JsonDatei): unknown {
  if (text === null) return null;
  try {
    if (text.trim() === '') throw new Error('Datei ist leer');
    return JSON.parse(text) as unknown;
  } catch (e) {
    const grund = e instanceof Error ? e.message : String(e);
    throw new Error(`${datei} ist nicht lesbar (${grund}). Sicherungskopie: ${sicherungName(datei)} im selben Ordner.`, {
      cause: e,
    });
  }
}

async function invoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  const { invoke: rufe } = await import('@tauri-apps/api/core');
  try {
    return await rufe<T>(cmd, args);
  } catch (e) {
    // Commands melden Fehler als Text — als Error weiterreichen, damit die Meldung ankommt.
    throw e instanceof Error ? e : new Error(String(e));
  }
}

/** Ruft einen Tauri-Command; Fehler kommen immer als `Error` mit der Meldung der Rust-Seite. */
export const rufeCommand = invoke;

export async function leseJson(datei: JsonDatei): Promise<unknown> {
  return parseJsonDatei(await invoke<string | null>('json_lese', { name: datei }), datei);
}

/** Lesbar formatiert — die Dateien sind zum Kopieren und Sichern gedacht. */
export async function schreibeJson(datei: JsonDatei, daten: unknown): Promise<void> {
  await invoke('json_schreibe', { name: datei, inhalt: JSON.stringify(daten, null, 2) + '\n' });
}

export async function jsonPfad(datei: JsonDatei): Promise<string> {
  return invoke<string>('json_pfad', { name: datei });
}
