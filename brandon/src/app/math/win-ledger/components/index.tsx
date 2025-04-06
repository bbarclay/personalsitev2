'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
// import { SymbolIcon } from '@/components/math/symbol-icon';

// Placeholder SymbolIcon component
const SymbolIcon = ({ symbolId, size }: { symbolId: number, size: number }) => (
  <div style={{
    width: size,
    height: size,
    background: '#333',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.7
  }}>
    {['🍒', '🔔', '7️⃣', '⭐'][symbolId % 4] || symbolId}
  </div>
);

export interface WinRecord {
  id: string;
  amount: number;
  multiplier: number;
  symbols: number[][];
  timestamp: string;
}

interface WinLedgerProps {
  winRecords: WinRecord[];
}

const WinLedger: React.FC<WinLedgerProps> = ({ winRecords }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Wins</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {winRecords.map((record) => (
            <div
              key={record.id}
              className="bg-gray-800 p-3 rounded-lg text-white"
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-400">
                  ${record.amount.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400">
                  ({record.multiplier.toFixed(1)}x)
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {record.symbols[0].map((symbolId, index) => (
                  <SymbolIcon key={index} symbolId={symbolId} size={24} />
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {new Date(record.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const WinLedgerDemo = () => {
  // Sample win records for demonstration
  const sampleWinRecords: WinRecord[] = [
    {
      id: '1',
      amount: 25.50,
      multiplier: 2.5,
      symbols: [[0, 0, 0]],
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      amount: 100.00,
      multiplier: 10.0,
      symbols: [[3, 3, 3]],
      timestamp: new Date(Date.now() - 5 * 60000).toISOString()
    },
    {
      id: '3',
      amount: 5.00,
      multiplier: 0.5,
      symbols: [[1, 1, 2]],
      timestamp: new Date(Date.now() - 15 * 60000).toISOString()
    }
  ];

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Win Ledger</h2>
      <p className="mb-4">Track and display recent wins from slot machine games.</p>
      <WinLedger winRecords={sampleWinRecords} />
    </div>
  );
};

export default WinLedgerDemo;
