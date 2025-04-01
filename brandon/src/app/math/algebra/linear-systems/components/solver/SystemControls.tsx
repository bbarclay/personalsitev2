"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from 'lucide-react';

interface SystemControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  disabled: boolean;
}

export function SystemControls({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  onReset,
  disabled
}: SystemControlsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={onReset}
            disabled={disabled}
            title="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={onPrev}
            disabled={disabled}
            title="Previous step"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          
          {isPlaying ? (
            <Button
              variant="default"
              size="icon"
              onClick={onPause}
              disabled={disabled}
              title="Pause"
            >
              <Pause className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              onClick={onPlay}
              disabled={disabled}
              title="Play"
            >
              <Play className="h-4 w-4" />
            </Button>
          )}
          
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            disabled={disabled}
            title="Next step"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          
          <div className="w-9"></div> {/* Spacer for alignment */}
        </div>
      </CardContent>
    </Card>
  );
} 