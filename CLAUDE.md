# KI-Enzyklopädie — Arbeitsregeln

**Was:** Lese-App (Vite + React 19 + TypeScript, Tauri-2-Hülle) für den
Enzyklopädie-Bereich der Akademie-App plus eigene Sammlungen (Strategie) und ein
persönliches Tagebuch mit Kalender. Kein Quiz, kein RAG, kein Konto.
User-Entscheide 26.09.2026: „reine enzyklopädie app, kein RAG oder sonstige unnötige
features“; später am selben Tag ergänzt um (1) mehr Wissensinhalt zum Thema Strategie
und (2) eine Tagebuch-Funktion mit Kalenderübersicht, dauerhaft gespeichert, Tage für
besondere Ereignisse markierbar. Persistenz gibt es deshalb genau dreifach: zwei
localStorage-Einstellungen (Schrift, Register) und das Tagebuch.

**Design (User-Entscheid 26.09.2026):** Farbwelt = Windows-Terminal-Schema
„Nakama Champagne Night“ (das Dirigenten-Terminal, NICHT das Nakama-Plugin-Design).
Schrift Geist / Geist Mono. Fokus Lesbarkeit, hochwertige UI-Elemente. Quelle des
Schemas: Windows-Terminal `settings.json`, Scheme `Nakama Champagne Night`
(background #101010, foreground #E0D0C0, tabColor #D0B090, selection #504030,
brightWhite #FFF8EC, blue/purple #606070/#808090). Tokens in `src/styles.css`.

## Prüfen

```
npm test && npm run lint && npm run build
```

Sichtbare Änderungen zusätzlich rendern und ansehen (`npm run preview` +
Playwright-Screenshot oder `npm run tauri:dev`); grüne Tests sagen nichts über Lesbarkeit.
Nach Änderungen an `src-tauri/` zusätzlich `cargo check` (in `src-tauri/`).

## Inhalt

Zwei Quellen, ein Load-Guard (`src/inhalt/index.ts` → `vereinige` in
`src/inhalt/sammlungen/index.ts`):

- `src/inhalt/artikel.json` ist GENERIERT (`npm run inhalt:export -- <akademie-pfad>`).
  Nie von Hand editieren; Inhaltsfehler im Akademie-Repo beheben und neu exportieren.
  Akademie-Repo auf diesem Rechner: `C:\Users\phili\Projekte\Vorbereitung Probetag Avarno`
  (GitHub `evenacadia-tech/probetag-akademie`). Dort `npm ci`, bevor der Export läuft.
- `src/inhalt/sammlungen/<sammlung>/` sind EIGENE, von Hand gepflegte Sammlungen
  (derzeit `strategie/`, fünf Block-Dateien in Lesereihenfolge). Autoren schreiben nur
  `abschnitte`; `absaetze` und `sammlung` leitet `vereinige` ab. Warum nicht im
  Akademie-Repo: dort erzwingt ein Pack Karteikarten-Format, Quiz, Konzeptgraph und ein
  eingefrorenes RAG-Eval-Gate, das ein neues Default-Pack bricht — für reine Lese-Prosa
  unnötig. Regeln je Artikel: 2–5 geprüfte Primärquellen mit Abrufdatum, keine Zahl ohne
  Quelle, letzter Abschnitt „Grenzen und Kritik“/„Typische Fehler“.
- Artikel-IDs sind Deep-Link-Ziele (`#/artikel/<id>`) — nie umbenennen. Querverweise
  dürfen in beide Richtungen zwischen Akademie- und eigenen Artikeln zeigen.
- Der Load-Guard wirft bei totem Querverweis, unbelegtem Artikel, unbekanntem
  Thema/Sammlung, doppelter Sammlungs-ID, Thema-Label-Konflikt. Das ist gewollt: laut
  brechen statt still leer. Solange eine Block-Datei noch fehlt, auf die eine andere
  verweist, bricht die ganze Suite — erst alle Blöcke, dann testen.

## Tagebuch

- Modell/Kalender-Arithmetik in `src/tagebuch/modell.ts` (Woche ab Montag, immer 42
  Zellen, Datumsrechnen in UTC, Anzeige lokal), Zustand mit verzögerter Sicherung in
  `zustand.ts` (500 ms nach der letzten Änderung, sofort bei Blur/Tageswechsel/Schließen).
- Speicher: nativ `tagebuch.json` im App-Datenordner über `tauri-plugin-store`
  (Windows: `%APPDATA%\de.evenacadia.ki-enzyklopaedie\tagebuch.json`); im Browser
  localStorage `ki-enzyklopaedie.tagebuch.v1`. Ein Ladefehler sperrt das Schreiben —
  nie eine leere Kopie über echte Daten schreiben. Datenformat `{ version: 1, tage }`.
- Routen `#/tagebuch` (heute) und `#/tagebuch/<YYYY-MM-DD>`; Tage sind Links.

## Fallen

- Vor `tauri build`/`cargo build` prüfen, dass keine Instanz der App läuft
  (`Get-Process ki-enzyklopaedie`): eine laufende .exe sperrt
  `src-tauri/target/release/ki-enzyklopaedie.exe`, der Linker meldet „Zugriff
  verweigert“, und `tauri build` endet TROTZDEM mit Exit-Code 0 — die alte .exe bleibt
  liegen. Eine zweite Instanz hängt sich zudem an den WebView2-Prozess der ersten; der
  Debug-Port für `npm run nativ:beweis` ist dann nicht erreichbar.
- `tauri-plugin-store` in `Cargo.toml` auf `"2"` halten; crates.io führt bereits eine
  `3.0.0-alpha` (für Tauri 3). npm-Paket `@tauri-apps/plugin-store` ^2.x passend.
- `tauri icon` erzeugt auch `icons/android` und `icons/ios`; `npm run tauri:icon`
  entfernt sie wieder. Nicht einchecken.
- Externe Links im nativen Fenster laufen über `@tauri-apps/plugin-opener`
  (`src/oeffnen.ts`); Capability `opener:default` in `src-tauri/capabilities/default.json`.
  Ein nackter `<a target="_blank">` öffnet in Tauri 2 NICHT den Browser.
- jsdom kennt weder `scrollTo` noch `scrollIntoView` — DOM-Scroll nur mit Guard aufrufen.
- Bash-Heredocs mit langen TS-Dateien scheitern hier gelegentlich am Shell-Parser;
  mehrzeilige Quelltexte über das Write-Tool schreiben.
- `.gitignore` deckt `src-tauri/target` und `src-tauri/gen/schemas` (beides generiert).
