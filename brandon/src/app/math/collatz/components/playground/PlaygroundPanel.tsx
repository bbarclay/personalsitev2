import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GamePanel } from './GamePanel';
import { VisualExplorer } from '../visualizer/VisualExplorer';
import { PatternAnalyzer } from '../analysis/PatternAnalyzer';
import { BatchProcessor } from '../analysis/BatchProcessor';

export function PlaygroundPanel() {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Interactive Playground</h2>
          <Badge variant="outline">
            Explore & Learn
          </Badge>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="mt-4">
            <GamePanel />
          </TabsContent>

          <TabsContent value="visualizer" className="mt-4">
            <VisualExplorer />
          </TabsContent>

          <TabsContent value="analysis" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <PatternAnalyzer />
              <BatchProcessor />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
} 