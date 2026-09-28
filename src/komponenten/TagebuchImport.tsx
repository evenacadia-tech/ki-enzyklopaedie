import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react';
import { istTauri } from '../oeffnen';
import { hrefTagebuch } from '../router';
import {
  leseDatei,
  leseMarkdown,
  planeImport,
  waehleImportDatei,
  zuSchreiben,
  type GeleseneDatei,
  type ImportDatei,
  type Vorrang,
} from '../tagebuch/import';
import { ersteZeile, formatiereTagDatum, type Tage } from '../tagebuch/modell';
import { importiereTage } from '../tagebuch/zustand';

// ─────────────────────────────────────────────────────────────────────────────
// Import im Tagebuch: Datei wählen (nativ der Öffnen-Dialog, im Browser ein
// Dateifeld), dann die Vorschau über der Fußzeile — wie viele Tage neu sind, wie
// viele schon da und welche im Tagebuch anders stehen. Geschrieben wird erst nach
// „importieren“; vorhandene Tage ersetzt der Import nur, wenn man es wählt.
// Der Knopf selbst steht in der Fußzeile der Leiste, deshalb der Hook. Die Vorschau
// liegt ÜBER der Leiste (`.import-anker` ist ihr Bezug): in der Höhe der Leiste hätte
// sie neben Kalender und Liste keinen Platz.
// ─────────────────────────────────────────────────────────────────────────────

type Lage =
  | { art: 'ruhe' }
  | { art: 'liest' }
  | { art: 'vorschau'; name: string; datei: GeleseneDatei; schreibt: boolean }
  | { art: 'fertig'; anzahl: number };

/** So viele abweichende Tage zeigt die Vorschau beim Namen, der Rest steht als Zahl da. */
const TAGE_SICHTBAR = 6;
const FERTIG_MS = 4000;

export interface ImportSteuerung {
  lage: Lage;
  fehler: string | null;
  vorrang: Vorrang;
  /** Importiert gerade nichts — der Knopf in der Fußzeile ist frei. */
  frei: boolean;
  feldRef: RefObject<HTMLInputElement | null>;
  beginne: () => Promise<void>;
  aufDatei: (ev: ChangeEvent<HTMLInputElement>) => Promise<void>;
  setzeVorrang: (v: Vorrang) => void;
  bestaetige: () => Promise<void>;
  schliesse: () => void;
}

function meldung(e: unknown): string {
  return e instanceof Error ? e.message : String(e);
}

export function useTagebuchImport(): ImportSteuerung {
  const [lage, setLage] = useState<Lage>({ art: 'ruhe' });
  const [fehler, setFehler] = useState<string | null>(null);
  const [vorrang, setVorrang] = useState<Vorrang>('tagebuch');
  const feldRef = useRef<HTMLInputElement>(null);

  const zeige = (d: ImportDatei) => {
    // Jede Datei beginnt mit der vorsichtigen Wahl.
    setVorrang('tagebuch');
    setLage({ art: 'vorschau', name: d.name, datei: leseMarkdown(d.text), schreibt: false });
  };
  const scheitere = (e: unknown) => {
    setFehler(`Import fehlgeschlagen: ${meldung(e)}`);
    setLage({ art: 'ruhe' });
  };

  const beginne = async () => {
    setFehler(null);
    if (!istTauri()) {
      feldRef.current?.click();
      return;
    }
    setLage({ art: 'liest' });
    try {
      const d = await waehleImportDatei();
      if (d) zeige(d);
      else setLage({ art: 'ruhe' });
    } catch (e) {
      scheitere(e);
    }
  };

  const aufDatei = async (ev: ChangeEvent<HTMLInputElement>) => {
    const datei = ev.target.files?.[0];
    // Leeren, damit dieselbe Datei ein zweites Mal gewählt werden kann.
    ev.target.value = '';
    if (!datei) return;
    setFehler(null);
    setLage({ art: 'liest' });
    try {
      zeige(await leseDatei(datei));
    } catch (e) {
      scheitere(e);
    }
  };

  const bestaetige = async () => {
    if (lage.art !== 'vorschau' || lage.schreibt) return;
    setLage({ ...lage, schreibt: true });
    try {
      setLage({ art: 'fertig', anzahl: await importiereTage(lage.datei, vorrang) });
    } catch (e) {
      // Hier ist die Datei längst gelesen — die Meldung sagt selbst, was geschehen ist.
      setFehler(meldung(e));
      setLage({ art: 'ruhe' });
    }
  };

  useEffect(() => {
    if (lage.art !== 'fertig') return;
    const t = setTimeout(() => setLage({ art: 'ruhe' }), FERTIG_MS);
    return () => clearTimeout(t);
  }, [lage]);

  return {
    lage,
    fehler,
    vorrang,
    frei: lage.art === 'ruhe' || lage.art === 'fertig',
    feldRef,
    beginne,
    aufDatei,
    setzeVorrang: setVorrang,
    bestaetige,
    schliesse: () => setLage({ art: 'ruhe' }),
  };
}

function tageText(n: number): string {
  return n === 1 ? '1 Tag' : `${n} Tage`;
}

