export const fillTemplate = (
  template: string,
  dictionary: Record<string, string>
): string => {
  let result = "";

  for (let charIndex = 0; charIndex < template.length; ) {
    const doubleBraceIndex = template.indexOf("{{", charIndex);

    if (doubleBraceIndex === -1) {
      result += template.slice(charIndex);
      break;
    }

    result += template.slice(charIndex, doubleBraceIndex);

    const keyStart = doubleBraceIndex + 2;
    const keyEnd = template.indexOf("}}", keyStart);

    if (keyEnd === -1) {
      throw new Error("Percent sign was mismatched in the HTML template.");
    }

    const key = template.slice(keyStart, keyEnd).trim();
    const value = dictionary[key];

    if (!value) {
      throw new Error(`Key ${key} wasn't found in the dictionary.`);
    }

    result += value;
    charIndex = keyEnd + 2;
  }

  return result;
};
