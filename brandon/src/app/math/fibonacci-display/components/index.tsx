'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FibonacciProps {}

const FibonacciDisplay: React.FC<FibonacciProps> = () => {
  const [count, setCount] = useState<number>(10);
  const [fibonacciSequence, setFibonacciSequence] = useState<number[]>([]);

  useEffect(() => {
    calculateFibonacci(count);
  }, [count]);

  const calculateFibonacci = (n: number) => {
    const sequence: number[] = [];
    if (n <= 0) return;

    if (n >= 1) sequence.push(0);
    if (n >= 2) sequence.push(1);

    for (let i = 2; i < n; i++) {
      sequence.push(sequence[i - 1] + sequence[i - 2]);
    }

    setFibonacciSequence(sequence);
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCount(isNaN(value) ? 0 : Math.min(value, 100)); // Limit to 100 to prevent performance issues
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Fibonacci Sequence Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="count">Number of terms (max 100)</Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  max="100"
                  value={count}
                  onChange={handleCountChange}
                  className="w-full"
                />
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Sequence</h3>
              <div className="flex flex-wrap gap-2">
                {fibonacciSequence.map((num, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-medium"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Golden Ratio Approximation</h3>
              <p>
                As the sequence progresses, the ratio of consecutive Fibonacci numbers approaches the Golden Ratio (φ ≈ 1.618033988749895).
              </p>
              {fibonacciSequence.length >= 2 && (
                <p className="mt-2 font-semibold">
                  Current ratio (Fn/Fn-1): {(fibonacciSequence[fibonacciSequence.length - 1] / fibonacciSequence[fibonacciSequence.length - 2]).toFixed(8)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FibonacciDisplay;
