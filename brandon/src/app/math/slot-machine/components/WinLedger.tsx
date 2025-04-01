'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SymbolIcon } from './SymbolIcon';
import { WinRecord } from './types';

interface WinLedgerProps {
  winRecords: WinRecord[];
}

export const WinLedger: React.FC<WinLedgerProps> = ({ winRecords }) => {
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
                  <SymbolIcon
                    key={index}
                    symbolId={symbolId}
                    size={24}
                  />
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
