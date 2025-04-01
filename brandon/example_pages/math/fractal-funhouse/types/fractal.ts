export type FractalType =
  | 'Mandelbrot'
  | 'Julia'
  | 'BurningShip'
  | 'Tricorn'
  | 'Multibrot'
  | 'Feather';

export interface FractalError extends Error {
  message: string;
}

export type ColorScheme = {
  [key: string]: readonly string[];
};

export interface ColorSchemes {
  LIGHT: ColorScheme;
  DARK: ColorScheme;
}

export interface FractalDefaults {
  zoom: number;
  maxIterations: number;
  centerX: number;
  centerY: number;
  juliaReal?: number;
  juliaImag?: number;
  power?: number;
}

export interface FractalState {
  fractalType: FractalType;
  zoom: number;
  maxIterations: number;
  colors: string[];
  isProcessing: boolean;
  error: Error | null;
}

export type FractalTypes = {
  [K in Uppercase<FractalType>]: FractalType;
};

export const FRACTAL_DISPLAY_NAMES: Record<FractalType, string> = {
  'Mandelbrot': 'Mandelbrot',
  'Julia': 'Julia',
  'BurningShip': 'Burning Ship',
  'Tricorn': 'Tricorn',
  'Multibrot': 'Multibrot',
  'Feather': 'Feather'
} as const;
