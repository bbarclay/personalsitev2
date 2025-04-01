export const COLOR_SCHEMES: readonly string[][] = [
  ['#000764', '#206bcb', '#edffff', '#ffaa00', '#000200'],
  ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff'],
  ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#00ff00'],
  // Add more color schemes as needed
] as const;

export type ColorScheme = {
  name: string;
  colors: readonly string[];
  isGradient: boolean;
};

export type ColorSchemeId = string & { readonly brand: unique symbol };
