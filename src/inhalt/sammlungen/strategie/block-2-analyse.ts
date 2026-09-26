import type { EigenerArtikel, Quelle } from '../../typen';

// Block 2 — Umfeld und Branche analysieren. Alle Quellen am 2026-09-26 abgerufen und geprüft.
// Journal-Aufsätze sind über ihre DOI verlinkt (Verlagsseiten von Elsevier, SAGE und Wiley
// blocken automatisierte Abrufe; Titel, Autoren und Zielseite wurden über Crossref/OpenAlex
// und die DOI-Auflösung bestätigt).
const AB = '2026-09-26';
const Q = {
  // Makroumfeld
  cipdPestle: { titel: 'CIPD — PESTLE analysis (CIPD Factsheet, cipd.org)', url: 'https://www.cipd.org/uk/knowledge/factsheets/pestle-analysis-factsheet/', abgerufen: AB } satisfies Quelle,
  gablerMakroumfeld: { titel: 'Günther — Makroumfeld (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/makroumfeld-52407', abgerufen: AB } satisfies Quelle,
  gablerUmwelt: { titel: 'Feess & Günther — Umwelt (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/umwelt-49853', abgerufen: AB } satisfies Quelle,
  euAiAct: { titel: 'Europäische Kommission — AI Act: Regulatory framework for AI (digital-strategy.ec.europa.eu)', url: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai', abgerufen: AB } satisfies Quelle,
  // Branche
  porter2008: { titel: 'Porter — The Five Competitive Forces That Shape Strategy (Harvard Business Review, 2008)', url: 'https://hbr.org/2008/01/the-five-competitive-forces-that-shape-strategy', abgerufen: AB } satisfies Quelle,
  porter1979: { titel: 'Porter — How Competitive Forces Shape Strategy (Harvard Business Review, 1979)', url: 'https://hbr.org/1979/03/how-competitive-forces-shape-strategy', abgerufen: AB } satisfies Quelle,
  iscFiveForces: { titel: 'Institute for Strategy and Competitiveness, Harvard Business School — The Five Forces (isc.hbs.edu)', url: 'https://www.isc.hbs.edu/strategy/business-strategy/Pages/the-five-forces.aspx', abgerufen: AB } satisfies Quelle,
  // SWOT / TOWS
  gablerSwot: { titel: 'Hellenkamp — SWOT-Analyse (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/swot-analyse-52664', abgerufen: AB } satisfies Quelle,
  weihrich1982: { titel: 'Weihrich — The TOWS matrix: A tool for situational analysis (Long Range Planning 15(2), 1982)', url: 'https://doi.org/10.1016/0024-6301(82)90120-0', abgerufen: AB } satisfies Quelle,
  hillWestbrook1997: { titel: "Hill & Westbrook — SWOT analysis: It's time for a product recall (Long Range Planning 30(1), 1997)", url: 'https://doi.org/10.1016/S0024-6301(96)00095-7', abgerufen: AB } satisfies Quelle,
  // Wettbewerbsvorteil
  porter1996: { titel: 'Porter — What Is Strategy? (Harvard Business Review, 1996)', url: 'https://hbr.org/1996/11/what-is-strategy', abgerufen: AB } satisfies Quelle,
  iscPositioning: { titel: 'Institute for Strategy and Competitiveness, Harvard Business School — Strategic Positioning (isc.hbs.edu)', url: 'https://www.isc.hbs.edu/strategy/business-strategy/Pages/strategic-positioning.aspx', abgerufen: AB } satisfies Quelle,
  gablerWettbewerbsstrategie: { titel: 'Kirchgeorg — Wettbewerbsstrategie (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/wettbewerbsstrategie-50653', abgerufen: AB } satisfies Quelle,
  gablerBlueOcean: { titel: 'Gabler Wirtschaftslexikon — Blue-Ocean-Strategie (Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/blue-ocean-strategie-120549', abgerufen: AB } satisfies Quelle,
  // Wertkette
  iscValueChain: { titel: 'Institute for Strategy and Competitiveness, Harvard Business School — The Value Chain (isc.hbs.edu)', url: 'https://www.isc.hbs.edu/strategy/business-strategy/Pages/the-value-chain.aspx', abgerufen: AB } satisfies Quelle,
  gablerWertkette: { titel: 'Hellenkamp — Wertschöpfungskette (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/wertschoepfungskette-50465', abgerufen: AB } satisfies Quelle,
  gablerWertkettenAnalyse: { titel: 'Weber — Wertschöpfungsketten-Analyse (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/wertschoepfungsketten-analyse-49177', abgerufen: AB } satisfies Quelle,
  stabellFjeldstad1998: { titel: 'Stabell & Fjeldstad — Configuring value for competitive advantage: on chains, shops, and networks (Strategic Management Journal 19(5), 1998)', url: 'https://doi.org/10.1002/(SICI)1097-0266(199805)19:5%3C413::AID-SMJ946%3E3.0.CO;2-C', abgerufen: AB } satisfies Quelle,
  // Ressourcen und Fähigkeiten
  prahaladHamel1990: { titel: 'Prahalad & Hamel — The Core Competence of the Corporation (Harvard Business Review, 1990)', url: 'https://hbr.org/1990/05/the-core-competence-of-the-corporation', abgerufen: AB } satisfies Quelle,
  barney1991: { titel: 'Barney — Firm Resources and Sustained Competitive Advantage (Journal of Management 17(1), 1991)', url: 'https://doi.org/10.1177/014920639101700108', abgerufen: AB } satisfies Quelle,
  teece1997: { titel: 'Teece, Pisano & Shuen — Dynamic capabilities and strategic management (Strategic Management Journal 18(7), 1997)', url: 'https://doi.org/10.1002/(SICI)1097-0266(199708)18:7%3C509::AID-SMJ882%3E3.0.CO;2-Z', abgerufen: AB } satisfies Quelle,
  teece2007: { titel: 'Teece — Explicating dynamic capabilities: the nature and microfoundations of (sustainable) enterprise performance (Strategic Management Journal 28(13), 2007)', url: 'https://doi.org/10.1002/smj.640', abgerufen: AB } satisfies Quelle,
  priemButler2001: { titel: "Priem & Butler — Is the Resource-Based 'View' a Useful Perspective for Strategic Management Research? (Academy of Management Review 26(1), 2001)", url: 'https://doi.org/10.5465/amr.2001.4011928', abgerufen: AB } satisfies Quelle,
  // Portfolio und Wachstum
  bcg2014: { titel: 'Reeves, Moose & Venema — BCG Classics Revisited: The Growth Share Matrix (Boston Consulting Group, 2014)', url: 'https://www.bcg.com/publications/2014/growth-share-matrix-bcg-classics-revisited', abgerufen: AB } satisfies Quelle,
  gablerPortfolio: { titel: 'Gabler Wirtschaftslexikon — Portfolio-Analyse (Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/portfolio-analyse-44081', abgerufen: AB } satisfies Quelle,
  ansoff1957: { titel: 'Ansoff — Strategies for Diversification (Harvard Business Review, 1957, S. 113–124; Digitalisat auf archive.org)', url: 'https://archive.org/details/strategiesfordiversificationansoff1957hbr', abgerufen: AB } satisfies Quelle,
  gablerAnsoff: { titel: 'Markgraf — Produkt-Markt-Expansionsraster (Gabler Wirtschaftslexikon, Springer Fachmedien)', url: 'https://wirtschaftslexikon.gabler.de/definition/produkt-markt-expansionsraster-53632', abgerufen: AB } satisfies Quelle,
  // Blue Ocean
  kimMauborgne2004: { titel: 'Kim & Mauborgne — Blue Ocean Strategy (Harvard Business Review, 2004)', url: 'https://hbr.org/2004/10/blue-ocean-strategy', abgerufen: AB } satisfies Quelle,
  bosCanvas: { titel: 'Kim & Mauborgne — Strategy Canvas (Blue Ocean Strategy Tools and Frameworks, blueoceanstrategy.com)', url: 'https://www.blueoceanstrategy.com/tools/strategy-canvas/', abgerufen: AB } satisfies Quelle,
  bosErrc: { titel: 'Kim & Mauborgne — Eliminate-Reduce-Raise-Create Grid (Blue Ocean Strategy Tools and Frameworks, blueoceanstrategy.com)', url: 'https://www.blueoceanstrategy.com/tools/errc-grid/', abgerufen: AB } satisfies Quelle,
};

export const block2: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1 · PESTEL
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'pestel-analyse',
    titel: 'PESTEL: das Makroumfeld lesen',
    thema: 'strategie',
    einleitung:
      'Vor jeder Frage nach Wettbewerbern oder eigenen Stärken lohnt der Blick auf die Kräfte, die außerhalb der Branche wirken und die kein Unternehmen steuern kann. PESTEL ordnet dieses Makroumfeld in sechs Felder und liefert damit das Rohmaterial für Szenarien und SWOT.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'PESTEL ist ein Akronym für sechs Felder des Makroumfelds: politisch (political), ökonomisch (economic), sozial (social), technologisch (technological), ökologisch (environmental) und rechtlich (legal). Das Gabler Wirtschaftslexikon fasst das Makroumfeld als die ökologischen, ökonomischen, gesellschaftlichen, technologischen und politischen Rahmenbedingungen, in denen ein Unternehmen arbeitet; die Analyse der einzelnen Einflussgrößen soll mögliche Chancen und Risiken sichtbar machen. Ältere Gliederungen nennen dieselben Bereiche unter anderen Namen, etwa die wirtschaftliche, technische, gesellschaftliche, politische und natürliche Umwelt der Unternehmung. Gemeint ist immer die Umgebung, die mit dem Unternehmen in Wechselwirkung steht, aber nicht von ihm gesteuert wird.',
          'Das britische Personalinstitut CIPD beschreibt PESTLE (die englische Schreibweise) als Werkzeug für die strategische Unternehmensplanung, die Personalplanung, die Marketingplanung und die Organisationsentwicklung. Zweck ist, Risiken und Chancen zu erkennen, die aus Veränderungen außerhalb des Unternehmens entstehen. Die Methode gehört damit zur Umfeldanalyse (external analysis), also zu dem Teil der Strategiearbeit, der nach außen schaut, bevor Branche und eigenes Unternehmen betrachtet werden. Die Ergebnisse dienen als Eingabe für andere Werkzeuge: als Chancen und Risiken einer SWOT-Analyse oder als Treiber, aus denen Szenarien gebaut werden.',
        ],
      },
      {
        titel: 'Die sechs Dimensionen',
        absaetze: [
          'Die Felder lassen sich mit den Beispielen des CIPD-Factsheets füllen. Politisch: Steuerpolitik, Regulierung, politische Stabilität. Ökonomisch: Wirtschaftswachstum, Zinsen, Inflation, Lohnniveau. Sozial: kulturelle Normen, Bevölkerungsentwicklung, Gesundheitsbewusstsein. Technologisch: Robotik, künstliche Intelligenz, digitale Innovationen. Ökologisch: Nachhaltigkeit, ethische Beschaffung, auch Pandemien. Rechtlich: Gesetzesänderungen, Arbeitsrecht. Manche Faktoren passen in mehrere Felder; ein neues Gesetz ist zugleich politisch und rechtlich. Die Zuordnung ist weniger wichtig als die Vollständigkeit: Die Felder sind eine Checkliste, damit kein Bereich vergessen wird.',
          'Ein brauchbarer Durchgang endet nicht mit der Liste. Für jeden Faktor wird festgehalten, in welche Richtung er sich bewegt, wie sicher diese Bewegung ist und was sie für das Unternehmen bedeuten würde. Erst diese Bewertung macht aus einem Faktor einen Treiber (driver), also eine Größe, deren Entwicklung die Strategie verändern kann. Das CIPD betont, dass die Analyse regelmäßig wiederholt werden muss, weil sich das Umfeld schneller verändert, als ein einmaliger Durchgang abbildet.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein metallverarbeitender Zulieferer mit 150 Beschäftigten fragt eine KI-Beratung, wo sich der Einsatz von Sprachmodellen lohnt. Bevor über Anwendungsfälle gesprochen wird, hilft ein kurzer PESTEL-Durchgang, die Rahmenbedingungen zu ordnen. Rechtlich: Die EU-Verordnung über künstliche Intelligenz (Verordnung (EU) 2024/1689, AI Act) folgt einem risikobasierten Ansatz mit vier Stufen; für Hochrisikosysteme, etwa im Bereich Beschäftigung, verlangt sie Risikomanagement, Dokumentation, Protokollierung und menschliche Aufsicht. Ein Assistent für die Vorauswahl von Bewerbungen fällt damit in eine andere Kategorie als ein Assistent, der Wartungsberichte zusammenfasst.',
          'Sozial: Der Betrieb findet kaum noch Fachkräfte, und das Servicewissen älterer Techniker ist nicht dokumentiert. Technologisch: Sprachmodelle können unstrukturierte Texte auswerten, und die Werkzeuge sind ohne eigene Entwicklung zugänglich. Ökonomisch: Ein knappes Investitionsbudget macht kleine Vorhaben mit kurzem Rückfluss wahrscheinlicher als Plattformprojekte. Aus diesen Feldern ergibt sich eine Vorsortierung: Anwendungsfälle mit geringer regulatorischer Belastung, die das Wissen der Belegschaft sichern, stehen vorn. PESTEL hat hier keine Lösung geliefert, aber verhindert, dass die Beratung mit dem regulatorisch heikelsten Vorhaben beginnt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das CIPD nennt die Schwächen selbst. Anwender vereinfachen die Datenlage oft zu stark und entscheiden auf dünner Grundlage; umgekehrt führt das Sammeln zu vieler Daten zu einer Lähmung durch Analyse (paralysis by analysis). Das Tempo des Wandels macht es schwer, künftige Entwicklungen vorherzusehen, und die Analyse ist nur wirksam, wenn sie regelmäßig wiederholt wird. Ein PESTEL-Ergebnis ist also eine Momentaufnahme, kein Frühwarnsystem.',
          'Die Methode selbst enthält keine Gewichtung. Sechs Spalten mit je fünf Stichworten ergeben dreißig Faktoren, von denen vielleicht drei die Strategie wirklich berühren. Wer diese drei nicht nach Eintrittswahrscheinlichkeit und Wirkung herausfiltert, hat eine Liste ohne Handlungsfolge. Ein zweiter typischer Fehler ist die Verwechslung von Umfeld und Unternehmen: Eine schwache Datenbasis ist keine technologische Rahmenbedingung, sondern eine interne Schwäche und gehört in die SWOT-Analyse. PESTEL erklärt außerdem nicht, wie stark ein Faktor eine bestimmte Branche trifft; dafür ist die Branchenanalyse zuständig.',
        ],
      },
    ],
    quellen: [Q.cipdPestle, Q.gablerMakroumfeld, Q.gablerUmwelt, Q.euAiAct],
    sieheAuch: ['five-forces', 'swot-tows', 'szenarioplanung'],
    synonyme: ['PESTEL-Analyse', 'PESTLE-Analyse', 'PEST-Analyse', 'Makroumfeldanalyse', 'Umfeldanalyse'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2 · Five Forces
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'five-forces',
    titel: 'Porters Five Forces: die Struktur einer Branche',
    thema: 'strategie',
    einleitung:
      'Warum verdienen manche Branchen dauerhaft gut und andere kaum, obwohl in beiden fähige Unternehmen arbeiten? Porters Modell der fünf Wettbewerbskräfte beantwortet diese Frage über die Struktur einer Branche und ist deshalb das meistzitierte Werkzeug der Branchenanalyse.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Michael Porter stellte das Modell 1979 in der Harvard Business Review vor und überarbeitete es 2008 im Aufsatz „The Five Competitive Forces That Shape Strategy“. Sein Ausgangspunkt: Der Wettbewerb um Gewinne findet nicht nur zwischen den etablierten Rivalen einer Branche statt. Porter schreibt, Manager definierten Wettbewerb oft zu eng, als fände er nur unter den heutigen direkten Konkurrenten statt. Tatsächlich ringen vier weitere Kräfte um denselben Wert: Kunden, Lieferanten, mögliche neue Anbieter und Ersatzprodukte. Die erweiterte Rivalität aus allen fünf Kräften definiert die Struktur einer Branche.',
          'Die Kräfte bestimmen, wie der wirtschaftliche Wert, den eine Branche schafft, unter Wettbewerbern, Kunden und Lieferanten aufgeteilt wird. Sind alle fünf Kräfte stark, bleibt den Unternehmen wenig; sind sie schwach, kann die Branche insgesamt hohe Renditen erzielen. Das Institute for Strategy and Competitiveness der Harvard Business School betont, dass die Branchenstruktur nicht feststeht: Sie verändert sich, und eine Strategie kann sie beeinflussen. Das Modell liefert deshalb kein Urteil, sondern eine Übersicht der Stellen, an denen Druck auf die Rentabilität entsteht.',
        ],
      },
      {
        titel: 'Die fünf Kräfte',
        absaetze: [
          'Bedrohung durch neue Anbieter (threat of new entrants): Neue Konkurrenten drücken auf Preise und Gewinne; Eintrittsbarrieren wie Größenvorteile, Markenaufbau oder der Zugang zu Vertriebskanälen halten sie fern. Verhandlungsmacht der Lieferanten (bargaining power of suppliers): Mächtige Lieferanten setzen höhere Preise oder bessere Konditionen durch. Verhandlungsmacht der Abnehmer (bargaining power of buyers): Starke Kunden drücken Preise oder verlangen mehr Leistung, besonders bei austauschbaren Produkten und niedrigen Wechselkosten. Bedrohung durch Substitute (threat of substitutes): Ersatzprodukte erfüllen dasselbe Bedürfnis auf andere Weise und begrenzen, was eine Branche verlangen kann.',
          'Rivalität unter den bestehenden Wettbewerbern (rivalry among existing competitors): Sie senkt die Gewinne über Preiskämpfe, vor allem wenn viele ähnlich große Anbieter um einen langsam wachsenden Markt konkurrieren. Entscheidend ist nicht die Aufzählung, sondern die Frage, welche Kraft in der konkreten Branche am stärksten wirkt und warum. Porter (2008) verlangt, die Ursachen hinter jeder Kraft zu benennen: Wer die Preisempfindlichkeit der Kunden feststellt, hat eine Wirkung beschrieben, nicht deren Ursache in der Kostenstruktur oder den Alternativen der Kunden.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine kleine KI-Beratung kann das Modell auf die eigene Branche anwenden, hier „KI-Beratung für mittelständische Unternehmen“. Neue Anbieter: Die Eintrittsbarrieren sind niedrig; wer Zugang zu Modellen, einen Laptop und Referenzen hat, kann anbieten. Substitute: Der Kunde nutzt allgemein verfügbare Werkzeuge selbst, oder sein Softwareanbieter liefert KI-Funktionen im Produkt mit. Abnehmer: Mittelständler vergeben kleine Aufträge, vergleichen Tagessätze und wechseln ohne hohe Kosten. Lieferanten: Wenige große Modellanbieter bestimmen Preise, Nutzungsbedingungen und Verfügbarkeit. Rivalität: Viele kleine Beratungen mit ähnlichen Versprechen konkurrieren um dieselben Kunden.',
          'Das Bild ist nüchtern: Die Branchenstruktur ist im Durchschnitt wenig attraktiv, und das erklärt, warum viele Anbieter über Tagessätze konkurrieren. Die Antwort liegt nicht in der Analyse selbst, sondern in der Positionierung, die daraus folgt: Spezialisierung auf eine Kundengruppe, eine wiederholbare Methode und Vertrauen aus belegten Ergebnissen erhöhen die Wechselkosten und schwächen die Substitute. Vorher lohnt die Prüfung der Branchengrenze. „KI-Beratung für Fertigungsbetriebe in einer Region“ ist eine andere Branche mit anderen Kräften als „Digitalberatung in Deutschland“.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Porter (2008) nennt die Fehlanwendungen selbst. Die Branche wird zu weit oder zu eng abgegrenzt, sodass die Kräfte verschwimmen. Die fünf Kräfte werden als Liste abgehakt statt gewichtet, und alle erhalten gleiche Aufmerksamkeit, obwohl meist eine oder zwei die Rentabilität bestimmen. Die Analyse bleibt statisch und übersieht Trends, oder sie verwechselt konjunkturelle Schwankungen mit strukturellen Veränderungen. Schließlich wird das Modell benutzt, um eine Branche für attraktiv oder unattraktiv zu erklären, statt daraus strategische Entscheidungen abzuleiten.',
          'Ebenso wichtig ist, was keine Kraft ist. Branchenwachstum gilt oft als Zeichen für Attraktivität; Porter zeigt, dass schnelles Wachstum die Gewinne nicht sichert, wenn es neue Anbieter anzieht und Kunden Macht verleiht. Technologie, staatliches Handeln und ergänzende Produkte sind ebenfalls keine sechste Kraft, sondern Einflüsse, die über die fünf Kräfte wirken. Das Modell erklärt außerdem nur die Branche, nicht den Unterschied zwischen Unternehmen derselben Branche; dafür braucht es die Innenperspektive der Ressourcen und Fähigkeiten.',
        ],
      },
    ],
    quellen: [Q.porter2008, Q.porter1979, Q.iscFiveForces],
    sieheAuch: ['pestel-analyse', 'wettbewerbsvorteil', 'blue-ocean', 'wertkette'],
    synonyme: ['Five Forces', 'Fünf-Kräfte-Modell', 'Branchenstrukturanalyse', 'Porters fünf Wettbewerbskräfte'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3 · SWOT und TOWS
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'swot-tows',
    titel: 'SWOT und TOWS: von der Liste zur Strategie',
    thema: 'strategie',
    einleitung:
      'Kaum ein Werkzeug wird so oft benutzt und so oft schlecht benutzt wie die SWOT-Analyse. Sie wird erst nützlich, wenn aus den vier Feldern Entscheidungen folgen, und genau dafür wurde die TOWS-Matrix entwickelt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'SWOT steht für Stärken (strengths), Schwächen (weaknesses), Chancen (opportunities) und Risiken (threats). Das Gabler Wirtschaftslexikon beschreibt die SWOT-Analyse als Instrument der strategischen Analyse, das die internen Stärken und Schwächen eines Unternehmens den Chancen und Risiken seines Umfelds gegenüberstellt. Die Trennung ist der Kern: Intern sind Ressourcen, Fähigkeiten, Strukturen und Prozesse, die das Unternehmen selbst verändern kann. Extern sind Marktentwicklungen, Wettbewerb, Technologie und Regulierung, die es nur beobachten und beantworten kann. Wer „wir könnten KI einsetzen“ als Chance einträgt, verwechselt eine eigene Option mit einer Umfeldentwicklung.',
          'Gabler gliedert das Vorgehen in drei Schritte: den Analysegegenstand festlegen (das ganze Unternehmen oder ein Geschäftsfeld), die interne und externe Analyse durchführen und die Befunde nach strategischer Relevanz ordnen. Eine bloße Sammlung möglichst vieler Stärken und Chancen hat nach Gabler nur begrenzten Aussagewert. Die Rohdaten kommen aus anderen Werkzeugen: Chancen und Risiken aus PESTEL und Branchenanalyse, Stärken und Schwächen aus der Wertkette und der Ressourcenanalyse. SWOT ist damit eine Verdichtung, keine eigene Erhebung.',
        ],
      },
      {
        titel: 'Die TOWS-Matrix',
        absaetze: [
          'Heinz Weihrich (1982) beschrieb im Aufsatz „The TOWS Matrix – A Tool for Situational Analysis“, wie aus der Inventur Strategieoptionen werden. Die Matrix kreuzt die externen Faktoren mit den internen und erzeugt vier Felder, die auch Gabler als Strategieoptionen nennt: SO-Strategien nutzen Stärken, um Chancen wahrzunehmen. ST-Strategien setzen Stärken ein, um Risiken abzuwehren. WO-Strategien bauen Schwächen ab, um Chancen nutzen zu können. WT-Strategien verringern Schwächen und meiden Risiken zugleich. Die umgekehrte Buchstabenfolge TOWS betont, dass die Analyse beim Umfeld beginnt und die interne Seite darauf bezogen wird.',
          'Der Gewinn liegt in der Kombination: Jede Zelle der Matrix zwingt zu der Frage, was eine bestimmte Stärke gegenüber einer bestimmten Chance wert ist. Dabei entstehen meist mehr Optionen, als ein Unternehmen verfolgen kann. Die Auswahl gehört nicht mehr zur SWOT-Analyse, sondern zur Bewertung von Strategien; Gabler stellt klar, dass SWOT weder eine fundierte interne und externe Analyse noch die anschließende Bewertung konkreter Strategien ersetzt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Maschinenbauer mit 200 Beschäftigten will wissen, ob und wo er KI im Service einsetzen soll. Stärken: dreißig Jahre Servicehistorie in Ticketsystem und Berichten, erfahrene Techniker mit hoher Kundenbindung. Schwächen: keine Datenkompetenz im Haus, uneinheitliche Dokumentation, eine IT-Abteilung mit zwei Personen. Chancen: Kunden verlangen kürzere Stillstandszeiten, und Sprachmodelle werten unstrukturierte Texte inzwischen zuverlässig aus. Risiken: Ein Wettbewerber bewirbt Fernwartung mit KI-Diagnose, und Kunden werden bei der Weitergabe ihrer Daten an Dritte empfindlicher.',
          'Die TOWS-Matrix macht daraus Optionen. SO: ein Diagnoseassistent für Techniker, gespeist aus der eigenen Servicehistorie. WO: Datenaufbereitung mit externer Hilfe, damit die Historie überhaupt nutzbar wird. ST: die eigene Datenbasis als Argument gegen den Wettbewerber, der diese Historie nicht hat. WT: keine Kundendaten in fremde Modelle geben, bevor Verträge und Löschfristen geklärt sind. Zwei Praxisregeln machen die Felder belastbar: Jede Aussage braucht einen Beleg (eine Kennzahl, eine Kundenaussage, ein Dokument), und jede Stärke wird relativ zum Wettbewerb formuliert. „Guter Service“ ist keine Stärke; „Reaktionszeit unter der der beiden Hauptwettbewerber“ ist eine.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Terry Hill und Roy Westbrook (1997) forderten in Long Range Planning einen „product recall“ für die SWOT-Analyse. Sie hatten untersucht, wie Unternehmen das Werkzeug tatsächlich einsetzen, und fanden lange Listen allgemeiner Aussagen, unklare Formulierungen, keine Priorisierung, keine Prüfung der Behauptungen und keine Weiterverwendung der Ergebnisse in der anschließenden Strategiearbeit. Ihr Schluss: Nicht das Werkzeug versagt, sondern seine Anwendung, und ohne Disziplin ist eine SWOT-Analyse wertlos.',
          'Weitere Grenzen sind bekannt. Die Zuordnung ist oft unscharf, weil derselbe Sachverhalt je nach Blickwinkel Stärke oder Schwäche ist. Die Methode enthält keine Gewichtung, sodass eine Nebensache gleichberechtigt neben dem entscheidenden Faktor steht. Gabler weist darauf hin, dass die Aussagekraft von der Qualität der Informationen und der Bewertung der Faktoren abhängt und dass die Analyse regelmäßig aktualisiert werden muss. Und SWOT liefert keine Strategie: Auch die TOWS-Felder sind Optionen, deren Auswahl Kriterien außerhalb der Matrix verlangt.',
        ],
      },
    ],
    quellen: [Q.gablerSwot, Q.weihrich1982, Q.hillWestbrook1997],
    sieheAuch: ['pestel-analyse', 'five-forces', 'ressourcen-kernkompetenzen'],
    synonyme: ['SWOT-Analyse', 'TOWS-Matrix', 'SWOT-Matrix', 'Stärken-Schwächen-Chancen-Risiken-Analyse'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4 · Wettbewerbsvorteil
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'wettbewerbsvorteil',
    titel: 'Wettbewerbsvorteil: Kostenführerschaft, Differenzierung, Fokus',
    thema: 'strategie',
    einleitung:
      'Ein Unternehmen kann Konkurrenten nur dann dauerhaft übertreffen, wenn es einen Unterschied hat, den es bewahren kann. Porters generische Strategien und sein Aufsatz „What Is Strategy?“ liefern das Vokabular, um diesen Unterschied zu benennen und zu prüfen.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Michael Porter beschrieb 1980 in „Competitive Strategy“ drei generische Wettbewerbsstrategien: Kostenführerschaft (cost leadership), Differenzierung (differentiation) und Fokus (focus), also die Konzentration auf ein Segment mit Kosten- oder Differenzierungsschwerpunkt. Das Gabler Wirtschaftslexikon ordnet sie nach zwei Dimensionen: der Art des Vorteils (Kosten oder wahrgenommener Nutzen) und dem Ort, an dem er erreicht wird (branchenweit oder segmentspezifisch). Je Geschäft gibt es nach Gabler nur einen Kostenführer; verfolgen mehrere Wettbewerber diese Strategie, wird die Konkurrenz immer unprofitabler.',
          'Die Strategien schließen einander in Porters Lesart aus. Wer beides zugleich will, landet „zwischen den Stühlen“ (stuck in the middle): Das Institute for Strategy and Competitiveness der Harvard Business School schreibt, Unternehmen, die allen Kunden alles bieten wollen, blieben in der Mitte stecken, ein Fehler, den Porter den „kiss of death“ nennt. Strategische Positionierung heißt dort, bewusst zu entscheiden, welchen Wert ein Unternehmen schafft und wie sich dieser Wert von Wettbewerbern unterscheidet, mit dem Ergebnis höherer Preise oder niedrigerer Kosten.',
        ],
      },
      {
        titel: 'Porter 1996: Positionierung, Trade-offs, Fit',
        absaetze: [
          'In „What Is Strategy?“ (1996) trennt Porter operative Effektivität von Strategie. Operative Effektivität heißt, ähnliche Aktivitäten besser auszuführen als Wettbewerber; sie ist nötig, aber nicht hinreichend, weil beste Praktiken schnell kopiert werden und die Anbieter einander angleichen. Strategie heißt, andere Aktivitäten auszuführen oder ähnliche Aktivitäten anders auszuführen. Porter nennt drei Quellen einer Position: Varietät (variety-based), eine Teilmenge von Produkten oder Leistungen; Bedürfnis (needs-based), alle Bedürfnisse einer Kundengruppe; Zugang (access-based), Kunden, die anders erreicht werden müssen, etwa in kleinen Städten.',
          'Eine Position ist nach Porter nur haltbar, wenn sie Trade-offs mit anderen Positionen erzwingt: Was für die eine Position richtig ist, schadet der anderen, wegen unvereinbarer Images, unvereinbarer Aktivitäten und begrenzter Steuerbarkeit. Das Wesen der Strategie ist für ihn die Entscheidung, was man nicht tut. Hinzu kommt der Fit: Aktivitäten müssen zur Strategie passen, einander verstärken und aufeinander abgestimmt sein. Ein solches System aus vielen abgestimmten Aktivitäten ist schwerer zu kopieren als eine einzelne Stärke.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Für eine kleine KI-Beratung mit Mittelstandskunden ist Kostenführerschaft kaum erreichbar; größere Anbieter, Offshore-Teams und Werkzeuge, die der Kunde selbst bedienen kann, sind billiger. Der haltbare Vorteil liegt in der Differenzierung mit Fokus, und Porters drei Quellen helfen beim Zuschnitt. Bedürfnisbasiert: Fertigungsbetriebe zwischen fünfzig und fünfhundert Beschäftigten, deren Anforderungen an Datenschutz, Budget und Einbindung der Belegschaft man genau kennt. Varietätsbasiert: nur Bewertung von Anwendungsfällen, Machbarkeitsnachweis und Befähigung, keine Softwareentwicklung. Zugangsbasiert: Präsenz vor Ort in einer Region, in der große Beratungen keine Büros haben.',
          'Ein Vorteil entsteht daraus erst mit Trade-offs und Fit. Trade-off: Ausschreibungen von Konzernen und reine Entwicklungsaufträge werden abgelehnt, auch wenn sie kurzfristig Umsatz brächten. Fit: Die Methodik ist dokumentiert und wiederholbar, die Beraterprofile passen zum Werkstattgespräch statt zur Vorstandspräsentation, das Preismodell (Festpreis je Assessment) passt zum Budgetverhalten der Kunden. Vertrauen aus belegten Ergebnissen, Sorgfalt beim Datenschutz und der Ruf, ehrlich abzuraten, sind schwer zu kopieren, weil sie aus vielen Aktivitäten zugleich entstehen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Der bekannteste Einwand richtet sich gegen das Entweder-oder. Kim und Mauborgne setzen mit der Wertinnovation (value innovation) gerade darauf, Differenzierung und niedrige Kosten gleichzeitig zu erreichen; Gabler beschreibt die Blue-Ocean-Strategie ausdrücklich als Infragestellung der Porterschen Lehre, wonach Erfolg außerhalb von Nischen nur als Kosten- oder Qualitätsführer möglich ist. Porter selbst räumt in „What Is Strategy?“ ein, dass Verbesserungen der operativen Effektivität Kosten und Nutzen zugleich verbessern können; sein Argument ist, dass solche Verbesserungen kein haltbarer Unterschied sind.',
          'Vorteile erodieren. Beste Praktiken verbreiten sich, Positionen werden nachgeahmt, und Kunden ändern ihre Bedürfnisse; Porter beschreibt, wie Wettbewerb um operative Effektivität zur Angleichung der Anbieter führt. Die generischen Strategien sagen außerdem nichts darüber, woher die Fähigkeit zur Differenzierung kommt; dafür braucht es die Ressourcenperspektive. Und für ein Beratungsgeschäft ist „Kostenführer“ oder „Differenzierer“ eine grobe Kategorie: Der Unterschied liegt in einzelnen Aktivitäten und ihrem Zusammenspiel, das die Wertkette sichtbar macht.',
        ],
      },
    ],
    quellen: [Q.porter1996, Q.iscPositioning, Q.gablerWettbewerbsstrategie, Q.gablerBlueOcean],
    sieheAuch: ['five-forces', 'wertkette', 'ressourcen-kernkompetenzen', 'blue-ocean', 'strategie-begriff'],
    synonyme: ['Generische Wettbewerbsstrategien', 'Kostenführerschaft', 'Differenzierungsstrategie', 'Fokusstrategie', 'Strategische Positionierung'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5 · Wertkette
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'wertkette',
    titel: 'Die Wertkette: wo Wert entsteht',
    thema: 'strategie',
    einleitung:
      'Wettbewerbsvorteile entstehen nicht im Unternehmen als Ganzem, sondern in einzelnen Tätigkeiten: beim Einkauf, in der Fertigung, im Service. Die Wertkette zerlegt ein Unternehmen in diese Tätigkeiten und zeigt, wo Kosten anfallen und wo Kunden Wert wahrnehmen.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Michael Porter führte die Wertkette (value chain) 1985 in „Competitive Advantage“ ein. Das Institute for Strategy and Competitiveness der Harvard Business School beschreibt sie als Werkzeug, um ein Unternehmen in seine strategisch relevanten Aktivitäten zu zerlegen; die Aktivitäten und die Kette, in die sie eingebettet sind, sind die Grundeinheiten des Wettbewerbsvorteils. Jede Aktivität soll als Beitrag zum Wert für den Kunden gesehen werden, nicht nur als Kostenstelle. Die Kette eines Unternehmens liegt in einem Wertsystem aus Lieferanten und Vertriebskanälen, das ebenfalls betrachtet werden muss.',
          'Nach Gabler dient die Wertkette dazu, Ansatzpunkte für Wettbewerbsvorteile zu finden, entweder durch eine günstigere Kostenposition oder durch Differenzierung gegenüber Konkurrenten. Strategie zeigt sich darin, wie die Aktivitäten konfiguriert und miteinander verknüpft sind; das Institut unterscheidet das ausdrücklich von der bloßen Übernahme bester Praktiken, die allein keinen haltbaren Vorteil schafft, weil Wettbewerber sie ebenso übernehmen können.',
        ],
      },
      {
        titel: 'Primäre und unterstützende Aktivitäten',
        absaetze: [
          'Gabler gliedert die Kette in fünf Primäraktivitäten und vier Unterstützungsaktivitäten. Primär: Eingangslogistik (Annahme und Bereitstellung der Inputs), Produktion (Umwandlung in Produkte oder Leistungen), Ausgangslogistik (Verteilung), Marketing und Vertrieb (Marktbearbeitung und Absatz) sowie Service (Unterstützung nach dem Verkauf). Unterstützend: Unternehmensinfrastruktur, Personalmanagement, Technologieentwicklung und Beschaffung, die für alle Primäraktivitäten arbeiten. Die Marge ergibt sich nach Gabler aus der Differenz zwischen dem Gesamtwert, den Kunden zu zahlen bereit sind, und den gesamten Kosten der Wertaktivitäten.',
          'Die Analyse verläuft nach Gabler in zwei Schritten: Zuerst werden die einzelnen Aktivitäten des Wertschöpfungsprozesses beschrieben, dann werden Interdependenzen, Überschneidungen und Doppelarbeiten herausgearbeitet und Synergien zwischen internen und externen Aktivitäten sichtbar gemacht. Für jede Aktivität lassen sich Kostentreiber (etwa Auslastung, Losgrößen, Lerneffekte) und Differenzierungstreiber (etwa Reaktionszeit, Qualität, Beratung) benennen. Ein Vorteil ist erst dann erklärt, wenn er einer Aktivität und einem Treiber zugeordnet ist.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Für eine KI-Beratung ist die Wertkette des Kunden ein Suchraster. Ein Hersteller von Verpackungsmaschinen mit 300 Beschäftigten will „etwas mit KI machen“. Der Rundgang durch die Kette macht daraus Kandidaten. Eingangslogistik: Lieferpapiere und Prüfzeugnisse werden manuell abgetippt, Dokumentenextraktion spart Zeit. Produktion: Sichtprüfung von Schweißnähten, Bilderkennung könnte Ausschuss früher erkennen. Vertrieb: Angebote entstehen aus alten Angeboten, ein Assistent könnte Textbausteine und Preise vorschlagen. Service: Störungsmeldungen werden am Telefon diagnostiziert, ein Assistent über Handbücher und Tickets könnte Erstdiagnosen liefern. Personal: Vorauswahl von Bewerbungen, mit rechtlicher Belastung.',
          'Die Kette hilft bei der Auswahl, nicht nur beim Sammeln. Der Serviceassistent wirkt auf einen Differenzierungstreiber (Stillstandszeit beim Kunden) und damit auf den Preis, den der Kunde zahlt; die Angebotserstellung wirkt auf einen Kostentreiber (Vertriebsaufwand je Angebot). Die Frage an den Kunden lautet dann nicht „wo ist KI möglich“, sondern „welche Aktivität, welcher Treiber, welche Wirkung auf die Marge“. Verknüpfungen zählen mit: Ein Serviceassistent nützt wenig, wenn die Technologieentwicklung die Handbücher nicht pflegt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Wertkette stammt aus der Industrie. Ihre Primäraktivitäten folgen dem Fluss von Material durch Fertigung und Auslieferung. Charles Stabell und Øystein Fjeldstad (1998) zeigten im Strategic Management Journal, dass diese Logik nur eine von dreien ist: Die Wertkette (value chain) schafft Wert, indem sie Inputs in Produkte verwandelt; der Wertshop (value shop) schafft Wert, indem er einzigartige Kundenprobleme löst, wie Beratungen, Kanzleien oder Kliniken; das Wertnetz (value network) schafft Wert, indem es Austausch zwischen Kunden vermittelt, wie Banken, Telekommunikation oder Plattformen. Für Shop und Netz entwickelten sie eigene Aktivitätskategorien, Kosten- und Werttreiber.',
          'Für eine Beratung heißt das: Die eigene Wertschöpfung ist ein Shop (Problemdiagnose, Lösungswahl, Umsetzung, Bewertung), und Porters Kette beschreibt sie schlecht. Bei Kunden mit Plattform- oder Servicegeschäft passen die neun Kästen ebenfalls nur mit Anpassung. Weitere Grenzen: Die Kette ist eine Momentaufnahme und blendet Fähigkeiten aus, die quer zu Aktivitäten liegen, etwa Datenkompetenz. Und sie beantwortet nicht, welche Aktivität ein Unternehmen selbst ausführen und welche es zukaufen sollte; dafür braucht es die Ressourcenperspektive und die Frage nach Kernkompetenzen.',
        ],
      },
    ],
    quellen: [Q.iscValueChain, Q.gablerWertkette, Q.gablerWertkettenAnalyse, Q.stabellFjeldstad1998],
    sieheAuch: ['wettbewerbsvorteil', 'business-model-canvas', 'five-forces'],
    synonyme: ['Value Chain', 'Wertschöpfungskette', 'Wertkettenanalyse', 'Wertschöpfungsketten-Analyse'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 6 · Ressourcen, Kernkompetenzen, dynamische Fähigkeiten
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ressourcen-kernkompetenzen',
    titel: 'Ressourcen, Kernkompetenzen und dynamische Fähigkeiten',
    thema: 'strategie',
    einleitung:
      'Branchenanalyse erklärt, warum eine Branche mehr oder weniger verdient, aber nicht, warum ein Unternehmen seine Konkurrenten in derselben Branche übertrifft. Dafür wechselt die Strategielehre die Blickrichtung: von außen nach innen, zu Ressourcen, Kompetenzen und der Fähigkeit, beides zu verändern.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die ressourcenorientierte Sicht (resource-based view, RBV) geht davon aus, dass Ressourcen ungleich über Unternehmen verteilt sind und diese Unterschiede über die Zeit stabil bleiben; so formuliert es Jay Barney (1991) im Journal of Management. Ressourcen sind dabei alles, was ein Unternehmen einsetzen kann: Anlagen, Daten, Patente, Beziehungen, Wissen der Beschäftigten, eingespielte Abläufe. Der Wettbewerbsvorteil entsteht nach dieser Sicht nicht aus der Wahl einer attraktiven Branche, sondern aus dem Besitz und der Nutzung von Ressourcen, die andere nicht haben und nicht leicht beschaffen können.',
          'C. K. Prahalad und Gary Hamel (1990) prägten in der Harvard Business Review den Begriff Kernkompetenz (core competence): das kollektive Lernen einer Organisation, vor allem die Fähigkeit, verschiedene Produktionsfertigkeiten zu koordinieren und Technologieströme zu integrieren. Ihr Vergleich zweier Technologiekonzerne, von denen der kleinere über gezielt aufgebaute Kompetenzen den größeren überholte, begründet drei Tests: Eine Kernkompetenz eröffnet Zugang zu einer Vielzahl von Märkten, sie trägt wesentlich zum vom Kunden wahrgenommenen Nutzen bei, und sie ist für Wettbewerber schwer zu imitieren.',
        ],
      },
      {
        titel: 'VRIN, VRIO und dynamische Fähigkeiten',
        absaetze: [
          'Barney (1991) nennt vier Merkmale, an denen sich erkennen lässt, ob eine Ressource einen dauerhaften Vorteil tragen kann: Sie muss wertvoll sein (valuable), also Chancen nutzen oder Risiken abwehren; selten (rare) unter aktuellen und möglichen Wettbewerbern; unvollkommen imitierbar (imperfectly imitable), etwa wegen ihrer Geschichte, unklarer Ursachen oder sozialer Komplexität; und nicht substituierbar (non-substitutable). Das Kürzel VRIN fasst die vier zusammen. In der heute verbreiteten Lehrbuchfassung VRIO ersetzt die Frage, ob das Unternehmen organisiert ist, um die Ressource zu nutzen, das vierte Kriterium.',
          'David Teece, Gary Pisano und Amy Shuen (1997) erweiterten die Sicht im Strategic Management Journal um dynamische Fähigkeiten (dynamic capabilities). Ihr Rahmen führt Wettbewerbsvorteile auf besondere Prozesse, die Ausstattung mit Vermögenswerten und den Entwicklungspfad eines Unternehmens zurück; ob ein Vorteil erodiert, hängt davon ab, wie stabil die Nachfrage ist und wie leicht Wettbewerber die Vermögenswerte nachbilden können. Wichtiger als Manöver gegen Rivalen sei die Fähigkeit, neue Chancen zu erkennen und die Organisation darauf auszurichten. Teece (2007) benannte die drei Bausteine: Erkennen (sensing), Ergreifen (seizing) und Umgestalten (reconfiguring).',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Sondermaschinenbauer mit 250 Beschäftigten fragt, ob er KI-Know-how im eigenen Haus aufbauen oder zukaufen soll. Die drei Tests von Prahalad und Hamel sortieren die Frage. Zugang zu Märkten: Allgemeine Kenntnisse über Sprachmodelle öffnen keinen Markt, sie stehen jedem Wettbewerber ebenfalls zur Verfügung. Kundennutzen: Der Kunde bezahlt die Verfügbarkeit seiner Maschine, nicht die Modellkompetenz des Herstellers. Imitierbarkeit: Werkzeuge und Modelle sind für alle käuflich. Generisches KI-Wissen besteht keinen der Tests und ist damit keine Kernkompetenz.',
          'Anders die Kombination aus dreißig Jahren Störungsdaten, dem Prozesswissen der Servicetechniker und der Fähigkeit, daraus Anwendungsfälle zu bewerten. Sie ist wertvoll, selten und wegen ihrer Geschichte schwer zu imitieren. Daraus folgt eine Aufteilung: Modellzugang, Werkzeuge und die erste Umsetzung werden zugekauft; Datenpflege, Bewertung von Anwendungsfällen und die Verankerung im Service werden intern aufgebaut, weil dort die dynamische Fähigkeit entsteht, das nächste Werkzeug wieder einzuordnen. Für die Beratung gilt dieselbe Logik: Ihre Kernkompetenz ist Methode und Branchenkenntnis, nicht der Zugang zu Modellen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Richard Priem und John Butler (2001) hielten der ressourcenorientierten Sicht in der Academy of Management Review vor, dass sie keine Theorie im strengen Sinn ist. Barneys Kernaussage sei tautologisch: Eine Ressource gilt als wertvoll, weil sie Vorteile bringt, und bringt Vorteile, weil sie wertvoll ist. Die Vertreter setzten stabile Produktmärkte voraus, bestimmten den Wert von Ressourcen nicht unabhängig, arbeiteten mit unscharfen Definitionen und ließen die Frage, wie Ressourcen Vorteile erzeugen, in einer Black Box. Die dynamischen Fähigkeiten antworten auf den Vorwurf der statischen Sicht, nicht auf den der Tautologie.',
          'In der Praxis ist die Messbarkeit das Problem. Ob eine Fähigkeit selten und schwer imitierbar ist, lässt sich meist erst im Nachhinein feststellen, und Unternehmen neigen dazu, jede vorhandene Stärke zur Kernkompetenz zu erklären. Die Tests helfen nur, wenn sie ehrlich und relativ zum Wettbewerb angewendet werden. Wer die Innensicht mit der Branchenanalyse verbindet, umgeht die Einseitigkeit beider: Eine seltene Fähigkeit in einer strukturell unattraktiven Branche bringt wenig, und eine attraktive Branche nützt nichts, wenn die Fähigkeiten fehlen.',
        ],
      },
    ],
    quellen: [Q.prahaladHamel1990, Q.barney1991, Q.teece1997, Q.teece2007, Q.priemButler2001],
    sieheAuch: ['wettbewerbsvorteil', 'swot-tows', 'build-vs-buy'],
    synonyme: ['Resource-based View', 'RBV', 'Kernkompetenz', 'VRIO', 'Dynamic Capabilities'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 7 · Portfolio und Wachstum
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'portfolio-wachstum',
    titel: 'Portfolio und Wachstum: BCG-Matrix und Ansoff-Matrix',
    thema: 'strategie',
    einleitung:
      'Wer mehrere Produkte, Geschäftsfelder oder Leistungen hat, muss entscheiden, wohin Geld und Aufmerksamkeit fließen und in welche Richtung das Ganze wachsen soll. Zwei alte Matrizen strukturieren diese Fragen bis heute, wenn man weiß, was sie leisten und was nicht.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die Wachstums-Marktanteils-Matrix (growth share matrix) entwickelte BCG-Gründer Bruce Henderson 1970. Sie ordnet Geschäftseinheiten nach zwei Größen: dem Marktwachstum als Ausdruck der Marktattraktivität und dem relativen Marktanteil als Ausdruck der eigenen Wettbewerbsposition. Daraus entstehen nach Gabler vier Felder: Stars (hohes Wachstum, starke Position), Cash Cows (niedriges Wachstum, starke Position), Question Marks (hohes Wachstum, schwache Position) und Dogs (niedriges Wachstum, schwache Position); BCG selbst nennt das letzte Feld heute Pets. Für jedes Feld gibt es Normstrategien, also Standardempfehlungen für die Verteilung von Geld, Sachmitteln und Personal.',
          'Die Matrix stützt sich nach Gabler auf zwei Annahmen: den Produktlebenszyklus, nach dem frühe Phasen hohes Wachstum bei hohem Investitionsbedarf bedeuten, und die Erfahrungskurve, nach der ein höherer Marktanteil eine günstigere Kostenposition und damit mehr Gewinn und Cashflow ermöglicht. Die Logik des Portfolios: Cash Cows finanzieren Question Marks, aus denen Stars werden sollen, die später selbst zu Cash Cows reifen. Nach BCG nutzte auf dem Höhepunkt, Ende der 1970er und Anfang der 1980er Jahre, etwa die Hälfte der Fortune-500-Unternehmen die Matrix oder darauf aufbauende Ansätze.',
        ],
      },
      {
        titel: 'BCGs Neubewertung und Ansoffs Wachstumsrichtungen',
        absaetze: [
          'BCG ordnete die Matrix 2014 selbst neu ein. Unternehmen stünden vor Bedingungen, die sich schneller und unvorhersehbarer ändern als je zuvor; die durchschnittliche Verweildauer einer Geschäftseinheit in einem Quadranten habe sich von vier Jahren 1992 auf unter zwei Jahre 2012 halbiert, und der Marktanteil sei kein direkter Prädiktor für dauerhafte Leistung mehr. BCG zieht daraus vier Folgerungen: den Bewertungsrhythmus beschleunigen, Erkunden und Ausschöpfen ausbalancieren (mehr Question Marks, schnelle Tests), streng auswählen und die Ökonomie des Experimentierens im Portfolio messen. Die Matrix wird damit vom Verteilungsplan zum Werkzeug für das Management von Versuchen.',
          'Igor Ansoff beschrieb 1957 in der Harvard Business Review vier Wachstumsrichtungen, die als Produkt-Markt-Matrix bekannt wurden. Eine Produkt-Markt-Strategie ist bei ihm die gemeinsame Festlegung einer Produktlinie und der Aufgaben, die diese Produkte erfüllen sollen. Marktdurchdringung (market penetration) steigert den Absatz, ohne davon abzuweichen. Marktentwicklung (market development) bringt bestehende Produkte zu neuen Aufgaben und Kunden. Produktentwicklung (product development) liefert neue Produkte für bestehende Kunden. Diversifikation (diversification) verlässt Produktlinie und Marktstruktur zugleich; sie verlangt nach Ansoff neue Fertigkeiten, Techniken und Einrichtungen und bedeutet einen Bruch mit der bisherigen Erfahrung. Gabler zufolge trägt sie das größte Risiko, weil weder Produkt- noch Markterfahrung vorliegt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine KI-Beratung mit drei Leistungen kann beide Matrizen als Denkhilfe nutzen, auch ohne Marktanteile messen zu können. Das Assessment (Bewertung von Anwendungsfällen) ist der Einstieg mit hoher Nachfrage und geringer Marge: ein Question Mark, das Folgeaufträge erzeugen soll. Der Machbarkeitsnachweis (Proof of Concept) ist das wachsende Kerngeschäft: der Star, der die besten Leute bindet. Die Schulung ist die Cash Cow: wenig Wachstum, geringe Vorbereitung, stabiler Ertrag, der die anderen Leistungen finanziert. Ein Angebot, das seit zwei Jahren niemand kauft, ist ein Pet und wird gestrichen.',
          'Ansoffs Richtungen ordnen die Wachstumsoptionen. Marktdurchdringung: mehr Assessments bei denselben Kundentypen über Empfehlungen. Marktentwicklung: dasselbe Assessment für eine zweite Branche oder Region. Produktentwicklung: eine Betriebsbegleitung nach dem Machbarkeitsnachweis für bestehende Kunden. Diversifikation: ein eigenes Softwareprodukt für eine neue Kundengruppe, mit dem größten Risiko, weil weder Produkt- noch Kundenerfahrung vorliegt. Gabler beschreibt die abnehmende Synergie entlang dieser Reihe; für eine kleine Beratung heißt das, die ersten beiden Richtungen auszuschöpfen, bevor Geld in die vierte fließt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die BCG-Matrix nimmt den Marktanteil als Stellvertreter für Kostenvorteile und Rentabilität. BCG stellt 2014 selbst fest, dass dieser Zusammenhang nicht mehr direkt gilt und dass der Anteil der Cash Cows am Gesamtgewinn 2012 um ein Viertel niedriger lag als 1982. Für kleine Anbieter ist der relative Marktanteil ohnehin nicht messbar, weil der Markt unscharf ist. Das Etikett Dog führt zu vorschneller Aufgabe von Leistungen, die anderen zuarbeiten. Und Gabler weist darauf hin, dass verschiedene Portfolio-Ansätze wegen unterschiedlicher theoretischer Bezugsrahmen zu verschiedenen Strategieempfehlungen führen.',
          'Beide Matrizen sind statisch: Sie zeigen einen Zustand, nicht die Bewegung, und sie sagen nichts über Wettbewerber, Kundenbedürfnisse oder die Fähigkeiten, die eine Richtung überhaupt gangbar machen. Ansoffs Raster benennt Richtungen und ordnet ihr Risiko, entscheidet aber nicht, welche Richtung richtig ist und wie sie umgesetzt wird. Beide Werkzeuge taugen als Sortierhilfe für ein Gespräch, nicht als Beleg für eine Entscheidung; die Priorisierung konkreter Vorhaben verlangt eigene Kriterien.',
        ],
      },
    ],
    quellen: [Q.bcg2014, Q.gablerPortfolio, Q.ansoff1957, Q.gablerAnsoff],
    sieheAuch: ['five-forces', 'business-model-canvas', 'use-case-prio'],
    synonyme: ['BCG-Matrix', 'Portfolio-Analyse', 'Ansoff-Matrix', 'Produkt-Markt-Matrix', 'Growth-Share-Matrix'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 8 · Blue Ocean
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'blue-ocean',
    titel: 'Blue Ocean Strategy: neue Märkte statt Verdrängung',
    thema: 'strategie',
    einleitung:
      'Die meisten Strategiewerkzeuge nehmen die Branche als gegeben und fragen, wie ein Unternehmen darin besser abschneidet. Die Blue Ocean Strategy stellt die Gegenfrage: Wie schafft man einen Marktraum, in dem der Vergleich mit Wettbewerbern gar nicht mehr stattfindet?',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'W. Chan Kim und Renée Mauborgne veröffentlichten das Konzept 2004 in der Harvard Business Review und 2005 als Buch. Rote Ozeane sind bestehende Branchen mit bekannten Grenzen, in denen Unternehmen um Anteile kämpfen; nach Gabler herrscht dort Verdrängungswettbewerb mit sinkenden Margen. Blaue Ozeane sind neue Markträume ohne etablierte Konkurrenz. Der Wettbewerb in überfüllten Branchen sei kein Weg zu dauerhaft hoher Leistung, schreiben die Autoren; die Chance liege im Schaffen unbestrittener Markträume. Ihr Leitbeispiel ist der Cirque du Soleil, der aus einer schrumpfenden Zirkusbranche heraus ein neues Unterhaltungsangebot schuf.',
          'Der Kern des Konzepts ist die Wertinnovation (value innovation): Differenzierung und niedrige Kosten werden gleichzeitig verfolgt, statt zwischen ihnen zu wählen. Gabler formuliert das Ziel so, dass die Wertinnovation nicht auf den Wettbewerb ausgerichtet ist, sondern darauf, ihn irrelevant zu machen. Das ist ein bewusster Gegensatz zu Porters Lehre, wonach ein Unternehmen außerhalb von Nischen entweder Kosten- oder Qualitätsführer sein muss. Blaue Ozeane entstehen dabei meist nicht aus dem Nichts, sondern aus roten Ozeanen heraus, indem Branchengrenzen verschoben werden.',
        ],
      },
      {
        titel: 'Strategiekarte und ERRC-Raster',
        absaetze: [
          'Die Strategiekarte (strategy canvas) ist nach der Beschreibung der Autoren das zentrale Diagnose- und Handlungswerkzeug. Auf der waagerechten Achse stehen die Faktoren, um die eine Branche konkurriert und in die sie investiert; die senkrechte Achse zeigt, wie viel Kunden bei jedem Faktor geboten bekommen. Die Verbindungslinie ist die Wertkurve (value curve) eines Anbieters, sein strategisches Profil. Liegen die Kurven aller Anbieter nahe beieinander, konkurriert die Branche über dieselben Faktoren, und ein Anbieter kann sich nur über den Preis abheben.',
          'Das ERRC-Raster (eliminate-reduce-raise-create grid) zwingt dazu, die Kurve zu verändern, statt sie zu verschieben. Eliminieren: Welche Faktoren, die die Branche für selbstverständlich hält, können ganz entfallen? Reduzieren: Welche Faktoren können deutlich unter den Branchenstandard gesenkt werden? Steigern: Welche Faktoren müssen weit über den Standard hinaus angehoben werden? Schaffen: Welche Faktoren, die die Branche nie geboten hat, kommen neu hinzu? Die ersten beiden Fragen senken Kosten, die letzten beiden erhöhen den Nutzen; zusammen sollen sie den Zielkonflikt zwischen Wert und Kosten aufbrechen. Gabler nennt zusätzlich das Six-Paths-Framework, das systematisch über Branchengrenzen hinweg nach neuen Markträumen sucht.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Strategiekarte für „KI-Beratung im Mittelstand“ könnte folgende Faktoren tragen: Tagessatz, Größe des Beraterteams, Seniorität, Umfang der Präsentationen, Breite der abgedeckten Technologien, Nähe zur Umsetzung, Einbindung der Mitarbeitenden des Kunden, Nachbetreuung, Preissicherheit. Die Kurven der meisten Anbieter ähneln sich: hohe Technologiebreite, umfangreiche Dokumente, Abrechnung nach Aufwand. Ein Anbieter, der sich nur über einen niedrigeren Tagessatz absetzt, bleibt im roten Ozean.',
          'Das ERRC-Raster schneidet das Angebot neu. Eliminieren: die lange Strategiestudie und das Foliendeck als Hauptergebnis. Reduzieren: die Technologiebreite auf wenige Werkzeuge, die der Kunde selbst betreiben kann. Steigern: die Nähe zur Umsetzung und die Einbindung der eigenen Beschäftigten des Kunden. Schaffen: ein Befähigungsformat mit Festpreis, nach dem der Kunde die nächsten Anwendungsfälle ohne Beratung bewertet. Ob das ein blauer Ozean ist, entscheidet nicht die Karte, sondern ob Kunden das Angebot kaufen und ob es die Kostenstruktur der Beratung tatsächlich senkt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Gabler fasst die Kritik zusammen: Das Konzept verpacke bekannte Managementideen in neue Begriffe, seine Beispiele bestätigten die Strategie nur im Nachhinein, und es gebe Gegenbeispiele in beide Richtungen: Unternehmen, die in roten Ozeanen dauerhaft erfolgreich sind, und Unternehmen, die in blauen Ozeanen scheiterten. Die Fälle wurden ausgewählt, nachdem der Erfolg feststand; über die Zahl der gescheiterten Versuche, denselben Weg zu gehen, sagt die Methode nichts.',
          'Ein blauer Ozean bleibt nicht blau. Ein neuer Marktraum, der sich als profitabel erweist, zieht nach der Logik der fünf Wettbewerbskräfte neue Anbieter an, und Wertinnovationen lassen sich nachahmen, sobald sie sichtbar sind. Die Werkzeuge liefern zudem keine Garantie: Eine neue Wertkurve ist eine Hypothese über Kundenbedürfnisse, die geprüft werden muss, bevor Kosten und Preise darauf aufgebaut werden. Für eine Beratung ist die Strategiekarte deshalb ein gutes Werkzeug, um das eigene Angebot vom Gewohnten zu lösen, aber kein Ersatz für die Prüfung, was Kunden tatsächlich zu erledigen haben.',
        ],
      },
    ],
    quellen: [Q.kimMauborgne2004, Q.bosCanvas, Q.bosErrc, Q.gablerBlueOcean],
    sieheAuch: ['five-forces', 'wettbewerbsvorteil', 'value-proposition-jtbd'],
    synonyme: ['Blue-Ocean-Strategie', 'Wertinnovation', 'Value Innovation', 'Strategy Canvas', 'ERRC-Raster'],
    unsicher: false,
  },
];
