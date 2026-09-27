import { normalisiere, tokenisiere } from '../suche/logic';
import { formatiereTagDatum, istIsoDatum } from '../tagebuch/modell';

// ─────────────────────────────────────────────────────────────────────────────
// Dokumente — Datenmodell. Reines TypeScript ohne React und ohne Dateizugriff →
// deterministisch testbar. Ein Dokument ist eine in die App KOPIERTE Datei plus
// ein Eintrag im Index `dokumente.json`. Die Abteilung (`art`) und der Tagebuchtag
// (`tag`) sind getrennte Angaben: ein Anhang, der vom Tag aus hineinkam, kann
// später zu den Zertifikaten wandern und bleibt trotzdem an seinem Tag hängen.
// ─────────────────────────────────────────────────────────────────────────────

export const ARTEN = ['zertifikat', 'dokument', 'anhang'] as const;
export type Art = (typeof ARTEN)[number];

/** Überschriften der drei Abteilungen. */
export const ART_TITEL: Readonly<Record<Art, string>> = {
  zertifikat: 'Zertifikate',
  dokument: 'Wichtige Dokumente',
  anhang: 'Aus dem Tagebuch',
};

export interface Dokument {
  /** Kennung: zehn Zeichen a–z, 0–9 (vergibt die Rust-Seite beim Import). */
  id: string;
  /** Dateiname im Dokumente-Ordner: `<id>_<Originalname>`. */
  datei: string;
  /** Anzeigename — beim Import der Originalname, danach frei änderbar. */
  name: string;
  art: Art;
  /** Tagebuchtag, an dem das Dokument hängt — oder null. */
  tag: string | null;
  notiz: string;
  /** Zeitpunkt des Imports (ISO 8601). */
  hinzugefuegt: string;
  /** Größe in Bytes. */
  groesse: number;
  /** Endung in Kleinbuchstaben, leer ohne Endung. */
  typ: string;
}

export interface DokumenteIndex {
  version: 1;
  dokumente: Dokument[];
}

export const INDEX_VERSION = 1;
export const ID_MUSTER = /^[a-z0-9]{10}$/;
export const NAME_MAX = 120;
export const NOTIZ_MAX = 2000;

export function istArt(v: unknown): v is Art {
  return (ARTEN as readonly unknown[]).includes(v);
}

/** Eine Abteilung „Aus dem Tagebuch“ ohne Tag gibt es nicht — dann ist es ein wichtiges Dokument. */
function passendeArt(art: unknown, tag: string | null): Art {
  if (!istArt(art)) return tag ? 'anhang' : 'dokument';
  return art === 'anhang' && tag === null ? 'dokument' : art;
}

/**
 * Tolerantes Einlesen des Index: fehlerhafte Einträge werden verworfen, doppelte
 * Kennungen zählen einmal. Wirft NUR, wenn der Index von einer neueren App-Version
 * stammt — dann darf diese App ihn nicht überschreiben.
 */
export function normalisiereIndex(roh: unknown): DokumenteIndex {
  const dokumente: Dokument[] = [];
  if (roh && typeof roh === 'object') {
    const r = roh as { version?: unknown; dokumente?: unknown };
    if (typeof r.version === 'number' && r.version > INDEX_VERSION) {
      throw new Error(`Dokumente-Index der Version ${r.version} ist neuer als diese App (Version ${INDEX_VERSION}).`);
    }
    if (Array.isArray(r.dokumente)) {
      const gesehen = new Set<string>();
      for (const wert of r.dokumente as unknown[]) {
        if (!wert || typeof wert !== 'object') continue;
        const w = wert as Partial<Record<keyof Dokument, unknown>>;
        if (typeof w.id !== 'string' || !ID_MUSTER.test(w.id) || gesehen.has(w.id)) continue;
        if (typeof w.datei !== 'string' || !w.datei.startsWith(`${w.id}_`)) continue;
        const tag = typeof w.tag === 'string' && istIsoDatum(w.tag) ? w.tag : null;
        const name = typeof w.name === 'string' && w.name.trim() !== '' ? w.name : w.datei.slice(w.id.length + 1);
        gesehen.add(w.id);
        dokumente.push({
          id: w.id,
          datei: w.datei,
          name,
          art: passendeArt(w.art, tag),
          tag,
          notiz: typeof w.notiz === 'string' ? w.notiz : '',
          hinzugefuegt: typeof w.hinzugefuegt === 'string' ? w.hinzugefuegt : '',
          groesse: typeof w.groesse === 'number' && Number.isFinite(w.groesse) && w.groesse >= 0 ? w.groesse : 0,
          typ: typeof w.typ === 'string' ? w.typ.toLowerCase() : '',
        });
      }
    }
  }
  return { version: INDEX_VERSION, dokumente };
}

/** Neueste zuerst; bei gleichem Zeitpunkt nach Namen. */
export function sortiere(dokumente: readonly Dokument[]): Dokument[] {
  return [...dokumente].sort(
    (a, b) => b.hinzugefuegt.localeCompare(a.hinzugefuegt) || a.name.localeCompare(b.name, 'de') || a.id.localeCompare(b.id),
  );
}

