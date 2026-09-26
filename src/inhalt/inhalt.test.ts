import { describe, expect, it } from 'vitest';
import { GRUNDLAGEN_ID, enzyklopaedie, erstelleEnzyklopaedie } from './index';
import { eigeneSammlungen } from './sammlungen';
import type { InhaltRoh } from './typen';

// Der ECHTE Bestand muss seinen Vertrag halten — und der Load-Guard muss jede
// Verletzung laut melden (Negativ-Fixtures).

const basis = (): InhaltRoh => ({
  meta: { stand: '2026-09-26', quelle: 'test', artikel: 2 },
  themen: [{ id: 'a', label: 'A' }],
  sammlungen: [{ id: GRUNDLAGEN_ID, titel: 'G', version: '1.0.0', domaene: 'x' }],
  artikel: [
    {
      id: 'eins',
      titel: 'Eins',
      thema: 'a',
      sammlung: GRUNDLAGEN_ID,
      einleitung: 'E1',
      absaetze: ['P1'],
      quellen: [{ titel: 'Q', url: 'https://q.example/1', abgerufen: '2026-01-01' }],
      sieheAuch: ['zwei'],
      synonyme: [],
      unsicher: false,
    },
    {
      id: 'zwei',
      titel: 'Zwei',
      thema: 'a',
      sammlung: GRUNDLAGEN_ID,
      einleitung: 'E2',
      absaetze: ['P2a', 'P2b'],
      abschnitte: [
        { titel: 'S1', absaetze: ['P2a'] },
        { titel: 'S2', absaetze: ['P2b'] },
      ],
      quellen: [{ titel: 'Q', url: 'https://q.example/1', abgerufen: '2026-01-01' }],
      sieheAuch: [],
      synonyme: ['Z'],
      unsicher: true,
    },
  ],
});

describe('erstelleEnzyklopaedie (Load-Guard)', () => {
  it('löst Verweise und Rückverweise auf', () => {
    const e = erstelleEnzyklopaedie(basis());
    expect(e.nachId('eins')?.verweise.map((v) => v.id)).toEqual(['zwei']);
    expect(e.nachId('zwei')?.rueckverweise.map((v) => v.id)).toEqual(['eins']);
    expect(e.nachId('eins')?.rueckverweise).toEqual([]);
  });

  it('rechnet Wörter und Lesezeit (mindestens 1 Minute)', () => {
    const e = erstelleEnzyklopaedie(basis());
    expect(e.nachId('eins')?.woerter).toBe(2);
    expect(e.nachId('eins')?.lesezeitMin).toBe(1);
  });

  it('wirft bei totem Querverweis', () => {
    const d = basis();
    d.artikel[0].sieheAuch = ['gibt-es-nicht'];
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/toter Querverweis eins → gibt-es-nicht/);
  });

  it('wirft bei Selbstverweis, doppelter ID und nicht-kebab ID', () => {
    let d = basis();
    d.artikel[0].sieheAuch = ['eins'];
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/verweist auf sich selbst/);
    d = basis();
    d.artikel[1].id = 'eins';
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/doppelte Artikel-ID/);
    d = basis();
    d.artikel[1].id = 'Zwei Groß';
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/kebab-case/);
  });

  it('wirft bei unbelegtem Artikel, leerem Rumpf, unbekanntem Thema/Sammlung', () => {
    let d = basis();
    d.artikel[0].quellen = [];
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/unbelegt/);
    d = basis();
    d.artikel[0].absaetze = [];
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/keinen Rumpf/);
    d = basis();
    d.artikel[0].thema = 'fremd';
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/unbekanntes Thema/);
    d = basis();
    d.artikel[0].sammlung = 'fremd';
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/unbekannte Sammlung/);
  });

  it('wirft, wenn Abschnitte nicht dieselben Absätze tragen wie der Rumpf', () => {
    const d = basis();
    d.artikel[1].abschnitte = [{ titel: 'S1', absaetze: ['P2a'] }];
    expect(() => erstelleEnzyklopaedie(d)).toThrow(/Abschnitte tragen nicht dieselben Absätze/);
  });

  it('behandelt ein leeres abschnitte-Array wie ungesetzt', () => {
    const d = basis();
    d.artikel[1].abschnitte = [];
    expect(erstelleEnzyklopaedie(d).nachId('zwei')?.abschnitte).toBeUndefined();
  });

  it('sortiert Umlaut-Titel im A–Z-Register unter den Grundbuchstaben', () => {
    const d = basis();
    d.artikel[0].titel = 'Übersicht';
    d.artikel[1].titel = 'Umsetzung';
    const gruppen = erstelleEnzyklopaedie(d).alphabetisch();
    expect(gruppen.map((g) => g.buchstabe)).toEqual(['U']);
    expect(gruppen[0].artikel.map((a) => a.titel)).toEqual(['Übersicht', 'Umsetzung']);
  });
});

