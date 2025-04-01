"use client";

import React, { useState, useEffect } from 'react';
import { ToolPageLayout } from '@/components/layouts/ToolPageLayout';
import { loadToolMeta } from '@/utils/meta-loader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useCollatz } from './hooks/useCollatz';
import { SequenceVisualizer } from './components/visualizer/SequenceVisualizer';
import { PatternAnalyzer } from './components/analysis/PatternAnalyzer';
import { StatisticsPanel } from './components/analysis/StatisticsPanel';
import { BatchAnalyzer } from './components/research/BatchAnalyzer';
import { ConvergenceTester } from './components/research/ConvergenceTester';
import { Optimizer } from './components/research/Optimizer';
import { CommunityPanel } from './components/community/CommunityPanel';
import { TutorialPanel } from './components/learn/TutorialPanel';
import { HistoryPanel } from './components/learn/HistoryPanel';
import { ResourcesPanel } from './components/learn/ResourcesPanel';
import { GamePanel } from './components/playground/GamePanel';
import { ChallengePanel } from './components/playground/ChallengePanel';
import { ExperimentPanel } from './components/playground/ExperimentPanel';
import { PlaygroundPanel } from './components/playground/PlaygroundPanel';
import { VisualExplorer } from './components/visualizer/VisualExplorer';
import { BatchProcessor } from './components/analysis/BatchProcessor';
import metaJson from './meta.json';

// Load metadata with proper defaults
const meta = loadToolMeta(metaJson);

export default function CollatzPage() {
  const [activeTab, setActiveTab] = useState('visual');
  
  const {
    sequence,
    currentStep,
    error,
    calculateSequence,
    handleStepForward,
    handleStepBack,
    handleReset,
    handleRandom,
    statistics
  } = useCollatz();

  return (
    <ToolPageLayout meta={meta}>
      <div className="space-y-6">
        {error && (
          <Card className="p-4 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visual">Visual Explorer</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-6">
            <VisualExplorer />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PatternAnalyzer />
              <BatchProcessor />
            </div>
          </TabsContent>

          <TabsContent value="playground" className="space-y-6">
            <PlaygroundPanel />
          </TabsContent>

          <TabsContent value="learn" className="space-y-6">
            <Tabs defaultValue="tutorial">
              <TabsList className="mb-4">
                <TabsTrigger value="tutorial">Tutorials</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="community">Community</TabsTrigger>
              </TabsList>
              
              <TabsContent value="tutorial">
                <TutorialPanel />
              </TabsContent>
              
              <TabsContent value="history">
                <HistoryPanel />
              </TabsContent>
              
              <TabsContent value="resources">
                <ResourcesPanel />
              </TabsContent>
              
              <TabsContent value="community">
                <CommunityPanel />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>

        <Card className="p-4">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About the Collatz Conjecture</h2>
            <p className="text-muted-foreground">
              The Collatz Conjecture is one of the most famous unsolved problems in mathematics. 
              The problem is simple to state: take any positive integer n. If n is even, divide it by 2. 
              If n is odd, multiply it by 3 and add 1. Repeat the process. The conjecture states that 
              no matter what number you start with, you will always reach 1.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium">Rules</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>If n is even, the next term is n/2</li>
                  <li>If n is odd, the next term is 3n+1</li>
                  <li>Continue until reaching 1</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Historical Context</h3>
                <p className="text-sm text-muted-foreground">
                  First proposed by German mathematician Lothar Collatz in 1937, this problem remains 
                  unsolved despite being deceptively simple to state. It has been verified for all 
                  starting values up to 2^68, but no general proof exists.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </ToolPageLayout>
  );
}