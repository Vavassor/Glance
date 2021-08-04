/**
 * American Standard Code for Information Interchange (ASCII) is a character
 * encoding standard.
 */
export const escapeQuotes = (value: string): string => {
  let escapedValue = "";
  for (const character of value) {
    if (character === '"') {
      escapedValue += '\\"';
    } else if (character === "\\") {
      escapedValue += "\\\\";
    } else {
      escapedValue += character;
    }
  }
  return escapedValue;
};
