# Podcasts zu den Artikeln

User-Auftrag 28.09.2026: zu jedem Wissensartikel einen Audio-Podcast, den der User selbst in
Google NotebookLM erzeugt; dafür je Artikel eine ausformulierte Markdown-Datei als Quelle.
Die fertigen Audiodateien kommen danach nach und nach in die App, je an ihren Artikel — mit einem
„stilistisch passenden“ Play-Knopf neben der Überschrift und komprimiert, weil die Lieferungen
sehr groß sind (User 28.09.2026, beides gebaut: Abschnitt „Audio in die App“).

## Die Quellen-Dateien

`notebooklm/` enthält eine Datei je Artikel (111) und `Übersicht.md`, erzeugt mit

```
npm run podcast:quellen
```

- Die Ablage bildet das Register „Themen“ der App ab (Wunsch des Users: jede Datei und jedes Audio
  eindeutig dem Artikel in der App zuordnen): ein Ordner je Abschnitt der Seitenleiste, in derselben
  Reihenfolge (`01 Grundlagen – EU AI Act & Recht` … `10 Sammlung – Psychologie für Strategie und
  Beratung`); Datei = laufende Nummer 001–111 in Register-Reihenfolge + Titel wie in der App, z. B.
  `09 Sammlung – Strategie — Grundlagen/057 Was Strategie ist – und was nicht.md`. Doppelpunkt und
  Fragezeichen werden im Dateinamen ein Gedankenstrich, ein Schrägstrich ein Bindestrich.
- `Übersicht.md` listet jede Nummer mit dem Titel aus der App, je Abschnitt. Die Nummer ist die
  Übergabe-Hilfe; kommen Artikel dazu, können sich die Nummern dahinter verschieben. Dauerhaft hängt
  das Audio an der **Artikel-ID** (Nummer → ID liefert `podcastQuellen` in `src/podcast/quelltext.ts`).
- Inhalt: Titel, Einleitung, Herkunft (Sammlung, Thema, Stelle in der Lesestrecke, Synonyme), bei
  „im Wandel“ ein Hinweis mit dem Stand der Quellen, der volle Text, die Einordnung (Nachbarn in der
  Lesestrecke, verwandte Artikel mit ihrer Einleitung) und die Quellen.
- Jeder Artikel steht **wörtlich** darin, so wie die App ihn zeigt — der Podcast soll zum Artikel
  passen.
- Die 41 Grundlagen-Artikel waren aus der Akademie exportierte Kurzartikel (40–150 Wörter), für einen
  Podcast zu dünn und teils veraltet. Sie tragen seit dem 28.09.2026 in App und Quelle eine
  **Vertiefung** (`src/inhalt/vertiefungen/`, 600–1.000 Wörter, 2–5 geprüfte Quellen, Schluss
  „Grenzen und Kritik“ oder „Typische Fehler“), geschrieben aus dem belegten Akademie-Material
  (Karteikarten, Quiz-Begründungen, Szenario-Vertiefungen) und am 28.09.2026 neu geprüften
  Primärquellen.
- `notebooklm/` ist eingecheckt: so bleibt nachvollziehbar, aus welchem Text ein Podcast entstand. Der
  Test „liegt in notebooklm/ auf dem Stand des Generators“ bricht, sobald ein Artikel geändert und die
  Dateien nicht neu erzeugt wurden.

## In NotebookLM

Stand 28.09.2026 laut Google-Hilfe (Produkt heißt dort inzwischen auch „Gemini Notebook“):

- Markdown (`.md`) ist als Quelle zugelassen, bis 500.000 Wörter je Quelle; im kostenlosen Tarif bis
  50 Quellen je Notebook und **3 Audio-Übersichten pro Tag** (Plus 6, Pro 20). Für 111 Artikel also
  rund fünf Wochen im kostenlosen Tarif.
- Sprache: Einstellungen (oben rechts) → Ausgabesprache → Deutsch.
- Erzeugen: im Bereich „Studio“ die Audio-Übersicht wählen, vorher „Anpassen“. Formate: Deep Dive
  (Standard, zwei Stimmen), Kurzfassung (eine Stimme, unter zwei Minuten), Kritik, Debatte. Die Länge
  lässt sich nur auf Englisch wählen — auf Deutsch richtet sie sich nach der Quelle.
- Ein Notebook je Artikel ist am einfachsten; die Audio-Übersicht nutzt alle ausgewählten Quellen des
  Notebooks.
- Herunterladen über das Menü der fertigen Audio-Übersicht. Geliefert wurde (28.09.2026) `.m4a`: AAC-LC,
  44,1 kHz, Stereo mit zwei identischen Kanälen, 257 kbit/s — 16 bis 28 Minuten, 30 bis 51 MB je Folge.
  Der Dateiname ist der Titel der Folge, den NotebookLM vergibt, mit Unterstrichen
  (`Millionenstrafen_und_der_KMU-Schutzschild.m4a`).

