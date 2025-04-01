'use client';
import { Button } from '@components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

const SimpleErdos = () => {
  const [sequence] = useState([1, -1, -1, 1, 1, -1, -1, 1, 1, -1]);
  const [stepSize, setStepSize] = useState(2);
  const [highlighted, setHighlighted] = useState<number[]>([]);
  const [runningSum, setRunningSum] = useState(0);

  // Shows what happens when we "skip count" by a certain amount
  const showSkipCount = () => {
    // Reset previous highlighting
    setHighlighted([]);
    setRunningSum(0);

    // Calculate new highlighting and sum
    const newHighlights = [];
    let sum = 0;
    let position = stepSize - 1; // Convert to 0-based index

    while (position < sequence.length) {
      newHighlights.push(position);
      sum += sequence[position];
      position += stepSize;
    }

    setHighlighted(newHighlights);
    setRunningSum(sum);
  };

  return (
    <div className="space-y-6 p-4">
      {/* Simple explanation */}
      <div className="text-lg bg-blue-50 p-4 rounded-lg">
        The Erdős discrepancy problem is about finding patterns in sequences of
        +1s and -1s. Let&apos;s skip count through the sequence and see what
        happens to the sum!
      </div>

      {/* The sequence display */}
      <div className="flex flex-wrap gap-2">
        {sequence.map((value, index) => (
          <div
            key={index}
            className={`
              w-12 h-12 flex items-center justify-center rounded-lg
              ${
                highlighted.includes(index)
                  ? 'ring-2 ring-blue-500 transform scale-110'
                  : ''
              }
              ${value === 1 ? 'bg-green-100' : 'bg-red-100'}
              transition-all duration-300
            `}
          >
            {value > 0 ? '+1' : '-1'}
          </div>
        ))}
      </div>

      {/* Simple controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-lg">Skip count by:</div>
          <Button
            variant={stepSize === 2 ? 'default' : 'outline'}
            onClick={() => setStepSize(2)}
          >
            2
          </Button>
          <Button
            variant={stepSize === 3 ? 'default' : 'outline'}
            onClick={() => setStepSize(3)}
          >
            3
          </Button>
          <Button
            variant={stepSize === 4 ? 'default' : 'outline'}
            onClick={() => setStepSize(4)}
          >
            4
          </Button>
        </div>

        <Button onClick={showSkipCount} className="w-40">
          <ChevronRight className="mr-2 h-4 w-4" />
          Skip Count!
        </Button>
      </div>

      {/* Result display */}
      {highlighted.length > 0 && (
        <div className="text-xl bg-green-50 p-4 rounded-lg">
          When we skip count by <strong>{stepSize}</strong>, the sum is{' '}
          <strong>{runningSum}</strong>
          {Math.abs(runningSum) > 2 && " - Look how big it's getting!"}
        </div>
      )}

      {/* Simple explanation of what we're seeing */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="font-semibold">What&apos;s happening?</div>
        <ul className="list-disc list-inside space-y-1">
          <li>We&apos;re taking a sequence of +1s and -1s</li>
          <li>
            We&apos;re &quot;skip counting&quot; through it (like counting by 2s
            or 3s)
          </li>
          <li>We add up all the numbers we land on</li>
          <li>
            Erdős proved that no matter what sequence you choose, you can always
            find a way to skip count that makes this sum really big!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SimpleErdos;
