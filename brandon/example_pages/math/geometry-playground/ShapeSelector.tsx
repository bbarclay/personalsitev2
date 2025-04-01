import React from 'react';
import { Button } from '@components/ui/button';

interface ShapeSelectorProps {
  selectedShape: string;
  setSelectedShape: (shape: string) => void;
}

const ShapeSelector: React.FC<ShapeSelectorProps> = ({
  selectedShape,
  setSelectedShape,
}) => {
  const shapes = [
    { id: 'circle', label: 'Circle' },
    { id: 'square', label: 'Square' },
    { id: 'triangle', label: 'Triangle' },
    { id: 'rectangle', label: 'Rectangle' },
    { id: 'pentagon', label: 'Pentagon' },
    { id: 'hexagon', label: 'Hexagon' },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      {shapes.map((shape) => (
        <Button
          key={shape.id}
          variant={selectedShape === shape.id ? 'default' : 'outline'}
          onClick={() => setSelectedShape(shape.id)}
          className="glass-button"
        >
          {shape.label}
        </Button>
      ))}
    </div>
  );
};

export default ShapeSelector;
