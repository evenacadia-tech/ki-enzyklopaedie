import type { Quelle } from '../typen';
import type { Vertiefung } from '.';

// Beratungshandwerk: reifegrad, use-case-prio, poc-pilot-skalierung, business-case, build-vs-buy, change-management. Alle Quellen am 2026-09-28 abgerufen und geprüft (DOI über Crossref).
const AB = '2026-09-28';
const Q = {
  joehnk2021: {
    titel:
      'Jöhnk, Weißert & Wyrtki — Ready or Not, AI Comes: An Interview Study of Organizational AI Readiness Factors (Business & Information Systems Engineering 63(1), 2021)',
    url: 'https://doi.org/10.1007/s12599-020-00676-7',
    abgerufen: AB,
  } satisfies Quelle,
  mitCisrReife: {
    titel: 'Weill, Woerner & Sebastian — Building Enterprise AI Maturity (MIT CISR Research Briefing, 2024)',
    url: 'https://cisr.mit.edu/publication/2024_1201_EnterpriseAIMaturityModel_WeillWoernerSebastian',
    abgerufen: AB,
  } satisfies Quelle,
  roeglinger2012: {
    titel:
      'Röglinger, Pöppelbuß & Becker — Maturity Models in Business Process Management (Business Process Management Journal 18(2), 2012)',
    url: 'https://doi.org/10.1108/14637151211225225',
    abgerufen: AB,
  } satisfies Quelle,
  ukPlaybook: {
    titel: 'Government Digital Service — Artificial Intelligence Playbook for the UK Government (GOV.UK, 2025)',
    url: 'https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html',
    abgerufen: AB,
  } satisfies Quelle,
  nistRmf: {
    titel:
      'NIST — Artificial Intelligence Risk Management Framework (AI RMF 1.0), NIST AI 100-1 (National Institute of Standards and Technology, 2023)',
    url: 'https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  aiActAnhang3: {
    titel:
      'Future of Life Institute — EU AI Act Explorer: Anhang III, Hochrisiko-KI-Systeme gemäß Artikel 6 Absatz 2 (artificialintelligenceact.eu, Fassung nach dem KI-Omnibus 2026)',
    url: 'https://artificialintelligenceact.eu/annex/3/',
    abgerufen: AB,
  } satisfies Quelle,
  aiActArt25: {
    titel:
      'Future of Life Institute — EU AI Act Explorer: Artikel 25, Verantwortlichkeiten entlang der KI-Wertschöpfungskette (artificialintelligenceact.eu, Fassung nach dem KI-Omnibus 2026)',
    url: 'https://artificialintelligenceact.eu/article/25/',
    abgerufen: AB,
  } satisfies Quelle,
  aiActArt4: {
    titel:
      'Future of Life Institute — EU AI Act Explorer: Artikel 4, KI-Kompetenz (artificialintelligenceact.eu, Fassung nach dem KI-Omnibus 2026)',
    url: 'https://artificialintelligenceact.eu/article/4/',
    abgerufen: AB,
  } satisfies Quelle,
  kommissionOmnibus: {
    titel: 'Europäische Kommission — AI Omnibus enters into force (Shaping Europe’s digital future, 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/news/ai-omnibus-enters-force',
    abgerufen: AB,
  } satisfies Quelle,
  kommissionDataAct: {
    titel: 'Europäische Kommission — Data Act (Shaping Europe’s digital future, o. J.)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/data-act',
    abgerufen: AB,
  } satisfies Quelle,
  bitkom2026: {
    titel: 'Bitkom — Erstmals nutzt die Mehrheit der Unternehmen KI, Presseinformation (Bitkom e. V., 14.09.2026)',
    url: 'https://www.bitkom.org/Presse/Presseinformation/Erstmals-nutzt-Mehrheit-Unternehmen-KI',
    abgerufen: AB,
  } satisfies Quelle,
  cooper2008: {
    titel:
      'Cooper — Perspective: The Stage-Gate Idea-to-Launch Process — Update, What’s New, and NexGen Systems (Journal of Product Innovation Management 25(3), 2008)',
    url: 'https://doi.org/10.1111/j.1540-5885.2008.00296.x',
    abgerufen: AB,
  } satisfies Quelle,
  cooperSommer2016: {
    titel:
      'Cooper & Sommer — The Agile–Stage-Gate Hybrid Model: A Promising New Approach and a New Research Opportunity (Journal of Product Innovation Management 33(5), 2016)',
    url: 'https://doi.org/10.1111/jpim.12314',
    abgerufen: AB,
  } satisfies Quelle,
  ibmTco: {
    titel: 'IBM — What Is Total Cost of Ownership (TCO)? (IBM Think, o. J.)',
    url: 'https://www.ibm.com/think/topics/total-cost-of-ownership',
    abgerufen: AB,
  } satisfies Quelle,
  sculley2015: {
    titel:
      'Sculley, Holt, Golovin, Davydov, Phillips, Ebner, Chaudhary, Young, Crespo & Dennison — Hidden Technical Debt in Machine Learning Systems (Advances in Neural Information Processing Systems 28, 2015)',
    url: 'https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html',
    abgerufen: AB,
  } satisfies Quelle,
  brynjolfsson2021: {
    titel:
      'Brynjolfsson, Rock & Syverson — The Productivity J-Curve: How Intangibles Complement General Purpose Technologies (American Economic Journal: Macroeconomics 13(1), 2021)',
    url: 'https://doi.org/10.1257/mac.20180386',
    abgerufen: AB,
  } satisfies Quelle,
  quinnHilmer1994: {
    titel: 'Quinn & Hilmer — Strategic Outsourcing (MIT Sloan Management Review, 1994)',
    url: 'https://sloanreview.mit.edu/article/strategic-outsourcing/',
    abgerufen: AB,
  } satisfies Quelle,
  prosciAdkar: {
    titel: 'Prosci — The Prosci ADKAR Model (Prosci, o. J.)',
    url: 'https://www.prosci.com/methodology/adkar',
    abgerufen: AB,
  } satisfies Quelle,
  hughes2011: {
    titel:
      'Hughes — Do 70 Per Cent of All Organizational Change Initiatives Really Fail? (Journal of Change Management 11(4), 2011)',
    url: 'https://doi.org/10.1080/14697017.2011.630506',
    abgerufen: AB,
  } satisfies Quelle,
};

