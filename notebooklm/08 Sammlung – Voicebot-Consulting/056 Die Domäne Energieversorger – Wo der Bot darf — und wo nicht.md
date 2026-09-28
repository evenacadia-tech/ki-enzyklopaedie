# Die Domäne Energieversorger: Wo der Bot darf — und wo nicht

Ein Voicebot für einen Energieversorger trifft auf eine Rechtslandschaft, die genau festlegt, wo Automatisierung enden muss. Ein Stromvertrag lässt sich nicht rein mündlich abschließen — aber eine Kündigung schon. Eine Verbrauchsschätzung ist Sache des Lieferanten, ein Ersatzwert Sache des Messstellenbetreibers. Und der oft zitierte „flächendeckende" Smart-Meter-Rollout deckt die Realität bei Weitem nicht ab. Wer diese Domäne beraten will, muss diese Grenzen kennen, bevor er über Dialogdesign spricht.

Ein Artikel der KI-Enzyklopädie aus der Sammlung „Voicebot-Consulting“, Thema „Fallbeispiele“, Teil 4 von 4 der Lesestrecke. Auch bekannt als: Textform, EnWG, StromGVV, MaLo-ID, MsbG, Ersatzwert, iMSys, mME, Verbrauchsschätzung.

## Was der Bot nicht darf: der Vertragsabschluss

§ 41b Abs. 1 EnWG (Energiewirtschaftsgesetz) verlangt wörtlich: „Energielieferverträge mit Haushaltskunden außerhalb der Grundversorgung und deren Kündigung durch den Energielieferanten bedürfen der Textform." Ein rein mündlicher Telefonabschluss erfüllt diese Form nicht — der Bot kann also einen Sondervertrag NICHT rechtswirksam abschließen. Der telefonische Kontakt kann laut BDEW (Bundesverband der Energie- und Wasserwirtschaft) nur zur Vertragsanbahnung genutzt werden; der eigentliche Abschluss braucht einen Textform-Kanal (z. B. E-Mail-Bestätigung mit Klick-Bestätigung). Belegstatus: normiert (Gesetz, § 41b Abs. 1 EnWG).

Ja, und genau hier liegt die Design-Asymmetrie. Der BDEW stellt für den SONDERVERTRAG klar: „Für die Kündigung durch den Kunden ist kein Formerfordernis gesetzlich vorgeschrieben, so dass der Kunde … auch per Telefon eine mündliche Kündigung wirksam erklären kann." Ein Voicebot kann den vollständigen Kündigungs-/Wechselvorgang abwickeln — Abschluss ist gesperrt, Kündigung ist frei. Kontrast: In der GRUNDVERSORGUNG verlangt § 20 Abs. 2 StromGVV (Stromgrundversorgungsverordnung) ausdrücklich Textform — auch für die Kunden­kündigung. Die Formfreiheit gilt nur beim Sondervertrag, nicht in der Grundversorgung. Belegstatus: Praktikerkonvention (BDEW-Anwendungshilfe, keine eigene Gesetzesnorm für die Formfreiheit der Kundenkündigung — der Grundversorgungs-Kontrast selbst ist normiert, § 20 Abs. 2 StromGVV).

## Verbrauchsschätzung: zwei Akteure, nicht einer

Nein — verschiedene Akteure, Normen und Rechtsfolgen. Die SCHÄTZUNG ist Sache des Energielieferanten: § 40a Abs. 2 EnWG erlaubt, „die Abrechnung … auf einer Verbrauchsschätzung beruhen" zu lassen, wenn keine Ablesedaten vorliegen — mit Pflicht zum „ausdrücklichen und optisch besonders hervorgehobenen Hinweis" auf der Rechnung. Der ERSATZWERT ist Sache des Messstellenbetreibers (MSB, der für den Zähler selbst zuständige Akteur): § 55 Abs. 2 MsbG (Messstellenbetriebsgesetz) verpflichtet den MSB, im Einzelfall einen Ersatzwert zu bilden, wenn kein wahrer Messwert ermittelt werden kann. Wer den falschen Akteur anspricht, landet in der falschen Zuständigkeit. Belegstatus: normiert (Gesetz, § 40a Abs. 2 EnWG und § 55 Abs. 2 MsbG).

