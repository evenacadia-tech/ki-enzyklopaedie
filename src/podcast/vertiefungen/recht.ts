import type { Quelle } from '../../inhalt/typen';
import type { Vertiefung } from '.';

// Vertiefungen: timeline, tdm-urheberrecht, dsfa, ki-kompetenz, mitbestimmung. Alle Quellen am 2026-09-28 abgerufen
// und geprüft; EUR-Lex im Browser (Skripten bekommen dort nur eine Bot-Abfrage), Amtsblatt-Text gegengelesen.
const AB = '2026-09-28';
const Q = {
  kiVo: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2024/1689 zur Festlegung harmonisierter Vorschriften für künstliche Intelligenz (KI-Verordnung), Text und Dokumentinformationen (EUR-Lex, 2024)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=CELEX:32024R1689',
    abgerufen: AB,
  } satisfies Quelle,
  kiVoKonsolidiert: {
    titel: 'Europäisches Parlament und Rat — Verordnung (EU) 2024/1689 (KI-Verordnung), konsolidierte Fassung vom 27.07.2026 (EUR-Lex, 2026)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:02024R1689-20260727',
    abgerufen: AB,
  } satisfies Quelle,
  omnibusKi: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2026/1744 (Digital-Omnibus-Verordnung zur KI), Amtsblatt L vom 24.07.2026, Text und Dokumentinformationen (EUR-Lex, 2026)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=CELEX:32026R1744',
    abgerufen: AB,
  } satisfies Quelle,
  vorschlagKi: {
    titel:
      'Europäische Kommission — Vorschlag zur Änderung der Verordnungen (EU) 2024/1689 und (EU) 2018/1139 (Digital Omnibus on AI), COM(2025) 836 (EUR-Lex, 2025)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=CELEX:52025PC0836',
    abgerufen: AB,
  } satisfies Quelle,
  vorschlagDaten: {
    titel:
      'Europäische Kommission — Vorschlag zur Vereinfachung des digitalen Rechtsrahmens, u. a. Änderung der Verordnung (EU) 2016/679 (Digital Omnibus), COM(2025) 837 (EUR-Lex, 2025)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=CELEX:52025PC0837',
    abgerufen: AB,
  } satisfies Quelle,
  dsgvo: {
    titel: 'Europäisches Parlament und Rat — Verordnung (EU) 2016/679 (Datenschutz-Grundverordnung), Text und Dokumentinformationen (EUR-Lex, 2016)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/ALL/?uri=CELEX:32016R0679',
    abgerufen: AB,
  } satisfies Quelle,
  dskMussListe: {
    titel:
      'Datenschutzkonferenz (DSK) — Liste der Verarbeitungstätigkeiten, für die eine DSFA durchzuführen ist, nicht-öffentlicher Bereich, Version 1.1 (DSK, 2018)',
    url: 'https://www.datenschutzkonferenz-online.de/media/ah/20181017_ah_DSK_DSFA_Muss-Liste_Version_1.1_Deutsch.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  dskOhKi: {
    titel: 'Datenschutzkonferenz (DSK) — Orientierungshilfe Künstliche Intelligenz und Datenschutz, Version 1.0 (DSK, 2024)',
    url: 'https://www.datenschutzkonferenz-online.de/media/oh/20240506_DSK_Orientierungshilfe_KI_und_Datenschutz.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  urhg: {
    titel: 'Bundesministerium der Justiz — Urheberrechtsgesetz (UrhG), u. a. §§ 16, 44b, 60d (gesetze-im-internet.de, o. J.)',
    url: 'https://www.gesetze-im-internet.de/urhg/BJNR012730965.html',
    abgerufen: AB,
  } satisfies Quelle,
  btDrsDsm: {
    titel:
      'Bundesregierung — Entwurf eines Gesetzes zur Anpassung des Urheberrechts an die Erfordernisse des digitalen Binnenmarktes, Drucksache 19/27426 (Deutscher Bundestag, 2021)',
    url: 'https://dserver.bundestag.de/btd/19/274/1927426.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  bghLaion: {
    titel:
      'Bundesgerichtshof — Verkündungstermin am 17. Dezember 2026 in Sachen I ZR 281/25 (Erstellen eines Datensatzes für KI-Training), Terminhinweis (BGH, 2026)',
    url: 'https://www.bundesgerichtshof.de/SharedDocs/Termine/DE/Termine/IZR281-25.html',
    abgerufen: AB,
  } satisfies Quelle,
  wipoLaion: {
    titel:
      'WIPO Lex — Hamburg Regional Court, Germany [2024]: Robert Kneschke v. LAION e.V., Case No. 310 O 227/23 (World Intellectual Property Organization, 2024)',
    url: 'https://www.wipo.int/wipolex/en/judgments/details/2381',
    abgerufen: AB,
  } satisfies Quelle,
  litQa: {
    titel: 'Europäische Kommission — AI Literacy: Questions & Answers, Stand 27.07.2026 (Shaping Europe’s digital future, 2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers',
    abgerufen: AB,
  } satisfies Quelle,
  betrvg: {
    titel: 'Bundesministerium der Justiz — Betriebsverfassungsgesetz (BetrVG), u. a. §§ 76, 80, 87, 90, 95 (gesetze-im-internet.de, o. J.)',
    url: 'https://www.gesetze-im-internet.de/betrvg/BJNR000130972.html',
    abgerufen: AB,
  } satisfies Quelle,
  bagFacebook: {
    titel: 'Bundesarbeitsgericht — Beschluss vom 13.12.2016, 1 ABR 7/15, Mitbestimmung bei Einrichtung und Betrieb einer Facebookseite (BAG, 2016)',
    url: 'https://www.bundesarbeitsgericht.de/entscheidung/1-abr-7-15/',
    abgerufen: AB,
  } satisfies Quelle,
  arbgHamburg: {
    titel:
      'Arbeitsgericht Hamburg — Beschluss vom 16.01.2024, 24 BVGa 1/24, Mitbestimmung des Betriebsrats beim Einsatz von ChatGPT (Landesrecht Hamburg, 2024)',
    url: 'https://www.landesrecht-hamburg.de/bsha/document/NJRE001564562',
    abgerufen: AB,
  } satisfies Quelle,
};

