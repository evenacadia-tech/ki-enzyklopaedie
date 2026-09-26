# KI-Enzyklopädie

Reine Lese-App: quellenbelegte, quervernetzte Artikel zu KI-Consulting, EU AI Act,
Governance & Zertifizierung, Fallbeispielen sowie KI-Ethik und Verhaltensforschung.
56 Artikel, 118 Quellen, jede Quelle mit Abrufdatum. Kein Quiz, keine Karteikarten,
kein RAG, kein Konto — nur Nachschlagen.

Der Inhalt stammt aus dem Enzyklopädie-Bereich der Akademie-App
(`evenacadia-tech/probetag-akademie`) und wird von dort exportiert
(`scripts/export-aus-akademie.mts`). Die App selbst trägt nur das aufgelöste Ergebnis
(`src/inhalt/artikel.json`).

## Bedienung

| Was | Wie |
|---|---|
| Suchen | `/` springt ins Suchfeld; Titel, Synonyme und Fließtext, umlaut-tolerant (`bussgeld` findet „Bußgeld“) |
| Verzeichnis | Themen (Grundlagen nach Thema, Sammlungen in Lesereihenfolge) oder A–Z; `↑`/`↓` wandern, `Enter` öffnet |
| Lesen | Lede, Rumpf (bei langen Artikeln gegliedert, mit Inhaltsverzeichnis), „Siehe auch“, Quellen, „Verweist hierher“ |
| Schriftgröße | Kopfzeile rechts (Kompakt/Normal/Groß), wird lokal gemerkt |
| Deep-Link | `#/artikel/<id>`, z. B. `#/artikel/rag` |

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
npm test             # Vitest (Logik, Bestand, Verdrahtung)
npm run lint         # ESLint
npm run build        # tsc --noEmit + vite build → dist/
npm run tauri:dev    # natives Fenster gegen den Dev-Server
npm run tauri:build  # Windows-Installer (NSIS) + .exe unter src-tauri/target/release/
```

Voraussetzungen für die native App: Rust-Toolchain (≥ 1.77) und die Tauri-2-
Voraussetzungen für Windows (WebView2 ist auf Windows 11 vorhanden).

## Inhalt aktualisieren

```bash
# Im Akademie-Repo müssen die Abhängigkeiten installiert sein (npm ci).
npm run inhalt:export -- "<Pfad zum Akademie-Repo>"
npm test
```

Ohne Pfad wird `../Projekte/Vorbereitung Probetag Avarno` angenommen. Der Export
schreibt `src/inhalt/artikel.json` mit `meta.quelle` = Akademie-Commit. Der
Load-Guard in `src/inhalt/index.ts` bricht laut bei toten Querverweisen,
unbelegten Artikeln oder unbekannten Themen/Sammlungen — Build und Tests
schlagen dann fehl, statt dass die Oberfläche ins Leere zeigt.

## Aufbau

```
src/inhalt/      artikel.json (Bestand) · typen.ts (Vertrag) · index.ts (Load-Guard, Register, Rückverweise)
src/suche/       Suche mit Faltung, Ranking, Snippets, Hervorhebung
src/komponenten/ Kopf · Seitenleiste (Suche + Register) · ArtikelAnsicht · Start · NichtGefunden
src/router.ts    Hash-Router (#/, #/artikel/<id>)
src/einstellungen.ts  Schriftgröße + Register-Modus (localStorage)
src-tauri/       dünne Tauri-2-Hülle (ein Fenster, Opener-Plugin für Quellen-Links)
scripts/         export-aus-akademie.mts · gen-icon.mjs
```
