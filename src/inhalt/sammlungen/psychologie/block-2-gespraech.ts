import type { EigenerArtikel, Quelle } from '../../typen';

// Block 2 — Menschen im Gespräch: Überzeugen, Eindruck, Vertrauen, Zuhören, Verhandeln,
// Rat. Alle Quellen am 2026-09-26 geprüft (DOI über Crossref, Webseiten per Abruf).
const AB = '2026-09-26';
const Q = {
  // Überzeugung
  cialdini2001Hbr: {
    titel: 'Cialdini — Harnessing the Science of Persuasion (Harvard Business Review, 2001)',
    url: 'https://hbr.org/2001/10/harnessing-the-science-of-persuasion',
    abgerufen: AB,
  } satisfies Quelle,
  influenceAtWork: {
    titel: 'Cialdini / Influence at Work — Dr. Robert Cialdini’s Seven Principles of Persuasion (influenceatwork.com, o. J.)',
    url: 'https://www.influenceatwork.com/7-principles-of-persuasion/',
    abgerufen: AB,
  } satisfies Quelle,
  cialdiniGoldstein2004: {
    titel: 'Cialdini & Goldstein — Social Influence: Compliance and Conformity (Annual Review of Psychology 55, 2004)',
    url: 'https://doi.org/10.1146/annurev.psych.55.090902.142015',
    abgerufen: AB,
  } satisfies Quelle,
  goldsteinCialdiniGriskevicius2008: {
    titel: 'Goldstein, Cialdini & Griskevicius — A Room with a Viewpoint: Using Social Norms to Motivate Environmental Conservation in Hotels (Journal of Consumer Research 35(3), 2008)',
    url: 'https://doi.org/10.1086/586910',
    abgerufen: AB,
  } satisfies Quelle,
  // Eindruck
  fiskeCuddyGlick2007: {
    titel: 'Fiske, Cuddy & Glick — Universal Dimensions of Social Cognition: Warmth and Competence (Trends in Cognitive Sciences 11(2), 2007)',
    url: 'https://doi.org/10.1016/j.tics.2006.11.005',
    abgerufen: AB,
  } satisfies Quelle,
  cuddyKohutNeffinger2013: {
    titel: 'Cuddy, Kohut & Neffinger — Connect, Then Lead (Harvard Business Review, 2013)',
    url: 'https://hbr.org/2013/07/connect-then-lead',
    abgerufen: AB,
  } satisfies Quelle,
  willisTodorov2006: {
    titel: 'Willis & Todorov — First Impressions: Making Up Your Mind After a 100-Ms Exposure to a Face (Psychological Science 17(7), 2006)',
    url: 'https://doi.org/10.1111/j.1467-9280.2006.01750.x',
    abgerufen: AB,
  } satisfies Quelle,
  nisbettWilson1977: {
    titel: 'Nisbett & Wilson — The Halo Effect: Evidence for Unconscious Alteration of Judgments (Journal of Personality and Social Psychology 35(4), 1977)',
    url: 'https://doi.org/10.1037/0022-3514.35.4.250',
    abgerufen: AB,
  } satisfies Quelle,
  ranehill2015: {
    titel: 'Ranehill, Dreber, Johannesson, Leiberg, Sul & Weber — Assessing the Robustness of Power Posing: No Effect on Hormones and Risk Tolerance in a Large Sample of Men and Women (Psychological Science 26(5), 2015)',
    url: 'https://doi.org/10.1177/0956797614553946',
    abgerufen: AB,
  } satisfies Quelle,
  // Vertrauen
  mayerDavisSchoorman1995: {
    titel: 'Mayer, Davis & Schoorman — An Integrative Model of Organizational Trust (Academy of Management Review 20(3), 1995)',
    url: 'https://doi.org/10.5465/amr.1995.9508080335',
    abgerufen: AB,
  } satisfies Quelle,
  rousseau1998: {
    titel: 'Rousseau, Sitkin, Burt & Camerer — Not So Different After All: A Cross-Discipline View of Trust (Academy of Management Review 23(3), 1998)',
    url: 'https://doi.org/10.5465/amr.1998.926617',
    abgerufen: AB,
  } satisfies Quelle,
  colquitt2007: {
    titel: 'Colquitt, Scott & LePine — Trust, Trustworthiness, and Trust Propensity: A Meta-Analytic Test of Their Unique Relationships with Risk Taking and Job Performance (Journal of Applied Psychology 92(4), 2007)',
    url: 'https://doi.org/10.1037/0021-9010.92.4.909',
    abgerufen: AB,
  } satisfies Quelle,
  schoormanMayerDavis2007: {
    titel: 'Schoorman, Mayer & Davis — An Integrative Model of Organizational Trust: Past, Present, and Future (Academy of Management Review 32(2), 2007)',
    url: 'https://doi.org/10.5465/amr.2007.24348410',
    abgerufen: AB,
  } satisfies Quelle,
  // Zuhören
  rogersRoethlisberger1991: {
    titel: 'Rogers & Roethlisberger — Barriers and Gateways to Communication (Harvard Business Review, 1991; Erstveröffentlichung 1952)',
    url: 'https://hbr.org/1991/11/barriers-and-gateways-to-communication',
    abgerufen: AB,
  } satisfies Quelle,
  rogers1957: {
    titel: 'Rogers — The Necessary and Sufficient Conditions of Therapeutic Personality Change (Journal of Consulting Psychology 21(2), 1957)',
    url: 'https://doi.org/10.1037/h0045357',
    abgerufen: AB,
  } satisfies Quelle,
  itzchakovKluger2018: {
    titel: 'Itzchakov & Kluger — The Power of Listening in Helping People Change (Harvard Business Review, 2018)',
    url: 'https://hbr.org/2018/05/the-power-of-listening-in-helping-people-change',
    abgerufen: AB,
  } satisfies Quelle,
  klugerItzchakov2022: {
    titel: 'Kluger & Itzchakov — The Power of Listening at Work (Annual Review of Organizational Psychology and Organizational Behavior 9, 2022)',
    url: 'https://doi.org/10.1146/annurev-orgpsych-012420-091013',
    abgerufen: AB,
  } satisfies Quelle,
  weger2014: {
    titel: 'Weger, Castle Bell, Minei & Robinson — The Relative Effectiveness of Active Listening in Initial Interactions (International Journal of Listening 28(1), 2014)',
    url: 'https://doi.org/10.1080/10904018.2013.813234',
    abgerufen: AB,
  } satisfies Quelle,
  // Verhandeln
  fisherUryPatton: {
    titel: 'Fisher, Ury & Patton — Getting to Yes: Negotiating Agreement Without Giving In, 3. Aufl., Verlagsseite (Penguin, 2011; Erstauflage 1981)',
    url: 'https://www.penguinrandomhouse.com/books/324551/getting-to-yes-by-roger-fisher-and-william-ury/',
    abgerufen: AB,
  } satisfies Quelle,
  ponBatna: {
    titel: 'Program on Negotiation at Harvard Law School — What is a BATNA? (pon.harvard.edu, o. J.)',
    url: 'https://www.pon.harvard.edu/tag/batna/',
    abgerufen: AB,
  } satisfies Quelle,
  galinskyMussweiler2001: {
    titel: 'Galinsky & Mussweiler — First Offers as Anchors: The Role of Perspective-Taking and Negotiator Focus (Journal of Personality and Social Psychology 81(4), 2001)',
    url: 'https://doi.org/10.1037/0022-3514.81.4.657',
    abgerufen: AB,
  } satisfies Quelle,
  nealeBazerman1985: {
    titel: 'Neale & Bazerman — The Effects of Framing and Negotiator Overconfidence on Bargaining Behaviors and Outcomes (Academy of Management Journal 28(1), 1985)',
    url: 'https://doi.org/10.5465/256060',
    abgerufen: AB,
  } satisfies Quelle,
  thompsonWangGunia2010: {
    titel: 'Thompson, Wang & Gunia — Negotiation (Annual Review of Psychology 61, 2010)',
    url: 'https://doi.org/10.1146/annurev.psych.093008.100458',
    abgerufen: AB,
  } satisfies Quelle,
  // Rat und Reaktanz
  steindl2015: {
    titel: 'Steindl, Jonas, Sittenthaler, Traut-Mattausch & Greenberg — Understanding Psychological Reactance: New Developments and Findings (Zeitschrift für Psychologie 223(4), 2015)',
    url: 'https://doi.org/10.1027/2151-2604/a000222',
    abgerufen: AB,
  } satisfies Quelle,
  bonaccioDalal2006: {
    titel: 'Bonaccio & Dalal — Advice Taking and Decision-Making: An Integrative Literature Review, and Implications for the Organizational Sciences (Organizational Behavior and Human Decision Processes 101(2), 2006)',
    url: 'https://doi.org/10.1016/j.obhdp.2006.07.001',
    abgerufen: AB,
  } satisfies Quelle,
  yanivKleinberger2000: {
    titel: 'Yaniv & Kleinberger — Advice Taking in Decision Making: Egocentric Discounting and Reputation Formation (Organizational Behavior and Human Decision Processes 83(2), 2000)',
    url: 'https://doi.org/10.1006/obhd.2000.2909',
    abgerufen: AB,
  } satisfies Quelle,
  yaniv2004: {
    titel: 'Yaniv — Receiving Other People’s Advice: Influence and Benefit (Organizational Behavior and Human Decision Processes 93(1), 2004)',
    url: 'https://doi.org/10.1016/j.obhdp.2003.08.002',
    abgerufen: AB,
  } satisfies Quelle,
  gino2008: {
    titel: 'Gino — Do We Listen to Advice Just Because We Paid for It? The Impact of Advice Cost on Its Use (Organizational Behavior and Human Decision Processes 107(2), 2008)',
    url: 'https://doi.org/10.1016/j.obhdp.2008.03.001',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block2: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ueberzeugung-cialdini',
    titel: 'Überzeugen: Cialdinis Prinzipien der Einflussnahme',
    thema: 'psychologie',
    einleitung:
      'Menschen sagen aus wenigen, gut erforschten Gründen Ja: weil sie etwas zurückgeben wollen, weil andere es auch tun, weil sie konsistent bleiben wollen, weil eine Autorität spricht, weil sie jemanden mögen oder weil etwas knapp ist. Wer diese Prinzipien kennt, erkennt sie in jedem Verkaufsgespräch, auch im eigenen.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Cialdini (2001) fasst in der Harvard Business Review sechs Prinzipien zusammen, die in der Sozialpsychologie als Auslöser von Zustimmung (compliance) untersucht wurden. Sympathie: Menschen sagen eher Ja zu Personen, die sie mögen, und Sympathie entsteht durch Ähnlichkeit und durch ehrliches Lob. Reziprozität: Wer etwas bekommen hat, fühlt sich verpflichtet, etwas zurückzugeben. Soziale Bewährtheit: Menschen orientieren sich daran, was andere, besonders ähnliche andere, tun. Konsistenz: Wer sich einmal, am besten öffentlich und schriftlich, festgelegt hat, handelt später im Einklang damit. Autorität: Ausgewiesene Fachkenntnis verschafft Gehör. Knappheit: Was selten oder nur kurz verfügbar ist, wirkt wertvoller. Cialdini betont, dass die Prinzipien nur ethisch eingesetzt werden dürfen und dass ihr Missbrauch Vertrauen zerstört.',
          'In der erweiterten Fassung seines Buches Influence hat Cialdini ein siebtes Prinzip ergänzt, Einheit (unity): Menschen lassen sich von denen beeinflussen, mit denen sie eine gemeinsame Identität teilen, etwa Familie, Region oder Berufsgruppe. Cialdini und Goldstein (2004) ordnen diese Forschung in der Annual Review of Psychology in zwei Felder: Compliance, das Nachgeben gegenüber einer ausdrücklichen Bitte, und Konformität, das Angleichen an das Verhalten anderer ohne Bitte. Beide beruhen auf denselben Grundmotiven: richtig handeln, dazugehören und ein positives Selbstbild wahren.',
        ],
      },
      {
        titel: 'Ein Feldexperiment',
        absaetze: [
          'Wie stark soziale Bewährtheit wirkt, zeigt ein Experiment von Goldstein, Cialdini und Griskevicius (2008) in einem Hotel. Karten im Bad baten Gäste, Handtücher mehrfach zu benutzen. Die übliche Umweltbotschaft („Helfen Sie, die Umwelt zu schützen“) führte bei rund 35 Prozent der Gäste dazu, dass sie ein Handtuch wiederverwendeten. Eine Karte, die mitteilte, dass die Mehrheit der Gäste ihre Handtücher wiederverwende, brachte rund 44 Prozent. Eine Karte, die dieselbe Norm auf „die Gäste, die in diesem Zimmer übernachtet haben“ bezog, erreichte rund 49 Prozent. Die Norm einer Gruppe, mit der man sich in einer konkreten Lage identifiziert, wirkte am stärksten, obwohl sie inhaltlich nichts Neues sagte.',
          'Das Experiment zeigt zugleich die Regel für den ehrlichen Einsatz: Es wurde nur berichtet, was tatsächlich der Fall war. Soziale Bewährtheit vorzutäuschen, etwa mit erfundenen Referenzen, ist nach Cialdini keine Anwendung des Prinzips, sondern Betrug.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine kleine Beratung nutzt die Prinzipien, ohne sie so zu nennen. Reziprozität: Der erste Workshop beim Mittelständler ist kostenlos und liefert eine konkrete, verwendbare Einschätzung; die Verpflichtung, die daraus entsteht, ist nicht erpresst, sondern verdient. Konsistenz: Der Kunde formuliert am Ende des Workshops selbst, welches Problem er lösen will; dieser Satz steht später im Angebot. Soziale Bewährtheit: Referenzen werden aus derselben Branche und Größenklasse gewählt, denn ähnliche andere zählen. Autorität: Die Chefin erklärt kurz ihren Hintergrund, bevor sie eine Empfehlung gibt. Knappheit: Kapazitätsgrenzen werden ehrlich genannt, nicht inszeniert.',
          'Der Praktikant kann in Kundenterminen beobachten, welche Prinzipien die Gegenseite nutzt, oft ohne es zu wissen. Ein Einkäufer, der betont, wie viele Anbieter er gerade prüfe, setzt Knappheit gegen die Beratung ein; ein Geschäftsführer, der in der ersten Minute eine Gemeinsamkeit findet, arbeitet mit Sympathie und Einheit. Solche Beobachtungen helfen, ein Gespräch zu lesen, ohne die Gegenseite zu unterstellen, sie handle berechnend.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Prinzipien sind aus vielen Feldexperimenten gut belegt, aber die Effekte sind meist moderat und hängen vom Kontext ab. Im Hotelexperiment bewegte sich der Unterschied im Bereich von rund zehn Prozentpunkten; das ist für ein Hotel viel und für einen Einzelfall keine Garantie. Zudem wirken die Prinzipien bei Menschen, die sie kennen, schwächer oder kehren sich um: Wer bemerkt, dass Knappheit inszeniert oder ein Geschenk als Hebel gedacht ist, reagiert mit Reaktanz, dem Bedürfnis, die eigene Freiheit zu behaupten. Der Artikel über Rat und Reaktanz behandelt das.',
          'Für eine Beratung, die von langfristigem Vertrauen lebt, ist die Grenze deshalb praktisch, nicht nur ethisch. Cialdini und Goldstein weisen darauf hin, dass Einflussnahme, die als Manipulation erkannt wird, die Beziehung dauerhaft beschädigt. Ein Auftrag, der mit inszenierter Knappheit gewonnen wird, kostet den nächsten. Die Prinzipien taugen daher als Prüfliste für die eigene Kommunikation und als Erkennungsschlüssel für die des Gegenübers, nicht als Werkzeugkasten zur Steuerung von Kunden; die Grenze zur Manipulation behandelt der Artikel über Persuasion und Dark Patterns.',
        ],
      },
    ],
    quellen: [Q.cialdini2001Hbr, Q.influenceAtWork, Q.cialdiniGoldstein2004, Q.goldsteinCialdiniGriskevicius2008],
    sieheAuch: ['rat-reaktanz', 'persuasion-dark-patterns', 'vertrauen-modell', 'beratungsgespraech', 'gruppendenken-konformitaet'],
    synonyme: ['Reziprozität', 'Soziale Bewährtheit', 'Social Proof', 'Prinzipien der Überzeugung', 'Compliance'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'waerme-kompetenz-halo',
    titel: 'Der erste Eindruck: Wärme, Kompetenz und der Halo-Effekt',
    thema: 'psychologie',
    einleitung:
      'Menschen beurteilen andere zuerst nach zwei Fragen: Meint die Person es gut mit mir, und kann sie, was sie vorgibt? Diese Urteile fallen in Sekundenbruchteilen, färben alles Weitere und lassen sich nur mühsam korrigieren.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Fiske, Cuddy und Glick (2007) fassen die Forschung zur Personenwahrnehmung in zwei Dimensionen zusammen: Wärme (warmth), also die wahrgenommene Absicht einer Person, freundlich oder feindlich, vertrauenswürdig oder nicht, und Kompetenz (competence), ihre wahrgenommene Fähigkeit, diese Absicht umzusetzen. Nach ihrer Übersicht erklären die beiden Dimensionen rund 82 Prozent der Unterschiede in der Bewertung alltäglichen Sozialverhaltens. Wärme wird zuerst beurteilt und stärker gewichtet, weil es für den Beurteilenden wichtiger ist zu wissen, ob jemand Freund oder Gegner ist, als ob er fähig ist. Aus den Kombinationen entstehen typische Reaktionen: Bewunderung für warm und kompetent, Mitleid für warm und inkompetent, Neid für kalt und kompetent, Verachtung für kalt und inkompetent.',
          'Wie schnell das geht, zeigen Willis und Todorov (2006): Versuchspersonen sahen Gesichter für 100 Millisekunden und beurteilten Vertrauenswürdigkeit, Kompetenz, Sympathie und andere Eigenschaften. Ihre Urteile stimmten hoch mit denen von Personen überein, die die Gesichter beliebig lange betrachten durften. Mehr Zeit erhöhte vor allem die Sicherheit im eigenen Urteil, nicht die Urteile selbst. Der erste Eindruck ist also da, bevor ein Gespräch beginnt, und spätere Information wird auf ihn bezogen.',
        ],
      },
      {
        titel: 'Halo-Effekt und Führung',
        absaetze: [
          'Nisbett und Wilson (1977) zeigten, wie ein Gesamteindruck einzelne Urteile verfärbt. Studierende sahen ein Video desselben Dozenten mit belgischem Akzent, der sich einmal warm und freundlich, einmal kalt und abweisend gab. Wer die warme Version gesehen hatte, bewertete auch sein Aussehen, seine Gestik und seinen Akzent als angenehmer; wer die kalte Version gesehen hatte, fand dieselben Merkmale störend. Die meisten Teilnehmer bestritten, dass der Gesamteindruck ihre Einzelurteile beeinflusst hatte. Den Begriff Halo-Effekt führen Nisbett und Wilson auf Thorndike (1920) zurück, der ihn bei Beurteilungen von Offizieren durch Vorgesetzte beobachtet hatte.',
          'Cuddy, Kohut und Neffinger (2013) übertragen die Wärme-Kompetenz-Forschung in der Harvard Business Review auf Führung. Ihre These: Führungskräfte betonen meist zuerst Stärke und Kompetenz, um respektiert zu werden, riskieren damit aber Furcht und Distanz. Wer zuerst Wärme zeigt, also Verständnis und Zuhören, schafft Vertrauen, über das Kompetenz erst wirken kann. Wärme sei der Kanal, durch den Einfluss fließt; Stärke ohne Wärme erzeuge Widerstand.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Praktikant, der die Chefin zu einem Kundentermin begleitet, ist in der Kompetenzdimension zunächst ein Fragezeichen: jung, unbekannt, ohne Titel. Die Forschung legt nahe, das nicht durch demonstrative Fachbegriffe auszugleichen, sondern die Wärmedimension ernst zu nehmen: aufmerksam zuhören, Namen und Anliegen behalten, Fragen stellen, die zeigen, dass man das Problem des Kunden verstanden hat. Kompetenz wird dann an konkreten Beiträgen gemessen, etwa einer gut vorbereiteten Notiz nach dem Termin, und nicht an der Vorstellung.',
          'Der Halo-Effekt wirkt auch in die andere Richtung, beim Beurteilen von Kunden und Anbietern. Ein Unternehmen mit schönem Firmengebäude, souveränem Geschäftsführer und bekannter Marke wirkt in allen Dimensionen kompetent, auch in solchen, über die man nichts weiß, etwa der Datenqualität. Ein Softwareanbieter mit gutem Auftritt bekommt einen Vorschuss, den seine Technik einlösen muss. Die Gegenmaßnahme ist dieselbe wie bei anderen Verzerrungen: Einzelne Merkmale getrennt und anhand von Belegen beurteilen, bevor der Gesamteindruck die Lücken füllt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Wärme-Kompetenz-Forschung beschreibt, wie Menschen urteilen, nicht, wie sie urteilen sollten. Erste Eindrücke aus Gesichtern sagen wenig über tatsächliche Eigenschaften; ihre Übereinstimmung untereinander zeigt nur, dass alle denselben Vorurteilen folgen. Wer die Befunde nutzt, um den eigenen Auftritt zu optimieren, arbeitet mit einem Mechanismus, der Stereotype trägt. Fiske, Cuddy und Glick zeigen selbst, dass ganze Gruppen nach diesem Schema einsortiert werden.',
          'Ein Teil der populären Literatur zu Auftritt und Körpersprache hat die Replikationskrise nicht überstanden. Die Behauptung, kraftvolle Körperhaltungen (power posing) veränderten Hormone und Risikobereitschaft, die durch eine Mitautorin des Wärme-Kompetenz-Modells bekannt wurde, hielt einer großen Wiederholungsstudie nicht stand: Ranehill und Kollegen (2015) fanden bei 200 Teilnehmern keinen Effekt auf Hormone oder Risikoverhalten, nur auf das Gefühl, mächtig zu sein. Die Kernbefunde zu Wärme und Kompetenz sind davon nicht betroffen, aber die Episode zeigt, dass eine gute Geschichte kein Beleg ist.',
        ],
      },
    ],
    quellen: [Q.fiskeCuddyGlick2007, Q.willisTodorov2006, Q.nisbettWilson1977, Q.cuddyKohutNeffinger2013, Q.ranehill2015],
    sieheAuch: ['vertrauen-modell', 'ueberzeugung-cialdini', 'beratungsgespraech', 'psychologie-befunde-lesen'],
    synonyme: ['Halo-Effekt', 'Stereotype Content Model', 'Warmth and Competence', 'Erster Eindruck', 'Personenwahrnehmung'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'vertrauen-modell',
    titel: 'Vertrauen: Fähigkeit, Wohlwollen, Integrität',
    thema: 'psychologie',
    einleitung:
      'Vertrauen ist die Bereitschaft, sich verletzbar zu machen, weil man von einem anderen Gutes erwartet. Die Forschung zerlegt diese Erwartung in drei Urteile über die andere Person, und jedes davon lässt sich gezielt verdienen oder verspielen.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Mayer, Davis und Schoorman (1995) definieren Vertrauen als die Bereitschaft, sich den Handlungen eines anderen auszusetzen, in der Erwartung, dass er etwas für einen Wichtiges tut, ohne dass man ihn überwachen oder kontrollieren kann. Vertrauen ist damit eine Entscheidung unter Risiko, kein Gefühl. Ob jemand vertraut, hängt nach dem Modell von zwei Dingen ab: seiner allgemeinen Vertrauensneigung (propensity) und seiner Einschätzung der Vertrauenswürdigkeit des Gegenübers. Diese Einschätzung besteht aus drei Faktoren. Fähigkeit (ability): Kann die Person das, worum es geht, in genau diesem Bereich? Wohlwollen (benevolence): Will sie mir Gutes, jenseits ihres eigenen Vorteils? Integrität (integrity): Folgt sie Grundsätzen, die ich teile, und hält sie, was sie sagt?',
          'Das Modell schließt einen Kreis: Vertrauen führt zu riskantem Handeln in der Beziehung (etwa Informationen zu teilen oder Kontrolle abzugeben), und das Ergebnis dieses Handelns verändert die Einschätzung der drei Faktoren. Rousseau, Sitkin, Burt und Camerer (1998) zeigen, dass diese Definition über Disziplinen hinweg trägt: Ökonomen, Psychologen und Soziologen fassen Vertrauen unterschiedlich, stimmen aber darin überein, dass es die Absicht umfasst, Verletzbarkeit auf Grundlage positiver Erwartungen zu akzeptieren, und dass es Risiko und wechselseitige Abhängigkeit voraussetzt.',
        ],
      },
      {
        titel: 'Was die Forschung stützt',
        absaetze: [
          'Colquitt, Scott und LePine (2007) haben das Modell in einer Metaanalyse geprüft. Alle drei Faktoren hängen eigenständig mit Vertrauen zusammen, und Vertrauen wiederum mit riskantem Verhalten in der Beziehung, mit Arbeitsleistung und mit freiwilligem Engagement. Auch die Vertrauensneigung trägt eigenständig bei: Manche Menschen vertrauen Fremden schneller, unabhängig von deren Merkmalen. Für die Praxis heißt das, dass ein Berater alle drei Urteile bedienen muss und dass er den Ausgangspunkt, die Neigung des Kunden, nicht ändern kann, nur kennen.',
          'Schoorman, Mayer und Davis (2007) ziehen nach zwölf Jahren Bilanz und ergänzen das Modell: Vertrauen ist bereichsspezifisch (ich vertraue der Steuerberaterin bei Steuern, nicht bei Software), es ist wechselseitig, aber nicht symmetrisch, Kontrollmechanismen können Vertrauen ersetzen oder untergraben, und beschädigtes Vertrauen lässt sich reparieren, je nach verletztem Faktor unterschiedlich gut. Eine Fähigkeitslücke verzeiht man leichter als eine Integritätsverletzung, weil Letztere die Grundsätze der Person betrifft.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Artikel über das Beratungsunternehmen führt die Vertrauensgleichung aus der Praxisliteratur ein; das Modell von Mayer, Davis und Schoorman ist ihr wissenschaftliches Gegenstück. Für eine kleine KI-Beratung lässt sich jeder Faktor in Verhalten übersetzen. Fähigkeit wird nicht behauptet, sondern gezeigt, mit einem Ergebnis im ersten Workshop, das der Kunde selbst prüfen kann. Wohlwollen zeigt sich daran, ob die Beratung vom Auftrag abrät, wenn er dem Kunden nicht nützt, und ob sie eine kleinere Lösung empfiehlt, wenn die kleinere reicht. Integrität zeigt sich in kleinen Dingen: Zusagen werden gehalten, Fehler benannt, Unwissen zugegeben.',
          'Für den Praktikanten ist die Bereichsspezifik nützlich. Er muss nicht in allem vertrauenswürdig wirken, sondern in dem, was er tut: Protokolle, die stimmen; Recherchen, deren Quellen er nennt; die Antwort „Das weiß ich nicht, ich kläre es bis morgen“, wenn er es nicht weiß. Jeder eingehaltene kleine Termin ist ein Beleg für Integrität, und Integrität ist der Faktor, den man am schwersten zurückgewinnt, wenn er einmal fraglich ist.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das Modell beschreibt Vertrauen zwischen zwei Personen in Organisationen; Vertrauen in Institutionen, Marken oder Technik folgt teilweise anderen Regeln. Ein großer Teil der Belege beruht auf Fragebögen, in denen Menschen ihr Vertrauen selbst berichten; ob dieses berichtete Vertrauen dem tatsächlichen Verhalten entspricht, ist weniger gut untersucht. Zudem ist die Zerlegung in drei Faktoren eine Konvention; in der Praxis überlagern sie sich, und ein Kunde, der Integrität bezweifelt, wird auch die Fähigkeit skeptischer sehen.',
          'Vertrauen hat außerdem eine Kehrseite, die das Modell anerkennt: Zu viel Vertrauen setzt Kontrolle außer Kraft. Ein Kunde, der einer Beratung blind vertraut, prüft ihre Empfehlungen nicht mehr, und eine Beratung, die dieses Vertrauen nicht durch eigene Prüfroutinen ausgleicht, macht Fehler, die niemand bemerkt. Schoorman, Mayer und Davis empfehlen, Vertrauen und Kontrolle als Ergänzung zu sehen: Wo das Risiko hoch ist, gehört Kontrolle dazu, auch zwischen Partnern, die sich vertrauen.',
        ],
      },
    ],
    quellen: [Q.mayerDavisSchoorman1995, Q.rousseau1998, Q.colquitt2007, Q.schoormanMayerDavis2007],
    sieheAuch: ['beratungsunternehmen', 'waerme-kompetenz-halo', 'aktives-zuhoeren', 'rat-reaktanz'],
    synonyme: ['ABI-Modell', 'Vertrauenswürdigkeit', 'Trust', 'Vertrauensneigung', 'Benevolenz'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'aktives-zuhoeren',
    titel: 'Aktives Zuhören: verstehen, bevor man antwortet',
    thema: 'psychologie',
    einleitung:
      'Das größte Hindernis für Verständigung ist die Neigung, das Gesagte sofort zu bewerten. Zuhören, das den anderen wirklich erfasst, verändert nicht nur das Gespräch, sondern messbar den Sprecher selbst.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Rogers und Roethlisberger (1952, Wiederabdruck 1991) benennen in ihrem klassischen Text das Haupthindernis zwischenmenschlicher Kommunikation: die natürliche Neigung, eine Aussage sofort zu beurteilen, zu billigen oder zu verwerfen, und zwar aus dem eigenen Standpunkt heraus. Je stärker die Gefühle im Gespräch, desto stärker diese Neigung. Ihr Gegenmittel ist Zuhören mit Verstehen: die Idee des anderen von seinem Standpunkt aus erfassen, spüren, wie es sich für ihn anfühlt, seinen Bezugsrahmen einnehmen. Als Übung schlagen sie eine Regel vor: Jeder darf erst dann für sich sprechen, wenn er die Gedanken und Gefühle des Vorredners so wiedergegeben hat, dass dieser zufrieden ist.',
          'Rogers (1957) beschreibt aus der Therapie die Haltung dahinter: einfühlendes Verstehen (empathy), also das Erfassen der inneren Welt des anderen, als wäre es die eigene, ohne das „als ob“ zu verlieren; bedingungslose Wertschätzung; und Echtheit des Zuhörenden. Diese Haltung ist keine Gesprächstechnik, sondern die Voraussetzung dafür, dass Techniken wie Nachfragen und Zusammenfassen nicht mechanisch wirken.',
        ],
      },
      {
        titel: 'Was Zuhören beim Sprecher bewirkt',
        absaetze: [
          'Kluger und Itzchakov (2022) fassen die Forschung zu Zuhören am Arbeitsplatz zusammen. Gutes Zuhören umfasst Aufmerksamkeit, Verständnis und eine positive Absicht gegenüber dem Sprecher, und es lässt sich durch Verhalten zeigen: Blickkontakt, Nachfragen, Wiedergeben. Die Wirkung liegt vor allem beim Sprecher: Wer sich gehört fühlt, empfindet weniger Angst, gewinnt mehr Klarheit über die eigene Haltung und vertritt weniger extreme Positionen. Itzchakov und Kluger (2018) beschreiben in der Harvard Business Review denselben Befund für Veränderungsgespräche: Menschen ändern ihre Sicht eher, wenn ihnen jemand ohne Bewertung zuhört, weil sie nicht verteidigen müssen und deshalb selbst die Schwächen ihrer Position sehen können.',
          'Weger, Castle Bell, Minei und Robinson (2014) prüften aktives Zuhören experimentell in Erstgesprächen. Teilnehmer erzählten von einer Enttäuschung; der Gesprächspartner reagierte entweder mit aktivem Zuhören (Wiedergeben und Nachfragen), mit Ratschlägen oder mit einfachen Bestätigungen. Wer aktiv gehört wurde, fühlte sich stärker verstanden und war mit dem Gespräch zufriedener als wer nur bestätigt wurde. Gegenüber Ratschlägen war der Unterschied in der Zufriedenheit kleiner. Zuhören ist also kein Ersatz für Rat, aber die Bedingung, unter der Rat ankommt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Artikel über das Beratungsgespräch beschreibt Fragen und Hypothesenprüfung; aktives Zuhören ist das, was zwischen den Fragen passiert. Wenn ein Produktionsleiter erklärt, warum die letzte Softwareeinführung gescheitert ist, liegt der Reflex der Beratung darin, sofort die Lehren daraus zu ziehen und den eigenen Ansatz zu erklären. Rogers würde die Wiedergabe verlangen: „Wenn ich Sie richtig verstehe, war das Problem nicht die Software, sondern dass niemand Zeit hatte, die Stammdaten zu bereinigen, und dass das erst nach dem Start auffiel.“ Erst wenn der Produktionsleiter nickt, ist das Feld für einen Vorschlag bereitet.',
          'Der Praktikant hat in Meetings eine Rolle, die zum Üben einlädt: Er soll ohnehin protokollieren. Statt Stichworte zu sammeln, kann er nach jedem Beitrag einen Satz formulieren, der das Anliegen des Sprechers aus dessen Sicht wiedergibt, und diesen Satz nach dem Termin mit der Chefin abgleichen. Stimmt seine Wiedergabe, hat er gehört; weicht sie ab, hat er bewertet. Diese Übung schult genau die Fähigkeit, die Rogers und Roethlisberger als selten und schwer beschreiben.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Aktives Zuhören als Technik kann mechanisch werden und dann das Gegenteil bewirken: Ein Gesprächspartner, der jede Aussage in der Form „Ich höre, dass Sie…“ zurückbekommt, fühlt sich behandelt, nicht gehört. Weger und Kollegen fanden, dass aktives Zuhören den Zuhörer nicht sympathischer machte als das Geben von Rat; die Wirkung liegt im Gefühl, verstanden zu werden, nicht in der Beliebtheit. Zudem kostet Zuhören Zeit, und in einem Termin mit fester Tagesordnung ist es eine Entscheidung, sie dafür zu verwenden.',
          'Zuhören ist nicht Zustimmen. Rogers und Roethlisberger weisen darauf hin, dass echtes Verstehen riskant ist, weil es die eigene Position verändern kann; wer das nicht will, hört nur scheinbar zu. Umgekehrt verpflichtet Verstehen nicht dazu, dem Kunden zu folgen: Eine Beratung, die die Sicht des Kunden vollständig erfasst hat, kann und muss ihr danach widersprechen, wenn die Fakten das verlangen. Das Zuhören schafft dafür die Bedingung, nicht die Entschuldigung, es zu unterlassen.',
        ],
      },
    ],
    quellen: [Q.rogersRoethlisberger1991, Q.rogers1957, Q.klugerItzchakov2022, Q.itzchakovKluger2018, Q.weger2014],
    sieheAuch: ['beratungsgespraech', 'vertrauen-modell', 'rat-reaktanz', 'widerstand-veraenderung'],
    synonyme: ['Active Listening', 'Einfühlendes Verstehen', 'Empathisches Zuhören', 'Paraphrasieren', 'Zuhören'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'verhandeln-psychologie',
    titel: 'Verhandeln: Interessen, beste Alternative und die Psychologie am Tisch',
    thema: 'psychologie',
    einleitung:
      'Verhandeln heißt nicht, Positionen gegeneinander abzuschleifen, sondern die Interessen dahinter zu finden. Zugleich wirken am Verhandlungstisch dieselben Verzerrungen wie überall: Der erste Vorschlag ankert, Verluste wiegen schwerer, und beide Seiten unterschätzen, was sie gemeinsam gewinnen könnten.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Fisher, Ury und Patton (Getting to Yes, Erstauflage 1981) beschreiben eine Methode, die sie sachbezogenes Verhandeln nennen (principled negotiation). Vier Grundsätze tragen sie: Menschen und Probleme getrennt behandeln, also die Beziehung nicht mit der Sache verrechnen; auf Interessen statt auf Positionen konzentrieren, denn hinter jeder Forderung steht ein Bedürfnis, das oft auch anders erfüllt werden kann; Optionen zum beiderseitigen Vorteil entwickeln, bevor entschieden wird; und auf objektiven Kriterien bestehen, etwa Marktpreisen oder Präzedenzfällen, statt auf Willenskraft.',
          'Ihr bekanntestes Werkzeug ist die BATNA, die beste Alternative zu einer Verhandlungslösung (best alternative to a negotiated agreement). Das Program on Negotiation der Harvard Law School erklärt sie als den Maßstab, an dem jedes Angebot gemessen wird: Ein Abschluss ist nur sinnvoll, wenn er besser ist als das, was man ohne ihn erreichen könnte. Wer seine BATNA kennt und verbessert, verhandelt aus Stärke, ohne zu bluffen; wer sie nicht kennt, akzeptiert schlechte Angebote aus Angst vor dem Scheitern oder lehnt gute ab, weil er seine Alternativen überschätzt.',
        ],
      },
      {
        titel: 'Was die Psychologie ergänzt',
        absaetze: [
          'Galinsky und Mussweiler (2001) zeigten in Verhandlungsexperimenten, dass der erste Vorschlag das Ergebnis ankert: Wer zuerst bot, erzielte ein Ergebnis näher an seiner Vorstellung. Der Effekt verschwand, wenn die Gegenseite sich vor der Antwort auf ihre eigenen Ziele oder auf die BATNA des Gegenübers konzentrierte; Perspektivwechsel und eigene Zielsetzung neutralisierten den Anker. Neale und Bazerman (1985) fanden, dass Verhandler, die die Situation als Verlust rahmten, weniger nachgaben und seltener zu Abschlüssen kamen als solche mit Gewinnrahmen, und dass überzuversichtliche Verhandler weniger Zugeständnisse machten und schlechter abschnitten.',
          'Thompson, Wang und Gunia (2010) fassen die Forschung in der Annual Review of Psychology zusammen. Zu den robustesten Befunden gehört der Glaube an den festen Kuchen (fixed-pie perception): Beide Seiten nehmen an, dass ihre Interessen sich vollständig widersprechen, und übersehen Themen, bei denen sie unterschiedlich gewichten und daher tauschen könnten. Weitere Befunde betreffen Emotionen (Ärger kann kurzfristig Zugeständnisse erzwingen und langfristig die Beziehung kosten), Beziehungen (Vertraute verhandeln weniger hart, aber nicht immer besser) und Kultur.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Beratung verhandelt mit einem Mittelständler über ein Projekt zur KI-gestützten Angebotserstellung. Position des Kunden: das Budget darf eine bestimmte Grenze nicht überschreiten. Interessen dahinter: Er will das Risiko begrenzen, gegenüber dem Beirat ein vertretbares Ergebnis zeigen und nicht als der dastehen, der zu viel gezahlt hat. Position der Beratung: ein bestimmter Tagessatz. Interessen: Auslastung, ein Referenzprojekt in dieser Branche, keine Verluste durch ungeplanten Aufwand. Sobald die Interessen auf dem Tisch liegen, gibt es Optionen jenseits des Preises: eine Pilotphase mit Abbruchrecht, ein erfolgsabhängiger Anteil, eine Referenzvereinbarung, ein enger definierter Umfang.',
          'Der Praktikant beobachtet dabei die Psychologie: Wer nennt die erste Zahl, und wie stark orientieren sich alle folgenden daran? Rahmt der Kunde das Projekt als Kosten oder als vermiedene Verluste? Fragt jemand nach den Kriterien, etwa üblichen Tagessätzen in der Branche? Und was ist die BATNA beider Seiten: Für den Kunden vielleicht ein Softwareprodukt ohne Beratung, für die Beratung ein anderer Kunde in der Pipeline. Die Chefin, die vor dem Termin ihre BATNA kennt, kann Nein sagen, ohne die Beziehung zu belasten.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Sachbezogenes Verhandeln setzt voraus, dass beide Seiten daran interessiert sind; wer einem Verhandler gegenübersitzt, der nur Positionen handelt oder Druck ausübt, braucht Antworten, die das Buch zwar behandelt, die aber schwerer umzusetzen sind. Machtunterschiede lassen sich durch Methode nicht aufheben: Ein Großkunde mit vielen Alternativen hat eine bessere BATNA als eine kleine Beratung, und das bestimmt den Verhandlungsraum, bevor jemand spricht. Die Methode verbessert das Ergebnis innerhalb dieses Raums, sie verschiebt ihn nicht.',
          'Die psychologischen Befunde stammen überwiegend aus Laborverhandlungen mit Studierenden über einfache Aufgaben. Thompson, Wang und Gunia weisen darauf hin, dass Erfahrung, Wiederholung und echte Beziehungen die Effekte verändern. Der Ankereffekt des ersten Angebots ist gut belegt, aber ein unrealistisch hohes erstes Angebot kann die Gegenseite auch zum Abbruch bewegen; die Kunst liegt in einem ambitionierten, begründbaren ersten Vorschlag. Und der Rat, Emotionen zu kontrollieren, ist leichter gegeben als befolgt, besonders wenn es um das eigene Unternehmen geht.',
        ],
      },
    ],
    quellen: [Q.fisherUryPatton, Q.ponBatna, Q.galinskyMussweiler2001, Q.nealeBazerman1985, Q.thompsonWangGunia2010],
    sieheAuch: ['anker-bestaetigungsfehler', 'prospect-theory-framing', 'beratungsunternehmen', 'macht-mikropolitik', 'preispsychologie'],
    synonyme: ['BATNA', 'Harvard-Konzept', 'Principled Negotiation', 'Sachbezogenes Verhandeln', 'Fixed-Pie-Bias'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'rat-reaktanz',
    titel: 'Warum Rat abgelehnt wird: Reaktanz und die Psychologie des Ratnehmens',
    thema: 'psychologie',
    einleitung:
      'Beratung lebt davon, dass Rat angenommen wird. Die Forschung zeigt, dass Menschen fremden Rat systematisch abwerten, dass Druck den Widerstand verstärkt und dass, seltsam genug, bezahlter Rat mehr befolgt wird als kostenloser.',
    abschnitte: [
      {
        titel: 'Reaktanz',
        absaetze: [
          'Die Theorie der psychologischen Reaktanz, die Brehm 1966 vorlegte, beschreibt einen Zustand, der eintritt, wenn Menschen eine ihrer Handlungsfreiheiten bedroht oder beseitigt sehen: Sie werden motiviert, die Freiheit wiederherzustellen, etwa indem sie das Verbotene attraktiver finden, das Empfohlene ablehnen oder den Absender abwerten. Steindl, Jonas, Sittenthaler, Traut-Mattausch und Greenberg (2015) fassen den Forschungsstand zusammen: Reaktanz besteht aus Ärger und aus abwertenden Gedanken gegenüber der Botschaft, sie wird stärker, je wichtiger die bedrohte Freiheit und je nachdrücklicher die Formulierung ist, und sie tritt auch stellvertretend auf, wenn man beobachtet, wie die Freiheit anderer eingeschränkt wird.',
          'Für Beratung folgt daraus eine einfache Regel: Je mehr eine Empfehlung als Vorschrift klingt („Sie müssen“, „es gibt keine Alternative“), desto eher löst sie Widerstand aus, unabhängig von ihrer Qualität. Formulierungen, die die Wahl beim Empfänger lassen, zwei oder drei Optionen anbieten und die Entscheidung ausdrücklich dem Kunden überlassen, erhalten die Freiheit und damit die Bereitschaft zuzuhören.',
        ],
      },
      {
        titel: 'Wie Menschen mit Rat umgehen',
        absaetze: [
          'Yaniv und Kleinberger (2000) ließen Versuchspersonen Schätzfragen beantworten, gaben ihnen dann den Rat einer anderen Person und erlaubten eine Korrektur. Die Teilnehmer gewichteten ihre eigene Schätzung deutlich stärker als den Rat, auch wenn der Rat im Mittel ebenso gut war; die Autoren nennen das egozentrische Abwertung (egocentric discounting). Sie erklären sie damit, dass man die Gründe für die eigene Meinung kennt, die des Ratgebers aber nicht. Yaniv (2004) zeigt, dass diese Abwertung Genauigkeit kostet: Wer Rat stärker einbezog, lag näher an der Wahrheit. Bonaccio und Dalal (2006) fassen in ihrer Übersicht zusammen, wann Rat mehr Gewicht bekommt: bei ausgewiesener Fachkenntnis und Erfahrung des Ratgebers, bei schwierigen Aufgaben, bei geringem eigenem Vertrauen in das Urteil und wenn der Rat begründet wird.',
          'Gino (2008) ergänzt einen Befund, der jede Beratung betrifft: Rat, für den die Empfänger bezahlt hatten, wurde stärker berücksichtigt als derselbe Rat kostenlos, obwohl die Qualität identisch war. Die Erklärung liegt in den versunkenen Kosten und in der Vermutung, dass Bezahltes wertvoller sein müsse. Kostenlose Empfehlungen werden also nicht nur weniger bezahlt, sondern auch weniger befolgt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Beratung hat für einen Handwerksbetrieb analysiert, dass eine KI-gestützte Terminplanung wenig bringt, weil das eigentliche Problem die Ersatzteilverfügbarkeit ist. Der Inhaber hatte sich auf die Terminplanung festgelegt. Nach der Reaktanzforschung wäre der Satz „Terminplanung ist der falsche Ansatz“ ein Angriff auf seine Entscheidungsfreiheit. Wirksamer ist der Weg über Fragen und Optionen: Was passiert am Tag, wenn ein Termin platzt? Wie oft liegt es am Teil? Dann zwei Wege anbieten, beide mit Zahlen, und die Wahl beim Inhaber lassen. Der Artikel über das Beratungsgespräch beschreibt diesen Ansatz als Fragen statt Sagen.',
          'Die Befunde zum Ratnehmen erklären auch, warum begründeter Rat mehr wiegt: Bonaccio und Dalal nennen die Begründung als einen der stärksten Faktoren. Ein Vorschlag, dessen Herleitung der Kunde nachvollziehen kann, wird zum eigenen Gedanken, und eigene Gedanken werden nicht abgewertet. Für den Praktikanten heißt das: Wenn er der Chefin einen Vorschlag macht, gehört die Herleitung dazu, und sie gehört an den Anfang, nicht ans Ende.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Ratnahmeforschung arbeitet meist mit Schätzaufgaben, bei denen es eine richtige Antwort gibt; strategische Empfehlungen haben keine, und dort ist die Abwertung fremden Rats nicht immer ein Fehler. Ein Kunde, der die Beratung abwertet, weil ihr das Wissen über sein Geschäft fehlt, hat möglicherweise recht. Bonaccio und Dalal berichten zudem das Gegenteil der Abwertung: Menschen folgen selbstsicher vorgetragenem Rat zu stark, auch wenn die Sicherheit unbegründet ist. Beratungen profitieren von diesem Effekt, was sie zur Vorsicht verpflichtet.',
          'Reaktanz ist außerdem nicht nur ein Hindernis, sondern ein Signal. Wenn ein Kunde auf eine Empfehlung mit Ärger reagiert, kann das an der Formulierung liegen oder daran, dass die Empfehlung ein Interesse verletzt, das die Beratung nicht gesehen hat. Steindl und Kollegen betonen, dass Reaktanz umso stärker wird, je wichtiger die bedrohte Freiheit ist; sie zeigt also, wo dem Kunden etwas wichtig ist. Wer sie nur als Hürde behandelt und mit Gesprächstechnik umgeht, verpasst diese Information.',
        ],
      },
    ],
    quellen: [Q.steindl2015, Q.yanivKleinberger2000, Q.yaniv2004, Q.bonaccioDalal2006, Q.gino2008],
    sieheAuch: ['beratungsgespraech', 'aktives-zuhoeren', 'ueberzeugung-cialdini', 'sunk-cost-eskalation', 'widerstand-veraenderung'],
    synonyme: ['Psychologische Reaktanz', 'Advice Taking', 'Egozentrische Abwertung', 'Ratannahme'],
    unsicher: false,
  },
];
