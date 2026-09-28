import type { Quelle } from '../typen';
import type { Vertiefung } from '.';

// Vertiefungen zum EU AI Act (Stand nach der Änderungsverordnung (EU) 2026/1744). Alle Quellen am 2026-09-28 abgerufen und geprüft.
const AB = '2026-09-28';
const Q = {
  kiVo: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2024/1689 zur Festlegung harmonisierter Vorschriften für künstliche Intelligenz (Verordnung über künstliche Intelligenz) (Amtsblatt der EU, 2024)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32024R1689',
    abgerufen: AB,
  } satisfies Quelle,
  omnibus: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2026/1744 zur Änderung der Verordnungen (EU) 2024/1689, (EU) 2018/1139 und (EU) 2023/1230 (Digital-Omnibus-Verordnung zur KI) (Amtsblatt der EU, 2026)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32026R1744',
    abgerufen: AB,
  } satisfies Quelle,
  komAiAct: {
    titel: 'Europäische Kommission — AI Act (Shaping Europe’s digital future, Stand 3. August 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    abgerufen: AB,
  } satisfies Quelle,
  komDefinition: {
    titel:
      'Europäische Kommission — Guidelines on the definition of an artificial intelligence system established by the AI Act (Europäische Kommission, 2025)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-ai-system-definition-facilitate-first-ai-acts-rules-application',
    abgerufen: AB,
  } satisfies Quelle,
  oecd: {
    titel:
      'OECD — Explanatory memorandum on the updated OECD definition of an AI system (OECD Artificial Intelligence Papers Nr. 8, 2024)',
    url: 'https://doi.org/10.1787/623da898-en',
    abgerufen: AB,
  } satisfies Quelle,
  komVerbote: {
    titel:
      'Europäische Kommission — Guidelines on prohibited artificial intelligence practices established by the AI Act (Europäische Kommission, 2025)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/commission-publishes-guidelines-prohibited-artificial-intelligence-ai-practices-defined-ai-act',
    abgerufen: AB,
  } satisfies Quelle,
  komHochrisiko: {
    titel:
      'Europäische Kommission — Draft Commission guidelines on the classification of high-risk AI systems (Europäische Kommission, 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/draft-commission-guidelines-classification-high-risk-ai-systems',
    abgerufen: AB,
  } satisfies Quelle,
  komArt50Leitlinien: {
    titel:
      'Europäische Kommission — Guidelines on transparency obligations for providers and deployers of AI systems (Europäische Kommission, 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems',
    abgerufen: AB,
  } satisfies Quelle,
  komArt50Kodex: {
    titel: 'Europäische Kommission — Code of Practice on Transparency of AI-generated Content (Europäische Kommission, 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content',
    abgerufen: AB,
  } satisfies Quelle,
  komGpaiKodex: {
    titel: 'Europäische Kommission — The General-Purpose AI Code of Practice (Europäische Kommission, 2025)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai',
    abgerufen: AB,
  } satisfies Quelle,
  komGpaiLeitlinien: {
    titel: 'Europäische Kommission — Guidelines for providers of general-purpose AI models (Europäische Kommission, 2025)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers',
    abgerufen: AB,
  } satisfies Quelle,
  bnetza: {
    titel:
      'Bundesnetzagentur — Bundesnetzagentur übernimmt zentrale Rolle bei der Umsetzung der KI-Verordnung (Pressemitteilung, 2026)',
    url: 'https://www.bundesnetzagentur.de/SharedDocs/Pressemitteilungen/DE/2026/20260729_KI_VO.html',
    abgerufen: AB,
  } satisfies Quelle,
};

