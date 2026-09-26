import { useEffect, useRef } from 'react';
import { enzyklopaedie } from './inhalt';
import { useRoute } from './router';
import { formatiereTagLang, heute } from './tagebuch/modell';
import { speichereJetzt } from './tagebuch/zustand';
import { Kopf, type Bereich } from './komponenten/Kopf';
import { Seitenleiste } from './komponenten/Seitenleiste';
import { ArtikelAnsicht } from './komponenten/ArtikelAnsicht';
import { Start } from './komponenten/Start';
import { NichtGefunden } from './komponenten/NichtGefunden';
import { TagebuchLeiste } from './komponenten/TagebuchLeiste';
import { TagebuchAnsicht } from './komponenten/TagebuchAnsicht';

const TITEL = 'KI-Enzyklopädie';

export function App() {
  const route = useRoute();
  const suchRef = useRef<HTMLInputElement>(null);
  const buehneRef = useRef<HTMLElement>(null);

  const artikel = route.art === 'artikel' ? enzyklopaedie.nachId(route.id) : undefined;
  // „#/tagebuch“ ohne Tag meint den heutigen Tag (lokale Zeit).
  const tagebuchDatum = route.art === 'tagebuch' ? (route.datum ?? heute()) : null;
  const bereich: Bereich = tagebuchDatum ? 'tagebuch' : 'enzyklopaedie';
  const routeKey = route.art === 'artikel' ? route.id : tagebuchDatum ? `tagebuch:${tagebuchDatum}` : route.art;

  // Fenstertitel folgt dem Artikel bzw. dem Tag.
  useEffect(() => {
    document.title = artikel
      ? `${artikel.titel} — ${TITEL}`
      : tagebuchDatum
        ? `Tagebuch · ${formatiereTagLang(tagebuchDatum)} — ${TITEL}`
        : TITEL;
  }, [artikel, tagebuchDatum]);

  // Neue Seite → oben anfangen und den Lesebereich fokussieren (Tastatur/Screenreader).
  useEffect(() => {
    const b = buehneRef.current;
    if (!b) return;
    b.scrollTop = 0;
    b.focus({ preventScroll: true });
  }, [routeKey]);

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

  // Beim Schließen/Verlassen ausstehende Tagebuch-Änderungen sofort sichern.
  useEffect(() => {
    const sichern = () => {
      void speichereJetzt();
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
          <TagebuchLeiste datum={tagebuchDatum} />
        ) : (
          <Seitenleiste aktivId={artikel?.id ?? null} suchRef={suchRef} />
        )}
        <main className="buehne" ref={buehneRef} tabIndex={-1}>
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
          ) : (
            <NichtGefunden />
          )}
        </main>
      </div>
    </div>
  );
}
