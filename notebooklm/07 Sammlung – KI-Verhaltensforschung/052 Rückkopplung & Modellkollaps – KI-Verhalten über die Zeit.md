# Rückkopplung & Modellkollaps: KI-Verhalten über die Zeit

Ein KI-System liefert nicht einmalig ein Ergebnis und bleibt dann stabil — die Datenverteilung, auf der es arbeitet, verschiebt sich unter Rückkopplung und über die Zeit. Von der sich selbst bestätigenden Rückkopplungsschleife über die performative Vorhersage, die ihr eigenes Ziel verschiebt, bis zum Modellkollaps beim Training auf KI-generierten Daten zeigt dieses Feld, warum eine einmalige Labor-Abnahme nie genügt — und warum Monitoring und Datenprovenienz im Betrieb zur Beratungspflicht werden.

Ein Artikel der KI-Enzyklopädie aus der Sammlung „KI-Verhaltensforschung“, Thema „Beratung & Grundlagen“, Teil 2 von 2 der Lesestrecke. Auch bekannt als: Feedback Loop, Rückkopplung, Runaway Feedback, Performative Prediction, Performative Vorhersage, Model Collapse, Modellkollaps.

## Rückkopplungsschleifen: die Vorhersage bestätigt sich selbst

Ensign et al. (2018) beschreiben eine datengetriebene Selbstverstärkung: Das Vorhersagesystem wird mit genau den Vorfällen weitertrainiert, die durch sein eigenes Ausrollen erst erhoben werden. Lenkt es Ressourcen in ein vorhergesagtes Gebiet, entstehen dort schon durch die höhere Erfassungsdichte mehr registrierte Vorfälle; diese fließen als neue Trainingsdaten zurück, bestätigen die ursprüngliche Vorhersage und lenken noch mehr Ressourcen dorthin — „unabhängig von der tatsächlichen Kriminalitätsrate". Die Datengrundlage bildet so nicht die Realität ab, sondern die eigene Vorgeschichte des Systems.

Der Unterschied liegt zwischen ENTDECKTEN und GEMELDETEN Vorfällen. Speist man das System nicht mit den durch eigene Einsätze entdeckten Fällen, sondern mit von der Bevölkerung GEMELDETEN Vorfällen (die weniger direkt von der Streifenverteilung abhängen), schwächt sich die Selbstverstärkung ab. Ensign et al. betonen aber ausdrücklich: gemeldete Vorfälle können den Runaway-Effekt zwar dämpfen, ihn „ohne die vorgeschlagenen Eingriffe aber nicht vollständig beseitigen". Die Wahl der Datenquelle ist also ein Hebel, kein Freibrief.

## Performative Vorhersage: messen verändert das Gemessene

Perdomo et al. (2020) prägten den Begriff für den Fall, dass „Vorhersagen, sobald sie Entscheidungen stützen, das Ergebnis beeinflussen können, das sie vorhersagen wollen". Kurz: die Vorhersage verändert die Verteilung, die sie vorhersagt — der Akt des Vorhersagens ist nicht neutral. Eine gewöhnliche Prognose nimmt die Welt als gegeben; eine performative Vorhersage GESTALTET sie mit. Anschaulich: eine Stau-Vorhersage, die viele Fahrer auf dieselbe Ausweichroute lenkt, kann genau dort den Stau erzeugen, den sie vorhergesagt hat.

## Modellkollaps: KI, die auf sich selbst trainiert

Sie verfallen — Shumailov et al. (Nature 2024) nennen das „Model Collapse". Wird ein generatives Modell rekursiv auf modell-generierten Daten trainiert, entstehen „irreversible Defekte, bei denen die Ränder (tails) der ursprünglichen Datenverteilung verschwinden". Seltene Ereignisse und Randfälle gehen zuerst verloren, die Ausgabe wird immer einförmiger und driftet von der echten Datenverteilung weg. Der Effekt tritt nicht nur bei Sprachmodellen auf, sondern auch bei einfacheren Modellklassen wie Variational Autoencoders und Gaussian Mixture Models.

Weil jede Modell-Generation überwiegend das Häufige reproduziert und das Seltene untersampelt: Schon kleine Stichprobenfehler an den Verteilungsrändern verstärken sich über die Generationen, bis die tails ganz abbrechen (Preprint „The Curse of Recursion", Shumailov et al. 2023). Für das offene Web bedeutet das eine reale Rückkopplungsgefahr: Je mehr KI-generierter Text im Netz steht und ungefiltert in die nächste Trainingsrunde fließt, desto stärker droht eine schleichende Verarmung künftiger Modelle — die Datenherkunft (Provenienz) wird damit zur strategischen Frage.

## Einordnung in der Enzyklopädie

Dieser Artikel schließt die Lesestrecke „KI-Verhaltensforschung“ ab, davor steht „Wenn Optimierung schiefgeht: Reward Hacking & Zielfehlgeneralisierung“.

Verwandte Artikel:

- **Machine Behaviour — KI empirisch erforschen**: Das Rahwan-Paradigma sagt: KI-Verhalten lässt sich nicht aus dem Code allein ableiten, sondern muss empirisch erforscht werden — dieser Artikel zeigt, WIE (Forschungsmethodik), WORAN (drei reale Schlüssel-Experimente) und WAS DAVON GERADE STRITTIG ist.

## Quellen

- Ensign, Friedler, Neville, Scheidegger & Venkatasubramanian — Runaway Feedback Loops in Predictive Policing (FAT* 2018, arXiv:1706.09847). https://arxiv.org/abs/1706.09847 (abgerufen am 15.07.2026)
- Perdomo, Zrnic, Mendler-Dünner & Hardt — Performative Prediction (ICML 2020, arXiv:2002.06673). https://arxiv.org/abs/2002.06673 (abgerufen am 15.07.2026)
- Shumailov, Shumaylov, Zhao, Papernot, Anderson & Gal — AI models collapse when trained on recursively generated data (Nature 631:755–759, 2024). https://www.nature.com/articles/s41586-024-07566-y (abgerufen am 15.07.2026)
- Shumailov et al. — The Curse of Recursion: Training on Generated Data Makes Models Forget (arXiv:2305.17493, 2023). https://arxiv.org/abs/2305.17493 (abgerufen am 15.07.2026)
