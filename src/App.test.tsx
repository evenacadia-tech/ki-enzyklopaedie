import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { App } from './App';
import { enzyklopaedie } from './inhalt';
import { STRATEGIE_ID } from './inhalt/sammlungen/strategie';
import { GELESEN_KEY, _setzeGelesenFuerTests } from './lesefortschritt';
import { exportiereMarkdown } from './tagebuch/export';
import { formatiereTagLang, heute } from './tagebuch/modell';
import { BROWSER_KEY } from './tagebuch/speicher';
import { konfiguriereTagebuch } from './tagebuch/zustand';
import { BROWSER_KEY as DOKUMENTE_KEY } from './dokumente/speicher';
import { konfiguriereDokumente } from './dokumente/zustand';
import * as dialoge from './dokumente/dialoge';
import { fakeSpeicher } from './test/fake-dokumente';
import { PODCAST_KEY, _abspielerZuruecksetzen, _audioFuerTests } from './podcast/abspieler';
import { podcastZu } from './podcast/katalog';

// Verdrahtungs-Test gegen den ECHTEN Bestand: Route → Artikel, Suche → Treffer,
// Register-Umschalter, Tagebuch → Browser-Speicher. Die reinen Logiken haben eigene Tests.

function setzeHash(hash: string) {
  act(() => {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  });
}

/**
 * Sauberer Anfang für jeden Test. jsdom führt den Klick auf einen Link erst in einer
 * späteren Task aus — erst abwarten, sonst fällt die Navigation des vorigen Tests in
 * diesen und wechselt mittendrin die Route.
 */
async function frisch() {
  await new Promise((r) => setTimeout(r, 0));
  window.localStorage.clear();
  window.location.hash = '';
  konfiguriereTagebuch(null);
  konfiguriereDokumente(null);
  _abspielerZuruecksetzen();
}

