import React from 'react';
import type { Achievement } from '../types';
import { ERAS } from '../constants/game-data';

interface AchievementsPanelProps {
  darkMode: boolean;
  score: number;
  achievements: Achievement[];
  fossilCollection: string[];
  erasVisited: number[];
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  darkMode,
  score,
  achievements,
  fossilCollection,
  erasVisited
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
        <span>🏆</span> Your Progress
      </h2>

      {/* Score Display */}
      <div className={`
        flex items-center gap-4 mb-6 p-4
        ${darkMode ? 'bg-black/20' : 'bg-black/5'}
        rounded-lg
      `}>
        <div className="
          w-16 h-16 rounded-full
          bg-gradient-to-br from-green-500 to-lime-500
          flex items-center justify-center
          text-2xl font-bold text-white
        ">
          {score}
        </div>
        <div>
          <div className="font-bold">Points</div>
          <div className="text-sm opacity-80">
            Keep exploring to earn more!
          </div>
        </div>
      </div>

      {/* Fossil Collection */}
      <div className="mb-6">
        <div className="font-bold mb-2 flex items-center gap-2">
          <span>🦴</span> Fossils Collected
        </div>
        <div className={`
          flex flex-wrap gap-2 p-3
          ${darkMode ? 'bg-black/20' : 'bg-black/5'}
          rounded-lg
        `}>
          {fossilCollection.length === 0 ? (
            <span className="opacity-60">No fossils yet. Start collecting!</span>
          ) : (
            fossilCollection.map((fossil, i) => (
              <div
                key={i}
                className="
                  bg-green-600 text-white
                  rounded px-2 py-1 text-sm
                  flex items-center justify-center
                "
              >
                {fossil}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Eras Explored */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <div className="font-bold flex items-center gap-2">
            <span>🗺️</span> Eras Explored
          </div>
          <div>{erasVisited.length} / {ERAS.length}</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {ERAS.map((era, index) => (
            <div
              key={index}
              className={`
                aspect-square rounded-full
                flex items-center justify-center text-xl
                transition-all duration-200
                ${erasVisited.includes(index)
                  ? ''
                  : `${darkMode ? 'bg-black/20' : 'bg-black/5'}`
                }
              `}
              style={{
                width: `calc(${100 / ERAS.length}% - ${(ERAS.length - 1) * 0.5 / ERAS.length}rem)`,
                backgroundColor: erasVisited.includes(index) ? era.color : undefined
              }}
            >
              {erasVisited.includes(index) ? era.icon : ''}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <div className="font-bold mb-3 flex items-center gap-2">
          <span>🏅</span> Achievements
        </div>
        <div className="flex flex-col gap-3">
          {achievements.map(a => (
            <div
              key={a.id}
              className={`
                rounded-lg p-3 flex items-center gap-3
                transition-colors duration-200
                ${a.unlocked
                  ? `${darkMode ? 'bg-green-900/20' : 'bg-green-100'} border border-green-500`
                  : `${darkMode ? 'bg-black/20' : 'bg-black/5'}`
                }
                ${!a.unlocked && 'opacity-60'}
              `}
            >
              <div className={`
                w-8 h-8 rounded-full
                flex items-center justify-center text-white
                ${a.unlocked ? 'bg-green-500' : darkMode ? 'bg-gray-600' : 'bg-gray-400'}
              `}>
                {a.unlocked ? '✓' : '?'}
              </div>
              <div>
                <div className="font-bold">{a.name}</div>
                <div className="text-sm opacity-80">
                  {a.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
