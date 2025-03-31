import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Color } from 'three';
import { vertexShader, fragmentShader } from '../../shaders/glowShader';

interface GlowMeshProps {
  color?: string;
  intensity?: number;
  position?: [number, number, number];
  radius?: number;
}

export const GlowMesh: React.FC<GlowMeshProps> = ({
  color = '#4CAF50',
  intensity = 1.0,
  position = [0, 0, 0],
  radius = 1
}) => {
  const materialRef = useRef<ShaderMaterial>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = time.current;
    }
  });

  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          color: { value: new Color(color) },
          time: { value: 0 },
          intensity: { value: intensity }
        }}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
};