describe('App', () => {
  beforeEach(frisch);
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
  beforeEach(frisch);
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

  const waehleDatei = (inhalt: string, name = 'tagebuch-2026-09-27.md') =>
    fireEvent.change(screen.getByLabelText('Exportierte Tagebuch-Datei'), {
      target: { files: [new File([inhalt], name, { type: 'text/markdown' })] },
    });
  const gespeichert = () => JSON.parse(window.localStorage.getItem(BROWSER_KEY) ?? '{"tage":{}}').tage;

  it('importiert eine exportierte Datei: Vorschau, Wahl bei abweichenden Tagen, dann geschrieben', async () => {
    const imTagebuch = { text: 'Im Tagebuch.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '2026-09-26T10:00:00.000Z' };
    window.localStorage.setItem(BROWSER_KEY, JSON.stringify({ version: 1, tage: { '2026-09-26': imTagebuch } }));
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    fireEvent.click(await screen.findByRole('button', { name: 'Importieren' }));
    waehleDatei(
      exportiereMarkdown(
        {
          '2026-09-10': { text: 'Erster Tag.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '' },
          '2026-09-26': { text: 'Aus der Datei.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '' },
          '2026-10-02': { text: '', markiert: true, ereignis: 'Kickoff', farbe: 'salbei', geaendert: '' },
        },
        new Date(),
        new Map([['2026-09-10', [{ name: 'Folien.pptx', datei: 'abc123xyz0_Folien.pptx' }]]]),
      ),
    );

    const tafel = within(await screen.findByRole('region', { name: 'Import' }));
    expect(tafel.getByText('tagebuch-2026-09-27.md')).toBeInTheDocument();
    const zahl = (begriff: string) => tafel.getByText(begriff).nextElementSibling;
    expect(zahl('In der Datei')).toHaveTextContent('3 Tage');
    expect(zahl('Neu')).toHaveTextContent('2');
    expect(zahl('Schon vorhanden')).toHaveTextContent('0');
    expect(zahl('Anders im Tagebuch')).toHaveTextContent('1');
    expect(tafel.getByText(/Die Datei nennt 1 Anhang nur beim Namen/)).toBeInTheDocument();
    // Der abweichende Tag ist genannt und verlinkt; vorgewählt ist die vorsichtige Wahl.
    const wahl = within(tafel.getByRole('group', { name: /Ein Tag steht im Tagebuch anders/ }));
    expect(wahl.getByRole('link', { name: '26.09.2026' })).toHaveAttribute('href', '#/tagebuch/2026-09-26');
    expect(wahl.getByRole('radio', { name: 'Tagebuch behalten' })).toBeChecked();
    expect(tafel.getByRole('button', { name: '2 Tage importieren' })).toBeInTheDocument();
    // Vor der Bestätigung ist nichts geschrieben.
    expect(Object.keys(gespeichert())).toEqual(['2026-09-26']);

    fireEvent.click(wahl.getByRole('radio', { name: 'Durch die Datei ersetzen' }));
    fireEvent.click(tafel.getByRole('button', { name: '3 Tage importieren' }));
    expect(await screen.findByText('3 Tage importiert.')).toHaveAttribute('role', 'status');
    expect(screen.queryByRole('region', { name: 'Import' })).not.toBeInTheDocument();

    const tage = gespeichert();
    expect(Object.keys(tage).sort()).toEqual(['2026-09-10', '2026-09-26', '2026-10-02']);
    expect(tage['2026-09-26'].text).toBe('Aus der Datei.');
    expect(tage['2026-10-02']).toMatchObject({ markiert: true, ereignis: 'Kickoff', farbe: 'salbei' });
    // Der offene Tag zeigt sofort die Fassung der Datei, die Zählung stimmt.
    expect(screen.getByRole('textbox', { name: 'Gedanken zu diesem Tag' })).toHaveValue('Aus der Datei.');
    expect(screen.getByText('3 Einträge · 1 Ereignis')).toBeInTheDocument();
  });

  it('lässt vorhandene Tage stehen, solange man nichts anderes wählt, und bricht ohne Schaden ab', async () => {
    const imTagebuch = { text: 'Im Tagebuch.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '2026-09-26T10:00:00.000Z' };
    window.localStorage.setItem(BROWSER_KEY, JSON.stringify({ version: 1, tage: { '2026-09-26': imTagebuch } }));
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    await screen.findByRole('button', { name: 'Importieren' });
    const datei = exportiereMarkdown(
      {
        '2026-09-10': { text: 'Erster Tag.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '' },
        '2026-09-26': { text: 'Aus der Datei.', markiert: false, ereignis: '', farbe: 'gold', geaendert: '' },
      },
      new Date(),
    );

    waehleDatei(datei);
    fireEvent.click(within(await screen.findByRole('region', { name: 'Import' })).getByRole('button', { name: 'Abbrechen' }));
    expect(screen.queryByRole('region', { name: 'Import' })).not.toBeInTheDocument();
    expect(gespeichert()).toEqual({ '2026-09-26': imTagebuch });

    // Dieselbe Datei noch einmal, diesmal bestätigt — mit der vorgewählten, vorsichtigen Wahl.
    waehleDatei(datei);
    fireEvent.click(within(await screen.findByRole('region', { name: 'Import' })).getByRole('button', { name: '1 Tag importieren' }));
    expect(await screen.findByText('1 Tag importiert.')).toBeInTheDocument();
    expect(gespeichert()['2026-09-26']).toEqual(imTagebuch);
    expect(gespeichert()['2026-09-10'].text).toBe('Erster Tag.');

    // Ein drittes Mal: der neue Tag ist jetzt da, übrig bleibt nur der abweichende.
    waehleDatei(datei);
    const tafel = within(await screen.findByRole('region', { name: 'Import' }));
    expect(tafel.getByText('Mit dieser Wahl ändert der Import nichts.')).toBeInTheDocument();
    expect(tafel.queryByRole('button', { name: /importieren/ })).not.toBeInTheDocument();
    fireEvent.keyDown(tafel.getByRole('button', { name: 'Schließen' }), { key: 'Escape' });
    expect(screen.queryByRole('region', { name: 'Import' })).not.toBeInTheDocument();
  });

  it('lehnt eine fremde Datei ab und schreibt nichts', async () => {
    render(<App />);
    setzeHash('#/tagebuch');
    await screen.findByRole('button', { name: 'Importieren' });
    waehleDatei('# Einkaufsliste\n\n- Brot\n', 'einkauf.md');
    expect(await screen.findByRole('alert')).toHaveTextContent('Import fehlgeschlagen: In der Datei steht kein Tagebuchtag.');
    expect(screen.queryByRole('region', { name: 'Import' })).not.toBeInTheDocument();
    expect(window.localStorage.getItem(BROWSER_KEY)).toBeNull();
    expect(screen.getByRole('button', { name: 'Importieren' })).toBeEnabled();
  });
});

describe('Lesestrecke und Lesefortschritt', () => {
  beforeEach(async () => {
    await frisch();
    _setzeGelesenFuerTests([]);
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

describe('Podcast', () => {
  beforeEach(async () => {
    await frisch();
    // jsdom spielt nichts ab: play/pause melden, was ein Browser melden würde.
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
      this.dispatchEvent(new Event('play'));
      return Promise.resolve();
    });
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
      this.dispatchEvent(new Event('pause'));
    });
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
  });
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const podcast = podcastZu('timeline')!;
  const kopf = () => within(screen.getByRole('article').querySelector('header')!);

  it('zeigt den Knopf neben dem Titel nur bei Artikeln mit Podcast', () => {
    render(<App />);
    setzeHash('#/artikel/timeline');
    const knopf = kopf().getByRole('button', { name: /^Podcast abspielen/ });
    expect(knopf).toHaveTextContent('20 min');
    expect(knopf).toHaveAttribute('title', `Podcast: ${podcast.titel}`);
    expect(screen.queryByRole('region', { name: 'Podcast' })).not.toBeInTheDocument();

    setzeHash('#/artikel/rag');
    expect(kopf().queryByRole('button', { name: /Podcast/ })).not.toBeInTheDocument();
  });

  it('startet mit dem Knopf, zeigt die Leiste und behält sie beim Wechsel zu einem anderen Artikel', async () => {
    render(<App />);
    setzeHash('#/artikel/timeline');
    fireEvent.click(kopf().getByRole('button', { name: /^Podcast abspielen/ }));
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    expect(_audioFuerTests()!.src).toMatch(/\/podcasts\/timeline\.opus$/);

    const leiste = within(screen.getByRole('region', { name: 'Podcast' }));
    expect(leiste.getByText(podcast.titel!)).toBeInTheDocument();
    expect(leiste.getByRole('button', { name: 'Anhalten' })).toBeInTheDocument();
    expect(leiste.getByRole('slider', { name: 'Stelle im Podcast' })).toHaveAttribute('aria-valuetext', '0:00 von 19:54');
    // Auf dem eigenen Artikel ist der Titel kein Link.
    expect(leiste.queryByRole('link')).not.toBeInTheDocument();
    expect(kopf().getByRole('button', { name: /^Podcast anhalten/ })).toBeInTheDocument();

    act(() => {
      _audioFuerTests()!.currentTime = 90;
      _audioFuerTests()!.dispatchEvent(new Event('timeupdate'));
    });
    expect(leiste.getByText('1:30')).toBeInTheDocument();
    expect(leiste.getByText('−18:24')).toBeInTheDocument();

    setzeHash('#/artikel/rag');
    const weiter = within(screen.getByRole('region', { name: 'Podcast' }));
    expect(weiter.getByRole('link', { name: enzyklopaedie.nachId('timeline')!.titel })).toHaveAttribute('href', '#/artikel/timeline');
    fireEvent.click(weiter.getByRole('button', { name: 'Anhalten' }));
    expect(weiter.getByRole('button', { name: 'Abspielen' })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(PODCAST_KEY)!).stellen.timeline).toBe(90);

    fireEvent.click(weiter.getByRole('button', { name: 'Podcast schließen' }));
    expect(screen.queryByRole('region', { name: 'Podcast' })).not.toBeInTheDocument();
    expect(document.activeElement).toBe(screen.getByRole('main'));
  });

  it('springt mit dem Regler erst beim Loslassen, spult und ändert das Tempo', async () => {
    render(<App />);
    setzeHash('#/artikel/timeline');
    fireEvent.click(kopf().getByRole('button', { name: /^Podcast abspielen/ }));
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    const leiste = within(screen.getByRole('region', { name: 'Podcast' }));
    const regler = leiste.getByRole('slider', { name: 'Stelle im Podcast' });
    const audio = _audioFuerTests()!;

    // Ziehen (input) zeigt nur die Zielzeit; gesprungen wird beim Festschreiben (change).
    fireEvent.input(regler, { target: { value: '600' } });
    expect(regler).toHaveAttribute('aria-valuetext', '10:00 von 19:54');
    expect(audio.currentTime).toBe(0);
    fireEvent.change(regler);
    expect(audio.currentTime).toBe(600);

    fireEvent.click(leiste.getByRole('button', { name: '15 Sekunden zurück' }));
    expect(audio.currentTime).toBe(585);
    fireEvent.click(leiste.getByRole('button', { name: '30 Sekunden vor' }));
    expect(audio.currentTime).toBe(615);

    fireEvent.click(leiste.getByRole('button', { name: 'Tempo 1×, ändern' }));
    expect(leiste.getByRole('button', { name: 'Tempo 1,25×, ändern' })).toHaveTextContent('1,25×');
    expect(audio.playbackRate).toBe(1.25);
  });

  it('bietet bei einer gemerkten Stelle „fortsetzen“ mit der Restzeit an', () => {
    window.localStorage.setItem(PODCAST_KEY, JSON.stringify({ tempo: 1, stellen: { timeline: 600 } }));
    _abspielerZuruecksetzen();
    render(<App />);
    setzeHash('#/artikel/timeline');
    const knopf = kopf().getByRole('button', { name: /^Podcast fortsetzen/ });
    expect(knopf).toHaveTextContent(`noch ${Math.round((podcast.sekunden - 600) / 60)} min`);
  });

  it('zeigt einen Ladefehler in der Leiste', async () => {
    render(<App />);
    setzeHash('#/artikel/timeline');
    fireEvent.click(kopf().getByRole('button', { name: /^Podcast abspielen/ }));
    await waitFor(() => expect(HTMLMediaElement.prototype.play).toHaveBeenCalled());
    act(() => {
      Object.defineProperty(_audioFuerTests()!, 'error', { value: { code: 2 }, configurable: true });
      _audioFuerTests()!.dispatchEvent(new Event('error'));
    });
    expect(within(screen.getByRole('region', { name: 'Podcast' })).getByRole('alert')).toHaveTextContent(
      'Die Audiodatei ließ sich nicht laden.',
    );
  });
});

describe('Dokumente', () => {
  beforeEach(frisch);
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const ZEUGNIS = {
    id: 'abc123xyz0',
    datei: 'abc123xyz0_Zeugnis.pdf',
    name: 'Arbeitszeugnis',
    art: 'zertifikat' as const,
    tag: null,
    notiz: 'Vom ersten Praktikum.',
    hinzugefuegt: '2026-09-01T08:00:00.000Z',
    groesse: 2048,
    typ: 'pdf',
  };
  const VERTRAG = {
    id: 'abc123xyz1',
    datei: 'abc123xyz1_Vertrag.docx',
    name: 'Praktikumsvertrag.docx',
    art: 'dokument' as const,
    tag: null,
    notiz: '',
    hinzugefuegt: '2026-09-05T08:00:00.000Z',
    groesse: 51200,
    typ: 'docx',
  };
  const FOLIEN = {
    id: 'abc123xyz2',
    datei: 'abc123xyz2_Folien.pptx',
    name: 'Folien.pptx',
    art: 'anhang' as const,
    tag: '2026-09-26',
    notiz: '',
    hinzugefuegt: '2026-09-26T18:00:00.000Z',
    groesse: 3 * 1024 * 1024,
    typ: 'pptx',
  };

  function bestand() {
    window.localStorage.setItem(DOKUMENTE_KEY, JSON.stringify({ version: 1, dokumente: [ZEUGNIS, VERTRAG, FOLIEN] }));
  }
  const gespeichert = () => JSON.parse(window.localStorage.getItem(DOKUMENTE_KEY)!).dokumente as (typeof ZEUGNIS)[];

  it('ist der dritte Bereich: leere Übersicht mit drei Abteilungen', async () => {
    render(<App />);
    const umschalter = screen.getByRole('navigation', { name: 'Bereich' });
    expect(within(umschalter).getByRole('link', { name: 'Dokumente' })).toHaveAttribute('href', '#/dokumente');
    setzeHash('#/dokumente');
    expect(within(umschalter).getByRole('link', { name: 'Dokumente' })).toHaveAttribute('aria-current', 'page');
    expect(document.title).toBe('Dokumente — KI-Enzyklopädie');
    const main = within(screen.getByRole('main'));
    expect(main.getByRole('heading', { level: 1 })).toHaveTextContent(/Zertifikate, wichtige Dokumente/);
    for (const name of ['Zertifikate', 'Wichtige Dokumente', 'Aus dem Tagebuch']) {
      expect(main.getByRole('region', { name })).toBeInTheDocument();
    }
    // Im Browser gibt es keinen Dateizugriff — Hinzufügen ist abgeschaltet und sagt, warum.
    const knopf = await main.findByRole('button', { name: 'Zertifikate: Datei hinzufügen' });
    await waitFor(() => expect(knopf).toHaveAttribute('title', expect.stringMatching(/nur in der App/)));
    expect(knopf).toBeDisabled();
    expect(screen.getByText('0 Dokumente', { selector: 'footer span' })).toBeInTheDocument();
  });

  it('zeigt den Bestand in Abteilungen, im Verzeichnis und in der Suche', async () => {
    bestand();
    render(<App />);
    setzeHash('#/dokumente');
    const main = within(screen.getByRole('main'));
    const zertifikate = await main.findByRole('region', { name: 'Zertifikate' });
    expect(await within(zertifikate).findByRole('link', { name: 'Arbeitszeugnis' })).toHaveAttribute('href', '#/dokumente/abc123xyz0');
    expect(within(zertifikate).getByText('Vom ersten Praktikum.')).toBeInTheDocument();
    expect(within(zertifikate).getByText('2 KB')).toBeInTheDocument();
    const tagebuch = main.getByRole('region', { name: 'Aus dem Tagebuch' });
    expect(within(tagebuch).getByRole('link', { name: 'Samstag, 26. September 2026' })).toHaveAttribute('href', '#/tagebuch/2026-09-26');
    expect(within(tagebuch).getByRole('link', { name: 'Folien.pptx' })).toBeInTheDocument();

    const verzeichnis = screen.getByRole('navigation', { name: 'Dokumentenverzeichnis' });
    expect(within(verzeichnis).getByRole('link', { name: 'Übersicht' })).toHaveAttribute('aria-current', 'page');
    expect(within(within(verzeichnis).getByRole('region', { name: /Wichtige Dokumente/ })).getAllByRole('link')).toHaveLength(1);
    expect(screen.getByText('3 Dokumente', { selector: 'footer span' })).toBeInTheDocument();

    const feld = screen.getByRole('searchbox', { name: 'Dokumente suchen' });
    fireEvent.change(feld, { target: { value: 'praktikum' } });
    const treffer = within(screen.getByRole('navigation', { name: 'Suchergebnisse in Dokumenten' })).getAllByRole('link');
    expect(treffer.map((t) => t.getAttribute('href'))).toEqual(['#/dokumente/abc123xyz1', '#/dokumente/abc123xyz0']);
    expect(treffer[0].querySelector('mark')).toHaveTextContent('Praktikum');
    fireEvent.change(feld, { target: { value: 'gibtsnicht' } });
    expect(screen.getByText('Kein Dokument zu „gibtsnicht“.')).toBeInTheDocument();
    fireEvent.keyDown(feld, { key: 'Escape' });
    expect(screen.getByRole('navigation', { name: 'Dokumentenverzeichnis' })).toBeInTheDocument();
  });

  it('öffnet ein Dokument: Name, Notiz und Abteilung ändern sich dauerhaft', async () => {
    bestand();
    render(<App />);
    setzeHash('#/dokumente/abc123xyz2');
    const artikel = within(await screen.findByRole('article'));
    expect(artikel.getByRole('heading', { level: 1, name: 'Folien.pptx' })).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe('Folien.pptx · Dokumente — KI-Enzyklopädie'));
    expect(artikel.getByRole('link', { name: 'Samstag, 26. September 2026' })).toHaveAttribute('href', '#/tagebuch/2026-09-26');
    expect(artikel.getByText('3 MB')).toBeInTheDocument();
    expect(artikel.getByText(/Für diesen Dateityp gibt es keine Vorschau/)).toBeInTheDocument();
    expect(within(screen.getByRole('navigation', { name: 'Dokumentenverzeichnis' })).getByRole('link', { current: 'page' })).toHaveTextContent(
      'Folien.pptx',
    );

    const name = artikel.getByRole('textbox', { name: 'Name' });
    await waitFor(() => expect(name).toBeEnabled());
    fireEvent.change(name, { target: { value: 'Workshop-Folien' } });
    expect(artikel.getByText('Ungesichert …')).toBeInTheDocument();
    fireEvent.blur(name);
    await waitFor(() => expect(gespeichert().find((d) => d.id === 'abc123xyz2')!.name).toBe('Workshop-Folien'));
    expect(artikel.getByRole('heading', { level: 1, name: 'Workshop-Folien' })).toBeInTheDocument();

    const notiz = artikel.getByRole('textbox', { name: 'Notiz' });
    fireEvent.change(notiz, { target: { value: 'Stand nach dem Termin.' } });
    fireEvent.blur(notiz);
    await waitFor(() => expect(gespeichert().find((d) => d.id === 'abc123xyz2')!.notiz).toBe('Stand nach dem Termin.'));

    // Hängt an einem Tag → alle drei Abteilungen stehen zur Wahl; der Tag bleibt beim Wechsel.
    const wahl = artikel.getByRole('radiogroup', { name: 'Abteilung' });
    expect(within(wahl).getAllByRole('radio').map((r) => r.textContent)).toEqual(['Zertifikate', 'Wichtige Dokumente', 'Aus dem Tagebuch']);
    expect(within(wahl).getByRole('radio', { name: 'Aus dem Tagebuch' })).toBeChecked();
    fireEvent.click(within(wahl).getByRole('radio', { name: 'Zertifikate' }));
    await waitFor(() => expect(gespeichert().find((d) => d.id === 'abc123xyz2')).toMatchObject({ art: 'zertifikat', tag: '2026-09-26' }));
    expect(artikel.getByText(/^Gespeichert/)).toBeInTheDocument();

    // Ohne Tag gibt es „Aus dem Tagebuch“ nicht zur Wahl.
    setzeHash('#/dokumente/abc123xyz0');
    const zweites = within(await screen.findByRole('article'));
    expect(within(zweites.getByRole('radiogroup', { name: 'Abteilung' })).getAllByRole('radio')).toHaveLength(2);
    expect(zweites.getByText(/Die Vorschau gibt es in der App/)).toBeInTheDocument();
  });

  it('entfernt erst nach Rückfrage — und dann endgültig', async () => {
    bestand();
    const frage = vi.spyOn(dialoge, 'frageEntfernen').mockResolvedValueOnce(false).mockResolvedValueOnce(true);
    render(<App />);
    setzeHash('#/dokumente/abc123xyz1');
    const artikel = within(await screen.findByRole('article'));
    const knopf = artikel.getByRole('button', { name: 'Entfernen …' });
    await waitFor(() => expect(knopf).toBeEnabled());

    fireEvent.click(knopf);
    await waitFor(() => expect(frage).toHaveBeenCalledWith('Praktikumsvertrag.docx'));
    expect(gespeichert()).toHaveLength(3);
    expect(screen.getByRole('article')).toBeInTheDocument();

    fireEvent.click(knopf);
    await waitFor(() => expect(gespeichert().map((d) => d.id)).toEqual(['abc123xyz0', 'abc123xyz2']));
    // Danach steht die Übersicht; der alte Link führt ins Leere — und sagt es.
    await waitFor(() => expect(window.location.hash).toBe('#/dokumente'));
    setzeHash('#/dokumente');
    expect(screen.getByText('2 Dokumente', { selector: 'footer span' })).toBeInTheDocument();
    setzeHash('#/dokumente/abc123xyz1');
    expect(await screen.findByRole('heading', { level: 1, name: 'Dieses Dokument gibt es nicht.' })).toBeInTheDocument();
    setzeHash('#/dokumente/kaputt');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Diese Adresse gibt es nicht.');
  });

  it('importiert über die Dateiauswahl, öffnet und zeigt im Ordner', async () => {
    const s = fakeSpeicher([ZEUGNIS]);
    konfiguriereDokumente(s);
    const auswahl = vi
      .spyOn(dialoge, 'waehleDateien')
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce(['C:\\Users\\x\\Desktop\\Urkunde KI.pdf', 'C:\\Users\\x\\Desktop\\Gesperrt.pdf']);
    s.unlesbar.add('C:\\Users\\x\\Desktop\\Gesperrt.pdf');
    render(<App />);
    setzeHash('#/dokumente');
    const main = within(screen.getByRole('main'));
    const knopf = await main.findByRole('button', { name: 'Zertifikate: Datei hinzufügen' });
    await waitFor(() => expect(knopf).toBeEnabled());

    // Abgebrochene Auswahl: nichts passiert.
    fireEvent.click(knopf);
    await waitFor(() => expect(auswahl).toHaveBeenCalledTimes(1));
    expect(s.importiert).toEqual([]);

    fireEvent.click(knopf);
    const zertifikate = main.getByRole('region', { name: 'Zertifikate' });
    expect(await within(zertifikate).findByRole('link', { name: 'Urkunde KI.pdf' })).toBeInTheDocument();
    await waitFor(() => expect(s.geschrieben).toHaveLength(1));
    expect(s.geschrieben[0].dokumente.map((d) => [d.name, d.art, d.tag])).toEqual([
      ['Arbeitszeugnis', 'zertifikat', null],
      ['Urkunde KI.pdf', 'zertifikat', null],
    ]);
    expect(await main.findByRole('alert')).toHaveTextContent('1 von 2 Dateien hinzugefügt. Nicht hinzugefügt — Gesperrt.pdf: Zugriff verweigert');
    fireEvent.click(main.getByRole('button', { name: 'Meldung schließen' }));
    expect(main.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.getByText('2 Dokumente', { selector: 'footer span' })).toHaveAttribute('title', 'Gespeichert in C:\\Test\\dokumente');

    fireEvent.click(within(zertifikate).getByRole('button', { name: 'Arbeitszeugnis öffnen' }));
    await waitFor(() => expect(s.geoeffnet).toEqual(['abc123xyz0']));
    setzeHash('#/dokumente/abc123xyz0');
    const artikel = within(await screen.findByRole('article'));
    fireEvent.click(artikel.getByRole('button', { name: 'Im Ordner zeigen' }));
    await waitFor(() => expect(s.gezeigt).toEqual(['abc123xyz0']));
    // PDF → Vorschau im Rahmen, Adresse vom Speicher.
    expect(await artikel.findByTitle('Vorschau: Arbeitszeugnis')).toHaveAttribute('src', 'asset://abc123xyz0');
  });

  it('zeigt Bilder im Bild, PDF im Rahmen — und nichts, wenn die Datei nur so heißt', async () => {
    const FOTO = { ...ZEUGNIS, id: 'abc123xyz7', datei: 'abc123xyz7_Foto.JPG', name: 'Foto.JPG', typ: 'jpg' };
    const FALSCH = { ...ZEUGNIS, id: 'abc123xyz8', datei: 'abc123xyz8_Falsch.pdf', name: 'Falsch.pdf' };
    const s = fakeSpeicher([ZEUGNIS, FOTO, FALSCH]);
    s.ohneVorschau.add('abc123xyz8');
    konfiguriereDokumente(s);
    render(<App />);

    setzeHash('#/dokumente/abc123xyz7');
    const bild = await screen.findByRole('img', { name: 'Vorschau: Foto.JPG' });
    expect(bild).toHaveAttribute('src', 'asset://abc123xyz7');
    // Lässt sich das Bild nicht laden, tritt die Kachel an seine Stelle.
    fireEvent.error(bild);
    expect(screen.queryByRole('img', { name: 'Vorschau: Foto.JPG' })).not.toBeInTheDocument();
    expect(screen.getByText(/Die Vorschau lässt sich nicht anzeigen/)).toBeInTheDocument();

    setzeHash('#/dokumente/abc123xyz0');
    expect(await screen.findByTitle('Vorschau: Arbeitszeugnis')).toHaveAttribute('src', 'asset://abc123xyz0');

    setzeHash('#/dokumente/abc123xyz8');
    expect(await screen.findByText(/Die Vorschau lässt sich nicht anzeigen/)).toBeInTheDocument();
    expect(screen.queryByTitle('Vorschau: Falsch.pdf')).not.toBeInTheDocument();
    // Öffnen bleibt möglich — das Standardprogramm entscheidet selbst.
    expect(within(screen.getByRole('article')).getByRole('button', { name: 'Öffnen' })).toBeEnabled();
  });

  it('sperrt den Bereich nach einem Ladefehler', async () => {
    const s = fakeSpeicher([ZEUGNIS]);
    s.ladeFehler = new Error('dokumente.json ist nicht lesbar (Datei ist leer). Sicherungskopie: dokumente.bak.json im selben Ordner.');
    konfiguriereDokumente(s);
    render(<App />);
    setzeHash('#/dokumente');
    const main = within(screen.getByRole('main'));
    expect(await main.findByRole('alert')).toHaveTextContent(/konnten nicht geladen werden.*dokumente\.bak\.json.*Es wird nichts überschrieben/);
    expect(main.getByRole('button', { name: 'Zertifikate: Datei hinzufügen' })).toBeDisabled();
    s.ladeFehler = null;
    fireEvent.click(main.getByRole('button', { name: 'Erneut versuchen' }));
    expect(await main.findByRole('link', { name: 'Arbeitszeugnis' })).toBeInTheDocument();
    expect(s.geschrieben).toHaveLength(0);
  });
});

describe('Anhänge im Tagebuch', () => {
  beforeEach(frisch);
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  const anhang = (id: string, name: string, tag: string, zeit: string, art: 'anhang' | 'zertifikat' = 'anhang') => ({
    id,
    datei: `${id}_${name}`,
    name,
    art,
    tag,
    notiz: '',
    hinzugefuegt: zeit,
    groesse: 4096,
    typ: name.split('.').pop()!,
  });

  it('hängt Dateien an den Tag, zeigt die Klammer im Kalender und sammelt sie im Dokumente-Bereich', async () => {
    const s = fakeSpeicher([
      anhang('tag0000001', 'Agenda.pdf', '2026-09-26', '2026-09-26T08:00:00.000Z'),
      anhang('tag0000002', 'Urkunde.pdf', '2026-09-10', '2026-09-10T08:00:00.000Z', 'zertifikat'),
    ]);
    konfiguriereDokumente(s);
    window.localStorage.setItem(
      BROWSER_KEY,
      JSON.stringify({ version: 1, tage: { '2026-09-26': { text: 'Workshop.', markiert: false, ereignis: '', geaendert: '' } } }),
    );
    vi.spyOn(dialoge, 'waehleDateien').mockResolvedValue(['C:\\x\\Flipchart.jpg']);
    const frage = vi.spyOn(dialoge, 'frageEntfernen').mockResolvedValue(true);
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');

    const block = await screen.findByRole('region', { name: 'Anhänge' });
    expect(await within(block).findByRole('link', { name: 'Agenda.pdf' })).toHaveAttribute('href', '#/dokumente/tag0000001');
    expect(within(block).getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByText('Anhänge', { selector: 'dt' }).nextElementSibling).toHaveTextContent('1');

    // Kalender: der Tag und der 10. tragen die Klammer; ein Tag ohne Text steht trotzdem in der Monatsliste.
    const kalender = screen.getByLabelText('Kalender');
    expect(within(kalender).getByRole('link', { current: 'date' })).toHaveAccessibleName(/Eintrag vorhanden, 1 Anhang/);
    expect(within(kalender).getByRole('link', { current: 'date' }).className).toContain('tag--anhang');
    expect(within(kalender).getByRole('link', { name: /10\. September 2026, 1 Anhang/ })).toBeInTheDocument();
    expect(within(kalender).getByRole('link', { name: /^Freitag, 11\. September 2026$/ }).className).not.toContain('tag--anhang');
    const monat = screen.getByRole('region', { name: /Einträge im Monat/ });
    expect(within(monat).getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual(['#/tagebuch/2026-09-10', '#/tagebuch/2026-09-26']);
    expect(within(monat).getByRole('link', { name: /Urkunde\.pdf.*1 Anhang/ })).toBeInTheDocument();

    // Hinzufügen: die Datei hängt am Tag und landet in „Aus dem Tagebuch“.
    const hinzu = within(block).getByRole('button', { name: /Datei hinzufügen/ });
    await waitFor(() => expect(hinzu).toBeEnabled());
    fireEvent.click(hinzu);
    expect(await within(block).findByRole('link', { name: 'Flipchart.jpg' })).toBeInTheDocument();
    await waitFor(() => expect(s.geschrieben).toHaveLength(1));
    expect(s.geschrieben[0].dokumente[2]).toMatchObject({ name: 'Flipchart.jpg', art: 'anhang', tag: '2026-09-26' });
    expect(within(kalender).getByRole('link', { current: 'date' })).toHaveAccessibleName(/2 Anhänge/);

    fireEvent.click(within(block).getByRole('button', { name: 'Agenda.pdf öffnen' }));
    await waitFor(() => expect(s.geoeffnet).toEqual(['tag0000001']));

    // Entfernen nach Rückfrage.
    fireEvent.click(within(block).getByRole('button', { name: 'Agenda.pdf entfernen' }));
    await waitFor(() => expect(within(block).queryByRole('link', { name: 'Agenda.pdf' })).not.toBeInTheDocument());
    expect(frage).toHaveBeenCalledWith('Agenda.pdf');
    expect(s.ordner.has('tag0000001')).toBe(false);

    setzeHash('#/dokumente');
    const main = within(screen.getByRole('main'));
    const gesammelt = main.getByRole('region', { name: 'Aus dem Tagebuch' });
    expect(within(gesammelt).getByRole('link', { name: 'Flipchart.jpg' })).toBeInTheDocument();
    // Das Zertifikat hängt am 10.09. und steht bei den Zertifikaten — mit Link zum Tag.
    const zertifikate = main.getByRole('region', { name: 'Zertifikate' });
    expect(within(zertifikate).getByRole('link', { name: /10\.09\.2026/ })).toHaveAttribute('href', '#/tagebuch/2026-09-10');
  });

  it('bietet im Browser kein Hinzufügen an, zeigt aber den Bestand', async () => {
    window.localStorage.setItem(
      DOKUMENTE_KEY,
      JSON.stringify({ version: 1, dokumente: [anhang('tag0000001', 'Agenda.pdf', '2026-09-26', '2026-09-26T08:00:00.000Z')] }),
    );
    render(<App />);
    setzeHash('#/tagebuch/2026-09-26');
    const block = await screen.findByRole('region', { name: 'Anhänge' });
    expect(await within(block).findByRole('link', { name: 'Agenda.pdf' })).toBeInTheDocument();
    expect(within(block).getByRole('button', { name: /Datei hinzufügen/ })).toBeDisabled();
    expect(within(block).getByText('Anhänge lassen sich in der App hinzufügen.')).toBeInTheDocument();
    expect(within(block).getByRole('button', { name: 'Agenda.pdf öffnen' })).toBeDisabled();
  });
});
