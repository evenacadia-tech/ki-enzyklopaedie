import { describe, expect, it } from 'vitest';
import { enzyklopaedie, type Artikel } from '../inhalt';
import { falte, hervorhebe, macheSnippet, normalisiere, suche, tokenisiere } from './logic';

const artikel = (teil: Partial<Artikel> & { id: string; titel: string }): Artikel => ({
  thema: 'a',
  sammlung: 's',
  einleitung: '',
  absaetze: [],
  quellen: [],
  sieheAuch: [],
  synonyme: [],
  unsicher: false,
  verweise: [],
  rueckverweise: [],
  woerter: 0,
  lesezeitMin: 1,
  ...teil,
});

describe('normalisiere / tokenisiere', () => {
  it('faltet Umlaute, ß und Großschreibung', () => {
    expect(normalisiere('Bußgeld ÄÖÜ')).toBe('bussgeld aou');
    expect(tokenisiere('Art. 5 „Hochrisiko-KI“ (Anhang III)')).toEqual(['art', '5', 'hochrisiko', 'ki', 'anhang', 'iii']);
    expect(tokenisiere('  —  ')).toEqual([]);
  });
});

describe('falte / hervorhebe', () => {
  it('bildet gefaltete Positionen auf den Originaltext ab (ß → ss)', () => {
    const g = falte('Bußgeld');
    expect(g.text).toBe('bussgeld');
    expect(g.map).toEqual([0, 1, 2, 2, 3, 4, 5, 6]);
  });

  it('markiert alle Fundstellen tolerant', () => {
    const seg = hervorhebe('Das Bußgeld und das Bussgeld.', ['bussgeld']);
    expect(seg.filter((s) => s.treffer).map((s) => s.text)).toEqual(['Bußgeld', 'Bussgeld']);
    expect(seg.map((s) => s.text).join('')).toBe('Das Bußgeld und das Bussgeld.');
  });
});

describe('macheSnippet', () => {
  it('schneidet an Wortgrenzen und meldet Kürzungen', () => {
    const text = 'Anfang ' + 'wort '.repeat(40) + 'Bußgeld steht hier ' + 'ende '.repeat(40) + 'Schluss';
    const s = macheSnippet(text, 'bussgeld', 30);
    expect(s).not.toBeNull();
    expect(s!.kern).toBe('Bußgeld');
    expect(s!.abAnfang).toBe(false);
    expect(s!.bisEnde).toBe(false);
    expect(s!.vor.startsWith(' ')).toBe(false);
    expect(s!.nach.endsWith(' ')).toBe(false);
    // Der Kontext links ist WIRKLICH Kontext (mehrere Wörter), nicht nur die Wortgrenze vor dem Treffer.
    expect(s!.vor.length).toBeGreaterThanOrEqual(20);
    expect(s!.vor.length).toBeLessThanOrEqual(30);
    expect(s!.nach.length).toBeGreaterThanOrEqual(20);
  });

  it('liefert null ohne Fundstelle', () => {
    expect(macheSnippet('nichts', 'x')).toBeNull();
  });
});

describe('suche', () => {
  const liste = [
    artikel({ id: 'rag', titel: 'RAG (Retrieval-Augmented Generation)', synonyme: ['Grounding'], einleitung: 'Wissen zur Laufzeit.' }),
    artikel({ id: 'emb', titel: 'Embedding', absaetze: ['Grundlage von RAG und Ähnlichkeitssuche.'] }),
    artikel({ id: 'hal', titel: 'Halluzination', absaetze: ['Grounding senkt das Risiko.'] }),
  ];

  it('liefert nichts bei leerer Eingabe', () => {
    expect(suche(liste, '   ')).toEqual([]);
  });

  it('setzt Titel- vor Synonym- vor Text-Treffer', () => {
    const t = suche(liste, 'rag');
    expect(t.map((x) => x.artikel.id)).toEqual(['rag', 'emb']);
    expect(t[0].feld).toBe('titel');
    expect(t[1].feld).toBe('text');
    expect(t[1].snippet?.kern).toBe('RAG');
  });

  it('findet Synonyme und meldet das Feld', () => {
    const t = suche(liste, 'grounding');
    expect(t.map((x) => x.artikel.id)).toEqual(['rag', 'hal']);
    expect(t[0].feld).toBe('synonym');
  });

  it('verlangt alle Wörter (AND)', () => {
    expect(suche(liste, 'rag ähnlichkeit').map((x) => x.artikel.id)).toEqual(['emb']);
    expect(suche(liste, 'rag nirgends')).toEqual([]);
  });

  it('ist umlaut- und ß-tolerant gegen den echten Bestand', () => {
    const t = suche(enzyklopaedie.liste, 'bussgeld');
    expect(t.length).toBeGreaterThan(0);
    expect(t[0].artikel.id).toBe('bussgeld');
  });

  it('setzt den wörtlich getroffenen Begriff (Synonym „ISO 42001“) vor Titel-Teiltreffer', () => {
    const t = suche(enzyklopaedie.liste, 'ISO 42001');
    expect(t[0].artikel.id).toBe('iso-42001');
    expect(t.map((x) => x.artikel.id)).toContain('iso-42001-kein-freibrief');
  });

  it('setzt bei Gleichstand den kürzeren Titel nach vorn', () => {
    const l = [
      artikel({ id: 'lang', titel: 'Alpha Beta Gamma Delta' }),
      artikel({ id: 'kurz', titel: 'Alpha Beta' }),
    ];
    expect(suche(l, 'alpha').map((x) => x.artikel.id)).toEqual(['kurz', 'lang']);
  });
});
