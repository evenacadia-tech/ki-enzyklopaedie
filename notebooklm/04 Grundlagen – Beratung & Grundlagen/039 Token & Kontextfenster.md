# Token & Kontextfenster

In welcher Einheit ein Modell rechnet — und wie viel es gleichzeitig „im Blick" hat — bestimmt Kosten, Grenzen und den Bedarf an RAG bei langen Dokumenten.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Token, Tokenisierung, Kontextfenster, Context Window.

## Was ein Token ist

Ein Sprachmodell rechnet weder mit Buchstaben noch mit ganzen Wörtern, sondern mit Token: Stücken aus einem festen Vokabular. Ein Tokenisierer (tokenizer) zerlegt jeden Text vor der Verarbeitung in eine Folge solcher Stücke. Häufige Wörter sind oft ein einziges Token, seltene Wörter und Zusammensetzungen zerfallen in mehrere Teile. Eine grundlegende Arbeit dazu stammt von Rico Sennrich, Barry Haddow und Alexandra Birch: Sie ließen ein Übersetzungsmodell seltene und unbekannte Wörter als Folge von Wortteilen (subword units) verarbeiten, weil sich Namen, zusammengesetzte Wörter und Lehnwörter aus kleineren Einheiten übersetzen lassen. Ihr Verfahren, die Byte-Paar-Kodierung (byte pair encoding), stammt aus der Datenkompression: Es fasst schrittweise das häufigste Paar von Zeichen oder Zeichenfolgen zu einem neuen Symbol zusammen. So kann ein festes Vokabular jedes Wort darstellen.

Wie viel Text ein Token ist, hängt von Sprache und Tokenisierer ab. Die Preisseite von Anthropic nennt als grobe Faustregel für englischen Text etwa vier Zeichen oder drei Viertel eines Wortes je Token, mit Schwankungen je nach Sprache und Inhalt. IBM rechnet allgemein mit ungefähr 1,5 Token je Wort und beschreibt ein Beispiel, in dem ein Satz in Telugu mehr als siebenmal so viele Token ergab wie derselbe Satz auf Englisch. Selbst beim selben Anbieter ändert sich die Rechnung: Nach Anthropics Preisseite erzeugt der Tokenisierer seiner neueren Modelle für denselben Text rund 30 Prozent mehr Token. Token-Zahlen verschiedener Modelle sind deshalb nur vergleichbar, wenn man denselben Text mit beiden zählt.

## Das Kontextfenster

Das Kontextfenster (context window) ist nach IBM die Textmenge, gemessen in Token, die ein Modell auf einmal berücksichtigen kann. Hinein zählt alles, was bei einer Anfrage zusammenkommt: die meist unsichtbare Systemanweisung, der bisherige Gesprächsverlauf, eingefügte Dokumente, bei RAG die abgerufenen Textstellen und, wie die Entwicklerdokumentation von Anthropic festhält, auch die Antwort selbst, einschließlich der Token, mit denen ein Modell vor der Antwort „nachdenkt“. Die Länge der Ausgabe ist meist zusätzlich gesondert begrenzt. Wird das Fenster überschritten, muss der Text nach IBM gekürzt oder zusammengefasst werden. Die Fenster sind stark gewachsen: Das Modell, mit dem ChatGPT startete, fasste nach IBM 4.096 Token, im Oktober 2024 reichten die Angaben für verbreitete Modelle bis zu zwei Millionen Token bei einem Modell von Google, und Anthropic nennt im September 2026 für seine neueren Modelle ein Fenster von einer Million Token.

## Warum in Token abgerechnet wird

Der Rechenaufwand hängt an den Token. Bei jedem neuen Token berechnet das Modell nach IBM die Beziehungen zu allen vorangehenden; verdoppelt sich die Zahl der Eingabe-Token, braucht es rund viermal so viel Rechenleistung, und längere Kontexte machen Antworten langsamer. Anbieter rechnen deshalb in Token ab. Die Preisliste von Anthropic vom September 2026 zeigt den Aufbau: Preise je Million Token, getrennt für Eingabe und Ausgabe, und ein Ausgabe-Token kostet dort bei jedem Modell das Fünffache eines Eingabe-Tokens; die Token des „Nachdenkens“ werden als Ausgabe berechnet. Wichtig für die Kostenplanung: Das Modell merkt sich zwischen zwei Anfragen nichts. Nach Anthropics Dokumentation enthält jede neue Anfrage den gesamten bisherigen Gesprächsverlauf, und lange Gespräche werden so mit jeder Runde teurer. Zwischenspeicher für wiederholte Eingaben (prompt caching) senken diesen Preis, heben ihn aber nicht auf.

