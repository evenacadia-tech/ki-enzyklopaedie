# Übergabe an die nächste Sitzung

Stand: 2026-09-28, Version 0.3.0. Die drei Wünsche vom 27.09.2026 sind gebaut und am
echten Fenster geprüft; am 28.09.2026 kamen das Paket zum Weitergeben, der Import ins
Tagebuch und die Quellen für Podcasts dazu (Abschnitte unten). **Offener Auftrag:** die
Audiodateien, die der User nach und nach liefert, an ihre Artikel hängen (siehe „Podcasts“).

## Podcasts (28.09.2026)

Wunsch des Users: zu jedem Wissensartikel einen Podcast, den er selbst in NotebookLM
erzeugt; dafür je Artikel eine ausformulierte MD-Datei. Danach liefert er die Audiodateien
nach und nach, und sie kommen an den jeweiligen Eintrag. Nachtrag des Users: Es muss für
ihn ersichtlich sein, welche Datei (und welches Audio) zu welchem Artikel der App gehört.

- **Gebaut:** `notebooklm/` mit 111 Dateien und `Übersicht.md` (`npm run podcast:quellen`,
  `src/podcast/quelltext.ts`). Ordner wie das Themen-Register der App, Datei = Nummer
  001–111 + App-Titel. Ablauf für den User und NotebookLM-Grenzen: `docs/podcasts.md`.
- **Alte Einträge:** Der User vermutete ausformulierte Texte in Akademie oder Leitstand.
  Leitstand: nichts (Agenten-Werkzeug). Akademie: keine Prosa, aber je Grundlagen-Artikel
  Karteikarten, Quiz-Begründungen und Szenario-„Vertiefungen“ (2.000–16.000 Wörter) —
  Grundlage der 41 Vertiefungen in `src/inhalt/vertiefungen/` (je 600–900 Wörter, 2–5
  Quellen, alle am 28.09.2026 abgerufen; von sieben Agenten geschrieben, von mir gegen die
  Quellen stichprobenartig geprüft, jede Quelle erreichbar oder bekannt bot-gesperrt).
- **Die App zeigt die Vertiefungen** (Version 0.3.0): Sie ersetzen Text und Quellen der 41
  Grundlagen-Artikel (`vertiefe` in `src/inhalt/vertiefungen/index.ts`). Empfehlung, die ich
  dem User gegeben und umgesetzt habe, weil die Kurztexte veraltet waren und die Akademie
  mit dem Exportstand nur auf dem anderen Rechner liegt; Artikel und Podcast sagen jetzt
  dasselbe. Im Browser bei 1280 px angesehen (KI-Kompetenz, RAG).
- **Nächster Schritt, sobald die erste Audiodatei kommt:** Nummer → Artikel-ID über
  `podcastQuellen(...).dateien` (Feld `nummer`), dann die Einbindung in die App bauen
  (Ablage, Format, Abspieler am Artikel). NotebookLM liefert laut Drittquellen WAV; die
  erste Datei zeigt es. Offene Produktfrage an den User: sollen die Podcasts auch ins
  Paket für den Freund (Installergröße) oder nur auf dem Laptop liegen?
