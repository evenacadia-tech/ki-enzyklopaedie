import { rufeCommand } from '../speicher/json';
import { ANHAENGE_TITEL, EREIGNIS_OHNE_NAME } from './export';
import { FARBEN, FARBE_NAME, STANDARD_FARBE, baue, istIsoDatum, istLeer, type Eintrag, type Farbe, type Tage } from './modell';

// ─────────────────────────────────────────────────────────────────────────────
// Import: liest eine Datei, die „Exportieren“ geschrieben hat, und stellt die
// Tage wieder her. Verstanden werden alle drei Fassungen des Exports (Ereignis
// ohne Farbe, mit Farbe, mit Anhängen).
//
// Regeln, die Datenverlust verhindern:
//   · der Import löscht nie — Tage, die nicht in der Datei stehen, bleiben;
//   · ein Tag, der im Tagebuch schon ANDERS steht, wird nur ersetzt, wenn der
//     Nutzer das ausdrücklich wählt (`Vorrang`);
//   · Tage, die gleich sind, bleiben unberührt (auch ihr Änderungszeitpunkt).
//
// Was die Datei nicht enthält, kann der Import nicht zurückbringen: den
// Zeitpunkt der letzten Änderung (importierte Tage tragen den des Imports) und
// die Anhänge (die Datei nennt nur ihre Namen).
// ─────────────────────────────────────────────────────────────────────────────

/** Was eine exportierte Datei von einem Tag weiß — alles außer dem Zeitpunkt der Änderung. */
export type ImportEintrag = Pick<Eintrag, 'text' | 'markiert' | 'ereignis' | 'farbe'>;

export interface GeleseneDatei {
  /** Die Tage der Datei mit Text oder Markierung. */
  tage: Record<string, ImportEintrag>;
  /** Zahl der Anhänge, die die Datei nennt — die Dateien selbst stecken nicht darin. */
  anhaenge: number;
}

const MONATE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
] as const;

// „## Samstag, 26. September 2026“ — maßgeblich ist das Datum; der Wochentag wird nicht
// nachgerechnet, damit ein von Hand geändertes Datum nicht im Text des Vortags landet.
const UEBERSCHRIFT = new RegExp(
  `^## (?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag), (\\d{1,2})\\. (${MONATE.join('|')}) (\\d{1,4})$`,
);
// „**Ereignis (Kupfer):** Name“ — die älteste Fassung des Exports schrieb keine Farbe.
const EREIGNIS = /^\*\*Ereignis(?: \(([^()]*)\))?:\*\*(?: (.*))?$/;

const FEHLER_KEIN_TAG =
  'In der Datei steht kein Tagebuchtag. Importieren lässt sich eine Datei, die diese App über „Exportieren“ geschrieben hat.';

/** Vergleichsform einer Zeile: Umlaute in einer Schreibweise, ohne Leerraum am Ende. */
function glatt(zeile: string): string {
  return zeile.normalize('NFC').trimEnd();
}

function datumDerUeberschrift(zeile: string): string | null {
  const m = UEBERSCHRIFT.exec(glatt(zeile));
  if (!m) return null;
  const datum = baue(Number(m[3]), MONATE.indexOf(m[2] as (typeof MONATE)[number]) + 1, Number(m[1]));
  return istIsoDatum(datum) ? datum : null;
}

function farbeZuName(name: string | undefined): Farbe {
  const gesucht = (name ?? '').trim().toLowerCase();
  return FARBEN.find((f) => FARBE_NAME[f].toLowerCase() === gesucht) ?? STANDARD_FARBE;
}

function ohneLeerenRand(zeilen: string[]): string[] {
  let von = 0;
  let bis = zeilen.length;
  while (von < bis && zeilen[von].trim() === '') von++;
  while (bis > von && zeilen[bis - 1].trim() === '') bis--;
  return zeilen.slice(von, bis);
}

function leseAbschnitt(roh: string[]): { eintrag: ImportEintrag; anhaenge: number } {
  let zeilen = ohneLeerenRand(roh);
  const eintrag: ImportEintrag = { text: '', markiert: false, ereignis: '', farbe: STANDARD_FARBE };

  const m = zeilen.length > 0 ? EREIGNIS.exec(glatt(zeilen[0])) : null;
  if (m) {
    const name = (m[2] ?? '').trim();
    eintrag.markiert = true;
    eintrag.farbe = farbeZuName(m[1]);
    eintrag.ereignis = name === EREIGNIS_OHNE_NAME ? '' : name;
    zeilen = ohneLeerenRand(zeilen.slice(1));
  }

  // Die Anhänge stehen am Ende des Tages: der Titel und darunter nur Listenzeilen.
  let anhaenge = 0;
  const titel = zeilen.map((z) => glatt(z).trim()).lastIndexOf(ANHAENGE_TITEL);
  if (titel !== -1) {
    const liste = zeilen.slice(titel + 1).filter((z) => z.trim() !== '');
    if (liste.length > 0 && liste.every((z) => z.startsWith('- '))) {
      anhaenge = liste.length;
      zeilen = ohneLeerenRand(zeilen.slice(0, titel));
    }
  }

  eintrag.text = zeilen.join('\n').trim();
  return { eintrag, anhaenge };
}

/** Steht ein Tag zweimal in der Datei, gehören beide Texte zu ihm; die erste Markierung gilt. */
function vereine(a: ImportEintrag, b: ImportEintrag): ImportEintrag {
  const markierung = a.markiert ? a : b;
  return {
    text: [a.text, b.text].filter((t) => t !== '').join('\n\n'),
    markiert: a.markiert || b.markiert,
    ereignis: markierung.ereignis,
    farbe: markierung.farbe,
  };
}

