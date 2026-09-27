import { istTauri } from '../oeffnen';
import { leseJson, rufeCommand, schreibeJson } from '../speicher/json';
import { normalisiereIndex, type DokumenteIndex } from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Wo die Dokumente liegen. Im nativen Fenster: die Dateien im Ordner `dokumente/`
// des App-Datenordners (Windows: %APPDATA%\de.evenacadia.ki-enzyklopaedie\dokumente\),
// der Index daneben als `dokumente.json` (atomar geschrieben, mit Sicherungskopie
// `dokumente.bak.json`). Importieren heißt KOPIEREN — das Original bleibt, wo es
// ist. Im Browser (Web-Preview, Tests) gibt es keinen Dateizugriff: dort lebt nur
// der Index im localStorage, Import, Öffnen und Vorschau sind abgeschaltet.
// ─────────────────────────────────────────────────────────────────────────────

/** Was die Rust-Seite nach dem Kopieren zurückgibt. */
export interface Importiert {
  id: string;
  datei: string;
  name: string;
  groesse: number;
  typ: string;
}

export interface DokumenteSpeicher {
  readonly art: 'datei' | 'browser';
  /** Ob Dateien importiert, geöffnet und gezeigt werden können (nur in der App). */
  readonly dateien: boolean;
  lade(): Promise<DokumenteIndex>;
  speichere(index: DokumenteIndex): Promise<void>;
  /** Kopiert die Datei unter `quelle` in die App. */
  importiere(quelle: string): Promise<Importiert>;
  /** Öffnet im Standardprogramm. */
  oeffne(id: string): Promise<void>;
  /** Zeigt die Datei im Explorer. */
  zeige(id: string): Promise<void>;
  /** Löscht die Kopie in der App endgültig. */
  entferne(id: string): Promise<void>;
  /** Adresse für die Vorschau in der App — null, wenn es keine gibt. */
  vorschauUrl(id: string): Promise<string | null>;
  /** Menschenlesbarer Speicherort (Ordner bzw. Hinweis auf den Browser-Speicher). */
  ort(): Promise<string>;
}

export const BROWSER_KEY = 'ki-enzyklopaedie.dokumente.v1';
export const DATEI_NAME = 'dokumente.json';
export const NUR_IN_DER_APP = 'Dateien lassen sich nur in der App hinzufügen und öffnen, nicht im Browser.';

export function browserSpeicher(storage: () => Storage = () => window.localStorage): DokumenteSpeicher {
  return {
    art: 'browser',
    dateien: false,
    async lade() {
      const roh = storage().getItem(BROWSER_KEY);
      return normalisiereIndex(roh ? JSON.parse(roh) : null);
    },
    async speichere(index) {
      storage().setItem(BROWSER_KEY, JSON.stringify(index));
    },
    async importiere() {
      throw new Error(NUR_IN_DER_APP);
    },
    async oeffne() {
      throw new Error(NUR_IN_DER_APP);
    },
    async zeige() {
      throw new Error(NUR_IN_DER_APP);
    },
    async entferne() {
      // Im Browser gibt es keine Datei — nur der Eintrag im Index verschwindet.
    },
    async vorschauUrl() {
      return null;
    },
    async ort() {
      return 'Browser-Speicher (nur das Verzeichnis, keine Dateien)';
    },
  };
}

export function dateiSpeicher(): DokumenteSpeicher {
  return {
    art: 'datei',
    dateien: true,
    async lade() {
      return normalisiereIndex(await leseJson(DATEI_NAME));
    },
    async speichere(index) {
      await schreibeJson(DATEI_NAME, index);
    },
    async importiere(quelle) {
      return rufeCommand<Importiert>('dokument_importiere', { quelle });
    },
    async oeffne(id) {
      await rufeCommand('dokument_oeffne', { id });
    },
    async zeige(id) {
      await rufeCommand('dokument_zeige', { id });
    },
    async entferne(id) {
      await rufeCommand('dokument_entferne', { id });
    },
    async vorschauUrl(id) {
      const pfad = await rufeCommand<string>('dokument_pfad', { id });
      const { convertFileSrc } = await import('@tauri-apps/api/core');
      return convertFileSrc(pfad);
    },
    async ort() {
      return rufeCommand<string>('dokumente_ordner');
    },
  };
}

export function waehleSpeicher(): DokumenteSpeicher {
  return istTauri() ? dateiSpeicher() : browserSpeicher();
}