- **Veraltete Aussagen der Akademie-Kurzartikel,** gefunden beim Schreiben der Vertiefungen.
  In App und Podcast-Quellen behoben (die Vertiefungen ersetzen diese Texte); in der Akademie
  selbst stehen sie noch — nur relevant, falls jemand die Akademie-Texte wieder nutzt:
  - `timeline`: „Verbote (Art. 5), KI-Kompetenz (Art. 4) und Transparenz (Art. 50) bleiben
    unverändert“ ist falsch — Art. 4 neu gefasst, zwei neue Verbote ab 02.12.2026,
    Übergangsfrist Art. 50 Abs. 2 bis 02.12.2026 (VO (EU) 2026/1744). Anhang I war
    ursprünglich der 02.08.2027, nicht der 02.08.2026.
  - `ki-kompetenz`: „sicherstellen“ / „Betreiber müssen … sorgen“ — seit 27.07.2026
    „Maßnahmen … unterstützen“, kein garantiertes Niveau; trifft Anbieter und Betreiber.
  - `verbote`: acht statt künftig zehn Verbote (lit. ba/bb ab 02.12.2026).
  - `owasp`: „Ausgabe 2025“, LLM06/LLM07 — seit August 2026 gilt die Fassung 2026
    (Excessive Agency = LLM03:2026, Hidden Context Exposure = LLM08:2026).
  - `datensouveraenitaet`: „C5:2026 läuft“ — final seit März 2026, Testate ab 01.06.2027.
  - `aleph-alpha`: Stand April 2026 — Vereinbarung mit Cohere am 16.09.2026 unterzeichnet.
  - `oekosystem-de`: Bitkom 36 % (2025) — Bitkom 14.09.2026: 57 %.
  - `branchen-praxis`: F13 „auf Aleph-Alpha-Technik, gehostet auf STACKIT“ gilt nur für den
    Prototyp; die Vollversion läuft ohne Aleph Alpha bei BITBW. Telekom: fast 10 Mio.
    Dialoge (2024) statt 4 Mio. (2022).
  - `iso-42001-kein-freibrief`, `harmonisierung`: EN 18286 im Juni 2026 angenommen,
    Fundstelle im Amtsblatt steht noch aus.
  - `change-management`, `tdm-urheberrecht`, `mitbestimmung`: Einleitung überzogen
    (Vertiefungen ersetzen sie über das Feld `einleitung`).
  - Tote Quellen-Links in der Akademie: IBM `…/ai-maturity`, `…/ai-strategy`,
    `…/ai-adoption`, `…/proof-of-concept` leiten auf die IBM-Übersicht um.
- **In der Akademie auf dem Laptop, nicht in der Enzyklopädie:** vier Artikel „Lokale KI“
  (`lokale-ki-*`, ungepushte Commits vom 15.07.2026) — kommen erst mit einem
  zusammengeführten Akademie-Stand in die App.

## Import ins Tagebuch (28.09.2026, Version 0.2.0)

Wunsch des Users: die exportierte Markdown-Datei wieder einlesen, um alle Einträge
wiederherzustellen.

- Fußzeile der Tagebuch-Leiste: **Importieren** neben **Exportieren**. Nach der Dateiwahl
  zeigt eine Vorschau, was die Datei bringt; geschrieben wird erst nach der Bestätigung.
- Entscheidungen beim Bauen: der Import löscht nie; Tage, die im Tagebuch anders stehen,
  bleiben, solange man nicht „Durch die Datei ersetzen“ wählt; das Format des Exports ist
  unverändert, damit auch schon geschriebene Dateien sich einlesen lassen (alle drei
  Fassungen). Importierte Tage zeigen unter „Geändert“ den Zeitpunkt des Imports — der
  ursprüngliche steht nicht in der Datei.
- Version auf 0.2.0, weil die App inzwischen weitergegeben wird: der Installer erkennt
  eine installierte 0.1.0 als ältere Fassung.
- Geprüft am Endstand: 149 Tests (Vitest), 14 Tests (cargo), Lint, Build, `nativ:beweis`
  mit dem Import am echten Fenster (echter Öffnen-Dialog, echte Datei, `tagebuch.json` und
  `tagebuch.bak.json` nachgelesen); Vorschau im Browser bei 1280 und 960 px Breite
  angesehen; Installer 0.2.0 über der installierten 0.1.0 angesehen, danach installiert.
  Der Bestand des Users war nach jedem Lauf unverändert (Größe, Zeitstempel, SHA-256).
- NICHT geprüft: eine Datei, die der User selbst früher exportiert hat — auf diesem
  Rechner lag keine. Die drei Fassungen des Formats sind aus der Geschichte von
  `export.ts` nachgebaut und getestet.

## Weitergabe (28.09.2026)

Wunsch des Users: ein Installer-Paket, um die App einem Freund zu geben.

- `npm run tauri:build && npm run weitergabe` legt `weitergabe/KI-Enzyklopaedie-0.2.0.zip`
  an (Installer + `LIESMICH.txt`). Zip und Installer liegen als Kopie auf dem Desktop des
  Users.
- Der Installer ist jetzt deutsch, trägt Icon und Seitenbild der App und bringt das
  Hilfsprogramm für WebView2 mit. Eigene deutsche Texte, weil die von Tauri gelieferten
  beim Aktualisieren einen Satz mit Lücke zeigten.
