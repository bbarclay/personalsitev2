import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ExternalLink, BookOpen, Video, Code, FileText, GraduationCap } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  link: string;
  type: 'article' | 'video' | 'paper' | 'book' | 'code' | 'course';
}

const ResourcesComponent: React.FC = () => {
  const resources: Resource[] = [
    {
      title: "The Collatz Conjecture: A Brief Overview",
      description: "A comprehensive introduction to the Collatz conjecture, its history, and current research status.",
      link: "https://en.wikipedia.org/wiki/Collatz_conjecture",
      type: "article"
    },
    {
      title: "Visualizing the Collatz Conjecture",
      description: "An interactive visualization exploring patterns in the Collatz sequences.",
      link: "https://www.youtube.com/watch?v=094y1Z2wpJg",
      type: "video"
    },
    {
      title: "The 3x+1 Problem: An Overview",
      description: "Academic paper by Jeffrey Lagarias summarizing research on the Collatz conjecture.",
      link: "https://www.ams.org/journals/notices/201011/rtx101101385p.pdf",
      type: "paper"
    },
    {
      title: "The Ultimate Challenge: The 3x+1 Problem",
      description: "Edited collection of research papers on the Collatz conjecture and related problems.",
      link: "https://www.springer.com/gp/book/9780821849408",
      type: "book"
    },
    {
      title: "Collatz Conjecture Visualization GitHub Repository",
      description: "Open-source code for visualizing and analyzing Collatz sequences.",
      link: "https://github.com/topics/collatz-conjecture",
      type: "code"
    },
    {
      title: "Computational Complexity and the Collatz Problem",
      description: "Online course exploring the computational aspects of the Collatz conjecture.",
      link: "https://www.coursera.org/learn/computational-thinking-problem-solving",
      type: "course"
    },
  ];

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'paper':
        return <FileText className="h-5 w-5" />;
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'code':
        return <Code className="h-5 w-5" />;
      case 'course':
        return <GraduationCap className="h-5 w-5" />;
    }
  };

  const getColor = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300";
      case 'video':
        return "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300";
      case 'paper':
        return "text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300";
      case 'book':
        return "text-amber-600 bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300";
      case 'code':
        return "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300";
      case 'course':
        return "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/30 dark:text-cyan-300";
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
          <CardDescription>
            Explore these resources to deepen your understanding of the Collatz conjecture and related topics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-full ${getColor(resource.type)}`}>
                        {getIcon(resource.type)}
                      </div>
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {resource.description}
                  </p>
                  <a 
                    href={resource.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Visit Resource <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Research Directions</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            If you're interested in exploring the Collatz conjecture further, here are some active research directions:
          </p>
          
          <ul>
            <li><strong>Probabilistic Approaches:</strong> Studying the statistical behavior of Collatz sequences</li>
            <li><strong>Generalizations:</strong> Exploring variants of the conjecture with different multipliers and constants</li>
            <li><strong>Computational Verification:</strong> Extending the range of numbers for which the conjecture has been verified</li>
            <li><strong>Structural Analysis:</strong> Investigating patterns in the directed graph formed by Collatz sequences</li>
            <li><strong>Connection to Other Problems:</strong> Finding relationships between the Collatz conjecture and other open problems in mathematics</li>
          </ul>
          
          <p>
            The interactive tools provided here can help you visualize and explore these aspects of the conjecture,
            potentially leading to new insights or approaches to this fascinating mathematical problem.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesComponent;
