'use client';

import { CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Music, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SlotMachineHeader: React.FC = () => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('slotMachineSoundEnabled');
      return saved !== null ? JSON.parse(saved) : true;
    }
    return true;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'slotMachineSoundEnabled',
        JSON.stringify(soundEnabled)
      );
    }
  }, [soundEnabled]);

  return (
    <CardHeader>
      <CardTitle className="flex items-center justify-between">
        <span>Enhanced Slot Machine Simulator</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Music className="text-yellow-500" />
            {soundEnabled ? (
              <Volume2
                className="cursor-pointer"
                onClick={() => setSoundEnabled(false)}
              />
            ) : (
              <VolumeX
                className="cursor-pointer"
                onClick={() => setSoundEnabled(true)}
              />
            )}
          </div>
          <DollarSign className="text-yellow-500" />
        </div>
      </CardTitle>
    </CardHeader>
  );
};

const SlotMachineHeaderDemo = () => {
  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Slot Machine Header Component</h2>
      <p className="mb-4">A reusable header component for slot machine games with sound controls.</p>

      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden mt-6">
        <SlotMachineHeader />
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">Game content would appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default SlotMachineHeaderDemo;
