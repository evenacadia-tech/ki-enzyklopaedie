# Datensouveränität, BSI C5 & Gaia-X

Warum der Speicherort allein keine Souveränität garantiert — und welche Kataloge und Infrastrukturen die deutsche/europäische Antwort darauf sind.

Ein Artikel der KI-Enzyklopädie aus den Grundlagen, Thema „Governance & Zertifizierung“. Auch bekannt als: Data Sovereignty, Datenlokalität, BSI C5, Gaia-X, CLOUD Act, digitale Souveränität.

## Wo die Daten liegen und wer an sie herankommt

Datenlokalität (data residency) beschreibt, wo Daten gespeichert und verarbeitet werden. Datensouveränität (data sovereignty) fragt weiter: Wer kann rechtlich erzwingen, dass Daten herausgegeben werden, und welches Recht regiert die Systeme, in denen sie liegen? Beide Fragen fallen auseinander, sobald ein Anbieter einem anderen Rechtsraum unterliegt als sein Rechenzentrum. Deutlich wird das am US-amerikanischen Clarifying Lawful Overseas Use of Data Act, kurz CLOUD Act, von 2018. Er verpflichtet Anbieter elektronischer Kommunikationsdienste und entfernter Rechendienste (remote computing service), ihren gesetzlichen Pflichten zur Sicherung und Herausgabe von Inhalten und Kundendaten nachzukommen, die sich in ihrem Besitz, ihrer Obhut oder unter ihrer Kontrolle befinden (possession, custody, or control), und zwar unabhängig davon, ob die Daten innerhalb oder außerhalb der Vereinigten Staaten liegen.

Der Anknüpfungspunkt ist also das Unternehmen, nicht der Server. In seinen einleitenden Feststellungen nennt das Gesetz als Problem gerade Daten, die außerhalb der USA gespeichert sind, aber bei Anbietern liegen, die der Gerichtsbarkeit der Vereinigten Staaten unterliegen. Ein Rechenzentrum in Frankfurt ändert daran nichts, wenn der Anbieter dieser Gerichtsbarkeit unterliegt und die Daten unter seiner Kontrolle stehen. Souveränität hängt deshalb an mehreren Schichten: an der Rechtsnatur des Anbieters, am Betreibermodell, also daran, wer die Systeme verwaltet und wer die Schlüssel hält, und an der Portabilität, der Fähigkeit, den Anbieter mit vertretbarem Aufwand zu wechseln. Verschlüsselung schützt nur so weit, wie die Schlüssel außerhalb der Reichweite des Anbieters liegen; Metadaten wie Zeitpunkte und Datenmengen fallen trotzdem bei ihm an.

## BSI C5: geprüfte Sicherheit

Der Kriterienkatalog C5 (Cloud Computing Compliance Criteria Catalogue) des Bundesamts für Sicherheit in der Informationstechnik (BSI) beschreibt seit 2016 Mindestanforderungen an sicheres Cloud Computing. Ob ein Anbieter sie erfüllt, prüfen Wirtschaftsprüfer nach dem Prüfstandard ISAE 3000; das Ergebnis ist ein Testat mit Prüfbericht, das Kunden beim Anbieter anfordern und selbst auswerten. Grundsätzlich hat der Katalog empfehlenden Charakter, andere Regeln machen ihn aber verbindlich: Stellen des Bundes müssen nach dem Mindeststandard des BSI zur Nutzung externer Cloud-Dienste Nachweise über die C5-Kriterien einfordern, und für Cloud-Dienste im Gesundheitswesen verlangt § 393 SGB V ein C5-Testat oder ein vergleichbares Testat oder Zertifikat.

Auf die Fassung C5:2020 mit 121 Kriterien folgt der C5:2026, den das BSI seit Ende März 2026 als finale Version veröffentlicht. Er umfasst 168 Kriterien in 17 Themengebieten und ist für Testate ab dem 1. Juni 2027 anzuwenden, freiwillig schon früher. Ausführlicher als bisher behandelt er die Mandantentrennung und die technische Umsetzung von Souveränität; zum Katalog gehören außerdem Transparenzkriterien, etwa zum Umgang mit Ermittlungsanfragen. Ein Testat gilt aber immer nur für die geprüften Dienste in den festgelegten Regionen, nicht für den Anbieter als Ganzes, und das BSI betont, dass es keine alleinige Garantie für sichere Cloud-Nutzung ist. C5 belegt geprüfte Betriebssicherheit und macht Zugriffsrisiken sichtbar; eine Herausgabepflicht nach fremdem Recht beseitigt er nicht.

## Gaia-X: gemeinsame Regeln, abgestufte Labels

