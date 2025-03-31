import React, { useState } from 'react';

export default function SolverPanel() {
  const [number, setNumber] = useState('');
  const [sequence, setSequence] = useState<number[]>([]);
  const [steps, setSteps] = useState(0);

  const calculateCollatz = (n: number) => {
    const seq = [n];
    let current = n;
    let step = 0;
    
    while (current !== 1 && step < 1000) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      seq.push(current);
      step++;
    }
    
    setSequence(seq);
    setSteps(step);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(number);
    if (!isNaN(num) && num > 0) {
      calculateCollatz(num);
    }
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Collatz Conjecture Calculator</h2>
        <p>
          Enter a positive integer to see the Collatz sequence and the number of steps to reach 1.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Starting Number
          </label>
          <div className="mt-1">
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
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate
        </button>
      </form>

      {sequence.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Results</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Starting with {sequence[0]}, it takes <span className="font-bold">{steps}</span> steps to reach 1.
          </p>
          <div className="mt-4 max-h-60 overflow-y-auto">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sequence:</p>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              {sequence.join(' → ')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 