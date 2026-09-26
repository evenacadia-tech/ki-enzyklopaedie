# KI-Enzyklopädie

Lese-App mit Tagebuch: quellenbelegte, quervernetzte Artikel zu KI-Consulting, EU AI Act,
Governance & Zertifizierung, Fallbeispielen, KI-Ethik und Verhaltensforschung — und zwei
eigene Lesestrecken: **Strategie — Grundlagen** für den Einstieg in Unternehmensstrategie
und Beraterhandwerk sowie **Psychologie für Strategie und Beratung** (Entscheiden,
Gespräch, Organisation, Markt). 111 Artikel, 348 Quellen, jede Quelle mit Abrufdatum.
Dazu ein persönliches Tagebuch mit Kalender. Kein Quiz, kein RAG, kein Konto.

Zwei Inhaltsquellen:

- **Akademie-Export** (56 Artikel): der Enzyklopädie-Bereich der Akademie-App
  (`evenacadia-tech/probetag-akademie`), exportiert über `scripts/export-aus-akademie.mts`
  nach `src/inhalt/artikel.json`.
- **Eigene Sammlungen** (55 Artikel): von Hand gepflegte Artikel unter
  `src/inhalt/sammlungen/`. `strategie/` (29 Artikel) in fünf Blöcken (Was Strategie ist ·
  Umfeld und Branche analysieren · Geschäftsmodell und Kunde · Umsetzen und messen ·
  Beraterhandwerk); `psychologie/` (26 Artikel) in vier Blöcken (Denken und Entscheiden ·
  Menschen im Gespräch · Gruppen, Führung, Veränderung · Kunde, Markt, Technikakzeptanz,
  Abschluss „Befunde richtig lesen“). Jeder Artikel: 3–4 Abschnitte, 2–5 geprüfte
  Primärquellen, ein Beispiel aus dem Alltag einer kleinen KI-Beratung, ein Abschnitt
  „Grenzen und Kritik“ — ein Test (`eigene Sammlungen (Autorenvertrag)`) erzwingt das.

Beide Quellen laufen durch denselben Load-Guard; Querverweise zeigen in beide Richtungen.

## Bedienung

| Was | Wie |
|---|---|
| Bereich | Kopfzeile rechts: **Enzyklopädie** oder **Tagebuch** |
| Suchen | `/` springt ins Suchfeld; Titel, Synonyme und Fließtext, umlaut-tolerant (`bussgeld` findet „Bußgeld“) |
| Verzeichnis | Themen (Grundlagen nach Thema, Sammlungen in Lesereihenfolge) oder A–Z; `↑`/`↓` wandern, `Enter` öffnet |
| Lesen | Lede, Rumpf (bei langen Artikeln gegliedert, mit Inhaltsverzeichnis), „Siehe auch“, Quellen, „Verweist hierher“ |
| Lesestrecke | Artikel der Sammlungen (Strategie, Psychologie, Akademie-Sammlungen) haben am Ende **Zurück / Weiter** in Lesereihenfolge; die Randspalte zeigt „Lesestrecke 3 von 29“ |
| Lesefortschritt | „Als gelesen markieren“ am Artikelende (oder „Weiter“ klicken) setzt einen Haken im Register und die Marke „Gelesen“; die Startseite zeigt je Lesestrecke „Weiterlesen“ mit dem nächsten ungelesenen Artikel. Wird lokal gemerkt |
| Tagebuch | Tag im Kalender anklicken, schreiben — gespeichert wird von selbst (500 ms nach der letzten Änderung, sofort beim Verlassen); `Ctrl+S` erzwingt es. „Besonderes Ereignis“ markiert den Tag gold und gibt ihm eine Bezeichnung; das nächste Ereignis ab heute steht unter dem Kalender. Die Randspalte zeigt den vorherigen Eintrag als Rückblick |
| Offene Fragen | Eine Zeile, die mit `?` beginnt, sammelt die Seitenleiste unter „Offene Fragen“ (neueste zuerst, Datum als Link). Fragezeichen entfernen = Frage erledigt |
| Tagebuch-Suche | Suchfeld über dem Kalender (`/`), Text und Ereignis-Bezeichnung, umlaut-tolerant; Treffer chronologisch mit Ausschnitt, Treffertage im Kalender unterstrichen |
| Kalender | Kalenderwoche (KW) am Zeilenanfang; Klick auf den Monatsnamen öffnet die Jahresübersicht (zwölf Monate mit Zählern); Pfeiltasten wandern im Raster und über den Monatsrand hinaus, `Bild↑`/`Bild↓` wechseln den Monat, `Heute` springt zurück |
| Export | Fußzeile der Tagebuch-Seitenleiste: **Exportieren** schreibt alle Tage als eine Markdown-Datei (nativ über Speichern-Dialog, im Browser als Download) |
| Schriftgröße | Kopfzeile rechts (Kompakt/Normal/Groß), gilt für Lesetext und Tagebuch, wird lokal gemerkt |
| Zurück/Vor | Die Zurück-Taste kehrt an die alte Leseposition zurück; ein Link beginnt oben. Das native Fenster merkt sich Größe und Lage |
| Deep-Link | `#/artikel/<id>` (z. B. `#/artikel/strategie-begriff`), `#/tagebuch` (heute), `#/tagebuch/2026-09-26` |

