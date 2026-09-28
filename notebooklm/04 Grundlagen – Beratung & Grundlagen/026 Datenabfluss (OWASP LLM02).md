# Datenabfluss (OWASP LLM02)

Warum vertrauliche Daten in öffentlichen KI-Diensten ein Compliance-Problem sind — und was die souveränen Alternativen leisten.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: LLM02, Sensitive Information Disclosure, Datenleck.

## Was abfließt und wohin

OWASP führt die Preisgabe vertraulicher Informationen (sensitive information disclosure) in der Fassung vom August 2026 weiter als LLM02:2026 an zweiter Stelle; es ist nach OWASP der Platz an der Spitze, an dem Einschätzung der Fachleute und Vorfallsdaten übereinstimmen. Gemeint ist jeder Weg, auf dem vertrauliche, regulierte oder geschützte Daten eine LLM-Anwendung unbefugt verlassen, und das ist nicht nur die Antwort: Auch Protokolle, Telemetrie, Zwischenschritte des Modells und Vektordarstellungen (embeddings) können Daten preisgeben. Sind Daten einmal in Modellgewichte, Embeddings oder Adapter eingeflossen, bleiben sie nach OWASP auch nach dem Löschen der Quelle abrufbar.

Für den Alltag in Unternehmen beschreibt das BSI die Seite der Nutzenden. Generative KI wird häufig als Dienst über das Internet angeboten; neben dem Abfluss bei der Übertragung besteht die Möglichkeit, dass der Anbieter auf die Eingaben zugreift und sie für das weitere Training nutzt. Wie weit das geschieht, hängt von seinen Richtlinien, seinen Nutzungsbedingungen und dem für ihn geltenden Datenschutzrecht ab, und das Risiko erstreckt sich auf alles, was dem Modell zur Verfügung gestellt wird. Die Datenschutzkonferenz (DSK) unterscheidet offene Systeme, die über das Internet einem unbestimmten Personenkreis zugänglich sind, von geschlossenen. Bei offenen Systemen verlassen die Eingaben den geschützten Bereich, sie können zu anderen Zwecken weiterverarbeitet oder Dritten offengelegt werden, und häufig werden Daten in Drittstaaten übermittelt. Technisch geschlossene Systeme hält die DSK deshalb für vorzugswürdig.

## Tarif und Vertrag entscheiden, nicht der Preis

Ob Eingaben ins Training wandern, hängt am Tarif und am Vertrag. Ein Beispiel: Anthropic hat im August 2025 seine Verbraucherbedingungen geändert. Unterhaltungen aus den Tarifen Free, Pro und Max werden seitdem für das Training neuer Modelle verwendet, wenn die Einstellung dafür eingeschaltet ist, und dann bis zu fünf Jahre gespeichert; für Angebote unter den gewerblichen Bedingungen, etwa Claude for Work oder die Programmierschnittstelle, gilt das nicht. Auch ein bezahlter Privattarif ist also kein Geschäftsvertrag. Die DSK verlangt zu prüfen, ob Ein- und Ausgaben für das Training verwendet werden und ob sich das ausschließen lässt; vorzugswürdig sind Anwendungen, die das nicht tun. Verarbeitet ein Anbieter personenbezogene Daten im Auftrag, verlangt Art. 28 DSGVO einen Vertrag mit einem Auftragsverarbeiter, der hinreichende Garantien bietet, den Auftragsverarbeitungsvertrag (AVV).

## Abhilfe in Schichten

Die Abhilfe beginnt mit klaren Nutzungsrichtlinien. Das BSI empfiehlt, dass Arbeitgeber festlegen, welche KI-Anwendungen, insbesondere frei zugängliche Webanwendungen, zu welchen Zwecken genutzt und welche Eingaben gemacht werden dürfen, dass diese Regeln verbindlich festgehalten und durch technische Maßnahmen gestützt werden, etwa das gezielte Sperren oder Freischalten von Diensten. Die zweite Schicht sind Geschäftsverträge ohne Training auf Kundendaten; die DSK empfiehlt, dienstliche Konten von vornherein so einzustellen, dass Eingaben nicht zum Training verwendet und keine Verläufe über die Sitzung hinaus gespeichert werden. OWASP rät, den Ausschluss von Training und Speicherung technisch durchzusetzen, statt sich allein auf Vertragstext zu verlassen, und die Bedingungen eines Anbieters bei jeder Änderung neu zu prüfen.

