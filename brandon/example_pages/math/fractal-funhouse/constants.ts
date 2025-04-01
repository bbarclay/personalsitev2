import { FractalType, FractalDefaults, ColorSchemes, FractalTypes } from './types/fractal';

export const UI_CONFIG = {
  MIN_ITERATIONS: 50,
  MAX_ITERATIONS: 1000,
  MIN_ZOOM: 50,
  MAX_ZOOM: 1000,
  DEFAULT_ZOOM: 200,
} as const;

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

export const FRACTAL_DEFAULTS: Record<FractalType, FractalDefaults> = {
  'Mandelbrot': {
    zoom: 200,
    maxIterations: 100,
    centerX: -0.5,
    centerY: 0
  },
  'Julia': {
    zoom: 200,
    maxIterations: 100,
    centerX: 0,
    centerY: 0,
    juliaReal: -0.7,
    juliaImag: 0.27015
  },
  'BurningShip': {
    zoom: 200,
    maxIterations: 100,
    centerX: -0.5,
    centerY: -0.5
  },
  'Tricorn': {
    zoom: 200,
    maxIterations: 100,
    centerX: 0,
    centerY: 0
  },
  'Multibrot': {
    zoom: 200,
    maxIterations: 100,
    centerX: 0,
    centerY: 0,
    power: 3
  },
  'Feather': {
    zoom: 200,
    maxIterations: 100,
    centerX: 0,
    centerY: 0
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
