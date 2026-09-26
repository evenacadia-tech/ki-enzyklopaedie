import { istTauri } from '../oeffnen';
import { normalisiereDaten, type TagebuchDaten } from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Wo das Tagebuch liegt. Im nativen Fenster: eine JSON-Datei `tagebuch.json` im
// App-Datenordner (Windows: %APPDATA%\de.evenacadia.ki-enzyklopaedie\), gelesen und
// geschrieben über eigene Tauri-Commands — atomar (erst .tmp, dann Umbenennen) und
// mit Sicherungskopie `tagebuch.bak.json` der vorigen Fassung. Im Browser
// (Web-Preview, Tests): localStorage. Beide liefern dieselbe tolerant normalisierte
// Form; ein Lesefehler wirft und sperrt damit das Schreiben. Nur „Datei fehlt“ ist
// ein leeres Tagebuch — eine leere oder halbe Datei ist ein Fehler, damit nie eine
// leere Kopie über echte Daten (oder über die Sicherungskopie) geschrieben wird.
// ─────────────────────────────────────────────────────────────────────────────

export interface TagebuchSpeicher {
  readonly art: 'datei' | 'browser';
  lade(): Promise<TagebuchDaten>;
  speichere(daten: TagebuchDaten): Promise<void>;
  /** Menschenlesbarer Speicherort (Dateipfad bzw. Hinweis auf den Browser-Speicher). */
  ort(): Promise<string>;
}

export const BROWSER_KEY = 'ki-enzyklopaedie.tagebuch.v1';
export const DATEI_NAME = 'tagebuch.json';
export const SICHERUNG_NAME = 'tagebuch.bak.json';

export function browserSpeicher(storage: () => Storage = () => window.localStorage): TagebuchSpeicher {
  return {
    art: 'browser',
    async lade() {
      const roh = storage().getItem(BROWSER_KEY);
      return normalisiereDaten(roh ? JSON.parse(roh) : null);
    },
    async speichere(daten) {
      storage().setItem(BROWSER_KEY, JSON.stringify(daten));
    },
    async ort() {
      return 'Browser-Speicher';
    },
  };
}

/** Text der Datei → Rohdaten; wirft mit Hinweis auf die Sicherungskopie, wenn die Datei kein JSON ist. */
export function parseDatei(text: string | null): unknown {
  if (text === null) return null;
  try {
    if (text.trim() === '') throw new Error('Datei ist leer');
    return JSON.parse(text) as unknown;
  } catch (e) {
    const grund = e instanceof Error ? e.message : String(e);
    throw new Error(`${DATEI_NAME} ist nicht lesbar (${grund}). Sicherungskopie: ${SICHERUNG_NAME} im selben Ordner.`, {
      cause: e,
    });
  }
}

export function dateiSpeicher(): TagebuchSpeicher {
  const invoke = async () => (await import('@tauri-apps/api/core')).invoke;
  return {
    art: 'datei',
    async lade() {
      const text = await (await invoke())<string | null>('tagebuch_lese');
      return normalisiereDaten(parseDatei(text));
    },
    async speichere(daten) {
      // Lesbar formatiert — die Datei ist zum Kopieren und Sichern gedacht.
      await (await invoke())('tagebuch_schreibe', { inhalt: JSON.stringify(daten, null, 2) + '\n' });
    },
    async ort() {
      return (await invoke())<string>('tagebuch_pfad');
    },
  };
}

export function waehleSpeicher(): TagebuchSpeicher {
  return istTauri() ? dateiSpeicher() : browserSpeicher();
}
