// ─────────────────────────────────────────────────────────────────────────────
// Tagebuch — Datenmodell und Kalender-Arithmetik. Reines TypeScript ohne React
// und ohne eigenen Uhr-Zugriff (die Uhr wird hereingereicht) → deterministisch
// testbar. Ein Tag ist ein ISO-Datum „YYYY-MM-DD“ in LOKALER Zeit des Nutzers;
// gerechnet wird in UTC-Millisekunden, damit Zeitumstellungen keinen Tag
// verschieben. Die Woche beginnt am Montag.
// ─────────────────────────────────────────────────────────────────────────────

export interface Eintrag {
  /** Freier Text des Tages. */
  text: string;
  /** Tag als besonderes Ereignis markiert. */
  markiert: boolean;
  /** Kurzbezeichnung des Ereignisses (sinnvoll nur, wenn markiert). */
  ereignis: string;
  /** Zeitpunkt der letzten Änderung (ISO 8601). */
  geaendert: string;
}

export type Tage = Record<string, Eintrag>;

export interface TagebuchDaten {
  version: 1;
  tage: Tage;
}

export const DATEN_VERSION = 1;

export const LEER: Readonly<Eintrag> = Object.freeze({ text: '', markiert: false, ereignis: '', geaendert: '' });

export const WOCHENTAGE = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const;

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

export interface Datumsteile {
  jahr: number;
  monat: number;
  tag: number;
}

/** Zerlegt ein ISO-Datum; null, wenn Form oder Kalendertag ungültig sind (z. B. 2026-02-30). */
export function zerlege(iso: string): Datumsteile | null {
  const m = ISO.exec(iso);
  if (!m) return null;
  const jahr = Number(m[1]);
  const monat = Number(m[2]);
  const tag = Number(m[3]);
  const d = new Date(Date.UTC(jahr, monat - 1, tag));
  if (d.getUTCFullYear() !== jahr || d.getUTCMonth() !== monat - 1 || d.getUTCDate() !== tag) return null;
  return { jahr, monat, tag };
}

export function istIsoDatum(s: string): boolean {
  return zerlege(s) !== null;
}

export function baue(jahr: number, monat: number, tag: number): string {
  return `${String(jahr).padStart(4, '0')}-${String(monat).padStart(2, '0')}-${String(tag).padStart(2, '0')}`;
}

/** Das heutige Datum in lokaler Zeit. */
export function heute(jetzt: Date = new Date()): string {
  return baue(jetzt.getFullYear(), jetzt.getMonth() + 1, jetzt.getDate());
}

function utc(iso: string): Date {
  const z = zerlege(iso);
  if (!z) throw new Error(`tagebuch: kein gültiges ISO-Datum: ${JSON.stringify(iso)}`);
  return new Date(Date.UTC(z.jahr, z.monat - 1, z.tag));
}

