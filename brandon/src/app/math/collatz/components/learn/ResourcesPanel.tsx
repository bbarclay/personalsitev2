import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'paper' | 'tutorial' | 'code';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  url: string;
  author?: string;
  year?: string;
}

export function ResourcesPanel() {
  // Mock data - replace with actual resources
  const resources: Resource[] = [
    {
      id: '1',
      title: 'Introduction to the Collatz Conjecture',
      description: 'A beginner-friendly explanation of the conjecture and its basic properties.',
      type: 'article',
      difficulty: 'beginner',
      url: 'https://example.com/intro-collatz',
      author: 'Dr. Jane Smith'
    },
    {
      id: '2',
      title: 'Visualizing the Collatz Sequence',
      description: 'Interactive tutorial on creating visualizations of the sequence.',
      type: 'tutorial',
      difficulty: 'intermediate',
      url: 'https://example.com/visualization-tutorial'
    },
    {
      id: '3',
      title: 'Recent Advances in Collatz Research',
      description: 'Academic paper discussing recent developments and approaches.',
      type: 'paper',
      difficulty: 'advanced',
      url: 'https://example.com/recent-advances',
      author: 'Prof. John Doe',
      year: '2023'
    },
    {
      id: '4',
      title: 'Collatz Sequence Implementation',
      description: 'Code examples and implementations in various programming languages.',
      type: 'code',
      difficulty: 'intermediate',
      url: 'https://example.com/code-examples'
    },
    {
      id: '5',
      title: 'The Beauty of the Collatz Conjecture',
      description: 'Video lecture explaining the mathematical beauty and significance.',
      type: 'video',
      difficulty: 'beginner',
      url: 'https://example.com/beauty-collatz'
    }
  ];

  const getTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return '📄';
      case 'video':
        return '🎥';
      case 'paper':
        return '📚';
      case 'tutorial':
        return '📝';
      case 'code':
        return '💻';
      default:
        return '📖';
    }
  };

  const getDifficultyColor = (difficulty: Resource['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/40 text-gray-600 dark:text-gray-300';
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Learning Resources</h2>
          <Badge variant="outline">
            {resources.length} Resources
          </Badge>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="beginner">Beginner</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {resources.map(resource => (
                  <Card key={resource.id} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span>{getTypeIcon(resource.type)}</span>
                        <h3 className="font-medium">{resource.title}</h3>
                        <Badge className={getDifficultyColor(resource.difficulty)}>
                          {resource.difficulty}
                        </Badge>
                        <Badge variant="outline">{resource.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          {resource.author && (
                            <>
                              <span>By {resource.author}</span>
                              <span>•</span>
                            </>
                          )}
                          {resource.year && <span>{resource.year}</span>}
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            View Resource
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="beginner" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {resources
                  .filter(resource => resource.difficulty === 'beginner')
                  .map(resource => (
                    <Card key={resource.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span>{getTypeIcon(resource.type)}</span>
                          <h3 className="font-medium">{resource.title}</h3>
                          <Badge className={getDifficultyColor(resource.difficulty)}>
                            {resource.difficulty}
                          </Badge>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {resource.author && (
                              <>
                                <span>By {resource.author}</span>
                                <span>•</span>
                              </>
                            )}
                            {resource.year && <span>{resource.year}</span>}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              View Resource
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="intermediate" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {resources
                  .filter(resource => resource.difficulty === 'intermediate')
                  .map(resource => (
                    <Card key={resource.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span>{getTypeIcon(resource.type)}</span>
                          <h3 className="font-medium">{resource.title}</h3>
                          <Badge className={getDifficultyColor(resource.difficulty)}>
                            {resource.difficulty}
                          </Badge>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {resource.author && (
                              <>
                                <span>By {resource.author}</span>
                                <span>•</span>
                              </>
                            )}
                            {resource.year && <span>{resource.year}</span>}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              View Resource
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {resources
                  .filter(resource => resource.difficulty === 'advanced')
                  .map(resource => (
                    <Card key={resource.id} className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span>{getTypeIcon(resource.type)}</span>
                          <h3 className="font-medium">{resource.title}</h3>
                          <Badge className={getDifficultyColor(resource.difficulty)}>
                            {resource.difficulty}
                          </Badge>
                          <Badge variant="outline">{resource.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            {resource.author && (
                              <>
                                <span>By {resource.author}</span>
                                <span>•</span>
                              </>
                            )}
                            {resource.year && <span>{resource.year}</span>}
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              View Resource
                            </a>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="pt-4 border-t">
          <div className="space-y-2">
            <h3 className="font-medium">About the Resources</h3>
            <p className="text-sm text-muted-foreground">
              These resources provide a comprehensive collection of materials for learning about the Collatz Conjecture. 
              They are organized by difficulty level and type, making it easy to find content that matches your interests 
              and expertise. Each resource includes a description and relevant metadata to help you choose the most 
              appropriate materials for your learning journey.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
} 