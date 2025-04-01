'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Matrix } from '@/components/math/utils/mathUtils';
import { 
  BaseVisualizer, 
  ControlPanel, 
  VisualizationPanel, 
  MetricsPanel, 
  MetricCard,
  VisualizerState 
} from '@/components/math/BaseVisualizer';

// Create default export component
const IndexComponent: React.FC = () => {
  const [state, setState] = useState<VisualizerState>({
    matrix: null,
    step: 0,
    isProcessing: false,
    error: null,
    result: null
  });

  return (
    <BaseVisualizer 
      title="Base Number System Visualizer" 
      description="Visualize and convert between different number bases"
      reference="Number system conversions are fundamental in computer science and mathematics."
    >
      <ControlPanel>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Future controls will appear here</label>
          </div>
        </div>
      </ControlPanel>
      
      <VisualizationPanel>
        <div className="h-64 flex items-center justify-center bg-gray-800 rounded">
          <p className="text-gray-400">Base number visualization coming soon</p>
        </div>
      </VisualizationPanel>
      
      <MetricsPanel>
        <MetricCard label="Base" value="10" />
        <MetricCard label="Digits" value="0" />
        <MetricCard label="Value" value="0" />
      </MetricsPanel>
    </BaseVisualizer>
  );
};

export default IndexComponent;
