import React from 'react';
import { EraId } from '../utils/era-utils';
import { ERA_MATH_CONTENT } from '../constants/math-concepts';
import '../styles/math-animations.css';

interface IntroScreenProps {
  darkMode: boolean;
  selectedCharacter: string;
  onCharacterSelect: (id: string) => void;
  onStartGame: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  darkMode,
  selectedCharacter,
  onCharacterSelect,
  onStartGame
}) => {
  const mathConcepts = React.useMemo(() => {
    // Collect all unique math concepts across eras
    const concepts = new Set<string>();
    (Object.keys(ERA_MATH_CONTENT) as EraId[]).forEach(era => {
      ERA_MATH_CONTENT[era].mathConcepts.forEach(concept => {
        concepts.add(concept);
      });
    });
    return Array.from(concepts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto text-center py-8">
      <h1 className={`
        text-4xl md:text-5xl font-bold mb-6
        ${darkMode ? 'text-green-400' : 'text-green-600'}
      `}>
        Mathematical Time Travel
      </h1>

      <p className="text-xl mb-8 opacity-80">
        Journey through prehistoric eras while mastering essential math concepts
      </p>

      {/* Math Topics Overview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Mathematical Concepts You'll Master</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {mathConcepts.map((concept, index) => (
            <div
              key={concept}
              className={`
                p-4 rounded-lg
                ${darkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg
              `}
            >
              <div className="text-2xl mb-2 rotating-symbol">
                {getMathSymbol(concept)}
              </div>
              <div className="font-bold">{concept}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Era Preview */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Your Learning Journey</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {(Object.entries(ERA_MATH_CONTENT) as [EraId, any][]).map(([era, content], index) => (
            <div
              key={era}
              className={`
                p-6 rounded-xl
                ${darkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg
              `}
            >
              <h3 className="text-xl font-bold mb-2">{content.title}</h3>
              <p className="text-sm opacity-80 mb-4">{content.description}</p>
              <div className="text-sm">
                {`${content.problems.length} Mathematical Challenges`}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={onStartGame}
        className={`
          text-xl px-8 py-4 rounded-full
          bg-green-600 text-white
          hover:bg-green-700 transition-colors
          shadow-lg font-bold
          flex items-center gap-3 mx-auto
        `}
      >
        <span>Begin Your Mathematical Adventure</span>
        <span className="text-2xl">→</span>
      </button>

      {/* Educational Note */}
      <div className={`
        mt-8 p-4 rounded-lg max-w-xl mx-auto text-sm
        ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}
      `}>
        <p>
          This educational game combines mathematical learning with prehistoric exploration.
          Each era presents unique mathematical challenges that build upon each other,
          helping you develop strong problem-solving skills while learning about dinosaurs.
        </p>
      </div>
    </div>
  );
};

// Helper function to get appropriate math symbol for concept
function getMathSymbol(concept: string): string {
  const symbolMap: Record<string, string> = {
    'Proportional Reasoning': '∝',
    'Basic Measurements': '📏',
    'Number Lines': '↔️',
    'Scale and Size': '⚖️',
    'Area and Volume': '∫',
    'Geometric Shapes': '△',
    'Weight Distribution': '≈',
    'Spatial Reasoning': '⬚',
    'Probability': 'P(x)',
    'Statistics': 'σ',
    'Force Calculations': '→',
    'Population Growth': 'ƒ(x)',
  };

  return symbolMap[concept] || '✦';
}
