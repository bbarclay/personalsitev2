import React from 'react';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface HistoricalEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  significance: 'high' | 'medium' | 'low';
  category: 'discovery' | 'proof' | 'computation' | 'visualization' | 'theory';
}

export function HistoryPanel() {
  // Mock data - replace with actual historical data
  const events: HistoricalEvent[] = [
    {
      id: '1',
      year: '1937',
      title: 'Initial Discovery',
      description: 'Lothar Collatz first proposed the conjecture while studying number theory at the University of Hamburg.',
      significance: 'high',
      category: 'discovery'
    },
    {
      id: '2',
      year: '1972',
      title: 'First Computer Verification',
      description: 'The conjecture was verified for all numbers up to 2^20 using early computer technology.',
      significance: 'medium',
      category: 'computation'
    },
    {
      id: '3',
      year: '1985',
      title: 'Visualization Breakthrough',
      description: 'Development of the first interactive visualizations of the sequence patterns.',
      significance: 'medium',
      category: 'visualization'
    },
    {
      id: '4',
      year: '2011',
      title: 'Extended Verification',
      description: 'The conjecture was verified for all numbers up to 2^60, significantly expanding the range of tested values.',
      significance: 'high',
      category: 'computation'
    },
    {
      id: '5',
      year: '2019',
      title: 'Machine Learning Analysis',
      description: 'Application of machine learning techniques to identify patterns in sequence behavior.',
      significance: 'medium',
      category: 'analysis'
    }
  ];

  const getSignificanceColor = (significance: HistoricalEvent['significance']) => {
    switch (significance) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: HistoricalEvent['category']) => {
    switch (category) {
      case 'discovery':
        return '🔍';
      case 'proof':
        return '📝';
      case 'computation':
        return '💻';
      case 'visualization':
        return '📊';
      case 'theory':
        return '🧮';
      default:
        return '📚';
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Historical Timeline</h2>
          <Badge variant="outline">
            {events.length} Events
          </Badge>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="space-y-6">
            {events.map(event => (
              <div key={event.id} className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary" />
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{event.year}</Badge>
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge className={getSignificanceColor(event.significance)}>
                      {event.significance}
                    </Badge>
                    <Badge variant="outline">
                      {getCategoryIcon(event.category)} {event.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="pt-4 border-t">
          <div className="space-y-2">
            <h3 className="font-medium">About the Timeline</h3>
            <p className="text-sm text-muted-foreground">
              This timeline shows key events in the history of the Collatz Conjecture, from its initial discovery 
              to modern computational and theoretical developments. Each event is categorized by type and significance 
              to help understand its impact on the field.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
} 