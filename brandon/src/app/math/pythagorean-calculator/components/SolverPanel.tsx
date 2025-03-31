'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SolverPanel() {
  const [sideA, setSideA] = useState('');
  const [sideB, setSideB] = useState('');
  const [sideC, setSideC] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateMissingSide = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) && !isNaN(b) && !isNaN(c)) {
      // Calculate side a
      const value = Math.sqrt(c * c - b * b);
      setResult(`Side a = ${value.toFixed(2)}`);
    } else if (!isNaN(a) && isNaN(b) && !isNaN(c)) {
      // Calculate side b
      const value = Math.sqrt(c * c - a * a);
      setResult(`Side b = ${value.toFixed(2)}`);
    } else if (!isNaN(a) && !isNaN(b) && isNaN(c)) {
      // Calculate hypotenuse (side c)
      const value = Math.sqrt(a * a + b * b);
      setResult(`Side c (hypotenuse) = ${value.toFixed(2)}`);
    } else {
      setResult('Please enter exactly two sides to calculate the third side.');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Pythagorean Theorem Calculator</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Enter any two sides of a right triangle to calculate the third side using the Pythagorean theorem (a² + b² = c²).
      </p>
      
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Side a</label>
            <Input
              type="number"
              placeholder="Enter side a"
              value={sideA}
              onChange={(e) => setSideA(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Side b</label>
            <Input
              type="number"
              placeholder="Enter side b"
              value={sideB}
              onChange={(e) => setSideB(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Side c (hypotenuse)</label>
            <Input
              type="number"
              placeholder="Enter side c"
              value={sideC}
              onChange={(e) => setSideC(e.target.value)}
            />
          </div>
        </div>
        
        <Button 
          onClick={calculateMissingSide}
          className="w-full"
        >
          Calculate Missing Side
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-lg font-semibold text-center">{result}</p>
          </div>
        )}
      </Card>
    </div>
  );
} 