Text für das Feld „Anpassen“ (437 Zeichen, Grenze etwa 500):

```
Sprecht Deutsch. Zuhörer sind Einsteiger in KI-Beratung und Strategie, die den Artikel begleitend lesen. Bleibt eng an der Quelle: keine Zahlen, Studien, Namen oder Beispiele erfinden, die dort nicht stehen, und nichts zuspitzen. Erklärt Fachbegriffe beim ersten Auftreten. Besprecht den letzten Abschnitt (Grenzen und Kritik oder typische Fehler) ausdrücklich. Verwandte Artikel nur am Ende kurz nennen, die Quellenliste nicht vorlesen.
```

## Übergabe der Audiodateien

Die Nummer der Quelle vorne in den Dateinamen schreiben — so liefert der User seit der ersten Folge:
`2. Millionenstrafen_und_der_KMU-Schutzschild.m4a`. Auch `057.wav` oder `057 Titel.m4a` gehen.

## Audio in die App (gebaut 28.09.2026, Version 0.4.0)

```
npm run podcast:audio -- "C:\Users\phili\Downloads\2. Millionenstrafen_und_der_KMU-Schutzschild.m4a" …
npm test
```

`scripts/podcast-audio.mts` prüft erst alle Dateien (Nummer bekannt? zwei Dateien für denselben
Artikel?), dann je Datei:

- **Zuordnung:** Nummer → Artikel-ID über `podcastQuellen(...).dateien` — die Nummer gilt für den
  Stand von `Übersicht.md`, an dem die Folge entstand; dauerhaft hängt sie an der ID. Folgentitel =
  Dateiname ohne Nummer, Unterstriche als Leerzeichen.
- **Kompression:** Opus in Ogg, Mono, 48 kHz, 32 kbit/s VBR (`libopus` aus dem npm-Paket
  `ffmpeg-static`, kommt mit `npm install` auf jeden Rechner). Begründung: die Lieferung ist doppeltes
  Mono, Sprache mit kaum Anteilen über 12 kHz; Xiph empfiehlt für Podcasts in Mono 24 kbit/s
  (<https://wiki.xiph.org/Opus_Recommended_Settings>), 32 lassen Reserve. Die Kanäle werden gemittelt
  (`pan=mono|c0=0.5*c0+0.5*c1`): ffmpegs `-ac 1` hebt den Pegel um 3 dB und bringt Spitzen an die
  Grenze. Ergebnis der ersten 18 (drei Lieferungen, 001–018): 695,7 MB → 88,4 MB, mittlerer Pegel je
  Folge 0,1–0,2 dB unter dem Original (gemessen mit `volumedetect`, Quelle −23,9 bis −24,9 dB).
  `bitexact` macht die Ausgabe wiederholbar: dieselbe Quelle ergibt dieselben Bytes.
- **Prüfung:** Die fertige Datei muss Mono sein und so lang wie die Quelle (±0,5 s), sonst bricht
  das Skript ab und lässt nichts Halbes liegen.
- **Eintrag:** `src/podcast/audio.json` (Titel der Folge, Sekunden, Bytes, Name der Lieferung), in der
  Reihenfolge des Themen-Registers. Der Test `src/podcast/podcast.test.ts` prüft jede Datei gegen
  diesen Eintrag (Größe, Dauer aus dem Ogg-Kopf, Mono, höchstens 40 kbit/s) und dass in `podcasts/`
  nichts anderes liegt.

In der App:

- Die Dateien liegen im Repo unter `podcasts/` und in der installierten App neben der .exe
  (`bundle.resources`, `%LOCALAPPDATA%\KI-Enzyklopädie\podcasts\`), NICHT in `public/`: alles dort ginge
  in `dist/` und damit in die .exe. Abgespielt wird über das Asset-Protokoll (Scope
  `$RESOURCE/podcasts/**`, CSP `media-src`); es liefert Teilbereiche (206), damit das Springen geht.
  Im Browser liefert der Vite-Server (`vite.config.ts`, Plugin `podcasts`) dieselben Dateien.
- Größe: 3–7 MB je Folge (im Mittel knapp 5 MB); bei 111 Folgen etwa 550 MB im Repo und im Installer. GitHub empfiehlt
  Repos unter 1 GB, sperrt erst Dateien über 100 MB — deshalb kein Git LFS.
- Das Paket für den Freund enthält die Podcasts (Entscheid beim Bauen: sie gehören zum Inhalt wie die
  Artikel). Installer ohne Podcasts 3,5 MB, mit sieben Folgen (0.4.0) 41 MB, mit elf (0.4.1) 58 MB,
  mit 18 (0.4.2) 92 MB.