![Tagebuch](docs/bilder/preview-tagebuch.png)

![Tagebuch-Suche](docs/bilder/preview-tagebuch-suche.png)

![Jahresübersicht](docs/bilder/preview-tagebuch-jahr.png)

![Startseite mit Weiterlesen](docs/bilder/preview-start.png)

![Strategie-Artikel](docs/bilder/preview-artikel-strategie.png)

![Lesestrecke am Artikelende](docs/bilder/preview-artikel-lesestrecke.png)

![Psychologie-Artikel](docs/bilder/preview-artikel-psychologie.png)

## Tagebuch: wo die Daten liegen

- **Native App (Windows):** `%APPDATA%\de.evenacadia.ki-enzyklopaedie\tagebuch.json`,
  gelesen und geschrieben über eigene Tauri-Commands (`src-tauri/src/lib.rs`). Geschrieben
  wird atomar: erst `tagebuch.json.tmp` (mit fsync), dann Umbenennen — die Datei ist nie
  halb. Vor jedem Schreiben wird die bisherige Fassung als **`tagebuch.bak.json`** im
  selben Ordner abgelegt (nur, wenn sie gültiges JSON ist). Eine Datei, die sich kopieren
  und sichern lässt; Format
  `{ "version": 1, "tage": { "YYYY-MM-DD": { text, markiert, ereignis, geaendert } } }`.
  Die Seitenleiste zeigt den Pfad als Tooltip der Fußzeile.
- **Browser (Preview):** localStorage-Schlüssel `ki-enzyklopaedie.tagebuch.v1`.
- Ein Ladefehler (leere, defekte oder neuere Datei) sperrt das Schreiben und wird mit
  Hinweis auf die Sicherungskopie angezeigt — nie wird eine leere Kopie über echte Daten
  oder über die Sicherungskopie geschrieben. Nur eine fehlende Datei ist ein leeres Tagebuch.
- **Lesefortschritt:** localStorage-Schlüssel `ki-enzyklopaedie.gelesen.v1` (Liste von
  Artikel-IDs), im nativen Fenster im WebView2-Profil der App.

## Gestaltung

Farbwelt: das Windows-Terminal-Schema „Nakama Champagne Night“ des Dirigenten-
Terminals — Grund `#101010`, Champagner `#E0D0C0`, Gold `#D0B090`, Schattengrau
`#808090`, Auswahl `#504030`. Schrift: Geist (Lesetext) und Geist Mono (Bedienung,
Zahlen, Beschriftungen), lokal gebündelt (`@fontsource-variable`). Alle Werte in
`src/styles.css` unter `:root`.

