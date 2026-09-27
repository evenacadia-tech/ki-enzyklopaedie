import { useEffect, useRef, useState } from 'react';
import { istTauri } from '../oeffnen';

// ─────────────────────────────────────────────────────────────────────────────
// Dateien aus dem Explorer hineinziehen. Das native Fenster fängt das Ziehen ab
// und meldet es als Ereignis (`onDragDropEvent`: enter / over / drop / leave) mit
// den Dateipfaden und der Position in physischen Pixeln. Welche Fallzone gemeint
// ist, bestimmt das Element unter dem Zeiger: das nächste mit `data-ablage`.
// Im Browser gibt es keine Pfade — dort ist die Ablage abgeschaltet.
// ─────────────────────────────────────────────────────────────────────────────

export interface Punkt {
  x: number;
  y: number;
}

/** Physische Pixel des Fensters → CSS-Pixel des Dokuments. */
export function cssPunkt(position: Punkt, pixelVerhaeltnis: number): Punkt {
  const f = Number.isFinite(pixelVerhaeltnis) && pixelVerhaeltnis > 0 ? pixelVerhaeltnis : 1;
  return { x: position.x / f, y: position.y / f };
}

/** Die Fallzone unter dem Punkt (`data-ablage`), sonst die Ersatz-Zone, sonst null. */
export function zoneAn(punkt: Punkt, ersatz: string | null, doc: Document = document): string | null {
  const el = typeof doc.elementFromPoint === 'function' ? doc.elementFromPoint(punkt.x, punkt.y) : null;
  const zone = el?.closest<HTMLElement>('[data-ablage]')?.dataset.ablage;
  return zone ?? ersatz;
}

export type AblageEreignis =
  | { type: 'enter'; paths: string[]; position: Punkt }
  | { type: 'over'; position: Punkt }
  | { type: 'drop'; paths: string[]; position: Punkt }
  | { type: 'leave' };

interface Optionen {
  /** Ablage annehmen (Bereich geladen, Import möglich). */
  aktiv: boolean;
  /** Zone, die gilt, wenn der Zeiger über keiner Fallzone steht — null heißt: dann nichts annehmen. */
  ersatz: string | null;
  /** Dateien wurden über `zone` fallen gelassen (null: daneben). */
  aufAblage: (pfade: string[], zone: string | null) => void;
}

/**
 * Hört auf das Hineinziehen, solange die Ansicht steht. Liefert die Zone, über der
 * gerade gezogen wird (zum Hervorheben) — `undefined`, wenn nichts gezogen wird.
 */
export function useDateiAblage({ aktiv, ersatz, aufAblage }: Optionen): string | null | undefined {
  const [zone, setZone] = useState<string | null | undefined>(undefined);
  // Der Listener wird einmal angemeldet; er liest immer die aktuellen Werte.
  const stand = useRef({ aktiv, ersatz, aufAblage });
  useEffect(() => {
    stand.current = { aktiv, ersatz, aufAblage };
  });

  useEffect(() => {
    if (!istTauri()) return;
    let beendet = false;
    let abmelden: (() => void) | null = null;
    const behandle = (e: AblageEreignis) => {
      const s = stand.current;
      if (e.type === 'leave' || !s.aktiv) {
        setZone(undefined);
        return;
      }
      const z = zoneAn(cssPunkt(e.position, window.devicePixelRatio), s.ersatz);
      if (e.type === 'drop') {
        setZone(undefined);
        if (e.paths.length > 0) s.aufAblage(e.paths, z);
      } else {
        setZone(z);
      }
    };
    void (async () => {
      try {
        const { getCurrentWebview } = await import('@tauri-apps/api/webview');
        const stopp = await getCurrentWebview().onDragDropEvent((ereignis) => behandle(ereignis.payload as AblageEreignis));
        if (beendet) stopp();
        else abmelden = stopp;
      } catch {
        // Ohne Ereignis bleibt der Weg über „Datei hinzufügen …“.
      }
    })();
    return () => {
      beendet = true;
      abmelden?.();
    };
  }, []);

  return zone;
}
