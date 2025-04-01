import React from 'react';
import { ERAS } from '../constants/game-data';
import type { Era } from '../types';

interface EraSelectionProps {
  activeEra: number;
  erasVisited: number[];
  darkMode: boolean;
  onSelectEra: (index: number) => void;
  currentFact: number;
  dinoFacts: string[];
}

export const EraSelection: React.FC<EraSelectionProps> = ({
  activeEra,
  erasVisited,
  darkMode,
  onSelectEra,
  currentFact,
  dinoFacts
}) => {
  return (
    <div className={`
      ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'}
      backdrop-blur-md rounded-xl p-6
      shadow-xl
    `}>
      <h2 className="
        text-2xl font-bold mb-4
        flex items-center gap-2
      ">
        <span>🗺️</span> Choose an Era
      </h2>

      <div className="flex flex-col gap-3">
        {ERAS.map((era: Era, index: number) => (
          <button
            key={index}
            onClick={() => onSelectEra(index)}
            className={`
              relative px-3 py-4 rounded-lg
              font-bold cursor-pointer
              transition-all duration-200
              hover:scale-[1.02]
              ${activeEra === index ? 'text-white blinking' : darkMode ? 'text-white' : 'text-gray-800'}
              border-2
            `}
            style={{
              backgroundColor: activeEra === index ? era.color : 'transparent',
              borderColor: era.color
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>{era.icon}</span>
                <span>{era.name}</span>
              </div>
              {erasVisited.includes(index) && <div>✔️</div>}
            </div>
            <div className="text-sm mt-1 opacity-80">
              {era.description}
            </div>
          </button>
        ))}
      </div>

      {/* Dino Fact */}
      <div className={`
        mt-6
        ${darkMode ? 'bg-black/40' : 'bg-white/60'}
        p-3 rounded-lg
        border-l-4 border-green-600
        text-sm
      `}>
        <p className="font-bold mb-1 flex items-center gap-2">
          <span>💡</span> Dino Fact:
        </p>
        <p className="animate-fadeIn" key={currentFact}>
          {dinoFacts[currentFact]}
        </p>
      </div>
    </div>
  );
};
