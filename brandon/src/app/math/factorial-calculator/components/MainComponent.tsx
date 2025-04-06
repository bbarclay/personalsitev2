"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Info, Play, Pause, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FactorialVisualization from './FactorialVisualization';
import FactorialFormula from './FactorialFormula';

// Utility function to format large numbers
const formatNumber = (num: number): string => {
  if (num > 1e20) {
    return num.toExponential(5);
  }
  return num.toLocaleString();
};

// Utility function to calculate factorial iteratively to avoid stack overflow
const calculateFactorial = (n: number): number => {
  if (n < 0) return 0;
  if (n <= 1) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Calculate factorial steps for visualization
const calculateFactorialSteps = (n: number): { step: number; value: number; operation: string }[] => {
  const steps = [];

  if (n < 0) return steps;
  if (n <= 1) {
    steps.push({ step: 0, value: 1, operation: "1" });
    return steps;
  }

  let result = 1;
  steps.push({ step: 0, value: 1, operation: "1" });

  for (let i = 2; i <= n; i++) {
    result *= i;
    steps.push({
      step: i - 1,
      value: result,
      operation: `${steps[i-2].value} × ${i} = ${result}`
    });
  }

  return steps;
};

const FactorialCalculator = () => {
  const [number, setNumber] = useState<string>('5');
  const [result, setResult] = useState<number | null>(null);
  const [steps, setSteps] = useState<{ step: number; value: number; operation: string }[]>([]);
  const [error, setError] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [animationSpeed, setAnimationSpeed] = useState<number>(1000);
  const [visualizationType, setVisualizationType] = useState<'bars' | 'spiral'>('bars');
  const [maxSafeNumber, setMaxSafeNumber] = useState<number>(20); // Limit for visualization

  // Calculate on initial render
  useEffect(() => {
    handleCalculate();
  }, []);

  const handleCalculate = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 0) {
      setError('Please enter a valid non-negative integer');
      setResult(null);
      setSteps([]);
      return;
    }

    if (num > 170) {
      setError('Numbers above 170 will exceed JavaScript\'s number precision. Results may not be accurate.');
    } else {
      setError('');
    }

    try {
      const calculatedResult = calculateFactorial(num);
      setResult(calculatedResult);
      const calculatedSteps = calculateFactorialSteps(num);
      setSteps(calculatedSteps);
      setCurrentStep(0);
    } catch (e) {
      setError('Calculation error. Try a smaller number.');
      setResult(null);
      setSteps([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(e.target.value);
    setIsAnimating(false);
  };

  const toggleAnimation = () => {
    if (isAnimating) {
      setIsAnimating(false);
    } else {
      setIsAnimating(true);
      setCurrentStep(0);
    }
  };

  // Animation effect
  useEffect(() => {
    if (!isAnimating || steps.length === 0) return;

    if (currentStep >= steps.length) {
      setIsAnimating(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, animationSpeed);

    return () => clearTimeout(timer);
  }, [isAnimating, currentStep, steps.length, animationSpeed]);

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Input Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Factorial Calculator
            </h2>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter a number (n)</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={number}
                    onChange={handleInputChange}
                    placeholder="Enter a non-negative integer"
                    className="flex-1"
                    min="0"
                    max="170"
                  />
                  <Button onClick={handleCalculate} className="bg-gradient-to-r from-purple-600 to-indigo-600">
                    Calculate
                  </Button>
                </div>
              </div>

              {result !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">
                        {number}! = {formatNumber(result)}
                      </h3>
                      {parseInt(number) > 20 && (
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                          This is approximately {result.toExponential(5)}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={toggleAnimation}
                        disabled={steps.length === 0}
                      >
                        {isAnimating ? <Pause size={16} /> : <Play size={16} />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={resetAnimation}
                        disabled={steps.length === 0 || currentStep === 0}
                      >
                        <RefreshCw size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {steps.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Animation Speed</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Fast</span>
                    <Slider
                      value={[animationSpeed]}
                      min={200}
                      max={2000}
                      step={100}
                      onValueChange={(values) => setAnimationSpeed(values[0])}
                      disabled={isAnimating}
                      className="flex-1"
                    />
                    <span className="text-xs">Slow</span>
                  </div>
                </div>
              )}

              {steps.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visualization Type</label>
                  <div className="flex gap-2">
                    <Button
                      variant={visualizationType === 'bars' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setVisualizationType('bars')}
                      className={visualizationType === 'bars' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : ''}
                    >
                      Bar Chart
                    </Button>
                    <Button
                      variant={visualizationType === 'spiral' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setVisualizationType('spiral')}
                      className={visualizationType === 'spiral' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : ''}
                    >
                      Spiral
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Visualization Card */}
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Visualization
            </h2>

            {steps.length > 0 ? (
              <div className="space-y-4">
                <FactorialVisualization
                  steps={steps}
                  currentStep={currentStep}
                  type={visualizationType}
                  maxSafeNumber={maxSafeNumber}
                />

                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium mb-2">Step-by-Step Calculation</h3>
                  <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                    {steps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: index <= currentStep ? 1 : 0.3,
                          x: 0,
                          fontWeight: index === currentStep ? 700 : 400,
                        }}
                        className={`p-2 rounded ${index === currentStep ? 'bg-purple-100 dark:bg-purple-900/30' : ''}`}
                      >
                        <span className="text-sm">{step.operation}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[300px] bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Info size={32} className="mx-auto mb-2 opacity-50" />
                  <p>Enter a number and click Calculate to see the visualization</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Formula and Explanation */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <Tabs defaultValue="formula">
            <TabsList className="mb-4">
              <TabsTrigger value="formula">Formula</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="formula">
              <FactorialFormula />
            </TabsContent>

            <TabsContent value="properties">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Properties of Factorial</h3>
                <ul>
                  <li><strong>0! = 1</strong> (by definition)</li>
                  <li><strong>n! = n × (n-1)!</strong> (recursive definition)</li>
                  <li><strong>n! grows very quickly</strong> - faster than exponential growth</li>
                  <li><strong>Stirling's Approximation:</strong> For large n, n! ≈ √(2πn)(n/e)ⁿ</li>
                  <li><strong>Double Factorial:</strong> n!! = n × (n-2) × (n-4) × ... × (n mod 2)</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="examples">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Examples</h3>
                <ul>
                  <li><strong>0! = 1</strong> (by definition)</li>
                  <li><strong>1! = 1</strong></li>
                  <li><strong>2! = 2 × 1 = 2</strong></li>
                  <li><strong>3! = 3 × 2 × 1 = 6</strong></li>
                  <li><strong>4! = 4 × 3 × 2 × 1 = 24</strong></li>
                  <li><strong>5! = 5 × 4 × 3 × 2 × 1 = 120</strong></li>
                  <li><strong>10! = 3,628,800</strong></li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default FactorialCalculator;
