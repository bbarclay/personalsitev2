'use client';

import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  LinearSystem,
  SolverMethod,
  SolverState,
  SOLVER_METHODS,
  EXAMPLE_SYSTEMS,
  DEFAULT_VARIABLES,
  MethodInfo,
  SystemFormat
} from '../../types';
import { parseEquation, formatEquation, validateVariables } from '../../utils/equation-parser';
import { solveSystem } from '../../utils/system-solver';

const MAX_EQUATIONS = 5;
const MIN_EQUATIONS = 2;

export function InteractiveSolver() {
  const [state, setState] = useState<SolverState>({
    system: {
      equations: [],
      variables: DEFAULT_VARIABLES,
    },
    variables: DEFAULT_VARIABLES,
    result: null,
    isLoading: false,
    currentStep: 0
  });

  const [equationInputs, setEquationInputs] = useState<string[]>(['2x + y = 5', 'x - y = 1']);
  const [selectedMethod, setSelectedMethod] = useState<SolverMethod>('gaussian');
  const [displayFormat, setDisplayFormat] = useState<SystemFormat>('standard');
  const [showMethodInfo, setShowMethodInfo] = useState(false);

  const validateAndParseEquations = useCallback(() => {
    try {
      validateVariables(state.variables);
      const equations = equationInputs.map(input => {
        if (!input.trim()) {
          throw new Error('All equation fields must be filled');
        }
        return parseEquation(input, state.variables);
      });
      return equations;
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        result: {
          solution: null,
          steps: [],
          error: error instanceof Error ? error.message : 'Invalid input'
        }
      }));
      return null;
    }
  }, [equationInputs, state.variables]);

  const handleSolve = async () => {
    setState(prev => ({ ...prev, isLoading: true, result: null }));
    
    try {
      const equations = validateAndParseEquations();
      if (!equations) return;

      const result = await solveSystem({
        equations,
        variables: state.variables
      }, selectedMethod);

      setState(prev => ({
        ...prev,
        result,
        isLoading: false,
        currentStep: 0
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        result: {
          solution: null,
          steps: [],
          error: error instanceof Error ? error.message : 'An unexpected error occurred'
        },
        isLoading: false
      }));
    }
  };

  const handleAddEquation = () => {
    if (equationInputs.length >= MAX_EQUATIONS) return;
    setEquationInputs(prev => [...prev, '']);
  };

  const handleRemoveEquation = (index: number) => {
    if (equationInputs.length <= MIN_EQUATIONS) return;
    setEquationInputs(prev => prev.filter((_, i) => i !== index));
  };

  const handleEquationChange = (index: number, value: string) => {
    setEquationInputs(prev => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleMethodChange = (method: SolverMethod) => {
    setSelectedMethod(method);
    setShowMethodInfo(true);
  };

  const handleLoadExample = (index: number) => {
    const example = EXAMPLE_SYSTEMS[index];
    setEquationInputs(example.equations);
  };

  const handleStepChange = (step: number) => {
    if (!state.result?.steps) return;
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, state.result!.steps.length - 1))
    }));
  };

  const selectedMethodInfo = SOLVER_METHODS.find(m => m.id === selectedMethod);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Linear System Solver</h2>
          <div className="flex gap-2">
            <Select
              value={selectedMethod}
              onValueChange={(value: SolverMethod) => handleMethodChange(value)}
            >
              {SOLVER_METHODS.map(method => (
                <option key={method.id} value={method.id}>{method.name}</option>
              ))}
            </Select>
            <Select
              value={displayFormat}
              onValueChange={(value: SystemFormat) => setDisplayFormat(value)}
            >
              <option value="standard">Standard Format</option>
              <option value="matrix">Matrix Format</option>
              <option value="augmented">Augmented Matrix</option>
            </Select>
          </div>
        </div>

        {showMethodInfo && selectedMethodInfo && (
          <Card className="p-4 bg-muted">
            <h3 className="font-semibold">{selectedMethodInfo.name}</h3>
            <p className="text-sm mt-1">{selectedMethodInfo.description}</p>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <h4 className="font-medium text-sm">Best For:</h4>
                <ul className="text-sm list-disc pl-4">
                  {selectedMethodInfo.bestFor.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-sm">Limitations:</h4>
                <ul className="text-sm list-disc pl-4">
                  {selectedMethodInfo.limitations.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => setShowMethodInfo(false)}
            >
              Hide Info
            </Button>
          </Card>
        )}

        <Card className="p-4">
          <div className="space-y-4">
            {equationInputs.map((equation, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Input
                  value={equation}
                  onChange={(e) => handleEquationChange(index, e.target.value)}
                  placeholder={`Equation ${index + 1} (e.g., 2x + 3y = 6)`}
                  className="flex-grow font-mono"
                  disabled={state.isLoading}
                />
                {equationInputs.length > MIN_EQUATIONS && (
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveEquation(index)}
                    size="sm"
                    disabled={state.isLoading}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <div className="flex gap-4">
              <Button 
                onClick={handleAddEquation}
                disabled={equationInputs.length >= MAX_EQUATIONS || state.isLoading}
              >
                Add Equation
              </Button>
              <Button 
                onClick={handleSolve}
                variant="default"
                disabled={state.isLoading}
              >
                {state.isLoading ? 'Solving...' : 'Solve System'}
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Example Systems:</h3>
            <div className="flex gap-2 flex-wrap">
              {EXAMPLE_SYSTEMS.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLoadExample(index)}
                  title={example.description}
                >
                  {example.name}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        {state.result?.error && (
          <Alert variant="destructive">
            <AlertDescription>{state.result.error}</AlertDescription>
          </Alert>
        )}

        {state.result && !state.result.error && (
          <Card className="p-4">
            <Tabs defaultValue="solution">
              <TabsList>
                <TabsTrigger value="solution">Solution</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="info">System Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="solution">
                {state.result.solution ? (
                  <div className="font-mono space-y-1">
                    {state.variables.map((variable, index) => (
                      <div key={variable}>
                        {variable} = {state.result!.solution![index].toFixed(4)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No unique solution exists.</p>
                )}
              </TabsContent>

              <TabsContent value="steps">
                {state.result.steps.length > 0 && (
                  <>
                    <div className="flex items-center gap-2 mb-4">
                      <Button
                        size="sm"
                        disabled={state.currentStep === 0}
                        onClick={() => handleStepChange(state.currentStep - 1)}
                      >
                        Previous
                      </Button>
                      <span>
                        Step {state.currentStep + 1} of {state.result.steps.length}
                      </span>
                      <Button
                        size="sm"
                        disabled={state.currentStep === state.result.steps.length - 1}
                        onClick={() => handleStepChange(state.currentStep + 1)}
                      >
                        Next
                      </Button>
                    </div>
                    <Card className="p-4 bg-muted">
                      <p className="mb-2">{state.result.steps[state.currentStep].description}</p>
                      <div className="font-mono whitespace-pre">
                        {state.result.steps[state.currentStep].matrix.map(row => 
                          row.map(val => val.toFixed(2).padStart(8)).join('')
                        ).join('\n')}
                      </div>
                    </Card>
                  </>
                )}
              </TabsContent>

              <TabsContent value="info">
                <div className="space-y-2">
                  {state.result.determinant !== undefined && (
                    <p>Determinant: {state.result.determinant.toFixed(4)}</p>
                  )}
                  {state.result.rank !== undefined && (
                    <p>Rank: {state.result.rank}</p>
                  )}
                  <p>Number of equations: {equationInputs.length}</p>
                  <p>Number of variables: {state.variables.length}</p>
                  <p>System type: {
                    equationInputs.length === state.variables.length ? 'Square' :
                    equationInputs.length < state.variables.length ? 'Underdetermined' :
                    'Overdetermined'
                  }</p>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
}
