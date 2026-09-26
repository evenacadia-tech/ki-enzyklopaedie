import { describe, expect, it } from 'vitest';
import { hrefArtikel, parseHash } from './router';

describe('parseHash', () => {
  it('leitet leere/Start-Hashes auf die Übersicht', () => {
    expect(parseHash('')).toEqual({ art: 'start' });
    expect(parseHash('#')).toEqual({ art: 'start' });
    expect(parseHash('#/')).toEqual({ art: 'start' });
  });

  it('erkennt Artikel-Routen und dekodiert die ID', () => {
    expect(parseHash('#/artikel/rag')).toEqual({ art: 'artikel', id: 'rag' });
    expect(parseHash('#/artikel/iso-42001/')).toEqual({ art: 'artikel', id: 'iso-42001' });
    expect(parseHash(hrefArtikel('ä b'))).toEqual({ art: 'artikel', id: 'ä b' });
  });

  it('fängt Unbekanntes sauber ab', () => {
    expect(parseHash('#/quiz')).toEqual({ art: 'unbekannt', hash: '#/quiz' });
    expect(parseHash('#/artikel/')).toEqual({ art: 'unbekannt', hash: '#/artikel/' });
    expect(parseHash('#/artikel/a/b')).toEqual({ art: 'unbekannt', hash: '#/artikel/a/b' });
  });
});

describe('parseHash — Tagebuch', () => {
  it('erkennt das Tagebuch mit und ohne Tag', () => {
    expect(parseHash('#/tagebuch')).toEqual({ art: 'tagebuch', datum: null });
    expect(parseHash('#/tagebuch/')).toEqual({ art: 'tagebuch', datum: null });
    expect(parseHash('#/tagebuch/2026-09-26')).toEqual({ art: 'tagebuch', datum: '2026-09-26' });
  });

  it('weist unmögliche Tage ab', () => {
    expect(parseHash('#/tagebuch/2026-02-30')).toEqual({ art: 'unbekannt', hash: '#/tagebuch/2026-02-30' });
    expect(parseHash('#/tagebuch/heute')).toEqual({ art: 'unbekannt', hash: '#/tagebuch/heute' });
  });
});
