import type { EigenerArtikel, Quelle } from '../../typen';

// Block 4 — Umsetzen und messen. Alle Quellen am 2026-09-26 abgerufen und geprüft.
// Hinweis zu zwei URLs: Die McKinsey-Seite „Enduring Ideas: The 7-S Framework“ war von
// dieser Maschine nicht erreichbar (Timeout) und wurde deshalb nicht aufgenommen; der
// 7-S-Aufsatz ist über den Volltext auf der Autorenseite tompeters.com belegt, weil
// ScienceDirect automatisierte Abrufe sperrt (DOI im Quellentitel).
const AB = '2026-09-26';
const Q = {
  // Artikel 1 — Ziele
  whatmattersOkr: {
    titel: 'Panchadsaram — What is an OKR? Definition and Examples (What Matters, o. J.)',
    url: 'https://www.whatmatters.com/faqs/okr-meaning-definition-example',
    abgerufen: AB,
  } satisfies Quelle,
  whatmattersSmart: {
    titel: "Head — OKRs and SMART goals: What's the Difference? (What Matters, o. J.)",
    url: 'https://www.whatmatters.com/resources/okrs-smart-goals-difference-between',
    abgerufen: AB,
  } satisfies Quelle,
  doerr2018: {
    titel: 'Doerr — Measure What Matters, Verlagsseite (Penguin Random House / Portfolio, 2018)',
    url: 'https://www.penguinrandomhouse.com/books/546304/measure-what-matters-by-john-doerr-foreword-by-larry-page/',
    abgerufen: AB,
  } satisfies Quelle,
  sullSull2018: {
    titel: 'Sull & Sull — With Goals, FAST Beats SMART (MIT Sloan Management Review, 2018)',
    url: 'https://sloanreview.mit.edu/article/with-goals-fast-beats-smart/',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStrategie: {
    titel: 'Müller-Stewens & Gillenkirch — Strategie (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategie-43591',
    abgerufen: AB,
  } satisfies Quelle,

  // Artikel 2 — Balanced Scorecard
  kaplanNorton1992: {
    titel: 'Kaplan & Norton — The Balanced Scorecard: Measures That Drive Performance (Harvard Business Review, 1992)',
    url: 'https://hbr.org/1992/01/the-balanced-scorecard-measures-that-drive-performance-2',
    abgerufen: AB,
  } satisfies Quelle,
  kaplanNorton2000: {
    titel: 'Kaplan & Norton — Having Trouble with Your Strategy? Then Map It (Harvard Business Review, 2000)',
    url: 'https://hbr.org/2000/09/having-trouble-with-your-strategy-then-map-it',
    abgerufen: AB,
  } satisfies Quelle,
  kaplanNorton2000Store: {
    titel: 'Kaplan & Norton — Having Trouble with Your Strategy? Then Map It, Produktseite mit Zusammenfassung (HBR Store, 2000)',
    url: 'https://store.hbr.org/product/having-trouble-with-your-strategy-then-map-it/R00509',
    abgerufen: AB,
  } satisfies Quelle,
  gablerBsc: {
    titel: 'Weber — Balanced Scorecard (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/balanced-scorecard-28000',
    abgerufen: AB,
  } satisfies Quelle,
  norreklit2000: {
    titel:
      'Nørreklit — The Balance on the Balanced Scorecard: A Critical Analysis of Some of Its Assumptions (Management Accounting Research 11(1), 2000; DOI 10.1006/mare.1999.0121)',
    url: 'https://pure.au.dk/portal/en/publications/the-balance-on-the-balanced-scorecard-a-critical-analysis-of-some/',
    abgerufen: AB,
  } satisfies Quelle,

  // Artikel 3 — Strategieprozess und 7-S
  watermanPetersPhillips1980: {
    titel:
      'Waterman, Peters & Phillips — Structure Is Not Organization (Business Horizons 23(3), 1980; DOI 10.1016/0007-6813(80)90027-0; Volltext auf tompeters.com)',
    url: 'https://tompeters.com/docs/Structure_Is_Not_Organization.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  gabler7s: {
    titel: 'Reineke — Sieben-S-Modell (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/sieben-s-modell-51911',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStratMgmt: {
    titel: 'Gabler Wirtschaftslexikon — strategisches Management (Springer Gabler, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategisches-management-46326',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStratPlanung: {
    titel: 'Müller-Stewens — Strategische Planung (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategische-planung-44567',
    abgerufen: AB,
  } satisfies Quelle,
  gablerStratKontrolle: {
    titel: 'Weber & Müller-Stewens — strategische Kontrolle (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/strategische-kontrolle-42773',
    abgerufen: AB,
  } satisfies Quelle,

  // Artikel 4 — Szenarioplanung
  schoemaker1995: {
    titel: 'Schoemaker — Scenario Planning: A Tool for Strategic Thinking (MIT Sloan Management Review, 1995)',
    url: 'https://sloanreview.mit.edu/article/scenario-planning-a-tool-for-strategic-thinking/',
    abgerufen: AB,
  } satisfies Quelle,
  wack1985: {
    titel: 'Wack — Scenarios: Uncharted Waters Ahead (Harvard Business Review, 1985)',
    url: 'https://hbr.org/1985/09/scenarios-uncharted-waters-ahead',
    abgerufen: AB,
  } satisfies Quelle,
  shellScenarios: {
    titel: 'Shell — What are Shell Scenarios? (shell.com, o. J.)',
    url: 'https://www.shell.com/news-and-insights/scenarios/what-are-shell-scenarios.html',
    abgerufen: AB,
  } satisfies Quelle,
  shell40Years: {
    titel: 'Shell — 40 Years of Shell Scenarios (Shell International, 2013)',
    url: 'https://www.shell.com/news-and-insights/scenarios/what-are-shell-scenarios/_jcr_content/root/main/section_509167378/promo/links/item0.stream/1652289755448/a0e75f042fee5322b72780ee36e5ba17c35a4fc6/shell-scenarios-40yearsbook080213.pdf',
    abgerufen: AB,
  } satisfies Quelle,

  // Artikel 5 — Umsetzung
  kotter1995: {
    titel: 'Kotter — Leading Change: Why Transformation Efforts Fail (Harvard Business Review, 1995)',
    url: 'https://hbr.org/1995/05/leading-change-why-transformation-efforts-fail-2',
    abgerufen: AB,
  } satisfies Quelle,
  kotter1995Store: {
    titel: 'Kotter — Leading Change: Why Transformation Efforts Fail, Produktseite mit Zusammenfassung (HBR Store, o. J.)',
    url: 'https://store.hbr.org/product/leading-change-why-transformation-efforts-fail/R0701J',
    abgerufen: AB,
  } satisfies Quelle,
  kotterLeadingChange: {
    titel: 'Kotter — Leading Change, With a New Preface by the Author, Verlagsseite (Harvard Business Review Press, 2012)',
    url: 'https://store.hbr.org/product/leading-change-with-a-new-preface-by-the-author/11116',
    abgerufen: AB,
  } satisfies Quelle,
  sullHomkesSull2015: {
    titel: 'Sull, Homkes & Sull — Why Strategy Execution Unravels — and What to Do About It (Harvard Business Review, 2015)',
    url: 'https://hbr.org/2015/03/why-strategy-execution-unravelsand-what-to-do-about-it',
    abgerufen: AB,
  } satisfies Quelle,
  sullHomkesSull2015Store: {
    titel:
      'Sull, Homkes & Sull — Why Strategy Execution Unravels — and What to Do About It, Produktseite mit Zusammenfassung (HBR Store, 2015)',
    url: 'https://store.hbr.org/product/why-strategy-execution-unravels-and-what-to-do-about-it/R1503C',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block4: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ziele-okr',
    titel: 'Ziele setzen: SMART, OKR und der Unterschied zur Strategie',
    thema: 'strategie',
    einleitung:
      'In Strategiegesprächen fallen ständig die Worte Ziel, Kennzahl und OKR, oft ohne Unterschied. Dieser Artikel ordnet die gängigen Zielsysteme ein und zeigt, wo ein Ziel aufhört und eine Strategie beginnt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Ziel beschreibt einen Sollzustand; eine Strategie beschreibt den Weg dorthin. Das Gabler Wirtschaftslexikon definiert Strategie als die „grundsätzliche, langfristige Verhaltensweise (Maßnahmenkombination) der Unternehmung“ zur Verwirklichung der langfristigen Ziele. Ziele sagen also, wohin ein Unternehmen will; die Strategie sagt, mit welchen Maßnahmen es dort hinkommen soll. Ein Zielsystem wie SMART oder OKR ersetzt keine Strategie. Es macht eine vorhandene Strategie nachprüfbar, indem es sie in konkrete, terminierte Ergebnisse übersetzt. Fehlt die Strategie, bleiben auch sauber formulierte Ziele Wünsche mit Datum.',
          'Die SMART-Regel geht auf George T. Doran zurück, der sie 1981 in der Zeitschrift „Management Review“ veröffentlichte. In der Originalfassung stehen die Buchstaben für spezifisch (specific), messbar (measurable), zuweisbar (assignable), realistisch (realistic) und terminiert (time-related); heute werden A und R meist als erreichbar (attainable) und relevant gelesen. SMART ist eine Prüfliste für die Formulierung eines einzelnen Ziels, kein Steuerungssystem. Donald Sull und Charles Sull (2018) kritisieren, dass SMART-Ziele Ehrgeiz unterbewerten, eng auf individuelle Leistung zielen und das Gespräch über Ziele im Jahresverlauf ausblenden; sie laden zum „Sandbagging“ ein, also zu bewusst vorsichtigen Zielen, die sicher erreicht werden.',
        ],
      },
      {
        titel: 'OKR: Objectives and Key Results',
        absaetze: [
          'OKR steht für Objectives and Key Results (Ziele und Schlüsselergebnisse). Das Vorgehen entwickelte Andy Grove in den 1970er-Jahren bei Intel; John Doerr lernte es dort als Ingenieur kennen und brachte es 1999 zu den Gründern von Google. Sein Buch „Measure What Matters“ (2018) machte die Methode breit bekannt. Ein Objective beschreibt, was erreicht werden soll: bedeutsam, konkret, handlungsorientiert und idealerweise inspirierend. Die Key Results legen fest, woran der Fortschritt gemessen wird: spezifisch, terminiert, ehrgeizig und dennoch realistisch. Üblich sind drei bis fünf Key Results je Objective. Am Ende des Zeitraums, meist eines Quartals, werden die Key Results bewertet. Alle Ziele sind für die gesamte Organisation einsehbar, vom Berufseinsteiger bis zur Geschäftsführung, und sie sind von der Vergütung getrennt.',
          'Die Methode unterscheidet verbindliche (committed) und ambitionierte (aspirational) OKRs. Verbindliche OKRs sind Zusagen, bei denen ein Bestehen erwartet wird. Ambitionierte OKRs, auch Stretch Goals oder „Moonshots“ genannt, beschreiben Ergebnisse, zu denen der Weg erst noch gefunden werden muss. OKRs sollen ein Team auf wenige, sorgfältig gewählte Prioritäten ausrichten und Veränderung messen, nicht den Normalbetrieb; darin unterscheiden sie sich von KPIs (Key Performance Indicators, laufende Leistungskennzahlen), die den Gesundheitszustand eines Geschäfts anzeigen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Maschinenbauer mit 200 Beschäftigten will im Kundendienst einen KI-Assistenten erproben, der Standardanfragen zu Ersatzteilen beantwortet. Die Beraterin schlägt ein Quartals-OKR vor. Objective: „Unser Kundendienst beantwortet Standardanfragen ohne Wartezeit.“ Key Results: Der Assistent ist an das Ticketsystem angebunden und bearbeitet eine definierte Klasse von Anfragen (verbindlich). Die Antwortzeit für diese Klasse sinkt auf einen vereinbarten Wert (ambitioniert). Servicemitarbeiter bewerten in einer regelmäßigen Stichprobe die Antworten als fachlich korrekt (verbindlich). Das OKR sagt nicht, warum der Kundendienst der richtige Startpunkt ist; das ist die Strategiefrage, die vorher geklärt sein muss. Es sorgt aber dafür, dass am Quartalsende ein Ergebnis vorliegt, das jeder im Haus lesen kann, und nicht nur ein Projektstatus.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Sobald eine Kennzahl zum Ziel wird, verliert sie ihren Wert als Messgröße; dieser Effekt, bekannt als Goodharts Gesetz, ist im Artikel „Wenn Optimierung schiefgeht“ beschrieben. OKRs sind dagegen nicht immun. Teams wählen Key Results, die sie kontrollieren, statt Ergebnisse, die zählen; oder sie setzen Ziele so, dass sie sicher erreicht werden, obwohl OKRs ausdrücklich dehnen sollen und ihr Erfolg nicht selbstverständlich sein darf. Die Trennung von der Vergütung mildert diesen Anreiz, beseitigt ihn aber nicht.',
          'Die zweite Grenze ist Überlast. Die Methode verlangt wenige Prioritäten, in der Praxis entstehen aber leicht mehr Objectives, als ein Betrieb bearbeiten kann, und der Quartalstakt erzeugt Aufwand für Formulierung, Abstimmung und Bewertung. Sull und Sull berichten aus ihrer Befragung, dass nur ein Viertel der Manager angab, ihre Ziele würden von Kollegen in anderen Bereichen verstanden; Transparenz auf dem Papier bedeutet noch keine Abstimmung. Und OKRs entscheiden nicht, ob die Strategie richtig ist: Ein sauber formuliertes Objective kann einer falschen Strategie dienen.',
        ],
      },
    ],
    quellen: [Q.whatmattersOkr, Q.whatmattersSmart, Q.doerr2018, Q.sullSull2018, Q.gablerStrategie],
    sieheAuch: ['balanced-scorecard', 'strategie-ebenen', 'optimierung-die-schiefgeht', 'motivation-arbeit'],
    synonyme: ['OKR', 'Objectives and Key Results', 'SMART-Ziele', 'Zielsystem'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'balanced-scorecard',
    titel: 'Balanced Scorecard und Strategy Map',
    thema: 'strategie',
    einleitung:
      'Kennzahlen entscheiden darüber, worauf ein Unternehmen achtet. Die Balanced Scorecard ist das bekannteste Werkzeug, um eine Strategie in ein ausgewogenes Kennzahlensystem zu übersetzen; die Strategy Map ist die dazugehörige Landkarte.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Robert S. Kaplan und David P. Norton eröffneten ihren Aufsatz „The Balanced Scorecard — Measures That Drive Performance“ (Harvard Business Review, 1992) mit dem Satz „What you measure is what you get“: Was gemessen wird, bestimmt das Verhalten von Führungskräften und Mitarbeitern. Klassische Finanzkennzahlen wie Kapitalrendite oder Gewinn je Aktie könnten irreführende Signale für Verbesserung und Innovation geben und passten nicht mehr zu den Fähigkeiten, die Unternehmen heute aufbauen müssten. Nach dem Gabler Wirtschaftslexikon entstand das Konzept Anfang der 1990er-Jahre in einem Forschungsprojekt mit zwölf US-Unternehmen, als Antwort auf die Kritik an eindimensionalen Finanzkennzahlensystemen; es versteht sich als Bindeglied zwischen Strategieentwicklung und Strategieumsetzung.',
          'Die Balanced Scorecard (ausgewogener Berichtsbogen) ergänzt die finanziellen Kennzahlen um drei weitere Perspektiven: die Kundenperspektive, die interne Prozessperspektive und die Lern- und Entwicklungsperspektive. Die finanzielle Perspektive zeigt, ob die Umsetzung der Strategie zur Ergebnisverbesserung beiträgt; die drei anderen sollen die Treiber dieser Ergebnisse sichtbar machen. Für jede Perspektive werden aus der Strategie Ziele abgeleitet und mit Kennzahlen hinterlegt. Die Kennzahlen der Kunden-, Prozess- und Lernperspektive sollen grundsätzlich über Ursache-Wirkungs-Beziehungen mit den finanziellen Zielen verbunden sein. Ausgewogen heißt also nicht gleich gewichtet, sondern: Die Scorecard verbindet Ergebnisgrößen mit den Größen, die diese Ergebnisse vorbereiten.',
        ],
      },
      {
        titel: 'Die Strategy Map',
        absaetze: [
          'Acht Jahre später beschrieben Kaplan und Norton in „Having Trouble with Your Strategy? Then Map It“ (Harvard Business Review, 2000) die Strategy Map (Strategielandkarte). Sie beginnen mit dem Bild eines Generals, der fremdes Gelände ohne Karte betreten müsste. Eine Strategy Map erlaubt es einer Organisation, ihre Ziele, Initiativen, Zielmärkte, Messgrößen und die Verbindungen zwischen allen Teilen ihrer Strategie in klarer, allgemeiner Sprache zu beschreiben und darzustellen. Die Karte hat vier Regionen, die den vier Perspektiven der Scorecard entsprechen, und liest sich von unten nach oben: Fähigkeiten und Systeme aus der Lernperspektive sollen Prozesse verbessern, bessere Prozesse sollen ein Kundenversprechen einlösen, zufriedene Kunden sollen die finanziellen Ziele tragen. Jeder Pfeil ist eine Hypothese darüber, wie das Unternehmen Wert schafft.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Zulieferer mit 300 Beschäftigten will die Sichtprüfung seiner Teile durch eine KI-gestützte Bilderkennung ergänzen. Die Beraterin ordnet das Vorhaben in alle vier Perspektiven ein. Lernen und Entwicklung: Prüfer werden geschult, eine gepflegte Bilddatenbank entsteht, ein Mitarbeiter übernimmt die Verantwortung für die Datenqualität. Interne Prozesse: Durchlaufzeit der Prüfung, Anteil unentdeckter Fehler, Nacharbeit. Kunden: Reklamationsquote, Liefertreue. Finanzen: Ausschusskosten, Deckungsbeitrag der betroffenen Produktlinie. Die Strategy Map macht die vermutete Kette sichtbar: bessere Daten, verlässlichere Prüfung, weniger Reklamationen, höhere Marge. Der Nutzen für die Geschäftsführung liegt weniger in den Kennzahlen als in der Frage, welchem Glied der Kette sie tatsächlich vertraut und welche Zahl ihr anzeigen würde, dass die Kette gerissen ist.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Kausalketten der Scorecard sind Annahmen, keine Befunde. Das Gabler Wirtschaftslexikon formuliert vorsichtig, die Kennzahlen „sollen“ über Ursache-Wirkungs-Beziehungen verbunden sein. Hanne Nørreklit (2000) hat in „The Balance on the Balanced Scorecard“ einige dieser Annahmen einer kritischen Analyse unterzogen, darunter die Frage, ob zwischen den vier Perspektiven tatsächlich Ursache-Wirkungs-Beziehungen bestehen. Ob geschulte Mitarbeiter wirklich zu besseren Prozessen und diese zu höheren Margen führen, ist im Einzelfall zu prüfen; die Karte behauptet es nur. Zeitverzögerungen zwischen den Perspektiven bildet sie nicht ab.',
          'Die zweite Grenze ist die Zahl der Kennzahlen. Vier Perspektiven mit je mehreren Messgrößen ergeben schnell mehr Zahlen, als eine Geschäftsführung bewegen kann; die Scorecard wird zum Kennzahlenfriedhof, der gepflegt, aber nicht gelesen wird. Kaplan und Nortons eigener Satz gilt in beide Richtungen: Wer die falschen Dinge misst, bekommt die falschen Dinge. Hinzu kommt der Aufwand. Das Konzept entstand mit zwölf US-Unternehmen; ein Betrieb mit dreihundert Beschäftigten hat weder die Datenbasis noch die Stäbe dafür. Für ihn ist oft eine Strategy Map mit einer Handvoll Kennzahlen nützlicher als der volle Apparat.',
        ],
      },
    ],
    quellen: [Q.kaplanNorton1992, Q.kaplanNorton2000, Q.kaplanNorton2000Store, Q.gablerBsc, Q.norreklit2000],
    sieheAuch: ['ziele-okr', 'strategie-umsetzung', 'strategie-ebenen'],
    synonyme: ['BSC', 'Balanced Scorecard', 'Strategy Map', 'Strategielandkarte'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'strategieprozess-7s',
    titel: 'Der Strategieprozess und das 7-S-Modell',
    thema: 'strategie',
    einleitung:
      'Strategiearbeit folgt in Lehrbüchern einem festen Ablauf, und in der Praxis scheitert sie meist nicht am Plan, sondern an der Organisation. Der Artikel erklärt den klassischen Strategieprozess und das 7-S-Modell, mit dem sich prüfen lässt, ob eine Organisation zu ihrer Strategie passt.',
    abschnitte: [
      {
        titel: 'Der klassische Strategieprozess',
        absaetze: [
          'Das Gabler Wirtschaftslexikon beschreibt strategisches Management als Planung und Umsetzung von Strategien und gliedert den Prozess in vier Phasen: Zielbildung, strategische Analyse, Strategieformulierung und Strategieumsetzung. Jedes Unternehmen muss dabei beantworten, welche langfristigen Ziele es verfolgt, in welchen Geschäftsfeldern es tätig sein will, mit welchen Maßnahmen es den Wettbewerb bestreitet, was seine Kernfähigkeiten sind und was es tun muss, um die Maßnahmen umzusetzen. In der strategischen Planung gibt die Unternehmensleitung den Rahmen vor (Mission, Werte, Vision, Ziele); vor der Strategieentwicklung steht meist eine Analyse äußerer Chancen und Risiken sowie innerer Stärken und Schwächen; verabschiedete Strategien werden in eine mehrjährige Finanzplanung und in Budgets überführt.',
          'Den Kreis schließt die strategische Kontrolle: die Überwachung der Durchführung der strategischen Programme (Durchführungskontrolle) und die Überprüfung, ob die gesetzten Planannahmen noch gelten (Prämissenkontrolle). Die Prämissenkontrolle soll vorausschauend arbeiten, etwa gestützt auf Frühwarnsysteme. So entsteht der Lehrbuchzyklus Analyse, Formulierung, Umsetzung, Kontrolle. Das Gabler Wirtschaftslexikon selbst merkt an, dass die Umsetzung der Pläne das eigentliche Problem darstellt und dass eine einmal eingeschlagene Strategie kein Garant für künftigen Erfolg ist. Henry Mintzbergs Begriff der emergenten Strategie, also der Strategie, die aus Handlungen entsteht statt aus Plänen, ist im Artikel zur Strategieentstehung erklärt. Der Zyklus ist ein Ordnungsrahmen, keine Beschreibung dessen, was in Unternehmen tatsächlich geschieht.',
        ],
      },
      {
        titel: 'Das 7-S-Modell',
        absaetze: [
          'Robert H. Waterman, Thomas J. Peters und Julien R. Phillips, damals Berater bei McKinsey, veröffentlichten 1980 in „Business Horizons“ den Aufsatz „Structure Is Not Organization“. Ihre These: Wirksamer organisatorischer Wandel sei nicht einfach eine Frage der Struktur und auch nicht nur des Zusammenspiels von Strategie und Struktur, sondern das Verhältnis von sieben Faktoren: Strategy (Strategie), Structure (Struktur), Systems (Systeme, also alle formalen und informellen Abläufe, die das Tagesgeschäft tragen), Style (Führungsstil, verstanden als Handlungsmuster, nicht als Worte), Staff (Personal), Skills (Fähigkeiten) und Superordinate Goals, später Shared Values (gemeinsame Werte). Das Gabler Wirtschaftslexikon unterscheidet harte Variablen, die greifbar und im Unternehmen konkret dargelegt sind (Strategie, Struktur, Systeme), von weichen Variablen, die kaum materiell greifbar sind (Stil, Personal, Werte, Fähigkeiten).',
          'Zwei Eigenschaften des Modells tragen seine Aussage. Erstens sind die Faktoren miteinander verbunden: Es sei schwierig, vielleicht unmöglich, in einem Bereich bedeutende Fortschritte zu machen, ohne in den anderen voranzukommen. Zweitens hat das Diagramm keinen Startpunkt und keine Hierarchie; welcher Faktor eine Organisation zu einem gegebenen Zeitpunkt treibt, sei nicht von vornherein klar. Für gescheiterte Strategien bieten die Autoren eine Erklärung an: Das Versagen liege in der Ausführung und rühre daher, dass die anderen S vernachlässigt wurden. Die Effektivität einer Organisation liegt nach dieser Sicht in der Interaktion der Faktoren. Als Werkzeug ist 7-S deshalb eine Diagnoseliste: Passt die Organisation zu dem, was die Strategie von ihr verlangt?',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Großhändler mit 150 Beschäftigten führt eine KI-gestützte Disposition ein, die Bestellmengen vorschlägt. Strategie, Budget und Software sind beschlossen, die harten S also erledigt. Ein halbes Jahr später überschreiben die Disponenten fast jeden Vorschlag. Die Beraterin geht die sieben Faktoren durch. Skills: Niemand wurde geschult, die Vorschläge zu bewerten. Style: Die Geschäftsführung hat das System als Sparmaßnahme angekündigt, die Disponenten lesen jeden Vorschlag als Angriff auf ihre Stelle. Shared Values: Der Stolz des Hauses, „wir kennen unsere Kunden persönlich“, steht gegen eine Maschine, die Kunden als Zahlenreihen behandelt. Die Strategie war nicht falsch; die weichen Faktoren passten nicht zu ihr. Die Empfehlung setzt dort an: Schulung, eine andere Botschaft der Geschäftsführung und klare Regeln für legitimes Überschreiben.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das Modell ist eine Prüfliste ohne Gewichtung. Die Autoren räumen selbst ein, die Aufteilung in sieben Faktoren sei bis zu einem gewissen Grad willkürlich, und es sei von vornherein nicht klar, welcher Faktor im Einzelfall entscheidend ist. Das Modell benennt also die Felder, sagt aber nicht, welches wann zählt; dieses Urteil bleibt beim Anwender. Für Stil oder gemeinsame Werte liefert es auch keine Messmethode. Entstanden ist es aus Gesprächen mit Beratern, Führungskräften und einem Dutzend Business Schools, nicht aus einer geprüften Theorie.',
          'Die zweite Grenze: Alle sieben Faktoren liegen im Inneren des Unternehmens. Strategie wird zwar als Antwort auf Veränderungen im Umfeld definiert, das Umfeld selbst analysiert das Modell nicht. Ob ein Markt attraktiv ist, ob ein Wettbewerber schneller ist, ob Regulierung ein Vorhaben verhindert, muss mit anderen Werkzeugen geklärt werden, etwa mit der SWOT-Analyse oder der Umfeldanalyse. 7-S prüft die Passung nach innen; es ersetzt keine Strategieentscheidung.',
        ],
      },
    ],
    quellen: [Q.watermanPetersPhillips1980, Q.gabler7s, Q.gablerStratMgmt, Q.gablerStratPlanung, Q.gablerStratKontrolle],
    sieheAuch: ['strategie-entstehung', 'strategie-umsetzung', 'swot-tows'],
    synonyme: ['7-S-Modell', 'McKinsey 7-S', 'Strategieprozess', 'Strategisches Management'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'szenarioplanung',
    titel: 'Szenarioplanung: Entscheiden unter Unsicherheit',
    thema: 'strategie',
    einleitung:
      'Kein Modell sagt verlässlich, wie Regulierung, Modellpreise oder Kundenverhalten in einigen Jahren aussehen. Szenarioplanung ist das Werkzeug, mit dem Unternehmen trotzdem planen: nicht, indem sie die Zukunft vorhersagen, sondern indem sie mehrere Zukünfte durchdenken.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Szenarien sind keine Prognosen. Shell, das seit den frühen 1970er-Jahren mit Szenarien arbeitet, formuliert es scharf: Szenarien seien „absolutely not predictions or expectations of what will happen“, auch nicht dessen, was wahrscheinlich geschehen wird, und keine Aussagen darüber, was geschehen sollte. Sie sind auch nicht Shells Strategie oder Geschäftsplan. Szenarien stellen die Frage „Was wäre, wenn?“ und sollen Führungskräfte dazu bringen, auch entfernte Möglichkeiten zu bedenken und ihr Denken zu dehnen. Paul J. H. Schoemaker (1995) nennt Szenarioplanung eine disziplinierte Methode, mögliche Zukünfte zu imaginieren; sie richtet sich gegen die Selbstüberschätzung und den Tunnelblick, die viele Entscheidungen prägen.',
          'Pierre Wack, Leiter der Planungsgruppe bei Shell, beschrieb den Ansatz 1985 im Aufsatz „Scenarios: Uncharted Waters Ahead“ (Harvard Business Review). Prognosen hätten in den stabilen 1950er- und 1960er-Jahren getaugt; seit den frühen 1970er-Jahren seien Prognosefehler häufiger und gelegentlich von dramatischem Ausmaß. Wacks Kern: Der Wert von Szenarien liegt nicht in anderen Zahlen, sondern darin, das Weltbild der Entscheider zu verändern, ihren „Mikrokosmos“, wie er es nannte. Shells Rückblick auf vierzig Jahre Szenarien schildert, wie Wack im September 1972 sechs Szenarien vorstellte und die Gruppe damit die Möglichkeit eines Ölschocks im Nahen Osten durchdachte, bevor die Krise 1973 eintrat. Die Lehre daraus: sich vorstellen, wie Ereignisse die Welt plausibel formen könnten, statt wahrscheinliche oder wünschenswerte Zukünfte vorherzusagen.',
        ],
      },
      {
        titel: 'Das Vorgehen nach Schoemaker',
        absaetze: [
          'Schoemaker beschreibt das Vorgehen in Schritten: den Rahmen festlegen (Fragestellung und Zeithorizont); die wichtigsten Beteiligten bestimmen; die Grundtrends erfassen, die in jedem Szenario gelten; die Schlüsselunsicherheiten benennen, die den Ausgang bestimmen; aus deren Kombinationen erste Szenarien bauen; die Szenarien auf innere Konsistenz und Plausibilität prüfen; daraus Lernszenarien entwickeln, die Annahmen herausfordern; Forschungsbedarf klären; quantitative Modelle ergänzen; und schließlich zu Entscheidungsszenarien gelangen, an denen konkrete Handlungsoptionen geprüft werden. Der entscheidende Schnitt liegt zwischen dem, was vorbestimmt ist, und dem, was offen ist. Schoemaker warnt vor den Denkfehlern, die auch hier wirken: Verankerung an der Gegenwart, Verfügbarkeit des Naheliegenden und die Selbstüberschätzung, die zu unangemessen engen Bandbreiten für künftige Veränderungen führt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Verpackungshersteller mit 250 Beschäftigten will eine KI-Roadmap für die nächsten Jahre festlegen und fragt, welche Investitionen er wagen soll. Die Beraterin benennt zwei Schlüsselunsicherheiten: wie streng die europäische KI-Regulierung auf die eigenen Anwendungsfälle wirkt, und ob leistungsfähige Modelle günstig und über offene Schnittstellen verfügbar bleiben oder teuer und bei wenigen Anbietern konzentriert werden. Aus den Kombinationen entstehen vier Szenarien. Für jedes fragt der Workshop: Was würden wir tun? Welche Schritte sind in allen vier sinnvoll, etwa Datenqualität, interne Fähigkeiten und dokumentierte Prozesse? Welche sind Wetten auf ein einziges Szenario, etwa die tiefe Abhängigkeit von einem Anbieter? Welche Signale zeigen früh, in welches Szenario die Welt läuft? Das Ergebnis ist eine Entscheidung mit Vorbehalten, kein Dokument.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Szenarioplanung ist aufwendig. Shells Leiter der Szenarioarbeit beschreibt den Prozess als subtil, still und langfristig, abhängig von einem Klima der Offenheit und des Vertrauens; Shell unterhält dafür seit Jahrzehnten ein eigenes Team. Ein Mittelständler hat einen Nachmittag. Verkürzte Varianten geraten leicht zu einem Brainstorming mit Etiketten, das die Annahmen der Teilnehmer bestätigt, statt sie zu prüfen.',
          'Die zweite Gefahr ist Scheingenauigkeit. Sobald Szenarien mit Zahlen hinterlegt werden, sehen sie aus wie Prognosen und werden so gelesen; Wacks Kernaussage, dass der Wert von Szenarien im veränderten Weltbild der Entscheider liegt und nicht in den Zahlen, gilt gerade hier. Die dritte ist Folgenlosigkeit. Shells Szenarioleiter Jeremy Bentham fragt, wie viele Entscheidungen die Fingerabdrücke von Szenarien tragen. Werden aus Szenarien keine Entscheidungen, Vorbehalte oder Frühindikatoren abgeleitet, bleibt ein interessantes Dokument, das nichts verändert. Und auch Szenarien unterliegen den Verzerrungen, die sie bekämpfen sollen: Teilnehmer neigen dazu, ein Szenario als das eigentliche zu behandeln und die übrigen als Dekoration.',
        ],
      },
    ],
    quellen: [Q.schoemaker1995, Q.wack1985, Q.shellScenarios, Q.shell40Years],
    sieheAuch: ['pestel-analyse', 'entscheidungen-verzerrungen', 'strategie-entstehung'],
    synonyme: ['Szenariotechnik', 'Scenario Planning', 'Szenarioanalyse'],
    unsicher: false,
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'strategie-umsetzung',
    titel: 'Umsetzung: warum Strategien im Alltag scheitern',
    thema: 'strategie',
    einleitung:
      'Die meisten Strategien scheitern nicht an der Analyse, sondern danach. Dieser Artikel fasst zwei viel zitierte Untersuchungen dazu zusammen, warum Umsetzung misslingt, und zeigt, was daraus für KI-Vorhaben im Mittelstand folgt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Donald Sull, Rebecca Homkes und Charles Sull eröffnen ihren Aufsatz „Why Strategy Execution Unravels — and What to Do About It“ (Harvard Business Review, 2015) mit einer Bestandsaufnahme: Zwei Drittel bis drei Viertel der großen Organisationen tun sich mit der Umsetzung schwer. Bücher und Artikel über Strategie überträfen jene über Umsetzung um eine Größenordnung, und was es gebe, konzentriere sich auf Taktik oder verallgemeinere aus einem einzelnen Fall. John P. Kotter hatte zwanzig Jahre zuvor in „Leading Change: Why Transformation Efforts Fail“ (Harvard Business Review, 1995) über hundert Unternehmen beim Versuch beobachtet, sich grundlegend zu erneuern, und daraus acht typische Fehler abgeleitet. Beide Texte gehören zum Standardvokabular in Strategiegesprächen.',
        ],
      },
      {
        titel: 'Zwei Diagnosen: Kotter und Sull',
        absaetze: [
          'Kotters acht Fehler beschreiben, an welchen Stellen Veränderungsvorhaben aus dem Tritt geraten: Es gelingt nicht, ein Gefühl der Dringlichkeit zu erzeugen; es fehlt eine schlagkräftige Führungskoalition; es gibt keine Vision; die Vision wird nicht klar und oft genug kommuniziert; Hindernisse werden nicht beseitigt; kurzfristige Erfolge werden nicht geplant und erzeugt; der Sieg wird zu früh erklärt; und die Veränderung wird nicht in der Unternehmenskultur verankert. Kotter betont, dass Veränderung gewöhnlich lange dauert. Sein Buch „Leading Change“ (Harvard Business Review Press, Ausgabe mit neuem Vorwort 2012) formt die acht Fehler zu einem achtstufigen Prozess um, der seither als Standardrezept für Veränderungsvorhaben gilt.',
          'Sull, Homkes und Sull stellen fünf verbreiteten Überzeugungen ihre Befragungsergebnisse gegenüber. Erstens: Umsetzung sei Ausrichtung (alignment). Die Prozesse, die Ziele entlang der Hierarchie nach unten übersetzen, funktionierten meist; das eigentliche Problem sei die Koordination zwischen Bereichen, auf Zusagen aus anderen Einheiten könne man sich nicht verlassen. Zweitens: Umsetzung heiße, am Plan festzuhalten; tatsächlich brauche es die Fähigkeit, sich an veränderte Umstände anzupassen. Drittens: Kommunikation sei Verständnis; trotz unablässiger E-Mails und Meetings könne nur die Hälfte der mittleren Führungskräfte auch nur eine der fünf wichtigsten Prioritäten ihres Unternehmens nennen.',
          'Viertens: Eine Leistungskultur treibe die Umsetzung; belohnt werden müssten auch Beweglichkeit, Teamarbeit und Ehrgeiz. Fünftens: Umsetzung müsse von oben getrieben werden; entscheidend seien vielmehr die mittleren Führungskräfte, die durch schlechte Kommunikation von oben gelähmt würden. Umsetzung definieren die Autoren als die Fähigkeit, Gelegenheiten im Einklang mit der Strategie zu ergreifen und sich dabei mit anderen Teilen der Organisation abzustimmen. Die Diagnose verschiebt damit den Blick: weg von der Kaskade der Ziele nach unten, hin zu den Zusagen zwischen Bereichen auf gleicher Ebene.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Maschinenbauer mit 250 Beschäftigten hat eine KI-Roadmap: Ein Assistent im Service hat den Pilot bestanden, danach sollen Vertrieb und Konstruktion folgen. Ein Jahr später läuft nur der Pilot. Die Beraterin legt beide Raster an. Nach Kotter: Die Führungskoalition bestand aus dem IT-Leiter allein; nach dem Pilot erklärte die Geschäftsführung den Erfolg und wandte sich anderem zu; kurzfristige Erfolge im Vertrieb wurden nie geplant. Nach Sull: Der Assistent brauchte Kundendaten aus dem Vertrieb und Stücklisten aus der Konstruktion; in keiner der beiden Abteilungen stand das in den Zielen, niemand hatte etwas zugesagt, und die Bereichsleiter kannten die Priorität des Vorhabens nicht. Der Vorschlag: die Roadmap in bereichsübergreifende Zusagen mit benannten Verantwortlichen übersetzen und einen festen Rhythmus für ihre Überprüfung vereinbaren.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Beide Texte liefern Rezepte, und Rezepte sind generisch. Kotters acht Fehler sind die Verdichtung eigener Beobachtungen, keine kontrollierte Untersuchung; sie passen im Nachhinein auf fast jedes gescheiterte Vorhaben und sagen im Voraus wenig darüber, welcher Fehler droht. Sull, Homkes und Sull kritisieren an der Umsetzungsliteratur selbst, dass sie aus Einzelfällen verallgemeinere; ihre eigenen Befunde stammen aus großen Organisationen, die Übertragung auf einen Betrieb mit zweihundert Beschäftigten ist eine Hypothese, keine Erkenntnis.',
          'Kontext entscheidet. In einem inhabergeführten Unternehmen ist die Führungskoalition oft eine einzige Person, und Koordination zwischen Bereichen bedeutet drei Leute auf einem Flur; die Diagnosen gelten dort anders als in einem Konzern mit vielen Einheiten. Beide Raster setzen zudem voraus, dass die Strategie richtig ist, und sagen nichts darüber, ob sie es ist. Sie taugen als Fragelisten: Wer trägt das Vorhaben, wer hat wem was zugesagt, woran wird der nächste Erfolg sichtbar? Die Antworten muss die Geschäftsführung selbst geben.',
        ],
      },
    ],
    quellen: [Q.kotter1995, Q.kotter1995Store, Q.kotterLeadingChange, Q.sullHomkesSull2015, Q.sullHomkesSull2015Store],
    sieheAuch: ['change-management', 'ziele-okr', 'balanced-scorecard', 'strategieprozess-7s', 'widerstand-veraenderung', 'macht-mikropolitik'],
    synonyme: ['Strategy Execution', 'Strategieumsetzung', 'Kotters acht Fehler', 'Umsetzungslücke'],
    unsicher: false,
  },
];
