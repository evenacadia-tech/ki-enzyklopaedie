# Podcasts zu den Artikeln

User-Auftrag 28.09.2026: zu jedem Wissensartikel einen Audio-Podcast, den der User selbst in
Google NotebookLM erzeugt; dafür je Artikel eine ausformulierte Markdown-Datei als Quelle.
Die fertigen Audiodateien kommen danach nach und nach in die App, je an ihren Artikel.

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
- Herunterladen über das Menü der fertigen Audio-Übersicht. Das Dateiformat nennt Google nicht; die
  erste gelieferte Datei zeigt es.

Text für das Feld „Anpassen“ (437 Zeichen, Grenze etwa 500):

```
Sprecht Deutsch. Zuhörer sind Einsteiger in KI-Beratung und Strategie, die den Artikel begleitend lesen. Bleibt eng an der Quelle: keine Zahlen, Studien, Namen oder Beispiele erfinden, die dort nicht stehen, und nichts zuspitzen. Erklärt Fachbegriffe beim ersten Auftreten. Besprecht den letzten Abschnitt (Grenzen und Kritik oder typische Fehler) ausdrücklich. Verwandte Artikel nur am Ende kurz nennen, die Quellenliste nicht vorlesen.
```

## Übergabe der Audiodateien

Die Nummer der Quelle vorne in den Dateinamen schreiben (`057.wav`) oder beim Übergeben dazusagen.
Am einfachsten heißt schon das Notebook wie die Datei (`057 Was Strategie ist – und was nicht`).
Die Einbindung in die App (Ablage, Format, Abspieler am Artikel) wird mit der ersten Datei gebaut.
