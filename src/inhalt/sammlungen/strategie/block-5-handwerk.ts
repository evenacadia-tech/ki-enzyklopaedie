import type { EigenerArtikel, Quelle } from '../../typen';

// Block 5 — Beraterhandwerk. Alle Quellen am 2026-09-26 abgerufen und geprüft.
const AB = '2026-09-26';
const Q = {
  // Problemlösung und Kommunikation
  connMcLean2019: {
    titel: 'Conn & McLean — Bulletproof Problem Solving: The One Skill That Changes Everything (Wiley, 2019)',
    url: 'https://www.wiley.com/en-us/Bulletproof+Problem+Solving:+The+One+Skill+That+Changes+Everything-p-9781119553038',
    abgerufen: AB,
  } satisfies Quelle,
  connMcLean2019Kap1: {
    titel: 'Conn & McLean — Bulletproof Problem Solving, Kapitel 1 „Learn the Bulletproof Problem Solving Approach“ (Leseprobe, Wiley, 2019)',
    url: 'https://catalogimages.wiley.com/images/db/pdf/9781119553021.excerpt.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  rasiel1999: {
    titel: 'Rasiel — The McKinsey Way (McGraw-Hill, 1999)',
    url: 'https://www.mheducation.com/highered/mhp/product/mckinsey-way.html',
    abgerufen: AB,
  } satisfies Quelle,
  minto2026: {
    titel: 'Minto — The Pyramid Principle: Logic in Writing and Thinking, 3. Aufl. (FT Publishing / Pearson, 2026)',
    url: 'https://www.pearson.com/en-gb/subject-catalog/p/the-pyramid-principle/P200000015259/9781292763255',
    abgerufen: AB,
  } satisfies Quelle,
  mintoSite: {
    titel: 'Minto — The Minto Pyramid Principle und das SCQ Framework (barbaraminto.com, o. J.)',
    url: 'https://www.barbaraminto.com/',
    abgerufen: AB,
  } satisfies Quelle,
  // Entscheidungen
  kahneman2011: {
    titel: 'Kahneman, Lovallo & Sibony — Before You Make That Big Decision… (Harvard Business Review, 2011)',
    url: 'https://hbr.org/2011/06/the-big-idea-before-you-make-that-big-decision',
    abgerufen: AB,
  } satisfies Quelle,
  kahneman2011Store: {
    titel: 'Kahneman, Lovallo & Sibony — Before You Make That Big Decision…, Produktseite mit Abstract (HBR Store, 2011)',
    url: 'https://store.hbr.org/product/the-big-idea-before-you-make-that-big-decision/R1106B',
    abgerufen: AB,
  } satisfies Quelle,
  lovallo2003: {
    titel: "Lovallo & Kahneman — Delusions of Success: How Optimism Undermines Executives' Decisions (Harvard Business Review, 2003)",
    url: 'https://hbr.org/2003/07/delusions-of-success-how-optimism-undermines-executives-decisions',
    abgerufen: AB,
  } satisfies Quelle,
  lovallo2003Store: {
    titel: 'Lovallo & Kahneman — Delusions of Success, Produktseite mit Abstract (HBR Store, 2003)',
    url: 'https://store.hbr.org/product/delusions-of-success-how-optimism-undermines-executives-decisions/r0307d?sku=R0307D-PDF-ENG',
    abgerufen: AB,
  } satisfies Quelle,
  klein2007: {
    titel: 'Klein — Performing a Project Premortem (Harvard Business Review, 2007)',
    url: 'https://hbr.org/2007/09/performing-a-project-premortem',
    abgerufen: AB,
  } satisfies Quelle,
  rogersBlenko2006: {
    titel: 'Rogers & Blenko — Who Has the D? How Clear Decision Roles Enhance Organizational Performance (Harvard Business Review, 2006)',
    url: 'https://hbr.org/2006/01/who-has-the-d-how-clear-decision-roles-enhance-organizational-performance',
    abgerufen: AB,
  } satisfies Quelle,
  bainRapid: {
    titel: 'Bain & Company — RAPID® Decision Making (bain.com Insights, o. J.)',
    url: 'https://www.bain.com/insights/rapid-decision-making/',
    abgerufen: AB,
  } satisfies Quelle,
  apmRaci: {
    titel: 'Association for Project Management — Stakeholder Engagement, Principle 10: Take Responsibility (apm.org.uk, o. J.)',
    url: 'https://apm.org.uk/resources/find-a-resource/stakeholder-engagement/stakeholder-engagement-key-principles/take-responsibility',
    abgerufen: AB,
  } satisfies Quelle,
  gablerFunktionendiagramm: {
    titel: 'Schewe — Funktionendiagramm (Gabler Wirtschaftslexikon, o. J.)',
    url: 'https://wirtschaftslexikon.gabler.de/definition/funktionendiagramm-34002',
    abgerufen: AB,
  } satisfies Quelle,
  // Beratungsunternehmen
  maisterAnatomy2004: {
    titel: 'Maister — The Anatomy of a Consulting Firm (davidmaister.com, 2004)',
    url: 'https://davidmaister.com/articles/16/2/',
    abgerufen: AB,
  } satisfies Quelle,
  maisterMtpsf: {
    titel: 'Maister — Managing the Professional Service Firm, Kapitelzusammenfassung „The Professional Firm Lifecycle“ (davidmaister.com; Buch 1993)',
    url: 'https://davidmaister.com/books.bookchapters/2/3/index.html',
    abgerufen: AB,
  } satisfies Quelle,
  trustEquation: {
    titel: 'Green / Trusted Advisor Associates — Trust in Business: The Core Concepts, zur Vertrauensgleichung aus Maister, Green & Galford, The Trusted Advisor (Free Press, 2000) (trustedadvisor.com, o. J.)',
    url: 'https://trustedadvisor.com/articles/trust-in-business-the-core-concepts',
    abgerufen: AB,
  } satisfies Quelle,
  christensen2013: {
    titel: 'Christensen, Wang & van Bever — Consulting on the Cusp of Disruption (Harvard Business Review, 2013)',
    url: 'https://hbr.org/2013/10/consulting-on-the-cusp-of-disruption',
    abgerufen: AB,
  } satisfies Quelle,
  bdu2026: {
    titel: 'BDU — Deutsche Unternehmensberatungen erwarten 2026 eine Rückkehr zum Wachstumskurs (bdu.de, Pressemitteilung vom 27.03.2026)',
    url: 'https://www.bdu.de/news/deutsche-unternehmensberatungen-erwarten-2026-eine-rueckkehr-zum-wachstumskurs/',
    abgerufen: AB,
  } satisfies Quelle,
  // Gespräch
  brooksJohn2018: {
    titel: 'Brooks & John — The Surprising Power of Questions (Harvard Business Review, 2018)',
    url: 'https://hbr.org/2018/05/the-surprising-power-of-questions',
    abgerufen: AB,
  } satisfies Quelle,
  brooksJohn2018Store: {
    titel: 'Brooks & John — The Surprising Power of Questions, Produktseite mit Abstract (HBR Store, 2018)',
    url: 'https://store.hbr.org/product/the-surprising-power-of-questions/R1803C',
    abgerufen: AB,
  } satisfies Quelle,
  scheinHumbleInquiry: {
    titel: 'Schein & Schein — Humble Inquiry: The Gentle Art of Asking Instead of Telling, 3. Aufl. (Berrett-Koehler, 2025; Erstauflage 2013)',
    url: 'https://bkconnection.com/products/9798890570963_humble-inquiry-3rd-edition',
    abgerufen: AB,
  } satisfies Quelle,
  scheinHelping2009: {
    titel: 'Schein — Helping: How to Offer, Give, and Receive Help (Berrett-Koehler, 2009)',
    url: 'https://bkconnection.com/products/9781576758724_helping',
    abgerufen: AB,
  } satisfies Quelle,
  scheinHumbleConsulting2016: {
    titel: 'Schein — Humble Consulting: How to Provide Real Help Faster (Berrett-Koehler, 2016)',
    url: 'https://bkconnection.com/products/9781626567214_humble-consulting',
    abgerufen: AB,
  } satisfies Quelle,
};

