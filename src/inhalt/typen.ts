// ─────────────────────────────────────────────────────────────────────────────
// Roh-Datenmodell der Enzyklopädie — exakt die Form von `artikel.json`, wie sie
// `scripts/export-aus-akademie.mts` aus der Akademie-App schreibt. Der Rumpf jedes
// Artikels ist dort bereits AUFGELÖST (Fließtext + Quellen der belegten Karteikarten),
// deshalb trägt diese App keine Karten, keine Packs und keine Registry mehr — nur
// lesbare Artikel. Was hier steht, ist Lesevertrag; `index.ts` prüft ihn beim Laden.
// ─────────────────────────────────────────────────────────────────────────────

export interface Quelle {
  titel: string;
  url: string;
  /** ISO-Datum (YYYY-MM-DD) des Abrufs — steht sichtbar an jeder Quelle. */
  abgerufen: string;
}

export interface Abschnitt {
  titel: string;
  absaetze: string[];
}

export interface ArtikelRoh {
  /** Stabiler kebab-case-Slug: Route (#/artikel/<id>), Querverweis-Ziel, React-Key. */
  id: string;
  titel: string;
  thema: string;
  sammlung: string;
  /** Kuratierter Einleitungssatz (Framing) — der Lede des Artikels. */
  einleitung: string;
  /** Belegte Fließtext-Absätze (ohne die Einleitung). */
  absaetze: string[];
  /** Optionale Gliederung derselben Absätze unter Überschriften. */
  abschnitte?: Abschnitt[];
  quellen: Quelle[];
  /** IDs anderer Artikel — jede muss auflösen (Load-Guard in index.ts). */
  sieheAuch: string[];
  /** Abkürzungen/Synonyme — für Suche und Kopfzeile. */
  synonyme: string[];
  /** Rechtslage/Faktum im Fluss → Marke „im Wandel". */
  unsicher: boolean;
}

export interface Thema {
  id: string;
  label: string;
}

export interface Sammlung {
  id: string;
  titel: string;
  version: string;
  domaene: string;
}

export interface InhaltMeta {
  /** Exportdatum (ISO). */
  stand: string;
  /** Herkunft, z. B. `evenacadia-tech/probetag-akademie@c785dbb`. */
  quelle: string;
  artikel: number;
}

export interface InhaltRoh {
  meta: InhaltMeta;
  themen: Thema[];
  sammlungen: Sammlung[];
  artikel: ArtikelRoh[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Eigene Sammlungen — von Hand gepflegte Artikel, die NICHT aus der Akademie
// exportiert werden (z. B. `sammlungen/strategie/`). Autoren schreiben nur
// `abschnitte`; `absaetze` (flacher Rumpf) und `sammlung` leitet `vereinige` ab,
// damit Rumpf und Gliederung nie auseinanderlaufen. Der Load-Guard prüft danach
// beide Quellen gemeinsam (Querverweise dürfen in beide Richtungen zeigen).
// ─────────────────────────────────────────────────────────────────────────────

export interface EigenerArtikel {
  id: string;
  titel: string;
  thema: string;
  einleitung: string;
  /** Mindestens ein Abschnitt mit mindestens einem Absatz. */
  abschnitte: Abschnitt[];
  quellen: Quelle[];
  sieheAuch: string[];
  synonyme: string[];
  unsicher?: boolean;
}

export interface EigeneSammlung {
  sammlung: Sammlung;
  /** Themen, die diese Sammlung neu einführt (bestehende IDs dürfen wiederverwendet werden). */
  themen: Thema[];
  /** ISO-Datum des letzten inhaltlichen Stands. */
  stand: string;
  /** Artikel in Lesereihenfolge. */
  artikel: EigenerArtikel[];
}
