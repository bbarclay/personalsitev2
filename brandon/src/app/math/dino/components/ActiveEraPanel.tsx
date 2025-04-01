import React from 'react';
import { CHARACTERS, ERAS } from '../constants/game-data';
import type { MemoryGameState } from '../types';

interface ActiveEraPanelProps {
  darkMode: boolean;
  activeEra: number;
  character: string;
  onCollectFossil: () => void;
  onStartMemoryGame: () => void;
  memoryGameActive: MemoryGameState;
}

export const ActiveEraPanel: React.FC<ActiveEraPanelProps> = ({
  darkMode,
  activeEra,
  character,
  onCollectFossil,
  onStartMemoryGame,
  memoryGameActive
}) => {
  const era = ERAS[activeEra];
  
  return (
    <div className={`
      ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}
      backdrop-blur-md rounded-xl p-6
      shadow-xl relative
    `}>
      <h2 className={`
        text-2xl font-bold mb-4
        flex items-center gap-2
      `}
      style={{ color: era.color }}
      >
        <span>{era.icon}</span> {era.name}
      </h2>

      {/* Character Badge */}
      <div
        className="
          absolute top-4 right-4
          flex items-center gap-2
          text-white px-2 py-1
          rounded-full text-sm
        "
        style={{ backgroundColor: CHARACTERS[character].color }}
      >
        <span>{CHARACTERS[character].emoji}</span>
        <span>{CHARACTERS[character].name}</span>
      </div>

      {/* Era Content */}
      <div className="animate-fadeIn">
        <p className={`
          ${darkMode ? 'bg-black/20' : 'bg-black/5'}
          p-4 rounded-lg mb-4
        `}>
          Explore {era.name} to find unique dinosaur fossils
          and learn more about the creatures from this era!
        </p>

        <div className={`
          ${darkMode ? 'bg-black/20' : 'bg-white/70'}
          p-4 rounded-lg
          flex flex-col gap-4
        `}>
          {/* Action Buttons */}
          <button
            onClick={onCollectFossil}
            className={`
              w-full py-3 px-4 rounded-lg
              font-bold text-white
              flex items-center justify-center gap-2
              hover:scale-[1.02] transition-transform
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
            style={{ backgroundColor: era.color }}
            disabled={memoryGameActive !== false}
          >
            <span>🦴</span> Collect Fossil (+10 points)
          </button>

          <button
            onClick={onStartMemoryGame}
            className="
              w-full py-3 px-4 rounded-lg
              font-bold text-white
              bg-yellow-500
              flex items-center justify-center gap-2
              hover:scale-[1.02] transition-transform
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            disabled={memoryGameActive !== false}
          >
            <span>🎮</span> Dino Name Memory Game
          </button>
        </div>
      </div>
    </div>
  );
};
