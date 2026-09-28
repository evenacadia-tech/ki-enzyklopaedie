import { GRUNDLAGEN_ID, type Artikel, type Enzyklopaedie, type Quelle } from '../inhalt';
import type { Vertiefung } from './vertiefungen';

// ─────────────────────────────────────────────────────────────────────────────
// Eine Markdown-Datei je Artikel als Quelle für NotebookLM (Audio-Übersicht). Der
// Nutzer lädt je Podcast genau eine Datei hoch; der Text muss deshalb für sich allein
// tragen: Titel, Einleitung, der volle Artikel, die Einordnung in die Enzyklopädie und
// die Quellen. Artikel mit Gliederung kommen WÖRTLICH hinein (der Podcast soll zum
// Artikel passen); Grundlagen-Artikel ohne Gliederung in ihrer Vertiefung
// (`vertiefungen/`).
//
// Die Ablage bildet das Themen-Register der App ab (Wunsch des Users: jede Datei und
// später jedes Audio eindeutig dem Artikel in der App zuordnen können): ein Ordner je
// Abteilung der Seitenleiste, in derselben Reihenfolge; Datei = laufende Nummer 001–111
// in Register-Reihenfolge + Titel wie in der App. `Übersicht.md` listet alle Nummern.
// Die Nummer ist eine Übergabe-Hilfe und kann sich verschieben, wenn Artikel dazukommen;
// dauerhaft hängt das Audio an der Artikel-ID.
// ─────────────────────────────────────────────────────────────────────────────

export interface PodcastQuelle {
  artikelId: string;
  /** Laufende Nummer in Register-Reihenfolge (1-basiert). */
  nummer: number;
  /** Relativ zum Ausgabeordner, mit `/`: `<Abteilung>/<Nummer> <Titel>.md`. */
  pfad: string;
  inhalt: string;
}

export interface PodcastQuellen {
  dateien: PodcastQuelle[];
  /** Inhalt von `Übersicht.md`: jede Nummer mit Titel und Fundort in der App. */
  uebersicht: string;
  /** Grundlagen-Artikel ohne Gliederung, deren Vertiefung noch fehlt — sie bekommen keine Datei. */
  fehlend: string[];
}

export const UEBERSICHT_DATEI = 'Übersicht.md';

const zweistellig = (n: number) => String(n).padStart(2, '0');
const dreistellig = (n: number) => String(n).padStart(3, '0');

/** ISO `2026-09-26` → `26.09.2026`. */
function datumDe(iso: string): string {
  const [j, m, t] = iso.split('-');
  return `${t}.${m}.${j}`;
}

function spaetestesAbrufdatum(quellen: readonly Quelle[]): string {
  return quellen.map((q) => q.abgerufen).reduce((a, b) => (b > a ? b : a));
}

/**
 * Ein Titel als Windows-Dateiname, so nah am Original wie möglich: „A: b“ und „A? B“
 * werden „A – b“ bzw. „A – B“, ein Schrägstrich ein Bindestrich; was Windows sonst
 * verbietet, fällt weg, ebenso Punkte und Leerzeichen am Ende.
 */