## Im Beratungsalltag

Eine Hausverwaltung mit 25 Beschäftigten möchte Fragen zu Mietverträgen, Hausordnungen und Protokollen von Eigentümerversammlungen von einem Assistenten beantworten lassen; der Bestand umfasst mehrere tausend Seiten. Die Beraterin rechnet zuerst in Token, nicht in Seiten. Der ganze Bestand passt in kein Fenster, und selbst wenn er passte, würde jede Frage Preis und Wartezeit für den gesamten Bestand verursachen. Sie schlägt vor, die Unterlagen in Abschnitte zu zerlegen (chunking) und je Frage nur die passenden Abschnitte ins Fenster zu holen, wie im Artikel über RAG beschrieben. Anders liegt der Fall, wenn eine Verwalterin einen einzelnen langen Vertrag prüfen will: Der passt bei heutigen Fenstergrößen vollständig hinein, und dann ist es einfacher, ihn ganz mitzugeben. Die Rechnung in Token entscheidet also über die Bauweise.

## Grenzen und Kritik

Ein größeres Fenster heißt nicht, dass das Modell alles darin gleich gut nutzt. Nelson Liu und Kollegen (2024) legten Sprachmodellen lange Eingaben vor, in denen die entscheidende Information an verschiedenen Stellen stand. Die Leistung war meist am höchsten, wenn sie am Anfang oder am Ende stand, und sank deutlich, wenn sie in der Mitte lag, auch bei Modellen, die ausdrücklich für lange Kontexte gebaut waren („lost in the middle“). Anthropic beschreibt dasselbe allgemeiner: Mit wachsender Token-Zahl nehmen Genauigkeit und Erinnerung ab (context rot), deshalb sei die Auswahl dessen, was ins Fenster kommt, ebenso wichtig wie der verfügbare Platz. IBM ergänzt, dass lange Kontexte nach einer Untersuchung von Anthropic auch anfälliger dafür machen, Sicherheitsvorkehrungen zu umgehen (jailbreaking). Faustregeln, Fenstergrößen und Preise ändern sich mit jedem Modell; wer plant, misst mit eigenen Dokumenten.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Large Language Model (LLM)**: Das Sprachmodell ist der Motor moderner KI-Assistenten — und der Grund, warum ihre Ausgaben plausibel klingen, ohne dass sie „wissen" müssen, ob sie stimmen.
- **RAG (Retrieval-Augmented Generation)**: Der wohl wichtigste Architektur-Baustein für seriöse Unternehmens-KI: Wissen zur Laufzeit dazuladen, statt es ins Modell zu trainieren.
- **Embedding & Vektordatenbank**: Damit eine Maschine Bedeutung „vergleichen" kann, wird Text in Zahlenvektoren übersetzt — die Grundlage der Ähnlichkeitssuche und damit von RAG.

## Quellen

- Bergmann — What is a context window? (IBM Think, o. J.). https://www.ibm.com/think/topics/context-window (abgerufen am 28.09.2026)
- Sennrich, Haddow & Birch — Neural Machine Translation of Rare Words with Subword Units (arXiv, 2015; ACL 2016). https://arxiv.org/abs/1508.07909 (abgerufen am 28.09.2026)
- Liu, Lin, Hewitt, Paranjape, Bevilacqua, Petroni & Liang — Lost in the Middle: How Language Models Use Long Contexts (Transactions of the Association for Computational Linguistics 12, 2024). https://doi.org/10.1162/tacl_a_00638 (abgerufen am 28.09.2026)
- Anthropic — Context windows (Claude-Entwicklerdokumentation, Stand September 2026). https://platform.claude.com/docs/en/build-with-claude/context-windows (abgerufen am 28.09.2026)
- Anthropic — Pricing (Claude-Entwicklerdokumentation, Stand September 2026). https://platform.claude.com/docs/en/about-claude/pricing (abgerufen am 28.09.2026)
