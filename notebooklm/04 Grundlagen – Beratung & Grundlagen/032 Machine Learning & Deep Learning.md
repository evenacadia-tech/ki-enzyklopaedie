# Machine Learning & Deep Learning

Die Begriffe stapeln sich ineinander: Künstliche Intelligenz ist der Oberbegriff, Machine Learning und Deep Learning sind die Teilgebiete, auf denen die heutige generative KI aufsetzt.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: ML, DL, maschinelles Lernen, neuronale Netze.

## Drei Begriffe, ineinander geschachtelt

Zur Künstlichen Intelligenz gehören auch Systeme, deren Regeln ein Mensch von Hand geschrieben hat, etwa Expertensysteme, die mit einem großen, von Fachleuten programmierten Entscheidungsbaum bei einer Diagnose helfen. Maschinelles Lernen (machine learning) ist der Teil der KI, in dem diese Logik nicht programmiert, sondern aus Beispielen gewonnen wird. IBM beschreibt es als Algorithmen, die die Muster ihrer Trainingsdaten „lernen“ und daraus zutreffende Schlüsse über neue Daten ziehen. Das Beispiel dort ist ein Spamfilter: Regelbasierte KI braucht jemanden, der von Hand Kriterien für Spam festlegt; maschinelles Lernen braucht einen geeigneten Algorithmus und genügend Beispiel-E-Mails. Daraus folgt der Merksatz: Jedes maschinelle Lernen ist KI, aber nicht jede KI ist maschinelles Lernen.

Was „lernen“ heißt, zeigt ein zweites Beispiel von IBM. Ein Modell schätzt den Preis eines Hauses aus Wohnfläche, Zimmerzahl und Alter, indem es jede Größe mit einem Faktor gewichtet und die Ergebnisse addiert. Diese Faktoren heißen Parameter. Im Training sieht das Modell viele Häuser mit bekanntem Preis, misst den Abstand zwischen Schätzung und tatsächlichem Wert mit einer Verlustfunktion (loss function) und verschiebt die Parameter so, dass dieser Fehler kleiner wird, immer wieder. Das eigentliche Ziel ist aber nicht, die Trainingsbeispiele zu treffen, sondern die Verallgemeinerung (generalization): gute Ergebnisse auf Daten, die das Modell nie gesehen hat. IBM nennt sie das grundlegende Ziel des maschinellen Lernens.

## Lernarten und die Tiefe des Deep Learning

Nach der Art des Lernsignals unterscheidet IBM vier Formen. Beim überwachten Lernen (supervised learning) liegt zu jedem Beispiel die richtige Antwort vor, etwa E-Mails mit der Markierung „Spam“ oder „kein Spam“. Beim unüberwachten Lernen (unsupervised learning) gibt es keine richtige Antwort; das Modell sucht Muster, Zusammenhänge und Gruppen in den Daten selbst. Beim bestärkenden Lernen (reinforcement learning) bewertet ein Modell seine Umgebung und wählt Handlungen, die die größte Belohnung versprechen. Beim selbstüberwachten Lernen (self-supervised learning) entsteht das Lernsignal aus den Daten selbst, etwa indem Wörter in einem Text verdeckt werden und das Modell sie vorhersagen soll. Weil dafür niemand Beispiele von Hand beschriften muss, ist es nach IBM die wichtigste Trainingsmethode großer Sprachmodelle.

Deep Learning ist der Teil des maschinellen Lernens, der mit vielschichtigen künstlichen neuronalen Netzen arbeitet. „Tief“ meint die Zahl der Schichten; IBM spricht ab vier Schichten von Deep Learning, heutige Netze sind meist viel tiefer. Yann LeCun, Yoshua Bengio und Geoffrey Hinton (Nature, 2015) beschreiben den Kern: Modelle aus mehreren Verarbeitungsschichten lernen Darstellungen der Daten auf mehreren Abstraktionsebenen, und das Verfahren der Fehlerrückführung (backpropagation) gibt an, wie jede Schicht ihre inneren Parameter ändern muss. Das hat nach ihrer Übersicht den Stand der Technik in Spracherkennung und Bilderkennung drastisch verbessert. Der praktische Unterschied liegt bei den Merkmalen (features): Klassische Verfahren brauchen Eingaben, die ein Mensch vorher ausgewählt und aufbereitet hat; Deep Learning arbeitet nach IBM typischerweise auf Rohdaten wie Pixeln oder Text und automatisiert einen großen Teil dieser Merkmalsgewinnung.

