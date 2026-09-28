# Prompt Injection (OWASP LLM01)

Das Top-Sicherheitsrisiko von LLM-Anwendungen: manipulierte Eingaben, die die eigentlichen Anweisungen des Modells überschreiben — besonders brisant für RAG und Agenten.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: LLM01, Injection, Jailbreak.

## Warum Anweisung und Inhalt verschwimmen

Eine LLM-Anwendung fügt ihre eigenen Anweisungen, etwa die Rollenbeschreibung im Systemprompt (system prompt), mit Inhalten zusammen, die sie nicht kontrolliert: Nutzereingaben, Dokumente, Webseiten, E-Mails, Werkzeugergebnisse. Das britische National Cyber Security Centre (NCSC) beschreibt das Kernproblem im Dezember 2025 so: Im Inneren eines Sprachmodells gibt es keine Unterscheidung zwischen Daten und Anweisungen, es gibt nur das nächste Textstück (token). Bei der bekannten SQL-Injection trennen parametrisierte Abfragen beides zuverlässig; für Sprachmodelle fehlt ein solches Gegenstück, und das NCSC hält es für gut möglich, dass Prompt Injection nie so vollständig beherrschbar wird. Es spricht von einem von Natur aus verwirrbaren Stellvertreter (inherently confusable deputy): Ein Angreifer bringt das System dazu, mit dessen Rechten in seinem Sinne zu handeln.

Die OWASP Top 10 for LLM Applications führen Prompt Injection auch in der Fassung vom August 2026 als LLM01:2026 an erster Stelle. Nach der Definition dort liegt eine Prompt Injection vor, wenn eine Eingabe das Verhalten des Modells auf eine vom Entwickler nicht beabsichtigte Weise verändert, gleich ob sie vom Nutzer kommt, aus abgerufenen Inhalten, aus Werkzeugergebnissen, aus Bildern, Ton oder Video oder aus einem dauerhaften Gedächtnis; selbst die Zwischenschritte des Modells zählt OWASP zu den möglichen Eingängen. Die Eingabe muss für Menschen weder lesbar noch sichtbar sein.

## Direkt und indirekt

Bei der direkten Prompt Injection steckt die Manipulation in der Eingabe des Nutzers, absichtlich wie beim Versuch, Sicherheitsregeln auszuhebeln (jailbreak), oder unabsichtlich, wenn jemand Text einfügt, der widersprüchliche Anweisungen enthält. Gefährlicher für RAG-Systeme und Agenten ist die indirekte Form. Greshake und Kollegen zeigten 2023, dass Anwendungen, die Sprachmodelle mit externen Quellen verbinden, die Grenze zwischen Daten und Anweisungen verwischen: Angreifer platzieren Anweisungen in Inhalten, die das System voraussichtlich abrufen wird, und steuern es so aus der Ferne, ohne direkten Zugang. Das BSI nennt als Verstecke Webseiten, E-Mails und Dokumente, auch mit Zeichen, die verarbeitet, aber nicht angezeigt werden. Hat das System die nötigen Rechte, kann eine solche Anweisung Daten über eingebettete Bilder nach außen leiten oder eine E-Mail aus dem Postfach des Opfers verschicken. OWASP betont, dass auch vermeintlich vertrauenswürdige interne Quellen betroffen sind, wenn ein Angreifer über ein Formular oder ein Ticket Text dorthin gelangen lässt.

## Abwehr in Schichten

OWASP hält fest, dass es heute keinen zuverlässigen Mechanismus gibt, der Prompt Injection verhindert, und das BSI kommt zum selben Befund. Die Abwehr ist deshalb eine Frage der Architektur: Das System wird so gebaut, dass eine gelungene Injection keinen großen Schaden anrichten kann. Der wichtigste Hebel sind minimale Rechte (least privilege). Zugangsdaten und die Befugnis, etwas zu verändern, liegen im Anwendungscode, nicht beim Modell, und eine fest programmierte Prüfung entscheidet vor jeder Aktion, ob sie erlaubt ist. Das NCSC gibt dafür eine eingängige Regel wieder: Verarbeitet ein Modell Informationen einer Partei, sinken seine Rechte auf die Rechte dieser Partei. Zur Trennung von Inhalt und Anweisung empfiehlt OWASP, externe Inhalte in einem getrennten, gekennzeichneten Kanal zu übergeben, damit das Modell beides besser auseinanderhalten kann.

