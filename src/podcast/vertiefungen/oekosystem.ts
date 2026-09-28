import type { Quelle } from '../../inhalt/typen';
import type { Vertiefung } from '.';

// Vertiefungen: datensouveraenitaet, aleph-alpha, oekosystem-de, branchen-praxis. Alle Quellen am 2026-09-28 abgerufen und geprüft.
const AB = '2026-09-28';
const Q = {
  // Datensouveränität
  cloudAct: {
    titel: 'U.S. Department of Justice — Full Text of the CLOUD Act: Clarifying Lawful Overseas Use of Data Act, Division V (2018)',
    url: 'https://www.justice.gov/criminal/media/999391/dl?inline',
    abgerufen: AB,
  } satisfies Quelle,
  bsiC5_2026: {
    titel: 'BSI — Kriterienkatalog C5:2026 (Bundesamt für Sicherheit in der Informationstechnik, 2026)',
    url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5_2025/C5_2025_node.html',
    abgerufen: AB,
  } satisfies Quelle,
  bsiC5Faq: {
    titel: 'BSI — C5 FAQ: Kriterienkatalog, Testat und Übergangsfristen (Bundesamt für Sicherheit in der Informationstechnik, 2026)',
    url: 'https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5-FAQ/kriterienkatalog-c5-faq_node.html',
    abgerufen: AB,
  } satisfies Quelle,
  gaiaxAbout: {
    titel: 'Gaia-X European Association for Data and Cloud — About Gaia-X: What We Do (gaia-x.eu, o. J.)',
    url: 'https://gaia-x.eu/about/',
    abgerufen: AB,
  } satisfies Quelle,
  gaiaxCompliance: {
    titel: 'Gaia-X European Association for Data and Cloud — Gaia-X Compliance Document: Compliance for Cloud Services, Abschnitt European Control (Release 4.0.0, 2026)',
    url: 'https://docs.gaia-x.eu/policy-rules-committee/compliance-document/latest/criteria_cloud_services/',
    abgerufen: AB,
  } satisfies Quelle,
  // Aleph Alpha
  cohereAlephVertrag: {
    titel: 'Cohere & Aleph Alpha — Cohere and Aleph Alpha Sign Agreement to Become the First Transatlantic Sovereign AI Solution (PR Newswire, 16.09.2026)',
    url: 'https://www.prnewswire.com/news-releases/cohere-and-aleph-alpha-sign-agreement-to-become-the-first-transatlantic-sovereign-ai-solution-302880758.html',
    abgerufen: AB,
  } satisfies Quelle,
  cohereAlephApril: {
    titel: 'Cohere — Cohere and Aleph Alpha Join Forces (Cohere Blog, 24.04.2026)',
    url: 'https://cohere.com/blog/cohere-alephalpha-join-forces',
    abgerufen: AB,
  } satisfies Quelle,
  handelsblattCohere: {
    titel: 'Bomke, Holzki & Fokuhl — KI: Aleph Alpha und Cohere wollen „echter Konkurrent“ von OpenAI werden (Handelsblatt, 16.09.2026)',
    url: 'https://www.handelsblatt.com/technik/ki/ki-aleph-alpha-und-cohere-wollen-echter-konkurrent-von-openai-werden/100254362.html',
    abgerufen: AB,
  } satisfies Quelle,
  heiseAndrulis: {
    titel: 'Zimmermann — Upheaval at Aleph Alpha: Founder Leaves, Schwarz Group Moves Up (heise online, 11.10.2025)',
    url: 'https://www.heise.de/en/news/Upheaval-at-Aleph-Alpha-Founder-leaves-Schwarz-Group-moves-up-10750654.html',
    abgerufen: AB,
  } satisfies Quelle,
  phariaRelease: {
    titel: 'Aleph Alpha — PhariaAI v1.260600.0, Release Notes (Aleph Alpha Documentation, 2026)',
    url: 'https://docs.aleph-alpha.com/phariaai-home/latest/release-notes/pharia-ai/1.260600.0.html',
    abgerufen: AB,
  } satisfies Quelle,
  // Deutsches KI-Ökosystem
  sapJoule: {
    titel: 'SAP — SAP Announces New Generative AI Assistant Joule, Pressemitteilung (SAP News Center, 26.09.2023)',
    url: 'https://news.sap.com/2023/09/joule-new-generative-ai-assistant/',
    abgerufen: AB,
  } satisfies Quelle,
  dfkiProfil: {
    titel: 'DFKI — Unternehmensprofil (Deutsches Forschungszentrum für Künstliche Intelligenz, Februar 2024)',
    url: 'https://www.hannovermesse.de/apollo/hannover_messe_2024/obs/Binary/A1354679/20240219_DFKI_Unternehmensprofil.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  bitkom2026: {
    titel: 'Bitkom — Erstmals nutzt die Mehrheit der Unternehmen KI, Presseinformation (Bitkom, 14.09.2026)',
    url: 'https://www.bitkom.org/Presse/Presseinformation/Erstmals-nutzt-Mehrheit-Unternehmen-KI',
    abgerufen: AB,
  } satisfies Quelle,
  // Branchenpraxis
  zfkEon: {
    titel: 'ZFK-Redaktion — Künstliche Intelligenz spürt Fehlerquellen im Stromnetz auf (Zeitung für kommunale Wirtschaft, 24.05.2018)',
    url: 'https://www.zfk.de/energie/strom/kuenstliche-intelligenz-spuert-fehlerquellen-im-stromnetz-auf',
    abgerufen: AB,
  } satisfies Quelle,
  telekomFragMagenta: {
    titel: 'Deutsche Telekom — Unser Chatbot hilft rund um die Uhr (telekom.com, 22.09.2025)',
    url: 'https://www.telekom.com/de/newsroom/themen-hubs/kundenservice/unser-chatbot-hilft-rund-um-die-uhr',
    abgerufen: AB,
  } satisfies Quelle,
  siemensCopilot: {
    titel: 'Siemens — Siemens and Microsoft Scale Industrial AI, Pressemitteilung (Siemens AG, 24.10.2024)',
    url: 'https://press.siemens.com/global/en/pressrelease/siemens-and-microsoft-scale-industrial-ai',
    abgerufen: AB,
  } satisfies Quelle,
  stmF13: {
    titel: 'Staatsministerium Baden-Württemberg — KI-Assistenz F13 wird zur Open-Source-Software, Pressemitteilung (23.07.2025)',
    url: 'https://stm.baden-wuerttemberg.de/de/service/presse/pressemitteilung/pid/ki-assistenz-f13-wird-zur-open-source-software',
    abgerufen: AB,
  } satisfies Quelle,
  kommissionAiAct: {
    titel: 'Europäische Kommission — AI Act: Regulatory Framework on AI (Shaping Europe’s Digital Future, 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    abgerufen: AB,
  } satisfies Quelle,
};

