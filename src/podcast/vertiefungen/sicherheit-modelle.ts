import type { Quelle } from '../../inhalt/typen';
import type { Vertiefung } from '.';

// Vertiefungen Sicherheit und Modelle: halluzination, agenten, prompt-injection, datenabfluss, owasp, modelllandschaft. Alle Quellen am 2026-09-28 abgerufen und geprüft.
const AB = '2026-09-28';
const Q = {
  owasp2026: {
    titel: 'OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2026 (OWASP Foundation, 2026)',
    url: 'https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/',
    abgerufen: AB,
  } satisfies Quelle,
  owasp2025: {
    titel: 'OWASP GenAI Security Project — OWASP Top 10 for LLM Applications 2025: Übersicht der Einträge (OWASP Foundation, o. J.)',
    url: 'https://genai.owasp.org/llm-top-10/',
    abgerufen: AB,
  } satisfies Quelle,
  owaspAgentic: {
    titel: 'OWASP GenAI Security Project — OWASP Top 10 for Agentic Applications (OWASP Foundation, 2025)',
    url: 'https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/',
    abgerufen: AB,
  } satisfies Quelle,
  owaspProjekt: {
    titel: 'OWASP Foundation — OWASP Top 10 for Large Language Model Applications, Projektseite (OWASP Foundation, o. J.)',
    url: 'https://owasp.org/www-project-top-10-for-large-language-model-applications/',
    abgerufen: AB,
  } satisfies Quelle,
  bsiGenKi: {
    titel:
      'BSI — Generative KI-Modelle: Chancen und Risiken für Industrie und Behörden, Version 2.0 (Bundesamt für Sicherheit in der Informationstechnik, 2025)',
    url: 'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/KI/Generative_KI-Modelle.pdf?__blob=publicationFile&v=7',
    abgerufen: AB,
  } satisfies Quelle,
  ibmHalluzination: {
    titel: 'China — What are AI hallucinations? (IBM Think, 2023, aktualisiert 2026)',
    url: 'https://www.ibm.com/think/topics/ai-hallucinations',
    abgerufen: AB,
  } satisfies Quelle,
  ibmTemperatur: {
    titel: 'Noble — What is LLM temperature? (IBM Think, 2024, aktualisiert 2026)',
    url: 'https://www.ibm.com/think/topics/llm-temperature',
    abgerufen: AB,
  } satisfies Quelle,
  kalai2025: {
    titel: 'Kalai, Nachum, Vempala & Zhang — Why Language Models Hallucinate (arXiv, 2025)',
    url: 'https://arxiv.org/abs/2509.04664',
    abgerufen: AB,
  } satisfies Quelle,
  crtAirCanada: {
    titel:
      'Civil Resolution Tribunal British Columbia — Moffatt v. Air Canada, 2024 BCCRT 149 (Entscheidung vom 14. Februar 2024)',
    url: 'https://decisions.civilresolutionbc.ca/crt/crtd/en/item/525448/index.do',
    abgerufen: AB,
  } satisfies Quelle,
  anthropicAgenten: {
    titel: 'Anthropic — Building effective agents (Anthropic, 2024)',
    url: 'https://www.anthropic.com/research/building-effective-agents',
    abgerufen: AB,
  } satisfies Quelle,
  ncsc: {
    titel: 'Chismon — Prompt injection is not SQL injection (it may be worse) (National Cyber Security Centre, 2025)',
    url: 'https://www.ncsc.gov.uk/blog-post/prompt-injection-is-not-sql-injection',
    abgerufen: AB,
  } satisfies Quelle,
  greshake2023: {
    titel:
      'Greshake, Abdelnabi, Mishra, Endres, Holz & Fritz — Not What You\'ve Signed Up For: Compromising Real-World LLM-Integrated Applications with Indirect Prompt Injection (Proceedings of the 16th ACM Workshop on Artificial Intelligence and Security, 2023)',
    url: 'https://doi.org/10.1145/3605764.3623985',
    abgerufen: AB,
  } satisfies Quelle,
  dskKi: {
    titel: 'Datenschutzkonferenz — Orientierungshilfe Künstliche Intelligenz und Datenschutz, Version 1.0 (DSK, 2024)',
    url: 'https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  dsgvo: {
    titel: 'Verordnung (EU) 2016/679 — Datenschutz-Grundverordnung (Amtsblatt der Europäischen Union, 2016)',
    url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de',
    abgerufen: AB,
  } satisfies Quelle,
  anthropicVerbraucher: {
    titel: 'Anthropic — Updates to Consumer Terms and Privacy Policy (Anthropic, 2025)',
    url: 'https://www.anthropic.com/news/updates-to-our-consumer-terms',
    abgerufen: AB,
  } satisfies Quelle,
  aiIndex2026: {
    titel:
      'Stanford Institute for Human-Centered Artificial Intelligence — The 2026 AI Index Report (Stanford University, 2026)',
    url: 'https://hai.stanford.edu/assets/files/ai_index_report_2026.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  osiOsaid: {
    titel: 'Open Source Initiative — The Open Source AI Definition 1.0 (OSI, 2024)',
    url: 'https://opensource.org/ai/open-source-ai-definition',
    abgerufen: AB,
  } satisfies Quelle,
  metaLlama4Richtlinie: {
    titel: 'Meta — Llama 4 Acceptable Use Policy (Meta, o. J.)',
    url: 'https://www.llama.com/llama4/use-policy/',
    abgerufen: AB,
  } satisfies Quelle,
  deepseekV41: {
    titel: 'DeepSeek — DeepSeek-V4.1-Flash, Modellkarte (Hugging Face, 2026)',
    url: 'https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash',
    abgerufen: AB,
  } satisfies Quelle,
};

