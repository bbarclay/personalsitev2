import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Contribution {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  type: 'visualization' | 'analysis' | 'research' | 'optimization';
  status: 'pending' | 'approved' | 'rejected';
}

interface Discussion {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  replies: number;
  views: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
}

export function CommunityPanel() {
  const [activeTab, setActiveTab] = useState('contributions');
  const [newContribution, setNewContribution] = useState({
    title: '',
    description: '',
    type: 'visualization' as const
  });
  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    content: ''
  });

  // Mock data - replace with actual data from backend
  const contributions: Contribution[] = [
    {
      id: '1',
      title: 'Enhanced Tree Visualization',
      description: 'Added interactive zoom and pan features to the tree visualization',
      author: 'John Doe',
      date: '2024-03-31',
      type: 'visualization',
      status: 'approved'
    },
    {
      id: '2',
      title: 'Pattern Detection Algorithm',
      description: 'Improved pattern detection with machine learning approach',
      author: 'Jane Smith',
      date: '2024-03-30',
      type: 'analysis',
      status: 'pending'
    }
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Convergence Rate Analysis',
      content: 'Has anyone noticed interesting patterns in the convergence rates for specific number ranges?',
      author: 'Alice Johnson',
      date: '2024-03-31',
      replies: 5,
      views: 120
    },
    {
      id: '2',
      title: 'Visualization Improvements',
      content: 'What additional visualization types would be helpful for understanding the sequence?',
      author: 'Bob Wilson',
      date: '2024-03-30',
      replies: 3,
      views: 85
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Sequence Explorer',
      description: 'Explore 100 different sequences',
      icon: '🔍',
      unlocked: true,
      progress: 100
    },
    {
      id: '2',
      title: 'Pattern Master',
      description: 'Identify 50 patterns in sequences',
      icon: '🔮',
      unlocked: false,
      progress: 35
    },
    {
      id: '3',
      title: 'Research Contributor',
      description: 'Contribute 5 research findings',
      icon: '📚',
      unlocked: false,
      progress: 0
    }
  ];

  const getStatusColor = (status: Contribution['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300';
    }
  };

  const getTypeIcon = (type: Contribution['type']) => {
    switch (type) {
      case 'visualization':
        return '📊';
      case 'analysis':
        return '📈';
      case 'research':
        return '🔬';
      case 'optimization':
        return '⚡';
      default:
        return '📝';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="contributions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="contributions" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">New Contribution</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Title"
                  value={newContribution.title}
                  onChange={(e) => setNewContribution(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
                <Textarea
                  placeholder="Description"
                  value={newContribution.description}
                  onChange={(e) => setNewContribution(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
                <div className="flex justify-end">
                  <Button>Submit Contribution</Button>
                </div>
              </div>
            </div>
          </Card>

          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {contributions.map(contribution => (
                <Card key={contribution.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span>{getTypeIcon(contribution.type)}</span>
                        <h4 className="font-medium">{contribution.title}</h4>
                        <Badge className={getStatusColor(contribution.status)}>
                          {contribution.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {contribution.description}
                      </p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>By {contribution.author}</span>
                        <span>•</span>
                        <span>{contribution.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="discussions" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">New Discussion</h3>
              <div className="space-y-2">
                <Input
                  placeholder="Title"
                  value={newDiscussion.title}
                  onChange={(e) => setNewDiscussion(prev => ({
                    ...prev,
                    title: e.target.value
                  }))}
                />
                <Textarea
                  placeholder="Content"
                  value={newDiscussion.content}
                  onChange={(e) => setNewDiscussion(prev => ({
                    ...prev,
                    content: e.target.value
                  }))}
                />
                <div className="flex justify-end">
                  <Button>Start Discussion</Button>
                </div>
              </div>
            </div>
          </Card>

          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {discussions.map(discussion => (
                <Card key={discussion.id} className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">{discussion.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {discussion.content}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <span>By {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.date}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>{discussion.replies} replies</span>
                        <span>{discussion.views} views</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <Card key={achievement.id} className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            achievement.unlocked
                              ? 'bg-green-500'
                              : 'bg-primary'
                          }`}
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <Badge className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
} 