import React from 'react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

interface PlayControlsProps {
  isStandard: boolean;
  isPlayingStandard: boolean;
  isPlayingCustom: boolean;
  togglePlay: (isStandard: boolean) => void;
  handlePreviousNumber: (isStandard: boolean) => void;
  handleNextNumber: (isStandard: boolean) => void;
  standardSpeed: number;
  customSpeed: number;
  setStandardSpeed: (speed: number) => void;
  setCustomSpeed: (speed: number) => void;
}

const PlayControls: React.FC<PlayControlsProps> = ({
  isStandard,
  isPlayingStandard,
  isPlayingCustom,
  togglePlay,
  handlePreviousNumber,
  handleNextNumber,
  standardSpeed,
  customSpeed,
  setStandardSpeed,
  setCustomSpeed,
}) => {
  const buttonClass = `
    p-2.5
    rounded-lg
    text-foreground/60
    hover:text-foreground
    hover:bg-foreground/5
    active:bg-foreground/10
    transition-colors
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500
  `;

  return (
    <div className="space-y-4">
      <div className="glass-container p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePreviousNumber(isStandard)}
            className={buttonClass}
            aria-label="Previous number"
          >
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={() => togglePlay(isStandard)}
            className={`${buttonClass} min-w-[40px] flex items-center justify-center`}
            aria-label={isStandard ? (isPlayingStandard ? "Pause" : "Play") : (isPlayingCustom ? "Pause" : "Play")}
          >
            {isStandard ? (
              isPlayingStandard ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )
            ) : isPlayingCustom ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => handleNextNumber(isStandard)}
            className={buttonClass}
            aria-label="Next number"
          >
            <SkipForward className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-3 mt-3">
          <span className="text-sm font-medium text-foreground/80">Speed:</span>
          <div className="relative flex-1">
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={isStandard ? standardSpeed : customSpeed}
              onChange={(e) =>
                isStandard
                  ? setStandardSpeed(parseInt(e.target.value))
                  : setCustomSpeed(parseInt(e.target.value))
              }
              className="slider-purple"
            />
          </div>
          <span className="text-sm font-medium text-foreground/80 min-w-[48px]">
            {((isStandard ? standardSpeed : customSpeed) / 1000).toFixed(1)}s
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayControls;
