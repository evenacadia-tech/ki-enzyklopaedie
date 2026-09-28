# KI-Agenten (Agentic AI)

Wenn ein Modell nicht nur antwortet, sondern plant, Werkzeuge aufruft und auf ein Ziel hinarbeitet — mit entsprechend höherem Governance-Bedarf.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Agent, Agenten, Agentic AI, Tool Use.

## Vom Antworten zum Handeln

Ein Sprachmodell allein erzeugt Text. Zum Agenten wird ein System, wenn es das Modell mit Werkzeugen (tools) verbindet, also mit Programmierschnittstellen (APIs), Suchfunktionen oder Datenbanken, und es in eine Handlungsschleife setzt: Das Modell plant einen Schritt, ruft ein Werkzeug auf, beobachtet das Ergebnis und entscheidet über den nächsten Schritt, bis das Ziel erreicht ist, statt nur eine Antwort zu liefern. Anthropic beschreibt in „Building effective agents“ (Dezember 2024) als Grundbaustein ein erweitertes Modell (augmented LLM), das über Suche, Werkzeuge und Gedächtnis verfügt. Entscheidend ist, dass der Agent bei jedem Schritt eine Rückmeldung aus seiner Umgebung erhält, etwa das Ergebnis eines Werkzeugaufrufs oder einer Codeausführung, um seinen Fortschritt zu beurteilen. Er kann an Kontrollpunkten auf menschliche Rückmeldung warten, und Abbruchbedingungen wie eine Höchstzahl an Durchläufen halten ihn unter Kontrolle.

Anthropic fasst solche Systeme als agentische Systeme (agentic systems) zusammen und trennt zwei Bauformen. In Workflows sind Modell und Werkzeuge über fest vorgegebene Programmpfade verbunden; die Reihenfolge legt der Entwickler fest. In Agenten steuert das Modell selbst, welche Schritte es geht und welche Werkzeuge es nutzt. Beide Bauformen können dieselben Werkzeuge nutzen; der Unterschied liegt darin, wer den Weg bestimmt. Workflows bieten Vorhersehbarkeit und Gleichförmigkeit für klar umrissene Aufgaben; Agenten eignen sich für offene Probleme, bei denen sich die Zahl der nötigen Schritte nicht vorhersagen lässt.

## Die Faustregel: so einfach wie möglich

Daraus leitet Anthropic die Faustregel ab, die einfachste mögliche Lösung zu suchen und Komplexität nur zu erhöhen, wenn sie nötig ist; das kann auch heißen, gar kein agentisches System zu bauen. Für viele Anwendungen genüge ein einzelner, gut gestalteter Modellaufruf mit Suche und Beispielen im Prompt. Agentische Systeme tauschen Wartezeit und Kosten gegen bessere Ergebnisse, und die Autonomie eines Agenten bedeutet höhere Kosten und die Gefahr, dass sich Fehler über viele Schritte aufschaukeln. Anthropic empfiehlt deshalb ausgiebige Tests in abgeschotteten Umgebungen (sandbox) mit passenden Schutzvorkehrungen und nennt drei Grundsätze: den Aufbau einfach halten, die Planungsschritte des Agenten sichtbar machen und die Werkzeuge sorgfältig dokumentieren und testen. Der Beitrag stammt von Dezember 2024, und Anthropic weist inzwischen selbst darauf hin, dass sich vieles an der beschriebenen Werkzeuglandschaft seither verändert hat. Die Unterscheidung von Workflow und Agent bleibt als Ordnungsrahmen für die Beratung trotzdem nützlich.

## Mehr Autonomie, mehr Governance

Mit der Handlungsmacht wächst der mögliche Schaden. Die OWASP Top 10 for LLM Applications führen das Risiko in ihrer Fassung vom August 2026 als LLM03:2026 Excessive Agency, übermäßige Handlungsmacht: Ein System richtet Schaden an, weil es auf unerwartete, mehrdeutige oder manipulierte Ausgaben des Modells hin handelt, gleich ob die Ursache eine Halluzination oder eine eingeschleuste Anweisung (prompt injection) ist. Die Wurzel liegt nach OWASP in zu viel Funktionalität, zu vielen Berechtigungen oder zu viel Autonomie. In der Fassung 2025 stand der Eintrag an sechster Stelle, jetzt an dritter; OWASP begründet das damit, dass die Einschätzung der Fachleute und die Vorfallsdaten übereinstimmend zeigen, dass Schäden in agentischen Einsätzen entstehen. Für Systeme, die eigenständig handeln, gibt es seit Dezember 2025 zudem die OWASP Top 10 for Agentic Applications, mit Risiken wie der Entführung des Agentenziels (agent goal hijack), dem Missbrauch von Werkzeugen und Fehlern, die sich über mehrere Agenten fortpflanzen (cascading failures).

