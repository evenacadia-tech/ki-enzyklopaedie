# Text & Data Mining, Urheberrecht

Die gesetzlichen Erlaubnisse, auf die sich das Training von KI an fremden Werken in Deutschland stützen kann — samt des entscheidenden Opt-out-Vorbehalts; wie weit sie reichen, ist noch nicht abschließend geklärt.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „EU AI Act & Recht“. Auch bekannt als: TDM, Text und Data Mining, Opt-out, Urheberrecht, Paragraf 44b UrhG.

## Worum es geht

Wer ein KI-Modell mit Texten, Bildern oder Musik aus dem Netz trainiert, fertigt Kopien fremder Werke an. Im Verfahren um den Datensatz LAION hat das Oberlandesgericht Hamburg schon das Herunterladen eines Vorschaubilds als Vervielfältigung im Sinne des § 16 UrhG gewertet. Für jede Vervielfältigung braucht man die Zustimmung des Rechteinhabers oder eine gesetzliche Erlaubnis, eine sogenannte Schranke. Dass ein Werk öffentlich im Netz steht, ersetzt keines von beiden: Frei ist der Zugang, nicht die Kopie. Das Urheberrechtsgesetz enthält für das automatisierte Auswerten zwei Schranken. § 44b definiert Text und Data Mining (TDM) als automatisierte Analyse digitaler oder digitalisierter Werke, um daraus Informationen insbesondere über Muster, Trends und Korrelationen zu gewinnen. Nach der Gesetzesbegründung setzt § 44b den Artikel 4 und § 60d den Artikel 3 der EU-Richtlinie (EU) 2019/790 über das Urheberrecht im digitalen Binnenmarkt um.

## Zwei Schranken mit verschiedenen Regeln

§ 44b erlaubt Vervielfältigungen rechtmäßig zugänglicher Werke für das Text und Data Mining, nach der Begründung ohne Einschränkung beim Kreis der Berechtigten oder beim Zweck, also auch für Unternehmen. Rechtmäßig zugänglich ist ein Werk etwa, wenn es frei im Internet steht oder der Nutzer über eine Lizenz Zugang hat. Die Kopien sind zu löschen, sobald sie für das Mining nicht mehr erforderlich sind. Vor allem gilt die Erlaubnis nur, wenn sich der Rechteinhaber die Nutzung nicht vorbehalten hat; bei online zugänglichen Werken ist ein solcher Nutzungsvorbehalt (Opt-out) nur wirksam, wenn er maschinenlesbar ist. Nach der Begründung darf er auch im Impressum oder in den Geschäftsbedingungen stehen, sofern er dort maschinenlesbar ist, wirkt nur für die Zukunft, und die Beweislast dafür, dass kein Vorbehalt bestand, trägt der Nutzer. Eine Vergütung sieht § 44b nicht vor.

§ 60d ist enger und zugleich stärker. Er berechtigt Forschungsorganisationen, also Hochschulen, Forschungsinstitute und andere forschende Einrichtungen, die nicht kommerzielle Zwecke verfolgen, alle Gewinne in die Forschung reinvestieren oder in staatlich anerkanntem öffentlichem Auftrag handeln. Einen Vorbehalt kann der Rechteinhaber hier nicht erklären. Ausgeschlossen ist aber eine Einrichtung, die mit einem privaten Unternehmen zusammenarbeitet, das bestimmenden Einfluss auf sie und bevorzugten Zugang zu den Ergebnissen hat. Auf EU-Ebene kommt seit dem 2. August 2025 Artikel 53 der KI-Verordnung hinzu: Anbieter von KI-Modellen mit allgemeinem Verwendungszweck müssen eine Strategie zur Einhaltung des Urheberrechts auf den Weg bringen, die Vorbehalte nach Artikel 4 Absatz 3 der Richtlinie auch mit modernsten Technologien ermittelt und einhält, und eine Zusammenfassung der Trainingsinhalte veröffentlichen. Anbieter von Modellen, die schon vorher auf dem Markt waren, müssen das bis zum 2. August 2027 nachholen.

## Der Fall Kneschke gegen LAION

