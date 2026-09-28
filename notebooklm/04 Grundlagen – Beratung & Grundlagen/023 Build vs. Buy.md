# Build vs. Buy

Selbst bauen oder einkaufen? Die Entscheidung folgt weniger dem Preis als der Frage, ob die Fähigkeit differenzierend oder Commodity ist.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Beratung & Grundlagen“. Auch bekannt als: Build vs Buy, Make or Buy, Vendor Lock-in.

## Worum es geht

Die Frage, ob ein Unternehmen eine Fähigkeit selbst herstellt oder einkauft (make or buy), ist alt. James Brian Quinn und Frederick Hilmer (MIT Sloan Management Review, 1994) haben die klassische Antwort formuliert: Ein Unternehmen soll seine Mittel auf Kernkompetenzen konzentrieren, in denen es herausragend ist und Kunden einen einzigartigen Wert bietet, und andere Tätigkeiten gezielt auslagern, für die es weder einen kritischen strategischen Bedarf noch besondere Fähigkeiten hat. So nutzt es die Investitionen, Neuerungen und Spezialkenntnisse von Anbietern, die intern zu teuer oder gar nicht nachzubauen wären, und verkürzt in schnell wechselnden Märkten Entwicklungszeiten und Risiken.

Übertragen auf KI heißt das: Differenzierend ist eine Fähigkeit, die einen Wettbewerbsvorteil begründet, etwa weil sie auf eigenem Fachwissen und eigenen Daten beruht; sie spricht eher für den Eigenbau. Standardfähigkeiten (commodity) wie Übersetzen, Transkribieren oder das Einordnen von E-Mails bieten viele Anbieter an; hier spricht mehr für den Kauf. Bauen muss bei KI nicht heißen, ein Modell von Grund auf zu trainieren. Häufig ist es ein Mix: Standardbausteine wie ein eingekauftes Sprachmodell werden genutzt, der differenzierende Teil, etwa die eigene Wissensbasis, die Einbindung in die Abläufe oder die Prüfregeln, wird selbst gestaltet. Das KI-Handbuch der britischen Regierung (Government Digital Service, 2025) empfiehlt dafür eine Beschaffungs- und Partnerstrategie, die festlegt, welche Fähigkeiten im eigenen Haus aufgebaut und welche von Partnern bezogen werden.

## Die weiteren Kriterien

Neben der Differenzierung zählen mehrere Kriterien. Die Gesamtbetriebskosten entscheiden oft anders als der Preis, wie der Artikel über den Business-Case zeigt; ein Eigenbau hat keine Lizenz, aber Entwicklung, Betrieb und Pflege. Die Zeit bis zum Nutzen (time to value) spricht nach Quinn und Hilmer eher für den Einkauf. Vorhandene Kompetenz und Kapazität entscheiden, ob ein Eigenbau überhaupt betrieben werden kann, auch dann noch, wenn seine Entwickler das Unternehmen verlassen. Die Datenhoheit fragt, wo Daten verarbeitet werden und wer auf sie zugreifen kann; der Artikel über Datensouveränität vertieft das.

Auch die Regulierung verschiebt die Rechnung. Nach Artikel 25 der KI-Verordnung wird ein Betreiber selbst zum Anbieter eines Hochrisiko-Systems, mit allen Anbieterpflichten, wenn er ein solches System mit seinem Namen oder seiner Marke versieht, es wesentlich verändert oder die Zweckbestimmung eines Systems so ändert, dass es zum Hochrisiko-System wird. Für Systeme nach Anhang III gilt das ab 2. Dezember 2027 (Stand September 2026). Wer ein gekauftes System stark anpasst, kann also rechtlich in die Rolle des Herstellers geraten.

Bleibt die Abhängigkeit vom Anbieter (vendor lock-in). IBM nennt Wechselkosten, Gebühren für den Abzug von Daten und das Risiko, dass ein Anbieter die Preise ändert oder einen Dienst einstellt. Das britische Handbuch rät, schon in den Anforderungen an einen Anbieter Strategien gegen die Abhängigkeit, das Datenformat und die laufende Wartung zu berücksichtigen. Der Data Act der EU, anwendbar seit 12. September 2025, soll zudem den Wechsel zwischen Cloud-Anbietern erleichtern.

## Im Beratungsalltag

