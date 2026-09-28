# KI-Enzyklopädie — Arbeitsregeln

**Was:** Lese-App (Vite + React 19 + TypeScript, Tauri-2-Hülle) für den
Enzyklopädie-Bereich der Akademie-App plus eigene Sammlungen (Strategie, Psychologie), ein
persönliches Tagebuch mit Kalender und eine Dokumentenablage (Zertifikate, wichtige
Dokumente, Anhänge je Tagebuchtag). Kein Quiz, kein RAG, kein Konto.
User-Entscheide 26.09.2026: „reine enzyklopädie app, kein RAG oder sonstige unnötige
features“; später am selben Tag ergänzt um (1) mehr Wissensinhalt zum Thema Strategie
und (2) eine Tagebuch-Funktion mit Kalenderübersicht, dauerhaft gespeichert, Tage für
besondere Ereignisse markierbar. Persistenz gibt es genau fünffach: drei
localStorage-Stände (Schrift, Register, gelesene Artikel — Letzteres seit 27.09.2026 als
Lesezeichen für die Lesestrecken), das Tagebuch und die Dokumente (Ordner + Verzeichnis). Ausbau 27.09.2026 (User: „ja leg
los“ auf die Vorschlagsliste): Tagebuch-Suche, offene Fragen (Zeilen mit „?“), Rückblick,
Jahresübersicht, Kalenderwochen, nächstes Ereignis, Markdown-Export, Sicherungskopie,
Lesestrecke Vor/Zurück, Lesefortschritt, Scrollposition bei Zurück, Fensterlage merken.
Bewusst NICHT gebaut: Textformatierung im Tagebuch, Statistiken/Streaks.
User-Entscheide 27.09.2026 (später): Die App läuft hauptsächlich auf dem LAPTOP, lokale
Speicherung reicht — kein Sync, kein wählbarer Speicherordner. Gebaut am 27.09.2026
(Auftrag des Users, Spezifikation war `docs/NEXT-SESSION.md`): (1) Tage im Kalender
farblich markieren, gedeckte Töne passend zum Schema, ausdrücklich kein Rot/Grün/Blau;
(2) Bereich „Dokumente“ mit Zertifikaten und wichtigen Dokumenten (Dateien in die App
importieren); (3) Anhänge je Tagebuchtag, die im Dokumente-Bereich gesammelt erscheinen.
Produkt-Antworten dazu (27.09.2026): Farben ohne Legende („nur Farbe“); Entfernen löscht
endgültig („entfernt ist entfernt“, Rückfrage vor dem Löschen bleibt); kein Ablaufdatum
für Zertifikate; Vorschau von PDF und Bildern in der App: ja. Offen ohne Antwort:
Artikel-Verknüpfung aus Tagebuchtagen (niedrige Priorität). Seit 28.09.2026 geht die App
auch an andere (Abschnitt „Weitergabe“).

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
Nach Änderungen an `src-tauri/` zusätzlich `cargo test` (in `src-tauri/`), danach
`npm run tauri:build` und `npm run nativ:beweis` (gebaute .exe, echtes Fenster;
`npm run nativ:beweis -- <ordner>` lenkt die Bilder um, sonst überschreibt der Lauf
`docs/bilder/`). Für
alles, was Maus, Explorer oder Systemdialoge braucht (Hineinziehen, Öffnen, Rückfrage):
`npm run os:beweis` — bewegt die Maus und öffnet Fenster, also nur laufen lassen, wenn
niemand am Rechner arbeitet; `SKALIERUNG=1.5` davor rechnet wie ein skalierter Bildschirm.

## Inhalt

Zwei Quellen plus die Vertiefungen, ein Load-Guard (`src/inhalt/index.ts` →
`vertiefe` in `src/inhalt/vertiefungen/index.ts` → `vereinige` in
`src/inhalt/sammlungen/index.ts`):

