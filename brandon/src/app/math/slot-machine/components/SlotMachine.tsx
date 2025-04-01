'use client';

import React from 'react';
// import { Card, CardContent } from '@/components/ui/*';
import { Card, CardContent } from '@/components/ui/card';
import { SlotMachineHeader } from './SlotMachineHeader';
import { GameDisplay } from './GameDisplay';
import { Controls } from './Controls';
import { Statistics } from './Statistics';
import { Paytable } from './Paytable';
import { WinLedger } from './WinLedger';
import { PayoutControl } from './PayoutControl';
import { GameStateProvider, useGameState } from './GameState';
import { withErrorBoundary } from './ErrorBoundary';
import type { SlotMachineProps, WinRecord } from './types';

const SlotMachineContent: React.FC = () => {
  const { winRecords } = useGameState();

  return (
    <div className="flex gap-4 w-full max-w-[1400px] mx-auto p-4">
      {/* Main Content */}
      <div className="flex-grow">
        <Card className="w-full">
          <SlotMachineHeader />
          <CardContent>
            <div className="space-y-8">
              <GameDisplay />
              <Controls />
              <Statistics />
              <Paytable />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Panel */}
      <div className="w-64 flex-shrink-0 space-y-4">
        <div className="sticky top-4">
          <PayoutControl />
          <div className="mt-4">
            <WinLedger winRecords={winRecords.filter((record): record is WinRecord => record.id !== undefined)} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translate3d(0, 100vh, 0) scale(1); opacity: 1; }
          100% { transform: translate3d(0, -100px, 0) scale(0.5); opacity: 0; }
        }
        @keyframes win-pulse {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 0; }
        }
        .animate-float { animation: float linear infinite; }
        .animate-win-pulse { animation: win-pulse 2s ease-out forwards; }
        .animate-spin-slow { animation: spin 1s linear infinite; }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const SlotMachine: React.FC<SlotMachineProps> = ({
  initialBalance = 1000,
  minBet = 1,
  maxBet = 100,
}) => {
  return (
    <GameStateProvider
      initialBalance={initialBalance}
      minBet={minBet}
      maxBet={maxBet}
    >
      <SlotMachineContent />
    </GameStateProvider>
  );
};

export default withErrorBoundary(SlotMachine);
