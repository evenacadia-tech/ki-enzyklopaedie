# RAG (Retrieval-Augmented Generation)

Der wohl wichtigste Architektur-Baustein für seriöse Unternehmens-KI: Wissen zur Laufzeit dazuladen, statt es ins Modell zu trainieren.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: RAG, Retrieval Augmented Generation, Grounding.

## Herkunft und Grundidee

Der Begriff stammt aus einer Arbeit von Patrick Lewis und Kollegen, 2020 auf der Konferenz NeurIPS vorgestellt. Große vortrainierte Sprachmodelle, so ihr Ausgangspunkt, speichern Faktenwissen in ihren Parametern, können aber nur begrenzt gezielt darauf zugreifen, und offen sei, wie man ihre Aussagen belegt und ihr Wissen aktualisiert. Ihre Antwort verbindet zwei Gedächtnisse: ein parametrisches, das Sprachmodell selbst, und ein nicht-parametrisches, einen Vektorindex über die Wikipedia, den ein neuronaler Suchbaustein (retriever) durchsucht. Der Unterschied ist der zwischen dem, was jemand im Kopf hat, und einem Nachschlagewerk auf dem Tisch. Die Modelle erreichten auf drei Aufgaben der offenen Fragebeantwortung den damaligen Bestwert und formulierten spezifischer, vielfältiger und sachlich richtiger als ein Vergleichsmodell ohne Nachschlagen.

Wie sich Wissen so auswechseln lässt, zeigten die Autoren an einem Versuch: Sie fragten nach 82 Staats- und Regierungschefs, die zwischen Dezember 2016 und Dezember 2018 gewechselt hatten, etwa „Wer ist der Präsident von Peru?“. Mit einem Wikipedia-Index vom jeweils passenden Stand antwortete das System in 70 beziehungsweise 68 Prozent der Fälle richtig, mit dem unpassenden nur in 12 beziehungsweise 4 Prozent; um das Wissen zu aktualisieren, genügte es, den Index zu tauschen. Ein Unterschied zum heutigen Gebrauch ist allerdings wichtig: Lewis und Kollegen trainierten Suchbaustein und Sprachmodell gemeinsam auf ihre Aufgaben nach. In Unternehmensanwendungen, wie IBM und die Datenschutzkonferenz des Bundes und der Länder (DSK) sie beschreiben, bleibt das Sprachmodell dagegen unverändert. Die DSK hält in ihrer Orientierungshilfe vom Oktober 2025 fest, dass die erweiterte Anfrage jedes Mal neu aus der Datenquelle gebildet wird und das Modell nicht verändert.

## Der Ablauf

Die DSK beschreibt den verbreiteten Aufbau mit Vektordatenbank in zwei Phasen. Vor der Nutzung werden die Referenzdokumente aufbereitet: Störendes wie Kopf- und Fußzeilen oder Seitenzahlen wird entfernt, der Text in kürzere Abschnitte (chunks) geteilt, jeder Abschnitt von einem Embedding-Modell in einen Vektor übersetzt und mit dem Text gespeichert. Bei der Nutzung wird die Frage mit demselben Modell in einen Anfragevektor übersetzt, der Suchbaustein holt die Abschnitte mit dem geringsten Abstand, die Frage wird um sie ergänzt, und das Sprachmodell formuliert die Antwort. Im Idealfall stammt das Faktenwissen vollständig aus den Dokumenten und das Modell steuert nur die Sprache bei; die DSK merkt an, dass das technisch nicht immer gelingt. Die Aufteilung ist kein Nebenschritt: Gleich große Abschnitte mit fester Zeichenzahl können Sinnzusammenhänge zerreißen, und für deutsche Dokumente sollte das Embedding-Modell mit deutschen Texten trainiert sein.

## Was RAG leistet

Internes und aktuelles Wissen wird nutzbar, ohne das Modell neu zu trainieren; nach IBM können Unternehmen so eigene, verlässliche Datenquellen einsetzen. Antworten lassen sich mit Fundstellen versehen, die Nutzer selbst nachprüfen. Das Risiko von Halluzinationen sinkt, weil die Antwort an abgerufenen Text gebunden ist; IBM hält aber ausdrücklich fest, dass RAG ein Modell nicht fehlerfrei machen kann. Die DSK nennt zwei weitere Vorteile. Einträge in der Vektordatenbank lassen sich gezielt aktualisieren und löschen, anders als Wissen in den Gewichten eines Modells. Und Zugriffsrechte lassen sich im Suchbaustein mit bewährten Mitteln durchsetzen, etwa mit einem Rollen- und Rechtekonzept und getrennten Bereichen je Abteilung, während sich im Sprachmodell selbst nicht steuern lässt, wer welche Information sehen darf.