- Geprüft (Stand 0.1.0, vor dem Import): Tests, Lint, Build, `nativ:beweis`; Installer am
  echten Fenster Seite für Seite durchlaufen (Bilder angesehen), auch die Seite, die beim
  Aktualisieren über eine ältere Fassung erscheint; danach lief die installierte App,
  Tagebuch und Verknüpfungen unverändert. Wiederholbar mit `npm run installer:beweis`.
- Der User telefoniert oft über Teams; Tests, Lint und Build lassen dann den Ton stottern.
  Schwere Läufe erst starten, wenn das Mikrofon frei ist.
- NICHT geprüft: Installation auf einem fremden Rechner ohne WebView2 und die Warnung von
  SmartScreen (erscheint nur bei Dateien aus dem Netz). `os:beweis` lief nicht — der User
  saß am Rechner, und an Maus, Explorer und Dialogen der App hat sich nichts geändert.
- Offen für den User: Codesignatur (kostet Geld) würde die SmartScreen-Warnung abstellen.

## Was gebaut ist

| Wunsch des Users | Umsetzung | Commit |
|---|---|---|
| Tage im Kalender farblich markieren, passend zum Look, kein Rot/Grün/Blau | Fünf gedeckte Farben je markiertem Tag, ohne Legende; Filter nach Farbe über „Markierte Tage“ | `ec5533b` |
| Bereich für Zertifikate und für andere wichtige Dokumente | Dritter Bereich **Dokumente** mit drei Abteilungen, Detailseite, Suche | `a4e4c20` |
| Dateien direkt am Tagebuchtag hochladen, gesammelt in einer eigenen Abteilung | Block **Anhänge** auf jeder Tagesseite, Abteilung „Aus dem Tagebuch“, Klammer im Kalender | `a4e4c20` |
| Vorschau von PDF und Bildern in der App | Asset-Protokoll, PDF im eingebauten Betrachter von WebView2 | `a4e4c20` |

Einzelheiten stehen in `README.md` (Bedienung, „Dokumente: wo die Daten liegen“) und in
`CLAUDE.md` (Abschnitte „Tagebuch“, „Dokumente“, „Fallen“).

## Entscheidungen, die ich beim Bauen getroffen habe

Technische Entscheidungen, jeweils mit dem, was der User davon merkt:

- **Farbe im Kalender deutlich** (Rückmeldung des Users am 27.09.2026: nur der Punkt war
  „zu dezent“): ein markierter Tag trägt die Farbe an Zahl, Umrandung und als Ton in der
  Zelle, der gewählte Tag kräftiger. Auch während der Suche bleibt die Farbe stehen.
- **Palette leicht nachgeschärft.** Startwerte aus der Spezifikation lagen teils zu nah
  beieinander (Kupfer/Altrosa, Schiefer/Altrosa). Endwerte in `src/styles.css`
  (`--farbe-*`): alle gedeckt, alle gut lesbar, im Kalender als 5-px-Punkt unterscheidbar.
- **Abteilung und Tag sind getrennt.** Ein Anhang, der vom Tag aus hineinkam, kann zu den
  Zertifikaten wandern und bleibt trotzdem an seinem Tag hängen.
- **Ein Tag mit Anhängen, aber ohne Text,** steht in „Einträge im Monat“ und im Export.
- **Ausführbare Dateien** (`.exe`, `.bat`, `.ps1` …) lassen sich ablegen und im Ordner
  zeigen, aber nicht aus der App heraus starten.
- **Vorschau nur für echte PDF.** Eine Datei, die nur `.pdf` heißt, aber etwas anderes
  enthält, zeigt die App nicht an; „Öffnen“ geht weiterhin.
- **Das Schreibfeld im Tagebuch** ist leer etwas niedriger als vorher, damit die Anhänge
  ohne Scrollen zu sehen sind. Es wächst weiter mit dem Text.
- **Export** nennt je Ereignis den Farbnamen und je Tag die Namen der Anhänge.
- **Rust-Commands:** `tagebuch_lese/-schreibe/-pfad` heißen jetzt `json_lese/-schreibe/
  -pfad` und nehmen nur die Namen `tagebuch.json` und `dokumente.json` an.

Nebenbei behoben (alte Fehler im bearbeiteten Bereich): heller Ring um die Lesebühne nach
Tastatur-Navigation; Datum in „Markierte Tage“ stieß an den Farbpunkt; „Exportieren“ in der
schmalen Seitenleiste abgeschnitten.