Ein Hersteller von Ersatzteilen für Landmaschinen mit 220 Beschäftigten will zwei Dinge: Kundenanfragen in mehreren Sprachen schneller beantworten und Teile anhand eines Fotos erkennen, das ein Landwirt vom Feld schickt. Die Beraterin trennt beides. Übersetzen und Vorsortieren von Anfragen sind Standard; dafür wird ein Dienst eingekauft, nach einem Vergleich der Gesamtkosten, mit geklärtem Verarbeitungsort der Daten und einem Vertrag, der den Export der Daten in einem offenen Format und eine Kündigung ohne lange Bindung erlaubt. Die Teileerkennung dagegen beruht auf dem, was nur dieses Unternehmen hat: Jahrzehnte an Zeichnungen, Stücklisten und Fotos alter Baureihen.

Hier lohnt es sich, selbst zu gestalten, aber nicht bei null. Ein eingekauftes Bildmodell liefert die Grundfähigkeit; das Unternehmen baut die Zuordnung zu seinen Teilenummern, die Prüfung durch den Innendienst und die Pflege des Bildbestands. Dafür braucht es eine interne Verantwortliche und einen Dienstleister, der die Anbindung dokumentiert übergibt. Das Modell wird hinter einer eigenen Schnittstelle gekapselt, damit es später austauschbar bleibt. Die Grenze zwischen Kaufen und Bauen verläuft dort, wo die Differenzierung beginnt.

## Grenzen und Kritik

Was differenzierend ist, lässt sich schwerer sagen, als das Raster vermuten lässt. Dass ein Ablauf im eigenen Haus anders läuft als anderswo, macht ihn noch nicht zum Wettbewerbsvorteil; entscheidend ist, ob Kunden den Unterschied bemerken und bezahlen. Die Einschätzung kann zudem schnell kippen: Eine KI-Fähigkeit, die heute nur mit eigener Entwicklung zu haben ist, kann morgen zum Standardumfang gekaufter Software gehören. Wer auf einen Eigenbau setzt, sollte deshalb regelmäßig prüfen, ob der Vorsprung noch besteht. Umgekehrt kann ein Unternehmen, das alles einkauft, die Fähigkeit verlieren, Angebote überhaupt zu beurteilen.

Auch der Eigenbau ist nicht frei von Abhängigkeit. Er bindet an die eigenen Entwickler, an deren Dokumentation und an Wissen, das mit einer Kündigung verschwinden kann. Und die Grenze zwischen Kauf und Eigenbau wird bei KI unscharf, weil auch eine eigene Lösung auf eingekauften Modellen und Cloud-Diensten aufsetzen kann. Die nützlichere Frage lautet deshalb oft nicht „bauen oder kaufen“, sondern: Welche Teile müssen wir verstehen, kontrollieren und austauschen können, und welche dürfen wir einem Anbieter überlassen?

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Business-Case, TCO & ROI**: Der Nutzen einer KI-Lösung wird nicht gegen den Lizenzpreis gerechnet, sondern gegen die vollen Lebenszykluskosten.
- **Datensouveränität, BSI C5 & Gaia-X**: Warum der Speicherort allein keine Souveränität garantiert — und welche Kataloge und Infrastrukturen die deutsche/europäische Antwort darauf sind.
- **Proprietär vs. Open-Weight**: Die Wahl zwischen API-Modell und selbst betriebenem Open-Weight-Modell ist keine reine Leistungsfrage, sondern eine Governance-Entscheidung — und ein sich schnell wandelndes Feld.

## Quellen

- Quinn & Hilmer — Strategic Outsourcing (MIT Sloan Management Review, 1994). https://sloanreview.mit.edu/article/strategic-outsourcing/ (abgerufen am 28.09.2026)
- Government Digital Service — Artificial Intelligence Playbook for the UK Government (GOV.UK, 2025). https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html (abgerufen am 28.09.2026)
- Future of Life Institute — EU AI Act Explorer: Artikel 25, Verantwortlichkeiten entlang der KI-Wertschöpfungskette (artificialintelligenceact.eu, Fassung nach dem KI-Omnibus 2026). https://artificialintelligenceact.eu/article/25/ (abgerufen am 28.09.2026)
- IBM — What Is Total Cost of Ownership (TCO)? (IBM Think, o. J.). https://www.ibm.com/think/topics/total-cost-of-ownership (abgerufen am 28.09.2026)
- Europäische Kommission — Data Act (Shaping Europe’s digital future, o. J.). https://digital-strategy.ec.europa.eu/en/policies/data-act (abgerufen am 28.09.2026)
