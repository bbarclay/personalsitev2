'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';
import { SymbolIcon } from '@components/math/SymbolIcon';
import { symbols } from '@components/math/slot-machine/utils';

export interface Symbol {
  id: number; // Ensure 'id' is defined
  isWild: boolean;
  triggersJackpot: boolean;
  payout: {
    five: number;
    four: number;
    three: number;
  };
}

export const Paytable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paytable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {symbols.map((symbol) => (
            <div
              key={symbol.id}
              className="bg-gray-800 p-4 rounded-lg text-white"
            >
              <div className="flex items-center space-x-3 mb-2">
                <SymbolIcon symbolId={symbol.id} size={32} />
                <span className="font-medium">{symbol.name}</span>
                {symbol.isWild && (
                  <span className="text-yellow-400 text-sm">Wild</span>
                )}
                {symbol.isScatter && (
                  <span className="text-purple-400 text-sm">Scatter</span>
                )}
                {symbol.triggersJackpot && (
                  <span className="text-red-400 text-sm">Jackpot</span>
                )}
              </div>
              <div className="space-y-1 text-sm">
                <div>5x: {symbol.payout.five}x</div>
                <div>4x: {symbol.payout.four}x</div>
                <div>3x: {symbol.payout.three}x</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
