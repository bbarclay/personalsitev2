import { COLOR_SCHEMES } from '../constants/colorSchemes';

export const rotateColors = (colors: readonly string[]): readonly string[] => {
  return [...colors.slice(1), colors[0]];
};

export const getNextColorScheme = (currentIndex: number): readonly string[] => {
  if (!Number.isInteger(currentIndex) || currentIndex < 0 || currentIndex >= COLOR_SCHEMES.length) {
    throw new Error('Invalid color scheme index');
  }
  return COLOR_SCHEMES[(currentIndex + 1) % COLOR_SCHEMES.length];
};
