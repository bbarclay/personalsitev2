// Default symbol weights (higher number = more common)
export const defaultSymbolWeights = [
  1,    // 7 (rare)
  2,    // BAR
  4,    // Cherry
  5,    // Lemon
  6,    // Orange
  7,    // Plum
  1,    // Bell (scatter - very rare)
];

export const volatilityPresets = {
  low: {
    weights: [1, 3, 5, 6, 7, 8, 1],  // More common low-paying symbols
    multiplier: 0.8,
    freeSpins: {
      threeScatters: 2,
      fourScatters: 3,
      fiveScatters: 5
    }
  },
  medium: {
    weights: [1, 2, 4, 5, 6, 7, 1],  // Balanced distribution
    multiplier: 1.0,
    freeSpins: {
      threeScatters: 3,
      fourScatters: 5,
      fiveScatters: 10
    }
  },
  high: {
    weights: [2, 2, 3, 3, 4, 4, 1],  // More even distribution for bigger wins
    multiplier: 1.5,
    freeSpins: {
      threeScatters: 5,
      fourScatters: 10,
      fiveScatters: 15
    }
  }
};

export const getVolatilityPreset = (volatility: 'low' | 'medium' | 'high') => {
  return volatilityPresets[volatility];
};

export const validateSymbolWeights = (weights: number[]): boolean => {
  if (weights.length !== 7) return false;
  return weights.every(w => w >= 1 && w <= 10);
};

export const calculateWeightTotal = (weights: number[]): number => {
  return weights.reduce((sum, weight) => sum + weight, 0);
};

export const adjustSymbolWeight = (
  weights: number[],
  symbolIndex: number,
  change: number
): number[] => {
  const newWeights = [...weights];
  const newWeight = Math.max(1, Math.min(10, newWeights[symbolIndex] + change));
  newWeights[symbolIndex] = newWeight;
  return newWeights;
};
