# Voicebot-Anatomie & Dialog-Handwerk: Norm statt Folklore

In der Voicebot-Beratung ist fast nichts genormt — und ein großer Teil dessen, was als „Best Practice" kursiert, ist Herstellerdoktrin oder peer-reviewed widerlegt. VoiceXML ist die einzige echte Norm im Feld: Sie definiert präzise, wann ein Bot nichts hört (noinput) und wann er etwas Falsches hört (nomatch), wie Bestätigung an Fehlerkosten gekoppelt wird — und wie eine Reprompt-Leiter aussieht, die tatsächlich hilft statt frustriert.

Ein Artikel der KI-Enzyklopädie aus der Sammlung „Voicebot-Consulting“, Thema „Beratung & Grundlagen“, Teil 1 von 4 der Lesestrecke. Auch bekannt als: Voicebot, IVR, VoiceXML, Dialogsystem, Sprachdialogsystem, Conversation Design.

## Die Normlandschaft: VoiceXML statt Bauchgefühl

VoiceXML 2.0 (§5.2) unterscheidet zwei Fehlertypen scharf: „noinput" — „the user has not responded within the timeout interval" — und „nomatch" — „the user input something, but it was not recognized". Ob eine Eingabe als erkannt gilt, entscheidet die Standard-Schwelle „confidencelevel" (Default 0,5): darunter wirft die Plattform ein nomatch. Die Unterscheidung ist mehr als Terminologie — sie steuert, welche Recovery-Strategie ein gutes Dialogdesign wählt: bei noinput braucht es einen anderen Reflex als bei nomatch. Belegstatus: normiert (W3C, VoiceXML 2.0 §5.2).

VoiceXML kennt „Barge-in" (§4.1.5) standardmäßig aktiviert (Default true) — mit zwei Typen: „speech" stoppt die Ausgabe bei jeder erkannten Eingabe, „hotword" nur bei einem vollständigen Grammatik-Treffer und kann deshalb nie ein nomatch-Event auslösen. Die Spec nennt selbst den Grund, ihn abzuschalten: „If the application author requires that the user must hear all of a warning, legal notice, or advertisement, bargein should be disabled." Für Pflichthinweise ist Barge-in also bewusst kein Standard-Reflex, sondern eine Design-Entscheidung. Belegstatus: normiert (W3C, VoiceXML §4.1.5).

## Tapered Prompting & die Reprompt-Leiter

VoiceXML nennt es „Tapered Prompting" (§4.1.6): „Tapered prompts are those that may change with each attempt. Information-requesting prompts may become more terse … Help messages become more detailed." Gesteuert wird das über einen internen „prompt counter", keine feste Rundenzahl. Die verbreitete „3" als angeblich empfohlene Versuchszahl steht in der Spezifikation ausschließlich in Beispielen, nirgends als Empfehlung — wer sie als Norm zitiert, verwechselt ein Beispiel mit einer Vorgabe. Belegstatus: normiert (W3C, VoiceXML §4.1.6).

Bohus & Rudnicky (2005), 449 Sessions/8.278 User-Turns: „MoveOn" — „system advances the task by moving on to a different question" — erreicht 64,4 % Recovery und liegt (ohne signifikanten Unterschied) mit FullHelp und TerseYouCanSay vorn. Bloßes „Reprompt" — „system repeats the previous prompt" — erreicht nur 49,2 %, „AskRepeat" — „system asks the user to repeat" — sogar nur 33,7 %. Wiederholen ist damit empirisch eine der schwächeren, nicht der naheliegendsten Recovery-Optionen. Belegstatus: peer-reviewed (Bohus & Rudnicky 2005).

## Der Miller-Mythos

Miller (1956) warnt selbst ausdrücklich: „In spite of the coincidence that the magical number seven appears in both places, the span of absolute judgment and the span of immediate memory are quite different kinds of limitations" — und weiter: „Perhaps there is something deep and profound behind all these sevens … But I suspect that it is only a pernicious, Pythagorean coincidence." Cowan (2001) korrigiert später realistisch auf drei bis fünf, im Mittel etwa vier Chunks. Sein eigentlicher Beitrag war Chunking/Recoding, nicht die Sieben als Grenzwert. Belegstatus: widerlegt (Miller 1956, Cowan 2001, beide peer-reviewed) — die Übertragung von Millers Zahl auf Menütiefen ist eine Fehldeutung, keine reale Kapazitätsgrenze.

## Einordnung in der Enzyklopädie

Dieser Artikel eröffnet die Lesestrecke „Voicebot-Consulting“, danach folgt „Dialogpsychologie & Nutzergruppen: Wenn Best-Practice bröckelt“.

Verwandte Artikel:

- **Use-Case-Priorisierung**: Nicht jeder denkbare Anwendungsfall ist ein guter erster — die Auswahl folgt einer nachvollziehbaren Matrix statt dem Bauchgefühl.

## Quellen

- W3C — Voice Extensible Markup Language (VoiceXML) 2.0, W3C Recommendation 16 March 2004. https://www.w3.org/TR/voicexml20/ (abgerufen am 17.07.2026)
- Bohus & Rudnicky — „Sorry, I Didn’t Catch That!“: Non-understanding Errors and Recovery Strategies (6th SIGdial Workshop, 2005). https://aclanthology.org/2005.sigdial-1.14.pdf (abgerufen am 17.07.2026)
- Miller — The Magical Number Seven, Plus or Minus Two (Psychological Review 63, 1956). https://psychclassics.yorku.ca/Miller/ (abgerufen am 17.07.2026)
