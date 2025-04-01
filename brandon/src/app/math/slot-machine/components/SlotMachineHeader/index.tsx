'use client';

import { CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Music, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface SlotMachineHeaderProps {
  title: string;
}

export const SlotMachineHeader: React.FC<SlotMachineHeaderProps> = ({ title }) => {
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
        <span>{title}</span>
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
