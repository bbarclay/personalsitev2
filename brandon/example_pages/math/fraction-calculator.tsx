"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Slider } from "@components/ui/slider";

interface Fraction {
  numerator: number;
  denominator: number;
}

export const FractionCalculator = () => {
  const [fraction1, setFraction1] = useState<Fraction>({ numerator: 1, denominator: 2 });
  const [fraction2, setFraction2] = useState<Fraction>({ numerator: 1, denominator: 3 });
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add');

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (numerator: number, denominator: number): Fraction => {
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

  const FractionVisualizer = ({ fraction, size = 200 }: { fraction: Fraction; size?: number }) => {
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
            <path
              key={i}
              d={pathData}
              className={`stroke-gray-300 ${i < filled ? 'fill-blue-500' : 'fill-gray-100'}`}
              strokeWidth="1"
            />
          );
        })}
      </svg>
    );
  };

  const OperationButton = ({ op, label }: { op: typeof operation; label: string }) => (
    <button
      onClick={() => setOperation(op)}
      className={`px-4 py-2 rounded-md transition-colors
        ${operation === op
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 hover:bg-gray-200  dark:hover:bg-gray-700'}`}
    >
      {label}
    </button>
  );

  const FractionInput = ({
    fraction,
    setFraction
  }: {
    fraction: Fraction;
    setFraction: (f: Fraction) => void;
  }) => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Numerator: {fraction.numerator}</label>
        <Slider
          value={[fraction.numerator]}
          onValueChange={(values) => setFraction({ ...fraction, numerator: values[0] })}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Denominator: {fraction.denominator}</label>
        <Slider
          value={[fraction.denominator]}
          onValueChange={(values) => setFraction({ ...fraction, denominator: values[0] })}
          min={1}
          max={10}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );

  const result = calculateResult();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Fraction Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">First Fraction</h3>
              <FractionInput fraction={fraction1} setFraction={setFraction1} />
              <div className="flex justify-center">
                <FractionVisualizer fraction={fraction1} size={150} />
              </div>
            </div>

            <div className="flex justify-center space-x-2">
              <OperationButton op="add" label="+" />
              <OperationButton op="subtract" label="−" />
              <OperationButton op="multiply" label="×" />
              <OperationButton op="divide" label="÷" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Second Fraction</h3>
              <FractionInput fraction={fraction2} setFraction={setFraction2} />
              <div className="flex justify-center">
                <FractionVisualizer fraction={fraction2} size={150} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Result</h3>
              <div className="text-center space-y-4">
                <div className="text-2xl font-bold">
                  {fraction1.numerator}/{fraction1.denominator} {' '}
                  {operation === 'add' ? '+' : operation === 'subtract' ? '−' : operation === 'multiply' ? '×' : '÷'} {' '}
                  {fraction2.numerator}/{fraction2.denominator} {' '}
                  = {' '}
                  {result.numerator}/{result.denominator}
                </div>
                <FractionVisualizer fraction={result} size={200} />
              </div>
            </div>

            <div className="p-4 bg-gray-50  rounded-lg">
              <h3 className="text-lg font-semibold mb-2">How to Use</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Adjust the sliders to change fraction values</li>
                <li>Choose an operation using the buttons</li>
                <li>Watch how the visual representation changes</li>
                <li>Results are automatically simplified</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FractionCalculator;
