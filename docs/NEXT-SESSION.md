# Übergabe an die nächste Sitzung

Stand: 2026-09-26 (Abend). Beide Aufträge des Tages sind umgesetzt und geprüft.

## Was heute entstanden ist

1. **Sammlung „Strategie — Grundlagen“** (29 Artikel, 115 Quellen, ~19.900 Wörter) als
   eigene, handgepflegte Inhaltsquelle unter `src/inhalt/sammlungen/strategie/` in fünf
   Blöcken (Was Strategie ist · Umfeld und Branche · Geschäftsmodell und Kunde · Umsetzen
   und messen · Beraterhandwerk). Zusammenführung mit dem Akademie-Export in
   `src/inhalt/sammlungen/index.ts` (`vereinige`), gemeinsamer Load-Guard. Neues Thema
   `strategie` („Unternehmensstrategie“); die Handwerks-Artikel tragen `beratung-grundlagen`.
   Alle Quellen am 2026-09-26 per Abruf geprüft; nicht erreichbare Seiten (McKinsey) wurden
   bewusst NICHT zitiert. Eine Quelle ist ein Digitalisat auf archive.org (Ansoff 1957,
   im Quellentitel so bezeichnet).
2. **Tagebuch mit Kalender**: `src/tagebuch/` (Modell, Speicher, Zustand),
   `TagebuchLeiste`/`TagebuchAnsicht`, Bereichs-Umschalter im Kopf, Routen
   `#/tagebuch[/<datum>]`. Nativ: `tagebuch.json` im App-Datenordner über
   `tauri-plugin-store` 2.4.5 (Capability `store:default`); Browser: localStorage.
3. Werkzeug `npm run nativ:beweis` (`scripts/nativ-beweis.mjs`, puppeteer-core über den
   WebView2-Debug-Port): startet die gebaute .exe, schreibt einen Eintrag, prüft die
   JSON-Datei, Screenshots nach `docs/bilder/`, spielt die echte Datei danach zurück.

## Prüfstand

`npm test` (60 Tests) · `npm run lint` · `npm run build` grün. Screenshots des Web-Previews
in `docs/bilder/preview-*.png`. Nativer Beweis am 2026-09-26 20:29 bestanden
(`npm run nativ:beweis` gegen die frisch gebaute .exe): Eintrag + Ereignis-Markierung
standen byte-genau in `%APPDATA%\de.evenacadia.ki-enzyklopaedie	agebuch.json`, UI meldete
„Gespeichert 20:29“; Screenshots `docs/bilder/nativ-*.png`. Die Tagebuch-Datei des Users
existierte vorher nicht und wurde danach wieder entfernt.

## Fallen, die heute gebissen haben

- Eine laufende Instanz der alten .exe (vom Nachmittag) sperrte
  `src-tauri/target/release/ki-enzyklopaedie.exe`: `cargo build` und `tauri build`
  meldeten „Zugriff verweigert“, aber `tauri build` endete trotzdem mit Exit-Code 0.
  Vor jedem nativen Build prüfen: `Get-Process ki-enzyklopaedie`. Außerdem hängt sich eine
  zweite Instanz an den WebView2-Browserprozess der ersten — der Debug-Port des nativen
  Beweises ist dann nicht erreichbar.
- Solange eine Block-Datei fehlt, auf die eine andere verweist, bricht die gesamte
  Testsuite am Load-Guard (gewollt). Erst alle Blöcke, dann testen.
- Lange TS-Dateien nicht per Bash-Heredoc schreiben (Shell-Parser), sondern mit dem
  Write-Tool.

## Offen / Ideen (nicht beauftragt)

- Weitere Strategie-Blöcke wären möglich (z. B. Preisstrategie, Partnerschaften/M&A,
  Wardley Maps). Erst nach Rücksprache: Was sieht der User in den Meetings?
- Tagebuch-Export als Markdown/Text (Sicherung außerhalb von AppData) — nicht beauftragt.
- Ein `preflight`-Backup der `tagebuch.json` (z. B. tägliche Kopie) — nicht beauftragt.
