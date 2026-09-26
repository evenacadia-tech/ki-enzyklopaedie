import type { EigenerArtikel, Quelle } from '../../typen';

// Block 1 — Was Strategie ist. Alle Quellen am 2026-09-26 abgerufen und geprüft.
const AB = '2026-09-26';
const Q = {
  porter1996: {
    titel: 'Porter — What Is Strategy? (Harvard Business Review, 1996)',
    url: 'https://hbr.org/1996/11/what-is-strategy',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStrategie: {
    titel: 'Müller-Stewens & Gillenkirch — Strategie (Gabler Wirtschaftslexikon, online)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategie-43591',
    abgerufen: AB,
  } satisfies Quelle,
  rumelt2011: {
    titel: 'Rumelt — Good Strategy Bad Strategy: The Difference and Why It Matters (Crown Currency / Penguin Random House, 2011)',
    url: 'https://www.penguinrandomhouse.com/books/208668/good-strategy-bad-strategy-by-richard-rumelt/',
    abgerufen: AB,
  } satisfies Quelle,
  rumelt2011HE: {
    titel: 'Rumelt — Good Strategy Bad Strategy, Verlagsseite Higher Education (Penguin Random House, 2011)',
    url: 'https://penguinrandomhousehighereducation.com/book/?isbn=9780307886231',
    abgerufen: AB,
  } satisfies Quelle,
  collinsPorras1996: {
    titel: "Collins & Porras — Building Your Company's Vision (Harvard Business Review, 1996)",
    url: 'https://hbr.org/1996/09/building-your-companys-vision',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStratPlanung: {
    titel: 'Müller-Stewens — Strategische Planung (Gabler Wirtschaftslexikon, online)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategische-planung-44567',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStratMgmt: {
    titel: 'Gabler Wirtschaftslexikon — Strategisches Management (Springer Gabler, online)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategisches-management-46326',
    abgerufen: AB,
  } satisfies Quelle,
  gablerGeschaeftsfeld: {
    titel: 'Weber — Geschäftsfeldstrategie (Gabler Wirtschaftslexikon, online)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/geschaeftsfeldstrategie-34376',
    abgerufen: AB,
  } satisfies Quelle,
  gablerFunktional: {
    titel: 'Gabler Wirtschaftslexikon — Funktionalstrategie (Springer Gabler, online)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/funktionalstrategie-36356',
    abgerufen: AB,
  } satisfies Quelle,
  mintzbergWaters1985: {
    titel: 'Mintzberg & Waters — Of Strategies, Deliberate and Emergent (Strategic Management Journal 6(3), 1985)',
    url: 'https://doi.org/10.1002/smj.4250060306',
    abgerufen: AB,
  } satisfies Quelle,
  mintzberg1987: {
    titel: 'Mintzberg — Crafting Strategy (Harvard Business Review, 1987)',
    url: 'https://hbr.org/1987/07/crafting-strategy',
    abgerufen: AB,
  } satisfies Quelle,
  mintzberg1987Store: {
    titel: 'Mintzberg — Crafting Strategy, Reprint 87407 (Harvard Business Review Store, 1987)',
    url: 'https://store.hbr.org/product/crafting-strategy/87407',
    abgerufen: AB,
  } satisfies Quelle,
  mintzberg1994: {
    titel: 'Mintzberg — The Fall and Rise of Strategic Planning (Harvard Business Review, 1994)',
    url: 'https://hbr.org/1994/01/the-fall-and-rise-of-strategic-planning',
    abgerufen: AB,
  } satisfies Quelle,
  lafleyMartin: {
    titel: 'Lafley & Martin — Playing to Win: How Strategy Really Works, Expanded Edition (Harvard Business Review Press, 2025)',
    url: 'https://store.hbr.org/product/playing-to-win-expanded-with-bonus-hbr-articles-how-strategy-really-works/10852',
    abgerufen: AB,
  } satisfies Quelle,
  martin2010: {
    titel: 'Martin — Five Questions to Build a Strategy (Harvard Business Review, 2010)',
    url: 'https://hbr.org/2010/05/the-five-questions-of-strategy',
    abgerufen: AB,
  } satisfies Quelle,
  martin2013: {
    titel: "Martin — Don't Let Strategy Become Planning (Harvard Business Review, 2013)",
    url: 'https://hbr.org/2013/02/dont-let-strategy-become-plann',
    abgerufen: AB,
  } satisfies Quelle,
  martin2014: {
    titel: 'Martin — The Big Lie of Strategic Planning (Harvard Business Review, 2014)',
    url: 'https://hbr.org/2014/01/the-big-lie-of-strategic-planning',
    abgerufen: AB,
  } satisfies Quelle,
  martin2014Store: {
    titel: 'Martin — The Big Lie of Strategic Planning, Reprint R1401F (Harvard Business Review Store, 2014)',
    url: 'https://store.hbr.org/product/the-big-lie-of-strategic-planning/R1401F',
    abgerufen: AB,
  } satisfies Quelle,
  ifmMittelstand: {
    titel: 'IfM Bonn — Mittelstandsdefinition des IfM Bonn (Institut für Mittelstandsforschung Bonn, online)',
    url: 'https://www.ifm-bonn.org/definitionen/mittelstandsdefinition-des-ifm-bonn',
    abgerufen: AB,
  } satisfies Quelle,
  ifmDefinitionen: {
    titel: 'IfM Bonn — Definitionen: Einheit von Eigentum und Leitung (Institut für Mittelstandsforschung Bonn, online)',
    url: 'https://www.ifm-bonn.org/definitionen',
    abgerufen: AB,
  } satisfies Quelle,
  ifmKMU: {
    titel: 'IfM Bonn — KMU-Definition des IfM Bonn (Institut für Mittelstandsforschung Bonn, online)',
    url: 'https://www.ifm-bonn.org/definitionen-/kmu-definition-des-ifm-bonn',
    abgerufen: AB,
  } satisfies Quelle,
  simon2009: {
    titel: 'Simon — Hidden Champions of the Twenty-First Century: The Success Strategies of Unknown World Market Leaders (Springer, 2009)',
    url: 'https://link.springer.com/book/10.1007/978-0-387-98147-5',
    abgerufen: AB,
  } satisfies Quelle,
  kfwFokus533: {
    titel: 'Zimmermann — Einsatz von Künstlicher Intelligenz vor allem in Unternehmen mit hohen Innovations- und Digitalisierungsaktivitäten (KfW Research, Fokus Volkswirtschaft Nr. 533, 2026)',
    url: 'https://www.kfw.de/PDF/Download-Center/Konzernthemen/Research/PDF-Dokumente-Fokus-Volkswirtschaft/Fokus-2026/Fokus-Nr.-533-Februar-2026-KI-Mittelstand.pdf',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block1: EigenerArtikel[] = [
  {
    id: 'strategie-begriff',
    titel: 'Was Strategie ist – und was nicht',
    thema: 'strategie',
    einleitung:
      'Das Wort „Strategie“ fällt in fast jedem Meeting, meist ohne dass klar ist, was gemeint ist. Wer den Begriff sauber abgrenzen kann, erkennt schneller, ob ein Papier eine Strategie enthält oder nur Ziele auflistet.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Das Gabler Wirtschaftslexikon definiert Strategie als „die grundsätzliche, langfristige Verhaltensweise (Maßnahmenkombination) der Unternehmung und relevanter Teilbereiche gegenüber ihrer Umwelt zur Verwirklichung der langfristigen Ziele“. Drei Elemente dieser Definition tragen die Last: Strategie ist eine Verhaltensweise, also ein Bündel von Maßnahmen und kein Wunsch; sie ist langfristig angelegt; und sie richtet das Unternehmen gegenüber seiner Umwelt aus, also gegenüber Kunden, Wettbewerbern und Lieferanten. Die Ziele selbst gehören nicht zur Strategie, sondern sind ihr Zweck.',
          'Michael Porter (1996) grenzt Strategie von operativer Effektivität (operational effectiveness) ab. Operative Effektivität heißt, ähnliche Tätigkeiten besser auszuführen als die Konkurrenz: schneller produzieren, weniger Ausschuss, geringere Kosten. Das ist notwendig, aber jeder Wettbewerber kann dieselben Methoden übernehmen, sodass Vorsprünge wieder verschwinden. Strategie dagegen ist nach Porter „the creation of a unique and valuable position, involving a different set of activities“: eine einzigartige Position, die auf anderen Tätigkeiten beruht als bei den Konkurrenten, nicht auf denselben Tätigkeiten in besserer Ausführung.',
        ],
      },
      {
        titel: 'Trade-offs, Fit und der Kern guter Strategie',
        absaetze: [
          'Porter nennt zwei Merkmale, die eine Position verteidigbar machen. Erstens Trade-offs, also bewusste Verzichte: Wer eine Position wählt, kann eine andere nicht gleichzeitig besetzen, weil die Tätigkeiten unvereinbar sind oder unterschiedliche Fähigkeiten verlangen. „The essence of strategy is choosing what not to do.“ Zweitens Fit, das Zusammenpassen der Tätigkeiten: Sie sind konsistent mit der Gesamtstrategie, verstärken einander und werden gemeinsam optimiert. Ein Nachahmer müsste das ganze System kopieren, nicht eine einzelne Praktik. Porter unterscheidet drei Quellen einer Position: bestimmte Produktvarianten (variety-based), alle Bedürfnisse einer Kundengruppe (needs-based) und der Zugang zu bestimmten Kunden (access-based).',
          'Richard Rumelt (2011) beschreibt in „Good Strategy Bad Strategy“ den Kern (kernel) guter Strategie mit drei Bausteinen: einer Diagnose (diagnosis), die das eigentliche Problem oder Hindernis benennt; einer Leitlinie (guiding policy), die den grundsätzlichen Ansatz zum Umgang mit diesem Hindernis festlegt; und einem Satz kohärenter Maßnahmen (coherent action), die auf die Leitlinie einzahlen und einander stützen. Gute Strategie ist für Rumelt „a specific and coherent response to—and approach for—overcoming the obstacles to progress“. Ohne Diagnose fehlt der Bezug zum Problem, ohne Kohärenz verteilen sich die Kräfte.',
          'Schlechte Strategie erkennt Rumelt an typischen Kennzeichen: Wortgeklingel (fluff), also Fachvokabular ohne Aussage; Werte, Slogans und Finanzziele, die als Strategie ausgegeben werden; und Bündel von Initiativen, die einander widersprechen und mehrere unvereinbare Interessen gleichzeitig bedienen sollen. Eine Umsatzvorgabe oder eine Liste von Ambitionen sagt nichts darüber, welches Hindernis im Weg steht und wie es überwunden werden soll.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Maschinenbauer mit rund 200 Beschäftigten legt der Beratung sein „Strategiepapier“ vor: Umsatz deutlich steigern, Digitalisierung vorantreiben, KI einsetzen, Mitarbeiter binden. Nach Rumelt sind das Ziele und Wünsche, keine Strategie, weil keine Diagnose dahintersteht. Die Beratung fragt deshalb zuerst nach dem Hindernis: Verliert das Unternehmen Aufträge wegen langer Angebotszeiten? Bindet der Service zu viel Ingenieurkapazität? Erst wenn die Diagnose steht, lässt sich eine Leitlinie ableiten, etwa die Angebotserstellung zu beschleunigen, und erst daraus folgt, welche KI-Anwendung überhaupt sinnvoll ist.',
          'Im Meeting hilft Porters Abgrenzung, Diskussionen einzuordnen. Spricht die Geschäftsführung des Kunden über Prozessoptimierung, Automatisierung einzelner Arbeitsschritte oder Kostensenkung, geht es um operative Effektivität. Erst wenn die Frage lautet, welche Kunden das Unternehmen künftig nicht mehr bedienen will oder welche Tätigkeiten es anders ausführt als die Wettbewerber, wird über Strategie im Sinne Porters gesprochen. Beide Ebenen sind legitim, dürfen aber nicht verwechselt werden, weil operative Verbesserungen allein keinen dauerhaften Vorsprung sichern.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Der häufigste Fehler ist der Zielkatalog, der als Strategie ausgegeben wird: Wachstum, Marktführerschaft, Kundenzufriedenheit. Rumelt zählt genau diese Verwechslung von Zielen mit Strategie zu den Kennzeichen schlechter Strategie. Ebenso verbreitet ist die Wunschliste, in der jede Abteilung ihre Initiative unterbringt, ohne dass ein Trade-off entschieden wird. Porter beschreibt dazu die Wachstumsfalle: Unternehmen dehnen Produktlinien aus, versuchen mehrere Positionen gleichzeitig zu besetzen (straddling) und verwässern damit die Position, die sie einzigartig machte. „Strategie gleich Wachstum“ ist deshalb keine Strategie, sondern die Abwesenheit einer Entscheidung.',
          'Beide Modelle haben Grenzen. Porters Aufsatz beschreibt, woran eine verteidigbare Position zu erkennen ist; seine Beispiele sind Großunternehmen wie Fluggesellschaften und Möbelhäuser, und wie ein kleines Unternehmen eine solche Position findet, bleibt offen. Rumelts Kern ist ein Prüfraster, kein Verfahren: Er zeigt, ob eine Strategie die drei Bausteine enthält, aber die Diagnose selbst verlangt Branchenkenntnis, die kein Raster ersetzt. Für den Einstieg reicht der Prüfblick: Steht hinter dem Papier eine Diagnose, eine Entscheidung gegen etwas und ein kohärentes Maßnahmenbündel?',
        ],
      },
    ],
    quellen: [Q.porter1996, Q.gablerStrategie, Q.rumelt2011, Q.rumelt2011HE],
    sieheAuch: ['strategie-ebenen', 'strategie-entstehung', 'playing-to-win', 'wettbewerbsvorteil'],
    synonyme: ['Strategiebegriff', 'operative Effektivität', 'Good Strategy Bad Strategy', 'Trade-off'],
    unsicher: false,
  },
  {
    id: 'strategie-ebenen',
    titel: 'Vision, Mission, Ziele: die Ebenen der Strategie',
    thema: 'strategie',
    einleitung:
      'In Strategiegesprächen fallen Vision, Mission, Leitbild und Ziele oft im selben Atemzug, dazu Unternehmens-, Geschäftsfeld- und Funktionalstrategie. Wer die Ebenen auseinanderhält, versteht, worüber gerade entschieden wird.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Das Gabler Wirtschaftslexikon beschreibt strategische Planung als institutionalisierten Prozess, „um zu entscheiden, in welche Richtung sich ein Unternehmen (oder ein Teilbereich des Unternehmens) entwickeln soll“. Dieser Prozess läuft auf mehreren Ebenen. Die Unternehmensleitung gibt den Rahmen für das Gesamtunternehmen vor, und zwar in Form von Mission, Werten, Vision und Zielen. Darauf aufbauend entwickeln die strategischen Geschäftseinheiten, also die einzelnen Geschäftsfelder mit eigenem Markt und eigenen Wettbewerbern, ihre Geschäftsstrategien. Die Ebenen sind hierarchisch: Was oben festgelegt wird, bindet die Entscheidungen darunter.',
          'In der Lehre heißen die drei Ebenen Unternehmensstrategie (corporate strategy), Geschäftsfeldstrategie (business strategy) und Funktionalstrategie (functional strategy). Auf der Unternehmensebene wird nach Gabler entschieden, welche langfristigen Ziele verfolgt werden und in welchen Geschäftsfeldern das Unternehmen tätig sein will. Die Geschäftsfeldstrategie ist „Teil der strategischen Planung“ und füllt „im Zusammenspiel mit den funktionalen Strategien die Wettbewerbsstrategien eines Unternehmens aus“: Sie legt fest, mit welchen Maßnahmen ein Geschäftsfeld gegen seine Wettbewerber besteht. Die Funktionalstrategie trifft Aussagen zu den Strategien der betriebswirtschaftlichen Funktionen wie Beschaffung, Absatz, Produktion und Distribution.',
        ],
      },
      {
        titel: 'Vision, Mission und Ziele nach Collins und Porras',
        absaetze: [
          'Jim Collins und Jerry Porras (1996) ordnen die oberste Ebene in zwei Teile. Die Kernideologie (core ideology) besteht aus Kernwerten (core values), den wenigen Grundsätzen, die das Unternehmen unabhängig vom Marktumfeld gelten lässt, und dem Kernzweck (core purpose), dem Grund, warum es das Unternehmen über das Geldverdienen hinaus gibt. Die angestrebte Zukunft (envisioned future) besteht aus einem großen, kühnen Ziel (Big Hairy Audacious Goal, BHAG), das weit über den üblichen Planungshorizont hinausreicht, und einer lebendigen Beschreibung (vivid description), wie das Unternehmen aussieht, wenn dieses Ziel erreicht ist.',
          'Der Kernsatz der Autoren: „Companies that enjoy enduring success have a core purpose and core values that remain fixed while their strategies and practices endlessly adapt to a changing world.“ Die Kernideologie bleibt fest, während Strategien und Praktiken sich ständig ändern. Das ordnet die Begriffe: Mission und Werte beschreiben, was gleich bleibt; die Vision beschreibt den angestrebten Zustand; Ziele übersetzen die Vision in messbare Etappen; Strategien legen den Weg fest und dürfen wechseln. Das Gabler-Lexikon nennt als zentrale Fragen des strategischen Managements nacheinander die langfristigen Ziele, die Geschäftsfelder, die Maßnahmen im Wettbewerb, die Kernfähigkeiten und die Umsetzung.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Im Mittelstand fallen die Ebenen häufig zusammen. Ein Zulieferer mit einem einzigen Geschäftsfeld hat keine getrennte Unternehmens- und Geschäftsfeldstrategie; die Inhaberin entscheidet beides in einer Person, und Funktionalstrategien für Vertrieb oder Produktion existieren oft nur als Gewohnheit der jeweiligen Abteilungsleiter. Für die KI-Beratung ist das wichtig, weil eine KI-Initiative fast immer eine Funktionalstrategie ist: Sie betrifft den Vertrieb, den Service oder die Fertigung und muss an die darüberliegende Ebene anschließen. Fehlt dort eine ausgesprochene Geschäftsstrategie, muss die Beratung sie im Gespräch rekonstruieren: Womit gewinnt das Unternehmen heute Aufträge, und was darf die KI-Anwendung daran nicht beschädigen?',
          'Ein Beispiel: Ein Elektronikfertiger will „mit KI die Qualitätskontrolle automatisieren“. Auf der Funktionsebene ist das eine klare Aufgabe. Die Frage der Geschäftsfeldebene lautet, ob das Unternehmen im Wettbewerb über den Preis oder über Zuverlässigkeit gewinnt; davon hängt ab, ob die Anwendung Kosten senken oder Fehlerquoten auf ein Niveau bringen soll, das Wettbewerber nicht erreichen. Die Unternehmensebene fragt, ob der Fertiger dieses Geschäftsfeld überhaupt ausbauen will. Werden diese Ebenen nicht angesprochen, wird die Technik richtig gebaut, aber am Bedarf vorbei.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Der erste Fehler ist die Vision als Marketing-Floskel: ein Satz aus „Innovation“, „Nachhaltigkeit“ und „Partnerschaft“, der auf jedes Unternehmen passt. Nach Collins und Porras muss die Kernideologie ausdrücken, wofür das Unternehmen tatsächlich steht, und die angestrebte Zukunft ein konkretes Ziel mit greifbarer Beschreibung enthalten; ein austauschbarer Satz erfüllt keine der beiden Anforderungen. Der zweite Fehler sind Ziele ohne Strategie: Das Unternehmen setzt eine Umsatzvorgabe, ohne dass die Geschäftsfeldstrategie sagt, mit welchen Maßnahmen im Wettbewerb bestanden werden soll. Das Gabler-Lexikon stellt die Frage nach den langfristigen Maßnahmen ausdrücklich neben die Frage nach den Zielen; beide müssen beantwortet sein.',
          'Die Hierarchie selbst hat Grenzen. Sie stellt Strategie so dar, als entstünde sie von oben nach unten: erst Vision, dann Geschäftsstrategie, dann Funktion. Collins und Porras betonen jedoch, dass Strategien und Praktiken sich fortlaufend anpassen, während nur die Kernideologie fest bleibt. Die saubere Ableitung ist deshalb eine Darstellungsform, kein Ablauf. Das Modell hilft, Aussagen einzuordnen; wie Strategie tatsächlich zustande kommt, beschreibt der Artikel über geplante und emergente Strategie.',
        ],
      },
    ],
    quellen: [Q.collinsPorras1996, Q.gablerStratPlanung, Q.gablerStratMgmt, Q.gablerGeschaeftsfeld, Q.gablerFunktional],
    sieheAuch: ['strategie-begriff', 'ziele-okr', 'balanced-scorecard', 'strategieprozess-7s'],
    synonyme: ['Vision', 'Mission', 'Leitbild', 'Strategieebenen', 'Unternehmensstrategie'],
    unsicher: false,
  },
  {
    id: 'strategie-entstehung',
    titel: 'Geplant oder emergent: wie Strategie wirklich entsteht',
    thema: 'strategie',
    einleitung:
      'Strategiepapiere erwecken den Eindruck, Strategie werde am Schreibtisch entworfen und dann umgesetzt. Wer in Meetings sitzt, sieht etwas anderes: Strategie zeigt sich in dem, was ein Unternehmen tatsächlich tut.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Henry Mintzberg und James Waters (1985) definieren Strategie als „a pattern in a stream of decisions“, also als Muster in einem Strom von Entscheidungen, später von Handlungen. Damit lässt sich beobachten, was ein Unternehmen tatsächlich tut, unabhängig davon, was es verkündet. Die Autoren unterscheiden die beabsichtigte Strategie (intended strategy) von der realisierten Strategie (realized strategy). Wo beide übereinstimmen, sprechen sie von deliberater, also bewusst geplanter Strategie (deliberate strategy). Absichten, die nie umgesetzt werden, bleiben unrealisiert (unrealized strategy). Muster, die sich ohne oder gegen eine Absicht einstellen, nennen sie emergente Strategie (emergent strategy).',
          'Deliberat und emergent sind nach Mintzberg und Waters „two ends of a continuum along which real-world strategies lie“. Eine vollkommen deliberate Strategie verlangt präzise, von allen geteilte Absichten und ein Umfeld, das nichts dazwischenfunkt; eine vollkommen emergente verlangt Konsistenz im Handeln ohne jede Absicht. Beides kommt in Reinform kaum vor. Dazwischen liegen Typen wie die geplante, die unternehmerische (entrepreneurial), die ideologische, die Schirm- (umbrella), die Prozess-, die Konsens- und die auferlegte (imposed) Strategie. Reale Strategie ist fast immer eine Mischung aus Absicht und Anpassung.',
        ],
      },
      {
        titel: 'Handwerk statt Plan: Mintzberg 1987 und 1994',
        absaetze: [
          'In „Crafting Strategy“ (1987) vergleicht Mintzberg die Strategiebildung mit dem Handwerk eines Töpfers: Manager brauchen „an intuitive understanding of the organization, a feel for the business not unlike a potter\'s feel for the clay“. Strategie ist nicht nur ein Plan für die Zukunft, sondern auch ein Muster aus der Vergangenheit; sie entsteht auch dadurch, dass Organisationen auf ihre Märkte reagieren und dabei Neues hervorbringen. Die Aufgabe der Führung besteht deshalb ebenso darin, entstehende Muster zu erkennen, wie darin, neue zu entwerfen.',
          'In „The Fall and Rise of Strategic Planning“ (1994) beschreibt Mintzberg, wie strategische Planung seit den sechziger Jahren versprach, Strategie durch die Trennung von Denken und Handeln und durch eine eigene Stabsfunktion zu erzeugen. Sein Befund: „Strategic planning isn\'t strategic thinking. One is analysis, and the other is synthesis.“ Planung zerlegt Ziele in Schritte und Budgets; strategisches Denken verbindet Intuition, Kreativität und Erfahrung zu einer Gesamtsicht. Planung, wie sie praktiziert wurde, war für ihn „strategic programming“: die Ausformulierung von Strategien, die bereits existierten.',
          'Mintzberg benennt drei Fehlannahmen der Planung. Die Fallacy of Prediction unterstellt, die Welt halte still, während geplant wird, und folge danach dem vorhergesagten Kurs. Die Fallacy of Detachment unterstellt, Strategen könnten sich von dem Geschäft lösen, über das sie entscheiden, und aus Berichten heraus planen. Die Fallacy of Formalization unterstellt, der Prozess der Strategiebildung lasse sich in ein formales System pressen. Zusammen ergeben sie, was Mintzberg den großen Trugschluss (grand fallacy) nennt: die Gleichsetzung von Planung mit Strategiebildung. Planer behalten eine Rolle: Daten liefern, Manager beim strategischen Denken unterstützen und die Vision ausformulieren, aber nicht die Strategie erfinden.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Für die Beobachtung in Kundenmeetings folgt daraus eine einfache Regel: Nicht das Strategiepapier verrät die Strategie, sondern das Muster der Entscheidungen. Ein Metallverarbeiter, dessen Leitbild „Premiumqualität“ verspricht, aber seit Jahren jeden Preisauftrag annimmt, verfolgt realisiert eine Volumenstrategie, gleich, was auf dem Papier steht. Wer im Meeting mitschreibt, sollte deshalb festhalten, welche Aufträge angenommen und abgelehnt werden, wofür Geld ausgegeben wird und welche Themen die Inhaberin immer wieder aufgreift. Aus diesen Mustern lässt sich die realisierte Strategie rekonstruieren.',
          'Für die KI-Beratung selbst gilt dasselbe. Ihre realisierte Strategie ist die Summe der Projekte, die sie angenommen hat, nicht der Satz auf der Website. Kommen die meisten Anfragen aus dem Maschinenbau und nimmt die Beratung sie an, ist eine Branchenfokussierung emergent entstanden. Mintzbergs Rat lautet, solche Muster bewusst wahrzunehmen und dann zu entscheiden, ob sie zur Strategie erklärt oder korrigiert werden. Das ist die handwerkliche Haltung aus „Crafting Strategy“: Muster erkennen, nicht nur Pläne schreiben.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Der Ansatz hat Grenzen, die Mintzberg und Waters selbst benennen: Emergenz ist kein Freibrief für Planlosigkeit. Ohne jede Konsistenz im Handeln gibt es keine Strategie, sondern nur unverbundene Aktionen. Emergente Muster können auch schlecht sein, etwa die stille Preisstrategie im Beispiel, und sie sind erst im Nachhinein erkennbar, wenn Ressourcen bereits gebunden sind. Mintzberg wendet sich zudem nicht gegen Planung als solche, sondern gegen ihre Verwechslung mit Strategiebildung; Budgets, Zeitpläne und die Ausformulierung einer Strategie bleiben nötig. Wer nur beobachtet, was entsteht, verzichtet darauf, eine Richtung zu setzen, die sich von allein nicht einstellen würde.',
        ],
      },
    ],
    quellen: [Q.mintzbergWaters1985, Q.mintzberg1987, Q.mintzberg1987Store, Q.mintzberg1994],
    sieheAuch: ['strategie-begriff', 'strategieprozess-7s', 'szenarioplanung'],
    synonyme: ['emergente Strategie', 'deliberate Strategie', 'Crafting Strategy', 'Mintzberg'],
    unsicher: false,
  },
  {
    id: 'playing-to-win',
    titel: 'Playing to Win: fünf Fragen, eine Strategie',
    thema: 'strategie',
    einleitung:
      'Viele Strategiedokumente sind Pläne mit Zeitachse und Budget. Das Modell von Lafley und Martin zwingt stattdessen zu fünf Entscheidungen, die zusammenpassen müssen, und macht sichtbar, wo ein Unternehmen keine getroffen hat.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'A. G. Lafley und Roger Martin (2013) fassen in „Playing to Win“ Strategie als Satz von fünf zusammenhängenden Entscheidungen (five integrated and essential strategic choices). Erstens: Was ist unser Gewinnanspruch (winning aspiration), also wofür will das Unternehmen im Wettbewerb gewinnen? Zweitens: Wo spielen wir (where to play), also in welchen Märkten, Kundengruppen, Regionen und Leistungsarten? Drittens: Wie gewinnen wir dort (how to win), also mit welchem Vorteil gegenüber den Wettbewerbern? Viertens: Welche Fähigkeiten (capabilities) brauchen wir dafür? Fünftens: Welche Managementsysteme (management systems) halten diese Fähigkeiten aufrecht?',
          'Die Autoren beschreiben Strategie als schwer, nicht als komplex: „Strategy is not complex. But it is hard.“ Schwer ist sie, weil sie Entscheidungen verlangt, die Optionen abschneiden. Roger Martin (2010) hatte die fünf Fragen bereits als Kaskade beschrieben: Jede Antwort schränkt die nächste ein, und die Antworten müssen zueinander passen. Wer sagt, er spiele überall und gewinne mit allem, hat keine Entscheidung getroffen. Der Gewinnanspruch ohne Spielfeld ist ein Wunsch, das Spielfeld ohne Gewinnlogik eine Marktliste, die Gewinnlogik ohne Fähigkeiten eine Behauptung.',
        ],
      },
      {
        titel: 'Plan ist nicht Strategie: Martin 2014',
        absaetze: [
          'In „The Big Lie of Strategic Planning“ (2014) beschreibt Martin, warum Führungskräfte Strategie durch Planung ersetzen. Strategie zwingt sie, sich mit einer Zukunft zu befassen, die sie nur erraten können: „choosing a strategy entails making decisions that explicitly cut off possibilities and options“. Planung fühlt sich sicherer an, weil sie mit Kosten arbeitet, und Kosten kontrolliert das Unternehmen selbst. Umsatz dagegen entscheiden die Kunden: „Planning can\'t make revenue magically appear.“ Ein Plan, der Initiativen, Zeitrahmen und Budgets auflistet, mag genauere Budgets ergeben, darf aber nicht mit Strategie verwechselt werden.',
          'Martin nennt das die Komfortfalle: Wer sich mit seiner Strategie vollkommen wohlfühlt, steckt wahrscheinlich in der Planung fest. Als Ausweg empfiehlt er, die Kunden statt der eigenen Ressourcen in den Mittelpunkt zu stellen, Strategie als Wette mit unsicherem Ausgang anzuerkennen und die Logik hinter jeder Entscheidung offenzulegen, damit sie später überprüft werden kann. Schon 2013 hatte er beschrieben, wie Strategie in vielen Unternehmen „as a long list of initiatives with timeframes associated and resources assigned“ auftritt, also als Maßnahmenliste, und dass diese Liste die eigentliche Entscheidung ersetzt, statt sie auszudrücken.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine kleine KI-Beratung kann die Kaskade auf sich selbst anwenden. Gewinnanspruch: der bevorzugte Partner für KI-Einführung in einem bestimmten Kundenkreis sein, nicht die größte Beratung. Wo spielen: welche Branchen (etwa Maschinenbau und Zulieferer), welche Unternehmensgröße (inhabergeführt, unterhalb der Schwelle, ab der Konzernberatungen interessiert sind), welche Leistungsart (Strategie und Auswahl statt Softwareentwicklung). Wie gewinnen: durch Branchenkenntnis und direkten Zugang zur Inhaberin, nicht über den Preis. Fähigkeiten: Verständnis der Fertigungsprozesse, saubere Bewertung von KI-Anwendungsfällen. Managementsysteme: eine Routine, mit der jede Anfrage gegen das gewählte Spielfeld geprüft wird.',
          'Die Probe ist die Ablehnung. Stellt ein großes Handelsunternehmen eine Anfrage, zeigt sich, ob „wo spielen“ eine Entscheidung war: Eine Beratung, die jede Anfrage annimmt, hat kein Spielfeld gewählt. Dasselbe gilt für den Kunden: Ein Maschinenbauer, der KI „überall“ einsetzen will, hat die Frage nach dem Spielfeld nicht beantwortet. Die Beratung kann die fünf Fragen deshalb als Gesprächsleitfaden nutzen, um zu prüfen, ob hinter dem Wunsch nach KI eine Gewinnlogik steht, in die die Technik einzahlen soll.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das Modell stammt aus der Konsumgüterindustrie; Lafley war Vorstandsvorsitzender von Procter & Gamble, und die Beispiele des Buchs sind Marken dieses Konzerns. Ob sich die Erfahrung eines Konzerns mit Markenportfolio auf ein Unternehmen mit einem Geschäftsfeld übertragen lässt, muss der Anwender selbst prüfen. Die fünf Fragen sind zudem ein Raster, keine Methode: Sie sagen, was entschieden werden muss, nicht, woher die Antworten kommen. Woher ein Unternehmen weiß, wo es gewinnen kann, verlangt Marktanalyse und Fähigkeiten, die das Modell voraussetzt. Martins Warnung vor der Komfortfalle gilt schließlich auch für die Kaskade selbst: Fünf sauber ausgefüllte Felder sind noch keine Wette mit Risiko, wenn die Antworten so allgemein bleiben, dass sie nichts ausschließen.',
        ],
      },
    ],
    quellen: [Q.lafleyMartin, Q.martin2010, Q.martin2013, Q.martin2014, Q.martin2014Store],
    sieheAuch: ['strategie-begriff', 'wettbewerbsvorteil', 'ressourcen-kernkompetenzen', 'segmentierung-positionierung'],
    synonyme: ['Playing to Win', 'Strategy Choice Cascade', 'Where to Play', 'How to Win', 'Lafley & Martin'],
    unsicher: false,
  },
  {
    id: 'strategie-mittelstand',
    titel: 'Strategie im Mittelstand: Inhaberführung und Hidden Champions',
    thema: 'strategie',
    einleitung:
      'Die Kunden einer kleinen KI-Beratung sind meist mittelständische, inhabergeführte Unternehmen. Wer versteht, was Inhaberführung für Entscheidungen bedeutet und welche Strategien erfolgreiche Mittelständler auszeichnen, führt bessere Gespräche.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Das Institut für Mittelstandsforschung (IfM) Bonn definiert Mittelstand nicht über die Größe, sondern qualitativ über die Einheit von Eigentum und Leitung. Operationalisiert heißt das: Bis zu zwei natürliche Personen oder ihre Familienangehörigen halten direkt oder indirekt mindestens 50 % der Anteile, und diese Personen gehören der Geschäftsführung an. Kennzeichnend ist nach dem IfM, dass der Unternehmer „einen maßgeblichen persönlichen Einfluss ausübt, das unternehmerische Risiko trägt und das Unternehmen seine persönliche Erwerbs- und Existenzgrundlage sichert“. Die Begriffe Mittelstand, Familienunternehmen, Eigentümerunternehmen und familiengeführte Unternehmen behandelt das IfM als Synonyme.',
          'Davon zu trennen ist die quantitative Abgrenzung der kleinen und mittleren Unternehmen (KMU). Nach der KMU-Definition des IfM Bonn zählen Unternehmen mit weniger als 500 Beschäftigten und bis zu 50 Mio. Euro Jahresumsatz zu den KMU; die EU-Kommission zieht die Beschäftigtengrenze bei 250. Mittelstand und KMU sind keine Synonyme: Ein inhabergeführtes Unternehmen mit 500 und mehr Beschäftigten oder mehr als 50 Mio. Euro Umsatz zählt weiter zum Mittelstand, ein kleines Unternehmen, das von einem anderen Unternehmen abhängt, dagegen nicht. Für die Beratung ist die qualitative Definition die wichtigere, weil sie beschreibt, wer entscheidet.',
        ],
      },
      {
        titel: 'Inhaberführung und Hidden Champions',
        absaetze: [
          'Was folgt aus der Einheit von Eigentum und Leitung für Strategie? Die Person, die entscheidet, trägt das Risiko und lebt vom Unternehmen. Entscheidungen laufen deshalb nicht über Gremien, sondern über eine oder zwei Personen, und Strategie ist an deren Urteil und Erfahrung gebunden. Das IfM nennt als prägende qualitative Merkmale des Mittelstands die Geschäftsführung, die Eigentumsverhältnisse und die wirtschaftliche Unabhängigkeit; Unabhängigkeit bedeutet auch, dass kein Mutterkonzern Kapital nachschießt, wenn eine Investition scheitert. Personenabhängigkeit, Risikotragung mit eigenem Vermögen und knappe Mittel prägen daher jede strategische Entscheidung.',
          'Hermann Simon, der diese Unternehmen nach eigener Angabe seit über zwanzig Jahren untersucht, beschreibt die erfolgreichsten unter ihnen in „Hidden Champions of the Twenty-First Century“ (2009) als Hidden Champions: mittelgroße, öffentlich kaum bekannte Unternehmen mit einem Jahresumsatz unter vier Milliarden US-Dollar, die in ihrer Branche Weltmarktführer geworden sind. Als gemeinsame Muster nennt die Verlagsbeschreibung die Konzentration auf Kernfähigkeiten (focusing on core capabilities), echten Nutzen für den Kunden und langfristige Kundenbeziehungen, fortlaufende Innovation, leistungsbezogene Vergütung, dezentrale Organisation und eine weltweite Präsenz; Simon untersucht ausdrücklich, wie die Globalisierung diesen Unternehmen zu ihrem internationalen Erfolg verhilft.',
          'Für Simon bilden die Hidden Champions ein Gegenmodell zu kurzsichtigen Praktiken großer Konzerne: Gutes Management heißt nach seiner Beschreibung, viele kleine Dinge besser zu machen als der Wettbewerb, leise, mit Entschlossenheit und Ausdauer, und viele dieser Unternehmen halten ihre Führungsposition über Generationen. Konzentration auf Kernfähigkeiten, Nähe zum Kunden und weltweite Präsenz gehören in dieser Beschreibung zusammen; sie sind keine Alternativen, zwischen denen ein Unternehmen wählt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Für eine KI-Beratung heißt das: Der Gesprächspartner ist häufig die Inhaberin oder der Inhaber selbst, nicht eine Fachabteilung mit Budgetantrag. Entscheidungen fallen schnell, oft im ersten oder zweiten Termin, und sie fallen mit eigenem Geld. Dieselbe Person kann ein Projekt ebenso schnell beenden. Die Beratung sollte deshalb nicht mit Foliensätzen für ein Gremium arbeiten, sondern mit einer Diagnose, die die Inhaberin in ihrem eigenen Betrieb wiedererkennt, und mit einem Vorschlag, dessen Risiko sie selbst einschätzen kann.',
          'Zugleich sind die Mittel knapp. KfW Research zeigt anhand des KfW-Mittelstandspanels 2025, dass im Zeitraum 2022 bis 2024 20 % der mittelständischen Unternehmen Künstliche Intelligenz genutzt haben, ein Anstieg auf das Fünffache gegenüber 2016 bis 2018; große Mittelständler mit 50 und mehr Beschäftigten kommen auf 36 %, Unternehmen mit unter fünf Beschäftigten auf 19 %. Als Hemmnisse nennt die Studie fehlende Fachkräfte und Kompetenzen, begrenzte zeitliche Ressourcen, unzureichende Datengrundlagen sowie Bedenken hinsichtlich Sicherheit, Reife und Zuverlässigkeit der Systeme; erfolgreiche KI-Nutzung setzt einen hohen digitalen Reifegrad voraus. Ein Vorschlag, der Datenpflege, Schulung und die Zeit der Inhaberin ignoriert, scheitert genau daran.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die qualitativen Merkmale des Mittelstands lassen sich nach dem IfM aus der amtlichen Statistik nur unzureichend ablesen; seine Bedeutung wird deshalb hilfsweise über die KMU-Daten geschätzt. Wer im Gespräch „Mittelstand“ sagt, sollte wissen, ob Größe oder Eigentümerstruktur gemeint ist. Simons Hidden Champions beschreiben eine Auslese von Weltmarktführern; ihre Merkmale sind keine Rezepte für jeden Zulieferer, und die Beschreibung der Erfolgreichen sagt nichts über die, die ähnlich handelten und scheiterten. Inhaberführung hat zudem eine Kehrseite: Die kurzen Wege gelten auch für Entscheidungen gegen ein Projekt, und wo Strategie an einer Person hängt, wechselt sie mit dieser Person.',
        ],
      },
    ],
    quellen: [Q.ifmMittelstand, Q.ifmDefinitionen, Q.ifmKMU, Q.simon2009, Q.kfwFokus533],
    sieheAuch: ['oekosystem-de', 'ki-strategie', 'beratungsunternehmen', 'wettbewerbsvorteil'],
    synonyme: ['Mittelstand', 'Hidden Champions', 'Inhaberführung', 'Familienunternehmen', 'KMU'],
    unsicher: false,
  },
];
