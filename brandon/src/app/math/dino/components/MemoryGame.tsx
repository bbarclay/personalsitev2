import React from 'react';
import type { MemoryGameState } from '../types';

interface MemoryGameProps {
  isActive: MemoryGameState;
  darkMode: boolean;
  dinoNames: string[];
  userAnswer: string;
  memoryResult: boolean | null;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({
  isActive,
  darkMode,
  dinoNames,
  userAnswer,
  memoryResult,
  onAnswerChange,
  onSubmit
}) => {
  if (!isActive) return null;

  return (
    <div className={`
      absolute inset-0
      ${darkMode ? 'bg-black/90' : 'bg-white/90'}
      backdrop-blur-sm z-10
      flex flex-col items-center justify-center
      p-8
    `}>
      <h3 className="text-2xl font-bold mb-4">
        Dino Name Memory Game
      </h3>

      {isActive === 'show' && memoryResult === null && (
        <div className="animate-fadeIn text-center">
          <p className="mb-4">Memorize these dinosaur names:</p>
          <div className={`
            my-4 text-xl font-bold
            flex flex-col gap-2 max-w-[300px]
            ${darkMode ? 'text-green-400' : 'text-green-600'}
          `}>
            {dinoNames.map((name, idx) => (
              <div key={idx} className="blinking">
                {name}
              </div>
            ))}
          </div>
          <p className="text-sm opacity-80">
            They will disappear in 4 seconds...
          </p>
        </div>
      )}

      {isActive === 'input' && memoryResult === null && (
        <div className="animate-fadeIn">
          <p className="mb-4">Type the names in order, separated by spaces:</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => onAnswerChange(e.target.value)}
            className={`
              w-[250px] p-3 text-center text-base
              rounded-lg mb-4
              border-2 border-green-600
              ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
              focus:outline-none focus:ring-2 focus:ring-green-500
            `}
            autoFocus
          />
          <button
            onClick={onSubmit}
            className="
              w-full bg-green-600 text-white
              rounded-lg py-2 px-4
              font-bold text-base
              hover:scale-105 transition-transform
            "
          >
            Check Answer
          </button>
        </div>
      )}

      {memoryResult !== null && (
        <div className="animate-fadeIn text-center">
          <div className="text-6xl mb-4">
            {memoryResult ? '🎉' : '❌'}
          </div>
          {memoryResult ? (
            <p className="text-green-500 font-bold">Correct!</p>
          ) : (
            <>
              <p className="text-red-500 font-bold mb-2">Wrong!</p>
              <p className="text-sm">
                The correct sequence was: {dinoNames.join(" ")}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};
