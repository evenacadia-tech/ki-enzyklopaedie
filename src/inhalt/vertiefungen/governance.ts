import type { Quelle } from '../typen';
import type { Vertiefung } from '.';

// Governance und Zertifizierung (ISO/IEC 42001, harmonisierte Normen, NIST AI RMF, Konformität, HLEG); alle Quellen am 2026-09-28 abgerufen und geprüft.
const AB = '2026-09-28';
const Q = {
  // Recht der EU
  kivoKonsolidiert: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2024/1689 über künstliche Intelligenz, konsolidierte Fassung vom 27.07.2026 (EUR-Lex, 2026)',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/2026-07-27/deu',
    abgerufen: AB,
  } satisfies Quelle,
  kivoAmtsblatt: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2024/1689 über künstliche Intelligenz, Fassung im Amtsblatt mit Erwägungsgründen (ABl. L 2024/1689, 2024)',
    url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/deu',
    abgerufen: AB,
  } satisfies Quelle,
  omnibus: {
    titel:
      'Europäisches Parlament und Rat — Verordnung (EU) 2026/1744 zur Vereinfachung der Umsetzung harmonisierter Vorschriften für künstliche Intelligenz (Digital-Omnibus-Verordnung zur KI) (ABl. L 2026/1744, 2026)',
    url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/deu',
    abgerufen: AB,
  } satisfies Quelle,
  blueGuide: {
    titel:
      'Europäische Kommission — Leitfaden für die Umsetzung der Produktvorschriften der EU 2022 („Blue Guide“), 2022/C 247/01 (ABl. C 247, 2022)',
    url: 'https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:52022XC0629(04)',
    abgerufen: AB,
  } satisfies Quelle,
  // Normung
  kommissionNormung: {
    titel: 'Europäische Kommission — Standardisation of the AI Act (Shaping Europe’s digital future, Stand 03.08.2026)',
    url: 'https://digital-strategy.ec.europa.eu/en/policies/ai-act-standardisation',
    abgerufen: AB,
  } satisfies Quelle,
  cenJtc21: {
    titel: 'CEN-CENELEC — Artificial Intelligence: Joint Technical Committee 21 (CEN-CENELEC, o. J.)',
    url: 'https://www.cencenelec.eu/areas-of-work/cen-cenelec-topics/artificial-intelligence/',
    abgerufen: AB,
  } satisfies Quelle,
  cenEn18286: {
    titel: 'CEN-CENELEC — First Standard Approved under the AI Act (On the Spot, Newsletter, 2026)',
    url: 'https://www.cencenelec.eu/news-events/news/2026/newsletter/ots-75-anec/',
    abgerufen: AB,
  } satisfies Quelle,
  // ISO/IEC 42001 und Zertifizierung
  iso42001: {
    titel: 'ISO — ISO/IEC 42001:2023 Information technology — Artificial intelligence — Management system (ISO, 2023)',
    url: 'https://www.iso.org/standard/81230.html',
    abgerufen: AB,
  } satisfies Quelle,
  isoHarmonisierteStruktur: {
    titel: 'ISO, Joint Technical Coordination Group on MSS — Exploring MSS (committee.iso.org, o. J.)',
    url: 'https://committee.iso.org/sites/jtcg/home/exploring-mss.html',
    abgerufen: AB,
  } satisfies Quelle,
  iso42006: {
    titel:
      'ISO/IEC — ISO/IEC 42006:2025 Requirements for bodies providing audit and certification of artificial intelligence management systems (IEC Webstore, 2025)',
    url: 'https://webstore.iec.ch/en/publication/108460',
    abgerufen: AB,
  } satisfies Quelle,
  ias17021: {
    titel:
      'International Accreditation Service — ISO/IEC 17021-1:2015, Section 9: Process Requirements (Schulungsunterlage, IAS, 2021)',
    url: 'https://www.iasonline.org/wp-content/uploads/2021/02/17021-1-2015-Section-9.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  tuevNord42001: {
    titel: 'TÜV NORD — ISO/IEC 42001 Zertifizierung (TÜV NORD, o. J.)',
    url: 'https://www.tuev-nord.de/de/dienstleistungen/auditierung-und-zertifizierung/iso-iec-42001/',
    abgerufen: AB,
  } satisfies Quelle,
  // NIST
  nistRmf: {
    titel: 'NIST — AI Risk Management Framework (National Institute of Standards and Technology, Stand 2026)',
    url: 'https://www.nist.gov/itl/ai-risk-management-framework',
    abgerufen: AB,
  } satisfies Quelle,
  nistMerkmale: {
    titel:
      'NIST — AI RMF 1.0 (NIST AI 100-1), Abschnitt 3: AI Risks and Trustworthiness (Trustworthy and Responsible AI Resource Center, 2023)',
    url: 'https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/',
    abgerufen: AB,
  } satisfies Quelle,
  nistKern: {
    titel: 'NIST — AI RMF 1.0 (NIST AI 100-1), Abschnitt 5: AI RMF Core (Trustworthy and Responsible AI Resource Center, 2023)',
    url: 'https://airc.nist.gov/airmf-resources/airmf/5-sec-core/',
    abgerufen: AB,
  } satisfies Quelle,
  nistGenAi: {
    titel:
      'Autio, Schwartz, Dunietz, Jain, Stanley, Tabassi, Hall & Roberts — Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (NIST, 2024)',
    url: 'https://doi.org/10.6028/NIST.AI.600-1',
    abgerufen: AB,
  } satisfies Quelle,
  aktionsplanUsa: {
    titel: 'The White House — Winning the Race: America’s AI Action Plan (The White House, 2025)',
    url: 'https://www.whitehouse.gov/wp-content/uploads/2025/07/Americas-AI-Action-Plan.pdf',
    abgerufen: AB,
  } satisfies Quelle,
  // HLEG
  hlegSeite: {
    titel: 'Europäische Kommission — Ethics guidelines for trustworthy AI (Shaping Europe’s digital future, 2019)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai',
    abgerufen: AB,
  } satisfies Quelle,
  hlegLeitlinien: {
    titel:
      'Hochrangige Expertengruppe für künstliche Intelligenz — Ethik-Leitlinien für eine vertrauenswürdige KI (Europäische Kommission, 2019)',
    url: 'https://ec.europa.eu/newsroom/dae/document.cfm?doc_id=60425',
    abgerufen: AB,
  } satisfies Quelle,
  altai: {
    titel:
      'Europäische Kommission — Assessment List for Trustworthy Artificial Intelligence (ALTAI) for self-assessment (Shaping Europe’s digital future, 2020)',
    url: 'https://digital-strategy.ec.europa.eu/en/library/assessment-list-trustworthy-artificial-intelligence-altai-self-assessment',
    abgerufen: AB,
  } satisfies Quelle,
  mittelstadt2019: {
    titel: 'Mittelstadt — Principles Alone Cannot Guarantee Ethical AI (Nature Machine Intelligence 1(11), 2019)',
    url: 'https://doi.org/10.1038/s42256-019-0114-4',
    abgerufen: AB,
  } satisfies Quelle,
};

