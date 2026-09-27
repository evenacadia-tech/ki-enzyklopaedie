import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Dokument } from './modell';
import { fakeSpeicher } from '../test/fake-dokumente';
import {
  _zustandFuerTests as zustand,
  aendereDokument,
  entferneDokument,
  importiereDokumente,
  konfiguriereDokumente,
  ladeDokumente,
  ladeDokumenteErneut,
  oeffneDokument,
  sichereNamen,
  speichereDokumenteJetzt,
  VERZOEGERUNG_MS,
  zeigeDokument,
} from './zustand';

const UHR = () => new Date('2026-09-27T09:30:00.000Z');
const BESTAND: Dokument = {
  id: 'abc123xyz0',
  datei: 'abc123xyz0_Zeugnis.pdf',
  name: 'Zeugnis.pdf',
  art: 'zertifikat',
  tag: null,
  notiz: '',
  hinzugefuegt: '2026-09-01T08:00:00.000Z',
  groesse: 2048,
  typ: 'pdf',
};

describe('Dokumente-Zustand', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    konfiguriereDokumente(null);
    vi.useRealTimers();
  });

  it('lädt genau einmal und stellt Bestand und Ort bereit', async () => {
    const s = fakeSpeicher([BESTAND]);
    konfiguriereDokumente(s, UHR);
    expect(zustand().status).toBe('aus');
    await ladeDokumente();
    await ladeDokumente();
    expect(zustand().status).toBe('bereit');
    expect(zustand().dokumente).toEqual([BESTAND]);
    expect(zustand().ort).toBe('C:\\Test\\dokumente');
    expect(zustand().dateien).toBe(true);
    expect(s.geschrieben).toHaveLength(0);
  });

  it('importiert mehrere Dateien, trägt sie ein und schreibt den Index sofort', async () => {
    const s = fakeSpeicher();
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    const neu = await importiereDokumente(['C:\\Users\\x\\Urkunde.PDF', 'D:/scan/Foto 1.jpg'], 'zertifikat', null);
    expect(neu.map((d) => d.name)).toEqual(['Urkunde.PDF', 'Foto 1.jpg']);
    expect(zustand().dokumente).toHaveLength(2);
    expect(zustand().dokumente[0]).toEqual({
      id: 'neu0000001',
      datei: 'neu0000001_Urkunde.PDF',
      name: 'Urkunde.PDF',
      art: 'zertifikat',
      tag: null,
      notiz: '',
      hinzugefuegt: '2026-09-27T09:30:00.000Z',
      groesse: 100,
      typ: 'pdf',
    });
    expect(s.geschrieben).toHaveLength(1);
    expect(s.geschrieben[0].dokumente).toHaveLength(2);
    expect(zustand().sicherung).toBe('gespeichert');
    expect(zustand().meldung).toBeNull();
    expect(zustand().importLaeuft).toBe(false);
  });

  it('hängt Anhänge an den Tag; „Aus dem Tagebuch“ ohne Tag wird ein wichtiges Dokument', async () => {
    const s = fakeSpeicher();
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    const [a] = await importiereDokumente(['C:\\x\\Folien.pptx'], 'anhang', '2026-09-26');
    expect(a).toMatchObject({ art: 'anhang', tag: '2026-09-26' });
    const [b] = await importiereDokumente(['C:\\x\\Lose.txt'], 'anhang', null);
    expect(b).toMatchObject({ art: 'dokument', tag: null });
  });

  it('meldet, was nicht importiert wurde, und behält, was gelang', async () => {
    const s = fakeSpeicher();
    s.unlesbar.add('C:\\x\\Gesperrt.pdf');
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    const neu = await importiereDokumente(['C:\\x\\Gut.pdf', 'C:\\x\\Gesperrt.pdf'], 'dokument', null);
    expect(neu).toHaveLength(1);
    expect(zustand().dokumente.map((d) => d.name)).toEqual(['Gut.pdf']);
    expect(zustand().meldung).toBe('1 von 2 Dateien hinzugefügt. Nicht hinzugefügt — Gesperrt.pdf: Zugriff verweigert');
    expect(s.geschrieben).toHaveLength(1);
    // Nur Fehlschläge → nichts zu schreiben.
    await importiereDokumente(['C:\\x\\Gesperrt.pdf'], 'dokument', null);
    expect(zustand().meldung).toBe('Nicht hinzugefügt — Gesperrt.pdf: Zugriff verweigert');
    expect(s.geschrieben).toHaveLength(1);
  });

  it('ändert Name, Notiz und Abteilung verzögert', async () => {
    const s = fakeSpeicher([BESTAND, { ...BESTAND, id: 'tag0000001', datei: 'tag0000001_F.jpg', tag: '2026-09-26', art: 'anhang' }]);
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    aendereDokument('abc123xyz0', { notiz: 'IHK' });
    aendereDokument('abc123xyz0', { name: 'Arbeitszeugnis', art: 'dokument' });
    expect(zustand().sicherung).toBe('ausstehend');
    await vi.advanceTimersByTimeAsync(VERZOEGERUNG_MS - 1);
    expect(s.geschrieben).toHaveLength(0);
    await vi.advanceTimersByTimeAsync(1);
    expect(s.geschrieben).toHaveLength(1);
    expect(s.geschrieben[0].dokumente[0]).toMatchObject({ name: 'Arbeitszeugnis', notiz: 'IHK', art: 'dokument' });
    // Unverändert → kein Schreibvorgang; unbekannte Kennung → nichts.
    aendereDokument('abc123xyz0', { notiz: 'IHK' });
    aendereDokument('gibtesnich', { notiz: 'x' });
    await vi.advanceTimersByTimeAsync(VERZOEGERUNG_MS);
    expect(s.geschrieben).toHaveLength(1);
    // „Aus dem Tagebuch“ nur mit Tag.
    aendereDokument('abc123xyz0', { art: 'anhang' });
    expect(zustand().dokumente[0].art).toBe('dokument');
    aendereDokument('tag0000001', { art: 'zertifikat' });
    aendereDokument('tag0000001', { art: 'anhang' });
    expect(zustand().dokumente[1]).toMatchObject({ art: 'anhang', tag: '2026-09-26' });
    // Ein leer gelassener Name fällt auf den Dateinamen zurück.
    aendereDokument('abc123xyz0', { name: '   ' });
    sichereNamen('abc123xyz0');
    expect(zustand().dokumente[0].name).toBe('Zeugnis.pdf');
  });

  it('entfernt erst die Datei, dann den Eintrag — und schreibt sofort', async () => {
    const s = fakeSpeicher([BESTAND]);
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    s.loeschFehler = new Error('Datei ist geöffnet');
    expect(await entferneDokument('abc123xyz0')).toBe(false);
    expect(zustand().dokumente).toHaveLength(1);
    expect(zustand().meldung).toBe('Nicht entfernt — Datei ist geöffnet');
    expect(s.geschrieben).toHaveLength(0);
    expect(s.ordner.has('abc123xyz0')).toBe(true);

    s.loeschFehler = null;
    expect(await entferneDokument('abc123xyz0')).toBe(true);
    expect(zustand().dokumente).toEqual([]);
    expect(zustand().meldung).toBeNull();
    expect(s.ordner.has('abc123xyz0')).toBe(false);
    expect(s.geschrieben).toHaveLength(1);
    expect(s.geschrieben[0].dokumente).toEqual([]);
    expect(await entferneDokument('abc123xyz0')).toBe(false);
  });

  it('öffnet und zeigt; ein Fehler wird zur Meldung', async () => {
    const s = fakeSpeicher([BESTAND]);
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    await oeffneDokument('abc123xyz0');
    await zeigeDokument('abc123xyz0');
    expect(s.geoeffnet).toEqual(['abc123xyz0']);
    expect(s.gezeigt).toEqual(['abc123xyz0']);
    expect(zustand().meldung).toBeNull();
    s.ordner.clear();
    await oeffneDokument('abc123xyz0');
    expect(zustand().meldung).toBe('Die Datei zu diesem Dokument fehlt.');
  });

  it('tut nichts vor dem Laden und nichts nach einem Ladefehler', async () => {
    const s = fakeSpeicher([BESTAND]);
    s.ladeFehler = new Error('dokumente.json ist nicht lesbar');
    konfiguriereDokumente(s, UHR);
    expect(await importiereDokumente(['C:\\x\\a.pdf'], 'dokument', null)).toEqual([]);
    await ladeDokumente();
    expect(zustand().status).toBe('fehler');
    expect(zustand().ladeFehler).toBe('dokumente.json ist nicht lesbar');
    expect(await importiereDokumente(['C:\\x\\a.pdf'], 'dokument', null)).toEqual([]);
    expect(await entferneDokument('abc123xyz0')).toBe(false);
    aendereDokument('abc123xyz0', { notiz: 'x' });
    await speichereDokumenteJetzt();
    expect(s.geschrieben).toHaveLength(0);
    expect(s.ordner.size).toBe(1);
    s.ladeFehler = null;
    await ladeDokumenteErneut();
    expect(zustand().status).toBe('bereit');
    expect(zustand().dokumente).toHaveLength(1);
  });

  it('meldet Schreibfehler, behält die Änderung und schreibt beim nächsten Versuch', async () => {
    const s = fakeSpeicher([BESTAND]);
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    s.schreibFehler = new Error('Platte voll');
    await importiereDokumente(['C:\\x\\Neu.pdf'], 'dokument', null);
    expect(zustand().sicherung).toBe('fehler');
    expect(zustand().sicherungFehler).toBe('Platte voll');
    expect(zustand().dokumente).toHaveLength(2);
    s.schreibFehler = null;
    await speichereDokumenteJetzt();
    expect(zustand().sicherung).toBe('gespeichert');
    expect(s.index.dokumente).toHaveLength(2);
  });

  it('schreibt Änderungen, die während eines laufenden Schreibvorgangs kamen, erneut', async () => {
    const s = fakeSpeicher([BESTAND]);
    konfiguriereDokumente(s, UHR);
    await ladeDokumente();
    let freigeben: () => void = () => {};
    s.verzoegerung = () =>
      new Promise<void>((res) => {
        freigeben = res;
      });
    aendereDokument('abc123xyz0', { notiz: 'eins' });
    const p = speichereDokumenteJetzt();
    expect(zustand().sicherung).toBe('speichert');
    aendereDokument('abc123xyz0', { notiz: 'zwei' });
    s.verzoegerung = null;
    freigeben();
    await p;
    expect(zustand().sicherung).toBe('ausstehend');
    await vi.advanceTimersByTimeAsync(VERZOEGERUNG_MS);
    expect(s.geschrieben.map((i) => i.dokumente[0].notiz)).toEqual(['eins', 'zwei']);
    expect(zustand().sicherung).toBe('gespeichert');
  });
});
