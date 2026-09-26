import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import { App } from './App';
import { enzyklopaedie } from './inhalt';

// Verdrahtungs-Test gegen den ECHTEN Bestand: Route → Artikel, Suche → Treffer,
// Register-Umschalter. Die reinen Logiken haben eigene Tests.

function setzeHash(hash: string) {
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = '';
  });
  afterEach(cleanup);

  it('zeigt die Übersicht mit allen Artikeln als Links', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/belegt und quervernetzt/);
    const main = screen.getByRole('main');
    expect(within(main).getAllByRole('link').length).toBeGreaterThanOrEqual(enzyklopaedie.liste.length);
  });

  it('öffnet einen Artikel per Hash: Titel, Lede, Quellen, Siehe auch', () => {
    render(<App />);
    setzeHash('#/artikel/rag');
    const a = enzyklopaedie.nachId('rag')!;
    const artikel = within(screen.getByRole('article'));
    expect(artikel.getByRole('heading', { level: 1, name: a.titel })).toBeInTheDocument();
    expect(artikel.getByText(a.einleitung)).toBeInTheDocument();
    expect(artikel.getByRole('link', { name: new RegExp(a.quellen[0].titel.slice(0, 20)) })).toHaveAttribute(
      'href',
      a.quellen[0].url,
    );
    // „Siehe auch"-Chips: jeder Verweis genau einmal im Textteil.
    const siehe = artikel.getByRole('region', { name: 'Siehe auch' });
    for (const v of a.verweise) expect(within(siehe).getByRole('link', { name: v.titel })).toBeInTheDocument();
    expect(document.title).toContain(a.titel);
  });

  it('markiert den aktiven Artikel im Verzeichnis', () => {
    render(<App />);
    setzeHash('#/artikel/rag');
    const nav = screen.getByRole('navigation', { name: 'Artikelverzeichnis' });
    const aktiv = within(nav).getByRole('link', { current: 'page' });
    expect(aktiv).toHaveTextContent('RAG (Retrieval-Augmented Generation)');
  });

  it('zeigt einen gegliederten Artikel mit Inhaltsverzeichnis', () => {
    render(<App />);
    const gegliedert = enzyklopaedie.liste.find((a) => a.abschnitte)!;
    setzeHash(`#/artikel/${gegliedert.id}`);
    expect(screen.getByRole('navigation', { name: 'Inhalt des Artikels' })).toBeInTheDocument();
    for (const s of gegliedert.abschnitte!) {
      expect(screen.getByRole('heading', { level: 2, name: new RegExp(s.titel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })).toBeInTheDocument();
    }
  });

  it('fängt unbekannte Artikel ab', () => {
    render(<App />);
    setzeHash('#/artikel/gibt-es-nicht');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Kein Artikel „gibt-es-nicht“.');
  });

  it('sucht und zeigt Treffer mit Hervorhebung', () => {
    render(<App />);
    const feld = screen.getByRole('searchbox', { name: 'Artikel suchen' });
    fireEvent.change(feld, { target: { value: 'bussgeld' } });
    const nav = screen.getByRole('navigation', { name: 'Suchergebnisse' });
    expect(within(nav).getAllByRole('link')[0]).toHaveTextContent('Bußgelder (Art. 99)');
    expect(within(nav).getAllByRole('link')[0].querySelector('mark')).toHaveTextContent('Bußgeld');
    fireEvent.keyDown(feld, { key: 'Escape' });
    expect(screen.getByRole('navigation', { name: 'Artikelverzeichnis' })).toBeInTheDocument();
  });

  it('schaltet das Register auf A–Z um und merkt es sich', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('tab', { name: 'A–Z' }));
    expect(screen.getByRole('region', { name: 'Buchstabe A' })).toBeInTheDocument();
    expect(window.localStorage.getItem('ki-enzyklopaedie.register.v1')).toBe('az');
  });

  it('stellt die Schriftgröße am Dokument um', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('radio', { name: 'Schrift Groß' }));
    expect(document.documentElement.dataset.schrift).toBe('gross');
    expect(window.localStorage.getItem('ki-enzyklopaedie.schrift.v1')).toBe('gross');
  });
});
