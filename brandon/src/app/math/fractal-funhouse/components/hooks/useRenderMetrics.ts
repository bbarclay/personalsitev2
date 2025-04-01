'use client';

import { useRef } from 'react';
import { RenderMetrics } from '../types/renderStats';

export const useRenderMetrics = () => {
  const metricsRef = useRef<RenderMetrics>({
    frameTime: [],
    memoryUsage: [],
    fps: [],
    renderTimes: [],
    timestamp: [],
    frameCount: 0
  });

  const recordFrame = (renderTime: number, fps: number) => {
    metricsRef.current.frameCount += 1;
    metricsRef.current.renderTimes.push(renderTime);
    metricsRef.current.fps.push(fps);
    metricsRef.current.memoryUsage.push(0);
    metricsRef.current.timestamp.push(Date.now());
  };

  const getMetrics = (): RenderMetrics => {
    return metricsRef.current;
  };

  return { recordFrame, getMetrics };
};
