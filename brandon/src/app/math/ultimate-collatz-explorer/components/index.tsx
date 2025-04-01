'use client';

import React, { useState, useEffect } from 'react';
import { CollatzContextProvider } from './context/CollatzContext';
import ControlPanel from './components/ControlPanel';
import VisualizationDashboard from './components/VisualizationDashboard';
import AnalysisPanel from './components/AnalysisPanel';
import TheoremExplainer from './components/TheoremExplainer';
import ComparativeView from './components/ComparativeView';
import CustomRules from './components/CustomRules';
import SharePanel from './components/SharePanel';
import ViewControls from './components/ViewControls';

import './styles/collatz-explorer.css';

const UltimateCollatzExplorer: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activePanels, setActivePanels] = useState({
    analysis: true,
    theorems: false,
    comparison: false,
    customRules: false,
    share: false,
  });

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const togglePanel = (panel: string) => {
    setActivePanels(prev => ({
      ...prev,
      [panel]: !prev[panel as keyof typeof prev]
    }));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CollatzContextProvider>
      <div className="cosmic-container">
        <div className={`cosmic-layout ${Object.values(activePanels).filter(Boolean).length > 2 ? 'cosmic-multi-panel' : 'cosmic-focused'}`}>
          <div className="cosmic-sidebar">
            <ControlPanel />
          </div>

          <div className="cosmic-main-content">
            <div className="cosmic-top-controls">
              <ViewControls
                activePanels={activePanels}
                togglePanel={togglePanel}
              />
            </div>

            <VisualizationDashboard />

            <div className="cosmic-panels">
              {activePanels.analysis && (
                <AnalysisPanel />
              )}

              {activePanels.theorems && (
                <TheoremExplainer />
              )}

              {activePanels.comparison && (
                <ComparativeView />
              )}

              {activePanels.customRules && (
                <CustomRules />
              )}

              {activePanels.share && (
                <SharePanel />
              )}
            </div>
          </div>
        </div>
      </div>
    </CollatzContextProvider>
  );
};

export default UltimateCollatzExplorer;
