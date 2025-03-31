import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolverInterface from './SolverInterface';
import VisualExplanation from './VisualExplanation';
import ApplicationsPanel from './ApplicationsPanel';

/**
 * Props for the LinearSolverTabs component
 */
interface LinearSolverTabsProps {
  /** Currently active tab */
  activeTab: string;
  /** Function to call when tab changes */
  setActiveTab: (tab: string) => void;
}

/**
 * Tabs for the Linear Solver tool
 * Provides navigation between the different sections:
 * - Interactive Solver (main functionality)
 * - Visual Explanation (educational content)
 * - Applications (real-world examples)
 */
const LinearSolverTabs: React.FC<LinearSolverTabsProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="solver" className="text-sm md:text-base">
          Interactive Solver
        </TabsTrigger>
        <TabsTrigger value="explanation" className="text-sm md:text-base">
          Visual Explanation
        </TabsTrigger>
        <TabsTrigger value="applications" className="text-sm md:text-base">
          Applications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="solver" className="mt-4">
        <SolverInterface />
      </TabsContent>
      
      <TabsContent value="explanation" className="mt-4">
        <VisualExplanation />
      </TabsContent>
      
      <TabsContent value="applications" className="mt-4">
        <ApplicationsPanel />
      </TabsContent>
    </Tabs>
  );
};

export default LinearSolverTabs; 