export const sicherheitModelle: Vertiefung[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'halluzination',
    abschnitte: [
      {
        titel: 'Was eine Halluzination ist',
        absaetze: [
          'Von Halluzination (hallucination) spricht man, wenn ein KI-System eine Ausgabe erzeugt, die plausibel klingt, aber sachlich falsch, unpassend oder ganz erfunden ist. IBM nennt als typische Formen erfundene Fakten und Studien, nicht existierende Webadressen und falsche Angaben über reale Personen oder Organisationen, die als Tatsachen auftreten; daneben ist der Begriff Konfabulation (confabulation) gebräuchlich. Von gewöhnlichen Fehlern unterscheidet sich die Halluzination dadurch, dass sie echten Mustern folgt: Sie klingt richtig und ist deshalb schwer zu erkennen. Das Bundesamt für Sicherheit in der Informationstechnik (BSI) hebt hervor, dass Halluzinationen besonders glaubhaft wirken, wenn das Modell auf wissenschaftliche Veröffentlichungen oder andere Belege verweist, die selbst erfunden sein können. IBM schildert einen Fall aus dem Jahr 2023: Ein Anwalt in den USA ließ sich von einem Chatbot Präzedenzfälle für einen Schriftsatz liefern, und mehrere dieser Urteile samt Aktenzeichen und Zitaten gab es nicht.',
        ],
      },
      {
        titel: 'Warum Sprachmodelle halluzinieren',
        absaetze: [
          'Ein Sprachmodell schlägt keine Antwort nach. Es schätzt Schritt für Schritt, welches Textstück (token) nach dem bisherigen Kontext am wahrscheinlichsten folgt. IBM beschreibt das als statistischen Musterabgleich, der auf Plausibilität innerhalb des Musters optimiert, nicht auf Richtigkeit in der Welt; das Modell „weiß“ nicht, was wahr ist, nur, was zum Muster passt. Das BSI ergänzt, dass falsche Inhalte wegen des probabilistischen Charakters der Modelle auch dann entstehen, wenn das Trainingsmaterial korrekt war, und dass Modelle ohne Zugriff auf aktuelle Daten zu aktuellen Themen Inhalte erfinden.',
          'Kalai, Nachum, Vempala und Zhang (2025) gehen einen Schritt weiter. Nach ihrer Analyse entstehen Halluzinationen schon im Vortraining aus natürlichem statistischem Druck, sobald sich falsche Aussagen nicht von Tatsachen unterscheiden lassen. Dass sie auch in den besten Systemen fortbestehen, führen sie auf die Bewertung zurück: Die meisten Tests belohnen Raten stärker als das Eingeständnis von Unsicherheit, so wie ein Prüfling bei einer schweren Frage lieber rät, als eine Lücke zu lassen. Für die Praxis heißt das: Halluzination ist eine Eigenschaft des Verfahrens, kein Fehler, den das nächste Update abstellt. IBM formuliert, dass sich Halluzinationen verringern, aber nicht vollständig beseitigen lassen.',
        ],
      },
      {
        titel: 'Gegenmittel in Schichten',
        absaetze: [
          'Das wichtigste Gegenmittel ist die Verankerung in Quellen (grounding) über Retrieval-Augmented Generation (RAG): Das System sucht zu jeder Frage passende Stellen in einer geprüften Wissensbasis und lässt das Modell auf dieser Grundlage antworten, oft mit Zitat oder Fundstelle. Das BSI weist darauf hin, dass sich die Folgen von Halluzinationen mildern lassen, wenn Nutzende sehen, auf welchen Textauszügen eine Antwort beruht. Beseitigt ist das Problem damit nicht: IBM beschreibt kontextbezogene Halluzinationen, bei denen das Modell trotz bereitgestellter Dokumente auf allgemeines Trainingswissen zurückgreift oder Angaben aus verschiedenen Quellen vermischt. Eine niedrigere Temperatur (temperature) hilft begrenzt. Sie macht die ohnehin wahrscheinlichsten Textstücke noch wahrscheinlicher und die Ausgabe damit zusammenhängender und gleichförmiger, weshalb IBM sie für Aufgaben mit Anspruch auf Genauigkeit empfiehlt. Weil aber auch die wahrscheinlichste Fortsetzung falsch sein kann, wird eine Antwort dadurch vor allem wiederholbarer, nicht wahrer.',
          'Hinzu kommen Prüfschritte und menschliche Kontrolle. IBM nennt Vorgaben im Prompt wie „wenn du unsicher bist, sag, dass du es nicht weißt“, automatische Abgleiche jeder Aussage mit einer Referenzquelle und feste Testsätze mit geprüften Antworten, um die Fehlerquote laufend zu messen. Für Ausgaben mit Tragweite, etwa Rechtsauskünfte oder Meldungen an Behörden, empfiehlt IBM eine Freigabe durch Menschen und den Umgang mit dem Modell als Entwurfshelfer, nicht als Autorität. Das BSI warnt vor dem Automation Bias: Überzeugend formulierte Ausgaben verleiten dazu, sie ungeprüft zu übernehmen. Deshalb gehören ehrliche Nutzerhinweise dazu. Das BSI empfiehlt, Grenzen und Restrisiken eines Systems klar mitzuteilen und Nutzende zu befähigen, Ausgaben kritisch zu hinterfragen, statt ihnen blind zu vertrauen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Stadtwerk mit 300 Beschäftigten möchte einen Chatbot für Fragen zu Tarifen; der Vorstand erwartet, dass er „immer richtig“ antwortet. Die Beraterin sagt keine Fehlerfreiheit zu, sondern beschreibt die Absicherung: Der Bot antwortet nur aus den freigegebenen Tarifblättern und nennt die Fundstelle, er läuft mit niedriger Temperatur, er darf „dazu liegt mir keine Angabe vor“ sagen, und alles, was eine verbindliche Zusage wäre, etwa Erstattungen oder Kündigungsfristen, übergibt er an das Kundenteam. Er ist als KI-Assistent gekennzeichnet. Vor dem Start misst ein Pilot an echten Anfragen, wie oft die Antworten durch eine Quelle gedeckt sind und wie zuverlässig der Bot übergibt; erst diese Werte gehen in die Vorstandsvorlage.',
          'Dass die Auskunft des Bots als Auskunft des Unternehmens gilt, zeigt eine Entscheidung des Civil Resolution Tribunal in British Columbia vom Februar 2024 (Moffatt gegen Air Canada). Der Chatbot auf der Website der Fluggesellschaft hatte einem Kunden erklärt, er könne einen ermäßigten Tarif für Trauerfälle nachträglich beantragen; das erlaubte die Gesellschaft tatsächlich nicht. Sie brachte sinngemäß vor, der Chatbot sei für seine Aussagen selbst verantwortlich. Das Tribunal nannte das eine bemerkenswerte Behauptung und hielt fest, dass das Unternehmen für alle Informationen auf seiner Website einsteht, gleich ob sie von einer statischen Seite oder von einem Chatbot stammen. Es sah auch keinen Grund, warum Kunden Angaben aus einem Teil der Website an anderer Stelle gegenprüfen sollten.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Keines der Gegenmittel bringt die Fehlerquote auf null, und jedes kostet etwas. Menschliche Prüfung kostet Zeit, und auch Prüfende sind vor dem Automation Bias nicht gefeit, den das BSI beschreibt. Nutzerhinweise ersetzen keine Absicherung, wie der Fall Air Canada zeigt; zugleich stammt er von einem Tribunal für geringfügige Zivilstreitigkeiten in Kanada und lässt sich nicht ohne Weiteres auf deutsches Recht übertragen. Vorsicht verdienen auch veröffentlichte Halluzinationsraten. Nach Kalai und Kollegen belohnen die verbreiteten Tests das Raten, sodass ein guter Platz in einer Rangliste wenig darüber sagt, wie ehrlich ein Modell mit Unsicherheit umgeht. Belastbar ist nur, was am eigenen Anwendungsfall gemessen wird.',
        ],
      },
    ],
    quellen: [Q.ibmHalluzination, Q.kalai2025, Q.bsiGenKi, Q.ibmTemperatur, Q.crtAirCanada],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'agenten',
    abschnitte: [
      {
        titel: 'Vom Antworten zum Handeln',
        absaetze: [
          'Ein Sprachmodell allein erzeugt Text. Zum Agenten wird ein System, wenn es das Modell mit Werkzeugen (tools) verbindet, also mit Programmierschnittstellen (APIs), Suchfunktionen oder Datenbanken, und es in eine Handlungsschleife setzt: Das Modell plant einen Schritt, ruft ein Werkzeug auf, beobachtet das Ergebnis und entscheidet über den nächsten Schritt, bis das Ziel erreicht ist, statt nur eine Antwort zu liefern. Anthropic beschreibt in „Building effective agents“ (Dezember 2024) als Grundbaustein ein erweitertes Modell (augmented LLM), das über Suche, Werkzeuge und Gedächtnis verfügt. Entscheidend ist, dass der Agent bei jedem Schritt eine Rückmeldung aus seiner Umgebung erhält, etwa das Ergebnis eines Werkzeugaufrufs oder einer Codeausführung, um seinen Fortschritt zu beurteilen. Er kann an Kontrollpunkten auf menschliche Rückmeldung warten, und Abbruchbedingungen wie eine Höchstzahl an Durchläufen halten ihn unter Kontrolle.',
          'Anthropic fasst solche Systeme als agentische Systeme (agentic systems) zusammen und trennt zwei Bauformen. In Workflows sind Modell und Werkzeuge über fest vorgegebene Programmpfade verbunden; die Reihenfolge legt der Entwickler fest. In Agenten steuert das Modell selbst, welche Schritte es geht und welche Werkzeuge es nutzt. Beide Bauformen können dieselben Werkzeuge nutzen; der Unterschied liegt darin, wer den Weg bestimmt. Workflows bieten Vorhersehbarkeit und Gleichförmigkeit für klar umrissene Aufgaben; Agenten eignen sich für offene Probleme, bei denen sich die Zahl der nötigen Schritte nicht vorhersagen lässt.',
        ],
      },
      {
        titel: 'Die Faustregel: so einfach wie möglich',
        absaetze: [
          'Daraus leitet Anthropic die Faustregel ab, die einfachste mögliche Lösung zu suchen und Komplexität nur zu erhöhen, wenn sie nötig ist; das kann auch heißen, gar kein agentisches System zu bauen. Für viele Anwendungen genüge ein einzelner, gut gestalteter Modellaufruf mit Suche und Beispielen im Prompt. Agentische Systeme tauschen Wartezeit und Kosten gegen bessere Ergebnisse, und die Autonomie eines Agenten bedeutet höhere Kosten und die Gefahr, dass sich Fehler über viele Schritte aufschaukeln. Anthropic empfiehlt deshalb ausgiebige Tests in abgeschotteten Umgebungen (sandbox) mit passenden Schutzvorkehrungen und nennt drei Grundsätze: den Aufbau einfach halten, die Planungsschritte des Agenten sichtbar machen und die Werkzeuge sorgfältig dokumentieren und testen. Der Beitrag stammt von Dezember 2024, und Anthropic weist inzwischen selbst darauf hin, dass sich vieles an der beschriebenen Werkzeuglandschaft seither verändert hat. Die Unterscheidung von Workflow und Agent bleibt als Ordnungsrahmen für die Beratung trotzdem nützlich.',
        ],
      },
      {
        titel: 'Mehr Autonomie, mehr Governance',
        absaetze: [
          'Mit der Handlungsmacht wächst der mögliche Schaden. Die OWASP Top 10 for LLM Applications führen das Risiko in ihrer Fassung vom August 2026 als LLM03:2026 Excessive Agency, übermäßige Handlungsmacht: Ein System richtet Schaden an, weil es auf unerwartete, mehrdeutige oder manipulierte Ausgaben des Modells hin handelt, gleich ob die Ursache eine Halluzination oder eine eingeschleuste Anweisung (prompt injection) ist. Die Wurzel liegt nach OWASP in zu viel Funktionalität, zu vielen Berechtigungen oder zu viel Autonomie. In der Fassung 2025 stand der Eintrag an sechster Stelle, jetzt an dritter; OWASP begründet das damit, dass die Einschätzung der Fachleute und die Vorfallsdaten übereinstimmend zeigen, dass Schäden in agentischen Einsätzen entstehen. Für Systeme, die eigenständig handeln, gibt es seit Dezember 2025 zudem die OWASP Top 10 for Agentic Applications, mit Risiken wie der Entführung des Agentenziels (agent goal hijack), dem Missbrauch von Werkzeugen und Fehlern, die sich über mehrere Agenten fortpflanzen (cascading failures).',
          'Die Gegenmaßnahmen von OWASP lesen sich wie ein Pflichtenheft für die Governance: nur die Werkzeuge anbieten, die gebraucht werden, und sie auf die nötigen Funktionen beschränken, offene Werkzeuge wie eine beliebige Kommandozeile vermeiden, Berechtigungen minimal halten (least privilege) und Aktionen mit den Rechten des jeweiligen Nutzers ausführen. Ob eine Aktion erlaubt ist, soll fest programmierte Logik entscheiden, nicht das Modell. Folgenreiche Aktionen brauchen eine menschliche Freigabe (human in the loop). OWASP beschreibt eine Abstufung, bei der leicht umkehrbare Schritte automatisch laufen und unumkehrbare an einen Menschen gehen, etwa eine Gutschrift im Unterschied zu einer Auszahlung. Protokolle und Obergrenzen für Werkzeugaufrufe verhindern keinen Fehlgriff, begrenzen aber den Schaden.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Sanitärgroßhändler mit 180 Beschäftigten möchte „einen Agenten für die Eingangsrechnungen“. Der Berater zerlegt die Aufgabe zuerst. Rechnungsdaten auslesen, mit Bestellung und Wareneingang abgleichen und bei Abweichungen den Entwurf einer Rückfrage an den Lieferanten schreiben ist ein fester Ablauf; daraus wird ein Workflow mit vorgegebenen Schritten. Offen ist nur die Klärung ungewöhnlicher Abweichungen, für die in mehreren Systemen nachgesehen werden muss. Dafür bekommt ein Agent ausschließlich Leserechte, eine Höchstzahl an Schritten und ein Protokoll jedes Werkzeugaufrufs. Rückfragen verschickt er nicht selbst, und Zahlungen gibt allein die Buchhaltung frei. Nach der Testphase entscheidet das Team anhand der Protokolle, ob der Agent weitere Rechte erhält.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Der Begriff Agent ist unscharf. Anthropic berichtet selbst, dass manche darunter vollständig autonome Systeme verstehen, die lange eigenständig arbeiten, andere fest vorgezeichnete Abläufe. In der Beratung lohnt deshalb die Frage, wer den nächsten Schritt bestimmt, der Programmcode oder das Modell. Auch die Schutzmaßnahmen haben Grenzen. Eine menschliche Freigabe schützt nur, wenn die prüfende Person die tatsächlich auszuführende Aktion sieht, und OWASP warnt, dass die Urteilskraft bei vielen Freigaben nachlässt (approval fatigue). Minimale Rechte verhindern nicht, dass ein Agent falsche Schlüsse zieht; sie begrenzen nur, was daraus folgt. Und weil Fehler sich über viele Schritte fortpflanzen können, sagt eine gelungene Vorführung wenig über den Dauerbetrieb. Belastbar sind erst Tests in einer abgeschotteten Umgebung mit realistischen Fällen.',
        ],
      },
    ],
    quellen: [Q.anthropicAgenten, Q.owasp2026, Q.owaspAgentic],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'prompt-injection',
    abschnitte: [
      {
        titel: 'Warum Anweisung und Inhalt verschwimmen',
        absaetze: [
          'Eine LLM-Anwendung fügt ihre eigenen Anweisungen, etwa die Rollenbeschreibung im Systemprompt (system prompt), mit Inhalten zusammen, die sie nicht kontrolliert: Nutzereingaben, Dokumente, Webseiten, E-Mails, Werkzeugergebnisse. Das britische National Cyber Security Centre (NCSC) beschreibt das Kernproblem im Dezember 2025 so: Im Inneren eines Sprachmodells gibt es keine Unterscheidung zwischen Daten und Anweisungen, es gibt nur das nächste Textstück (token). Bei der bekannten SQL-Injection trennen parametrisierte Abfragen beides zuverlässig; für Sprachmodelle fehlt ein solches Gegenstück, und das NCSC hält es für gut möglich, dass Prompt Injection nie so vollständig beherrschbar wird. Es spricht von einem von Natur aus verwirrbaren Stellvertreter (inherently confusable deputy): Ein Angreifer bringt das System dazu, mit dessen Rechten in seinem Sinne zu handeln.',
          'Die OWASP Top 10 for LLM Applications führen Prompt Injection auch in der Fassung vom August 2026 als LLM01:2026 an erster Stelle. Nach der Definition dort liegt eine Prompt Injection vor, wenn eine Eingabe das Verhalten des Modells auf eine vom Entwickler nicht beabsichtigte Weise verändert, gleich ob sie vom Nutzer kommt, aus abgerufenen Inhalten, aus Werkzeugergebnissen, aus Bildern, Ton oder Video oder aus einem dauerhaften Gedächtnis; selbst die Zwischenschritte des Modells zählt OWASP zu den möglichen Eingängen. Die Eingabe muss für Menschen weder lesbar noch sichtbar sein.',
        ],
      },
      {
        titel: 'Direkt und indirekt',
        absaetze: [
          'Bei der direkten Prompt Injection steckt die Manipulation in der Eingabe des Nutzers, absichtlich wie beim Versuch, Sicherheitsregeln auszuhebeln (jailbreak), oder unabsichtlich, wenn jemand Text einfügt, der widersprüchliche Anweisungen enthält. Gefährlicher für RAG-Systeme und Agenten ist die indirekte Form. Greshake und Kollegen zeigten 2023, dass Anwendungen, die Sprachmodelle mit externen Quellen verbinden, die Grenze zwischen Daten und Anweisungen verwischen: Angreifer platzieren Anweisungen in Inhalten, die das System voraussichtlich abrufen wird, und steuern es so aus der Ferne, ohne direkten Zugang. Das BSI nennt als Verstecke Webseiten, E-Mails und Dokumente, auch mit Zeichen, die verarbeitet, aber nicht angezeigt werden. Hat das System die nötigen Rechte, kann eine solche Anweisung Daten über eingebettete Bilder nach außen leiten oder eine E-Mail aus dem Postfach des Opfers verschicken. OWASP betont, dass auch vermeintlich vertrauenswürdige interne Quellen betroffen sind, wenn ein Angreifer über ein Formular oder ein Ticket Text dorthin gelangen lässt.',
        ],
      },
      {
        titel: 'Abwehr in Schichten',
        absaetze: [
          'OWASP hält fest, dass es heute keinen zuverlässigen Mechanismus gibt, der Prompt Injection verhindert, und das BSI kommt zum selben Befund. Die Abwehr ist deshalb eine Frage der Architektur: Das System wird so gebaut, dass eine gelungene Injection keinen großen Schaden anrichten kann. Der wichtigste Hebel sind minimale Rechte (least privilege). Zugangsdaten und die Befugnis, etwas zu verändern, liegen im Anwendungscode, nicht beim Modell, und eine fest programmierte Prüfung entscheidet vor jeder Aktion, ob sie erlaubt ist. Das NCSC gibt dafür eine eingängige Regel wieder: Verarbeitet ein Modell Informationen einer Partei, sinken seine Rechte auf die Rechte dieser Partei. Zur Trennung von Inhalt und Anweisung empfiehlt OWASP, externe Inhalte in einem getrennten, gekennzeichneten Kanal zu übergeben, damit das Modell beides besser auseinanderhalten kann.',
          'Die weiteren Schichten: Ausgaben werden gegen ein festes Format geprüft, bevor ein anderes System damit arbeitet; das fängt Formfehler ab, aber keine inhaltliche Manipulation. Vor jeder folgenreichen, unumkehrbaren oder nach außen sichtbaren Aktion steht eine menschliche Freigabe (human in the loop), und die prüfende Person sieht die tatsächliche Aktion, keine Zusammenfassung. Als Prüfstein vor dem Start nennt OWASP eine Zweierregel (rule of two): Ein Agent, der zugleich nicht vertrauenswürdige Eingaben liest, auf sensible Daten zugreift und nach außen kommunizieren oder etwas verändern kann, braucht für jede Aktion eine Freigabe. Fehlt eine der drei Eigenschaften, entfallen die Voraussetzungen für die schwersten Angriffe, eine Bewertung des Restrisikos bleibt nötig. Wenig taugen Sperrlisten für Formulierungen wie „ignoriere alle vorherigen Anweisungen“; das NCSC erinnert daran, dass sich jeder Angriff beliebig umformulieren lässt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Hausverwaltung mit 120 Beschäftigten will einen Assistenten, der Mieter-E-Mails liest, im Mieterportal nachschlägt und selbständig antwortet. Die Beraterin legt die Zweierregel an: Der Assistent läse Nachrichten beliebiger Absender, hätte Zugriff auf Mieterdaten und könnte nach außen schreiben, alle drei Eigenschaften zugleich. Sie nimmt eine davon heraus. Der Assistent schreibt nur Entwürfe, verschickt werden sie von einem Menschen. Zusätzlich sieht er nur den Datensatz des jeweiligen Absenders, externe Bilder und Links werden in den Entwürfen nicht dargestellt, und vor dem Start versucht ein Prüfteam, ihn mit versteckten Anweisungen in Test-E-Mails zu manipulieren. Der Nutzen bleibt erhalten, denn den Entwurf schreibt weiterhin der Assistent.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Rangfolge der OWASP-Liste beruht auf Einschätzung. OWASP legt in der Fassung 2026 offen, dass Prompt Injection nach den ausgewerteten öffentlichen Vorfallsdaten nicht einmal unter den ersten zehn läge; die Fachleute setzen sie dennoch an die Spitze, und OWASP erklärt die Lücke mit der Abwehr: Weil Teams Injection intensiv bekämpfen, gelangen weniger saubere Fälle in öffentliche Datenbanken. Zugleich zeigen von OWASP zitierte Untersuchungen, dass viele Abwehrverfahren in statischen Tests überzeugen und gegen Angreifer versagen, die die Abwehr kennen und sich anpassen. Das NCSC rät zur Vorsicht bei Produkten, die versprechen, Prompt Injection zu „stoppen“, und zieht eine harte Konsequenz: Verträgt ein System das verbleibende Risiko nicht, ist es womöglich kein guter Anwendungsfall für ein Sprachmodell. Prompt Injection bleibt ein Restrisiko, das durch Entwurf, Aufbau und Betrieb gesteuert, nicht einmalig behoben wird.',
        ],
      },
    ],
    quellen: [Q.owasp2026, Q.ncsc, Q.greshake2023, Q.bsiGenKi],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'datenabfluss',
    abschnitte: [
      {
        titel: 'Was abfließt und wohin',
        absaetze: [
          'OWASP führt die Preisgabe vertraulicher Informationen (sensitive information disclosure) in der Fassung vom August 2026 weiter als LLM02:2026 an zweiter Stelle; es ist nach OWASP der Platz an der Spitze, an dem Einschätzung der Fachleute und Vorfallsdaten übereinstimmen. Gemeint ist jeder Weg, auf dem vertrauliche, regulierte oder geschützte Daten eine LLM-Anwendung unbefugt verlassen, und das ist nicht nur die Antwort: Auch Protokolle, Telemetrie, Zwischenschritte des Modells und Vektordarstellungen (embeddings) können Daten preisgeben. Sind Daten einmal in Modellgewichte, Embeddings oder Adapter eingeflossen, bleiben sie nach OWASP auch nach dem Löschen der Quelle abrufbar.',
          'Für den Alltag in Unternehmen beschreibt das BSI die Seite der Nutzenden. Generative KI wird häufig als Dienst über das Internet angeboten; neben dem Abfluss bei der Übertragung besteht die Möglichkeit, dass der Anbieter auf die Eingaben zugreift und sie für das weitere Training nutzt. Wie weit das geschieht, hängt von seinen Richtlinien, seinen Nutzungsbedingungen und dem für ihn geltenden Datenschutzrecht ab, und das Risiko erstreckt sich auf alles, was dem Modell zur Verfügung gestellt wird. Die Datenschutzkonferenz (DSK) unterscheidet offene Systeme, die über das Internet einem unbestimmten Personenkreis zugänglich sind, von geschlossenen. Bei offenen Systemen verlassen die Eingaben den geschützten Bereich, sie können zu anderen Zwecken weiterverarbeitet oder Dritten offengelegt werden, und häufig werden Daten in Drittstaaten übermittelt. Technisch geschlossene Systeme hält die DSK deshalb für vorzugswürdig.',
        ],
      },
      {
        titel: 'Tarif und Vertrag entscheiden, nicht der Preis',
        absaetze: [
          'Ob Eingaben ins Training wandern, hängt am Tarif und am Vertrag. Ein Beispiel: Anthropic hat im August 2025 seine Verbraucherbedingungen geändert. Unterhaltungen aus den Tarifen Free, Pro und Max werden seitdem für das Training neuer Modelle verwendet, wenn die Einstellung dafür eingeschaltet ist, und dann bis zu fünf Jahre gespeichert; für Angebote unter den gewerblichen Bedingungen, etwa Claude for Work oder die Programmierschnittstelle, gilt das nicht. Auch ein bezahlter Privattarif ist also kein Geschäftsvertrag. Die DSK verlangt zu prüfen, ob Ein- und Ausgaben für das Training verwendet werden und ob sich das ausschließen lässt; vorzugswürdig sind Anwendungen, die das nicht tun. Verarbeitet ein Anbieter personenbezogene Daten im Auftrag, verlangt Art. 28 DSGVO einen Vertrag mit einem Auftragsverarbeiter, der hinreichende Garantien bietet, den Auftragsverarbeitungsvertrag (AVV).',
        ],
      },
      {
        titel: 'Abhilfe in Schichten',
        absaetze: [
          'Die Abhilfe beginnt mit klaren Nutzungsrichtlinien. Das BSI empfiehlt, dass Arbeitgeber festlegen, welche KI-Anwendungen, insbesondere frei zugängliche Webanwendungen, zu welchen Zwecken genutzt und welche Eingaben gemacht werden dürfen, dass diese Regeln verbindlich festgehalten und durch technische Maßnahmen gestützt werden, etwa das gezielte Sperren oder Freischalten von Diensten. Die zweite Schicht sind Geschäftsverträge ohne Training auf Kundendaten; die DSK empfiehlt, dienstliche Konten von vornherein so einzustellen, dass Eingaben nicht zum Training verwendet und keine Verläufe über die Sitzung hinaus gespeichert werden. OWASP rät, den Ausschluss von Training und Speicherung technisch durchzusetzen, statt sich allein auf Vertragstext zu verlassen, und die Bedingungen eines Anbieters bei jeder Änderung neu zu prüfen.',
          'Die dritte Schicht betrifft Ort und Kontrolle der Verarbeitung: ein Anbieter mit Hosting in der EU, ein souveräner Betreiber oder ein internes Modell mit offenen Gewichten (open weights) auf eigener Infrastruktur, also ein geschlossenes System im Sinne der DSK. Die vierte Schicht ist Datenminimierung, ein Grundsatz aus Art. 5 DSGVO: Personenbezogene Daten müssen auf das für den Zweck notwendige Maß beschränkt sein. OWASP übersetzt das für LLM-Anwendungen so, dass an externe Anbieter nur die für die Aufgabe nötigen Felder gehen und Zugangsdaten nie in Systemprompts stehen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'In einem Ingenieurbüro mit 60 Beschäftigten stellt sich im Workshop heraus, dass Angebotsentwürfe, Kundenlisten und Programmcode samt Zugangsschlüsseln seit Monaten in ein kostenloses Chatprogramm kopiert werden. Der Berater verbietet die Arbeit mit KI nicht, sondern leitet sie um: Das Büro bekommt einen freigegebenen Dienst unter einem Geschäftsvertrag mit AVV, Ausschluss des Trainings und Hosting in der EU, dazu eine einseitige Stufung von „öffentlich“ bis „streng vertraulich“ mit Beispielen aus dem eigenen Alltag. Der kostenlose Dienst wird im Firmennetz gesperrt, die Schlüssel werden ausgetauscht. Weil Kundendaten betroffen sein können, prüft die Geschäftsführung mit der Datenschutzbeauftragten, ob eine Verletzung des Schutzes personenbezogener Daten vorliegt. Dann gilt Art. 33 DSGVO: Meldung an die Aufsichtsbehörde unverzüglich und möglichst binnen 72 Stunden, nachdem die Verletzung bekannt wurde, es sei denn, sie führt voraussichtlich zu keinem Risiko für die Betroffenen. Bei voraussichtlich hohem Risiko sind nach Art. 34 auch die Betroffenen zu benachrichtigen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein Vertrag ohne Training löst nicht alles. Er regelt, was der Anbieter mit den Daten tun darf, nicht, ob sie bei ihm liegen, und Bedingungen können sich ändern, wie das Beispiel von 2025 zeigt. Ein internes oder souveränes System senkt das Risiko des Abflusses nach außen, entbindet aber nicht von der DSGVO; Grundsätze wie die Datenminimierung gelten für jede Verarbeitung personenbezogener Daten. Und der Abfluss kann intern geschehen. Das BSI empfiehlt, grundsätzlich anzunehmen, dass alle Informationen, auf die ein Modell im Training oder Betrieb Zugriff hat, abgegriffen werden können; ein Modell, das auf sensiblen Daten nachtrainiert wurde, ist deshalb selbst schützenswert. OWASP nennt als häufigen Auslöser das Überteilen: Laufwerke und Wissensbasen mit zu weiten Rechten speisen einen internen Assistenten mit Daten, die er dann bestimmungsgemäß ausgibt. Die Rechteprüfung gehört deshalb vor die Suche, nicht hinter die Antwort.',
        ],
      },
    ],
    quellen: [Q.owasp2026, Q.bsiGenKi, Q.dskKi, Q.dsgvo, Q.anthropicVerbraucher],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'owasp',
    abschnitte: [
      {
        titel: 'Wer die Liste macht',
        absaetze: [
          'OWASP ist eine gemeinnützige Stiftung, die mit quelloffenen Projekten, weltweiten Gemeinschaften und Weiterbildung die Sicherheit von Software verbessern will; ihre Materialien sind frei zugänglich. Die Top 10 for Large Language Model Applications entstanden 2023 als Liste der kritischsten Schwachstellen von Anwendungen, die auf großen Sprachmodellen aufbauen. Daraus ist das OWASP GenAI Security Project geworden, eine weltweite Initiative, die Sicherheitsrisiken generativer KI einschließlich agentischer Systeme beschreibt. Auf die Fassungen 1.0 und 1.1 von 2023 folgten im November 2024 die Fassung 2025 und im August 2026 die Fassung 2026. Die Liste steht unter der Lizenz CC BY-SA 4.0 und darf mit Namensnennung und unter gleichen Bedingungen in eigene Prüflisten übernommen werden.',
          'Neu ist 2026 die Methode. Frühere Fassungen beruhten allein auf dem Urteil der beteiligten Fachleute. Für die Fassung 2026 hat das Projekt diese Einschätzung erstmals gegen Daten über tatsächliche Vorfälle aus öffentlichen Schwachstellen- und Schadensdatenbanken geprüft; die Abstimmung der Fachleute trägt drei Viertel des Gewichts, die Vorfallsdaten ein Viertel. Das Vorwort der Projektleitung fasst die Haltung zusammen: nicht versuchen, ein Modell zu bauen, das sich nicht täuschen lässt, sondern das System darum herum so bauen, dass nichts Wichtiges zerbricht, wenn das Modell getäuscht wird.',
        ],
      },
      {
        titel: 'Die zehn Risiken der Fassung 2026',
        absaetze: [
          'An erster Stelle steht Prompt Injection (LLM01:2026), also Eingaben, die das Verhalten des Modells unbeabsichtigt verändern, direkt durch Nutzer oder indirekt über eingelesene Inhalte. Es folgen die Preisgabe vertraulicher Informationen (LLM02:2026 Sensitive Information Disclosure) und übermäßige Handlungsmacht (LLM03:2026 Excessive Agency), bei der ein System mit zu vielen Funktionen, Rechten oder zu viel Autonomie auf fehlerhafte oder manipulierte Ausgaben hin Schaden anrichtet. LLM04:2026 Supply Chain betrifft die Lieferkette aus fremden Modellen, Datensätzen und Adaptern, LLM05:2026 Data and Model Poisoning die gezielte oder versehentliche Vergiftung von Trainings-, Such- oder Modelldaten.',
          'LLM06:2026 Unbounded Consumption beschreibt unkontrollierten Ressourcenverbrauch, der Dienste lahmlegen, hohe Kosten verursachen oder das Nachbauen eines Modells ermöglichen kann. LLM07:2026 Misinformation erfasst falsche oder irreführende Ausgaben, die glaubwürdig genug sind, um Entscheidungen oder Aktionen auszulösen, darunter Halluzinationen und übermäßiges Vertrauen in flüssige Antworten. LLM08:2026 Hidden Context Exposure betrifft verborgene Steuerinformationen wie Systemprompts, Werkzeugbeschreibungen und Regeln, die sich auslesen oder erschließen lassen; OWASP rät, davon auszugehen, dass dieser Kontext auffindbar ist, und nie Zugangsdaten darin abzulegen. LLM09:2026 Vector and Embedding Weaknesses betrifft Schwächen der Vektorsuche, etwa in RAG-Systemen, LLM10:2026 Improper Output Handling die ungeprüfte Weitergabe von Modellausgaben an andere Systeme.',
        ],
      },
      {
        titel: 'Was sich gegenüber 2025 geändert hat',
        absaetze: [
          'Die Reihenfolge hat sich 2026 stärker bewegt als in früheren Jahren. Prompt Injection und die Preisgabe vertraulicher Informationen blieben auf den Plätzen eins und zwei. Excessive Agency stieg vom sechsten auf den dritten Platz, nach OWASP die folgenreichste Verschiebung, weil Einschätzung und Vorfallsdaten übereinstimmend zeigen, dass Schäden in agentischen Einsätzen entstehen. Unbounded Consumption stieg um vier Plätze, Improper Output Handling fiel vom fünften auf den zehnten. Misinformation stand bei den Fachleuten weit unten, in den Vorfallsdaten weit oben, und rückte deshalb vor. Was 2025 System Prompt Leakage hieß, ist jetzt weiter gefasst als Hidden Context Exposure. Wer ältere Unterlagen nutzt, muss auf die Jahreszahl achten: LLM06 bezeichnete 2025 Excessive Agency, 2026 Unbounded Consumption. OWASP schreibt die Kennungen darum mit Jahr, etwa LLM03:2026.',
          'Die Liste zieht zugleich eine Grenze. Sie behandelt das Modell als Baustein einer Anwendung. Sobald es selbst handelt, mit Werkzeugen, einem Gedächtnis über Sitzungen hinweg und Folgen außerhalb der Anwendung, verweist OWASP auf die im Dezember 2025 vorgestellte OWASP Top 10 for Agentic Applications, die mit den Kennungen ASI01 bis ASI10 Risiken wie die Entführung des Agentenziels und den Missbrauch von Werkzeugen beschreibt. Die Fassung 2026 ordnet ihre Einträge in einem Anhang den Risiken der Agentenliste zu, und für agentische Systeme sind nach OWASP beide Listen gemeinsam zu lesen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Versicherungsagentur mit 90 Beschäftigten will einen Assistenten starten, der Kundenanfragen mit Hilfe der internen Wissensbasis beantwortet und Termine einträgt. Vor dem Start geht die Beraterin mit dem Team die zehn Einträge der Fassung 2026 einzeln durch und hält für jeden fest, ob er zutrifft, welche Maßnahme greift und wer sie verantwortet. Dabei fällt auf, dass der Systemprompt einen Zugangsschlüssel für den Kalender enthält (LLM08 und LLM02), dass der Kalenderzugang auch das Löschen erlaubt (LLM03) und dass es keine Obergrenze für Anfragen gibt (LLM06). Diese Punkte werden vor dem Start behoben, der Rest wird als bewusst getragenes Restrisiko dokumentiert. Weil der Anhang der Liste die Einträge unter anderem dem Rahmenwerk MITRE ATLAS und dem Profil für generative KI des NIST (AI 600-1) zuordnet, lässt sich das Ergebnis in das bestehende Risikomanagement übernehmen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Liste ist ein Konsensprodukt, keine Norm und kein Prüfzeichen. Wer alle zehn Punkte abhakt, hat ein System nicht für sicher erklärt, sondern bekannte Risikoklassen betrachtet. OWASP legt selbst offen, wie weit Urteil und Daten auseinanderliegen können: Nach den reinen Vorfallsdaten läge Prompt Injection nicht einmal unter den ersten zehn, was das Projekt mit der intensiven Abwehr erklärt, während Fehlinformation in den Daten weit häufiger auftaucht, als die Fachleute annahmen. Die Vorfallsdaten stammen aus öffentlichen Datenbanken und bilden nur ab, was gemeldet wird; OWASP gewichtet sie bewusst nur mit einem Viertel, damit ein einzelnes verrauschtes Datenjahr das Urteil der Praxis nicht umwirft. Die Liste ändert sich zudem mit jeder Fassung, wie die Umnummerierung von 2026 zeigt, und sie ersetzt keine rechtliche Bewertung: OWASP betont, dass das Dokument keine Rechtsberatung ist.',
        ],
      },
    ],
    quellen: [Q.owasp2026, Q.owasp2025, Q.owaspAgentic, Q.owaspProjekt],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'modelllandschaft',
    abschnitte: [
      {
        titel: 'Zwei Bezugswege, Stand September 2026',
        absaetze: [
          'Bei einem proprietären Modell bleiben die Gewichte, also die gelernten Parameter, beim Anbieter. Genutzt wird es über eine Programmierschnittstelle (API) oder eine Anwendung des Anbieters, der Betrieb, Aktualisierung und Absicherung übernimmt. Bei einem Modell mit offenen Gewichten (open weights) lassen sich die Parameter herunterladen, auf eigener Infrastruktur betreiben und anpassen, etwa durch Nachtraining (fine-tuning). Der AI Index der Stanford University vom April 2026 zeigt, dass unter den bedeutenden Modellen des Jahres 2025 der Zugang über eine API die häufigste Form der Veröffentlichung war und offene Gewichte ohne Einschränkung die zweithäufigste; dazwischen gibt es Abstufungen mit eingeschränkter oder nur nichtkommerzieller Nutzung.',
          'Zu den proprietären Familien zählen nach dem AI Index die GPT-5-Modelle von OpenAI, Gemini von Google und Claude von Anthropic. Offene Gewichte veröffentlichten unter anderem Meta mit Llama 4, die Entwickler der Qwen-Modelle, Mistral etwa mit Mixtral und DeepSeek, das im September 2026 die Gewichte von DeepSeek-V4.1-Flash unter der MIT-Lizenz freigab. Die führenden Modelle beschreibt der AI Index als kaum noch unterscheidbar. Geschlossene Modelle lagen Anfang 2026 weiter vorn, offene sind aber weit konkurrenzfähiger als vor wenigen Jahren, und der Abstand schwankt mit jeder neuen proprietären Veröffentlichung. Bei Meta beobachtet der AI Index seit Anfang 2025 weniger konkurrenzfähige Veröffentlichungen. Je ähnlicher sich die Spitzenmodelle werden, desto eher entscheiden nach dem AI Index Kosten, Antwortzeit, Zuverlässigkeit und Eignung für ein Fachgebiet.',
        ],
      },
      {
        titel: 'Offene Gewichte sind nicht Open Source',
        absaetze: [
          'Offene Gewichte bedeuten nicht, dass ein Modell quelloffen (open source) ist. Die Open Source Initiative hat im Oktober 2024 die Open Source AI Definition 1.0 veröffentlicht. Danach muss ein offenes KI-System erlauben, es für jeden Zweck ohne Erlaubnis zu nutzen, es zu untersuchen, zu verändern und weiterzugeben. Dafür müssen neben den Parametern auch ausreichend genaue Angaben zu den Trainingsdaten und der vollständige Code für Training und Betrieb unter entsprechenden Bedingungen verfügbar sein. Das erfüllen viele Modelle nicht; der AI Index stellt fest, dass die bedeutenden Modelle des Jahres 2025 überwiegend ohne ihren Trainingscode veröffentlicht wurden.',
          'Für die Beratung ist die Lizenz deshalb Pflichtlektüre. Metas Nutzungsrichtlinie für Llama 4 verbietet bestimmte Verwendungen und gewährt die Rechte aus der Lizenz für die multimodalen Llama-4-Modelle ausdrücklich nicht an Personen mit Wohnsitz und Unternehmen mit Hauptsitz in der Europäischen Union; ausgenommen sind nur Endnutzer eines Produkts, das ein solches Modell enthält. Ein Unternehmen mit Hauptsitz in Deutschland hat für diese Modelle also keine Nutzungsrechte aus der Lizenz, obwohl die Gewichte herunterladbar sind. Eine freizügige Lizenz wie MIT regelt die Nutzung dagegen großzügig, sagt aber nichts darüber, ob Trainingsdaten und Trainingscode offenliegen.',
        ],
      },
      {
        titel: 'Betrieb und Governance',
        absaetze: [
          'Die Wahl ist deshalb eine Governance-Entscheidung. Das BSI nennt Kriterien für die Auswahl eines Modells und seines Betreibers: welche Daten im Training verwendet wurden und ob sie rechtliche oder sicherheitsbezogene Mängel haben, wie die Lieferkette abgesichert ist, wie das Modell geprüft wurde, wie Versionen verwaltet werden, welche rechtlichen Anforderungen und Haftungsregeln gelten, zu welchen Zwecken Modell und Ausgaben technisch und rechtlich genutzt werden dürfen, welche Betriebsformen es gibt und welche Rechen- und Speicherkapazität ein Eigenbetrieb braucht. Ein API-Modell bietet oft die höchste Leistung und die meiste Bequemlichkeit, aber weniger Kontrolle: Der Anbieter bestimmt, wann sich ein Modell ändert, und wohin die Daten fließen, regelt der Vertrag. Ein selbst betriebenes Modell hält die Daten im Haus und erlaubt Anpassungen, was für souveräne und regulierte Einsätze zählt, verlagert aber Aktualisierung, Absicherung, Überwachung und Kapazitätsplanung in die eigene Organisation.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Klinikverbund mit 1.200 Beschäftigten will zwei Anwendungen: einen Assistenten, der interne Behandlungsleitlinien durchsucht und dabei auch Fallnotizen mit Patientendaten sieht, und eine Hilfe für Pressetexte. Die Beraterin trennt die Entscheidungen. Für den Leitlinienassistenten kommen nur ein Modell mit offenen Gewichten auf eigenen Servern oder ein Anbieter mit vertraglich und technisch gesichertem Betrieb in der EU in Frage; zwei Kandidaten werden an anonymisierten Fällen aus dem eigenen Haus getestet, ihre Lizenzen geprüft und der Bedarf an Rechenleistung beziffert. Für Pressetexte ohne Personenbezug genügt ein API-Modell unter Geschäftsvertrag. Beide Anwendungen sprechen das Modell über eine eigene Zwischenschicht an, damit es sich später austauschen lässt, ohne die Anwendung neu zu bauen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Jede Aufzählung von Modellen ist eine Momentaufnahme, die schnell veraltet. Dieser Text gibt den Stand September 2026 wieder, die Leistungsvergleiche des AI Index reichen bis Anfang 2026. Der AI Index warnt selbst, dass führende Labore weniger offenlegen und unabhängige Tests nicht immer bestätigen, was Entwickler berichten; Ranglisten taugen deshalb zur Orientierung, nicht zur Auswahl. Offene Gewichte machen nicht automatisch souverän: Die Lizenz kann die Nutzung einschränken, wie bei Llama 4, und ob ein Anbieter seine nächste Generation wieder offen veröffentlicht, liegt allein bei ihm. Umgekehrt bedeutet ein API-Modell nicht zwingend Kontrollverlust, wenn Vertrag, Hosting und Datenflüsse geprüft sind. Einen Pauschalsieger gibt es nicht. Die Wahl folgt dem Anwendungsfall und dem Governance-Rahmen und ist bei jedem Modellwechsel neu zu prüfen.',
        ],
      },
    ],
    quellen: [Q.aiIndex2026, Q.osiOsaid, Q.metaLlama4Richtlinie, Q.deepseekV41, Q.bsiGenKi],
  },
];
