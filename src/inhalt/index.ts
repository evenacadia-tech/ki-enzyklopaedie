import roh from './artikel.json';
import type { ArtikelRoh, InhaltMeta, InhaltRoh, Sammlung, Thema } from './typen';
import { eigeneSammlungen, vereinige } from './sammlungen';
import { vertiefe, vertiefungen } from './vertiefungen';

export type { Quelle, Abschnitt, Thema, Sammlung, InhaltMeta } from './typen';

// ─────────────────────────────────────────────────────────────────────────────
// Die Enzyklopädie als Lese-Objekt. `erstelleEnzyklopaedie` ist zugleich der
// LOAD-GUARD: es wirft beim Modul-Laden, wenn der Bestand seinen eigenen Vertrag
// verletzt — doppelte oder nicht-kebab IDs, unbekanntes Thema/unbekannte Sammlung,
// Artikel ohne Rumpf oder ohne Quelle, tote oder selbstbezogene Querverweise, eine
// Gliederung, die nicht dieselben Absätze trägt wie der flache Rumpf. So kann kein
// Verweis in der Oberfläche ins Leere zeigen: Build, Test und App brechen laut.
// ─────────────────────────────────────────────────────────────────────────────

export interface Verweis {
  id: string;
  titel: string;
  thema: string;
  sammlung: string;
}

export interface Artikel extends ArtikelRoh {
  /** `sieheAuch` aufgelöst (Titel für die Anzeige). */
  verweise: Verweis[];
  /** Artikel, die auf diesen verweisen — die Rückrichtung des Netzes. */
  rueckverweise: Verweis[];
  /** Wörter im Lese-Text (Einleitung + Absätze) — Basis der Lesezeit. */
  woerter: number;
  /** Geschätzte Lesezeit in Minuten (≥ 1), 200 Wörter/min. */
  lesezeitMin: number;
}

export interface Abteilung {
  id: string;
  titel: string;
  artikel: Artikel[];
}

export interface Ebene {
  id: 'grundlagen' | 'sammlungen';
  titel: string;
  abteilungen: Abteilung[];
}

export interface Buchstabengruppe {
  buchstabe: string;
  artikel: Artikel[];
}

/** Stellung eines Artikels in der Lesereihenfolge seiner Sammlung (nicht für die Grundlagen). */
export interface Lesestrecke {
  sammlung: string;
  sammlungTitel: string;
  /** 1-basiert. */
  position: number;
  gesamt: number;
  vorheriger: Verweis | null;
  naechster: Verweis | null;
}

export interface Enzyklopaedie {
  meta: InhaltMeta;
  themen: Thema[];
  sammlungen: Sammlung[];
  /** Alle Artikel in Autoren-Reihenfolge. */
  liste: Artikel[];
  nachId(id: string): Artikel | undefined;
  themaLabel(id: string): string;
  sammlungTitel(id: string): string;
  /** Distinkte Quellen-URLs über den ganzen Bestand. */
  quellenAnzahl(): number;
  /** Themen-Register: Grundlagen nach Thema (alphabetisch), Sammlungen in Lesereihenfolge. */
  gliederung(): Ebene[];
  /** A–Z-Register: alphabetisch nach Titel, gruppiert nach Anfangsbuchstabe. */
  alphabetisch(): Buchstabengruppe[];
  /** Vor/Zurück in der Lesereihenfolge der Sammlung — null für Grundlagen-Artikel und unbekannte IDs. */
  lesestrecke(id: string): Lesestrecke | null;
}

/** Die Basis-Sammlung der Akademie — ihre 41 Artikel gliedern sich nach Thema. */
export const GRUNDLAGEN_ID = 'grundlagen-ki-consulting';

const KEBAB = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WOERTER_PRO_MINUTE = 200;