- `src/inhalt/artikel.json` ist GENERIERT (`npm run inhalt:export -- <akademie-pfad>`).
  Nie von Hand editieren; Inhaltsfehler im Akademie-Repo beheben und neu exportieren.
  Akademie-Repo (GitHub `evenacadia-tech/probetag-akademie`): exportiert wurde auf einem
  anderen Rechner aus `C:\Users\phili\Projekte\Vorbereitung Probetag Avarno` (Stand
  `c785dbb`, mit Voicebot-Paket, nicht auf GitHub). Auf dem Laptop liegt ein ANDERER Stand unter
  `C:\Users\phili\akademie` (GitHub-master `386d97e` + drei ungepushte Commits: ohne Voicebot,
  dafür vier Artikel „Lokale KI“ und das Change-Paket). Ein Export von dort entfernt die vier
  Voicebot-Artikel — das Skript bricht deshalb ab, wenn Artikel-IDs verschwinden würden
  (`--verlust-ok` erzwingt). Erst beide Stände zusammenführen. Dort `npm ci`, bevor der Export läuft.
- `src/inhalt/vertiefungen/` (seit 28.09.2026, Umsetzung der Empfehlung beim Podcast-Auftrag):
  ausführliche Fassungen der 41 Grundlagen-Kurzartikel (je 600–1.000 Wörter, 2–5 am 28.09.2026
  geprüfte Quellen, Autorenvertrag wie die eigenen Sammlungen, Test `vertiefungen.test.ts`).
  `vertiefe` ersetzt Rumpf, Gliederung und Quellen (optional die Einleitung) der Akademie-Artikel;
  aus der Akademie bleiben ID, Titel, Thema, Querverweise, Synonyme, „im Wandel“. Grund: die
  Kurztexte waren für Podcasts zu dünn und teils veraltet (Digital Omnibus, OWASP 2026 …), und
  die Akademie mit dem Exportstand liegt nicht auf dem Laptop. Folge: Textfehler dieser 41
  Artikel HIER beheben, nicht in der Akademie; ein neuer Export ändert ihren Text nicht. Bringt
  ein Export einen neuen Grundlagen-Kurzartikel ohne Vertiefung, bricht der Test — Vertiefung
  schreiben.
- `src/inhalt/sammlungen/<sammlung>/` sind EIGENE, von Hand gepflegte Sammlungen
  (`strategie/`, fünf Block-Dateien; `psychologie/`, vier Block-Dateien — User-Entscheid
  26.09.2026: Strategiebereich mit Fokus Psychologie ausbauen, alle vier Blöcke gleich
  gewichtet; jeweils in Lesereihenfolge). Autoren schreiben nur `abschnitte`; `absaetze`
  und `sammlung` leitet `vereinige` ab. Warum nicht im Akademie-Repo: dort erzwingt ein
  Pack Karteikarten-Format, Quiz, Konzeptgraph und ein eingefrorenes RAG-Eval-Gate, das
  ein neues Default-Pack bricht — für reine Lese-Prosa unnötig. Regeln je Artikel: 2–5
  geprüfte Primärquellen mit Abrufdatum, keine Zahl ohne Quelle, mindestens drei
  Abschnitte, letzter Abschnitt „Grenzen und Kritik“/„Typische Fehler“ — der Test
  „eigene Sammlungen (Autorenvertrag)“ in `src/inhalt/inhalt.test.ts` erzwingt das.
- Quellen prüfen: Zeitschriftenartikel als DOI-Link (`https://doi.org/…`) angeben und
  die Metadaten über `https://api.crossref.org/works/<DOI>` bestätigen (Autor, Titel,
  Jahr, Band, Seiten); Verlags-/HBR-Seiten per Abruf mit Browser-User-Agent. Bekannt
  blockiert (403/Cloudflare): mckinsey.com, harpercollins.com, us.macmillan.com,
  simonandschuster.com, utb.de; Google re:Work-Guides sind 404. Ersatz: penguin.co.uk,
  influenceatwork.com, Crossref-DOI.
- Artikel-IDs sind Deep-Link-Ziele (`#/artikel/<id>`) — nie umbenennen. Querverweise
  dürfen in beide Richtungen zwischen Akademie- und eigenen Artikeln zeigen.
