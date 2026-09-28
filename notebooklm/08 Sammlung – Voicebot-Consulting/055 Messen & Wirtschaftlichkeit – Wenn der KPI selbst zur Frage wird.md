# Messen & Wirtschaftlichkeit: Wenn der KPI selbst zur Frage wird

Wer den Erfolg eines Voicebots misst, trifft auf eine unangenehme Überraschung: Viele der gängigsten Kennzahlen — Customer Success Rate, Containment, Cost per Contact — sind entweder kein Standardbegriff oder mit einem stillen Rechenfehler behaftet, der wie ein Erfolg aussieht. Selbst wo Kennzahlen sauber definiert sind, bleibt die Stichprobe oft winzig: ein Nutzertest mit vier oder fünf Personen ist die Realität vieler Projekte. Das erlaubt weniger, als man hofft — aber mehr, als Kritiker behaupten.

Ein Artikel der KI-Enzyklopädie aus der Sammlung „Voicebot-Consulting“, Thema „Beratung & Grundlagen“, Teil 3 von 4 der Lesestrecke. Auch bekannt als: Customer Success Rate, Containment, FCR, Cost per Contact, Guardrail-Metrik, OEC, Power-Analyse, Peeking, n=4.

## Wenn der KPI selbst unklar ist

Eine Volltextsuche im 145.534-Zeichen-ICMI-Standardwerk „Call Center Metrics: KPIs" ergibt: „customer success" → 0 Treffer, „success rate" → 0 Treffer. Kein COPC-Eintrag, keine Quelle mit Formel. Etabliert ist stattdessen „Task Success" aus der Dialogsystem-/HCI-Literatur. Konfusionsquelle: „Customer Success" IST ein etablierter Begriff — aber im SaaS-Account-Management (Churn, Net Revenue Retention), einer anderen Domäne. Die erste Consulting-Handlung ist daher, den KPI zu DEFINIEREN (Zähler, Nenner, Zeitfenster), nicht ihn zu benutzen, als wäre er bekannt. Belegstatus: unbelegt (0 Treffer im ICMI-Standardwerk für „Customer Success Rate" als Call-Center-KPI).

Containment, Deflection und Self-Service zählen mit VERSCHIEDENEN Nennern: Containment nur Kontakte, die in den Bot-Kanal eintraten; Deflection alle Kontaktversuche; Self-Service eigene Nutzungen. Prozentzahlen zwischen ihnen sind grundsätzlich nicht vergleichbar. Wichtiger noch: „contained" ≠ „gelöst" — der frustriert Auflegende ist die perfekte Containment-Statistik. Der COPC-Standard (Autonomous Handle Rate) schreibt wörtlich: „There is no benchmark or best practice target for Autonomous Handle Rate." Jede Anbieter-Zielzahl widerspricht damit der einzigen Norminstanz im Feld. Belegstatus: normiert (COPC CX Standard R7.0).

## Der Rechenfehler in den Kosten

MetricNet (Praktikerquelle, nicht peer-reviewed) definiert Cost per Contact wörtlich als „total annual operating expense... divided by the annual inbound contact volume, including IVR-contained contacts". Contained Calls stehen also im NENNER — mehr Containment senkt die Kennzahl rein rechnerisch, auch ohne echten Effizienzgewinn. Kommt der Kunde als Wiederkontakt zurück, stehen ein zweiter Kontakt im Nenner UND die vollen Agentenkosten im Zähler — der Durchschnitt sieht weiter gut aus, die Gesamtkosten steigen. Zusatzfalle: MetricNet, HDI und ICMI publizieren scheinbar unabhängige Daten — aber alle drei über denselben Autor, Jeff Rumburg (Mitgründer von MetricNet). Syndizierung, keine Triangulation.

## Was eine kleine Stichprobe wirklich erlaubt

Nein, das ist FALSCH. Exakt gerechnet (Fisher-Test, zweiseitig) ist der kleinstmögliche p-Wert bei 4-gegen-4 genau 0,0286 (bei 0/4 vs. 4/4) — Signifikanz ist erreichbar, aber nur bei perfekter Trennung. Das ehrliche Argument ist POWER, nicht Unmöglichkeit: bei einem echten Effekt von +10 Prozentpunkten würde man ihn in 99,3 % der Fälle übersehen (Power 0,7 %). Für +10 pp bräuchte man 354 statt 4 Nutzer pro Gruppe — Faktor rund 88. Die Unsicherheit zeigt sich auch im Konfidenzintervall: „3 von 4 geschafft" (75 %) ist mit einer wahren Quote von 30,1 % bis 95,4 % vereinbar — 65 Prozentpunkte breit. Belegstatus: peer-reviewed (Cohen 1988, Statistical Power Analysis, kanonischer Standardtext).

Nielsens Mittelwert wird von Faulkners Kritik (2003, 60 Nutzer, 100 Durchläufe je Stichprobengröße, 45 Probleme) im Durchschnitt BESTÄTIGT. Aber Faulkner wörtlich: „Some of the randomly selected sets of 5 participants found 99% of the problems; other sets found only 55%." Bei 10 Nutzern steigt die Untergrenze auf 80 %, bei 20 Nutzern auf 95 %. Entscheidend: „there is currently no way to determine with reasonable certainty that any set of five tests matched those percentages" — Entdeckung ist etwas anderes als Schätzung. Ein konkretes 5er-Team kann also ebenso gut das unglückliche 55-%-Set wie das glückliche 99-%-Set sein. Belegstatus: peer-reviewed (Faulkner 2003, Behavior Research Methods).

## Einordnung in der Enzyklopädie

In der Lesestrecke „Voicebot-Consulting“ steht davor „Dialogpsychologie & Nutzergruppen: Wenn Best-Practice bröckelt“, danach folgt „Die Domäne Energieversorger: Wo der Bot darf — und wo nicht“.

Verwandte Artikel:

- **Business-Case, TCO & ROI**: Der Nutzen einer KI-Lösung wird nicht gegen den Lizenzpreis gerechnet, sondern gegen die vollen Lebenszykluskosten.

## Quellen

- ICMI — Call Center Metrics: Key Performance Indicators (Hrsg. Cleveland/Harne, 2003). https://www.icmi.com/files/StudentResourcePage/CCF/CCMetricsKPIs.pdf (abgerufen am 17.07.2026)
- COPC — CX Standard for Customer Operations, Release 7.0 v1.2 (2021). https://cx.copc.com/hubfs/PDF/COPC_2021_CX_Standard_for_Customer_Operations_Release_7.0.pdf (abgerufen am 17.07.2026)
- MetricNet — Introduction to Call/Contact Center Metrics: Definitions & Key Correlations (Rumburg). https://www.metricnet.com/introduction-contact-center-metrics-definitions-key-correlations/ (abgerufen am 17.07.2026)
- Cohen — Statistical Power Analysis for the Behavioral Sciences (2. Aufl., 1988). https://archive.org/details/statisticalpower0000cohe_j0l3 (abgerufen am 17.07.2026)
- Faulkner — Beyond the Five-User Assumption: Benefits of Increased Sample Sizes in Usability Testing (Behavior Research Methods 35(3), 2003). https://pubmed.ncbi.nlm.nih.gov/14587545/ (abgerufen am 17.07.2026)
