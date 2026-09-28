# OWASP LLM Top 10

Die Referenzliste, um LLM-Sicherheit systematisch statt ad hoc anzugehen — von Prompt Injection bis Excessive Agency.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: OWASP, Top 10, LLM-Sicherheit.

## Wer die Liste macht

OWASP ist eine gemeinnützige Stiftung, die mit quelloffenen Projekten, weltweiten Gemeinschaften und Weiterbildung die Sicherheit von Software verbessern will; ihre Materialien sind frei zugänglich. Die Top 10 for Large Language Model Applications entstanden 2023 als Liste der kritischsten Schwachstellen von Anwendungen, die auf großen Sprachmodellen aufbauen. Daraus ist das OWASP GenAI Security Project geworden, eine weltweite Initiative, die Sicherheitsrisiken generativer KI einschließlich agentischer Systeme beschreibt. Auf die Fassungen 1.0 und 1.1 von 2023 folgten im November 2024 die Fassung 2025 und im August 2026 die Fassung 2026. Die Liste steht unter der Lizenz CC BY-SA 4.0 und darf mit Namensnennung und unter gleichen Bedingungen in eigene Prüflisten übernommen werden.

Neu ist 2026 die Methode. Frühere Fassungen beruhten allein auf dem Urteil der beteiligten Fachleute. Für die Fassung 2026 hat das Projekt diese Einschätzung erstmals gegen Daten über tatsächliche Vorfälle aus öffentlichen Schwachstellen- und Schadensdatenbanken geprüft; die Abstimmung der Fachleute trägt drei Viertel des Gewichts, die Vorfallsdaten ein Viertel. Das Vorwort der Projektleitung fasst die Haltung zusammen: nicht versuchen, ein Modell zu bauen, das sich nicht täuschen lässt, sondern das System darum herum so bauen, dass nichts Wichtiges zerbricht, wenn das Modell getäuscht wird.

## Die zehn Risiken der Fassung 2026

An erster Stelle steht Prompt Injection (LLM01:2026), also Eingaben, die das Verhalten des Modells unbeabsichtigt verändern, direkt durch Nutzer oder indirekt über eingelesene Inhalte. Es folgen die Preisgabe vertraulicher Informationen (LLM02:2026 Sensitive Information Disclosure) und übermäßige Handlungsmacht (LLM03:2026 Excessive Agency), bei der ein System mit zu vielen Funktionen, Rechten oder zu viel Autonomie auf fehlerhafte oder manipulierte Ausgaben hin Schaden anrichtet. LLM04:2026 Supply Chain betrifft die Lieferkette aus fremden Modellen, Datensätzen und Adaptern, LLM05:2026 Data and Model Poisoning die gezielte oder versehentliche Vergiftung von Trainings-, Such- oder Modelldaten.

LLM06:2026 Unbounded Consumption beschreibt unkontrollierten Ressourcenverbrauch, der Dienste lahmlegen, hohe Kosten verursachen oder das Nachbauen eines Modells ermöglichen kann. LLM07:2026 Misinformation erfasst falsche oder irreführende Ausgaben, die glaubwürdig genug sind, um Entscheidungen oder Aktionen auszulösen, darunter Halluzinationen und übermäßiges Vertrauen in flüssige Antworten. LLM08:2026 Hidden Context Exposure betrifft verborgene Steuerinformationen wie Systemprompts, Werkzeugbeschreibungen und Regeln, die sich auslesen oder erschließen lassen; OWASP rät, davon auszugehen, dass dieser Kontext auffindbar ist, und nie Zugangsdaten darin abzulegen. LLM09:2026 Vector and Embedding Weaknesses betrifft Schwächen der Vektorsuche, etwa in RAG-Systemen, LLM10:2026 Improper Output Handling die ungeprüfte Weitergabe von Modellausgaben an andere Systeme.

## Was sich gegenüber 2025 geändert hat

Die Reihenfolge hat sich 2026 stärker bewegt als in früheren Jahren. Prompt Injection und die Preisgabe vertraulicher Informationen blieben auf den Plätzen eins und zwei. Excessive Agency stieg vom sechsten auf den dritten Platz, nach OWASP die folgenreichste Verschiebung, weil Einschätzung und Vorfallsdaten übereinstimmend zeigen, dass Schäden in agentischen Einsätzen entstehen. Unbounded Consumption stieg um vier Plätze, Improper Output Handling fiel vom fünften auf den zehnten. Misinformation stand bei den Fachleuten weit unten, in den Vorfallsdaten weit oben, und rückte deshalb vor. Was 2025 System Prompt Leakage hieß, ist jetzt weiter gefasst als Hidden Context Exposure. Wer ältere Unterlagen nutzt, muss auf die Jahreszahl achten: LLM06 bezeichnete 2025 Excessive Agency, 2026 Unbounded Consumption. OWASP schreibt die Kennungen darum mit Jahr, etwa LLM03:2026.

