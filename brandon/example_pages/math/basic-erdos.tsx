import React, { useState } from 'react';
import { Button } from '@components/ui/button';

const BasicErdos = () => {
  const [sequence] = useState([1, -1, 1, 1, -1, 1, -1, 1, 1, -1]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sum, setSum] = useState(0);

  // Just take every Nth number and add them up
  const takeEveryNth = (n: number) => {
    const indices = [];
    let currentSum = 0;

    // Walk through sequence taking every nth number
    for (let i = n - 1; i < sequence.length; i += n) {
      indices.push(i);
      currentSum += sequence[i];
    }

    setActiveIndices(indices);
    setSum(currentSum);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      {/* Super simple explanation */}
      <div className="text-xl">
        Here&apos;s a sequence of +1s and -1s:
      </div>

      {/* Show the sequence */}
      <div className="flex gap-2">
        {sequence.map((num, idx) => (
          <div
            key={idx}
            className={`
              w-12 h-12
              flex items-center justify-center
              text-lg font-bold
              rounded-lg
              transition-all duration-300
              ${num === 1 ? 'bg-green-100' : 'bg-red-100'}
              ${activeIndices.includes(idx) ? 'ring-4 ring-blue-500 scale-110' : ''}
            `}
          >
            {num === 1 ? '+1' : '-1'}
          </div>
        ))}
      </div>

      {/* Simple buttons */}
      <div className="space-y-4">
        <div>Let&apos;s take every:</div>
        <div className="flex gap-4">
          <Button onClick={() => takeEveryNth(2)} variant="outline">
            2nd number
          </Button>
          <Button onClick={() => takeEveryNth(3)} variant="outline">
            3rd number
          </Button>
          <Button onClick={() => takeEveryNth(4)} variant="outline">
            4th number
          </Button>
        </div>
      </div>

      {/* Show result */}
      {activeIndices.length > 0 && (
        <div className="text-xl bg-blue-50 p-4 rounded-lg">
          If we add up these numbers: {sum}
        </div>
      )}

      {/* Key insight */}
      <div className="bg-yellow-50 p-4 rounded-lg text-lg">
        The amazing thing Erdős asked: <br />
        No matter what sequence of +1s and -1s you make, <br />
        there will ALWAYS be some way to jump through it <br />
        that makes the sum really big!
      </div>
    </div>
  );
};

export default BasicErdos;
