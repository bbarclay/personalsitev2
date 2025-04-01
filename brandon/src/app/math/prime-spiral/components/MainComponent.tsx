import React, { useState } from 'react';

type ViewMode = 'prime' | 'twinPrime' | 'primeDiff';

const PrimeSpiral = () => {
  const [size] = useState(15); // Grid size (odd number)
  const [viewMode, setViewMode] = useState<ViewMode>('prime'); // prime, twinPrime, primeDiff
  const [highlightDiagonals, setHighlightDiagonals] = useState(false);

  // Function to check if a number is prime
  const isPrime = (num: number) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  // Generate spiral coordinates for each number
  const generateSpiral = () => {
    const grid: number[][] = [];
    const total = size * size;
    const center = Math.floor(size / 2);

    // Initialize grid with empty cells
    for (let y = 0; y < size; y++) {
      grid[y] = [];
      for (let x = 0; x < size; x++) {
        grid[y][x] = 0;
      }
    }

    let x = center;
    let y = center;
    let dx = 1;
    let dy = 0;
    let segment = 1;
    let segmentPassed = 0;
    let value = 1;

    while (value <= total) {
      grid[y][x] = value;

      // Move to next position
      x += dx;
      y += dy;
      segmentPassed++;

      // Check if we need to turn
      if (segmentPassed === segment) {
        segmentPassed = 0;
        // Rotate 90 degrees
        [dx, dy] = [-dy, dx];
        // Increase segment length every second turn
        if (dy === 0) segment++;
      }

      value++;
    }

    return grid;
  };

  // Get cell color based on number properties and view mode
  const getCellColor = (num: number): string => {
    if (num === 0) return 'bg-gray-100';

    switch (viewMode) {
      case 'prime':
        return isPrime(num) ? 'bg-blue-500' : 'bg-gray-100';
      case 'twinPrime':
        return (isPrime(num) && (isPrime(num - 2) || isPrime(num + 2)))
          ? 'bg-green-500'
          : (isPrime(num) ? 'bg-blue-200' : 'bg-gray-100');
      case 'primeDiff':
        return isPrime(num)
          ? `bg-blue-${Math.min(900, Math.floor((nextPrimeDiff(num) / 10) * 100))}`
          : 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  // Find difference to next prime number
  const nextPrimeDiff = (num: number) => {
    let next = num + 1;
    while (!isPrime(next)) next++;
    return next - num;
  };

  // Generate spiral grid
  const grid: number[][] = generateSpiral();

  return (
    <div className="w-full p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Prime Number Spiral Explorer</h2>
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setViewMode('prime')}
            className={`px-4 py-2 rounded ${viewMode === 'prime' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Prime Numbers
          </button>
          <button
            onClick={() => setViewMode('twinPrime')}
            className={`px-4 py-2 rounded ${viewMode === 'twinPrime' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Twin Primes
          </button>
          <button
            onClick={() => setViewMode('primeDiff')}
            className={`px-4 py-2 rounded ${viewMode === 'primeDiff' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Prime Gaps
          </button>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={highlightDiagonals}
            onChange={(e) => setHighlightDiagonals(e.target.checked)}
          />
          <label>Highlight Diagonals</label>
        </div>
      </div>

      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}>
        {grid.map((row, y) => (
          row.map((value, x) => {
            const isDiagonal = highlightDiagonals && (x === y || x === (size - 1 - y));
            return (
              <div
                key={`${x}-${y}`}
                className={`aspect-w-1 aspect-h-1 flex items-center justify-center text-xs
                  ${getCellColor(value)} ${isDiagonal ? 'border-2 border-red-500' : ''}`}
              >
                {value}
              </div>
            );
          })
        ))}
      </div>

      <div className="mt-4 text-sm">
        <h3 className="font-bold mb-2">Observations:</h3>
        <ul className="list-disc pl-5">
          <li>Look for diagonal patterns (toggle highlight to see main diagonals)</li>
          <li>Notice how twin primes appear in pairs</li>
          <li>Observe how prime gaps (distances between primes) grow</li>
        </ul>
      </div>
    </div>
  );
};

export default PrimeSpiral;
