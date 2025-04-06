'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
// import { SymbolIcon } from '@/components/math/SymbolIcon';
// import { symbols } from '@/components/math/slot-machine/utils';

// Placeholder for SymbolIcon since the original component is missing
const SymbolIcon = ({ symbolId, size }: { symbolId: number, size: number }) => (
  <div style={{ width: size, height: size, background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    {symbolId}
  </div>
);

// Placeholder symbols data since the original import is missing
const symbols = [
  { id: 1, name: 'Cherry', isWild: false, isScatter: false, triggersJackpot: false, payout: { five: 100, four: 50, three: 20 } },
  { id: 2, name: 'Bell', isWild: false, isScatter: false, triggersJackpot: false, payout: { five: 200, four: 100, three: 40 } },
  { id: 3, name: 'Seven', isWild: false, isScatter: false, triggersJackpot: true, payout: { five: 500, four: 200, three: 80 } },
  { id: 4, name: 'Wild', isWild: true, isScatter: false, triggersJackpot: false, payout: { five: 300, four: 150, three: 60 } }
];

export interface Symbol {
  id: number;
  isWild: boolean;
  triggersJackpot: boolean;
  payout: {
    five: number;
    four: number;
    three: number;
  };
}

const Paytable: React.FC = () => {
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

const PaytableComponent = () => {
  return <Paytable />;
};

export default PaytableComponent;