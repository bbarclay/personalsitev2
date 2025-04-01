'use client';

import React from 'react';
import { ReelColumn } from './Reel';
import { WinLines } from './WinLines';
import { useGameState } from './GameState';
import { Celebration } from './Celebration';
import { BonusGame } from './BonusGame';

export const GameDisplay: React.FC = () => {
  const {
    reels,
    isSpinning,
    balance,
    betAmount,
    freeSpins,
    jackpotAmount,
    showCelebration,
    lastWinAmount,
    showBonusGame,
    setShowBonusGame,
    winRecords,
  } = useGameState();

  return (
    <div className="relative bg-gray-900 p-6 rounded-xl shadow-inner">
      {showCelebration && <Celebration lastWinAmount={lastWinAmount} />}
      {showBonusGame && (
        <BonusGame
          freeSpins={freeSpins}
          onClose={() => setShowBonusGame(false)}
        />
      )}
      
      <div className="flex gap-6">
        <div className="flex-grow">
          <div className="relative">
            <div className="flex justify-center space-x-4 mb-6">
              {reels.map((column, colIndex) => (
                <ReelColumn
                  key={colIndex}
                  column={column}
                  colIndex={colIndex}
                  isSpinning={isSpinning}
                />
              ))}
            </div>
            <WinLines />
          </div>

          <div className="grid grid-cols-4 gap-4 text-white mt-6">
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm">Balance</p>
              <p className="text-xl font-bold">${balance.toFixed(2)}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm">Bet Amount</p>
              <p className="text-xl font-bold">${betAmount}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm">Free Spins</p>
              <p className="text-xl font-bold">{freeSpins}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-sm">Jackpot</p>
              <p className="text-xl font-bold">${jackpotAmount.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Win Stats Panel */}
        <div className="w-64 bg-gray-800 p-4 rounded-lg text-white">
          <h3 className="text-lg font-bold mb-4">Recent Wins</h3>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {winRecords.map((record, index) => (
              <div key={record.id || index} className="bg-gray-700 p-3 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-green-400 font-bold">
                    ${record.amount.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400">
                    {record.linesWon.length} lines
                  </span>
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  {new Date(record.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {winRecords.length === 0 && (
              <div className="text-gray-500 text-center">
                No wins yet. Start spinning!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