- Der Load-Guard wirft bei totem Querverweis, unbelegtem Artikel, unbekanntem
  Thema/Sammlung, doppelter Sammlungs-ID, Thema-Label-Konflikt. Das ist gewollt: laut
  brechen statt still leer. Solange eine Block-Datei noch fehlt, auf die eine andere
  verweist, bricht die ganze Suite — erst alle Blöcke, dann testen.

## Podcasts

- User-Auftrag 28.09.2026: je Artikel ein Podcast, den der User in NotebookLM erzeugt. Quelle je
  Artikel aus `npm run podcast:quellen` (`src/podcast/quelltext.ts`): `notebooklm/<NN> <Grundlagen|
  Sammlung> – <Abschnitt>/<NNN> <Titel>.md` plus `notebooklm/Übersicht.md` — Ordner und Nummern
  folgen dem Themen-Register der App, Dateiname = App-Titel (User: jede Audiodatei muss eindeutig
  ihrem Artikel zuzuordnen sein). Eingecheckt; der Test in `src/podcast/quelltext.test.ts` bricht,
  wenn die Dateien nicht zum Generator passen — nach JEDER Inhaltsänderung neu erzeugen.
- Jeder Artikel steht wörtlich darin, so wie die App ihn zeigt (Grundlagen mit ihrer Vertiefung,
  siehe „Inhalt“). Ablauf für den User, NotebookLM-Grenzen und Anpassen-Text: `docs/podcasts.md`.
- Der User übergibt Audio mit der Nummer aus `Übersicht.md`; die Nummer verschiebt sich, wenn
  Artikel dazukommen — sofort auf die Artikel-ID abbilden, an der das Audio dauerhaft hängt.
  Einbindung in die App: noch nicht gebaut.

## Tagebuch

- Modell/Kalender-Arithmetik in `src/tagebuch/modell.ts` (Woche ab Montag, immer 42
  Zellen, Datumsrechnen in UTC, Anzeige lokal), Zustand mit verzögerter Sicherung in
  `zustand.ts` (500 ms nach der letzten Änderung, sofort bei Blur/Tageswechsel/Schließen).
- Speicher: nativ `tagebuch.json` im App-Datenordner über die gemeinsamen JSON-Commands
  in `src-tauri/src/lib.rs` (`json_lese`, `json_schreibe`, `json_pfad` — nehmen nur die
  Namen `tagebuch.json` und `dokumente.json` an; Frontend-Seite `src/speicher/json.ts`;
  Windows: `%APPDATA%\de.evenacadia.ki-enzyklopaedie\tagebuch.json`). Schreiben ist
  atomar (`.tmp` + fsync + rename) und legt vorher `tagebuch.bak.json` ab — aber nur,
  wenn die bisherige Datei gültiges JSON ist (eine defekte Datei darf die Sicherung nicht
  überschreiben). Im Browser localStorage `ki-enzyklopaedie.tagebuch.v1`. Ein Ladefehler
  sperrt das Schreiben — nie eine leere Kopie über echte Daten schreiben; eine LEERE
  Datei ist deshalb ein Fehler, nur eine FEHLENDE ein leeres Tagebuch (`parseJsonDatei`
  in `src/speicher/json.ts`). Datenformat `{ version: 1, tage }`.
- Farbe der Markierung: Feld `farbe` je Eintrag (`FARBEN` in `modell.ts`: gold, kupfer,
  salbei, schiefer, altrosa; fehlend/unbekannt → gold, `version` bleibt 1). Bedeutung nur
  bei `markiert`. Oberfläche: Attribut `data-farbe` → CSS-Variable `--ereignis`
  (Tokens `--farbe-*` in `src/styles.css`). Im Kalender zeigt ein markierter Tag die
  Farbe an Zahl, Umrandung UND als Ton in der Zelle, der gewählte Tag kräftiger
  (User 27.09.2026: nur der Punkt war „zu dezent“) — nicht wieder auf den Punkt
  zurückbauen. Keine Legende, keine Namen in der Oberfläche —
  Namen nur als `aria-label` und im Export. Palette geprüft: alle Töne ≥ 5,8:1 gegen
  `#101010`/`#1a1714`, kleinster Abstand untereinander 0,08 (OKLab); Zahl auf getönter
  Zelle in allen Zuständen ≥ 4,5:1; beim Ändern neu rechnen.
