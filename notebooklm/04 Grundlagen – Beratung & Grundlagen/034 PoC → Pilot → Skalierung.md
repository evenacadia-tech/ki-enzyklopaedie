# PoC → Pilot → Skalierung

Der stufenweise Weg vom Machbarkeitsnachweis zum Rollout — jede Stufe ein Entscheidungs-Gate, das vor „PoC-Purgatory" schützt.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: PoC, Proof of Concept, Pilot, Skalierung, MVP.

## Worum es geht

Der Stufenweg senkt das Risiko schrittweise (de-risking): Jede Stufe beantwortet eine andere Frage, und erst wenn die Antwort trägt, fließt mehr Geld in die nächste. Der Machbarkeitsnachweis (proof of concept, PoC) belegt mit wenig Aufwand, dass die Kernannahme grundsätzlich funktioniert, etwa dass ein Modell eingehende Dokumente mit brauchbarer Genauigkeit einordnet. Er soll eng begrenzt bleiben und braucht noch keine Anbindung an den laufenden Betrieb. Der Pilot erprobt die Lösung dann unter realen Bedingungen mit echten Nutzern. Die Skalierung schließlich rollt sie breit und betriebsfest aus: mit Zuständigen, Unterstützung, Überwachung und einem Weg zurück, falls das System versagt.

Warum der Pilot eine eigene Stufe ist, begründet das Risikomanagement-Rahmenwerk des US-amerikanischen Standardisierungsinstituts NIST (AI RMF 1.0, 2023): Messungen im Labor oder in einer kontrollierten Umgebung liefern vor dem Einsatz wichtige Erkenntnisse, können sich aber von den Risiken unterscheiden, die im realen Betrieb entstehen. Zu den Aufgaben beim Einsatz zählt NIST ausdrücklich das Pilotieren, die Prüfung der Verträglichkeit mit Altsystemen, die Einhaltung von Vorschriften, das Management der organisatorischen Veränderung und die Bewertung der Nutzererfahrung. Für den Betrieb sieht das Rahmenwerk Mechanismen und klare Zuständigkeiten vor, um ein System abzulösen oder abzuschalten, wenn es sich anders verhält als vorgesehen.

## Tore mit Zähnen

Die Idee der Entscheidungstore stammt aus der Produktentwicklung. Robert Cooper hat sie als Stage-Gate-Prozess bekannt gemacht und 2008 im Journal of Product Innovation Management den Stand zusammengefasst: Zwischen den Stufen liegen Tore, an denen klar benannte Entscheider (gatekeepers) anhand vorher definierter Erfolgskriterien und Bewertungsbögen entscheiden. Cooper fordert „Tore mit Zähnen“ (gates with teeth), also Tore, deren Entscheidungen tatsächlich Folgen haben. Zugleich betont er, dass der Prozess weder linear noch starr gemeint ist und sich auf Art und Größe eines Vorhabens zuschneiden lässt.

Genau hier entsteht die Gefahr, die im Beratungsjargon „PoC-Purgatory“ heißt, das Fegefeuer der Machbarkeitsnachweise: Ein Versuch folgt dem nächsten, keiner wird beendet, keiner geht in Betrieb. Die Ursache sind Tore ohne Zähne. Wenn niemand vorab festgelegt hat, woran Erfolg gemessen wird, wer entscheidet und bis wann, lässt sich ein Pilot beliebig verlängern. Das Gegenmittel ist unspektakulär: Kriterien, Entscheider und Termin werden vor dem Start aufgeschrieben, und am Tor gibt es drei zulässige Antworten, nämlich weitermachen, anpassen oder beenden. Auch NIST nennt ausdrückliche Verfahren für solche Entscheidungen über Inbetriebnahme und Einsatz als Nutzen seines Rahmenwerks.

## Im Beratungsalltag

