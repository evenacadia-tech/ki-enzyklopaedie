import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { GeleseneDatei } from './import';
import type { TagebuchDaten } from './modell';
import type { TagebuchSpeicher } from './speicher';
import {
  _zustandFuerTests as zustand,
  aendereEintrag,
  importiereTage,
  konfiguriereTagebuch,
  ladeTagebuch,
  ladeTagebuchErneut,
  speichereJetzt,
  VERZOEGERUNG_MS,
} from './zustand';

// Ein Speicher im Arbeitsspeicher mit Protokoll — und wahlweise mit Fehlern.
function fakeSpeicher(start: TagebuchDaten | null = null) {
  const s = {
    art: 'browser' as const,
    daten: start,
    geschrieben: [] as TagebuchDaten[],
    ladeFehler: null as Error | null,
    schreibFehler: null as Error | null,
    verzoegerung: null as null | (() => Promise<void>),
    async lade() {
      if (s.ladeFehler) throw s.ladeFehler;
      return s.daten ?? { version: 1 as const, tage: {} };
    },
    async speichere(d: TagebuchDaten) {
      if (s.verzoegerung) await s.verzoegerung();
      if (s.schreibFehler) throw s.schreibFehler;
      s.daten = d;
      s.geschrieben.push(d);
    },
    async ort() {
      return 'Test';
    },
  };
  return s as typeof s & TagebuchSpeicher;
}

const T = '2026-09-26';
const UHR = () => new Date('2026-09-26T12:32:00.000Z');