Die Gegenmaßnahmen von OWASP lesen sich wie ein Pflichtenheft für die Governance: nur die Werkzeuge anbieten, die gebraucht werden, und sie auf die nötigen Funktionen beschränken, offene Werkzeuge wie eine beliebige Kommandozeile vermeiden, Berechtigungen minimal halten (least privilege) und Aktionen mit den Rechten des jeweiligen Nutzers ausführen. Ob eine Aktion erlaubt ist, soll fest programmierte Logik entscheiden, nicht das Modell. Folgenreiche Aktionen brauchen eine menschliche Freigabe (human in the loop). OWASP beschreibt eine Abstufung, bei der leicht umkehrbare Schritte automatisch laufen und unumkehrbare an einen Menschen gehen, etwa eine Gutschrift im Unterschied zu einer Auszahlung. Protokolle und Obergrenzen für Werkzeugaufrufe verhindern keinen Fehlgriff, begrenzen aber den Schaden.

## Im Beratungsalltag

Ein Sanitärgroßhändler mit 180 Beschäftigten möchte „einen Agenten für die Eingangsrechnungen“. Der Berater zerlegt die Aufgabe zuerst. Rechnungsdaten auslesen, mit Bestellung und Wareneingang abgleichen und bei Abweichungen den Entwurf einer Rückfrage an den Lieferanten schreiben ist ein fester Ablauf; daraus wird ein Workflow mit vorgegebenen Schritten. Offen ist nur die Klärung ungewöhnlicher Abweichungen, für die in mehreren Systemen nachgesehen werden muss. Dafür bekommt ein Agent ausschließlich Leserechte, eine Höchstzahl an Schritten und ein Protokoll jedes Werkzeugaufrufs. Rückfragen verschickt er nicht selbst, und Zahlungen gibt allein die Buchhaltung frei. Nach der Testphase entscheidet das Team anhand der Protokolle, ob der Agent weitere Rechte erhält.

## Grenzen und Kritik

Der Begriff Agent ist unscharf. Anthropic berichtet selbst, dass manche darunter vollständig autonome Systeme verstehen, die lange eigenständig arbeiten, andere fest vorgezeichnete Abläufe. In der Beratung lohnt deshalb die Frage, wer den nächsten Schritt bestimmt, der Programmcode oder das Modell. Auch die Schutzmaßnahmen haben Grenzen. Eine menschliche Freigabe schützt nur, wenn die prüfende Person die tatsächlich auszuführende Aktion sieht, und OWASP warnt, dass die Urteilskraft bei vielen Freigaben nachlässt (approval fatigue). Minimale Rechte verhindern nicht, dass ein Agent falsche Schlüsse zieht; sie begrenzen nur, was daraus folgt. Und weil Fehler sich über viele Schritte fortpflanzen können, sagt eine gelungene Vorführung wenig über den Dauerbetrieb. Belastbar sind erst Tests in einer abgeschotteten Umgebung mit realistischen Fällen.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Prompt Injection (OWASP LLM01)**: Das Top-Sicherheitsrisiko von LLM-Anwendungen: manipulierte Eingaben, die die eigentlichen Anweisungen des Modells überschreiben — besonders brisant für RAG und Agenten.
- **RAG (Retrieval-Augmented Generation)**: Der wohl wichtigste Architektur-Baustein für seriöse Unternehmens-KI: Wissen zur Laufzeit dazuladen, statt es ins Modell zu trainieren.

## Quellen

- Anthropic — Building effective agents (Anthropic, 2024). https://www.anthropic.com/research/building-effective-agents (abgerufen am 28.09.2026)
- OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2026 (OWASP Foundation, 2026). https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (abgerufen am 28.09.2026)
- OWASP GenAI Security Project — OWASP Top 10 for Agentic Applications (OWASP Foundation, 2025). https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/ (abgerufen am 28.09.2026)
