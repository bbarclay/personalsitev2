'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@components/ui/table';
import { Info, Play, Pause, RefreshCw, Plus, Minus } from 'lucide-react';
import { Alert, AlertDescription } from '@components/ui/alert';

// Define types
type Sequence = Array<1 | -1>;

const EnhancedErdos: React.FC = () => {
  const [sequence, setSequence] = useState<Sequence>([1, -1, 1, 1, -1, 1, -1, 1, 1, -1]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentN, setCurrentN] = useState<number>(2);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // Animation effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isAnimating) {
      intervalId = setInterval(() => {
        setCurrentN(n => (n >= 6 ? 2 : n + 1));
        takeEveryNth(currentN);
      }, 1500);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAnimating, currentN]);

  const takeEveryNth = (n: number): void => {
    const indices: number[] = [];
    let currentSum = 0;

    for (let i = n - 1; i < sequence.length; i += n) {
      indices.push(i);
      currentSum += sequence[i];
    }

    setActiveIndices(indices);
    setSum(currentSum);
  };

  const toggleNumber = (index: number): void => {
    const newSequence = [...sequence];
    newSequence[index] *= -1 as 1 | -1;
    setSequence(newSequence as Sequence);
    if (activeIndices.length > 0) {
      takeEveryNth(currentN);
    }
  };

  const addNumber = (): void => {
    if (sequence.length < 15) {
      setSequence([...sequence, Math.random() < 0.5 ? -1 : 1]);
    }
  };

  const removeNumber = (): void => {
    if (sequence.length > 4) {
      setSequence(sequence.slice(0, -1));
      takeEveryNth(currentN);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-gradient-to-br from-purple-900 via-gray-900 to-purple-950 text-white rounded-lg shadow-xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Erdős Sequence Explorer
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-purple-800/50"
          onClick={() => setShowInfo(!showInfo)}
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      {showInfo && (
        <Alert className="bg-purple-800/30 border-purple-500">
          <AlertDescription className="text-purple-100">
            Erdős proved that for any sequence of +1s and -1s, there's always a way to select numbers
            that sum to a surprisingly large value. Try different patterns and see for yourself!
          </AlertDescription>
        </Alert>
      )}

      {/* Sequence Display */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-purple-300">Your Sequence:</span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={addNumber}
              className="bg-purple-800/30 hover:bg-purple-700/50 border-purple-500"
              disabled={sequence.length >= 15}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={removeNumber}
              className="bg-purple-800/30 hover:bg-purple-700/50 border-purple-500"
              disabled={sequence.length <= 4}
            >
              <Minus className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {sequence.map((num, idx) => (
            <button
              key={idx}
              onClick={() => toggleNumber(idx)}
              className={`
                w-12 h-12
                flex items-center justify-center
                text-lg font-bold
                rounded-lg
                transition-all duration-300
                ${num === 1 ? 'bg-purple-500/20' : 'bg-pink-500/20'}
                ${num === 1 ? 'hover:bg-purple-500/30' : 'hover:bg-pink-500/30'}
                ${activeIndices.includes(idx)
                  ? 'ring-2 ring-purple-400 scale-110 shadow-lg shadow-purple-500/50'
                  : ''
                }
              `}
            >
              {num === 1 ? '+1' : '-1'}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-purple-300">Select every:</span>
          <Button
            variant="outline"
            className="bg-purple-800/30 hover:bg-purple-700/50 border-purple-500"
            onClick={() => setIsAnimating(!isAnimating)}
          >
            {isAnimating ? (
              <><Pause className="h-4 w-4 mr-2" /> Stop Animation</>
            ) : (
              <><Play className="h-4 w-4 mr-2" /> Auto-play</>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {[2, 3, 4, 5, 6].map(n => (
            <Button
              key={n}
              onClick={() => {
                setCurrentN(n);
                takeEveryNth(n);
              }}
              variant="outline"
              className={`
                bg-purple-800/30 hover:bg-purple-700/50 border-purple-500
                ${currentN === n ? 'ring-2 ring-purple-400' : ''}
              `}
            >
              {n}th
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      {activeIndices.length > 0 && (
        <div className="space-y-4">
          <div className="bg-purple-800/30 p-4 rounded-lg border border-purple-500">
            <div className="text-xl font-semibold text-purple-200">
              Sum: {sum}
            </div>
            <div className="text-sm text-purple-300">
              Taking every {currentN}th number
            </div>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="text-purple-300">Position</TableCell>
                <TableCell className="text-purple-300">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activeIndices.map(idx => (
                <TableRow key={idx}>
                  <TableCell className="text-purple-200">{idx + 1}</TableCell>
                  <TableCell className="text-purple-200">{sequence[idx]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Key Insight */}
      <div className="bg-purple-800/30 p-6 rounded-lg border border-purple-500">
        <h3 className="text-xl font-semibold mb-2 text-purple-200">
          The Erdős Insight
        </h3>
        <p className="text-purple-300 leading-relaxed">
          No matter how you arrange +1s and -1s in a sequence, there will always
          be some way to select numbers (by taking every nth number) that adds up
          to a surprisingly large sum!
        </p>
      </div>
    </div>
  );
};

export default EnhancedErdos;
