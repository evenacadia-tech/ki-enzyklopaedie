# KI-Enzyklopädie

Lese-App mit Tagebuch: quellenbelegte, quervernetzte Artikel zu KI-Consulting, EU AI Act,
Governance & Zertifizierung, Fallbeispielen, KI-Ethik und Verhaltensforschung — und eine
eigene Lesestrecke **Strategie — Grundlagen** für den Einstieg in Unternehmensstrategie
und Beraterhandwerk. 85 Artikel, 232 Quellen, jede Quelle mit Abrufdatum. Dazu ein
persönliches Tagebuch mit Kalender. Kein Quiz, kein RAG, kein Konto.

Zwei Inhaltsquellen:

- **Akademie-Export** (56 Artikel): der Enzyklopädie-Bereich der Akademie-App
  (`evenacadia-tech/probetag-akademie`), exportiert über `scripts/export-aus-akademie.mts`
  nach `src/inhalt/artikel.json`.
- **Eigene Sammlungen** (29 Artikel): von Hand gepflegte Artikel unter
  `src/inhalt/sammlungen/`, derzeit `strategie/` in fünf Blöcken (Was Strategie ist ·
  Umfeld und Branche analysieren · Geschäftsmodell und Kunde · Umsetzen und messen ·
  Beraterhandwerk). Jeder Artikel: 3–4 Abschnitte, 2–5 geprüfte Primärquellen, ein
  Beispiel aus dem Alltag einer kleinen KI-Beratung, ein Abschnitt „Grenzen und Kritik“.

Beide Quellen laufen durch denselben Load-Guard; Querverweise zeigen in beide Richtungen.

## Bedienung

| Was | Wie |
|---|---|
| Bereich | Kopfzeile rechts: **Enzyklopädie** oder **Tagebuch** |
| Suchen | `/` springt ins Suchfeld; Titel, Synonyme und Fließtext, umlaut-tolerant (`bussgeld` findet „Bußgeld“) |
| Verzeichnis | Themen (Grundlagen nach Thema, Sammlungen in Lesereihenfolge) oder A–Z; `↑`/`↓` wandern, `Enter` öffnet |
| Lesen | Lede, Rumpf (bei langen Artikeln gegliedert, mit Inhaltsverzeichnis), „Siehe auch“, Quellen, „Verweist hierher“ |
| Tagebuch | Tag im Kalender anklicken, schreiben — gespeichert wird von selbst (500 ms nach der letzten Änderung, sofort beim Verlassen); `Ctrl+S` erzwingt es. „Besonderes Ereignis“ markiert den Tag gold und gibt ihm eine Bezeichnung. Pfeiltasten wandern im Kalender, `Heute` springt zurück |
| Schriftgröße | Kopfzeile rechts (Kompakt/Normal/Groß), gilt für Lesetext und Tagebuch, wird lokal gemerkt |
| Deep-Link | `#/artikel/<id>` (z. B. `#/artikel/strategie-begriff`), `#/tagebuch` (heute), `#/tagebuch/2026-09-26` |

![Tagebuch](docs/bilder/preview-tagebuch.png)

![Strategie-Artikel](docs/bilder/preview-artikel-strategie.png)

## Tagebuch: wo die Daten liegen

- **Native App (Windows):** `%APPDATA%\de.evenacadia.ki-enzyklopaedie\tagebuch.json`,
  geschrieben über das Tauri-Store-Plugin. Eine Datei, die sich kopieren und sichern
  lässt; Format `{ "version": 1, "tage": { "YYYY-MM-DD": { text, markiert, ereignis, geaendert } } }`.
  Die Seitenleiste zeigt den Pfad als Tooltip der Fußzeile.
- **Browser (Preview):** localStorage-Schlüssel `ki-enzyklopaedie.tagebuch.v1`.
- Ein Ladefehler (defekte oder neuere Datei) sperrt das Schreiben und wird angezeigt —
  nie wird eine leere Kopie über echte Daten geschrieben.

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

**Eigene Sammlungen:** Artikel direkt in `src/inhalt/sammlungen/strategie/block-*.ts`
schreiben (Typ `EigenerArtikel` in `src/inhalt/typen.ts`; nur `abschnitte`, der flache
Rumpf wird abgeleitet), dann `npm test`. Der Load-Guard in `src/inhalt/index.ts` bricht
laut bei toten Querverweisen, unbelegten Artikeln oder unbekannten Themen/Sammlungen —
Build und Tests schlagen dann fehl, statt dass die Oberfläche ins Leere zeigt.

## Aufbau

```
src/inhalt/      artikel.json (Akademie-Export) · sammlungen/ (eigene Sammlungen, vereinige) · typen.ts · index.ts (Load-Guard, Register, Rückverweise)
src/tagebuch/    modell.ts (Kalender-Arithmetik, Datenformat) · speicher.ts (Datei/Browser) · zustand.ts (verzögerte Sicherung)
src/suche/       Suche mit Faltung, Ranking, Snippets, Hervorhebung
src/komponenten/ Kopf (Bereichs-Umschalter) · Seitenleiste · ArtikelAnsicht · Start · NichtGefunden · TagebuchLeiste · TagebuchAnsicht
src/router.ts    Hash-Router (#/, #/artikel/<id>, #/tagebuch[/<datum>])
src/einstellungen.ts  Schriftgröße + Register-Modus (localStorage)
src-tauri/       dünne Tauri-2-Hülle (ein Fenster, Opener-Plugin für Quellen-Links, Store-Plugin für das Tagebuch)
scripts/         export-aus-akademie.mts · gen-icon.mjs · nativ-beweis.mjs
docs/            NEXT-SESSION.md (Übergabe) · bilder/ (Screenshots)
```
