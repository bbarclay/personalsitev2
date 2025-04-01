import { useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';

interface LODSettings {
  detailLevel: number;
  particleCount: number;
  shouldRenderGlow: boolean;
}

export const useTreeLOD = (maxDepth: number) => {
  const { gl } = useThree();
  const [lodSettings, setLodSettings] = useState<LODSettings>({
    detailLevel: maxDepth,
    particleCount: 100,
    shouldRenderGlow: true
  });

  useEffect(() => {
    // Check if we're running on a high-performance device
    const isHighPerformance = gl.capabilities.maxTextureSize >= 8192;
    const isMediumPerformance = gl.capabilities.maxTextureSize >= 4096;

    // Adjust settings based on device capabilities and tree depth
    const newSettings: LODSettings = {
      detailLevel: isHighPerformance ? maxDepth : Math.min(maxDepth, isMediumPerformance ? 4 : 3),
      particleCount: isHighPerformance ? 100 : isMediumPerformance ? 50 : 25,
      shouldRenderGlow: isHighPerformance || isMediumPerformance
    };

    setLodSettings(newSettings);
  }, [maxDepth, gl.capabilities.maxTextureSize]);

  return lodSettings;
};
