import React from 'react';

interface DataPoint {
  x: number;
  y: number;
}

interface DataInputProps {
  data: DataPoint[];
  onDataChange: (data: DataPoint[]) => void;
}

export const DataInput: React.FC<DataInputProps> = ({ data, onDataChange }) => {
  const handleAddPoint = () => {
    onDataChange([...data, { x: 0, y: 0 }]);
  };

  const handleRemovePoint = (index: number) => {
    onDataChange(data.filter((_, i) => i !== index));
  };

  const handlePointChange = (index: number, field: 'x' | 'y', value: string) => {
    const newData = [...data];
    newData[index] = {
      ...newData[index],
      [field]: parseFloat(value) || 0
    };
    onDataChange(newData);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Data Points</h2>
      <div className="space-y-2">
        {data.map((point, index) => (
          <div key={index} className="flex items-center space-x-4">
            <input
              type="number"
              value={point.x}
              onChange={(e) => handlePointChange(index, 'x', e.target.value)}
              className="w-24 px-2 py-1 border rounded"
              placeholder="X"
            />
            <input
              type="number"
              value={point.y}
              onChange={(e) => handlePointChange(index, 'y', e.target.value)}
              className="w-24 px-2 py-1 border rounded"
              placeholder="Y"
            />
            <button
              onClick={() => handleRemovePoint(index)}
              className="px-2 py-1 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddPoint}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Point
      </button>
    </div>
  );
}; 