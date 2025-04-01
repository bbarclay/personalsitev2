import { UIConfiguration } from '../types/uiConfiguration';
import { FractalType, FractalTypes, ColorSchemes } from '../types/fractal';

export const UI_CONFIG: UIConfiguration = {
  MIN_ZOOM: 1,
  MAX_ZOOM: 1000,
  MIN_ITERATIONS: 50,
  MAX_ITERATIONS: 1000,
  DEFAULT_WIDTH: 800,
  DEFAULT_HEIGHT: 600,
};

export const FRACTAL_TYPES: FractalTypes = {
  MANDELBROT: 'Mandelbrot',
  JULIA: 'Julia',
  BURNINGSHIP: 'BurningShip',
  TRICORN: 'Tricorn',
  MULTIBROT: 'Multibrot',
  FEATHER: 'Feather'
} as const;

export const COLOR_SCHEMES: ColorSchemes = {
  LIGHT: {
    DEFAULT: ['#ff0000', '#00ff00', '#0000ff'],
    SUNSET: ['#ff7e5f', '#feb47b', '#ffcdb2'],
    OCEAN: ['#00b4d8', '#90e0ef', '#caf0f8'],
    FOREST: ['#2d6a4f', '#40916c', '#74c69d'],
    FIRE: ['#dc2f02', '#e85d04', '#f48c06']
  },
  DARK: {
    DEFAULT: ['#1a1a1a', '#4a4a4a', '#808080'],
    NEON: ['#ff00ff', '#00ffff', '#ff00aa'],
    COSMIC: ['#120024', '#3b0064', '#5b0094'],
    MATRIX: ['#003b00', '#008f11', '#00ff41'],
    PLASMA: ['#2d00f7', '#6a00f4', '#8900f2']
  }
} as const;

export const FRACTAL_DISPLAY_NAMES: Record<FractalType, string> = {
  'Mandelbrot': 'Mandelbrot',
  'Julia': 'Julia',
  'BurningShip': 'Burning Ship',
  'Tricorn': 'Tricorn',
  'Multibrot': 'Multibrot',
  'Feather': 'Feather'
} as const;

export const FRACTAL_DEFAULTS = {
  FRACTAL_TYPE: 'Mandelbrot' as FractalType,
  ZOOM: 200,
  MAX_ITERATIONS: 100,
};
