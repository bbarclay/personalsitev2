"use client";

import React from 'react';
import { TriangleTypeInfo, Achievement } from '../types';

interface GameInfoProps {
  pyramidProgress: number;
  triangleTypes: TriangleTypeInfo[];
  achievements: Achievement[];
  animatePyramid?: boolean;
}

const GameInfo: React.FC<GameInfoProps> = ({ 
  pyramidProgress, 
  triangleTypes,
  achievements,
  animatePyramid = false
}) => {
  // Render the pyramid visual based on progress
  const renderPyramid = (progress: number) => {
    const layers = Math.max(1, Math.ceil((progress / 100) * 10));
    return (
      <div className={`flex flex-col items-center transition-all duration-500 transform ${
        animatePyramid ? 'scale-110' : 'scale-100'
      }`}>
        {[...Array(10)].map((_, i) => (
          <div 
            key={i} 
            className={`h-4 bg-amber-500 border border-amber-700 shadow-inner transition-all duration-300 ${
              i < layers ? 'opacity-100' : 'opacity-20'
            }`}
            style={{ 
              width: `${100 - i * 10}%`,
              transitionDelay: `${i * 50}ms`
            }}
          />
        ))}
      </div>
    );
  };

  // Count unlocked achievements
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;
  const achievementProgress = Math.round((unlockedCount / totalAchievements) * 100);

  return (
    <div className="bg-amber-50/70 dark:bg-gray-800/70 rounded-lg overflow-hidden shadow-md">
      <div className="bg-amber-100 dark:bg-gray-700 px-4 py-3">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <span>🏗️</span> Construction Status
        </h2>
      </div>
      
      <div className="p-4">
        {renderPyramid(pyramidProgress)}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${pyramidProgress}%` }}
            ></div>
          </div>
          <span className="text-sm font-mono text-amber-700 dark:text-amber-300 font-medium">
            {Math.round(pyramidProgress)}%
          </span>
        </div>
      </div>
      
      <div className="bg-amber-100 dark:bg-gray-700 px-4 py-3 mt-4">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2">
          <span>📐</span> Triangle Codex
        </h2>
      </div>
      
      <div className="p-4 space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-700">
        {triangleTypes.map(type => (
          <div 
            key={type.name}
            className="bg-white/70 dark:bg-gray-700/70 p-3 rounded-md shadow-sm border border-amber-200 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
          >
            <h3 className="flex items-center gap-2 font-medium text-amber-700 dark:text-amber-300">
              <span className="text-lg">{type.icon}</span> {type.name}
            </h3>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300">
              {type.description}
            </p>
            <ul className="mt-2 text-xs text-gray-500 dark:text-gray-400 pl-5 list-disc">
              {type.properties.map((prop, i) => (
                <li key={i}>{prop}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      <div className="bg-amber-100 dark:bg-gray-700 px-4 py-3 mt-4">
        <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-300 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span>🏆</span> Achievements
          </div>
          <span className="text-sm font-mono">
            {unlockedCount}/{totalAchievements}
          </span>
        </h2>
      </div>
      
      <div className="p-4 space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-amber-300 dark:scrollbar-thumb-amber-700">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`p-3 rounded-md border transition-all duration-300 ${
              achievement.unlocked 
                ? 'bg-amber-100/70 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700' 
                : 'bg-gray-100/70 dark:bg-gray-700/70 border-gray-200 dark:border-gray-600 opacity-60'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`text-xl ${
                achievement.unlocked 
                  ? 'text-amber-500 dark:text-amber-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {achievement.unlocked ? '✅' : '🔒'}
              </div>
              <div>
                <h4 className={`text-sm font-medium ${
                  achievement.unlocked 
                    ? 'text-amber-800 dark:text-amber-300' 
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {achievement.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameInfo; 