import { useSyncExternalStore } from 'react';
import {
  INDEX_VERSION,
  NAME_MAX,
  NOTIZ_MAX,
  istArt,
  type Art,
  type Dokument,
  type DokumenteIndex,
} from './modell';
import { waehleSpeicher, type DokumenteSpeicher } from './speicher';

// ─────────────────────────────────────────────────────────────────────────────
// Dokumente-Zustand: ein externer Store nach dem Muster von `tagebuch/zustand.ts`.
// Die Wahrheit liegt im Speicher (Ordner + Index); nach dem Laden hält dieser
// Store eine Kopie des Index. Regeln, die Datenverlust verhindern:
//   · vor erfolgreichem Laden wird nie geschrieben (ein Ladefehler sperrt alles —
//     kein Import, kein Entfernen, der Fehler bleibt sichtbar);
//   · Import und Entfernen schreiben den Index sofort, Name/Notiz/Abteilung
//     verzögert (500 ms nach der letzten Änderung, sofort bei Blur und Schließen);
//   · beim Entfernen verschwindet der Eintrag erst, wenn die Datei gelöscht ist;
//   · ein Speicherfehler lässt die Änderung im Zustand und meldet ihn;
//   · Änderungen während eines laufenden Schreibvorgangs werden danach erneut
//     geschrieben (Schnappschuss-Vergleich).
// ─────────────────────────────────────────────────────────────────────────────

export type LadeStatus = 'aus' | 'laedt' | 'bereit' | 'fehler';
export type Sicherung = 'gespeichert' | 'ausstehend' | 'speichert' | 'fehler';

export interface DokumenteZustand {
  status: LadeStatus;
  /** Ladefehler (dann ist der Bereich schreibgeschützt). */
  ladeFehler: string | null;
  dokumente: readonly Dokument[];
  sicherung: Sicherung;
  sicherungFehler: string | null;
  /** Meldung der letzten Aktion, die nicht (ganz) gelang — Import, Öffnen, Zeigen, Entfernen. */
  meldung: string | null;
  /** Läuft gerade ein Import? */
  importLaeuft: boolean;
  /** Ob der Speicher Dateien kennt (nur in der App). */
  dateien: boolean;
  /** Menschenlesbarer Speicherort. */
  ort: string | null;
}

export const VERZOEGERUNG_MS = 500;

const ANFANG: DokumenteZustand = {
  status: 'aus',
  ladeFehler: null,
  dokumente: [],
  sicherung: 'gespeichert',
  sicherungFehler: null,
  meldung: null,
  importLaeuft: false,
  dateien: false,
  ort: null,
};

let speicher: DokumenteSpeicher | null = null;
let uhr: () => Date = () => new Date();
let zustand: DokumenteZustand = ANFANG;
let timer: ReturnType<typeof setTimeout> | null = null;
let laufend: Promise<void> | null = null;
const zuhoerer = new Set<() => void>();

function setze(patch: Partial<DokumenteZustand>): void {
  zustand = { ...zustand, ...patch };
  for (const z of zuhoerer) z();
}

