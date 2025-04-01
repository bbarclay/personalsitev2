'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

interface BonusGameProps {
  freeSpins: number;
  onClose: () => void;
}

export const BonusGame: React.FC<BonusGameProps> = ({ freeSpins, onClose }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <Gift className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Bonus Round Activated!
          </h2>
          <p className="text-gray-300">
            Congratulations! You&apos;ve won free spins.
          </p>
        </div>

        <div className="bg-gray-700 p-4 rounded-lg mb-6">
          <div className="text-4xl font-bold text-yellow-400">
            {freeSpins}
          </div>
          <div className="text-gray-300">Free Spins</div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-yellow-500 hover:bg-yellow-600"
        >
          Start Free Spins
        </Button>
      </div>
    </div>
  );
};