## Im Beratungsalltag

Ein Hersteller von Holzfenstern mit 120 Beschäftigten möchte „etwas mit KI machen“ und nennt drei Wünsche: Kratzer und Astlöcher auf Rahmenteilen automatisch erkennen, den Bedarf an Glasscheiben für die nächsten Wochen besser planen und Kundenanfragen schneller beantworten. Die Beraterin ordnet jeden Wunsch zuerst einer Lernart zu. Die Fehlererkennung ist überwachtes Lernen auf Bildern: Sie braucht Fotos, auf denen Fachleute die Fehler markiert haben, und sie ist ein typischer Fall für Deep Learning, weil niemand von Hand beschreiben kann, wie ein Astloch in Pixeln aussieht. Die Bedarfsplanung arbeitet mit Tabellen aus der Warenwirtschaft, deren Merkmale bekannt sind; hier kann ein klassisches Verfahren genügen, das mit weniger Daten auskommt und leichter zu erklären ist. Für die Kundenanfragen muss niemand ein Modell trainieren, denn vortrainierte Sprachmodelle gibt es bereits. Die erste Frage an den Kunden lautet deshalb nicht „welches Modell?“, sondern „welche Beispiele mit richtiger Antwort haben Sie?“.

## Grenzen und Kritik

Ein Modell, das auf seinen Trainingsdaten glänzt, ist nicht automatisch gut. IBM beschreibt die Überanpassung (overfitting): Das Modell passt sich so eng an seine Trainingsdaten an, dass es für andere Daten keine zutreffenden Vorhersagen mehr liefert, weil es sich das Rauschen gemerkt hat statt des Musters. Man erkennt es daran, dass der Fehler auf den Trainingsdaten niedrig und auf zurückgehaltenen Testdaten hoch ist. Gegenmittel sind unter anderem mehr Daten, ein früheres Ende des Trainings und Regularisierung, also eine Strafe für große Parameterwerte. Das Gegenstück, die Unteranpassung (underfitting), entsteht, wenn zu kurz trainiert wurde oder aussagekräftige Eingaben fehlen. Eine Erfolgszahl ohne Angabe, auf welchen Daten sie gemessen wurde, sagt deshalb nichts.

Dazu kommen drei weitere Grenzen. Die zentrale Voraussetzung des maschinellen Lernens ist nach IBM, dass die Trainingsdaten den späteren Aufgaben hinreichend ähneln; ein Modell, das Holz im Tageslicht gesehen hat, kennt die Kamera in der dunklen Halle nicht. Deep Learning braucht im Vergleich zu klassischen Verfahren außerordentlich viele Daten und viel Rechenleistung. Und seine Modelle gelten als Black Box: Wie die Werte einzelner Parameter mit Eigenschaften der Wirklichkeit zusammenhängen, lässt sich kaum mehr als mathematisch erklären. Vor jedem Projekt steht deshalb die Frage, ob genug passende Beispiele vorliegen und wie erklärbar das Ergebnis sein muss.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Large Language Model (LLM)**: Das Sprachmodell ist der Motor moderner KI-Assistenten — und der Grund, warum ihre Ausgaben plausibel klingen, ohne dass sie „wissen" müssen, ob sie stimmen.
- **Transformer & Attention**: Fast jedes heutige Sprachmodell steht auf einer einzigen Architektur-Idee von 2017 — der Selbst-Aufmerksamkeit.

## Quellen

- Bergmann — What is machine learning? (IBM Think, 2025). https://www.ibm.com/think/topics/machine-learning (abgerufen am 28.09.2026)
- Bergmann — What is deep learning? (IBM Think, 2025). https://www.ibm.com/think/topics/deep-learning (abgerufen am 28.09.2026)
- LeCun, Bengio & Hinton — Deep Learning (Nature 521(7553), 2015). https://doi.org/10.1038/nature14539 (abgerufen am 28.09.2026)
- IBM — What is overfitting? (IBM Think, 2021). https://www.ibm.com/think/topics/overfitting (abgerufen am 28.09.2026)