Ein Hersteller von Industriearmaturen mit 400 Beschäftigten will Reklamationen mit KI vorsortieren, damit sie schneller beim richtigen Team landen. Der PoC dauert wenige Wochen: Mit anonymisierten Reklamationen der Vergangenheit wird geprüft, ob ein Modell die Kategorien zuverlässig genug erkennt. Die geforderte Trefferquote und die Kategorien, bei denen Fehler besonders teuer wären, stehen vorher fest. Ein Fehlschlag wäre an dieser Stelle billig: Er hätte einige Wochen gekostet, keinen Rollout. Der PoC besteht, und das Tor öffnet sich für einen Piloten, nicht für den Rollout.

Der Pilot läuft in einem Team, das den typischen Alltag abbildet, nicht im am besten ausgestatteten. Echte Reklamationen gehen ein, jede Einordnung wird von einem Menschen bestätigt oder korrigiert. Gemessen werden Durchlaufzeit, Korrekturen, Rückfragen und die Belastung des Teams. Dabei zeigt sich, dass das Warenwirtschaftssystem die Kategorien anders benennt und eine Schnittstelle fehlt. Am zweiten Tor lautet die Entscheidung „anpassen“: Schnittstelle bauen, Kategorien angleichen, dann eine zweite Pilotwelle. Erst danach folgen die übrigen Standorte, mit einer benannten Verantwortlichen im Fachbereich, einem regelmäßigen Überwachungsbericht und einem festgelegten Rückweg zur Sortierung von Hand.

## Grenzen und Kritik

Stufen kosten Zeit, und Tore können zur Bürokratie werden. Cooper selbst nennt die Überbürokratisierung des Prozesses als typische Schwierigkeit und empfiehlt schlankere Tore. Robert Cooper und Anita Sommer (Journal of Product Innovation Management, 2016) beschreiben die Verbindung der Tore mit agilen Methoden, also kurzen Arbeitszyklen mit häufiger Rückmeldung, als vielversprechend, betonen aber, dass die Belege dafür noch begrenzt sind. Für KI-Vorhaben passt diese Richtung: Innerhalb einer Stufe darf schnell und in Schleifen gearbeitet werden, an den Toren wird trotzdem entschieden.

Zweitens passt das Schema nicht immer eins zu eins. Bei zugekaufter Standardsoftware ist die Frage, ob die Technik grundsätzlich funktioniert, weniger offen als bei einer Eigenentwicklung; der PoC prüft dann vor allem die Passung zu den eigenen Daten und Abläufen und rückt nahe an den Piloten. Drittens kann ein Pilot zu gut aussehen, wenn er mit dem motiviertesten Team und besonders viel Unterstützung läuft; deshalb gehört ein repräsentativer Einsatzort zu den Kriterien. Und ein bestandener Pilot beweist nicht, dass der Nutzen in der Breite bleibt. Auch nach der Skalierung braucht es Messung und die Bereitschaft, ein System zu verändern oder abzuschalten.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Use-Case-Priorisierung**: Nicht jeder denkbare Anwendungsfall ist ein guter erster — die Auswahl folgt einer nachvollziehbaren Matrix statt dem Bauchgefühl.
- **Business-Case, TCO & ROI**: Der Nutzen einer KI-Lösung wird nicht gegen den Lizenzpreis gerechnet, sondern gegen die vollen Lebenszykluskosten.

## Quellen

- NIST — Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (National Institute of Standards and Technology, 2023). https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf (abgerufen am 28.09.2026)
- Cooper — Perspective: The Stage-Gate Idea-to-Launch Process — Update, What’s New, and NexGen Systems (Journal of Product Innovation Management 25(3), 2008). https://doi.org/10.1111/j.1540-5885.2008.00296.x (abgerufen am 28.09.2026)
- Cooper & Sommer — The Agile–Stage-Gate Hybrid Model: A Promising New Approach and a New Research Opportunity (Journal of Product Innovation Management 33(5), 2016). https://doi.org/10.1111/jpim.12314 (abgerufen am 28.09.2026)
