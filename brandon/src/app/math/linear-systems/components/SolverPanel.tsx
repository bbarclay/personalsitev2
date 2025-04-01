'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, AlertCircle, CheckCircle2, RotateCw, Play, Pause, SkipForward } from "lucide-react";

type Method = 'elimination' | 'substitution' | 'matrices';
type Variable = 'x' | 'y' | 'z' | 'w';
type Solution = Record<Variable, number> | 'inconsistent' | 'infinite' | null;
type SolutionStep = {
  description: string;
  equations: string[];
  matrix?: number[][];
  pivot?: [number, number];
  highlightRows?: number[];
  highlightCols?: number[];
};

export default function SolverPanel() {
  const [equations, setEquations] = useState<string[]>(['2x + y = 5', 'x - y = 1']);
  const [method, setMethod] = useState<Method>('elimination');
  const [solution, setSolution] = useState<Solution>(null);
  const [solutionSteps, setSolutionSteps] = useState<SolutionStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1500); // ms between steps
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset solution when equations or method changes
  useEffect(() => {
    setSolution(null);
    setSolutionSteps([]);
    setCurrentStepIndex(0);
    setError(null);
    setShowSteps(false);
    setAutoPlay(false);
  }, [equations, method]);

  // Handle autoplay for steps
  useEffect(() => {
    if (autoPlay && solutionSteps.length > 0 && currentStepIndex < solutionSteps.length - 1) {
      autoPlayTimerRef.current = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, animationSpeed);
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current);
      }
    };
  }, [autoPlay, currentStepIndex, solutionSteps.length, animationSpeed]);

  // Effect for drawing the current step visualization
  useEffect(() => {
    if (solutionSteps.length > 0 && canvasRef.current) {
      drawStepVisualization(solutionSteps[currentStepIndex]);
    }
  }, [currentStepIndex, solutionSteps]);

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...equations];
    newEquations[index] = value;
    setEquations(newEquations);
  };

  const addEquation = () => {
    if (equations.length === 2) {
      setEquations([...equations, 'x + y + z = 0']);
    } else if (equations.length === 3) {
      setEquations([...equations, 'x + y + z + w = 0']);
    } else {
      setEquations([...equations, 'x + y = 0']);
    }
  };

  const removeEquation = (index: number) => {
    if (equations.length > 2) {
      const newEquations = equations.filter((_, i) => i !== index);
      setEquations(newEquations);
    }
  };

  // Draw the current step visualization
  const drawStepVisualization = (step: SolutionStep) => {
    const canvas = canvasRef.current;
    if (!canvas || !step.matrix) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set up for drawing
    const cellSize = 60;
    const padding = 40;
    const fontSize = 16;
    const rows = step.matrix.length;
    const cols = step.matrix[0].length;
    
    // Calculate canvas dimensions needed
    canvas.width = padding * 2 + cellSize * cols;
    canvas.height = padding * 2 + cellSize * rows;
    
    // Background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      const x = padding + i * cellSize;
      ctx.moveTo(x, padding);
      ctx.lineTo(x, padding + rows * cellSize);
      ctx.stroke();
    }
    
    // Horizontal lines
    for (let i = 0; i <= rows; i++) {
      ctx.beginPath();
      const y = padding + i * cellSize;
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + cols * cellSize, y);
      ctx.stroke();
    }
    
    // Draw vertical divider before the last column (for augmented matrix)
    ctx.strokeStyle = '#adb5bd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const dividerX = padding + (cols - 1) * cellSize;
    ctx.moveTo(dividerX, padding);
    ctx.lineTo(dividerX, padding + rows * cellSize);
    ctx.stroke();
    
    // Draw matrix values
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = padding + j * cellSize + cellSize / 2;
        const y = padding + i * cellSize + cellSize / 2;
        
        // Highlight the current pivot if applicable
        if (step.pivot && step.pivot[0] === i && step.pivot[1] === j) {
          ctx.fillStyle = 'rgba(255, 193, 7, 0.5)';
          ctx.fillRect(padding + j * cellSize, padding + i * cellSize, cellSize, cellSize);
        }
        
        // Highlight rows if applicable
        if (step.highlightRows && step.highlightRows.includes(i)) {
          ctx.fillStyle = 'rgba(13, 110, 253, 0.2)';
          ctx.fillRect(padding, padding + i * cellSize, cellSize * cols, cellSize);
        }
        
        // Highlight columns if applicable
        if (step.highlightCols && step.highlightCols.includes(j)) {
          ctx.fillStyle = 'rgba(25, 135, 84, 0.2)';
          ctx.fillRect(padding + j * cellSize, padding, cellSize, cellSize * rows);
        }
        
        // Draw the cell value
        ctx.fillStyle = '#212529';
        ctx.fillText(step.matrix[i][j].toFixed(2), x, y);
      }
    }
    
    // Add labels for variables
    const variables = ['x', 'y', 'z', 'w'].slice(0, cols - 1);
    ctx.fillStyle = '#495057';
    
    for (let j = 0; j < cols - 1; j++) {
      const x = padding + j * cellSize + cellSize / 2;
      const y = padding - 20;
      ctx.fillText(variables[j], x, y);
    }
    
    // Label for constants column
    ctx.fillText('=', padding + (cols - 1) * cellSize + cellSize / 2, padding - 20);
    
    // Add row numbers
    for (let i = 0; i < rows; i++) {
      const y = padding + i * cellSize + cellSize / 2;
      ctx.fillText(`R${i+1}`, padding - 20, y);
    }
    
    // Draw description text
    ctx.fillStyle = '#0d6efd';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(step.description, padding, padding + rows * cellSize + 30);
  };

  // Parse equation into coefficient matrix and constants
  const parseEquations = () => {
    const variables: Variable[] = ['x', 'y', 'z', 'w'].slice(0, equations.length);
    const matrix: number[][] = [];
    const constants: number[] = [];

    for (const equation of equations) {
      const sides = equation.split('=');
      if (sides.length !== 2) {
        throw new Error(`Invalid equation format: ${equation}`);
      }

      const leftSide = sides[0].trim();
      const rightSide = sides[1].trim();
      const constant = parseFloat(rightSide);
      
      if (isNaN(constant)) {
        throw new Error(`Right side must be a number: ${equation}`);
      }

      const coeffs: number[] = Array(variables.length).fill(0);
      const terms = leftSide.split(/(?=[-+])/);

      for (const term of terms) {
        const trimmedTerm = term.trim();
        if (!trimmedTerm) continue;

        let coeff = 1;
        let variable: Variable | null = null;

        if (trimmedTerm.startsWith('+')) {
          const withoutSign = trimmedTerm.substring(1).trim();
          
          if (withoutSign.includes('x')) {
            variable = 'x';
            coeff = withoutSign.replace('x', '') === '' ? 1 : parseFloat(withoutSign.replace('x', ''));
          } else if (withoutSign.includes('y')) {
            variable = 'y';
            coeff = withoutSign.replace('y', '') === '' ? 1 : parseFloat(withoutSign.replace('y', ''));
          } else if (withoutSign.includes('z')) {
            variable = 'z';
            coeff = withoutSign.replace('z', '') === '' ? 1 : parseFloat(withoutSign.replace('z', ''));
          } else if (withoutSign.includes('w')) {
            variable = 'w';
            coeff = withoutSign.replace('w', '') === '' ? 1 : parseFloat(withoutSign.replace('w', ''));
          }
        } else if (trimmedTerm.startsWith('-')) {
          const withoutSign = trimmedTerm.substring(1).trim();
          
          if (withoutSign.includes('x')) {
            variable = 'x';
            coeff = withoutSign.replace('x', '') === '' ? -1 : -parseFloat(withoutSign.replace('x', ''));
          } else if (withoutSign.includes('y')) {
            variable = 'y';
            coeff = withoutSign.replace('y', '') === '' ? -1 : -parseFloat(withoutSign.replace('y', ''));
          } else if (withoutSign.includes('z')) {
            variable = 'z';
            coeff = withoutSign.replace('z', '') === '' ? -1 : -parseFloat(withoutSign.replace('z', ''));
          } else if (withoutSign.includes('w')) {
            variable = 'w';
            coeff = withoutSign.replace('w', '') === '' ? -1 : -parseFloat(withoutSign.replace('w', ''));
          }
        } else {
          if (trimmedTerm.includes('x')) {
            variable = 'x';
            coeff = trimmedTerm.replace('x', '') === '' ? 1 : parseFloat(trimmedTerm.replace('x', ''));
          } else if (trimmedTerm.includes('y')) {
            variable = 'y';
            coeff = trimmedTerm.replace('y', '') === '' ? 1 : parseFloat(trimmedTerm.replace('y', ''));
          } else if (trimmedTerm.includes('z')) {
            variable = 'z';
            coeff = trimmedTerm.replace('z', '') === '' ? 1 : parseFloat(trimmedTerm.replace('z', ''));
          } else if (trimmedTerm.includes('w')) {
            variable = 'w';
            coeff = trimmedTerm.replace('w', '') === '' ? 1 : parseFloat(trimmedTerm.replace('w', ''));
          }
        }

        if (variable) {
          const index = variables.indexOf(variable);
          if (index !== -1) {
            coeffs[index] = coeff;
          }
        }
      }

      matrix.push(coeffs);
      constants.push(constant);
    }

    return { matrix, constants, variables };
  };

  // Enhanced Gaussian elimination with visual steps
  const solveByElimination = (matrix: number[][], constants: number[], variables: Variable[]): [Solution, SolutionStep[]] => {
    const steps: SolutionStep[] = [];
    const n = matrix.length;
    const augmentedMatrix = matrix.map((row, i) => [...row, constants[i]]);
    
    steps.push({
      description: "Initial augmented matrix",
      equations: augmentedMatrix.map((row, i) => 
        `${row.slice(0, -1).map((c, j) => `${c >= 0 && i > 0 ? '+' : ''}${c}${variables[j]}`).join(' ')} = ${row[row.length - 1]}`
      ),
      matrix: augmentedMatrix.map(row => [...row]) // Deep copy
    });

    // Forward elimination
    for (let i = 0; i < n; i++) {
      // Find pivot
      let maxRow = i;
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
          maxRow = j;
        }
      }

      // Add step for pivot selection
      steps.push({
        description: `Selecting pivot from column ${i + 1}`,
        equations: augmentedMatrix.map((row, idx) => 
          `${row.slice(0, -1).map((c, j) => `${c >= 0 && idx > 0 ? '+' : ''}${c.toFixed(2)}${variables[j]}`).join(' ')} = ${row[row.length - 1].toFixed(2)}`
        ),
        matrix: augmentedMatrix.map(row => [...row]),
        highlightCols: [i],
        pivot: [maxRow, i]
      });

      // Swap rows if needed
      if (maxRow !== i) {
        [augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]];
        
        steps.push({
          description: `Swap row ${i + 1} with row ${maxRow + 1}`,
          equations: augmentedMatrix.map((row, idx) => 
            `${row.slice(0, -1).map((c, j) => `${c >= 0 && idx > 0 ? '+' : ''}${c.toFixed(2)}${variables[j]}`).join(' ')} = ${row[row.length - 1].toFixed(2)}`
          ),
          matrix: augmentedMatrix.map(row => [...row]),
          highlightRows: [i, maxRow]
        });
      }

      // Skip if pivot is zero
      if (Math.abs(augmentedMatrix[i][i]) < 1e-10) {
        steps.push({
          description: `Pivot in position (${i+1},${i+1}) is effectively zero, skipping this step`,
          equations: augmentedMatrix.map((row, idx) => 
            `${row.slice(0, -1).map((c, j) => `${c >= 0 && idx > 0 ? '+' : ''}${c.toFixed(2)}${variables[j]}`).join(' ')} = ${row[row.length - 1].toFixed(2)}`
          ),
          matrix: augmentedMatrix.map(row => [...row]),
          pivot: [i, i]
        });
        continue;
      }

      // Normalize pivot row
      const pivot = augmentedMatrix[i][i];
      for (let j = i; j < n + 1; j++) {
        augmentedMatrix[i][j] /= pivot;
      }
      
      steps.push({
        description: `Normalize row ${i + 1} by dividing by ${pivot.toFixed(2)}`,
        equations: augmentedMatrix.map((row, idx) => 
          `${row.slice(0, -1).map((c, j) => `${c >= 0 && idx > 0 ? '+' : ''}${c.toFixed(2)}${variables[j]}`).join(' ')} = ${row[row.length - 1].toFixed(2)}`
        ),
        matrix: augmentedMatrix.map(row => [...row]),
        highlightRows: [i]
      });

      // Eliminate below
      for (let j = i + 1; j < n; j++) {
        const factor = augmentedMatrix[j][i];
        if (Math.abs(factor) < 1e-10) continue; // Skip if coefficient is already zero
        
        for (let k = i; k < n + 1; k++) {
          augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k];
        }
        
        steps.push({
          description: `Eliminate coefficient in row ${j + 1}, column ${i + 1} by subtracting ${factor.toFixed(2)} times row ${i + 1}`,
          equations: augmentedMatrix.map((row, idx) => 
            `${row.slice(0, -1).map((c, j) => `${c >= 0 && idx > 0 ? '+' : ''}${c.toFixed(2)}${variables[j]}`).join(' ')} = ${row[row.length - 1].toFixed(2)}`
          ),
          matrix: augmentedMatrix.map(row => [...row]),
          highlightRows: [i, j]
        });
      }
    }

    // Back substitution
    const result: Record<Variable, number> = {} as Record<Variable, number>;
    
    // Check for inconsistency or infinite solutions
    for (let i = n - 1; i >= 0; i--) {
      let allZeros = true;
      
      for (let j = i; j < n; j++) {
        if (Math.abs(augmentedMatrix[i][j]) > 1e-10) {
          allZeros = false;
          break;
        }
      }
      
      if (allZeros && Math.abs(augmentedMatrix[i][n]) > 1e-10) {
        steps.push({
          description: "System is inconsistent (no solution) - found a contradiction (0 = non-zero)",
          equations: ["The system has no solution"],
          matrix: augmentedMatrix.map(row => [...row]),
          highlightRows: [i]
        });
        return ['inconsistent', steps];
      }
      
      if (allZeros && Math.abs(augmentedMatrix[i][n]) < 1e-10) {
        steps.push({
          description: "System has infinitely many solutions - found a dependent equation (0 = 0)",
          equations: ["The system has infinitely many solutions"],
          matrix: augmentedMatrix.map(row => [...row]),
          highlightRows: [i]
        });
        return ['infinite', steps];
      }
    }
    
    steps.push({
      description: "Upper triangular form achieved, ready for back-substitution",
      equations: augmentedMatrix.map((row, idx) => 
        `${row.slice(0, -1).map((c, j) => `${c >= 0 && idx > 0 ? '+' : ''}${c.toFixed(2)}${variables[j]}`).join(' ')} = ${row[row.length - 1].toFixed(2)}`
      ),
      matrix: augmentedMatrix.map(row => [...row])
    });
    
    // Perform the back substitution
    for (let i = n - 1; i >= 0; i--) {
      let sum = 0;
      for (let j = i + 1; j < n; j++) {
        sum += augmentedMatrix[i][j] * result[variables[j]];
      }
      
      result[variables[i]] = augmentedMatrix[i][n] - sum;
      
      steps.push({
        description: `Solve for ${variables[i]}: ${variables[i]} = ${result[variables[i]].toFixed(4)}`,
        equations: Object.entries(result)
          .filter(([_, value]) => !isNaN(value))
          .map(([variable, value]) => `${variable} = ${value.toFixed(4)}`),
        matrix: augmentedMatrix.map(row => [...row]),
        highlightRows: [i],
        highlightCols: [i, n]
      });
    }
    
    return [result, steps];
  };

  // Solve the system
  const solve = () => {
    try {
      setLoading(true);
      setError(null);
      setSolution(null);
      setSolutionSteps([]);
      setCurrentStepIndex(0);
      setShowSteps(true);
      
      const { matrix, constants, variables } = parseEquations();
      
      let result: Solution = null;
      let steps: SolutionStep[] = [];
      
      switch(method) {
        case 'elimination':
          [result, steps] = solveByElimination(matrix, constants, variables);
          break;
        default:
          [result, steps] = solveByElimination(matrix, constants, variables);
      }
      
      setSolution(result);
      setSolutionSteps(steps);
      setCurrentStepIndex(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to solve the system');
    } finally {
      setLoading(false);
    }
  };
  
  // Load an example system
  const loadExample = (exampleName: string) => {
    switch(exampleName) {
      case 'simple':
        setEquations(['x + y = 3', '2x - y = 0']);
        break;
      case 'standard':
        setEquations(['2x + y + z = 9', 'x - y + 2z = 8', '3x + 2y - z = 3']);
        break;
      case 'swap':
        setEquations(['x + 2y + z = 7', '3x + 8y + z = 17', '4x - 2y + 6z = 18']);
        break;
      case 'singular':
        setEquations(['x + 2y + 3z = 5', '2x + 4y + 6z = 10', 'x - y + z = 3']);
        break;
      case 'inconsistent':
        setEquations(['x + y = 3', 'x + y = 4', '2x + 2y = 6']);
        break;
      default:
        setEquations(['x + y = 3', '2x - y = 0']);
    }
  };

  // Format solution for display
  const formatSolution = (sol: Solution): string => {
    if (sol === 'inconsistent') {
      return 'The system is inconsistent (no solution)';
    }
    
    if (sol === 'infinite') {
      return 'The system has infinitely many solutions';
    }
    
    if (sol === null) {
      return 'No solution calculated yet';
    }
    
    return Object.entries(sol)
      .map(([variable, value]) => `${variable} = ${value.toFixed(4)}`)
      .join(', ');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Linear Equation System Solver</CardTitle>
          <CardDescription>
            Enter a system of linear equations and solve it step by step
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Input System</h3>
                <div className="flex space-x-2">
                  <Button 
                    onClick={addEquation} 
                    size="sm" 
                    variant="outline"
                    disabled={equations.length >= 4}
                  >
                    Add Equation
                  </Button>
                  <Select 
                    value={method} 
                    onValueChange={(value) => setMethod(value as Method)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elimination">Gaussian Elimination</SelectItem>
                      <SelectItem value="substitution">Back Substitution</SelectItem>
                      <SelectItem value="matrices">Matrix Method</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                {equations.map((equation, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-6 text-gray-500">{index + 1}.</span>
                    <input
                      value={equation}
                      onChange={(e) => handleEquationChange(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Enter equation (e.g., 2x + y = 5)"
                    />
                    {equations.length > 2 && (
                      <Button
                        onClick={() => removeEquation(index)}
                        variant="ghost"
                        size="sm"
                        className="text-red-500 h-8 w-8 p-0"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => loadExample('simple')} variant="outline" size="sm">
                  Simple 2×2
                </Button>
                <Button onClick={() => loadExample('standard')} variant="outline" size="sm">
                  Standard 3×3
                </Button>
                <Button onClick={() => loadExample('swap')} variant="outline" size="sm">
                  Needs Swap
                </Button>
                <Button onClick={() => loadExample('singular')} variant="outline" size="sm">
                  Singular (Inf)
                </Button>
                <Button onClick={() => loadExample('inconsistent')} variant="outline" size="sm">
                  Inconsistent
                </Button>
              </div>
              
              <Button onClick={solve} disabled={loading} className="w-full mt-4">
                {loading ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : null}
                Solve System
              </Button>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {solution && (
              <Alert variant={solution === 'inconsistent' ? 'destructive' : 'default'}>
                <div className="flex items-start">
                  {solution !== 'inconsistent' && (
                    <CheckCircle2 className="h-4 w-4 mt-0.5 mr-2 text-green-500" />
                  )}
                  <div>
                    <AlertTitle>Solution</AlertTitle>
                    <AlertDescription className="font-mono">
                      {formatSolution(solution)}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
            
            {showSteps && solutionSteps.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Step-by-Step Solution</h3>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={() => setCurrentStepIndex(0)}
                      variant="outline" 
                      size="sm"
                      disabled={currentStepIndex === 0}
                    >
                      First
                    </Button>
                    <Button 
                      onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                      variant="outline" 
                      size="sm"
                      disabled={currentStepIndex === 0}
                    >
                      Prev
                    </Button>
                    <Button 
                      onClick={() => setAutoPlay(!autoPlay)}
                      variant={autoPlay ? "default" : "outline"} 
                      size="sm"
                    >
                      {autoPlay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button 
                      onClick={() => setCurrentStepIndex(prev => Math.min(solutionSteps.length - 1, prev + 1))}
                      variant="outline" 
                      size="sm"
                      disabled={currentStepIndex === solutionSteps.length - 1}
                    >
                      Next
                    </Button>
                    <Button 
                      onClick={() => setCurrentStepIndex(solutionSteps.length - 1)}
                      variant="outline" 
                      size="sm"
                      disabled={currentStepIndex === solutionSteps.length - 1}
                    >
                      Last
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Step {currentStepIndex + 1} of {solutionSteps.length}
                  </div>
                </div>
                
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 bg-gray-50 border-b">
                      <h4 className="font-medium">{solutionSteps[currentStepIndex].description}</h4>
                    </div>
                    
                    <div className="p-4 flex flex-col items-center">
                      <canvas ref={canvasRef} width="600" height="400" className="max-w-full"></canvas>
                      
                      <div className="mt-4 space-y-2 w-full">
                        <h5 className="text-sm font-medium text-gray-700">Current Equations:</h5>
                        <div className="space-y-1 font-mono text-sm">
                          {solutionSteps[currentStepIndex].equations.map((eq, idx) => (
                            <div key={idx} className="p-2 bg-gray-50 rounded">
                              {eq}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}