export const beratungshandwerk: Vertiefung[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'reifegrad',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Reifegrad-Assessment prüft den Ist-Stand einer Organisation, bevor über einzelne Anwendungsfälle oder Werkzeuge entschieden wird. In der Forschung heißt die Frage meist KI-Bereitschaft (AI readiness). Jan Jöhnk, Malte Weißert und Katrin Wyrtki (Business & Information Systems Engineering, 2021) beschreiben sie so: Ein Unternehmen muss prüfen, ob seine Mittel, seine Fähigkeiten und sein Wille zur Umsetzung für einen bestimmten KI-Einsatzzweck bereit sind. Eine solche Bewertung vor der Einführungsentscheidung macht Lücken früh sichtbar und verringert die Unsicherheit der Entscheidung. Der Zusatz „für einen bestimmten Zweck“ ist wichtig: Dasselbe Unternehmen kann für einen internen Suchassistenten bereit sein und für eine automatisierte Entscheidung über Kunden nicht.',
          'Das Ergebnis ist eine ehrliche Standortbestimmung. Sie beantwortet die beiden Fragen, auf denen jede seriöse Roadmap aufbaut: Welche Anwendungsfälle sind mit dem heutigen Stand realistisch machbar, und was muss zuerst aufgebaut werden, damit weitere möglich werden? Ohne diese Antwort entsteht eine Liste von Wünschen, deren Reihenfolge das Bauchgefühl bestimmt. Ehrlich heißt, dass sich die Bewertung auf Belege stützt, etwa auf einen Blick in die tatsächlichen Datenbestände, und nicht allein auf die Selbsteinschätzung im Workshop.',
        ],
      },
      {
        titel: 'Dimensionen und Stufen',
        absaetze: [
          'Geprüft wird entlang mehrerer Dimensionen: Datenlage und Datenqualität, Kompetenzen, Technologie, Governance und Recht sowie Kultur. Jöhnk und Kollegen haben aus Interviews mit 25 KI-Fachleuten fünf Kategorien abgeleitet, die sich damit weitgehend decken: strategische Ausrichtung (strategic alignment), Ressourcen, Wissen, Kultur und Daten, aufgefächert in 18 Faktoren mit 58 beispielhaften Indikatoren. Zu den Ressourcen zählen Budget, Personal und eine IT-Infrastruktur, die Daten speichern, schnell bewegen und mit ausreichender Rechenleistung verarbeiten kann. Bei den Daten geht es um Verfügbarkeit, Zugang und Qualität, etwa Vollständigkeit und Richtigkeit; gerade historische Bestände haben nach den Autoren oft Qualitätsprobleme. Die strategische Ausrichtung fragt, ob die Geschäftsführung den KI-Einsatz sichtbar trägt und mit der Strategie verbindet. Auch der Umgang mit ethischen Risiken wie verzerrten Ergebnissen gehört zu den Faktoren.',
          'Reifegradmodelle ordnen solche Befunde zusätzlich in Stufen. Peter Weill, Stephanie Woerner und Ina Sebastian (MIT CISR, 2024) unterscheiden auf Grundlage einer Befragung von 721 Unternehmen aus dem Jahr 2022 vier Stufen: experimentieren und vorbereiten, Piloten und Fähigkeiten aufbauen, KI-Arbeitsweisen entwickeln und schließlich zukunftsfähig werden. Auf der ersten Stufe stehen Schulung, Nutzungsregeln und die Frage, wo ein Mensch die Ergebnisse prüfen muss; auf der zweiten Piloten mit Kennzahlen und das Zusammenführen verstreuter Datensilos. Unternehmen auf den ersten beiden Stufen lagen finanziell unter dem Durchschnitt ihrer Branche, jene auf den Stufen drei und vier darüber.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Großhändler für Sanitärbedarf mit 180 Beschäftigten möchte „etwas mit KI machen“ und bringt drei Ideen mit: Angebote schneller erstellen, Kundenanfragen vorsortieren, den Bedarf an Lagerware vorhersagen. Die Beraterin spricht mit Geschäftsführung, Vertrieb, IT und dem externen Datenschutzbeauftragten und lässt sich die Daten zeigen, statt nur nach ihnen zu fragen. Das Bild ist gemischt. Artikelstammdaten und Preise sind im Warenwirtschaftssystem sauber gepflegt. Kundenanfragen liegen verstreut in persönlichen Postfächern. Verkaufsdaten aus der Zeit vor dem letzten Systemwechsel gibt es nur als Tabellen mit wechselnden Spalten. Zwei Mitarbeitende nutzen privat einen Chatbot für Kundentexte, eine Regel dazu gibt es nicht, und der Vertrieb fürchtet, dass Angebote künftig ohne ihn entstehen.',
          'Aus diesem Ist-Stand folgt die Reihenfolge. Die Angebotserstellung ist heute machbar, weil ihre Daten stimmen. Die Vorsortierung braucht zuerst ein gemeinsames Postfach und eine Regel, welche Daten in welches Werkzeug dürfen. Die Bedarfsprognose braucht die alten Verkaufsdaten in brauchbarer Form und kommt frühestens als dritter Schritt. Die Roadmap beginnt deshalb nicht mit einem Modell, sondern mit einer Nutzungsrichtlinie, einer kurzen Schulung und einem Gespräch mit dem Vertrieb darüber, was sich für ihn ändert und was nicht. Das Assessment hat keine Technik empfohlen, aber die Reihenfolge begründet.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Reifegradmodelle gibt es in großer Zahl, und ihr Nutzen ist begrenzter, als ihre Stufenbilder vermuten lassen. Maximilian Röglinger, Jens Pöppelbuß und Jörg Becker (Business Process Management Journal, 2012) haben zehn Reifegradmodelle für das Prozessmanagement verglichen: Den Ist-Stand beschreiben sie ordentlich, aber sie geben wenig Anleitung, welcher Reifegrad überhaupt erstrebenswert ist und mit welchen Maßnahmen man ihn erreicht. Für KI-Modelle stellt sich dieselbe Frage; die Einstufung auf „Stufe zwei“ sagt noch nicht, was als Nächstes zu tun ist. Stufenmodelle legen außerdem einen gleichförmigen Weg nahe. Ein Mittelständler kann für einen einzelnen Anwendungsfall gut aufgestellt sein, ohne unternehmensweit als reif zu gelten.',
          'Der Zusammenhang zwischen Reifestufe und Finanzergebnis bei MIT CISR beruht auf einer Befragung und zeigt eine Korrelation, keinen Beleg dafür, dass der Aufstieg auf eine höhere Stufe den Erfolg verursacht; erfolgreiche Unternehmen können sich auch schlicht mehr KI leisten. Schließlich darf das Assessment nicht zur Vorbedingung für alles werden. Das KI-Handbuch der britischen Regierung (Government Digital Service, 2025) hält fest, dass die unterstützenden Strukturen vor dem ersten Projekt nicht voll ausgereift sein müssen und dass die Erfahrung aus dem ersten Projekt prägt, wie man sie organisiert. Ein gutes Assessment endet deshalb mit einem ersten machbaren Schritt, nicht mit einer langen Liste von Voraussetzungen.',
        ],
      },
    ],
    quellen: [Q.joehnk2021, Q.mitCisrReife, Q.roeglinger2012, Q.ukPlaybook],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'use-case-prio',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Am Anfang steht meist eine lange Ideenliste, und fast jede Idee hat jemanden, der sie für die wichtigste hält. Priorisieren heißt, diese Liste mit einem Raster zu ordnen, das für alle Ideen gleich gilt. Das KI-Handbuch der britischen Regierung (Government Digital Service, 2025) beschreibt den Weg: Anwendungsfälle sollen von geschäftlichen Bedürfnissen, Schmerzpunkten und Ineffizienzen ausgehen, nicht davon, was die Technik kann. Die mögliche Wirkung wird etwa mit einer Kosten-Nutzen-Betrachtung abgeschätzt, zum Beispiel über Effizienz, Genauigkeit oder Kostensenkung; getrennt davon wird geprüft, ob Fähigkeiten und Infrastruktur für Umsetzung und Betrieb vorhanden sind. Das Handbuch empfiehlt ausdrücklich, Chancen nach Machbarkeit und geschäftlichem Wert zu erfassen und zu priorisieren, etwa in einem Register der Anwendungsfälle.',
          'Wie nötig das ist, zeigt eine Befragung des Digitalverbands Bitkom (September 2026): Unter den Unternehmen, die KI bereits einsetzen, sagt ein Drittel, es tue dies vor allem aus Angst, sonst den Anschluss zu verlieren. Angst ist ein schlechter Ratgeber für die Reihenfolge. Das Risikomanagement-Rahmenwerk des US-amerikanischen Standardisierungsinstituts NIST (AI RMF 1.0, 2023) sieht vor, vor der Entscheidung über Entwicklung oder Einsatz den erwarteten Nutzen und die möglichen Kosten zu dokumentieren, auch nicht-finanzielle Kosten durch Fehler des Systems; erst danach soll eine erste Entscheidung über Weitermachen oder Verwerfen (go/no-go) fallen.',
        ],
      },
      {
        titel: 'Zwei Achsen, vier Felder',
        absaetze: [
          'Praktisch lässt sich das als Matrix mit zwei Achsen darstellen. Der geschäftliche Wert beschreibt Nutzen und Wirkung: gesparte Zeit, gesenkte Kosten, bessere Qualität, zusätzlicher Umsatz oder ein kleineres Risiko. Die Machbarkeit fasst Datenlage, technische Reife, Aufwand und Risiko zusammen. Aus beiden ergeben sich die Felder. Hoher Wert bei hoher Machbarkeit sind die ersten schnellen Erfolge (quick wins): Sie liefern früh ein Ergebnis, an dem die Organisation lernt und Vertrauen gewinnt. Hoher Wert bei niedriger Machbarkeit heißt Vorarbeit leisten, etwa Daten zusammenführen oder Regeln klären, statt den Fall zu verwerfen. Niedriger Wert wird zurückgestellt, auch wenn er leicht umzusetzen wäre, denn leicht allein ist kein Grund.',
          'Das Risiko gehört auf die Machbarkeitsachse, und es hat seit der KI-Verordnung der EU eine rechtliche Seite. Anhang III der Verordnung zählt etwa Systeme zur Auswahl von Bewerberinnen und Bewerbern, die Stellenanzeigen gezielt schalten, Bewerbungen filtern oder Kandidaten bewerten, zu den Hochrisiko-Systemen. Nach dem sogenannten KI-Omnibus, in Kraft seit 27. Juli 2026, gelten die Pflichten für diese Systeme ab 2. Dezember 2027 (Stand September 2026). Ein solcher Fall ist deshalb kein guter erster Schritt, auch wenn sein Wert hoch erscheint: Er bringt die zusätzlichen Pflichten der Verordnung mit sich, bevor die Organisation Erfahrung gesammelt hat. Der Artikel über Hochrisiko-KI beschreibt die Kategorie genauer.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Spedition mit 250 Beschäftigten hat in einem Workshop zwölf Ideen gesammelt. Die Beraterin bewertet jede mit denselben Fragen und macht die Bewertung für alle sichtbar. Das automatische Auslesen von Frachtpapieren spart der Disposition Tipparbeit, die Dokumente liegen gescannt vor, und es gibt fertige Lösungen am Markt: hoher Wert, hohe Machbarkeit, der erste Kandidat. Eine Tourenplanung mit Prognose der Ladezeiten hätte den größten Wert, aber die Daten der Fahrzeuge werden erst seit kurzem erfasst: Vorarbeit, die Datensammlung beginnt sofort. Ein Werkzeug, das Bewerbungen für Fahrerstellen vorsortiert, fällt unter die Hochrisiko-Kategorie und wird vorerst zurückgestellt. Ein Chatbot für die Website bringt wenig, weil die Kunden per Telefon und Portal buchen, und kommt ans Ende der Liste.',
          'Die elf nicht gewählten Ideen verschwinden nicht. Sie stehen im Register mit ihrer Bewertung und dem Grund, warum sie warten. Entscheidend ist, dass für alle Ideen dieselben Kriterien und dieselbe Skala gelten, auch für die Lieblingsidee der Geschäftsführung. Nach dem ersten Projekt wird neu bewertet, denn Machbarkeit ändert sich: Wenn die Fahrzeugdaten einige Monate vorliegen, rückt die Tourenplanung nach oben. Die sichtbare Begründung wirkt auch nach innen; wer nachvollziehen kann, warum seine Idee wartet, muss keine Willkür vermuten.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Matrix macht eine Entscheidung nachvollziehbar, aber nicht objektiv. Hinter jeder Einstufung stehen Schätzungen, und wer die Punkte vergibt, bestimmt das Ergebnis. Werte auf einer Skala von eins bis fünf zu multiplizieren erzeugt eine Genauigkeit, die es nicht gibt; zwei Ideen mit derselben Punktzahl können sehr verschiedene Risiken tragen. Der geschätzte Wert ist oft der schwächste Teil. Bevor ein Fall mit hohem Wert startet, braucht er deshalb eine eigene Rechnung, wie sie der Artikel über den Business-Case beschreibt, und eine Messung im Piloten.',
          'Zweitens bevorzugt die Matrix das Naheliegende. Schnelle Erfolge sind gut für den Anfang, aber ein Portfolio, das nur aus ihnen besteht, verbessert Bestehendes und lässt größere Vorhaben liegen, deren Machbarkeit erst durch Vorarbeit entsteht. Welche Vorarbeit sich strategisch lohnt, sagt die Matrix nicht; das bleibt eine Entscheidung der Geschäftsführung. Und sie ist eine Momentaufnahme: Datenlage, Kompetenzen, Preise und Rechtslage ändern sich, wie der KI-Omnibus zeigt. Wer die Bewertung nicht regelmäßig wiederholt, priorisiert nach dem Stand von gestern.',
        ],
      },
    ],
    quellen: [Q.ukPlaybook, Q.nistRmf, Q.aiActAnhang3, Q.kommissionOmnibus, Q.bitkom2026],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'poc-pilot-skalierung',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Der Stufenweg senkt das Risiko schrittweise (de-risking): Jede Stufe beantwortet eine andere Frage, und erst wenn die Antwort trägt, fließt mehr Geld in die nächste. Der Machbarkeitsnachweis (proof of concept, PoC) belegt mit wenig Aufwand, dass die Kernannahme grundsätzlich funktioniert, etwa dass ein Modell eingehende Dokumente mit brauchbarer Genauigkeit einordnet. Er soll eng begrenzt bleiben und braucht noch keine Anbindung an den laufenden Betrieb. Der Pilot erprobt die Lösung dann unter realen Bedingungen mit echten Nutzern. Die Skalierung schließlich rollt sie breit und betriebsfest aus: mit Zuständigen, Unterstützung, Überwachung und einem Weg zurück, falls das System versagt.',
          'Warum der Pilot eine eigene Stufe ist, begründet das Risikomanagement-Rahmenwerk des US-amerikanischen Standardisierungsinstituts NIST (AI RMF 1.0, 2023): Messungen im Labor oder in einer kontrollierten Umgebung liefern vor dem Einsatz wichtige Erkenntnisse, können sich aber von den Risiken unterscheiden, die im realen Betrieb entstehen. Zu den Aufgaben beim Einsatz zählt NIST ausdrücklich das Pilotieren, die Prüfung der Verträglichkeit mit Altsystemen, die Einhaltung von Vorschriften, das Management der organisatorischen Veränderung und die Bewertung der Nutzererfahrung. Für den Betrieb sieht das Rahmenwerk Mechanismen und klare Zuständigkeiten vor, um ein System abzulösen oder abzuschalten, wenn es sich anders verhält als vorgesehen.',
        ],
      },
      {
        titel: 'Tore mit Zähnen',
        absaetze: [
          'Die Idee der Entscheidungstore stammt aus der Produktentwicklung. Robert Cooper hat sie als Stage-Gate-Prozess bekannt gemacht und 2008 im Journal of Product Innovation Management den Stand zusammengefasst: Zwischen den Stufen liegen Tore, an denen klar benannte Entscheider (gatekeepers) anhand vorher definierter Erfolgskriterien und Bewertungsbögen entscheiden. Cooper fordert „Tore mit Zähnen“ (gates with teeth), also Tore, deren Entscheidungen tatsächlich Folgen haben. Zugleich betont er, dass der Prozess weder linear noch starr gemeint ist und sich auf Art und Größe eines Vorhabens zuschneiden lässt.',
          'Genau hier entsteht die Gefahr, die im Beratungsjargon „PoC-Purgatory“ heißt, das Fegefeuer der Machbarkeitsnachweise: Ein Versuch folgt dem nächsten, keiner wird beendet, keiner geht in Betrieb. Die Ursache sind Tore ohne Zähne. Wenn niemand vorab festgelegt hat, woran Erfolg gemessen wird, wer entscheidet und bis wann, lässt sich ein Pilot beliebig verlängern. Das Gegenmittel ist unspektakulär: Kriterien, Entscheider und Termin werden vor dem Start aufgeschrieben, und am Tor gibt es drei zulässige Antworten, nämlich weitermachen, anpassen oder beenden. Auch NIST nennt ausdrückliche Verfahren für solche Entscheidungen über Inbetriebnahme und Einsatz als Nutzen seines Rahmenwerks.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Hersteller von Industriearmaturen mit 400 Beschäftigten will Reklamationen mit KI vorsortieren, damit sie schneller beim richtigen Team landen. Der PoC dauert wenige Wochen: Mit anonymisierten Reklamationen der Vergangenheit wird geprüft, ob ein Modell die Kategorien zuverlässig genug erkennt. Die geforderte Trefferquote und die Kategorien, bei denen Fehler besonders teuer wären, stehen vorher fest. Ein Fehlschlag wäre an dieser Stelle billig: Er hätte einige Wochen gekostet, keinen Rollout. Der PoC besteht, und das Tor öffnet sich für einen Piloten, nicht für den Rollout.',
          'Der Pilot läuft in einem Team, das den typischen Alltag abbildet, nicht im am besten ausgestatteten. Echte Reklamationen gehen ein, jede Einordnung wird von einem Menschen bestätigt oder korrigiert. Gemessen werden Durchlaufzeit, Korrekturen, Rückfragen und die Belastung des Teams. Dabei zeigt sich, dass das Warenwirtschaftssystem die Kategorien anders benennt und eine Schnittstelle fehlt. Am zweiten Tor lautet die Entscheidung „anpassen“: Schnittstelle bauen, Kategorien angleichen, dann eine zweite Pilotwelle. Erst danach folgen die übrigen Standorte, mit einer benannten Verantwortlichen im Fachbereich, einem regelmäßigen Überwachungsbericht und einem festgelegten Rückweg zur Sortierung von Hand.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Stufen kosten Zeit, und Tore können zur Bürokratie werden. Cooper selbst nennt die Überbürokratisierung des Prozesses als typische Schwierigkeit und empfiehlt schlankere Tore. Robert Cooper und Anita Sommer (Journal of Product Innovation Management, 2016) beschreiben die Verbindung der Tore mit agilen Methoden, also kurzen Arbeitszyklen mit häufiger Rückmeldung, als vielversprechend, betonen aber, dass die Belege dafür noch begrenzt sind. Für KI-Vorhaben passt diese Richtung: Innerhalb einer Stufe darf schnell und in Schleifen gearbeitet werden, an den Toren wird trotzdem entschieden.',
          'Zweitens passt das Schema nicht immer eins zu eins. Bei zugekaufter Standardsoftware ist die Frage, ob die Technik grundsätzlich funktioniert, weniger offen als bei einer Eigenentwicklung; der PoC prüft dann vor allem die Passung zu den eigenen Daten und Abläufen und rückt nahe an den Piloten. Drittens kann ein Pilot zu gut aussehen, wenn er mit dem motiviertesten Team und besonders viel Unterstützung läuft; deshalb gehört ein repräsentativer Einsatzort zu den Kriterien. Und ein bestandener Pilot beweist nicht, dass der Nutzen in der Breite bleibt. Auch nach der Skalierung braucht es Messung und die Bereitschaft, ein System zu verändern oder abzuschalten.',
        ],
      },
    ],
    quellen: [Q.nistRmf, Q.cooper2008, Q.cooperSommer2016],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'business-case',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Business-Case stellt den erwarteten Nutzen eines Vorhabens seinen Gesamtkosten gegenüber und begründet damit die Entscheidung, Geld auszugeben. Die Kostenseite heißt Gesamtbetriebskosten (total cost of ownership, TCO). IBM beschreibt sie als Rechnung, die die gesamten Kosten eines Produkts oder Dienstes über seinen Lebenszyklus erfasst, direkte wie indirekte, kurz- wie langfristige. Dazu gehören Anschaffung, Einrichtung, Betrieb, Wartung, Kosten durch Ausfälle und der Wert oder die Kosten am Ende der Nutzung, etwa für einen Anbieterwechsel. Indirekte Kosten sind schwer zu fassen, vor allem Arbeitszeit: Einarbeitung, Schulung und die Behebung von Anfangsfehlern kosten Stunden, die auf keiner Rechnung stehen.',
          'Die Gegenseite ist der erwartete Nutzen: zusätzlicher Ertrag, Einsparungen oder ein Gewinn an Qualität und Sicherheit, etwa weniger Fehler oder kleinere Haftungsrisiken. Erst wenn dieser Nutzen gegen die Gesamtkosten steht, lässt sich die Rendite der Investition (return on investment, ROI) ehrlich abwägen, nicht gegen den Listenpreis. IBM warnt ausdrücklich vor dem Reiz niedriger Einstiegskosten; erst die TCO zeige die tatsächliche Größenordnung. Bei KI ist diese Warnung besonders berechtigt, weil der sichtbare Preis, die Lizenz oder die Gebühr je Anfrage, klein wirkt.',
        ],
      },
      {
        titel: 'Was bei KI ins Gewicht fällt',
        absaetze: [
          'Wofür die Kosten tatsächlich anfallen, zeigt eine Befragung des Digitalverbands Bitkom unter 603 Unternehmen ab 20 Beschäftigten (September 2026). Unter den Unternehmen, die KI einsetzen, nannten 51 Prozent die Infrastruktur wie Cloud und Rechenleistung als großen Kostenpunkt, 50 Prozent die Aufbereitung von Daten und 41 Prozent die Integration in bestehende Systeme. Abonnements und Lizenzen waren nur für 21 Prozent ein großer Posten, gleichauf mit externer Beratung; die Schulung der Beschäftigten für 19 Prozent, der Verbrauch von Token für 8 Prozent. Mehr als die Hälfte der Anwender nennt schwer kalkulierbare Kosten als Hemmnis. Bitkom-Präsident Ralf Wintergerst fasst es so zusammen: „Wer nur eine Lizenz kauft, hat KI eingekauft, aber noch nichts verändert.“',
          'Dazu kommen Kosten, die erst im Betrieb sichtbar werden. D. Sculley und Kollegen (Advances in Neural Information Processing Systems, 2015) halten fest, dass schnelle Erfolge mit maschinellem Lernen nicht umsonst sind: Reale Systeme verursachen häufig massive laufende Wartungskosten, etwa durch Abhängigkeiten von Daten, durch versteckte Rückkopplungen und durch eine Welt, die sich anders entwickelt als die Trainingsdaten. Für die TCO heißt das: Integration, Betrieb und Hosting, Wartung, Daten, Sicherheit, Governance sowie Veränderung und Schulung gehören als eigene Zeilen in die Rechnung, über die gesamte geplante Nutzungsdauer.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Versicherungsmakler mit 120 Beschäftigten will einen Schreibassistenten für die Kundenkorrespondenz einführen; die Lizenz je Arbeitsplatz wirkt günstig. Die Beraterin legt eine Tabelle über drei Jahre an. Auf der Kostenseite stehen neben der Lizenz die Anbindung an das Verwaltungsprogramm, die datenschutzrechtliche Prüfung samt Vertrag zur Auftragsverarbeitung, die Einführung mit Schulung, die Pflege von Textbausteinen und Vorgaben, die Zeit, die das Prüfen der Entwürfe kostet, und die Kosten eines späteren Wechsels. Auf der Nutzenseite stehen die gesparte Zeit je Brief, weniger Nacharbeit und ein geringeres Risiko falscher Auskünfte, wenn Entwürfe auf geprüften Bausteinen beruhen.',
          'Weil es noch keine eigenen Messwerte gibt, rechnet die Beraterin mit einer Spanne statt einer Zahl und kennzeichnet sie als Schätzung. Vor dem Start wird gemessen, wie lange ein Brief heute dauert; ohne diese Ausgangslage (baseline) ließe sich später kein Nutzen belegen. Die Kennzahl legt der Fachbereich fest, der den Nutzen erlebt, die IT liefert die Kosten. Der Pilot ersetzt die Schätzung durch Messwerte, und die Entscheidung über die breite Einführung fällt auf dieser Grundlage. Eine Erfolgsquote aus der Broschüre des Anbieters kommt in die Tabelle nur als das, was sie ist: eine Selbstauskunft.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein Business-Case ist eine Prognose und teilt deren Schwächen, zumal der Nutzen von KI spät sichtbar werden kann und schwer zu messen ist. Erik Brynjolfsson, Daniel Rock und Chad Syverson (American Economic Journal: Macroeconomics, 2021) beschreiben für Querschnittstechnologien wie KI eine Produktivitäts-J-Kurve: Sie verlangen erhebliche ergänzende Investitionen, oft immaterielle wie neue Abläufe und neues Wissen, die in der volkswirtschaftlichen Statistik schlecht erfasst werden. Deshalb wird der Produktivitätszuwachs in den ersten Jahren unterschätzt und später, wenn die Früchte geerntet werden, überschätzt. Für den einzelnen Business-Case ist das eine Warnung in beide Richtungen: Eine Bilanz nach einem Quartal kann ein Vorhaben zu früh verwerfen, und eine Rechnung, die die ergänzenden Investitionen nicht als Kosten führt, rechnet es schön.',
          'Hinzu kommt ein Interessenkonflikt, wenn ausgerechnet diejenigen rechnen, die das Vorhaben wollen, und weiche Nutzen wie Zufriedenheit lassen sich nur mit Annahmen in Geld umrechnen. Das spricht nicht gegen die Rechnung, sondern für ihre Form: harte und weiche Nutzen getrennt ausweisen, Annahmen offen benennen, Spannen statt Punktwerte angeben. Und die Rechnung endet nicht mit der Entscheidung. Wird sie nach dem Piloten und vor jeder Vertragsverlängerung mit echten Zahlen wiederholt, zeigt sie, ob das Vorhaben hält, was es versprochen hat.',
        ],
      },
    ],
    quellen: [Q.ibmTco, Q.bitkom2026, Q.sculley2015, Q.brynjolfsson2021],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'build-vs-buy',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die Frage, ob ein Unternehmen eine Fähigkeit selbst herstellt oder einkauft (make or buy), ist alt. James Brian Quinn und Frederick Hilmer (MIT Sloan Management Review, 1994) haben die klassische Antwort formuliert: Ein Unternehmen soll seine Mittel auf Kernkompetenzen konzentrieren, in denen es herausragend ist und Kunden einen einzigartigen Wert bietet, und andere Tätigkeiten gezielt auslagern, für die es weder einen kritischen strategischen Bedarf noch besondere Fähigkeiten hat. So nutzt es die Investitionen, Neuerungen und Spezialkenntnisse von Anbietern, die intern zu teuer oder gar nicht nachzubauen wären, und verkürzt in schnell wechselnden Märkten Entwicklungszeiten und Risiken.',
          'Übertragen auf KI heißt das: Differenzierend ist eine Fähigkeit, die einen Wettbewerbsvorteil begründet, etwa weil sie auf eigenem Fachwissen und eigenen Daten beruht; sie spricht eher für den Eigenbau. Standardfähigkeiten (commodity) wie Übersetzen, Transkribieren oder das Einordnen von E-Mails bieten viele Anbieter an; hier spricht mehr für den Kauf. Bauen muss bei KI nicht heißen, ein Modell von Grund auf zu trainieren. Häufig ist es ein Mix: Standardbausteine wie ein eingekauftes Sprachmodell werden genutzt, der differenzierende Teil, etwa die eigene Wissensbasis, die Einbindung in die Abläufe oder die Prüfregeln, wird selbst gestaltet. Das KI-Handbuch der britischen Regierung (Government Digital Service, 2025) empfiehlt dafür eine Beschaffungs- und Partnerstrategie, die festlegt, welche Fähigkeiten im eigenen Haus aufgebaut und welche von Partnern bezogen werden.',
        ],
      },
      {
        titel: 'Die weiteren Kriterien',
        absaetze: [
          'Neben der Differenzierung zählen mehrere Kriterien. Die Gesamtbetriebskosten entscheiden oft anders als der Preis, wie der Artikel über den Business-Case zeigt; ein Eigenbau hat keine Lizenz, aber Entwicklung, Betrieb und Pflege. Die Zeit bis zum Nutzen (time to value) spricht nach Quinn und Hilmer eher für den Einkauf. Vorhandene Kompetenz und Kapazität entscheiden, ob ein Eigenbau überhaupt betrieben werden kann, auch dann noch, wenn seine Entwickler das Unternehmen verlassen. Die Datenhoheit fragt, wo Daten verarbeitet werden und wer auf sie zugreifen kann; der Artikel über Datensouveränität vertieft das.',
          'Auch die Regulierung verschiebt die Rechnung. Nach Artikel 25 der KI-Verordnung wird ein Betreiber selbst zum Anbieter eines Hochrisiko-Systems, mit allen Anbieterpflichten, wenn er ein solches System mit seinem Namen oder seiner Marke versieht, es wesentlich verändert oder die Zweckbestimmung eines Systems so ändert, dass es zum Hochrisiko-System wird. Für Systeme nach Anhang III gilt das ab 2. Dezember 2027 (Stand September 2026). Wer ein gekauftes System stark anpasst, kann also rechtlich in die Rolle des Herstellers geraten.',
          'Bleibt die Abhängigkeit vom Anbieter (vendor lock-in). IBM nennt Wechselkosten, Gebühren für den Abzug von Daten und das Risiko, dass ein Anbieter die Preise ändert oder einen Dienst einstellt. Das britische Handbuch rät, schon in den Anforderungen an einen Anbieter Strategien gegen die Abhängigkeit, das Datenformat und die laufende Wartung zu berücksichtigen. Der Data Act der EU, anwendbar seit 12. September 2025, soll zudem den Wechsel zwischen Cloud-Anbietern erleichtern.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Hersteller von Ersatzteilen für Landmaschinen mit 220 Beschäftigten will zwei Dinge: Kundenanfragen in mehreren Sprachen schneller beantworten und Teile anhand eines Fotos erkennen, das ein Landwirt vom Feld schickt. Die Beraterin trennt beides. Übersetzen und Vorsortieren von Anfragen sind Standard; dafür wird ein Dienst eingekauft, nach einem Vergleich der Gesamtkosten, mit geklärtem Verarbeitungsort der Daten und einem Vertrag, der den Export der Daten in einem offenen Format und eine Kündigung ohne lange Bindung erlaubt. Die Teileerkennung dagegen beruht auf dem, was nur dieses Unternehmen hat: Jahrzehnte an Zeichnungen, Stücklisten und Fotos alter Baureihen.',
          'Hier lohnt es sich, selbst zu gestalten, aber nicht bei null. Ein eingekauftes Bildmodell liefert die Grundfähigkeit; das Unternehmen baut die Zuordnung zu seinen Teilenummern, die Prüfung durch den Innendienst und die Pflege des Bildbestands. Dafür braucht es eine interne Verantwortliche und einen Dienstleister, der die Anbindung dokumentiert übergibt. Das Modell wird hinter einer eigenen Schnittstelle gekapselt, damit es später austauschbar bleibt. Die Grenze zwischen Kaufen und Bauen verläuft dort, wo die Differenzierung beginnt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Was differenzierend ist, lässt sich schwerer sagen, als das Raster vermuten lässt. Dass ein Ablauf im eigenen Haus anders läuft als anderswo, macht ihn noch nicht zum Wettbewerbsvorteil; entscheidend ist, ob Kunden den Unterschied bemerken und bezahlen. Die Einschätzung kann zudem schnell kippen: Eine KI-Fähigkeit, die heute nur mit eigener Entwicklung zu haben ist, kann morgen zum Standardumfang gekaufter Software gehören. Wer auf einen Eigenbau setzt, sollte deshalb regelmäßig prüfen, ob der Vorsprung noch besteht. Umgekehrt kann ein Unternehmen, das alles einkauft, die Fähigkeit verlieren, Angebote überhaupt zu beurteilen.',
          'Auch der Eigenbau ist nicht frei von Abhängigkeit. Er bindet an die eigenen Entwickler, an deren Dokumentation und an Wissen, das mit einer Kündigung verschwinden kann. Und die Grenze zwischen Kauf und Eigenbau wird bei KI unscharf, weil auch eine eigene Lösung auf eingekauften Modellen und Cloud-Diensten aufsetzen kann. Die nützlichere Frage lautet deshalb oft nicht „bauen oder kaufen“, sondern: Welche Teile müssen wir verstehen, kontrollieren und austauschen können, und welche dürfen wir einem Anbieter überlassen?',
        ],
      },
    ],
    quellen: [Q.quinnHilmer1994, Q.ukPlaybook, Q.aiActArt25, Q.ibmTco, Q.kommissionDataAct],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'change-management',
    // Akademie: „Der häufigste Grund …“ — nach Bitkom (14.09.2026) liegen andere Hemmnisse vorn.
    einleitung:
      'Ein häufiger Grund, warum gute KI-Technik ungenutzt bleibt: Adoption ist ein Menschen- und Prozessthema, kein Nachgedanke.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Eine KI-Lösung erzeugt Nutzen erst, wenn Menschen und Prozesse sie tatsächlich annehmen, wenn also Beschäftigte sie im Alltag sinnvoll einsetzen und die Abläufe darauf eingestellt sind. Diese Annahme heißt Adoption. Die Freischaltung eines Werkzeugs ist deshalb kein Ergebnis, sondern eine Voraussetzung. Selbst gute Technik bleibt ungenutzt, wenn fünf Dinge fehlen: Kommunikation, die erklärt, wozu das Werkzeug da ist und wozu nicht; Befähigung durch Schulung und Übung; Einbindung der Betroffenen, bevor Entscheidungen feststehen; angepasste Abläufe, in denen klar ist, wer was prüft; und Anreize, die das neue Arbeiten lohnend machen, statt es zu bestrafen.',
          'Dass Adoption kein Selbstläufer ist, zeigt die Bitkom-Befragung vom September 2026: Unter den Unternehmen, die KI bereits einsetzen, nennen 42 Prozent die fehlende Akzeptanz der Beschäftigten als Hemmnis. Zwei Drittel aller befragten Unternehmen schätzen die KI-Kompetenz ihrer Beschäftigten als gering ein; unter den Anwendern bieten 91 Prozent inzwischen Schulungen an. Change-Management gehört deshalb von Anfang an in den Projektplan, mit eigenem Budget und eigener Zeit, und wird nicht nachgereicht, wenn die Nutzungszahlen enttäuschen.',
        ],
      },
      {
        titel: 'Wo die Einführung hakt',
        absaetze: [
          'Ein Raster, um herauszufinden, woran es liegt, ist das ADKAR-Modell des Beratungs- und Schulungsunternehmens Prosci. Es zerlegt Veränderung auf der Ebene der einzelnen Person in fünf beobachtbare Elemente: Bewusstsein für den Grund der Veränderung (awareness), den Wunsch mitzumachen (desire), das Wissen, wie es geht (knowledge), die Fähigkeit, es im Alltag zu tun (ability), und die Verstärkung, die das neue Verhalten hält (reinforcement). Prosci empfiehlt, die früheste Stelle zu suchen, an der jemand hängen bleibt, und dort anzusetzen. Die Elemente folgen aufeinander, aber nicht streng linear, und weil sich KI-Werkzeuge und Abläufe laufend ändern, muss die Einschätzung wiederholt werden.',
          'Die fünf Hebel lassen sich den Elementen zuordnen. Kommunikation schafft Bewusstsein, Einbindung und Anreize wecken den Wunsch, Schulung vermittelt Wissen, Übung an echten Fällen und angepasste Abläufe erzeugen Fähigkeit, Anerkennung und Rückmeldung halten das Ergebnis. Der praktische Wert liegt in der Diagnose: Wer nicht versteht, warum ein Werkzeug eingeführt wird, dem hilft keine zweite Bedienschulung; wer die Bedienung kennt, aber im Tagesgeschäft keine Zeit zum Prüfen hat, dem hilft kein weiterer Rundbrief. ADKAR ist nach Prosci ein Modell für die Veränderung einzelner Menschen, keine vollständige Methode für die ganze Organisation.',
          'Die Befähigung hat seit dem 2. Februar 2025 auch eine rechtliche Seite. Artikel 4 der KI-Verordnung verlangte zunächst, nach besten Kräften sicherzustellen, dass das Personal über ausreichende KI-Kompetenz verfügt. Mit dem KI-Omnibus, in Kraft seit 27. Juli 2026, wurde die Pflicht vereinfacht: Unternehmen müssen Maßnahmen ergreifen, die den Aufbau dieser Kompetenz unterstützen, aber kein bestimmtes Niveau einzelner Personen garantieren; Kommission und Mitgliedstaaten übernehmen eine stärkere Rolle (Stand September 2026). Einzelheiten beschreibt der Artikel über KI-Kompetenz.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Wohnungsbaugenossenschaft mit 150 Beschäftigten führt einen Assistenten ein, der Antworten auf Mieteranfragen vorformuliert. Bevor etwas freigeschaltet wird, spricht die Geschäftsführung mit dem Betriebsrat, wie im Artikel über Mitbestimmung beschrieben, und hält fest, wozu das Werkzeug dient und wozu nicht: keine Auswertung einzelner Beschäftigter. Zwei erfahrene Sachbearbeiterinnen erproben es zuerst mit echten Anfragen und sagen offen, was nicht funktioniert. Die Schulung arbeitet mit Fällen aus dem eigenen Bestand statt mit einer Produktvorführung. Der Ablauf ändert sich: Der Entwurf erscheint im Antwortfeld, wird vor dem Versand geprüft, und für die Prüfung ist Zeit eingeplant.',
          'Nach sechs Wochen nutzt ein Team das Werkzeug kaum. Statt die Nutzung anzuordnen, fragt die Beraterin entlang der fünf Elemente nach und findet die Ursache: Das Team kennt die Bedienung, fürchtet aber, dass mit der gesparten Zeit einfach mehr Fälle zugeteilt werden. Die Geschäftsführung legt fest, dass gewonnene Zeit zunächst in liegen gebliebene Aufgaben fließt. Gemessen wird danach nicht die Zahl der Anmeldungen, sondern Bearbeitungszeit, Nacharbeit und die Rückmeldungen der Mieter.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die verbreitete Formel, die meisten Veränderungsvorhaben scheiterten, steht auf schwachem Grund. Mark Hughes (Journal of Change Management, 2011) hat fünf Veröffentlichungen geprüft, die eine Misserfolgsquote von 70 Prozent nennen, und in keiner einen gültigen und verlässlichen empirischen Beleg gefunden. Ähnlich pauschale Aussagen kursieren über KI-Projekte, auch die, fehlende Akzeptanz sei der häufigste Grund für ungenutzte Technik. In der Bitkom-Befragung 2026 nennen KI-Anwender Datenschutz, rechtliche Unsicherheit und schwer kalkulierbare Kosten häufiger als Hemmnis; die Akzeptanz ist trotzdem für mehr als vier von zehn ein Problem.',
          'ADKAR stammt von einem Anbieter, der Schulungen und Zertifizierungen dazu verkauft; das spricht nicht gegen das Raster, aber für einen nüchternen Umgang damit. Es ordnet Beobachtungen, ersetzt aber nicht die Untersuchung der konkreten Ursache. Schließlich ist hohe Akzeptanz nicht das eigentliche Ziel. Ein Werkzeug, das alle bereitwillig nutzen und niemand mehr prüft, ist ein Risiko; der Artikel über Algorithmus-Aversion und Automation Bias beschreibt beide Ausschläge. Gutes Change-Management zielt auf begründete Nutzung: dort, wo das System verlässlich hilft, und mit Prüfung, wo es an Grenzen stößt.',
        ],
      },
    ],
    quellen: [Q.prosciAdkar, Q.bitkom2026, Q.aiActArt4, Q.kommissionOmnibus, Q.hughes2011],
  },
];
