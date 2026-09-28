# Halluzination

Das strukturelle Risiko jedes Sprachmodells — und der Grund, warum Grounding, Prüfschritte und ehrliche Nutzerhinweise keine Kür sind, sondern Pflicht.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Hallucination, Konfabulation.

## Was eine Halluzination ist

Von Halluzination (hallucination) spricht man, wenn ein KI-System eine Ausgabe erzeugt, die plausibel klingt, aber sachlich falsch, unpassend oder ganz erfunden ist. IBM nennt als typische Formen erfundene Fakten und Studien, nicht existierende Webadressen und falsche Angaben über reale Personen oder Organisationen, die als Tatsachen auftreten; daneben ist der Begriff Konfabulation (confabulation) gebräuchlich. Von gewöhnlichen Fehlern unterscheidet sich die Halluzination dadurch, dass sie echten Mustern folgt: Sie klingt richtig und ist deshalb schwer zu erkennen. Das Bundesamt für Sicherheit in der Informationstechnik (BSI) hebt hervor, dass Halluzinationen besonders glaubhaft wirken, wenn das Modell auf wissenschaftliche Veröffentlichungen oder andere Belege verweist, die selbst erfunden sein können. IBM schildert einen Fall aus dem Jahr 2023: Ein Anwalt in den USA ließ sich von einem Chatbot Präzedenzfälle für einen Schriftsatz liefern, und mehrere dieser Urteile samt Aktenzeichen und Zitaten gab es nicht.

## Warum Sprachmodelle halluzinieren

Ein Sprachmodell schlägt keine Antwort nach. Es schätzt Schritt für Schritt, welches Textstück (token) nach dem bisherigen Kontext am wahrscheinlichsten folgt. IBM beschreibt das als statistischen Musterabgleich, der auf Plausibilität innerhalb des Musters optimiert, nicht auf Richtigkeit in der Welt; das Modell „weiß“ nicht, was wahr ist, nur, was zum Muster passt. Das BSI ergänzt, dass falsche Inhalte wegen des probabilistischen Charakters der Modelle auch dann entstehen, wenn das Trainingsmaterial korrekt war, und dass Modelle ohne Zugriff auf aktuelle Daten zu aktuellen Themen Inhalte erfinden.

Kalai, Nachum, Vempala und Zhang (2025) gehen einen Schritt weiter. Nach ihrer Analyse entstehen Halluzinationen schon im Vortraining aus natürlichem statistischem Druck, sobald sich falsche Aussagen nicht von Tatsachen unterscheiden lassen. Dass sie auch in den besten Systemen fortbestehen, führen sie auf die Bewertung zurück: Die meisten Tests belohnen Raten stärker als das Eingeständnis von Unsicherheit, so wie ein Prüfling bei einer schweren Frage lieber rät, als eine Lücke zu lassen. Für die Praxis heißt das: Halluzination ist eine Eigenschaft des Verfahrens, kein Fehler, den das nächste Update abstellt. IBM formuliert, dass sich Halluzinationen verringern, aber nicht vollständig beseitigen lassen.

## Gegenmittel in Schichten

Das wichtigste Gegenmittel ist die Verankerung in Quellen (grounding) über Retrieval-Augmented Generation (RAG): Das System sucht zu jeder Frage passende Stellen in einer geprüften Wissensbasis und lässt das Modell auf dieser Grundlage antworten, oft mit Zitat oder Fundstelle. Das BSI weist darauf hin, dass sich die Folgen von Halluzinationen mildern lassen, wenn Nutzende sehen, auf welchen Textauszügen eine Antwort beruht. Beseitigt ist das Problem damit nicht: IBM beschreibt kontextbezogene Halluzinationen, bei denen das Modell trotz bereitgestellter Dokumente auf allgemeines Trainingswissen zurückgreift oder Angaben aus verschiedenen Quellen vermischt. Eine niedrigere Temperatur (temperature) hilft begrenzt. Sie macht die ohnehin wahrscheinlichsten Textstücke noch wahrscheinlicher und die Ausgabe damit zusammenhängender und gleichförmiger, weshalb IBM sie für Aufgaben mit Anspruch auf Genauigkeit empfiehlt. Weil aber auch die wahrscheinlichste Fortsetzung falsch sein kann, wird eine Antwort dadurch vor allem wiederholbarer, nicht wahrer.

