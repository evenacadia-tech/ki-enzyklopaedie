import { useMemo } from 'react';
import { hervorhebe } from '../suche/logic';

/** Text mit hervorgehobenen Fundstellen der Suchwörter (`<mark>`), aus dem Original-Text. */
export function Markiert({ text, tokens }: { text: string; tokens: readonly string[] }) {
  const segmente = useMemo(() => hervorhebe(text, tokens), [text, tokens]);
  return (
    <>
      {segmente.map((s, i) => (s.treffer ? <mark key={i}>{s.text}</mark> : <span key={i}>{s.text}</span>))}
    </>
  );
}
