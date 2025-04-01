import React from 'react';
import { Card } from '@components/ui/card';

interface FractionDisplayProps {
  numerator: number;
  denominator: number;
  secondNumerator: number;
  secondDenominator: number;
  operation: string;
  result: { numerator: number; denominator: number } | null;
}

const FractionDisplay: React.FC<FractionDisplayProps> = ({
  numerator,
  denominator,
  secondNumerator,
  secondDenominator,
  operation,
  result,
}) => {
  // Function to render a visual representation of a fraction
  const renderFractionVisual = (num: number, den: number) => {
    const blocks = [];
    const total = Math.abs(den);
    const filled = Math.abs(num);
    const isNegative = (num < 0 && den > 0) || (num > 0 && den < 0);

    // Create a grid of blocks representing the fraction
    for (let i = 0; i < total; i++) {
      blocks.push(
        <div
          key={i}
          className={`h-10 border border-foreground/20 rounded-sm transition-all duration-300 ${
            i < filled ? (isNegative ? 'bg-red-400/70 dark:bg-red-600/70' : 'bg-primary/70') : 'bg-background/40'
          }`}
        />
      );
    }

    return (
      <div className="mt-4 mb-6">
        <div className="text-sm text-center text-foreground/70 mb-2">
          {isNegative ? 'Negative ' : ''}Fraction Visualization ({Math.abs(num)}/{Math.abs(den)})
        </div>
        <div className="grid grid-cols-10 gap-1">
          {blocks}
        </div>
      </div>
    );
  };

  // Function to render the fraction
  const renderFraction = (num: number, den: number) => (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold">{num}</div>
      <div className="w-20 h-1 bg-foreground my-2"></div>
      <div className="text-3xl font-bold">{den}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* First Fraction */}
      <Card className="p-6 glassmorphism-card">
        <h3 className="text-xl font-semibold text-center mb-4">First Fraction</h3>
        {renderFraction(numerator, denominator)}
        {denominator !== 0 && renderFractionVisual(numerator, denominator)}
      </Card>

      {/* Operation Symbol */}
      <div className="flex justify-center">
        <div className="text-5xl font-bold glassmorphism-icon">{operation}</div>
      </div>

      {/* Second Fraction */}
      <Card className="p-6 glassmorphism-card">
        <h3 className="text-xl font-semibold text-center mb-4">Second Fraction</h3>
        {renderFraction(secondNumerator, secondDenominator)}
        {secondDenominator !== 0 && renderFractionVisual(secondNumerator, secondDenominator)}
      </Card>

      {/* Result Section */}
      {result && (
        <>
          <div className="flex justify-center">
            <div className="text-5xl font-bold glassmorphism-icon">=</div>
          </div>

          <Card className="p-6 glassmorphism-card bg-primary/10">
            <h3 className="text-xl font-semibold text-center mb-4">Result</h3>
            {renderFraction(result.numerator, result.denominator)}
            {result.denominator !== 0 && renderFractionVisual(result.numerator, result.denominator)}

            {/* Decimal Approximation */}
            <div className="mt-6 text-center">
              <div className="text-sm text-foreground/70 mb-1">Decimal Approximation</div>
              <div className="text-2xl font-medium">
                {(result.numerator / result.denominator).toFixed(4)}
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default FractionDisplay;
