/**
 * Wandelt *Wort*-Markierungen aus dem CMS in <em>-Tags um.
 * HTML wird vorher escaped, damit Editor-Eingaben kein Markup einschleusen.
 */
export function em(text: string): string {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
