# Fine-tuning

Die zweite Art, ein Modell an eine Domäne anzupassen — anders als RAG verändert sie das Modell selbst. Die Abgrenzung ist eine der häufigsten Beratungsfragen.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Fine-tuning, Feinabstimmung, Nachtraining.

## Was beim Weitertrainieren passiert

Fine-tuning heißt nach IBM, ein vortrainiertes Modell für bestimmte Aufgaben oder Einsatzzwecke anzupassen. Es ist eine Form des Transferlernens (transfer learning): Das Modell bringt aus dem Vortraining allgemeine Fähigkeiten mit und lernt auf einem kleineren, aufgabenbezogenen Datensatz weiter. Der Vorgang gleicht dem ursprünglichen Training: Das Modell sieht ein Beispiel, etwa eine Anfrage mit der gewünschten Antwort, vergleicht seine eigene Ausgabe damit und verschiebt seine Gewichte so, dass die Abweichung kleiner wird. Danach ist es ein anderes Modell als vorher. Auch Chat-Assistenten entstehen so: IBM beschreibt das Training auf Anweisungen (instruction tuning) als Form des Fine-tunings, die Sprachmodelle für den Einsatz als Chatbot zuschneidet, ergänzt um das Lernen aus menschlichen Bewertungen (reinforcement learning from human feedback).

Ein vollständiges Fine-tuning, bei dem alle Gewichte angepasst werden, ist nach IBM wie das Vortraining, dem es ähnelt, sehr rechenaufwendig. Deshalb gibt es parameter-effiziente Verfahren (parameter-efficient fine-tuning, PEFT), die nur eine Auswahl der Parameter trainieren. Eines davon ist LoRA, 2021 von Edward Hu und Kollegen beschrieben: Die ursprünglichen Gewichte bleiben eingefroren, und in jede Schicht werden kleine zusätzliche Matrizen eingesetzt, die allein trainiert werden. Am Beispiel von GPT-3 mit 175 Milliarden Parametern sank so die Zahl der zu trainierenden Parameter auf ein Zehntausendstel und der Speicherbedarf auf den Grafikprozessoren auf ein Drittel, bei gleicher oder besserer Qualität. Ein Unternehmen kann so für verschiedene Aufgaben kleine Zusatzmodule halten statt vollständiger Kopien des Modells.

## Gewichte oder Kontext: wo Fine-tuning und RAG ansetzen

RAG verändert, ebenso wie eine gute Anweisung im Prompt, nur das, was dem Modell im Moment der Anfrage vorliegt; die DSK hält fest, dass antrainiertes Wissen dadurch nicht verändert wird, anders als bei einem Fine-tuning. Fine-tuning verändert, wie das Modell grundsätzlich reagiert, weil es die Gewichte selbst verschiebt. Daraus folgt die Arbeitsteilung. Faktenwissen, das sich ändert, wie Preise, Richtlinien oder Lagerbestände, gehört in eine Quelle, die zur Anfragezeit abgefragt wird: Eine Änderung wirkt sofort, und die Antwort kann ihre Fundstelle nennen. Ein nachtrainiertes Modell kennt nur den Stand seines letzten Trainingslaufs und kann nicht angeben, woher eine Aussage stammt. Fine-tuning lohnt sich für das, was stabil bleiben soll: ein festes Ausgabeformat, ein bestimmter Ton, die Fachsprache einer Branche, eine eng umrissene Aufgabe.

Dass Fine-tuning ein schlechter Weg ist, einem Modell neue Fakten beizubringen, zeigten Zorik Gekhman und Kollegen (2024) in einem kontrollierten Versuch. Beispiele mit Wissen, das das Modell noch nicht hatte, wurden deutlich langsamer gelernt als solche, die zu seinem Vorwissen passten, und je mehr davon schließlich gelernt waren, desto stärker neigte das Modell dazu, Falsches zu erfinden. Die Autoren folgern, dass Sprachmodelle Faktenwissen vor allem im Vortraining erwerben und Fine-tuning ihnen beibringt, es besser zu nutzen. Die DSK zitiert in dieselbe Richtung das Fraunhofer IESE: Fine-tuning solle nicht dafür eingesetzt werden, einem Modell Wissen anzutrainieren, könne aber helfen, einen Antwortstil zu berücksichtigen. Beide Verfahren lassen sich kombinieren; die DSK verweist auf eine Studie, nach der jedes für sich die Ergebnisse verbessern kann.

## Im Beratungsalltag

