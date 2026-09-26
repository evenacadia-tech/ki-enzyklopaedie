import type { EigenerArtikel, Quelle } from '../../typen';

// Block 3 — Geschäftsmodell und Kunde. Alle Quellen am 2026-09-26 abgerufen und geprüft.
const AB = '2026-09-26';
const Q = {
  strategyzerBmc: {
    titel: 'Strategyzer — The Business Model Canvas (Strategyzer, o. J.)',
    url: 'https://www.strategyzer.com/library/the-business-model-canvas',
    abgerufen: AB,
  } satisfies Quelle,
  wileyBmg: {
    titel:
      'Osterwalder & Pigneur — Business Model Generation: A Handbook for Visionaries, Game Changers, and Challengers (Wiley, 2010)',
    url: 'https://www.wiley.com/en-us/Business+Model+Generation%3A+A+Handbook+for+Visionaries%2C+Game+Changers%2C+and+Challengers-p-9780470876411',
    abgerufen: AB,
  } satisfies Quelle,
  gablerGeschaeftsmodell: {
    titel: 'Grösser — Geschäftsmodell (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/geschaeftsmodell-52275',
    abgerufen: AB,
  } satisfies Quelle,
  strategyzerVpc: {
    titel: 'Strategyzer — The Value Proposition Canvas (Strategyzer, o. J.)',
    url: 'https://www.strategyzer.com/library/the-value-proposition-canvas',
    abgerufen: AB,
  } satisfies Quelle,
  wileyVpd: {
    titel:
      'Osterwalder, Pigneur, Bernarda & Smith — Value Proposition Design: How to Create Products and Services Customers Want (Wiley, 2014)',
    url: 'https://www.wiley.com/en-us/Value+Proposition+Design:+How+to+Create+Products+and+Services+Customers+Want-p-9781118968055',
    abgerufen: AB,
  } satisfies Quelle,
  hbrJtbd: {
    titel:
      'Christensen, Hall, Dillon & Duncan — Know Your Customers\' "Jobs to Be Done" (Harvard Business Review, 2016)',
    url: 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done',
    abgerufen: AB,
  } satisfies Quelle,
  hbrDisruption2015: {
    titel: 'Christensen, Raynor & McDonald — What Is Disruptive Innovation? (Harvard Business Review, 2015)',
    url: 'https://hbr.org/2015/12/what-is-disruptive-innovation',
    abgerufen: AB,
  } satisfies Quelle,
  hbrDisruption1995: {
    titel: 'Bower & Christensen — Disruptive Technologies: Catching the Wave (Harvard Business Review, 1995)',
    url: 'https://hbr.org/1995/01/disruptive-technologies-catching-the-wave',
    abgerufen: AB,
  } satisfies Quelle,
  hbrInnovatorsDilemma: {
    titel:
      'Christensen — The Innovator\'s Dilemma, with a New Foreword: When New Technologies Cause Great Firms to Fail (Harvard Business Review Press, 2024)',
    url: 'https://store.hbr.org/product/the-innovator-s-dilemma-with-a-new-foreword-when-new-technologies-cause-great-firms-to-fail/10706',
    abgerufen: AB,
  } satisfies Quelle,
  smrKing: {
    titel:
      'King & Baatartogtokh — How Useful Is the Theory of Disruptive Innovation? (MIT Sloan Management Review, 2015)',
    url: 'https://sloanreview.mit.edu/article/how-useful-is-the-theory-of-disruptive-innovation/',
    abgerufen: AB,
  } satisfies Quelle,
  hbrYankelovich: {
    titel: 'Yankelovich & Meer — Rediscovering Market Segmentation (Harvard Business Review, 2006)',
    url: 'https://hbr.org/2006/02/rediscovering-market-segmentation',
    abgerufen: AB,
  } satisfies Quelle,
  mhRiesTrout: {
    titel: 'Ries & Trout — Positioning: The Battle for Your Mind, 20th Anniversary Edition (McGraw-Hill, 2000)',
    url: 'https://www.mheducation.com/highered/mhp/product/positioning-battle-your-mind-20th-anniversary-edition.html',
    abgerufen: AB,
  } satisfies Quelle,
  gablerMarktsegmentierung: {
    titel: 'Kirchgeorg — Marktsegmentierung (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/marktsegmentierung-40268',
    abgerufen: AB,
  } satisfies Quelle,
  gablerPositionierung: {
    titel: 'Kirchgeorg — Positionierung (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/positionierung-44012',
    abgerufen: AB,
  } satisfies Quelle,
  hbrIansiti: {
    titel: 'Iansiti & Lakhani — Competing in the Age of AI (Harvard Business Review, 2020)',
    url: 'https://hbr.org/2020/01/competing-in-the-age-of-ai',
    abgerufen: AB,
  } satisfies Quelle,
  hbrIansitiBuch: {
    titel:
      'Iansiti & Lakhani — Competing in the Age of AI: Strategy and Leadership When Algorithms and Networks Run the World (Harvard Business Review Press, 2020)',
    url: 'https://store.hbr.org/product/competing-in-the-age-of-ai-strategy-and-leadership-when-algorithms-and-networks-run-the-world/10272',
    abgerufen: AB,
  } satisfies Quelle,
  hbrDavenport: {
    titel: 'Davenport & Ronanki — Artificial Intelligence for the Real World (Harvard Business Review, 2018)',
    url: 'https://hbr.org/2018/01/artificial-intelligence-for-the-real-world',
    abgerufen: AB,
  } satisfies Quelle,
  smrWinning: {
    titel:
      'Ransbotham, Khodabandeh, Fehling, LaFountain & Kiron — Winning With AI (MIT Sloan Management Review / Boston Consulting Group, 2019)',
    url: 'https://sloanreview.mit.edu/projects/winning-with-ai/',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block3: EigenerArtikel[] = [
  {
    id: 'business-model-canvas',
    titel: 'Business Model Canvas: das Geschäftsmodell auf einer Seite',
    thema: 'strategie',
    einleitung:
      'Bevor eine Beratung über KI spricht, muss sie verstehen, womit ein Kunde Geld verdient. Das Business Model Canvas ist das verbreitetste Werkzeug, um diese Logik auf einer Seite festzuhalten und zu sehen, welchen Teil davon ein Vorhaben berührt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Geschäftsmodell (business model) beschreibt, wie ein Unternehmen für seine Kunden Wert schafft und daraus einen Ertrag sichert. Das Gabler Wirtschaftslexikon (Grösser) definiert es als modellhafte Repräsentation der logischen Zusammenhänge, mit denen eine Organisation Mehrwert für Kunden erzeugt und einen Ertrag für sich sichern kann. Wichtig ist die Abgrenzung zur Strategie: Ein Geschäftsmodell beschreibt die Funktion einzelner Komponenten und ihr Zusammenspiel, trifft aber keine Aussage zur Wettbewerbssituation. Die Strategie dagegen beschreibt, wie sich ein Unternehmen gegenüber der Konkurrenz abgrenzt und einen dauerhaften Wettbewerbsvorteil aufbaut. Wer ein Geschäftsmodell zeichnet, hat also noch keine Strategie, aber die Grundlage, um über sie zu sprechen.',
          'Alexander Osterwalder und Yves Pigneur veröffentlichten 2010 mit „Business Model Generation“ (Wiley) das Business Model Canvas, eine Vorlage, die ein Geschäftsmodell auf einer Seite in neun Bausteinen abbildet. Das Buch entstand laut Verlag gemeinsam mit 470 Praktikern aus 45 Ländern und richtet sich an Leser, die ein Geschäftsmodell systematisch verstehen, entwerfen und umbauen wollen. Der Nutzen der Vorlage liegt weniger in einer Erkenntnis als in einer gemeinsamen Sprache: Geschäftsführung, Vertrieb und Berater sprechen über dieselben Felder und sehen sofort, welches Feld eine geplante Änderung betrifft.',
        ],
      },
      {
        titel: 'Die neun Bausteine',
        absaetze: [
          'Die rechte Hälfte des Canvas beschreibt den Markt: Kundensegmente (customer segments) nennen, für wen das Unternehmen arbeitet; Wertangebote (value propositions) beschreiben, welches Bündel aus Produkten und Leistungen ein Segment bekommt; Kanäle (channels) zeigen, wie das Angebot den Kunden erreicht; Kundenbeziehungen (customer relationships) legen fest, wie das Unternehmen Kunden gewinnt und hält; Einnahmequellen (revenue streams) erfassen, wofür Kunden zahlen. Die linke Hälfte beschreibt, was es braucht, um diesen Markt zu bedienen: Schlüsselressourcen (key resources), Schlüsselaktivitäten (key activities), Schlüsselpartner (key partners) und die Kostenstruktur (cost structure). Strategyzer, das Unternehmen der Autoren, fasst es so zusammen: Rechts steht der Markt, links steht, was es braucht, um ihn zu bedienen; das Wertangebot sitzt dazwischen. Kurz: rechts Wert, links Effizienz.',
          'In der Praxis füllt man das Canvas von rechts nach links: erst die Kundensegmente und das Wertangebot je Segment, dann Kanäle und Beziehungen, dann die Einnahmen; erst danach die Ressourcen, Aktivitäten und Partner, die dafür nötig sind, und zuletzt die Kosten, die daraus folgen. Der Wert der Übung liegt in der Konsistenzprüfung: Trägt die Einnahmelogik die Kostenstruktur? Braucht das versprochene Wertangebot eine Ressource, die das Unternehmen nicht besitzt? Ein Canvas, das diese Fragen nicht beantwortet, ist unvollständig, auch wenn alle neun Felder beschrieben sind.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Maschinenbauer mit 200 Beschäftigten fragt eine KI-Beratung, „was man mit KI machen könnte“. Bevor die Beraterin Werkzeuge nennt, füllt sie im ersten Gespräch mit dem Geschäftsführer das Canvas: Kundensegmente sind Serienfertiger und Betreiber von Sonderanlagen; das Wertangebot ist Zuverlässigkeit und eine kurze Reaktionszeit im Service; Einnahmen kommen aus dem Anlagenverkauf, aus Ersatzteilen und aus Wartungsverträgen; Schlüsselressourcen sind das Konstruktionswissen und die Servicetechniker. Dann lautet die Frage: Welchen Baustein verändert ein KI-Vorhaben? Ein Assistenzsystem, das für Servicetechniker Handbücher und Störungshistorien durchsucht, berührt Schlüsselaktivitäten und Kostenstruktur, also die linke Seite. Vorausschauende Wartung als eigene Dienstleistung erzeugt dagegen ein neues Wertangebot und eine neue Einnahmequelle, also die rechte Seite, und ist ein größerer Eingriff. Das Canvas zeigt diesen Unterschied vor jeder Technikdiskussion.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das Canvas ist eine Momentaufnahme. Es zeigt, wie das Geschäftsmodell heute funktioniert, aber nicht, wohin es sich bewegt, welche Annahmen brüchig sind oder wann ein Baustein kippt. Es enthält keine Zeitachse und keine Wettbewerber: Ein Geschäftsmodell trifft, wie das Gabler Wirtschaftslexikon festhält, keine Aussage zur Wettbewerbssituation. Ob ein Konkurrent dasselbe Wertangebot billiger liefert, ob eine Regulierung die Kanäle verändert oder ob die Branche schrumpft, steht nicht auf der Seite. Umfeld- und Branchenanalyse müssen getrennt erfolgen; das Canvas ersetzt sie nicht.',
          'Die zweite Schwäche folgt aus der Stärke. Weil die Vorlage in einer Stunde mit Haftnotizen gefüllt ist, entsteht leicht der Eindruck, das Geschäftsmodell sei verstanden, obwohl nur Stichworte notiert wurden. Ein Feld „Einnahmequellen: Wartungsverträge“ sagt nichts darüber, welchen Anteil am Ergebnis diese Verträge haben oder ob sie profitabel sind. Das Canvas sammelt Hypothesen, keine Belege. Wer daraus Entscheidungen ableiten will, braucht Zahlen zu jedem Baustein und Gespräche mit Kunden zum Wertangebot; beides liefert die Vorlage nicht, sie zeigt nur, wo es fehlt.',
        ],
      },
    ],
    quellen: [Q.strategyzerBmc, Q.wileyBmg, Q.gablerGeschaeftsmodell],
    sieheAuch: ['value-proposition-jtbd', 'wertkette', 'ki-strategie', 'business-case'],
    synonyme: ['BMC', 'Geschäftsmodell-Leinwand', 'Business Model Generation', 'Neun Bausteine'],
    unsicher: false,
  },
  {
    id: 'value-proposition-jtbd',
    titel: 'Nutzenversprechen und Jobs to be Done',
    thema: 'strategie',
    einleitung:
      'Ein Angebot überzeugt nur, wenn es etwas erledigt, das der Kunde tatsächlich erledigt haben will. Zwei verwandte Werkzeuge beschreiben diesen Zusammenhang, bevor Geld in eine Lösung fließt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Nutzenversprechen (value proposition) ist das Bündel aus Produkten und Leistungen, das für ein bestimmtes Kundensegment Wert schafft; im Business Model Canvas ist es das mittlere Feld. Alexander Osterwalder, Yves Pigneur, Gregory Bernarda und Alan Smith haben dieses Feld 2014 in „Value Proposition Design“ (Wiley) zu einem eigenen Werkzeug vergrößert, dem Value Proposition Canvas. Es besteht aus zwei Hälften: einem Kundenprofil (customer profile), das beschreibt, was ein Segment erreichen will, und einem Wertangebot (value map), das beschreibt, was das Unternehmen dafür anbietet. Der Abgleich der beiden Hälften heißt Fit. Das Werkzeug zwingt dazu, die Kundenseite vor der Produktseite auszufüllen.',
          'Den zweiten Zugang liefert die Theorie der zu erledigenden Aufgaben (jobs to be done). Clayton Christensen, Taddy Hall, Karen Dillon und David Duncan (Harvard Business Review, 2016) beschreiben Kaufentscheidungen so: Wer ein Produkt kauft, heuert es an (hire), damit es eine Aufgabe erledigt; erledigt es sie gut, wird es wieder angeheuert, sonst gefeuert. Aufgaben sind nie rein funktional, sie haben soziale und emotionale Dimensionen. Und die Umstände (circumstances), in denen ein Kunde die Aufgabe erledigen will, sind wichtiger als seine Merkmale wie Alter, Branche oder Umsatz. Die Autoren kritisieren, dass Unternehmen trotz großer Datenmengen Korrelationen sammeln, aber die Ursache einer Kaufentscheidung nicht kennen.',
        ],
      },
      {
        titel: 'Kundenprofil, Wertangebot, Fit',
        absaetze: [
          'Das Kundenprofil hat drei Felder: Aufgaben (jobs), die der Kunde erledigen will; Schmerzpunkte (pains), also Hindernisse, Risiken und Ärgernisse, die ihn dabei behindern; und Gewinne (gains), also Ergebnisse und Vorteile, die er sucht. Das Wertangebot spiegelt diese Felder: Produkte und Leistungen (products and services), Schmerzlinderer (pain relievers), die konkrete Schmerzpunkte beseitigen, und Nutzenstifter (gain creators), die konkrete Gewinne erzeugen. Fit besteht, wenn das Angebot die wichtigsten Aufgaben, Schmerzpunkte und Gewinne trifft, nicht alle. Strategyzer formuliert es knapp: „Fit is a claim until customers confirm it“, ein Fit ist eine Behauptung, bis Kunden sie bestätigen.',
          'Die Arbeitsweise ist einfach, aber ungewohnt. Je Canvas wird nur ein Kundensegment beschrieben. Das Profil entsteht aus Beobachtung und Gesprächen mit Kunden, nicht aus der Selbstsicht des Anbieters. Die Aufgaben werden nach Wichtigkeit geordnet, die Schmerzpunkte nach Schwere, die Gewinne nach Relevanz. Erst dann wird die rechte Hälfte gefüllt, und zwar nur mit dem, was auf die obersten Einträge zielt. Alles andere ist Ballast, der das Angebot teurer macht, ohne den Fit zu verbessern.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Hersteller von Verpackungsmaschinen mit 300 Beschäftigten will einen KI-Assistenten im Kundenservice einführen. Die Beraterin fragt zuerst nach der Aufgabe, nicht nach dem Werkzeug: Welche Aufgabe heuert ein Kunde an, wenn er den Service anruft? Funktional will er eine stehende Maschine wieder zum Laufen bringen. Sozial will der Instandhalter beim Kunden vor seinem Werksleiter kompetent dastehen. Emotional will er die Sicherheit, dass jemand Verantwortung übernimmt. Schmerzpunkte sind Wartezeit, Rückfragen und Ticketnummern; Gewinne sind Lösung beim ersten Kontakt und Nachvollziehbarkeit. Aus diesem Profil folgt oft ein anderes Vorhaben als geplant: kein Chatbot für Endkunden, sondern ein Assistent für die eigenen Servicemitarbeiter, der Handbücher und Störungshistorien durchsucht und die Erstlösungsquote hebt. Ob dieser Fit stimmt, prüfen anschließend Gespräche mit einigen Kunden.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Aufgaben sind Interpretation. Wer die Aufgabe formuliert, wählt die Abstraktionsebene: „Störung beheben“, „Produktion sichern“ oder „vor dem Werksleiter gut dastehen“ beschreiben dieselbe Situation und führen zu verschiedenen Angeboten. Zu abstrakt formuliert wird die Aufgabe beliebig, zu konkret formuliert beschreibt sie nur das bestehende Produkt. Zwei Beraterinnen können aus denselben Gesprächen verschiedene Aufgaben ableiten, und die Methode bietet keinen Test, welche Formulierung die richtige ist. Christensen und Kollegen nennen die Umstände als Anker, aber auch Umstände muss jemand auswählen und deuten.',
          'Die zweite Gefahr ist, Wünsche statt Beobachtungen aufzuschreiben. Im Workshop füllen Mitarbeitende das Kundenprofil aus der Sicht des Anbieters und erfinden Schmerzpunkte, die zum eigenen Produkt passen. Das Canvas sieht dann vollständig aus, beschreibt aber die Hoffnung des Unternehmens, nicht den Kunden. Strategyzer selbst hält fest, dass ein Fit eine Behauptung bleibt, bis Kunden sie bestätigen. Außerdem sagt das Werkzeug nichts über Zahlungsbereitschaft, Wettbewerb oder Kosten; dafür braucht es das Business Model Canvas und eine Wirtschaftlichkeitsrechnung.',
        ],
      },
    ],
    quellen: [Q.hbrJtbd, Q.strategyzerVpc, Q.wileyVpd],
    sieheAuch: ['business-model-canvas', 'disruptive-innovation', 'segmentierung-positionierung'],
    synonyme: ['Value Proposition Canvas', 'Jobs to be Done', 'JTBD', 'Wertangebot', 'Nutzenversprechen'],
    unsicher: false,
  },
  {
    id: 'disruptive-innovation',
    titel: 'Disruptive Innovation: was der Begriff wirklich meint',
    thema: 'strategie',
    einleitung:
      'Kaum ein Strategiebegriff wird so oft benutzt und so oft falsch verstanden wie „disruptiv“. Wer in KI-Debatten mitreden will, muss wissen, was die Theorie tatsächlich behauptet und was nicht.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Joseph Bower und Clayton Christensen beschrieben 1995 in der Harvard Business Review ein wiederkehrendes Muster: Führende Unternehmen verlieren ihre Spitzenposition, wenn sich Technologien oder Märkte ändern, etwa Xerox gegenüber Canon bei Kopierern oder Sears gegenüber Walmart. Die Ursache ist nicht technische Unterlegenheit, sondern die Organisation: Etablierte Anbieter hören auf ihre besten Kunden und investieren in das, was heute Rendite bringt. Christensen baute die Beobachtung in „The Innovator\'s Dilemma“ (Harvard Business Review Press, Neuausgabe 2024) aus: Ein erfolgreiches Unternehmen kann alles richtig machen und trotzdem die Marktführung verlieren, wenn es bewährte Praktiken nicht rechtzeitig aufgibt.',
          'Christensen, Michael Raynor und Rory McDonald (Harvard Business Review, 2015, „What Is Disruptive Innovation?“) haben den Begriff zwanzig Jahre später präzisiert. Disruption bezeichnet einen Prozess, in dem ein kleineres Unternehmen mit weniger Ressourcen übersehene Kunden mit einem neuen, aber bescheidenen Angebot anspricht und dann schrittweise nach oben wandert, bis es die etablierten Anbieter herausfordert. Der Ausgangspunkt liegt entweder am unteren Marktende (low-end foothold), bei überversorgten Kunden, die weniger Leistung zu geringerem Preis akzeptieren, oder in einem neuen Markt (new-market foothold), bei bisherigen Nichtkunden. Die Etablierten ignorieren den Angreifer zunächst, weil die Margen dort niedrig sind und ihre besten Kunden das Angebot nicht wollen.',
        ],
      },
      {
        titel: 'Erhaltend oder disruptiv',
        absaetze: [
          'Der Gegenbegriff ist die erhaltende Innovation (sustaining innovation): Sie macht gute Produkte für bestehende Kunden besser und darf dabei durchaus radikal sein. Das Kriterium ist nicht die Größe des technischen Sprungs, sondern der Ausgangspunkt im Markt. Christensen und Kollegen (2015) nennen als Beispiel Uber: Das Unternehmen begann nicht bei Nichtkunden oder am unteren Ende, sondern bei den Kunden des Taximarkts, und ist nach der Theorie keine Disruption, auch wenn es die Branche verändert hat. Vor zwei Fehlern warnen die Autoren: Disruption als Ereignis statt als Prozess zu behandeln, und den Ruf „disrupt or be disrupted“ so ernst zu nehmen, dass man das eigene Kerngeschäft beschädigt.',
          'Für KI-Debatten im Mittelstand folgt daraus eine saubere Trennung. Die meisten KI-Anwendungen, etwa schnellere Angebotserstellung, genauere Qualitätskontrolle oder kürzere Reaktionszeiten im Service, sind erhaltende Innovationen: Sie verbessern das bestehende Angebot für bestehende Kunden. Disruptiv im Sinn der Theorie wäre ein Anbieter, der mit einem einfacheren, günstigeren, KI-gestützten Angebot Kunden bedient, die der Mittelständler nicht bedient, und der von dort nach oben wandert. Die Unterscheidung bestimmt die Antwort: Erhaltende Innovation gehört ins Kerngeschäft und wird dort gemessen; eine mögliche Disruption verlangt Beobachtung des unteren Marktendes und gegebenenfalls ein getrenntes Angebot mit eigener Kostenlogik.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Der Geschäftsführer eines Elektrogroßhandels mit 150 Beschäftigten eröffnet das Gespräch mit dem Satz, KI werde seine Branche disruptieren, deshalb brauche er jetzt einen Chatbot. Die Beraterin trennt zwei Fragen. Erstens: Welche Kunden bedient der Großhandel, welche nicht? Kleine Handwerksbetriebe mit niedrigen Bestellwerten werden vernachlässigt, weil sie sich für den Außendienst nicht lohnen. Gibt es einen Anbieter, der diese Betriebe mit einer einfachen, KI-gestützten Bestellplattform anspricht? Dann läge dort eine Fußfassung am unteren Ende, die Beobachtung und ein eigenes schlankes Angebot verlangt. Zweitens: Der Chatbot für die bestehenden Großkunden ist eine erhaltende Innovation, sinnvoll als Serviceverbesserung, aber keine Antwort auf eine Disruption. Am Ende stehen zwei getrennte Vorhaben mit eigenen Budgets und Erfolgsmaßen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Vorhersagekraft der Theorie ist umstritten. Andrew King und Baljir Baatartogtokh (MIT Sloan Management Review, 2015) haben die von Christensen und Raynor angeführten Fallbeispiele mit Branchenexperten geprüft und festgestellt, dass viele Fälle vier Kernelementen der Theorie nicht eng entsprechen; die Theorie passe auf weniger Situationen als angenommen. Zu diesen Elementen gehören etablierte Anbieter, die entlang bestehender Leistungspfade verbessern, dabei die Bedürfnisse ihrer Kunden überschießen und die Fähigkeit hätten, auf den Angreifer zu antworten. Die Gültigkeit der Theorie sei trotz ihrer Verbreitung in der Forschung selten geprüft worden; die Autoren raten zur sorgfältigen Analyse des Einzelfalls statt zur Anwendung eines allgemeinen Musters.',
          'Zweitens sind die Beispiele nachträglich. Die Theorie erklärt im Rückblick gut, warum ein Angreifer gewonnen hat; ob ein heutiger Neuling nach oben wandert oder am unteren Ende stecken bleibt, zeigt sich erst hinterher. Christensen, Raynor und McDonald räumen 2015 Grenzen ein und beschreiben die Theorie als weiterhin in Entwicklung. Für die Beratung heißt das: „disruptiv“ ist die Diagnose eines Musters mit klaren Bedingungen, kein Etikett für alles Neue und kein Argument für Eile. Wer den Begriff verwendet, sollte den Ausgangspunkt des Angreifers und seinen Weg nach oben benennen können.',
        ],
      },
    ],
    quellen: [Q.hbrDisruption2015, Q.hbrDisruption1995, Q.hbrInnovatorsDilemma, Q.smrKing],
    sieheAuch: ['value-proposition-jtbd', 'blue-ocean', 'ki-strategie'],
    synonyme: ['Disruption', 'Disruptive Technologie', 'Innovator\'s Dilemma', 'Erhaltende Innovation'],
    unsicher: false,
  },
  {
    id: 'segmentierung-positionierung',
    titel: 'Segmentierung, Zielgruppe, Positionierung',
    thema: 'strategie',
    einleitung:
      'Wer alle bedienen will, überzeugt niemanden. Segmentierung, Zielgruppenwahl und Positionierung sind die drei Schritte, mit denen ein Unternehmen entscheidet, für wen es arbeitet und wofür es stehen will.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die STP-Logik besteht aus drei Schritten: Segmentieren (segmentation), Zielgruppe wählen (targeting), Positionieren (positioning). Marktsegmentierung ist nach dem Gabler Wirtschaftslexikon (Kirchgeorg) die Aufteilung des Gesamtmarkts nach bestimmten Kriterien in Käufergruppen, die hinsichtlich ihres Kaufverhaltens in sich möglichst ähnlich (homogen) und untereinander möglichst unähnlich (heterogen) sind. Für die Zielgruppenwahl nennt Gabler drei Strategien: Die konzentrierte Marktstrategie bedient nur das lukrativste Segment, die differenzierte Strategie mehrere Segmente mit je eigenem Programm, die selektiv differenzierte Strategie ausgewählte Segmente. Positionierung ist die zielgerichtete Einordnung eines Objekts, etwa eines Unternehmens, Produkts oder einer Marke, in einem mehrdimensionalen Merkmalsraum; trägt man die Wettbewerber in denselben Raum ein, wird die eigene Marktposition sichtbar.',
          'Gabler nennt als Segmentierungskriterien demografische Merkmale wie Alter, Geschlecht und Haushaltsgröße, sozioökonomische wie Einkommen, Bildung und Beruf, psychografische wie Lebensstil und Persönlichkeit sowie Merkmale des Kaufverhaltens und der Reaktion auf Marketingmaßnahmen. Der Zweck der Segmentierung ist, Unterschiede zwischen Käufern aufzudecken, aus denen sich segmentspezifische Programme ableiten lassen. Ein Segment ist also nur dann gut, wenn seine Mitglieder ähnlich kaufen, wenn es sich von anderen Segmenten unterscheidet und wenn das Unternehmen es gezielt ansprechen kann. Eine Gruppe, die sich zwar statistisch abgrenzen, aber nicht erreichen lässt, hilft nicht.',
        ],
      },
      {
        titel: 'Kaufverhalten statt Demografie, Platz im Kopf statt Produktliste',
        absaetze: [
          'Daniel Yankelovich und David Meer (Harvard Business Review, 2006) kritisieren, dass die Segmentierung ihren Zweck verloren hat. Yankelovich hatte 1964 die nichtdemografische Segmentierung eingeführt, also die Einteilung nach anderen Kriterien als Alter oder Einkommen. Inzwischen sei die psychografische Segmentierung ebenso wenig erhellend wie zuvor die demografische: Lebensstilprofile wie „High-Tech Harry“ oder „Joe Six-Pack“ liefern Figuren für die Werbung, sagen Kaufverhalten aber nicht besser voraus als Demografie. Die Autoren unterscheiden Segmentierung, die die Markenidentität stärkt, von Segmentierung, die sagt, welche Märkte ein Unternehmen betreten und welche Produkte es bauen soll. Nur die zweite leitet Entscheidungen über Produkt, Vertrieb und Preis. Ihr Werkzeug dafür ist das „gravity of decision spectrum“: Wie schwer wiegt die Kaufentscheidung für den Kunden?',
          'Positionierung findet im Kopf des Kunden statt. Al Ries und Jack Trout haben diese Sicht mit „Positioning: The Battle for Your Mind“ (McGraw-Hill, Jubiläumsausgabe 2000) geprägt: Positioniert wird nicht das Produkt, sondern der Platz, den es in der Wahrnehmung des potenziellen Kunden einnimmt, und in einer überfüllten Kommunikationsumgebung setzt sich nur eine einfache, zugespitzte Botschaft durch. Daraus folgt die unbequeme Seite der Positionierung: Sie ist auch die Entscheidung, was man nicht anbietet. Ein Platz im Kopf ist eng; wer für alles stehen will, steht für nichts. Positionierung ohne Verzicht ist eine Beschreibung, keine Position.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine KI-Beratung mit fünf Personen positioniert sich. „KI-Beratung für alle Unternehmen“ ist keine Position, weil sie nichts ausschließt. Segmentiert nach Kaufverhalten zeigt sich: Ein inhabergeführter Mittelständler, der zum ersten Mal ein KI-Vorhaben vergibt, trifft eine schwerwiegende Entscheidung; er sucht Vertrauen, die Sprache seiner Branche und den direkten Zugang zur Geschäftsführung der Beratung. Ein Konzern mit eigener Datenabteilung kauft dagegen Kapazität und vergleicht Tagessätze. Die Beratung wählt konzentriert: inhabergeführte Fertigungsunternehmen einer Region. Ihre Position lautet etwa: die Beratung, die Geschäftsführern zeigt, was KI in ihrem Betrieb verändert und was nicht. Der Verzicht gehört dazu: keine Softwareentwicklung, keine Konzernprojekte. Dieselbe Frage stellt die Beratung später ihren Kunden: Für welches Segment baut der Maschinenbauer seinen KI-gestützten Wartungsdienst, und für welches nicht?',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Segmente veralten. Eine Segmentierung ist eine Momentaufnahme des Kaufverhaltens; Kunden wechseln das Segment, wenn sich ihre Situation ändert, und Kriterien, die vor drei Jahren trennscharf waren, sind es heute vielleicht nicht mehr. Yankelovich und Meer zeigen, wie leicht Segmentierung in die Werbung abwandert: Aus Entscheidungsgrundlagen werden Figuren, die niemand mehr gegen Kaufdaten prüft. Statistische Verfahren wie die Clusteranalyse, die Gabler als Werkzeug nennt, liefern Gruppen, die im Modell sauber getrennt sind, aber im Vertrieb nicht auffindbar. Eine Segmentierung muss deshalb regelmäßig gegen tatsächliches Kaufverhalten geprüft werden.',
          'Positionierung ohne Substanz ist die zweite Falle. Eine Position, die das Angebot nicht einlöst, ist ein Werbeversprechen; Kunden bemerken den Unterschied spätestens beim zweiten Kauf. Umgekehrt verwässern Unternehmen eine gute Position, indem sie ihr Zusätze anhängen, sobald ein Kunde außerhalb des Segments anfragt. Beide Fehler haben dieselbe Ursache: Positionierung wird als Kommunikationsaufgabe verstanden statt als Entscheidung über Angebot, Ressourcen und Verzicht. Ries und Trout beschreiben den Kampf um den Platz im Kopf; gewonnen wird er nur, wenn das Unternehmen dahinter tatsächlich anders arbeitet als die Wettbewerber im selben Merkmalsraum.',
        ],
      },
    ],
    quellen: [Q.hbrYankelovich, Q.mhRiesTrout, Q.gablerMarktsegmentierung, Q.gablerPositionierung],
    sieheAuch: ['value-proposition-jtbd', 'wettbewerbsvorteil', 'playing-to-win'],
    synonyme: ['STP', 'Marktsegmentierung', 'Targeting', 'Positioning', 'Zielgruppe'],
    unsicher: false,
  },
  {
    id: 'ki-strategie',
    titel: 'KI-Strategie: von der Unternehmensstrategie zur Roadmap',
    thema: 'strategie',
    einleitung:
      'Eine KI-Strategie ist kein eigenes Ziel, sondern der Teil der Unternehmensstrategie, der beschreibt, wo und wie lernende Systeme dem Unternehmen helfen. Dieser Artikel ordnet die Bausteine, die in den verlinkten Artikeln vertieft werden.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Eine KI-Strategie ist eine abgeleitete Strategie. Die Unternehmensstrategie legt fest, womit das Unternehmen im Wettbewerb gewinnen will; die KI-Strategie beantwortet, welche Entscheidungen, Prozesse und Angebote dafür durch lernende Systeme besser, schneller oder günstiger werden sollen. Ohne diesen Bezug entstehen Projekte, die funktionieren, aber zu keinem Ziel beitragen. Thomas Davenport und Rajeev Ronanki (Harvard Business Review, 2018) raten auf Basis einer Befragung von Führungskräften und einer Untersuchung von KI-Projekten zu schrittweisem statt umwälzendem Vorgehen: Unternehmen sollen verstehen, welche Technik zu welcher Aufgabe passt, ein priorisiertes Projektportfolio an den Geschäftsbedarf koppeln und Menschen ergänzen statt ersetzen. Ihr Untertitel lautet: nicht mit Mondflügen anfangen.',
          'Marco Iansiti und Karim Lakhani (Harvard Business Review, 2020; ausführlich im gleichnamigen Buch, Harvard Business Review Press 2020) beschreiben, wie KI die Betriebslogik eines Unternehmens verändert. KI-gestützte Prozesse skalieren weit stärker als von Menschen getragene, sie erlauben eine größere Breite an Anwendungen (scope), und sie bieten starke Möglichkeiten zum Lernen aus Daten. In solchen Unternehmen sitzt Software im Kern der Wertschöpfung, und Menschen rücken an den Rand. Der Wettbewerb verschiebt sich zu Netzwerkposition, eigenen Daten und Analytik. Ein Mittelständler wird kein Plattformkonzern; die Beobachtung gilt trotzdem, weil ein Wettbewerber, dessen Prozesse aus Daten lernen, schneller besser wird.',
        ],
      },
      {
        titel: 'Bausteine einer KI-Roadmap',
        absaetze: [
          'Davenport und Ronanki ordnen KI-Vorhaben in drei Typen: Prozessautomatisierung (process automation), etwa für Verwaltungs- und Finanzaufgaben im Hintergrund; Erkenntnis aus Daten (cognitive insight), also das Erkennen von Mustern in großen Datenmengen; und Kundeninteraktion (cognitive engagement), etwa Assistenten für Kunden oder Mitarbeitende. Die Typen unterscheiden sich in Reife, Aufwand und Risiko. Die Autoren beobachten am Beispiel eines Krebszentrums, dass ein ehrgeiziges Diagnoseprojekt ins Stocken geriet, während weniger ehrgeizige Anwendungen für Abrechnung und Empfehlungen messbare Ergebnisse brachten. Der Rat lautet, mit erreichbaren Anwendungen zu beginnen, daraus zu lernen und erst dann zu skalieren.',
          'Aus dieser Logik ergeben sich die Bausteine einer KI-Roadmap, die in den verlinkten Artikeln vertieft werden: eine Bestimmung des Reifegrads (Daten, Systeme, Fähigkeiten), eine Priorisierung der Anwendungsfälle nach Nutzen und Machbarkeit, ein Business-Case je Vorhaben, der Weg vom Machbarkeitsnachweis (proof of concept) über den Piloten zur Skalierung, die Entscheidung zwischen Eigenbau und Zukauf (build vs. buy) und der Aufbau von Kompetenz und Veränderungsbereitschaft. Die Studie „Winning With AI“ (MIT Sloan Management Review und Boston Consulting Group, 2019) beschreibt erfolgreiche Anwender als Unternehmen, die Strategie, Organisation und Technik gemeinsam angehen, statt nur Technik zu kaufen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Zulieferer der Möbelindustrie mit 250 Beschäftigten bittet um „eine KI-Strategie“. Die Beraterin beginnt nicht bei Werkzeugen, sondern bei den Unternehmenszielen: Lieferfähigkeit halten, Marge im Ersatzteilgeschäft heben, den Fachkräftemangel im Vertriebsinnendienst abfedern. Daraus entstehen drei Kandidaten, je einer pro Typ: automatische Vorbereitung von Angeboten (Prozessautomatisierung), Bedarfsprognose für Ersatzteile (Erkenntnis aus Daten) und ein Assistent für den Innendienst (Kundeninteraktion). Die Reifegradprüfung zeigt, dass Angebotsdaten in Tabellen und E-Mails liegen und die Prognose saubere Verkaufsdaten braucht; die erste Etappe ist Datenordnung, nicht Modellbau. Die Roadmap sieht einen Machbarkeitsnachweis, dann einen Piloten mit Erfolgsmaß und danach die Entscheidung über Eigenbau oder Zukauf vor. Zwei Mitarbeitende werden zu internen Ansprechpartnern. Die Strategie ist am Ende ein Dokument mit Zielen, Reihenfolge und Verantwortlichen, keine Werkzeugliste.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die größte Gefahr sind hype-getriebene Projekte und die Pilot-Falle. Die Studie „Winning With AI“ (Ransbotham, Khodabandeh, Fehling, LaFountain und Kiron, 2019) befragte mehr als 2.500 Führungskräfte. Sieben von zehn Unternehmen berichteten, KI habe bisher minimale oder keine Wirkung gehabt; unter den 90 Prozent, die in KI investiert hatten, meldeten weniger als zwei von fünf geschäftliche Gewinne aus den vergangenen drei Jahren. Zugleich sahen neun von zehn Befragten in KI eine Geschäftschance. Die Lücke zwischen Erwartung und Wirkung entsteht dort, wo Piloten nie skaliert werden, weil Daten, Prozesse und Zuständigkeiten nicht mitgeplant wurden. Davenport und Ronanki zeigen das Gegenstück: Mondflüge, die stecken bleiben.',
          'Solche Zahlen sind Selbstauskünfte, keine Ursache-Wirkungs-Belege. Es antworten Führungskräfte, die an einer Umfrage teilnehmen wollen; was als geschäftlicher Gewinn zählt, definiert der Befragte; und dass erfolgreiche Unternehmen bestimmte Praktiken berichten, beweist nicht, dass diese den Erfolg verursachen. Studien von Beratungshäusern werben zudem für deren Leistungen. Auch die Beispiele von Iansiti und Lakhani stammen von digitalen Großunternehmen; ihre Übertragung auf einen Betrieb mit 200 Beschäftigten ist eine Hypothese, kein Beleg. Weil sich Werkzeuge, Preise und Anbieter in diesem Feld schnell ändern, ist dieser Artikel als im Wandel markiert; die Bausteine bleiben, die konkreten Empfehlungen altern.',
        ],
      },
    ],
    quellen: [Q.hbrIansiti, Q.hbrIansitiBuch, Q.hbrDavenport, Q.smrWinning],
    sieheAuch: [
      'reifegrad',
      'use-case-prio',
      'business-case',
      'build-vs-buy',
      'poc-pilot-skalierung',
      'change-management',
      'algorithmus-aversion',
      'technikakzeptanz-tam-utaut',
      'ki-kompetenz',
      'business-model-canvas',
    ],
    synonyme: ['AI-Strategie', 'KI-Roadmap', 'AI Strategy', 'Digitalstrategie'],
    unsicher: true,
  },
];
