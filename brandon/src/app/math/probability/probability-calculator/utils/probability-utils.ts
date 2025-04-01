export interface Step {
  formula: string;
  explanation: string;
  value?: number | string;
}

export interface Solution {
  steps: Step[];
  result: number | null;
}

// Calculate factorial
export function factorial(n: number): number {
  if (n === 0 || n === 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Calculate combinations (n choose k)
export function combinations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  
  // Calculate as n! / (k! * (n-k)!)
  return factorial(n) / (factorial(k) * factorial(n - k));
}

// Calculate permutations
export function permutations(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  if (k === 0) return 1;
  
  // Calculate as n! / (n-k)!
  return factorial(n) / factorial(n - k);
}

// Calculate simple probability
export function calculateSimpleProbability(favorableOutcomes: number, totalOutcomes: number): Solution {
  const steps: Step[] = [];
  
  if (totalOutcomes <= 0) {
    throw new Error('Total outcomes must be greater than zero');
  }
  
  if (favorableOutcomes < 0 || favorableOutcomes > totalOutcomes) {
    throw new Error('Favorable outcomes must be between 0 and total outcomes');
  }

  steps.push({
    formula: 'P(Event) = Favorable Outcomes / Total Outcomes',
    explanation: 'The basic probability formula',
  });
  
  steps.push({
    formula: `P(Event) = ${favorableOutcomes} / ${totalOutcomes}`,
    explanation: 'Substitute the values into the formula',
  });
  
  const result = favorableOutcomes / totalOutcomes;
  
  steps.push({
    formula: `P(Event) = ${result.toFixed(4)}`,
    explanation: 'Calculate the probability',
    value: result
  });
  
  if (result === 0) {
    steps.push({
      formula: 'P(Event) = 0',
      explanation: 'This event is impossible',
      value: 0
    });
  } else if (result === 1) {
    steps.push({
      formula: 'P(Event) = 1',
      explanation: 'This event is certain',
      value: 1
    });
  } else {
    // Convert to percentage
    steps.push({
      formula: `P(Event) = ${(result * 100).toFixed(2)}%`,
      explanation: 'Convert to percentage',
      value: result
    });
    
    // Express as fraction if it's a nice value
    if (result !== 0 && result !== 1) {
      const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b);
      };
      
      const divisor = gcd(favorableOutcomes, totalOutcomes);
      if (divisor > 1) {
        steps.push({
          formula: `P(Event) = ${favorableOutcomes/divisor}/${totalOutcomes/divisor}`,
          explanation: 'Express as a simplified fraction',
          value: result
        });
      }
    }
  }
  
  return {
    steps,
    result
  };
}

// Calculate probability with combinations
export function calculateCombinationProbability(
  targetItems: number, 
  selectedItems: number, 
  totalItems: number
): Solution {
  const steps: Step[] = [];
  
  if (totalItems <= 0 || selectedItems <= 0) {
    throw new Error('Total items and selected items must be greater than zero');
  }
  
  if (targetItems < 0 || targetItems > totalItems) {
    throw new Error('Target items must be between 0 and total items');
  }
  
  if (selectedItems > totalItems) {
    throw new Error('Selected items cannot exceed total items');
  }

  steps.push({
    formula: 'P(Event) = C(k, r) / C(n, r)',
    explanation: 'Probability formula for combination scenarios',
  });
  
  steps.push({
    formula: `P(Event) = C(${targetItems}, ${selectedItems}) / C(${totalItems}, ${selectedItems})`,
    explanation: 'Substitute the values into the formula',
  });
  
  const targetCombinations = combinations(targetItems, selectedItems);
  const totalCombinations = combinations(totalItems, selectedItems);
  
  steps.push({
    formula: `P(Event) = ${targetCombinations} / ${totalCombinations}`,
    explanation: `Calculate combinations: C(${targetItems}, ${selectedItems}) = ${targetCombinations} and C(${totalItems}, ${selectedItems}) = ${totalCombinations}`,
  });
  
  const result = totalCombinations === 0 ? 0 : targetCombinations / totalCombinations;
  
  steps.push({
    formula: `P(Event) = ${result.toFixed(4)}`,
    explanation: 'Calculate the probability',
    value: result
  });
  
  // Convert to percentage
  steps.push({
    formula: `P(Event) = ${(result * 100).toFixed(2)}%`,
    explanation: 'Convert to percentage',
    value: result
  });
  
  return {
    steps,
    result
  };
} 