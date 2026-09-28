# Transformer & Attention

Fast jedes heutige Sprachmodell steht auf einer einzigen Architektur-Idee von 2017 — der Selbst-Aufmerksamkeit.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Attention, Self-Attention, Attention Is All You Need.

## Das Problem vor 2017

Vor dem Transformer verarbeiteten Sprachmodelle Text meist mit rekurrenten neuronalen Netzen (recurrent neural networks): Sie lasen einen Satz Wort für Wort und trugen einen Zwischenstand von Schritt zu Schritt weiter. Ashish Vaswani und Kollegen beschreiben den Nachteil: Diese von Natur aus schrittweise Rechnung verhindert, dass innerhalb eines Trainingsbeispiels parallel gerechnet wird. Bei Übersetzungen kam ein zweites Problem hinzu. Ein Kodierer (encoder) fasste den ganzen Ausgangssatz in einem Vektor fester Länge zusammen, aus dem ein Dekodierer (decoder) die Übersetzung erzeugte. Dzmitry Bahdanau, Kyunghyun Cho und Yoshua Bengio (2014) sahen in diesem festen Vektor einen Engpass und ließen das Modell stattdessen bei jedem Zielwort selbst nach den Teilen des Ausgangssatzes suchen, die dafür wichtig sind. Das war der Aufmerksamkeitsmechanismus (attention), damals noch als Ergänzung rekurrenter Netze.

Vaswani und sieben weitere Autoren gingen 2017 mit der Arbeit „Attention Is All You Need“ einen Schritt weiter: eine Architektur, die ausschließlich auf Aufmerksamkeit beruht und auf rekurrente und faltende Netze (convolutional networks) ganz verzichtet. Ihre Übersetzungsmodelle waren nach eigenen Angaben besser, stärker parallelisierbar und deutlich schneller zu trainieren. Vom Englischen ins Deutsche übertraf ihr großes Modell alle zuvor veröffentlichten Ergebnisse, auch Kombinationen mehrerer Modelle; es trainierte dreieinhalb Tage auf acht Grafikprozessoren, einem Bruchteil der Kosten früherer Spitzenmodelle. Dass die Architektur nicht an Übersetzungen gebunden ist, zeigten die Autoren gleich mit: Auch bei der grammatischen Zerlegung englischer Sätze lieferte sie gute Ergebnisse.

## Wie Selbst-Aufmerksamkeit funktioniert

Selbst-Aufmerksamkeit (self-attention) heißt: Jedes Token eines Textes betrachtet alle anderen Token desselben Textes und bestimmt, wie stark sie seine Bedeutung beeinflussen. Dazu erzeugt das Modell für jedes Token drei Vektoren. IBM erklärt sie so: Die Anfrage (query) steht für die Information, die ein Token sucht, der Schlüssel (key) für die Information, die ein Token enthält, und der Wert (value) für das, was es weitergibt. Das Modell vergleicht die Anfrage eines Tokens mit den Schlüsseln aller anderen, rechnet die Übereinstimmungen in Gewichte um, die zusammen eins ergeben, und bildet daraus eine gewichtete Summe der Werte. Im Satz „Die Bank am Fluss war nass“ kann „Fluss“ so ein hohes Gewicht für „Bank“ bekommen, und die Darstellung von „Bank“ rückt in Richtung Ufer statt Geldinstitut. Weil diese Vergleiche für alle Token gleichzeitig laufen, lässt sich die Rechnung auf Grafikprozessoren verteilen; nach IBM hat erst das ermöglicht, Modelle auf bis dahin unerreichten Datenmengen zu trainieren.

Drei Bausteine kommen hinzu. Die mehrköpfige Aufmerksamkeit (multi-head attention) lässt mehrere solcher Rechnungen nebeneinander laufen, damit das Modell verschiedene Gesichtspunkte zugleich berücksichtigen kann. Die Positionskodierung (positional encoding) fügt die Reihenfolge hinzu: Weil das Modell alle Token gleichzeitig betrachtet, weiß es von sich aus nicht, welches zuerst kam. Und die Schichten liegen übereinander, im Original je sechs im Kodierer und im Dekodierer. Der Dekodierer erzeugt seine Ausgabe schrittweise (autoregressive): Jedes neue Token wird aus der Eingabe und den bereits erzeugten Token berechnet. Genau so schreiben heutige Sprachmodelle ihre Antworten.

## Varianten und Stand heute