function meldungAus(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

function aktiverSpeicher(): DokumenteSpeicher {
  return (speicher ??= waehleSpeicher());
}

/** Speicher und Uhr austauschen (Tests) und den Zustand zurücksetzen. */
export function konfiguriereDokumente(s: DokumenteSpeicher | null, jetzt?: () => Date): void {
  if (timer) clearTimeout(timer);
  timer = null;
  laufend = null;
  speicher = s;
  uhr = jetzt ?? (() => new Date());
  setze(ANFANG);
}

/** Lädt den Index genau einmal; weitere Aufrufe sind No-ops. */
export async function ladeDokumente(): Promise<void> {
  if (zustand.status !== 'aus') return;
  setze({ status: 'laedt', ladeFehler: null });
  try {
    const s = aktiverSpeicher();
    const index = await s.lade();
    let ort: string | null = null;
    try {
      ort = await s.ort();
    } catch {
      ort = null;
    }
    setze({ status: 'bereit', dokumente: index.dokumente, dateien: s.dateien, ort });
  } catch (e) {
    setze({ status: 'fehler', ladeFehler: meldungAus(e) });
  }
}

/** Nach einem Ladefehler: erneut versuchen. */
export async function ladeDokumenteErneut(): Promise<void> {
  if (zustand.status !== 'fehler') return;
  setze({ status: 'aus' });
  await ladeDokumente();
}

export function dokumentFuer(id: string): Dokument | undefined {
  return zustand.dokumente.find((d) => d.id === id);
}

function dateiname(pfad: string): string {
  return pfad.split(/[\\/]/).pop() || pfad;
}

/**
 * Kopiert die Dateien in die App und trägt sie in den Index ein. Was nicht gelingt,
 * steht danach in `meldung`; was gelang, bleibt. Liefert die neuen Dokumente.
 */
export async function importiereDokumente(quellen: readonly string[], art: Art, tag: string | null): Promise<Dokument[]> {
  if (zustand.status !== 'bereit' || zustand.importLaeuft || quellen.length === 0) return [];
  const zielArt: Art = art === 'anhang' && tag === null ? 'dokument' : art;
  setze({ importLaeuft: true, meldung: null });
  const neu: Dokument[] = [];
  const fehler: string[] = [];
  const s = aktiverSpeicher();
  for (const quelle of quellen) {
    try {
      const i = await s.importiere(quelle);
      const d: Dokument = {
        id: i.id,
        datei: i.datei,
        name: i.name,
        art: zielArt,
        tag,
        notiz: '',
        hinzugefuegt: uhr().toISOString(),
        groesse: i.groesse,
        typ: i.typ,
      };
      neu.push(d);
      // Sofort sichtbar — und sofort Teil des nächsten Schnappschusses.
      setze({ dokumente: [...zustand.dokumente, d], sicherung: 'ausstehend' });
    } catch (e) {
      fehler.push(`${dateiname(quelle)}: ${meldungAus(e)}`);
    }
  }
  setze({
    importLaeuft: false,
    meldung:
      fehler.length === 0
        ? null
        : quellen.length === 1
          ? `Nicht hinzugefügt — ${fehler[0]}`
          : `${neu.length} von ${quellen.length} Dateien hinzugefügt. Nicht hinzugefügt — ${fehler.join(' · ')}`,
  });
  if (neu.length > 0) await speichereDokumenteJetzt();
  return neu;
}

export type DokumentPatch = Partial<Pick<Dokument, 'name' | 'notiz' | 'art'>>;

/** Ändert Anzeigename, Notiz oder Abteilung und plant die Sicherung. */
export function aendereDokument(id: string, patch: DokumentPatch): void {
  if (zustand.status !== 'bereit') return;
  const alt = dokumentFuer(id);
  if (!alt) return;
  const neu: Dokument = { ...alt };
  if (typeof patch.name === 'string') neu.name = patch.name.slice(0, NAME_MAX);
  if (typeof patch.notiz === 'string') neu.notiz = patch.notiz.slice(0, NOTIZ_MAX);
  // „Aus dem Tagebuch“ setzt einen Tag voraus.
  if (istArt(patch.art) && !(patch.art === 'anhang' && alt.tag === null)) neu.art = patch.art;
  if (neu.name === alt.name && neu.notiz === alt.notiz && neu.art === alt.art) return;
  setze({ dokumente: zustand.dokumente.map((d) => (d.id === id ? neu : d)), sicherung: 'ausstehend' });
  planeSicherung();
}

/** Ein leer gelassener Anzeigename fällt auf den Originalnamen der Datei zurück. */
export function sichereNamen(id: string): void {
  const d = dokumentFuer(id);
  if (!d || d.name.trim() !== '') return;
  aendereDokument(id, { name: d.datei.slice(d.id.length + 1) });
}

/** Löscht die Kopie in der App endgültig; der Eintrag verschwindet erst danach. */
export async function entferneDokument(id: string): Promise<boolean> {
  if (zustand.status !== 'bereit' || !dokumentFuer(id)) return false;
  setze({ meldung: null });
  try {
    await aktiverSpeicher().entferne(id);
  } catch (e) {
    setze({ meldung: `Nicht entfernt — ${meldungAus(e)}` });
    return false;
  }
  setze({ dokumente: zustand.dokumente.filter((d) => d.id !== id), sicherung: 'ausstehend' });
  await speichereDokumenteJetzt();
  return true;
}

export async function oeffneDokument(id: string): Promise<void> {
  setze({ meldung: null });
  try {
    await aktiverSpeicher().oeffne(id);
  } catch (e) {
    setze({ meldung: meldungAus(e) });
  }
}

export async function zeigeDokument(id: string): Promise<void> {
  setze({ meldung: null });
  try {
    await aktiverSpeicher().zeige(id);
  } catch (e) {
    setze({ meldung: meldungAus(e) });
  }
}

/** Adresse für die Vorschau — null, wenn es keine gibt (Browser, Datei fehlt). */
export async function vorschauUrl(id: string): Promise<string | null> {
  try {
    return await aktiverSpeicher().vorschauUrl(id);
  } catch {
    return null;
  }
}

export function setzeMeldung(meldung: string | null): void {
  if (zustand.meldung !== meldung) setze({ meldung });
}

function planeSicherung(): void {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    timer = null;
    void speichereDokumenteJetzt();
  }, VERZOEGERUNG_MS);
}

/** Schreibt ausstehende Änderungen sofort (Blur, Import, Entfernen, Schließen). */
export async function speichereDokumenteJetzt(): Promise<void> {
  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
  if (zustand.status !== 'bereit') return;
  if (laufend) await laufend;
  if (zustand.sicherung !== 'ausstehend' && zustand.sicherung !== 'fehler') return;

  const geschrieben = zustand.dokumente;
  const schnappschuss: DokumenteIndex = { version: INDEX_VERSION, dokumente: [...geschrieben] };
  setze({ sicherung: 'speichert', sicherungFehler: null });
  laufend = (async () => {
    try {
      await aktiverSpeicher().speichere(schnappschuss);
      if (zustand.dokumente !== geschrieben) {
        // Während des Schreibens kam Neues — bleibt ausstehend und wird erneut geschrieben.
        setze({ sicherung: 'ausstehend' });
        planeSicherung();
      } else {
        setze({ sicherung: 'gespeichert' });
      }
    } catch (e) {
      setze({ sicherung: 'fehler', sicherungFehler: meldungAus(e) });
    } finally {
      laufend = null;
    }
  })();
  await laufend;
}

function subscribe(fn: () => void): () => void {
  zuhoerer.add(fn);
  return () => {
    zuhoerer.delete(fn);
  };
}

export function useDokumente(): DokumenteZustand {
  return useSyncExternalStore(subscribe, () => zustand, () => ANFANG);
}

/** Nur für Tests. */
export function _zustandFuerTests(): DokumenteZustand {
  return zustand;
}
