import { typLabel } from '../dokumente/modell';
import type { DokumenteZustand } from '../dokumente/zustand';
import { ladeDokumenteErneut, setzeMeldung, speichereDokumenteJetzt } from '../dokumente/zustand';

// Kleine Bausteine, die der Dokumente-Bereich und die Anhänge im Tagebuch teilen.

/** Die Büroklammer: Zeichen für „hier hängt eine Datei“. */
export function Klammer({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden="true">
      <path
        d="M9.6 5.4 5.9 9.1a2 2 0 0 1-2.9-2.9l4-4a1.35 1.35 0 0 1 1.9 1.9L5 8a.68.68 0 0 1-1-1l3.4-3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Dateityp als kleine Marke: „PDF“, „DOCX“, „Datei“. */
export function TypMarke({ typ }: { typ: string }) {
  return (
    <span className="typmarke mono" title={typ ? `Dateityp .${typ}` : 'Datei ohne Endung'}>
      {typLabel(typ)}
    </span>
  );
}

/** Ladefehler (sperrt den Bereich), Speicherfehler und die Meldung der letzten Aktion. */
export function DokumenteMeldungen({ z }: { z: DokumenteZustand }) {
  return (
    <>
      {z.status === 'fehler' ? (
        <p className="tagebuch__fehler" role="alert">
          Die Dokumente konnten nicht geladen werden: {z.ladeFehler}. Es wird nichts überschrieben.{' '}
          <button type="button" className="textlink" onClick={() => void ladeDokumenteErneut()}>
            Erneut versuchen
          </button>
        </p>
      ) : null}
      {z.sicherung === 'fehler' ? (
        <p className="tagebuch__fehler" role="alert">
          Das Verzeichnis der Dokumente wurde nicht gespeichert: {z.sicherungFehler ?? 'unbekannter Fehler'}.{' '}
          <button type="button" className="textlink" onClick={() => void speichereDokumenteJetzt()}>
            Erneut speichern
          </button>
        </p>
      ) : null}
      {z.meldung ? (
        <p className="hinweisband" role="alert">
          <span>{z.meldung}</span>
          <button type="button" className="hinweisband__zu" aria-label="Meldung schließen" onClick={() => setzeMeldung(null)}>
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </p>
      ) : null}
    </>
  );
}
