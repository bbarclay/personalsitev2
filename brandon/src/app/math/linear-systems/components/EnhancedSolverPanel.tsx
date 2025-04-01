'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Info, PlusCircle, Check, AlertTriangle } from 'lucide-react';
import { EquationEditor } from './EquationEditor';
import { StepVisualizer, SolutionStep, Solution } from './StepVisualizer';
import { motion, AnimatePresence } from 'framer-motion';

type Method = 'elimination' | 'substitution' | 'matrices';
type Variable = 'x' | 'y' | 'z' | 'w';

interface EnhancedSolverPanelProps {
  className?: string;
}

export function EnhancedSolverPanel({ className }: EnhancedSolverPanelProps) {
  const [equations, setEquations] = useState<string[]>(['2x + y = 5', 'x - y = 1']);
  const [method, setMethod] = useState<Method>('elimination');
  const [solution, setSolution] = useState<Solution>(null);
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('input');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Example systems
  const examples = {
    'basic': ['x + y = 5', '2x - y = 0'],
    'three-var': ['x + y + z = 6', '2x - y + z = 7', '3x + 2y - z = 8'],
    'inconsistent': ['x + y = 5', 'x + y = 7'],
    'infinite': ['x + y = 5', '2x + 2y = 10'],
    'four-var': ['w + x + y + z = 10', '2w - x + 3y - z = 5', 'w + 2x - y + 2z = 7', '3w - 2x - y + z = 4']
  };

  // Reset solution when equations or method changes
  useEffect(() => {
    setSolution(null);
    setSolutionSteps([]);
    setError(null);
    setActiveTab('input');
  }, [equations, method]);

  const loadExample = (key: keyof typeof examples) => {
    setEquations([...examples[key]]);
  };

  const onSubmit = () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Parse equations
      const { matrix, constants } = parseEquations(equations);
      
      // Solve based on selected method
      if (method === 'elimination') {
        const { solution, steps } = solveByElimination(matrix, constants);
        setSolution(solution);
        setSolutionSteps(steps);
        setActiveTab('visualization');
      } else if (method === 'substitution') {
        // Substitution method is a placeholder for now
        const { solution, steps } = solveByElimination(matrix, constants);
        setSolution(solution);
        setSolutionSteps(steps);
        setActiveTab('visualization');
      } else {
        // Matrix method is a placeholder for now
        const { solution, steps } = solveByElimination(matrix, constants);
        setSolution(solution);
        setSolutionSteps(steps);
        setActiveTab('visualization');
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const parseEquations = (eqs: string[]) => {
    // Get number of variables by counting unique variables in all equations
    const varSet = new Set<string>();
    
    eqs.forEach(eq => {
      const leftSide = eq.split('=')[0].trim();
      const matches = leftSide.match(/[a-zA-Z]/g);
      if (matches) {
        matches.forEach(match => varSet.add(match));
      }
    });
    
    const variables = Array.from(varSet).sort();
    
    // Create coefficient matrix and constants vector
    const matrix: number[][] = [];
    const constants: number[] = [];
    
    eqs.forEach(eq => {
      // Split equation into left and right sides
      const [leftSide, rightSide] = eq.split('=').map(side => side.trim());
      
      // Parse right side as constant
      const constant = parseFloat(rightSide);
      if (isNaN(constant)) {
        throw new Error(`Invalid constant: ${rightSide}`);
      }
      
      constants.push(constant);
      
      // Initialize coefficients array with zeros
      const coefficients = Array(variables.length).fill(0);
      
      // Parse left side to extract coefficients
      // Regex matches terms like: x, -y, 2z, +3w, etc.
      const termRegex = /([+-]?\s*\d*\.?\d*)\s*([a-zA-Z])/g;
      let match;
      
      while ((match = termRegex.exec(leftSide)) !== null) {
        let coefficient = match[1].trim();
        const variable = match[2];
        
        // Handle coefficients like "+", "-", or ""
        if (coefficient === '+' || coefficient === '') {
          coefficient = '1';
        } else if (coefficient === '-') {
          coefficient = '-1';
        }
        
        // Find variable index
        const variableIndex = variables.indexOf(variable);
        if (variableIndex === -1) {
          throw new Error(`Variable ${variable} not found in all equations`);
        }
        
        // Set coefficient
        coefficients[variableIndex] = parseFloat(coefficient);
      }
      
      matrix.push(coefficients);
    });
    
    return { matrix, constants, variables };
  };

  const solveByElimination = (coefficientMatrix: number[][], constantsVector: number[]) => {
    const steps: SolutionStep[] = [];
    const n = coefficientMatrix.length; // Number of equations
    const m = coefficientMatrix[0].length; // Number of variables
    
    // Create augmented matrix [A|b]
    const augMatrix: number[][] = [];
    for (let i = 0; i < n; i++) {
      augMatrix.push([...coefficientMatrix[i], constantsVector[i]]);
    }
    
    // Add initial step
    steps.push({
      description: 'Initial augmented matrix',
      equations: [...equations],
      matrix: augMatrix.map(row => [...row]),
    });
    
    // Forward elimination phase
    for (let k = 0; k < Math.min(n, m); k++) {
      // Find pivot
      let pivotRow = k;
      for (let i = k + 1; i < n; i++) {
        if (Math.abs(augMatrix[i][k]) > Math.abs(augMatrix[pivotRow][k])) {
          pivotRow = i;
        }
      }
      
      const pivotValue = augMatrix[pivotRow][k];
      
      // Check if pivot is too small (effectively zero)
      if (Math.abs(pivotValue) < 1e-10) {
        // Move to next column
        continue;
      }
      
      // Swap rows if needed
      if (pivotRow !== k) {
        [augMatrix[k], augMatrix[pivotRow]] = [augMatrix[pivotRow], augMatrix[k]];
        
        // Add row swap step
        steps.push({
          description: `Swap row ${k+1} and row ${pivotRow+1}`,
          operation: `R${k+1} ↔ R${pivotRow+1}`,
          equations: [...equations],
          matrix: augMatrix.map(row => [...row]),
          highlightRows: [k, pivotRow],
        });
      }
      
      // Add pivot highlighting step
      steps.push({
        description: `Using pivot at position (${k+1}, ${k+1})`,
        equations: [...equations],
        matrix: augMatrix.map(row => [...row]),
        pivot: [k, k],
      });
      
      // Eliminate rows below pivot
      for (let i = k + 1; i < n; i++) {
        const factor = augMatrix[i][k] / augMatrix[k][k];
        
        if (Math.abs(factor) < 1e-10) continue; // Skip if factor is effectively zero
        
        // Subtract factor * pivot row from current row
        for (let j = k; j <= m; j++) {
          augMatrix[i][j] -= factor * augMatrix[k][j];
        }
        
        // Add elimination step
        steps.push({
          description: `Eliminate variable in row ${i+1} using row ${k+1}`,
          operation: `R${i+1} ← R${i+1} - ${factor.toFixed(2)} × R${k+1}`,
          equations: [...equations],
          matrix: augMatrix.map(row => [...row]),
          highlightRows: [i, k],
        });
      }
    }
    
    // Check for inconsistency (rows of all zeros except last column)
    for (let i = 0; i < n; i++) {
      let allZeros = true;
      for (let j = 0; j < m; j++) {
        if (Math.abs(augMatrix[i][j]) >= 1e-10) {
          allZeros = false;
          break;
        }
      }
      
      if (allZeros && Math.abs(augMatrix[i][m]) >= 1e-10) {
        // System is inconsistent
        steps.push({
          description: 'System is inconsistent (no solution exists)',
          equations: [...equations],
          matrix: augMatrix.map(row => [...row]),
          highlightRows: [i],
        });
        
        return { solution: 'inconsistent' as const, steps };
      }
    }
    
    // Check for infinite solutions (fewer equations than variables after eliminating zero rows)
    let nonZeroRows = 0;
    for (let i = 0; i < n; i++) {
      let isZeroRow = true;
      for (let j = 0; j <= m; j++) {
        if (Math.abs(augMatrix[i][j]) >= 1e-10) {
          isZeroRow = false;
          break;
        }
      }
      if (!isZeroRow) nonZeroRows++;
    }
    
    if (nonZeroRows < m) {
      // System has infinite solutions
      steps.push({
        description: 'System has infinitely many solutions',
        equations: [...equations],
        matrix: augMatrix.map(row => [...row]),
      });
      
      return { solution: 'infinite' as const, steps };
    }
    
    // Back substitution phase
    const solution: Record<Variable, number> = { x: 0, y: 0, z: 0, w: 0 };
    const variables: Variable[] = ['x', 'y', 'z', 'w'].slice(0, m);
    
    for (let i = Math.min(n, m) - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < m; j++) {
        sum += augMatrix[i][j] * solution[variables[j]];
      }
      
      solution[variables[i]] = (augMatrix[i][m] - sum) / augMatrix[i][i];
      
      // Add back substitution step
      steps.push({
        description: `Solve for ${variables[i]} using back substitution`,
        operation: `${variables[i]} = (${augMatrix[i][m].toFixed(2)} - ${sum.toFixed(2)}) / ${augMatrix[i][i].toFixed(2)} = ${solution[variables[i]].toFixed(4)}`,
        equations: [...equations],
        matrix: augMatrix.map(row => [...row]),
        highlightRows: [i],
        highlightCols: [i, m],
      });
    }
    
    // Add final solution step
    steps.push({
      description: 'Final solution',
      equations: [...equations],
      matrix: augMatrix.map(row => [...row]),
    });
    
    return { solution, steps };
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStepIndex(stepIndex);
  };

  return (
    <div className={className}>
      <Tabs defaultValue="input" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="input">Input System</TabsTrigger>
          <TabsTrigger value="visualization" disabled={solutionSteps.length === 0}>
            Step-by-Step Solution
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="input" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-2/3">
              <EquationEditor 
                equations={equations}
                onChange={setEquations}
                minEquations={2}
              />
            </div>
            
            <Card className="w-full md:w-1/3">
              <CardHeader>
                <CardTitle>Solver Settings</CardTitle>
                <CardDescription>
                  Choose your preferred solution method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Solution Method
                  </label>
                  <Select 
                    value={method} 
                    onValueChange={(value) => setMethod(value as Method)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elimination">Gaussian Elimination</SelectItem>
                      <SelectItem value="substitution">Back Substitution</SelectItem>
                      <SelectItem value="matrices">Matrix Method</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="pt-4">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                    onClick={onSubmit}
                    disabled={isLoading || equations.some(eq => !eq.trim())}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Solve System
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Load Example
                </p>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadExample('basic')}
                  >
                    2×2 System
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadExample('three-var')}
                  >
                    3×3 System
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadExample('inconsistent')}
                  >
                    Inconsistent
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => loadExample('infinite')}
                  >
                    Infinite Solutions
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error solving system</p>
                  <p className="mt-1 text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {solution && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  Solution Found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4">
                  {solution === 'inconsistent' ? (
                    <p className="text-red-600 font-medium">
                      System is inconsistent (no solution exists)
                    </p>
                  ) : solution === 'infinite' ? (
                    <p className="text-amber-600 font-medium">
                      System has infinitely many solutions
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(solution).map(([variable, value]) => (
                        <div key={variable} className="bg-white dark:bg-gray-800 rounded-md border p-3 flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-600">{variable} =</span>
                          <span className="font-mono">{parseFloat(value.toFixed(4))}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="visualization" className="space-y-6">
          {solutionSteps.length > 0 && (
            <>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="mb-6">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center text-lg">
                        <Info className="h-5 w-5 text-blue-500 mr-2" />
                        Step {currentStepIndex + 1} of {solutionSteps.length}
                      </CardTitle>
                      <CardDescription>
                        {solutionSteps[currentStepIndex].description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 text-blue-800 dark:text-blue-300">
                        {solutionSteps[currentStepIndex].operation ? (
                          <p className="font-mono">{solutionSteps[currentStepIndex].operation}</p>
                        ) : (
                          <p>{currentStepIndex === 0 ? 'Starting with the initial matrix' : 
                              currentStepIndex === solutionSteps.length - 1 ? 'Solution complete' : 
                              'Proceeding with the next step'}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
              
              <StepVisualizer 
                steps={solutionSteps}
                solution={solution}
                onStepChange={handleStepChange}
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>System of Equations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {equations.map((eq, index) => (
                      <div key={index} className="p-2 bg-gray-50 dark:bg-gray-900 rounded-md">
                        <p className="font-mono">{eq}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 