## Wie geprüft wurde

```
npm test            125 Tests (Vitest)
npm run lint        sauber
npm run build       sauber
cargo test          12 Tests (in src-tauri/)
npm run nativ:beweis   besteht — gebaute .exe, echtes Fenster
npm run os:beweis      besteht — echte Maus, Explorer, Systemdialog
SKALIERUNG=1.5 npm run os:beweis   besteht — rechnet wie 150 % Bildschirmskalierung
```

- **Nativer Beweis** (`scripts/nativ-beweis.mjs`): Tagebuch mit Farbe in `tagebuch.json`;
  Import über das Hineinziehen-Ereignis; Kopie in `dokumente\`, Eintrag in
  `dokumente.json`, Sicherungskopie; Bild und PDF kommen über das Asset-Protokoll
  (Status 200, `image/png` bzw. `application/pdf`), keine Meldung der Sicherheitsrichtlinie;
  Sperren (fremde Kennung, fremde Datei, Skript starten, Ordner importieren, als PDF
  getarnte Webseite in der Vorschau) greifen.
- **Beweis am Betriebssystem** (`scripts/os-beweis.mjs` + `os-helfer.ps1`): PDF mit echter
  Mausbewegung aus dem Explorer auf „Zertifikate“, Bild auf die Tagesseite; „Öffnen“
  startet das Standardprogramm, „Im Ordner zeigen“ den Explorer; Rückfrage vor dem
  Entfernen mit „Entfernen“/„Abbrechen“. Der Lauf bewegt die Maus und öffnet Fenster —
  nur starten, wenn niemand am Rechner arbeitet.
- **Bilder:** `docs/bilder/preview-*.png` (Browser) und `nativ-*.png` (echtes Fenster), alle
  vom 27.09.2026 mit dreiteiliger Kopfzeile.
- **Beide Beweise laufen mit leerem Bestand.** Sie legen Tagebuch und Verzeichnis des
  Nutzers beiseite und spielen sie danach zurück — in den Bildern steht nichts vom Nutzer.
  Auf diesem Rechner liegt seit dem 27.09.2026 ein echter Eintrag; er war nach jedem Lauf
  unverändert (Größe und Zeitstempel geprüft).

## Erster Schritt auf dem Laptop

Der Laptop ist der Hauptrechner, gebaut wurde am Desktop-PC.

1. `git pull`, `npm install`.
2. `npm test && npm run lint && npm run build`, dann `cargo test` in `src-tauri/`.
3. App schließen, `npm run tauri:build`, danach `npm run nativ:beweis`.
4. Installieren: `src-tauri\target\release\bundle\nsis\KI-Enzyklopädie_<version>_x64-setup.exe`.
   Tagebuch und Dokumente bleiben bei der Installation erhalten (sie liegen in `%APPDATA%`).

Beim ersten Start mit der neuen Fassung ändert sich am Tagebuch nichts: alte Markierungen
bleiben Gold, die Datei behält Version 1.

## Offen

- **Artikel aus Tagebuchtagen verknüpfen** — vom User unbeantwortet, niedrige Priorität.
  Nicht nachfragen, außer es ergibt sich.
- **Mögliche Wünsche, nicht beauftragt** (nur auf Zuruf): Anhänge in der Tagebuch-Suche
  finden; ein Dokument nachträglich an einen Tag hängen oder von ihm lösen; mehrere
  Dokumente auf einmal entfernen.

## Fallen, die heute bissen

Alle stehen mit Begründung in `CLAUDE.md` unter „Fallen“. Kurz:

- jsdom führt Link-Klicks verzögert aus; die Navigation fällt sonst in den nächsten Test
  (`frisch()` in `src/App.test.tsx`).
- PowerShell: `$h` und `$H` sind dieselbe Variable; typografische Anführungszeichen beenden
  eine Zeichenkette.
- Bash-Heredocs verschlucken Backslashes und scheitern an langen Quelltexten — Patches
  als Datei im Scratchpad ablegen und von dort ausführen.
- `vite preview`: ein bloß geänderter Hash lädt die Seite nicht neu.
- Das Asset-Protokoll braucht das Cargo-Feature `protocol-asset`.
