# Übergabe an die nächste Sitzung

Stand: 2026-09-26 (spät). Auftrag des Abends: Strategiebereich ausbauen, Fokus
Psychologie — umgesetzt als zweite eigene Sammlung.

## Was heute entstanden ist

1. **Sammlung „Psychologie für Strategie und Beratung“** (26 Artikel, 119 Quellenangaben,
   ~19.000 Wörter) unter `src/inhalt/sammlungen/psychologie/` in vier Blöcken, alle
   gleich gewichtet (User-Entscheid 26.09.2026): 1 Denken und Entscheiden (Behavioral
   Strategy, zwei Systeme/Heuristiken, Prospect Theory, Anker/Bestätigung, Sunk Cost,
   Status quo/Default, Intuition/Expertise) · 2 Menschen im Gespräch (Cialdini,
   Wärme/Kompetenz/Halo, Vertrauensmodell, aktives Zuhören, Verhandeln, Rat/Reaktanz) ·
   3 Gruppen, Führung, Veränderung (Gruppendenken/Konformität, psychologische Sicherheit,
   Motivation, Widerstand, Macht/Mikropolitik, Führung/EI, Organisationskultur) ·
   4 Kunde, Markt, Technikakzeptanz (Nudge, Preispsychologie, TAM/UTAUT,
   Algorithmus-Aversion/Automation Bias, Diffusion, Abschluss „Befunde richtig lesen“).
   Neues Thema `psychologie`. Querverweise in beide Richtungen: aus Strategie-Artikeln
   (Entscheidungen prüfen, Beratungsgespräch, Ziele/OKR, Umsetzung, KI-Strategie) und zu
   Akademie-Artikeln (change-management, nudging-autonomie-empfehlungssysteme,
   persuasion-dark-patterns, mensch-ki-verhalten, sycophancy-artikel, halluzination …).
2. **Quellenprüfung**: 116 von 125 Kandidaten im ersten Lauf bestätigt (DOI-Metadaten
   über Crossref; Webseiten per Abruf), neun ersetzt oder gestrichen (McKinsey,
   HarperCollins, Macmillan, Simon & Schuster, utb: 403; Google re:Work: 404). Skripte
   liegen nicht im Repo (Scratch); das Verfahren steht in `CLAUDE.md` und README.
3. **Bugfix A–Z-Register**: Umlaut-Titel („Überzeugen …“) bildeten eine eigene Ü-Gruppe,
   die die deutsche Sortierung zerriss (Test brach). Jetzt Grundbuchstabe (Ü → U,
   DIN 5007-1), mit Test.
4. **Neuer Test** „eigene Sammlungen (Autorenvertrag)“: 2–5 Quellen, ≥ 3 Abschnitte,
   Schluss „Grenzen und Kritik“/„Typische Fehler“, mindestens ein Querverweis — gilt
   für alle eigenen Sammlungen.

## Prüfstand

`npm test` (62 Tests) · `npm run lint` · `npm run build` grün. Screenshot des
Web-Previews: `docs/bilder/preview-artikel-psychologie.png` (Register mit beiden
Sammlungen + Artikel). Nativer Build heute NICHT neu erzeugt (nur Inhalt geändert,
keine Änderung an `src-tauri/`).

## Fallen, die heute bissen

- Der A–Z-Test prüft die Gruppenreihenfolge per `localeCompare('de')` — jede neue
  Sammlung mit Umlaut-Anfangstitel hätte ihn gebrochen; jetzt behoben (s. o.).
- Crossref liefert für JSTOR-DOIs alter AER-Jahrgänge 404 (Kahneman/Knetsch/Thaler 1986
  AER); Ausweich auf den Journal-of-Business-Artikel derselben Autoren (DOI vorhanden).
- Lange TS-Dateien nur über das Write-Tool schreiben (Bash-Heredoc-Falle bleibt).

## Offen / Ideen (nicht beauftragt)

- Weitere Strategie-Blöcke (Preisstrategie, Partnerschaften/M&A, Wardley Maps) — erst
  nach Rücksprache: Was sieht der User in den Meetings?
- Psychologie: mögliche Ergänzungen wären Stress/Belastung in Veränderungsprojekten,
  Kommunikation in Präsentationen (Aufmerksamkeit, Gedächtnis), kulturübergreifende
  Verhandlung — ebenfalls nur nach Rücksprache.
- Tagebuch-Export als Markdown/Text; `preflight`-Backup der `tagebuch.json`.
