import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrainingControlsProps {
  isTraining: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  iteration: number;
}

export const TrainingControls = ({
  isTraining,
  onPlayPause,
  onReset,
  iteration,
}: TrainingControlsProps) => {
  return (
    <div className="flex items-center gap-6 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md">
      <Button
        variant="outline"
        size="icon"
        onClick={onPlayPause}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-none shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {isTraining ? (
          <Pause className="h-8 w-8 text-white" />
        ) : (
          <Play className="h-8 w-8 text-white ml-1" />
        )}
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={onReset}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-none shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        disabled={iteration === 0}
      >
        <RefreshCw className="h-8 w-8 text-white" />
      </Button>
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {isTraining ? 'Training in Progress' : 'Training Paused'}
        </span>
        <span className="text-sm text-gray-500">
          Iteration: {iteration}
        </span>
      </div>
    </div>
  );
};

export default TrainingControls;