Gaia-X ist eine europäische Initiative, getragen von der Gaia-X European Association for Data and Cloud mit Sitz in Brüssel. Nach eigener Beschreibung entsteht dabei keine Cloud, sondern ein föderiertes System, das viele Cloud-Anbieter und Nutzer in einer transparenten Umgebung verbindet und den Nutzern die Kontrolle über ihre Daten zurückgeben soll; dazu gehören Interoperabilität und die Möglichkeit, den Anbieter zu wechseln, statt an einen gebunden zu sein (vendor lock-in). Das Regelwerk dafür ist das Compliance Document. Es unterscheidet eine Standard-Konformität (Standard Compliance) und darüber drei Labels mit zusätzlichen Kriterien. Erst die oberste Stufe beantwortet die Frage nach fremdem Rechtszugriff: Für Label Level 3 müssen Kundendaten ausschließlich in EU oder EWR verarbeitet werden, Sitz und Hauptniederlassung des Anbieters dort liegen, Anteilseigner von außerhalb dürfen ihn nicht kontrollieren, und für außereuropäische Herausgabeanordnungen braucht er geprüfte Schutzvorkehrungen. Die Teilnahme an Gaia-X allein belegt also keinen Schutz vor ausländischem Rechtszugriff.

## Im Beratungsalltag

Ein Stadtwerk mit 300 Beschäftigten will einen KI-Assistenten einführen, der Antwortschreiben an Kunden entwirft, und hat dafür die EU-Region eines großen US-Cloud-Anbieters gebucht. Die Beraterin trennt zuerst die Daten: Allgemeine Tarifinformationen sind unkritisch, Vertrags- und Verbrauchsdaten der Kunden sind personenbezogen. Für jede Klasse stellt sie dieselben vier Fragen. Welches Recht bindet die Einheit, die den Dienst kontrolliert? Wer hält die Schlüssel? Liegt für genau diesen Dienst in genau dieser Region ein C5-Testat vor, und nach welcher Fassung? Wie sähe ein Wechsel aus, und ist er vertraglich und technisch vorbereitet? Heraus kommt kein Ja oder Nein, sondern ein abgestuftes Modell: Die Tarifauskunft darf beim großen Anbieter bleiben, die Kundendaten wandern in einen Betrieb unter europäischer Kontrolle mit eigenem Schlüsselmanagement, und für die nächste Ausschreibung liegt je Datenklasse ein Nachweis vor statt eines Hinweises auf die EU-Region.

## Grenzen und Kritik

Souveränität hat einen Preis. Ob ein europäisch kontrolliertes Angebot die benötigten Dienste und Modelle bereitstellt, muss im Einzelfall geprüft werden, und eigenes Schlüsselmanagement verlangt Personal, das es betreiben kann. Eine Maximallösung für alle Daten scheitert deshalb oft am Budget, eine Minimallösung an der ersten Nachfrage der Aufsicht. Auch die Nachweise haben Grenzen: Ein C5-Testat deckt einen festgelegten Umfang und Zeitraum ab, und Gaia-X-Labels wirken nur dort, wo Anbieter sie erwerben und Kunden sie verlangen. Ob eine konkrete Herausgabe nach US-Recht zulässig wäre und wie sie sich zum europäischen Datenschutzrecht verhält, ist eine Frage für Juristen. Die Beratung stellt je Datenklasse die richtigen Fragen und macht die Antworten belegbar; Souveränität bescheinigen kann sie einem Anbieter nicht.

## Einordnung in der Enzyklopädie

Verwandte Artikel:

- **Datenabfluss (OWASP LLM02)**: Warum vertrauliche Daten in öffentlichen KI-Diensten ein Compliance-Problem sind — und was die souveränen Alternativen leisten.
- **Build vs. Buy**: Selbst bauen oder einkaufen? Die Entscheidung folgt weniger dem Preis als der Frage, ob die Fähigkeit differenzierend oder Commodity ist.
- **Deutsches KI-Ökosystem**: Wer die tragenden Akteure kennt — von SAP über das DFKI bis zu den Branchen-Kennzahlen des Bitkom — kann im Beratungsgespräch einordnen statt nur benennen.

## Quellen

- U.S. Department of Justice — Full Text of the CLOUD Act: Clarifying Lawful Overseas Use of Data Act, Division V (2018). https://www.justice.gov/criminal/media/999391/dl?inline (abgerufen am 28.09.2026)
- BSI — Kriterienkatalog C5:2026 (Bundesamt für Sicherheit in der Informationstechnik, 2026). https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5_2025/C5_2025_node.html (abgerufen am 28.09.2026)
- BSI — C5 FAQ: Kriterienkatalog, Testat und Übergangsfristen (Bundesamt für Sicherheit in der Informationstechnik, 2026). https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/C5-FAQ/kriterienkatalog-c5-faq_node.html (abgerufen am 28.09.2026)
- Gaia-X European Association for Data and Cloud — About Gaia-X: What We Do (gaia-x.eu, o. J.). https://gaia-x.eu/about/ (abgerufen am 28.09.2026)
- Gaia-X European Association for Data and Cloud — Gaia-X Compliance Document: Compliance for Cloud Services, Abschnitt European Control (Release 4.0.0, 2026). https://docs.gaia-x.eu/policy-rules-committee/compliance-document/latest/criteria_cloud_services/ (abgerufen am 28.09.2026)
