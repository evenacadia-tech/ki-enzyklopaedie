import type { EigenerArtikel, Quelle } from '../../typen';

// Block 3 — Gruppen, Führung, Veränderung. Alle Quellen am 2026-09-26 geprüft
// (DOI über Crossref, Webseiten per Abruf).
const AB = '2026-09-26';
const Q = {
  // Gruppendenken und Konformität
  asch1955: {
    titel: 'Asch — Opinions and Social Pressure (Scientific American 193(5), 1955)',
    url: 'https://doi.org/10.1038/scientificamerican1155-31',
    abgerufen: AB,
  } satisfies Quelle,
  bondSmith1996: {
    titel: 'Bond & Smith — Culture and Conformity: A Meta-Analysis of Studies Using Asch’s Line Judgment Task (Psychological Bulletin 119(1), 1996)',
    url: 'https://doi.org/10.1037/0033-2909.119.1.111',
    abgerufen: AB,
  } satisfies Quelle,
  stasserTitus1985: {
    titel: 'Stasser & Titus — Pooling of Unshared Information in Group Decision Making: Biased Information Sampling During Discussion (Journal of Personality and Social Psychology 48(6), 1985)',
    url: 'https://doi.org/10.1037/0022-3514.48.6.1467',
    abgerufen: AB,
  } satisfies Quelle,
  esser1998: {
    titel: 'Esser — Alive and Well after 25 Years: A Review of Groupthink Research (Organizational Behavior and Human Decision Processes 73(2–3), 1998)',
    url: 'https://doi.org/10.1006/obhd.1998.2758',
    abgerufen: AB,
  } satisfies Quelle,
  sunsteinHastie2014Hbr: {
    titel: 'Sunstein & Hastie — Making Dumb Groups Smarter (Harvard Business Review, 2014)',
    url: 'https://hbr.org/2014/12/making-dumb-groups-smarter',
    abgerufen: AB,
  } satisfies Quelle,
  // Psychologische Sicherheit
  edmondson1999: {
    titel: 'Edmondson — Psychological Safety and Learning Behavior in Work Teams (Administrative Science Quarterly 44(2), 1999)',
    url: 'https://doi.org/10.2307/2666999',
    abgerufen: AB,
  } satisfies Quelle,
  edmondsonLei2014: {
    titel: 'Edmondson & Lei — Psychological Safety: The History, Renaissance, and Future of an Interpersonal Construct (Annual Review of Organizational Psychology and Organizational Behavior 1, 2014)',
    url: 'https://doi.org/10.1146/annurev-orgpsych-031413-091305',
    abgerufen: AB,
  } satisfies Quelle,
  frazier2017: {
    titel: 'Frazier, Fainshmidt, Klinger, Pezeshkan & Vracheva — Psychological Safety: A Meta-Analytic Review and Extension (Personnel Psychology 70(1), 2017)',
    url: 'https://doi.org/10.1111/peps.12183',
    abgerufen: AB,
  } satisfies Quelle,
  edmondsonFearless2018: {
    titel: 'Edmondson — The Fearless Organization: Creating Psychological Safety in the Workplace for Learning, Innovation, and Growth, Verlagsseite (Wiley, 2018)',
    url: 'https://www.wiley.com/en-us/The+Fearless+Organization%3A+Creating+Psychological+Safety+in+the+Workplace+for+Learning%2C+Innovation%2C+and+Growth-p-9781119477242',
    abgerufen: AB,
  } satisfies Quelle,
  // Motivation
  ryanDeci2000: {
    titel: 'Ryan & Deci — Self-Determination Theory and the Facilitation of Intrinsic Motivation, Social Development, and Well-Being (American Psychologist 55(1), 2000)',
    url: 'https://doi.org/10.1037/0003-066X.55.1.68',
    abgerufen: AB,
  } satisfies Quelle,
  deciKoestnerRyan1999: {
    titel: 'Deci, Koestner & Ryan — A Meta-Analytic Review of Experiments Examining the Effects of Extrinsic Rewards on Intrinsic Motivation (Psychological Bulletin 125(6), 1999)',
    url: 'https://doi.org/10.1037/0033-2909.125.6.627',
    abgerufen: AB,
  } satisfies Quelle,
  herzberg2003: {
    titel: 'Herzberg — One More Time: How Do You Motivate Employees? (Harvard Business Review, 2003; Erstveröffentlichung 1968)',
    url: 'https://hbr.org/2003/01/one-more-time-how-do-you-motivate-employees',
    abgerufen: AB,
  } satisfies Quelle,
  lockeLatham2002: {
    titel: 'Locke & Latham — Building a Practically Useful Theory of Goal Setting and Task Motivation: A 35-Year Odyssey (American Psychologist 57(9), 2002)',
    url: 'https://doi.org/10.1037/0003-066X.57.9.705',
    abgerufen: AB,
  } satisfies Quelle,
  ordonez2009: {
    titel: 'Ordóñez, Schweitzer, Galinsky & Bazerman — Goals Gone Wild: The Systematic Side Effects of Overprescribing Goal Setting (Academy of Management Perspectives 23(1), 2009)',
    url: 'https://doi.org/10.5465/amp.2009.37007999',
    abgerufen: AB,
  } satisfies Quelle,
  // Widerstand gegen Veränderung
  lewin1947: {
    titel: 'Lewin — Frontiers in Group Dynamics: Concept, Method and Reality in Social Science; Social Equilibria and Social Change (Human Relations 1(1), 1947)',
    url: 'https://doi.org/10.1177/001872674700100103',
    abgerufen: AB,
  } satisfies Quelle,
  kotterSchlesinger2008: {
    titel: 'Kotter & Schlesinger — Choosing Strategies for Change (Harvard Business Review, 2008; Erstveröffentlichung 1979)',
    url: 'https://hbr.org/2008/07/choosing-strategies-for-change',
    abgerufen: AB,
  } satisfies Quelle,
  fordFordDamelio2008: {
    titel: 'Ford, Ford & D’Amelio — Resistance to Change: The Rest of the Story (Academy of Management Review 33(2), 2008)',
    url: 'https://doi.org/10.5465/amr.2008.31193235',
    abgerufen: AB,
  } satisfies Quelle,
  oregVakolaArmenakis2011: {
    titel: 'Oreg, Vakola & Armenakis — Change Recipients’ Reactions to Organizational Change: A 60-Year Review of Quantitative Studies (Journal of Applied Behavioral Science 47(4), 2011)',
    url: 'https://doi.org/10.1177/0021886310396550',
    abgerufen: AB,
  } satisfies Quelle,
  cummingsBridgmanBrown2016: {
    titel: 'Cummings, Bridgman & Brown — Unfreezing Change as Three Steps: Rethinking Kurt Lewin’s Legacy for Change Management (Human Relations 69(1), 2016)',
    url: 'https://doi.org/10.1177/0018726715577707',
    abgerufen: AB,
  } satisfies Quelle,
  // Macht
  raven2008: {
    titel: 'Raven — The Bases of Power and the Power/Interaction Model of Interpersonal Influence (Analyses of Social Issues and Public Policy 8(1), 2008)',
    url: 'https://doi.org/10.1111/j.1530-2415.2008.00159.x',
    abgerufen: AB,
  } satisfies Quelle,
  mintzberg1985: {
    titel: 'Mintzberg — The Organization as Political Arena (Journal of Management Studies 22(2), 1985)',
    url: 'https://doi.org/10.1111/j.1467-6486.1985.tb00069.x',
    abgerufen: AB,
  } satisfies Quelle,
  pfeffer2010Hbr: {
    titel: 'Pfeffer — Power Play (Harvard Business Review, 2010)',
    url: 'https://hbr.org/2010/07/power-play',
    abgerufen: AB,
  } satisfies Quelle,
  mageeGalinsky2008: {
    titel: 'Magee & Galinsky — Social Hierarchy: The Self-Reinforcing Nature of Power and Status (Academy of Management Annals 2(1), 2008)',
    url: 'https://doi.org/10.1080/19416520802211628',
    abgerufen: AB,
  } satisfies Quelle,
  // Führung
  goleman2004Hbr: {
    titel: 'Goleman — What Makes a Leader? (Harvard Business Review, 2004; Erstveröffentlichung 1998)',
    url: 'https://hbr.org/2004/01/what-makes-a-leader',
    abgerufen: AB,
  } satisfies Quelle,
  bass1990: {
    titel: 'Bass — From Transactional to Transformational Leadership: Learning to Share the Vision (Organizational Dynamics 18(3), 1990)',
    url: 'https://doi.org/10.1016/0090-2616(90)90061-S',
    abgerufen: AB,
  } satisfies Quelle,
  judgePiccolo2004: {
    titel: 'Judge & Piccolo — Transformational and Transactional Leadership: A Meta-Analytic Test of Their Relative Validity (Journal of Applied Psychology 89(5), 2004)',
    url: 'https://doi.org/10.1037/0021-9010.89.5.755',
    abgerufen: AB,
  } satisfies Quelle,
  mayerSaloveyCaruso2008: {
    titel: 'Mayer, Salovey & Caruso — Emotional Intelligence: New Ability or Eclectic Traits? (American Psychologist 63(6), 2008)',
    url: 'https://doi.org/10.1037/0003-066X.63.6.503',
    abgerufen: AB,
  } satisfies Quelle,
  vanKnippenbergSitkin2013: {
    titel: 'van Knippenberg & Sitkin — A Critical Assessment of Charismatic–Transformational Leadership Research: Back to the Drawing Board? (Academy of Management Annals 7(1), 2013)',
    url: 'https://doi.org/10.1080/19416520.2013.759433',
    abgerufen: AB,
  } satisfies Quelle,
  // Kultur
  scheinOcl2017: {
    titel: 'Schein & Schein — Organizational Culture and Leadership, 5. Aufl., Verlagsseite (Wiley, 2017; Erstauflage 1985)',
    url: 'https://www.wiley.com/en-us/Organizational+Culture+and+Leadership%2C+5th+Edition-p-9781119212041',
    abgerufen: AB,
  } satisfies Quelle,
  schein1984Smr: {
    titel: 'Schein — Coming to a New Awareness of Organizational Culture (MIT Sloan Management Review 25(2), 1984)',
    url: 'https://sloanreview.mit.edu/article/coming-to-a-new-awareness-of-organizational-culture/',
    abgerufen: AB,
  } satisfies Quelle,
  schein1990: {
    titel: 'Schein — Organizational Culture (American Psychologist 45(2), 1990)',
    url: 'https://doi.org/10.1037/0003-066X.45.2.109',
    abgerufen: AB,
  } satisfies Quelle,
  groysberg2018Hbr: {
    titel: 'Groysberg, Lee, Price & Cheng — The Leader’s Guide to Corporate Culture (Harvard Business Review, 2018)',
    url: 'https://hbr.org/2018/01/the-leaders-guide-to-corporate-culture',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block3: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'gruppendenken-konformitaet',
    titel: 'Gruppendenken, Konformität und verborgene Informationen',
    thema: 'psychologie',
    einleitung:
      'Gruppen sollten klüger sein als ihre Mitglieder, weil sie mehr wissen. Tatsächlich passen sich Menschen der Mehrheit an, verschweigen Zweifel und reden über das, was ohnehin alle wissen. Wer Meetings leitet, muss diese Mechanik kennen, um sie zu durchbrechen.',
    abschnitte: [
      {
        titel: 'Konformität',
        absaetze: [
          'Asch (1955) setzte Versuchspersonen in eine Gruppe, deren übrige Mitglieder eingeweiht waren, und ließ alle nacheinander sagen, welche von drei Linien einer Vergleichslinie gleich lang war. Die Aufgabe war so leicht, dass allein Befragte praktisch nie irrten. Wenn die Eingeweihten jedoch einstimmig eine falsche Linie nannten, schlossen sich die echten Versuchspersonen in rund einem Drittel der kritischen Durchgänge der Mehrheit an; etwa ein Viertel blieb durchgehend unabhängig, die übrigen gaben mindestens einmal nach. Ein einziger Verbündeter, der die richtige Antwort gab, senkte die Anpassung drastisch. Asch unterschied Teilnehmer, die tatsächlich anders sahen, von solchen, die wussten, dass sie recht hatten, und trotzdem mitgingen, um nicht aufzufallen.',
          'Bond und Smith (1996) werteten 133 Studien aus 17 Ländern aus, die das Asch-Paradigma nutzten. Konformität war in Kulturen mit stärkerer Gruppenorientierung höher als in individualistischen, und in den USA nahm sie über die Jahrzehnte ab. Der Effekt ist also kein Naturgesetz, sondern hängt von Kultur, Zeit und Situation ab; er verschwindet aber nirgends.',
        ],
      },
      {
        titel: 'Gruppendenken und verborgene Profile',
        absaetze: [
          'Janis prägte 1972 den Begriff Gruppendenken (groupthink) für ein Denkmuster in eng verbundenen Gruppen, in denen das Streben nach Einmütigkeit die realistische Prüfung von Alternativen verdrängt. Esser (1998) fasst 25 Jahre Forschung dazu zusammen: Zu den Symptomen gehören die Illusion der Unverwundbarkeit, Selbstzensur, der Eindruck der Einstimmigkeit, Druck auf Abweichler und selbsternannte Meinungswächter; zu den Voraussetzungen zählt Janis Gruppenzusammenhalt, Abschottung, eine lenkende Führung und Stress. Esser kommt zu dem Ergebnis, dass die Belege für das Gesamtmodell gemischt sind: Einzelne Zusammenhänge, etwa der Einfluss einer Führung, die ihre Meinung früh äußert, sind gut belegt, andere, etwa die Rolle des Zusammenhalts, nicht.',
          'Ein robusterer Befund stammt von Stasser und Titus (1985). Sie gaben Vierergruppen Informationen über Kandidaten so, dass ein Teil der Informationen allen bekannt war und ein Teil nur einzelnen Mitgliedern. Die vollständige Information hätte einen bestimmten Kandidaten als besten ausgewiesen; die Gruppen diskutierten aber überwiegend die geteilten Informationen, die einen anderen Kandidaten begünstigten, und entschieden entsprechend. Dieses Muster, das verborgene Profil (hidden profile), erklärt, warum Gruppen ihren Wissensvorsprung verspielen: Man redet über das, was alle wissen, weil es Zustimmung findet, und behält das für sich, was nur man selbst weiß.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Sunstein und Hastie (2014) leiten aus dieser Forschung Regeln für Meetings ab: Die Führung schweigt zu Beginn, statt die Richtung vorzugeben; die Gruppe wird vor der Diskussion auf kritisches Denken statt auf Harmonie eingestimmt; Mitglieder bekommen Rollen, die ihr Sonderwissen sichtbar machen; ein Advocatus Diaboli oder ein eigenes Gegenteam (red team) hat den Auftrag, den Plan anzugreifen; und Schätzungen werden anonym und unabhängig eingeholt, bevor sie diskutiert werden.',
          'In einem Lenkungskreis beim Kunden, der über die Fortsetzung eines KI-Projekts entscheidet, ist die Geschäftsführerin gewohnt, als Erste zu sprechen. Nach ihrer Einschätzung sagt niemand mehr etwas Gegenteiliges, obwohl der IT-Leiter Bedenken zur Datenqualität hat, die nur er kennt. Die Beratung kann die Struktur ändern, ohne jemanden zu belehren: Sie bittet vor der Diskussion jeden Teilnehmer, seine Einschätzung und den wichtigsten Grund dafür auf eine Karte zu schreiben, und liest die Karten vor. Der Praktikant beobachtet, was die Karten enthalten, das im Gespräch nicht gefallen wäre; das ist das verborgene Profil dieses Gremiums.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das Gruppendenken-Modell ist als Ganzes empirisch schwach gestützt, wie Esser zeigt; es ist vor allem als Fallstudienerzählung über politische Fehlentscheidungen bekannt geworden. Wer ein Meeting mit „Das war Gruppendenken“ erklärt, hat meist nur beschrieben, dass sich niemand widersetzt hat, nicht warum. Die Konformitätsforschung wiederum arbeitet mit Aufgaben, bei denen es eine eindeutige richtige Antwort gibt; bei strategischen Fragen ist Anpassung an erfahrene Kollegen nicht automatisch ein Fehler.',
          'Gruppen sind unter den richtigen Bedingungen tatsächlich klüger als Einzelne, und die Gegenmaßnahmen von Sunstein und Hastie schaffen genau diese Bedingungen. Sie kosten aber Zeit und stellen die Gewohnheiten der Führung in Frage. In einem inhabergeführten Unternehmen, in dem der Inhaber gewohnt ist, die Richtung vorzugeben, ist die Bitte, zu Beginn zu schweigen, ein Eingriff in seine Rolle. Ob er ihn zulässt, hängt vom Vertrauen zur Beratung ab, nicht von der Qualität des Arguments.',
        ],
      },
    ],
    quellen: [Q.asch1955, Q.bondSmith1996, Q.esser1998, Q.stasserTitus1985, Q.sunsteinHastie2014Hbr],
    sieheAuch: ['psychologische-sicherheit', 'entscheidungen-verzerrungen', 'anker-bestaetigungsfehler', 'entscheidungsrechte-vorlagen', 'ueberzeugung-cialdini'],
    synonyme: ['Groupthink', 'Konformitätsdruck', 'Hidden Profile', 'Asch-Experiment', 'Verborgenes Profil'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'psychologische-sicherheit',
    titel: 'Psychologische Sicherheit: warum Teams schweigen',
    thema: 'psychologie',
    einleitung:
      'Ob jemand in einem Team einen Fehler meldet, eine Frage stellt oder einem Vorgesetzten widerspricht, hängt davon ab, ob er glaubt, dass ihm das nicht schadet. Diese geteilte Überzeugung heißt psychologische Sicherheit, und sie entscheidet darüber, ob ein Team lernt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Edmondson (1999) definiert psychologische Sicherheit als die in einem Team geteilte Überzeugung, dass es sicher ist, zwischenmenschliche Risiken einzugehen: eine Frage zu stellen, einen Fehler zuzugeben, eine Idee vorzuschlagen oder Bedenken zu äußern, ohne beschämt, zurückgewiesen oder bestraft zu werden. In einer Studie mit 51 Teams eines Fertigungsunternehmens fand sie, dass Teams mit hoher psychologischer Sicherheit mehr Lernverhalten zeigten (Fragen stellen, Rückmeldung einholen, über Fehler sprechen, Experimente wagen) und dass dieses Lernverhalten die Leistung des Teams erklärte. Sicherheit ist dabei ein Merkmal des Teams, nicht der Person: Dieselbe Person verhält sich in zwei Teams unterschiedlich.',
          'Edmondson und Lei (2014) grenzen das Konzept ab. Es ist nicht dasselbe wie Vertrauen, das sich auf eine Person und auf die Zukunft bezieht, sondern ein Klima in der Gruppe im Hier und Jetzt. Es ist nicht Zusammenhalt, der Widerspruch eher unterdrückt, und nicht Bequemlichkeit: Ein psychologisch sicheres Team hat hohe Ansprüche und streitet über die Sache. Das Konzept erklärt, warum Menschen im Beruf so oft schweigen: Die Kosten des Sprechens (peinlich, riskant, sofort spürbar) sind sicher, der Nutzen (ein vermiedener Fehler, irgendwann, für andere) ungewiss.',
        ],
      },
      {
        titel: 'Belege und Führungsverhalten',
        absaetze: [
          'Frazier, Fainshmidt, Klinger, Pezeshkan und Vracheva (2017) haben die Forschung metaanalytisch zusammengefasst. Psychologische Sicherheit hängt positiv mit Informationsaustausch, Lernverhalten, Engagement, Zufriedenheit und Leistung zusammen, auf Ebene einzelner Personen wie ganzer Teams. Zu den Bedingungen, die sie fördern, gehören unterstützendes Führungsverhalten, gute Beziehungen zwischen Kollegen und Rollenklarheit; Merkmale der Persönlichkeit spielen eine geringere Rolle als das Umfeld.',
          'Edmondson (2018) beschreibt in The Fearless Organization, was Führung dafür tun kann, in drei Schritten: die Bühne bereiten, indem Arbeit als Lern- und nicht als Ausführungsaufgabe gerahmt und Unsicherheit ausdrücklich benannt wird; zur Beteiligung einladen, indem die Führung eigene Fehlbarkeit zugibt, echte Fragen stellt und Strukturen für Wortmeldungen schafft; und produktiv reagieren, indem Wortmeldungen, auch schlechte Nachrichten, gewürdigt statt bestraft werden. Der letzte Schritt entscheidet: Eine einzige abwertende Reaktion auf eine Fehlermeldung lehrt das ganze Team, künftig zu schweigen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'In einer kleinen Beratung ist der Praktikant der Härtetest für psychologische Sicherheit. Ob er fragt, was ein Begriff bedeutet, oder ob er eine Unstimmigkeit in einer Präsentation der Chefin anspricht, hängt davon ab, wie sie beim ersten Mal reagiert hat. Eine Chefin, die sagt „Gut, dass Sie das fragen, das hätte der Kunde auch nicht verstanden“, kauft sich damit alle künftigen Hinweise; eine, die den Blick hebt, verliert sie. Umgekehrt trägt der Praktikant bei, indem er Unsicherheit benennt, statt sie zu verbergen; das senkt für alle die Hürde.',
          'Beim Kunden ist das Konzept ein Diagnosewerkzeug für Projekte. Wenn in einem Workshop zur KI-Einführung nur die Führung spricht und die Sachbearbeiter nicken, ist das kein Einverständnis, sondern ein Klima, in dem Bedenken nicht geäußert werden. Diese Bedenken tauchen später als Nichtnutzung auf. Die Beratung kann Strukturen einziehen, die Sicherheit nicht voraussetzen, sondern ersetzen: anonyme Kartenabfragen, Gespräche in kleinen Gruppen ohne Vorgesetzte, ein Pre-Mortem, in dem das Scheitern als Annahme gesetzt ist und Zweifel deshalb keine Illoyalität sind.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die meisten Belege beruhen auf Fragebögen, in denen Teammitglieder ihr Klima selbst einschätzen, und auf Querschnittsdaten, die keine Ursache belegen: Erfolgreiche Teams könnten sich sicherer fühlen, weil sie erfolgreich sind. Edmondson und Lei fordern deshalb mehr Längsschnitt- und Interventionsstudien. Das Konzept ist zudem zum Schlagwort geworden, unter dem manches verkauft wird, was mit der Forschung wenig zu tun hat, etwa die Erwartung, dass Sicherheit Harmonie oder Kritiklosigkeit bedeute.',
          'Sicherheit ist außerdem kein Ersatz für Kompetenz und Anspruch. Ein Team, in dem jeder alles sagen darf, aber niemand die Sache versteht, lernt nichts; Edmondson selbst beschreibt hohe Sicherheit bei niedrigen Ansprüchen als Wohlfühlzone, nicht als Lernzone. Und eine Beratung, die beim Kunden Strukturen für offene Wortmeldungen einführt, muss damit umgehen können, was dann gesagt wird: Bedenken, die sichtbar werden und dann ignoriert werden, schaden mehr als solche, die nie gehört wurden.',
        ],
      },
    ],
    quellen: [Q.edmondson1999, Q.edmondsonLei2014, Q.frazier2017, Q.edmondsonFearless2018],
    sieheAuch: ['gruppendenken-konformitaet', 'entscheidungen-verzerrungen', 'vertrauen-modell', 'widerstand-veraenderung', 'fuehrung-emotionale-intelligenz'],
    synonyme: ['Psychological Safety', 'Angstfreie Organisation', 'Fehlerkultur', 'Lernverhalten im Team'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'motivation-arbeit',
    titel: 'Motivation: Selbstbestimmung, Hygienefaktoren und Zielsetzung',
    thema: 'psychologie',
    einleitung:
      'Warum arbeiten Menschen engagiert, und was zerstört dieses Engagement? Drei Forschungslinien geben Antworten, die sich ergänzen und in einem Punkt überraschen: Belohnungen und Ziele können Motivation ebenso beschädigen wie stärken.',
    abschnitte: [
      {
        titel: 'Selbstbestimmung und die Kosten der Belohnung',
        absaetze: [
          'Ryan und Deci (2000) unterscheiden intrinsische Motivation, bei der eine Tätigkeit um ihrer selbst willen ausgeführt wird, von extrinsischer, bei der sie Mittel zu einem Zweck ist, und zeigen, dass extrinsische Motivation in Stufen verinnerlicht werden kann, von reiner Fremdsteuerung bis zur vollen Übereinstimmung mit eigenen Werten. Die Selbstbestimmungstheorie (self-determination theory) nennt drei psychologische Grundbedürfnisse, deren Erfüllung Motivation und Wohlbefinden trägt: Autonomie (das Gefühl, selbst zu entscheiden), Kompetenz (das Gefühl, wirksam zu sein) und Verbundenheit (das Gefühl, dazuzugehören). Umgebungen, die diese Bedürfnisse unterstützen, fördern Engagement; Umgebungen, die sie verletzen, erzeugen Anpassung ohne Beteiligung.',
          'Deci, Koestner und Ryan (1999) werteten 128 Experimente aus und fanden, dass erwartete materielle Belohnungen für eine Tätigkeit die intrinsische Motivation dafür verringern: Wer für etwas bezahlt wird, das er vorher gern getan hat, tut es danach weniger freiwillig. Der Effekt tritt vor allem bei Belohnungen auf, die als Steuerung erlebt werden; positive Rückmeldung, die Kompetenz bestätigt, wirkt umgekehrt. Belohnung ist also kein neutrales Werkzeug, sondern verändert, wie eine Tätigkeit erlebt wird.',
        ],
      },
      {
        titel: 'Hygienefaktoren und Ziele',
        absaetze: [
          'Herzberg (1968) unterscheidet in seinem vielgelesenen Aufsatz zwei Gruppen von Faktoren. Hygienefaktoren wie Bezahlung, Arbeitsbedingungen, Unternehmenspolitik und Beziehungen zu Vorgesetzten verursachen Unzufriedenheit, wenn sie fehlen, erzeugen aber keine Zufriedenheit, wenn sie da sind. Motivatoren wie Leistung, Anerkennung, die Arbeit selbst, Verantwortung und Wachstum erzeugen Zufriedenheit. Belohnung und Druck, die er spöttisch als Tritt in den Hintern (KITA) bezeichnet, bewegen Menschen, motivieren sie aber nicht; Motivation entsteht durch die Anreicherung der Arbeit selbst.',
          'Locke und Latham (2002) fassen 35 Jahre Forschung zur Zielsetzung zusammen: Spezifische, schwierige Ziele führen zu höherer Leistung als vage Aufforderungen, das Beste zu geben, solange die Person dem Ziel verpflichtet ist, Rückmeldung über den Fortschritt bekommt und die Aufgabe beherrscht. Bei komplexen, neuen Aufgaben sind Lernziele besser als Leistungsziele. Ordóñez, Schweitzer, Galinsky und Bazerman (2009) halten dagegen, dass Ziele systematische Nebenwirkungen haben: Sie verengen den Blick auf das Gemessene, verleiten zu riskantem und unethischem Verhalten, wenn das Ziel knapp verfehlt wird, untergraben intrinsische Motivation und schaden der Zusammenarbeit, wenn Ziele individuell sind. Ziele sind ein starkes Medikament, das dosiert gehört.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine KI-Einführung scheitert selten an der Technik und oft an der Frage, ob die Mitarbeiter das Werkzeug benutzen wollen. Die Selbstbestimmungstheorie liefert die Prüfliste: Autonomie: Dürfen die Sachbearbeiter entscheiden, wann sie den Vorschlag der KI übernehmen, oder wird er ihnen aufgezwungen? Kompetenz: Gibt es eine Schulung, die sie befähigt, oder nur eine Anweisung? Verbundenheit: Wird das Werkzeug im Team eingeführt oder jedem einzeln aufgesetzt? Ein Bonus für die Nutzung, den ein Kunde vorschlägt, ist nach Deci, Koestner und Ryan mit Vorsicht zu behandeln: Er kann die Nutzung erzwingen und zugleich signalisieren, dass sie lästig ist.',
          'Der Artikel über Ziele und OKR beschreibt, wie Ziele gesetzt werden; die Forschung von Ordóñez und Kollegen erklärt, was dabei schiefgeht. Wenn ein Kunde für sein Service-Team das Ziel setzt, eine bestimmte Zahl von Anfragen mit KI-Unterstützung zu bearbeiten, wird das Team die Zahl erreichen, notfalls auf Kosten der Qualität, die nicht gemessen wird. Der Praktikant kann in Zielgesprächen darauf achten, welche Größe gemessen wird und welche nicht, und was ein Team tun würde, wenn es nur die gemessene Größe maximiert.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Herzbergs Zwei-Faktoren-Theorie beruht auf Befragungen nach der Methode kritischer Ereignisse, bei der Menschen von besonders guten und schlechten Erlebnissen berichten; dass Zufriedenheit dabei sich selbst und Unzufriedenheit den Umständen zugeschrieben wird, könnte die Zweiteilung erklären. Die strikte Trennung der Faktoren ist in der Forschung umstritten, und die Bezahlung wirkt in vielen Kontexten stärker, als Herzberg einräumt. Auch die Untergrabung intrinsischer Motivation durch Belohnung ist im Detail umkämpft; Deci, Koestner und Ryan haben ihre Metaanalyse selbst als Antwort auf abweichende Auswertungen vorgelegt.',
          'Die Zielsetzungsforschung und ihre Kritik widersprechen sich weniger, als es scheint: Locke und Latham benennen die Bedingungen, unter denen Ziele wirken, und Ordóñez und Kollegen die Nebenwirkungen, wenn diese Bedingungen missachtet werden. Beide Lager stimmen darin überein, dass Ziele bei komplexen, neuen Aufgaben, wie sie KI-Projekte meist sind, eher als Lernziele formuliert werden sollten. Die Selbstbestimmungstheorie schließlich beschreibt Bedürfnisse, die in Unternehmen nie vollständig erfüllt werden; sie taugt als Richtung, nicht als Zustand.',
        ],
      },
    ],
    quellen: [Q.ryanDeci2000, Q.deciKoestnerRyan1999, Q.herzberg2003, Q.lockeLatham2002, Q.ordonez2009],
    sieheAuch: ['ziele-okr', 'change-management', 'widerstand-veraenderung', 'technikakzeptanz-tam-utaut', 'balanced-scorecard'],
    synonyme: ['Selbstbestimmungstheorie', 'Self-Determination Theory', 'Zwei-Faktoren-Theorie', 'Goal-Setting-Theorie', 'Intrinsische Motivation'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'widerstand-veraenderung',
    titel: 'Widerstand gegen Veränderung: Ursachen, Reaktionen, Umgang',
    thema: 'psychologie',
    einleitung:
      'Jede Strategie, die etwas ändert, trifft auf Menschen, die beim Alten bleiben wollen. Die Forschung zeigt, dass dieser Widerstand Gründe hat, die sich ansprechen lassen, dass er oft von den Verändernden selbst erzeugt wird und dass er Informationen enthält, die ein Projekt braucht.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Lewin (1947) beschrieb soziale Zustände als quasi-stationäre Gleichgewichte: Ein Verhalten in einer Gruppe bleibt stabil, weil treibende und hemmende Kräfte sich die Waage halten. Wer den Zustand ändern will, kann die treibenden Kräfte verstärken oder die hemmenden abbauen; Letzteres erzeugt weniger Spannung. Lewin zeigte in Feldexperimenten, dass Gruppen, die eine Entscheidung gemeinsam trafen, ihr Verhalten stärker und dauerhafter änderten als Gruppen, die nur überzeugt wurden. Veränderung ist für ihn ein Gruppenprozess, in dem das Gewohnte erst aufgelockert werden muss, bevor Neues Halt findet.',
          'Kotter und Schlesinger (1979, Neuauflage 2008) nennen vier Ursachen für Widerstand: Eigeninteresse (jemand verliert etwas, das ihm wichtig ist), Missverständnis und fehlendes Vertrauen (die Folgen werden anders eingeschätzt als von der Führung, und man traut ihr nicht), unterschiedliche Bewertungen (die Betroffenen sehen Kosten, die die Führung nicht sieht, und haben manchmal recht) und geringe Toleranz für Veränderung (die Angst, das Neue nicht zu können). Dazu ordnen sie sechs Methoden, von Aufklärung und Beteiligung über Unterstützung und Verhandlung bis zu Manipulation und Zwang, und benennen für jede die Kosten: Beteiligung braucht Zeit, Zwang erzeugt Groll, Manipulation fliegt auf.',
        ],
      },
      {
        titel: 'Wer den Widerstand macht',
        absaetze: [
          'Ford, Ford und D’Amelio (2008) kehren die übliche Sicht um. Widerstand wird meist von den Verändernden diagnostiziert, aus deren Sicht, und dient ihnen als Erklärung für Misserfolg. Die Autoren zeigen, dass die Verändernden selbst Widerstand erzeugen, indem sie Vereinbarungen brechen, Vertrauen verspielen, den Wandel schlecht kommunizieren oder frühere Veränderungen unvollendet lassen. Sie schlagen vor, Widerstand als Ressource zu sehen: Er hält das Thema im Gespräch, liefert Informationen über Schwächen des Plans und zeigt, dass die Betroffenen sich beteiligen, statt innerlich zu kündigen.',
          'Oreg, Vakola und Armenakis (2011) haben 60 Jahre quantitativer Forschung zu den Reaktionen von Betroffenen ausgewertet. Ihr Modell unterscheidet Ursachen (Merkmale der Betroffenen, Inhalt der Veränderung, der Prozess mit Beteiligung, Kommunikation und Fairness sowie der Kontext) von Reaktionen (Gefühle, Bewertungen, Verhalten) und deren Folgen für Person und Organisation. Über die Studien hinweg zeigen Beteiligung, verlässliche Information, wahrgenommene Fairness und Vertrauen in die Führung die stabilsten Zusammenhänge mit Unterstützung; die Persönlichkeit der Betroffenen erklärt weniger als der Prozess.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Akademie-Artikel über Change-Management beschreibt Vorgehen und Werkzeuge der KI-Einführung; dieser Artikel liefert die psychologische Deutung. Wenn die Disponenten eines Logistikkunden das neue Planungswerkzeug nicht nutzen, lauten die Fragen nach Kotter und Schlesinger: Was verlieren sie (Kontrolle, Status als diejenigen, die es am besten können)? Was verstehen sie anders als die Geschäftsführung (dass das Werkzeug Ausnahmen nicht kennt, die ihren Alltag ausmachen)? Was sehen sie, das die Beratung nicht sieht? Und wovor haben sie Angst? Jede Antwort verlangt eine andere Methode; Aufklärung hilft nur beim Missverständnis, nicht beim Eigeninteresse.',
          'Ford, Ford und D’Amelio verlangen zusätzlich den Blick auf die eigene Seite: Hat die Beratung Zusagen zur Schulung eingehalten, wurde die letzte Softwareeinführung beim Kunden je abgeschlossen, wer hat den Disponenten das Werkzeug erklärt? Der Praktikant kann eine einfache Übung anwenden: Für jeden Einwand, der im Projekt fällt, notiert er, welche Information er enthält, die der Plan noch nicht berücksichtigt. Aus einer Widerstandsliste wird so eine Liste offener Punkte.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das bekannte Dreischritt-Modell Auftauen, Verändern, Einfrieren, das Lewin zugeschrieben wird, ist nach Cummings, Bridgman und Brown (2016) weitgehend eine spätere Konstruktion: Lewin hat es in dieser Form nie als Modell ausgearbeitet, und die Change-Management-Literatur hat seine Gedanken zu einer Formel vereinfacht. Wer den Dreischritt als Rezept nutzt, arbeitet mit einer Vereinfachung, nicht mit Lewins Forschung, deren Kern die Gruppenentscheidung und die Kräftebilanz sind.',
          'Die Forschung zu Reaktionen der Betroffenen ist überwiegend querschnittlich und beruht auf Selbstauskünften; ob Beteiligung Unterstützung erzeugt oder Unterstützer sich stärker beteiligen, bleibt oft offen. Beteiligung ist zudem nicht immer möglich: Kotter und Schlesinger selbst nennen Situationen, in denen Zeitdruck oder Machtverhältnisse schnellere und härtere Methoden verlangen, und warnen zugleich vor deren Preis. Und das Etikett Widerstand bleibt gefährlich, weil es jede Kritik zum Problem der Kritisierenden macht; Ford, Ford und D’Amelio raten, das Wort sparsam zu verwenden.',
        ],
      },
    ],
    quellen: [Q.lewin1947, Q.kotterSchlesinger2008, Q.fordFordDamelio2008, Q.oregVakolaArmenakis2011, Q.cummingsBridgmanBrown2016],
    sieheAuch: ['change-management', 'strategie-umsetzung', 'status-quo-default', 'motivation-arbeit', 'rat-reaktanz', 'organisationskultur-schein'],
    synonyme: ['Resistance to Change', 'Kräftefeldanalyse', 'Change-Widerstand', 'Veränderungsbereitschaft'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'macht-mikropolitik',
    titel: 'Macht und Mikropolitik: wer in einer Organisation etwas bewegt',
    thema: 'psychologie',
    einleitung:
      'Strategien werden nicht von Organigrammen umgesetzt, sondern von Menschen, die Einfluss haben oder nicht. Wer die Quellen von Macht kennt und die Spiele, die um sie gespielt werden, versteht, warum ein guter Vorschlag scheitert und ein mittelmäßiger sich durchsetzt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Raven (2008) fasst die Typologie zusammen, die er 1959 mit French vorgelegt hatte, und ergänzt sie um eine sechste Quelle. Macht kann sich stützen auf Belohnung (ich kann dir etwas geben), Zwang (ich kann dir etwas nehmen), Legitimation (ich habe das Recht, dich anzuweisen), Expertise (ich weiß mehr als du), Identifikation (du willst so sein wie ich oder zu mir gehören) und Information (meine Argumente überzeugen dich unabhängig von mir). Die Quellen wirken unterschiedlich: Belohnung und Zwang brauchen Überwachung, Expertise und Identifikation wirken auch ohne, und Information ist die einzige Quelle, die den Beeinflussten dauerhaft verändert, weil er die Gründe übernimmt.',
          'Mintzberg (1985) beschreibt die Organisation als politische Arena, in der Interessengruppen Spiele spielen: Aufstand gegen die Führung, Gegenaufstand, Suche nach einem Förderer, Bündnisbildung, Reichsbildung durch Ausweitung des eigenen Bereichs, Budgetspiele, Expertisespiele, in denen Fachwissen als Machtquelle verteidigt wird, Spiele zwischen Linie und Stab, zwischen rivalisierenden Lagern, um strategische Kandidaten und schließlich das Aufdecken von Missständen. Politik ist für ihn kein Betriebsunfall, sondern ein normales Einflusssystem neben Autorität, Ideologie und Expertise; sie wird problematisch, wenn sie die anderen Systeme verdrängt.',
        ],
      },
      {
        titel: 'Warum Macht sich selbst verstärkt',
        absaetze: [
          'Pfeffer (2010) argumentiert in der Harvard Business Review, dass Führungskräfte Macht meiden, weil sie an eine gerechte Welt glauben, in der Leistung sich von selbst durchsetzt, und dass diese Annahme sie scheitern lässt. Macht ist nach ihm eine Fähigkeit, die man lernen kann, und wer sie nicht lernt, überlässt das Feld denen, die es tun. Magee und Galinsky (2008) zeigen, warum Hierarchien sich selbst stabilisieren: Wer Macht hat, bekommt mehr Ressourcen, mehr Gehör und mehr Handlungsspielraum, verhält sich handlungsorientierter und selbstsicherer und wird deshalb weiter als mächtig wahrgenommen. Status, also Ansehen, folgt einer ähnlichen Schleife. Beide Autoren beschreiben auch die Kehrseite: Macht verringert die Neigung, die Sicht anderer einzunehmen.',
          'Für Beratung ist die Unterscheidung von Macht und formaler Position entscheidend. Der Leiter der Disposition hat in einem Logistikunternehmen oft mehr Einfluss auf ein KI-Projekt als der IT-Leiter, weil ohne ihn niemand das Werkzeug benutzt; die Assistentin der Geschäftsführung entscheidet, welche Vorlage auf dem Tisch landet; der langjährige Meister in der Fertigung ist eine Identifikationsfigur, an der sich die Belegschaft orientiert. Diese Personen stehen in keinem Organigramm an der Spitze und in jeder Stakeholder-Analyse ganz oben.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Artikel über Entscheidungsrechte beschreibt, wer formal entscheidet; dieser Artikel fragt, wer tatsächlich Einfluss hat. Beim Kunden hilft eine einfache Karte: Für jede Person, die das Projekt berührt, wird notiert, auf welche Machtquellen sie sich stützt, was sie zu gewinnen und zu verlieren hat und welches Spiel sie vermutlich spielt. Der Vertriebsleiter, der das KI-Projekt in der Angebotserstellung unterstützt, könnte ein Reichsbildungsspiel spielen und die Sachbearbeitung unter seinen Bereich ziehen wollen; das erklärt seine Begeisterung und den Widerstand der Verwaltung besser als jedes Sachargument.',
          'Die Beratung selbst hat zwei Machtquellen: Expertise und Information. Beide sind flüchtig. Expertise verliert ihren Wert, sobald der Kunde das Wissen selbst hat, und Information wirkt nur, solange die Argumente stimmen. Der Praktikant kann in Meetings üben, das Einflusssystem zu lesen: Wer spricht zuerst, wer zuletzt, zu wem schauen die anderen, bevor sie antworten, wessen Einwand beendet eine Diskussion? Diese Beobachtungen sagen mehr über die Umsetzungschancen eines Vorschlags als die Reaktion auf die Präsentation.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Wer Organisationen nur als Arena liest, wird zynisch und übersieht, dass viele Menschen aus Überzeugung handeln. Mintzberg betont selbst, dass Politik nur eines von mehreren Einflusssystemen ist. Pfeffers Rat, Macht gezielt aufzubauen, ist umstritten, weil er Verhalten nahelegt, das Vertrauen kostet, und weil eine Beratung, die politisch spielt, ihre wichtigste Machtquelle, die Glaubwürdigkeit ihrer Information, aufs Spiel setzt. Die Grenze liegt dort, wo das Verstehen der Politik in ihr Mitspielen übergeht.',
          'Viele Befunde zu den psychologischen Wirkungen von Macht stammen aus Laborexperimenten, in denen Macht kurz und künstlich erzeugt wurde; ihre Übertragbarkeit auf Führungskräfte mit jahrelanger Erfahrung ist begrenzt, und einige dieser Effekte sind in Wiederholungsstudien schwächer ausgefallen. Raven weist außerdem darauf hin, dass Machtquellen kulturabhängig wirken: Legitimation zählt in manchen Organisationen alles, in anderen wenig. Eine Machtkarte ist deshalb eine Hypothese, die im Projekt geprüft wird, kein Befund.',
        ],
      },
    ],
    quellen: [Q.raven2008, Q.mintzberg1985, Q.pfeffer2010Hbr, Q.mageeGalinsky2008],
    sieheAuch: ['entscheidungsrechte-vorlagen', 'strategie-umsetzung', 'verhandeln-psychologie', 'fuehrung-emotionale-intelligenz', 'widerstand-veraenderung'],
    synonyme: ['Machtquellen', 'French und Raven', 'Mikropolitik', 'Organisationspolitik', 'Stakeholder-Macht'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'fuehrung-emotionale-intelligenz',
    titel: 'Führung: emotionale Intelligenz und transformationale Führung',
    thema: 'psychologie',
    einleitung:
      'Zwei Konzepte prägen, wie über gute Führung gesprochen wird: emotionale Intelligenz und transformationale Führung. Beide sind populär, beide haben empirische Substanz, und beide sind in der Forschung umstrittener, als ihre Verbreitung vermuten lässt.',
    abschnitte: [
      {
        titel: 'Emotionale Intelligenz',
        absaetze: [
          'Goleman (1998) behauptet in seinem einflussreichen Aufsatz, dass Fachwissen und Intelligenz für Führung notwendig, aber nicht hinreichend seien und dass emotionale Intelligenz den Unterschied zwischen guten und herausragenden Führungskräften erkläre. Er nennt fünf Bestandteile: Selbstwahrnehmung (die eigenen Gefühle und ihre Wirkung kennen), Selbstregulation (Impulse steuern), Motivation (aus innerem Antrieb arbeiten), Empathie (die Gefühle anderer berücksichtigen) und soziale Kompetenz (Beziehungen gestalten). Goleman stützt sich auf Kompetenzmodelle aus Unternehmen und argumentiert, dass emotionale Intelligenz erlernbar sei, wenn auch langsam.',
          'Mayer, Salovey und Caruso (2008), auf deren Arbeit der Begriff zurückgeht, ziehen eine Grenze: Emotionale Intelligenz im engen Sinn ist eine Fähigkeit, Emotionen wahrzunehmen, zu verstehen und zu nutzen, und sie lässt sich mit Leistungstests messen. Golemans breites Konzept vermischt diese Fähigkeit mit Persönlichkeitsmerkmalen, Motivation und sozialen Fertigkeiten zu einer Sammlung, die nach ihrer Kritik wenig Neues über bekannte Persönlichkeitsmerkmale hinaus erklärt. Die Frage, ob emotionale Intelligenz Führungserfolg vorhersagt, hängt also davon ab, welches Konzept gemeint ist.',
        ],
      },
      {
        titel: 'Transformationale Führung',
        absaetze: [
          'Bass (1990) unterscheidet transaktionale Führung, die Leistung gegen Belohnung tauscht und bei Abweichungen eingreift, von transformationaler Führung, die Mitarbeiter über ihre unmittelbaren Interessen hinaus bewegt. Vier Merkmale beschreiben sie: Charisma oder idealisierter Einfluss (die Führungskraft ist Vorbild und wird bewundert), inspirierende Motivation (sie vermittelt eine überzeugende Vision), intellektuelle Anregung (sie stellt Annahmen in Frage und fordert neue Lösungen) und individuelle Zuwendung (sie kümmert sich um die Entwicklung jedes Einzelnen). Bass sieht beide Stile als Ergänzung, nicht als Gegensatz.',
          'Judge und Piccolo (2004) haben die Forschung metaanalytisch geprüft. Transformationale Führung hing mit Führungserfolg zusammen (Zufriedenheit mit der Führungskraft, Motivation, Leistung von Personen und Gruppen), mit einer über die Studien gemittelten Validität von 0,44. Die transaktionale Komponente der leistungsabhängigen Belohnung lag mit 0,39 nahe daran; beide Stile hingen zudem stark miteinander zusammen. Führung, die Vision und verlässlichen Tausch verbindet, schnitt am besten ab.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Für den Praktikanten ist die Chefin einer kleinen Beratung das Anschauungsobjekt. Die vier Merkmale transformationaler Führung lassen sich in Kundenterminen beobachten: ob sie das Projekt in eine Vision einbettet, die über die Kostenrechnung hinausgeht, ob sie Annahmen des Kunden hinterfragt, statt sie zu bedienen, und ob sie sich um einzelne Personen kümmert, etwa den Sachbearbeiter, der Angst um seine Aufgabe hat. Emotionale Intelligenz im engen Sinn zeigt sich daran, ob sie Stimmungen im Raum bemerkt und darauf reagiert, bevor sie ausgesprochen werden.',
          'Beim Kunden hilft das Konzept, Führung als Erfolgsfaktor der Umsetzung zu bewerten. Ein KI-Projekt, das von einer Geschäftsführung getragen wird, die nur transaktional führt, also Ziele setzt und Abweichungen ahndet, wird formal erfüllt und inhaltlich unterlaufen; der Artikel über Motivation erklärt, warum. Die Beratung kann die Führung nicht ändern, aber sie kann in der Umsetzungsplanung berücksichtigen, welche Führungsleistung realistisch ist, und Strukturen vorschlagen, die fehlende Führung teilweise ersetzen: Multiplikatoren im Team, sichtbare frühe Erfolge, regelmäßige Rückmeldung.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Van Knippenberg und Sitkin (2013) legen eine grundsätzliche Kritik vor: Das Konzept transformationaler Führung ist nach ihnen unklar definiert, seine vier Merkmale werden ohne Theorie zusammengefasst, die gängigen Fragebögen vermischen Führungsverhalten mit seiner Wirkung, und die Forschung erklärt nicht, warum welches Merkmal welchen Effekt haben sollte. Sie fordern, das Konzept aufzugeben und neu zu beginnen. Die Metaanalyse von Judge und Piccolo zeigt Zusammenhänge, keine Ursachen; erfolgreiche Teams könnten ihre Führung nachträglich als visionär beschreiben.',
          'Bei emotionaler Intelligenz gilt Ähnliches: Golemans Behauptungen über ihre Bedeutung sind in der populären Literatur weiter gewachsen als ihre Belege, und Fragebögen zur Selbsteinschätzung messen nach Mayer, Salovey und Caruso eher Persönlichkeit und Selbstbild als Fähigkeit. Für die Praxis folgt daraus keine Ablehnung der Konzepte, aber eine Vorsicht: Wer Führung mit diesen Begriffen beschreibt, benennt beobachtbares Verhalten, nicht messbare Eigenschaften, und sollte Aussagen wie „diese Führungskraft hat hohe emotionale Intelligenz“ als Eindruck kennzeichnen, nicht als Befund.',
        ],
      },
    ],
    quellen: [Q.goleman2004Hbr, Q.mayerSaloveyCaruso2008, Q.bass1990, Q.judgePiccolo2004, Q.vanKnippenbergSitkin2013],
    sieheAuch: ['motivation-arbeit', 'psychologische-sicherheit', 'macht-mikropolitik', 'strategie-umsetzung', 'waerme-kompetenz-halo'],
    synonyme: ['Emotional Intelligence', 'EQ', 'Transformational Leadership', 'Transaktionale Führung', 'Führungsstile'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'organisationskultur-schein',
    titel: 'Organisationskultur: Scheins drei Ebenen',
    thema: 'psychologie',
    einleitung:
      'Was in einem Unternehmen als selbstverständlich gilt, entscheidet darüber, welche Strategie sich umsetzen lässt. Schein zeigt, dass Kultur in Schichten liegt: Was man sieht, was man sagt und was man ohne nachzudenken annimmt, und dass nur die unterste Schicht das Verhalten erklärt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Schein (1984, 1990) definiert Organisationskultur als das Muster grundlegender Annahmen, das eine Gruppe erfunden, entdeckt oder entwickelt hat, während sie lernte, mit ihren Problemen der äußeren Anpassung und der inneren Integration umzugehen, das sich bewährt hat und deshalb neuen Mitgliedern als richtige Art, zu denken und zu fühlen, weitergegeben wird. Kultur ist damit ein Lernergebnis: Was dem Unternehmen in seiner Geschichte Erfolg brachte, wird zur Selbstverständlichkeit, und die Annahmen der Gründer prägen sie besonders stark.',
          'Sichtbar wird Kultur nach Schein auf drei Ebenen. Artefakte sind das Sichtbare: Gebäude, Kleidung, Sprache, Rituale, Organigramme. Sie sind leicht zu beobachten und schwer zu deuten. Bekundete Werte sind das, was die Organisation über sich sagt: Leitbilder, Strategien, Begründungen. Grundlegende Annahmen sind das Unbewusste: Überzeugungen über Menschen, Zeit, Wahrheit und Beziehungen, die niemand mehr diskutiert, weil sie als gegeben gelten. Widersprüche zwischen den Ebenen sind die Regel: Ein Leitbild kann Offenheit verkünden, während die Annahme gilt, dass Fehler versteckt werden.',
        ],
      },
      {
        titel: 'Kultur beschreiben',
        absaetze: [
          'Schein und Schein (2017) betonen in der fünften Auflage ihres Standardwerks, dass Kultur nicht per Fragebogen erfasst werden kann, sondern durch Gespräche mit Insidern, die gemeinsam mit einem Außenstehenden die Annahmen hinter den Artefakten aufdecken. Ein Außenstehender sieht die Artefakte, versteht sie aber nicht; ein Insider versteht sie, sieht sie aber nicht mehr. Kulturveränderung ist nach Schein langsam und gelingt nur, wenn die Führung neue Annahmen vorlebt und die Organisation mit ihnen Erfolg erlebt; Verkündigung allein verändert nur die mittlere Ebene.',
          'Groysberg, Lee, Price und Cheng (2018) bieten in der Harvard Business Review ein Raster, das Kulturen entlang zweier Achsen einordnet: Wie Menschen zusammenwirken (von Unabhängigkeit bis wechselseitiger Abhängigkeit) und wie sie auf Veränderung reagieren (von Stabilität bis Flexibilität). Daraus ergeben sich acht Kulturstile, etwa Fürsorge, Ergebnis, Lernen, Ordnung, Sicherheit oder Autorität. Das Raster hilft, über Kultur zu sprechen, ohne sie zu bewerten: Ein Stil ist nicht besser als ein anderer, aber jeder passt zu bestimmten Strategien und nicht zu anderen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Artikel über den Strategieprozess und das 7-S-Modell führt Kultur als eines der weichen Elemente ein; Scheins Ebenen machen sie greifbar. Bei einem Maschinenbauer, der ein KI-Projekt zur Qualitätsprüfung startet, sieht die Beratung Artefakte: saubere Hallen, Schichtbücher auf Papier, ein Leitbild über Präzision an der Wand. Die bekundeten Werte lauten Qualität und Verlässlichkeit. Die grundlegende Annahme, die erst in Gesprächen mit den Meistern sichtbar wird, lautet: Wer einen Fehler meldet, hat ihn verursacht. Ein KI-System, das Fehler sichtbar macht, greift diese Annahme an und wird deshalb umgangen, egal wie gut es misst.',
          'Für die Beratung folgt daraus, dass die Kulturanalyse vor der Werkzeugauswahl kommt. Der Praktikant kann eine einfache Beobachtungsübung anwenden: Bei jedem Kundenbesuch notiert er drei Artefakte, die ihm auffallen, und fragt sich, welche Annahme sie tragen könnten. Wird die Frage im nächsten Gespräch beiläufig gestellt („Was passiert hier, wenn jemand einen Fehler bemerkt?“), liefert die Antwort mehr über die Umsetzungschancen als jede Anforderungsliste.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Scheins Modell nimmt eine weitgehend einheitliche Kultur an; in Unternehmen bestehen aber Subkulturen von Abteilungen, Standorten und Berufsgruppen, die einander widersprechen können. Die Vertriebskultur eines Mittelständlers unterscheidet sich von der seiner Fertigung, und ein KI-Projekt trifft beide. Kultur ist zudem schwer messbar; die Deutung von Artefakten bleibt eine Interpretation, die ein Berater aus wenigen Besuchen nur vorläufig leisten kann. Wer nach zwei Workshops die Kultur eines Unternehmens beschreibt, formuliert Hypothesen.',
          'Typologien wie das Raster von Groysberg und Kollegen vereinfachen, was Schein als komplex beschreibt; sie sind Gesprächshilfen, keine Diagnosen. Schließlich warnt Schein selbst vor der Vorstellung, Kultur lasse sich als Werkzeug einsetzen: Sie ist träge, sie wird durch Erfolg bestätigt, und sie ändert sich, wenn überhaupt, über Jahre. Eine Beratung, die einem Kunden einen Kulturwandel als Teil eines KI-Projekts verspricht, verspricht etwas, das sie nicht liefern kann; sie kann Annahmen sichtbar machen und Strukturen vorschlagen, die mit ihnen rechnen.',
        ],
      },
    ],
    quellen: [Q.schein1984Smr, Q.schein1990, Q.scheinOcl2017, Q.groysberg2018Hbr],
    sieheAuch: ['strategieprozess-7s', 'widerstand-veraenderung', 'psychologische-sicherheit', 'strategie-mittelstand', 'change-management'],
    synonyme: ['Unternehmenskultur', 'Organizational Culture', 'Drei-Ebenen-Modell', 'Grundlegende Annahmen', 'Artefakte'],
    unsicher: false,
  },
];
