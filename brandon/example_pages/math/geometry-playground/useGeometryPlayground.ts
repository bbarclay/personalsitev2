import { useState } from 'react';

export const useGeometryPlayground = () => {
  const [selectedShape, setSelectedShape] = useState('circle');
  const [shapeProperties, setShapeProperties] = useState({
    size: 100,
    width: 160,
    height: 80,
    rotation: 0,
    color: '#4CAF50',
  });
  const [transformations, setTransformations] = useState({
    translateX: 0,
    translateY: 0,
    scale: 1,
    rotate: 0,
  });
  const [error, setError] = useState<string | null>(null);

  const handleTransform = (type: string) => {
    setError(null);
    try {
      if (type === 'reset') {
        setTransformations({
          translateX: 0,
          translateY: 0,
          scale: 1,
          rotate: 0,
        });
      } else if (type === 'apply') {
        // Apply transformations to shape properties
        setShapeProperties((prev) => ({
          ...prev,
          rotation: (prev.rotation + transformations.rotate) % 360,
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return {
    selectedShape,
    setSelectedShape,
    shapeProperties,
    setShapeProperties,
    transformations,
    setTransformations,
    error,
    handleTransform,
  };
};