export function ImportTafel({ s, tage }: { s: ImportSteuerung; tage: Tage }) {
  const { lage } = s;
  const datei = lage.art === 'vorschau' ? lage.datei : null;
  const plan = useMemo(() => (datei ? planeImport(tage, datei) : null), [tage, datei]);
  const anzahl = plan ? zuSchreiben(plan, s.vorrang).length : 0;
  const tafelRef = useRef<HTMLElement>(null);
  // Die Vorschau bekommt den Fokus: Tastatur und Vorlesehilfe stehen dort, wo gefragt wird.
  useEffect(() => {
    if (datei) tafelRef.current?.focus({ preventScroll: true });
  }, [datei]);

  const aufTaste = (ev: KeyboardEvent<HTMLElement>) => {
    if (ev.key !== 'Escape' || lage.art !== 'vorschau' || lage.schreibt) return;
    s.schliesse();
    ev.preventDefault();
  };

  return (
    <>
      {/* Browser: die Dateiauswahl des Systems hängt an einem Dateifeld; nativ bleibt es unbenutzt. */}
      <input
        ref={s.feldRef}
        type="file"
        accept=".md,.markdown,.txt,text/markdown,text/plain"
        hidden
        aria-label="Exportierte Tagebuch-Datei"
        onChange={(ev) => void s.aufDatei(ev)}
      />
      {s.fehler ? (
        <p className="leiste__meldung" role="alert">
          {s.fehler}
        </p>
      ) : null}
      {lage.art === 'fertig' ? (
        <p className="leiste__meldung leiste__meldung--gut" role="status">
          {lage.anzahl === 0 ? 'Nichts importiert.' : `${tageText(lage.anzahl)} importiert.`}
        </p>
      ) : null}
      {lage.art === 'vorschau' && plan ? (
        <section className="import" aria-labelledby="import-titel" tabIndex={-1} ref={tafelRef} onKeyDown={aufTaste}>
          <h3 className="import__titel mono" id="import-titel">
            Import
          </h3>
          <p className="import__datei" title={lage.name}>
            {lage.name}
          </p>
          <dl className="import__bilanz mono">
            <div>
              <dt>In der Datei</dt>
              <dd>{tageText(Object.keys(lage.datei.tage).length)}</dd>
            </div>
            <div>
              <dt>Neu</dt>
              <dd>{plan.neu.length}</dd>
            </div>
            <div>
              <dt>Schon vorhanden</dt>
              <dd>{plan.gleich.length}</dd>
            </div>
            <div>
              <dt>Anders im Tagebuch</dt>
              <dd>{plan.abweichend.length}</dd>
            </div>
          </dl>

          {plan.abweichend.length > 0 ? (
            <fieldset className="import__wahl">
              <legend>
                {plan.abweichend.length === 1
                  ? 'Ein Tag steht im Tagebuch anders als in der Datei:'
                  : `${plan.abweichend.length} Tage stehen im Tagebuch anders als in der Datei:`}
              </legend>
              {/* Das Datum führt zum Tag im Tagebuch, daneben steht der Anfang der Fassung in der Datei. */}
              <ul className="import__tage">
                {plan.abweichend.slice(0, TAGE_SICHTBAR).map((d) => (
                  <li key={d}>
                    <a className="mono" href={hrefTagebuch(d)} title="Den Tag im Tagebuch ansehen">
                      {formatiereTagDatum(d)}
                    </a>
                    <span title="So beginnt der Tag in der Datei">
                      {ersteZeile(lage.datei.tage[d].text) || lage.datei.tage[d].ereignis || 'Ereignis'}
                    </span>
                  </li>
                ))}
                {plan.abweichend.length > TAGE_SICHTBAR ? (
                  <li className="mono">+ {plan.abweichend.length - TAGE_SICHTBAR} weitere</li>
                ) : null}
              </ul>
              <label className="import__option">
                <input
                  type="radio"
                  name="import-vorrang"
                  checked={s.vorrang === 'tagebuch'}
                  disabled={lage.schreibt}
                  onChange={() => s.setzeVorrang('tagebuch')}
                />
                <span>Tagebuch behalten</span>
              </label>
              <label className="import__option">
                <input
                  type="radio"
                  name="import-vorrang"
                  checked={s.vorrang === 'datei'}
                  disabled={lage.schreibt}
                  onChange={() => s.setzeVorrang('datei')}
                />
                <span>Durch die Datei ersetzen</span>
              </label>
            </fieldset>
          ) : null}

          {lage.datei.anhaenge > 0 ? (
            <p className="import__hinweis">
              {lage.datei.anhaenge === 1
                ? 'Die Datei nennt 1 Anhang nur beim Namen'
                : `Die Datei nennt ${lage.datei.anhaenge} Anhänge nur beim Namen`}{' '}
              — die Dateien selbst stecken nicht im Export.
            </p>
          ) : null}
          {anzahl === 0 ? (
            <p className="import__hinweis">
              {plan.abweichend.length > 0 ? 'Mit dieser Wahl ändert der Import nichts.' : 'Alles aus der Datei steht schon im Tagebuch.'}
            </p>
          ) : null}

          <div className="import__knoepfe">
            <button type="button" className="knopf knopf--klein" disabled={lage.schreibt} onClick={s.schliesse}>
              {anzahl === 0 ? 'Schließen' : 'Abbrechen'}
            </button>
            {anzahl > 0 ? (
              <button
                type="button"
                className="knopf knopf--klein knopf--haupt"
                disabled={lage.schreibt}
                onClick={() => void s.bestaetige()}
              >
                {lage.schreibt ? 'Importiert …' : `${tageText(anzahl)} importieren`}
              </button>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
