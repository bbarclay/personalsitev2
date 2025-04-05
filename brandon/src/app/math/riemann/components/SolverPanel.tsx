"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RotateCcw, AlertTriangle, InfoIcon, ArrowLeftRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SolverPanel() {
  const [expression, setExpression] = useState('x^2');
  const [lowerBound, setLowerBound] = useState('0');
  const [upperBound, setUpperBound] = useState('1');
  const [numRectangles, setNumRectangles] = useState('10');
  const [method, setMethod] = useState('left');
  const [results, setResults] = useState<Record<string, number | null>>({
    left: null,
    right: null,
    mid: null
  });
  const [error, setError] = useState('');
  const [exactResult, setExactResult] = useState<number | null>(null);
  const [showExact, setShowExact] = useState(false);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  
  // Canvas references for visualization
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const compareCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Predefined examples
  const examples = [
    { name: 'Quadratic', expression: 'x^2', lowerBound: '0', upperBound: '1' },
    { name: 'Sine Wave', expression: 'sin(x)', lowerBound: '0', upperBound: 'pi' },
    { name: 'Exponential', expression: 'e^x', lowerBound: '0', upperBound: '2' },
    { name: 'Logarithm', expression: 'log(x)', lowerBound: '1', upperBound: '3' },
    { name: 'Inverse', expression: '1/x', lowerBound: '1', upperBound: '4' },
  ];
  
  // Function to evaluate mathematical expressions
  const evaluateExpression = (expr: string, x: number): number => {
    try {
      // Replace common mathematical terms
      const sanitizedExpr = expr
        .replace(/\^/g, '**')
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log(')
        .replace(/exp\(/g, 'Math.exp(')
        .replace(/pi/g, 'Math.PI')
        .replace(/e(?![a-zA-Z])/g, 'Math.E');
        
      // eslint-disable-next-line no-new-func
      return Function('x', `return ${sanitizedExpr}`)(x);
    } catch (err) {
      throw new Error('Invalid expression');
    }
  };

  // Calculate exact result for certain common functions
  const calculateExactIntegral = () => {
    try {
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      let result: number | null = null;
      
      // Handle some common cases
      if (expression === 'x^2') {
        result = (b**3 - a**3) / 3;
      } else if (expression === 'x') {
        result = (b**2 - a**2) / 2;
      } else if (expression === 'sin(x)') {
        result = -Math.cos(b) + Math.cos(a);
      } else if (expression === 'cos(x)') {
        result = Math.sin(b) - Math.sin(a);
      } else if (expression === 'e^x') {
        result = Math.exp(b) - Math.exp(a);
      } else if (expression === '1/x' && a > 0 && b > 0) {
        result = Math.log(b) - Math.log(a);
      } else if (expression.match(/^x\^[0-9]+$/)) {
        const power = parseInt(expression.split('^')[1]);
        if (!isNaN(power) && power !== -1) {
          result = (b**(power+1) - a**(power+1)) / (power+1);
        }
      }
      
      setExactResult(result);
      setShowExact(result !== null);
    } catch (err) {
      setExactResult(null);
      setShowExact(false);
    }
  };

  const calculateRiemannSum = (calculationMethod = method) => {
    try {
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      const n = parseInt(numRectangles);
      
      if (isNaN(a) || isNaN(b) || isNaN(n)) {
        throw new Error('Please enter valid numbers for all fields');
      }
      
      if (n <= 0) {
        throw new Error('Number of rectangles must be positive');
      }
      
      if (a >= b) {
        throw new Error('Upper bound must be greater than lower bound');
      }
      
      const dx = (b - a) / n;
      let sum = 0;
      
      for (let i = 0; i < n; i++) {
        let x;
        
        switch (calculationMethod) {
          case 'left':
            x = a + i * dx;
            break;
          case 'right':
            x = a + (i + 1) * dx;
            break;
          case 'mid':
            x = a + (i + 0.5) * dx;
            break;
          default:
            x = a + i * dx;
        }
        
        const fX = evaluateExpression(expression, x);
        sum += fX * dx;
      }
      
      return sum;
    } catch (err) {
      throw err;
    }
  };

  const calculateAllMethods = () => {
    setError('');
    try {
      const leftResult = calculateRiemannSum('left');
      const rightResult = calculateRiemannSum('right');
      const midResult = calculateRiemannSum('mid');
      
      setResults({
        left: leftResult,
        right: rightResult,
        mid: midResult
      });
      
      calculateExactIntegral();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResults({
        left: null,
        right: null,
        mid: null
      });
      setExactResult(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (compareMode) {
      calculateAllMethods();
    } else {
      try {
        const result = calculateRiemannSum();
        setResults({ ...results, [method]: result });
        calculateExactIntegral();
        setError('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setResults({ ...results, [method]: null });
        setExactResult(null);
      }
    }
  };
  
  const applyExample = (index: number) => {
    const example = examples[index];
    setExpression(example.expression);
    setLowerBound(example.lowerBound);
    setUpperBound(example.upperBound);
  };
  
  const resetCalculator = () => {
    setExpression('x^2');
    setLowerBound('0');
    setUpperBound('1');
    setNumRectangles('10');
    setMethod('left');
    setResults({
      left: null,
      right: null,
      mid: null
    });
    setError('');
    setExactResult(null);
    setShowExact(false);
  };
  
  // Draw the function and Riemann sum visualization
  const drawVisualization = (canvas: HTMLCanvasElement | null, drawMethod?: string) => {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    try {
      // Parse bounds
      const a = parseFloat(lowerBound);
      const b = parseFloat(upperBound);
      const n = parseInt(numRectangles);
      
      if (isNaN(a) || isNaN(b) || isNaN(n) || n <= 0 || a >= b) {
        return;
      }
      
      // Calculate function values to determine y-axis scaling
      const samples = 100;
      const sampleStep = (b - a) / samples;
      let minY = Infinity;
      let maxY = -Infinity;
      const sampleValues = [];
      
      for (let i = 0; i <= samples; i++) {
        const x = a + i * sampleStep;
        try {
          const y = evaluateExpression(expression, x);
          if (isFinite(y)) {
            minY = Math.min(minY, y);
            maxY = Math.max(maxY, y);
            sampleValues.push({ x, y });
          }
        } catch (e) {
          // Skip invalid values
        }
      }
      
      // Ensure we have a visible range, add padding to y-axis
      if (minY === maxY) {
        minY -= 1;
        maxY += 1;
      } else {
        const yPadding = (maxY - minY) * 0.1;
        minY -= yPadding;
        maxY += yPadding;
      }
      
      // Mapping functions from mathematical to canvas coordinates
      const mapX = (x: number) => padding + ((x - a) / (b - a)) * (width - 2 * padding);
      const mapY = (y: number) => height - padding - ((y - minY) / (maxY - minY)) * (height - 2 * padding);
      
      // Draw axes
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // X-axis
      ctx.moveTo(padding, mapY(0));
      ctx.lineTo(width - padding, mapY(0));
      
      // Y-axis
      ctx.moveTo(mapX(0), height - padding);
      ctx.lineTo(mapX(0), padding);
      
      ctx.stroke();
      
      // Draw grid
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      
      // Draw x grid lines and labels
      const xStep = (b - a) / 5;
      for (let x = a; x <= b; x += xStep) {
        ctx.moveTo(mapX(x), height - padding);
        ctx.lineTo(mapX(x), padding);
        
        // Add labels
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText(x.toFixed(1), mapX(x), height - padding / 2);
      }
      
      // Draw y grid lines and labels
      const yStep = (maxY - minY) / 5;
      for (let y = minY; y <= maxY; y += yStep) {
        ctx.moveTo(padding, mapY(y));
        ctx.lineTo(width - padding, mapY(y));
        
        // Add labels
        ctx.fillStyle = '#666';
        ctx.textAlign = 'right';
        ctx.fillText(y.toFixed(1), padding - 5, mapY(y) + 5);
      }
      
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Calculate Riemann sum rectangles
      const dx = (b - a) / n;
      const rectangles = [];
      
      const methodToUse = drawMethod || method;
      
      for (let i = 0; i < n; i++) {
        let x;
        
        switch (methodToUse) {
          case 'left':
            x = a + i * dx;
            break;
          case 'right':
            x = a + (i + 1) * dx;
            break;
          case 'mid':
            x = a + (i + 0.5) * dx;
            break;
          default:
            x = a + i * dx;
        }
        
        try {
          const y = evaluateExpression(expression, x);
          if (isFinite(y)) {
            rectangles.push({
              x1: a + i * dx,
              x2: a + (i + 1) * dx,
              y
            });
          }
        } catch (e) {
          // Skip invalid values
        }
      }
      
      // Draw Riemann sum rectangles with color based on method
      let rectColor, rectBorderColor;
      
      switch (methodToUse) {
        case 'left':
          rectColor = 'rgba(173, 216, 230, 0.5)';
          rectBorderColor = 'rgba(70, 130, 180, 0.8)';
          break;
        case 'right':
          rectColor = 'rgba(144, 238, 144, 0.5)';
          rectBorderColor = 'rgba(46, 139, 87, 0.8)';
          break;
        case 'mid':
          rectColor = 'rgba(255, 182, 193, 0.5)';
          rectBorderColor = 'rgba(220, 20, 60, 0.8)';
          break;
        default:
          rectColor = 'rgba(173, 216, 230, 0.5)';
          rectBorderColor = 'rgba(70, 130, 180, 0.8)';
      }
      
      ctx.fillStyle = rectColor;
      ctx.strokeStyle = rectBorderColor;
      ctx.lineWidth = 1;
      
      for (const rect of rectangles) {
        const x1 = mapX(rect.x1);
        const x2 = mapX(rect.x2);
        const y = mapY(rect.y);
        const zeroY = mapY(0);
        
        ctx.fillRect(x1, Math.min(y, zeroY), x2 - x1, Math.abs(zeroY - y));
        ctx.strokeRect(x1, Math.min(y, zeroY), x2 - x1, Math.abs(zeroY - y));
      }
      
      // Draw function curve
      ctx.strokeStyle = '#e33';
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      let first = true;
      for (const point of sampleValues) {
        if (first) {
          ctx.moveTo(mapX(point.x), mapY(point.y));
          first = false;
        } else {
          ctx.lineTo(mapX(point.x), mapY(point.y));
        }
      }
      
      ctx.stroke();
      
      // Add labels for axes
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.fillText('x', width - padding / 2, mapY(0) + 20);
      ctx.fillText('f(x)', mapX(0) - 20, padding / 2);
      
      // Add title
      ctx.fillStyle = '#333';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`f(x) = ${expression}`, width / 2, padding / 2);
      
      // Add method label if specified
      if (drawMethod) {
        const methodName = drawMethod === 'left' ? 'Left' : drawMethod === 'right' ? 'Right' : 'Midpoint';
        ctx.fillStyle = rectBorderColor;
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${methodName} Riemann Sum`, width / 2, height - 10);
      }
      
    } catch (err) {
      // Handle drawing errors silently
    }
  };
  
  // Effect to update the visualization when parameters change
  useEffect(() => {
    if (autoUpdate) {
      if (compareMode) {
        calculateAllMethods();
      } else {
        try {
          const result = calculateRiemannSum();
          setResults({ ...results, [method]: result });
          calculateExactIntegral();
          setError('');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
          setResults({ ...results, [method]: null });
          setExactResult(null);
        }
      }
    }
    
    // Draw the primary visualization
    drawVisualization(canvasRef.current);
    
    // Draw the comparison visualizations if in compare mode
    if (compareMode) {
      const canvasWidth = compareCanvasRef.current?.width || 0;
      const canvasHeight = compareCanvasRef.current?.height || 0;
      const ctx = compareCanvasRef.current?.getContext('2d');
      
      if (ctx && canvasWidth > 0 && canvasHeight > 0) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Create three separate visuals in one canvas
        const thirdWidth = Math.floor(canvasWidth / 3);
        
        // Store the original canvas
        const originalCanvas = compareCanvasRef.current;
        
        // Create temporary canvases
        const leftCanvas = document.createElement('canvas');
        leftCanvas.width = thirdWidth;
        leftCanvas.height = canvasHeight;
        
        const rightCanvas = document.createElement('canvas');
        rightCanvas.width = thirdWidth;
        rightCanvas.height = canvasHeight;
        
        const midCanvas = document.createElement('canvas');
        midCanvas.width = thirdWidth;
        midCanvas.height = canvasHeight;
        
        // Draw each method on its own canvas
        drawVisualization(leftCanvas, 'left');
        drawVisualization(rightCanvas, 'right');
        drawVisualization(midCanvas, 'mid');
        
        // Combine them
        ctx.drawImage(leftCanvas, 0, 0);
        ctx.drawImage(rightCanvas, thirdWidth, 0);
        ctx.drawImage(midCanvas, thirdWidth * 2, 0);
        
        // Add separator lines
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(thirdWidth, 0);
        ctx.lineTo(thirdWidth, canvasHeight);
        ctx.moveTo(thirdWidth * 2, 0);
        ctx.lineTo(thirdWidth * 2, canvasHeight);
        ctx.stroke();
      }
    }
  }, [expression, lowerBound, upperBound, numRectangles, method, autoUpdate, compareMode]);

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="mb-2">Riemann Sum Calculator</h2>
        <p className="text-muted-foreground">
          Calculate definite integrals using Riemann sums with various approximation methods.
          Visualize how rectangles approximate the area under a curve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Function & Parameters</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={resetCalculator}
                        className="h-8 w-8"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Reset all values</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="expression">Function f(x)</Label>
                  <Input
                    id="expression"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    placeholder="e.g., x^2, sin(x), e^x"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    Supported: +, -, *, /, ^, sin(), cos(), tan(), sqrt(), log(), exp(), pi, e
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lowerBound">Lower Bound (a)</Label>
                    <Input
                      id="lowerBound"
                      value={lowerBound}
                      onChange={(e) => setLowerBound(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="upperBound">Upper Bound (b)</Label>
                    <Input
                      id="upperBound"
                      value={upperBound}
                      onChange={(e) => setUpperBound(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="numRectangles">Rectangles: {numRectangles}</Label>
                    <span className="text-xs text-muted-foreground">1-100</span>
                  </div>
                  <Slider
                    id="numRectangles"
                    min={1}
                    max={100}
                    step={1}
                    value={[parseInt(numRectangles)]}
                    onValueChange={(value) => setNumRectangles(value[0].toString())}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Approximation Method</Label>
                  {!compareMode && (
                    <Select value={method} onValueChange={setMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="left">Left Riemann Sum</SelectItem>
                        <SelectItem value="right">Right Riemann Sum</SelectItem>
                        <SelectItem value="mid">Midpoint Riemann Sum</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <Switch
                      id="compareMode"
                      checked={compareMode}
                      onCheckedChange={setCompareMode}
                    />
                    <Label htmlFor="compareMode" className="cursor-pointer">
                      <div className="flex items-center">
                        <span>Compare All Methods</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InfoIcon className="h-4 w-4 ml-1 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Shows all three approximation methods side by side</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoUpdate"
                    checked={autoUpdate}
                    onCheckedChange={setAutoUpdate}
                  />
                  <Label htmlFor="autoUpdate">Update automatically</Label>
                </div>
                
                <Button type="submit" className="w-full" disabled={autoUpdate}>
                  Calculate
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                {examples.map((example, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    onClick={() => applyExample(index)}
                    className="justify-start"
                  >
                    <span className="font-mono mr-2">f(x) = {example.expression}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      [{example.lowerBound}, {example.upperBound}]
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {!compareMode && results[method] !== null && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-primary mb-2">Result</h3>
                <div className="font-mono text-xl font-semibold">
                  ∫<sub>{lowerBound}</sub><sup>{upperBound}</sup> {expression} dx ≈ {results[method]?.toFixed(6)}
                </div>
                
                {showExact && exactResult !== null && (
                  <div className="mt-4 text-sm">
                    <div className="font-medium">Exact value: {exactResult.toFixed(6)}</div>
                    <div className="mt-1">
                      Error: {Math.abs((results[method] ?? 0) - exactResult).toFixed(6)} ({(Math.abs((results[method] ?? 0) - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {compareMode && (results.left !== null || results.right !== null || results.mid !== null) && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium text-primary mb-2">Comparison Results</h3>
                <div className="space-y-3">
                  {results.left !== null && (
                    <div className="p-2 bg-blue-100 dark:bg-blue-950 rounded-md">
                      <div className="font-medium">Left: {results.left.toFixed(6)}</div>
                      {showExact && exactResult !== null && (
                        <div className="text-xs mt-1">
                          Error: {Math.abs(results.left - exactResult).toFixed(6)} ({(Math.abs(results.left - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)
                        </div>
                      )}
                    </div>
                  )}
                  
                  {results.right !== null && (
                    <div className="p-2 bg-green-100 dark:bg-green-950 rounded-md">
                      <div className="font-medium">Right: {results.right.toFixed(6)}</div>
                      {showExact && exactResult !== null && (
                        <div className="text-xs mt-1">
                          Error: {Math.abs(results.right - exactResult).toFixed(6)} ({(Math.abs(results.right - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)
                        </div>
                      )}
                    </div>
                  )}
                  
                  {results.mid !== null && (
                    <div className="p-2 bg-pink-100 dark:bg-pink-950 rounded-md">
                      <div className="font-medium">Midpoint: {results.mid.toFixed(6)}</div>
                      {showExact && exactResult !== null && (
                        <div className="text-xs mt-1">
                          Error: {Math.abs(results.mid - exactResult).toFixed(6)} ({(Math.abs(results.mid - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)
                        </div>
                      )}
                    </div>
                  )}
                  
                  {showExact && exactResult !== null && (
                    <div className="p-2 bg-purple-100 dark:bg-purple-950 rounded-md">
                      <div className="font-medium">Exact: {exactResult.toFixed(6)}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Visualization</span>
                {compareMode && (
                  <span className="text-sm text-muted-foreground">
                    Showing all three methods side by side
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!compareMode ? (
                <div className="border rounded-lg overflow-hidden bg-card">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="p-4 flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center">
                      <span className="h-3 w-6 bg-red-500 inline-block mr-2"></span>
                      <span>Function f(x)</span>
                    </div>
                    {method === 'left' && (
                      <div className="flex items-center">
                        <span className="h-3 w-6 bg-blue-200 border border-blue-500 inline-block mr-2"></span>
                        <span>Left Rectangles</span>
                      </div>
                    )}
                    {method === 'right' && (
                      <div className="flex items-center">
                        <span className="h-3 w-6 bg-green-200 border border-green-500 inline-block mr-2"></span>
                        <span>Right Rectangles</span>
                      </div>
                    )}
                    {method === 'mid' && (
                      <div className="flex items-center">
                        <span className="h-3 w-6 bg-pink-200 border border-pink-500 inline-block mr-2"></span>
                        <span>Midpoint Rectangles</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="border rounded-lg overflow-hidden bg-card">
                  <canvas
                    ref={compareCanvasRef}
                    width={1200}
                    height={500}
                    className="w-full h-auto"
                  />
                  <div className="p-4 grid grid-cols-3 gap-4 text-sm">
                    <div className="flex flex-col items-center">
                      <span className="h-3 w-6 bg-blue-200 border border-blue-500 inline-block mb-1"></span>
                      <span>Left Riemann Sum</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="h-3 w-6 bg-green-200 border border-green-500 inline-block mb-1"></span>
                      <span>Right Riemann Sum</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="h-3 w-6 bg-pink-200 border border-pink-500 inline-block mb-1"></span>
                      <span>Midpoint Riemann Sum</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  The Riemann sum approximates the area under a curve by dividing it into rectangles.
                  The approximation improves as the number of rectangles increases. The midpoint method
                  typically gives the most accurate approximation among the three methods.
                </p>
              </div>
            </CardContent>
          </Card>
          
          {showExact && exactResult !== null && (
            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2 mb-4">
                  <InfoIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">Mathematical Insight</h3>
                </div>
                <p className="mb-3">
                  For the function f(x) = {expression} on the interval [{lowerBound}, {upperBound}]:
                </p>
                <div className="space-y-2 font-mono p-3 bg-muted rounded-md">
                  <div>• Exact value of the integral: {exactResult.toFixed(8)}</div>
                  {compareMode && results.left !== null && results.mid !== null && results.right !== null && (
                    <>
                      <div>• Left Riemann Sum error: {Math.abs(results.left - exactResult).toFixed(8)} ({(Math.abs(results.left - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)</div>
                      <div>• Midpoint Riemann Sum error: {Math.abs(results.mid - exactResult).toFixed(8)} ({(Math.abs(results.mid - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)</div>
                      <div>• Right Riemann Sum error: {Math.abs(results.right - exactResult).toFixed(8)} ({(Math.abs(results.right - exactResult) / Math.abs(exactResult) * 100).toFixed(2)}%)</div>
                    </>
                  )}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {expression === 'x^2' && 'For quadratic functions, the midpoint rule is significantly more accurate than left or right sums.'}
                  {expression === 'sin(x)' && 'For sinusoidal functions, errors depend on where the interval begins and ends relative to the curve.'}
                  {expression === 'e^x' && 'For exponential functions, the error in the right sum is typically larger than the left sum when integrating on positive intervals.'}
                  Notice how the error decreases as you increase the number of rectangles.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 