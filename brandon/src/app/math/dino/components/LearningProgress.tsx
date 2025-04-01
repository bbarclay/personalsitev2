import React from 'react';
import { ERA_MATH_CONTENT } from '../constants/math-concepts';

interface ConceptProgress {
  concept: string;
  mastery: number;
}

interface EraProgress {
  era: string;
  accuracy: number;
  problemsAttempted: number;
  conceptProgress: ConceptProgress[];
}

interface LearningProgressProps {
  darkMode: boolean;
  currentEra: string;
  progress: {
    [era: string]: {
      problemsAttempted: number;
      correctAnswers: number;
    };
  };
  conceptMastery: Record<string, number>;
}

export const LearningProgress: React.FC<LearningProgressProps> = ({
  darkMode,
  currentEra,
  progress,
  conceptMastery
}) => {
  // Calculate progress data for each era
  const eraProgress: EraProgress[] = Object.entries(ERA_MATH_CONTENT).map(([era, content]) => ({
    era,
    accuracy: progress[era]?.problemsAttempted 
      ? (progress[era].correctAnswers / progress[era].problemsAttempted) * 100 
      : 0,
    problemsAttempted: progress[era]?.problemsAttempted || 0,
    conceptProgress: content.mathConcepts.map(concept => ({
      concept,
      mastery: conceptMastery[concept] || 0
    }))
  }));

  return (
    <div className={`
      rounded-xl p-6
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-lg
    `}>
      <h3 className="text-xl font-bold mb-4">Learning Progress</h3>

      {/* Era Progress */}
      <div className="space-y-6">
        {eraProgress.map(({ era, accuracy, problemsAttempted, conceptProgress }) => (
          <div 
            key={era}
            className={`
              p-4 rounded-lg
              ${era === currentEra 
                ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                : darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }
            `}
          >
            {/* Era Header */}
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold">{ERA_MATH_CONTENT[era].title}</h4>
              <div className="text-sm opacity-80">
                {problemsAttempted} problems attempted
              </div>
            </div>

            {/* Accuracy Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Accuracy</span>
                <span>{Math.round(accuracy)}%</span>
              </div>
              <div className={`
                h-2 rounded-full
                ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
              `}>
                <div
                  className={`
                    h-full rounded-full transition-all duration-500
                    ${accuracy >= 80 ? 'bg-green-500' : 
                      accuracy >= 60 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }
                  `}
                  style={{ width: `${Math.min(100, accuracy)}%` }}
                />
              </div>
            </div>

            {/* Concept Mastery */}
            <div className="space-y-2">
              {conceptProgress.map(({ concept, mastery }) => (
                <div key={concept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{concept}</span>
                    <span>{Math.round(mastery)}%</span>
                  </div>
                  <div className={`
                    h-1.5 rounded-full
                    ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}
                  `}>
                    <div
                      className={`
                        h-full rounded-full
                        ${mastery >= 100 ? 'bg-purple-500' : 
                          mastery >= 75 ? 'bg-blue-500' :
                          mastery >= 50 ? 'bg-cyan-500' :
                          'bg-sky-500'
                        }
                      `}
                      style={{ width: `${Math.min(100, mastery)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Learning Tips */}
      <div className={`
        mt-6 p-4 rounded-lg text-sm
        ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}
      `}>
        <h4 className="font-bold mb-2">Learning Tips:</h4>
        <ul className="list-disc list-inside space-y-1 opacity-80">
          <li>Practice each concept multiple times to increase mastery</li>
          <li>Review explanations carefully when you make mistakes</li>
          <li>Try to maintain at least 80% accuracy in each era</li>
          <li>Complete all concepts in an era before moving to the next</li>
        </ul>
      </div>
    </div>
  );
};
