# Large Language Model (LLM)

Das Sprachmodell ist der Motor moderner KI-Assistenten — und der Grund, warum ihre Ausgaben plausibel klingen, ohne dass sie „wissen" müssen, ob sie stimmen.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: LLM, Sprachmodell.

## Vom Vortraining zum Assistenten

Ein großes Sprachmodell (large language model, LLM) ist ein Deep-Learning-Modell, das auf gewaltigen Textmengen trainiert wurde; IBM spricht von Milliarden oder Billionen Wörtern aus Büchern, Artikeln, Webseiten und Programmcode. Das Training ist selbstüberwacht (self-supervised): Das Modell bekommt den Anfang eines Satzes und soll das nächste Wort vorhersagen, und das tatsächliche nächste Wort im Text dient als richtige Antwort. Niemand muss dafür Beispiele beschriften, und weil unbeschrifteter Text reichlich und billig vorhanden ist, lässt sich das Verfahren auf riesige Datenmengen ausdehnen. Was das Modell dabei lernt, steckt in seinen Gewichten (weights), den inneren Stellgrößen des Netzes, von denen große Modelle nach IBM Milliarden oder Billionen haben. Technisch beruhen sie fast immer auf der Transformer-Architektur, die ein eigener Artikel beschreibt.

Ein nur vortrainiertes Modell setzt Texte fort; ein Assistent, der Fragen beantwortet, ist es noch nicht. Nach IBM sind vortrainierte Sprachmodelle nicht von sich aus darauf ausgelegt, Anweisungen zu folgen. Dafür werden sie weitertrainiert: mit Paaren aus Anfrage und gewünschter Antwort (instruction tuning) und mit menschlichen Bewertungen, bei denen Menschen Antworten in eine Rangfolge bringen und das Modell lernt, die besser bewerteten zu bevorzugen (reinforcement learning from human feedback, RLHF). Long Ouyang und Kollegen (2022) zeigten, wie viel das ausmacht: Prüfer zogen die Antworten eines so nachtrainierten Modells mit 1,3 Milliarden Parametern denen des hundertmal größeren GPT-3 vor. Rishi Bommasani und Kollegen (2021) nennen solche breit vortrainierten, für viele Aufgaben anpassbaren Modelle Basismodelle (foundation models).

## Wie eine Antwort entsteht

Beim Antworten zerlegt das Modell die Eingabe in Token, meist Wortteile, übersetzt sie in Zahlenvektoren und erzeugt die Antwort Stück für Stück. IBM beschreibt den Ablauf so: Für jedes mögliche nächste Token berechnet das Modell eine Wahrscheinlichkeit, gibt das wahrscheinlichste aus, hängt es an den bisherigen Text und beginnt von vorn, bis die Antwort fertig ist. Einstellungen wie die Temperatur (temperature) bringen Zufall hinein, sodass auch ein anderes der wahrscheinlichen Token gewählt werden kann; deshalb bekommt dieselbe Frage manchmal verschiedene Antworten. Entscheidend ist ein Satz aus derselben Quelle: Das Modell „kennt“ die Antwort nicht im Voraus, sondern setzt bei jedem Schritt nach den statistischen Zusammenhängen aus dem Training seine beste Vermutung. Trainiert wurde es darauf, plausibel fortzusetzen, nicht darauf, wahr zu sein.

Daraus entstehen Halluzinationen: Informationen, die nach IBM falsch oder irreführend sind, aber plausibel klingen. Adam Tauman Kalai und Kollegen (2025) erklären, warum sie nicht verschwinden. Schon im Vortraining entstehen sie aus statistischen Gründen: Wo ein Modell falsche Aussagen nicht von Tatsachen unterscheiden kann, erzeugt es zwangsläufig auch falsche. Dass sie das Nachtraining überstehen, liegt nach ihrer Analyse an der Bewertung: Die meisten Tests belohnen eine geratene Antwort und geben für das Eingeständnis von Unsicherheit nichts, wie eine Prüfung, in der Raten mehr Punkte bringt als eine leere Zeile. Ein Sprachmodell ist deshalb kein Nachschlagewerk. Sein Wissen endet mit seinen Trainingsdaten und kann fehlen oder falsch sein, ohne dass die Formulierung es verrät.

