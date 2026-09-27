import { describe, expect, it } from 'vitest';
import type { Eintrag } from './modell';
import { sucheTagebuch } from './suche';

const e = (p: Partial<Eintrag> = {}): Eintrag => ({
  text: '',
  markiert: false,
  ereignis: '',
  farbe: 'gold',
  geaendert: '',
  ...p,
});

const tage = {
  '2026-09-10': e({ text: 'Erstes Kundengespräch: Porter und die fünf Kräfte erklärt bekommen.' }),
  '2026-09-12': e({ text: 'Bußgeld-Diskussion im Team.' }),
  '2026-09-26': e({ markiert: true, ereignis: 'Strategie-Workshop', text: 'Lange Sitzung, Porter kam wieder vor.' }),
  '2026-10-02': e({ text: 'Nichts Besonderes.' }),
};

describe('sucheTagebuch', () => {
  it('liefert nichts bei leerer Eingabe', () => {
    expect(sucheTagebuch(tage, '')).toEqual([]);
    expect(sucheTagebuch(tage, '  ')).toEqual([]);
  });

  it('findet Text-Treffer chronologisch rückwärts mit Snippet', () => {
    const t = sucheTagebuch(tage, 'porter');
    expect(t.map((x) => x.datum)).toEqual(['2026-09-26', '2026-09-10']);
    expect(t[1].snippet?.kern).toBe('Porter');
    expect(t[1].imEreignis).toBe(false);
  });

  it('ist umlaut- und akzenttolerant', () => {
    expect(sucheTagebuch(tage, 'bussgeld').map((x) => x.datum)).toEqual(['2026-09-12']);
  });

  it('sucht auch in der Ereignis-Bezeichnung', () => {
    const t = sucheTagebuch(tage, 'workshop');
    expect(t).toHaveLength(1);
    expect(t[0].datum).toBe('2026-09-26');
    expect(t[0].imEreignis).toBe(true);
    expect(t[0].snippet).toBeNull();
  });

  it('verlangt alle Suchwörter (AND) über Text und Ereignis hinweg', () => {
    expect(sucheTagebuch(tage, 'porter workshop').map((x) => x.datum)).toEqual(['2026-09-26']);
    expect(sucheTagebuch(tage, 'porter kunde').map((x) => x.datum)).toEqual(['2026-09-10']);
    expect(sucheTagebuch(tage, 'porter gibtesnicht')).toEqual([]);
  });

  it('hält die Grenze ein', () => {
    expect(sucheTagebuch(tage, 'e', 2)).toHaveLength(2);
  });
});