Ein Hersteller von Landmaschinen mit 400 Beschäftigten will, dass sein Service-Assistent aktuelle Ersatzteilpreise und Lieferzeiten nennt und Störungsberichte im hauseigenen Format mit festen Feldern und gewohntem Ton schreibt. Der Kunde möchte dafür „das Modell auf unsere Daten trainieren“. Die Beraterin trennt die Wünsche. Preise und Lieferzeiten ändern sich laufend; sie werden zur Anfragezeit aus der Warenwirtschaft geholt, sonst wären sie mit der nächsten Preisänderung falsch. Für das Berichtsformat versucht sie zuerst eine genaue Anweisung mit einigen Musterberichten. Erst wenn das im Test nicht zuverlässig genug ist, folgt ein parameter-effizientes Fine-tuning auf freigegebenen früheren Berichten. Vorher legt sie Prüffälle fest, an denen das Modell vor und nach dem Training gemessen wird, einschließlich Anfragen, die es ablehnen soll.

## Grenzen und Kritik

Fine-tuning hat Nebenwirkungen. IBM beschreibt das katastrophale Vergessen (catastrophic forgetting): Das Weitertrainieren kann Kernwissen des Modells verlieren lassen oder destabilisieren; parameter-effiziente Verfahren verringern das Risiko nach IBM. Schwerer wiegt ein Befund von Xiangyu Qi und Kollegen (2023). Sie hebelten die Sicherheitsvorkehrungen eines kommerziellen Modells aus, indem sie es über die Schnittstelle des Anbieters mit nur zehn gezielt gestalteten Beispielen nachtrainierten, für weniger als 20 US-Cent; danach folgte es nahezu jeder schädlichen Anweisung. Auch ein Fine-tuning mit harmlosen, gängigen Datensätzen schwächte die Sicherheit, wenn auch weniger stark. Wer ein Modell nachtrainiert, muss seine Schutzmechanismen danach erneut prüfen.

Dazu kommen Aufwand und Bindung. Trainingsdaten müssen gesammelt, geprüft und freigegeben werden, und ein neues Grundmodell verlangt einen neuen Trainingslauf. Was einmal in den Gewichten steckt, lässt sich nicht gezielt entfernen: Die DSK hält fest, dass die Probleme bei der Datenlöschung im Sprachmodell bestehen bleiben, während Einträge einer RAG-Quelle direkt löschbar sind. Personenbezogene oder vertrauliche Daten gehören deshalb nur nach sorgfältiger Prüfung in einen Trainingsdatensatz. Und jedes Fine-tuning braucht eine Messung: Ohne Prüffälle vor und nach dem Training weiß niemand, ob das Modell besser geworden ist oder nur anders.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **RAG (Retrieval-Augmented Generation)**: Der wohl wichtigste Architektur-Baustein für seriöse Unternehmens-KI: Wissen zur Laufzeit dazuladen, statt es ins Modell zu trainieren.
- **Proprietär vs. Open-Weight**: Die Wahl zwischen API-Modell und selbst betriebenem Open-Weight-Modell ist keine reine Leistungsfrage, sondern eine Governance-Entscheidung — und ein sich schnell wandelndes Feld.

## Quellen

- Bergmann — What is fine-tuning? (IBM Think, 2024). https://www.ibm.com/think/topics/fine-tuning (abgerufen am 28.09.2026)
- Hu, Shen, Wallis, Allen-Zhu, Li, Wang, Wang & Chen — LoRA: Low-Rank Adaptation of Large Language Models (arXiv, 2021). https://arxiv.org/abs/2106.09685 (abgerufen am 28.09.2026)
- Gekhman, Yona, Aharoni, Eyal, Feder, Reichart & Herzig — Does Fine-Tuning LLMs on New Knowledge Encourage Hallucinations? (arXiv, 2024; EMNLP 2024). https://arxiv.org/abs/2405.05904 (abgerufen am 28.09.2026)
- Qi, Zeng, Xie, Chen, Jia, Mittal & Henderson — Fine-tuning Aligned Language Models Compromises Safety, Even When Users Do Not Intend To! (arXiv, 2023). https://arxiv.org/abs/2310.03693 (abgerufen am 28.09.2026)
- Datenschutzkonferenz — Orientierungshilfe zu datenschutzrechtlichen Besonderheiten generativer KI-Systeme mit RAG-Methode, Version 1.0 (DSK, Oktober 2025). https://www.datenschutzkonferenz-online.de/media/oh/DSK_OH_RAG.pdf (abgerufen am 28.09.2026)
