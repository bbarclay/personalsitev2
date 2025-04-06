'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

const FibonacciDisplay = () => {
  const [count, setCount] = useState<number>(10);
  const [sequence, setSequence] = useState<number[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState<number>(500);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Calculate Fibonacci sequence
  const calculateFibonacci = (n: number): number[] => {
    const result: number[] = [0, 1];
    for (let i = 2; i <= n; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
    return result.slice(0, n + 1);
  };

  // Animate the sequence generation
  const animateSequence = async () => {
    setIsAnimating(true);
    setSequence([]);

    const fullSequence = calculateFibonacci(count);

    for (let i = 0; i <= count; i++) {
      if (!isAnimating) break;
      setSequence(fullSequence.slice(0, i + 1));
      await new Promise(resolve => setTimeout(resolve, animationSpeed));
    }

    setIsAnimating(false);
  };

  // Stop animation
  const stopAnimation = () => {
    setIsAnimating(false);
  };

  // Generate sequence immediately
  const generateSequence = () => {
    setIsAnimating(false);
    setSequence(calculateFibonacci(count));
  };

  // Reset everything
  const resetSequence = () => {
    setIsAnimating(false);
    setSequence([]);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      setIsAnimating(false);
    };
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Fibonacci Sequence Visualizer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Terms: {count}</label>
          <Slider
            value={[count]}
            min={1}
            max={30}
            step={1}
            onValueChange={(values) => setCount(values[0])}
            disabled={isAnimating}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Animation Speed (ms): {animationSpeed}</label>
          <Slider
            value={[animationSpeed]}
            min={100}
            max={1000}
            step={50}
            onValueChange={(values) => setAnimationSpeed(values[0])}
            disabled={isAnimating}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={animateSequence} disabled={isAnimating}>
            Animate Sequence
          </Button>
          <Button onClick={generateSequence} disabled={isAnimating} variant="outline">
            Generate Instantly
          </Button>
          {isAnimating && (
            <Button onClick={stopAnimation} variant="destructive">
              Stop Animation
            </Button>
          )}
          <Button onClick={resetSequence} variant="ghost" disabled={isAnimating}>
            Reset
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Fibonacci Sequence</h3>
          <div className="flex flex-wrap gap-3">
            {sequence.map((num, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-lg transition-all duration-300 animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: `scale(${1 + index * 0.05})`,
                }}
              >
                {num}
              </div>
            ))}
          </div>

          {sequence.length > 0 && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-2">Sequence Formula</h4>
              <p className="font-mono">
                F(n) = F(n-1) + F(n-2), where F(0) = 0 and F(1) = 1
              </p>
              <div className="mt-2">
                <span className="font-medium">Golden Ratio Approximation: </span>
                {sequence.length >= 3 && (
                  <span className="font-mono">
                    {(sequence[sequence.length - 1] / sequence[sequence.length - 2]).toFixed(8)}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FibonacciDisplay;
