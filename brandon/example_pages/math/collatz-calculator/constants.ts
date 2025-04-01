export const DEFAULT_VALUES = {
  STANDARD_NUMBER: '1438',
  CUSTOM_NUMBER: '34',
  DIVIDE_BY: '2',
  MULTIPLY_BY: '7',
  ADD_AFTER_DIVIDE: '0',
  ADD_AFTER_MULTIPLY: '1',
  MAX_STEPS: '1000',
  SPEED: 1000, // milliseconds
};

export const CHART_COLORS = {
  STANDARD: '#8884d8', // Purple
  CUSTOM: '#82ca9d', // Green
  GRID: 'rgba(255, 255, 255, 0.1)', // Grid color that works in both light and dark modes
};

export const TRANSFORMATIONS = {
  ORIGINAL: 'original',
  LOGARITHMIC: 'logarithmic',
  DOUBLE: 'double',
  SQUARE: 'square',
  ADD_10: 'add10',
  SUBTRACT_1: 'subtract1',
  INVERSE: 'inverse',
} as const;

export const DEFAULT_CHECKBOXES = {
  [TRANSFORMATIONS.ORIGINAL]: true,
  [TRANSFORMATIONS.LOGARITHMIC]: false,
  [TRANSFORMATIONS.DOUBLE]: false,
  [TRANSFORMATIONS.SQUARE]: false,
  [TRANSFORMATIONS.ADD_10]: false,
  [TRANSFORMATIONS.SUBTRACT_1]: false,
  [TRANSFORMATIONS.INVERSE]: false,
};

export const TRANSFORMATION_LABELS = {
  [TRANSFORMATIONS.ORIGINAL]: 'Original Sequence',
  [TRANSFORMATIONS.LOGARITHMIC]: 'Logarithmic Sequence',
  [TRANSFORMATIONS.DOUBLE]: 'Double Values Sequence',
  [TRANSFORMATIONS.SQUARE]: 'Square Values Sequence',
  [TRANSFORMATIONS.ADD_10]: 'Add 10 Sequence',
  [TRANSFORMATIONS.SUBTRACT_1]: 'Subtract 1 Sequence',
  [TRANSFORMATIONS.INVERSE]: 'Inverse Sequence',
} as const;

export const DARK_MODE_COLORS = {
  background: {
    light: '#FFFFFF',
    dark: '#1F2937',
  },
  text: {
    light: '#111827',
    dark: '#E5E7EB',
  },
  grid: {
    light: '#E5E7EB',
    dark: '#374151',
  },
  axis: {
    light: '#6B7280',
    dark: '#D1D5DB',
  },
  tooltip: {
    bg: {
      light: '#FFFFFF',
      dark: '#111827',
    },
    border: {
      light: '#E5E7EB',
      dark: '#4B5563',
    },
    text: {
      light: '#111827',
      dark: '#F3F4F6',
    },
  },
} as const;
