import React from 'react';

interface RegressionOptions {
  type: 'linear' | 'polynomial' | 'exponential';
  degree?: number;
}

interface RegressionOptionsProps {
  options: RegressionOptions;
  onOptionsChange: (options: RegressionOptions) => void;
}

export const RegressionOptions: React.FC<RegressionOptionsProps> = ({
  options,
  onOptionsChange
}) => {
  const handleTypeChange = (type: RegressionOptions['type']) => {
    onOptionsChange({ ...options, type });
  };

  const handleDegreeChange = (degree: number) => {
    onOptionsChange({ ...options, degree });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Regression Options</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Regression Type
          </label>
          <select
            value={options.type}
            onChange={(e) => handleTypeChange(e.target.value as RegressionOptions['type'])}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="linear">Linear</option>
            <option value="polynomial">Polynomial</option>
            <option value="exponential">Exponential</option>
          </select>
        </div>

        {options.type === 'polynomial' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Polynomial Degree
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={options.degree || 2}
              onChange={(e) => handleDegreeChange(parseInt(e.target.value) || 2)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        )}
      </div>
    </div>
  );
}; 