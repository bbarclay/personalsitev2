import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

const PrimeVisualization = () => {
  const [range, setRange] = useState(100);
  const [primes, setPrimes] = useState<number[]>([]);
  const [hoveredNumber, setHoveredNumber] = useState<number | null>(null);

  const isPrime = (num: number) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  useEffect(() => {
    const calculatePrimes = () => {
      const newPrimes = [];
      for (let i = 2; i <= range; i++) {
        if (isPrime(i)) {
          newPrimes.push(i);
        }
      }
      setPrimes(newPrimes);
    };

    calculatePrimes();
  }, [range]);

  const getColorForNumber = (num: number) => {
    if (!isPrime(num)) return 'bg-gray-100';
    return `bg-blue-500`;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Prime Numbers Visualization (1-{range})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Slider
            value={[range]}
            onValueChange={(values) => setRange(values[0])}
            min={10}
            max={200}
            step={10}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-10 gap-1">
          {[...Array(range)].map((_, i) => {
            const number = i + 1;
            return (
              <div
                key={number}
                className={`aspect-square flex items-center justify-center text-sm
                  ${getColorForNumber(number)}
                  ${isPrime(number) ? 'text-white font-bold' : 'text-gray-600'}
                  cursor-pointer transition-all duration-200 hover:scale-110`}
                onMouseEnter={() => setHoveredNumber(number)}
                onMouseLeave={() => setHoveredNumber(null)}
              >
                {number}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-center">
          {hoveredNumber && (
            <p className="text-lg">
              {hoveredNumber} is {isPrime(hoveredNumber) ?
                <span className="font-bold text-blue-500">prime</span> :
                <span className="text-gray-500">not prime</span>
              }
            </p>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Prime Numbers Found:</h3>
          <div className="flex flex-wrap gap-2">
            {primes.map((prime) => (
              <span key={prime} className="px-2 py-1 bg-blue-100 text-blue-800 rounded">
                {prime}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrimeVisualization;