## Identifikation und die Smart-Meter-Realität

Nein. Die BDEW-Anwendungshilfe „Identifikatoren in der Marktkommunikation" (Bundesverband der Energie- und Wasserwirtschaft) beschreibt die MaLo-ID (Marktlokations-Identifikationsnummer) als „rein nummerische, 11-stellige" Nummer, deren letzte Stelle eine Prüfziffer trägt — wörtlich: „Für die Prüfziffernberechnung der MaLo-ID wird das Lok- und Waggon-Kennzeichnungsverfahren angewendet", NICHT Modulo-11 (eine kursierende Falschangabe). Verfahren: Quersumme der ungeraden Positionen bilden, Quersumme der geraden Positionen verdoppeln, beide addieren, zum nächsten Vielfachen von 10 auffüllen. Weil die Prüfziffer allein aus den 10 Vorziffern berechenbar ist, kann ein Bot einen Zahlendreher SOFORT erkennen, ohne einen Datenbank-Roundtrip abzuwarten. Belegstatus: Praktikerkonvention (BDEW-Anwendungshilfe „Identifikatoren in der Marktkommunikation", keine Gesetzesnorm).

Nein — die Prämisse selbst ist falsch. Von 56.464.984 Messlokationen in Deutschland tragen laut BNetzA (Bundesnetzagentur, Stichtag 31.12.2025) nur 3.094.346 ein intelligentes Messsystem (iMSys) — 5,5 %. Die BNetzA widerspricht der Flächendeckungs-These ausdrücklich: das Messstellenbetriebsgesetz „sieht … keinen flächendeckenden Rollout an allen Messlokationen vor" — verpflichtend ist der Einbau nur ab bestimmten Verbrauchs-/Leistungsschwellen. Für die übrigen gut 94 % bleibt die manuelle Ablesung bzw. -meldung der Normalfall, strukturell auf lange Sicht. Belegstatus: amtliche Statistik (BNetzA, Regulierungsbehörde).

## Einordnung in der Enzyklopädie

Dieser Artikel schließt die Lesestrecke „Voicebot-Consulting“ ab, davor steht „Messen & Wirtschaftlichkeit: Wenn der KPI selbst zur Frage wird“.

Verwandte Artikel:

- **KI in der Branchenpraxis**: Konkrete Anwendungsfälle aus Energie, Telekommunikation, Industrie und öffentlichem Sektor — jeweils mit Nutzen, Stolperstein und Regulierungsbezug.

## Quellen

- EnWG § 41b — Vertragsformen, Kündigung (gesetze-im-internet.de). https://www.gesetze-im-internet.de/enwg_2005/__41b.html (abgerufen am 17.07.2026)
- StromGVV § 20 — Kündigung (gesetze-im-internet.de). https://www.gesetze-im-internet.de/stromgvv/__20.html (abgerufen am 17.07.2026)
- EnWG § 40a — Verbrauchsermittlung (gesetze-im-internet.de). https://www.gesetze-im-internet.de/enwg_2005/__40a.html (abgerufen am 17.07.2026)
- BDEW — Anwendungshilfe „Identifikatoren in der Marktkommunikation", Version 1.2 (07.02.2025). https://www.bdew.de/media/documents/AWH_Identifikatoren-in-der-Marktkommunikation_Version.1.2.pdf (abgerufen am 17.07.2026)
- BNetzA — Intelligente Messsysteme (iMSys): Rollout-Statistik (Stichtag 31.12.2025). https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/NetzzugangMesswesen/Mess-undZaehlwesen/iMSys/start.html (abgerufen am 17.07.2026)