Die Liste zieht zugleich eine Grenze. Sie behandelt das Modell als Baustein einer Anwendung. Sobald es selbst handelt, mit Werkzeugen, einem Gedächtnis über Sitzungen hinweg und Folgen außerhalb der Anwendung, verweist OWASP auf die im Dezember 2025 vorgestellte OWASP Top 10 for Agentic Applications, die mit den Kennungen ASI01 bis ASI10 Risiken wie die Entführung des Agentenziels und den Missbrauch von Werkzeugen beschreibt. Die Fassung 2026 ordnet ihre Einträge in einem Anhang den Risiken der Agentenliste zu, und für agentische Systeme sind nach OWASP beide Listen gemeinsam zu lesen.

## Im Beratungsalltag

Eine Versicherungsagentur mit 90 Beschäftigten will einen Assistenten starten, der Kundenanfragen mit Hilfe der internen Wissensbasis beantwortet und Termine einträgt. Vor dem Start geht die Beraterin mit dem Team die zehn Einträge der Fassung 2026 einzeln durch und hält für jeden fest, ob er zutrifft, welche Maßnahme greift und wer sie verantwortet. Dabei fällt auf, dass der Systemprompt einen Zugangsschlüssel für den Kalender enthält (LLM08 und LLM02), dass der Kalenderzugang auch das Löschen erlaubt (LLM03) und dass es keine Obergrenze für Anfragen gibt (LLM06). Diese Punkte werden vor dem Start behoben, der Rest wird als bewusst getragenes Restrisiko dokumentiert. Weil der Anhang der Liste die Einträge unter anderem dem Rahmenwerk MITRE ATLAS und dem Profil für generative KI des NIST (AI 600-1) zuordnet, lässt sich das Ergebnis in das bestehende Risikomanagement übernehmen.

## Grenzen und Kritik

Die Liste ist ein Konsensprodukt, keine Norm und kein Prüfzeichen. Wer alle zehn Punkte abhakt, hat ein System nicht für sicher erklärt, sondern bekannte Risikoklassen betrachtet. OWASP legt selbst offen, wie weit Urteil und Daten auseinanderliegen können: Nach den reinen Vorfallsdaten läge Prompt Injection nicht einmal unter den ersten zehn, was das Projekt mit der intensiven Abwehr erklärt, während Fehlinformation in den Daten weit häufiger auftaucht, als die Fachleute annahmen. Die Vorfallsdaten stammen aus öffentlichen Datenbanken und bilden nur ab, was gemeldet wird; OWASP gewichtet sie bewusst nur mit einem Viertel, damit ein einzelnes verrauschtes Datenjahr das Urteil der Praxis nicht umwirft. Die Liste ändert sich zudem mit jeder Fassung, wie die Umnummerierung von 2026 zeigt, und sie ersetzt keine rechtliche Bewertung: OWASP betont, dass das Dokument keine Rechtsberatung ist.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Prompt Injection (OWASP LLM01)**: Das Top-Sicherheitsrisiko von LLM-Anwendungen: manipulierte Eingaben, die die eigentlichen Anweisungen des Modells überschreiben — besonders brisant für RAG und Agenten.
- **Datenabfluss (OWASP LLM02)**: Warum vertrauliche Daten in öffentlichen KI-Diensten ein Compliance-Problem sind — und was die souveränen Alternativen leisten.

## Quellen

- OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2026 (OWASP Foundation, 2026). https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/ (abgerufen am 28.09.2026)
- OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2025: Übersicht der Einträge (OWASP Foundation, o. J.). https://genai.owasp.org/llm-top-10/ (abgerufen am 28.09.2026)
- OWASP GenAI Security Project — OWASP Top 10 for Agentic Applications (OWASP Foundation, 2025). https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/ (abgerufen am 28.09.2026)
- OWASP Foundation — OWASP Top 10 for Large Language Model Applications, Projektseite (OWASP Foundation, o. J.). https://owasp.org/www-project-top-10-for-large-language-model-applications/ (abgerufen am 28.09.2026)