/** Die drei Abteilungen, jede neueste zuerst. */
export function nachArt(dokumente: readonly Dokument[]): Record<Art, Dokument[]> {
  const out: Record<Art, Dokument[]> = { zertifikat: [], dokument: [], anhang: [] };
  for (const d of sortiere(dokumente)) out[d.art].push(d);
  return out;
}

export interface Tagesgruppe {
  tag: string;
  dokumente: Dokument[];
}

/** Dokumente nach ihrem Tagebuchtag gruppiert: neuester Tag zuerst, im Tag in der Reihenfolge des Hinzufügens. */
export function nachTag(dokumente: readonly Dokument[]): Tagesgruppe[] {
  const gruppen = new Map<string, Dokument[]>();
  for (const d of dokumente) {
    if (d.tag === null) continue;
    const g = gruppen.get(d.tag);
    if (g) g.push(d);
    else gruppen.set(d.tag, [d]);
  }
  return [...gruppen.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([tag, liste]) => ({ tag, dokumente: inReihenfolge(liste) }));
}

function inReihenfolge(liste: readonly Dokument[]): Dokument[] {
  return [...liste].sort((a, b) => a.hinzugefuegt.localeCompare(b.hinzugefuegt) || a.name.localeCompare(b.name, 'de'));
}

/** Die Anhänge eines Tagebuchtags (gleich welcher Abteilung), in der Reihenfolge des Hinzufügens. */
export function anhaengeFuer(dokumente: readonly Dokument[], datum: string): Dokument[] {
  return inReihenfolge(dokumente.filter((d) => d.tag === datum));
}

/** Alle Tage, an denen mindestens ein Dokument hängt. */
export function tageMitAnhaengen(dokumente: readonly Dokument[]): Set<string> {
  const out = new Set<string>();
  for (const d of dokumente) if (d.tag !== null) out.add(d.tag);
  return out;
}

/**
 * Suche über Name, Notiz, Dateityp, Abteilung und Tag (ISO und „26.09.2026“) —
 * dieselbe Faltung wie die Artikelsuche, AND über alle Suchwörter, neueste zuerst.
 */
export function sucheDokumente(dokumente: readonly Dokument[], roh: string): Dokument[] {
  const tokens = tokenisiere(roh);
  if (tokens.length === 0) return [];
  return sortiere(dokumente).filter((d) => {
    const feld = normalisiere(
      [d.name, d.notiz, d.typ, ART_TITEL[d.art], d.tag ?? '', d.tag ? formatiereTagDatum(d.tag) : ''].join(' \n '),
    );
    return tokens.every((t) => feld.includes(t));
  });
}

const fmtZahl = new Intl.NumberFormat('de-DE', { maximumFractionDigits: 1 });
const EINHEITEN = ['B', 'KB', 'MB', 'GB', 'TB'] as const;

/** „0 B“, „512 B“, „1,4 KB“, „2,3 MB“ — Basis 1024, wie der Explorer. */
export function formatiereGroesse(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  let wert = bytes;
  let i = 0;
  while (wert >= 1024 && i < EINHEITEN.length - 1) {
    wert /= 1024;
    i++;
  }
  // Ab 100 ohne Nachkommastelle, Bytes immer ganz.
  const text = i === 0 || wert >= 100 ? String(Math.round(wert)) : fmtZahl.format(wert);
  return `${text} ${EINHEITEN[i]}`;
}

export type VorschauArt = 'bild' | 'pdf';

const BILD_TYPEN = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'avif', 'svg']);

/** Was die App selbst anzeigen kann: Bilder und PDF. Alles andere öffnet das Standardprogramm. */
export function vorschauArt(typ: string): VorschauArt | null {
  const t = typ.toLowerCase();
  if (t === 'pdf') return 'pdf';
  return BILD_TYPEN.has(t) ? 'bild' : null;
}

/** „PDF“, „DOCX“ — oder „Datei“, wenn es keine Endung gibt. */
export function typLabel(typ: string): string {
  return typ.trim() === '' ? 'Datei' : typ.toUpperCase();
}

const fmtZeit = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
const fmtTag = new Intl.DateTimeFormat('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });

/** „27.09.2026“ in lokaler Zeit; „—“ bei ungültigem Wert. */
export function formatiereHinzugefuegt(isoZeit: string, mitUhrzeit = false): string {
  const d = new Date(isoZeit);
  if (isoZeit === '' || Number.isNaN(d.getTime())) return '—';
  return (mitUhrzeit ? fmtZeit : fmtTag).format(d);
}

/** „1 Dokument“, „3 Dokumente“ */
export function zaehleText(n: number, einzahl = 'Dokument', mehrzahl = 'Dokumente'): string {
  return `${n} ${n === 1 ? einzahl : mehrzahl}`;
}
