# NIST AI Risk Management Framework

Das freiwillige US-Rahmenwerk für KI-Risikomanagement, strukturiert um vier Kernfunktionen und sieben Vertrauensmerkmale.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Governance & Zertifizierung“. Auch bekannt als: AI RMF, NIST, Govern Map Measure Manage.

## Worum es geht

Das National Institute of Standards and Technology (NIST), eine Behörde des US-Handelsministeriums, hat das AI Risk Management Framework am 26. Januar 2023 als Fassung 1.0 veröffentlicht; die Dokumentnummer lautet NIST AI 100-1. Es entstand in einem offenen Verfahren mit öffentlicher Informationsanfrage, mehreren Entwürfen zur Kommentierung und Workshops. Nach NIST ist es für die freiwillige Nutzung gedacht und soll Organisationen helfen, Vertrauenswürdigkeit bei Entwurf, Entwicklung, Nutzung und Bewertung von KI-Produkten, -Diensten und -Systemen zu berücksichtigen. Es ist kein Gesetz und begründet in der EU keine Pflicht. Stand September 2026 gilt die Fassung 1.0; NIST gibt an, sie werde im Rahmen des KI-Aktionsplans des Weißen Hauses überarbeitet.

## Vier Funktionen

Den Kern bilden vier Funktionen. Govern (Leitung und Steuerung) baut eine Kultur des Risikomanagements auf und legt Richtlinien, Prozesse und Verantwortlichkeiten fest; dazu gehört, dass rechtliche und regulatorische Anforderungen an KI verstanden, gesteuert und dokumentiert sind. Map (Erfassen) klärt den Kontext: beabsichtigte Zwecke, Nutzer, geltende Gesetze und Normen, mögliche positive und negative Wirkungen. Measure (Messen) wählt Methoden und Kennzahlen, beginnend mit den bedeutendsten Risiken, und dokumentiert ausdrücklich, was sich nicht messen lässt. Manage (Behandeln) priorisiert die Risiken, reagiert auf sie und entscheidet auch, ob Entwicklung oder Einsatz eines Systems überhaupt weitergehen sollen. Govern ist als Querschnittsfunktion angelegt, die in die anderen drei hineinwirkt. Eine feste Reihenfolge gibt es nicht; nach Govern beginnen die meisten Nutzer mit Map, und der Prozess soll iterativ laufen.

## Sieben Merkmale vertrauenswürdiger KI

Woran sich Vertrauenswürdigkeit bemisst, beschreibt das Rahmenwerk mit sieben Merkmalen: valide und zuverlässig (valid and reliable), betriebssicher (safe), angriffssicher und widerstandsfähig (secure and resilient), rechenschaftspflichtig und transparent (accountable and transparent), erklärbar und interpretierbar (explainable and interpretable), datenschutzfördernd (privacy-enhanced) sowie fair mit beherrschtem schädlichem Bias (fair with harmful bias managed). Valide und zuverlässig ist die notwendige Bedingung und bildet in der Darstellung von NIST die Basis der übrigen; rechenschaftspflichtig und transparent steht quer zu allen anderen. Die Merkmale müssen gegeneinander abgewogen werden: Interpretierbarkeit kann mit Datenschutz kollidieren, Vorhersagegenauigkeit mit Interpretierbarkeit. Kennzahlen und Schwellenwerte soll menschliches Urteil im Kontext festlegen, und Vertrauenswürdigkeit ist nach NIST nur so stark wie ihr schwächstes Merkmal.

Für generative KI hat NIST am 26. Juli 2024 ein eigenes Profil veröffentlicht, NIST AI 600-1. Es beschreibt zwölf Risiken, die generative KI neu schafft oder verschärft, darunter Konfabulation (confabulation), also selbstsicher formulierte, aber falsche Inhalte, umgangssprachlich Halluzinationen genannt, dazu Datenschutz, Informationssicherheit, schädlichen Bias und ein problematisches Zusammenspiel von Mensch und KI wie Automatisierungsvertrauen (automation bias) und übermäßige Abhängigkeit. Das Profil versteht sich als Begleitdokument zum AI RMF 1.0, nicht als eigenes Rahmenwerk: Jedes Risiko ist den Vertrauensmerkmalen zugeordnet, und die vorgeschlagenen Maßnahmen sind nach den Unterkategorien der vier Funktionen geordnet.

