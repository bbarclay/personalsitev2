import React from 'react';
import { useProgress } from '../context/ProgressContext';

interface LearningMilestonesProps {
  darkMode: boolean;
  currentConcept: string;
}

export const LearningMilestones: React.FC<LearningMilestonesProps> = ({
  darkMode,
  currentConcept
}) => {
  const { 
    conceptProgress,
    getMasteryLevel,
    getNextMilestone,
    getStreak
  } = useProgress();

  const progress = conceptProgress[currentConcept];
  const masteryLevel = getMasteryLevel(currentConcept);
  const nextMilestone = getNextMilestone(currentConcept);
  const streak = getStreak(currentConcept);

  if (!progress) return null;

  return (
    <div className={`
      p-4 rounded-lg
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-lg
    `}>
      {/* Current Progress Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">Learning Progress</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{progress.totalAttempts}</div>
            <div className="text-sm opacity-70">Problems Attempted</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{progress.correctAttempts}</div>
            <div className="text-sm opacity-70">Correct Answers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-sm opacity-70">Current Streak</div>
          </div>
        </div>
      </div>

      {/* Mastery Level */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Mastery Level</span>
          <span className="text-sm">{masteryLevel}%</span>
        </div>
        <div className={`
          h-2 rounded-full
          ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
        `}>
          <div
            className={`
              h-full rounded-full transition-all duration-500
              ${getMasteryColor(masteryLevel)}
            `}
            style={{ width: `${masteryLevel}%` }}
          />
        </div>
      </div>

      {/* Milestones */}
      <div>
        <h4 className="font-bold mb-3">Milestones</h4>
        <div className="space-y-3">
          {progress.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`
                p-3 rounded-lg
                ${darkMode 
                  ? milestone.achieved ? 'bg-green-900/20' : 'bg-gray-700/50'
                  : milestone.achieved ? 'bg-green-100' : 'bg-gray-100'
                }
                ${milestone.achieved ? 'border-green-500' : ''}
                border transition-colors
              `}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold">{milestone.title}</div>
                {milestone.achieved && (
                  <div className="text-green-500">✓</div>
                )}
              </div>
              <div className="text-sm opacity-70 mt-1">
                {milestone.description}
              </div>
              {milestone.date && (
                <div className="text-xs opacity-50 mt-1">
                  Achieved: {milestone.date.toLocaleDateString()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Goal */}
      {nextMilestone && (
        <div className={`
          mt-6 p-4 rounded-lg
          ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'}
          border border-blue-500
        `}>
          <div className="font-bold flex items-center gap-2">
            <span>🎯</span> Next Goal
          </div>
          <div className="mt-1 text-sm">
            {nextMilestone.description}
          </div>
        </div>
      )}

      {/* Learning Tips */}
      {masteryLevel < 80 && (
        <div className={`
          mt-4 p-3 rounded-lg text-sm
          ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
        `}>
          <div className="font-bold mb-1">Tips to improve:</div>
          <ul className="list-disc list-inside opacity-70">
            <li>Review the explanations after each problem</li>
            <li>Use the workspace to visualize concepts</li>
            <li>Practice regularly to build mastery</li>
          </ul>
        </div>
      )}
    </div>
  );
};

function getMasteryColor(level: number): string {
  if (level >= 80) return 'bg-green-500';
  if (level >= 60) return 'bg-yellow-500';
  if (level >= 40) return 'bg-orange-500';
  return 'bg-red-500';
}
