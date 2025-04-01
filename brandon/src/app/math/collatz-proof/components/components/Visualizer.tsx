'use client';

import React, { useEffect, useState } from 'react';
import { MAX_CIRCLES } from '../constants';

interface VisualizerProps {
  sequence: number[];
  currentStep: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({ sequence, currentStep }) => {
  const [tauValues, setTauValues] = useState<number[]>([]);

  // Generate tau values based on the current number in the sequence
  useEffect(() => {
    if (sequence.length === 0) return;

    const currentNumber = sequence[currentStep];
    // Generate tau values based on current number's binary representation
    const tauValues = generateTauValuesFromNumber(currentNumber);
    setTauValues(tauValues);
  }, [sequence, currentStep]);

  // Generate tau values that visualize properties of the current number
  const generateTauValuesFromNumber = (num: number): number[] => {
    if (!num) return Array(MAX_CIRCLES).fill(1);

    const result: number[] = [];

    // Convert to binary and get digit statistics
    const binaryStr = num.toString(2);
    const numOnes = (binaryStr.match(/1/g) || []).length;
    const numZeros = binaryStr.length - numOnes;

    // Generate tau values that reflect properties of the number
    // 1. Number of trailing zeros indicates tau value
    let trailingZeros = 0;
    for (let i = binaryStr.length - 1; i >= 0; i--) {
      if (binaryStr[i] === '0') trailingZeros++;
      else break;
    }

    // 2. Length of binary representation influences size
    const digitFactor = Math.min(5, Math.ceil(binaryStr.length / 10));

    // 3. Ratio of ones to zeros influences distribution
    const onesRatio = numOnes / binaryStr.length;

    // Generate circles based on these properties
    for (let i = 0; i < MAX_CIRCLES; i++) {
      // Create varied but deterministic pattern
      const position = i / MAX_CIRCLES;
      const baseTau = Math.max(1, Math.min(6,
        // Combine factors with position to create a visually interesting pattern
        Math.round((
          digitFactor * 1.5 +
          (onesRatio * 3) +
          Math.sin(position * Math.PI * 2) * 1.5 +
          (i % 3)
        ) / 2)
      ));

      result.push(baseTau);
    }

    // Ensure we have exactly MAX_CIRCLES values
    return result.slice(0, MAX_CIRCLES);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center gap-3 flex-wrap min-h-[200px] bg-gray-900/50 rounded-lg p-6">
        {tauValues.map((val, idx) => {
          const size = 24 + val * 16;
          // Use different colors based on value
          const getColor = (value: number) => {
            switch (value) {
              case 1: return 'bg-blue-500 border-blue-400';
              case 2: return 'bg-indigo-500 border-indigo-400';
              case 3: return 'bg-purple-500 border-purple-400';
              case 4: return 'bg-pink-500 border-pink-400';
              case 5: return 'bg-red-500 border-red-400';
              case 6: return 'bg-orange-500 border-orange-400';
              default: return 'bg-gray-500 border-gray-400';
            }
          };

          return (
            <div
              key={idx}
              className={`${getColor(val)} rounded-full transition-all duration-500 flex items-center justify-center text-xs text-white font-medium shadow-lg hover:scale-110`}
              style={{ width: size, height: size }}
              title={`τ = ${val}`}
            >
              {val}
            </div>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-400">
        Visualization of tau values at step {currentStep}
        {sequence[currentStep] && <span> (n = {sequence[currentStep]})</span>}
      </div>
    </div>
  );
};