## Im Beratungsalltag

Ein Stadtwerk mit 300 Beschäftigten will einen Chatbot für Kundenanfragen zu Tarifen und Abschlägen einführen. Die Beraterin beginnt mit Govern: Wer entscheidet über den Start, welches Risiko ist hinnehmbar, welche Vorschriften gelten, und wer ist zuständig, wenn der Bot falsche Auskünfte gibt? Map beschreibt die Lage: Kunden fragen nach Geld, und eine falsche Angabe zu Abschlägen erzeugt Beschwerden. Measure baut einen Testsatz aus echten, anonymisierten Anfragen und misst, wie oft der Bot falsche Tarifangaben macht; was sich nicht messen lässt, etwa die Wirkung auf ältere Kunden, wird ausdrücklich notiert. Manage entscheidet: Start nur mit Übergabe an einen Menschen bei Vertragsfragen und mit einem Verfahren für gemeldete Fehler. Die Risikoliste des Profils für generative KI dient als Prüfliste, damit nichts übersehen wird.

## Grenzen und Kritik

Das Rahmenwerk beschreibt, wie eine Organisation mit KI-Risiken umgehen kann, nicht, was ein Gesetz verlangt. Wer in der EU KI anbietet oder einsetzt, unterliegt der europäischen KI-Verordnung; das AI RMF kann die Arbeit dafür ordnen, etwa über Govern, das rechtliche Anforderungen erfassen lässt, ersetzt sie aber nicht. Zweitens ist es bewusst offen formuliert. Kennzahlen, Schwellenwerte und Abwägungen überlässt es dem Urteil der Anwender; zwei Organisationen können sich auf das AI RMF berufen und sehr Verschiedenes tun. Drittens ist sein Inhalt politisch nicht fest. Der KI-Aktionsplan des Weißen Hauses vom Juli 2025 fordert, das Rahmenwerk so zu überarbeiten, dass Bezüge zu Fehlinformation (misinformation), zu Vielfalt, Gleichberechtigung und Inklusion (diversity, equity and inclusion) sowie zum Klimawandel entfallen. Wer sich auf das AI RMF beruft, sollte deshalb angeben, welche Fassung gemeint ist.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **ISO/IEC 42001 (AIMS)**: Die erste zertifizierbare Norm für ein KI-Managementsystem — der „ISO 27001 für KI" und das Rückgrat nachweisbarer KI-Governance.
- **EU-HLEG: vertrauenswürdige KI**: Die konzeptuelle Grundlage vieler späterer Regeln: die sieben Anforderungen der EU-Expertengruppe an vertrauenswürdige KI von 2019.

## Quellen

- NIST — AI Risk Management Framework (National Institute of Standards and Technology, Stand 2026). https://www.nist.gov/itl/ai-risk-management-framework (abgerufen am 28.09.2026)
- NIST — AI RMF 1.0 (NIST AI 100-1), Abschnitt 5: AI RMF Core (Trustworthy and Responsible AI Resource Center, 2023). https://airc.nist.gov/airmf-resources/airmf/5-sec-core/ (abgerufen am 28.09.2026)
- NIST — AI RMF 1.0 (NIST AI 100-1), Abschnitt 3: AI Risks and Trustworthiness (Trustworthy and Responsible AI Resource Center, 2023). https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/ (abgerufen am 28.09.2026)
- Autio, Schwartz, Dunietz, Jain, Stanley, Tabassi, Hall & Roberts — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (NIST, 2024). https://doi.org/10.6028/NIST.AI.600-1 (abgerufen am 28.09.2026)
- The White House — Winning the Race: America’s AI Action Plan (The White House, 2025). https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf (abgerufen am 28.09.2026)
