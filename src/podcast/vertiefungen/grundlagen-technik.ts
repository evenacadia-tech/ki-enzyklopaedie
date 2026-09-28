import type { Quelle } from '../../inhalt/typen';
import type { Vertiefung } from '.';

// Vertiefungen: ml-dl, llm, transformer, token-kontext, embedding, rag, fine-tuning.
// Alle Quellen am 2026-09-28 abgerufen und geprüft (arXiv über die Export-Schnittstelle, DOI über Crossref).
const AB = '2026-09-28';
const Q = {
  // Machine Learning & Deep Learning
  ibmMl: {
    titel: 'Bergmann — What is machine learning? (IBM Think, 2025)',
    url: 'https://www.ibm.com/think/topics/machine-learning',
    abgerufen: AB,
  } satisfies Quelle,
  ibmDl: {
    titel: 'Bergmann — What is deep learning? (IBM Think, 2025)',
    url: 'https://www.ibm.com/think/topics/deep-learning',
    abgerufen: AB,
  } satisfies Quelle,
  lecun2015: {
    titel: 'LeCun, Bengio & Hinton — Deep Learning (Nature 521(7553), 2015)',
    url: 'https://doi.org/10.1038/nature14539',
    abgerufen: AB,
  } satisfies Quelle,
  ibmOverfitting: {
    titel: 'IBM — What is overfitting? (IBM Think, 2021)',
    url: 'https://www.ibm.com/think/topics/overfitting',
    abgerufen: AB,
  } satisfies Quelle,
  // Large Language Model
  ibmLlm: {
    titel: 'Stryker — What are large language models (LLMs)? (IBM Think, 2021)',
    url: 'https://www.ibm.com/think/topics/large-language-models',
    abgerufen: AB,
  } satisfies Quelle,
  ibmSsl: {
    titel: 'Bergmann — What is self-supervised learning? (IBM Think, 2023)',
    url: 'https://www.ibm.com/think/topics/self-supervised-learning',
    abgerufen: AB,
  } satisfies Quelle,
  ouyang2022: {
    titel: 'Ouyang et al. — Training Language Models to Follow Instructions with Human Feedback (arXiv, 2022)',
    url: 'https://arxiv.org/abs/2203.02155',
    abgerufen: AB,
  } satisfies Quelle,
  bommasani2021: {
    titel: 'Bommasani et al. — On the Opportunities and Risks of Foundation Models (arXiv, 2021)',
    url: 'https://arxiv.org/abs/2108.07258',
    abgerufen: AB,
  } satisfies Quelle,
  kalai2025: {
    titel: 'Kalai, Nachum, Vempala & Zhang — Why Language Models Hallucinate (arXiv, 2025)',
    url: 'https://arxiv.org/abs/2509.04664',
    abgerufen: AB,
  } satisfies Quelle,
  // Transformer & Attention
  vaswani2017: {
    titel:
      'Vaswani, Shazeer, Parmar, Uszkoreit, Jones, Gomez, Kaiser & Polosukhin — Attention Is All You Need (arXiv, 2017)',
    url: 'https://arxiv.org/abs/1706.03762',
    abgerufen: AB,
  } satisfies Quelle,
  bahdanau2014: {
    titel:
      'Bahdanau, Cho & Bengio — Neural Machine Translation by Jointly Learning to Align and Translate (arXiv, 2014; ICLR 2015)',
    url: 'https://arxiv.org/abs/1409.0473',
    abgerufen: AB,
  } satisfies Quelle,
  ibmTransformer: {
    titel: 'Stryker & Bergmann — What is a transformer model? (IBM Think, 2025)',
    url: 'https://www.ibm.com/think/topics/transformer-model',
    abgerufen: AB,
  } satisfies Quelle,
  ibmGranite4: {
    titel: 'Soule & Bergmann — IBM Granite 4.0: Hyper-efficient, High Performance Hybrid Models (IBM, 2025)',
    url: 'https://www.ibm.com/new/announcements/ibm-granite-4-0-hyper-efficient-high-performance-hybrid-models',
    abgerufen: AB,
  } satisfies Quelle,
  // Token & Kontextfenster
  ibmKontextfenster: {
    titel: 'Bergmann — What is a context window? (IBM Think, o. J.)',
    url: 'https://www.ibm.com/think/topics/context-window',
    abgerufen: AB,
  } satisfies Quelle,
  sennrich2016: {
    titel: 'Sennrich, Haddow & Birch — Neural Machine Translation of Rare Words with Subword Units (arXiv, 2015; ACL 2016)',
    url: 'https://arxiv.org/abs/1508.07909',
    abgerufen: AB,
  } satisfies Quelle,
  liu2024: {
    titel:
      'Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni & Liang — Lost in the Middle: How Language Models Use Long Contexts (Transactions of the Association for Computational Linguistics 12, 2024)',
    url: 'https://doi.org/10.1162/tacl_a_00638',
    abgerufen: AB,
  } satisfies Quelle,
  anthropicKontext: {
    titel: 'Anthropic — Context windows (Claude-Entwicklerdokumentation, Stand September 2026)',
    url: 'https://platform.claude.com/docs/en/build-with-claude/context-windows',
    abgerufen: AB,
  } satisfies Quelle,
  anthropicPreise: {
    titel: 'Anthropic — Pricing (Claude-Entwicklerdokumentation, Stand September 2026)',
    url: 'https://platform.claude.com/docs/en/about-claude/pricing',
    abgerufen: AB,
  } satisfies Quelle,
  // Embedding & Vektordatenbank
  ibmEmbedding: {
    titel: 'IBM — What is embedding? (IBM Think, o. J.)',
    url: 'https://www.ibm.com/think/topics/embedding',
    abgerufen: AB,
  } satisfies Quelle,
  ibmVektordatenbank: {
    titel: 'Krantz, Holdsworth & Kosinski — What is a vector database? (IBM Think, o. J.)',
    url: 'https://www.ibm.com/think/topics/vector-database',
    abgerufen: AB,
  } satisfies Quelle,
  mikolov2013: {
    titel: 'Mikolov, Chen, Corrado & Dean — Efficient Estimation of Word Representations in Vector Space (arXiv, 2013)',
    url: 'https://arxiv.org/abs/1301.3781',
    abgerufen: AB,
  } satisfies Quelle,
  thakur2021: {
    titel:
      'Thakur, Reimers, Rücklé, Srivastava & Gurevych — BEIR: A Heterogenous Benchmark for Zero-shot Evaluation of Information Retrieval Models (arXiv, 2021; NeurIPS 2021)',
    url: 'https://arxiv.org/abs/2104.08663',
    abgerufen: AB,
  } satisfies Quelle,
  morris2023: {
    titel: 'Morris, Kuleshov, Shmatikov & Rush — Text Embeddings Reveal (Almost) As Much As Text (arXiv, 2023; EMNLP 2023)',
    url: 'https://arxiv.org/abs/2310.06816',
    abgerufen: AB,
  } satisfies Quelle,
  // RAG
  lewis2020: {
    titel: 'Lewis et al. — Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (arXiv, 2020; NeurIPS 2020)',
    url: 'https://arxiv.org/abs/2005.11401',
    abgerufen: AB,
  } satisfies Quelle,
  ibmRag: {
    titel: 'Belcic — What is RAG (retrieval augmented generation)? (IBM Think, 2024)',
    url: 'https://www.ibm.com/think/topics/retrieval-augmented-generation',
    abgerufen: AB,
  } satisfies Quelle,
  dskRag: {
    titel:
      'Datenschutzkonferenz — Orientierungshilfe zu datenschutzrechtlichen Besonderheiten generativer KI-Systeme mit RAG-Methode, Version 1.0 (DSK, Oktober 2025)',
    url: 'https://www.datenschutzkonferenz-online.de/media/oh/DSK_OH_RAG.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  owaspLlm08: {
    titel: 'OWASP Gen AI Security Project — LLM08:2025 Vector and Embedding Weaknesses (OWASP Top 10 for LLM Applications, 2025)',
    url: 'https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/',
    abgerufen: AB,
  } satisfies Quelle,
  // Fine-tuning
  ibmFineTuning: {
    titel: 'Bergmann — What is fine-tuning? (IBM Think, 2024)',
    url: 'https://www.ibm.com/think/topics/fine-tuning',
    abgerufen: AB,
  } satisfies Quelle,
  hu2021: {
    titel: 'Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang & Chen — LoRA: Low-Rank Adaptation of Large Language Models (arXiv, 2021)',
    url: 'https://arxiv.org/abs/2106.09685',
    abgerufen: AB,
  } satisfies Quelle,
  gekhman2024: {
    titel:
      'Gekhman, Yona, Aharoni, Eyal, Feder, Reichart & Herzig — Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations? (arXiv, 2024; EMNLP 2024)',
    url: 'https://arxiv.org/abs/2405.05904',
    abgerufen: AB,
  } satisfies Quelle,
  qi2023: {
    titel:
      'Qi, Zeng, Xie, Chen, Jia, Mittal & Henderson — Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To! (arXiv, 2023)',
    url: 'https://arxiv.org/abs/2310.03693',
    abgerufen: AB,
  } satisfies Quelle,
};

