import React from 'react';
import { InfoPanel } from '../InfoPanel';
import ResourcesPanel from '../ResourcesPanel';
import LinearSolverTabs from '../LinearSolverTabs';

interface ContentSwitcherProps {
  showResources: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ContentSwitcher: React.FC<ContentSwitcherProps> = ({ 
  showResources, 
  activeTab, 
  setActiveTab 
}) => {
  if (showResources) {
    return <ResourcesPanel />;
  }
  
  return (
    <>
      <InfoPanel />
      
      <div className="mt-8">
        <LinearSolverTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </>
  );
};

export default ContentSwitcher; 