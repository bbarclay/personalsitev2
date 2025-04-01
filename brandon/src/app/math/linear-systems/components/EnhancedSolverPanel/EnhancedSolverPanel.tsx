'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, AlertTriangle } from 'lucide-react';

interface EnhancedSolverPanelProps {
  className?: string;
}

const EnhancedSolverPanel: React.FC<EnhancedSolverPanelProps> = ({ className }) => {
  const [equations, setEquations] = useState<string[]>(['2x + y = 5', 'x - y = 1']);
  const [method, setMethod] = useState<string>('gaussian');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={className}>
      <Tabs defaultValue="solver" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="solver">System Input</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="solver">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Enter System</CardTitle>
                <CardDescription>Input your system of linear equations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {equations.map((eq, index) => (
                    <input
                      key={index}
                      type="text"
                      value={eq}
                      onChange={(e) => {
                        const newEquations = [...equations];
                        newEquations[index] = e.target.value;
                        setEquations(newEquations);
                      }}
                      className="w-full p-2 border rounded"
                      placeholder={`Equation ${index + 1}`}
                    />
                  ))}
                  <Button
                    onClick={() => setEquations([...equations, ''])}
                    variant="outline"
                    className="w-full"
                  >
                    Add Equation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solution Method</CardTitle>
                <CardDescription>Choose your preferred method</CardDescription>
              </CardHeader>
              <CardContent>
                <Select
                  value={method}
                  onValueChange={setMethod}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gaussian">Gaussian Elimination</SelectItem>
                    <SelectItem value="cramer">Cramer's Rule</SelectItem>
                    <SelectItem value="matrix">Matrix Method</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  className="w-full mt-4"
                  disabled={isLoading}
                  onClick={() => {/* Solve system logic */}}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Solve System
                </Button>
              </CardContent>
            </Card>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border-red-200 rounded-md">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="solution">
          <Card>
            <CardHeader>
              <CardTitle>Solution</CardTitle>
              <CardDescription>View the solution and steps</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Solution will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSolverPanel;
