import { istTauri } from '../oeffnen';
import { jsonPfad, leseJson, parseJsonDatei, schreibeJson, sicherungName } from '../speicher/json';
import { normalisiereDaten, type TagebuchDaten } from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Wo das Tagebuch liegt. Im nativen Fenster: eine JSON-Datei `tagebuch.json` im
// App-Datenordner (Windows: %APPDATA%\de.evenacadia.ki-enzyklopaedie\), gelesen und
// geschrieben über die gemeinsamen JSON-Commands (`src/speicher/json.ts`) — atomar
// (erst .tmp, dann Umbenennen) und mit Sicherungskopie `tagebuch.bak.json` der
// vorigen Fassung. Im Browser (Web-Preview, Tests): localStorage. Beide liefern
// dieselbe tolerant normalisierte Form; ein Lesefehler wirft und sperrt damit das
// Schreiben. Nur „Datei fehlt“ ist ein leeres Tagebuch — eine leere oder halbe Datei
// ist ein Fehler, damit nie eine leere Kopie über echte Daten (oder über die
// Sicherungskopie) geschrieben wird.
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
export const SICHERUNG_NAME = sicherungName(DATEI_NAME);

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
  return parseJsonDatei(text, DATEI_NAME);
}

export function dateiSpeicher(): TagebuchSpeicher {
  return {
    art: 'datei',
    async lade() {
      return normalisiereDaten(await leseJson(DATEI_NAME));
    },
    async speichere(daten) {
      await schreibeJson(DATEI_NAME, daten);
    },
    async ort() {
      return jsonPfad(DATEI_NAME);
    },
  };
}

export function waehleSpeicher(): TagebuchSpeicher {
  return istTauri() ? dateiSpeicher() : browserSpeicher();
}