describe('eigene Sammlungen (Autorenvertrag)', () => {
  it('hat je Artikel 2–5 Quellen, mindestens drei Abschnitte und einen kritischen Schluss', () => {
    for (const s of eigeneSammlungen) {
      expect(s.artikel.length).toBeGreaterThan(0);
      for (const a of s.artikel) {
        expect(a.quellen.length, `${a.id}: Quellen`).toBeGreaterThanOrEqual(2);
        expect(a.quellen.length, `${a.id}: Quellen`).toBeLessThanOrEqual(5);
        expect(a.abschnitte.length, `${a.id}: Abschnitte`).toBeGreaterThanOrEqual(3);
        expect(a.abschnitte.at(-1)?.titel, `${a.id}: Schlussabschnitt`).toMatch(/^(Grenzen und Kritik|Typische Fehler)$/);
        expect(a.sieheAuch.length, `${a.id}: sieheAuch`).toBeGreaterThan(0);
      }
    }
  });
});

describe('der echte Bestand', () => {
  it('lädt und trägt die gemeldete Artikelzahl', () => {
    expect(enzyklopaedie.liste.length).toBe(enzyklopaedie.meta.artikel);
    expect(enzyklopaedie.liste.length).toBeGreaterThanOrEqual(56);
  });

  it('gliedert jeden Artikel genau einmal (Themen-Register)', () => {
    const ids = enzyklopaedie.gliederung().flatMap((e) => e.abteilungen.flatMap((ab) => ab.artikel.map((a) => a.id)));
    expect(ids.length).toBe(enzyklopaedie.liste.length);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('führt jeden Artikel genau einmal im A–Z-Register, Gruppen alphabetisch', () => {
    const gruppen = enzyklopaedie.alphabetisch();
    const ids = gruppen.flatMap((g) => g.artikel.map((a) => a.id));
    expect(new Set(ids).size).toBe(enzyklopaedie.liste.length);
    const buchstaben = gruppen.map((g) => g.buchstabe);
    expect([...buchstaben].sort((x, y) => x.localeCompare(y, 'de'))).toEqual(buchstaben);
  });

  it('kennt Labels für jedes Thema und jede Sammlung', () => {
    for (const a of enzyklopaedie.liste) {
      expect(enzyklopaedie.themaLabel(a.thema)).not.toBe(a.thema);
      expect(enzyklopaedie.sammlungTitel(a.sammlung)).not.toBe(a.sammlung);
    }
  });

  it('hat nur http(s)-Quellen mit ISO-Abrufdatum', () => {
    for (const a of enzyklopaedie.liste) {
      for (const q of a.quellen) {
        expect(q.url).toMatch(/^https?:\/\/\S+$/);
        expect(q.abgerufen).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it('macht Rückverweise symmetrisch zu den Vorwärtsverweisen', () => {
    for (const a of enzyklopaedie.liste) {
      for (const v of a.verweise) {
        expect(enzyklopaedie.nachId(v.id)?.rueckverweise.some((r) => r.id === a.id)).toBe(true);
      }
    }
  });
});
