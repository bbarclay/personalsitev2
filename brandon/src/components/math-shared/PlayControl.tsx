"use client";

import React from 'react';
import { Play, Pause, RotateCcw, StepForward } from 'lucide-react';

interface PlayControlProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep?: () => void;
  disabled?: boolean;
  hideStepButton?: boolean;
}

export function PlayControl({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStep,
  disabled = false,
  hideStepButton = false
}: PlayControlProps) {
  return (
    <div className="flex items-center gap-2">
      {isPlaying ? (
        <button
          onClick={onPause}
          disabled={disabled}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Pause"
        >
          <Pause className="w-5 h-5" />
        </button>
      ) : (
        <button
          onClick={onPlay}
          disabled={disabled}
          className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Play"
        >
          <Play className="w-5 h-5" />
        </button>
      )}
      
      {!hideStepButton && onStep && (
        <button
          onClick={onStep}
          disabled={disabled}
          className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Step forward"
        >
          <StepForward className="w-5 h-5" />
        </button>
      )}
      
      <button
        onClick={onReset}
        disabled={disabled}
        className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Reset"
      >
        <RotateCcw className="w-5 h-5" />
      </button>
    </div>
  );
} 