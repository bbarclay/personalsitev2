import type { Symbol } from '../types';

export const symbols: Symbol[] = [
  {
    id: 0,
    name: '7',
    basePayoutMultiplier: 5.0,
    icon: '7️⃣',
    color: '#FFD700',
    isWild: false,
    isScatter: false,
    triggersJackpot: true,
    payout: { three: 50, four: 200, five: 1000 }
  },
  {
    id: 1,
    name: 'BAR',
    basePayoutMultiplier: 4.0,
    icon: '📊',
    color: '#C0C0C0',
    payout: { three: 40, four: 160, five: 800 }
  },
  {
    id: 2,
    name: 'Cherry',
    basePayoutMultiplier: 3.0,
    icon: '🍒',
    color: '#FF0000',
    payout: { three: 30, four: 120, five: 600 }
  },
  {
    id: 3,
    name: 'Lemon',
    basePayoutMultiplier: 2.0,
    icon: '🍋',
    color: '#FFFF00',
    payout: { three: 20, four: 80, five: 400 }
  },
  {
    id: 4,
    name: 'Orange',
    basePayoutMultiplier: 1.5,
    icon: '🍊',
    color: '#FFA500',
    payout: { three: 15, four: 60, five: 300 }
  },
  {
    id: 5,
    name: 'Plum',
    basePayoutMultiplier: 1.2,
    icon: '🍇',
    color: '#800080',
    payout: { three: 12, four: 48, five: 240 }
  },
  {
    id: 6,
    name: 'Bell',
    basePayoutMultiplier: 1.0,
    icon: '🔔',
    color: '#FFD700',
    isScatter: true,
    payout: { three: 10, four: 40, five: 200 }
  },
];

export const getSymbolName = (symbolId: number): string => {
  const symbol = symbols.find(s => s.id === symbolId);
  return symbol ? symbol.name : 'Unknown';
};

export const getSymbolById = (id: number): Symbol | undefined => {
  return symbols.find(s => s.id === id);
};
