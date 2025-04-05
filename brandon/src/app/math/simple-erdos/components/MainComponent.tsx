import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronRight, AlertCircle, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from 'framer-motion';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const DEFAULT_SEQUENCE = "1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, -1, 1, -1, -1, 1";
const DEFAULT_STEP_SIZE = '2';

const SimpleErdos = () => {
  const [sequenceInput, setSequenceInput] = useState(DEFAULT_SEQUENCE);
  const [stepSizeInput, setStepSizeInput] = useState(DEFAULT_STEP_SIZE);
  const [startPosInput, setStartPosInput] = useState('');
  const [enforcePlusMinusOne, setEnforcePlusMinusOne] = useState(true);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [runningSum, setRunningSum] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [calculationParams, setCalculationParams] = useState<{ d: number; k: number } | null>(null);

  useEffect(() => {
    setHighlighted([]);
    setRunningSum(null);
    setError(null);
    setCalculationParams(null);
  }, [sequenceInput, stepSizeInput, startPosInput, enforcePlusMinusOne]);

  const parsedSequence = useMemo(() => {
    try {
      const numbers = sequenceInput
        .split(',')
        .map(s => s.trim())
        .filter(s => s !== '')
        .map(s => {
          const num = Number(s);
          if (isNaN(num)) throw new Error(`Invalid number found: "${s}".`);
          if (enforcePlusMinusOne && num !== 1 && num !== -1) {
             throw new Error(`Sequence must only contain +1 or -1 (enforced). Found: ${num}`);
          }
          return num;
        });
      if (numbers.length === 0) throw new Error("Sequence cannot be empty.");
      return numbers;
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Invalid sequence format. Please use comma-separated numbers (e.g., 1, -1, 1).");
      return null;
    }
  }, [sequenceInput, enforcePlusMinusOne]);

  const stepSize = useMemo(() => {
    const num = Number(stepSizeInput);
    if (!Number.isInteger(num) || num <= 0) return null; 
    return num;
  }, [stepSizeInput]);

  const startPosition = useMemo(() => {
    if (startPosInput === '') return stepSize;
    const num = Number(startPosInput);
    if (!Number.isInteger(num) || num <= 0) return null; 
    return num;
  }, [startPosInput, stepSize]);

  const showSkipCount = useCallback(() => {
    setHighlighted([]);
    setRunningSum(null);
    setCalculationParams(null);
    let currentError = null;

    if (!parsedSequence) {
      currentError = "Cannot calculate with an invalid sequence.";
    } else if (stepSize === null) {
      currentError = "Skip count size (d) must be a positive integer.";
    } else if (startPosition === null) {
        currentError = "Starting position (k) must be a positive integer.";
    } else if (startPosition > parsedSequence.length) {
        currentError = `Starting position (k=${startPosition}) cannot be greater than sequence length (${parsedSequence.length}).`;
    } else if (startPosition > stepSize) {
        currentError = `Starting position (k=${startPosition}) cannot be greater than skip count size (d=${stepSize}).`;
    }

    if (currentError) {
        setError(currentError);
        return;
    }
    
    const d = stepSize as number; 
    const k = startPosition as number; 

    const newHighlights: number[] = [];
    let sum = 0;
    let position = k - 1;

    while (position < parsedSequence.length) {
      newHighlights.push(position);
      sum += parsedSequence[position];
      position += d;
    }

    setHighlighted(newHighlights);
    setRunningSum(sum);
    setCalculationParams({ d, k });
    setError(null);

  }, [parsedSequence, stepSize, startPosition]);

  const resetDefaults = () => {
      setSequenceInput(DEFAULT_SEQUENCE);
      setStepSizeInput(DEFAULT_STEP_SIZE);
      setStartPosInput('');
      setEnforcePlusMinusOne(true);
  };

  const canCalculate = parsedSequence !== null && stepSize !== null && startPosition !== null;

  return (
    <div className="space-y-6">
      <Card>
          <CardHeader>
              <CardTitle>Erdős Discrepancy Explorer</CardTitle>
              <CardDescription>
                  Explore sums of arithmetic progressions (x<sub>k</sub>, x<sub>k+d</sub>, ...) within a sequence.
              </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {error && (
                  <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                  </Alert>
              )}
              <div>
                  <Label htmlFor="sequenceInput">Sequence (comma-separated numbers)</Label>
                  <Textarea
                      id="sequenceInput"
                      value={sequenceInput}
                      onChange={(e) => setSequenceInput(e.target.value)}
                      placeholder="e.g., 1, -1, 1, -1, 1"
                      rows={3}
                      className="font-mono"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                      <Checkbox 
                          id="enforcePlusMinusOne"
                          checked={enforcePlusMinusOne}
                          onCheckedChange={(checked) => setEnforcePlusMinusOne(Boolean(checked))}
                      />
                      <Label htmlFor="enforcePlusMinusOne" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Enforce sequence values are only +1 or -1
                      </Label>
                  </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                      <Label htmlFor="stepSizeInput">Skip Count Size (d)</Label>
                      <Input
                          id="stepSizeInput"
                          type="number"
                          value={stepSizeInput}
                          onChange={(e) => setStepSizeInput(e.target.value)}
                          placeholder="e.g., 2"
                          min="1"
                          step="1"
                      />
                  </div>
                   <div>
                      <Label htmlFor="startPosInput">Starting Position (k)</Label>
                       <TooltipProvider delayDuration={100}>
                        <UITooltip>
                            <TooltipTrigger asChild>
                                <Input
                                    id="startPosInput"
                                    type="number"
                                    value={startPosInput}
                                    onChange={(e) => setStartPosInput(e.target.value)}
                                    placeholder={`Default: k = d (step size)`}
                                    min="1"
                                    max={stepSize ?? undefined}
                                    step="1"
                                />
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                <p>The starting index (1-based) of the progression. Must be 1 ≤ k ≤ d.</p>
                                <p>If left blank, defaults to k = d.</p>
                            </TooltipContent>
                         </UITooltip>
                        </TooltipProvider>
                  </div>
              </div>
          </CardContent>
          <CardFooter className="flex justify-between">
              <Button onClick={showSkipCount} disabled={!canCalculate}>
                  <ChevronRight className="mr-2 h-4 w-4" />
                  Calculate Sum
              </Button>
              <Button variant="outline" onClick={resetDefaults} aria-label="Reset defaults">
                 <RotateCcw className="h-4 w-4"/>
              </Button>
          </CardFooter>
      </Card>
      
      {parsedSequence && (
          <Card>
              <CardHeader>
                  <CardTitle>Sequence Visualization</CardTitle>
                  {calculationParams && runningSum !== null && (
                     <CardDescription>
                         Showing progression with d={calculationParams.d}, k={calculationParams.k}. Sum = {runningSum}.
                     </CardDescription>
                  )}
              </CardHeader>
              <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b">
                      {parsedSequence.map((value, index) => (
                          <motion.div
                              key={index}
                              className={`
                                  w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium relative
                                  ${value >= 0 ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'}
                                  ${highlighted.includes(index) ? 'ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-background' : ''}
                              `}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              title={`Index ${index + 1}`}
                              transition={{ delay: index * 0.02 }}
                          >
                              {value}
                              {highlighted.includes(index) && calculationParams && index === calculationParams.k - 1 && (
                                 <span className="absolute -top-2 -left-2 text-xs bg-blue-500 text-white rounded-full px-1.5 py-0.5">k</span> 
                              )}
                          </motion.div>
                      ))}
                  </div>
                   {runningSum !== null && calculationParams && (
                        <motion.div 
                           initial={{ opacity: 0, y: 10 }} 
                           animate={{ opacity: 1, y: 0 }} 
                           className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-md"
                        >
                            <p className="text-lg font-medium text-blue-800 dark:text-blue-200">
                                For progression with <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">d = {calculationParams.d}</code> and <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">k = {calculationParams.k}</code>,
                                the sum is <strong className="text-xl">{runningSum}</strong>.
                            </p>
                            {Math.abs(runningSum) >= Math.max(5, Math.sqrt(parsedSequence.length)) &&
                                <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">Notice how the sum can potentially grow!</p>
                            }
                        </motion.div>
                    )}
              </CardContent>
          </Card>
      )}

      <Card>
            <CardHeader>
                <CardTitle>About the Erdős Discrepancy Problem</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                <p>
                    The Erdős discrepancy problem asks about the properties of sequences consisting only of +1s and -1s.
                    Specifically, it considers homogeneous arithmetic progressions within the sequence – these are subsequences formed by taking every d-th term, starting from some position k (i.e., x<sub>k</sub>, x<sub>k+d</sub>, x<sub>k+d*2</sub>, ...).
                </p>
                <p>
                    The <strong>discrepancy</strong> of a finite sequence is the maximum absolute value of the sum of such an arithmetic progression over all possible starting positions k and step sizes d.
                </p>
                <p>
                    Paul Erdős conjectured in the 1930s that for any infinite sequence of +1s and -1s, the discrepancy is unbounded – meaning you can always find homogeneous arithmetic progressions whose sums grow arbitrarily large (either positive or negative).
                </p>
                <p>
                    This tool lets you explore the sum for a specific progression defined by a step size <strong>d</strong> and a starting position <strong>k</strong> (where 1 ≤ k ≤ d).
                    Erdős's conjecture was famously proven by Terence Tao in 2015, confirming that such sequences always have unbounded discrepancy.
                </p>
            </CardContent>
        </Card>
    </div>
  );
};

export default SimpleErdos;
