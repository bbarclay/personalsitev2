"use client";

import React, { useState } from 'react';
import { usePolynomialCalculations } from '../hooks/usePolynomialCalculations';
import { PolynomialParser } from '../utils/polynomialParser';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { OperationSelector } from './inputs/OperationSelector';
import { StepByStep } from './displays/StepByStep';
import { PolynomialVisualizer } from './PolynomialVisualizer';

export function PolynomialCalculator() {
  const [input, setInput] = useState('');
  const [operation, setOperation] = useState<'factor' | 'expand' | 'simplify'>('factor');
  const { result, steps, error, calculate } = usePolynomialCalculations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const polynomial = PolynomialParser.parse(input);
      calculate(polynomial, operation);
    } catch (err) {
      // Error handling is managed by usePolynomialCalculations
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="polynomial" className="text-sm font-medium">
              Enter Polynomial
            </label>
            <Input
              id="polynomial"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., x^2 + 2x + 1"
              className="font-mono"
            />
          </div>

          <OperationSelector
            value={operation}
            onChange={setOperation}
            operations={['factor', 'expand', 'simplify']}
          />

          <Button type="submit" className="w-full">
            Calculate
          </Button>
        </form>
      </Card>

      {error && (
        <Alert variant="destructive">
          {error}
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Result</h3>
            <div className="font-mono">{result.toString()}</div>
          </Card>

          <Card className="p-6">
            <StepByStep steps={steps} />
          </Card>

          <Card className="p-6">
            <PolynomialVisualizer polynomial={result} />
          </Card>
        </div>
      )}
    </div>
  );
}
