# Proprietär vs. Open-Weight

Die Wahl zwischen API-Modell und selbst betriebenem Open-Weight-Modell ist keine reine Leistungsfrage, sondern eine Governance-Entscheidung — und ein sich schnell wandelndes Feld.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Open-Weight, proprietär, Modelllandschaft, Open Source.

Hinweis: Dieses Thema ist im Wandel. Der Text gibt den Stand seiner Quellen vom 28.09.2026 wieder; spätere Entwicklungen sind nicht berücksichtigt.

## Zwei Bezugswege, Stand September 2026

Bei einem proprietären Modell bleiben die Gewichte, also die gelernten Parameter, beim Anbieter. Genutzt wird es über eine Programmierschnittstelle (API) oder eine Anwendung des Anbieters, der Betrieb, Aktualisierung und Absicherung übernimmt. Bei einem Modell mit offenen Gewichten (open weights) lassen sich die Parameter herunterladen, auf eigener Infrastruktur betreiben und anpassen, etwa durch Nachtraining (fine-tuning). Der AI Index der Stanford University vom April 2026 zeigt, dass unter den bedeutenden Modellen des Jahres 2025 der Zugang über eine API die häufigste Form der Veröffentlichung war und offene Gewichte ohne Einschränkung die zweithäufigste; dazwischen gibt es Abstufungen mit eingeschränkter oder nur nichtkommerzieller Nutzung.

Zu den proprietären Familien zählen nach dem AI Index die GPT-5-Modelle von OpenAI, Gemini von Google und Claude von Anthropic. Offene Gewichte veröffentlichten unter anderem Meta mit Llama 4, die Entwickler der Qwen-Modelle, Mistral etwa mit Mixtral und DeepSeek, das im September 2026 die Gewichte von DeepSeek-V4.1-Flash unter der MIT-Lizenz freigab. Die führenden Modelle beschreibt der AI Index als kaum noch unterscheidbar. Geschlossene Modelle lagen Anfang 2026 weiter vorn, offene sind aber weit konkurrenzfähiger als vor wenigen Jahren, und der Abstand schwankt mit jeder neuen proprietären Veröffentlichung. Bei Meta beobachtet der AI Index seit Anfang 2025 weniger konkurrenzfähige Veröffentlichungen. Je ähnlicher sich die Spitzenmodelle werden, desto eher entscheiden nach dem AI Index Kosten, Antwortzeit, Zuverlässigkeit und Eignung für ein Fachgebiet.

## Offene Gewichte sind nicht Open Source

Offene Gewichte bedeuten nicht, dass ein Modell quelloffen (open source) ist. Die Open Source Initiative hat im Oktober 2024 die Open Source AI Definition 1.0 veröffentlicht. Danach muss ein offenes KI-System erlauben, es für jeden Zweck ohne Erlaubnis zu nutzen, es zu untersuchen, zu verändern und weiterzugeben. Dafür müssen neben den Parametern auch ausreichend genaue Angaben zu den Trainingsdaten und der vollständige Code für Training und Betrieb unter entsprechenden Bedingungen verfügbar sein. Das erfüllen viele Modelle nicht; der AI Index stellt fest, dass die bedeutenden Modelle des Jahres 2025 überwiegend ohne ihren Trainingscode veröffentlicht wurden.

Für die Beratung ist die Lizenz deshalb Pflichtlektüre. Metas Nutzungsrichtlinie für Llama 4 verbietet bestimmte Verwendungen und gewährt die Rechte aus der Lizenz für die multimodalen Llama-4-Modelle ausdrücklich nicht an Personen mit Wohnsitz und Unternehmen mit Hauptsitz in der Europäischen Union; ausgenommen sind nur Endnutzer eines Produkts, das ein solches Modell enthält. Ein Unternehmen mit Hauptsitz in Deutschland hat für diese Modelle also keine Nutzungsrechte aus der Lizenz, obwohl die Gewichte herunterladbar sind. Eine freizügige Lizenz wie MIT regelt die Nutzung dagegen großzügig, sagt aber nichts darüber, ob Trainingsdaten und Trainingscode offenliegen.

## Betrieb und Governance

