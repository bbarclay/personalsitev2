"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function SolverPanel() {
  const [number, setNumber] = useState('27');
  const [sequence, setSequence] = useState<number[]>([]);
  const [steps, setSteps] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [statistics, setStatistics] = useState<{
    evenCount: number;
    oddCount: number;
    increasingSteps: number;
    decreasingSteps: number;
    maxConsecutiveDecreasing: number;
  }>({
    evenCount: 0,
    oddCount: 0,
    increasingSteps: 0,
    decreasingSteps: 0,
    maxConsecutiveDecreasing: 0
  });
  
  // Canvas references for different visualizations
  const trajectoryCanvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapCanvasRef = useRef<HTMLCanvasElement>(null);
  
  const calculateStatistics = (seq: number[]) => {
    let evenCount = 0;
    let oddCount = 0;
    let increasingSteps = 0;
    let decreasingSteps = 0;
    let currentConsecutiveDecreasing = 0;
    let maxConsecutiveDecreasing = 0;
    
    for (let i = 0; i < seq.length; i++) {
      // Count even/odd numbers
      if (seq[i] % 2 === 0) {
        evenCount++;
      } else {
        oddCount++;
      }
      
      // Count increasing/decreasing steps
      if (i > 0) {
        if (seq[i] > seq[i-1]) {
          increasingSteps++;
          currentConsecutiveDecreasing = 0;
        } else if (seq[i] < seq[i-1]) {
          decreasingSteps++;
          currentConsecutiveDecreasing++;
          maxConsecutiveDecreasing = Math.max(maxConsecutiveDecreasing, currentConsecutiveDecreasing);
        }
      }
    }
    
    setStatistics({
      evenCount,
      oddCount,
      increasingSteps,
      decreasingSteps,
      maxConsecutiveDecreasing
    });
  };

  const calculateCollatz = (n: number) => {
    const seq = [n];
    let current = n;
    let step = 0;
    let maxVal = n;
    
    while (current !== 1 && step < 1000) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      seq.push(current);
      maxVal = Math.max(maxVal, current);
      step++;
    }
    
    setSequence(seq);
    setSteps(step);
    setMaxValue(maxVal);
    calculateStatistics(seq);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(number);
    if (!isNaN(num) && num > 0) {
      calculateCollatz(num);
    }
  };
  
  // Draw the trajectory visualization
  const drawTrajectoryVisualization = () => {
    const canvas = trajectoryCanvasRef.current;
    if (!canvas || sequence.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up scaling - log scale for better visibility of patterns
    const useLogScale = maxValue > 100;
    
    // Function to map sequence values to y coordinates
    const mapY = (val: number) => {
      const minY = 0;
      const maxY = useLogScale ? Math.log10(maxValue + 1) : maxValue;
      const scaledVal = useLogScale ? Math.log10(val) : val;
      
      return height - padding - ((scaledVal - minY) / (maxY - minY)) * (height - 2 * padding);
    };
    
    // Map x-coordinates (steps) to canvas width
    const stepWidth = (width - 2 * padding) / Math.max(1, sequence.length - 1);
    
    // Draw grid and axes
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;
    
    // Draw x-axis (step number)
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();
    
    // Draw y-axis (value)
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();
    
    // Draw horizontal grid lines and labels for y-axis
    const yGridLines = 5;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#666';
    
    for (let i = 0; i <= yGridLines; i++) {
      const y = padding + i * (height - 2 * padding) / yGridLines;
      const value = useLogScale 
        ? Math.round(Math.pow(10, Math.log10(maxValue + 1) * (1 - i / yGridLines)))
        : Math.round(maxValue * (1 - i / yGridLines));
      
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
      
      ctx.fillText(String(value), padding - 5, y + 4);
    }
    
    // Draw vertical grid lines and labels for x-axis
    const xGridLines = Math.min(10, sequence.length);
    ctx.textAlign = 'center';
    
    for (let i = 0; i <= xGridLines; i++) {
      const x = padding + i * (width - 2 * padding) / xGridLines;
      const step = Math.floor(i * (sequence.length - 1) / xGridLines);
      
      ctx.beginPath();
      ctx.moveTo(x, height - padding);
      ctx.lineTo(x, padding);
      ctx.stroke();
      
      ctx.fillText(String(step), x, height - padding + 15);
    }
    
    // Draw axis labels
    ctx.font = '12px Arial';
    ctx.fillText('Step', width / 2, height - 10);
    
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText(useLogScale ? 'Value (log scale)' : 'Value', 0, 0);
    ctx.restore();
    
    // Draw the sequence line
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    for (let i = 0; i < sequence.length; i++) {
      const x = padding + i * stepWidth;
      const y = mapY(sequence[i]);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw the points with different colors for even/odd
    for (let i = 0; i < sequence.length; i++) {
      const x = padding + i * stepWidth;
      const y = mapY(sequence[i]);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      
      // Color points differently based on even/odd
      if (sequence[i] % 2 === 0) {
        ctx.fillStyle = '#34d399'; // green for even
      } else {
        ctx.fillStyle = '#f87171'; // red for odd
      }
      
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Add annotations for max value
    const maxIndex = sequence.indexOf(maxValue);
    if (maxIndex !== -1) {
      const maxX = padding + maxIndex * stepWidth;
      const maxY = mapY(maxValue);
      
      ctx.beginPath();
      ctx.arc(maxX, maxY, 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(250, 204, 21, 0.7)';
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw label for max value
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Max: ${maxValue}`, maxX + 10, maxY - 10);
    }
  };
  
  // Draw the heatmap visualization showing stopping times
  const drawHeatmapVisualization = () => {
    const canvas = heatmapCanvasRef.current;
    if (!canvas || sequence.length === 0) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Calculate stopping times for nearby numbers
    const range = 50; // How many numbers to display on each side
    const startNum = Math.max(1, parseInt(number) - range);
    const stoppingTimes: number[] = [];
    let maxStoppingTime = 0;
    
    for (let i = 0; i < range * 2; i++) {
      const num = startNum + i;
      const steps = calculateStoppingTime(num);
      stoppingTimes.push(steps);
      maxStoppingTime = Math.max(maxStoppingTime, steps);
    }
    
    // Draw the heatmap
    const barWidth = (width - 2 * padding) / stoppingTimes.length;
    
    for (let i = 0; i < stoppingTimes.length; i++) {
      const x = padding + i * barWidth;
      const barHeight = ((stoppingTimes[i] / maxStoppingTime) * (height - 2 * padding));
      
      // Color gradient based on stopping time
      const colorIntensity = Math.min(1, stoppingTimes[i] / (maxStoppingTime * 0.7));
      const r = Math.floor(255 * colorIntensity);
      const g = Math.floor(50 + 100 * (1 - colorIntensity));
      const b = Math.floor(255 * (1 - colorIntensity));
      
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      
      // Highlight the current number
      if (startNum + i === parseInt(number)) {
        ctx.fillStyle = '#fbbf24';
      }
      
      // Draw the bar
      ctx.fillRect(x, height - padding - barHeight, barWidth, barHeight);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(x, height - padding - barHeight, barWidth, barHeight);
    }
    
    // Draw x-axis labels
    ctx.fillStyle = '#666';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    
    // Show some labels on x-axis
    const labelStep = Math.max(1, Math.floor(stoppingTimes.length / 10));
    for (let i = 0; i < stoppingTimes.length; i += labelStep) {
      const x = padding + i * barWidth + barWidth / 2;
      ctx.fillText(String(startNum + i), x, height - 5);
    }
    
    // Draw title
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Stopping Times for Nearby Numbers', width / 2, padding / 2);
  };
  
  // Helper function to calculate stopping time for a number
  const calculateStoppingTime = (n: number): number => {
    let current = n;
    let steps = 0;
    
    while (current !== 1 && steps < 1000) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;
    }
    
    return steps;
  };
  
  // Update visualizations when sequence changes
  useEffect(() => {
    if (sequence.length > 0) {
      drawTrajectoryVisualization();
      drawHeatmapVisualization();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequence]);

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Collatz Conjecture Explorer</h2>
        <p>
          The Collatz conjecture states that any positive integer will eventually reach 1 
          when following this rule: if the number is even, divide by 2; if odd, multiply by 3 and add 1.
          Enter a positive integer to visualize its journey to 1.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Starting Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="number"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="Enter a positive integer"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="1"
                    step="1"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const random = Math.floor(Math.random() * 999) + 2;
                    setNumber(String(random));
                    calculateCollatz(random);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:bg-gray-600"
                >
                  Random
                </button>
              </div>
            </form>
            
            {sequence.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300 mb-2">Results</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      <div className="font-medium">Starting number:</div>
                      <div className="text-2xl font-bold">{sequence[0]}</div>
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      <div className="font-medium">Steps to reach 1:</div>
                      <div className="text-2xl font-bold">{steps}</div>
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      <div className="font-medium">Maximum value:</div>
                      <div className="text-xl font-bold">{maxValue.toLocaleString()}</div>
                    </div>
                    <div className="text-sm text-blue-700 dark:text-blue-400">
                      <div className="font-medium">Final sequence length:</div>
                      <div className="text-xl font-bold">{sequence.length}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Sequence Analysis</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                      <span>Even numbers: {statistics.evenCount}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-red-400 mr-2"></span>
                      <span>Odd numbers: {statistics.oddCount}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2"></span>
                      <span>Increasing steps: {statistics.increasingSteps}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 rounded-full bg-purple-400 mr-2"></span>
                      <span>Decreasing steps: {statistics.decreasingSteps}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 max-h-40 overflow-y-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                  <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Full Sequence:</p>
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-mono break-all">
                    {sequence.join(' → ')}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Trajectory Visualization</h3>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <canvas
                  ref={trajectoryCanvasRef}
                  width={800}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-green-400 rounded-full inline-block mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">Even numbers</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-400 rounded-full inline-block mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">Odd numbers</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-yellow-400 rounded-full inline-block mr-2"></span>
                  <span className="text-gray-700 dark:text-gray-300">Maximum value</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Stopping Times of Nearby Numbers</h3>
              <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <canvas
                  ref={heatmapCanvasRef}
                  width={800}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                This graph shows the number of steps required for nearby numbers to reach 1. 
                Yellow indicates your selected number.
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 border border-blue-100 dark:border-blue-800">
              <h3 className="text-md font-medium text-blue-800 dark:text-blue-300 mb-2">About the Collatz Conjecture</h3>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Despite its simple rules, the Collatz conjecture remains unproven after over 80 years.
                Some numbers climb to extreme heights before eventually reaching 1. For example,
                starting with 27 reaches a maximum of 9,232 before descending to 1 after 111 steps.
                The conjecture has been verified for all starting values up to 2^68 (approximately 295 trillion).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 