/** Liest den Text einer exportierten Datei. Wirft, wenn kein Tag darin steht. */
export function leseMarkdown(md: string): GeleseneDatei {
  const zeilen = md.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  const abschnitte: { datum: string; zeilen: string[] }[] = [];
  let aktuell: { datum: string; zeilen: string[] } | null = null;
  for (const zeile of zeilen) {
    const datum = datumDerUeberschrift(zeile);
    if (datum) {
      aktuell = { datum, zeilen: [] };
      abschnitte.push(aktuell);
    } else {
      // Vor dem ersten Tag steht der Kopf der Datei (Titel, Stand) — er gehört zu keinem Tag.
      aktuell?.zeilen.push(zeile);
    }
  }
  if (abschnitte.length === 0) throw new Error(FEHLER_KEIN_TAG);

  const tage: Record<string, ImportEintrag> = {};
  let anhaenge = 0;
  for (const a of abschnitte) {
    const gelesen = leseAbschnitt(a.zeilen);
    anhaenge += gelesen.anhaenge;
    const bisher = tage[a.datum];
    const eintrag = bisher ? vereine(bisher, gelesen.eintrag) : gelesen.eintrag;
    // Ein Tag, an dem die Datei nur Anhänge nennt, ist kein Eintrag.
    if (!istLeer({ ...eintrag, geaendert: '' })) tage[a.datum] = eintrag;
  }
  return { tage, anhaenge };
}

/**
 * Was der Export von einem Eintrag festhält — die Form, in der Tagebuch und Datei
 * vergleichbar sind: Text ohne Rand, Bezeichnung und Farbe nur bei markierten Tagen.
 */
function kern(e: ImportEintrag): ImportEintrag {
  const ereignis = e.markiert ? e.ereignis.trim() : '';
  return {
    text: e.text.replace(/\r\n/g, '\n').trim(),
    markiert: e.markiert,
    ereignis: ereignis === EREIGNIS_OHNE_NAME ? '' : ereignis,
    farbe: e.markiert ? e.farbe : STANDARD_FARBE,
  };
}

function gleich(a: ImportEintrag, b: ImportEintrag): boolean {
  const x = kern(a);
  const y = kern(b);
  return x.text === y.text && x.markiert === y.markiert && x.ereignis === y.ereignis && x.farbe === y.farbe;
}

export interface ImportPlan {
  /** Tage, die es im Tagebuch noch nicht gibt. */
  neu: string[];
  /** Tage, die im Tagebuch schon genauso stehen. */
  gleich: string[];
  /** Tage, die im Tagebuch anders stehen als in der Datei. */
  abweichend: string[];
}

/** Ordnet die Tage der Datei nach dem, was der Import mit ihnen täte — jeweils aufsteigend. */
export function planeImport(bestand: Tage, datei: GeleseneDatei): ImportPlan {
  const plan: ImportPlan = { neu: [], gleich: [], abweichend: [] };
  for (const datum of Object.keys(datei.tage).sort()) {
    const da = bestand[datum];
    if (!da) plan.neu.push(datum);
    else if (gleich(da, datei.tage[datum])) plan.gleich.push(datum);
    else plan.abweichend.push(datum);
  }
  return plan;
}

/** Wer gewinnt, wenn ein Tag im Tagebuch anders steht als in der Datei. */
export type Vorrang = 'tagebuch' | 'datei';

/** Die Tage, die ein Import mit diesem Vorrang schreibt. */
export function zuSchreiben(plan: ImportPlan, vorrang: Vorrang): string[] {
  return vorrang === 'datei' ? [...plan.neu, ...plan.abweichend].sort() : plan.neu;
}

/** Der Bestand nach dem Import. Nichts wird gelöscht; unveränderte Tage bleiben dieselben Objekte. */
export function wendeImportAn(bestand: Tage, datei: GeleseneDatei, vorrang: Vorrang, jetzt: Date): Tage {
  const tage: Tage = { ...bestand };
  const geaendert = jetzt.toISOString();
  for (const datum of zuSchreiben(planeImport(bestand, datei), vorrang)) {
    tage[datum] = { ...kern(datei.tage[datum]), geaendert };
  }
  return tage;
}

export interface ImportDatei {
  name: string;
  text: string;
}

function dateiname(pfad: string): string {
  return pfad.split(/[\\/]/).pop() || pfad;
}

/** Nativ: Öffnen-Dialog, gelesen wird auf der Rust-Seite. Null, wenn abgebrochen. */
export async function waehleImportDatei(): Promise<ImportDatei | null> {
  const { open } = await import('@tauri-apps/plugin-dialog');
  const pfad = await open({
    title: 'Tagebuch importieren',
    multiple: false,
    directory: false,
    filters: [{ name: 'Markdown', extensions: ['md', 'markdown', 'txt'] }],
  });
  if (typeof pfad !== 'string') return null;
  return { name: dateiname(pfad), text: await rufeCommand<string>('datei_lese', { pfad }) };
}

/** Browser: der Inhalt einer im Dateifeld gewählten Datei. */
export function leseDatei(datei: File): Promise<ImportDatei> {
  return new Promise((fertig, fehler) => {
    const leser = new FileReader();
    leser.onload = () => fertig({ name: datei.name, text: String(leser.result ?? '') });
    leser.onerror = () => fehler(leser.error ?? new Error(`${datei.name} ist nicht lesbar.`));
    leser.readAsText(datei);
  });
}