Die weiteren Schichten: Ausgaben werden gegen ein festes Format geprüft, bevor ein anderes System damit arbeitet; das fängt Formfehler ab, aber keine inhaltliche Manipulation. Vor jeder folgenreichen, unumkehrbaren oder nach außen sichtbaren Aktion steht eine menschliche Freigabe (human in the loop), und die prüfende Person sieht die tatsächliche Aktion, keine Zusammenfassung. Als Prüfstein vor dem Start nennt OWASP eine Zweierregel (rule of two): Ein Agent, der zugleich nicht vertrauenswürdige Eingaben liest, auf sensible Daten zugreift und nach außen kommunizieren oder etwas verändern kann, braucht für jede Aktion eine Freigabe. Fehlt eine der drei Eigenschaften, entfallen die Voraussetzungen für die schwersten Angriffe, eine Bewertung des Restrisikos bleibt nötig. Wenig taugen Sperrlisten für Formulierungen wie „ignoriere alle vorherigen Anweisungen“; das NCSC erinnert daran, dass sich jeder Angriff beliebig umformulieren lässt.

## Im Beratungsalltag

Eine Hausverwaltung mit 120 Beschäftigten will einen Assistenten, der Mieter-E-Mails liest, im Mieterportal nachschlägt und selbständig antwortet. Die Beraterin legt die Zweierregel an: Der Assistent läse Nachrichten beliebiger Absender, hätte Zugriff auf Mieterdaten und könnte nach außen schreiben, alle drei Eigenschaften zugleich. Sie nimmt eine davon heraus. Der Assistent schreibt nur Entwürfe, verschickt werden sie von einem Menschen. Zusätzlich sieht er nur den Datensatz des jeweiligen Absenders, externe Bilder und Links werden in den Entwürfen nicht dargestellt, und vor dem Start versucht ein Prüfteam, ihn mit versteckten Anweisungen in Test-E-Mails zu manipulieren. Der Nutzen bleibt erhalten, denn den Entwurf schreibt weiterhin der Assistent.

## Grenzen und Kritik

Die Rangfolge der OWASP-Liste beruht auf Einschätzung. OWASP legt in der Fassung 2026 offen, dass Prompt Injection nach den ausgewerteten öffentlichen Vorfallsdaten nicht einmal unter den ersten zehn läge; die Fachleute setzen sie dennoch an die Spitze, und OWASP erklärt die Lücke mit der Abwehr: Weil Teams Injection intensiv bekämpfen, gelangen weniger saubere Fälle in öffentliche Datenbanken. Zugleich zeigen von OWASP zitierte Untersuchungen, dass viele Abwehrverfahren in statischen Tests überzeugen und gegen Angreifer versagen, die die Abwehr kennen und sich anpassen. Das NCSC rät zur Vorsicht bei Produkten, die versprechen, Prompt Injection zu „stoppen“, und zieht eine harte Konsequenz: Verträgt ein System das verbleibende Risiko nicht, ist es womöglich kein guter Anwendungsfall für ein Sprachmodell. Prompt Injection bleibt ein Restrisiko, das durch Entwurf, Aufbau und Betrieb gesteuert, nicht einmalig behoben wird.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **OWASP LLM Top 10**: Die Referenzliste, um LLM-Sicherheit systematisch statt ad hoc anzugehen — von Prompt Injection bis Excessive Agency.
- **Datenabfluss (OWASP LLM02)**: Warum vertrauliche Daten in öffentlichen KI-Diensten ein Compliance-Problem sind — und was die souveränen Alternativen leisten.
- **KI-Agenten (Agentic AI)**: Wenn ein Modell nicht nur antwortet, sondern plant, Werkzeuge aufruft und auf ein Ziel hinarbeitet — mit entsprechend höherem Governance-Bedarf.

## Quellen

- OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2026 (OWASP Foundation, 2026). https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (abgerufen am 28.09.2026)
- Chismon — Prompt injection is not SQL injection (it may be worse) (National Cyber Security Centre, 2025). https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection (abgerufen am 28.09.2026)
- Greshake, Abdelnabi, Mishra, Endres, Holz & Fritz — Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection (Proceedings of the 16th ACM Workshop on Artificial Intelligence and Security, 2023). https://doi.org/10.1145/3605764.3623985 (abgerufen am 28.09.2026)
- BSI — Generative KI-Modelle: Chancen und Risiken für Industrie und Behörden, Version 2.0 (Bundesamt für Sicherheit in der Informationstechnik, 2025). https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/KI/Generative_KI-Modelle.pdf?__blob=publicationFile&v=7 (abgerufen am 28.09.2026)