- Routen `#/tagebuch` (heute) und `#/tagebuch/<YYYY-MM-DD>`; Tage sind Links.
- Konventionen ohne neues Datenfeld: Zeilen mit „?“ am Anfang sind offene Fragen
  (`fragenImText`/`offeneFragen` in `modell.ts`); der Kalender zeigt ISO-Kalenderwochen
  (`kalenderwoche`, Donnerstag-Regel, mit Tests für 53-Wochen-Jahre).
- Export: `src/tagebuch/export.ts` → Markdown; nativ `@tauri-apps/plugin-dialog`
  (`save`) + Command `datei_schreibe`, im Browser Blob-Download.
- Import (User 28.09.2026: „unbedingt“, um alle Einträge aus der exportierten Datei
  wiederherzustellen): `src/tagebuch/import.ts` liest den Export zurück — alle drei
  Fassungen (`**Ereignis:**` ohne Farbe, mit Farbe, mit Anhängen). Wer das Format des
  Exports ändert, ändert den Import mit; der Test „bleibt über Export → Import → Export
  dieselbe Datei“ hält beide zusammen. Regeln: der Import LÖSCHT NIE; ein Tag, der im
  Tagebuch anders steht, wird nur ersetzt, wenn der Nutzer „Durch die Datei ersetzen“
  wählt (vorgewählt ist „Tagebuch behalten“); gleiche Tage bleiben unberührt. Verglichen
  wird, was der Export festhält (`kern`: Text ohne Rand, Bezeichnung und Farbe nur bei
  markierten Tagen, „ja“ = ohne Bezeichnung). Nicht im Export und deshalb nicht
  wiederherstellbar: `geaendert` (importierte Tage tragen den Zeitpunkt des Imports) und
  die Anhänge. Nativ: `open` + Command `datei_lese(pfad)` — liest nur `.md`/`.markdown`/
  `.txt`, nur echte Dateien bis 16 MB, UTF-8 oder UTF-16 mit Kennung; im Browser ein
  verstecktes Dateifeld. Geschrieben wird sofort (`importiereTage` in `zustand.ts`), die
  Rust-Seite legt dabei wie immer `tagebuch.bak.json` mit dem Stand davor ab.
- Die Vorschau des Imports liegt ÜBER der Leiste (`.import-anker` direkt vor der
  Fußzeile, `.import` absolut darin): in der Höhe der Leiste hat sie neben Kalender und
  Liste keinen Platz — als Block im Fluss schob sie die Fußzeile aus dem Fenster. Die
  Fußzeile des Tagebuchs ist zweizeilig (Zählung oben, Import und Export darunter).
- Lesefortschritt (Enzyklopädie): `src/lesefortschritt.ts`, localStorage
  `ki-enzyklopaedie.gelesen.v1`; Lesestrecke Vor/Zurück aus `enzyklopaedie.lesestrecke(id)`
  (nur Sammlungen, nicht Grundlagen). „Weiter“ markiert den aktuellen Artikel als gelesen.
- Scrollposition bei Zurück/Vor: Navigation API (`navigate`-Event, `navigationType ===
  'traverse'`) in `App.tsx`; ohne diese API (jsdom) beginnt jede Route oben.

## Dokumente

