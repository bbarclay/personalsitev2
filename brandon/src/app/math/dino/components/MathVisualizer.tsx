import React from 'react';
import { EraId } from '../utils/era-utils';

interface MathVisualizerProps {
  darkMode: boolean;
  currentEra: EraId;
  concept: string;
  data: number[];
}

export const MathVisualizer: React.FC<MathVisualizerProps> = ({
  darkMode,
  currentEra,
  concept,
  data
}) => {
  const getVisualization = () => {
    switch (concept.toLowerCase()) {
      case 'proportional reasoning':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-bold">Dinosaur Size Comparison</div>
              {data.map((size, i) => (
                <div
                  key={i}
                  className="bg-blue-500"
                  style={{ 
                    width: `${size}%`,
                    height: '20px',
                    borderRadius: '4px'
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'geometric shapes':
        return (
          <div className="grid grid-cols-3 gap-4">
            {data.map((sides, i) => (
              <div 
                key={i}
                className="aspect-square relative"
              >
                <svg 
                  viewBox="0 0 100 100"
                  className={`
                    w-full h-full
                    ${darkMode ? 'stroke-white' : 'stroke-gray-800'}
                  `}
                >
                  {[...Array(sides)].map((_, index) => {
                    const angle = (index * 360) / sides;
                    const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                    return (
                      <line
                        key={index}
                        x1={x}
                        y1={y}
                        x2={50 + 40 * Math.cos(((index + 1) * 360 / sides * Math.PI) / 180)}
                        y2={50 + 40 * Math.sin(((index + 1) * 360 / sides * Math.PI) / 180)}
                        strokeWidth="2"
                        fill="none"
                      />
                    );
                  })}
                </svg>
              </div>
            ))}
          </div>
        );

      case 'probability':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-10 gap-1">
              {data.map((probability, i) => (
                <div
                  key={i}
                  className={`
                    aspect-square rounded-sm
                    ${probability > 0.5 ? 'bg-green-500' : 'bg-gray-300'}
                  `}
                />
              ))}
            </div>
            <div className="text-sm text-center">
              Probability visualization: {Math.round(data.filter(p => p > 0.5).length / data.length * 100)}%
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center opacity-70">
            Select a concept to visualize
          </div>
        );
    }
  };

  return (
    <div className={`
      p-4 rounded-lg
      ${darkMode ? 'bg-gray-800' : 'bg-white'}
      shadow-lg
    `}>
      <h4 className="font-bold mb-4">Math Visualization</h4>
      <div className="p-4">
        {getVisualization()}
      </div>
      <div className="text-sm opacity-70 mt-4 text-center">
        Interactive visualization helps understand {concept.toLowerCase()}
      </div>
    </div>
  );
};

// Helper component for smooth bar transitions
const AnimatedBar: React.FC<{
  value: number;
  maxValue: number;
  label?: string;
  color?: string;
}> = ({ value, maxValue, label, color = 'bg-blue-500' }) => {
  const width = (value / maxValue) * 100;

  return (
    <div className="space-y-1">
      {label && <div className="text-sm">{label}</div>}
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};
