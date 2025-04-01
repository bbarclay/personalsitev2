import { calculateWeightTotal } from './weights';
import { defaultSymbolWeights } from './weights';

export const getRandomSymbol = (weights: number[] = defaultSymbolWeights): number => {
  const totalWeight = calculateWeightTotal(weights);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < weights.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return i;
    }
  }
  
  return weights.length - 1;
};

export const generateRandomReel = (weights: number[] = defaultSymbolWeights): number[] => {
  return Array(3).fill(0).map(() => getRandomSymbol(weights));
};

export const generateRandomReels = (weights: number[] = defaultSymbolWeights): number[][] => {
  return Array(5).fill(0).map(() => generateRandomReel(weights));
};

// Utility function to check if a scatter combination is possible with current weights
export const calculateScatterProbability = (weights: number[]): number => {
  const totalWeight = calculateWeightTotal(weights);
  const scatterWeight = weights[6]; // Bell is the scatter symbol
  const singleScatterProb = scatterWeight / totalWeight;
  
  // Probability of getting 3 or more scatters
  const threeScatterProb = (singleScatterProb ** 3) * ((1 - singleScatterProb) ** 2) * 10; // Combinations
  const fourScatterProb = (singleScatterProb ** 4) * (1 - singleScatterProb) * 5;
  const fiveScatterProb = singleScatterProb ** 5;
  
  return threeScatterProb + fourScatterProb + fiveScatterProb;
};

// Function to suggest weight adjustments if scatter probability is too high
export const suggestWeightAdjustments = (
  weights: number[],
  targetProbability = 0.03 // 3% target probability for free spins
): number[] => {
  const currentProb = calculateScatterProbability(weights);
  if (currentProb <= targetProbability) return weights;

  const newWeights = [...weights];
  while (calculateScatterProbability(newWeights) > targetProbability) {
    if (newWeights[6] > 1) {
      newWeights[6]--;
    } else {
      break;
    }
  }

  return newWeights;
};