function ausUtc(d: Date): string {
  return baue(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

export function verschiebeTag(iso: string, tage: number): string {
  const d = utc(iso);
  d.setUTCDate(d.getUTCDate() + tage);
  return ausUtc(d);
}

export function verschiebeMonat(jahr: number, monat: number, monate: number): { jahr: number; monat: number } {
  const index = jahr * 12 + (monat - 1) + monate;
  return { jahr: Math.floor(index / 12), monat: ((index % 12) + 12) % 12 + 1 };
}

/** Montag = 0 … Sonntag = 6. */
export function wochentag(iso: string): number {
  return (utc(iso).getUTCDay() + 6) % 7;
}

export interface Zelle {
  datum: string;
  imMonat: boolean;
}

/** Immer 6 Wochen × 7 Tage ab dem Montag vor/am Monatsersten — der Kalender behält so seine Höhe. */
export function monatsraster(jahr: number, monat: number): Zelle[] {
  const erster = baue(jahr, monat, 1);
  const start = verschiebeTag(erster, -wochentag(erster));
  return Array.from({ length: 42 }, (_, i) => {
    const datum = verschiebeTag(start, i);
    const z = zerlege(datum)!;
    return { datum, imMonat: z.jahr === jahr && z.monat === monat };
  });
}

const fmtLang = new Intl.DateTimeFormat('de-DE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});
const fmtMonat = new Intl.DateTimeFormat('de-DE', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const fmtDatum = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' });
const fmtUhr = new Intl.DateTimeFormat('de-DE', { hour: '2-digit', minute: '2-digit' });

/** „Freitag, 26. September 2026“ */
export function formatiereTagLang(iso: string): string {
  return fmtLang.format(utc(iso));
}

/** „September 2026“ */
export function formatiereMonat(jahr: number, monat: number): string {
  return fmtMonat.format(new Date(Date.UTC(jahr, monat - 1, 1)));
}

/** „Fr 26.09.“ — Wochentag aus der eigenen Liste (kein Punkt, kein Komma → schmale Spalten). */
export function formatiereTagKurz(iso: string): string {
  const z = zerlege(iso);
  if (!z) throw new Error(`tagebuch: kein gültiges ISO-Datum: ${JSON.stringify(iso)}`);
  return `${WOCHENTAGE[wochentag(iso)]} ${String(z.tag).padStart(2, '0')}.${String(z.monat).padStart(2, '0')}.`;
}

/** „26.09.2026“ */
export function formatiereTagDatum(iso: string): string {
  return fmtDatum.format(utc(iso));
}

/** Uhrzeit eines ISO-8601-Zeitstempels in lokaler Zeit, „14:32“; leer bei ungültigem Wert. */
export function formatiereUhrzeit(isoZeit: string): string {
  const d = new Date(isoZeit);
  return Number.isNaN(d.getTime()) ? '' : fmtUhr.format(d);
}

export function istLeer(e: Eintrag): boolean {
  return e.text.trim() === '' && !e.markiert && e.ereignis.trim() === '';
}

/** Erste nicht-leere Zeile, gekürzt — die Vorschau in der Liste. */
export function ersteZeile(text: string, max = 64): string {
  const zeile = text
    .split(/\r?\n/)
    .map((z) => z.trim())
    .find((z) => z !== '');
  if (!zeile) return '';
  return zeile.length > max ? zeile.slice(0, max - 1).trimEnd() + '…' : zeile;
}

export function zaehleWoerter(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Tolerantes Einlesen gespeicherter Daten: fehlerhafte Einträge werden verworfen,
 * leere entfallen. Wirft NUR, wenn die Daten von einer neueren App-Version stammen —
 * dann darf diese App sie nicht überschreiben.
 */
export function normalisiereDaten(roh: unknown): TagebuchDaten {
  const tage: Tage = {};
  if (roh && typeof roh === 'object') {
    const r = roh as { version?: unknown; tage?: unknown };
    if (typeof r.version === 'number' && r.version > DATEN_VERSION) {
      throw new Error(`Tagebuch-Daten der Version ${r.version} sind neuer als diese App (Version ${DATEN_VERSION}).`);
    }
    if (r.tage && typeof r.tage === 'object') {
      for (const [datum, wert] of Object.entries(r.tage as Record<string, unknown>)) {
        if (!istIsoDatum(datum) || !wert || typeof wert !== 'object') continue;
        const w = wert as Partial<Record<keyof Eintrag, unknown>>;
        const e: Eintrag = {
          text: typeof w.text === 'string' ? w.text : '',
          markiert: w.markiert === true,
          ereignis: typeof w.ereignis === 'string' ? w.ereignis : '',
          geaendert: typeof w.geaendert === 'string' ? w.geaendert : '',
        };
        if (!istLeer(e)) tage[datum] = e;
      }
    }
  }
  return { version: DATEN_VERSION, tage };
}

/** Alle Tage mit Eintrag, aufsteigend. */
export function sortierteTage(tage: Tage): string[] {
  return Object.keys(tage).sort();
}

/** Der nächste (+1) bzw. vorherige (−1) Tag mit Eintrag relativ zu `datum` — oder null. */
export function nachbarEintrag(tage: Tage, datum: string, richtung: 1 | -1): string | null {
  const liste = sortierteTage(tage);
  if (richtung === 1) return liste.find((d) => d > datum) ?? null;
  for (let i = liste.length - 1; i >= 0; i--) if (liste[i] < datum) return liste[i];
  return null;
}

/** Tage im Monat (28–31). */
export function tageImMonat(jahr: number, monat: number): number {
  return new Date(Date.UTC(jahr, monat, 0)).getUTCDate();
}

/**
 * ISO-8601-Kalenderwoche („KW“): die Woche, in der der erste Donnerstag des
 * Jahres liegt, ist KW 1. Gerechnet über den Donnerstag derselben Woche.
 */
export function kalenderwoche(iso: string): number {
  const d = utc(iso);
  d.setUTCDate(d.getUTCDate() + 3 - wochentag(iso));
  const jahresanfang = Date.UTC(d.getUTCFullYear(), 0, 1);
  return Math.floor((d.getTime() - jahresanfang) / 86400000 / 7) + 1;
}

/** Ganze Tage von `von` bis `bis` (negativ, wenn `bis` früher liegt). */
export function tageZwischen(von: string, bis: string): number {
  return Math.round((utc(bis).getTime() - utc(von).getTime()) / 86400000);
}

/** „heute“, „morgen“, „in 5 Tagen“ — für den Hinweis auf das nächste Ereignis. */
export function inTagenText(tage: number): string {
  if (tage <= 0) return 'heute';
  if (tage === 1) return 'morgen';
  return `in ${tage} Tagen`;
}

/** Der erste markierte Tag ab `abDatum` (einschließlich) — oder null. */
export function naechstesEreignis(tage: Tage, abDatum: string): string | null {
  return sortierteTage(tage).find((d) => d >= abDatum && tage[d].markiert) ?? null;
}

export interface Frage {
  datum: string;
  text: string;
}

/** Zeilen, die mit „?“ beginnen — die offenen Fragen eines Textes, ohne das Fragezeichen. */
export function fragenImText(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((z) => z.trim())
    .filter((z) => z.startsWith('?'))
    .map((z) => z.slice(1).trim())
    .filter((z) => z !== '');
}

/** Alle offenen Fragen des Tagebuchs: neueste Tage zuerst, innerhalb des Tages in Textreihenfolge. */
export function offeneFragen(tage: Tage): Frage[] {
  const out: Frage[] = [];
  for (const datum of sortierteTage(tage).reverse()) {
    for (const text of fragenImText(tage[datum].text)) out.push({ datum, text });
  }
  return out;
}

/** Kurzfassung für die Randspalte: bis zu `zeilen` nicht-leere Zeilen, höchstens `max` Zeichen. */
export function vorschau(text: string, zeilen = 3, max = 220): string {
  const alle = text
    .split(/\r?\n/)
    .map((z) => z.trim())
    .filter((z) => z !== '');
  let out = alle.slice(0, zeilen).join('\n');
  if (out.length > max) return out.slice(0, max - 1).trimEnd() + '…';
  if (alle.length > zeilen) out += ' …';
  return out;
}

export interface Monatsbilanz {
  monat: number;
  eintraege: number;
  ereignisse: number;
}

export const MONATE_KURZ = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'] as const;

/** Je Monat eines Jahres: Tage mit Eintrag und markierte Tage — die Jahresübersicht. */
export function jahresbilanz(tage: Tage, jahr: number): Monatsbilanz[] {
  const out: Monatsbilanz[] = Array.from({ length: 12 }, (_, i) => ({ monat: i + 1, eintraege: 0, ereignisse: 0 }));
  for (const [datum, e] of Object.entries(tage)) {
    const z = zerlege(datum);
    if (!z || z.jahr !== jahr) continue;
    out[z.monat - 1].eintraege++;
    if (e.markiert) out[z.monat - 1].ereignisse++;
  }
  return out;
}