Aus dem Original sind drei Familien hervorgegangen. Reine Kodierer wie BERT lesen einen Text in beide Richtungen und bilden nach IBM bis heute die Grundlage der meisten Anwendungen, die Text in Vektoren übersetzen, etwa für Vektordatenbanken. Reine Dekodierer erzeugen Text Token für Token; zu ihnen zählt IBM die meisten Sprachmodelle, die die Öffentlichkeit kennt, geschlossene wie offene. Kodierer-Dekodierer-Modelle wie das Original eignen sich für Aufgaben, die einen Text in einen anderen überführen. Daneben gibt es hybride Modelle, etwa die im Oktober 2025 veröffentlichten Granite-4.0-Modelle von IBM, die Schichten eines anderen Verfahrens namens Mamba-2 mit klassischen Transformer-Blöcken im Verhältnis neun zu eins kombinieren. Die große Mehrheit der Sprachmodelle beruht weiter auf dem Transformer, Stand September 2026 aber nicht mehr ausnahmslos.

## Im Beratungsalltag

Die Geschäftsführerin eines Logistikdienstleisters mit 180 Beschäftigten hat gelesen, neue Architekturen könnten den Transformer ablösen, und fragt, ob sie mit ihrem Vorhaben warten soll: Ein Assistent soll Frachtbriefe und Lieferverträge auswerten. Der Berater erklärt, dass die Architektur für sie über drei spürbare Größen wirkt: wie lange Dokumente ein Modell verarbeiten kann, wie schnell es antwortet und was eine Anfrage kostet. Gerade hier liegt die Schwäche des Transformers, denn sein Rechenaufwand wächst mit der Länge der Eingabe im Quadrat. Entschieden wird deshalb nicht nach Architektur, sondern nach Messung: Zwei oder drei Modelle werden mit einer Stichprobe echter Frachtpapiere auf Richtigkeit, Antwortzeit und Kosten je Dokument geprüft. Wird der Assistent so gebaut, dass sich das Modell austauschen lässt, kann ein späterer Wechsel die heutige Wahl korrigieren.

## Grenzen und Kritik

Die bekannteste Grenze steht schon in der Originalarbeit. Vaswani und Kollegen geben den Rechenaufwand einer Selbst-Aufmerksamkeitsschicht als quadratisch in der Länge der Eingabe an und schlagen für sehr lange Sequenzen vor, die Aufmerksamkeit auf eine Nachbarschaft zu beschränken. IBM nennt das den quadratischen Engpass: Verdoppelt sich die Länge des Kontexts, vervierfacht sich die Zahl der Rechenschritte, die das Modell ausführen und im Speicher halten muss; das kostet Geschwindigkeit und Geld und kann bei langen Texten selbst hochwertige Grafikkarten für Endkunden an ihre Speichergrenze bringen. Die hybriden Granite-Modelle sind eine Antwort darauf, weil der Aufwand von Mamba nur linear mit der Länge wächst. Zudem ist „Aufmerksamkeit“ ein Bild: Technisch ist sie eine gewichtete Summe gelernter Vektoren. Die Architektur legt fest, wie ein Modell rechnet, nicht, was es weiß; ob seine Antworten stimmen, entscheiden Daten und Training.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Large Language Model (LLM)**: Das Sprachmodell ist der Motor moderner KI-Assistenten — und der Grund, warum ihre Ausgaben plausibel klingen, ohne dass sie „wissen" müssen, ob sie stimmen.
- **Machine Learning & Deep Learning**: Die Begriffe stapeln sich ineinander: Künstliche Intelligenz ist der Oberbegriff, Machine Learning und Deep Learning sind die Teilgebiete, auf denen die heutige generative KI aufsetzt.

## Quellen

- Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser & Polosukhin — Attention Is All You Need (arXiv, 2017). https://arxiv.org/abs/1706.03762 (abgerufen am 28.09.2026)
- Bahdanau, Cho & Bengio — Neural Machine Translation by Jointly Learning to Align and Translate (arXiv, 2014; ICLR 2015). https://arxiv.org/abs/1409.0473 (abgerufen am 28.09.2026)
- Stryker & Bergmann — What is a transformer model? (IBM Think, 2025). https://www.ibm.com/think/topics/transformer-model (abgerufen am 28.09.2026)
- Soule & Bergmann — IBM Granite 4.0: Hyper-efficient, High Performance Hybrid Models (IBM, 2025). https://www.ibm.com/new/announcements/ibm-granite-4-0-hyper-efficient-high-performance-hybrid-models (abgerufen am 28.09.2026)