export const oekosystem: Vertiefung[] = [
  {
    id: 'datensouveraenitaet',
    abschnitte: [
      {
        titel: 'Wo die Daten liegen und wer an sie herankommt',
        absaetze: [
          'Datenlokalität (data residency) beschreibt, wo Daten gespeichert und verarbeitet werden. Datensouveränität (data sovereignty) fragt weiter: Wer kann rechtlich erzwingen, dass Daten herausgegeben werden, und welches Recht regiert die Systeme, in denen sie liegen? Beide Fragen fallen auseinander, sobald ein Anbieter einem anderen Rechtsraum unterliegt als sein Rechenzentrum. Deutlich wird das am US-amerikanischen Clarifying Lawful Overseas Use of Data Act, kurz CLOUD Act, von 2018. Er verpflichtet Anbieter elektronischer Kommunikationsdienste und entfernter Rechendienste (remote computing service), ihren gesetzlichen Pflichten zur Sicherung und Herausgabe von Inhalten und Kundendaten nachzukommen, die sich in ihrem Besitz, ihrer Obhut oder unter ihrer Kontrolle befinden (possession, custody, or control), und zwar unabhängig davon, ob die Daten innerhalb oder außerhalb der Vereinigten Staaten liegen.',
          'Der Anknüpfungspunkt ist also das Unternehmen, nicht der Server. In seinen einleitenden Feststellungen nennt das Gesetz als Problem gerade Daten, die außerhalb der USA gespeichert sind, aber bei Anbietern liegen, die der Gerichtsbarkeit der Vereinigten Staaten unterliegen. Ein Rechenzentrum in Frankfurt ändert daran nichts, wenn der Anbieter dieser Gerichtsbarkeit unterliegt und die Daten unter seiner Kontrolle stehen. Souveränität hängt deshalb an mehreren Schichten: an der Rechtsnatur des Anbieters, am Betreibermodell, also daran, wer die Systeme verwaltet und wer die Schlüssel hält, und an der Portabilität, der Fähigkeit, den Anbieter mit vertretbarem Aufwand zu wechseln. Verschlüsselung schützt nur so weit, wie die Schlüssel außerhalb der Reichweite des Anbieters liegen; Metadaten wie Zeitpunkte und Datenmengen fallen trotzdem bei ihm an.',
        ],
      },
      {
        titel: 'BSI C5: geprüfte Sicherheit',
        absaetze: [
          'Der Kriterienkatalog C5 (Cloud Computing Compliance Criteria Catalogue) des Bundesamts für Sicherheit in der Informationstechnik (BSI) beschreibt seit 2016 Mindestanforderungen an sicheres Cloud Computing. Ob ein Anbieter sie erfüllt, prüfen Wirtschaftsprüfer nach dem Prüfstandard ISAE 3000; das Ergebnis ist ein Testat mit Prüfbericht, das Kunden beim Anbieter anfordern und selbst auswerten. Grundsätzlich hat der Katalog empfehlenden Charakter, andere Regeln machen ihn aber verbindlich: Stellen des Bundes müssen nach dem Mindeststandard des BSI zur Nutzung externer Cloud-Dienste Nachweise über die C5-Kriterien einfordern, und für Cloud-Dienste im Gesundheitswesen verlangt § 393 SGB V ein C5-Testat oder ein vergleichbares Testat oder Zertifikat.',
          'Auf die Fassung C5:2020 mit 121 Kriterien folgt der C5:2026, den das BSI seit Ende März 2026 als finale Version veröffentlicht. Er umfasst 168 Kriterien in 17 Themengebieten und ist für Testate ab dem 1. Juni 2027 anzuwenden, freiwillig schon früher. Ausführlicher als bisher behandelt er die Mandantentrennung und die technische Umsetzung von Souveränität; zum Katalog gehören außerdem Transparenzkriterien, etwa zum Umgang mit Ermittlungsanfragen. Ein Testat gilt aber immer nur für die geprüften Dienste in den festgelegten Regionen, nicht für den Anbieter als Ganzes, und das BSI betont, dass es keine alleinige Garantie für sichere Cloud-Nutzung ist. C5 belegt geprüfte Betriebssicherheit und macht Zugriffsrisiken sichtbar; eine Herausgabepflicht nach fremdem Recht beseitigt er nicht.',
        ],
      },
      {
        titel: 'Gaia-X: gemeinsame Regeln, abgestufte Labels',
        absaetze: [
          'Gaia-X ist eine europäische Initiative, getragen von der Gaia-X European Association for Data and Cloud mit Sitz in Brüssel. Nach eigener Beschreibung entsteht dabei keine Cloud, sondern ein föderiertes System, das viele Cloud-Anbieter und Nutzer in einer transparenten Umgebung verbindet und den Nutzern die Kontrolle über ihre Daten zurückgeben soll; dazu gehören Interoperabilität und die Möglichkeit, den Anbieter zu wechseln, statt an einen gebunden zu sein (vendor lock-in). Das Regelwerk dafür ist das Compliance Document. Es unterscheidet eine Standard-Konformität (Standard Compliance) und darüber drei Labels mit zusätzlichen Kriterien. Erst die oberste Stufe beantwortet die Frage nach fremdem Rechtszugriff: Für Label Level 3 müssen Kundendaten ausschließlich in EU oder EWR verarbeitet werden, Sitz und Hauptniederlassung des Anbieters dort liegen, Anteilseigner von außerhalb dürfen ihn nicht kontrollieren, und für außereuropäische Herausgabeanordnungen braucht er geprüfte Schutzvorkehrungen. Die Teilnahme an Gaia-X allein belegt also keinen Schutz vor ausländischem Rechtszugriff.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Stadtwerk mit 300 Beschäftigten will einen KI-Assistenten einführen, der Antwortschreiben an Kunden entwirft, und hat dafür die EU-Region eines großen US-Cloud-Anbieters gebucht. Die Beraterin trennt zuerst die Daten: Allgemeine Tarifinformationen sind unkritisch, Vertrags- und Verbrauchsdaten der Kunden sind personenbezogen. Für jede Klasse stellt sie dieselben vier Fragen. Welches Recht bindet die Einheit, die den Dienst kontrolliert? Wer hält die Schlüssel? Liegt für genau diesen Dienst in genau dieser Region ein C5-Testat vor, und nach welcher Fassung? Wie sähe ein Wechsel aus, und ist er vertraglich und technisch vorbereitet? Heraus kommt kein Ja oder Nein, sondern ein abgestuftes Modell: Die Tarifauskunft darf beim großen Anbieter bleiben, die Kundendaten wandern in einen Betrieb unter europäischer Kontrolle mit eigenem Schlüsselmanagement, und für die nächste Ausschreibung liegt je Datenklasse ein Nachweis vor statt eines Hinweises auf die EU-Region.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Souveränität hat einen Preis. Ob ein europäisch kontrolliertes Angebot die benötigten Dienste und Modelle bereitstellt, muss im Einzelfall geprüft werden, und eigenes Schlüsselmanagement verlangt Personal, das es betreiben kann. Eine Maximallösung für alle Daten scheitert deshalb oft am Budget, eine Minimallösung an der ersten Nachfrage der Aufsicht. Auch die Nachweise haben Grenzen: Ein C5-Testat deckt einen festgelegten Umfang und Zeitraum ab, und Gaia-X-Labels wirken nur dort, wo Anbieter sie erwerben und Kunden sie verlangen. Ob eine konkrete Herausgabe nach US-Recht zulässig wäre und wie sie sich zum europäischen Datenschutzrecht verhält, ist eine Frage für Juristen. Die Beratung stellt je Datenklasse die richtigen Fragen und macht die Antworten belegbar; Souveränität bescheinigen kann sie einem Anbieter nicht.',
        ],
      },
    ],
    quellen: [Q.cloudAct, Q.bsiC5_2026, Q.bsiC5Faq, Q.gaiaxAbout, Q.gaiaxCompliance],
  },
  {
    id: 'aleph-alpha',
    abschnitte: [
      {
        titel: 'Vom Modellentwickler zum Spezialanbieter',
        absaetze: [
          'Aleph Alpha galt lange als die deutsche Antwort auf OpenAI. Das Unternehmen wurde 2019 in Heidelberg gegründet; Gründer sind Jonas Andrulis und Samuel Weinbach. Andrulis verband die Gründung mit dem Ziel, Europa in der KI-Entwicklung unabhängig zu machen. Die hohen Erwartungen haben sich, so fasste es heise online 2025 zusammen, nur teilweise erfüllt: Das Unternehmen musste seine Strategie grundlegend ändern und sich auf Anwendungen für Behörden und einzelne Industriezweige spezialisieren, statt den großen US-Anbietern mit einem eigenen Produkt für Endkunden Konkurrenz zu machen. Nach eigener Darstellung entwickelt Aleph Alpha heute spezialisierte große Sprachmodelle (specialized large language models) für Unternehmen und öffentliche Einrichtungen, die Souveränität und Datensicherheit wahren wollen, und beschäftigt rund 200 Menschen an vier deutschen Standorten.',
          'Das Produkt dieser Strategie heißt PhariaAI, eine Plattform, die neben eigenen auch andere Sprachmodelle einbinden kann. Die Dokumentation des Unternehmens führt laufend neue Versionen; mit der Ausgabe vom Juni 2026 wurde dort die Komponente für die ältere eigene Modellfamilie Luminous abgekündigt (deprecated). Wer Aleph Alpha noch mit Luminous gleichsetzt, beschreibt einen überholten Stand. PhariaAI wird im Rechenzentrum des Kunden (on-premise) oder gehostet angeboten, und genau dieser Betrieb unter eigener Kontrolle ist für Verwaltungen und regulierte Branchen der Grund, sich mit dem Anbieter zu befassen.',
        ],
      },
      {
        titel: 'Führungswechsel und Zusammenschluss mit Cohere',
        absaetze: [
          'Im Oktober 2025 gab Andrulis die Geschäftsführung ab und übernahm den Vorsitz des Beirats; seit Januar 2026 führen Reto Spörri und Ilhan Scheer das Unternehmen. Branchenkenner sahen darin laut heise den wachsenden Einfluss der Schwarz-Gruppe, die zu den größten Anteilseignern gehört und mit ihrer Digitalsparte Schwarz Digits die Cloud STACKIT betreibt. Heise stellte damals die Frage, ob Aleph Alpha seine ursprüngliche Vision europäischer KI-Souveränität weiterverfolgen oder zum Baustein der Technologiestrategie der Schwarz-Gruppe werden würde. Am 24. April 2026 kündigte das kanadische KI-Unternehmen Cohere an, sich mit Aleph Alpha zusammenzuschließen. Das gemeinsame Angebot soll auf STACKIT laufen, und die Schwarz-Gruppe will die nächste Finanzierungsrunde von Cohere als Hauptinvestor mit einer Finanzierungszusage über 600 Millionen US-Dollar (500 Millionen Euro) anführen.',
          'Am 16. September 2026 unterzeichneten beide Unternehmen die verbindliche Vereinbarung über den Zusammenschluss (business combination agreement). Das vereinte Unternehmen soll weltweit als Cohere auftreten, mit Hauptsitzen in Berlin und Toronto; Heidelberg bleibt als Forschungsstandort erhalten. Das Handelsblatt beschreibt den Vorgang als Übernahme: Aleph Alpha wird Teil von Cohere. Mit dem Vollzug sollen Ilhan Scheer operativer Vorstand (Chief Operating Officer) und Samuel Weinbach Forschungschef (Chief Research Officer) von Cohere werden. Nach dem Stand der Unternehmensmitteilung vom 16. September 2026 steht der Zusammenschluss noch unter dem Vorbehalt behördlicher Genehmigungen; der Abschluss wird für später im Jahr erwartet.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Landratsamt betreibt einen Schreibassistenten auf PhariaAI im eigenen Rechenzentrum und fragt, ob es nach der Nachricht vom Zusammenschluss handeln muss. Die Beraterin rät weder zur Panik noch zum Abwarten, sondern zu einer Bestandsaufnahme. Wer ist heute Vertragspartner, und was sieht der Vertrag für einen Wechsel des Eigentümers vor? Welche Leistungen hängen am Hersteller, etwa Updates, Modellpflege und Support, und was läuft unabhängig im eigenen Haus? Welche Zusagen zu Produktlinie und Betriebsort liegen schriftlich vor, nachdem die Unternehmen weitere Einzelheiten zu Integration und Produkten erst angekündigt haben? Und wie aufwendig wäre der Umstieg auf ein anderes Modell oder eine andere Plattform? Aus den Antworten entsteht ein kurzer Risikovermerk mit Prüfterminen, kein Notfallprojekt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Geschichte von Aleph Alpha taugt schlecht als Heldenerzählung und gut als Lehrstück. Zwischen Oktober 2025 und September 2026 wechselten die Geschäftsführung und die Eigentümerperspektive; wer Souveränität an einem einzelnen Anbieter festmacht, baut auf eine Momentaufnahme. Mit dem Zusammenschluss wird das einstige deutsche Aushängeschild zudem Teil eines kanadisch-deutschen Unternehmens. Die Beteiligten erklären, das Unternehmen werde im Rechtsrahmen beider Länder arbeiten und seine Struktur enthalte Schutz- und Aufsichtsmechanismen. Ob das die Souveränitätskriterien einer konkreten Ausschreibung erfüllt, etwa zu Sitz und Kontrolle des Anbieters, ist im Einzelfall zu prüfen, wie im Artikel über Datensouveränität beschrieben. Formeln wie die von der „ersten transatlantischen souveränen KI-Lösung“ stammen aus der Pressemitteilung und sind Werbeaussagen, keine geprüften Befunde.',
        ],
      },
    ],
    quellen: [Q.cohereAlephVertrag, Q.cohereAlephApril, Q.handelsblattCohere, Q.heiseAndrulis, Q.phariaRelease],
  },
  {
    id: 'oekosystem-de',
    abschnitte: [
      {
        titel: 'Rollen statt Namen',
        absaetze: [
          'Ein Ökosystem ist mehr als eine Liste bekannter Namen. Für die Beratung zählt, welche Rolle ein Akteur spielt. Wer liefert die Anwendungen, in denen KI im Alltag eines Unternehmens ankommt? Wer forscht und bildet Fachleute aus? Wer liefert Zahlen, mit denen sich die Lage beschreiben lässt? Und wer bietet Modelle und Infrastruktur unter europäischem Recht an? Für die ersten drei Rollen stehen in diesem Artikel SAP mit seinen Unternehmensanwendungen, das Deutsche Forschungszentrum für Künstliche Intelligenz (DFKI) und der Digitalverband Bitkom. Die vierte Rolle behandeln die Artikel über Aleph Alpha und über Datensouveränität.',
        ],
      },
      {
        titel: 'SAP: KI im Geschäftskontext',
        absaetze: [
          'SAP kündigte am 26. September 2023 Joule an, einen generativen KI-Assistenten (copilot), der Fragen in natürlicher Sprache beantwortet. Joule sollte in SAP-Anwendungen vom Personalwesen über Finanzen, Lieferkette und Einkauf bis zum Kundenmanagement (customer experience) eingebettet werden und seine Antworten aus Geschäftsdaten des SAP-Portfolios und aus Drittquellen ziehen. SAP nennt als Beispiel einen Hersteller, der nach schwachen Verkaufsregionen fragt; der Assistent verknüpft die Antwort mit einem Lieferkettenproblem und schlägt Abhilfe zur Prüfung vor. In derselben Mitteilung verweist SAP auf seine im Juli 2023 angekündigten direkten Beteiligungen an Aleph Alpha, Anthropic und Cohere sowie auf Partnerschaften mit Microsoft, Google Cloud und IBM.',
          'Die Stärke dieses Ansatzes liegt im Datenkontext. SAP bezeichnet sich selbst als Marktführer für Unternehmensanwendungen und betont, Joule sitze direkt in den Anwendungen, die geschäftskritische Prozesse tragen. Ein Assistent, der auf Aufträgen, Buchungen und Stammdaten arbeitet, antwortet mit den Zahlen des Unternehmens statt mit allgemeinem Wissen. Die Kehrseite ist die Bindung: Der Nutzen entsteht innerhalb der SAP-Landschaft, und wer seine Prozesse anderswo abbildet, gewinnt wenig. Dass Aleph Alpha und Cohere, zwei der drei Firmen, an denen sich SAP 2023 beteiligte, im September 2026 einen Zusammenschluss vereinbart haben, zeigt nebenbei, wie schnell sich die Landschaft der Modellanbieter verändert.',
        ],
      },
      {
        titel: 'DFKI und Bitkom: Forschung und Zahlen',
        absaetze: [
          'Das DFKI wurde 1988 als gemeinnützige öffentlich-private Partnerschaft (public-private partnership) in der Rechtsform einer GmbH gegründet. Sitz ist Kaiserslautern, weitere Standorte liegen in Saarbrücken, Bremen und Niedersachsen, dazu kommen Labore unter anderem in Berlin und Darmstadt. Zu den Gesellschaftern gehören Industrieunternehmen, darunter SAP und die Schwarz-Gruppe, sowie Universitäten; finanziert wird die Arbeit aus öffentlicher Förderung, etwa von EU, Bund und Ländern, und aus Entwicklungsaufträgen der Industrie. In seinem Unternehmensprofil von 2024 bezeichnet sich das DFKI als die führende wirtschaftsnahe Forschungseinrichtung Deutschlands für Softwaretechnologien auf Basis Künstlicher Intelligenz. Solche Superlative sind Selbstbeschreibungen und werden als solche zitiert, nicht als Rangliste.',
          'Bitkom lässt die KI-Nutzung deutscher Unternehmen regelmäßig erheben. Nach der jüngsten Befragung, veröffentlicht am 14. September 2026, setzen 57 Prozent der Unternehmen ab 20 Beschäftigten KI ein; ein Jahr zuvor waren es 36 Prozent, zwei Jahre zuvor 20 Prozent. Befragt wurden 603 Unternehmen telefonisch, die Umfrage ist nach Angaben des Verbands repräsentativ für die Gesamtwirtschaft. Dieselbe Erhebung zeigt, wie früh die meisten stehen: Neun von zehn Unternehmen sehen sich bei KI erst am Anfang. So zitiert man eine Kennzahl: mit Herausgeber, Datum, Bezugsgröße und dem, was sie misst.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Hersteller von Landtechnik mit 250 Beschäftigten führt Aufträge, Lager und Buchhaltung in einem großen ERP-System und fragt, ob er einen eigenen Chatbot für den Vertriebsinnendienst bauen soll. Die Beraterin ordnet zuerst nach Rollen. Die Fragen des Innendienstes betreffen Aufträge, Lieferzeiten und Preise, also Daten im ERP-System; hier prüft sie, was der Assistent des ERP-Herstellers bereits abdeckt, bevor etwas Eigenes entsteht. Für ein Spezialproblem, die Auswertung von Messdaten aus Feldversuchen, empfiehlt sie das Gespräch mit einem Forschungsinstitut. Und in der Vorlage für die Geschäftsführung steht keine gefühlte Zahl, sondern ein belegter Satz: Laut Bitkom-Befragung vom September 2026 setzen 57 Prozent der Unternehmen ab 20 Beschäftigten KI ein, neun von zehn sehen sich aber erst am Anfang.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Jede der drei Quellen hat eine eigene Perspektive. SAP beschreibt sein Produkt in einer Pressemitteilung, also als Anbieter; was Joule in einem bestimmten Unternehmen leistet, zeigt erst ein Test mit dessen Daten. Das DFKI beschreibt sich selbst, und Bitkom ist der Verband der Branche, die KI verkauft. Das spricht nicht gegen seine Zahlen, aber für einen genauen Blick auf Frage und Methode. Die Bitkom-Zahl beruht auf Selbstauskünften: Was als KI-Nutzung zählt, entscheiden die Befragten, und ein Chatbot im Kundenservice zählt ebenso wie ein tief integriertes Prognosemodell. Schließlich altert jede Momentaufnahme schnell, wie der Zusammenschluss von Aleph Alpha und Cohere zeigt. Wer das Ökosystem beschreibt, datiert deshalb jede Aussage und prüft sie vor dem Kundentermin neu.',
        ],
      },
    ],
    quellen: [Q.sapJoule, Q.dfkiProfil, Q.bitkom2026, Q.cohereAlephVertrag],
  },
  {
    id: 'branchen-praxis',
    abschnitte: [
      {
        titel: 'Energie: Wartung nach Vorhersage',
        absaetze: [
          'Die vier Fälle folgen demselben Raster: Was bringt die Anwendung, woran kann sie scheitern, welche Regeln greifen? Dazu kommt eine Frage, die bei jedem Fallbeispiel gestellt werden muss: Wer nennt die Zahl, und wann? Im Energiefall setzte E.ON bei seiner Tochter Schleswig-Holstein Netz im Mittelspannungsnetz einen selbstlernenden Algorithmus ein, der Störungen vorhersagen soll, bevor sie auftreten (vorausschauende Instandhaltung, predictive maintenance). Grundlage sind laut einem Bericht der Zeitung für kommunale Wirtschaft vom Mai 2018 unter anderem Alter und Bauart der Leitungen, Instandhaltungs- und Wetterdaten sowie das aktuelle Lastverhalten.',
          'Der Nutzen ist eine Selbstauskunft: Die Wahrscheinlichkeit, einen Defekt vorherzusagen, sei „um den Faktor zwei bis drei gestiegen“, sagte der für das deutsche Netzgeschäft verantwortliche E.ON-Manager Thomas König. Das betrifft die Vorhersage, nicht vermiedene Ausfälle, und ist nicht unabhängig geprüft. Stolpersteine sind Datenqualität und Übertragbarkeit: Ein Modell, das an einem Netz gelernt hat, gilt nicht automatisch für ein anderes. Ein Stromnetz ist kritische Infrastruktur (KRITIS). Hochriskant im Sinn der KI-Verordnung ist KI dort, wenn sie als Sicherheitsbauteil arbeitet; diese Regeln gelten nach dem Zeitplan der EU-Kommission ab dem 2. Dezember 2027. Eine Prognose, die Wartung plant, ist in der Regel kein solches Bauteil.',
        ],
      },
      {
        titel: 'Service und Industrie: Entlastung statt Ersatz',
        absaetze: [
          'Die Deutsche Telekom setzt den digitalen Assistenten „Frag Magenta“ als Chat- und Sprachsystem auf der Website, in der App, in Messengern und an der Hotline ein. Nach Angaben des Unternehmens hilft er bei über 380 Anliegen, führte 2024 fast zehn Millionen Kundendialoge und löst über ein Drittel der Anliegen sofort. In den übrigen Fällen übernehmen Beraterinnen und Berater, denen der Assistent Protokoll und Zusammenfassung übergibt. Seit August 2026 gilt die Transparenzpflicht der KI-Verordnung: Wer mit einem Chatbot spricht, muss erfahren, dass er mit einer Maschine spricht. Greift der Assistent auf Rechnungs- oder Vertragsdaten zu, kommt die Datenschutz-Grundverordnung hinzu.',
          'Im Industriefall geht es um den Siemens Industrial Copilot, einen generativen KI-Assistenten für die Engineering-Software TIA Portal, den Siemens gemeinsam mit Microsoft auf Basis des Dienstes Azure OpenAI weiterentwickelt. Nach Angaben von Siemens vom Oktober 2024 nutzten ihn über 100 Unternehmen; Ingenieure könnten damit Bedienvisualisierungen in 30 Sekunden erstellen und Steuerungscode erzeugen, der nur noch zu 20 Prozent angepasst werden müsse. Auch das ist eine Selbstauskunft, und sie heißt zugleich: Der Code ist ein Entwurf, den Fachkräfte prüfen, bevor er eine Maschine steuert. Siemens begründet den Nutzen ausdrücklich mit dem Fachkräftemangel.',
        ],
      },
      {
        titel: 'Öffentlicher Sektor: F13',
        absaetze: [
          'Mit F13 hat Baden-Württemberg nach Angaben des Staatsministeriums die erste KI-Assistenz einer deutschen Verwaltung eingeführt. Einen gemeinsam mit Aleph Alpha entwickelten Prototyp konnten alle Beschäftigten der Landesverwaltung ab Mai 2023 nutzen, 2024 folgte die Vollversion. An ihr ist Aleph Alpha nicht mehr beteiligt; entwickelt haben sie das Innovationslabor des Landes und die PD – Berater der öffentlichen Hand, betrieben wird sie im Rechenzentrum der landeseigenen IT-Dienstleisterin BITBW. F13 bietet einen Chat, fasst Dokumente zusammen und recherchiert in Verwaltungsdokumenten. Seit dem 23. Juli 2025 ist die Software Open Source, mit nahezu jedem Sprachmodell nutzbar und für Bund, Länder und Kommunen nachnutzbar. Eigener Betrieb und offener Quellcode sichern dem Land die Kontrolle über Betrieb und Weiterentwicklung, um die es im Artikel über Datensouveränität geht. Ein Assistent, der Texte zusammenfasst, gehört nicht zu den Hochrisiko-Bereichen der KI-Verordnung; anders ist es, wenn KI über den Zugang zu wesentlichen öffentlichen Leistungen mitentscheidet.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Stadtwerk mit 300 Beschäftigten will seinem Aufsichtsrat zeigen, was KI in der Praxis leistet, und hat die vier Fälle in einer Präsentation gesammelt. Die Beraterin ergänzt jede Folie um drei Angaben: wer die Zahl nennt, aus welchem Jahr sie stammt und worauf sie sich bezieht. Aus der Zeile zum Energiefall wird so: Selbstauskunft des Netzbetreibers von 2018, bezogen auf die Vorhersage, nicht auf vermiedene Ausfälle. Dann fragt sie, welcher Fall zum Stadtwerk passt. Für das eigene Netz fehlt eine lange, saubere Störungshistorie, also beginnt ein solches Vorhaben mit der Datenaufbereitung. Im Kundenservice dagegen liegen viele gleichartige Anfragen vor; hier ist ein Assistent mit Übergabe an Menschen und Kennzeichnung als KI ein realistischer erster Schritt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Fallbeispiele sind ausgewählt. Unternehmen berichten über Projekte, die funktionieren; eingestellte Versuche erscheinen selten in Pressemitteilungen. Die Zahlen der vier Fälle messen zudem Verschiedenes, eine Vorhersagewahrscheinlichkeit, eine Lösungsquote, einen Anpassungsanteil, und lassen sich weder vergleichen noch auf ein anderes Unternehmen übertragen. Sie altern auch: Der Energiefall stammt von 2018, und bei F13 hat seit dem Prototyp der Technologiepartner gewechselt. Wer solche Beispiele nutzt, datiert sie, nennt die Quelle und kennzeichnet Selbstauskünfte als solche. Ein Beispiel zeigt, dass etwas möglich ist, nicht, dass es beim Kunden genauso gelingt.',
        ],
      },
    ],
    quellen: [Q.zfkEon, Q.telekomFragMagenta, Q.siemensCopilot, Q.stmF13, Q.kommissionAiAct],
  },
];
