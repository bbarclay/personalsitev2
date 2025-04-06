import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Video, 
  Code, 
  FileText, 
  GraduationCap,
  ExternalLink,
  Github,
  Youtube,
  Library,
  Newspaper,
  Presentation,
  Podcast
} from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  link: string;
  type: 'article' | 'video' | 'paper' | 'book' | 'code' | 'course' | 'tool' | 'podcast';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const ResourcesComponent: React.FC = () => {
  const resources: Resource[] = [
    // Academic Papers
    {
      title: "The 3x+1 Problem: An Overview",
      description: "Comprehensive survey paper by Jeffrey Lagarias covering the history, results, and approaches to the Collatz conjecture.",
      link: "https://www.ams.org/journals/notices/201011/rtx101101385p.pdf",
      type: "paper",
      tags: ["survey", "mathematics", "number theory"],
      difficulty: "advanced"
    },
    {
      title: "On the 3x+1 Problem",
      description: "Technical paper by Günther J. Wirsching exploring the structure of trajectories in the Collatz problem.",
      link: "https://www.sciencedirect.com/science/article/pii/0022314X9390025C",
      type: "paper",
      tags: ["mathematics", "number theory", "trajectories"],
      difficulty: "advanced"
    },
    {
      title: "Almost All Orbits of the Collatz Map Attain Almost Bounded Values",
      description: "Groundbreaking 2019 paper by Terence Tao showing that the Collatz conjecture is 'almost always' true.",
      link: "https://arxiv.org/abs/1909.03562",
      type: "paper",
      tags: ["mathematics", "breakthrough", "Terence Tao"],
      difficulty: "advanced"
    },
    
    // Books
    {
      title: "The Ultimate Challenge: The 3x+1 Problem",
      description: "Edited collection of research papers on the Collatz conjecture, covering various approaches and related problems.",
      link: "https://www.springer.com/gp/book/9780821849408",
      type: "book",
      tags: ["research collection", "comprehensive", "mathematics"],
      difficulty: "advanced"
    },
    {
      title: "Exploring the 3x+1 Problem",
      description: "Accessible introduction to the Collatz conjecture for undergraduate students and mathematics enthusiasts.",
      link: "https://bookstore.ams.org/stml-89/",
      type: "book",
      tags: ["introduction", "undergraduate", "accessible"],
      difficulty: "intermediate"
    },
    
    // Videos
    {
      title: "The Simplest Math Problem No One Can Solve - Collatz Conjecture",
      description: "Engaging Veritasium video explaining the Collatz conjecture and why it's so difficult to solve.",
      link: "https://www.youtube.com/watch?v=094y1Z2wpJg",
      type: "video",
      tags: ["introduction", "visualization", "popular science"],
      difficulty: "beginner"
    },
    {
      title: "Visualizing the Collatz Conjecture",
      description: "Beautiful visualization of patterns in the Collatz conjecture by 3Blue1Brown.",
      link: "https://www.youtube.com/watch?v=LqKpkdRRLZw",
      type: "video",
      tags: ["visualization", "patterns", "mathematics"],
      difficulty: "intermediate"
    },
    {
      title: "The Collatz Conjecture in Color",
      description: "Numberphile video showing colorful visualizations of the Collatz conjecture.",
      link: "https://www.youtube.com/watch?v=LqKpkdRRLZw",
      type: "video",
      tags: ["visualization", "numberphile", "accessible"],
      difficulty: "beginner"
    },
    
    // Articles
    {
      title: "The Collatz Conjecture: A Case Study in Mathematical Problem Solving",
      description: "Quanta Magazine article exploring the history and significance of the Collatz conjecture.",
      link: "https://www.quantamagazine.org/mathematician-terence-tao-and-the-collatz-conjecture-20191211/",
      type: "article",
      tags: ["popular science", "history", "Terence Tao"],
      difficulty: "beginner"
    },
    {
      title: "Collatz Conjecture: The Problem That Haunts Mathematics",
      description: "Scientific American article discussing why the Collatz conjecture is so difficult to solve.",
      link: "https://www.scientificamerican.com/article/the-collatz-conjecture-is-a-simple-problem-that-mathematicians-cant-solve/",
      type: "article",
      tags: ["popular science", "mathematics", "complexity"],
      difficulty: "beginner"
    },
    
    // Code Repositories
    {
      title: "Collatz Visualization Tools",
      description: "GitHub repository with various tools for visualizing and exploring the Collatz conjecture.",
      link: "https://github.com/topics/collatz-conjecture",
      type: "code",
      tags: ["visualization", "open source", "tools"],
      difficulty: "intermediate"
    },
    {
      title: "High-Performance Collatz Calculator",
      description: "Optimized C++ implementation for calculating and analyzing Collatz sequences for very large numbers.",
      link: "https://github.com/xbarin02/collatz",
      type: "code",
      tags: ["high performance", "C++", "optimization"],
      difficulty: "advanced"
    },
    
    // Courses
    {
      title: "Discrete Mathematics and Its Applications",
      description: "University course covering the Collatz conjecture as part of a broader curriculum on discrete mathematics.",
      link: "https://www.coursera.org/learn/discrete-mathematics",
      type: "course",
      tags: ["university", "discrete mathematics", "formal"],
      difficulty: "intermediate"
    },
    {
      title: "Computational Thinking in Mathematics",
      description: "Online course exploring how computational approaches can be used to investigate mathematical problems like the Collatz conjecture.",
      link: "https://www.edx.org/course/computational-thinking-in-mathematics",
      type: "course",
      tags: ["computational", "interactive", "problem solving"],
      difficulty: "intermediate"
    },
    
    // Tools
    {
      title: "Collatz Explorer",
      description: "Interactive web tool for exploring and visualizing Collatz sequences with various starting numbers.",
      link: "https://www.jasondavies.com/collatz-graph/",
      type: "tool",
      tags: ["interactive", "visualization", "web-based"],
      difficulty: "beginner"
    },
    {
      title: "Collatz Conjecture Playground",
      description: "Interactive sandbox for experimenting with variations of the Collatz conjecture and visualizing results.",
      link: "https://demonstrations.wolfram.com/CollatzProblem/",
      type: "tool",
      tags: ["wolfram", "interactive", "variations"],
      difficulty: "intermediate"
    },
    
    // Podcasts
    {
      title: "The Collatz Conjecture - My Favorite Theorem",
      description: "Podcast episode discussing why mathematicians find the Collatz conjecture so fascinating.",
      link: "https://kpknudson.com/my-favorite-theorem/2018/3/15/episode-21-ben-orlin",
      type: "podcast",
      tags: ["discussion", "mathematics", "accessible"],
      difficulty: "beginner"
    },
    {
      title: "The Collatz Conjecture - Numberphile Podcast",
      description: "In-depth discussion with mathematicians about the Collatz conjecture and approaches to solving it.",
      link: "https://www.numberphile.com/podcast/collatz-conjecture",
      type: "podcast",
      tags: ["interview", "numberphile", "research"],
      difficulty: "intermediate"
    }
  ];

  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <Newspaper className="h-5 w-5" />;
      case 'video':
        return <Youtube className="h-5 w-5" />;
      case 'paper':
        return <FileText className="h-5 w-5" />;
      case 'book':
        return <BookOpen className="h-5 w-5" />;
      case 'code':
        return <Github className="h-5 w-5" />;
      case 'course':
        return <GraduationCap className="h-5 w-5" />;
      case 'tool':
        return <Code className="h-5 w-5" />;
      case 'podcast':
        return <Podcast className="h-5 w-5" />;
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
      case 'tool':
        return "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300";
      case 'podcast':
        return "text-pink-600 bg-pink-100 dark:bg-pink-900/30 dark:text-pink-300";
    }
  };

  const getDifficultyColor = (difficulty: Resource['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case 'intermediate':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case 'advanced':
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    }
  };

  const articles = resources.filter(r => r.type === 'article');
  const videos = resources.filter(r => r.type === 'video');
  const papers = resources.filter(r => r.type === 'paper');
  const books = resources.filter(r => r.type === 'book');
  const code = resources.filter(r => r.type === 'code');
  const courses = resources.filter(r => r.type === 'course');
  const tools = resources.filter(r => r.type === 'tool');
  const podcasts = resources.filter(r => r.type === 'podcast');

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Learning Resources</CardTitle>
          <CardDescription className="text-lg">
            Explore these resources to deepen your understanding of the Collatz conjecture
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Library className="h-4 w-4" />
            <span>All Resources</span>
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Academic</span>
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span>Media</span>
          </TabsTrigger>
          <TabsTrigger value="interactive" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Interactive</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Academic Papers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {papers.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Books</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {books.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Podcasts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {podcasts.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="interactive">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Code Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {code.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Interactive Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
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
      
      <Card>
        <CardHeader>
          <CardTitle>Community & Collaboration</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Join the community of mathematicians, computer scientists, and enthusiasts exploring the Collatz conjecture:
          </p>
          
          <ul>
            <li><strong>Online Forums:</strong> Participate in discussions on <a href="https://math.stackexchange.com/questions/tagged/collatz-conjecture" target="_blank" rel="noopener noreferrer">Math Stack Exchange</a> and <a href="https://mathoverflow.net/questions/tagged/collatz" target="_blank" rel="noopener noreferrer">MathOverflow</a></li>
            <li><strong>Research Groups:</strong> Connect with academic research groups studying the conjecture</li>
            <li><strong>Distributed Computing:</strong> Contribute your computer's processing power to verification efforts</li>
            <li><strong>Open Source Projects:</strong> Contribute to visualization tools and computational frameworks</li>
          </ul>
          
          <p>
            By collaborating with others, you can contribute to our collective understanding of this enduring mathematical mystery.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  return (
    <Card key={resource.title} className="border hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${getColor(resource.type)}`}>
              {getIcon(resource.type)}
            </div>
            <CardTitle className="text-base">{resource.title}</CardTitle>
          </div>
          <Badge className={getDifficultyColor(resource.difficulty)}>
            {resource.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {resource.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {resource.tags.map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
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
  );
};

export default ResourcesComponent;
