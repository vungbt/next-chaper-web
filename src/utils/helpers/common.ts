export const countCharacters = (str: string, excludeWhitespace = false) => {
  if (excludeWhitespace) {
    str = str.replace(/\s+/g, '');
  }
  return str.length;
};

export const countWords = (str: string) => {
  return str
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
};