export const block5: EigenerArtikel[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'hypothesen-issue-trees',
    titel: 'Hypothesengetrieben arbeiten: Issue Trees und MECE',
    thema: 'beratung-grundlagen',
    einleitung:
      'Beraterteams zerlegen unklare Fragen in prüfbare Teilfragen und formulieren früh eine Vermutung, die sie gezielt bestätigen oder verwerfen. Wer diese Mechanik kennt, versteht, warum in Meetings so oft nach der „Hypothese“ gefragt wird.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Issue Tree (Problembaum, auch Logikbaum, englisch logic tree) zerlegt eine Ausgangsfrage in Teilfragen, diese wieder in Unterfragen, bis am Ende Fragen stehen, die sich mit Daten beantworten lassen. Conn und McLean (2019), beide früher bei McKinsey, beschreiben den Baum als zentrales Werkzeug: Er macht die Struktur eines Problems auf einer Seite sichtbar, erfasst alles Relevante und führt zu Hypothesen, die sich mit Analysen prüfen lassen. Die Zerlegung ist Handwerk, kein Automatismus; die Autoren empfehlen, mehrere Schnitte auszuprobieren und den zu behalten, der am meisten Einsicht liefert.',
          'MECE (mutually exclusive, collectively exhaustive, deutsch: überschneidungsfrei und vollständig) ist das Qualitätskriterium für jede Ebene des Baums: Die Teilfragen dürfen sich nicht überlappen, und zusammen müssen sie die übergeordnete Frage abdecken. Der Begriff geht auf Barbara Minto zurück, deren Pyramid Principle dasselbe Kriterium für Gruppen von Argumenten verlangt. Hypothesengetrieben (hypothesis-driven) arbeiten heißt, nicht alle Äste gleich tief zu untersuchen, sondern früh eine Antwort zu vermuten und die Analyse auf die Äste zu lenken, die diese Vermutung bestätigen oder widerlegen können. Rasiel (1999) beschreibt dieses Denken in Anfangshypothesen und Fakten als Kern der McKinsey-Arbeitsweise.',
        ],
      },
      {
        titel: 'Die sieben Schritte nach Conn und McLean',
        absaetze: [
          'Conn und McLean fassen den Ablauf in sieben Schritten zusammen, die sie als Kreislauf verstehen: erstens das Problem definieren, zweitens die Fragen zerlegen (disaggregate), drittens priorisieren und den Baum beschneiden, viertens einen Arbeitsplan mit Zeitplan bauen, fünftens die entscheidenden Analysen durchführen, sechstens die Befunde zu einer Aussage verdichten (synthesize) und siebtens die Kommunikation vorbereiten. Die Problemdefinition soll spezifisch, messbar, zeitlich begrenzt und an die Werte des Entscheiders gebunden sein. Beim Priorisieren fragt das Team, welche Äste die größte Wirkung auf das Ergebnis haben und welche sich überhaupt beeinflussen lassen.',
          'Die Hypothese ist dabei Arbeitsinstrument, kein Vorurteil. Die Autoren nennen es die „One-Day Answer“: Das Team soll jederzeit eine zusammenhängende Kurzfassung seines besten Wissensstands geben können, gegliedert in Situation, Beobachtungen und vorläufige Schlüsse. Diese Kurzfassung wird in Teamreviews bewusst angegriffen (pressure-tested) und bei neuen Befunden geändert. Am Beispiel einer privaten Investitionsentscheidung zeigen die Autoren, dass die Anfangshypothese die Argumente für und gegen die Entscheidung hervorholen soll, nicht sie vorwegnehmen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Maschinenbauer mit rund 200 Beschäftigten fragt, ob sich ein KI-Assistent im Kundenservice lohnt. Ein erster Baum zerlegt die Frage in zwei Äste: Nutzen und Kosten. Der Nutzen-Ast teilt sich in eingesparte Bearbeitungszeit je Anfrage, Anzahl geeigneter Anfragen und Wirkung auf die Kundenzufriedenheit; der Kosten-Ast in Lizenz- und Integrationskosten, Aufwand für Datenpflege und laufende Betreuung. Eine dritte Ebene benennt, was messbar ist: Wie viele Anfragen kommen monatlich, welcher Anteil ist standardisierbar, wie lange dauert heute eine Antwort.',
          'Die Arbeitshypothese könnte lauten: „Der Assistent lohnt sich, wenn mindestens die Hälfte der Anfragen standardisierbar ist.“ Sie legt fest, welcher Ast zuerst untersucht wird: die Verteilung der Anfragen nach Typ. Zeigt eine Stichprobe aus dem Ticketsystem, dass die meisten Anfragen individuelle Konstruktionsfragen sind, ist die Hypothese widerlegt, und das Team spart sich die Kostenanalyse. Der Praktikant sieht in Meetings genau diese Bewegung: Die Geschäftsführerin fragt nicht nach allem, sondern nach der einen Zahl, die einen Ast entscheidet.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Eine früh formulierte Hypothese kann in Bestätigungsdenken (confirmation bias) kippen: Das Team sucht Belege für die Vermutung statt Gegenbelege. Conn und McLean nennen deshalb Teamnormen als Gegenmittel, etwa unterschiedliche Sichtweisen im Team, Rollenspiele und flache Hierarchien, ausdrücklich gegen Bestätigungsfehler, Sunk-Cost-Denken und Ankereffekte. Sie räumen auch ein, dass der Vorwurf, der Prozess sei nur eine Scheinbegründung für eine längst gefällte Entscheidung, immer wieder erhoben wird, und begegnen ihm damit, dass die Zerlegung Ergebnisse zulassen muss, die anfangs niemand im Blick hatte.',
          'MECE ist in der Praxis meist nur näherungsweise erreichbar. Kosten und Nutzen eines KI-Projekts hängen zusammen, Kundenzufriedenheit und Bearbeitungszeit überschneiden sich, und jede Zerlegung blendet Wechselwirkungen aus, die zwischen den Ästen liegen. Der Baum bleibt ein Modell; er ersetzt weder Fachwissen über den Kunden noch das Gespräch mit den Menschen, die die Anfragen heute bearbeiten. Wer einen sauberen Baum vorlegt, hat die Frage geordnet, aber noch nicht beantwortet.',
        ],
      },
    ],
    quellen: [Q.connMcLean2019, Q.connMcLean2019Kap1, Q.rasiel1999, Q.minto2026],
    sieheAuch: ['pyramid-principle', 'entscheidungen-verzerrungen', 'beratungsgespraech'],
    synonyme: ['Issue Tree', 'Logikbaum', 'MECE', 'hypothesengetrieben', 'Problembaum'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'pyramid-principle',
    titel: 'Auf den Punkt: Pyramid Principle und SCQA',
    thema: 'beratung-grundlagen',
    einleitung:
      'Wer in einer Beratung schreibt oder vorträgt, wird an Mintos Pyramide gemessen: Die Antwort steht oben, die Begründung darunter. Das Prinzip erklärt, warum die Geschäftsführerin eine Zusammenfassung in drei Sätzen erwartet und nicht in drei Seiten.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Barbara Minto, früher Beraterin bei McKinsey, beschreibt das Pyramid Principle in ihrem Buch „The Pyramid Principle: Logic in Writing and Thinking“, das bei Pearson in dritter Auflage vorliegt. Der Grundgedanke: Gedanken sind für Leser leicht zu erfassen, wenn sie als Pyramide unter einer einzigen Aussage geordnet sind. Diese Aussage steht am Anfang (top-down, „Antwort zuerst“). Darunter folgen die Gruppen von Argumenten, die sie stützen, und unter jeder Gruppe die Belege. Wer liest, kann auf jeder Ebene abbrechen und hat trotzdem das Wesentliche.',
          'Für den Einstieg beschreibt Minto das SCQ-Schema (Situation, Complication, Question), das in der Praxis meist um die Antwort (Answer) zu SCQA ergänzt wird. Die Situation nennt, was Leser bereits wissen und akzeptieren; die Komplikation, was sich geändert hat oder nicht mehr funktioniert; daraus ergibt sich die Frage, die der Text beantwortet. Das Schema dient dazu, die Frage zu treffen, die Leser tatsächlich im Kopf haben, bevor die Antwort kommt. Minto ordnet der Pyramide außerdem zwei Logikformen zu: Deduktion (eine Kette von Schlussfolgerungen) und Induktion (eine Gruppe gleichartiger Beobachtungen, die auf einen gemeinsamen Punkt zeigen).',
        ],
      },
      {
        titel: 'Regeln für Gruppen',
        absaetze: [
          'Minto verlangt für jede Ebene der Pyramide drei Dinge: Die Aussage einer Ebene fasst die Gruppe darunter zusammen; die Elemente einer Gruppe sind von gleicher Art, etwa lauter Gründe oder lauter Schritte; und sie stehen in einer erkennbaren Ordnung, zeitlich, strukturell oder nach Gewicht. Gruppen, die diese Prüfung nicht bestehen, sind nach Minto ein Denkproblem, kein Schreibproblem, weshalb ein Teil ihres Buches dem Hinterfragen von Gruppierungen und dem Zusammenfassen gilt. Hier trifft sich die Pyramide mit dem MECE-Kriterium aus der Problemzerlegung: überschneidungsfreie, vollständige Gruppen. Conn und McLean (2019) beschreiben denselben Schritt als Abschluss ihres Problemlöseprozesses: eine Storyline mit einem leitenden Gedanken (governing thought), gestützt von Argumenten in induktiver oder deduktiver Logik.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Nach einem Termin bei einem Zulieferer bittet die Geschäftsführerin den Praktikanten um eine Zusammenfassung in drei Sätzen. Chronologisch wäre naheliegend: wer was gesagt hat. Nach Minto beginnt der Text mit der Antwort auf die Frage, die die Geschäftsführerin tatsächlich hat: „Der Kunde will ein KI-Pilotprojekt in der Angebotserstellung, aber erst nach der Einführung des neuen ERP-Systems im Frühjahr.“ Satz zwei nennt die Gründe, gruppiert: fehlende Datenbasis bis dahin, gebundene IT-Kapazität. Satz drei nennt den nächsten Schritt: Angebot für einen Datencheck bis Monatsende.',
          'In SCQ-Form lautet der Einstieg einer längeren Notiz: Situation, der Kunde hat den Piloten grundsätzlich beschlossen; Komplikation, die Daten liegen bis zum ERP-Wechsel in zwei Systemen; Frage, was die Beratung bis dahin sinnvoll anbieten kann; Antwort, ein Datencheck, der den Piloten vorbereitet. Wer so schreibt, zwingt sich, die eigene Aussage zu kennen, bevor er schreibt. Minto nennt genau das den eigentlichen Nutzen: Vielen fällt es schwerer, ihr Denken zu ordnen, als die Sätze zu formulieren.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Pyramide setzt voraus, dass es eine Antwort gibt. Bei explorativen Themen, etwa wenn ein Kunde noch nicht weiß, welches Problem KI bei ihm lösen soll, zwingt „Antwort zuerst“ zu einer Aussage, die der Stand der Erkenntnis nicht trägt. Das Ergebnis ist Scheinklarheit: eine saubere Struktur, die Unsicherheit verbirgt, statt sie zu benennen. Minto behandelt das Problemlösen in unstrukturierten Situationen in einem eigenen Anhang, aber die Versuchung bleibt, jede Notiz wie eine Empfehlung klingen zu lassen.',
          'Zwei weitere Grenzen: Erstens ist die Pyramide eine Darstellungsform, keine Prüfung des Inhalts; eine falsche Aussage mit sauber geordneten Gründen bleibt falsch. Zweitens erwarten nicht alle Leser dieselbe Form. Inhaber mittelständischer Unternehmen wollen im Gespräch oft zuerst wissen, woher die Berater ihre Einschätzung nehmen, bevor sie die Empfehlung hören; dann ist die Reihenfolge Belege vor Antwort angemessener, auch wenn das Dokument die Pyramide behält.',
        ],
      },
    ],
    quellen: [Q.minto2026, Q.mintoSite, Q.connMcLean2019Kap1],
    sieheAuch: ['hypothesen-issue-trees', 'entscheidungsrechte-vorlagen'],
    synonyme: ['Minto-Pyramide', 'SCQA', 'SCQ Framework', 'Antwort zuerst', 'Top-down-Kommunikation'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'entscheidungen-verzerrungen',
    titel: 'Entscheidungen prüfen: Verzerrungen und Pre-Mortem',
    thema: 'beratung-grundlagen',
    einleitung:
      'Große Entscheidungen beim Kunden entstehen aus Empfehlungen, die ein Team vorbereitet hat, und genau dort schleichen sich systematische Denkfehler ein. Zwei Werkzeuge helfen, sie vor der Entscheidung sichtbar zu machen statt danach.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Kahneman, Lovallo und Sibony (2011) gehen davon aus, dass Führungskräfte bei großen strategischen Entscheidungen auf die Vorarbeit eines Teams angewiesen sind, das die Vor- und Nachteile tiefer durchdrungen hat als sie selbst. In diese Vorarbeit fließen Verzerrungen (biases) ein: Ein Team verwirft Belege, die seiner Theorie widersprechen, gewichtet einen einzelnen Datenpunkt zu stark oder zieht schiefe Vergleiche mit einem anderen Fall. Die Autoren halten fest, dass das bloße Wissen um Verzerrungen die Qualität von Geschäftsentscheidungen bisher kaum verbessert hat, weder bei Einzelnen noch in Organisationen.',
          'Ihre Antwort ist eine Prüfliste mit zwölf Fragen, die ein Entscheider stellt, bevor er eine Empfehlung annimmt: ob Alternativen angemessen geprüft wurden und ob die Zahlen gut begründet sind. Die Fragen zielen auf Eigeninteresse der Empfehlenden, auf emotionale Bindung an den Vorschlag (affect heuristic), auf Gruppendenken, Bestätigungsfehler (confirmation bias), Ankereffekte in den Zahlen (anchoring), den Halo-Effekt, bei dem der Erfolg eines Unternehmens auf alle seine Eigenschaften abfärbt, auf das Festhalten an früheren Entscheidungen (sunk cost), auf Überoptimismus im Basisfall und auf Verlustaversion, die ein Team zu vorsichtig macht. Die Prüfliste soll diese Denkfehler aufdecken und neutralisieren.',
        ],
      },
      {
        titel: 'Außensicht und Pre-Mortem',
        absaetze: [
          'Lovallo und Kahneman (2003) erklären, warum Prognosen für große Vorhaben systematisch zu optimistisch ausfallen: Kognitive Verzerrungen, darunter Ankereffekte und das Ausblenden der Wettbewerber (competitor neglect), verbinden sich mit organisatorischem Druck, Projekte gut aussehen zu lassen. Diese Innensicht (inside view) betrachtet nur den Einzelfall und seine Details. Die Gegenstrategie ist die Außensicht (outside view): Statt das eigene Projekt zu bewerten, sucht man eine Klasse ähnlicher Projekte (reference class), ermittelt grob die Verteilung ihrer Ergebnisse und ordnet das eigene Vorhaben darin ein. Den Hang, Dauer und Kosten zu unterschätzen, nennen die Autoren den Planungsfehlschluss (planning fallacy).',
          'Klein (2007) setzt an einer anderen Stelle an: Zu viele Beteiligte äußern ihre Bedenken in der Planungsphase nicht. Beim Pre-Mortem nimmt das Team an, das geplante Projekt sei bereits gescheitert, und sammelt plausible Gründe für das Scheitern. Anders als eine Risikoliste, die fragt, was schiefgehen könnte, setzt die Übung das Scheitern als Tatsache und fragt nach dem Warum. Wer Zweifel hat, kann sie am Anfang frei äußern, sodass das Projekt verbessert wird, statt hinterher seziert zu werden. Die gesammelten Gründe fließen als Änderungen in den Plan zurück.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Logistikunternehmen will ein KI-Pilotprojekt zur Tourenplanung starten; die Beratung hat den Vorschlag erarbeitet, die Geschäftsführung soll entscheiden. Vor dem Termin führt das Beraterteam ein Pre-Mortem durch: Angenommen, das Projekt ist in einem Jahr gescheitert; jeder schreibt für sich Gründe auf, erst dann werden sie reihum vorgelesen. Typische Ergebnisse: Die Disponenten haben das Werkzeug nicht benutzt, weil es ihre Erfahrung nicht abbildet; die Adressdaten waren schlechter als angenommen; der IT-Dienstleister hatte keine Kapazität für die Schnittstelle. Jeder Grund wird zu einer Maßnahme oder zu einer offenen Frage an den Kunden.',
          'Im Termin selbst arbeitet die Geschäftsführerin einige Fragen der Prüfliste ab, ohne sie so zu nennen: Hat das Team Alternativen ernsthaft geprüft, etwa eine bessere Planungssoftware ohne KI? Woher stammen die Einsparungszahlen, und hängen sie an einer einzigen Annahme? Gibt es vergleichbare Projekte anderer Kunden, deren Ergebnisse als Außensicht taugen? Der Praktikant notiert, welche Fragen gestellt werden und welche Antwort fehlt. Diese Lücken sind der eigentliche Ertrag des Termins.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Prüflisten ersetzen keine Daten. Wer die Frage nach der Herkunft der Zahlen stellt, braucht anschließend jemanden, der die Zahlen nachrechnet, und eine Außensicht setzt voraus, dass eine Vergleichsklasse mit bekannten Ergebnissen existiert. Für KI-Projekte im Mittelstand ist genau das oft nicht der Fall: Die Referenzfälle sind wenige, uneinheitlich und selten sauber dokumentiert. Dann liefert die Außensicht nur eine grobe Warnung, keine Prognose.',
          'Kahneman, Lovallo und Sibony betonen selbst, dass das Wissen um Verzerrungen nicht vor ihnen schützt; die Prüfliste wirkt nur, wenn ein Entscheider sie anwendet, der nicht selbst am Vorschlag hängt. In einer kleinen Beratung ist das schwierig, weil dieselbe Person Vorschlag und Prüfung verantwortet. Auch das Pre-Mortem verliert Wirkung, wenn die Gründe nicht unabhängig aufgeschrieben werden oder wenn niemand die Ergebnisse in den Plan zurückführt. Beide Werkzeuge kosten wenig Zeit und wirken nur, wenn sie Konsequenzen haben.',
        ],
      },
    ],
    quellen: [Q.kahneman2011, Q.kahneman2011Store, Q.lovallo2003, Q.lovallo2003Store, Q.klein2007],
    sieheAuch: ['szenarioplanung', 'hypothesen-issue-trees', 'entscheidungsrechte-vorlagen'],
    synonyme: ['Pre-Mortem', 'kognitive Verzerrungen', 'Außensicht', 'Planungsfehlschluss', 'Entscheidungs-Checkliste'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'entscheidungsrechte-vorlagen',
    titel: 'Wer entscheidet? Entscheidungsrechte, RACI und die Entscheidungsvorlage',
    thema: 'beratung-grundlagen',
    einleitung:
      'Viele Projekte beim Kunden stocken nicht an der Analyse, sondern daran, dass niemand weiß, wer entscheiden darf. Wer die Rollenmodelle kennt und eine Vorlage bauen kann, bringt Entscheidungen auf den Tisch.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Rogers und Blenko (2006), beide bei Bain & Company, beschreiben Entscheidungen als die eigentliche Währung eines Unternehmens: Jeder Erfolg, jeder Fehlschlag und jede genutzte oder verpasste Gelegenheit geht auf eine Entscheidung zurück, die jemand getroffen oder unterlassen hat. Ihr Befund ist, dass Entscheidungen in Organisationen routinemäßig stecken bleiben, weil unklar ist, wer welche Rolle hat. Nicht fehlende Analyse lähmt, sondern die Mehrdeutigkeit der Zuständigkeiten. Ein Unternehmen, das das nicht löst, verliert nach den Autoren an Boden.',
          'Ihr Werkzeug heißt RAPID, ein Kunstwort aus fünf Rollen, die Bain so beschreibt: Recommend treibt den Prozess, sammelt Input und erarbeitet die Empfehlung; Agree muss bestätigen, dass die Empfehlung machbar ist, und sein Input muss im Vorschlag berücksichtigt sein; Perform bezeichnet die, die die Entscheidung umsetzen; Input liefert Expertise, Erfahrung oder Informationen, die die Empfehlung formen; Decide trifft die endgültige Entscheidung und bindet die Organisation an das Handeln. Die Buchstaben sind keine Reihenfolge. Entscheidend ist, dass genau eine Stelle das „D“ hat und alle wissen, welche.',
        ],
      },
      {
        titel: 'RACI und die Entscheidungsvorlage',
        absaetze: [
          'Neben RAPID ist RACI das verbreitetste Rollenmodell, vor allem im Projektmanagement. Die Association for Project Management beschreibt die Matrix als Werkzeug, das Klarheit schafft, wer welche Rolle und Verantwortung hat: Responsible führt die Arbeit aus, Accountable trägt die Verantwortung für das Ergebnis, Consulted wird vorher einbezogen, Informed wird über das Ergebnis unterrichtet. In der deutschen Organisationslehre entspricht dem das Funktionendiagramm, das Gabler als aufbauorientiertes Organigramm in Matrixform beschreibt: Aufgaben auf der einen Achse, Aufgabenträger auf der anderen, in den Zellen die Funktion, die ein Träger für eine Aufgabe übernimmt. RACI ordnet Arbeit, RAPID ordnet Entscheidungen; beide werden oft verwechselt.',
          'Eine Entscheidungsvorlage bringt beides zusammen. Sie hat einen festen Aufbau: erstens die Frage, die entschieden werden soll, in einem Satz; zweitens die Optionen, mindestens zwei, mit dem Status quo als eigener Option; drittens die Empfehlung mit den tragenden Gründen; viertens die Risiken jeder Option und was sie abfedert; fünftens die benötigte Entscheidung, also was genau der Entscheider heute freigeben soll, bis wann und mit welchen Mitteln. Die Vorlage folgt Mintos Regel, die Antwort voranzustellen: Die Empfehlung steht auf der ersten Seite, die Herleitung danach.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Handelsunternehmen mit zwei Geschäftsführern und einer IT-Leitung soll einen Anbieter für ein KI-gestütztes Dokumentenmanagement wählen. Die Beratung hat drei Angebote geprüft. Vor der Vorlage klärt sie die Rollen: Die Beratung hat R und erarbeitet die Empfehlung; die IT-Leitung hat A, weil die Lösung in ihre Systemlandschaft passen muss; der Datenschutzbeauftragte liefert I zur Auftragsverarbeitung; die Fachabteilung hat P; das D liegt bei dem Geschäftsführer, der das Budget verantwortet, nicht bei beiden.',
          'Die Vorlage selbst passt auf zwei Seiten. Frage: Welcher Anbieter für die nächsten drei Jahre? Optionen: Anbieter A mit Cloud-Betrieb, Anbieter B mit Betrieb im eigenen Rechenzentrum, Verschiebung um ein Jahr. Empfehlung: B, wegen Datenschutz, vorhandener Schnittstellen und geringerer Abhängigkeit. Risiken: bei B höherer Wartungsaufwand, bei A offene Fragen zum Speicherort der Daten, bei Verschiebung weiterlaufende manuelle Kosten. Benötigte Entscheidung: Freigabe eines Pilotvertrags mit B über sechs Monate, Start im nächsten Quartal. Der Praktikant baut solche Vorlagen mit; das ist Übung in Struktur und in der Frage, wer das D hat.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Rollenmodelle können zur Bürokratie werden. Wer für jede Kleinigkeit eine RAPID- oder RACI-Matrix pflegt, erzeugt Abstimmungsaufwand, der die Verzögerung ersetzt, die er beseitigen sollte. Matrizen veralten, sobald sich Zuständigkeiten ändern, und sie sagen nichts über die Qualität der Entscheidung; ein klar zugewiesenes D kann eine schlechte Entscheidung schnell treffen. Rogers und Blenko haben ihr Modell für große, arbeitsteilige Organisationen entwickelt, in denen viele Stellen an einer Entscheidung beteiligt sind.',
          'In inhabergeführten Mittelständlern entscheidet der Inhaber oft informell: im Gespräch am Freitagnachmittag, ohne Vorlage, ohne Protokoll. Das ist kein Fehler des Kunden, sondern Teil seiner Geschwindigkeit. Für die Beratung bedeutet es, dass die Vorlage weniger die Entscheidung erzwingt als dokumentiert, was entschieden wurde und mit welchen Annahmen. Ein Rollenmodell, das der Inhaber nicht selbst will, wird ignoriert. Nützlich ist es dort, wo mehrere Gesellschafter, eine zweite Führungsebene oder ein Beirat mitreden und die Beratung sonst zwischen ihnen zerrieben wird.',
        ],
      },
    ],
    quellen: [Q.rogersBlenko2006, Q.bainRapid, Q.apmRaci, Q.gablerFunktionendiagramm, Q.minto2026],
    sieheAuch: ['pyramid-principle', 'entscheidungen-verzerrungen', 'strategie-umsetzung'],
    synonyme: ['RAPID', 'RACI', 'Verantwortlichkeitsmatrix', 'Decision Rights', 'Entscheidungsvorlage'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'beratungsunternehmen',
    titel: 'Wie ein Beratungsunternehmen funktioniert: Hebel, Auslastung, Vertrauen',
    thema: 'beratung-grundlagen',
    einleitung:
      'Eine Beratung verkauft Zeit und Urteil von Menschen, und ihre Wirtschaftlichkeit folgt wenigen Größen. Wer sie kennt, versteht, warum die Geschäftsführerin über Auslastung spricht und warum Vertrauen der wichtigste Vermögenswert ist.',
    abschnitte: [
      {
        titel: 'Worum es geht: die Ökonomie nach Maister',
        absaetze: [
          'David Maister hat in „Managing the Professional Service Firm“ (1993) die Ökonomie von Beratungen, Kanzleien und ähnlichen Firmen beschrieben. Wenige Größen bestimmen den Gewinn: Auslastung (utilization, der Anteil abrechenbarer Zeit), Marge, Stundensatz (rate) und Hebel (leverage). Der Hebel ist das Verhältnis von Junioren zu Seniors. Maister erklärt, dass eine Firma ihren effektiven Stundensatz senkt, indem sie teure Seniors mit günstigen Junioren hebelt; die Erträge der Partner kommen nur zum Teil aus ihren eigenen hohen Sätzen, zum größeren Teil aus dem Wert, den die Arbeit der Junioren schafft.',
          'In „The Anatomy of a Consulting Firm“ (2004) rechnet Maister an einer fiktiven Firma vor, wie Hebel und Auslastung zusammenhängen: Seniors und Manager sollen dort 75 Prozent ihrer Zeit abrechenbar arbeiten, Junioren 90 Prozent, und auf einen Senior kommen zwei Manager und fünf Junioren. Aus diesen Verhältnissen folgen Einstellungsbedarf, Beförderungspfad und Gewinn je Partner. Maisters nüchterner Befund: Zwischen Wachstum und Gewinn besteht kein notwendiger Zusammenhang. Wer wächst, ohne die Projektstruktur zu ändern, erhöht den Gewinn je Partner nicht.',
        ],
      },
      {
        titel: 'Beratungstypen und Vertrauen',
        absaetze: [
          'Maister unterscheidet drei Arten von Nachfrage, die Kunden an eine Beratung richten: Expertise für neuartige Probleme, Erfahrung mit bekannten Problemen oder Effizienz bei wiederkehrenden Aufgaben, in seinen Worten „brains, grey hair or procedure“. Jeder Typ trägt einen anderen Hebel und einen anderen Stundensatz: Eine Expertenberatung arbeitet mit wenigen Seniors und hohem Satz, eine Prozedurberatung mit vielen Junioren und niedrigem Satz. Eine Beratung, die ihren Typ nicht kennt, stellt falsch ein und preist falsch.',
          'Maister, Green und Galford (2000) beschreiben in „The Trusted Advisor“, wovon Beratung jenseits der Kalkulation lebt. Ihre Vertrauensgleichung nennt vier Komponenten: Glaubwürdigkeit (credibility), die an den Worten hängt, ob man glaubt, was jemand sagt; Verlässlichkeit (reliability), die an Handlungen hängt, ob jemand liefert, was er zusagt; Nähe (intimacy), die Sicherheit, jemandem etwas anvertrauen zu können; und Selbstorientierung (self-orientation), ob der Berater vor allem sich selbst oder den Kunden im Blick hat. Die ersten drei bauen Vertrauen auf, die vierte steht im Nenner und mindert es. Nach Green ist niedrige Selbstorientierung der bei weitem wichtigste Faktor.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'In einer Beratung mit vier Personen, einer Geschäftsführerin, zwei Beratern und einem Praktikanten, bedeuten Maisters Größen Folgendes. Der Hebel ist klein: Die Geschäftsführerin verkauft, führt Kundengespräche und liefert selbst; sie ist zugleich Senior, Vertrieb und Qualitätssicherung. Ist sie krank oder im Vertrieb, sinkt die abrechenbare Zeit der Firma spürbar. Auslastung heißt hier: Wie viele Tage im Monat arbeiten die beiden Berater auf bezahlten Projekten, und wie viele auf Angeboten, internen Werkzeugen und Weiterbildung. Ein neues KI-Werkzeug, in das sich die Berater zwei Wochen einarbeiten, ist eine Investition aus Auslastung.',
          'Der Praktikant sieht das in Zahlen, die im Team offen besprochen werden: Tagessätze, Projektstunden, Angebote in der Pipeline. Er sieht aber auch das, was Maister, Green und Galford als Vertrauen beschreiben: Die Geschäftsführerin sagt einem Kunden, dass er das teure Werkzeug nicht braucht, und verzichtet auf Umsatz. Das ist niedrige Selbstorientierung als Geschäftsmodell. Kleine Beratungen können nicht über Hebel skalieren; sie wachsen über Wiederbeauftragung und Empfehlung, und beides folgt aus Vertrauen, nicht aus Auslastung.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Christensen, Wang und van Bever (2013) beschreiben, dass das Geschäftsmodell der Beratung, kluge Außenstehende gehen für begrenzte Zeit in eine Organisation und empfehlen Änderungen, seit über hundert Jahren unverändert ist und unter Druck gerät: Kunden kaufen einzelne Bausteine statt des gebündelten Projekts (Modularisierung), und Daten- und Analysewerkzeuge ersetzen einen Teil der Beraterstunden. Als Beispiel nennen sie McKinsey Solutions, mit dem die Firma erstmals Software und technologiegestützte Analysen als eigenes Angebot vom Beraterprojekt löste. Für KI-Beratung ist das Warnung und Chance zugleich: Was standardisierbar ist, wird zum Produkt.',
          'Der deutsche Markt: Nach dem BDU erzielten die deutschen Unternehmensberatungen 2025 einen Umsatz von 49,0 Milliarden Euro bei 0,5 Prozent Wachstum; kleine Beratungen bis eine Million Euro Umsatz verloren bis zu 2,5 Prozent, während das Geschäft mit KI-Themen um 18,8 Prozent wuchs. Für 2026 erwartet der Verband 4,5 Prozent Wachstum. Maisters Modelle stammen aus Großkanzleien und Großberatungen mit vielen Partnern. In einer Vier-Personen-Firma gibt es keinen Hebel zu optimieren; das Unternehmen lebt von der Zeit der Inhaberin, und jede Stunde, die sie nicht verkauft, fehlt. Die Vertrauensgleichung gilt dort uneingeschränkt, die Hebelrechnung nur als Warnung.',
        ],
      },
    ],
    quellen: [Q.maisterAnatomy2004, Q.maisterMtpsf, Q.trustEquation, Q.christensen2013, Q.bdu2026],
    sieheAuch: ['strategie-mittelstand', 'beratungsgespraech', 'reifegrad'],
    synonyme: ['Professional Service Firm', 'Leverage', 'Auslastung', 'Vertrauensgleichung', 'Beratermarkt'],
    unsicher: false,
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'beratungsgespraech',
    titel: 'Das Beratungsgespräch: fragen, zuhören, Hypothesen prüfen',
    thema: 'beratung-grundlagen',
    einleitung:
      'Das meiste, was eine Beratung über einen Kunden weiß, entsteht im Gespräch, und die Qualität der Fragen bestimmt die Qualität der Analyse. Für den Praktikanten ist das Meeting deshalb der wichtigste Lernort.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Edgar Schein, Organisationspsychologe am MIT, hat das Helfen selbst zum Gegenstand gemacht. In „Helping“ (2009) beschreibt er, dass der Moment, in dem Hilfe angeboten oder erbeten wird, von Ungleichheiten und Mehrdeutigkeiten geprägt ist: Wer Hilfe braucht, ist in der schwächeren Position. Er unterscheidet drei Rollen, die ein Helfer einnehmen kann, und beschreibt einen Frageprozess, der Helfer und Empfänger auf gleiche Höhe bringt, damit überhaupt klar wird, welche Hilfe gebraucht wird. In „Humble Consulting“ (2016) überträgt er das auf Berater: Das Arztmodell, in dem der Berater diagnostiziert und verschreibt, weicht einer Zusammenarbeit aus Offenheit, Neugier und Demut.',
          '„Humble Inquiry“ (Schein 2013, mit Peter Schein in dritter Auflage 2025) ist die Technik dazu: die Kunst, jemanden herauszulocken, Fragen zu stellen, deren Antwort man nicht kennt, und Beziehungen auf Neugier und Interesse an der anderen Person zu bauen. Die Scheins setzen das gegen das Erzählen (telling): Die meisten Führungskräfte halten sich für gute Kommunikatoren und erzählen in Wirklichkeit die meiste Zeit. Fragen aus einer Haltung der Neugier statt der Autorität verändern das Machtgefälle im Gespräch und machen es dem Gegenüber leichter, das zu sagen, was der Berater nicht weiß.',
        ],
      },
      {
        titel: 'Fragetechnik nach Brooks und John',
        absaetze: [
          'Brooks und John (2018) fassen die Verhaltensforschung zum Fragen zusammen und stellen fest, dass wenige Führungskräfte das Fragen als Fähigkeit begreifen, die sich schulen lässt. Ihre Empfehlungen betreffen Typ, Ton, Reihenfolge und Rahmung der Fragen. Folgefragen (follow-up questions), die an das anknüpfen, was das Gegenüber gerade gesagt hat, signalisieren Zuhören und haben nach den Autoren eine besondere Wirkung. Offene Fragen lassen dem Gegenüber Raum; geschlossene Fragen eignen sich, wenn eine Behauptung geprüft werden soll. Die Reihenfolge zählt, weil schwierige Fragen anders wirken, je nachdem, ob sie am Anfang oder nach leichteren kommen. Ein beiläufiger, nicht anklagender Ton erhöht die Bereitschaft, auch Unangenehmes zu sagen.',
          'Der Nutzen geht nach Brooks und John über Information hinaus: Fragen fördern Lernen und Ideenaustausch, verbessern Leistung, bauen Beziehung und Vertrauen auf und senken Risiken, weil sie unerkannte Fallen sichtbar machen. Wer fragt, gewinnt nach den Autoren zudem an emotionaler Intelligenz, was wiederum bessere Fragen erlaubt. Im Beratungsgespräch heißt das: Die Frage ist kein Vorspiel zur Empfehlung, sondern Teil der Leistung.',
        ],
      },
      {
        titel: 'Im Beratungsalltag: die Rolle des Praktikanten',
        absaetze: [
          'Im Erstgespräch mit einem Möbelhersteller, der „etwas mit KI“ machen will, spricht die Geschäftsführerin wenig. Sie beginnt mit der Situation des Kunden, nicht mit KI: Was läuft heute im Auftragsdurchlauf, wo entstehen Wartezeiten, wer entscheidet, wenn etwas klemmt. Der Praktikant beobachtet, welche Frage wann kommt: die offene Frage am Anfang, die Folgefrage, wenn der Kunde eine Zahl nennt („Wie kommen Sie auf die zwei Wochen?“), die geschlossene Frage, wenn eine Behauptung geprüft wird („Liegen diese Daten heute im ERP?“). Er notiert auch, welche naheliegende Frage die Geschäftsführerin nicht stellt, und fragt sie hinterher nach dem Grund.',
          'Seine Notizen führt er als Hypothesen-Protokoll in drei Spalten: Was wurde behauptet (der Kunde sagt, die Angebotserstellung dauere zwei Wochen), was wurde belegt (die Zahl stammt aus einem Gefühl, nicht aus dem System), was bleibt offen (die Verteilung der Durchlaufzeiten muss aus dem ERP gezogen werden). Aus der dritten Spalte entsteht die Aufgabenliste für die nächste Woche, aus der ersten die Hypothesen, die das Team prüft. So wird das Gespräch zur Datenquelle, und der Praktikant lernt zu unterscheiden, was ein Kunde weiß und was er nur glaubt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Fragetechnik ersetzt keine Fachkenntnis. Eine gute Folgefrage setzt voraus, dass man weiß, welche Antwort plausibel wäre; wer den Unterschied zwischen einem ERP-Export und einer Schätzung nicht kennt, kann die Behauptung nicht prüfen. Schein bindet Humble Inquiry an eine Beziehung: Die Fragen wirken, wenn der Kunde spürt, dass echtes Interesse dahintersteht. Wer Fragen nach einem Leitfaden abarbeitet, erzeugt das Gegenteil, ein Verhör, das der Kunde mit knappen Antworten quittiert. Gesprächsleitfäden wirken schnell mechanisch, und der Kunde merkt es.',
          'Zwei weitere Grenzen: Erstens bleiben Gesprächsdaten subjektiv; das Hypothesen-Protokoll ordnet Behauptungen, ersetzt aber die Prüfung an den Systemen nicht. Zweitens braucht Humble Inquiry Zeit, die im Vertriebsgespräch oft fehlt, wenn der Kunde eine Einschätzung erwartet und Schweigen als Unsicherheit liest. Die Geschäftsführerin balanciert deshalb: fragen, bis die Situation klar ist, und dann eine Hypothese aussprechen, die der Kunde korrigieren kann. Die Kunst liegt im Zeitpunkt des Wechsels, und der lässt sich nur durch Zuhören in vielen Gesprächen lernen.',
        ],
      },
    ],
    quellen: [Q.brooksJohn2018, Q.brooksJohn2018Store, Q.scheinHumbleInquiry, Q.scheinHelping2009, Q.scheinHumbleConsulting2016],
    sieheAuch: ['hypothesen-issue-trees', 'beratungsunternehmen', 'reifegrad'],
    synonyme: ['Humble Inquiry', 'Fragetechnik', 'Erstgespräch', 'aktives Zuhören', 'Hypothesen-Protokoll'],
    unsicher: false,
  },
];
