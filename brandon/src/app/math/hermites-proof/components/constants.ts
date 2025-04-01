// Default values for demonstration
export const DEFAULT_INPUT_VALUE = 2.154435;
export const DEFAULT_PRECISION = 1e-10;
export const MAX_ITERATIONS = 100;
export const ANIMATION_DURATION = 500; // in milliseconds

// Example cubic irrationals for quick testing
export const SAMPLE_CUBIC_IRRATIONALS = [
  { value: 2.154435, name: "Custom Value" },
  { value: Math.pow(2, 1/3), name: "∛2 (Cube Root of 2)" },
  { value: Math.pow(3, 1/3), name: "∛3 (Cube Root of 3)" },
  { value: 1 + Math.pow(2, 1/3), name: "1 + ∛2" },
  { value: Math.pow(5, 1/3), name: "∛5 (Cube Root of 5)" },
  { value: Math.pow(7, 1/3), name: "∛7 (Cube Root of 7)" },
];

// Example quadratic irrationals for comparison
export const SAMPLE_QUADRATIC_IRRATIONALS = [
  { value: Math.sqrt(2), name: "√2 (Square Root of 2)" },
  { value: Math.sqrt(3), name: "√3 (Square Root of 3)" },
  { value: (1 + Math.sqrt(5)) / 2, name: "φ (Golden Ratio)" },
];

// Example rational numbers for comparison
export const SAMPLE_RATIONAL_NUMBERS = [
  { value: 1.5, name: "3/2" },
  { value: 22/7, name: "22/7 (π approximation)" },
];

// Example transcendental numbers for comparison
export const SAMPLE_TRANSCENDENTAL_NUMBERS = [
  { value: Math.PI, name: "π (Pi)" },
  { value: Math.E, name: "e (Euler's Number)" },
];

// Predefined colors for visualization
export const COLORS = {
  CUBIC: '#4F46E5', // indigo
  QUADRATIC: '#10B981', // emerald
  RATIONAL: '#F59E0B', // amber
  TRANSCENDENTAL: '#EF4444', // red
  PERIODIC: '#8B5CF6', // purple
  NON_PERIODIC: '#EC4899', // pink
  BACKGROUND: '#1F2937', // dark gray
  TEXT: '#F3F4F6', // light gray
};
