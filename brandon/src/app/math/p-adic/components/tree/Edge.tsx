import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { Line } from '@react-three/drei';

interface EdgeProps {
  start: Vector3;
  end: Vector3;
  color?: string;
}

const Edge: React.FC<EdgeProps> = ({ start, end, color = '#333' }) => {
  const points = useMemo(() => [
    new Vector3(start.x, start.y, start.z),
    new Vector3(end.x, end.y, end.z)
  ], [start, end]);

  return (
    <Line
      points={points}
      color={color}
      lineWidth={1.5}
    />
  );
};

export default Edge;