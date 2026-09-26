import type { Artikel } from '../inhalt';

// ─────────────────────────────────────────────────────────────────────────────
// Suche — reines TypeScript, ohne React → deterministisch testbar. Eine einzige
// Suche über Titel, Synonyme und Fließtext (AND über alle Wörter der Eingabe),
// umlaut- und akzent-tolerant („bussgeld" findet „Bußgeld"). Das Ranking setzt
// Titel-Treffer vor Synonym- vor Text-Treffer; Gleichstand entscheidet der Titel.
// Snippets und Hervorhebungen kommen aus dem ORIGINAL-Text: die Faltung merkt sich
// je gefaltetem Zeichen den Ursprungs-Index, damit „ß"→„ss" die Positionen nicht
// verschiebt.
// ─────────────────────────────────────────────────────────────────────────────

/** Faltung eines Zeichens: klein, ohne Diakritika, ß→ss. Kann 0–2 Zeichen liefern. */
function falteZeichen(z: string): string {
  return z
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ß/g, 'ss');
}

export function normalisiere(text: string): string {
  return falteZeichen(text).trim();
}

/** Text → Suchwörter (an allem außer Buchstaben/Ziffern getrennt, leere entfallen). */
export function tokenisiere(text: string): string[] {
  return normalisiere(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 0);
}

interface Gefaltet {
  text: string;
  /** Für jedes gefaltete Zeichen der Index des Ursprungszeichens. */
  map: number[];
}

/** Faltet Text und behält die Abbildung auf die Ursprungs-Indizes. */
export function falte(text: string): Gefaltet {
  let out = '';
  const map: number[] = [];
  let i = 0;
  for (const z of text) {
    const g = falteZeichen(z);
    for (let k = 0; k < g.length; k++) map.push(i);
    out += g;
    i += z.length;
  }
  return { text: out, map };
}

export interface Segment {
  text: string;
  treffer: boolean;
}

/** Zerlegt `text` in Segmente, in denen die Fundstellen der `tokens` markiert sind. */
export function hervorhebe(text: string, tokens: readonly string[]): Segment[] {
  const g = falte(text);
  const marken = new Array<boolean>(text.length).fill(false);
  for (const t of tokens) {
    if (t === '') continue;
    let von = 0;
    while (true) {
      const p = g.text.indexOf(t, von);
      if (p === -1) break;
      const start = g.map[p];
      const ende = g.map[p + t.length - 1];
      for (let k = start; k <= ende; k++) marken[k] = true;
      von = p + 1;
    }
  }
  const segmente: Segment[] = [];
  let aktuell: Segment | null = null;
  for (let k = 0; k < text.length; k++) {
    const z = text[k];
    if (aktuell && aktuell.treffer === marken[k]) aktuell.text += z;
    else {
      aktuell = { text: z, treffer: marken[k] };
      segmente.push(aktuell);
    }
  }
  return segmente;
}

export interface Snippet {
  vor: string;
  kern: string;
  nach: string;
  /** Am Anfang/Ende gekürzt (Ellipsen in der Anzeige). */
  abAnfang: boolean;
  bisEnde: boolean;
}

const SNIPPET_RAND = 90;

/** Kontext-Ausschnitt um die erste Fundstelle von `token` in `text` — oder null. */
export function macheSnippet(text: string, token: string, rand = SNIPPET_RAND): Snippet | null {
  const g = falte(text);
  const p = g.text.indexOf(token);
  if (p === -1) return null;
  const start = g.map[p];
  const ende = g.map[p + token.length - 1] + 1;

  // Links `rand` Zeichen Kontext, auf die nächste Wortgrenze vorgerückt; rechts analog.
  let a = Math.max(0, start - rand);
  if (a > 0) {
    const naechstesLeer = text.indexOf(' ', a);
    if (naechstesLeer !== -1 && naechstesLeer < start) a = naechstesLeer + 1;
  }
  let b = Math.min(text.length, ende + rand);
  if (b < text.length) {
    const leer = text.indexOf(' ', b);
    b = leer === -1 ? text.length : leer;
  }
  return {
    vor: text.slice(a, start),
    kern: text.slice(start, ende),
    nach: text.slice(ende, b),
    abAnfang: a === 0,
    bisEnde: b === text.length,
  };
}

export type TrefferFeld = 'titel' | 'synonym' | 'text';

export interface Treffer {
  artikel: Artikel;
  rang: number;
  /** Bestes Feld des ersten Suchworts — steuert die Anzeige. */
  feld: TrefferFeld;
  snippet: Snippet | null;
}

const RANG_TITEL_ANFANG = 30;
const RANG_TITEL = 20;
const RANG_SYNONYM = 15;
const RANG_TEXT = 5;
/** Die ganze Eingabe trifft Titel bzw. ein Synonym wörtlich — der gesuchte Begriff selbst. */
const RANG_GANZ_TITEL = 40;
const RANG_GANZ_SYNONYM = 25;

function leseText(a: Artikel): string[] {
  return [a.einleitung, ...a.absaetze];
}

/**
 * Sucht `roh` in der Liste. Alle Wörter der Eingabe müssen treffen (AND, in einem
 * beliebigen Feld). Leere Eingabe → keine Treffer (die Ansicht zeigt dann das Register).
 */
export function suche(liste: readonly Artikel[], roh: string, grenze = 60): Treffer[] {
  const tokens = tokenisiere(roh);
  if (tokens.length === 0) return [];
  const ganz = tokens.join(' ');
  const out: Treffer[] = [];

  for (const a of liste) {
    const titel = normalisiere(a.titel);
    const synonyme = normalisiere(a.synonyme.join(' | '));
    const text = normalisiere(leseText(a).join(' '));
    let rang = 0;
    if (tokenisiere(a.titel).join(' ') === ganz) rang += RANG_GANZ_TITEL;
    else if (a.synonyme.some((s) => tokenisiere(s).join(' ') === ganz)) rang += RANG_GANZ_SYNONYM;
    let feld: TrefferFeld | null = null;
    let alle = true;
    for (const t of tokens) {
      let f: TrefferFeld;
      if (titel.includes(t)) {
        rang += titel.startsWith(t) ? RANG_TITEL_ANFANG : RANG_TITEL;
        f = 'titel';
      } else if (synonyme.includes(t)) {
        rang += RANG_SYNONYM;
        f = 'synonym';
      } else if (text.includes(t)) {
        rang += RANG_TEXT;
        f = 'text';
      } else {
        alle = false;
        break;
      }
      feld ??= f;
    }
    if (!alle || feld === null) continue;

    // Snippet: erster Absatz (Einleitung zuerst), der das erste Suchwort trägt.
    let snippet: Snippet | null = null;
    for (const absatz of leseText(a)) {
      snippet = macheSnippet(absatz, tokens[0]);
      if (snippet) break;
    }
    out.push({ artikel: a, rang, feld, snippet });
  }

  // Gleichstand: der kürzere Titel ist der spezifischere Treffer, dann alphabetisch.
  out.sort(
    (x, y) =>
      y.rang - x.rang ||
      x.artikel.titel.length - y.artikel.titel.length ||
      x.artikel.titel.localeCompare(y.artikel.titel, 'de'),
  );
  return out.slice(0, grenze);
}