Die Wahl ist deshalb eine Governance-Entscheidung. Das BSI nennt Kriterien für die Auswahl eines Modells und seines Betreibers: welche Daten im Training verwendet wurden und ob sie rechtliche oder sicherheitsbezogene Mängel haben, wie die Lieferkette abgesichert ist, wie das Modell geprüft wurde, wie Versionen verwaltet werden, welche rechtlichen Anforderungen und Haftungsregeln gelten, zu welchen Zwecken Modell und Ausgaben technisch und rechtlich genutzt werden dürfen, welche Betriebsformen es gibt und welche Rechen- und Speicherkapazität ein Eigenbetrieb braucht. Ein API-Modell bietet oft die höchste Leistung und die meiste Bequemlichkeit, aber weniger Kontrolle: Der Anbieter bestimmt, wann sich ein Modell ändert, und wohin die Daten fließen, regelt der Vertrag. Ein selbst betriebenes Modell hält die Daten im Haus und erlaubt Anpassungen, was für souveräne und regulierte Einsätze zählt, verlagert aber Aktualisierung, Absicherung, Überwachung und Kapazitätsplanung in die eigene Organisation.

## Im Beratungsalltag

Ein Klinikverbund mit 1.200 Beschäftigten will zwei Anwendungen: einen Assistenten, der interne Behandlungsleitlinien durchsucht und dabei auch Fallnotizen mit Patientendaten sieht, und eine Hilfe für Pressetexte. Die Beraterin trennt die Entscheidungen. Für den Leitlinienassistenten kommen nur ein Modell mit offenen Gewichten auf eigenen Servern oder ein Anbieter mit vertraglich und technisch gesichertem Betrieb in der EU in Frage; zwei Kandidaten werden an anonymisierten Fällen aus dem eigenen Haus getestet, ihre Lizenzen geprüft und der Bedarf an Rechenleistung beziffert. Für Pressetexte ohne Personenbezug genügt ein API-Modell unter Geschäftsvertrag. Beide Anwendungen sprechen das Modell über eine eigene Zwischenschicht an, damit es sich später austauschen lässt, ohne die Anwendung neu zu bauen.

## Grenzen und Kritik

Jede Aufzählung von Modellen ist eine Momentaufnahme, die schnell veraltet. Dieser Text gibt den Stand September 2026 wieder, die Leistungsvergleiche des AI Index reichen bis Anfang 2026. Der AI Index warnt selbst, dass führende Labore weniger offenlegen und unabhängige Tests nicht immer bestätigen, was Entwickler berichten; Ranglisten taugen deshalb zur Orientierung, nicht zur Auswahl. Offene Gewichte machen nicht automatisch souverän: Die Lizenz kann die Nutzung einschränken, wie bei Llama 4, und ob ein Anbieter seine nächste Generation wieder offen veröffentlicht, liegt allein bei ihm. Umgekehrt bedeutet ein API-Modell nicht zwingend Kontrollverlust, wenn Vertrag, Hosting und Datenflüsse geprüft sind. Einen Pauschalsieger gibt es nicht. Die Wahl folgt dem Anwendungsfall und dem Governance-Rahmen und ist bei jedem Modellwechsel neu zu prüfen.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Fine-tuning**: Die zweite Art, ein Modell an eine Domäne anzupassen — anders als RAG verändert sie das Modell selbst. Die Abgrenzung ist eine der häufigsten Beratungsfragen.
- **Datensouveränität, BSI C5 & Gaia-X**: Warum der Speicherort allein keine Souveränität garantiert — und welche Kataloge und Infrastrukturen die deutsche/europäische Antwort darauf sind.
- **GPAI-Modelle (Art. 53 ff.)**: Für Allzweck-Basismodelle gilt ein eigener Pflichtenkreis — verschärft, sobald ein Modell als systemisch riskant eingestuft wird.

## Quellen

- Stanford Institute for Human-Centered Artificial Intelligence — The 2026 AI Index Report (Stanford University, 2026). https://hai.stanford.edu/assets/files/ai_index_report_2026.pdf (abgerufen am 28.09.2026)
- Open Source Initiative — The Open Source AI Definition 1.0 (OSI, 2024). https://opensource.org/ai/open-source-ai-definition (abgerufen am 28.09.2026)
- Meta — Llama 4 Acceptable Use Policy (Meta, o. J.). https://www.llama.com/llama4/use-policy/ (abgerufen am 28.09.2026)
- DeepSeek — DeepSeek-V4.1-Flash, Modellkarte (Hugging Face, 2026). https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash (abgerufen am 28.09.2026)
- BSI — Generative KI-Modelle: Chancen und Risiken für Industrie und Behörden, Version 2.0 (Bundesamt für Sicherheit in der Informationstechnik, 2025). https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/KI/Generative_KI-Modelle.pdf?__blob=publicationFile&v=7 (abgerufen am 28.09.2026)