## Im Beratungsalltag

Eine Steuerkanzlei mit 40 Beschäftigten will ein Sprachmodell einsetzen und fragt, ob es Mandantenfragen „einfach beantworten“ könne. Die Beraterin trennt Aufgaben, bei denen Plausibilität genügt, von solchen, bei denen es auf Wahrheit ankommt. Ein Anschreiben glätten, ein langes Protokoll zusammenfassen, einen Fachtext in einfache Sprache übertragen: Hier ist das Modell stark, weil die Fakten im Eingangstext stehen und ein Mensch das Ergebnis ohnehin liest. Eine Frist nennen, eine Vorschrift zitieren, ein Urteil mit Aktenzeichen belegen: Hier kann das Modell eine Fundstelle ausgeben, die richtig aussieht und nicht existiert. Für diese Aufgaben schlägt sie vor, die Fakten aus einer geprüften eigenen Quelle zuzuliefern, wie im Artikel über RAG beschrieben, und jede Aussage mit Fundstelle von einer Fachkraft freigeben zu lassen. Die Kanzlei bekommt so ein Werkzeug für Entwürfe, keine Auskunftsmaschine.

## Grenzen und Kritik

Ein Sprachmodell gibt keine Garantie für wahre Aussagen, und die Sicherheit seines Tons sagt nichts über die Richtigkeit. IBM nennt weitere Schwächen: Modelle können Verzerrungen ihrer Trainingsdaten wiedergeben und verstärken, und Training wie Betrieb brauchen viel Rechenleistung. Bommasani und Kollegen weisen auf eine strukturelle Folge hin: Wenn viele Anwendungen auf wenigen Basismodellen aufbauen, erben alle angepassten Modelle deren Mängel, und noch fehle ein klares Verständnis davon, wie diese Modelle funktionieren, wann sie versagen und was sie überhaupt können. Auch das Nachtraining hat Grenzen; Ouyang und Kollegen halten fest, dass ihre Modelle weiter einfache Fehler machen. Für Projekte heißt das: an eigenen, typischen Fragen messen, wie oft das Modell falsch liegt, und prüfen, ob es bei fehlendem Wissen „das weiß ich nicht“ sagt, statt zu raten.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Transformer & Attention**: Fast jedes heutige Sprachmodell steht auf einer einzigen Architektur-Idee von 2017 — der Selbst-Aufmerksamkeit.
- **Token & Kontextfenster**: In welcher Einheit ein Modell rechnet — und wie viel es gleichzeitig „im Blick" hat — bestimmt Kosten, Grenzen und den Bedarf an RAG bei langen Dokumenten.
- **Halluzination**: Das strukturelle Risiko jedes Sprachmodells — und der Grund, warum Grounding, Prüfschritte und ehrliche Nutzerhinweise keine Kür sind, sondern Pflicht.
- **Machine Learning & Deep Learning**: Die Begriffe stapeln sich ineinander: Künstliche Intelligenz ist der Oberbegriff, Machine Learning und Deep Learning sind die Teilgebiete, auf denen die heutige generative KI aufsetzt.

## Quellen

- Stryker — What are large language models (LLMs)? (IBM Think, 2021). https://www.ibm.com/think/topics/large-language-models (abgerufen am 28.09.2026)
- Bergmann — What is self-supervised learning? (IBM Think, 2023). https://www.ibm.com/think/topics/self-supervised-learning (abgerufen am 28.09.2026)
- Ouyang et al. — Training Language Models to Follow Instructions with Human Feedback (arXiv, 2022). https://arxiv.org/abs/2203.02155 (abgerufen am 28.09.2026)
- Bommasani et al. — On the Opportunities and Risks of Foundation Models (arXiv, 2021). https://arxiv.org/abs/2108.07258 (abgerufen am 28.09.2026)
- Kalai, Nachum, Vempala & Zhang — Why Language Models Hallucinate (arXiv, 2025). https://arxiv.org/abs/2509.04664 (abgerufen am 28.09.2026)
