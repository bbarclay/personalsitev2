import React from 'react';
import { Text } from '@react-three/drei';
import { NodeProps } from '../../types/visualization';

export const Node: React.FC<NodeProps> = ({ position, color, label, size }) => {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
      </mesh>
      <Text
        position={[0, size * 1.5, 0]}
        color="white"
        fontSize={size * 3}
        anchorX="center"
        anchorY="middle"
      >
        {label.toString()}
      </Text>
    </group>
  );
};
