import chroma from 'chroma-js';

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

export const colorScaleGenerator = (color: string, number?: number) => {
  const primaryColor = chroma(color);
  return chroma.scale(['white', primaryColor]).colors(number ?? 10);
};
