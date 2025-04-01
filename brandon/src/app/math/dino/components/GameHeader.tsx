import React from 'react';

interface GameHeaderProps {
  score: number;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  score,
  darkMode,
  onToggleTheme
}) => {
  return (
    <header
      className={`
        relative z-10 flex justify-between items-center p-4
        ${darkMode ? 'bg-gray-900/70' : 'bg-green-50/70'}
        backdrop-blur-md shadow-md
      `}
    >
      <div className={`
        text-3xl font-bold flex items-center gap-2
        ${darkMode ? 'text-yellow-400' : 'text-green-600'}
      `}>
        <span className="text-4xl">🦕</span>
        DinoAdventure
      </div>

      <div className="flex items-center gap-4">
        <div className="
          bg-green-600 text-white px-4 py-2 
          rounded-full font-bold flex items-center gap-2
        ">
          <span className="text-xl">⭐</span>
          <span>{score}</span>
        </div>

        <button
          onClick={onToggleTheme}
          className={`
            w-10 h-10 rounded-full border-none cursor-pointer
            flex items-center justify-center text-xl
            hover:scale-105 transition-transform
            ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-900 text-white'}
          `}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};
