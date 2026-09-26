import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { App } from './App';
import { enzyklopaedie } from './inhalt';
import { formatiereTagLang, heute } from './tagebuch/modell';
import { BROWSER_KEY } from './tagebuch/speicher';
import { konfiguriereTagebuch } from './tagebuch/zustand';

// Verdrahtungs-Test gegen den ECHTEN Bestand: Route → Artikel, Suche → Treffer,
// Register-Umschalter, Tagebuch → Browser-Speicher. Die reinen Logiken haben eigene Tests.

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
    konfiguriereTagebuch(null);
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
      expect(
        screen.getByRole('heading', { level: 2, name: new RegExp(s.titel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }),
      ).toBeInTheDocument();
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

describe('Tagebuch', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = '';
    konfiguriereTagebuch(null);
  });
  afterEach(cleanup);

  it('öffnet den heutigen Tag über den Bereichs-Umschalter', async () => {
    render(<App />);
    const umschalter = screen.getByRole('navigation', { name: 'Bereich' });
    expect(within(umschalter).getByRole('link', { name: 'Tagebuch' })).toHaveAttribute('href', '#/tagebuch');
    setzeHash('#/tagebuch');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(formatiereTagLang(heute()));
    expect(within(umschalter).getByRole('link', { name: 'Tagebuch' })).toHaveAttribute('aria-current', 'page');
    expect(document.title).toContain('Tagebuch');
    // Nach dem Laden ist das Feld schreibbar und der Status ehrlich.
    const feld = await screen.findByRole('textbox', { name: 'Gedanken zu diesem Tag' });
    await waitFor(() => expect(feld).toBeEnabled());
    expect(screen.getByRole('status', { name: '' })).toBeDefined();
    expect(screen.getByText('Noch kein Eintrag')).toBeInTheDocument();
  });

  it('speichert Text und Ereignis-Markierung dauerhaft im Browser-Speicher', async () => {
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Samstag, 26. September 2026');
    const feld = await screen.findByRole('textbox', { name: 'Gedanken zu diesem Tag' });
    await waitFor(() => expect(feld).toBeEnabled());

    fireEvent.change(feld, { target: { value: 'Erster Tag: Strategie heißt Auswahl, nicht Wunschliste.' } });
    expect(screen.getByText('Ungesichert …')).toBeInTheDocument();
    fireEvent.blur(feld);
    await waitFor(() => expect(window.localStorage.getItem(BROWSER_KEY)).toContain('Wunschliste'));
    expect(screen.getByText(/^Gespeichert/)).toBeInTheDocument();

    // Markieren → Feld für die Bezeichnung erscheint, Kalender und Liste zeigen das Ereignis.
    fireEvent.click(screen.getByRole('switch', { name: 'Besonderes Ereignis' }));
    const bezeichnung = screen.getByRole('textbox', { name: 'Bezeichnung des Ereignisses' });
    fireEvent.change(bezeichnung, { target: { value: 'Strategie-Workshop' } });
    fireEvent.blur(bezeichnung);
    await waitFor(() => expect(window.localStorage.getItem(BROWSER_KEY)).toContain('Strategie-Workshop'));

    const kalender = screen.getByLabelText('Kalender');
    const zelle = within(kalender).getByRole('link', { current: 'date' });
    expect(zelle).toHaveAttribute('href', '#/tagebuch/2026-09-26');
    expect(zelle.className).toContain('tag--ereignis');
    expect(zelle.className).toContain('tag--eintrag');
    expect(zelle).toHaveAccessibleName(/Ereignis: Strategie-Workshop/);
    const markierte = screen.getByRole('region', { name: /Markierte Tage/ });
    expect(within(markierte).getByRole('link', { name: /26\.09\.2026.*Strategie-Workshop/ })).toBeInTheDocument();
    const gespeichert = JSON.parse(window.localStorage.getItem(BROWSER_KEY)!);
    expect(gespeichert.tage['2026-09-26'].markiert).toBe(true);
  });

  it('lädt gespeicherte Einträge und blättert zwischen ihnen', async () => {
    window.localStorage.setItem(
      BROWSER_KEY,
      JSON.stringify({
        version: 1,
        tage: {
          '2026-09-10': { text: 'Erstes Kundengespräch beobachtet.', markiert: false, ereignis: '', geaendert: '' },
          '2026-09-26': { text: 'Rückblick.', markiert: true, ereignis: 'Meilenstein', geaendert: '2026-09-26T12:00:00.000Z' },
        },
      }),
    );
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    const feld = await screen.findByRole('textbox', { name: 'Gedanken zu diesem Tag' });
    await waitFor(() => expect(feld).toHaveValue('Rückblick.'));
    expect(screen.getByRole('switch', { name: 'Besonderes Ereignis' })).toHaveAttribute('aria-checked', 'true');
    const blaettern = screen.getByRole('navigation', { name: 'Zwischen Einträgen blättern' });
    expect(within(blaettern).getByRole('link', { name: /Vorheriger: 10\.09\.2026/ })).toHaveAttribute(
      'href',
      '#/tagebuch/2026-09-10',
    );
    // Der Monat listet beide Einträge; die Vorschau nimmt die erste Zeile.
    const monat = screen.getByRole('region', { name: /Einträge im Monat/ });
    expect(within(monat).getAllByRole('link')).toHaveLength(2);
    expect(within(monat).getByRole('link', { name: /Erstes Kundengespräch/ })).toBeInTheDocument();
  });

  it('fängt unmögliche Tage ab und findet zurück in die Enzyklopädie', () => {
    render(<App />);
    setzeHash('#/tagebuch/2026-02-30');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Diese Adresse gibt es nicht.');
    setzeHash('#/');
    expect(screen.getByRole('navigation', { name: 'Artikelverzeichnis' })).toBeInTheDocument();
  });
});
