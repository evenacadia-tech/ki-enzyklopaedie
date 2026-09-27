import { useEffect, useRef } from 'react';
import { enzyklopaedie } from './inhalt';
import { useRoute } from './router';
import { formatiereTagLang, heute } from './tagebuch/modell';
import { speichereJetzt } from './tagebuch/zustand';
import { speichereDokumenteJetzt, useDokumente } from './dokumente/zustand';
import { Kopf, type Bereich } from './komponenten/Kopf';
import { Seitenleiste } from './komponenten/Seitenleiste';
import { ArtikelAnsicht } from './komponenten/ArtikelAnsicht';
import { Start } from './komponenten/Start';
import { NichtGefunden } from './komponenten/NichtGefunden';
import { TagebuchLeiste } from './komponenten/TagebuchLeiste';
import { TagebuchAnsicht } from './komponenten/TagebuchAnsicht';
import { DokumenteLeiste } from './komponenten/DokumenteLeiste';
import { DokumenteUebersicht } from './komponenten/DokumenteUebersicht';
import { DokumentAnsicht } from './komponenten/DokumentAnsicht';

const TITEL = 'KI-Enzyklopädie';

// Navigation API (Chromium, also WebView2 und der Web-Preview): sagt uns VOR dem
// hashchange, ob die Route per Zurück/Vor („traverse“) gewechselt wird. Nur dann
// wird die alte Scrollposition wiederhergestellt; ein Klick auf einen Link beginnt oben.
interface NavigateEreignis {
  navigationType: 'push' | 'replace' | 'reload' | 'traverse';
}
interface NavigationApi {
  addEventListener(typ: 'navigate', fn: (e: NavigateEreignis) => void): void;
  removeEventListener(typ: 'navigate', fn: (e: NavigateEreignis) => void): void;
}
function navigationApi(): NavigationApi | null {
  const n = (window as unknown as { navigation?: NavigationApi }).navigation;
  return n && typeof n.addEventListener === 'function' ? n : null;
}

export function App() {
  const route = useRoute();
  const suchRef = useRef<HTMLInputElement>(null);
  const buehneRef = useRef<HTMLElement>(null);
  const positionen = useRef(new Map<string, number>());
  const traverse = useRef(false);

  const artikel = route.art === 'artikel' ? enzyklopaedie.nachId(route.id) : undefined;
  // „#/tagebuch“ ohne Tag meint den heutigen Tag (lokale Zeit).
  const tagebuchDatum = route.art === 'tagebuch' ? (route.datum ?? heute()) : null;
  const inDokumenten = route.art === 'dokumente';
  const dokumentId = route.art === 'dokumente' ? route.id : null;
  const dokumentName = useDokumente().dokumente.find((d) => d.id === dokumentId)?.name ?? null;
  const bereich: Bereich = tagebuchDatum ? 'tagebuch' : inDokumenten ? 'dokumente' : 'enzyklopaedie';
  const routeKey =
    route.art === 'artikel'
      ? route.id
      : tagebuchDatum
        ? `tagebuch:${tagebuchDatum}`
        : inDokumenten
          ? `dokumente:${dokumentId ?? ''}`
          : route.art;

  // Fenstertitel folgt dem Artikel, dem Tag bzw. dem Dokument.
  useEffect(() => {
    document.title = artikel
      ? `${artikel.titel} — ${TITEL}`
      : tagebuchDatum
        ? `Tagebuch · ${formatiereTagLang(tagebuchDatum)} — ${TITEL}`
        : inDokumenten
          ? `${dokumentName ? dokumentName + ' · ' : ''}Dokumente — ${TITEL}`
          : TITEL;
  }, [artikel, tagebuchDatum, inDokumenten, dokumentName]);

  // Zurück/Vor merken sich die Leseposition; alles andere beginnt oben.
  useEffect(() => {
    const nav = navigationApi();
    if (!nav) return;
    const merke = (e: NavigateEreignis) => {
      traverse.current = e.navigationType === 'traverse';
    };
    nav.addEventListener('navigate', merke);
    return () => nav.removeEventListener('navigate', merke);
  }, []);

  // Neue Seite → oben anfangen (bzw. bei Zurück/Vor an die alte Stelle) und den
  // Lesebereich fokussieren (Tastatur/Screenreader).
  useEffect(() => {
    const b = buehneRef.current;
    if (!b) return;
    const gemerkt = traverse.current ? positionen.current.get(window.location.hash) : undefined;
    traverse.current = false;
    b.scrollTop = gemerkt ?? 0;
    b.focus({ preventScroll: true });
  }, [routeKey]);

  const merkePosition = () => {
    const b = buehneRef.current;
    if (b) positionen.current.set(window.location.hash, b.scrollTop);
  };

  // „/" springt ins Suchfeld — außer der Fokus liegt schon in einem Eingabefeld.
  useEffect(() => {
    const aufTaste = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      const ziel = e.target as HTMLElement | null;
      if (ziel && (ziel.tagName === 'INPUT' || ziel.tagName === 'TEXTAREA' || ziel.isContentEditable)) return;
      suchRef.current?.focus();
      suchRef.current?.select();
      e.preventDefault();
    };
    document.addEventListener('keydown', aufTaste);
    return () => document.removeEventListener('keydown', aufTaste);
  }, []);

  // Beim Schließen/Verlassen ausstehende Änderungen (Tagebuch, Dokumente) sofort sichern.
  useEffect(() => {
    const sichern = () => {
      void speichereJetzt();
      void speichereDokumenteJetzt();
    };
    window.addEventListener('pagehide', sichern);
    window.addEventListener('beforeunload', sichern);
    return () => {
      window.removeEventListener('pagehide', sichern);
      window.removeEventListener('beforeunload', sichern);
    };
  }, []);

  return (
    <div className="app">
      <Kopf bereich={bereich} />
      <div className="rahmen">
        {tagebuchDatum ? (
          <TagebuchLeiste datum={tagebuchDatum} suchRef={suchRef} />
        ) : inDokumenten ? (
          <DokumenteLeiste aktivId={dokumentId} suchRef={suchRef} />
        ) : (
          <Seitenleiste aktivId={artikel?.id ?? null} suchRef={suchRef} />
        )}
        <main className="buehne" ref={buehneRef} tabIndex={-1} onScroll={merkePosition}>
          {route.art === 'start' ? (
            <Start />
          ) : route.art === 'artikel' ? (
            artikel ? (
              <ArtikelAnsicht key={artikel.id} artikel={artikel} />
            ) : (
              <NichtGefunden id={route.id} />
            )
          ) : tagebuchDatum ? (
            <TagebuchAnsicht key={tagebuchDatum} datum={tagebuchDatum} />
          ) : inDokumenten ? (
            dokumentId ? (
              <DokumentAnsicht key={dokumentId} id={dokumentId} />
            ) : (
              <DokumenteUebersicht />
            )
          ) : (
            <NichtGefunden />
          )}
        </main>
      </div>
    </div>
  );
}
