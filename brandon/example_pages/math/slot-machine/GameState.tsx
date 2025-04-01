'use client';

import React, { createContext, useContext, useCallback, useEffect, useRef } from 'react';
import {
  generateRandomReel,
  calculateSpinResult,
} from './utils';
import {
  useCoreGameState,
  useBettingState,
  useWinState,
  useBonusState,
  useConfigState,
} from './state';
import type { GameStateContextType, StatRecord } from './state/types';

const WIN_DISPLAY_DURATION = 2000;

const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export const GameStateProvider: React.FC<{
  children: React.ReactNode;
  initialBalance?: number;
  minBet?: number;
  maxBet?: number;
}> = ({ children, initialBalance = 1000, minBet = 1, maxBet = 100 }) => {
  const {
    reels, setReels,
    isSpinning, setIsSpinning,
    autoPlay, setAutoPlay,
    spinSpeed, setSpinSpeed,
    balance, setBalance,
    isLoading, setIsLoading,
    totalSpins, setTotalSpins,
    totalWins, setTotalWins,
    totalPayout, setTotalPayout,
    stats, setStats
  } = useCoreGameState();

  const { betAmount, setBetAmount } = useBettingState();
  const {
    showCelebration, setShowCelebration,
    lastWinAmount, setLastWinAmount,
    winningLines, setWinningLines,
    showWinLines, setShowWinLines,
    flashingReels, setFlashingReels,
    winRecords, addWinRecord
  } = useWinState();
  const {
    freeSpins, addFreeSpins,
    setShowBonusGame,
    jackpotAmount, resetJackpot, incrementJackpot
  } = useBonusState();

  // Move useFreeSpins hook call to component level
  const decrementFreeSpins = useBonusState().useFreeSpins;

  const { symbolWeights, payoutMultiplier, freeSpinConfig, setPayoutMultiplier, setGameConfig } = useConfigState();

  const celebrationTimeoutRef = useRef<NodeJS.Timeout>();
  const animationIntervalRef = useRef<NodeJS.Timeout>();

  const handleSpin = useCallback(() => {
    if (balance < betAmount && freeSpins <= 0) {
      setAutoPlay(false);
      return;
    }

    setIsSpinning(true);
    setIsLoading(true);

    // Update total spins
    setTotalSpins((prev: number) => prev + 1);

    if (freeSpins <= 0) {
      setBalance((prev: number) => prev - betAmount);
      incrementJackpot(betAmount);
    } else {
      decrementFreeSpins(); // Use the hook result instead of calling the hook directly
    }

    // Convert symbolWeights object to array
    const weightsArray = Object.values(symbolWeights);
    const newReels = Array(5).fill(0).map(() => generateRandomReel(weightsArray));

    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    animationIntervalRef.current = setInterval(() => {
      setReels(Array(5).fill(0).map(() => generateRandomReel(weightsArray)));
    }, 50);

    const result = calculateSpinResult(
      newReels,
      betAmount,
      payoutMultiplier,
      undefined,
      freeSpinConfig
    );

    const spinTimeout = setTimeout(() => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
        animationIntervalRef.current = undefined;
      }

      setReels(result.symbols);
      setIsSpinning(false);
      setIsLoading(false);

      // Use functional update to ensure we're using the latest balance
      setBalance((prev: number) => prev + result.payout);

      // Update stats
      if (result.win || result.jackpotWon) {
        setTotalWins((prev: number) => prev + 1);
        setTotalPayout((prev: number) => prev + result.payout);

        // Add new stat record
        const newStat: StatRecord = {
          spin: totalSpins + 1,
          balance: balance + result.payout,
          winRate: ((totalWins + 1) / (totalSpins + 1)) * 100,
          expectedValue: ((totalPayout + result.payout) / (totalSpins + 1)) / betAmount,
          totalWins: totalWins + 1,
          totalSpins: totalSpins + 1,
          totalPayout: totalPayout + result.payout
        };
        setStats((prev: StatRecord[]) => [...prev, newStat]);

        setWinningLines(result.linesWon || []);
        setShowWinLines(true);
        setFlashingReels(true);

        addWinRecord({
          symbols: result.symbols,
          amount: result.payout,
          timestamp: new Date(),
          multiplier: result.payout / betAmount,
          linesWon: result.linesWon,
        });
        setLastWinAmount(result.payout);
        setShowCelebration(true);

        if (celebrationTimeoutRef.current) {
          clearTimeout(celebrationTimeoutRef.current);
        }
        celebrationTimeoutRef.current = setTimeout(() => {
          setShowCelebration(false);
          setShowWinLines(false);
          setFlashingReels(false);
        }, WIN_DISPLAY_DURATION);
      } else {
        // Add new stat record for non-winning spin
        const newStat: StatRecord = {
          spin: totalSpins + 1,
          balance: balance - betAmount,
          winRate: (totalWins / (totalSpins + 1)) * 100,
          expectedValue: totalPayout / (totalSpins + 1) / betAmount,
          totalWins,
          totalSpins: totalSpins + 1,
          totalPayout
        };
        setStats((prev: StatRecord[]) => [...prev, newStat]);
      }

      if (result.bonusTriggered) {
        setAutoPlay(false);
        const scatterCount = result.symbols.flat().filter(s => s === 6).length;
        let freeSpinsAwarded = freeSpinConfig.threeScatters;
        if (scatterCount >= 5) {
          freeSpinsAwarded = freeSpinConfig.fiveScatters;
        } else if (scatterCount >= 4) {
          freeSpinsAwarded = freeSpinConfig.fourScatters;
        }
        addFreeSpins(freeSpinsAwarded);
        setShowBonusGame(true);
      }

      if (result.jackpotWon) {
        resetJackpot();
        setAutoPlay(false);
        alert('Jackpot Won!');
      }
    }, spinSpeed);

    return () => {
      clearTimeout(spinTimeout);
    };
  }, [
    balance, betAmount, freeSpins, spinSpeed,
    symbolWeights, payoutMultiplier, freeSpinConfig,
    totalSpins, totalWins, totalPayout,
    decrementFreeSpins, addFreeSpins, addWinRecord, incrementJackpot, resetJackpot,
    setAutoPlay, setBalance, setFlashingReels, setIsLoading, setIsSpinning,
    setLastWinAmount, setReels, setShowBonusGame, setShowCelebration, setShowWinLines,
    setStats, setTotalPayout, setTotalSpins, setTotalWins, setWinningLines
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (autoPlay && !isSpinning && (balance >= betAmount || freeSpins > 0)) {
      interval = setInterval(() => {
        if (!isSpinning) {
          handleSpin();
        }
      }, spinSpeed + 100);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay, isSpinning, balance, betAmount, spinSpeed, freeSpins, handleSpin]);

  useEffect(() => {
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
      if (celebrationTimeoutRef.current) {
        clearTimeout(celebrationTimeoutRef.current);
      }
    };
  }, []);

  const handleReset = useCallback(() => {
    setBalance(initialBalance);
    setBetAmount(minBet);
    setPayoutMultiplier(1.0);
    setAutoPlay(false);
    setIsSpinning(false);
    setIsLoading(false);
    setShowCelebration(false);
    setShowBonusGame(false);
    setLastWinAmount(0);
    setWinningLines([]);
    setShowWinLines(false);
    setFlashingReels(false);
    setTotalSpins(0);
    setTotalWins(0);
    setTotalPayout(0);
    setStats([]);
    resetJackpot();
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }
    if (celebrationTimeoutRef.current) {
      clearTimeout(celebrationTimeoutRef.current);
    }
  }, [
    initialBalance, minBet, resetJackpot, setAutoPlay, setBalance, setBetAmount,
    setFlashingReels, setIsLoading, setIsSpinning, setLastWinAmount,
    setPayoutMultiplier, setShowBonusGame, setShowCelebration, setShowWinLines,
    setStats, setTotalPayout, setTotalSpins, setTotalWins, setWinningLines
  ]);

  // Combine all state for useGameState compatibility
  const value: GameStateContextType = {
    reels,
    isSpinning,
    autoPlay,
    spinSpeed,
    balance,
    isLoading,
    betAmount,
    minBet,
    maxBet,
    initialBalance,
    showCelebration,
    lastWinAmount,
    winningLines,
    showWinLines,
    flashingReels,
    winRecords,
    freeSpins,
    showBonusGame: false,
    jackpotAmount,
    gameConfig: {
      symbolWeights: Object.values(symbolWeights),
      freeSpinConfig,
      volatility: 'medium',
      payoutMultiplier,
    },
    stats,
    totalSpins,
    totalWins,
    totalPayout,
    setReels,
    setIsSpinning,
    setAutoPlay,
    setSpinSpeed,
    setBalance,
    setBetAmount,
    setShowBonusGame,
    setPayoutMultiplier,
    setGameConfig,
    handleSpin,
    handleReset,
    setIsLoading,
    setTotalSpins,
    setTotalWins,
    setTotalPayout,
    setStats,
  };

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  );
};

// Export useGameState hook for backward compatibility
export const useGameState = () => {
  const context = useContext(GameStateContext);
  if (context === undefined) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
};