export const recht: Vertiefung[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'timeline',
    // Akademie: „Der AI Act tritt gestaffelt in Kraft“ — in Kraft ist er seit 2024, gestaffelt ist nur die Geltung.
    einleitung:
      'Der AI Act ist seit August 2024 in Kraft, seine Pflichten gelten aber gestaffelt; der Digital Omnibus hat 2026 die Hochrisiko-Fristen verschoben — der genaue Stand gehört zu den Fakten im Fluss.',
    abschnitte: [
      {
        titel: 'In Kraft heißt noch nicht anwendbar',
        absaetze: [
          'Die KI-Verordnung der EU, Verordnung (EU) 2024/1689, im Englischen AI Act, ist am 1. August 2024 in Kraft getreten. Damit gibt es sie als Recht; ab wann eine einzelne Pflicht tatsächlich gilt, regelt ihr Artikel 113 gesondert, und zwar gestaffelt. Zuerst kamen die Verbote, zuletzt kommen die Pflichten für Hochrisiko-Systeme. Die Reihenfolge folgt dem Aufwand: Eine verbotene Praxis muss man nur unterlassen, ein Hochrisiko-System braucht dagegen Risikomanagement, technische Dokumentation und eine Konformitätsbewertung, also Nachweise, für die Normen und Prüfstrukturen bereitstehen müssen. Für die Beratung folgt daraus eine feste Reihenfolge der Fragen: In welche Kategorie der Verordnung fällt ein System, und ab welchem Tag gelten die Pflichten dieser Kategorie? Ein Datum ohne Kategorie sagt nichts.',
        ],
      },
      {
        titel: 'Die Stufen, Stand September 2026',
        absaetze: [
          'Seit dem 2. Februar 2025 gelten die allgemeinen Bestimmungen und die Verbote, darunter die Pflicht zur KI-Kompetenz in Artikel 4. Seit dem 2. August 2025 gelten die Regeln für KI-Modelle mit allgemeinem Verwendungszweck (general-purpose AI, GPAI), die Governance-Vorschriften und der Sanktionsrahmen; nur die Geldbußen der Kommission gegen GPAI-Anbieter in Artikel 101 kamen erst mit dem allgemeinen Geltungsbeginn am 2. August 2026. Seit diesem Tag gilt fast der ganze Rest der Verordnung, darunter die Transparenzpflichten des Artikels 50, etwa der Hinweis, dass man mit einem KI-System spricht; ausgenommen sind die Hochrisiko-Pflichten. GPAI-Modelle, die schon vor dem 2. August 2025 auf dem Markt waren, müssen ihre Pflichten bis zum 2. August 2027 erfüllen.',
          'Die Hochrisiko-Pflichten gelten ab dem 2. Dezember 2027 für eigenständige Systeme nach Anhang III, etwa in der Personalauswahl oder bei der Kreditwürdigkeitsprüfung, und ab dem 2. August 2028 für Systeme nach Anhang I, die Sicherheitsbauteil eines regulierten Produkts wie einer Maschine oder eines Aufzugs sind. Ursprünglich vorgesehen waren der 2. August 2026 und der 2. August 2027. Ab dem 2. Dezember 2026 kommen zwei neue Verbote hinzu: für Systeme, die ohne ausdrückliche Zustimmung realistische Darstellungen intimer Körperteile oder sexueller Handlungen einer bestimmbaren Person erzeugen, und für Systeme, die Darstellungen sexuellen Kindesmissbrauchs erzeugen. Bis zum selben Tag haben Anbieter generativer Systeme, die schon vor dem 2. August 2026 in Verkehr gebracht wurden, Zeit, deren Ausgaben nach Artikel 50 Absatz 2 maschinenlesbar zu kennzeichnen. Hochrisiko-Systeme für Behörden, die schon vor diesen Terminen auf dem Markt waren, müssen spätestens am 2. August 2030 konform sein.',
        ],
      },
      {
        titel: 'Was der Digital Omnibus geändert hat',
        absaetze: [
          'Die Kommission legte am 19. November 2025 den Vorschlag für den „Digital Omnibus on AI“ vor, ein Paket gezielter Vereinfachungen. Sie wollte den Start der Hochrisiko-Pflichten an einen eigenen Beschluss knüpfen, der bestätigt, dass Normen und Hilfsmittel verfügbar sind, mit dem 2. Dezember 2027 und dem 2. August 2028 als spätesten Terminen. Parlament und Rat haben stattdessen feste Daten ins Gesetz geschrieben. Das Parlament stimmte am 16. Juni 2026 zu, der Rat am 29. Juni; die Verordnung (EU) 2026/1744 erschien am 24. Juli im Amtsblatt und trat am 27. Juli 2026 in Kraft, sechs Tage vor dem alten Stichtag. EUR-Lex führt sie als bislang einzige Änderung der KI-Verordnung; alle anderen Einträge sind Berichtigungen.',
          'Begründet wird die Verschiebung im Änderungsakt selbst: Normen, gemeinsame Spezifikationen und Leitlinien lagen verspätet vor, die nationalen Behörden waren verspätet eingerichtet, und ein Festhalten am alten Termin hätte die Umsetzungskosten ungerechtfertigt erhöht. Der Omnibus hat aber mehr getan als Fristen verschoben. Er hat die Pflicht zur KI-Kompetenz abgeschwächt, die genannten Verbote ergänzt, die Kennzeichnungsfrist für ältere generative Systeme eingeführt und für kleine Unternehmen mit mittlerer Kapitalisierung (small mid-caps) jeweils den niedrigeren Bußgeldrahmen vorgesehen. Die Starttermine der bisherigen Verbote, der GPAI-Pflichten und des Artikels 50 hat er nicht bewegt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Personaldienstleister mit 60 Beschäftigten will im Herbst 2026 seine KI-Vorhaben ordnen. Der Chatbot auf der Website, der Bewerbern Fragen beantwortet, fällt unter Artikel 50: Seit dem 2. August 2026 muss erkennbar sein, dass man mit einer KI spricht, und der Dienstleister prüft, ob sein Anbieter das System so gestaltet hat. Das geplante Werkzeug, das Bewerbungen sichtet und filtert, steht in Anhang III und ist ein Hochrisiko-System; seine Pflichten gelten ab dem 2. Dezember 2027. Die Beraterin rät dennoch nicht zum Abwarten, denn die KI-Verordnung lässt das Datenschutzrecht unberührt, und das gilt für Bewerberdaten schon heute. Die Schulung der Mitarbeitenden ist ohnehin fällig. Am Ende steht eine Tabelle mit System, Kategorie, Stichtag und Verantwortlichen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Der Omnibus zeigt, dass Fristen im EU-Recht beweglich sind, und er zeigt, wie spät Klarheit kam. Bis zum Inkrafttreten am 27. Juli 2026 galt rechtlich der alte, strengere Zeitplan, und der Mechanismus aus dem Vorschlag vom November 2025, der den Start an einen Kommissionsbeschluss knüpfen sollte, ist im Gesetz nicht angekommen. Die einzige verlässliche Regel lautet deshalb: auf den frühesten verbindlichen Termin planen und jede weitere Verschiebung als Puffer behandeln. Eine zweite Grenze liegt in der Übergangsregel des Artikels 111 Absatz 2: Hochrisiko-Systeme, die vor Beginn der Hochrisiko-Pflichten in Verkehr gebracht wurden, fallen nur bei einer erheblichen Änderung ihrer Konzeption unter die Verordnung, und nach den Erwägungsgründen des Omnibus reicht dafür, dass eine Einheit desselben Typs rechtzeitig auf dem Markt war. Nur für Behörden endet diese Schonung am 2. August 2030.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibusKi, Q.vorschlagKi],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'tdm-urheberrecht',
    // Akademie: „Die Rechtsgrundlage, auf der KI … trainiert werden darf“ — stellt als geklärt dar, was vor dem BGH liegt.
    einleitung:
      'Die gesetzlichen Erlaubnisse, auf die sich das Training von KI an fremden Werken in Deutschland stützen kann — samt des entscheidenden Opt-out-Vorbehalts; wie weit sie reichen, ist noch nicht abschließend geklärt.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Wer ein KI-Modell mit Texten, Bildern oder Musik aus dem Netz trainiert, fertigt Kopien fremder Werke an. Im Verfahren um den Datensatz LAION hat das Oberlandesgericht Hamburg schon das Herunterladen eines Vorschaubilds als Vervielfältigung im Sinne des § 16 UrhG gewertet. Für jede Vervielfältigung braucht man die Zustimmung des Rechteinhabers oder eine gesetzliche Erlaubnis, eine sogenannte Schranke. Dass ein Werk öffentlich im Netz steht, ersetzt keines von beiden: Frei ist der Zugang, nicht die Kopie. Das Urheberrechtsgesetz enthält für das automatisierte Auswerten zwei Schranken. § 44b definiert Text und Data Mining (TDM) als automatisierte Analyse digitaler oder digitalisierter Werke, um daraus Informationen insbesondere über Muster, Trends und Korrelationen zu gewinnen. Nach der Gesetzesbegründung setzt § 44b den Artikel 4 und § 60d den Artikel 3 der EU-Richtlinie (EU) 2019/790 über das Urheberrecht im digitalen Binnenmarkt um.',
        ],
      },
      {
        titel: 'Zwei Schranken mit verschiedenen Regeln',
        absaetze: [
          '§ 44b erlaubt Vervielfältigungen rechtmäßig zugänglicher Werke für das Text und Data Mining, nach der Begründung ohne Einschränkung beim Kreis der Berechtigten oder beim Zweck, also auch für Unternehmen. Rechtmäßig zugänglich ist ein Werk etwa, wenn es frei im Internet steht oder der Nutzer über eine Lizenz Zugang hat. Die Kopien sind zu löschen, sobald sie für das Mining nicht mehr erforderlich sind. Vor allem gilt die Erlaubnis nur, wenn sich der Rechteinhaber die Nutzung nicht vorbehalten hat; bei online zugänglichen Werken ist ein solcher Nutzungsvorbehalt (Opt-out) nur wirksam, wenn er maschinenlesbar ist. Nach der Begründung darf er auch im Impressum oder in den Geschäftsbedingungen stehen, sofern er dort maschinenlesbar ist, wirkt nur für die Zukunft, und die Beweislast dafür, dass kein Vorbehalt bestand, trägt der Nutzer. Eine Vergütung sieht § 44b nicht vor.',
          '§ 60d ist enger und zugleich stärker. Er berechtigt Forschungsorganisationen, also Hochschulen, Forschungsinstitute und andere forschende Einrichtungen, die nicht kommerzielle Zwecke verfolgen, alle Gewinne in die Forschung reinvestieren oder in staatlich anerkanntem öffentlichem Auftrag handeln. Einen Vorbehalt kann der Rechteinhaber hier nicht erklären. Ausgeschlossen ist aber eine Einrichtung, die mit einem privaten Unternehmen zusammenarbeitet, das bestimmenden Einfluss auf sie und bevorzugten Zugang zu den Ergebnissen hat. Auf EU-Ebene kommt seit dem 2. August 2025 Artikel 53 der KI-Verordnung hinzu: Anbieter von KI-Modellen mit allgemeinem Verwendungszweck müssen eine Strategie zur Einhaltung des Urheberrechts auf den Weg bringen, die Vorbehalte nach Artikel 4 Absatz 3 der Richtlinie auch mit modernsten Technologien ermittelt und einhält, und eine Zusammenfassung der Trainingsinhalte veröffentlichen. Anbieter von Modellen, die schon vorher auf dem Markt waren, müssen das bis zum 2. August 2027 nachholen.',
        ],
      },
      {
        titel: 'Der Fall Kneschke gegen LAION',
        absaetze: [
          'Der Fotograf Robert Kneschke klagte gegen den gemeinnützigen Verein LAION, der einen frei verfügbaren Datensatz mit 5,85 Milliarden Bild-Text-Paaren bereitstellt, mit dem sich generative KI trainieren lässt. Der Verein lud 2021 Bilder herunter, darunter das Vorschaubild einer Fotografie des Klägers von der Website einer Bildagentur, und prüfte per Software, ob Bild und Beschreibung zusammenpassen. Die Agentur hatte in natürlicher Sprache den Zugriff durch „automated programs, applets, bots or the like“ untersagt. Das Landgericht Hamburg wies die Klage am 27. September 2024 ab, das Oberlandesgericht die Berufung am 10. Dezember 2025. Nach dem Oberlandesgericht war schon der Abgleich von Bild und Beschreibung Text und Data Mining; dass der Vorbehalt 2021 maschinenlesbar war, habe der Kläger nicht dargelegt. Zudem greife § 60d, weil die Erstellung des Datensatzes angewandte Forschung sei, auch wenn kommerzielle Anbieter ihn nutzen können. Über die zugelassene Revision hat der Bundesgerichtshof am 3. September 2026 verhandelt und will am 17. Dezember 2026 seine Entscheidung verkünden.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Softwarehaus mit 40 Beschäftigten will ein zugekauftes Sprachmodell mit Fachartikeln aus dem Netz nachtrainieren, um einen Assistenten für Steuerkanzleien zu bauen. Die Beraterin trennt zwei Ebenen. Für das Basismodell ist dessen Anbieter nach Artikel 53 verantwortlich; seine Urheberrechtsstrategie und die veröffentlichte Zusammenfassung der Trainingsinhalte gehören deshalb in die Prüfung vor dem Einkauf. Die gesammelten Fachartikel dagegen sind eigenes Text und Data Mining nach § 44b. Also liest die Datenpipeline vor jedem Abruf maschinenlesbare Vorbehalte aus und lässt betroffene Quellen weg, hält je Quelle fest, was beim Abruf galt, weil im Streit der Nutzer den fehlenden Vorbehalt beweisen muss, und löscht Rohkopien, sobald sie nicht mehr gebraucht werden. Auf § 60d kann sich das Softwarehaus nicht stützen, denn es ist keine Forschungsorganisation.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Zentrale Fragen sind Stand September 2026 offen. Das Oberlandesgericht hat offengelassen, ob das spätere Training generativer Modelle selbst Text und Data Mining ist; es kam darauf nicht an, weil schon der Abgleich von Bild und Beschreibung genügte. Ungeklärt ist auch, wann ein Vorbehalt maschinenlesbar ist. Das Gericht hat einen Satz in natürlicher Sprache für 2021 nicht als maschinenlesbar anerkannt, weil der Kläger das nicht dargelegt hatte; ob das angesichts heutiger Sprachmodelle anders zu sehen ist, bleibt offen. Wer heute trainiert, trägt deshalb ein Rechtsrisiko, das sich durch Lizenzen und sorgfältige Dokumentation begrenzen, aber nicht ausschließen lässt. Für Rechteinhaber bleibt ein Grundproblem: § 44b sieht keine Vergütung vor, ihr einziges Werkzeug ist der Vorbehalt, und der wirkt nur für die Zukunft. Nutzungen vor seiner Erklärung erfasst er nicht.',
        ],
      },
    ],
    quellen: [Q.urhg, Q.btDrsDsm, Q.kiVoKonsolidiert, Q.bghLaion, Q.wipoLaion],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'dsfa',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die Datenschutz-Folgenabschätzung (DSFA, englisch data protection impact assessment) ist eine Prüfung vor der Verarbeitung, nicht danach. Artikel 35 Absatz 1 DSGVO verlangt sie, wenn eine Verarbeitung, insbesondere bei Verwendung neuer Technologien, aufgrund ihrer Art, ihres Umfangs, ihrer Umstände und Zwecke voraussichtlich ein hohes Risiko für die Rechte und Freiheiten natürlicher Personen zur Folge hat. Ähnliche Verarbeitungen mit ähnlichen Risiken dürfen in einer Abschätzung zusammengefasst werden; ist ein Datenschutzbeauftragter benannt, holt der Verantwortliche seinen Rat ein. Absatz 3 nennt drei Fälle, in denen die Abschätzung insbesondere erforderlich ist. Für KI besonders wichtig ist der erste: eine systematische und umfassende Bewertung persönlicher Aspekte auf Grundlage automatisierter Verarbeitung einschließlich Profiling, die als Grundlage für Entscheidungen mit Rechtswirkung oder ähnlich erheblicher Beeinträchtigung dient.',
          'Den Mindestinhalt legt Absatz 7 fest: eine systematische Beschreibung der geplanten Verarbeitung und ihrer Zwecke, eine Bewertung ihrer Notwendigkeit und Verhältnismäßigkeit, eine Bewertung der Risiken für die Betroffenen und die geplanten Abhilfemaßnahmen. Gegebenenfalls holt der Verantwortliche den Standpunkt der Betroffenen oder ihrer Vertreter ein. Ändert sich das Risiko, ist zu überprüfen, ob die Verarbeitung noch der Abschätzung entspricht. Bleibt ein hohes Risiko, das der Verantwortliche nicht eindämmt, muss er vor Beginn die Aufsichtsbehörde konsultieren (Artikel 36). Hält sie die Verarbeitung für unvereinbar mit der DSGVO, gibt sie innerhalb von bis zu acht Wochen schriftliche Empfehlungen; bei komplexen Vorhaben kann sie die Frist um sechs Wochen verlängern.',
        ],
      },
      {
        titel: 'Wann KI eine DSFA auslöst',
        absaetze: [
          'Nach Artikel 35 Absatz 4 veröffentlichen die Aufsichtsbehörden Listen der Verarbeitungen, für die eine DSFA Pflicht ist. Für Unternehmen gilt die Liste der Datenschutzkonferenz (DSK) für den nicht-öffentlichen Bereich, Version 1.1 von 2018; für Behörden gibt es eigene Listen. Nummer 11 nennt ausdrücklich den Einsatz künstlicher Intelligenz, um die Interaktion mit Betroffenen zu steuern oder persönliche Aspekte zu bewerten, etwa ein Callcenter, das die Stimmungslage der Anrufer automatisiert auswertet, oder ein System, das Kunden im Gespräch berät und dabei personenbezogene Daten verarbeitet. Nummer 8 erfasst umfangreiche Verhaltensdaten Beschäftigter, die zur Bewertung ihrer Arbeit so genutzt werden können, dass Rechtsfolgen oder erhebliche Beeinträchtigungen drohen. Die Liste ist ausdrücklich nicht abschließend und stützt sich auf neun Kriterien aus dem europäischen Arbeitspapier WP 248, darunter Bewerten oder Einstufen (Scoring), systematische Überwachung und die innovative Nutzung neuer Technologien. In ihrer Orientierungshilfe zu KI von 2024 hält die DSK fest, dass eine DSFA beim Einsatz von KI-Anwendungen vielfach erforderlich sein wird.',
        ],
      },
      {
        titel: 'DSFA und Grundrechte-Folgenabschätzung',
        absaetze: [
          'Die KI-Verordnung ersetzt die DSFA nicht; nach ihrem Artikel 2 Absatz 7 bleibt die DSGVO unberührt, beide gelten kumulativ. Bei Hochrisiko-KI, die personenbezogene Daten verarbeitet, ist eine DSFA regelmäßig einschlägig, und Artikel 26 Absatz 9 knüpft daran an: Betreiber solcher Systeme nutzen gegebenenfalls die Angaben des Anbieters aus Artikel 13 für ihre DSFA. Für manche Betreiber kommt die Grundrechte-Folgenabschätzung (fundamental rights impact assessment, FRIA) nach Artikel 27 hinzu: für Einrichtungen des öffentlichen Rechts, private Anbieter öffentlicher Dienste und Betreiber von Systemen zur Kreditwürdigkeitsprüfung sowie zur Risikobewertung und Preisbildung in Lebens- und Krankenversicherungen. Sie fragt nach den Folgen für die Grundrechte insgesamt, nach betroffenen Gruppen, Schadensrisiken, menschlicher Aufsicht und Beschwerdewegen, und ihr Ergebnis geht an die Marktüberwachungsbehörde. Seit dem Digital Omnibus darf der Betreiber dafür auf Abschnitte seiner DSFA verweisen oder sie übernehmen. Die FRIA gilt für Anhang-III-Systeme ab dem 2. Dezember 2027, die DSFA schon heute.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Onlinehändler für Fahrräder mit 80 Beschäftigten will einen KI-Assistenten einführen, der Kunden im Chat berät und dafür auf ihre Bestellhistorie zugreift. Die Beraterin prüft zuerst die Muss-Liste: Ein System, das mit Kunden im Gespräch interagiert und für ihre Beratung personenbezogene Daten verarbeitet, entspricht dem Beispiel unter Nummer 11, die DSFA ist also vor dem Start fällig. Weil der Händler das System einkauft, braucht er vom Anbieter Angaben zu Funktionsweise, Datenflüssen und Speicherorten; die DSK weist darauf hin, dass Verantwortliche auf diese Informationen angewiesen sind und schon bei der Auswahl darauf achten müssen. Die Abschätzung zeigt ein Risiko, an das vorher niemand gedacht hatte: Kunden schildern im Chat Rückenleiden oder Verletzungen, um ein passendes Rad zu finden, und geben damit Gesundheitsdaten preis. Die Abhilfen sind ein Hinweis vor dem Chat, kurze Löschfristen für Gesprächsverläufe, kein Training mit Kundengesprächen und ein Datenschutzbeauftragter, der von Beginn an beteiligt ist.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Eine DSFA ist keine Genehmigung. Sie dokumentiert eine Abwägung, und ihr Wert hängt davon ab, ob sie die Einführung noch gestaltet oder nachträglich als Formular ausgefüllt wird. Ihr Maßstab ist der Schutz personenbezogener Daten; ob ein System Gruppen benachteiligt, ohne dass ein Datenschutzproblem sichtbar wird, erfasst sie nur am Rand, und die Grundrechte-Folgenabschätzung setzt hier breiter an, trifft aber nur bestimmte Betreiber. Die deutsche Muss-Liste stammt von 2018, ihre Beispiele zu KI sind knapp, und wer nur prüft, ob ein Vorhaben wörtlich auf der Liste steht, übersieht, dass sie nicht abschließend ist. Auch das Verfahren ist in Bewegung: Die Kommission hat am 19. November 2025 vorgeschlagen, die nationalen Listen durch eine einheitliche EU-Liste samt gemeinsamer Vorlage und Methodik zu ersetzen. Beschlossen ist das Stand September 2026 nicht; die DSGVO ist bislang unverändert.',
        ],
      },
    ],
    quellen: [Q.dsgvo, Q.dskMussListe, Q.dskOhKi, Q.kiVoKonsolidiert, Q.vorschlagDaten],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ki-kompetenz',
    // Akademie: „Betreiber müssen für ausreichende KI-Kompetenz … sorgen“ — seit dem 27.07.2026 (VO (EU) 2026/1744) überholt.
    einleitung:
      'Eine oft übersehene Pflicht, die für alle gilt, die KI anbieten oder einsetzen, gleich in welcher Risikoklasse: Sie müssen die KI-Kompetenz ihrer Beschäftigten fördern. Seit Juli 2026 verlangt das Gesetz dafür Maßnahmen, aber kein garantiertes Niveau.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'KI-Kompetenz (AI literacy) definiert die KI-Verordnung in Artikel 3 Nummer 56 als die Fähigkeiten, Kenntnisse und das Verständnis, die es Anbietern, Betreibern und Betroffenen ermöglichen, KI-Systeme sachkundig einzusetzen und sich der Chancen und Risiken von KI und möglicher Schäden bewusst zu werden. Artikel 4 macht daraus eine Pflicht für alle, die KI-Systeme anbieten oder einsetzen, unabhängig von der Risikoklasse. Sie steht in Kapitel I und gilt deshalb seit dem 2. Februar 2025, zusammen mit den Verboten. Erfasst sind das eigene Personal und andere Personen, die im Auftrag mit dem Betrieb und der Nutzung von KI-Systemen befasst sind; die Kommission nennt als Beispiele Auftragnehmer, Dienstleister und Kunden.',
          'In der ursprünglichen Fassung mussten Anbieter und Betreiber Maßnahmen ergreifen, um nach besten Kräften sicherzustellen, dass diese Personen über ein ausreichendes Maß an KI-Kompetenz verfügen, gemessen an ihren technischen Kenntnissen, ihrer Erfahrung, Ausbildung und Schulung, am Einsatzkontext und an den Personen, bei denen die Systeme eingesetzt werden. Diese Fassung ist seit dem 27. Juli 2026 überholt; wo noch von einer Pflicht zu ausreichender Kompetenz die Rede ist, beschreibt das den früheren Stand.',
        ],
      },
      {
        titel: 'Was der Digital Omnibus geändert hat',
        absaetze: [
          'Die Kommission schlug am 19. November 2025 vor, die Pflicht von den Unternehmen zu nehmen: Kommission und Mitgliedstaaten sollten Anbieter und Betreiber nur noch dazu anhalten, für ausreichende Kompetenz zu sorgen. Parlament und Rat sind dem nicht gefolgt. Seit dem Inkrafttreten der Verordnung (EU) 2026/1744 am 27. Juli 2026 ergreifen Anbieter und Betreiber Maßnahmen, um die Entwicklung der KI-Kompetenz ihres Personals und der in ihrem Auftrag tätigen Personen zu unterstützen, mit demselben Maßstab wie zuvor. Neu ist der Satz, dass diese Pflicht nicht dazu verpflichtet, für irgendeine Person ein bestimmtes Niveau zu garantieren. Kommission und Mitgliedstaaten sollen die Unternehmen, besonders kleine und mittlere, unterstützen; die Kommission veröffentlicht Praxisbeispiele, und das KI-Gremium (AI Board) soll Empfehlungen mit gemeinsamen Zielen annehmen. Begründet wird die Änderung damit, dass strenge Vorgaben nicht für alle Unternehmen passen und gerade kleinere zusätzlich belasten.',
        ],
      },
      {
        titel: 'Was ein Programm leisten sollte',
        absaetze: [
          'Wie die Pflicht zu erfüllen ist, lässt die Verordnung offen. Die Kommission nennt in ihren Fragen und Antworten zur KI-Kompetenz, zuletzt aktualisiert am 27. Juli 2026, Mindestüberlegungen: ein allgemeines Verständnis von KI in der Organisation, die eigene Rolle als Anbieter oder Betreiber, das Risiko der eingesetzten Systeme und darauf aufbauend Maßnahmen, die Vorwissen, Einsatzkontext und betroffene Personen berücksichtigen. Sich allein auf die Gebrauchsanweisung zu verlassen, kann nach der Kommission in vielen Fällen unwirksam sein. Ein Zertifikat ist nicht nötig; Organisationen können ein internes Verzeichnis ihrer Schulungen und anderen Maßnahmen führen, und eine Pflicht, das Wissen der Beschäftigten zu messen, besteht nicht. Für Betreiber von Hochrisiko-Systemen kommt, sobald deren Pflichten gelten, Artikel 26 Absatz 2 hinzu: Die menschliche Aufsicht ist Personen mit der erforderlichen Kompetenz, Ausbildung und Befugnis zu übertragen. Überwacht wird Artikel 4 von den nationalen Marktüberwachungsbehörden, nach Angaben der Kommission seit August 2026.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine Steuerberatungskanzlei mit 30 Beschäftigten führt einen Sprachassistenten ein, der Mandantenschreiben entwirft und Belege vorsortiert. Die Beraterin schlägt keine Einheitsschulung vor, sondern Maßnahmen nach Rollen. Die Sachbearbeitung übt an echten Fällen, woran man erfundene Angaben erkennt, welche Mandantendaten nicht in das Werkzeug gehören und wann ein Entwurf an die Berufsträgerin geht. Die Partner klären, welche Verantwortung beim Einsatz bei ihnen bleibt. Die Person, die das System betreut, lernt Einstellungen, Protokolle und den Umgang mit Vorfällen. Jede Maßnahme wird mit Datum und Teilnehmenden festgehalten; nach einem halben Jahr prüft die Kanzlei an Stichproben, ob die Entwürfe tatsächlich kontrolliert werden. So erfüllt sie die weichere Pflicht und erreicht zugleich, wozu die Pflicht gedacht ist.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die neue Fassung ist schwerer zu greifen als die alte. Sie verlangt Maßnahmen, aber kein Ergebnis, und nennt kein Mindestmaß; ob eine Maßnahme genügt, beurteilen die nationalen Behörden, und die Sanktionen richten sich nach nationalem Recht. Das senkt den Druck, Kompetenz tatsächlich herzustellen, und kann im schlechtesten Fall Teilnahmelisten statt Fähigkeiten belohnen. Die Kommission betont, dass Sanktionen verhältnismäßig sein müssen und eher in Betracht kommen, wenn ein Vorfall auf fehlende Schulung zurückgeht. Für die Praxis heißt das: Die rechtliche Latte liegt niedriger, der praktische Bedarf nicht. Wer Beschäftigte mit einem System arbeiten lässt, dessen Grenzen sie nicht kennen, trägt das Risiko fehlerhafter Ergebnisse, gleich wie Artikel 4 formuliert ist.',
        ],
      },
    ],
    quellen: [Q.kiVo, Q.omnibusKi, Q.vorschlagKi, Q.litQa],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'mitbestimmung',
    // Akademie: „Betriebsrat und Mitbestimmung sind … zwingend“ — gilt nur bei Eignung zur Überwachung (ArbG Hamburg 24 BVGa 1/24).
    einleitung:
      'Sobald KI Beschäftigte betrifft, kommen deutsche Besonderheiten ins Spiel: Wo ein Betriebsrat besteht, ist er bei der Planung zu unterrichten, und kann ein System Verhalten oder Leistung überwachen, bestimmt er mit.',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Wo ein Betriebsrat besteht, wird er bei der Einführung von KI nicht nur informiert, sondern bestimmt unter Umständen mit. Nach § 87 Absatz 1 Nummer 6 des Betriebsverfassungsgesetzes (BetrVG) bestimmt er mit bei der Einführung und Anwendung technischer Einrichtungen, die dazu bestimmt sind, das Verhalten oder die Leistung der Arbeitnehmer zu überwachen. „Bestimmt“ heißt dabei nicht, dass der Arbeitgeber überwachen will. Nach dem Bundesarbeitsgericht genügt, dass eine Einrichtung objektiv geeignet ist, Verhaltens- oder Leistungsinformationen über Beschäftigte zu erheben und aufzuzeichnen; auf die Überwachungsabsicht kommt es nicht an. Die Überwachung muss allerdings durch die technische Einrichtung selbst bewirkt werden. Einigen sich Arbeitgeber und Betriebsrat nicht, entscheidet die Einigungsstelle, besetzt mit gleich vielen Beisitzern beider Seiten und einem unparteiischen Vorsitzenden; ihr Spruch ersetzt die Einigung.',
          'Der Zweck ist der Schutz der Person: Das Mitbestimmungsrecht soll Beschäftigte vor Beeinträchtigungen ihres Persönlichkeitsrechts durch technische Überwachung bewahren, die nicht durch schutzwerte Belange des Arbeitgebers gerechtfertigt und unverhältnismäßig ist, wie das Arbeitsgericht Hamburg unter Berufung auf das Bundesarbeitsgericht festhält. Ein KI-System erfüllt die Voraussetzung, wenn es etwa für den Arbeitgeber abrufbar protokolliert, wer wann welche Anfrage gestellt hat, oder Arbeitsergebnisse einzelner Personen auswertet. Ob es nach der KI-Verordnung ein Hochrisiko-System ist, spielt für § 87 keine Rolle; das Betriebsverfassungsrecht fragt nur nach der Eignung zur Überwachung.',
        ],
      },
      {
        titel: 'Weitere Rechte bei KI',
        absaetze: [
          'Das BetrVG nennt künstliche Intelligenz an drei Stellen ausdrücklich. Nach § 90 muss der Arbeitgeber den Betriebsrat über die Planung von Arbeitsverfahren und Arbeitsabläufen einschließlich des Einsatzes von KI rechtzeitig und mit den erforderlichen Unterlagen unterrichten und die Auswirkungen auf die Beschäftigten so rechtzeitig beraten, dass Vorschläge und Bedenken noch in die Planung eingehen. Ein Vetorecht folgt daraus nicht; das Arbeitsgericht Hamburg spricht von Unterrichtungs- und Beratungsrechten ohne Mitbestimmung. Richtlinien über die personelle Auswahl bei Einstellungen, Versetzungen, Umgruppierungen und Kündigungen brauchen nach § 95 die Zustimmung des Betriebsrats, nach Absatz 2a auch dann, wenn bei ihrer Aufstellung KI eingesetzt wird. Und muss der Betriebsrat die Einführung oder Anwendung von KI beurteilen, gilt die Hinzuziehung eines Sachverständigen nach § 80 Absatz 3 als erforderlich; eine nähere Vereinbarung mit dem Arbeitgeber bleibt nötig.',
        ],
      },
      {
        titel: 'Datenschutz und KI-Verordnung',
        absaetze: [
          'Verarbeitet ein KI-System personenbezogene Daten von Beschäftigten, auch bloße Nutzungsdaten, gilt daneben der Datenschutz. Die Datenschutzkonferenz empfiehlt in ihrer Orientierungshilfe zu KI klare interne Regeln für den Einsatz, etwa in einer Betriebsvereinbarung, die stete Einbindung der Datenschutzbeauftragten und die Prüfung einer Beteiligung des Betriebsrats; sie rät zu dienstlichen Geräten und Konten, weil bei privaten Konten Profile einzelner Beschäftigter entstehen können. Die KI-Verordnung ergänzt das: Arbeitgeber, die ein Hochrisiko-System am Arbeitsplatz einsetzen, müssen Arbeitnehmervertreter und betroffene Beschäftigte vorher informieren (Artikel 26 Absatz 7), für Anhang-III-Systeme ab dem 2. Dezember 2027. Nach Artikel 2 Absatz 11 bleiben für Beschäftigte günstigere Gesetze und Kollektivvereinbarungen zulässig.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Logistikunternehmen mit 400 Beschäftigten will für die Verwaltung einen Schreib- und Rechercheassistenten einführen, lizenziert über ein Firmenkonto, dessen Verwaltungsoberfläche Nutzungsstatistiken je Person anzeigt. Der Projektleiter hält das für ein reines Bürowerkzeug. Die Beraterin verweist auf den Maßstab des Bundesarbeitsgerichts: Es kommt auf die Eignung an, nicht auf die Absicht, und Statistiken je Person machen das Werkzeug zu einer technischen Einrichtung im Sinne des § 87. Sie empfiehlt, den Betriebsrat nach § 90 schon in der Auswahlphase zu unterrichten, ihm einen Sachverständigen zuzugestehen und eine Betriebsvereinbarung zu verhandeln, die den Zweck festlegt, Auswertungen je Person ausschließt und den Zugriff auf Protokolle regelt. Die Einführung beginnt dadurch später, aber ohne den Streit, den eine Einführung am Betriebsrat vorbei auslösen würde; zum Schutz seiner Mitbestimmungsrechte kann er Beseitigung und Unterlassung verlangen.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Nicht jeder KI-Einsatz ist mitbestimmungspflichtig. Das Arbeitsgericht Hamburg hat am 16. Januar 2024 entschieden, dass ein Arbeitgeber, der die Nutzung von ChatGPT über den Browser mit selbst angelegten Konten erlaubt und dafür Richtlinien aufstellt, den Betriebsrat nicht nach § 87 beteiligen musste. Die Richtlinien beträfen das mitbestimmungsfreie Arbeitsverhalten; Nutzungsdaten erhalte nur der Hersteller, nicht der Arbeitgeber, der Überwachungsdruck gehe also nicht von ihm aus. Auch die Pflicht, KI-gestützte Ergebnisse zu kennzeichnen, löse keine Mitbestimmung aus, weil die Beschäftigten selbst kennzeichnen, nicht das Werkzeug. Die Entscheidung erging im Eilverfahren und betrifft einen Einzelfall. Sie steht zudem in Spannung zur Empfehlung der Datenschutzkonferenz, gerade keine privaten Konten zu nutzen: Richtet der Arbeitgeber dienstliche Konten ein, deren Protokolle er einsehen kann, spricht nach dem Maßstab des Bundesarbeitsgerichts viel für die Mitbestimmung. Ob sie greift, hängt damit an technischen Details, die früh geklärt werden müssen.',
        ],
      },
    ],
    quellen: [Q.betrvg, Q.bagFacebook, Q.arbgHamburg, Q.dskOhKi, Q.kiVoKonsolidiert],
  },
];