export const grundlagenTechnik: Vertiefung[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ml-dl',
    abschnitte: [
      {
        titel: 'Drei Begriffe, ineinander geschachtelt',
        absaetze: [
          'Zur Künstlichen Intelligenz gehören auch Systeme, deren Regeln ein Mensch von Hand geschrieben hat, etwa Expertensysteme, die mit einem großen, von Fachleuten programmierten Entscheidungsbaum bei einer Diagnose helfen. Maschinelles Lernen (machine learning) ist der Teil der KI, in dem diese Logik nicht programmiert, sondern aus Beispielen gewonnen wird. IBM beschreibt es als Algorithmen, die die Muster ihrer Trainingsdaten „lernen“ und daraus zutreffende Schlüsse über neue Daten ziehen. Das Beispiel dort ist ein Spamfilter: Regelbasierte KI braucht jemanden, der von Hand Kriterien für Spam festlegt; maschinelles Lernen braucht einen geeigneten Algorithmus und genügend Beispiel-E-Mails. Daraus folgt der Merksatz: Jedes maschinelle Lernen ist KI, aber nicht jede KI ist maschinelles Lernen.',
          'Was „lernen“ heißt, zeigt ein zweites Beispiel von IBM. Ein Modell schätzt den Preis eines Hauses aus Wohnfläche, Zimmerzahl und Alter, indem es jede Größe mit einem Faktor gewichtet und die Ergebnisse addiert. Diese Faktoren heißen Parameter. Im Training sieht das Modell viele Häuser mit bekanntem Preis, misst den Abstand zwischen Schätzung und tatsächlichem Wert mit einer Verlustfunktion (loss function) und verschiebt die Parameter so, dass dieser Fehler kleiner wird, immer wieder. Das eigentliche Ziel ist aber nicht, die Trainingsbeispiele zu treffen, sondern die Verallgemeinerung (generalization): gute Ergebnisse auf Daten, die das Modell nie gesehen hat. IBM nennt sie das grundlegende Ziel des maschinellen Lernens.',
        ],
      },
      {
        titel: 'Lernarten und die Tiefe des Deep Learning',
        absaetze: [
          'Nach der Art des Lernsignals unterscheidet IBM vier Formen. Beim überwachten Lernen (supervised learning) liegt zu jedem Beispiel die richtige Antwort vor, etwa E-Mails mit der Markierung „Spam“ oder „kein Spam“. Beim unüberwachten Lernen (unsupervised learning) gibt es keine richtige Antwort; das Modell sucht Muster, Zusammenhänge und Gruppen in den Daten selbst. Beim bestärkenden Lernen (reinforcement learning) bewertet ein Modell seine Umgebung und wählt Handlungen, die die größte Belohnung versprechen. Beim selbstüberwachten Lernen (self-supervised learning) entsteht das Lernsignal aus den Daten selbst, etwa indem Wörter in einem Text verdeckt werden und das Modell sie vorhersagen soll. Weil dafür niemand Beispiele von Hand beschriften muss, ist es nach IBM die wichtigste Trainingsmethode großer Sprachmodelle.',
          'Deep Learning ist der Teil des maschinellen Lernens, der mit vielschichtigen künstlichen neuronalen Netzen arbeitet. „Tief“ meint die Zahl der Schichten; IBM spricht ab vier Schichten von Deep Learning, heutige Netze sind meist viel tiefer. Yann LeCun, Yoshua Bengio und Geoffrey Hinton (Nature, 2015) beschreiben den Kern: Modelle aus mehreren Verarbeitungsschichten lernen Darstellungen der Daten auf mehreren Abstraktionsebenen, und das Verfahren der Fehlerrückführung (backpropagation) gibt an, wie jede Schicht ihre inneren Parameter ändern muss. Das hat nach ihrer Übersicht den Stand der Technik in Spracherkennung und Bilderkennung drastisch verbessert. Der praktische Unterschied liegt bei den Merkmalen (features): Klassische Verfahren brauchen Eingaben, die ein Mensch vorher ausgewählt und aufbereitet hat; Deep Learning arbeitet nach IBM typischerweise auf Rohdaten wie Pixeln oder Text und automatisiert einen großen Teil dieser Merkmalsgewinnung.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Hersteller von Holzfenstern mit 120 Beschäftigten möchte „etwas mit KI machen“ und nennt drei Wünsche: Kratzer und Astlöcher auf Rahmenteilen automatisch erkennen, den Bedarf an Glasscheiben für die nächsten Wochen besser planen und Kundenanfragen schneller beantworten. Die Beraterin ordnet jeden Wunsch zuerst einer Lernart zu. Die Fehlererkennung ist überwachtes Lernen auf Bildern: Sie braucht Fotos, auf denen Fachleute die Fehler markiert haben, und sie ist ein typischer Fall für Deep Learning, weil niemand von Hand beschreiben kann, wie ein Astloch in Pixeln aussieht. Die Bedarfsplanung arbeitet mit Tabellen aus der Warenwirtschaft, deren Merkmale bekannt sind; hier kann ein klassisches Verfahren genügen, das mit weniger Daten auskommt und leichter zu erklären ist. Für die Kundenanfragen muss niemand ein Modell trainieren, denn vortrainierte Sprachmodelle gibt es bereits. Die erste Frage an den Kunden lautet deshalb nicht „welches Modell?“, sondern „welche Beispiele mit richtiger Antwort haben Sie?“.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein Modell, das auf seinen Trainingsdaten glänzt, ist nicht automatisch gut. IBM beschreibt die Überanpassung (overfitting): Das Modell passt sich so eng an seine Trainingsdaten an, dass es für andere Daten keine zutreffenden Vorhersagen mehr liefert, weil es sich das Rauschen gemerkt hat statt des Musters. Man erkennt es daran, dass der Fehler auf den Trainingsdaten niedrig und auf zurückgehaltenen Testdaten hoch ist. Gegenmittel sind unter anderem mehr Daten, ein früheres Ende des Trainings und Regularisierung, also eine Strafe für große Parameterwerte. Das Gegenstück, die Unteranpassung (underfitting), entsteht, wenn zu kurz trainiert wurde oder aussagekräftige Eingaben fehlen. Eine Erfolgszahl ohne Angabe, auf welchen Daten sie gemessen wurde, sagt deshalb nichts.',
          'Dazu kommen drei weitere Grenzen. Die zentrale Voraussetzung des maschinellen Lernens ist nach IBM, dass die Trainingsdaten den späteren Aufgaben hinreichend ähneln; ein Modell, das Holz im Tageslicht gesehen hat, kennt die Kamera in der dunklen Halle nicht. Deep Learning braucht im Vergleich zu klassischen Verfahren außerordentlich viele Daten und viel Rechenleistung. Und seine Modelle gelten als Black Box: Wie die Werte einzelner Parameter mit Eigenschaften der Wirklichkeit zusammenhängen, lässt sich kaum mehr als mathematisch erklären. Vor jedem Projekt steht deshalb die Frage, ob genug passende Beispiele vorliegen und wie erklärbar das Ergebnis sein muss.',
        ],
      },
    ],
    quellen: [Q.ibmMl, Q.ibmDl, Q.lecun2015, Q.ibmOverfitting],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'llm',
    abschnitte: [
      {
        titel: 'Vom Vortraining zum Assistenten',
        absaetze: [
          'Ein großes Sprachmodell (large language model, LLM) ist ein Deep-Learning-Modell, das auf gewaltigen Textmengen trainiert wurde; IBM spricht von Milliarden oder Billionen Wörtern aus Büchern, Artikeln, Webseiten und Programmcode. Das Training ist selbstüberwacht (self-supervised): Das Modell bekommt den Anfang eines Satzes und soll das nächste Wort vorhersagen, und das tatsächliche nächste Wort im Text dient als richtige Antwort. Niemand muss dafür Beispiele beschriften, und weil unbeschrifteter Text reichlich und billig vorhanden ist, lässt sich das Verfahren auf riesige Datenmengen ausdehnen. Was das Modell dabei lernt, steckt in seinen Gewichten (weights), den inneren Stellgrößen des Netzes, von denen große Modelle nach IBM Milliarden oder Billionen haben. Technisch beruhen sie fast immer auf der Transformer-Architektur, die ein eigener Artikel beschreibt.',
          'Ein nur vortrainiertes Modell setzt Texte fort; ein Assistent, der Fragen beantwortet, ist es noch nicht. Nach IBM sind vortrainierte Sprachmodelle nicht von sich aus darauf ausgelegt, Anweisungen zu folgen. Dafür werden sie weitertrainiert: mit Paaren aus Anfrage und gewünschter Antwort (instruction tuning) und mit menschlichen Bewertungen, bei denen Menschen Antworten in eine Rangfolge bringen und das Modell lernt, die besser bewerteten zu bevorzugen (reinforcement learning from human feedback, RLHF). Long Ouyang und Kollegen (2022) zeigten, wie viel das ausmacht: Prüfer zogen die Antworten eines so nachtrainierten Modells mit 1,3 Milliarden Parametern denen des hundertmal größeren GPT-3 vor. Rishi Bommasani und Kollegen (2021) nennen solche breit vortrainierten, für viele Aufgaben anpassbaren Modelle Basismodelle (foundation models).',
        ],
      },
      {
        titel: 'Wie eine Antwort entsteht',
        absaetze: [
          'Beim Antworten zerlegt das Modell die Eingabe in Token, meist Wortteile, übersetzt sie in Zahlenvektoren und erzeugt die Antwort Stück für Stück. IBM beschreibt den Ablauf so: Für jedes mögliche nächste Token berechnet das Modell eine Wahrscheinlichkeit, gibt das wahrscheinlichste aus, hängt es an den bisherigen Text und beginnt von vorn, bis die Antwort fertig ist. Einstellungen wie die Temperatur (temperature) bringen Zufall hinein, sodass auch ein anderes der wahrscheinlichen Token gewählt werden kann; deshalb bekommt dieselbe Frage manchmal verschiedene Antworten. Entscheidend ist ein Satz aus derselben Quelle: Das Modell „kennt“ die Antwort nicht im Voraus, sondern setzt bei jedem Schritt nach den statistischen Zusammenhängen aus dem Training seine beste Vermutung. Trainiert wurde es darauf, plausibel fortzusetzen, nicht darauf, wahr zu sein.',
          'Daraus entstehen Halluzinationen: Informationen, die nach IBM falsch oder irreführend sind, aber plausibel klingen. Adam Tauman Kalai und Kollegen (2025) erklären, warum sie nicht verschwinden. Schon im Vortraining entstehen sie aus statistischen Gründen: Wo ein Modell falsche Aussagen nicht von Tatsachen unterscheiden kann, erzeugt es zwangsläufig auch falsche. Dass sie das Nachtraining überstehen, liegt nach ihrer Analyse an der Bewertung: Die meisten Tests belohnen eine geratene Antwort und geben für das Eingeständnis von Unsicherheit nichts, wie eine Prüfung, in der Raten mehr Punkte bringt als eine leere Zeile. Ein Sprachmodell ist deshalb kein Nachschlagewerk. Sein Wissen endet mit seinen Trainingsdaten und kann fehlen oder falsch sein, ohne dass die Formulierung es verrät.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Steuerkanzlei mit 40 Beschäftigten will ein Sprachmodell einsetzen und fragt, ob es Mandantenfragen „einfach beantworten“ könne. Die Beraterin trennt Aufgaben, bei denen Plausibilität genügt, von solchen, bei denen es auf Wahrheit ankommt. Ein Anschreiben glätten, ein langes Protokoll zusammenfassen, einen Fachtext in einfache Sprache übertragen: Hier ist das Modell stark, weil die Fakten im Eingangstext stehen und ein Mensch das Ergebnis ohnehin liest. Eine Frist nennen, eine Vorschrift zitieren, ein Urteil mit Aktenzeichen belegen: Hier kann das Modell eine Fundstelle ausgeben, die richtig aussieht und nicht existiert. Für diese Aufgaben schlägt sie vor, die Fakten aus einer geprüften eigenen Quelle zuzuliefern, wie im Artikel über RAG beschrieben, und jede Aussage mit Fundstelle von einer Fachkraft freigeben zu lassen. Die Kanzlei bekommt so ein Werkzeug für Entwürfe, keine Auskunftsmaschine.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein Sprachmodell gibt keine Garantie für wahre Aussagen, und die Sicherheit seines Tons sagt nichts über die Richtigkeit. IBM nennt weitere Schwächen: Modelle können Verzerrungen ihrer Trainingsdaten wiedergeben und verstärken, und Training wie Betrieb brauchen viel Rechenleistung. Bommasani und Kollegen weisen auf eine strukturelle Folge hin: Wenn viele Anwendungen auf wenigen Basismodellen aufbauen, erben alle angepassten Modelle deren Mängel, und noch fehle ein klares Verständnis davon, wie diese Modelle funktionieren, wann sie versagen und was sie überhaupt können. Auch das Nachtraining hat Grenzen; Ouyang und Kollegen halten fest, dass ihre Modelle weiter einfache Fehler machen. Für Projekte heißt das: an eigenen, typischen Fragen messen, wie oft das Modell falsch liegt, und prüfen, ob es bei fehlendem Wissen „das weiß ich nicht“ sagt, statt zu raten.',
        ],
      },
    ],
    quellen: [Q.ibmLlm, Q.ibmSsl, Q.ouyang2022, Q.bommasani2021, Q.kalai2025],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'transformer',
    abschnitte: [
      {
        titel: 'Das Problem vor 2017',
        absaetze: [
          'Vor dem Transformer verarbeiteten Sprachmodelle Text meist mit rekurrenten neuronalen Netzen (recurrent neural networks): Sie lasen einen Satz Wort für Wort und trugen einen Zwischenstand von Schritt zu Schritt weiter. Ashish Vaswani und Kollegen beschreiben den Nachteil: Diese von Natur aus schrittweise Rechnung verhindert, dass innerhalb eines Trainingsbeispiels parallel gerechnet wird. Bei Übersetzungen kam ein zweites Problem hinzu. Ein Kodierer (encoder) fasste den ganzen Ausgangssatz in einem Vektor fester Länge zusammen, aus dem ein Dekodierer (decoder) die Übersetzung erzeugte. Dzmitry Bahdanau, Kyunghyun Cho und Yoshua Bengio (2014) sahen in diesem festen Vektor einen Engpass und ließen das Modell stattdessen bei jedem Zielwort selbst nach den Teilen des Ausgangssatzes suchen, die dafür wichtig sind. Das war der Aufmerksamkeitsmechanismus (attention), damals noch als Ergänzung rekurrenter Netze.',
          'Vaswani und sieben weitere Autoren gingen 2017 mit der Arbeit „Attention Is All You Need“ einen Schritt weiter: eine Architektur, die ausschließlich auf Aufmerksamkeit beruht und auf rekurrente und faltende Netze (convolutional networks) ganz verzichtet. Ihre Übersetzungsmodelle waren nach eigenen Angaben besser, stärker parallelisierbar und deutlich schneller zu trainieren. Vom Englischen ins Deutsche übertraf ihr großes Modell alle zuvor veröffentlichten Ergebnisse, auch Kombinationen mehrerer Modelle; es trainierte dreieinhalb Tage auf acht Grafikprozessoren, einem Bruchteil der Kosten früherer Spitzenmodelle. Dass die Architektur nicht an Übersetzungen gebunden ist, zeigten die Autoren gleich mit: Auch bei der grammatischen Zerlegung englischer Sätze lieferte sie gute Ergebnisse.',
        ],
      },
      {
        titel: 'Wie Selbst-Aufmerksamkeit funktioniert',
        absaetze: [
          'Selbst-Aufmerksamkeit (self-attention) heißt: Jedes Token eines Textes betrachtet alle anderen Token desselben Textes und bestimmt, wie stark sie seine Bedeutung beeinflussen. Dazu erzeugt das Modell für jedes Token drei Vektoren. IBM erklärt sie so: Die Anfrage (query) steht für die Information, die ein Token sucht, der Schlüssel (key) für die Information, die ein Token enthält, und der Wert (value) für das, was es weitergibt. Das Modell vergleicht die Anfrage eines Tokens mit den Schlüsseln aller anderen, rechnet die Übereinstimmungen in Gewichte um, die zusammen eins ergeben, und bildet daraus eine gewichtete Summe der Werte. Im Satz „Die Bank am Fluss war nass“ kann „Fluss“ so ein hohes Gewicht für „Bank“ bekommen, und die Darstellung von „Bank“ rückt in Richtung Ufer statt Geldinstitut. Weil diese Vergleiche für alle Token gleichzeitig laufen, lässt sich die Rechnung auf Grafikprozessoren verteilen; nach IBM hat erst das ermöglicht, Modelle auf bis dahin unerreichten Datenmengen zu trainieren.',
          'Drei Bausteine kommen hinzu. Die mehrköpfige Aufmerksamkeit (multi-head attention) lässt mehrere solcher Rechnungen nebeneinander laufen, damit das Modell verschiedene Gesichtspunkte zugleich berücksichtigen kann. Die Positionskodierung (positional encoding) fügt die Reihenfolge hinzu: Weil das Modell alle Token gleichzeitig betrachtet, weiß es von sich aus nicht, welches zuerst kam. Und die Schichten liegen übereinander, im Original je sechs im Kodierer und im Dekodierer. Der Dekodierer erzeugt seine Ausgabe schrittweise (autoregressive): Jedes neue Token wird aus der Eingabe und den bereits erzeugten Token berechnet. Genau so schreiben heutige Sprachmodelle ihre Antworten.',
        ],
      },
      {
        titel: 'Varianten und Stand heute',
        absaetze: [
          'Aus dem Original sind drei Familien hervorgegangen. Reine Kodierer wie BERT lesen einen Text in beide Richtungen und bilden nach IBM bis heute die Grundlage der meisten Anwendungen, die Text in Vektoren übersetzen, etwa für Vektordatenbanken. Reine Dekodierer erzeugen Text Token für Token; zu ihnen zählt IBM die meisten Sprachmodelle, die die Öffentlichkeit kennt, geschlossene wie offene. Kodierer-Dekodierer-Modelle wie das Original eignen sich für Aufgaben, die einen Text in einen anderen überführen. Daneben gibt es hybride Modelle, etwa die im Oktober 2025 veröffentlichten Granite-4.0-Modelle von IBM, die Schichten eines anderen Verfahrens namens Mamba-2 mit klassischen Transformer-Blöcken im Verhältnis neun zu eins kombinieren. Die große Mehrheit der Sprachmodelle beruht weiter auf dem Transformer, Stand September 2026 aber nicht mehr ausnahmslos.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Die Geschäftsführerin eines Logistikdienstleisters mit 180 Beschäftigten hat gelesen, neue Architekturen könnten den Transformer ablösen, und fragt, ob sie mit ihrem Vorhaben warten soll: Ein Assistent soll Frachtbriefe und Lieferverträge auswerten. Der Berater erklärt, dass die Architektur für sie über drei spürbare Größen wirkt: wie lange Dokumente ein Modell verarbeiten kann, wie schnell es antwortet und was eine Anfrage kostet. Gerade hier liegt die Schwäche des Transformers, denn sein Rechenaufwand wächst mit der Länge der Eingabe im Quadrat. Entschieden wird deshalb nicht nach Architektur, sondern nach Messung: Zwei oder drei Modelle werden mit einer Stichprobe echter Frachtpapiere auf Richtigkeit, Antwortzeit und Kosten je Dokument geprüft. Wird der Assistent so gebaut, dass sich das Modell austauschen lässt, kann ein späterer Wechsel die heutige Wahl korrigieren.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die bekannteste Grenze steht schon in der Originalarbeit. Vaswani und Kollegen geben den Rechenaufwand einer Selbst-Aufmerksamkeitsschicht als quadratisch in der Länge der Eingabe an und schlagen für sehr lange Sequenzen vor, die Aufmerksamkeit auf eine Nachbarschaft zu beschränken. IBM nennt das den quadratischen Engpass: Verdoppelt sich die Länge des Kontexts, vervierfacht sich die Zahl der Rechenschritte, die das Modell ausführen und im Speicher halten muss; das kostet Geschwindigkeit und Geld und kann bei langen Texten selbst hochwertige Grafikkarten für Endkunden an ihre Speichergrenze bringen. Die hybriden Granite-Modelle sind eine Antwort darauf, weil der Aufwand von Mamba nur linear mit der Länge wächst. Zudem ist „Aufmerksamkeit“ ein Bild: Technisch ist sie eine gewichtete Summe gelernter Vektoren. Die Architektur legt fest, wie ein Modell rechnet, nicht, was es weiß; ob seine Antworten stimmen, entscheiden Daten und Training.',
        ],
      },
    ],
    quellen: [Q.vaswani2017, Q.bahdanau2014, Q.ibmTransformer, Q.ibmGranite4],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'token-kontext',
    abschnitte: [
      {
        titel: 'Was ein Token ist',
        absaetze: [
          'Ein Sprachmodell rechnet weder mit Buchstaben noch mit ganzen Wörtern, sondern mit Token: Stücken aus einem festen Vokabular. Ein Tokenisierer (tokenizer) zerlegt jeden Text vor der Verarbeitung in eine Folge solcher Stücke. Häufige Wörter sind oft ein einziges Token, seltene Wörter und Zusammensetzungen zerfallen in mehrere Teile. Eine grundlegende Arbeit dazu stammt von Rico Sennrich, Barry Haddow und Alexandra Birch: Sie ließen ein Übersetzungsmodell seltene und unbekannte Wörter als Folge von Wortteilen (subword units) verarbeiten, weil sich Namen, zusammengesetzte Wörter und Lehnwörter aus kleineren Einheiten übersetzen lassen. Ihr Verfahren, die Byte-Paar-Kodierung (byte pair encoding), stammt aus der Datenkompression: Es fasst schrittweise das häufigste Paar von Zeichen oder Zeichenfolgen zu einem neuen Symbol zusammen. So kann ein festes Vokabular jedes Wort darstellen.',
          'Wie viel Text ein Token ist, hängt von Sprache und Tokenisierer ab. Die Preisseite von Anthropic nennt als grobe Faustregel für englischen Text etwa vier Zeichen oder drei Viertel eines Wortes je Token, mit Schwankungen je nach Sprache und Inhalt. IBM rechnet allgemein mit ungefähr 1,5 Token je Wort und beschreibt ein Beispiel, in dem ein Satz in Telugu mehr als siebenmal so viele Token ergab wie derselbe Satz auf Englisch. Selbst beim selben Anbieter ändert sich die Rechnung: Nach Anthropics Preisseite erzeugt der Tokenisierer seiner neueren Modelle für denselben Text rund 30 Prozent mehr Token. Token-Zahlen verschiedener Modelle sind deshalb nur vergleichbar, wenn man denselben Text mit beiden zählt.',
        ],
      },
      {
        titel: 'Das Kontextfenster',
        absaetze: [
          'Das Kontextfenster (context window) ist nach IBM die Textmenge, gemessen in Token, die ein Modell auf einmal berücksichtigen kann. Hinein zählt alles, was bei einer Anfrage zusammenkommt: die meist unsichtbare Systemanweisung, der bisherige Gesprächsverlauf, eingefügte Dokumente, bei RAG die abgerufenen Textstellen und, wie die Entwicklerdokumentation von Anthropic festhält, auch die Antwort selbst, einschließlich der Token, mit denen ein Modell vor der Antwort „nachdenkt“. Die Länge der Ausgabe ist meist zusätzlich gesondert begrenzt. Wird das Fenster überschritten, muss der Text nach IBM gekürzt oder zusammengefasst werden. Die Fenster sind stark gewachsen: Das Modell, mit dem ChatGPT startete, fasste nach IBM 4.096 Token, im Oktober 2024 reichten die Angaben für verbreitete Modelle bis zu zwei Millionen Token bei einem Modell von Google, und Anthropic nennt im September 2026 für seine neueren Modelle ein Fenster von einer Million Token.',
        ],
      },
      {
        titel: 'Warum in Token abgerechnet wird',
        absaetze: [
          'Der Rechenaufwand hängt an den Token. Bei jedem neuen Token berechnet das Modell nach IBM die Beziehungen zu allen vorangehenden; verdoppelt sich die Zahl der Eingabe-Token, braucht es rund viermal so viel Rechenleistung, und längere Kontexte machen Antworten langsamer. Anbieter rechnen deshalb in Token ab. Die Preisliste von Anthropic vom September 2026 zeigt den Aufbau: Preise je Million Token, getrennt für Eingabe und Ausgabe, und ein Ausgabe-Token kostet dort bei jedem Modell das Fünffache eines Eingabe-Tokens; die Token des „Nachdenkens“ werden als Ausgabe berechnet. Wichtig für die Kostenplanung: Das Modell merkt sich zwischen zwei Anfragen nichts. Nach Anthropics Dokumentation enthält jede neue Anfrage den gesamten bisherigen Gesprächsverlauf, und lange Gespräche werden so mit jeder Runde teurer. Zwischenspeicher für wiederholte Eingaben (prompt caching) senken diesen Preis, heben ihn aber nicht auf.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Hausverwaltung mit 25 Beschäftigten möchte Fragen zu Mietverträgen, Hausordnungen und Protokollen von Eigentümerversammlungen von einem Assistenten beantworten lassen; der Bestand umfasst mehrere tausend Seiten. Die Beraterin rechnet zuerst in Token, nicht in Seiten. Der ganze Bestand passt in kein Fenster, und selbst wenn er passte, würde jede Frage Preis und Wartezeit für den gesamten Bestand verursachen. Sie schlägt vor, die Unterlagen in Abschnitte zu zerlegen (chunking) und je Frage nur die passenden Abschnitte ins Fenster zu holen, wie im Artikel über RAG beschrieben. Anders liegt der Fall, wenn eine Verwalterin einen einzelnen langen Vertrag prüfen will: Der passt bei heutigen Fenstergrößen vollständig hinein, und dann ist es einfacher, ihn ganz mitzugeben. Die Rechnung in Token entscheidet also über die Bauweise.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein größeres Fenster heißt nicht, dass das Modell alles darin gleich gut nutzt. Nelson Liu und Kollegen (2024) legten Sprachmodellen lange Eingaben vor, in denen die entscheidende Information an verschiedenen Stellen stand. Die Leistung war meist am höchsten, wenn sie am Anfang oder am Ende stand, und sank deutlich, wenn sie in der Mitte lag, auch bei Modellen, die ausdrücklich für lange Kontexte gebaut waren („lost in the middle“). Anthropic beschreibt dasselbe allgemeiner: Mit wachsender Token-Zahl nehmen Genauigkeit und Erinnerung ab (context rot), deshalb sei die Auswahl dessen, was ins Fenster kommt, ebenso wichtig wie der verfügbare Platz. IBM ergänzt, dass lange Kontexte nach einer Untersuchung von Anthropic auch anfälliger dafür machen, Sicherheitsvorkehrungen zu umgehen (jailbreaking). Faustregeln, Fenstergrößen und Preise ändern sich mit jedem Modell; wer plant, misst mit eigenen Dokumenten.',
        ],
      },
    ],
    quellen: [Q.ibmKontextfenster, Q.sennrich2016, Q.liu2024, Q.anthropicKontext, Q.anthropicPreise],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'embedding',
    abschnitte: [
      {
        titel: 'Bedeutung als Koordinaten',
        absaetze: [
          'Ein Embedding ist nach IBM die Darstellung eines Objekts, etwa eines Textes, Bildes oder Tonstücks, als Punkt in einem Vektorraum, dessen Lage für ein Lernverfahren eine Bedeutung trägt. Ein Vektor ist eine Liste von Zahlen, jede Zahl die Position auf einer Achse. Man kann sich eine Landkarte vorstellen, nur mit sehr vielen Achsen statt zwei; IBM nennt tausend und mehr Dimensionen, je nach Komplexität der Daten. Je näher zwei Punkte beieinander liegen, desto ähnlicher sind die Objekte. Die Achsen hat niemand festgelegt: Embeddings werden von neuronalen Netzen aus Daten gelernt, statt von Fachleuten definiert. Text-Embeddings übertragen das Prinzip von einzelnen Wörtern auf ganze Sätze, Absätze und Dokumente.',
          'Wie viel Struktur in solchen Räumen steckt, zeigen Tomas Mikolov und Kollegen (2013). Sie berechneten Wortvektoren aus einem Textbestand von 1,6 Milliarden Wörtern in weniger als einem Tag und beschreiben, dass sich mit einfacher Vektorrechnung Beziehungen ablesen lassen: Zieht man vom Vektor für „König“ den für „Mann“ ab und addiert den für „Frau“, liegt das Ergebnis am nächsten beim Vektor für „Königin“; ebenso verhält sich Frankreich zu Paris wie Deutschland zu Berlin. Für die Praxis heißt das: Bedeutung wird vergleichbar. Die Frage „Wie kündige ich?“ kann nahe bei einem Absatz über die „Vertragsbeendigung“ liegen, obwohl beide kein Wort gemeinsam haben.',
        ],
      },
      {
        titel: 'Wie die Ähnlichkeitssuche arbeitet',
        absaetze: [
          'Nähe wird über den Abstand oder den Winkel zwischen Vektoren gemessen; IBM nennt den euklidischen Abstand und die Kosinus-Ähnlichkeit (cosine similarity). Die Kosinus-Ähnlichkeit lässt sich gut vorstellen, wenn man jeden Vektor als Pfeil denkt: Zeigen zwei Pfeile in dieselbe Richtung, ist der Wert eins, stehen sie rechtwinklig zueinander, ist er null; es zählt die Richtung, nicht die Länge. Eine Vektordatenbank (vector database) nutzt das für die Suche. Nach IBM werden die Embeddings der Dokumente vorab berechnet und gespeichert. Stellt jemand eine Frage, wird auch sie in einen Vektor übersetzt, den Anfragevektor (query vector); die Datenbank vergleicht ihn mit den gespeicherten Vektoren, berechnet Ähnlichkeitswerte und liefert die nächsten Nachbarn (nearest neighbors). In einer RAG-Anwendung sind diese Treffer die Textstellen, die das Sprachmodell als Kontext bekommt.',
          'Schnell ist das nur mit einem Kniff. Jeden gespeicherten Vektor einzeln zu vergleichen, wird bei großen Beständen zu langsam. Vektordatenbanken bauen deshalb Indizes für die näherungsweise Nachbarsuche (approximate nearest neighbor, ANN), die ähnliche Vektoren finden, ohne den ganzen Bestand zu durchsuchen. Ein verbreitetes Verfahren, HNSW (hierarchical navigable small world), ordnet die Vektoren nach IBM in einem mehrschichtigen Graphen: oben weite Verbindungen für den groben Sprung in die richtige Gegend, unten dichte örtliche Verbindungen für die Feinsuche, so wie man sich erst auf der Autobahn und dann im Stadtplan orientiert. Der Preis ist, dass eine näherungsweise Suche den besten Treffer verfehlen kann. Viele Systeme verbinden die Vektorsuche zudem mit Bedingungen an Metadaten, etwa einem Zeitraum oder einer Kategorie.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Großhändler für Sanitärbedarf mit 90 Beschäftigten will seinem Innendienst eine Suche über Datenblätter, Montageanleitungen und Kundenkorrespondenz geben. Die Vektorsuche löst ein altes Problem: Ein Kunde schreibt „der Wasserhahn tropft nach dem Zudrehen“, die Anleitung spricht vom Tausch der Kartusche, und eine Stichwortsuche findet nach IBM nur, was genau so dasteht. Bei Artikelnummern und Normbezeichnungen zählt dagegen die exakte Zeichenfolge, und darin ist die Stichwortsuche stark. Der Berater empfiehlt deshalb eine hybride Suche, die Stichwort- und Vektortreffer zusammenführt, dazu Filter nach Warengruppe und Gültigkeitsdatum, und ein Embedding-Modell, das mit deutscher Fachsprache umgehen kann. Vor der Einführung wird mit einigen Dutzend echten Fragen gemessen, ob die richtigen Dokumente unter den ersten Treffern sind.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ähnlichkeit ist nicht Relevanz und schon gar nicht Richtigkeit: Die Suche findet, was ähnlich klingt, auch eine veraltete Fassung derselben Richtlinie. Wie gut sie findet, hängt stark vom Fachgebiet ab. Nandan Thakur und Kollegen (2021) verglichen zehn Suchverfahren auf 18 Datensätzen aus verschiedenen Gebieten, ohne die Verfahren vorher darauf anzupassen. Das klassische Stichwortverfahren BM25 erwies sich als robuster Vergleichsmaßstab; Verfahren mit dichten Vektoren waren effizient, schnitten aber oft schlechter ab als andere Ansätze, was nach den Autoren zeigt, wie viel ihrer Übertragbarkeit auf neue Gebiete noch fehlt. Wer eine eigene Fachsprache hat, muss ein Embedding-Modell deshalb an eigenen Fragen testen.',
          'Zweitens sind Embeddings keine Anonymisierung. John Morris und Kollegen (2023) zeigten, dass sich aus Text-Embeddings der ursprüngliche Text weitgehend zurückgewinnen lässt: Ihr Verfahren stellte 92 Prozent von Eingaben mit 32 Token exakt wieder her und gewann aus Embeddings klinischer Notizen vollständige Namen zurück. Personal- und Gesundheitsdaten brauchen in der Vektordatenbank denselben Schutz wie im Original. Drittens bindet jede Vektordatenbank an ihr Embedding-Modell: Frage und Dokumente müssen mit demselben Modell übersetzt werden, und ein Modellwechsel bedeutet, den ganzen Bestand neu zu berechnen.',
        ],
      },
    ],
    quellen: [Q.ibmEmbedding, Q.ibmVektordatenbank, Q.mikolov2013, Q.thakur2021, Q.morris2023],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'rag',
    abschnitte: [
      {
        titel: 'Herkunft und Grundidee',
        absaetze: [
          'Der Begriff stammt aus einer Arbeit von Patrick Lewis und Kollegen, 2020 auf der Konferenz NeurIPS vorgestellt. Große vortrainierte Sprachmodelle, so ihr Ausgangspunkt, speichern Faktenwissen in ihren Parametern, können aber nur begrenzt gezielt darauf zugreifen, und offen sei, wie man ihre Aussagen belegt und ihr Wissen aktualisiert. Ihre Antwort verbindet zwei Gedächtnisse: ein parametrisches, das Sprachmodell selbst, und ein nicht-parametrisches, einen Vektorindex über die Wikipedia, den ein neuronaler Suchbaustein (retriever) durchsucht. Der Unterschied ist der zwischen dem, was jemand im Kopf hat, und einem Nachschlagewerk auf dem Tisch. Die Modelle erreichten auf drei Aufgaben der offenen Fragebeantwortung den damaligen Bestwert und formulierten spezifischer, vielfältiger und sachlich richtiger als ein Vergleichsmodell ohne Nachschlagen.',
          'Wie sich Wissen so auswechseln lässt, zeigten die Autoren an einem Versuch: Sie fragten nach 82 Staats- und Regierungschefs, die zwischen Dezember 2016 und Dezember 2018 gewechselt hatten, etwa „Wer ist der Präsident von Peru?“. Mit einem Wikipedia-Index vom jeweils passenden Stand antwortete das System in 70 beziehungsweise 68 Prozent der Fälle richtig, mit dem unpassenden nur in 12 beziehungsweise 4 Prozent; um das Wissen zu aktualisieren, genügte es, den Index zu tauschen. Ein Unterschied zum heutigen Gebrauch ist allerdings wichtig: Lewis und Kollegen trainierten Suchbaustein und Sprachmodell gemeinsam auf ihre Aufgaben nach. In Unternehmensanwendungen, wie IBM und die Datenschutzkonferenz des Bundes und der Länder (DSK) sie beschreiben, bleibt das Sprachmodell dagegen unverändert. Die DSK hält in ihrer Orientierungshilfe vom Oktober 2025 fest, dass die erweiterte Anfrage jedes Mal neu aus der Datenquelle gebildet wird und das Modell nicht verändert.',
        ],
      },
      {
        titel: 'Der Ablauf',
        absaetze: [
          'Die DSK beschreibt den verbreiteten Aufbau mit Vektordatenbank in zwei Phasen. Vor der Nutzung werden die Referenzdokumente aufbereitet: Störendes wie Kopf- und Fußzeilen oder Seitenzahlen wird entfernt, der Text in kürzere Abschnitte (chunks) geteilt, jeder Abschnitt von einem Embedding-Modell in einen Vektor übersetzt und mit dem Text gespeichert. Bei der Nutzung wird die Frage mit demselben Modell in einen Anfragevektor übersetzt, der Suchbaustein holt die Abschnitte mit dem geringsten Abstand, die Frage wird um sie ergänzt, und das Sprachmodell formuliert die Antwort. Im Idealfall stammt das Faktenwissen vollständig aus den Dokumenten und das Modell steuert nur die Sprache bei; die DSK merkt an, dass das technisch nicht immer gelingt. Die Aufteilung ist kein Nebenschritt: Gleich große Abschnitte mit fester Zeichenzahl können Sinnzusammenhänge zerreißen, und für deutsche Dokumente sollte das Embedding-Modell mit deutschen Texten trainiert sein.',
        ],
      },
      {
        titel: 'Was RAG leistet',
        absaetze: [
          'Internes und aktuelles Wissen wird nutzbar, ohne das Modell neu zu trainieren; nach IBM können Unternehmen so eigene, verlässliche Datenquellen einsetzen. Antworten lassen sich mit Fundstellen versehen, die Nutzer selbst nachprüfen. Das Risiko von Halluzinationen sinkt, weil die Antwort an abgerufenen Text gebunden ist; IBM hält aber ausdrücklich fest, dass RAG ein Modell nicht fehlerfrei machen kann. Die DSK nennt zwei weitere Vorteile. Einträge in der Vektordatenbank lassen sich gezielt aktualisieren und löschen, anders als Wissen in den Gewichten eines Modells. Und Zugriffsrechte lassen sich im Suchbaustein mit bewährten Mitteln durchsetzen, etwa mit einem Rollen- und Rechtekonzept und getrennten Bereichen je Abteilung, während sich im Sprachmodell selbst nicht steuern lässt, wer welche Information sehen darf.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Stadtwerk mit 300 Beschäftigten will einen internen Assistenten für Dienstanweisungen, Tarifblätter und Betriebshandbücher. Die Beraterin beginnt nicht mit dem ganzen Bestand, sondern mit den Themen, zu denen im Kundenservice die meisten Rückfragen kommen. Die Dokumente werden bereinigt und entlang ihrer Überschriften aufgeteilt, Personalunterlagen kommen in einen eigenen Bereich, den nur die Personalabteilung durchsuchen darf. Jede Antwort zeigt ihre Fundstelle; findet die Suche nichts Passendes, sagt der Assistent, dass ihm dazu nichts vorliegt, statt zu raten. Exakte Werte wie aktuelle Tarifpreise holt er direkt aus dem Abrechnungssystem, statt sie aus einem Textabschnitt zu lesen. Gemessen wird der Pilot an einer Liste echter Fragen mit bekannter Antwort: Wie oft ist der richtige Abschnitt unter den Treffern, und wie oft stimmt die Antwort?',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'RAG ist nur so gut wie seine Quelle und seine Suche. Die Zuverlässigkeit hängt nach der DSK stark von Qualität, Aktualität und Vollständigkeit der Dokumente ab. Die Suche arbeitet mit inhaltlicher Nähe, und Gedankenketten, die sich über lange Passagen ziehen, stehen womöglich nicht im selben Abschnitt und kommen nur unvollständig beim Modell an. Zudem hält sich das Modell nicht immer an das Vorgelegte: Bei Widersprüchen kann es das Wissen aus seinen Trainingsdaten wiedergeben und die Dokumente übergehen. Ein rechtswidrig trainiertes Modell wird durch RAG nicht rechtmäßig.',
          'Die zweite Grenze ist die Sicherheit. Weil RAG fremde Texte in die Anfrage einspeist, wird jedes Dokument zur möglichen Angriffsfläche. Die OWASP-Liste der Risiken für Sprachmodell-Anwendungen führt 2025 eigens Schwächen von Vektoren und Embeddings auf: unberechtigter Zugriff, das Durchsickern von Inhalten zwischen Nutzergruppen einer gemeinsamen Datenbank und vergiftete Inhalte. Ihr Beispiel ist ein Lebenslauf mit weißer Schrift auf weißem Grund, die ein Bewerbungssystem anweist, den Kandidaten zu empfehlen; das System liest die versteckte Anweisung mit und folgt ihr. Der Artikel über Prompt Injection beschreibt die Abwehr.',
        ],
      },
    ],
    quellen: [Q.lewis2020, Q.ibmRag, Q.dskRag, Q.owaspLlm08],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'fine-tuning',
    abschnitte: [
      {
        titel: 'Was beim Weitertrainieren passiert',
        absaetze: [
          'Fine-tuning heißt nach IBM, ein vortrainiertes Modell für bestimmte Aufgaben oder Einsatzzwecke anzupassen. Es ist eine Form des Transferlernens (transfer learning): Das Modell bringt aus dem Vortraining allgemeine Fähigkeiten mit und lernt auf einem kleineren, aufgabenbezogenen Datensatz weiter. Der Vorgang gleicht dem ursprünglichen Training: Das Modell sieht ein Beispiel, etwa eine Anfrage mit der gewünschten Antwort, vergleicht seine eigene Ausgabe damit und verschiebt seine Gewichte so, dass die Abweichung kleiner wird. Danach ist es ein anderes Modell als vorher. Auch Chat-Assistenten entstehen so: IBM beschreibt das Training auf Anweisungen (instruction tuning) als Form des Fine-tunings, die Sprachmodelle für den Einsatz als Chatbot zuschneidet, ergänzt um das Lernen aus menschlichen Bewertungen (reinforcement learning from human feedback).',
          'Ein vollständiges Fine-tuning, bei dem alle Gewichte angepasst werden, ist nach IBM wie das Vortraining, dem es ähnelt, sehr rechenaufwendig. Deshalb gibt es parameter-effiziente Verfahren (parameter-efficient fine-tuning, PEFT), die nur eine Auswahl der Parameter trainieren. Eines davon ist LoRA, 2021 von Edward Hu und Kollegen beschrieben: Die ursprünglichen Gewichte bleiben eingefroren, und in jede Schicht werden kleine zusätzliche Matrizen eingesetzt, die allein trainiert werden. Am Beispiel von GPT-3 mit 175 Milliarden Parametern sank so die Zahl der zu trainierenden Parameter auf ein Zehntausendstel und der Speicherbedarf auf den Grafikprozessoren auf ein Drittel, bei gleicher oder besserer Qualität. Ein Unternehmen kann so für verschiedene Aufgaben kleine Zusatzmodule halten statt vollständiger Kopien des Modells.',
        ],
      },
      {
        titel: 'Gewichte oder Kontext: wo Fine-tuning und RAG ansetzen',
        absaetze: [
          'RAG verändert, ebenso wie eine gute Anweisung im Prompt, nur das, was dem Modell im Moment der Anfrage vorliegt; die DSK hält fest, dass antrainiertes Wissen dadurch nicht verändert wird, anders als bei einem Fine-tuning. Fine-tuning verändert, wie das Modell grundsätzlich reagiert, weil es die Gewichte selbst verschiebt. Daraus folgt die Arbeitsteilung. Faktenwissen, das sich ändert, wie Preise, Richtlinien oder Lagerbestände, gehört in eine Quelle, die zur Anfragezeit abgefragt wird: Eine Änderung wirkt sofort, und die Antwort kann ihre Fundstelle nennen. Ein nachtrainiertes Modell kennt nur den Stand seines letzten Trainingslaufs und kann nicht angeben, woher eine Aussage stammt. Fine-tuning lohnt sich für das, was stabil bleiben soll: ein festes Ausgabeformat, ein bestimmter Ton, die Fachsprache einer Branche, eine eng umrissene Aufgabe.',
          'Dass Fine-tuning ein schlechter Weg ist, einem Modell neue Fakten beizubringen, zeigten Zorik Gekhman und Kollegen (2024) in einem kontrollierten Versuch. Beispiele mit Wissen, das das Modell noch nicht hatte, wurden deutlich langsamer gelernt als solche, die zu seinem Vorwissen passten, und je mehr davon schließlich gelernt waren, desto stärker neigte das Modell dazu, Falsches zu erfinden. Die Autoren folgern, dass Sprachmodelle Faktenwissen vor allem im Vortraining erwerben und Fine-tuning ihnen beibringt, es besser zu nutzen. Die DSK zitiert in dieselbe Richtung das Fraunhofer IESE: Fine-tuning solle nicht dafür eingesetzt werden, einem Modell Wissen anzutrainieren, könne aber helfen, einen Antwortstil zu berücksichtigen. Beide Verfahren lassen sich kombinieren; die DSK verweist auf eine Studie, nach der jedes für sich die Ergebnisse verbessern kann.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Hersteller von Landmaschinen mit 400 Beschäftigten will, dass sein Service-Assistent aktuelle Ersatzteilpreise und Lieferzeiten nennt und Störungsberichte im hauseigenen Format mit festen Feldern und gewohntem Ton schreibt. Der Kunde möchte dafür „das Modell auf unsere Daten trainieren“. Die Beraterin trennt die Wünsche. Preise und Lieferzeiten ändern sich laufend; sie werden zur Anfragezeit aus der Warenwirtschaft geholt, sonst wären sie mit der nächsten Preisänderung falsch. Für das Berichtsformat versucht sie zuerst eine genaue Anweisung mit einigen Musterberichten. Erst wenn das im Test nicht zuverlässig genug ist, folgt ein parameter-effizientes Fine-tuning auf freigegebenen früheren Berichten. Vorher legt sie Prüffälle fest, an denen das Modell vor und nach dem Training gemessen wird, einschließlich Anfragen, die es ablehnen soll.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Fine-tuning hat Nebenwirkungen. IBM beschreibt das katastrophale Vergessen (catastrophic forgetting): Das Weitertrainieren kann Kernwissen des Modells verlieren lassen oder destabilisieren; parameter-effiziente Verfahren verringern das Risiko nach IBM. Schwerer wiegt ein Befund von Xiangyu Qi und Kollegen (2023). Sie hebelten die Sicherheitsvorkehrungen eines kommerziellen Modells aus, indem sie es über die Schnittstelle des Anbieters mit nur zehn gezielt gestalteten Beispielen nachtrainierten, für weniger als 20 US-Cent; danach folgte es nahezu jeder schädlichen Anweisung. Auch ein Fine-tuning mit harmlosen, gängigen Datensätzen schwächte die Sicherheit, wenn auch weniger stark. Wer ein Modell nachtrainiert, muss seine Schutzmechanismen danach erneut prüfen.',
          'Dazu kommen Aufwand und Bindung. Trainingsdaten müssen gesammelt, geprüft und freigegeben werden, und ein neues Grundmodell verlangt einen neuen Trainingslauf. Was einmal in den Gewichten steckt, lässt sich nicht gezielt entfernen: Die DSK hält fest, dass die Probleme bei der Datenlöschung im Sprachmodell bestehen bleiben, während Einträge einer RAG-Quelle direkt löschbar sind. Personenbezogene oder vertrauliche Daten gehören deshalb nur nach sorgfältiger Prüfung in einen Trainingsdatensatz. Und jedes Fine-tuning braucht eine Messung: Ohne Prüffälle vor und nach dem Training weiß niemand, ob das Modell besser geworden ist oder nur anders.',
        ],
      },
    ],
    quellen: [Q.ibmFineTuning, Q.hu2021, Q.gekhman2024, Q.qi2023, Q.dskRag],
  },
];
