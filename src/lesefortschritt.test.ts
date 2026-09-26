import { beforeEach, describe, expect, it } from 'vitest';
import { GELESEN_KEY, _setzeGelesenFuerTests, istGelesen, setzeGelesen } from './lesefortschritt';

describe('Lesefortschritt', () => {
  beforeEach(() => {
    window.localStorage.clear();
    _setzeGelesenFuerTests([]);
  });

  it('merkt sich gelesene Artikel dauerhaft als Liste von IDs', () => {
    expect(istGelesen('a')).toBe(false);
    setzeGelesen('a', true);
    setzeGelesen('b', true);
    expect(istGelesen('a')).toBe(true);
    expect(JSON.parse(window.localStorage.getItem(GELESEN_KEY)!)).toEqual(['a', 'b']);
    setzeGelesen('a', false);
    expect(istGelesen('a')).toBe(false);
    expect(JSON.parse(window.localStorage.getItem(GELESEN_KEY)!)).toEqual(['b']);
  });

  it('schreibt nichts, wenn sich nichts ändert', () => {
    setzeGelesen('a', false);
    expect(window.localStorage.getItem(GELESEN_KEY)).toBeNull();
  });
});
