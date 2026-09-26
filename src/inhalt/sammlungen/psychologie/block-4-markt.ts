import type { EigenerArtikel, Quelle } from '../../typen';

// Block 4 — Kunde, Markt, Technikakzeptanz; Abschluss: Befunde richtig lesen.
// Alle Quellen am 2026-09-26 geprüft (DOI über Crossref, Webseiten per Abruf).
const AB = '2026-09-26';
const Q = {
  // Nudge
  thalerSunsteinNudge: {
    titel: 'Thaler & Sunstein — Nudge: The Final Edition, Verlagsseite (Penguin, 2021; Erstauflage 2008)',
    url: 'https://www.penguin.co.uk/books/56784/nudge-by-richard-h-thaler-cass-r-sunstein/9780141999937',
    abgerufen: AB,
  } satisfies Quelle,
  thalerSunsteinBalz2013: {
    titel: 'Thaler, Sunstein & Balz — Choice Architecture (SSRN Working Paper, 2010; erschienen in Shafir (Hg.), The Behavioral Foundations of Public Policy, Princeton University Press, 2013)',
    url: 'https://doi.org/10.2139/ssrn.1583509',
    abgerufen: AB,
  } satisfies Quelle,
  johnsonGoldstein2003: {
    titel: 'Johnson & Goldstein — Do Defaults Save Lives? (Science 302(5649), 2003)',
    url: 'https://doi.org/10.1126/science.1091721',
    abgerufen: AB,
  } satisfies Quelle,
  mertens2022: {
    titel: 'Mertens, Herberz, Hahnel & Brosch — The Effectiveness of Nudging: A Meta-Analysis of Choice Architecture Interventions Across Behavioral Domains (PNAS 119(1), 2022)',
    url: 'https://doi.org/10.1073/pnas.2107346118',
    abgerufen: AB,
  } satisfies Quelle,
  maier2022: {
    titel: 'Maier, Bartoš, Stanley, Shanks, Harris & Wagenmakers — No Evidence for Nudging After Adjusting for Publication Bias (PNAS 119(31), 2022)',
    url: 'https://doi.org/10.1073/pnas.2200300119',
    abgerufen: AB,
  } satisfies Quelle,
  // Preispsychologie
  thaler1985: {
    titel: 'Thaler — Mental Accounting and Consumer Choice (Marketing Science 4(3), 1985)',
    url: 'https://doi.org/10.1287/mksc.4.3.199',
    abgerufen: AB,
  } satisfies Quelle,
  thalerNobel2017: {
    titel: 'Thaler — From Cashews to Nudges: The Evolution of Behavioral Economics, Prize Lecture (NobelPrize.org, 2017)',
    url: 'https://www.nobelprize.org/prizes/economic-sciences/2017/thaler/lecture/',
    abgerufen: AB,
  } satisfies Quelle,
  huberPaynePuto1982: {
    titel: 'Huber, Payne & Puto — Adding Asymmetrically Dominated Alternatives: Violations of Regularity and the Similarity Hypothesis (Journal of Consumer Research 9(1), 1982)',
    url: 'https://doi.org/10.1086/208899',
    abgerufen: AB,
  } satisfies Quelle,
  arielyLoewensteinPrelec2003: {
    titel: 'Ariely, Loewenstein & Prelec — „Coherent Arbitrariness“: Stable Demand Curves Without Stable Preferences (Quarterly Journal of Economics 118(1), 2003)',
    url: 'https://doi.org/10.1162/00335530360535153',
    abgerufen: AB,
  } satisfies Quelle,
  kahnemanKnetschThaler1986: {
    titel: 'Kahneman, Knetsch & Thaler — Fairness and the Assumptions of Economics (Journal of Business 59(S4), 1986)',
    url: 'https://doi.org/10.1086/296367',
    abgerufen: AB,
  } satisfies Quelle,
  // Technikakzeptanz
  davis1989: {
    titel: 'Davis — Perceived Usefulness, Perceived Ease of Use, and User Acceptance of Information Technology (MIS Quarterly 13(3), 1989)',
    url: 'https://doi.org/10.2307/249008',
    abgerufen: AB,
  } satisfies Quelle,
  venkatesh2003: {
    titel: 'Venkatesh, Morris, Davis & Davis — User Acceptance of Information Technology: Toward a Unified View (MIS Quarterly 27(3), 2003)',
    url: 'https://doi.org/10.2307/30036540',
    abgerufen: AB,
  } satisfies Quelle,
  venkateshThongXu2012: {
    titel: 'Venkatesh, Thong & Xu — Consumer Acceptance and Use of Information Technology: Extending the Unified Theory of Acceptance and Use of Technology (MIS Quarterly 36(1), 2012)',
    url: 'https://doi.org/10.2307/41410412',
    abgerufen: AB,
  } satisfies Quelle,
  venkateshBala2008: {
    titel: 'Venkatesh & Bala — Technology Acceptance Model 3 and a Research Agenda on Interventions (Decision Sciences 39(2), 2008)',
    url: 'https://doi.org/10.1111/j.1540-5915.2008.00192.x',
    abgerufen: AB,
  } satisfies Quelle,
  bagozzi2007: {
    titel: 'Bagozzi — The Legacy of the Technology Acceptance Model and a Proposal for a Paradigm Shift (Journal of the Association for Information Systems 8(4), 2007)',
    url: 'https://doi.org/10.17705/1jais.00122',
    abgerufen: AB,
  } satisfies Quelle,
  // Algorithmus-Aversion
  dietvorst2015: {
    titel: 'Dietvorst, Simmons & Massey — Algorithm Aversion: People Erroneously Avoid Algorithms After Seeing Them Err (Journal of Experimental Psychology: General 144(1), 2015)',
    url: 'https://doi.org/10.1037/xge0000033',
    abgerufen: AB,
  } satisfies Quelle,
  dietvorst2018: {
    titel: 'Dietvorst, Simmons & Massey — Overcoming Algorithm Aversion: People Will Use Imperfect Algorithms If They Can (Even Slightly) Modify Them (Management Science 64(3), 2018)',
    url: 'https://doi.org/10.1287/mnsc.2016.2643',
    abgerufen: AB,
  } satisfies Quelle,
  loggMinsonMoore2019: {
    titel: 'Logg, Minson & Moore — Algorithm Appreciation: People Prefer Algorithmic to Human Judgment (Organizational Behavior and Human Decision Processes 151, 2019)',
    url: 'https://doi.org/10.1016/j.obhdp.2018.12.005',
    abgerufen: AB,
  } satisfies Quelle,
  parasuramanManzey2010: {
    titel: 'Parasuraman & Manzey — Complacency and Bias in Human Use of Automation: An Attentional Integration (Human Factors 52(3), 2010)',
    url: 'https://doi.org/10.1177/0018720810376055',
    abgerufen: AB,
  } satisfies Quelle,
  burtonSteinJensen2020: {
    titel: 'Burton, Stein & Jensen — A Systematic Review of Algorithm Aversion in Augmented Decision Making (Journal of Behavioral Decision Making 33(2), 2020)',
    url: 'https://doi.org/10.1002/bdm.2155',
    abgerufen: AB,
  } satisfies Quelle,
  // Diffusion
  rogers2004: {
    titel: 'Rogers — A Prospective and Retrospective Look at the Diffusion Model (Journal of Health Communication 9(sup1), 2004)',
    url: 'https://doi.org/10.1080/10810730490271449',
    abgerufen: AB,
  } satisfies Quelle,
  rogers1976: {
    titel: 'Rogers — New Product Adoption and Diffusion (Journal of Consumer Research 2(4), 1976)',
    url: 'https://doi.org/10.1086/208642',
    abgerufen: AB,
  } satisfies Quelle,
  bass1969: {
    titel: 'Bass — A New Product Growth for Model Consumer Durables (Management Science 15(5), 1969)',
    url: 'https://doi.org/10.1287/mnsc.15.5.215',
    abgerufen: AB,
  } satisfies Quelle,
  greenhalgh2004: {
    titel: 'Greenhalgh, Robert, Macfarlane, Bate & Kyriakidou — Diffusion of Innovations in Service Organizations: Systematic Review and Recommendations (Milbank Quarterly 82(4), 2004)',
    url: 'https://doi.org/10.1111/j.0887-378X.2004.00325.x',
    abgerufen: AB,
  } satisfies Quelle,
  goldenbergLibaiMuller2002: {
    titel: 'Goldenberg, Libai & Muller — Riding the Saddle: How Cross-Market Communications Can Create a Major Slump in Sales (Journal of Marketing 66(2), 2002)',
    url: 'https://doi.org/10.1509/jmkg.66.2.1.18472',
    abgerufen: AB,
  } satisfies Quelle,
  // Befunde lesen
  osc2015: {
    titel: 'Open Science Collaboration — Estimating the Reproducibility of Psychological Science (Science 349(6251), 2015)',
    url: 'https://doi.org/10.1126/science.aac4716',
    abgerufen: AB,
  } satisfies Quelle,
  simmonsNelsonSimonsohn2011: {
    titel: 'Simmons, Nelson & Simonsohn — False-Positive Psychology: Undisclosed Flexibility in Data Collection and Analysis Allows Presenting Anything as Significant (Psychological Science 22(11), 2011)',
    url: 'https://doi.org/10.1177/0956797611417632',
    abgerufen: AB,
  } satisfies Quelle,
  camerer2018: {
    titel: 'Camerer et al. — Evaluating the Replicability of Social Science Experiments in Nature and Science Between 2010 and 2015 (Nature Human Behaviour 2(9), 2018)',
    url: 'https://doi.org/10.1038/s41562-018-0399-z',
    abgerufen: AB,
  } satisfies Quelle,
  hagger2016: {
    titel: 'Hagger et al. — A Multilab Preregistered Replication of the Ego-Depletion Effect (Perspectives on Psychological Science 11(4), 2016)',
    url: 'https://doi.org/10.1177/1745691616652873',
    abgerufen: AB,
  } satisfies Quelle,
  nosek2022: {
    titel: 'Nosek et al. — Replicability, Robustness, and Reproducibility in Psychological Science (Annual Review of Psychology 73, 2022)',
    url: 'https://doi.org/10.1146/annurev-psych-020821-114157',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block4: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'nudge-entscheidungsarchitektur',
    titel: 'Nudge und Entscheidungsarchitektur',
    thema: 'psychologie',
    einleitung:
      'Jede Art, Optionen darzustellen, beeinflusst, was gewählt wird; eine neutrale Darstellung gibt es nicht. Wer das weiß, kann Entscheidungen erleichtern, ohne Wahlmöglichkeiten zu nehmen. Ob das gut wirkt und ob es erlaubt ist, wird kontrovers diskutiert.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Thaler und Sunstein (2008) nennen jede Gestaltung der Umgebung, in der Menschen entscheiden, Entscheidungsarchitektur (choice architecture), und jeden Aspekt dieser Architektur, der das Verhalten vorhersagbar verändert, ohne Optionen zu verbieten oder wirtschaftliche Anreize wesentlich zu ändern, einen Nudge (Anstoß). Eine Voreinstellung ist ein Nudge, ein Verbot nicht, eine Steuer nicht. Ihre Position nennen sie libertären Paternalismus: Die Freiheit bleibt erhalten, weil man jeden Nudge mit geringem Aufwand umgehen kann, und der Anstoß zielt darauf, was die Betroffenen nach eigenem Urteil für sich wollen.',
          'Thaler, Sunstein und Balz (2010) beschreiben die Werkzeuge der Entscheidungsarchitektur: Voreinstellungen, die gelten, wenn niemand handelt; die Erwartung von Fehlern, sodass die Gestaltung sie auffängt; Rückmeldung über die Folgen einer Wahl; die verständliche Übersetzung von Optionen in Erfahrungen (mapping); die Strukturierung komplexer Entscheidungen; und Anreize, die sichtbar gemacht werden. Johnson und Goldstein (2003) liefern das bekannteste Beispiel: Der Anteil registrierter Organspender liegt in Ländern mit Widerspruchslösung um ein Vielfaches höher als in Ländern mit Zustimmungslösung, obwohl die Einstellungen der Bevölkerung sich kaum unterscheiden. Der Artikel über Status-quo-Bias und Voreinstellung behandelt die Mechanik.',
        ],
      },
      {
        titel: 'Wie gut wirken Nudges?',
        absaetze: [
          'Mertens, Herberz, Hahnel und Brosch (2022) fassten in einer Metaanalyse über 200 Veröffentlichungen mit mehreren hundert Effektschätzungen zusammen und fanden im Mittel einen kleinen bis mittleren Effekt, am stärksten bei Voreinstellungen und im Bereich Ernährung, schwächer bei Information und Erinnerung. Maier, Bartoš, Stanley, Shanks, Harris und Wagenmakers (2022) prüften dieselben Daten auf Publikationsverzerrung, also die Neigung, nur Studien mit Effekt zu veröffentlichen, und kamen nach Korrektur zu dem Schluss, dass die Daten keinen Beleg für eine Wirkung von Nudges insgesamt liefern; für einzelne Kategorien, insbesondere Voreinstellungen, bleibt ein Effekt plausibel.',
          'Für die Praxis heißt das: Voreinstellungen sind das bestbelegte Werkzeug; Hinweise, Erinnerungen und Informationsnudges wirken, wenn überhaupt, schwach. Wer einen Nudge einsetzt, sollte seine Wirkung im eigenen Kontext messen, statt sie aus der Literatur zu übernehmen. Der letzte Artikel dieser Sammlung erklärt, warum Metaanalysen so unterschiedlich ausfallen können.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Bei der Einführung eines KI-Assistenten für die Kundenkorrespondenz eines Versicherungsmaklers stellt sich die Frage, wie das Werkzeug in den Arbeitsablauf eingebaut wird. Variante A: Die Sachbearbeiter öffnen bei Bedarf ein separates Fenster. Variante B: Der Entwurf des Assistenten erscheint als Voreinstellung im Antwortfeld, kann aber mit einem Klick verworfen werden. Nach der Nudge-Forschung wird Variante B deutlich häufiger genutzt, ohne dass jemand gezwungen wird. Die Beratung schlägt B vor und ergänzt, was Thaler und Sunstein als Bedingung nennen: Rückmeldung (der Sachbearbeiter sieht, wie oft er Entwürfe geändert hat) und die Erwartung von Fehlern (der Entwurf ist als solcher markiert und wird nie automatisch gesendet).',
          'Der Akademie-Artikel über Nudging und die Erosion der Autonomie beschreibt die Gegenseite: Empfehlungssysteme und Aufmerksamkeitsökonomie, in denen Nudges gegen die Interessen der Nutzer arbeiten. Für eine Beratung ist die Prüffrage einfach: Würde der Sachbearbeiter, wenn man ihm die Voreinstellung erklärt, sie selbst so wählen? Wenn ja, ist der Nudge Unterstützung; wenn nein, ist er Steuerung, und der Artikel über Dark Patterns beschreibt, wohin das führt. Der Praktikant kann in jedem Werkzeug, das ein Kunde nutzt, die Voreinstellungen prüfen: Sie sagen, wessen Interessen der Gestalter im Blick hatte.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Der Streit zwischen Mertens und Kollegen und Maier und Kollegen zeigt, dass die Wirkung von Nudges als Gesamtkategorie nicht gesichert ist; ein Nudge ist kein Rezept, sondern eine Hypothese, die im Einzelfall geprüft werden muss. Effekte, die in einer Bevölkerung gemessen wurden, gelten nicht automatisch für ein Team von zwanzig Sachbearbeitern, und kleine Effekte im Mittel können im Einzelfall null sein.',
          'Die ethische Kritik trifft den Kern des Konzepts: Wer Entscheidungsarchitektur gestaltet, entscheidet mit, auch wenn er die Freiheit formal erhält, und die Behauptung, man stoße Menschen nur zu dem an, was sie selbst wollen, setzt voraus, dass man das weiß. Thaler und Sunstein verlangen deshalb Transparenz: Ein Nudge, den man nicht öffentlich erklären könnte, ist keiner. Für Beratung gilt zusätzlich die Regel der Nachvollziehbarkeit: Voreinstellungen, die ein Kunde für seine Mitarbeiter setzt, müssen diesen erklärt werden, sonst wird aus Unterstützung Manipulation im Auftrag.',
        ],
      },
    ],
    quellen: [Q.thalerSunsteinNudge, Q.thalerSunsteinBalz2013, Q.johnsonGoldstein2003, Q.mertens2022, Q.maier2022],
    sieheAuch: ['status-quo-default', 'nudging-autonomie-empfehlungssysteme', 'persuasion-dark-patterns', 'psychologie-befunde-lesen', 'change-management'],
    synonyme: ['Choice Architecture', 'Libertärer Paternalismus', 'Anstoß', 'Voreinstellung', 'Nudging'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'preispsychologie',
    titel: 'Preispsychologie: Referenzpreise, Anker, mentale Konten und Fairness',
    thema: 'psychologie',
    einleitung:
      'Ob ein Preis als teuer, angemessen oder unverschämt empfunden wird, hängt weniger vom Betrag ab als vom Vergleich, den der Kunde im Kopf anstellt. Die Verhaltensökonomie erklärt diese Vergleiche und setzt zugleich Grenzen, an denen Preisgestaltung als unfair gilt.',
    abschnitte: [
      {
        titel: 'Mentale Konten und Referenzpreise',
        absaetze: [
          'Thaler (1985) beschreibt, dass Menschen Geld in gedanklichen Konten führen (mental accounting): Ein Betrag wird nicht als Betrag bewertet, sondern danach, aus welchem Konto er stammt und wofür er gedacht ist. Beim Kauf entstehen zwei Nutzen: der Gebrauchsnutzen der Sache und der Transaktionsnutzen, also der Unterschied zwischen dem gezahlten Preis und dem Referenzpreis, den man für angemessen hält. Ein Bier am Strand, das im Hotel gekauft wurde, darf mehr kosten als eines aus dem Kiosk, weil der Referenzpreis ein anderer ist. Thaler (2017) ordnet diese Beobachtungen in seiner Nobelvorlesung in die Entwicklung der Verhaltensökonomie ein: Sie beginnt bei Anomalien, die die Standardtheorie nicht erklärt, und endet bei Werkzeugen, die mit ihnen rechnen.',
          'Der Referenzpreis ist formbar. Ariely, Loewenstein und Prelec (2003) ließen Versuchspersonen die letzten beiden Ziffern ihrer Sozialversicherungsnummer notieren und dann angeben, ob sie diesen Betrag für verschiedene Produkte zahlen würden; anschließend nannten sie ihre maximale Zahlungsbereitschaft. Wer hohe Ziffern hatte, bot deutlich mehr als wer niedrige hatte. Zugleich blieben die Relationen zwischen den Produkten stabil: Die Zahlungsbereitschaft war in sich kohärent und im Ausgangspunkt willkürlich (coherent arbitrariness). Für die Preisgestaltung heißt das: Die erste Zahl, die ein Kunde sieht, setzt den Maßstab.',
        ],
      },
      {
        titel: 'Köder und Fairness',
        absaetze: [
          'Huber, Payne und Puto (1982) zeigten, dass eine dritte Option, die von einer der beiden bestehenden in allen Merkmalen übertroffen wird, den Anteil dieser überlegenen Option erhöht, obwohl sie selbst nie gewählt wird. Dieser Ködereffekt (decoy effect) widerspricht der Annahme, dass eine hinzugefügte Option den anderen nur Anteile nehmen kann. Angebote in drei Stufen, von denen die mittlere als vernünftig erscheint, nutzen diese Mechanik.',
          'Kahneman, Knetsch und Thaler (1986) befragten Menschen dazu, welche Preisentscheidungen sie als fair empfinden. Ein Baumarkt, der nach einem Schneesturm den Preis für Schneeschaufeln erhöht, wurde von 82 Prozent der Befragten als unfair beurteilt. Die Regel dahinter: Ein Unternehmen darf seinen Referenzgewinn schützen, etwa Kostensteigerungen weitergeben, aber es darf Marktmacht nicht nutzen, um Kunden gegenüber ihrem Referenzpreis schlechter zu stellen. Fairnessnormen begrenzen also, was Preisgestaltung tun kann, ohne die Beziehung zu beschädigen, und Kunden bestrafen Verstöße auch dann, wenn es sie selbst etwas kostet.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Artikel über das Beratungsunternehmen beschreibt Hebel und Auslastung; dieser Artikel betrifft die Frage, wie ein Angebot beim Kunden ankommt. Eine kleine KI-Beratung, die ein Projekt in drei Varianten anbietet (Analyse, Analyse mit Pilot, Analyse mit Pilot und Begleitung), nutzt den Ködereffekt und den Referenzpreis: Die größte Variante setzt den Maßstab, die mittlere erscheint vernünftig. Das ist legitim, solange jede Variante für sich sinnvoll ist und der Kunde die kleinste tatsächlich wählen kann. Ein Köder, der nur existiert, um die mittlere Variante zu verkaufen, ist eine Täuschung, die spätestens beim zweiten Angebot auffällt.',
          'Für Mittelständler ist Fairness besonders wichtig, weil Beziehungen dort lang sind und Referenzpreise sich herumsprechen. Ein Tagessatz, der nach dem ersten Projekt ohne erkennbaren Grund steigt, verletzt die Regel, die Kahneman, Knetsch und Thaler beschreiben; ein Tagessatz, der mit einer nachvollziehbaren Kostenbegründung steigt, nicht. Der Praktikant kann in Angebotsgesprächen beobachten, welche Zahl zuerst fällt, welche Variante der Kunde als Vergleich heranzieht und ob er einen Referenzpreis nennt, etwa den Stundensatz seines IT-Dienstleisters. Jede dieser Zahlen verschiebt das Gespräch.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Befunde stammen aus Konsumentenentscheidungen mit kleinen Beträgen; im Geschäftskundengeschäft mit Einkaufsabteilungen, Vergleichsangeboten und Budgetprozessen wirken sie schwächer, und ein erfahrener Einkäufer kennt den Ködereffekt. Der Ankereffekt der ersten Zahl ist robust, aber ein Anker, der als unangemessen erkannt wird, kostet Glaubwürdigkeit. Wer die Preispsychologie nutzt, um Kunden zu Entscheidungen zu bewegen, die sie bei Kenntnis der Mechanik nicht treffen würden, handelt nach den Maßstäben von Thaler selbst nicht mehr im Bereich der Unterstützung.',
          'Fairnessnormen sind zudem kulturell und branchenabhängig; was in einem Markt als üblich gilt, wird in einem anderen als Ausnutzung gesehen. Für die Preisgestaltung einer Beratung ist die verlässlichste Regel deshalb nicht psychologisch, sondern die Nachvollziehbarkeit: Ein Preis, dessen Zustandekommen der Kunde versteht, hat einen Referenzpreis, den er selbst gebildet hat. Der Artikel über Verhandeln beschreibt, wie objektive Kriterien diese Nachvollziehbarkeit herstellen.',
        ],
      },
    ],
    quellen: [Q.thaler1985, Q.thalerNobel2017, Q.arielyLoewensteinPrelec2003, Q.huberPaynePuto1982, Q.kahnemanKnetschThaler1986],
    sieheAuch: ['beratungsunternehmen', 'verhandeln-psychologie', 'anker-bestaetigungsfehler', 'prospect-theory-framing', 'business-case'],
    synonyme: ['Mental Accounting', 'Decoy-Effekt', 'Ködereffekt', 'Referenzpreis', 'Preisfairness', 'Transaktionsnutzen'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'technikakzeptanz-tam-utaut',
    titel: 'Technikakzeptanz: warum Menschen ein Werkzeug nutzen oder nicht',
    thema: 'psychologie',
    einleitung:
      'Ob eine Software genutzt wird, entscheidet sich nicht an ihren Funktionen, sondern daran, ob die Nutzer sie für nützlich und leicht bedienbar halten, ob ihr Umfeld die Nutzung erwartet und ob die Bedingungen stimmen. Zwei Modelle fassen diese Faktoren zusammen und sind seit Jahrzehnten Standard.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Davis (1989) entwickelte das Technikakzeptanzmodell (technology acceptance model, TAM) mit zwei Kernvariablen: der wahrgenommenen Nützlichkeit (perceived usefulness), also dem Grad, in dem eine Person glaubt, dass ein System ihre Arbeitsleistung verbessert, und der wahrgenommenen Bedienbarkeit (perceived ease of use), dem Grad, in dem sie glaubt, dass die Nutzung wenig Mühe kostet. Beide sagen die Nutzungsabsicht vorher, und die Nützlichkeit wirkte in seinen Studien deutlich stärker als die Bedienbarkeit: Menschen nehmen Mühe in Kauf, wenn das Werkzeug ihnen etwas bringt, aber ein einfaches Werkzeug ohne Nutzen wird nicht verwendet.',
          'Venkatesh, Morris, Davis und Davis (2003) verglichen acht Akzeptanzmodelle und fassten sie zur vereinheitlichten Theorie der Akzeptanz und Nutzung von Technologie (UTAUT) zusammen. Vier Faktoren bestimmen darin die Nutzungsabsicht und das Verhalten: Leistungserwartung (bringt es mir etwas?), Aufwandserwartung (wie schwer ist es?), sozialer Einfluss (erwarten wichtige Personen, dass ich es nutze?) und erleichternde Bedingungen (gibt es Infrastruktur und Hilfe?). Geschlecht, Alter, Erfahrung und Freiwilligkeit der Nutzung verändern die Gewichte. In den Längsschnittdaten der Autoren erklärte das Modell rund 70 Prozent der Unterschiede in der Nutzungsabsicht.',
        ],
      },
      {
        titel: 'Erweiterungen und Kritik',
        absaetze: [
          'Venkatesh und Bala (2008) beschreiben mit TAM 3 die Vorläufer der beiden Kernvariablen (etwa Selbstwirksamkeit, Angst vor dem Computer, Ergebnisqualität, Sichtbarkeit von Ergebnissen) und leiten daraus ab, was eine Organisation vor und nach der Einführung tun kann: Nutzer beteiligen, Führung sichtbar einbinden, schulen, Unterstützung organisieren. Venkatesh, Thong und Xu (2012) erweitern UTAUT für den Konsumentenkontext um hedonische Motivation (macht es Freude?), Preis-Leistung und Gewohnheit; Gewohnheit erwies sich als starker eigenständiger Faktor.',
          'Bagozzi (2007) kritisiert das Erbe des Technikakzeptanzmodells: Es sei zu einfach, um das Verhalten zu erklären, die Lücke zwischen Absicht und tatsächlicher Nutzung bleibe unbeachtet, Emotionen und Gruppenprozesse fehlten, und die Fülle von Erweiterungen habe die Übersicht zerstört, ohne die Erklärungskraft zu erhöhen. Seine Kritik trifft die Praxis dort, wo Befragungen zur Nutzungsabsicht als Beleg für spätere Nutzung genommen werden.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Akademie-Artikel über Change-Management und Adoption beschreibt die Einführung von KI-Werkzeugen; die Akzeptanzmodelle liefern dafür eine Prüfliste. Leistungserwartung: Wissen die Sachbearbeiter, was ihnen das Werkzeug konkret abnimmt, und haben sie das an einem eigenen Fall gesehen? Aufwandserwartung: Ist es in ihre gewohnte Oberfläche eingebettet oder ein weiteres Fenster mit eigenem Login? Sozialer Einfluss: Nutzt die Abteilungsleitung es sichtbar selbst, und gibt es Kollegen, die als Vorbilder gelten? Erleichternde Bedingungen: Wer hilft am ersten Tag, wenn etwas nicht funktioniert, und wie schnell? Gewohnheit: Gibt es einen festen Anlass im Tagesablauf, zu dem das Werkzeug benutzt wird?',
          'Diese Prüfliste ordnet Beobachtungen aus dem Kundenprojekt. Wenn ein KI-Assistent nach der Schulung nicht benutzt wird, zeigt die Liste, welcher Faktor fehlt: Häufig ist es die Leistungserwartung, weil die Schulung Funktionen erklärt hat, nicht Nutzen für den eigenen Arbeitstag. Der Praktikant kann vor einer Einführung die vier Faktoren in Gesprächen mit späteren Nutzern abfragen und die Antworten notieren; die Lücken sind die Aufgabenliste für die Einführung, und die Befragung nach der Einführung zeigt, ob die Lücken sich geschlossen haben.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Modelle erklären Absichten in Befragungen gut und Verhalten weniger gut; Bagozzis Einwand bleibt bestehen. Sie sind für einzelne Nutzer entwickelt, während KI-Einführungen im Mittelstand Entscheidungen von Organisationen sind, in denen Abteilungen, Betriebsrat und Geschäftsführung mitreden. Der Artikel über die Diffusion von Innovationen behandelt die organisatorische Seite. Zudem stammen die Grundlagenstudien aus einer Zeit, in der Software am Arbeitsplatz Formulare und Tabellen bedeutete; ob die Faktoren für Werkzeuge gelten, die Texte erzeugen und Entscheidungen vorschlagen, ist erst in Ansätzen untersucht.',
          'Ein Werkzeug, das nach diesen Modellen akzeptiert wird, ist nicht automatisch ein gutes Werkzeug. Hohe Leistungserwartung kann auf Überschätzung beruhen, und Gewohnheit hält auch Werkzeuge im Einsatz, die niemand mehr prüft. Der Artikel über Algorithmus-Aversion und Automation Bias zeigt, dass Akzeptanz und angemessenes Vertrauen zwei verschiedene Dinge sind: Die Frage ist nicht nur, ob Menschen das Werkzeug nutzen, sondern ob sie es richtig nutzen.',
        ],
      },
    ],
    quellen: [Q.davis1989, Q.venkatesh2003, Q.venkateshBala2008, Q.venkateshThongXu2012, Q.bagozzi2007],
    sieheAuch: ['change-management', 'ki-kompetenz', 'poc-pilot-skalierung', 'motivation-arbeit', 'algorithmus-aversion', 'diffusion-innovationen'],
    synonyme: ['TAM', 'UTAUT', 'Technology Acceptance Model', 'Nutzungsabsicht', 'Perceived Usefulness'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'algorithmus-aversion',
    titel: 'Algorithmus-Aversion und Automation Bias: zu wenig und zu viel Vertrauen in die Maschine',
    thema: 'psychologie',
    einleitung:
      'Menschen verwerfen einen Algorithmus nach dem ersten sichtbaren Fehler, obwohl er besser ist als sie selbst, und übernehmen an anderer Stelle seine Vorschläge ungeprüft. Für jede KI-Einführung sind beide Reaktionen das eigentliche Problem, nicht die Modellgüte.',
    abschnitte: [
      {
        titel: 'Algorithmus-Aversion',
        absaetze: [
          'Dietvorst, Simmons und Massey (2015) ließen Versuchspersonen wählen, ob ihre Prognose oder die eines statistischen Modells über eine Belohnung entscheiden sollte. Wer das Modell zuvor bei der Arbeit gesehen hatte, und damit auch seine Fehler, wählte danach häufiger das menschliche Urteil, obwohl das Modell insgesamt genauer war. Menschen verzeihen einem Algorithmus Fehler weniger als einem Menschen, weil sie annehmen, dass ein Mensch lernt und der Algorithmus nicht. Die Autoren nennen das Algorithmus-Aversion (algorithm aversion).',
          'In einer Folgestudie (Dietvorst, Simmons & Massey, 2018) fanden sie einen Ausweg: Wer die Prognose des Modells geringfügig anpassen durfte, nutzte es deutlich häufiger und war mit ihm zufriedener, selbst wenn die Anpassung die Genauigkeit kaum veränderte. Kontrolle, auch symbolische, stellt die Akzeptanz her. Burton, Stein und Jensen (2020) ordnen in einer systematischen Übersicht die Ursachen der Aversion: falsche Erwartungen an Maschinen, fehlende Entscheidungsfreiheit, Anreize, die menschliches Urteil belohnen, Unverständnis für die Arbeitsweise des Algorithmus und unterschiedliche Vorstellungen davon, was eine gute Entscheidung ist.',
        ],
      },
      {
        titel: 'Die Gegenrichtung: Wertschätzung und Automation Bias',
        absaetze: [
          'Logg, Minson und Moore (2019) fanden das Gegenteil: In Schätzaufgaben folgten Laien einem Rat stärker, wenn er als Ergebnis eines Algorithmus statt eines Menschen bezeichnet war (algorithm appreciation). Fachleute des jeweiligen Gebiets zeigten diese Wertschätzung nicht und ignorierten beide Ratgeber weitgehend zugunsten ihres eigenen Urteils. Ob Menschen Algorithmen meiden oder bevorzugen, hängt also von Aufgabe, Vorwissen und Darstellung ab, und die Forschung liefert für beide Richtungen Belege.',
          'Parasuraman und Manzey (2010) beschreiben aus der Ingenieurpsychologie die Gefahr der zweiten Richtung. Nachlässigkeit gegenüber Automation (complacency) bedeutet, dass Menschen ein zuverlässig arbeitendes System nicht mehr überwachen; Automation Bias bedeutet, dass sie seinen Vorschlägen folgen, auch wenn eigene Information dagegen spricht, mit Fehlern durch Unterlassung (ein Problem wird nicht bemerkt, weil das System nichts meldet) und durch Ausführung (ein falscher Vorschlag wird umgesetzt). Beide entstehen aus begrenzter Aufmerksamkeit und der Erfahrung, dass das System meistens recht hat. Ein Mensch in der Schleife, der nur noch abnickt, ist keine Kontrolle mehr.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Logistikunternehmen führt ein Planungssystem ein, das Disponenten Tourvorschläge macht. In der ersten Woche schlägt das System eine Tour vor, die einen bekannten Engpass ignoriert; die Disponenten schalten es gedanklich ab und planen wieder von Hand, obwohl es in der Summe bessere Touren liefert als sie. Das ist Dietvorsts Aversion, und die Gegenmaßnahme aus der Folgestudie ist konkret: Das System liefert einen Vorschlag, den der Disponent bearbeiten kann und muss, und die Beratung zeigt in der Einführung nicht nur die Treffer, sondern auch die Fehler des Systems und wie man sie erkennt.',
          'Ein halbes Jahr später droht das Gegenteil. Die Vorschläge sind meist gut, die Disponenten übernehmen sie ohne Blick, und ein Fehler in den Stammdaten läuft wochenlang durch. Hier braucht es, was Parasuraman und Manzey beschreiben: Aufgaben, die Aufmerksamkeit verlangen, etwa stichprobenartige Prüfungen mit Rückmeldung, und Anzeigen, die Unsicherheit des Systems sichtbar machen. Die Akademie-Artikel über Halluzination und Sycophancy behandeln, warum Sprachmodelle diese Gefahr verschärfen: Sie klingen sicher, auch wenn sie falsch liegen. Der Praktikant kann in Projekten beide Muster beobachten: Wird das Werkzeug nach einem Fehler gemieden, oder werden seine Ausgaben ungeprüft weitergereicht?',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Befunde widersprechen sich teilweise, und Burton, Stein und Jensen zeigen, dass Aufgabe, Darstellung, Vorwissen und Anreize das Ergebnis bestimmen; eine allgemeine Aussage, ob Menschen Algorithmen meiden oder überschätzen, ist nicht möglich. Die Experimente betreffen zudem Prognosen mit messbarer Genauigkeit; in vielen KI-Anwendungen im Mittelstand, etwa Textentwürfen, gibt es keine eindeutige Wahrheit, an der man Mensch und Maschine vergleichen könnte.',
          'Die Forschung zu Automation Bias stammt aus Cockpits und Leitwarten, in denen Automation seit Jahrzehnten erprobt ist; ob ihre Gegenmaßnahmen für Sprachmodelle in Büroanwendungen reichen, ist offen. Eine Beratung, die ein KI-Werkzeug einführt, sollte deshalb beides messen: die Nutzungsquote, um Aversion zu erkennen, und die Prüfquote, um Automation Bias zu erkennen. Der Akademie-Artikel über Mensch-KI-Verhalten ordnet diese Fragen in die Forschung zum Verhalten von Menschen gegenüber Maschinen ein.',
        ],
      },
    ],
    quellen: [Q.dietvorst2015, Q.dietvorst2018, Q.loggMinsonMoore2019, Q.parasuramanManzey2010, Q.burtonSteinJensen2020],
    sieheAuch: ['mensch-ki-verhalten', 'halluzination', 'sycophancy-artikel', 'ki-strategie', 'technikakzeptanz-tam-utaut', 'intuition-expertise'],
    synonyme: ['Algorithm Aversion', 'Algorithm Appreciation', 'Automation Bias', 'Automationsnachlässigkeit', 'Human in the Loop'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'diffusion-innovationen',
    titel: 'Diffusion von Innovationen: wie sich Neues verbreitet',
    thema: 'psychologie',
    einleitung:
      'Neue Technik setzt sich nicht durch, weil sie besser ist, sondern weil Menschen sie nacheinander übernehmen, jeder mit anderen Gründen. Die Diffusionsforschung beschreibt diese Abfolge, die Merkmale, die eine Innovation annehmbar machen, und die Einbrüche, die dazwischen liegen.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Rogers (2004) blickt auf das Diffusionsmodell zurück, das er seit 1962 in fünf Auflagen seines Buches Diffusion of Innovations ausgearbeitet hat. Diffusion ist der Prozess, in dem eine Innovation über bestimmte Kanäle im Laufe der Zeit unter den Mitgliedern eines sozialen Systems kommuniziert wird. Die Übernahme folgt einer S-Kurve, und die Übernehmenden lassen sich nach dem Zeitpunkt in fünf Gruppen einteilen: Innovatoren (nach Rogers rund 2,5 Prozent), frühe Übernehmer (13,5 Prozent), frühe Mehrheit (34 Prozent), späte Mehrheit (34 Prozent) und Nachzügler (16 Prozent). Die Prozentwerte sind eine Konvention, die aus der Normalverteilung abgeleitet ist; die Gruppen unterscheiden sich in Risikobereitschaft, Vernetzung und Bildung.',
          'Rogers (1976) beschreibt, welche wahrgenommenen Merkmale einer Innovation ihre Übernahme beschleunigen: relativer Vorteil gegenüber dem Bisherigen, Vereinbarkeit mit bestehenden Werten und Gewohnheiten, geringe Komplexität, Erprobbarkeit im Kleinen und Beobachtbarkeit der Ergebnisse bei anderen. Entscheidend ist die Wahrnehmung durch die potenziellen Übernehmer, nicht die objektive Eigenschaft. Massenmedien erzeugen Kenntnis, aber die Entscheidung zur Übernahme wird meist durch persönliche Kommunikation mit Menschen ausgelöst, die man kennt und die ähnlich sind.',
        ],
      },
      {
        titel: 'Modelle und Einbrüche',
        absaetze: [
          'Bass (1969) fasste die Verbreitung in ein mathematisches Modell mit zwei Kräften: Innovation, also Übernahme unabhängig von anderen, und Imitation, also Übernahme aufgrund derer, die schon übernommen haben. Das Modell beschreibt viele Verbreitungsverläufe langlebiger Konsumgüter gut und wird bis heute für Absatzprognosen neuer Produkte verwendet. Goldenberg, Libai und Muller (2002) zeigten, dass viele Verläufe nach dem ersten Anstieg einbrechen und erst später wieder steigen: Der frühe Markt aus Innovatoren und die Hauptmasse kommunizieren wenig miteinander, sodass die Nachfrage der ersten Gruppe gesättigt ist, bevor die zweite überzeugt wird. Sie nennen das den Sattel (saddle); die Praxisliteratur spricht von einer Kluft zwischen frühen Übernehmern und früher Mehrheit.',
          'Greenhalgh, Robert, Macfarlane, Bate und Kyriakidou (2004) haben die Diffusionsforschung für Dienstleistungsorganisationen systematisch ausgewertet. Ihr Ergebnis: In Organisationen ist Übernahme selten die Entscheidung einer Person, sondern ein Prozess aus Verbreitung, Entscheidung, Einführung und Verankerung, der von der Aufnahmefähigkeit der Organisation, ihrer Führung, ihren Netzwerken und dem äußeren Druck abhängt. Die Merkmale der Innovation erklären nur einen Teil.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Artikel über Strategie im Mittelstand beschreibt inhabergeführte Unternehmen; die Diffusionsforschung erklärt, warum KI dort langsam ankommt und was das für eine Beratung heißt. Die frühen Übernehmer, die in den ersten Jahren Projekte beauftragen, sind risikobereit, gut vernetzt und wollen Neues; sie verzeihen Fehler und sind gute Referenzen. Die frühe Mehrheit, die den größeren Markt bildet, will Beobachtbarkeit: einen Betrieb aus der eigenen Branche und Region, bei dem es funktioniert, und einen erprobbaren Einstieg mit Rückweg. Wer die Mehrheit mit den Argumenten der frühen Übernehmer anspricht, landet im Sattel.',
          'Für ein einzelnes Einführungsprojekt gilt dieselbe Logik im Kleinen. Die Beratung sucht im Kundenunternehmen die Personen, die andere um Rat fragen (Rogers nennt sie Meinungsführer), gewinnt sie zuerst und sorgt dafür, dass ihre Ergebnisse sichtbar werden. Der Praktikant kann die fünf Merkmale als Prüfliste auf jedes Werkzeug anwenden: Wo liegt der relative Vorteil aus Sicht des Sachbearbeiters, was an Gewohnheiten stört es, wie komplex wirkt es, kann man es im Kleinen ausprobieren, und sieht jemand das Ergebnis?',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Rogers selbst benennt die Schwächen seines Feldes: eine Pro-Innovations-Verzerrung, die Übernahme als gut und Ablehnung als rückständig behandelt, obwohl viele Innovationen für viele Übernehmer schlecht sind; die Neigung, Nachzügler statt Systeme für langsame Verbreitung verantwortlich zu machen; und die Schwierigkeit, Diffusion im Nachhinein zu rekonstruieren. Die Prozentwerte der Übernehmergruppen sind eine Konvention, keine Messung, und die Kluft zwischen frühem und Hauptmarkt ist aus Beratungsliteratur bekannter als aus Daten, auch wenn Goldenberg und Kollegen den Sattel empirisch belegen.',
          'Das Bass-Modell und die Übernehmerkategorien beschreiben Konsumgüter und Einzelentscheidungen; Greenhalgh und Kollegen zeigen, dass die Übernahme in Organisationen anderen Regeln folgt. Eine Beratung, die einen Mittelständler als frühen Übernehmer einordnet, beschreibt eine Person, den Inhaber, nicht die Organisation, die das Werkzeug später benutzen muss. Der Artikel über Technikakzeptanz behandelt die Ebene der einzelnen Nutzer, der Artikel über Widerstand gegen Veränderung die der Belegschaft; erst zusammen ergeben sie ein Bild.',
        ],
      },
    ],
    quellen: [Q.rogers2004, Q.rogers1976, Q.bass1969, Q.goldenbergLibaiMuller2002, Q.greenhalgh2004],
    sieheAuch: ['strategie-mittelstand', 'disruptive-innovation', 'segmentierung-positionierung', 'technikakzeptanz-tam-utaut', 'ki-strategie'],
    synonyme: ['Diffusion of Innovations', 'Adopterkategorien', 'Early Adopters', 'Bass-Modell', 'Sattel-Effekt', 'Crossing the Chasm'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'psychologie-befunde-lesen',
    titel: 'Psychologie-Befunde richtig lesen: Replikationskrise und Effektstärken',
    thema: 'psychologie',
    einleitung:
      'Viele bekannte Befunde der Psychologie haben Wiederholungsstudien nicht überstanden, und Managementbücher zitieren sie weiter. Wer psychologische Erkenntnisse in Strategie und Beratung nutzt, braucht deshalb Regeln, um belastbare von brüchigen Befunden zu unterscheiden.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die Open Science Collaboration (2015) wiederholte 100 Studien aus drei führenden Psychologie-Zeitschriften mit denselben Materialien und meist größeren Stichproben. Von den Originalstudien hatten 97 Prozent ein statistisch signifikantes Ergebnis berichtet; in den Wiederholungen waren es 36 Prozent, und die gemessenen Effekte waren im Mittel etwa halb so groß wie in den Originalen. Camerer und Kollegen (2018) wiederholten 21 sozialwissenschaftliche Experimente aus Nature und Science mit hoher statistischer Aussagekraft; 13 davon ließen sich replizieren, und auch hier lagen die Effektstärken der erfolgreichen Wiederholungen deutlich unter denen der Originale.',
          'Simmons, Nelson und Simonsohn (2011) erklären, wie es dazu kommt. Forschende haben viele unbemerkte Freiheitsgrade: wann sie aufhören, Daten zu sammeln, welche Variablen sie auswerten, welche Bedingungen sie berichten, welche Kontrollvariablen sie einbeziehen. Werden diese Freiheiten unabsichtlich zugunsten eines Ergebnisses genutzt, steigt die Wahrscheinlichkeit eines Scheinbefunds drastisch; in ihrer Simulation reichten vier gängige Praktiken zusammen, um in über 60 Prozent der Fälle einen Effekt zu finden, wo keiner war. Die Autoren nennen Gegenmaßnahmen, die seither Standard geworden sind: Vorregistrierung der Hypothesen und Auswertung, vollständige Berichte, geteilte Daten.',
        ],
      },
      {
        titel: 'Was das für bekannte Befunde heißt',
        absaetze: [
          'Hagger und Kollegen (2016) wiederholten in 23 Laboren mit vorregistriertem Protokoll den Effekt der Ego-Erschöpfung, nach dem Selbstkontrolle eine begrenzte Ressource ist, die sich verbraucht; die Grundlage hunderter Studien und vieler Managementratschläge. Der gemittelte Effekt lag nahe null. Ähnliche Großprojekte haben andere populäre Befunde geschwächt, etwa die Wirkung kraftvoller Körperhaltungen auf Hormone (im Artikel über Wärme und Kompetenz behandelt) und verschiedene Effekte unbewusster Beeinflussung durch beiläufige Reize (priming).',
          'Nosek und Kollegen (2022) ziehen in ihrer Übersicht Bilanz: Die Replizierbarkeit variiert stark nach Teilgebiet und Methode; Befunde mit großen Stichproben, großen Effekten und einfacher Methodik halten besser als überraschende Befunde aus kleinen Laborstudien. Kognitive Grundeffekte wie Ankereffekte, Verlustaversion und Framing gehören nach ihrer Bilanz zu den robusteren, während viele sozialpsychologische Effekte, die auf subtile Beeinflussung setzen, geschrumpft sind. Die Reformen (Vorregistrierung, Registered Reports, offene Daten, Mehrlaborstudien) haben nach ihrer Einschätzung die Verlässlichkeit neuer Forschung erhöht, ohne die älteren Befunde nachträglich zu prüfen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Kunde hat ein Managementbuch gelesen, nach dem ein bestimmtes Ritual die Kreativität von Teams verdoppelt, und will es in sein KI-Projekt einbauen. Die Beratung muss weder zustimmen noch belehren; sie kann fünf Fragen stellen, die aus der Replikationsforschung folgen. Beruht die Behauptung auf einer einzelnen Studie oder auf mehreren unabhängigen? Wie groß war die Stichprobe, und wer waren die Teilnehmer, etwa Studierende im Labor oder Mitarbeitende im Betrieb? Wie groß ist der Effekt, nicht nur ob er signifikant war? Wurde die Studie vorregistriert oder in einem Großprojekt wiederholt? Und wie viel Geld verdient der Autor damit, dass der Effekt groß ist?',
          'Dieselben Fragen gelten für diese Sammlung. Jeder Artikel nennt seine Quellen, und der Abschnitt Grenzen und Kritik benennt, wo die Belege dünn sind. Der Praktikant kann sich angewöhnen, bei jeder psychologischen Behauptung, die in einem Meeting fällt, nach der Quelle und der Größe des Effekts zu fragen, still für sich, um zu lernen, welche Behauptungen im Beratungsalltag als gesichert gehandelt werden, ohne es zu sein. Eine Beratung, die psychologische Befunde mit Vorsicht zitiert, verliert nichts an Überzeugungskraft und gewinnt Glaubwürdigkeit, wenn ein Kunde nachfragt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Eine gescheiterte Wiederholung beweist nicht, dass der Effekt nicht existiert; sie kann an Unterschieden in Stichprobe, Kontext oder Durchführung liegen, und die Autoren der Originalstudien haben in vielen Fällen genau das geltend gemacht. Die Open Science Collaboration weist selbst darauf hin, dass ihre Auswahl nicht repräsentativ für die gesamte Psychologie ist. Umgekehrt ist eine gelungene Wiederholung im Labor kein Beleg dafür, dass ein Effekt in einem Unternehmen mit anderen Menschen, Anreizen und Zeithorizonten wirkt.',
          'Die Reformen haben Kosten: Vorregistrierung erschwert erkundende Forschung, und der Fokus auf Replizierbarkeit kann Fragen begünstigen, die leicht zu wiederholen sind, statt solcher, die wichtig sind. Für Beratung ist die praktische Folgerung bescheiden: Psychologische Befunde sind Hypothesen über Menschen, die im eigenen Kontext geprüft werden, indem man misst, was nach einer Maßnahme tatsächlich passiert. Das gilt für jeden Artikel dieser Sammlung, einschließlich dieses.',
        ],
      },
    ],
    quellen: [Q.osc2015, Q.camerer2018, Q.simmonsNelsonSimonsohn2011, Q.hagger2016, Q.nosek2022],
    sieheAuch: ['behavioral-strategy', 'nudge-entscheidungsarchitektur', 'waerme-kompetenz-halo', 'entscheidungen-verzerrungen', 'hypothesen-issue-trees'],
    synonyme: ['Replikationskrise', 'Reproduzierbarkeit', 'p-Hacking', 'Effektstärke', 'Vorregistrierung', 'Open Science'],
    unsicher: false,
  },
];
