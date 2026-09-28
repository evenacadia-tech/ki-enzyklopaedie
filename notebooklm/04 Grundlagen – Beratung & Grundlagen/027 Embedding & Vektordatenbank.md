# Embedding & Vektordatenbank

Damit eine Maschine Bedeutung „vergleichen" kann, wird Text in Zahlenvektoren übersetzt — die Grundlage der Ähnlichkeitssuche und damit von RAG.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Embedding, Vektor, Vektordatenbank, Vector Database.

## Bedeutung als Koordinaten

Ein Embedding ist nach IBM die Darstellung eines Objekts, etwa eines Textes, Bildes oder Tonstücks, als Punkt in einem Vektorraum, dessen Lage für ein Lernverfahren eine Bedeutung trägt. Ein Vektor ist eine Liste von Zahlen, jede Zahl die Position auf einer Achse. Man kann sich eine Landkarte vorstellen, nur mit sehr vielen Achsen statt zwei; IBM nennt tausend und mehr Dimensionen, je nach Komplexität der Daten. Je näher zwei Punkte beieinander liegen, desto ähnlicher sind die Objekte. Die Achsen hat niemand festgelegt: Embeddings werden von neuronalen Netzen aus Daten gelernt, statt von Fachleuten definiert. Text-Embeddings übertragen das Prinzip von einzelnen Wörtern auf ganze Sätze, Absätze und Dokumente.

Wie viel Struktur in solchen Räumen steckt, zeigen Tomas Mikolov und Kollegen (2013). Sie berechneten Wortvektoren aus einem Textbestand von 1,6 Milliarden Wörtern in weniger als einem Tag und beschreiben, dass sich mit einfacher Vektorrechnung Beziehungen ablesen lassen: Zieht man vom Vektor für „König“ den für „Mann“ ab und addiert den für „Frau“, liegt das Ergebnis am nächsten beim Vektor für „Königin“; ebenso verhält sich Frankreich zu Paris wie Deutschland zu Berlin. Für die Praxis heißt das: Bedeutung wird vergleichbar. Die Frage „Wie kündige ich?“ kann nahe bei einem Absatz über die „Vertragsbeendigung“ liegen, obwohl beide kein Wort gemeinsam haben.

## Wie die Ähnlichkeitssuche arbeitet

Nähe wird über den Abstand oder den Winkel zwischen Vektoren gemessen; IBM nennt den euklidischen Abstand und die Kosinus-Ähnlichkeit (cosine similarity). Die Kosinus-Ähnlichkeit lässt sich gut vorstellen, wenn man jeden Vektor als Pfeil denkt: Zeigen zwei Pfeile in dieselbe Richtung, ist der Wert eins, stehen sie rechtwinklig zueinander, ist er null; es zählt die Richtung, nicht die Länge. Eine Vektordatenbank (vector database) nutzt das für die Suche. Nach IBM werden die Embeddings der Dokumente vorab berechnet und gespeichert. Stellt jemand eine Frage, wird auch sie in einen Vektor übersetzt, den Anfragevektor (query vector); die Datenbank vergleicht ihn mit den gespeicherten Vektoren, berechnet Ähnlichkeitswerte und liefert die nächsten Nachbarn (nearest neighbors). In einer RAG-Anwendung sind diese Treffer die Textstellen, die das Sprachmodell als Kontext bekommt.

Schnell ist das nur mit einem Kniff. Jeden gespeicherten Vektor einzeln zu vergleichen, wird bei großen Beständen zu langsam. Vektordatenbanken bauen deshalb Indizes für die näherungsweise Nachbarsuche (approximate nearest neighbor, ANN), die ähnliche Vektoren finden, ohne den ganzen Bestand zu durchsuchen. Ein verbreitetes Verfahren, HNSW (hierarchical navigable small world), ordnet die Vektoren nach IBM in einem mehrschichtigen Graphen: oben weite Verbindungen für den groben Sprung in die richtige Gegend, unten dichte örtliche Verbindungen für die Feinsuche, so wie man sich erst auf der Autobahn und dann im Stadtplan orientiert. Der Preis ist, dass eine näherungsweise Suche den besten Treffer verfehlen kann. Viele Systeme verbinden die Vektorsuche zudem mit Bedingungen an Metadaten, etwa einem Zeitraum oder einer Kategorie.

