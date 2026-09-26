import { enzyklopaedie } from '../inhalt';
import { HREF_START } from '../router';
import { schriftLabel, schriftStufen, setzeSchrift, useEinstellungen } from '../einstellungen';

// Kopfzeile: Wortmarke (führt zur Übersicht) + die eine Lese-Einstellung, die
// dauerhaft sichtbar sein muss — die Schriftgröße des Lesetexts.
export function Kopf() {
  const { schrift } = useEinstellungen();
  return (
    <header className="kopf">
      <a className="kopf__marke" href={HREF_START} aria-label="KI-Enzyklopädie — zur Übersicht">
        <span className="kopf__block" aria-hidden="true" />
        <span className="kopf__name">KI-Enzyklopädie</span>
        <span className="kopf__meta mono">
          {enzyklopaedie.liste.length} Artikel · Stand {enzyklopaedie.meta.stand}
        </span>
      </a>
      <div className="kopf__werkzeuge">
        <div className="segment" role="radiogroup" aria-label="Schriftgröße des Lesetexts">
          {schriftStufen.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={schrift === s}
              aria-label={`Schrift ${schriftLabel[s]}`}
              title={`Schrift ${schriftLabel[s]}`}
              className={'segment__knopf' + (schrift === s ? ' segment__knopf--aktiv' : '')}
              onClick={() => setzeSchrift(s)}
            >
              <span className={`schrift-a schrift-a--${s}`} aria-hidden="true">
                A
              </span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