export function dateiTitel(titel: string): string {
  return titel
    .replace(/[:?]\s+/g, ' – ')
    .replace(/[:?]/g, '')
    .replace(/\//g, '-')
    .replace(/[<>"\\|*]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/, '');
}

function rendere(
  a: Artikel,
  enz: Enzyklopaedie,
  vertiefung: Vertiefung | undefined,
  einleitungVon: (id: string) => string,
): string {
  const abschnitte = vertiefung?.abschnitte ?? a.abschnitte;
  const quellen = vertiefung?.quellen ?? a.quellen;
  if (!abschnitte) throw new Error(`podcast: Artikel ${a.id} hat weder Gliederung noch Vertiefung`);

  const strecke = enz.lesestrecke(a.id);
  const thema = `Thema „${enz.themaLabel(a.thema)}“`;
  const herkunft =
    (a.sammlung === GRUNDLAGEN_ID
      ? `Ein Artikel der KI-Enzyklopädie aus den Grundlagen, ${thema}.`
      : `Ein Artikel der KI-Enzyklopädie aus der Sammlung „${enz.sammlungTitel(a.sammlung)}“, ${thema}` +
        (strecke ? `, Teil ${strecke.position} von ${strecke.gesamt} der Lesestrecke.` : '.')) +
    (a.synonyme.length > 0 ? ` Auch bekannt als: ${a.synonyme.join(', ')}.` : '');

  const zeilen: string[] = [`# ${a.titel}`, '', einleitungVon(a.id), '', herkunft, ''];
  if (a.unsicher) {
    zeilen.push(
      `Hinweis: Dieses Thema ist im Wandel. Der Text gibt den Stand seiner Quellen vom ` +
        `${datumDe(spaetestesAbrufdatum(quellen))} wieder; spätere Entwicklungen sind nicht berücksichtigt.`,
      '',
    );
  }
  for (const s of abschnitte) zeilen.push(`## ${s.titel}`, '', ...s.absaetze.flatMap((p) => [p, '']));

  zeilen.push('## Einordnung in der Enzyklopädie', '');
  if (strecke) {
    const { vorheriger: vor, naechster: nach, sammlungTitel: s } = strecke;
    const satz =
      vor && nach
        ? `In der Lesestrecke „${s}“ steht davor „${vor.titel}“, danach folgt „${nach.titel}“.`
        : nach
          ? `Dieser Artikel eröffnet die Lesestrecke „${s}“, danach folgt „${nach.titel}“.`
          : vor
            ? `Dieser Artikel schließt die Lesestrecke „${s}“ ab, davor steht „${vor.titel}“.`
            : '';
    if (satz) zeilen.push(satz, '');
  }
  if (a.verweise.length > 0) {
    zeilen.push('Verwandte Artikel:', '');
    for (const v of a.verweise) zeilen.push(`- **${v.titel}**: ${einleitungVon(v.id)}`);
    zeilen.push('');
  }

  zeilen.push('## Quellen', '');
  for (const q of quellen) zeilen.push(`- ${q.titel}. ${q.url} (abgerufen am ${datumDe(q.abgerufen)})`);
  return zeilen.join('\n') + '\n';
}

/**
 * Alle Quellen-Dateien in Register-Reihenfolge plus die Übersicht. Wirft laut, wenn eine
 * Vertiefung ins Leere zeigt, doppelt ist oder einen Artikel trifft, der schon gegliedert
 * ist (dann wäre unklar, welcher Text gilt). Ein Artikel ohne Gliederung und ohne
 * Vertiefung behält seine Nummer, bekommt aber keine Datei und landet in `fehlend` — ein
 * Podcast aus 60 Wörtern hätte nichts zu erzählen; der Test verlangt `fehlend` leer.
 */
export function podcastQuellen(enz: Enzyklopaedie, vertiefungen: readonly Vertiefung[]): PodcastQuellen {
  const nachId = new Map<string, Vertiefung>();
  for (const v of vertiefungen) {
    const a = enz.nachId(v.id);
    if (!a) throw new Error(`podcast: Vertiefung ${v.id} trifft keinen Artikel`);
    if (a.abschnitte) throw new Error(`podcast: Artikel ${v.id} ist schon gegliedert, die Vertiefung wäre ein zweiter Text`);
    if (nachId.has(v.id)) throw new Error(`podcast: doppelte Vertiefung ${v.id}`);
    nachId.set(v.id, v);
  }
  // Eine ersetzte Einleitung gilt überall, auch in der Liste „Verwandte Artikel“ anderer Dateien.
  const einleitungVon = (id: string) => nachId.get(id)?.einleitung ?? enz.nachId(id)!.einleitung;

  const dateien: PodcastQuelle[] = [];
  const fehlend: string[] = [];
  const liste: string[] = [];
  let nummer = 0;
  let ordnerNr = 0;
  for (const ebene of enz.gliederung()) {
    for (const ab of ebene.abteilungen) {
      const art = ebene.id === 'grundlagen' ? 'Grundlagen' : 'Sammlung';
      const ordner = `${zweistellig(++ordnerNr)} ${art} – ${dateiTitel(ab.titel)}`;
      liste.push(`## ${art} – ${ab.titel}`, '', '| Nr. | Titel in der App |', '| --- | --- |');
      for (const a of ab.artikel) {
        const nr = dreistellig(++nummer);
        const v = nachId.get(a.id);
        if (!a.abschnitte && !v) {
          fehlend.push(a.id);
          liste.push(`| ${nr} | ${a.titel} (Datei fehlt noch) |`);
          continue;
        }
        liste.push(`| ${nr} | ${a.titel} |`);
        dateien.push({ artikelId: a.id, nummer, pfad: `${ordner}/${nr} ${dateiTitel(a.titel)}.md`, inhalt: rendere(a, enz, v, einleitungVon) });
      }
      liste.push('');
    }
  }

  const uebersicht = [
    '# Übersicht: welche Datei zu welchem Artikel gehört',
    '',
    `${nummer} Artikel, geordnet wie das Register „Themen“ in der Seitenleiste der App: erst die ` +
      'Grundlagen nach Thema (darin alphabetisch), dann die Sammlungen in ihrer Lesereihenfolge. ' +
      'Jeder Ordner hier ist ein Abschnitt der Seitenleiste; jede Datei beginnt mit ihrer Nummer, ' +
      'danach steht der Titel so, wie er in der App steht (Doppelpunkt und Fragezeichen sind im ' +
      'Dateinamen ein Gedankenstrich, ein Schrägstrich ein Bindestrich).',
    '',
    'Beim Übergeben einer Audiodatei die Nummer vorne in den Dateinamen schreiben (z. B. „057.wav“) ' +
      'oder die Nummer dazusagen.',
    '',
    ...liste,
  ].join('\n');

  return { dateien, uebersicht, fehlend };
}
