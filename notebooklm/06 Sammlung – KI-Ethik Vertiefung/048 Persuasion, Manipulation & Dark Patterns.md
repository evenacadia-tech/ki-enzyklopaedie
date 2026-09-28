# Persuasion, Manipulation & Dark Patterns

Persuasive Technologie ist so alt wie Software-Design selbst — seit Fogg 1996 den Begriff Captology prägte. Der EU AI Act zieht seit dem 2.2.2025 eine harte Grenze: Manipulation, die eine informierte Entscheidung erheblich beeinträchtigt, ist verboten. Dieser Artikel führt von der Psychologie der Überzeugung über die wissenschaftlichen Dark-Pattern-Taxonomien bis zur konkreten Rechtsgrenze — inklusive der Stelle, an der Beratende AI Act und DSA am häufigsten verwechseln.

Ein Artikel der KI-Enzyklopädie aus der Sammlung „KI-Ethik Vertiefung“, Thema „Beratung & Grundlagen“, Teil 1 von 3 der Lesestrecke. Auch bekannt als: Dark Patterns, Persuasive Technology, Captology, Manipulatives Design.

## Die Psychologie der Überzeugung

BJ Fogg begründete 1996 den Begriff Captology („Computers As Persuasive Technologies") und formulierte 2009 sein Verhaltensmodell: B=MAP — ein Verhalten (Behavior) tritt nur ein, wenn ausreichend Motivation, ausreichend Ability (Fähigkeit/Einfachheit) UND ein auslösender Prompt gleichzeitig zusammentreffen. Die Formel ist multiplikativ: Fehlt einer der drei Faktoren vollständig, bleibt das Verhalten aus, egal wie stark die anderen beiden sind. Ursprünglich (2009) hieß der dritte Faktor „Trigger" (B=MAT); Fogg selbst hat den Begriff seither zu „Prompt" präzisiert, weil ein wirksamer Anstoß mehr ist als ein simpler mechanischer Auslöser.

## Zwei wissenschaftliche Dark-Pattern-Taxonomien

Gray, Kou, Battles, Hoggatt und Toombs werteten 2018 118 von UX-Profis selbst gemeldete manipulative Muster aus und ordneten sie fünf Kategorien zu: Nagging (wiederholte Unterbrechungen), Obstruction (künstlich erschwerte Prozesse, z. B. schwer kündbare Abos), Sneaking (verschleierte Informationen, die Nutzer bei Kenntnis ablehnen würden), Interface Interference (manipulierte visuelle Hierarchie, die Optionen verzerrt wahrnehmen lässt) und Forced Action (eine an sich unerwünschte Handlung wird zur Bedingung für den eigentlich gewollten Zugriff gemacht).

Mathur et al. (2019) crawlten automatisiert rund 11.000 Shopping-Websites (~53.000 Produktseiten) und fanden 1.818 Dark-Pattern-Instanzen, geordnet in sieben Kategorien mit 15 Typen — u. a. Sneaking, Urgency (z. B. Countdown-Timer), Misdirection, Social Proof, Scarcity, Obstruction, Forced Action. Die häufigste Einzelform war die „Low-stock Message" (falscher Knappheitshinweis, 632 von 1.818 Instanzen) — ein Beleg, dass ausgenutzte Verknappung der mit Abstand am meisten genutzte Hebel ist, nicht offene Täuschung.

## Die Rechtsgrenze: AI Act Art. 5

Nein, grundsätzlich nicht. Nach Art. 5 Abs. 1 lit. f verbietet der AI Act KI-Systeme, die Emotionen von Personen am Arbeitsplatz oder in Bildungseinrichtungen ableiten — die einzigen Ausnahmen sind medizinische oder Sicherheitsgründe (z. B. Müdigkeitserkennung bei sicherheitsrelevantem Personal). Ein „Emotionserkennungssystem" liegt laut Art. 3 Nr. 39 nur vor, wenn tatsächlich biometrische Daten (Stimme, Mimik) ausgewertet werden, um daraus Emotionen abzuleiten — ein reines Wortprotokoll ohne Stimm-/Bildauswertung fiele nicht darunter.

Nicht unbedingt — hier lohnt eine genaue Abgrenzung. Der Begriff „Dark Patterns" taucht im AI-Act-Text selbst NIRGENDS wörtlich auf (weder Art. 5 noch Erwägungsgrund 29) — er wird stattdessen in Art. 25 DSA (verbotene manipulative Plattform-Oberflächen) und in EDPB-Leitlinien zur DSGVO-Fairness ausdrücklich benannt. Der AI Act verbietet in Art. 5 Abs. 1 lit. a nur, wenn ein AI-SYSTEM eingesetzt wird, das unterschwellig oder manipulativ/täuschend wirkt UND dadurch erheblicher Schaden droht — enger als die DSA-Regel, die jede Plattform-Oberfläche erfasst, unabhängig von KI. Ein simpler, hart codierter Fake-Countdown ohne KI-Komponente fällt daher eher unter DSA-/DSGVO-Regeln als unter den AI Act — die Regelwerke ergänzen sich, sind aber nicht austauschbar.

## Einordnung in der Enzyklopädie

Dieser Artikel eröffnet die Lesestrecke „KI-Ethik Vertiefung“, danach folgt „Nudging, Aufmerksamkeitsökonomie & die Erosion der Autonomie“.

Verwandte Artikel:

- **Mensch-KI-Verhalten**: Machine Behaviour fragte, wie sich KI SELBST verhält; die Moral Machine fragte, welche Werte in KI-Entscheidungen einfließen sollen. Dieser Artikel wendet den Blick auf die dritte Facette: wie MENSCHEN reagieren, wenn sie mit KI-Empfehlungen umgehen — und warum die AI-Act-Pflicht zur menschlichen Aufsicht genau daran scheitern kann, wenn sie diese Reaktionen ignoriert.
- **Die Landkarte des Feldes**: KI-Ethik & Verhaltensforschung ist kein loses Bündel von Einzelthemen, sondern EIN Forschungsprogramm mit einer Soll-Seite (Ethik) und einer Ist-Seite (Verhaltensforschung) — diese Seite orientiert, bevor die folgenden Artikel in die Experimente und Debatten führen.

## Quellen

- BJ Fogg — Behavior Model (B=MAP: Motivation, Ability, Prompt). https://behaviormodel.org/ (abgerufen am 14.07.2026)
- Gray, Kou, Battles, Hoggatt & Toombs — The Dark (Patterns) Side of UX Design (CHI 2018). https://pure.psu.edu/en/publications/the-dark-patterns-side-of-ux-design/ (abgerufen am 14.07.2026)
- Mathur et al. — Dark Patterns at Scale: Findings from a Crawl of 11K Shopping Websites (arXiv:1907.07032, 2019). https://arxiv.org/abs/1907.07032 (abgerufen am 14.07.2026)
- AI Act — Artikel 5 (Verbotene Praktiken), Abs. 1 lit. a, b, f. https://artificialintelligenceact.eu/article/5/ (abgerufen am 14.07.2026)
- Future of Privacy Forum — Red Lines under the EU AI Act: Understanding Manipulative Techniques and the Exploitation of Vulnerabilities. https://fpf.org/blog/red-lines-under-the-eu-ai-act-understanding-manipulative-techniques-and-the-exploitation-of-vulnerabilities/ (abgerufen am 14.07.2026)
