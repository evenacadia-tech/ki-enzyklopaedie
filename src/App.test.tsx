import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { App } from './App';
import { enzyklopaedie } from './inhalt';
import { STRATEGIE_ID } from './inhalt/sammlungen/strategie';
import { GELESEN_KEY, _setzeGelesenFuerTests } from './lesefortschritt';
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

  it('färbt markierte Tage: Farbwahl, Zelle, Speicher und Filter nach Farbe', async () => {
    window.localStorage.setItem(
      BROWSER_KEY,
      JSON.stringify({
        version: 1,
        tage: {
          // Alte Markierung ohne Farbe → Gold.
          '2026-09-10': { text: '', markiert: true, ereignis: 'Kickoff', geaendert: '' },
          '2026-09-26': { text: 'Workshop-Tag.', markiert: true, ereignis: 'Strategie-Workshop', geaendert: '' },
        },
      }),
    );
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    const wahl = await screen.findByRole('radiogroup', { name: 'Farbe der Markierung' });
    expect(within(wahl).getAllByRole('radio')).toHaveLength(5);
    expect(within(wahl).getByRole('radio', { name: 'Gold' })).toBeChecked();
    const kalender = screen.getByLabelText('Kalender');
    expect(within(kalender).getByRole('link', { current: 'date' })).toHaveAttribute('data-farbe', 'gold');
    // Nur eine Farbe benutzt → kein Filter.
    expect(screen.queryByRole('group', { name: 'Markierte Tage nach Farbe filtern' })).not.toBeInTheDocument();

    fireEvent.click(within(wahl).getByRole('radio', { name: 'Salbei' }));
    expect(within(wahl).getByRole('radio', { name: 'Salbei' })).toBeChecked();
    const zelle = within(kalender).getByRole('link', { current: 'date' });
    expect(zelle).toHaveAttribute('data-farbe', 'salbei');
    expect(zelle).toHaveAccessibleName(/Ereignis: Strategie-Workshop, Farbe Salbei/);
    expect(within(kalender).getByRole('link', { name: /10\. September 2026/ })).toHaveAttribute('data-farbe', 'gold');
    expect(screen.getByText('Ereignis', { selector: '.marke' })).toHaveAttribute('data-farbe', 'salbei');
    await waitFor(() => expect(JSON.parse(window.localStorage.getItem(BROWSER_KEY)!).tage['2026-09-26'].farbe).toBe('salbei'));

    // Pfeiltaste wählt die nächste Farbe.
    fireEvent.keyDown(within(wahl).getByRole('radio', { name: 'Salbei' }), { key: 'ArrowRight' });
    expect(within(wahl).getByRole('radio', { name: 'Schiefer' })).toBeChecked();
    fireEvent.keyDown(within(wahl).getByRole('radio', { name: 'Schiefer' }), { key: 'ArrowLeft' });
    expect(within(wahl).getByRole('radio', { name: 'Salbei' })).toBeChecked();

    // Zwei Farben benutzt → Filter je Farbe; er zeigt nur die Tage dieser Farbe.
    const markierte = screen.getByRole('region', { name: /Markierte Tage/ });
    expect(within(markierte).getAllByRole('link')).toHaveLength(2);
    const filter = within(markierte).getByRole('group', { name: 'Markierte Tage nach Farbe filtern' });
    expect(within(filter).getAllByRole('button').map((b) => b.getAttribute('aria-label'))).toEqual(['Gold', 'Salbei']);
    fireEvent.click(within(filter).getByRole('button', { name: 'Salbei' }));
    expect(within(filter).getByRole('button', { name: 'Salbei' })).toHaveAttribute('aria-pressed', 'true');
    const gefiltert = within(markierte).getAllByRole('link');
    expect(gefiltert).toHaveLength(1);
    expect(gefiltert[0]).toHaveAttribute('href', '#/tagebuch/2026-09-26');
    expect(within(markierte).getByText('1 von 2')).toBeInTheDocument();
    fireEvent.click(within(filter).getByRole('button', { name: 'Alle' }));
    expect(within(markierte).getAllByRole('link')).toHaveLength(2);

    // Markierung aus → Farbwahl verschwindet, die Zelle trägt keine Farbe mehr.
    fireEvent.click(screen.getByRole('switch', { name: 'Besonderes Ereignis' }));
    expect(screen.queryByRole('radiogroup', { name: 'Farbe der Markierung' })).not.toBeInTheDocument();
    expect(within(kalender).getByRole('link', { current: 'date' })).not.toHaveAttribute('data-farbe');
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
    // Rückblick: der vorherige Eintrag mit Datum und Vorschau seines Textes.
    const blaettern = screen.getByRole('navigation', { name: 'Zwischen Einträgen blättern' });
    expect(within(blaettern).getByRole('heading', { name: 'Vorheriger Eintrag' })).toBeInTheDocument();
    const rueckblick = within(blaettern).getByRole('link', { name: /Do 10\.09\.2026/ });
    expect(rueckblick).toHaveAttribute('href', '#/tagebuch/2026-09-10');
    expect(rueckblick).toHaveTextContent('Erstes Kundengespräch beobachtet.');
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

  function bestand() {
    window.localStorage.setItem(
      BROWSER_KEY,
      JSON.stringify({
        version: 1,
        tage: {
          '2026-09-10': { text: 'Porter erklärt bekommen.\n? Was heißt EBIT?', markiert: false, ereignis: '', geaendert: '' },
          '2026-09-26': { text: 'Rückblick.', markiert: true, ereignis: 'Strategie-Workshop', geaendert: '' },
          '2026-10-02': { text: '? Wann ist der Kickoff', markiert: false, ereignis: '', geaendert: '' },
        },
      }),
    );
  }

  it('durchsucht das Tagebuch: Trefferliste mit Hervorhebung, Treffertage im Kalender', async () => {
    bestand();
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    await screen.findByRole('region', { name: /Einträge im Monat/ });
    const feld = screen.getByRole('searchbox', { name: 'Im Tagebuch suchen' });
    fireEvent.change(feld, { target: { value: 'porter' } });
    const nav = screen.getByRole('navigation', { name: 'Suchergebnisse im Tagebuch' });
    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute('href', '#/tagebuch/2026-09-10');
    expect(links[0].querySelector('mark')).toHaveTextContent('Porter');
    const kalender = screen.getByLabelText('Kalender');
    expect(within(kalender).getByRole('link', { name: /10\. September 2026.*Suchtreffer/ }).className).toContain('tag--treffer');
    // Ereignis-Bezeichnung zählt auch.
    fireEvent.change(feld, { target: { value: 'workshop' } });
    expect(within(nav).getAllByRole('link')[0]).toHaveAttribute('href', '#/tagebuch/2026-09-26');
    fireEvent.keyDown(feld, { key: 'Escape' });
    expect(screen.getByRole('navigation', { name: 'Einträge' })).toBeInTheDocument();
  });

  it('sammelt offene Fragen aus allen Tagen, neueste zuerst, und zählt sie am Tag', async () => {
    bestand();
    render(<App />);
    setzeHash('#/tagebuch/2026-09-10');
    const fragen = await screen.findByRole('region', { name: /Offene Fragen/ });
    const links = within(fragen).getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('Wann ist der Kickoff');
    expect(links[0]).toHaveAttribute('href', '#/tagebuch/2026-10-02');
    expect(links[1]).toHaveTextContent('Was heißt EBIT?');
    expect(screen.getByText('1 offene')).toBeInTheDocument();
  });

  it('zeigt Kalenderwochen und die Jahresübersicht mit Zählern', async () => {
    bestand();
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    await screen.findByRole('region', { name: /Einträge im Monat/ });
    const kalender = screen.getByLabelText('Kalender');
    expect(within(kalender).getByTitle('Kalenderwoche 39')).toHaveTextContent('39');
    fireEvent.click(screen.getByRole('button', { name: 'September 2026', expanded: false }));
    const jahr = screen.getByRole('group', { name: 'Monate 2026' });
    expect(within(jahr).getByRole('button', { name: 'September 2026: 2 Einträge, 1 Ereignisse' })).toBeInTheDocument();
    expect(within(jahr).getByRole('button', { name: 'Oktober 2026: 1 Einträge, 0 Ereignisse' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Nächstes Jahr' }));
    expect(screen.getByRole('group', { name: 'Monate 2027' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Januar 2027/ }));
    expect(screen.getByRole('button', { name: 'Januar 2027', expanded: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Kalender')).toBeInTheDocument();
  });

  it('weist auf das nächste Ereignis hin und exportiert als Markdown-Download', async () => {
    const naechster = new Date();
    naechster.setDate(naechster.getDate() + 3);
    const iso = heute(naechster);
    window.localStorage.setItem(
      BROWSER_KEY,
      JSON.stringify({ version: 1, tage: { [iso]: { text: '', markiert: true, ereignis: 'Kundentermin', geaendert: '' } } }),
    );
    render(<App />);
    setzeHash('#/tagebuch');
    const hinweis = await screen.findByRole('link', { name: /Nächstes Ereignis · in 3 Tagen.*Kundentermin/ });
    expect(hinweis).toHaveAttribute('href', `#/tagebuch/${iso}`);

    const urls: string[] = [];
    const objectUrl = vi.fn(() => 'blob:test');
    const revoke = vi.fn();
    Object.defineProperty(URL, 'createObjectURL', { value: objectUrl, configurable: true });
    Object.defineProperty(URL, 'revokeObjectURL', { value: revoke, configurable: true });
    const klick = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      urls.push(this.download);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Exportieren' }));
    await waitFor(() => expect(urls).toHaveLength(1));
    expect(urls[0]).toMatch(/^tagebuch-\d{4}-\d{2}-\d{2}\.md$/);
    expect(objectUrl).toHaveBeenCalledTimes(1);
    expect(await screen.findByRole('button', { name: 'Exportiert ✓' })).toBeInTheDocument();
    klick.mockRestore();
  });
});

describe('Lesestrecke und Lesefortschritt', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.location.hash = '';
    _setzeGelesenFuerTests([]);
    konfiguriereTagebuch(null);
  });
  afterEach(cleanup);

  const strecke = enzyklopaedie.liste.filter((a) => a.sammlung === STRATEGIE_ID);

  it('bietet Vor/Zurück in der Lesereihenfolge, nicht bei Grundlagen', () => {
    render(<App />);
    setzeHash(`#/artikel/${strecke[1].id}`);
    const nav = screen.getByRole('navigation', { name: 'Lesestrecke' });
    expect(within(nav).getByRole('link', { name: new RegExp('Zurück.*' + strecke[0].titel.slice(0, 12)) })).toHaveAttribute(
      'href',
      `#/artikel/${strecke[0].id}`,
    );
    expect(within(nav).getByRole('link', { name: new RegExp('Weiter.*' + strecke[2].titel.slice(0, 12)) })).toHaveAttribute(
      'href',
      `#/artikel/${strecke[2].id}`,
    );
    expect(screen.getByText(`2 von ${strecke.length}`)).toBeInTheDocument();

    setzeHash('#/artikel/rag');
    const ohne = screen.getByRole('navigation', { name: 'Lesestrecke' });
    expect(within(ohne).queryAllByRole('link')).toHaveLength(0);
    expect(within(ohne).getByRole('button', { name: 'Als gelesen markieren' })).toBeInTheDocument();
  });

  it('merkt „gelesen“ dauerhaft: Marke, Haken im Register, Weiterlesen auf der Startseite', () => {
    render(<App />);
    const start = screen.getByRole('region', { name: 'Weiterlesen' });
    expect(within(start).getByText(`0 von ${strecke.length} gelesen`)).toBeInTheDocument();
    expect(within(start).getByRole('link', { name: new RegExp('Beginnen.*' + strecke[0].titel.slice(0, 12)) })).toHaveAttribute(
      'href',
      `#/artikel/${strecke[0].id}`,
    );

    setzeHash(`#/artikel/${strecke[0].id}`);
    fireEvent.click(screen.getByRole('button', { name: 'Als gelesen markieren' }));
    expect(screen.getByRole('button', { name: 'Gelesen', pressed: true })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(GELESEN_KEY)!)).toEqual([strecke[0].id]);
    const verzeichnis = screen.getByRole('navigation', { name: 'Artikelverzeichnis' });
    const eintrag = within(verzeichnis).getByRole('link', { current: 'page' });
    expect(within(eintrag).getByRole('img', { name: 'gelesen' })).toBeInTheDocument();

    // „Weiter“ merkt den aktuellen Artikel ebenfalls als gelesen.
    setzeHash(`#/artikel/${strecke[1].id}`);
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Lesestrecke' })).getByRole('link', { name: /Weiter/ }));
    expect(JSON.parse(window.localStorage.getItem(GELESEN_KEY)!)).toEqual([strecke[0].id, strecke[1].id]);

    setzeHash('#/');
    const start2 = screen.getByRole('region', { name: 'Weiterlesen' });
    expect(within(start2).getByText(`2 von ${strecke.length} gelesen`)).toBeInTheDocument();
    expect(within(start2).getByRole('link', { name: new RegExp('Weiter.*' + strecke[2].titel.slice(0, 12)) })).toBeInTheDocument();
  });
});