export const aiAct: Vertiefung[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ai-act',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Offiziell heißt der AI Act Verordnung (EU) 2024/1689, auf Deutsch kurz KI-Verordnung. Sie stammt vom 13. Juni 2024, erschien am 12. Juli 2024 im Amtsblatt der Europäischen Union und ist am 1. August 2024 in Kraft getreten. Als Verordnung gilt sie unmittelbar in jedem Mitgliedstaat, ohne nationales Umsetzungsgesetz. Den Anspruch, der erste umfassende Rechtsrahmen für KI weltweit zu sein, formuliert die Europäische Kommission selbst. Nach Artikel 1 soll sie den Binnenmarkt verbessern, vertrauenswürdige KI fördern und Gesundheit, Sicherheit und Grundrechte schützen. Ihre Pflichten knüpfen an Rollen an: Anbieter (provider) ist, wer ein KI-System entwickelt oder entwickeln lässt und unter eigenem Namen in Verkehr bringt oder in Betrieb nimmt; Betreiber (deployer) ist, wer es in eigener Verantwortung verwendet, außer rein privat (Art. 3 Nr. 3 und 4). Wer einen zugekauften Chatbot einsetzt, ist Betreiber; wer ihn selbst baut und anbietet, wird Anbieter.',
          'Was ein KI-System ist, legt Artikel 3 Nummer 1 fest: ein maschinengestütztes System, das für einen in unterschiedlichem Grade autonomen Betrieb ausgelegt ist, nach seiner Betriebsaufnahme anpassungsfähig sein kann und aus den erhaltenen Eingaben für explizite oder implizite Ziele ableitet, wie Ausgaben wie Vorhersagen, Inhalte, Empfehlungen oder Entscheidungen erstellt werden, die physische oder virtuelle Umgebungen beeinflussen können. Die Leitlinien der Kommission (2025) zerlegen das in sieben Merkmale und nennen das Ableiten (inference) unverzichtbar: Es trennt KI-Systeme von herkömmlicher Software, die nur Regeln ausführt, die allein Menschen festgelegt haben. Eine Datenbankabfrage nach festen Kriterien oder eine Tabellenkalkulation ohne KI-Funktionen fällt heraus. Die Definition ist technologieneutral und kennt keine Größengrenze. Ihr Wortlaut folgt weitgehend der Definition, die die OECD im November 2023 überarbeitet hat; die OECD nennt als ein Ziel dieser Überarbeitung, die Begriffe in der EU, in Japan und anderswo einander anzunähern.',
        ],
      },
      {
        titel: 'Risikostufen und Zeitplan',
        absaetze: [
          'Die Staffelung nach Risiko fasst die Kommission in vier Stufen. Unannehmbares Risiko ist verboten (Art. 5). Hohes Risiko löst umfangreiche Pflichten aus; hochriskant sind KI-Systeme in Produkten nach Anhang I und in den Einsatzbereichen nach Anhang III, etwa Personalauswahl oder Kreditwürdigkeitsprüfung. Begrenztes Risiko, bei der Kommission inzwischen Transparenzrisiko genannt, bedeutet Offenlegungspflichten nach Artikel 50, etwa für Chatbots und Deepfakes. Minimales Risiko löst keine besonderen Pflichten aus; darunter fällt nach der Kommission die große Mehrheit der in der EU genutzten KI-Systeme, etwa Spamfilter oder KI in Videospielen. Quer dazu steht ein eigener Pflichtenkreis für KI-Modelle mit allgemeinem Verwendungszweck (general-purpose AI, GPAI), also große Basismodelle.',
          'Die Pflichten beginnen gestaffelt. Grundsätzlich gilt die Verordnung ab dem 2. August 2026. Seit dem 2. Februar 2025 gelten die allgemeinen Bestimmungen samt KI-Kompetenz (Art. 4) und die Verbote, seit dem 2. August 2025 die Regeln für GPAI-Modelle, die Governance und die meisten Sanktionsvorschriften. Stand September 2026 gilt dieser Zeitplan in der Fassung der Verordnung (EU) 2026/1744 vom 8. Juli 2026, des Digital Omnibus zur KI, veröffentlicht am 24. Juli 2026 und in Kraft seit dem 27. Juli 2026. Sie verschiebt die Hochrisiko-Pflichten für Anhang III vom 2. August 2026 auf den 2. Dezember 2027 und für Anhang I vom 2. August 2027 auf den 2. August 2028. Sie fügt zwei Verbote hinzu, die ab dem 2. Dezember 2026 gelten, und fasst Artikel 4 neu: Anbieter und Betreiber müssen die Entwicklung der KI-Kompetenz ihres Personals unterstützen, ohne ein bestimmtes Niveau garantieren zu müssen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Stadtwerk mit 300 Beschäftigten fragt, ob der AI Act es überhaupt betrifft. Die Beraterin beginnt mit einer Bestandsaufnahme: Wo arbeitet Software, die aus Daten ableitet, statt festen Regeln zu folgen? Auf der Liste stehen ein Spamfilter, ein Chatbot auf der Website für Fragen zu Tarifen, ein Modell zur Prognose des Energiebedarfs und ein Werkzeug, mit dem die Personalabteilung Bewerbungen vorsortieren möchte. Ein Makro, das Zählerstände nach festen Regeln prüft, fällt heraus. Der Spamfilter trägt minimales Risiko. Den Chatbot hat ein Dienstleister gebaut. Ihn als KI erkennbar zu machen, ist nach Artikel 50 Sache dieses Anbieters; das Stadtwerk prüft als Betreiber, ob der Hinweis erscheint. Die Prognose ist kein Hochrisiko-Fall, solange sie nicht als Sicherheitsbauteil in den Netzbetrieb eingreift. Das Bewerbungswerkzeug fällt unter Anhang III, seine Pflichten gelten ab dem 2. Dezember 2027. Für alle, die mit den Werkzeugen arbeiten, plant das Stadtwerk kurze Schulungen zur KI-Kompetenz. Ergebnis ist eine Tabelle aus Rolle, Stufe und Stichtag, die bei jedem neuen Werkzeug fortgeschrieben wird.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Der AI Act ist ein Rahmen, dessen Einzelheiten sich erst füllen. Viele Begriffe erläutert die Kommission in Leitlinien, die ausdrücklich nicht verbindlich sind. An den Rändern bleibt Unsicherheit: Ob ein einfaches statistisches Modell schon ableitet oder nur rechnet, entscheidet der Einzelfall, und die Kommission hält selbst fest, dass es keine abschließende Liste geben kann. Auch die Fristen haben sich bewegt. Die Änderungsverordnung begründet die Verschiebung damit, dass Normen und nationale Aufsichtsstrukturen später kamen als geplant und der Aufwand für die Unternehmen höher war als erwartet. Wer 2025 für den 2. August 2026 plante, musste umplanen, und auch die neuen Daten gelten nur, solange der Gesetzgeber sie nicht erneut ändert. Jede Aussage zu Fristen braucht deshalb ein Prüfdatum; dieser Text gibt den Stand vom September 2026 wieder. Schließlich ersetzt der AI Act kein anderes Recht: Die Datenschutz-Grundverordnung bleibt nach Artikel 2 Absatz 7 unberührt. Wer nur fragt, ob ein Werkzeug unter den AI Act fällt, stellt die halbe Frage.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibus, Q.komAiAct, Q.komDefinition, Q.oecd],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'risikoklassen',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die vier Stufen sind die Form, in der die Europäische Kommission den AI Act erklärt: unannehmbares Risiko, hohes Risiko, Transparenzrisiko (oft begrenztes Risiko genannt) sowie minimales oder kein Risiko. Das Gesetz selbst spricht von einem risikobasierten Ansatz (Erwägungsgrund 26) und ordnet die Pflichten eigenen Vorschriften zu: den Verboten in Artikel 5, den Hochrisiko-Systemen in Kapitel III ab Artikel 6, den Transparenzpflichten in Artikel 50. Für alle übrigen Systeme sieht es keine besonderen Pflichten vor. Gemessen wird das Risiko an Gesundheit, Sicherheit und Grundrechten der Betroffenen, und eingestuft wird deshalb nicht eine Technik, sondern ein Einsatzzweck. Dasselbe Sprachmodell trägt minimales Risiko, wenn es Newsletter entwirft, und ist hochriskant, wenn es Bewerbungen sichtet und Bewerber bewertet, denn genau das nennt Anhang III Nummer 4.',
          'Stand September 2026 sind seit dem 2. Februar 2025 acht Praktiken verboten, etwa Social Scoring oder Emotionserkennung am Arbeitsplatz; zwei weitere, eingefügt durch die Verordnung (EU) 2026/1744, gelten ab dem 2. Dezember 2026. Hochriskant sind Systeme, die als Sicherheitsbauteil in drittgeprüften Produkten nach Anhang I stecken oder in einem der Bereiche nach Anhang III eingesetzt werden, etwa Beschäftigung oder Kreditwürdigkeit; ihre umfangreichen Pflichten gelten ab dem 2. Dezember 2027 (Anhang III) beziehungsweise 2. August 2028 (Anhang I). Die Transparenzpflichten gelten seit dem 2. August 2026, etwa für Chatbots und Deepfakes. Minimales Risiko betrifft nach der Kommission die große Mehrheit heutiger Anwendungen, etwa Spamfilter und KI in Videospielen. Die Stufen schließen einander nicht aus: Ein Hochrisiko-System, das mit Menschen chattet, trägt zusätzlich die Transparenzpflicht (Art. 50 Abs. 6).',
        ],
      },
      {
        titel: 'Wie die Einstufung funktioniert',
        absaetze: [
          'Was Anhang III nennt, gilt als hochriskant (Art. 6 Abs. 2). Artikel 6 Absatz 3 erlaubt eine Ausnahme, wenn das System kein erhebliches Risiko für Gesundheit, Sicherheit oder Grundrechte birgt und unter anderem das Ergebnis der Entscheidung nicht wesentlich beeinflusst. Das Gesetz nennt vier Fälle: eine eng gefasste Verfahrensaufgabe, die Verbesserung einer abgeschlossenen menschlichen Tätigkeit, das Erkennen von Entscheidungsmustern ohne Ersetzen der menschlichen Bewertung und eine vorbereitende Aufgabe. Nimmt das System ein Profiling natürlicher Personen vor, gilt es immer als hochriskant. Wer sich als Anbieter auf die Ausnahme beruft, dokumentiert seine Bewertung vor dem Inverkehrbringen, registriert das System in der EU-Datenbank und legt die Dokumentation auf Verlangen der Behörde vor (Art. 6 Abs. 4, Art. 49 Abs. 2). Auch diese Einstufungsregeln hat die Änderungsverordnung verschoben; formal gelten sie für Anhang III ab dem 2. Dezember 2027. Die Leitlinien mit Praxisbeispielen, die die Kommission nach Artikel 6 Absatz 5 bis zum 2. Februar 2026 vorlegen sollte, liegen Stand September 2026 nur als Entwurf vom 19. Mai 2026 vor. Eingestuft wird trotzdem jetzt, weil Einkauf, Verträge und Schulungen davon abhängen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Wohnungsgenossenschaft mit 80 Beschäftigten hat ein Sprachmodell lizenziert und fragt, ob sie etwas tun muss. Die Beraterin legt eine Liste der Einsatzzwecke an, nicht der Werkzeuge. Entwürfe für die Mitgliederzeitung: minimales Risiko. Ein Assistent auf der Website, der Fragen zu Nebenkosten beantwortet: Transparenzpflicht, der Hinweis auf die KI gehört ins Chatfenster. Dann erwähnt die Personalleiterin, dass dasselbe Modell Bewerbungen vorsortieren soll. Das ist ein Anhang-III-Fall; weil das Modell dabei persönliche Merkmale der Bewerber automatisiert bewertet, liegt in aller Regel Profiling vor, und die Ausnahme scheidet aus. Die Beraterin hält jede Einstufung mit Datum und Begründung fest und vereinbart, dass jeder neue Einsatzzweck vor dem Start auf die Liste kommt. Zur ersten Orientierung verweist sie auf den KI-Service-Desk der Bundesnetzagentur, der ein Online-Werkzeug zur ersten Einschätzung der Risikoklasse anbietet; die dokumentierte Prüfung ersetzt es nicht.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Der häufigste Fehler ist der Satz „Das fällt nicht unter den AI Act“ ohne Prüfung. Einfachheit ist keine Risikostufe, und auch minimales Risiko ist das Ergebnis einer Einordnung. Der zweite ist die Einstufung pro Werkzeug statt pro Einsatzzweck: Wandert ein harmloses Werkzeug still in die Personalabteilung, gilt die alte Einstufung nicht mehr. Der dritte ist die Überreaktion, sicherheitshalber alles als hochriskant zu behandeln; das bindet Aufwand an Systeme, die ihn nicht brauchen, und verwässert den Blick für die kritischen Fälle. Der vierte ist das Vertrauen auf ein Etikett. Ein Anbieter, der sein System „nur unterstützend“ nennt, hat damit keine Ausnahme belegt; sie verlangt eine dokumentierte Bewertung und die Registrierung, und bei Profiling greift sie nie. Als Betreiber fragt man nach diesen Unterlagen. Der fünfte ist, die Stufen für exklusiv zu halten und bei einem Hochrisiko-System die Transparenzpflicht zu vergessen. Die Einteilung selbst bleibt eine Vereinfachung: Die Grenze zieht der Einzelfall, und solange die Leitlinien nur als Entwurf vorliegen, dokumentiert man die verbleibende Unsicherheit, statt sie zu verschweigen.',
        ],
      },
    ],
    quellen: [Q.komAiAct, Q.kiVo, Q.omnibus, Q.komHochrisiko, Q.bnetza],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'verbote',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Artikel 5 ist die kürzeste Antwort des AI Act: Diese Praktiken sind nicht reguliert, sondern untersagt. Das Verbot erfasst Inverkehrbringen, Inbetriebnahme und Verwendung; es trifft also Anbieter ebenso wie Betreiber, die ein solches System einsetzen. Die Verbote gelten seit dem 2. Februar 2025, und die Änderungsverordnung von 2026 hat daran nichts verschoben. Ein Verbot ist eine andere Kategorie als ein Risiko: Bei einem Hochrisiko-System fragt man, wie es sich sicher betreiben lässt; eine verbotene Praktik macht keine Konformitätsbewertung zulässig, erlaubt ist nur, was eine der eng gefassten Ausnahmen im Artikel selbst deckt. Verstöße fallen in die höchste Bußgeldstufe: bis zu 35 Millionen Euro oder, bei Unternehmen, bis zu 7 Prozent des weltweiten Jahresumsatzes des Vorjahres, je nachdem, welcher Betrag höher ist (Art. 99 Abs. 3). Die Kommission hat 2025 Leitlinien mit Beispielen veröffentlicht; sie sind nicht verbindlich, die verbindliche Auslegung bleibt dem Gerichtshof der Europäischen Union vorbehalten.',
        ],
      },
      {
        titel: 'Die Verbote im Einzelnen',
        absaetze: [
          'Verboten sind erstens unterschwellige Beeinflussung sowie absichtlich manipulative oder täuschende Techniken, die das Verhalten eines Menschen wesentlich verändern und ihm oder anderen erheblichen Schaden zufügen oder wahrscheinlich zufügen; zweitens das Ausnutzen einer Schwäche wegen Alters, einer Behinderung oder einer bestimmten sozialen oder wirtschaftlichen Lage mit derselben Folge; drittens die soziale Bewertung (social scoring) nach Verhalten oder Persönlichkeitsmerkmalen, wenn sie zu Benachteiligung in Zusammenhängen führt, die mit der Datenerhebung nichts zu tun haben, oder unverhältnismäßig ist; viertens die Vorhersage, ob jemand eine Straftat begehen wird, allein auf Grundlage von Profiling oder persönlichen Merkmalen. Erlaubt bleibt die Unterstützung einer menschlichen Bewertung, die sich bereits auf objektive, überprüfbare Tatsachen zu einer kriminellen Aktivität stützt.',
          'Fünftens ist verboten, Gesichtserkennungsdatenbanken durch ungezieltes Auslesen (scraping) von Gesichtsbildern aus dem Internet oder aus Überwachungsaufnahmen aufzubauen; sechstens, Emotionen am Arbeitsplatz und in Bildungseinrichtungen abzuleiten, außer aus medizinischen oder Sicherheitsgründen; siebtens die biometrische Kategorisierung, um auf Rasse, politische Einstellung, Gewerkschaftszugehörigkeit, religiöse oder weltanschauliche Überzeugung, Sexualleben oder sexuelle Ausrichtung zu schließen; achtens die biometrische Echtzeit-Fernidentifizierung in öffentlich zugänglichen Räumen zur Strafverfolgung, mit eng umrissenen Ausnahmen wie der gezielten Suche nach Entführungsopfern, grundsätzlich nach vorheriger Genehmigung durch eine Justizbehörde oder eine unabhängige Verwaltungsbehörde. Die Verordnung (EU) 2026/1744 fügt zwei Verbote hinzu, die ab dem 2. Dezember 2026 gelten: KI-Systeme, die realistische intime oder sexuelle Darstellungen einer bestimmbaren Person ohne deren ausdrückliche Zustimmung erzeugen, und solche, die Darstellungen sexuellen Kindesmissbrauchs erzeugen. Die Kommission fasst beide zusammen und zählt seither neun verbotene Praktiken.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Logistikunternehmen mit 400 Beschäftigten möchte Überlastung früh erkennen. Ein Anbieter bietet Software an, die in Videokonferenzen Mimik und Stimme auswertet und Teams eine Stressampel zeigt; später soll sie auch Bewerbungsgespräche auswerten. Die Beraterin stoppt beides. Emotionen aus Gesicht und Stimme am Arbeitsplatz abzuleiten ist verboten; die Leitlinien der Kommission nennen die Auswertung der emotionalen Stimmung in hybriden Teams aus Videoanrufen ausdrücklich als verbotenes Beispiel und rechnen das Auswahlverfahren zum Arbeitsplatz. Den Einwand, es gehe um Gesundheit, beantworten dieselben Leitlinien: Die Ausnahme ist eng auszulegen, sie meint etwa CE-gekennzeichnete Medizinprodukte und den Schutz von Leben und Gesundheit, nicht das allgemeine Wohlbefinden; ein System, das Burnout erkennen soll, bleibt verboten. Das Ziel ist legitim, nur der Weg nicht. Die Beraterin schlägt freiwillige, anonyme Befragungen, Kennzahlen wie Überstunden und Gesprächsangebote vor, mit dem Betriebsrat von Anfang an.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Verbote hängen an Merkmalen, die Auslegung verlangen: Wann verändert Manipulation das Verhalten wesentlich, wann ist ein Schaden erheblich, wann hat ein Nachteil nichts mit der Datenerhebung zu tun? Die Leitlinien helfen mit Beispielen, binden aber weder Behörden noch Gerichte. Manches, was heikel wirkt, ist nicht verboten: Die Emotionserkennung bei Kunden eines Callcenters fällt nach den Leitlinien nicht unter das Arbeitsplatzverbot, und eine Kreditwürdigkeitsprüfung ist hochriskant, nicht verboten. Umgekehrt ist nicht alles erlaubt, was Artikel 5 nicht nennt; Verbote aus anderem Unionsrecht bleiben unberührt (Art. 5 Abs. 8). Der Zuschnitt ist zudem nicht einheitlich: Ob und wie weit die Echtzeit-Fernidentifizierung zur Strafverfolgung überhaupt zugelassen wird, entscheiden die Mitgliedstaaten in eigenen Gesetzen. Und die Liste ist nicht abgeschlossen. Die Kommission prüft jährlich, ob Artikel 5 geändert werden muss, und der Gesetzgeber hat 2026 zwei Verbote ergänzt. Wer berät, prüft deshalb bei jedem Vorhaben den aktuellen Stand; dieser Text gibt den vom September 2026 wieder.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibus, Q.komVerbote, Q.komAiAct],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'hochrisiko',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Hochriskant wird ein KI-System auf zwei Wegen. Der erste führt über Produkte: Ist es Sicherheitsbauteil eines Produkts, das unter eine Harmonisierungsvorschrift in Anhang I fällt, etwa für Spielzeug, Aufzüge oder Medizinprodukte, oder selbst ein solches Produkt, und muss das Produkt von Dritten geprüft werden, ist es hochriskant (Art. 6 Abs. 1). Der zweite führt über den Einsatzzweck in Anhang III (Art. 6 Abs. 2). Die acht Bereiche sind Biometrie; kritische Infrastruktur, wenn KI als Sicherheitsbauteil in digitaler Infrastruktur, Straßenverkehr oder Wasser-, Gas-, Wärme- und Stromversorgung dient; Bildung, etwa Zulassung und Bewertung von Lernergebnissen; Beschäftigung, von gezielten Stellenanzeigen über das Filtern von Bewerbungen bis zu Beförderung, Kündigung und Leistungsüberwachung; grundlegende Dienste wie Sozialleistungen, Kreditwürdigkeitsprüfung natürlicher Personen außer zur Betrugserkennung und Preisbildung in Lebens- und Krankenversicherungen; Strafverfolgung; Migration, Asyl und Grenzkontrolle; Rechtspflege und demokratische Prozesse. Ohne erhebliches Risiko, etwa bei eng gefassten Verfahrensaufgaben, greift eine Ausnahme, bei Profiling natürlicher Personen nie (Art. 6 Abs. 3).',
        ],
      },
      {
        titel: 'Was Anbieter und Betreiber tun müssen',
        absaetze: [
          'Den größten Teil trägt der Anbieter. Er erfüllt die Anforderungen der Artikel 9 bis 15: ein Risikomanagementsystem über den gesamten Lebenszyklus, Daten-Governance für Trainings-, Validierungs- und Testdaten, technische Dokumentation, automatische Protokollierung, Transparenz und Informationen für Betreiber, menschliche Aufsicht sowie Genauigkeit, Robustheit und Cybersicherheit. Nach Artikel 16 kommen ein Qualitätsmanagementsystem, die Konformitätsbewertung vor dem Inverkehrbringen, die EU-Konformitätserklärung, die CE-Kennzeichnung und die Registrierung in der EU-Datenbank hinzu. Menschliche Aufsicht heißt nach Artikel 14, dass die Aufsichtsperson die Grenzen des Systems versteht, sich des Automatisierungsbias (automation bias) bewusst bleibt, Ausgaben verwerfen und das System anhalten kann. Seit der Änderung von 2026 dürfen kleine und mittlere Unternehmen und kleine Midcap-Unternehmen die technische Dokumentation vereinfacht mit einem Formular der Kommission liefern.',
          'Der Betreiber hat eigene Pflichten (Art. 26): das System nach Betriebsanleitung verwenden, die Aufsicht Personen mit Kompetenz, Ausbildung und Befugnis übertragen, für repräsentative Eingabedaten sorgen, soweit er sie kontrolliert, den Betrieb überwachen und die automatisch erzeugten Protokolle mindestens sechs Monate aufbewahren. Vor dem Einsatz am Arbeitsplatz informiert ein Arbeitgeber die Arbeitnehmervertretung und die Betroffenen. Öffentliche Stellen, private Erbringer öffentlicher Dienste sowie Betreiber von Systemen zur Kreditwürdigkeitsprüfung und zur Preisbildung in Lebens- und Krankenversicherungen führen vorher eine Grundrechte-Folgenabschätzung durch (Art. 27) und dürfen dabei seit 2026 auf ihre Datenschutz-Folgenabschätzung verweisen.',
        ],
      },
      {
        titel: 'Fristen, Stand September 2026',
        absaetze: [
          'Ursprünglich sollten die Pflichten für Anhang III ab dem 2. August 2026 gelten. Die Verordnung (EU) 2026/1744, in Kraft seit dem 27. Juli 2026, hat Einstufungsregeln, Anforderungen und Pflichten (Kapitel III Abschnitte 1 bis 3) verschoben: für Anhang III auf den 2. Dezember 2027, für Anhang I auf den 2. August 2028. Am 2. August 2026 haben sie also nicht begonnen. Systeme, die vor dem Geltungsbeginn von Kapitel III in Verkehr gebracht oder in Betrieb genommen wurden, erfasst die Verordnung nur, wenn sie danach in ihrer Konzeption erheblich verändert werden; Systeme für Behörden müssen bis zum 2. August 2030 nachgerüstet sein. Die Leitlinien der Kommission zur Einstufung, fällig bis zum 2. Februar 2026, liegen nur als Entwurf vom 19. Mai 2026 vor.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Personaldienstleister mit 120 Beschäftigten will 2027 ein Werkzeug einführen, das Bewerbungen vorsortiert und bewertet. Die Beraterin ordnet es Anhang III Nummer 4 zu; weil es persönliche Merkmale der Bewerber automatisiert bewertet, also Profiling betreibt, scheidet die Ausnahme aus. Der Dienstleister ist Betreiber, der Softwarehersteller Anbieter. Sie plant rückwärts vom 2. Dezember 2027: Vom Hersteller verlangt sie Betriebsanleitung, Angaben zu Daten und Grenzen und die Zusage, Konformitätsbewertung und CE-Kennzeichnung rechtzeitig vorzulegen. Im eigenen Haus benennt sie Recruiterinnen mit Schulung, Zeit und der Befugnis, vom Vorschlag abzuweichen, regelt die Aufbewahrung der Protokolle und holt den Betriebsrat vor dem Start an den Tisch. Die Datenschutz-Folgenabschätzung wartet nicht auf 2027, denn die Datenschutz-Grundverordnung gilt unabhängig vom AI Act.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Hochrisiko-Pflichten beschreiben Verfahren, keine Ergebnisse. Eine bestandene Konformitätsbewertung belegt, dass Risikomanagement, Datenprüfung und Dokumentation stattgefunden haben, nicht, dass das System fair entscheidet. Für die Bereiche 2 bis 8 des Anhangs III bewertet der Anbieter die Konformität zudem selbst, ohne notifizierte Stelle (Art. 43 Abs. 2). Die Verschiebung begründet der Gesetzgeber damit, dass Normen und nationale Strukturen später kamen als geplant; ohne harmonisierte Normen fehlen Anbietern die technischen Lösungen, auf die sie sich stützen könnten. Die menschliche Aufsicht kann zum bloßen Abnicken werden; Artikel 14 verlangt deshalb ausdrücklich, dass die Aufsichtsperson sich des Automatisierungsbias bewusst bleibt. Und der Bestandsschutz bedeutet, dass ältere Werkzeuge ohne erhebliche Änderung außerhalb der Pflichten bleiben können, außer wenn Behörden sie einsetzen.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibus, Q.komHochrisiko],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'transparenz',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Artikel 50 ist eine eigene Schicht neben den Risikostufen. Er gilt für bestimmte KI-Systeme unabhängig davon, ob sie hochriskant sind, und lässt die Hochrisiko-Pflichten unberührt (Abs. 6). Der Grund: Wer weiß, dass eine Maschine antwortet oder eine Stimme erzeugt ist, richtet sein Vertrauen danach aus; die Kommission nennt als Ziel, Täuschung und Manipulation vorzubeugen. Die Pflichten treffen je nach Fall den Anbieter, der das System entwickelt, oder den Betreiber, der es einsetzt. Sie gelten seit dem 2. August 2026, dem allgemeinen Geltungsbeginn der Verordnung. Die Änderungsverordnung (EU) 2026/1744 hat diesen Termin nicht verschoben und in Artikel 50 nur Absatz 7 zu den Praxisleitfäden neu gefasst. Sie gewährt eine Übergangsfrist: Anbieter von Systemen, die synthetische Inhalte erzeugen und vor dem 2. August 2026 in Verkehr gebracht wurden, müssen die Kennzeichnung nach Absatz 2 bis zum 2. Dezember 2026 umsetzen (Art. 111 Abs. 4).',
        ],
      },
      {
        titel: 'Die vier Pflichten',
        absaetze: [
          'Erstens sorgen Anbieter dafür, dass Systeme für die direkte Interaktion mit Menschen, etwa Chatbots, diese darüber informieren, dass sie mit einem KI-System interagieren, es sei denn, das ist für eine angemessen informierte, aufmerksame und verständige Person offensichtlich. Zweitens kennzeichnen Anbieter von Systemen, die synthetische Audio-, Bild-, Video- oder Textinhalte erzeugen, die Ausgaben in maschinenlesbarem Format als künstlich erzeugt oder manipuliert, mit technischen Lösungen, die soweit technisch möglich wirksam, interoperabel, belastbar und zuverlässig sind; ausgenommen sind unterstützende Standardbearbeitungen. Drittens informieren Betreiber von Emotionserkennung oder biometrischer Kategorisierung die betroffenen Personen.',
          'Viertens legen Betreiber offen, dass Deepfakes künstlich erzeugt oder manipuliert sind. Ein Deepfake ist nach Artikel 3 Nummer 60 ein KI-erzeugter Bild-, Ton- oder Videoinhalt, der wirklichen Personen, Gegenständen, Orten oder Ereignissen ähnelt und fälschlich als echt erscheinen würde. Bei offensichtlich künstlerischen, satirischen oder fiktionalen Werken genügt ein Hinweis, der den Genuss nicht stört. Auch KI-erzeugte Texte, die veröffentlicht werden, um die Öffentlichkeit über Angelegenheiten von öffentlichem Interesse zu informieren, sind offenzulegen, außer sie wurden von Menschen geprüft und jemand trägt die redaktionelle Verantwortung. Die Information kommt spätestens bei der ersten Interaktion oder wenn die Person dem Inhalt zum ersten Mal ausgesetzt ist, klar, eindeutig und barrierefrei (Abs. 5). Verstöße können bis zu 15 Millionen Euro oder 3 Prozent des weltweiten Jahresumsatzes kosten, je nachdem, welcher Betrag höher ist (Art. 99 Abs. 4).',
        ],
      },
      {
        titel: 'Leitlinien und Verhaltenskodex',
        absaetze: [
          'Am 20. Juli 2026, knapp zwei Wochen vor dem Geltungsbeginn, hat die Kommission Leitlinien zu Artikel 50 veröffentlicht. Schon am 10. Juni 2026 erschien der endgültige Verhaltenskodex zur Transparenz KI-erzeugter Inhalte (Code of Practice on Transparency of AI-generated Content). Er hat einen Teil für Anbieter, zur Markierung und Erkennung KI-erzeugter Inhalte, und einen für Betreiber, zur Kennzeichnung von Deepfakes und Texten. Kommission und KI-Gremium haben bestätigt, dass er ein geeignetes freiwilliges Werkzeug ist, um die Einhaltung nachzuweisen; ergänzend gibt es EU-Symbole, mit denen Betreiber KI-erzeugte Inhalte kennzeichnen können. Die Kommission betont zugleich: Die Teilnahme am Kodex ist freiwillig, die Pflichten aus Artikel 50 sind es nicht.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Onlinehändler mit 60 Beschäftigten setzt einen zugekauften Chatbot ein und lässt Produktfotos und Werbevideos mit KI erzeugen. Die Beraterin trennt die Rollen. Die Interaktionspflicht trifft den Hersteller des Chatbots; der Händler prüft als Betreiber, ob der Hinweis zu Beginn im Chatfenster steht, nicht in den Geschäftsbedingungen. Die maschinenlesbare Markierung der Bilder ist Sache des Bildgenerator-Anbieters; der Händler fragt, ob dessen Werkzeug markiert. Heikel sind die fotorealistischen Bilder selbst: Weil ein Deepfake auch Gegenstände zeigen kann, die echt wirken, prüft die Beraterin, ob ein Produktfoto fälschlich als echte Aufnahme erscheint. Ein Werbevideo mit einer erzeugten, täuschend echten Kundin prüft sie besonders streng und empfiehlt, es offenzulegen, sichtbar und etwa mit den EU-Symbolen. Sie erinnert daran, dass Artikel 50 andere Transparenzpflichten aus Unions- und nationalem Recht unberührt lässt: Ob eine erfundene Kundenstimme als Werbung zulässig ist, entscheidet nicht der AI Act.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Der erste Fehler ist, Kennzeichnung nur bei Hochrisiko-Systemen zu erwarten; Artikel 50 gilt gerade für gewöhnliche Chatbots und Generatoren. Der zweite ist der Hinweis in den Geschäftsbedingungen: Die Person im Gespräch muss es spätestens bei der ersten Interaktion erfahren. Der dritte ist, Deepfakes für ein Gesichterproblem zu halten, obwohl die Definition Gegenstände, Orte und Ereignisse einschließt. Der vierte ist die Verwechslung der Rollen: Die Markierung schuldet der Anbieter, die Offenlegung von Deepfakes der Betreiber; wer beides einkauft, prüft beides. Der fünfte ist die Überreaktion, KI im Kundenkontakt ganz zu streichen, weil ein Hinweis nötig ist. Grenzen hat auch die Technik: Maschinenlesbare Markierungen verlangt das Gesetz nur, soweit technisch möglich. Und weil die Leitlinien erst kurz vor dem Stichtag erschienen sind, wird sich erst zeigen, wie die Behörden sie anwenden.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibus, Q.komArt50Leitlinien, Q.komArt50Kodex],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'gpai',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein KI-Modell mit allgemeinem Verwendungszweck (general-purpose AI model) ist nach Artikel 3 Nummer 63 ein Modell mit erheblicher allgemeiner Verwendbarkeit, das ein breites Spektrum unterschiedlicher Aufgaben kompetent erfüllen und in viele nachgelagerte Systeme integriert werden kann, etwa ein Modell, das mit einer großen Datenmenge unter umfassender Selbstüberwachung trainiert wurde. Das Modell ist Baustein, nicht Produkt: Der Chatbot, der darauf aufsetzt, ist ein KI-System mit eigenen Pflichten. Der AI Act regelt deshalb die Modellanbieter in einem eigenen Kapitel, unabhängig vom späteren Einsatz. Diese Pflichten gelten seit dem 2. August 2025; Modelle, die vorher in Verkehr kamen, müssen sie bis zum 2. August 2027 erfüllen (Art. 111 Abs. 3). Seit dem 2. August 2026 kann die Kommission sie durchsetzen, auch mit Geldbußen. Die Aufsicht liegt allein bei ihr; ausgeführt wird sie von ihrem Büro für Künstliche Intelligenz (AI Office, Art. 88).',
        ],
      },
      {
        titel: 'Pflichten aller Anbieter',
        absaetze: [
          'Nach Artikel 53 erstellen Anbieter eine technische Dokumentation des Modells mit Trainings- und Testverfahren und Bewertungsergebnissen (Anhang XI) für das Büro für Künstliche Intelligenz und die nationalen Behörden. Sie geben nachgelagerten Anbietern, die das Modell in ihre Systeme einbauen, Informationen zu Fähigkeiten und Grenzen (Anhang XII). Sie legen eine Strategie zur Einhaltung des Urheberrechts fest, die Nutzungsvorbehalte nach Artikel 4 Absatz 3 der Richtlinie (EU) 2019/790, also maschinenlesbare Widersprüche gegen Text und Data Mining (opt-out), auch mit modernsten Technologien erkennt und beachtet. Und sie veröffentlichen eine hinreichend detaillierte Zusammenfassung der Trainingsinhalte nach einer Vorlage des Büros. Für quelloffene Modelle mit öffentlich zugänglichen Gewichten entfallen die beiden Dokumentationspflichten, nicht aber Urheberrechtsstrategie und Zusammenfassung, und bei systemischem Risiko gar nichts. Anbieter aus Drittländern benennen einen Bevollmächtigten in der Union (Art. 54).',
          'Wie das praktisch geht, beschreibt der Verhaltenskodex für KI mit allgemeinem Verwendungszweck (General-Purpose AI Code of Practice), veröffentlicht am 10. Juli 2025. Er ist freiwillig und hat drei Kapitel: Transparenz, mit einem Formular zur Modelldokumentation, Urheberrecht sowie Sicherheit und Gefahrenabwehr (safety and security), Letzteres nur für Modelle mit systemischem Risiko. Kommission und KI-Gremium haben ihn als geeignetes Mittel bestätigt; bis es harmonisierte Normen gibt, können sich Anbieter darauf stützen, sonst müssen sie andere geeignete Wege nachweisen (Art. 53 Abs. 4).',
        ],
      },
      {
        titel: 'Systemisches Risiko',
        absaetze: [
          'Ein Modell hat systemisches Risiko, wenn es Fähigkeiten mit hoher Wirkkraft hat oder die Kommission es nach den Kriterien in Anhang XIII so einstuft (Art. 51 Abs. 1). Hohe Wirkkraft wird vermutet, wenn für das Training kumuliert mehr als 10 hoch 25 Gleitkommaoperationen (FLOP) aufgewendet wurden (Art. 51 Abs. 2); die Kommission kann diese Schwelle per delegiertem Rechtsakt anpassen. Der Anbieter teilt das der Kommission unverzüglich mit, spätestens zwei Wochen, nachdem die Schwelle erreicht ist oder feststeht, dass sie erreicht wird, und kann begründen, warum sein Modell ausnahmsweise kein systemisches Risiko birgt (Art. 52). Dann gilt zusätzlich Artikel 55: Modellbewertung nach dem Stand der Technik mit dokumentierten Angriffstests (adversarial testing), Bewertung und Minderung systemischer Risiken auf Unionsebene, unverzügliche Meldung schwerwiegender Vorfälle an das Büro für Künstliche Intelligenz und angemessene Cybersicherheit für Modell und Infrastruktur. Bei vorsätzlichen oder fahrlässigen Verstößen kann die Kommission gegen Modellanbieter Geldbußen bis zu 3 Prozent des weltweiten Jahresumsatzes oder 15 Millionen Euro verhängen, je nachdem, welcher Betrag höher ist (Art. 101).',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Softwarehaus mit 40 Beschäftigten baut auf das Basismodell eines großen Anbieters einen Assistenten für Steuerkanzleien. Die Geschäftsführung fürchtet die GPAI-Pflichten. Die Beraterin ordnet ein: Das Softwarehaus ist Anbieter eines KI-Systems, nicht des Modells. Die Modellpflichten trägt der Hersteller des Basismodells. Nach Artikel 53 muss er dem Softwarehaus Informationen zu Fähigkeiten und Grenzen bereitstellen; die Beraterin fordert sie an und prüft vor dem Einkauf auch die Urheberrechtsstrategie und die Zusammenfassung der Trainingsinhalte. Für das eigene Nachtrainieren mit Kanzleidaten gilt nach den Leitlinien der Kommission: Nur wer ein Modell erheblich verändert, wird selbst zum Anbieter eines GPAI-Modells, nicht wer kleine Anpassungen vornimmt. Für den Assistenten selbst prüft die Beraterin die Transparenzpflicht, weil Menschen mit ihm chatten.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Rechenschwelle ist ein Hilfsmaß für Fähigkeiten, nicht die Fähigkeit selbst. Das Gesetz rechnet damit, dass algorithmische Verbesserungen und effizientere Hardware sie überholen, und erlaubt der Kommission, Schwellen, Benchmarks und Indikatoren anzupassen. Die Zusammenfassung der Trainingsinhalte soll hinreichend detailliert sein und zugleich Geschäftsgeheimnisse achten; wie viel Detail genügt, klärt erst die Praxis. Der Kodex ist freiwillig, wer ihm nicht folgt, muss andere geeignete Wege aufzeigen, die die Kommission bewertet. Für nachgelagerte Anbieter bleibt eine Abhängigkeit: Sie können ihre eigenen Pflichten nur so gut erfüllen, wie die Informationen des Modellanbieters reichen. Und weil die Kommission erst seit August 2026 durchsetzen kann, kann es eine gefestigte Aufsichtspraxis noch nicht geben.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.komGpaiKodex, Q.komGpaiLeitlinien],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'bussgeld',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Artikel 99 verpflichtet die Mitgliedstaaten, Sanktionen für Verstöße festzulegen. Zu diesen können Verwarnungen und nichtmonetäre Maßnahmen gehören, und seit der Neufassung von Absatz 1 durch die Verordnung (EU) 2026/1744 nennt er ausdrücklich auch Geldbußen, für jeden Verstoß. Die Sanktionen müssen wirksam, verhältnismäßig und abschreckend sein; die Mitgliedstaaten berücksichtigen die Interessen und das wirtschaftliche Überleben kleiner und mittlerer Unternehmen (KMU), einschließlich Start-ups, und seit 2026 auch kleiner Midcap-Unternehmen. Für Geldbußen gibt der Artikel drei Obergrenzen vor. Wer gegen ein Verbot nach Artikel 5 verstößt, riskiert bis zu 35 Millionen Euro oder, bei Unternehmen, bis zu 7 Prozent des gesamten weltweiten Jahresumsatzes des vorangegangenen Geschäftsjahres, je nachdem, welcher Betrag höher ist (Abs. 3).',
          'Bis zu 15 Millionen Euro oder 3 Prozent drohen bei Verstößen gegen die Pflichten von Anbietern, Bevollmächtigten, Einführern, Händlern und Betreibern, gegen die 2026 ergänzten Pflichten entlang der KI-Wertschöpfungskette nach Artikel 25 Absätze 2 und 4, gegen Pflichten notifizierter Stellen und gegen die Transparenzpflichten nach Artikel 50 (Abs. 4). Bis zu 7,5 Millionen Euro oder 1 Prozent drohen, wenn notifizierten Stellen oder zuständigen Behörden auf Anfrage falsche, unvollständige oder irreführende Auskünfte gegeben werden (Abs. 5). Das sind Höchstbeträge, keine Tarife.',
        ],
      },
      {
        titel: 'KMU, kleine Midcaps und die Bemessung',
        absaetze: [
          'Für KMU einschließlich Start-ups kehrt Absatz 6 die Regel um: Für jede Geldbuße gilt der niedrigere der beiden Werte. Neu ist Absatz 6a: Auch für kleine Midcap-Unternehmen gilt der niedrigere Wert, aber nur bei den Stufen der Absätze 4 und 5, nicht bei Verstößen gegen die Verbote. Was ein kleines Midcap-Unternehmen ist, bestimmt eine Empfehlung der Kommission aus dem Jahr 2025. Innerhalb der Obergrenzen zählen nach Absatz 7 alle Umstände des Einzelfalls: Art, Schwere und Dauer des Verstoßes, Zahl der Betroffenen und Schaden, Größe und Marktanteil, erlangte Vorteile, Zusammenarbeit mit den Behörden, Grad der Verantwortung, wie der Verstoß bekannt wurde, etwa durch eigene Meldung, Vorsatz oder Fahrlässigkeit und Maßnahmen zur Schadensminderung. Auch Geldbußen anderer Behörden für dieselbe Handlung werden berücksichtigt. Ob Behörden selbst Bußgelder zahlen, regeln die Mitgliedstaaten (Abs. 8).',
        ],
      },
      {
        titel: 'Wer durchsetzt und seit wann',
        absaetze: [
          'Die Sanktionsvorschriften gelten seit dem 2. August 2025. Eine Ausnahme ist Artikel 101, der seit dem 2. August 2026 gilt: Die Kommission kann gegen Anbieter von KI-Modellen mit allgemeinem Verwendungszweck Geldbußen bis zu 3 Prozent des weltweiten Jahresumsatzes oder 15 Millionen Euro verhängen, je nachdem, welcher Betrag höher ist. Seit 2026 kann ihr Büro für Künstliche Intelligenz außerdem für KI-Systeme, die auf einem Modell desselben Anbieters beruhen, sowie für Systeme sehr großer Online-Plattformen und Suchmaschinen Geldbußen nach Artikel 99 verhängen (Art. 75c). In Deutschland ist am 29. Juli 2026 das KI-Marktüberwachungs- und Innovationsförderungsgesetz (KI-MIG) in Kraft getreten; die Bundesnetzagentur ist damit Marktüberwachungsbehörde, Anlauf- und Beschwerdestelle, etwa für KI im Personalmanagement, in kritischer Infrastruktur und in der Bildung. In Bereichen wie Finanzen und Medien bleiben die bisherigen Fachaufsichten zuständig, etwa die BaFin.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Softwarehaus, das die KMU-Kriterien erfüllt, hält den AI Act für einen Papiertiger. Die Beraterin rechnet mit einem angenommenen Jahresumsatz von 20 Millionen Euro. Verstößt das Unternehmen gegen eine Transparenzpflicht, liegen 3 Prozent bei 600.000 Euro; weil für KMU der niedrigere Wert gilt, ist das die Obergrenze, nicht 15 Millionen. Bei einer verbotenen Praktik wären es 7 Prozent, also 1,4 Millionen Euro. Für einen Konzern mit angenommenen 10 Milliarden Euro Umsatz läge die Grenze dagegen bei 700 Millionen Euro, weil dort der höhere Wert zählt. Die Beraterin zeigt auch, was die Höhe senkt: früh melden, mit der Behörde zusammenarbeiten, den Schaden begrenzen. Und sie warnt vor dem Mauern: Falsche Auskünfte sind ein eigener Bußgeldtatbestand.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die großen Zahlen sind Obergrenzen. Wie hoch Bußgelder tatsächlich ausfallen, entscheidet die Bemessung im Einzelfall, und eine gefestigte Praxis muss sich erst bilden. Die Verfahren unterscheiden sich zudem: Je nach Rechtssystem verhängen Gerichte oder andere Stellen die Geldbußen (Abs. 9). Für Organe und Stellen der EU gelten eigene, deutlich niedrigere Obergrenzen, über die der Europäische Datenschutzbeauftragte entscheidet (Art. 100). Wer Sanktionen nur als Geldbuße denkt, übersieht Verwarnungen und nichtmonetäre Maßnahmen, die Absatz 1 ausdrücklich vorsieht. Und der AI Act ist nicht das einzige Risiko: Dieselbe Handlung kann auch nach anderem Recht geahndet werden, etwa nach dem Datenschutzrecht.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibus, Q.bnetza],
  },
];
