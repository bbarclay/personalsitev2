import { CalculationResult } from './types';

export const calculateSequence = (n: number, isStandard: boolean, maxSteps: string, divideBy: string, multiplyBy: string, addAfterDivide: string, addAfterMultiply: string): CalculationResult => {
  const sequence = [{ step: 0, value: n }];
  let current = n;
  let step = 1;

  while (current !== 1 && step < parseInt(maxSteps)) {
    if (isStandard) {
      current = current % 2 === 0 ? current / 2 : 3 * current + 1;
    } else {
      current =
        current % parseInt(divideBy) === 0
          ? current / parseInt(divideBy) + parseInt(addAfterDivide)
          : current * parseInt(multiplyBy) + parseInt(addAfterMultiply);
    }

    if (!isFinite(current)) {
      throw new Error('Sequence reached infinity');
    }

    sequence.push({ step, value: current });
    step++;
  }

  const maxValue = Math.max(...sequence.map((item: { step: number; value: number }) => item.value));
  const totalSteps = sequence.length - 1;

  return {
    sequence,
    maxValue,
    totalSteps,
    startNumber: n,
  };
};

export const autoCalculate = (
  isStandard: boolean,
  number: number,
  calculateSequenceFn: Function,
  maxSteps: string,
  divideBy: string,
  multiplyBy: string,
  addAfterDivide: string,
  addAfterMultiply: string
): CalculationResult => {
  if (!number || isNaN(number) || number <= 0) {
    throw new Error('Please enter a valid positive number');
  }

  const result = calculateSequenceFn(
    number,
    isStandard,
    maxSteps,
    divideBy,
    multiplyBy,
    addAfterDivide,
    addAfterMultiply
  );

  return result;
};

// ...other service functions...