## Entwicklung

```bash
npm install
npm run dev          # Vite unter http://localhost:5173
npm test             # Vitest (Logik, Bestand, Tagebuch, Verdrahtung)
npm run lint         # ESLint
npm run build        # tsc --noEmit + vite build → dist/
npm run tauri:dev    # natives Fenster gegen den Dev-Server
npm run tauri:build  # Windows-Installer (NSIS) + .exe unter src-tauri/target/release/
npm run nativ:beweis # startet die gebaute .exe, schreibt einen Tagebuch-Eintrag, prüft tagebuch.json, Screenshots nach docs/bilder/
```

Voraussetzungen für die native App: Rust-Toolchain (≥ 1.77) und die Tauri-2-
Voraussetzungen für Windows (WebView2 ist auf Windows 11 vorhanden). Der native Beweis
sichert die echte `tagebuch.json` vorher und spielt sie danach byte-genau zurück.

## Inhalt aktualisieren

**Akademie-Teil:**

```bash
# Im Akademie-Repo müssen die Abhängigkeiten installiert sein (npm ci).
npm run inhalt:export -- "<Pfad zum Akademie-Repo>"
npm test
```

Ohne Pfad wird `../Projekte/Vorbereitung Probetag Avarno` angenommen. Der Export
schreibt `src/inhalt/artikel.json` mit `meta.quelle` = Akademie-Commit.

**Eigene Sammlungen:** Artikel direkt in `src/inhalt/sammlungen/<sammlung>/block-*.ts`
schreiben (Typ `EigenerArtikel` in `src/inhalt/typen.ts`; nur `abschnitte`, der flache
Rumpf wird abgeleitet), dann `npm test`. Der Load-Guard in `src/inhalt/index.ts` bricht
laut bei toten Querverweisen, unbelegten Artikeln oder unbekannten Themen/Sammlungen —
Build und Tests schlagen dann fehl, statt dass die Oberfläche ins Leere zeigt.
Zeitschriftenquellen als DOI-Link (`https://doi.org/…`) angeben; die Metadaten lassen
sich über die Crossref-API (`https://api.crossref.org/works/<DOI>`) prüfen, auch wenn die
Verlagsseite Abrufe per Skript blockiert.

## Aufbau

```
src/inhalt/      artikel.json (Akademie-Export) · sammlungen/ (eigene Sammlungen, vereinige) · typen.ts · index.ts (Load-Guard, Register, Rückverweise)
src/tagebuch/    modell.ts (Kalender-Arithmetik, KW, Fragen, Jahresbilanz, Datenformat) · speicher.ts (Datei/Browser) · zustand.ts (verzögerte Sicherung) · suche.ts · export.ts (Markdown)
src/suche/       Suche mit Faltung, Ranking, Snippets, Hervorhebung
src/komponenten/ Kopf (Bereichs-Umschalter) · Seitenleiste · ArtikelAnsicht (mit Lesestrecke) · Start (mit Weiterlesen) · NichtGefunden · TagebuchLeiste (Suche, Kalender, Jahr, Fragen, Export) · TagebuchAnsicht · Markiert
src/router.ts    Hash-Router (#/, #/artikel/<id>, #/tagebuch[/<datum>])
src/einstellungen.ts  Schriftgröße + Register-Modus (localStorage)
src/lesefortschritt.ts  gelesene Artikel (localStorage)
src-tauri/       dünne Tauri-2-Hülle (ein Fenster, Opener-Plugin für Quellen-Links, Dialog-Plugin für den Export, Window-State-Plugin, eigene Commands für tagebuch.json mit Sicherungskopie)
scripts/         export-aus-akademie.mts · gen-icon.mjs · nativ-beweis.mjs
docs/            NEXT-SESSION.md (Übergabe) · bilder/ (Screenshots)
```