## Im Beratungsalltag

Ein Stadtwerk mit 300 Beschäftigten will einen internen Assistenten für Dienstanweisungen, Tarifblätter und Betriebshandbücher. Die Beraterin beginnt nicht mit dem ganzen Bestand, sondern mit den Themen, zu denen im Kundenservice die meisten Rückfragen kommen. Die Dokumente werden bereinigt und entlang ihrer Überschriften aufgeteilt, Personalunterlagen kommen in einen eigenen Bereich, den nur die Personalabteilung durchsuchen darf. Jede Antwort zeigt ihre Fundstelle; findet die Suche nichts Passendes, sagt der Assistent, dass ihm dazu nichts vorliegt, statt zu raten. Exakte Werte wie aktuelle Tarifpreise holt er direkt aus dem Abrechnungssystem, statt sie aus einem Textabschnitt zu lesen. Gemessen wird der Pilot an einer Liste echter Fragen mit bekannter Antwort: Wie oft ist der richtige Abschnitt unter den Treffern, und wie oft stimmt die Antwort?

## Grenzen und Kritik

RAG ist nur so gut wie seine Quelle und seine Suche. Die Zuverlässigkeit hängt nach der DSK stark von Qualität, Aktualität und Vollständigkeit der Dokumente ab. Die Suche arbeitet mit inhaltlicher Nähe, und Gedankenketten, die sich über lange Passagen ziehen, stehen womöglich nicht im selben Abschnitt und kommen nur unvollständig beim Modell an. Zudem hält sich das Modell nicht immer an das Vorgelegte: Bei Widersprüchen kann es das Wissen aus seinen Trainingsdaten wiedergeben und die Dokumente übergehen. Ein rechtswidrig trainiertes Modell wird durch RAG nicht rechtmäßig.

Die zweite Grenze ist die Sicherheit. Weil RAG fremde Texte in die Anfrage einspeist, wird jedes Dokument zur möglichen Angriffsfläche. Die OWASP-Liste der Risiken für Sprachmodell-Anwendungen führt 2025 eigens Schwächen von Vektoren und Embeddings auf: unberechtigter Zugriff, das Durchsickern von Inhalten zwischen Nutzergruppen einer gemeinsamen Datenbank und vergiftete Inhalte. Ihr Beispiel ist ein Lebenslauf mit weißer Schrift auf weißem Grund, die ein Bewerbungssystem anweist, den Kandidaten zu empfehlen; das System liest die versteckte Anweisung mit und folgt ihr. Der Artikel über Prompt Injection beschreibt die Abwehr.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Embedding & Vektordatenbank**: Damit eine Maschine Bedeutung „vergleichen" kann, wird Text in Zahlenvektoren übersetzt — die Grundlage der Ähnlichkeitssuche und damit von RAG.
- **Fine-tuning**: Die zweite Art, ein Modell an eine Domäne anzupassen — anders als RAG verändert sie das Modell selbst. Die Abgrenzung ist eine der häufigsten Beratungsfragen.
- **Halluzination**: Das strukturelle Risiko jedes Sprachmodells — und der Grund, warum Grounding, Prüfschritte und ehrliche Nutzerhinweise keine Kür sind, sondern Pflicht.
- **Prompt Injection (OWASP LLM01)**: Das Top-Sicherheitsrisiko von LLM-Anwendungen: manipulierte Eingaben, die die eigentlichen Anweisungen des Modells überschreiben — besonders brisant für RAG und Agenten.

## Quellen

- Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (arXiv, 2020; NeurIPS 2020). https://arxiv.org/abs/2005.11401 (abgerufen am 28.09.2026)
- Belcic — What is RAG (retrieval augmented generation)? (IBM Think, 2024). https://www.ibm.com/think/topics/retrieval-augmented-generation (abgerufen am 28.09.2026)
- Datenschutzkonferenz — Orientierungshilfe zu datenschutzrechtlichen Besonderheiten generativer KI-Systeme mit RAG-Methode, Version 1.0 (DSK, Oktober 2025). https://www.datenschutzkonferenz-online.de/media/oh/DSK_OH_RAG.pdf (abgerufen am 28.09.2026)
- OWASP Gen AI Security Project — LLM08:2025 Vector and Embedding Weaknesses (OWASP Top 10 for LLM Applications, 2025). https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/ (abgerufen am 28.09.2026)
