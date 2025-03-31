import { useState, useCallback } from 'react';
import { parsePolynomial, factorPolynomial, expandPolynomial, simplifyPolynomial } from '../utils/polynomialUtils';
import { Polynomial, PolynomialOperation } from '../types';

interface CalculationResult {
  result: Polynomial;
  steps: string[];
}

export function usePolynomialCalculations() {
  const [result, setResult] = useState<Polynomial | null>(null);
  const [steps, setSteps] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const calculate = (input: string, operation: 'factor' | 'expand' | 'simplify') => {
    try {
      const polynomial = parsePolynomial(input);

      let calculationResult: CalculationResult;
      switch (operation) {
        case 'factor':
          const factors = factorPolynomial(polynomial);
          calculationResult = {
            result: factors[0],
            steps: [`Factored polynomial: ${factors.map(f => f.toString()).join(' × ')}`]
          };
          break;
        case 'expand':
          const expanded = expandPolynomial([polynomial]);
          calculationResult = {
            result: expanded,
            steps: [`Expanded polynomial: ${expanded.toString()}`]
          };
          break;
        case 'simplify':
          const simplified = simplifyPolynomial(polynomial);
          calculationResult = {
            result: simplified,
            steps: [`Simplified polynomial: ${simplified.toString()}`]
          };
          break;
        default:
          throw new Error('Invalid operation');
      }

      setResult(calculationResult.result);
      setSteps(calculationResult.steps);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
      setSteps([]);
    }
  };

  const performOperation = useCallback((polyA: Polynomial, polyB: Polynomial, operation: PolynomialOperation) => {
    // Implementation of polynomial calculations
    // This is a placeholder - actual implementation would depend on your app's requirements
    const resultPoly: Polynomial = { terms: [] };
    setResult(resultPoly);
    return resultPoly;
  }, []);

  return { result, steps, error, calculate, performOperation };
}