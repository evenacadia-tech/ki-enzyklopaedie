import type { EigenerArtikel, Quelle } from '../../typen';

// Block 1 — Denken und Entscheiden. Alle Quellen am 2026-09-26 geprüft: Zeitschriften-
// artikel über die Crossref-Metadaten des DOI (Autor, Titel, Jahr, Band, Seiten),
// Verlags- und HBR-Seiten per Abruf.
const AB = '2026-09-26';
const Q = {
  // Behavioral Strategy
  powellLovalloFox2011: {
    titel: 'Powell, Lovallo & Fox — Behavioral Strategy (Strategic Management Journal 32(13), 2011)',
    url: 'https://doi.org/10.1002/smj.968',
    abgerufen: AB,
  } satisfies Quelle,
  sibonyLovalloPowell2017: {
    titel: 'Sibony, Lovallo & Powell — Behavioral Strategy and the Strategic Decision Architecture of the Firm (California Management Review 59(3), 2017)',
    url: 'https://doi.org/10.1177/0008125617712256',
    abgerufen: AB,
  } satisfies Quelle,
  kahneman2011Hbr: {
    titel: 'Kahneman, Lovallo & Sibony — Before You Make That Big Decision… (Harvard Business Review, 2011)',
    url: 'https://hbr.org/2011/06/the-big-idea-before-you-make-that-big-decision',
    abgerufen: AB,
  } satisfies Quelle,
  // Zwei Systeme, Heuristiken
  tverskyKahneman1974: {
    titel: 'Tversky & Kahneman — Judgment under Uncertainty: Heuristics and Biases (Science 185(4157), 1974)',
    url: 'https://doi.org/10.1126/science.185.4157.1124',
    abgerufen: AB,
  } satisfies Quelle,
  kahnemanNobel2002: {
    titel: 'Kahneman — Maps of Bounded Rationality, Prize Lecture (NobelPrize.org, 2002)',
    url: 'https://www.nobelprize.org/prizes/economic-sciences/2002/kahneman/lecture/',
    abgerufen: AB,
  } satisfies Quelle,
  kahneman2003: {
    titel: 'Kahneman — A Perspective on Judgment and Choice: Mapping Bounded Rationality (American Psychologist 58(9), 2003)',
    url: 'https://doi.org/10.1037/0003-066X.58.9.697',
    abgerufen: AB,
  } satisfies Quelle,
  stanovichWest2000: {
    titel: 'Stanovich & West — Individual Differences in Reasoning: Implications for the Rationality Debate? (Behavioral and Brain Sciences 23(5), 2000)',
    url: 'https://doi.org/10.1017/S0140525X00003435',
    abgerufen: AB,
  } satisfies Quelle,
  kahnemanTfs: {
    titel: 'Kahneman — Thinking, Fast and Slow, Verlagsseite (Penguin, 2011)',
    url: 'https://www.penguin.co.uk/books/56314/thinking-fast-and-slow-by-kahneman-daniel/9780141033570',
    abgerufen: AB,
  } satisfies Quelle,
  gigerenzerGaissmaier2011: {
    titel: 'Gigerenzer & Gaissmaier — Heuristic Decision Making (Annual Review of Psychology 62, 2011)',
    url: 'https://doi.org/10.1146/annurev-psych-120709-145346',
    abgerufen: AB,
  } satisfies Quelle,
  // Prospect Theory
  kahnemanTversky1979: {
    titel: 'Kahneman & Tversky — Prospect Theory: An Analysis of Decision under Risk (Econometrica 47(2), 1979)',
    url: 'https://doi.org/10.2307/1914185',
    abgerufen: AB,
  } satisfies Quelle,
  tverskyKahneman1981: {
    titel: 'Tversky & Kahneman — The Framing of Decisions and the Psychology of Choice (Science 211(4481), 1981)',
    url: 'https://doi.org/10.1126/science.7455683',
    abgerufen: AB,
  } satisfies Quelle,
  kahnemanKnetschThaler1991: {
    titel: 'Kahneman, Knetsch & Thaler — Anomalies: The Endowment Effect, Loss Aversion, and Status Quo Bias (Journal of Economic Perspectives 5(1), 1991)',
    url: 'https://doi.org/10.1257/jep.5.1.193',
    abgerufen: AB,
  } satisfies Quelle,
  nobel2002Presse: {
    titel: 'Königlich Schwedische Akademie der Wissenschaften — The Prize in Economic Sciences 2002, Pressemitteilung (NobelPrize.org, 2002)',
    url: 'https://www.nobelprize.org/prizes/economic-sciences/2002/press-release/',
    abgerufen: AB,
  } satisfies Quelle,
  // Anker und Bestätigung
  englichMussweilerStrack2006: {
    titel: 'Englich, Mussweiler & Strack — Playing Dice With Criminal Sentences: The Influence of Irrelevant Anchors on Experts’ Judicial Decision Making (Personality and Social Psychology Bulletin 32(2), 2006)',
    url: 'https://doi.org/10.1177/0146167205282152',
    abgerufen: AB,
  } satisfies Quelle,
  furnhamBoo2011: {
    titel: 'Furnham & Boo — A Literature Review of the Anchoring Effect (Journal of Socio-Economics 40(1), 2011)',
    url: 'https://doi.org/10.1016/j.socec.2010.10.008',
    abgerufen: AB,
  } satisfies Quelle,
  wason1960: {
    titel: 'Wason — On the Failure to Eliminate Hypotheses in a Conceptual Task (Quarterly Journal of Experimental Psychology 12(3), 1960)',
    url: 'https://doi.org/10.1080/17470216008416717',
    abgerufen: AB,
  } satisfies Quelle,
  nickerson1998: {
    titel: 'Nickerson — Confirmation Bias: A Ubiquitous Phenomenon in Many Guises (Review of General Psychology 2(2), 1998)',
    url: 'https://doi.org/10.1037/1089-2680.2.2.175',
    abgerufen: AB,
  } satisfies Quelle,
  // Sunk Cost und Eskalation
  arkesBlumer1985: {
    titel: 'Arkes & Blumer — The Psychology of Sunk Cost (Organizational Behavior and Human Decision Processes 35(1), 1985)',
    url: 'https://doi.org/10.1016/0749-5978(85)90049-4',
    abgerufen: AB,
  } satisfies Quelle,
  staw1976: {
    titel: 'Staw — Knee-Deep in the Big Muddy: A Study of Escalating Commitment to a Chosen Course of Action (Organizational Behavior and Human Performance 16(1), 1976)',
    url: 'https://doi.org/10.1016/0030-5073(76)90005-2',
    abgerufen: AB,
  } satisfies Quelle,
  staw1981: {
    titel: 'Staw — The Escalation of Commitment to a Course of Action (Academy of Management Review 6(4), 1981)',
    url: 'https://doi.org/10.5465/amr.1981.4285694',
    abgerufen: AB,
  } satisfies Quelle,
  sleesman2012: {
    titel: 'Sleesman, Conlon, McNamara & Miles — Cleaning Up the Big Muddy: A Meta-Analytic Review of the Determinants of Escalation of Commitment (Academy of Management Journal 55(3), 2012)',
    url: 'https://doi.org/10.5465/amj.2010.0696',
    abgerufen: AB,
  } satisfies Quelle,
  // Status quo, Besitz, Voreinstellung
  samuelsonZeckhauser1988: {
    titel: 'Samuelson & Zeckhauser — Status Quo Bias in Decision Making (Journal of Risk and Uncertainty 1(1), 1988)',
    url: 'https://doi.org/10.1007/BF00055564',
    abgerufen: AB,
  } satisfies Quelle,
  kahnemanKnetschThaler1990: {
    titel: 'Kahneman, Knetsch & Thaler — Experimental Tests of the Endowment Effect and the Coase Theorem (Journal of Political Economy 98(6), 1990)',
    url: 'https://doi.org/10.1086/261737',
    abgerufen: AB,
  } satisfies Quelle,
  johnsonGoldstein2003: {
    titel: 'Johnson & Goldstein — Do Defaults Save Lives? (Science 302(5649), 2003)',
    url: 'https://doi.org/10.1126/science.1091721',
    abgerufen: AB,
  } satisfies Quelle,
  madrianShea2001: {
    titel: 'Madrian & Shea — The Power of Suggestion: Inertia in 401(k) Participation and Savings Behavior (Quarterly Journal of Economics 116(4), 2001)',
    url: 'https://doi.org/10.1162/003355301753265543',
    abgerufen: AB,
  } satisfies Quelle,
  // Intuition und Expertise
  kahnemanKlein2009: {
    titel: 'Kahneman & Klein — Conditions for Intuitive Expertise: A Failure to Disagree (American Psychologist 64(6), 2009)',
    url: 'https://doi.org/10.1037/a0016755',
    abgerufen: AB,
  } satisfies Quelle,
  kleinSourcesOfPower: {
    titel: 'Klein — Sources of Power: How People Make Decisions, 20th Anniversary Edition, Verlagsseite (MIT Press, 2017; Erstauflage 1998)',
    url: 'https://mitpress.mit.edu/9780262534291/sources-of-power/',
    abgerufen: AB,
  } satisfies Quelle,
  tetlock2005: {
    titel: 'Tetlock — Expert Political Judgment: How Good Is It? How Can We Know?, Verlagsseite (Princeton University Press, 2005; Neuausgabe 2017)',
    url: 'https://press.princeton.edu/books/paperback/9780691175973/expert-political-judgment',
    abgerufen: AB,
  } satisfies Quelle,
  ericsson1993: {
    titel: 'Ericsson, Krampe & Tesch-Römer — The Role of Deliberate Practice in the Acquisition of Expert Performance (Psychological Review 100(3), 1993)',
    url: 'https://doi.org/10.1037/0033-295X.100.3.363',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block1: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'behavioral-strategy',
    titel: 'Behavioral Strategy: warum Psychologie in die Strategie gehört',
    thema: 'psychologie',
    einleitung:
      'Strategien werden von Menschen gemacht, und Menschen urteilen systematisch verzerrt. Behavioral Strategy verbindet die Erkenntnisse der Psychologie mit dem Strategieprozess und fragt, wie ein Unternehmen trotz dieser Verzerrungen zu guten Entscheidungen kommt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Powell, Lovallo und Fox (2011) beschreiben Behavioral Strategy als den Versuch, kognitive und soziale Psychologie mit der Theorie und Praxis des strategischen Managements zusammenzubringen. Ziel ist es, die Strategieforschung auf realistische Annahmen über menschliches Denken, Fühlen und Verhalten zu stellen, statt auf das Bild eines rein rationalen Entscheiders. Die Autoren halten fest, dass die Strategielehre lange mit diesem Idealbild gearbeitet hat, obwohl die Psychologie seit Jahrzehnten zeigt, wie Menschen tatsächlich urteilen: mit Faustregeln, mit Emotionen und unter dem Einfluss ihrer Gruppe.',
          'Der Begriff ist bewusst breit. Er umfasst die Forschung zu Urteilsverzerrungen (biases) einzelner Entscheider, die Psychologie von Führungsteams und Gremien sowie die Frage, wie Organisationen ihre Strategieprozesse so gestalten, dass Fehler früh sichtbar werden. Die folgenden Artikel dieser Sammlung gehen die Bausteine einzeln durch: zwei Denkmodi und Heuristiken, Verlustaversion und Framing, Anker- und Bestätigungsfehler, versunkene Kosten, Status-quo-Bias und die Frage, wann Intuition trägt.',
        ],
      },
      {
        titel: 'Vom Einzelnen zum Prozess',
        absaetze: [
          'Kahneman, Lovallo und Sibony (2011) ziehen eine Grenze, die für die Praxis entscheidend ist: Der Einzelne kann seine eigenen Verzerrungen kaum korrigieren, weil er sie im Moment des Urteilens nicht bemerkt. Eine Organisation dagegen kann Verfahren einrichten, die fremde Urteile prüfen, etwa eine Prüfliste, die ein Entscheider vor der Annahme einer Empfehlung durchgeht. Die Autoren sprechen von Qualitätskontrolle für Entscheidungen, analog zur Qualitätskontrolle in der Fertigung.',
          'Sibony, Lovallo und Powell (2017) bauen diesen Gedanken zur Entscheidungsarchitektur des Unternehmens aus (strategic decision architecture): Wer trifft welche Entscheidung, mit welchen Informationen, in welcher Reihenfolge, nach welcher Debatte? Sie ordnen typische Verzerrungen in Familien, etwa Mustererkennungs-, Handlungs-, Stabilitäts-, Interessen- und soziale Verzerrungen, und schlagen vor, den Strategieprozess so zu bauen, dass jede Familie ein Gegengewicht bekommt: unabhängige Schätzungen gegen Ankereffekte, eine Außensicht gegen Überoptimismus, ausdrücklich zugelassenen Widerspruch gegen Gruppendruck.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine kleine KI-Beratung begleitet ein Handelsunternehmen bei der Frage, ob es eine eigene Nachfrageprognose mit maschinellem Lernen aufbauen soll. Der Geschäftsführer des Kunden hat den Vorschlag selbst eingebracht und ist sichtlich begeistert; der Beratung fällt auf, dass die Vorlage keine Alternative nennt und die erwartete Ersparnis auf einer einzigen Annahme über die Fehlerquote der bisherigen Planung ruht. Behavioral Strategy heißt hier nicht, dem Geschäftsführer einen Denkfehler vorzuhalten, sondern den Prozess zu ergänzen: eine zweite, unabhängig geschätzte Ersparniszahl, eine Vergleichsklasse ähnlicher Projekte und ein Termin, an dem jemand die Gegenposition vertritt.',
          'Für den Praktikanten ist der Nutzen des Konzepts zunächst diagnostisch. In Meetings lässt sich beobachten, welche Verzerrungsfamilie gerade wirkt: Wird eine Zahl aus der ersten Folie in allen weiteren Rechnungen weitergetragen (Anker)? Bleibt Widerspruch aus, sobald die Chefin ihre Meinung gesagt hat (sozial)? Wird ein laufendes Projekt verteidigt, weil schon viel investiert wurde (Stabilität)? Wer diese Muster benennen kann, versteht, warum erfahrene Berater bestimmte Fragen in einer bestimmten Reihenfolge stellen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein großer Teil der Befunde stammt aus Laborexperimenten mit Studierenden und einfachen Aufgaben. Ob dieselben Effekte in Führungsteams mit hohem Einsatz, viel Erfahrung und echten Konsequenzen gleich stark wirken, ist weniger gut belegt; Powell, Lovallo und Fox selbst fordern mehr Feldforschung. Wer jede Meinungsverschiedenheit als Verzerrung etikettiert, betreibt ein Bias-Bingo, das Argumente entwertet, statt sie zu prüfen. Nicht jede Beharrlichkeit ist Sunk Cost, nicht jede Begeisterung Überoptimismus.',
          'Die Prozesslösung hat ihren Preis. Unabhängige Schätzungen, Außensichten und institutionalisierter Widerspruch kosten Zeit, und in einer inhabergeführten Firma entscheidet am Ende oft eine Person, die den Prozess auch abkürzen kann. Kahneman, Lovallo und Sibony betonen, dass die Prüfliste nur wirkt, wenn der Prüfende nicht selbst am Vorschlag hängt. Zudem ist die Psychologie als Wissenschaft in den letzten Jahren durch Replikationsprobleme gegangen; welche Effekte robust sind und welche nicht, behandelt der letzte Artikel dieser Sammlung.',
        ],
      },
    ],
    quellen: [Q.powellLovalloFox2011, Q.sibonyLovalloPowell2017, Q.kahneman2011Hbr],
    sieheAuch: ['entscheidungen-verzerrungen', 'zwei-systeme-heuristiken', 'strategie-entstehung', 'psychologie-befunde-lesen'],
    synonyme: ['Verhaltensorientierte Strategie', 'Entscheidungsarchitektur', 'Bias-Familien'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'zwei-systeme-heuristiken',
    titel: 'Schnell und langsam: zwei Systeme und drei Heuristiken',
    thema: 'psychologie',
    einleitung:
      'Menschen urteilen meist schnell und mühelos, gelegentlich langsam und angestrengt. Das Modell zweier Denksysteme und die drei klassischen Heuristiken erklären, warum schnelle Urteile oft gut und manchmal vorhersagbar falsch sind.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Tversky und Kahneman (1974) beschreiben, wie Menschen unter Unsicherheit urteilen: nicht mit Wahrscheinlichkeitsrechnung, sondern mit wenigen Faustregeln (Heuristiken), die komplexe Fragen auf einfachere zurückführen. Drei Heuristiken stehen im Mittelpunkt. Repräsentativität: Wie sehr gleicht der Fall dem typischen Bild einer Kategorie? Wer so urteilt, ignoriert Grundraten und Stichprobengrößen. Verfügbarkeit: Wie leicht fallen Beispiele ein? Was medial präsent oder persönlich erlebt ist, wirkt häufiger, als es ist. Anker und Anpassung: Ein Ausgangswert, selbst ein zufälliger, zieht die Schätzung zu sich hin. In einem Experiment der Autoren schätzten Gruppen den Anteil afrikanischer Staaten in den Vereinten Nationen nach einem Glücksrad-Anker von 10 im Mittel auf 25 Prozent, nach einem Anker von 65 auf 45 Prozent.',
          'Die Bezeichnungen System 1 und System 2 stammen von Stanovich und West (2000). Kahneman (2003) nutzt sie, um zwei Modi zu unterscheiden: System 1 arbeitet schnell, automatisch, assoziativ und mühelos; System 2 langsam, kontrolliert, regelgeleitet und anstrengend. Viele Urteilsfehler entstehen, wenn System 1 eine schwierige Frage unbemerkt durch eine leichtere ersetzt (attribute substitution): Statt „Wie wahrscheinlich ist dieser Erfolg?“ beantwortet es „Wie gut passt die Geschichte?“ System 2 könnte korrigieren, tut es aber nur, wenn es alarmiert wird und Kapazität hat.',
        ],
      },
      {
        titel: 'Heuristiken sind nicht nur Fehler',
        absaetze: [
          'Gigerenzer und Gaissmaier (2011) betonen die andere Seite: Heuristiken sind oft nicht Notlösungen, sondern angepasste Werkzeuge, die in unsicheren Umgebungen mit wenig Daten sogar genauer treffen als aufwendige Modelle, weil sie weniger überanpassen. Eine einfache Regel wie „nimm die eine beste Information“ kann in der richtigen Umgebung robuster sein als eine Regression über viele Variablen. Der Streit zwischen beiden Lagern dreht sich weniger darum, ob Heuristiken existieren, als darum, wann sie taugen. Die praktische Lehre lautet: Die Umgebung entscheidet, nicht die Regel an sich.',
          'Kahnemans Buch Thinking, Fast and Slow (2011) hat das Modell populär gemacht und zugleich zu einer verbreiteten Verkürzung geführt, System 1 sei „schlecht“ und System 2 „gut“. Kahneman selbst schreibt, dass System 1 die meisten Alltagsurteile zuverlässig erledigt und System 2 träge ist, oft nur die Vorschläge von System 1 absegnet und keineswegs fehlerfrei rechnet. Ein Experte, der ein Muster sofort erkennt, nutzt System 1, und zwar gut, wenn das Muster gelernt und die Umgebung regelmäßig ist (dazu der Artikel über Intuition und Expertise).',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'In einem Erstgespräch schildert ein Maschinenbauer, dass ein Wettbewerber „mit KI“ die Angebotserstellung halbiert habe, und will dasselbe. Repräsentativität und Verfügbarkeit arbeiten hier zusammen: Ein einzelner, gut erzählter Fall ersetzt die Frage, wie viele vergleichbare Unternehmen mit solchen Projekten Erfolg hatten. Die Beraterin verlangsamt das Gespräch mit Fragen nach dem Ausgangszustand: Wie lange dauert die Angebotserstellung heute, wo geht die Zeit verloren, welcher Teil davon ist überhaupt automatisierbar? Das ist System 2, eingeschaltet durch die Struktur des Gesprächs, nicht durch Willensanstrengung.',
          'Der Praktikant kann in Meetings zwei Beobachtungen üben. Erstens: Welche Frage wird gerade tatsächlich beantwortet, und ist es die gestellte? Wenn nach der Wahrscheinlichkeit eines Projekterfolgs gefragt wird und die Antwort eine Beschreibung ist, wie überzeugend der Anbieter wirkte, hat eine Ersetzung stattgefunden. Zweitens: Welche Zahl wurde zuerst genannt? Sie wird mit hoher Wahrscheinlichkeit als Anker in allen weiteren Überlegungen weiterwirken, auch wenn niemand sie ernst gemeint hat.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die zwei Systeme sind ein Modell, keine Hirnregionen. Kahneman nennt sie selbst nützliche Fiktionen, die das Verhalten beschreiben, nicht einen Mechanismus im Kopf. Wer das übersieht, erklärt Verhalten scheinbar, indem er es nur umbenennt: „Das war System 1“ ist keine Erklärung. Gigerenzer und Gaissmaier kritisieren außerdem, dass die Heuristik-und-Bias-Forschung Fehler an Normen misst, die für den Einzelfall nicht immer die richtigen sind.',
          'Die Effekte sind zudem unterschiedlich robust. Ankereffekte gehören zu den am besten replizierten Befunden der Psychologie; andere Effekte, die in der populären Literatur denselben Rang bekommen haben, sind in großen Wiederholungsstudien geschrumpft oder verschwunden. Für die Praxis heißt das: Nicht jede Geschichte über einen Denkfehler ist ein belastbarer Befund, und die Aufgabe eines Beraters ist nicht, Kunden Fehler nachzuweisen, sondern Gesprächsstrukturen zu bauen, in denen das langsame Denken eine Chance hat.',
        ],
      },
    ],
    quellen: [Q.tverskyKahneman1974, Q.kahneman2003, Q.stanovichWest2000, Q.gigerenzerGaissmaier2011, Q.kahnemanTfs],
    sieheAuch: ['behavioral-strategy', 'anker-bestaetigungsfehler', 'intuition-expertise', 'hypothesen-issue-trees'],
    synonyme: ['System 1 und System 2', 'Heuristiken', 'Repräsentativität', 'Verfügbarkeitsheuristik', 'Dual-Process'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'prospect-theory-framing',
    titel: 'Prospect Theory: Verlustaversion und Framing',
    thema: 'psychologie',
    einleitung:
      'Menschen bewerten Ergebnisse nicht absolut, sondern als Gewinn oder Verlust gegenüber einem Bezugspunkt, und Verluste wiegen schwerer als gleich große Gewinne. Diese Einsicht erklärt, warum dieselbe Entscheidung anders ausfällt, je nachdem, wie sie beschrieben wird.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Kahneman und Tversky (1979) stellten der klassischen Erwartungsnutzentheorie eine beschreibende Theorie gegenüber, die erklärt, wie Menschen tatsächlich zwischen riskanten Optionen wählen. Drei Bausteine tragen die Prospect Theory. Erstens der Bezugspunkt: Nicht der Endzustand zählt, sondern die Veränderung gegenüber dem, was man als Ausgangslage empfindet. Zweitens die Wertfunktion: Sie ist im Gewinnbereich konkav und im Verlustbereich konvex, also nimmt die Empfindlichkeit mit der Entfernung vom Bezugspunkt ab, und sie ist für Verluste steiler als für Gewinne. Diese Asymmetrie heißt Verlustaversion (loss aversion). Drittens die Gewichtung von Wahrscheinlichkeiten: Kleine Wahrscheinlichkeiten werden über-, mittlere und hohe untergewichtet, was den Reiz von Lotterien und Versicherungen zugleich erklärt.',
          'Aus der Form der Wertfunktion folgt ein Muster, das in der Strategie ständig auftaucht: Im Gewinnbereich sind Menschen risikoscheu, im Verlustbereich risikofreudig. Wer sich als Verlierer sieht, setzt eher alles auf eine Karte, um den Verlust noch abzuwenden; wer sich als Gewinner sieht, sichert lieber ab. Die Königlich Schwedische Akademie der Wissenschaften nennt in ihrer Pressemitteilung zum Preis für Wirtschaftswissenschaften 2002 diese Verbindung von psychologischer Forschung und ökonomischer Analyse als Kahnemans zentrale Leistung.',
        ],
      },
      {
        titel: 'Framing: dieselbe Wahl, andere Beschreibung',
        absaetze: [
          'Tversky und Kahneman (1981) zeigten, dass die Formulierung eines Problems den Bezugspunkt verschiebt und damit die Wahl. In ihrem bekanntesten Beispiel sollen Versuchspersonen zwischen zwei Programmen gegen eine Krankheit wählen, die 600 Menschen bedroht. Im Gewinnrahmen („Programm A rettet 200 Menschen“ gegen „Programm B rettet mit einer Wahrscheinlichkeit von einem Drittel alle 600, mit zwei Dritteln niemanden“) wählten 72 Prozent das sichere Programm A. Im Verlustrahmen („Programm C: 400 Menschen sterben“ gegen „Programm D: mit einem Drittel stirbt niemand, mit zwei Dritteln sterben alle 600“) wählten 78 Prozent das riskante Programm D. Die Optionen sind identisch; nur der Rahmen (frame) unterscheidet sich.',
          'Kahneman, Knetsch und Thaler (1991) fassen die Folgen der Verlustaversion außerhalb des Labors zusammen: den Besitztumseffekt, bei dem Menschen für ein Gut, das sie besitzen, mehr verlangen, als sie dafür zahlen würden, und den Status-quo-Bias, die Neigung, beim Bestehenden zu bleiben, weil jede Änderung Verluste sichtbar macht, bevor die Gewinne kommen. Beide behandelt ein eigener Artikel dieser Sammlung.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Familienunternehmen hat in den vergangenen zwei Jahren Marktanteile verloren, und der Inhaber drängt auf ein großes KI-Projekt, das „alles auf einmal“ löst. Aus Sicht der Prospect Theory sitzt er im Verlustbereich und ist entsprechend risikofreudig; die kleine, prüfbare Lösung wirkt auf ihn wie das Eingeständnis des Verlusts. Die Beratung kann den Bezugspunkt verschieben, ohne zu manipulieren: Sie beschreibt den heutigen Zustand als Ausgangslage eines Neuanfangs und stellt die kleine Lösung als ersten gesicherten Gewinn dar, auf den weitere folgen. Ob das gelingt, zeigt sich daran, ob der Inhaber die Pilotphase als Fortschritt oder als Zögern erlebt.',
          'Umgekehrt erklärt Verlustaversion, warum ein Vorschlag, der dem Kunden Einsparungen verspricht, weniger zieht als einer, der verhindert, dass er Kunden an einen schnelleren Wettbewerber verliert. Die Beraterin formuliert daher beide Seiten und lässt den Kunden entscheiden, welche ihn trägt. Der Praktikant notiert, welche Formulierung im Raum die Wahl gekippt hat. Die Grenze zur Manipulation verläuft dort, wo ein Rahmen gewählt wird, um eine Entscheidung zu erzwingen, die der Kunde bei vollständiger Darstellung nicht treffen würde; der Artikel zu Persuasion und Dark Patterns behandelt diese Grenze.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Prospect Theory beschreibt Einzelentscheidungen unter klar definiertem Risiko mit bekannten Wahrscheinlichkeiten. Strategische Entscheidungen haben selten bekannte Wahrscheinlichkeiten, ziehen sich über Jahre und werden in Gruppen getroffen; wie stark die Effekte dort wirken, ist weniger klar. Framing-Effekte sind bei Fachleuten mit Erfahrung im jeweiligen Gebiet und bei wiederholten Entscheidungen oft schwächer als im Labor. Zudem hängt der Bezugspunkt vom Kontext ab und ist nicht immer eindeutig; verschiedene Beteiligte einer Entscheidung können unterschiedliche Bezugspunkte haben, ohne dass einer von ihnen falsch liegt.',
          'Ein zweiter Einwand betrifft die Anwendung. Wer Framing kennt, kann es nutzen, um Entscheidungen zu steuern; das Werkzeug ist neutral, die Verwendung nicht. Für eine Beratung, die von Vertrauen lebt, ist die Regel einfach: Beide Rahmen offen legen und den Kunden wählen lassen. Ein Berater, der ausschließlich den Verlustrahmen bedient, um ein Projekt zu verkaufen, gewinnt einen Auftrag und verliert seine Glaubwürdigkeit.',
        ],
      },
    ],
    quellen: [Q.kahnemanTversky1979, Q.tverskyKahneman1981, Q.kahnemanKnetschThaler1991, Q.nobel2002Presse],
    sieheAuch: ['status-quo-default', 'verhandeln-psychologie', 'persuasion-dark-patterns', 'szenarioplanung'],
    synonyme: ['Neue Erwartungstheorie', 'Verlustaversion', 'Loss Aversion', 'Framing-Effekt', 'Bezugspunkt'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'anker-bestaetigungsfehler',
    titel: 'Ankereffekt und Bestätigungsfehler',
    thema: 'psychologie',
    einleitung:
      'Zwei Verzerrungen wirken in fast jedem Projekt: Die erste Zahl im Raum zieht alle späteren Schätzungen zu sich, und die erste Hypothese lenkt, welche Belege überhaupt gesucht werden. Beide sind gut belegt und schwer abzustellen.',
    abschnitte: [
      {
        titel: 'Der Ankereffekt',
        absaetze: [
          'Ein Anker ist ein Ausgangswert, der eine nachfolgende Schätzung beeinflusst, auch wenn er mit der Frage nichts zu tun hat. Furnham und Boo (2011) fassen in ihrer Literaturübersicht zusammen, dass der Effekt in vielen Bereichen nachgewiesen wurde, von Preisschätzungen über Verhandlungen bis zu Rechtsurteilen, und dass er schwer zu neutralisieren ist: Warnungen, Anreize für Genauigkeit und Fachwissen schwächen ihn allenfalls ab. Als Erklärungen diskutieren sie unzureichende Anpassung vom Anker weg und die selektive Aktivierung ankerkonformen Wissens.',
          'Wie weit das reicht, zeigt das Experiment von Englich, Mussweiler und Strack (2006): Erfahrene Richter und Staatsanwälte beurteilten einen Fall, nachdem sie eine Strafforderung erhalten hatten, die sichtbar durch Würfeln bestimmt worden war. Trotzdem fielen die Strafmaße der Gruppe mit dem hohen Würfelanker höher aus als die der Gruppe mit dem niedrigen. Expertise schützte nicht. Für Projekte heißt das: Die erste genannte Budgetzahl, die erste Dauer, die erste Ersparnisschätzung wirken weiter, selbst wenn alle wissen, dass sie aus der Luft gegriffen war.',
        ],
      },
      {
        titel: 'Der Bestätigungsfehler',
        absaetze: [
          'Wason (1960) gab Versuchspersonen die Zahlenfolge 2-4-6 und bat sie, die Regel zu finden, nach der sie gebildet war, indem sie eigene Dreierfolgen vorschlugen und erfuhren, ob diese der Regel entsprachen. Die meisten bildeten eine Hypothese (etwa „Schritte von zwei“) und prüften sie nur mit Folgen, die dazu passten. Die tatsächliche Regel war einfacher, „aufsteigende Zahlen“, und ließ sich nur finden, wenn man Folgen testete, die der eigenen Hypothese widersprachen. Die wenigsten taten das.',
          'Nickerson (1998) definiert den Bestätigungsfehler (confirmation bias) als die Neigung, Belege so zu suchen, zu deuten und zu gewichten, dass sie bestehende Überzeugungen stützen, und zeigt, wie allgegenwärtig er ist: in der Wissenschaft, in der Medizin, vor Gericht, in der Politik. Er unterscheidet die bewusste Verteidigung einer Position von der unbewussten Verzerrung, die auch Menschen trifft, die ehrlich prüfen wollen. Hypothesengetriebenes Arbeiten, wie Beratungen es pflegen, ist genau deshalb ein zweischneidiges Werkzeug: Es macht schnell, und es macht anfällig.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Beim Kick-off eines Projekts zur automatisierten Rechnungsprüfung sagt der Finanzleiter beiläufig, er rechne mit „vielleicht 40 Prozent weniger Aufwand“. Niemand hat diese Zahl geprüft, aber sie taucht wenig später im Business Case wieder auf, und alle folgenden Schätzungen kreisen um sie. Die Gegenmaßnahme ist Verfahren, nicht Willenskraft: Jeder Beteiligte schreibt seine Schätzung auf, bevor Zahlen genannt werden; die Beratung leitet ihre Schätzung aus Messungen des heutigen Prozesses ab, nicht aus dem Gespräch; und die erste Zahl wird ausdrücklich als Platzhalter markiert.',
          'Gegen den Bestätigungsfehler hilft eine Regel aus der hypothesengetriebenen Arbeit: Für jede Hypothese wird vorher festgelegt, welcher Befund sie widerlegen würde, und dieser Befund wird gezielt gesucht. Der Praktikant kann eine einfache Übung anwenden: Nach einem Kundentermin notiert er drei Beobachtungen, die gegen die Arbeitshypothese des Teams sprechen. Fällt ihm keine ein, wurde vermutlich nicht danach gesucht.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Beide Effekte sind gut repliziert, aber nicht jede erste Zahl ist ein Anker im schädlichen Sinn. Eine begründete Schätzung eines Fachmanns ist eine Information, und sich daran zu orientieren, ist vernünftig. Problematisch ist der Anker erst, wenn seine Herkunft nicht mehr geprüft wird. Ähnlich ist eine Hypothese, die man verteidigt, nicht automatisch ein Bestätigungsfehler; Nickerson weist darauf hin, dass ein gewisses Festhalten an Überzeugungen nötig ist, um überhaupt systematisch arbeiten zu können.',
          'Die Gegenmaßnahmen sind einfach zu beschreiben und schwer durchzuhalten. Unabhängige Schätzungen brauchen Disziplin im Meeting, das Suchen nach Gegenbelegen kostet Zeit, und ein Kunde, der seine Zahl genannt hat, erlebt die Prüfung leicht als Misstrauen. Ob ein Team die Verfahren wirklich anwendet, entscheidet sich weniger am Wissen über die Verzerrungen als an der Frage, ob Widerspruch in diesem Team erwünscht ist; dazu die Artikel über psychologische Sicherheit und Gruppendenken.',
        ],
      },
    ],
    quellen: [Q.tverskyKahneman1974, Q.furnhamBoo2011, Q.englichMussweilerStrack2006, Q.wason1960, Q.nickerson1998],
    sieheAuch: ['zwei-systeme-heuristiken', 'hypothesen-issue-trees', 'entscheidungen-verzerrungen', 'psychologische-sicherheit', 'verhandeln-psychologie'],
    synonyme: ['Anchoring', 'Confirmation Bias', 'Ankerheuristik', 'Bestätigungstendenz'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'sunk-cost-eskalation',
    titel: 'Versunkene Kosten und die Eskalation des Engagements',
    thema: 'psychologie',
    einleitung:
      'Was bereits investiert ist, sollte für die Entscheidung über die Zukunft keine Rolle spielen. Tatsächlich hält es Menschen und Organisationen in scheiternden Vorhaben fest, und je mehr sie verantwortet haben, desto stärker.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ökonomisch gilt: Kosten, die bereits angefallen sind und sich nicht zurückholen lassen (sunk costs), dürfen eine Entscheidung nicht beeinflussen; nur künftige Kosten und Nutzen zählen. Arkes und Blumer (1985) zeigten, dass Menschen diese Regel systematisch verletzen. In einem Feldexperiment kauften Besucher eines Universitätstheaters Saisonkarten zu unterschiedlichen Preisen, ohne es zu wissen per Zufall zugeteilt; wer den vollen Preis gezahlt hatte, besuchte in der ersten Saisonhälfte mehr Vorstellungen als wer einen Rabatt bekommen hatte. Das Geld war in beiden Fällen weg, aber wer mehr investiert hatte, wollte es nicht „verschwenden“.',
          'Staw (1976) untersuchte die organisatorische Seite. Versuchspersonen verteilten in einer Fallstudie Forschungsmittel auf Geschäftsbereiche eines Unternehmens; nach negativer Rückmeldung über den gewählten Bereich investierten diejenigen, die die erste Entscheidung selbst getroffen hatten, deutlich mehr in denselben Bereich als diejenigen, die die erste Entscheidung nur übernommen hatten. Staw (1981) nennt das die Eskalation des Engagements (escalation of commitment) und erklärt sie mit dem Bedürfnis, die eigene frühere Entscheidung vor sich und anderen zu rechtfertigen.',
        ],
      },
      {
        titel: 'Was die Eskalation antreibt',
        absaetze: [
          'Sleesman, Conlon, McNamara und Miles (2012) haben die Forschung zu den Bestimmungsgründen der Eskalation in einer Metaanalyse zusammengefasst und die Einflussgrößen in vier Klassen geordnet: Merkmale des Projekts (etwa Höhe der versunkenen Kosten, Nähe zur Fertigstellung, erwarteter Nutzen), psychologische Merkmale des Entscheiders (Selbstrechtfertigung, Risikoneigung, Überoptimismus), soziale Faktoren (Rechtfertigungsdruck gegenüber anderen, Widerstand gegen Gesichtsverlust) und strukturelle Faktoren (politischer Rückhalt für das Projekt, Trägheit der Organisation). Die stärksten Effekte fanden sie bei Projektmerkmalen und bei Selbstrechtfertigung.',
          'Aus dieser Ordnung folgen die Gegenmaßnahmen: Kriterien für den Abbruch werden vor dem Start festgelegt, solange niemand etwas zu verteidigen hat; die Entscheidung über die Fortsetzung wird von jemandem getroffen, der die Startentscheidung nicht getroffen hat; und der Fortschritt wird an der Außensicht gemessen, also an vergleichbaren Projekten, nicht am eigenen Gefühl, kurz vor dem Durchbruch zu stehen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Kunde hat vor einem Jahr mit einem anderen Dienstleister einen Chatbot für den Kundenservice gestartet. Das Projekt hat mehrere Planungsrunden hinter sich, die Antwortqualität ist weiter schlecht, und die Geschäftsführung hat den Bot intern als Leuchtturmprojekt angekündigt. Alle vier Eskalationstreiber sind da: hohe versunkene Kosten, eine Geschäftsführung, die ihre Entscheidung rechtfertigen muss, ein öffentliches Versprechen und ein Lenkungskreis, der aus Befürwortern besteht. Die neue Beratung wird gefragt, wie man den Bot „endlich zum Laufen bringt“.',
          'Die ehrliche Antwort beginnt mit der Trennung von Vergangenheit und Zukunft: Was würde man heute mit dem heutigen Wissen tun, wenn noch nichts investiert wäre? Diese Frage lässt sich stellen, ohne jemanden bloßzustellen, indem man sie als Prüfschritt darstellt, den jedes Projekt nach einem Jahr verdient. Der Praktikant beobachtet dabei, wie die Chefin die Selbstrechtfertigung entschärft: Sie würdigt, was gelernt wurde, benennt die Kriterien für die nächste Entscheidung und schlägt vor, dass jemand außerhalb des Lenkungskreises sie trifft.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Nicht jedes Weitermachen ist Eskalation. Ein Projekt fortzusetzen, kann rational sein, wenn die Restkosten klein und der erwartete Nutzen groß sind, wenn das Weitermachen Informationen liefert, die der Abbruch nicht liefern würde, oder wenn ein Abbruch Reputationskosten hätte, die real sind. Staw selbst weist darauf hin, dass Beharrlichkeit in vielen Fällen belohnt wird und dass Organisationen sie deshalb kulturell fördern. Die Frage ist nicht, ob man weitermacht, sondern ob die Gründe dafür in der Zukunft liegen.',
          'Die Metaanalyse von Sleesman und Kollegen stützt sich überwiegend auf Laborstudien mit Fallszenarien; in echten Unternehmen sind versunkene Kosten mit Verträgen, Karrieren und Beziehungen verflochten, die sich im Labor nicht abbilden lassen. Zudem ist die Gegenmaßnahme, die Fortsetzungsentscheidung zu trennen, in kleinen Unternehmen schwer umzusetzen, weil dieselbe Person alle Entscheidungen trifft. Dort bleibt als Ersatz die Außensicht durch einen Beirat, einen Berater oder eine vorab schriftlich festgelegte Abbruchregel.',
        ],
      },
    ],
    quellen: [Q.arkesBlumer1985, Q.staw1976, Q.staw1981, Q.sleesman2012],
    sieheAuch: ['entscheidungen-verzerrungen', 'status-quo-default', 'poc-pilot-skalierung', 'strategie-umsetzung'],
    synonyme: ['Sunk Cost Fallacy', 'Sunk-Cost-Effekt', 'Escalation of Commitment', 'Eskalation der Bindung'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'status-quo-default',
    titel: 'Status-quo-Bias, Besitztumseffekt und die Macht der Voreinstellung',
    thema: 'psychologie',
    einleitung:
      'Menschen bleiben beim Bestehenden, bewerten, was sie haben, höher als das, was sie bekommen könnten, und übernehmen Voreinstellungen, die andere für sie getroffen haben. Für jede Veränderung ist das der stille Gegner.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Samuelson und Zeckhauser (1988) prägten den Begriff Status-quo-Bias. In Fragebogenexperimenten legten sie Versuchspersonen Entscheidungen vor, einmal neutral formuliert, einmal mit einer Option als bestehendem Zustand markiert; die als Status quo gekennzeichnete Option wurde deutlich häufiger gewählt, und zwar umso stärker, je mehr Alternativen im Spiel waren. Feldbelege lieferten die Krankenversicherungsdaten einer Universität: Bestehende Mitarbeiter blieben überwiegend bei ihrem alten Tarif, während neu Eingestellte, die ohne Vorprägung wählten, sich anders verteilten. Die Autoren diskutieren rationale Gründe (Wechselkosten, Unsicherheit) ebenso wie psychologische (Verlustaversion, Bedauern, Rechtfertigungsdruck).',
          'Der Besitztumseffekt (endowment effect) ist die Verwandte auf der Ebene einzelner Güter. Kahneman, Knetsch und Thaler (1990) verteilten in Seminaren Kaffeebecher per Zufall an die Hälfte der Teilnehmer und ließen dann handeln. Nach der Standardtheorie hätten die Becher zu den Personen wandern müssen, die sie am höchsten schätzen, also etwa die Hälfte. Tatsächlich wurde viel weniger gehandelt, weil die Besitzer im Mittel etwa das Doppelte dessen verlangten, was die Nichtbesitzer zu zahlen bereit waren. Besitz allein hatte den Wert verändert.',
        ],
      },
      {
        titel: 'Die Voreinstellung entscheidet',
        absaetze: [
          'Johnson und Goldstein (2003) verglichen europäische Länder nach der Frage, ob Bürger der Organspende ausdrücklich zustimmen müssen (opt-in) oder als Spender gelten, solange sie nicht widersprechen (opt-out). In den Zustimmungsländern lagen die Anteile registrierter Spender zwischen gut 4 Prozent (Dänemark) und knapp 28 Prozent (Niederlande); in den Widerspruchsländern zwischen knapp 86 Prozent (Schweden) und nahezu 100 Prozent (Österreich). Ein Online-Experiment mit denselben Optionen und unterschiedlichen Voreinstellungen bestätigte das Muster. Die Menschen in beiden Ländergruppen unterscheiden sich kaum in ihrer Einstellung; die Voreinstellung (default) tut die Arbeit.',
          'Madrian und Shea (2001) untersuchten die betriebliche Altersvorsorge eines großen US-Unternehmens, das von freiwilliger Anmeldung auf automatische Anmeldung mit Widerspruchsrecht umgestellt hatte. Die Teilnahmequote neu Eingestellter stieg der Studie zufolge von 37 auf 86 Prozent, und ein großer Teil der automatisch Angemeldeten blieb bei dem voreingestellten Beitragssatz und dem voreingestellten Fonds, obwohl beide für die meisten nicht die beste Wahl waren. Die Voreinstellung wirkt also doppelt: Sie bringt Menschen hinein, und sie hält sie bei der voreingestellten Ausgestaltung.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Beratung führt bei einem Logistikdienstleister ein KI-Werkzeug ein, das Disponenten Tourvorschläge macht. Die Disponenten haben ihre Touren jahrelang selbst geplant; der eigene Plan ist ihr Besitz, der Vorschlag der Maschine ein Verlust an Kontrolle, und die Software läuft zunächst als optionale Zusatzansicht, die man aktiv öffnen muss. Nach drei Monaten nutzt sie kaum jemand. Die Analyse mit den Begriffen dieses Artikels ist einfach: Der Status quo ist die Voreinstellung, das neue Werkzeug die Abweichung. Der Vorschlag der Beratung dreht die Voreinstellung um: Die Maschine liefert den Ausgangsplan, der Disponent bearbeitet ihn. Wer nicht handelt, nutzt das Werkzeug.',
          'Dieselbe Mechanik gilt für Angebote der Beratung selbst. Ein Kunde, der seit Jahren mit einem IT-Dienstleister arbeitet, wechselt nicht, weil ein neuer Anbieter besser ist, sondern erst, wenn der Wechsel als kleiner Schritt aus dem Bestehenden erscheint: derselbe Ansprechpartner, ein Pilot neben dem laufenden Betrieb, ein Rückweg. Der Praktikant kann in Terminen darauf achten, welche Option als „normal“ dargestellt wird; sie hat unabhängig von ihrer Qualität einen Vorsprung.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Beim Bestehenden zu bleiben, ist oft vernünftig. Samuelson und Zeckhauser selbst betonen, dass Wechselkosten, Einarbeitung und die Unsicherheit über das Neue reale Gründe sind, die keine Verzerrung darstellen. Wer eine Organisation zu einer Veränderung drängt, sollte deshalb zuerst prüfen, ob die Trägheit ein Denkfehler ist oder eine berechtigte Skepsis, die das Team aus Erfahrung mit früheren Einführungen gelernt hat. Der Artikel über Widerstand gegen Veränderung geht diesem Unterschied nach.',
          'Voreinstellungen zu setzen, ist ein Eingriff. Johnson und Goldstein weisen darauf hin, dass ein registrierter Spender noch keine tatsächliche Spende bedeutet und dass die Wirkung von Voreinstellungen auch für schlechte Zwecke nutzbar ist; Madrian und Shea zeigen, dass eine schlecht gewählte Voreinstellung Menschen in einer ungünstigen Lage festhält. Wer für einen Kunden Voreinstellungen gestaltet, trägt Verantwortung für den Inhalt der Voreinstellung. Die Artikel über Nudging und über Dark Patterns behandeln, wo die Grenze zur Manipulation liegt.',
        ],
      },
    ],
    quellen: [Q.samuelsonZeckhauser1988, Q.kahnemanKnetschThaler1990, Q.johnsonGoldstein2003, Q.madrianShea2001],
    sieheAuch: ['prospect-theory-framing', 'nudge-entscheidungsarchitektur', 'widerstand-veraenderung', 'sunk-cost-eskalation', 'change-management'],
    synonyme: ['Status Quo Bias', 'Endowment Effect', 'Default-Effekt', 'Voreinstellungseffekt', 'Trägheit'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'intuition-expertise',
    titel: 'Intuition und Expertise: wann das Bauchgefühl trägt',
    thema: 'psychologie',
    einleitung:
      'Erfahrene Menschen treffen oft in Sekunden Urteile, die sich als richtig erweisen, und ebenso oft liegen selbstsichere Experten daneben. Ob Intuition verlässlich ist, hängt weniger von der Person ab als von der Umgebung, in der sie gelernt hat.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Kahneman und Klein (2009) vertraten über Jahre gegensätzliche Forschungsprogramme: Kahneman die Heuristik-und-Bias-Tradition, die Intuition misstraut, Klein die naturalistische Entscheidungsforschung (naturalistic decision making), die von Feuerwehrleuten, Piloten und Pflegekräften lernt, wie Experten unter Zeitdruck gut entscheiden. In einer gemeinsamen Arbeit einigten sie sich auf zwei Bedingungen, unter denen Intuition vertrauenswürdig ist: Die Umgebung muss regelmäßig genug sein, dass es überhaupt erkennbare Muster gibt (high-validity environment), und der Entscheider muss Gelegenheit gehabt haben, diese Muster durch lange Übung mit schneller, eindeutiger Rückmeldung zu lernen. Fehlt eine der Bedingungen, ist das subjektive Gefühl der Sicherheit kein Hinweis auf Genauigkeit.',
          'Klein (1998) beschreibt in Sources of Power, wie erfahrene Einsatzleiter tatsächlich entscheiden: Sie vergleichen nicht Optionen, sondern erkennen die Lage als Fall eines bekannten Typs, rufen die typische Reaktion ab und prüfen sie gedanklich durch, ob sie hier funktioniert (recognition-primed decision). Das ist System 1 mit Kontrolle durch System 2, geformt durch Tausende ähnliche Situationen. Ericsson, Krampe und Tesch-Römer (1993) zeigen an Musikern, dass solche Expertise nicht aus bloßer Erfahrung entsteht, sondern aus bewusster Übung (deliberate practice): gezielte Aufgaben knapp über dem eigenen Niveau, mit Rückmeldung und Korrektur.',
        ],
      },
      {
        titel: 'Wo Experten scheitern',
        absaetze: [
          'Tetlock (2005) sammelte über viele Jahre Prognosen von Fachleuten zu politischen und wirtschaftlichen Entwicklungen und verglich sie mit dem Eintreten. Das Ergebnis: Die Experten schnitten insgesamt kaum besser ab als einfache Faustregeln, und ihre Bekanntheit sagte nichts über ihre Treffsicherheit. Besser waren diejenigen, die Tetlock als Füchse beschreibt: Sie ziehen viele kleine Informationsquellen heran, ändern ihre Meinung mit neuen Daten und misstrauen großen Theorien. Schlechter waren die Igel, die eine große Idee auf alles anwenden und mit Selbstsicherheit auftreten.',
          'Die Erklärung passt zu Kahneman und Klein: Politische und wirtschaftliche Prognosen über Jahre sind eine Umgebung mit wenig Regelmäßigkeit und langsamer, mehrdeutiger Rückmeldung. Dort kann niemand verlässliche Intuition erwerben, egal wie erfahren. Ein Schachspieler, ein Anästhesist oder ein Feuerwehrmann bekommt dagegen innerhalb von Minuten oder Stunden zu wissen, ob sein Urteil richtig war. Die Frage an jede Intuition lautet deshalb nicht „Wie erfahren ist die Person?“, sondern „In welcher Umgebung hat sie ihre Erfahrung gesammelt, und wie schnell hat diese Umgebung Fehler zurückgemeldet?“',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Die Chefin einer kleinen KI-Beratung sagt nach zwanzig Minuten in einem Erstgespräch, dieser Kunde werde „nicht kaufen“. Diese Intuition kann belastbar sein: Sie hat hunderte Erstgespräche geführt und innerhalb von Wochen erfahren, ob ein Auftrag kam. Die Umgebung ist regelmäßig genug, die Rückmeldung schnell. Wenn dieselbe Chefin sagt, der Markt für KI-Beratung im Mittelstand werde in drei Jahren „ganz sicher“ so und so aussehen, gelten andere Regeln: Marktprognosen sind Tetlocks Igel-Gebiet, und niemand hat dort verlässliche Muster lernen können.',
          'Der Praktikant kann diese Unterscheidung nutzen, um zu lernen, welchen Urteilen er folgen soll. Für das Lesen eines Raums, das Einschätzen einer Person oder den richtigen Moment für eine Frage sind die Bedingungen für Expertise erfüllt; hier lohnt es, die Chefin zu beobachten und nachzufragen, was sie gesehen hat. Für Schätzungen zu Projektdauer, Ersparnis oder Marktentwicklung sollte er nach der Vergleichsklasse fragen, auch wenn die Schätzung mit Nachdruck vorgetragen wird. Bewusste Übung heißt für ihn: Vor jedem Termin eine eigene Vorhersage notieren, danach mit dem Ergebnis vergleichen und die Abweichung erklären.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ob eine Umgebung regelmäßig genug ist, weiß man oft erst im Nachhinein. Viele Bereiche liegen dazwischen: Die Auswahl von Mitarbeitern, die Beurteilung eines Geschäftsmodells oder die Verhandlungsführung geben Rückmeldung, aber langsam und verzerrt, sodass sich falsche Muster ebenso festigen wie richtige. Kahneman und Klein räumen ein, dass Fachleute ihre eigene Trefferquote meist nicht kennen; das Gefühl der Sicherheit entsteht aus der Flüssigkeit des Urteils, nicht aus seiner Genauigkeit.',
          'Die Forschung zur bewussten Übung ist populär verkürzt worden zur Regel, man brauche eine feste Zahl von Stunden für Expertise. Ericsson und Kollegen beschreiben Unterschiede in der aufgewendeten Übungszeit zwischen Leistungsgruppen von Musikern, keine allgemeingültige Schwelle, und spätere Arbeiten haben die Erklärungskraft der Übung je nach Gebiet unterschiedlich eingeschätzt. Für die Beratung bleibt die bescheidene Folgerung: Intuition ist ein Ergebnis, kein Talent, und sie gilt nur für die Umgebung, in der sie entstanden ist.',
        ],
      },
    ],
    quellen: [Q.kahnemanKlein2009, Q.kleinSourcesOfPower, Q.tetlock2005, Q.ericsson1993],
    sieheAuch: ['zwei-systeme-heuristiken', 'entscheidungen-verzerrungen', 'szenarioplanung', 'beratungsgespraech'],
    synonyme: ['Naturalistic Decision Making', 'Recognition-Primed Decision', 'Deliberate Practice', 'Füchse und Igel', 'Expertenurteil'],
    unsicher: false,
  },
];