Der Fotograf Robert Kneschke klagte gegen den gemeinnützigen Verein LAION, der einen frei verfügbaren Datensatz mit 5,85 Milliarden Bild-Text-Paaren bereitstellt, mit dem sich generative KI trainieren lässt. Der Verein lud 2021 Bilder herunter, darunter das Vorschaubild einer Fotografie des Klägers von der Website einer Bildagentur, und prüfte per Software, ob Bild und Beschreibung zusammenpassen. Die Agentur hatte in natürlicher Sprache den Zugriff durch „automated programs, applets, bots or the like“ untersagt. Das Landgericht Hamburg wies die Klage am 27. September 2024 ab, das Oberlandesgericht die Berufung am 10. Dezember 2025. Nach dem Oberlandesgericht war schon der Abgleich von Bild und Beschreibung Text und Data Mining; dass der Vorbehalt 2021 maschinenlesbar war, habe der Kläger nicht dargelegt. Zudem greife § 60d, weil die Erstellung des Datensatzes angewandte Forschung sei, auch wenn kommerzielle Anbieter ihn nutzen können. Über die zugelassene Revision hat der Bundesgerichtshof am 3. September 2026 verhandelt und will am 17. Dezember 2026 seine Entscheidung verkünden.

## Im Beratungsalltag

Ein Softwarehaus mit 40 Beschäftigten will ein zugekauftes Sprachmodell mit Fachartikeln aus dem Netz nachtrainieren, um einen Assistenten für Steuerkanzleien zu bauen. Die Beraterin trennt zwei Ebenen. Für das Basismodell ist dessen Anbieter nach Artikel 53 verantwortlich; seine Urheberrechtsstrategie und die veröffentlichte Zusammenfassung der Trainingsinhalte gehören deshalb in die Prüfung vor dem Einkauf. Die gesammelten Fachartikel dagegen sind eigenes Text und Data Mining nach § 44b. Also liest die Datenpipeline vor jedem Abruf maschinenlesbare Vorbehalte aus und lässt betroffene Quellen weg, hält je Quelle fest, was beim Abruf galt, weil im Streit der Nutzer den fehlenden Vorbehalt beweisen muss, und löscht Rohkopien, sobald sie nicht mehr gebraucht werden. Auf § 60d kann sich das Softwarehaus nicht stützen, denn es ist keine Forschungsorganisation.

## Grenzen und Kritik

Zentrale Fragen sind Stand September 2026 offen. Das Oberlandesgericht hat offengelassen, ob das spätere Training generativer Modelle selbst Text und Data Mining ist; es kam darauf nicht an, weil schon der Abgleich von Bild und Beschreibung genügte. Ungeklärt ist auch, wann ein Vorbehalt maschinenlesbar ist. Das Gericht hat einen Satz in natürlicher Sprache für 2021 nicht als maschinenlesbar anerkannt, weil der Kläger das nicht dargelegt hatte; ob das angesichts heutiger Sprachmodelle anders zu sehen ist, bleibt offen. Wer heute trainiert, trägt deshalb ein Rechtsrisiko, das sich durch Lizenzen und sorgfältige Dokumentation begrenzen, aber nicht ausschließen lässt. Für Rechteinhaber bleibt ein Grundproblem: § 44b sieht keine Vergütung vor, ihr einziges Werkzeug ist der Vorbehalt, und der wirkt nur für die Zukunft. Nutzungen vor seiner Erklärung erfasst er nicht.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Der EU AI Act**: Der weltweit erste umfassende Rechtsrahmen für KI ordnet Systeme nicht nach Technik, sondern nach ihrem Risiko — und knüpft daran gestaffelte Pflichten und Fristen.

## Quellen

- Bundesministerium der Justiz — Urheberrechtsgesetz (UrhG), u. a. §§ 16, 44b, 60d (gesetze-im-internet.de, o. J.). https://www.gesetze-im-internet.de/urhg/BJNR012730965.html (abgerufen am 28.09.2026)
- Bundesregierung — Entwurf eines Gesetzes zur Anpassung des Urheberrechts an die Erfordernisse des digitalen Binnenmarktes, Drucksache 19/27426 (Deutscher Bundestag, 2021). https://dserver.bundestag.de/btd/19/274/1927426.pdf (abgerufen am 28.09.2026)
- Europäisches Parlament und Rat — Verordnung (EU) 2024/1689 (KI-Verordnung), konsolidierte Fassung vom 27.07.2026 (EUR-Lex, 2026). https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:02024R1689-20260727 (abgerufen am 28.09.2026)
- Bundesgerichtshof — Verkündungstermin am 17. Dezember 2026 in Sachen I ZR 281/25 (Erstellen eines Datensatzes für KI-Training), Terminhinweis (BGH, 2026). https://www.bundesgerichtshof.de/SharedDocs/Termine/DE/Termine/IZR281-25.html (abgerufen am 28.09.2026)
- WIPO Lex — Hamburg Regional Court, Germany [2024]: Robert Kneschke v. LAION e.V., Case No. 310 O 227/23 (World Intellectual Property Organization, 2024). https://www.wipo.int/wipolex/en/judgments/details/2381 (abgerufen am 28.09.2026)
