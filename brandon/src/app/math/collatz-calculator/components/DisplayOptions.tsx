import React from 'react';
import { TRANSFORMATIONS } from './constants';

interface DisplayOptionsProps {
  checkboxes: {
    [key: string]: boolean;
  };
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DisplayOptions: React.FC<DisplayOptionsProps> = ({
  checkboxes,
  onCheckboxChange,
}) => (
  <div className="max-w-[1600px] mx-auto px-6">
    <div className="glass-panel">
      <h2 className="text-title mb-4">Display Options</h2>
      <div className="flex flex-wrap gap-6">
        {Object.values(TRANSFORMATIONS).map((transformation) => (
          <label
            key={transformation}
            className="flex items-center space-x-3 text-foreground/80 hover:text-foreground transition-colors cursor-pointer group"
          >
            <input
              type="checkbox"
              name={transformation}
              checked={checkboxes[transformation]}
              onChange={onCheckboxChange}
              className="w-4 h-4 rounded border-foreground/10 text-purple-500 focus:ring-purple-500 bg-background/50 transition-colors"
            />
            <span className="select-none group-hover:text-foreground">
              {transformation.charAt(0).toUpperCase() + transformation.slice(1)}
            </span>
          </label>
        ))}
      </div>
    </div>
  </div>
);

export default DisplayOptions;
