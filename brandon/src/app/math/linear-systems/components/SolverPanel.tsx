'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Method = 'elimination' | 'substitution' | 'matrices';

export default function SolverPanel() {
  const [equations, setEquations] = useState<string[]>(['2x + y = 5', 'x - y = 1']);
  const [method, setMethod] = useState<Method>('elimination');
  const [solution, setSolution] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...equations];
    newEquations[index] = value;
    setEquations(newEquations);
  };

  const addEquation = () => {
    setEquations([...equations, 'x + y = 0']);
  };

  const removeEquation = (index: number) => {
    if (equations.length > 2) {
      const newEquations = equations.filter((_, i) => i !== index);
      setEquations(newEquations);
    }
  };

  const solve = () => {
    try {
      // Basic validation
      if (equations.some(eq => !eq.trim())) {
        throw new Error('All equations must be filled');
      }

      // TODO: Implement actual solving logic
      setSolution('x = 2, y = 1');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setSolution(null);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Linear System Solver</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Select value={method} onValueChange={(value: Method) => setMethod(value)}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="elimination">Elimination</SelectItem>
                  <SelectItem value="substitution">Substitution</SelectItem>
                  <SelectItem value="matrices">Matrix Method</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                onClick={addEquation}
                disabled={equations.length >= 4}
                variant="outline"
              >
                Add Equation
              </Button>
            </div>

            <div className="space-y-3">
              {equations.map((equation, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={equation}
                    onChange={(e) => handleEquationChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter equation (e.g., 2x + y = 5)"
                  />
                  {equations.length > 2 && (
                    <Button
                      onClick={() => removeEquation(index)}
                      variant="destructive"
                      size="sm"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button onClick={solve} className="w-full">
              Solve System
            </Button>

            {error && (
              <div className="text-red-500 dark:text-red-400 text-sm mt-2">
                {error}
              </div>
            )}

            {solution && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold mb-2">Solution:</h3>
                <div className="text-green-700 dark:text-green-300">
                  {solution}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}