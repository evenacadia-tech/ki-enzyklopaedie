# Fairness, Bias & der Unmöglichkeitssatz

„Fair" klingt nach einer einzigen Eigenschaft — ist aber mehrere, jeweils plausible, aber mathematisch nicht gemeinsam erfüllbare Definitionen. Was mit COMPAS, einem Risiko-Scoring-Instrument in der US-Justiz, 2016 zum öffentlichen Streit wurde, ist inzwischen ein bewiesener Lehrsatz der Fairness-Forschung — und der AI Act macht aus der Konsequenz eine konkrete Rechtspflicht: Trainingsdaten auf genau diese Verzerrungen zu prüfen, bevor ein Hochrisiko-System wie ein Recruiting-Tool live geht.

Ein Artikel der KI-Enzyklopädie aus der Sammlung „KI-Ethik Vertiefung“, Thema „Governance & Zertifizierung“, Teil 3 von 3 der Lesestrecke. Auch bekannt als: Demografische Parität, Equalized Odds, Kalibrierung, Predictive Parity, Base-Rate, COMPAS, Unmöglichkeitssatz.

## Was Fairness technisch heißt

Drei gängige, klar definierte Metriken: (1) Demografische Parität — der Anteil positiver Entscheidungen (z. B. Kreditzusage) ist über alle Gruppen gleich, unabhängig von der tatsächlichen Rückzahlungsfähigkeit. (2) Equalized Odds — die Fehlerraten sind gleich: sowohl die Falsch-Positiv-Rate (fälschlich abgelehnt) als auch die Falsch-Negativ-Rate (fälschlich zugesagt) stimmen zwischen den Gruppen überein. (3) Kalibrierung (auch Predictive Parity) — unter allen Personen mit demselben vorhergesagten Risikowert tritt das vorhergesagte Ereignis in jeder Gruppe mit derselben tatsächlichen Quote ein, ein Score von „70 % Ausfallrisiko" bedeutet in jeder Gruppe wirklich rund 70 %. Alle drei klingen für sich plausibel — das Problem beginnt, wenn ein Modell alle drei gleichzeitig erfüllen soll.

## Der Unmöglichkeitssatz

Sie bewiesen mathematisch: außer in eng umrissenen Sonderfällen kann KEIN Vorhersagemodell alle drei Bedingungen — Kalibrierung innerhalb der Gruppen, gleiche Fehlerrate bei den tatsächlich Negativen UND gleiche Fehlerrate bei den tatsächlich Positiven — gleichzeitig erfüllen. Das ist kein Programmierfehler und kein Rechenleistungsproblem, sondern ein strukturelles, beweisbares Ergebnis: die drei Fairness-Ziele stehen bei ungleichen Ausgangsbedingungen der Gruppen mathematisch in Konflikt zueinander. Für die Beratung folgt: die Frage ist nie „welches Modell erfüllt alles", sondern „welche Metrik priorisieren wir bewusst — und warum".

## COMPAS: ein Fall, zwei Wahrheiten

ProPublica (Angwin, Larson, Mattu & Kirchner, 23. Mai 2016) wertete reale COMPAS-Scores aus und fand eine deutliche Fehlerraten-Asymmetrie zwischen Schwarzen und weißen Angeklagten: Schwarze Angeklagte wurden zu 44,9 % fälschlich als hochriskant eingestuft (spätere Nicht-Rückfälligkeit), weiße Angeklagte nur zu 23,5 %. Umgekehrt wurden weiße Angeklagte zu 47,7 % fälschlich als niedrigriskant eingestuft, Schwarze Angeklagte nur zu 28,0 %. Nach Kontrolle für Vorstrafen, Alter und Geschlecht blieben Schwarze Angeklagte immer noch 77 % häufiger als „höheres Risiko für eine künftige Gewalttat" markiert. Für die Beratung: ein im Einsatz befindliches System auf Basisrate-Unterschiede und Fehlerraten-Asymmetrie zu prüfen ist kein theoretisches, sondern ein real belegtes Risiko.

Keine Seite lag rein rechnerisch falsch — beide maßen etwas anderes. Northpointe (Dieterich, Mendoza & Brennan, 2016) zeigte, dass COMPAS-Scores gruppenübergreifend gut kalibriert waren: ein Score von „70 % Risiko" bedeutete bei Schwarzen wie bei weißen Angeklagten wirklich rund 70 % tatsächliche Rückfallquote (Predictive Parity erfüllt). ProPublica maß dagegen die Fehlerraten (Equalized Odds) und fand dort die Asymmetrie. Chouldechovas Arbeit erklärt genau diesen Fall: weil die tatsächliche Rückfallrate zwischen Schwarzen und weißen Angeklagten in den Daten unterschiedlich war (unterschiedliche Basisrate), konnten Kalibrierung UND gleiche Fehlerraten gar nicht gleichzeitig gelten — der COMPAS-Streit ist der real gewordene Unmöglichkeitssatz, kein Rechenfehler einer der beiden Seiten.

## Die Rechtspflicht, nach Bias zu suchen

Es ist eine echte Rechtspflicht, keine Kür. Art. 10 AI Act verlangt für Hochrisiko-KI-Systeme, dass Trainings-, Validierungs- und Testdatensätze „relevant, hinreichend repräsentativ und so weit wie möglich fehlerfrei und vollständig" sind — UND schreibt ausdrücklich eine Prüfung auf mögliche Verzerrungen vor, die die Gesundheit/Sicherheit von Personen beeinträchtigen, sich negativ auf Grundrechte auswirken oder zu einer nach Unionsrecht verbotenen Diskriminierung führen könnten. Werden solche Bias-Quellen entdeckt, sind angemessene Maßnahmen zur Erkennung, Vermeidung und Minderung vorgeschrieben. Ein Recruiting-Tool wie im Amazon-Fall würde damit unter dem AI Act nicht nur schlechte Praxis, sondern eine Verletzung der Datengovernance-Pflicht sein.

## Einordnung in der Enzyklopädie

Dieser Artikel schließt die Lesestrecke „KI-Ethik Vertiefung“ ab, davor steht „Nudging, Aufmerksamkeitsökonomie & die Erosion der Autonomie“.

Verwandte Artikel:

- **Ethik-Frameworks als Landkarte**: Diese Lesestrecke hat bislang das EMPIRISCHE Ist untersucht — wie KI und Menschen sich tatsächlich verhalten. Dieser schlanke Abschlussartikel zeigt das NORMATIVE Soll dazu: die HLEG-Prinzipien, ALTAI als Werkzeug, und warum Recht und Empirie einander brauchen, statt dass das eine das andere ersetzt.

## Quellen

- Kleinberg, Mullainathan & Raghavan — Inherent Trade-Offs in the Fair Determination of Risk Scores (arXiv:1609.05807, 2016). https://arxiv.org/abs/1609.05807 (abgerufen am 14.07.2026)
- Angwin, Larson, Mattu & Kirchner — Machine Bias: There’s Software Used Across the Country to Predict Future Criminals (ProPublica, 23. Mai 2016). https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing (abgerufen am 14.07.2026)
- Chouldechova — Fair Prediction with Disparate Impact: A Study of Bias in Recidivism Prediction Instruments (arXiv:1703.00056, 2017). https://arxiv.org/abs/1703.00056 (abgerufen am 14.07.2026)
- AI Act — Artikel 10 (Daten und Daten-Governance, u. a. Bias-Prüfpflicht für Hochrisiko-KI). https://artificialintelligenceact.eu/article/10/ (abgerufen am 14.07.2026)
