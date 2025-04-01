'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SymbolIcon } from '@/app/math/utils/SymbolIcon';

export interface WinRecord {
  id: string;
  amount: number;
  multiplier: number;
  symbols: string[][];
  timestamp: string;
}

interface WinLedgerProps {
  winRecords?: WinRecord[];
}

// Sample win records data to use as default
const sampleWinRecords: WinRecord[] = [
  {
    id: "win1",
    amount: 250,
    multiplier: 5,
    symbols: [["wild", "wild", "wild"]],
    timestamp: new Date().toISOString()
  },
  {
    id: "win2",
    amount: 100,
    multiplier: 2,
    symbols: [["seven", "seven", "bar3"]],
    timestamp: new Date(Date.now() - 120000).toISOString()
  },
  {
    id: "win3",
    amount: 50,
    multiplier: 1,
    symbols: [["cherry", "cherry", "cherry"]],
    timestamp: new Date(Date.now() - 300000).toISOString()
  }
];

export const WinLedger: React.FC<WinLedgerProps> = ({ winRecords = sampleWinRecords }) => {
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
                  <SymbolIcon key={index} symbolId={symbolId} size="sm" />
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

export default WinLedger;