export function zaehleWoerter(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function erstelleEnzyklopaedie(daten: InhaltRoh): Enzyklopaedie {
  const themaById = new Map(daten.themen.map((t) => [t.id, t]));
  const sammlungById = new Map(daten.sammlungen.map((s) => [s.id, s]));
  const rohById = new Map<string, ArtikelRoh>();

  // Pass 1: strukturelle Wächter + Eindeutigkeit, bevor irgendein Verweis auflöst.
  for (const a of daten.artikel) {
    if (!KEBAB.test(a.id)) throw new Error(`enzyklopaedie: id ist kein kebab-case-Slug: ${JSON.stringify(a.id)}`);
    if (rohById.has(a.id)) throw new Error(`enzyklopaedie: doppelte Artikel-ID: ${a.id}`);
    if (a.titel.trim() === '') throw new Error(`enzyklopaedie: leerer Titel bei ${a.id}`);
    if (a.einleitung.trim() === '') throw new Error(`enzyklopaedie: leere Einleitung bei ${a.id}`);
    if (a.absaetze.length === 0) throw new Error(`enzyklopaedie: Artikel ${a.id} hat keinen Rumpf`);
    if (a.quellen.length === 0) throw new Error(`enzyklopaedie: Artikel ${a.id} ist unbelegt (keine Quelle)`);
    if (!themaById.has(a.thema)) throw new Error(`enzyklopaedie: Artikel ${a.id} trägt unbekanntes Thema „${a.thema}"`);
    if (!sammlungById.has(a.sammlung)) throw new Error(`enzyklopaedie: Artikel ${a.id} trägt unbekannte Sammlung „${a.sammlung}"`);
    if (a.abschnitte && a.abschnitte.length > 0) {
      const gegliedert = a.abschnitte.flatMap((s) => s.absaetze);
      const deckungsgleich =
        gegliedert.length === a.absaetze.length && gegliedert.every((p, i) => p === a.absaetze[i]);
      if (!deckungsgleich) {
        throw new Error(`enzyklopaedie: Artikel ${a.id}: Abschnitte tragen nicht dieselben Absätze wie der Rumpf`);
      }
    }
    rohById.set(a.id, a);
  }

  const verweisAuf = (a: ArtikelRoh): Verweis => ({ id: a.id, titel: a.titel, thema: a.thema, sammlung: a.sammlung });

  // Pass 2: Verweise auflösen (jetzt steht die volle ID-Menge) + Rückverweise sammeln.
  const rueck = new Map<string, Verweis[]>();
  for (const a of daten.artikel) {
    for (const zielId of a.sieheAuch) {
      if (zielId === a.id) throw new Error(`enzyklopaedie: Artikel ${a.id} verweist auf sich selbst`);
      const ziel = rohById.get(zielId);
      if (!ziel) throw new Error(`enzyklopaedie: toter Querverweis ${a.id} → ${zielId}`);
      const liste = rueck.get(zielId) ?? [];
      liste.push(verweisAuf(a));
      rueck.set(zielId, liste);
    }
  }

  const liste: Artikel[] = daten.artikel.map((a) => {
    const woerter = zaehleWoerter([a.einleitung, ...a.absaetze].join(' '));
    return {
      ...a,
      // Ein leeres `abschnitte: []` verhält sich wie ungesetzt.
      abschnitte: a.abschnitte && a.abschnitte.length > 0 ? a.abschnitte : undefined,
      verweise: a.sieheAuch.map((id) => verweisAuf(rohById.get(id)!)),
      rueckverweise: (rueck.get(a.id) ?? []).sort((x, y) => x.titel.localeCompare(y.titel, 'de')),
      woerter,
      lesezeitMin: Math.max(1, Math.round(woerter / WOERTER_PRO_MINUTE)),
    };
  });
  const byId = new Map(liste.map((a) => [a.id, a]));

  const themaLabel = (id: string) => themaById.get(id)?.label ?? id;
  const sammlungTitel = (id: string) => sammlungById.get(id)?.titel ?? id;
  const nachTitel = (x: Artikel, y: Artikel) => x.titel.localeCompare(y.titel, 'de');

  const gliederung = (): Ebene[] => {
    const grundlagen: Abteilung[] = [];
    for (const t of daten.themen) {
      const artikel = liste.filter((a) => a.sammlung === GRUNDLAGEN_ID && a.thema === t.id).sort(nachTitel);
      if (artikel.length > 0) grundlagen.push({ id: `thema-${t.id}`, titel: t.label, artikel });
    }
    const sammlungen: Abteilung[] = [];
    for (const s of daten.sammlungen) {
      if (s.id === GRUNDLAGEN_ID) continue;
      // Lesereihenfolge der Autoren (Lesestrecken bauen aufeinander auf) — nicht alphabetisch.
      const artikel = liste.filter((a) => a.sammlung === s.id);
      if (artikel.length > 0) sammlungen.push({ id: `sammlung-${s.id}`, titel: s.titel, artikel });
    }
    const ebenen: Ebene[] = [];
    if (grundlagen.length > 0) ebenen.push({ id: 'grundlagen', titel: 'Grundlagen', abteilungen: grundlagen });
    if (sammlungen.length > 0) ebenen.push({ id: 'sammlungen', titel: 'Sammlungen', abteilungen: sammlungen });
    return ebenen;
  };

  // Lesestrecken: je Sammlung außer den Grundlagen die Artikel in Autoren-Reihenfolge.
  const strecken = new Map<string, Lesestrecke>();
  for (const s of daten.sammlungen) {
    if (s.id === GRUNDLAGEN_ID) continue;
    const reihe = liste.filter((a) => a.sammlung === s.id);
    reihe.forEach((a, i) => {
      strecken.set(a.id, {
        sammlung: s.id,
        sammlungTitel: s.titel,
        position: i + 1,
        gesamt: reihe.length,
        vorheriger: i > 0 ? verweisAuf(reihe[i - 1]) : null,
        naechster: i < reihe.length - 1 ? verweisAuf(reihe[i + 1]) : null,
      });
    });
  }

  const alphabetisch = (): Buchstabengruppe[] => {
    const gruppen: Buchstabengruppe[] = [];
    for (const a of [...liste].sort(nachTitel)) {
      const erstes = a.titel.trim().charAt(0);
      // Umlaute zum Grundbuchstaben (DIN 5007-1: Ä = A, Ü = U): die deutsche Sortierung
      // mischt „Über…“ zwischen „Ub…“ und „Um…“, eine eigene Ü-Gruppe wäre also zerrissen.
      const grund = erstes.normalize('NFD').replace(/\p{M}/gu, '');
      const buchstabe = /\p{L}/u.test(grund) ? grund.toLocaleUpperCase('de') : '#';
      let g = gruppen.find((x) => x.buchstabe === buchstabe);
      if (!g) {
        g = { buchstabe, artikel: [] };
        gruppen.push(g);
      }
      g.artikel.push(a);
    }
    return gruppen;
  };

  return {
    meta: daten.meta,
    themen: daten.themen,
    sammlungen: daten.sammlungen,
    liste,
    nachId: (id) => byId.get(id),
    themaLabel,
    sammlungTitel,
    quellenAnzahl: () => new Set(liste.flatMap((a) => a.quellen.map((q) => q.url))).size,
    gliederung,
    alphabetisch,
    lesestrecke: (id) => strecken.get(id) ?? null,
  };
}

/** Die App-Enzyklopädie — Akademie-Export mit den Vertiefungen der Grundlagen + eigene
 *  Sammlungen, beim Modul-Laden vereinigt und geprüft (Load-Guard über den Gesamtbestand). */
export const enzyklopaedie: Enzyklopaedie = erstelleEnzyklopaedie(
  vereinige(vertiefe(roh as InhaltRoh, vertiefungen), eigeneSammlungen),
);
