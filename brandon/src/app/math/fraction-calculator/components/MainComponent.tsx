"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface Fraction {
  numerator: number;
  denominator: number;
}

export const FractionCalculator = () => {
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: 1, denominator: 2 });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: 1, denominator: 3 });
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');
  const [showSteps, setShowSteps] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);
  const [visualType, setVisualType] = useState<'circle' | 'bar'>('circle');

  useEffect(() => {
    setAnimateResult(true);
    const timer = setTimeout(() => setAnimateResult(false), 1000);
    return () => clearTimeout(timer);
  }, [fraction1, fraction2, operation]);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const simplifyFraction = (numerator: number, denominator: number): Fraction => {
    if (numerator === 0) return { numerator: 0, denominator: 1 };
    const divisor = gcd(Math.abs(numerator), Math.abs(denominator));
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  };

  const calculateResult = (): Fraction => {
    let numerator: number;
    let denominator: number;

    switch (operation) {
      case 'add':
        numerator = fraction1.numerator * fraction2.denominator + fraction2.numerator * fraction1.denominator;
        denominator = fraction1.denominator * fraction2.denominator;
        break;
      case 'subtract':
        numerator = fraction1.numerator * fraction2.denominator - fraction2.numerator * fraction1.denominator;
        denominator = fraction1.denominator * fraction2.denominator;
        break;
      case 'multiply':
        numerator = fraction1.numerator * fraction2.numerator;
        denominator = fraction1.denominator * fraction2.denominator;
        break;
      case 'divide':
        numerator = fraction1.numerator * fraction2.denominator;
        denominator = fraction1.denominator * fraction2.numerator;
        break;
      default:
        numerator = 0;
        denominator = 1;
    }

    return simplifyFraction(numerator, denominator);
  };

  const getCalculationSteps = (): string[] => {
    const result = calculateResult();
    const steps: string[] = [];
    
    switch (operation) {
      case 'add':
        steps.push(`Step 1: Find the least common multiple (LCM) of the denominators: LCM(${fraction1.denominator}, ${fraction2.denominator}) = ${lcm(fraction1.denominator, fraction2.denominator)}`);
        steps.push(`Step 2: Convert fractions to equivalent fractions with the same denominator`);
        steps.push(`  ${fraction1.numerator}/${fraction1.denominator} = ${fraction1.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction1.denominator)}/${lcm(fraction1.denominator, fraction2.denominator)}`);
        steps.push(`  ${fraction2.numerator}/${fraction2.denominator} = ${fraction2.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction2.denominator)}/${lcm(fraction1.denominator, fraction2.denominator)}`);
        steps.push(`Step 3: Add the numerators: ${fraction1.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction1.denominator)} + ${fraction2.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction2.denominator)} = ${fraction1.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction1.denominator) + fraction2.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction2.denominator)}`);
        steps.push(`Step 4: Simplify: ${result.numerator}/${result.denominator}`);
        break;
      case 'subtract':
        steps.push(`Step 1: Find the least common multiple (LCM) of the denominators: LCM(${fraction1.denominator}, ${fraction2.denominator}) = ${lcm(fraction1.denominator, fraction2.denominator)}`);
        steps.push(`Step 2: Convert fractions to equivalent fractions with the same denominator`);
        steps.push(`  ${fraction1.numerator}/${fraction1.denominator} = ${fraction1.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction1.denominator)}/${lcm(fraction1.denominator, fraction2.denominator)}`);
        steps.push(`  ${fraction2.numerator}/${fraction2.denominator} = ${fraction2.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction2.denominator)}/${lcm(fraction1.denominator, fraction2.denominator)}`);
        steps.push(`Step 3: Subtract the numerators: ${fraction1.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction1.denominator)} - ${fraction2.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction2.denominator)} = ${fraction1.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction1.denominator) - fraction2.numerator * (lcm(fraction1.denominator, fraction2.denominator) / fraction2.denominator)}`);
        steps.push(`Step 4: Simplify: ${result.numerator}/${result.denominator}`);
        break;
      case 'multiply':
        steps.push(`Step 1: Multiply the numerators: ${fraction1.numerator} × ${fraction2.numerator} = ${fraction1.numerator * fraction2.numerator}`);
        steps.push(`Step 2: Multiply the denominators: ${fraction1.denominator} × ${fraction2.denominator} = ${fraction1.denominator * fraction2.denominator}`);
        steps.push(`Step 3: Simplify: ${result.numerator}/${result.denominator}`);
        break;
      case 'divide':
        steps.push(`Step 1: Multiply by the reciprocal of the second fraction: ${fraction1.numerator}/${fraction1.denominator} ÷ ${fraction2.numerator}/${fraction2.denominator} = ${fraction1.numerator}/${fraction1.denominator} × ${fraction2.denominator}/${fraction2.numerator}`);
        steps.push(`Step 2: Multiply the numerators: ${fraction1.numerator} × ${fraction2.denominator} = ${fraction1.numerator * fraction2.denominator}`);
        steps.push(`Step 3: Multiply the denominators: ${fraction1.denominator} × ${fraction2.numerator} = ${fraction1.denominator * fraction2.numerator}`);
        steps.push(`Step 4: Simplify: ${result.numerator}/${result.denominator}`);
        break;
    }
    
    return steps;
  };

  const CircleVisualizer = ({ fraction, size = 200, highlightColor = "bg-blue-500" }: { fraction: Fraction; size?: number; highlightColor?: string }) => {
    const pieces = fraction.denominator;
    const filled = fraction.numerator;
    const radius = size / 2;
    const center = { x: radius, y: radius };
    const anglePerPiece = (2 * Math.PI) / pieces;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        {Array.from({ length: pieces }).map((_, i) => {
          const startAngle = i * anglePerPiece;
          const endAngle = startAngle + anglePerPiece;
          const startX = center.x + radius * Math.cos(startAngle);
          const startY = center.y + radius * Math.sin(startAngle);
          const endX = center.x + radius * Math.cos(endAngle);
          const endY = center.y + radius * Math.sin(endAngle);
          const largeArcFlag = anglePerPiece > Math.PI ? 1 : 0;

          const pathData = [
            'M', center.x, center.y,
            'L', startX, startY,
            'A', radius, radius, 0, largeArcFlag, 1, endX, endY,
            'Z'
          ].join(' ');

          return (
            <motion.path
              key={i}
              d={pathData}
              className={`stroke-gray-300 ${i < filled ? highlightColor : 'fill-gray-100 dark:fill-gray-800'}`}
              strokeWidth="1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: i < filled && animateResult ? [0.8, 1.1, 1] : 1 
              }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.05,
                ease: "easeInOut" 
              }}
            />
          );
        })}
      </svg>
    );
  };

  const BarVisualizer = ({ fraction, size = 200, highlightColor = "bg-blue-500" }: { fraction: Fraction; size?: number; highlightColor?: string }) => {
    const pieces = fraction.denominator;
    const filled = fraction.numerator;
    const barHeight = size / 10;
    
    return (
      <div style={{ width: size, height: barHeight }} className="flex relative mb-1">
        {Array.from({ length: pieces }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-full border border-gray-300 ${i < filled ? highlightColor : 'bg-gray-100 dark:bg-gray-800'}`}
            style={{ width: `${100 / pieces}%` }}
            initial={{ opacity: 0, scaleY: 0.5 }}
            animate={{ 
              opacity: 1, 
              scaleY: i < filled && animateResult ? [0.5, 1.2, 1] : 1 
            }}
            transition={{ 
              duration: 0.5, 
              delay: i * 0.05,
              ease: "easeInOut" 
            }}
          />
        ))}
      </div>
    );
  };

  const FractionVisualizer = ({ fraction, size = 200, highlightColor = "bg-blue-500" }: { fraction: Fraction; size?: number; highlightColor?: string }) => {
    return (
      <div className="flex flex-col items-center">
        {visualType === 'circle' ? (
          <CircleVisualizer fraction={fraction} size={size} highlightColor={highlightColor} />
        ) : (
          <BarVisualizer fraction={fraction} size={size} highlightColor={highlightColor} />
        )}
        <div className="text-xl font-bold mt-2">
          {fraction.numerator}/{fraction.denominator}
        </div>
      </div>
    );
  };

  const OperationButton = ({ op, label }: { op: typeof operation; label: string }) => (
    <Button
      onClick={() => setOperation(op)}
      variant={operation === op ? "default" : "outline"}
      className={`px-6 py-2 ${operation === op ? 'shadow-md' : ''}`}
    >
      {label}
    </Button>
  );

  const FractionInput = ({
    fraction,
    setFraction,
    label,
    highlightColor
  }: {
    fraction: Fraction;
    setFraction: (f: Fraction) => void;
    label: string;
    highlightColor: string;
  }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{label}</h3>
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium">Numerator</label>
          <span className="text-sm font-bold">{fraction.numerator}</span>
        </div>
        <Slider
          value={[fraction.numerator]}
          onValueChange={(values) => setFraction({ ...fraction, numerator: values[0] })}
          min={0}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-sm font-medium">Denominator</label>
          <span className="text-sm font-bold">{fraction.denominator}</span>
        </div>
        <Slider
          value={[fraction.denominator]}
          onValueChange={(values) => setFraction({ ...fraction, denominator: Math.max(1, values[0]) })}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
      <div className="flex justify-center">
        <FractionVisualizer fraction={fraction} size={140} highlightColor={highlightColor} />
      </div>
    </div>
  );

  const result = calculateResult();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Interactive Fraction Calculator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore fraction operations with visual representations and step-by-step solutions
        </p>
      </div>

      <div className="flex justify-center mb-4">
        <Tabs defaultValue="circle" className="w-64">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="circle" onClick={() => setVisualType('circle')}>Circle View</TabsTrigger>
            <TabsTrigger value="bar" onClick={() => setVisualType('bar')}>Bar View</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FractionInput 
                fraction={fraction1} 
                setFraction={setFraction1} 
                label="First Fraction" 
                highlightColor="fill-blue-500 dark:fill-blue-400" 
              />

              <div className="flex justify-center space-x-2 my-4">
                <OperationButton op="add" label="+" />
                <OperationButton op="subtract" label="−" />
                <OperationButton op="multiply" label="×" />
                <OperationButton op="divide" label="÷" />
              </div>

              <FractionInput 
                fraction={fraction2} 
                setFraction={setFraction2} 
                label="Second Fraction" 
                highlightColor="fill-purple-500 dark:fill-purple-400" 
              />
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold mb-4 text-center">Result</h3>
                <div className="text-center space-y-4">
                  <motion.div 
                    className="text-2xl font-bold"
                    key={`${operation}-${fraction1.numerator}-${fraction1.denominator}-${fraction2.numerator}-${fraction2.denominator}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {fraction1.numerator}/{fraction1.denominator} {' '}
                    {operation === 'add' ? '+' : operation === 'subtract' ? '−' : operation === 'multiply' ? '×' : '÷'} {' '}
                    {fraction2.numerator}/{fraction2.denominator} {' '}
                    = {' '}
                    {result.numerator}/{result.denominator}
                  </motion.div>
                  <div className="flex justify-center">
                    <FractionVisualizer 
                      fraction={result} 
                      size={180} 
                      highlightColor="fill-green-500 dark:fill-green-400" 
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Step-by-Step Solution</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowSteps(!showSteps)}
                  >
                    {showSteps ? 'Hide Steps' : 'Show Steps'}
                  </Button>
                </div>
                <AnimatePresence>
                  {showSteps && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-2 text-sm">
                        {getCalculationSteps().map((step, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={step.startsWith('Step') ? 'font-medium' : 'ml-4 text-gray-600 dark:text-gray-400'}
                          >
                            {step}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!showSteps && (
                  <p className="text-sm text-gray-500">Click "Show Steps" to see a detailed explanation of the solution.</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full bg-white dark:bg-gray-800 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">Understanding Fraction Operations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Addition and Subtraction</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To add or subtract fractions, they must have the same denominator. If they don't, convert them to equivalent fractions with a common denominator (usually the LCM of the denominators), then add or subtract the numerators.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Multiplication and Division</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                To multiply fractions, multiply the numerators together and the denominators together. To divide by a fraction, multiply by its reciprocal (flip the numerator and denominator). Always simplify your final answer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FractionCalculator;