## Im Beratungsalltag

Ein Großhändler für Sanitärbedarf mit 90 Beschäftigten will seinem Innendienst eine Suche über Datenblätter, Montageanleitungen und Kundenkorrespondenz geben. Die Vektorsuche löst ein altes Problem: Ein Kunde schreibt „der Wasserhahn tropft nach dem Zudrehen“, die Anleitung spricht vom Tausch der Kartusche, und eine Stichwortsuche findet nach IBM nur, was genau so dasteht. Bei Artikelnummern und Normbezeichnungen zählt dagegen die exakte Zeichenfolge, und darin ist die Stichwortsuche stark. Der Berater empfiehlt deshalb eine hybride Suche, die Stichwort- und Vektortreffer zusammenführt, dazu Filter nach Warengruppe und Gültigkeitsdatum, und ein Embedding-Modell, das mit deutscher Fachsprache umgehen kann. Vor der Einführung wird mit einigen Dutzend echten Fragen gemessen, ob die richtigen Dokumente unter den ersten Treffern sind.

## Grenzen und Kritik

Ähnlichkeit ist nicht Relevanz und schon gar nicht Richtigkeit: Die Suche findet, was ähnlich klingt, auch eine veraltete Fassung derselben Richtlinie. Wie gut sie findet, hängt stark vom Fachgebiet ab. Nandan Thakur und Kollegen (2021) verglichen zehn Suchverfahren auf 18 Datensätzen aus verschiedenen Gebieten, ohne die Verfahren vorher darauf anzupassen. Das klassische Stichwortverfahren BM25 erwies sich als robuster Vergleichsmaßstab; Verfahren mit dichten Vektoren waren effizient, schnitten aber oft schlechter ab als andere Ansätze, was nach den Autoren zeigt, wie viel ihrer Übertragbarkeit auf neue Gebiete noch fehlt. Wer eine eigene Fachsprache hat, muss ein Embedding-Modell deshalb an eigenen Fragen testen.

Zweitens sind Embeddings keine Anonymisierung. John Morris und Kollegen (2023) zeigten, dass sich aus Text-Embeddings der ursprüngliche Text weitgehend zurückgewinnen lässt: Ihr Verfahren stellte 92 Prozent von Eingaben mit 32 Token exakt wieder her und gewann aus Embeddings klinischer Notizen vollständige Namen zurück. Personal- und Gesundheitsdaten brauchen in der Vektordatenbank denselben Schutz wie im Original. Drittens bindet jede Vektordatenbank an ihr Embedding-Modell: Frage und Dokumente müssen mit demselben Modell übersetzt werden, und ein Modellwechsel bedeutet, den ganzen Bestand neu zu berechnen.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **RAG (Retrieval-Augmented Generation)**: Der wohl wichtigste Architektur-Baustein für seriöse Unternehmens-KI: Wissen zur Laufzeit dazuladen, statt es ins Modell zu trainieren.
- **Token & Kontextfenster**: In welcher Einheit ein Modell rechnet — und wie viel es gleichzeitig „im Blick" hat — bestimmt Kosten, Grenzen und den Bedarf an RAG bei langen Dokumenten.

## Quellen

- IBM — What is embedding? (IBM Think, o. J.). https://www.ibm.com/think/topics/embedding (abgerufen am 28.09.2026)
- Krantz, Holdsworth & Kosinski — What is a vector database? (IBM Think, o. J.). https://www.ibm.com/think/topics/vector-database (abgerufen am 28.09.2026)
- Mikolov, Chen, Corrado & Dean — Efficient Estimation of Word Representations in Vector Space (arXiv, 2013). https://arxiv.org/abs/1301.3781 (abgerufen am 28.09.2026)
- Thakur, Reimers, Rücklé, Srivastava & Gurevych — BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models (arXiv, 2021; NeurIPS 2021). https://arxiv.org/abs/2104.08663 (abgerufen am 28.09.2026)
- Morris, Kuleshov, Shmatikov & Rush — Text Embeddings Reveal (Almost) As Much As Text (arXiv, 2023; EMNLP 2023). https://arxiv.org/abs/2310.06816 (abgerufen am 28.09.2026)