describe('Tagebuch-Zustand', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    konfiguriereTagebuch(null);
    vi.useRealTimers();
  });

  it('lädt genau einmal und stellt den Bestand bereit', async () => {
    const s = fakeSpeicher({ version: 1, tage: { [T]: { text: 'Alt', markiert: true, ereignis: 'E', farbe: 'gold', geaendert: 'x' } } });
    konfiguriereTagebuch(s, UHR);
    expect(zustand().status).toBe('aus');
    await ladeTagebuch();
    await ladeTagebuch();
    expect(zustand().status).toBe('bereit');
    expect(zustand().tage[T].text).toBe('Alt');
    expect(zustand().ort).toBe('Test');
  });

  it('schreibt verzögert nach der letzten Änderung', async () => {
    const s = fakeSpeicher();
    konfiguriereTagebuch(s, UHR);
    await ladeTagebuch();
    aendereEintrag(T, { text: 'H' });
    aendereEintrag(T, { text: 'Ha' });
    expect(zustand().sicherung).toBe('ausstehend');
    await vi.advanceTimersByTimeAsync(VERZOEGERUNG_MS - 1);
    expect(s.geschrieben).toHaveLength(0);
    await vi.advanceTimersByTimeAsync(1);
    expect(s.geschrieben).toHaveLength(1);
    expect(s.geschrieben[0].tage[T]).toEqual({
      text: 'Ha',
      markiert: false,
      ereignis: '',
      farbe: 'gold',
      geaendert: '2026-09-26T12:32:00.000Z',
    });
    expect(zustand().sicherung).toBe('gespeichert');
    expect(zustand().zuletztGespeichert).toBe('2026-09-26T12:32:00.000Z');
  });

  it('entfernt leer gewordene Tage und schreibt sofort auf Wunsch', async () => {
    const s = fakeSpeicher({ version: 1, tage: { [T]: { text: 'Alt', markiert: false, ereignis: '', farbe: 'gold', geaendert: 'x' } } });
    konfiguriereTagebuch(s, UHR);
    await ladeTagebuch();
    aendereEintrag(T, { text: '   ' });
    await speichereJetzt();
    expect(s.geschrieben).toHaveLength(1);
    expect(s.geschrieben[0].tage).toEqual({});
    // Markierung allein hält den Tag am Leben.
    aendereEintrag(T, { markiert: true });
    await speichereJetzt();
    expect(s.geschrieben[1].tage[T].markiert).toBe(true);
    // Nichts Ausstehendes → kein weiterer Schreibvorgang.
    await speichereJetzt();
    expect(s.geschrieben).toHaveLength(2);
    // Die Farbe der Markierung wird mitgeschrieben und übersteht das Ab- und Anschalten.
    aendereEintrag(T, { farbe: 'schiefer' });
    aendereEintrag(T, { markiert: false, text: 'bleibt' });
    aendereEintrag(T, { markiert: true });
    await speichereJetzt();
    expect(s.geschrieben[2].tage[T]).toMatchObject({ markiert: true, farbe: 'schiefer' });
  });

  it('schreibt nie vor dem Laden und nie nach einem Ladefehler', async () => {
    const s = fakeSpeicher();
    s.ladeFehler = new Error('Datei kaputt');
    konfiguriereTagebuch(s, UHR);
    aendereEintrag(T, { text: 'zu früh' });
    expect(zustand().tage).toEqual({});
    await ladeTagebuch();
    expect(zustand().status).toBe('fehler');
    expect(zustand().ladeFehler).toBe('Datei kaputt');
    aendereEintrag(T, { text: 'trotzdem' });
    await speichereJetzt();
    expect(s.geschrieben).toHaveLength(0);
    // Erneut laden, nachdem der Fehler behoben ist.
    s.ladeFehler = null;
    await ladeTagebuchErneut();
    expect(zustand().status).toBe('bereit');
  });

  it('meldet Schreibfehler, behält die Änderung und schreibt beim nächsten Versuch', async () => {
    const s = fakeSpeicher();
    konfiguriereTagebuch(s, UHR);
    await ladeTagebuch();
    s.schreibFehler = new Error('Platte voll');
    aendereEintrag(T, { text: 'Wichtig' });
    await vi.advanceTimersByTimeAsync(VERZOEGERUNG_MS);
    expect(zustand().sicherung).toBe('fehler');
    expect(zustand().sicherungFehler).toBe('Platte voll');
    expect(zustand().tage[T].text).toBe('Wichtig');
    s.schreibFehler = null;
    await speichereJetzt();
    expect(zustand().sicherung).toBe('gespeichert');
    expect(s.daten?.tage[T].text).toBe('Wichtig');
  });

  it('importiert sofort, löscht nichts und ersetzt vorhandene Tage nur auf Wunsch', async () => {
    const alt = { text: 'Im Tagebuch.', markiert: false, ereignis: '', farbe: 'gold' as const, geaendert: 'x' };
    const s = fakeSpeicher({ version: 1, tage: { [T]: alt, '2026-09-01': { ...alt, text: 'Bleibt.' } } });
    konfiguriereTagebuch(s, UHR);
    await ladeTagebuch();
    const datei: GeleseneDatei = {
      anhaenge: 0,
      tage: {
        [T]: { text: 'In der Datei.', markiert: true, ereignis: 'E', farbe: 'kupfer' },
        '2026-10-02': { text: 'Neu.', markiert: false, ereignis: '', farbe: 'gold' },
      },
    };
    expect(await importiereTage(datei, 'tagebuch')).toBe(1);
    // Ohne Wartezeit geschrieben, der vorhandene Tag steht wie zuvor.
    expect(s.geschrieben).toHaveLength(1);
    expect(s.geschrieben[0].tage[T]).toBe(alt);
    expect(s.geschrieben[0].tage['2026-10-02']).toEqual({ text: 'Neu.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '2026-09-26T12:32:00.000Z' });
    expect(Object.keys(s.geschrieben[0].tage).sort()).toEqual(['2026-09-01', T, '2026-10-02']);
    expect(zustand().sicherung).toBe('gespeichert');

    // Derselbe Import noch einmal: nichts zu tun, nichts geschrieben.
    expect(await importiereTage(datei, 'tagebuch')).toBe(0);
    expect(s.geschrieben).toHaveLength(1);

    expect(await importiereTage(datei, 'datei')).toBe(1);
    expect(s.geschrieben[1].tage[T]).toEqual({ text: 'In der Datei.', markiert: true, ereignis: 'E', farbe: 'kupfer', geaendert: '2026-09-26T12:32:00.000Z' });
    expect(s.geschrieben[1].tage['2026-09-01'].text).toBe('Bleibt.');
  });

  it('importiert nicht nach einem Ladefehler und meldet, wenn die Sicherung scheitert', async () => {
    const datei: GeleseneDatei = { anhaenge: 0, tage: { [T]: { text: 'Neu.', markiert: false, ereignis: '', farbe: 'gold' } } };
    const s = fakeSpeicher();
    s.ladeFehler = new Error('Datei kaputt');
    konfiguriereTagebuch(s, UHR);
    await ladeTagebuch();
    await expect(importiereTage(datei, 'datei')).rejects.toThrow(/nicht geladen/);
    expect(zustand().tage).toEqual({});
    expect(s.geschrieben).toHaveLength(0);

    s.ladeFehler = null;
    await ladeTagebuchErneut();
    s.schreibFehler = new Error('Platte voll');
    await expect(importiereTage(datei, 'datei')).rejects.toThrow('Importiert, aber noch nicht gespeichert: Platte voll');
    // Der Tag bleibt im Zustand und wird beim nächsten Versuch geschrieben.
    expect(zustand().tage[T].text).toBe('Neu.');
    s.schreibFehler = null;
    await speichereJetzt();
    expect(s.daten?.tage[T].text).toBe('Neu.');
  });

  it('schreibt Änderungen, die während eines laufenden Schreibvorgangs kamen, erneut', async () => {
    const s = fakeSpeicher();
    konfiguriereTagebuch(s, UHR);
    await ladeTagebuch();
    let freigeben: () => void = () => {};
    s.verzoegerung = () =>
      new Promise<void>((res) => {
        freigeben = res;
      });
    aendereEintrag(T, { text: 'eins' });
    const p = speichereJetzt();
    expect(zustand().sicherung).toBe('speichert');
    aendereEintrag(T, { text: 'zwei' });
    s.verzoegerung = null;
    freigeben();
    await p;
    expect(zustand().sicherung).toBe('ausstehend');
    await vi.advanceTimersByTimeAsync(VERZOEGERUNG_MS);
    expect(s.geschrieben.map((d) => d.tage[T].text)).toEqual(['eins', 'zwei']);
    expect(zustand().sicherung).toBe('gespeichert');
  });
});
