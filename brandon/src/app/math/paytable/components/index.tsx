'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SymbolIcon } from '@/app/math/utils/SymbolIcon';
import { symbols } from '@/app/math/utils/symbols';

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
                <SymbolIcon symbolId={symbol.id} size="md" />
                <span className="font-medium">{symbol.name}</span>
              </div>
              <div className="space-y-1 text-sm">
                <div>Value: {symbol.value}x</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Paytable;