Die dritte Schicht betrifft Ort und Kontrolle der Verarbeitung: ein Anbieter mit Hosting in der EU, ein souveräner Betreiber oder ein internes Modell mit offenen Gewichten (open weights) auf eigener Infrastruktur, also ein geschlossenes System im Sinne der DSK. Die vierte Schicht ist Datenminimierung, ein Grundsatz aus Art. 5 DSGVO: Personenbezogene Daten müssen auf das für den Zweck notwendige Maß beschränkt sein. OWASP übersetzt das für LLM-Anwendungen so, dass an externe Anbieter nur die für die Aufgabe nötigen Felder gehen und Zugangsdaten nie in Systemprompts stehen.

## Im Beratungsalltag

In einem Ingenieurbüro mit 60 Beschäftigten stellt sich im Workshop heraus, dass Angebotsentwürfe, Kundenlisten und Programmcode samt Zugangsschlüsseln seit Monaten in ein kostenloses Chatprogramm kopiert werden. Der Berater verbietet die Arbeit mit KI nicht, sondern leitet sie um: Das Büro bekommt einen freigegebenen Dienst unter einem Geschäftsvertrag mit AVV, Ausschluss des Trainings und Hosting in der EU, dazu eine einseitige Stufung von „öffentlich“ bis „streng vertraulich“ mit Beispielen aus dem eigenen Alltag. Der kostenlose Dienst wird im Firmennetz gesperrt, die Schlüssel werden ausgetauscht. Weil Kundendaten betroffen sein können, prüft die Geschäftsführung mit der Datenschutzbeauftragten, ob eine Verletzung des Schutzes personenbezogener Daten vorliegt. Dann gilt Art. 33 DSGVO: Meldung an die Aufsichtsbehörde unverzüglich und möglichst binnen 72 Stunden, nachdem die Verletzung bekannt wurde, es sei denn, sie führt voraussichtlich zu keinem Risiko für die Betroffenen. Bei voraussichtlich hohem Risiko sind nach Art. 34 auch die Betroffenen zu benachrichtigen.

## Grenzen und Kritik

Ein Vertrag ohne Training löst nicht alles. Er regelt, was der Anbieter mit den Daten tun darf, nicht, ob sie bei ihm liegen, und Bedingungen können sich ändern, wie das Beispiel von 2025 zeigt. Ein internes oder souveränes System senkt das Risiko des Abflusses nach außen, entbindet aber nicht von der DSGVO; Grundsätze wie die Datenminimierung gelten für jede Verarbeitung personenbezogener Daten. Und der Abfluss kann intern geschehen. Das BSI empfiehlt, grundsätzlich anzunehmen, dass alle Informationen, auf die ein Modell im Training oder Betrieb Zugriff hat, abgegriffen werden können; ein Modell, das auf sensiblen Daten nachtrainiert wurde, ist deshalb selbst schützenswert. OWASP nennt als häufigen Auslöser das Überteilen: Laufwerke und Wissensbasen mit zu weiten Rechten speisen einen internen Assistenten mit Daten, die er dann bestimmungsgemäß ausgibt. Die Rechteprüfung gehört deshalb vor die Suche, nicht hinter die Antwort.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **OWASP LLM Top 10**: Die Referenzliste, um LLM-Sicherheit systematisch statt ad hoc anzugehen — von Prompt Injection bis Excessive Agency.
- **Prompt Injection (OWASP LLM01)**: Das Top-Sicherheitsrisiko von LLM-Anwendungen: manipulierte Eingaben, die die eigentlichen Anweisungen des Modells überschreiben — besonders brisant für RAG und Agenten.
- **Datensouveränität, BSI C5 & Gaia-X**: Warum der Speicherort allein keine Souveränität garantiert — und welche Kataloge und Infrastrukturen die deutsche/europäische Antwort darauf sind.

## Quellen

- OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2026 (OWASP Foundation, 2026). https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (abgerufen am 28.09.2026)
- BSI — Generative KI-Modelle: Chancen und Risiken für Industrie und Behörden, Version 2.0 (Bundesamt für Sicherheit in der Informationstechnik, 2025). https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/KI/Generative_KI-Modelle.pdf?__blob=publicationFile&v=7 (abgerufen am 28.09.2026)
- Datenschutzkonferenz — Orientierungshilfe Künstliche Intelligenz und Datenschutz, Version 1.0 (DSK, 2024). https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf (abgerufen am 28.09.2026)
- Verordnung (EU) 2016/679 — Datenschutz-Grundverordnung (Amtsblatt der Europäischen Union, 2016). https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de (abgerufen am 28.09.2026)
- Anthropic — Updates to Consumer Terms and Privacy Policy (Anthropic, 2025). https://www.anthropic.com/news/updates-to-our-consumer-terms (abgerufen am 28.09.2026)