export const governance: Vertiefung[] = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'iso-42001',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Ein Managementsystem (management system) ist nach der Beschreibung, die ISO zur Norm veröffentlicht, ein Gefüge zusammenwirkender Elemente einer Organisation, mit dem sie Leitlinien und Ziele festlegt und Prozesse, um diese Ziele zu erreichen. ISO/IEC 42001 überträgt dieses Prinzip auf künstliche Intelligenz: Die Norm legt Anforderungen fest, um ein KI-Managementsystem (artificial intelligence management system, AIMS) einzurichten, umzusetzen, aufrechtzuerhalten und fortlaufend zu verbessern. Sie richtet sich an Organisationen jeder Größe, die KI-gestützte Produkte oder Dienste entwickeln, anbieten oder nutzen. Erarbeitet hat sie das gemeinsame KI-Gremium von ISO und IEC; veröffentlicht wurde sie im Dezember 2023. ISO nennt sie die weltweit erste Norm für ein KI-Managementsystem. Stand September 2026 gilt weiterhin ihre erste Ausgabe.',
          'Entscheidend ist die Ebene, auf der die Norm ansetzt. Sie beschreibt kein Modell und keine Technik, sondern die Steuerung durch die Organisation. Statt die Einzelheiten bestimmter Anwendungen zu betrachten, bietet sie nach ISO einen Weg, KI-bezogene Risiken und Chancen über die ganze Organisation hinweg zu managen, im Zyklus aus Planen, Umsetzen, Prüfen und Handeln (Plan-Do-Check-Act). Zertifizierungsstellen wie TÜV NORD nennen als Bausteine Governance-Strukturen und Verantwortlichkeiten, Verfahren zur Risiko- und Auswirkungsbewertung, Regeln für Datenqualität und Modellpflege, die Nachvollziehbarkeit von KI-Entscheidungen und menschliche Aufsicht. Verkürzt: Richtlinien, Rollen, Risikomanagement und fortlaufende Verbesserung für den gesamten KI-Einsatz.',
        ],
      },
      {
        titel: 'Dieselbe Grundstruktur wie ISO 27001',
        absaetze: [
          'Der Vergleich mit ISO/IEC 27001, der Norm für das Management der Informationssicherheit, ist mehr als ein Werbebild. Alle Managementsystemnormen von ISO und IEC folgen einer harmonisierten Struktur (harmonized structure): gleiche Kapitelnummern in gleicher Reihenfolge, gleiche Überschriften, gemeinsame Begriffe und ein gemeinsamer Kerntext mit Anforderungen. Die zuständige Koordinierungsgruppe bei ISO nennt als Zweck, die Integration über Fachgebiete hinweg zu fördern und es Organisationen zu erleichtern, mehrere Managementsystemnormen umzusetzen und sich auf Wunsch danach zertifizieren zu lassen. Wer schon ein Informationssicherheitssystem nach ISO/IEC 27001 betreibt, findet deshalb den vertrauten Rahmen wieder und setzt das KI-Managementsystem darauf auf, statt ein zweites danebenzubauen. Verschieden sind die Inhalte: Das eine System schützt Informationen, das andere steuert, wie KI entwickelt, bereitgestellt und genutzt wird.',
        ],
      },
      {
        titel: 'Wie die Zertifizierung abläuft',
        absaetze: [
          'Die Zertifizierung eines KI-Managementsystems ist eine Konformitätsbewertung durch Dritte. Für die Stellen, die sie durchführen, gelten die allgemeinen Anforderungen der ISO/IEC 17021-1; ISO/IEC 42006, im Juli 2025 veröffentlicht, ergänzt sie um KI-spezifische Anforderungen, damit diese Stellen Kompetenz, Einheitlichkeit und Verlässlichkeit belegen können. Akkreditierungsstellen können die Norm als Prüfmaßstab verwenden. Den Ablauf regelt ISO/IEC 17021-1. Das Erstaudit hat zwei Stufen: In Stufe 1 prüft das Auditteam das dokumentierte Managementsystem und die Bereitschaft für Stufe 2; Stufe 2 findet vor Ort statt und bewertet die Umsetzung einschließlich ihrer Wirksamkeit, darunter Leistungsüberwachung, Prozesssteuerung, interne Audits und Managementbewertung.',
          'Mit der Zertifizierungsentscheidung beginnt ein Zyklus von drei Jahren. Überwachungsaudits (surveillance audits) finden mindestens einmal je Kalenderjahr statt, das erste spätestens zwölf Monate nach der Entscheidung; im dritten Jahr folgt vor Ablauf des Zertifikats das Rezertifizierungsaudit, mit dem der nächste Zyklus beginnt. TÜV NORD beschreibt den Weg für ISO/IEC 42001 genauso: Stufe 1 zur Feststellung der Zertifizierungsreife, Stufe 2 zur Prüfung von Umsetzung und Wirksamkeit, dann Überwachungsaudits und die Rezertifizierung nach drei Jahren. Das Zertifikat ist also kein einmaliger Stempel, sondern verpflichtet dazu, jedes Jahr zu zeigen, dass das System gelebt wird.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Softwarehaus mit 120 Beschäftigten, seit Jahren nach ISO/IEC 27001 zertifiziert, baut KI-Funktionen in seine Produkte für Versicherer ein. In Ausschreibungen tauchen Fragen nach KI-Governance auf, und die Geschäftsführung will „die KI-Norm“. Die Beraterin beginnt mit dem Geltungsbereich (scope): Welche KI-Systeme, welche Standorte, und entwickelt das Haus KI selbst oder nutzt es fremde Modelle? Dann trennt sie Vorhandenes von Neuem. Managementbewertung, interne Audits und Dokumentenlenkung laufen bereits und werden erweitert, nicht verdoppelt. Neu sind ein Verzeichnis aller KI-Systeme, eine Risiko- und Auswirkungsbewertung je System, Verantwortliche für Datenqualität und Modellpflege und Regeln für menschliche Aufsicht. Weil Stufe 2 die Wirksamkeit prüft, plant sie vor dem Audit eine Betriebsphase ein, in der Nachweise entstehen. In Angeboten spricht das Haus danach von einem zertifizierten Managementsystem, nicht von zertifizierten Produkten.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Ein Zertifikat nach ISO/IEC 42001 bescheinigt, dass ein Managementsystem der Norm entspricht und wirksam betrieben wird. Es bescheinigt nicht, dass ein bestimmtes Modell genau, fair oder rechtmäßig ist; ISO betont selbst, dass die Norm die Einzelheiten konkreter Anwendungen nicht betrachtet. Ein zertifiziertes Unternehmen kann also ein fehlerhaftes System betreiben. Geprüft wird, ob es Prozesse gibt, die solche Fehler erkennen und behandeln sollen, und anhand von Nachweisen, ob sie greifen. Hinzu kommt der Geltungsbereich, der eng gezogen sein kann. Wer ein Zertifikat als Beleg bekommt, sollte lesen, was genau zertifiziert wurde und von welcher Stelle.',
          'Die zweite Grenze ist der Aufwand. Ein Managementsystem erzeugt Dokumente, Rollen und Termine und kann zur Pflichtübung werden, die neben der eigentlichen Entwicklungsarbeit herläuft. Die Zertifizierung ist freiwillig; kleinen Organisationen kann es genügen, ihr System an der Norm auszurichten, ohne sich sofort prüfen zu lassen. Schließlich ist die Norm kein Gesetz. Was ein Zertifikat gegenüber der europäischen KI-Verordnung leistet und was nicht, ist eine eigene Frage, die der Artikel über ISO 42001 und die KI-Verordnung behandelt. Wer mit dem Zertifikat wirbt, sollte diese Unterscheidung kennen, bevor ein Kunde danach fragt.',
        ],
      },
    ],
    quellen: [Q.iso42001, Q.isoHarmonisierteStruktur, Q.iso42006, Q.ias17021, Q.tuevNord42001],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'iso-42001-kein-freibrief',
    abschnitte: [
      {
        titel: 'Zwei Prüfungen, zwei Gegenstände',
        absaetze: [
          'Die Verwechslung liegt nahe, weil beides nach Prüfung durch Dritte klingt. Ein Zertifikat nach ISO/IEC 42001 bescheinigt, dass eine Organisation ihr KI-Managementsystem so betreibt, wie die Norm es verlangt; ISO beschreibt die Norm als organisationsweiten Rahmen, der die Einzelheiten bestimmter Anwendungen nicht betrachtet. Die KI-Verordnung (EU) 2024/1689 fragt dagegen nach dem einzelnen Produkt. Nach Artikel 16 muss der Anbieter eines Hochrisiko-KI-Systems sicherstellen, dass es die Anforderungen des Kapitels III Abschnitt 2 erfüllt, es vor dem Inverkehrbringen der Konformitätsbewertung nach Artikel 43 unterziehen, eine EU-Konformitätserklärung ausstellen und die CE-Kennzeichnung anbringen. Mit der Erklärung übernimmt er nach Artikel 47 Absatz 4 selbst die Verantwortung für die Erfüllung der Anforderungen. Diese Verantwortung wandert nicht zu einer Zertifizierungsstelle.',
          'Eine Norm kann den Nachweis erleichtern, aber nur auf einem bestimmten Weg. Nach Artikel 40 Absatz 1 wird die Konformität vermutet, wenn ein Hochrisiko-KI-System harmonisierten Normen entspricht, deren Fundstellen im Amtsblatt der Europäischen Union veröffentlicht wurden, und nur soweit diese Normen die Anforderungen abdecken. Harmonisierte Normen sind europäische Normen, die die europäischen Normungsorganisationen im Auftrag der Kommission erarbeiten. ISO/IEC 42001 ist eine internationale Norm und keine solche. Der Leitfaden der Kommission zu den Produktvorschriften (Blue Guide) hält fest, dass europäische Normen auf ISO- oder IEC-Normen beruhen können, die Vermutung aber nur entsteht, wenn die im Amtsblatt genannte europäische Fassung angewandt wird. Ein ISO-42001-Zertifikat begründet deshalb keine Konformitätsvermutung nach der KI-Verordnung, so wertvoll es als Baustein der Governance ist.',
        ],
      },
      {
        titel: 'Die europäische Norm, Stand September 2026',
        absaetze: [
          'Für das Qualitätsmanagement nach Artikel 17 gibt es inzwischen eine eigene europäische Norm: EN 18286 „Artificial intelligence – Quality management system for EU AI Act regulatory purposes“. Die Kommission beschreibt sie als eigens dafür gedacht, Anbietern von Hochrisiko-KI-Systemen die Erfüllung von Artikel 17 zu erleichtern, mit einem produktbezogenen Rahmen für die Steuerung des KI-Lebenszyklus. Erarbeitet wurde sie im gemeinsamen Technischen Komitee JTC 21 von CEN und CENELEC. Der Entwurf prEN 18286 ging am 30. Oktober 2025 als erste harmonisierte KI-Norm in die öffentliche Umfrage; im Juni 2026 haben CEN und CENELEC die Norm angenommen. Im Juli 2026 erwartete CEN-CENELEC, dass die Kommission ihre Fundstelle später im Jahr im Amtsblatt veröffentlicht. Stand September 2026 ist das nicht geschehen. Auch EN 18286 begründet daher heute keine Vermutung, denn nach dem Blue Guide gilt ohne Veröffentlichung der Fundstelle keine Konformitätsvermutung; und danach nur, soweit die Norm Anforderungen abdeckt.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Anbieter von Software zur Vorauswahl von Bewerbungen mit 90 Beschäftigten hat sich nach ISO/IEC 42001 zertifizieren lassen, und das Marketing schreibt „KI-Verordnung erfüllt dank ISO 42001“. Das System fällt unter Anhang III Nummer 4 und ist damit hochriskant; die Pflichten dafür gelten nach der Änderung der Verordnung im Juli 2026 ab dem 2. Dezember 2027. Die Beraterin trennt zwei Arbeitsstränge. Das Managementsystem bleibt das Fundament, denn Verantwortlichkeiten, Risikomanagement und Dokumentation verlangt auch Artikel 17. Daneben entsteht die Akte für das konkrete System: technische Dokumentation, ein Qualitätsmanagementsystem, das alle in Artikel 17 genannten Punkte abdeckt, die interne Kontrolle nach Anhang VI, die EU-Konformitätserklärung, die CE-Kennzeichnung und die Registrierung. Den Werbesatz lässt sie ändern, bevor ein Kunde ihn im Vertragsentwurf zitiert.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Der häufigste Fehler ist, das Zertifikat als Rechtsnachweis zu behandeln. Ein Audit bestätigt, was im Prüfumfang steht, und das ist das Managementsystem; wer unsicher ist, lässt sich den Geltungsbereich von der Zertifizierungsstelle schriftlich geben. Der zweite Fehler ist, auf die harmonisierte Norm zu warten und bis dahin nichts zu tun. Die Anwendung harmonisierter Normen ist freiwillig; wer keine anwendet, weist die Konformität nach dem Blue Guide mit anderen Mitteln nach und begründet in der technischen Dokumentation genauer, wie die Anforderungen erfüllt werden. Artikel 17 verlangt ohnehin, im Qualitätsmanagementsystem die angewandten Normen zu nennen und, wo harmonisierte Normen fehlen oder nicht alles abdecken, die Mittel, mit denen die Anforderungen erfüllt werden. Der dritte Fehler ist, Verwandtschaft mit Rechtswirkung zu verwechseln: Wirkung hat nur die im Amtsblatt genannte europäische Fassung, und nur für das, was sie abdeckt.',
        ],
      },
    ],
    quellen: [Q.kivoKonsolidiert, Q.blueGuide, Q.iso42001, Q.kommissionNormung, Q.cenEn18286],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'harmonisierung',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die KI-Verordnung folgt dem Muster des europäischen Produktrechts: Das Gesetz legt fest, welche Anforderungen ein Hochrisiko-KI-System erfüllen muss, etwa an Risikomanagement, Daten, menschliche Aufsicht, Genauigkeit und Robustheit; wie man sie technisch erfüllt und nachweist, beschreiben Normen. Den rechtlichen Hebel liefert Artikel 40 Absatz 1. Stimmt ein System mit harmonisierten Normen oder Teilen davon überein, deren Fundstellen im Amtsblatt der Europäischen Union veröffentlicht wurden, wird die Konformität mit den Anforderungen vermutet, soweit die Normen sie abdecken. Die Kommission nennt als Nutzen Rechtssicherheit und geringere Kosten der Einhaltung: Wer keine solche Norm anwendet, muss nach dem Leitfaden der Kommission zu den Produktvorschriften (Blue Guide) in seiner technischen Dokumentation ausführlicher begründen, wie er die Anforderungen erfüllt.',
          'Zwei Einschränkungen gehören dazu. Die Anwendung bleibt freiwillig; Anbieter können jeden anderen Weg wählen, tragen dann aber den Nachweis selbst. Wer eine harmonisierte Norm nur teilweise anwendet oder eine Norm nutzt, die nicht alle Anforderungen abdeckt, genießt die Vermutung nach dem Blue Guide nur in diesem Umfang. Und die Vermutung ist widerlegbar. Stellt eine Marktüberwachungsbehörde fest, dass ein Produkt trotz Normanwendung die Anforderungen verfehlt, kann sie nach dem Blue Guide einschreiten; erweist sich dabei die Norm als mangelhaft, kann ihre Fundstelle im Amtsblatt eingeschränkt oder gestrichen werden. Die Vermutung erleichtert den Nachweis, sie macht ein Produkt aber nicht unangreifbar.',
        ],
      },
      {
        titel: 'Wer die Normen schreibt',
        absaetze: [
          'Harmonisierte Normen entstehen auf Bestellung. Nach Artikel 40 Absatz 2 erteilt die Kommission den europäischen Normungsorganisationen Normungsaufträge. Der Auftrag zur KI-Verordnung umfasst nach Angaben der Kommission zehn Bereiche: Risikomanagement, Steuerung und Qualität von Datensätzen, Aufzeichnung, Transparenz, menschliche Aufsicht, Genauigkeit, Robustheit, Cybersicherheit, Qualitätsmanagement und Konformitätsbewertung. Bearbeitet wird er von CEN und CENELEC in ihrem gemeinsamen Technischen Komitee JTC 21, gegründet am 1. Juni 2021. Das Verfahren endet nicht mit der Veröffentlichung einer Norm: Die Kommission prüft, ob sie den Auftrag und die rechtlichen Anforderungen erfüllt, und veröffentlicht erst dann die Fundstelle im Amtsblatt. Diese Veröffentlichung legt nach dem Blue Guide das Datum fest, ab dem die Vermutung wirkt.',
          'Internationale Normen spielen eine Rolle, aber keine unmittelbare. Die europäische Normung folgt dem Grundsatz „international zuerst“: Normen von ISO und IEC, die mit den Anforderungen der Union übereinstimmen, können zu harmonisierten europäischen Normen werden. Die Vermutung entsteht aber nur, wenn die im Amtsblatt genannte europäische Fassung angewandt wird, weil sie technisch angepasst sein kann und nur sie zuordnet, welche Bestimmung welche Anforderung abdeckt. Eine ISO-Norm wie ISO/IEC 42001 wirkt also nicht von selbst. Fehlen harmonisierte Normen oder genügen sie nicht, etwa weil sie Bedenken im Bereich der Grundrechte nicht ausreichend Rechnung tragen, kann die Kommission nach Artikel 41 gemeinsame Spezifikationen (common specifications) erlassen, die ebenfalls eine Vermutung begründen.',
        ],
      },
      {
        titel: 'Stand September 2026',
        absaetze: [
          'Als erste harmonisierte KI-Norm ging am 30. Oktober 2025 der Entwurf prEN 18286 zum Qualitätsmanagement in die öffentliche Umfrage; im Juni 2026 haben CEN und CENELEC ihn als EN 18286 angenommen. Im Juli 2026 erwartete CEN-CENELEC, dass die Kommission die Fundstelle später im Jahr veröffentlicht. Stand September 2026 steht sie noch nicht im Amtsblatt, und damit trägt noch keine Norm zur KI-Verordnung eine Vermutung. Das hat Folgen. Für biometrische Systeme nach Anhang III Nummer 1 darf der Anbieter nach Artikel 43 Absatz 1 nur dann zwischen interner Kontrolle und notifizierter Stelle wählen, wenn er harmonisierte Normen oder gemeinsame Spezifikationen angewandt hat; solange es beides nicht gibt, bleibt nur die notifizierte Stelle. Die Hochrisiko-Pflichten selbst gelten für Systeme nach Anhang III ab dem 2. Dezember 2027.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Softwarehaus mit 60 Beschäftigten entwickelt ein System, das Bewerbungen sichtet und vorsortiert; nach Anhang III Nummer 4 ist das ein Hochrisiko-System. Die Geschäftsführung fragt, ob sie auf die Normen warten soll. Die Beraterin rät zum Gegenteil. Das Qualitätsmanagementsystem wird jetzt aufgebaut und dabei an EN 18286 ausgerichtet, obwohl die Norm noch keine Vermutung trägt; erscheint die Fundstelle, ist der Abstand klein. Im Qualitätsmanagementsystem hält das Haus fest, welche Normen und Spezifikationen es anwendet und mit welchen Mitteln es Anforderungen erfüllt, die keine harmonisierte Norm abdeckt, wie es Artikel 17 Absatz 1 Buchstabe e verlangt. Und jemand beobachtet das Amtsblatt, denn eine Fundstelle kann mit Einschränkung veröffentlicht werden, und dann ist auch die Vermutung eingeschränkt.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Harmonisierte Normen verlagern einen Teil der Regelsetzung in Normungsgremien. Was das Gesetz allgemein als angemessenes Risikomanagement oder ausreichende Genauigkeit beschreibt, wird dort konkret, und wer mitarbeitet, prägt, was als Stand der Technik gilt. Die Verordnung reagiert darauf selbst: Artikel 40 Absatz 3 verlangt eine ausgewogene Vertretung der Interessen und die wirksame Beteiligung aller relevanten Interessenträger, und Artikel 41 erlaubt Ersatzregeln der Kommission, wenn Normen den Grundrechten nicht ausreichend Rechnung tragen. Hinzu kommt die Zeit: Zwischen der Gründung von JTC 21 im Jahr 2021 und der Annahme der ersten Norm lagen fünf Jahre. Und die Vermutung reicht nie weiter als die Abdeckung; eine Norm zum Qualitätsmanagement sagt nichts darüber, ob ein Modell genau oder robust ist.',
        ],
      },
    ],
    quellen: [Q.kivoKonsolidiert, Q.blueGuide, Q.kommissionNormung, Q.cenJtc21, Q.cenEn18286],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'nist-rmf',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Das National Institute of Standards and Technology (NIST), eine Behörde des US-Handelsministeriums, hat das AI Risk Management Framework am 26. Januar 2023 als Fassung 1.0 veröffentlicht; die Dokumentnummer lautet NIST AI 100-1. Es entstand in einem offenen Verfahren mit öffentlicher Informationsanfrage, mehreren Entwürfen zur Kommentierung und Workshops. Nach NIST ist es für die freiwillige Nutzung gedacht und soll Organisationen helfen, Vertrauenswürdigkeit bei Entwurf, Entwicklung, Nutzung und Bewertung von KI-Produkten, -Diensten und -Systemen zu berücksichtigen. Es ist kein Gesetz und begründet in der EU keine Pflicht. Stand September 2026 gilt die Fassung 1.0; NIST gibt an, sie werde im Rahmen des KI-Aktionsplans des Weißen Hauses überarbeitet.',
        ],
      },
      {
        titel: 'Vier Funktionen',
        absaetze: [
          'Den Kern bilden vier Funktionen. Govern (Leitung und Steuerung) baut eine Kultur des Risikomanagements auf und legt Richtlinien, Prozesse und Verantwortlichkeiten fest; dazu gehört, dass rechtliche und regulatorische Anforderungen an KI verstanden, gesteuert und dokumentiert sind. Map (Erfassen) klärt den Kontext: beabsichtigte Zwecke, Nutzer, geltende Gesetze und Normen, mögliche positive und negative Wirkungen. Measure (Messen) wählt Methoden und Kennzahlen, beginnend mit den bedeutendsten Risiken, und dokumentiert ausdrücklich, was sich nicht messen lässt. Manage (Behandeln) priorisiert die Risiken, reagiert auf sie und entscheidet auch, ob Entwicklung oder Einsatz eines Systems überhaupt weitergehen sollen. Govern ist als Querschnittsfunktion angelegt, die in die anderen drei hineinwirkt. Eine feste Reihenfolge gibt es nicht; nach Govern beginnen die meisten Nutzer mit Map, und der Prozess soll iterativ laufen.',
        ],
      },
      {
        titel: 'Sieben Merkmale vertrauenswürdiger KI',
        absaetze: [
          'Woran sich Vertrauenswürdigkeit bemisst, beschreibt das Rahmenwerk mit sieben Merkmalen: valide und zuverlässig (valid and reliable), betriebssicher (safe), angriffssicher und widerstandsfähig (secure and resilient), rechenschaftspflichtig und transparent (accountable and transparent), erklärbar und interpretierbar (explainable and interpretable), datenschutzfördernd (privacy-enhanced) sowie fair mit beherrschtem schädlichem Bias (fair with harmful bias managed). Valide und zuverlässig ist die notwendige Bedingung und bildet in der Darstellung von NIST die Basis der übrigen; rechenschaftspflichtig und transparent steht quer zu allen anderen. Die Merkmale müssen gegeneinander abgewogen werden: Interpretierbarkeit kann mit Datenschutz kollidieren, Vorhersagegenauigkeit mit Interpretierbarkeit. Kennzahlen und Schwellenwerte soll menschliches Urteil im Kontext festlegen, und Vertrauenswürdigkeit ist nach NIST nur so stark wie ihr schwächstes Merkmal.',
          'Für generative KI hat NIST am 26. Juli 2024 ein eigenes Profil veröffentlicht, NIST AI 600-1. Es beschreibt zwölf Risiken, die generative KI neu schafft oder verschärft, darunter Konfabulation (confabulation), also selbstsicher formulierte, aber falsche Inhalte, umgangssprachlich Halluzinationen genannt, dazu Datenschutz, Informationssicherheit, schädlichen Bias und ein problematisches Zusammenspiel von Mensch und KI wie Automatisierungsvertrauen (automation bias) und übermäßige Abhängigkeit. Das Profil versteht sich als Begleitdokument zum AI RMF 1.0, nicht als eigenes Rahmenwerk: Jedes Risiko ist den Vertrauensmerkmalen zugeordnet, und die vorgeschlagenen Maßnahmen sind nach den Unterkategorien der vier Funktionen geordnet.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Stadtwerk mit 300 Beschäftigten will einen Chatbot für Kundenanfragen zu Tarifen und Abschlägen einführen. Die Beraterin beginnt mit Govern: Wer entscheidet über den Start, welches Risiko ist hinnehmbar, welche Vorschriften gelten, und wer ist zuständig, wenn der Bot falsche Auskünfte gibt? Map beschreibt die Lage: Kunden fragen nach Geld, und eine falsche Angabe zu Abschlägen erzeugt Beschwerden. Measure baut einen Testsatz aus echten, anonymisierten Anfragen und misst, wie oft der Bot falsche Tarifangaben macht; was sich nicht messen lässt, etwa die Wirkung auf ältere Kunden, wird ausdrücklich notiert. Manage entscheidet: Start nur mit Übergabe an einen Menschen bei Vertragsfragen und mit einem Verfahren für gemeldete Fehler. Die Risikoliste des Profils für generative KI dient als Prüfliste, damit nichts übersehen wird.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Das Rahmenwerk beschreibt, wie eine Organisation mit KI-Risiken umgehen kann, nicht, was ein Gesetz verlangt. Wer in der EU KI anbietet oder einsetzt, unterliegt der europäischen KI-Verordnung; das AI RMF kann die Arbeit dafür ordnen, etwa über Govern, das rechtliche Anforderungen erfassen lässt, ersetzt sie aber nicht. Zweitens ist es bewusst offen formuliert. Kennzahlen, Schwellenwerte und Abwägungen überlässt es dem Urteil der Anwender; zwei Organisationen können sich auf das AI RMF berufen und sehr Verschiedenes tun. Drittens ist sein Inhalt politisch nicht fest. Der KI-Aktionsplan des Weißen Hauses vom Juli 2025 fordert, das Rahmenwerk so zu überarbeiten, dass Bezüge zu Fehlinformation (misinformation), zu Vielfalt, Gleichberechtigung und Inklusion (diversity, equity and inclusion) sowie zum Klimawandel entfallen. Wer sich auf das AI RMF beruft, sollte deshalb angeben, welche Fassung gemeint ist.',
        ],
      },
    ],
    quellen: [Q.nistRmf, Q.nistKern, Q.nistMerkmale, Q.nistGenAi, Q.aktionsplanUsa],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'konformitaet',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Wer ein Hochrisiko-KI-System in der Europäischen Union in Verkehr bringt, trägt als Anbieter die Pflichten aus Artikel 16 der KI-Verordnung. Sie bilden eine Kette: Das System muss die Anforderungen des Kapitels III Abschnitt 2 erfüllen, darunter Risikomanagement (Artikel 9) und technische Dokumentation (Artikel 11 mit Anhang IV). Der Anbieter braucht ein Qualitätsmanagementsystem nach Artikel 17, unterzieht das System vor dem Inverkehrbringen oder der Inbetriebnahme der Konformitätsbewertung nach Artikel 43, stellt eine EU-Konformitätserklärung nach Artikel 47 aus, bringt die CE-Kennzeichnung nach Artikel 48 an und registriert sich und das System nach Artikel 49. Auf begründete Anfrage einer Behörde muss er nachweisen, dass die Anforderungen erfüllt sind.',
          'Seit dem 27. Juli 2026 gilt die Verordnung in der Fassung der Digital-Omnibus-Verordnung (EU) 2026/1744. Danach gelten die Hochrisiko-Vorschriften des Kapitels III Abschnitte 1 bis 3, zu denen die Artikel 16 und 17 gehören, für Systeme nach Anhang III ab dem 2. Dezember 2027 und für Systeme nach Anhang I ab dem 2. August 2028. Die Vorschriften über notifizierende Behörden und notifizierte Stellen in Abschnitt 4 gelten dagegen schon seit dem 2. August 2025. Die Nachweise der Anbieter müssen also vor den Stichtagen stehen, nicht an ihnen beginnen.',
        ],
      },
      {
        titel: 'Das Qualitätsmanagementsystem',
        absaetze: [
          'Artikel 17 verlangt ein Qualitätsmanagementsystem, das die Einhaltung der Verordnung gewährleistet und in schriftlichen Regeln, Verfahren und Anweisungen dokumentiert ist. Mindestens gehören dazu ein Konzept zur Einhaltung der Vorschriften samt Konformitätsbewertung und Änderungsmanagement, Verfahren für Entwurf, Entwicklung und Qualitätssicherung, Tests vor, während und nach der Entwicklung, die angewandten Normen, das Datenmanagement, das Risikomanagementsystem, die Beobachtung nach dem Inverkehrbringen (Artikel 72), die Meldung schwerwiegender Vorfälle, die Kommunikation mit Behörden, die Aufzeichnung der Dokumentation, das Ressourcenmanagement und ein Rechenschaftsrahmen für Leitung und Personal. Der Umfang richtet sich nach der Größe der Organisation, seit dem Omnibus ausdrücklich auch für kleine Midcap-Unternehmen; den nötigen Grad an Strenge und das Schutzniveau muss aber jeder Anbieter einhalten.',
          'Ein Managementsystem nach ISO/IEC 42001 ist dafür eine gute operative Grundlage, weil es Richtlinien, Verfahren und das Management von KI-Risiken bereits organisiert. Es ist aber organisationsweit angelegt und betrachtet nach ISO nicht die Einzelheiten einzelner Anwendungen, während Artikel 17 auf das jeweilige Hochrisiko-System zielt. Die Kommission beschrieb schon den Entwurf der europäischen Qualitätsmanagementnorm, prEN 18286, als eigens für Artikel 17 gedachten, produktbezogenen Rahmen; ihren Stand beschreibt der Artikel über harmonisierte Normen. Wer nach sektoralem Unionsrecht schon ein Qualitätsmanagementsystem führen muss, darf die Aspekte von Artikel 17 dort einbeziehen; für Finanzinstitute gilt die Pflicht weitgehend als erfüllt, wenn sie die Regeln ihres Aufsichtsrechts zur internen Unternehmensführung einhalten.',
        ],
      },
      {
        titel: 'Bewertung, Erklärung, Kennzeichnung',
        absaetze: [
          'Welches Verfahren gilt, bestimmt Artikel 43. Für Systeme nach Anhang III Nummern 2 bis 8, etwa in Bildung, Beschäftigung oder beim Zugang zu wesentlichen Diensten, ist es die interne Kontrolle nach Anhang VI, ohne notifizierte Stelle. Der Anbieter prüft selbst, ob sein Qualitätsmanagementsystem Artikel 17 entspricht, ob die technische Dokumentation die Erfüllung der Anforderungen belegt und ob Entwicklungsprozess und Beobachtung nach dem Inverkehrbringen mit ihr übereinstimmen. Für biometrische Systeme nach Anhang III Nummer 1 prüft eine notifizierte Stelle nach Anhang VII Qualitätsmanagementsystem und technische Dokumentation, es sei denn, der Anbieter hat harmonisierte Normen oder gemeinsame Spezifikationen vollständig angewandt; dann darf er wählen. Für Produkte nach Anhang I Abschnitt A gilt das Verfahren des jeweiligen Produktrechts.',
          'Am Ende steht die EU-Konformitätserklärung: schriftlich, maschinenlesbar, physisch oder elektronisch unterzeichnet, zehn Jahre für die Behörden aufzubewahren. Mit ihr übernimmt der Anbieter die Verantwortung für die Erfüllung der Anforderungen. Die CE-Kennzeichnung wird sichtbar, leserlich und dauerhaft angebracht, bei digital bereitgestellten Systemen digital. Anbieter von Systemen nach Anhang III registrieren sich und das System vor dem Inverkehrbringen in der EU-Datenbank, Systeme der kritischen Infrastruktur auf nationaler Ebene. Danach beginnt die Beobachtung nach dem Inverkehrbringen (post-market monitoring): Der Anbieter erhebt und analysiert über die gesamte Lebensdauer aktiv und systematisch Daten zur Leistung des Systems. Eine wesentliche Änderung löst eine neue Konformitätsbewertung aus; vorab festgelegte und dokumentierte Änderungen eines weiterlernenden Systems gelten nicht als wesentlich.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Ein Softwarehaus mit 80 Beschäftigten bietet eine Anwendung an, die Bewerbungen sichtet und eine Rangliste erstellt; nach Anhang III Nummer 4 ist das ein Hochrisiko-System. Im Projektplan steht die Konformitätsbewertung als Punkt kurz vor dem Stichtag. Die Beraterin dreht den Plan um. Weil die interne Kontrolle nur einsammelt, was im Projekt entstanden sein muss, beginnt die Arbeit mit dem Qualitätsmanagementsystem und der technischen Dokumentation, die mit jedem Entwicklungsschritt wachsen. Das geplante Nachtrainieren des Modells wird jetzt mit Grenzen und Prüfpunkten in der Dokumentation festgelegt, damit spätere Aktualisierungen keine neue Bewertung auslösen. Der Plan zur Beobachtung nach dem Inverkehrbringen legt fest, welche Leistungsdaten von den Kunden zurückfließen. Erst am Ende folgen Erklärung, Kennzeichnung und Registrierung.',
        ],
      },
      {
        titel: 'Typische Fehler',
        absaetze: [
          'Der erste Fehler ist die Bewertung als Formalie am Projektende. Anhang VI prüft, ob Entwicklungsprozess und Dokumentation zusammenpassen; eine Akte aus der letzten Woche beschreibt ein Projekt, das so nicht stattgefunden hat. Der zweite ist die CE-Kennzeichnung als Startschein: Sie zeigt die Konformität an und setzt die abgeschlossene Bewertung voraus. Der dritte lautet „einmal bewertet, immer konform“, obwohl wesentliche Änderungen eine neue Bewertung verlangen. Der vierte ist die Annahme, jede Bewertung brauche eine externe Prüfstelle; für die meisten Anhang-III-Systeme sieht die Verordnung keine vor, der Aufwand steckt in den eigenen Nachweisen. Und die Pflicht endet nicht mit dem Markteintritt: Beobachtung, Meldung schwerwiegender Vorfälle und die Aktualisierung der Erklärung laufen weiter.',
        ],
      },
    ],
    quellen: [Q.kivoKonsolidiert, Q.omnibus, Q.iso42001, Q.kommissionNormung],
  },
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'hleg',
    abschnitte: [
      {
        titel: 'Worum es geht',
        absaetze: [
          'Die Hochrangige Expertengruppe für künstliche Intelligenz (HEG-KI; englisch High-Level Expert Group on AI, kurz HLEG) ist ein unabhängiges Gremium, das die Europäische Kommission im Juni 2018 eingesetzt hat. Ihren ersten Entwurf der Ethik-Leitlinien veröffentlichte sie am 18. Dezember 2018, erhielt in einer offenen Konsultation Rückmeldungen von mehr als 500 Beteiligten und legte die endgültige Fassung am 8. April 2019 vor. Der Kernbegriff ist vertrauenswürdige KI (trustworthy AI). Sie hat drei Komponenten, die über den gesamten Lebenszyklus eines Systems erfüllt sein sollen: Sie soll rechtmäßig sein und alle geltenden Gesetze einhalten, ethisch sein und ethische Grundsätze und Werte achten, und robust sein, technisch wie sozial, weil KI-Systeme selbst bei guten Absichten unbeabsichtigten Schaden anrichten können. Jede Komponente ist notwendig, keine allein ausreichend. Die Leitlinien behandeln vor allem die zweite und dritte.',
        ],
      },
      {
        titel: 'Vier Grundsätze, sieben Anforderungen',
        absaetze: [
          'Die ethische Komponente leiten die Leitlinien aus den Grundrechten ab und fassen sie in vier Grundsätze: Achtung der menschlichen Autonomie, Schadensverhütung, Fairness und Erklärbarkeit. Spannungen zwischen ihnen müssen erkannt und aufgelöst werden. Besondere Aufmerksamkeit verlangen Situationen mit schutzbedürftigen Gruppen, etwa Kindern oder Menschen mit Behinderungen, und Situationen ungleicher Macht- oder Informationsverteilung, etwa zwischen Arbeitgebern und Beschäftigten oder Unternehmen und Verbrauchern. Umgesetzt werden die Grundsätze über sieben Anforderungen: Vorrang menschlichen Handelns und menschliche Aufsicht; technische Robustheit und Sicherheit; Schutz der Privatsphäre und Datenqualitätsmanagement, in anderen Übersetzungen Daten-Governance; Transparenz; Vielfalt, Nichtdiskriminierung und Fairness; gesellschaftliches und ökologisches Wohlergehen; Rechenschaftspflicht.',
          'Die Kommission erläutert die Anforderungen knapp. Menschliche Aufsicht lässt sich erreichen, indem ein Mensch in Entscheidungen eingebunden ist (human-in-the-loop), den Betrieb überwacht (human-on-the-loop) oder die Gesamtkontrolle behält (human-in-command). Robuste Systeme brauchen einen Rückfallplan und sollen genau, zuverlässig und reproduzierbar arbeiten. Transparenz umfasst Rückverfolgbarkeit, Erklärungen, die zum Adressaten passen, und das Wissen der Menschen, dass sie mit einem KI-System interagieren. Unfaire Verzerrungen (unfair bias) sind zu vermeiden, Systeme sollen für alle zugänglich sein, und Rechenschaftspflicht schließt die Überprüfbarkeit von Algorithmen, Daten und Entwurfsprozessen sowie zugängliche Abhilfe ein.',
        ],
      },
      {
        titel: 'Von der Leitlinie zur Prüfliste und ins Gesetz',
        absaetze: [
          'Damit die Anforderungen nicht abstrakt bleiben, enthielten die Leitlinien eine Bewertungsliste, die ab dem 26. Juni 2019 erprobt wurde; die Pilotphase endete am 1. Dezember 2019. Am 17. Juli 2020 legte die Expertengruppe die endgültige Bewertungsliste für vertrauenswürdige KI vor (Assessment List for Trustworthy Artificial Intelligence, ALTAI), überarbeitet nach einer Erprobung mit mehr als 350 Beteiligten. Sie übersetzt die sieben Anforderungen in eine Prüfliste zur Selbstbewertung, auch als Web-Werkzeug. Die KI-Verordnung (EU) 2024/1689 greift die Leitlinien ausdrücklich auf. Erwägungsgrund 27 nennt die sieben unverbindlichen ethischen Grundsätze, sagt, dass sie so weit wie möglich in Gestaltung und Verwendung von KI-Modellen einfließen und als Grundlage für Verhaltenskodizes dienen sollen, und fordert auch Normungsorganisationen auf, sie zu berücksichtigen.',
        ],
      },
      {
        titel: 'Im Beratungsalltag',
        absaetze: [
          'Eine kommunale Wohnungsgesellschaft mit 250 Beschäftigten will Reparaturmeldungen ihrer Mieter von einem KI-System vorsortieren und dringende Fälle nach oben reihen lassen. Die Geschäftsführung möchte verantwortungsvoll vorgehen, weiß aber nicht, was das konkret heißt. Die Beraterin nutzt die sieben Anforderungen als Gliederung eines Workshops und die ALTAI-Fragen als Leitfaden. Wer sieht die Reihung, und darf er sie ändern? Was passiert, wenn das System ausfällt? Welche Mieterdaten fließen ein? Erfahren Mieter, dass eine Maschine vorsortiert? Werden Meldungen in einfacher Sprache oder in anderen Sprachen schlechter eingestuft? Wer ist verantwortlich, wenn ein Wasserschaden liegen bleibt? Aus jeder Antwort wird eine Maßnahme mit einer zuständigen Person. Das Ergebnis ist kein Zertifikat, sondern ein Arbeitsplan, den das Unternehmen selbst überprüfen kann.',
        ],
      },
      {
        titel: 'Grenzen und Kritik',
        absaetze: [
          'Die Leitlinien sind unverbindlich, und ALTAI ist eine Selbstbewertung, keine Prüfung durch Dritte; die Liste zeigt, dass sich ein Unternehmen die Fragen gestellt hat, nicht, wie gut es sie beantwortet. Brent Mittelstadt (Nature Machine Intelligence, 2019) hat den prinzipienbasierten Ansatz grundsätzlich kritisiert. Die KI-Ethik sei auf Grundsätze zusammengelaufen, die den vier klassischen Prinzipien der Medizinethik ähneln. Anders als die Medizin fehlten der KI-Entwicklung aber gemeinsame Ziele und Treuepflichten, eine berufliche Tradition mit eigenen Normen, erprobte Methoden, um Grundsätze in Praxis zu übersetzen, und belastbare Mechanismen rechtlicher und berufsständischer Rechenschaft. Die Einigkeit über abstrakte Grundsätze verdecke tiefe politische und normative Meinungsverschiedenheiten. Für die Beratung heißt das: Die sieben Anforderungen sind eine gute Gliederung, aber erst Maßnahmen, Zuständigkeiten und Belege machen daraus mehr als ein Bekenntnis. Für Hochrisiko-Systeme legt inzwischen die KI-Verordnung verbindliche Pflichten fest.',
        ],
      },
    ],
    quellen: [Q.hlegSeite, Q.hlegLeitlinien, Q.altai, Q.kivoAmtsblatt, Q.mittelstadt2019],
  },
];