- Dateien liegen nativ in `%APPDATA%\de.evenacadia.ki-enzyklopaedie\dokumente\` als
  `<id>_<Originalname>` (id: zehn Zeichen a–z, 0–9, vergibt Rust), das Verzeichnis daneben
  als `dokumente.json` (`{ version: 1, dokumente }`, Sicherung `dokumente.bak.json`).
  Importieren = KOPIEREN; das Original wird nie angefasst.
- `art` (`zertifikat` · `dokument` · `anhang`) und `tag` (Tagebuchtag oder null) sind
  getrennt: `tag` bestimmt, an welchem Tag das Dokument als Anhang erscheint, `art` die
  Abteilung. `anhang` ohne Tag gibt es nicht (wird `dokument`).
- Commands (`src-tauri/src/lib.rs`): `dokument_importiere(quelle)`, `dokument_pfad(id)`,
  `dokument_oeffne(id)`, `dokument_zeige(id)`, `dokument_entferne(id)`, `dokumente_ordner`.
  Das Frontend übergibt NIE einen Zielpfad, nur die Kennung; Rust sucht die Datei im
  Ordner. Öffnen/Zeigen laufen über die Rust-Seite des Opener-Plugins (`OpenerExt`) — der
  JS-Weg `openPath` bräuchte eine Capability mit Pfad-Scope. Ausführbare Typen (Liste
  `AUSFUEHRBAR`) startet `dokument_oeffne` nicht.
- Entfernen: erst die Datei (Rust), dann der Eintrag im Verzeichnis; vorher Rückfrage
  (`frageEntfernen` in `dokumente/dialoge.ts`, nativ `ask` — läuft über den Command
  `message`, den `dialog:default` erlaubt). Kein Papierkorb (User-Entscheid).
- Vorschau: `convertFileSrc` + `assetProtocol` (Scope NUR `$APPDATA/dokumente/**`) + CSP
  `img-src`/`frame-src` mit `asset: http://asset.localhost`. Cargo-Feature
  `protocol-asset` an `tauri` ist dafür nötig. PDF läuft im eingebauten Betrachter von
  WebView2 (`<iframe>`), am Gerät geprüft 27.09.2026. Das Asset-Protokoll bestimmt den
  Inhaltstyp am INHALT der Datei, nicht an der Endung — `dokument_pfad` gibt für `.pdf`
  deshalb nur dann einen Pfad heraus, wenn die Datei mit `%PDF-` beginnt (`ist_pdf`);
  sonst stünde eine umbenannte HTML-Datei als Webseite im Rahmen. `sandbox` am Rahmen geht
  nicht: der PDF-Betrachter lädt dann nicht. Bilder laufen über `<img>` (führt nichts aus).
- Hineinziehen: `getCurrentWebview().onDragDropEvent` (`dokumente/ablage.ts`), Fallzonen
  über `data-ablage`; Position kommt in physischen Pixeln (durch `devicePixelRatio`
  teilen). Feuert mit `core:default`, keine weitere Permission nötig.
- Zustand `dokumente/zustand.ts` nach dem Muster des Tagebuchs: Ladefehler sperrt alles,
  Import/Entfernen schreiben sofort, Name/Notiz/Abteilung verzögert.
- Browser/Preview: nur das Verzeichnis (localStorage `ki-enzyklopaedie.dokumente.v1`),
  keine Dateien — Tests nutzen `src/test/fake-dokumente.ts`.

## Weitergabe

User-Auftrag 28.09.2026: ein Installer-Paket, um die App einem Freund zu geben.

- `npm run tauri:build && npm run weitergabe` → `weitergabe/` (nicht eingecheckt):
  `KI-Enzyklopaedie-<version>.zip` mit `KI-Enzyklopaedie-Setup-<version>.exe` und
  `LIESMICH.txt` (Vorlage `scripts/weitergabe-liesmich.txt`, Platzhalter `{{version}}`,
  `{{datei}}`, `{{sha256}}`; geschrieben mit BOM und CRLF). Namen ohne Umlaut. Das Skript
  bricht ab, wenn `.exe` oder Installer älter sind als die Quellen.
- Im Paket steckt nichts vom Nutzer: der Installer enthält nur die `.exe` und den
  WebView2-Bootstrapper von Microsoft (`webviewInstallMode: embedBootstrapper`). Die
  `.exe` braucht keine VC++-Laufzeit (statisch gelinkt, Standard von `tauri-build`).
- Installer deutsch (`bundle.windows.nsis.languages: ["German"]`), mit App-Icon und
  eigenem Seitenbild (`src-tauri/installer/seitenbild.bmp` aus
  `npm run tauri:installer-bild`, 328×628 = doppelte Auflösung, 24-Bit-BMP).
- Eigene Texte in `src-tauri/installer/German.nsh` (`customLanguageFiles`): die deutsche
  Fassung von Tauri hat die Schlüssel `older`/`unknown` mitübersetzt (`älter`,
  `unbekannt`), beim Aktualisieren fehlte dadurch ein Wort im Satz. Die Datei muss UTF-8
  OHNE BOM sein — der Bundler setzt beim Kopieren selbst eines davor, mit zweien bricht
  makensis ab. Der Rust-Test `installer_ist_deutsch_und_vollstaendig` prüft Schlüssel,
  BOM und Bild.
- Nicht signiert: SmartScreen warnt beim Empfänger. Ein Zertifikat kostet Geld — das
  entscheidet der User, nicht von selbst einbauen.
- Nach Änderungen am Installer (Texte, Bild, `bundle` in `tauri.conf.json`):
  `npm run installer:beweis` (`scripts/installer-beweis.ps1`) — bedient das Fenster ohne
  Maus (`WM_COMMAND` mit Kennung 1 geht eine Seite weiter, `PrintWindow` macht das Bild),
  Bilder nach `.playwright-mcp/`, danach ansehen. Ohne Argument installiert der Lauf
  nichts; `-- -Aelter` zeigt die Seite zum Aktualisieren (stellt dafür kurz
  `DisplayVersion` unter `HKCU:\…\Uninstall\KI-Enzyklopädie` um und wieder zurück);
  `-- -Modus installieren` läuft durch und ersetzt die installierte App.

## Fallen

- Der Bundler schreibt die `.exe` in `target/release` NACH dem Packen noch einmal (er
  nimmt die Kennzeichnung der Bundle-Art wieder heraus): sie ist stets etwas jünger als
  der Installer und nicht byte-gleich mit der installierten. Die Warnung
  „STATIC_VCRUNTIME is deprecated“ bei `tauri build` kommt aus der Tauri-CLI selbst, nicht
  aus diesem Repo.
- `cargo fmt` NICHT über `src-tauri/src/lib.rs` laufen lassen: die Datei ist von Hand
  gesetzt, rustfmt bricht fast zweihundert Zeilen um.
- `window.__TAURI_INTERNALS__.invoke` lässt sich im Fenster nicht ersetzen (nicht
  beschreibbar) — einem Dialog des Betriebssystems kann ein Prüflauf so keine Antwort
  unterschieben. `nativ:beweis` beantwortet den Öffnen-Dialog des Imports deshalb über
  `scripts/dialog-helfer.ps1`: Fensternachrichten an das Feld „Dateiname“ (Kennung 0x47C)
  und den Knopf „Öffnen“ (Kennung 1), ohne Maus. Der Dialog blitzt dabei kurz auf.
- Das Write-Werkzeug schreibt `﻿` in Quelltexten gelegentlich als das unsichtbare
  Zeichen selbst; ESLint meldet es in regulären Ausdrücken („Irregular whitespace“). Nach
  dem Schreiben mit `\x{FEFF}` suchen.
- Tests in `src-tauri/src/lib.rs` laufen nebeneinander: jeder braucht einen EIGENEN Namen
  für `testordner(…)`, sonst räumt einer dem anderen die Dateien weg.
- Schwere Läufe (Tests, Lint, Build, Beweise) lassen auf diesem Rechner den Ton in
  Teams-Anrufen stottern (User 28.09.2026). Vorher prüfen, ob das Mikrofon in Benutzung
  ist: ein Eintrag mit `LastUsedTimeStop = 0` unter
  `HKCU:\Software\Microsoft\Windows\CurrentVersion\CapabilityAccessManager\ConsentStore\microphone`.

- Vor `tauri build`/`cargo build` prüfen, dass keine Instanz der App läuft
  (`Get-Process ki-enzyklopaedie`): eine laufende .exe sperrt
  `src-tauri/target/release/ki-enzyklopaedie.exe`, der Linker meldet „Zugriff
  verweigert“, und `tauri build` endet TROTZDEM mit Exit-Code 0 — die alte .exe bleibt
  liegen. Eine zweite Instanz hängt sich zudem an den WebView2-Prozess der ersten; der
  Debug-Port für `npm run nativ:beweis` ist dann nicht erreichbar.
- Tauri-Plugins in `Cargo.toml` auf `"2"` halten (`tauri-plugin-opener`, `-dialog`,
  `-window-state`); crates.io führt bereits `3.0.0-alpha` (für Tauri 3), `cargo search`
  und `cargo info` zeigen nur diese. npm-Pakete `@tauri-apps/plugin-*` ^2.x passend.
  `tauri-plugin-store` wird seit 27.09.2026 nicht mehr benutzt (es schrieb mit
  `fs::write`, nicht atomar).
- Eine laufende Instanz reagiert nicht auf `CloseMainWindow()`; vor einem Build
  `Stop-Process -Name ki-enzyklopaedie` (das Tagebuch ist spätestens 500 ms nach der
  letzten Änderung gesichert). Bash-Tool: `$p` in doppelten Anführungszeichen wird von
  der Shell expandiert — PowerShell-Skripte über das PowerShell-Tool ausführen.
- `tauri icon` erzeugt auch `icons/android` und `icons/ios`; `npm run tauri:icon`
  entfernt sie wieder. Nicht einchecken.
- Externe Links im nativen Fenster laufen über `@tauri-apps/plugin-opener`
  (`src/oeffnen.ts`); Capability `opener:default` in `src-tauri/capabilities/default.json`.
  Ein nackter `<a target="_blank">` öffnet in Tauri 2 NICHT den Browser.
- jsdom kennt weder `scrollTo` noch `scrollIntoView` — DOM-Scroll nur mit Guard aufrufen.
- Bash-Heredocs mit langen TS-Dateien scheitern hier gelegentlich am Shell-Parser;
  mehrzeilige Quelltexte über das Write-Tool schreiben.
- `.gitignore` deckt `src-tauri/target` und `src-tauri/gen/schemas` (beides generiert).
- `nativ:beweis` und `os:beweis` laufen im ECHTEN App-Datenordner des Rechners. Sie legen
  den Bestand des Nutzers vorher beiseite (`*.beweis-sicherung` / `*.os-sicherung`),
  starten mit leerem Tagebuch und spielen danach byte-genau zurück — so steht nichts vom
  Nutzer in den Bildern unter `docs/bilder/`, die ins Repo gehen. Findet ein Lauf eine
  liegengebliebene Sicherung, bricht er ab: sie enthält den echten Bestand. Nach jedem
  Lauf prüfen, dass Dateien und Zeitstempel im Ordner wie vorher sind; Bilder vor dem
  Commit ansehen.
- jsdom führt einen Klick auf einen Link (`<a href="#/…">`) erst in einer späteren Task
  aus. Folgt danach ein weiterer Test, fällt die Navigation in DIESEN und wechselt
  mittendrin die Route. `frisch()` in `src/App.test.tsx` wartet deshalb vor jedem Test
  eine Task ab — neue Testblöcke dort immer mit `beforeEach(frisch)` beginnen.
- PowerShell unterscheidet bei Variablen keine Groß- und Kleinschreibung: `$h` und `$H`,
  `$x` und `$X`, `$bedingung` und `$Bedingung` sind dieselbe Variable (auch über
  Funktionsgrenzen, dynamischer Gültigkeitsbereich). Typografische Anführungszeichen
  („ “) beenden in PowerShell eine Zeichenkette.
- Das Playwright-Plugin schreibt nur unterhalb des Projektordners; Arbeitsbilder nach
  `.playwright-mcp/` (ignoriert), Bilder für die README nach `docs/bilder/`.
- `vite preview` und `page.goto` mit bloß geändertem Hash laden die Seite NICHT neu —
  nach einem Build einen Query-Parameter ändern (`/?v=2#/…`) oder neu laden.
- `os:beweis` (simulierte Maus): Bilder lassen sich nur aus einem Explorer-Fenster
  ziehen, das nicht kurz zuvor geschlossen und neu geöffnet wurde — deshalb benutzt der
  Lauf EIN Fenster für beide Züge. Eigenheit des Prüfwerkzeugs, nicht der App (Tauri
  wertet nur die Dateiliste aus). Der Explorer blendet Endungen aus (Eintrag heißt
  „Urkunde“, nicht „Urkunde.pdf“); die Knöpfe der Rückfrage meldet Windows je nach
  Zugangsweg als `Button` oder als `Pane`.
