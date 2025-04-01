export interface ColorScheme {
  name: string;
  colors: readonly string[];
  isGradient: boolean;
}

export type ColorSchemeId = string & { readonly brand: unique symbol };
