"use client";

import React, { useState, useEffect } from 'react';
import { usePolynomialCalculations } from '../hooks/usePolynomialCalculations';
import PolynomialInput from './PolynomialInput';
import PolynomialResult from './PolynomialResult';
import { OperationSelector } from './inputs/OperationSelector';
import { StepByStep } from './displays/StepByStep';

export function PolynomialCalculator() {
  const [polynomial, setPolynomial] = useState('');
  const [operation, setOperation] = useState<'factor' | 'expand' | 'simplify'>('factor');
  
  const { result, steps, error, calculate } = usePolynomialCalculations();

  const handleCalculate = () => {
    calculate(polynomial, operation);
  };

  return (
    <div className="space-y-6">
      <PolynomialInput
        value={polynomial}
        onChange={setPolynomial}
        placeholder="Enter polynomial (e.g., x^2 + 2x + 1)"
      />
      
      <OperationSelector
        operation={operation}
        onOperationChange={setOperation}
        operations={['factor', 'expand', 'simplify']}
      />
      
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Calculate
      </button>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {result && (
        <>
          <PolynomialResult result={result} />
          <StepByStep 
            steps={steps} 
            title={`${operation.charAt(0).toUpperCase() + operation.slice(1)} Steps`}
          />
        </>
      )}
    </div>
  );
}