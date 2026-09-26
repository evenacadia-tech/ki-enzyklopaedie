import { useEffect, useRef } from 'react';
import { enzyklopaedie } from './inhalt';
import { useRoute } from './router';
import { Kopf } from './komponenten/Kopf';
import { Seitenleiste } from './komponenten/Seitenleiste';
import { ArtikelAnsicht } from './komponenten/ArtikelAnsicht';
import { Start } from './komponenten/Start';
import { NichtGefunden } from './komponenten/NichtGefunden';

const TITEL = 'KI-Enzyklopädie';

export function App() {
  const route = useRoute();
  const suchRef = useRef<HTMLInputElement>(null);
  const buehneRef = useRef<HTMLElement>(null);

  const artikel = route.art === 'artikel' ? enzyklopaedie.nachId(route.id) : undefined;
  const routeKey = route.art === 'artikel' ? route.id : route.art;

  // Fenstertitel folgt dem Artikel.
  useEffect(() => {
    document.title = artikel ? `${artikel.titel} — ${TITEL}` : TITEL;
  }, [artikel]);

  // Neuer Artikel → oben anfangen und den Lesebereich fokussieren (Tastatur/Screenreader).
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

  return (
    <div className="app">
      <Kopf />
      <div className="rahmen">
        <Seitenleiste aktivId={artikel?.id ?? null} suchRef={suchRef} />
        <main className="buehne" ref={buehneRef} tabIndex={-1}>
          {route.art === 'start' ? (
            <Start />
          ) : route.art === 'artikel' ? (
            artikel ? (
              <ArtikelAnsicht key={artikel.id} artikel={artikel} />
            ) : (
              <NichtGefunden id={route.id} />
            )
          ) : (
            <NichtGefunden />
          )}
        </main>
      </div>
    </div>
  );
}
