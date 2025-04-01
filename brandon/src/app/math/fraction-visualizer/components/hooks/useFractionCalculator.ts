import { useState, useEffect } from 'react';

interface FractionResult {
  numerator: number;
  denominator: number;
}

export const useFractionCalculator = () => {
  const [numerator, setNumerator] = useState(1);
  const [denominator, setDenominator] = useState(2);
  const [secondNumerator, setSecondNumerator] = useState(1);
  const [secondDenominator, setSecondDenominator] = useState(3);
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState<FractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (num: number, den: number): FractionResult => {
    if (den === 0) {
      throw new Error('Cannot divide by zero');
    }

    // Handle negative fractions consistently
    const isNegative = (num < 0 && den > 0) || (num > 0 && den < 0);
    num = Math.abs(num);
    den = Math.abs(den);

    const divisor = gcd(num, den);

    return {
      numerator: isNegative ? -1 * (num / divisor) : num / divisor,
      denominator: den / divisor,
    };
  };

  const handleCalculate = () => {
    setError(null);
    let newResult: FractionResult;

    try {
      if (denominator === 0 || secondDenominator === 0) {
        throw new Error('Denominator cannot be zero');
      }

      switch (operation) {
        case '+':
          newResult = {
            numerator: numerator * secondDenominator + secondNumerator * denominator,
            denominator: denominator * secondDenominator,
          };
          break;
        case '-':
          newResult = {
            numerator: numerator * secondDenominator - secondNumerator * denominator,
            denominator: denominator * secondDenominator,
          };
          break;
        case '×':
          newResult = {
            numerator: numerator * secondNumerator,
            denominator: denominator * secondDenominator,
          };
          break;
        case '÷':
          if (secondNumerator === 0) {
            throw new Error('Cannot divide by zero');
          }
          newResult = {
            numerator: numerator * secondDenominator,
            denominator: denominator * secondNumerator,
          };
          break;
        default:
          throw new Error('Invalid operation');
      }

      // Simplify the result
      newResult = simplifyFraction(newResult.numerator, newResult.denominator);
      setResult(newResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    }
  };

  // Calculate initial result on mount and when inputs change
  useEffect(() => {
    handleCalculate();
  }, [numerator, denominator, secondNumerator, secondDenominator, operation]);

  return {
    numerator,
    denominator,
    setNumerator,
    setDenominator,
    secondNumerator,
    secondDenominator,
    setSecondNumerator,
    setSecondDenominator,
    operation,
    setOperation,
    result,
    error,
    handleCalculate,
  };
};