Hinzu kommen Prüfschritte und menschliche Kontrolle. IBM nennt Vorgaben im Prompt wie „wenn du unsicher bist, sag, dass du es nicht weißt“, automatische Abgleiche jeder Aussage mit einer Referenzquelle und feste Testsätze mit geprüften Antworten, um die Fehlerquote laufend zu messen. Für Ausgaben mit Tragweite, etwa Rechtsauskünfte oder Meldungen an Behörden, empfiehlt IBM eine Freigabe durch Menschen und den Umgang mit dem Modell als Entwurfshelfer, nicht als Autorität. Das BSI warnt vor dem Automation Bias: Überzeugend formulierte Ausgaben verleiten dazu, sie ungeprüft zu übernehmen. Deshalb gehören ehrliche Nutzerhinweise dazu. Das BSI empfiehlt, Grenzen und Restrisiken eines Systems klar mitzuteilen und Nutzende zu befähigen, Ausgaben kritisch zu hinterfragen, statt ihnen blind zu vertrauen.

## Im Beratungsalltag

Ein Stadtwerk mit 300 Beschäftigten möchte einen Chatbot für Fragen zu Tarifen; der Vorstand erwartet, dass er „immer richtig“ antwortet. Die Beraterin sagt keine Fehlerfreiheit zu, sondern beschreibt die Absicherung: Der Bot antwortet nur aus den freigegebenen Tarifblättern und nennt die Fundstelle, er läuft mit niedriger Temperatur, er darf „dazu liegt mir keine Angabe vor“ sagen, und alles, was eine verbindliche Zusage wäre, etwa Erstattungen oder Kündigungsfristen, übergibt er an das Kundenteam. Er ist als KI-Assistent gekennzeichnet. Vor dem Start misst ein Pilot an echten Anfragen, wie oft die Antworten durch eine Quelle gedeckt sind und wie zuverlässig der Bot übergibt; erst diese Werte gehen in die Vorstandsvorlage.

Dass die Auskunft des Bots als Auskunft des Unternehmens gilt, zeigt eine Entscheidung des Civil Resolution Tribunal in British Columbia vom Februar 2024 (Moffatt gegen Air Canada). Der Chatbot auf der Website der Fluggesellschaft hatte einem Kunden erklärt, er könne einen ermäßigten Tarif für Trauerfälle nachträglich beantragen; das erlaubte die Gesellschaft tatsächlich nicht. Sie brachte sinngemäß vor, der Chatbot sei für seine Aussagen selbst verantwortlich. Das Tribunal nannte das eine bemerkenswerte Behauptung und hielt fest, dass das Unternehmen für alle Informationen auf seiner Website einsteht, gleich ob sie von einer statischen Seite oder von einem Chatbot stammen. Es sah auch keinen Grund, warum Kunden Angaben aus einem Teil der Website an anderer Stelle gegenprüfen sollten.

## Grenzen und Kritik

Keines der Gegenmittel bringt die Fehlerquote auf null, und jedes kostet etwas. Menschliche Prüfung kostet Zeit, und auch Prüfende sind vor dem Automation Bias nicht gefeit, den das BSI beschreibt. Nutzerhinweise ersetzen keine Absicherung, wie der Fall Air Canada zeigt; zugleich stammt er von einem Tribunal für geringfügige Zivilstreitigkeiten in Kanada und lässt sich nicht ohne Weiteres auf deutsches Recht übertragen. Vorsicht verdienen auch veröffentlichte Halluzinationsraten. Nach Kalai und Kollegen belohnen die verbreiteten Tests das Raten, sodass ein guter Platz in einer Rangliste wenig darüber sagt, wie ehrlich ein Modell mit Unsicherheit umgeht. Belastbar ist nur, was am eigenen Anwendungsfall gemessen wird.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **RAG (Retrieval-Augmented Generation)**: Der wohl wichtigste Architektur-Baustein für seriöse Unternehmens-KI: Wissen zur Laufzeit dazuladen, statt es ins Modell zu trainieren.
- **Large Language Model (LLM)**: Das Sprachmodell ist der Motor moderner KI-Assistenten — und der Grund, warum ihre Ausgaben plausibel klingen, ohne dass sie „wissen" müssen, ob sie stimmen.

## Quellen

- China — What are AI hallucinations? (IBM Think, 2023, aktualisiert 2026). https://www.ibm.com/think/topics/ai-hallucinations (abgerufen am 28.09.2026)
- Kalai, Nachum, Vempala & Zhang — Why Language Models Hallucinate (arXiv, 2025). https://arxiv.org/abs/2509.04664 (abgerufen am 28.09.2026)
- BSI — Generative KI-Modelle: Chancen und Risiken für Industrie und Behörden, Version 2.0 (Bundesamt für Sicherheit in der Informationstechnik, 2025). https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/KI/Generative_KI-Modelle.pdf?__blob=publicationFile&v=7 (abgerufen am 28.09.2026)
- Noble — What is LLM temperature? (IBM Think, 2024, aktualisiert 2026). https://www.ibm.com/think/topics/llm-temperature (abgerufen am 28.09.2026)
- Civil Resolution Tribunal British Columbia — Moffatt v. Air Canada, 2024 BCCRT 149 (Entscheidung vom 14. Februar 2024). https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do (abgerufen am 28.09.2026)
