import React from 'react';
import { Card } from '@components/ui/card';

interface PatternDisplayProps {
  pattern: number[];
  patternType: string;
}

const PatternDisplay: React.FC<PatternDisplayProps> = ({
  pattern,
  patternType,
}) => {
  // Ensure pattern is always an array
  const safePattern = Array.isArray(pattern) ? pattern : [];

  if (!safePattern.length) {
    return (
      <div className="flex items-center justify-center h-[400px] p-6">
        <p className="text-foreground/60 text-lg">
          Generate a pattern to see it displayed here
        </p>
      </div>
    );
  }

  // Create bar chart visualization
  const max = Math.max(...safePattern);
  const min = Math.min(...safePattern);
  const range = max - min;

  // Get color based on pattern type
  const getPatternColor = () => {
    switch (patternType) {
      case 'arithmetic': return 'bg-blue-500 dark:bg-blue-600';
      case 'geometric': return 'bg-purple-500 dark:bg-purple-600';
      case 'fibonacci': return 'bg-amber-500 dark:bg-amber-600';
      case 'square': return 'bg-emerald-500 dark:bg-emerald-600';
      case 'triangular': return 'bg-pink-500 dark:bg-pink-600';
      default: return 'bg-primary';
    }
  };

  // Get a simple explanation of the pattern
  const getPatternExplanation = () => {
    if (safePattern.length < 2) return 'Not enough terms to determine pattern.';

    switch (patternType) {
      case 'arithmetic':
        return `This is an arithmetic sequence with common difference ${safePattern[1] - safePattern[0]}. Each term differs from the previous by this constant value.`;
      case 'geometric':
        return `This is a geometric sequence with common ratio ${(safePattern[1] / safePattern[0]).toFixed(2)}. Each term is multiplied by this constant to get the next term.`;
      case 'fibonacci':
        return 'This is a Fibonacci-like sequence where each term is the sum of the two preceding terms. This pattern appears throughout nature and mathematics.';
      case 'square':
        return 'These are square numbers, formed by squaring each position number (1², 2², 3², ...). They represent the area of squares with integer sides.';
      case 'triangular':
        return 'These are triangular numbers, representing the sum of consecutive integers starting from 1. They can be visualized as dots arranged in a triangle.';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Pattern Visualization</h3>

      {/* Pattern sequence display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {safePattern.map((num, index) => (
          <Card key={index} className="p-4 text-center glassmorphism-card hover:shadow-lg transition-all">
            <div className="text-sm text-foreground/60 mb-1">Term {index + 1}</div>
            <div className="text-2xl font-bold">{num}</div>
            {patternType === 'square' && (
              <div className="mt-2 text-xs text-foreground/60">{Math.sqrt(num)}²</div>
            )}
          </Card>
        ))}
      </div>

      {/* Bar chart visualization - FIXED VERSION */}
      <Card className="p-6 glassmorphism-card">
        <h4 className="text-lg font-medium mb-4">Visual Representation</h4>
        <div className="relative flex items-end h-[200px] gap-2 border-b border-l border-foreground/20 pt-8 pb-2 px-2">
          {/* Y-axis label */}
          <div className="absolute -left-6 top-1/2 -rotate-90 text-xs text-foreground/60">Value</div>

          {/* X-axis label */}
          <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 text-xs text-foreground/60">Term Position</div>

          {safePattern.map((num, index) => {
            // Add a small minimum height to ensure visibility of very small values
            const height = range === 0 ? 90 : Math.max(10, ((num - min) / range) * 180);

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end group"
              >
                <div
                  className={`w-full ${getPatternColor()} rounded-t-md opacity-90 hover:opacity-100 transition-all duration-300 ease-in-out shadow-md`}
                  style={{ height: `${height}px`, minHeight: '10px' }}
                >
                  <div className="invisible group-hover:visible absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground/10 backdrop-blur-md text-foreground rounded text-xs whitespace-nowrap px-2 py-1 transition-all duration-300">
                    {num}
                  </div>
                </div>
                <div className="mt-2 text-xs text-foreground/60">{index + 1}</div>
              </div>
            );
          })}
        </div>

        {/* Pattern growth visualization */}
        <div className="mt-6 pt-4 border-t border-foreground/10">
          <div className="text-sm text-foreground/80 mb-2">Pattern Growth</div>
          <div className="flex gap-1 h-6 items-center">
            {safePattern.length > 1 ? (
              Array.from({ length: safePattern.length - 1 }).map((_, index) => {
                const num = safePattern[index + 1];
                const prevNum = safePattern[index];
                const growth = num - prevNum;
                const isPositive = growth >= 0;

                return (
                  <div key={index} className="flex items-center text-xs">
                    <span className={isPositive ? "text-green-500" : "text-red-500"}>
                      {isPositive ? "+" : ""}{growth}
                    </span>
                    {index < safePattern.length - 2 && <span className="mx-1">→</span>}
                  </div>
                );
              })
            ) : (
              <span className="text-xs text-foreground/60">Not enough terms to show growth</span>
            )}
          </div>
        </div>
      </Card>

      {/* Pattern formula */}
      <Card className="p-6 glassmorphism-card">
        <h4 className="text-lg font-medium mb-2">Pattern Rule</h4>
        <p className="text-foreground/80">
          {getPatternExplanation()}
        </p>
        <div className="mt-4 p-3 bg-foreground/5 rounded-md font-mono text-sm">
          {patternType === 'arithmetic' && safePattern.length > 1 && (
            <span>a<sub>n</sub> = a<sub>1</sub> + (n-1)d = {safePattern[0]} + (n-1) × {safePattern[1] - safePattern[0]}</span>
          )}
          {patternType === 'geometric' && safePattern.length > 1 && (
            <span>a<sub>n</sub> = a<sub>1</sub> × r<sup>n-1</sup> = {safePattern[0]} × ({(safePattern[1] / safePattern[0]).toFixed(2)})<sup>n-1</sup></span>
          )}
          {patternType === 'fibonacci' && (
            <span>a<sub>n</sub> = a<sub>n-1</sub> + a<sub>n-2</sub> where a<sub>1</sub> = {safePattern[0]}, a<sub>2</sub> = {safePattern[1] || safePattern[0]}</span>
          )}
          {patternType === 'square' && (
            <span>a<sub>n</sub> = n² = {safePattern.map((n, i) => `${i+1}² = ${n}`).slice(0, Math.min(5, safePattern.length)).join(', ')}{safePattern.length > 5 ? '...' : ''}</span>
          )}
          {patternType === 'triangular' && (
            <span>a<sub>n</sub> = n(n+1)/2 = {safePattern.map((n, i) => `${i+1}(${i+2})/2 = ${n}`).slice(0, Math.min(3, safePattern.length)).join(', ')}{safePattern.length > 3 ? '...' : ''}</span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PatternDisplay;
