'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useGameState } from './GameState';

export const Controls: React.FC = () => {
  const {
    betAmount,
    setBetAmount,
    spinSpeed,
    setSpinSpeed,
    gameConfig,
    setPayoutMultiplier,
    isSpinning,
    autoPlay,
    balance,
    freeSpins,
    minBet,
    maxBet,
    isLoading,
    handleSpin,
    handleReset,
    setAutoPlay
  } = useGameState();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Bet Amount Control */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Bet Amount</label>
          <Slider
            value={[betAmount]}
            min={minBet}
            max={maxBet}
            step={1}
            onValueChange={(value) => setBetAmount(value[0])}
            disabled={isSpinning}
          />
          <div className="text-center">${betAmount}</div>
        </div>

        {/* Spin Speed Control */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Spin Speed (ms)</label>
          <Slider
            value={[spinSpeed]}
            min={100}
            max={2000}
            step={100}
            onValueChange={(value) => setSpinSpeed(value[0])}
            disabled={isSpinning}
          />
          <div className="text-center">{spinSpeed}ms</div>
        </div>

        {/* Payout Multiplier Control */}
        <div className="space-y-2">
          <label className="text-sm text-gray-500">Payout Multiplier</label>
          <Slider
            value={[gameConfig.payoutMultiplier]}
            min={0.1}
            max={5.0}
            step={0.1}
            onValueChange={(value) => setPayoutMultiplier(value[0])}
            disabled={isSpinning}
          />
          <div className="text-center">{gameConfig.payoutMultiplier}x</div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleSpin}
            disabled={
              isSpinning ||
              (balance < betAmount && freeSpins <= 0) ||
              isLoading
            }
          >
            {isSpinning ? 'Spinning...' : freeSpins > 0 ? 'Free Spin!' : 'Spin'}
          </Button>
          <Button
            className="w-full"
            onClick={() => setAutoPlay(!autoPlay)}
            disabled={balance < betAmount && freeSpins <= 0}
            variant={autoPlay ? 'destructive' : 'outline'}
          >
            {autoPlay ? 'Stop Auto' : 'Auto Play'}
          </Button>
          <Button
            className="w-full"
            onClick={handleReset}
            variant="outline"
            disabled={isSpinning}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
