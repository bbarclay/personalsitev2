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
  Gamepad2,
  Presentation
} from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  link: string;
  type: 'article' | 'video' | 'paper' | 'book' | 'code' | 'course' | 'tool' | 'game';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const ResourcesComponent: React.FC = () => {
  const resources: Resource[] = [
    // Academic Papers
    {
      title: "The Psychology of Chance-Based Game Rewards",
      description: "Academic paper exploring the psychological mechanisms behind bonus games and their impact on player behavior.",
      link: "https://www.researchgate.net/publication/324476823_Reward_systems_in_video_games_from_a_self-determination_theory_perspective",
      type: "paper",
      tags: ["psychology", "game design", "player behavior"],
      difficulty: "advanced"
    },
    {
      title: "Variable Ratio Reinforcement Schedules in Gamification",
      description: "Research paper examining how variable reward schedules in bonus games affect engagement and motivation.",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0747563216304642",
      type: "paper",
      tags: ["reinforcement", "gamification", "engagement"],
      difficulty: "advanced"
    },
    {
      title: "The Mathematics of Gambling: Bonus Game Design",
      description: "Technical paper on the mathematical principles behind casino bonus game design and expected value calculations.",
      link: "https://www.unlv.edu/news/article/mathematics-gambling",
      type: "paper",
      tags: ["mathematics", "probability", "game theory"],
      difficulty: "advanced"
    },
    
    // Books
    {
      title: "Game Mechanics: Advanced Game Design",
      description: "Comprehensive book covering various game mechanics including bonus systems and their implementation.",
      link: "https://www.amazon.com/Game-Mechanics-Advanced-Design-Voices/dp/0321820274",
      type: "book",
      tags: ["game design", "mechanics", "implementation"],
      difficulty: "intermediate"
    },
    {
      title: "Hooked: How to Build Habit-Forming Products",
      description: "Book exploring how variable rewards and bonus mechanics create engaging product experiences.",
      link: "https://www.nirandfar.com/hooked/",
      type: "book",
      tags: ["product design", "psychology", "engagement"],
      difficulty: "beginner"
    },
    {
      title: "The Art of Game Design: A Book of Lenses",
      description: "Classic game design book with sections on reward systems and bonus mechanics.",
      link: "https://www.schellgames.com/art-of-game-design/",
      type: "book",
      tags: ["game design", "theory", "principles"],
      difficulty: "intermediate"
    },
    
    // Videos
    {
      title: "The Psychology of Rewards in Game Design",
      description: "GDC talk exploring how bonus games and reward systems affect player psychology and engagement.",
      link: "https://www.youtube.com/watch?v=Fy0aCDmgnxg",
      type: "video",
      tags: ["game design", "psychology", "GDC"],
      difficulty: "intermediate"
    },
    {
      title: "Slot Machine Bonus Game Mathematics Explained",
      description: "Educational video breaking down the mathematics behind casino bonus games and their design.",
      link: "https://www.youtube.com/watch?v=7cjIWMUgPtY",
      type: "video",
      tags: ["mathematics", "casino", "probability"],
      difficulty: "intermediate"
    },
    {
      title: "How Game Rewards Shape Player Behavior",
      description: "Video essay analyzing how different bonus and reward structures influence how players interact with games.",
      link: "https://www.youtube.com/watch?v=1ypOUn6rThM",
      type: "video",
      tags: ["player behavior", "game design", "psychology"],
      difficulty: "beginner"
    },
    
    // Articles
    {
      title: "The Science of Gamification: Why Bonus Features Work",
      description: "Article exploring the scientific principles behind effective bonus game design.",
      link: "https://www.gamedeveloper.com/design/the-psychology-of-gamification-why-rewards-matter",
      type: "article",
      tags: ["gamification", "psychology", "design"],
      difficulty: "beginner"
    },
    {
      title: "Designing Effective Bonus Systems for Player Retention",
      description: "Industry article on how to design bonus features that maximize player retention and engagement.",
      link: "https://www.gamasutra.com/blogs/category/design/",
      type: "article",
      tags: ["retention", "engagement", "design"],
      difficulty: "intermediate"
    },
    {
      title: "The Ethics of Variable Reward Systems in Games",
      description: "Critical analysis of the ethical considerations in designing bonus and reward mechanics.",
      link: "https://www.polygon.com/features/ethics-in-game-design",
      type: "article",
      tags: ["ethics", "design", "responsibility"],
      difficulty: "intermediate"
    },
    
    // Code Repositories
    {
      title: "Bonus Game Framework",
      description: "Open-source framework for implementing various types of bonus game mechanics in web and mobile applications.",
      link: "https://github.com/topics/game-mechanics",
      type: "code",
      tags: ["framework", "implementation", "open-source"],
      difficulty: "intermediate"
    },
    {
      title: "Reward System Simulator",
      description: "Simulation tool for testing different bonus game configurations and analyzing their mathematical properties.",
      link: "https://github.com/topics/reward-systems",
      type: "code",
      tags: ["simulation", "analysis", "testing"],
      difficulty: "advanced"
    },
    {
      title: "Game Mechanics Library",
      description: "Collection of reusable components for implementing common bonus game patterns in various programming languages.",
      link: "https://github.com/topics/game-mechanics-library",
      type: "code",
      tags: ["library", "components", "implementation"],
      difficulty: "intermediate"
    },
    
    // Courses
    {
      title: "Game Reward Systems: Design and Implementation",
      description: "Online course covering the theory and practice of designing effective bonus and reward systems in games.",
      link: "https://www.udemy.com/course/game-reward-systems/",
      type: "course",
      tags: ["game design", "implementation", "theory"],
      difficulty: "intermediate"
    },
    {
      title: "The Mathematics of Casino Games",
      description: "Course exploring the mathematical principles behind casino games, including bonus feature design.",
      link: "https://www.coursera.org/learn/mathematics-of-games",
      type: "course",
      tags: ["mathematics", "probability", "casino"],
      difficulty: "advanced"
    },
    {
      title: "Gamification: Beyond Points and Badges",
      description: "Course on advanced gamification techniques, including sophisticated bonus systems for non-game applications.",
      link: "https://www.edx.org/course/gamification",
      type: "course",
      tags: ["gamification", "design", "applications"],
      difficulty: "intermediate"
    },
    
    // Games with Notable Bonus Features
    {
      title: "Peggle",
      description: "Classic casual game with exceptionally well-designed bonus systems that create memorable moments.",
      link: "https://www.ea.com/games/peggle",
      type: "game",
      tags: ["casual", "exemplary", "accessible"],
      difficulty: "beginner"
    },
    {
      title: "Hades",
      description: "Award-winning roguelike with an innovative bonus and progression system that maintains engagement.",
      link: "https://www.supergiantgames.com/games/hades/",
      type: "game",
      tags: ["roguelike", "progression", "narrative"],
      difficulty: "intermediate"
    },
    {
      title: "Candy Crush Saga",
      description: "Mobile phenomenon with meticulously designed bonus features that drive long-term engagement.",
      link: "https://candycrushsaga.com/",
      type: "game",
      tags: ["mobile", "casual", "free-to-play"],
      difficulty: "beginner"
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
      case 'game':
        return <Gamepad2 className="h-5 w-5" />;
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
      case 'game':
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

  const papers = resources.filter(r => r.type === 'paper');
  const books = resources.filter(r => r.type === 'book');
  const videos = resources.filter(r => r.type === 'video');
  const articles = resources.filter(r => r.type === 'article');
  const code = resources.filter(r => r.type === 'code');
  const courses = resources.filter(r => r.type === 'course');
  const games = resources.filter(r => r.type === 'game');

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Bonus Game Resources</CardTitle>
          <CardDescription className="text-lg">
            Materials to help you understand and implement bonus game mechanics
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
          <TabsTrigger value="practical" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Practical</span>
          </TabsTrigger>
          <TabsTrigger value="examples" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <span>Examples</span>
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
              <h3 className="text-xl font-semibold mb-4">Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="practical">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Code Repositories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {code.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videos.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Games with Notable Bonus Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {games.map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Studying successful implementations of bonus game mechanics can provide valuable insights:
                </p>
                
                <h3>Slot Machine Evolution</h3>
                <p>
                  The evolution of slot machines from simple mechanical devices to complex digital experiences 
                  showcases the increasing sophistication of bonus game design. Modern slots often feature 
                  multi-stage bonus games with narrative elements, skill components, and progressive rewards.
                </p>
                
                <h3>Free-to-Play Mobile Games</h3>
                <p>
                  Games like Candy Crush Saga and Clash of Clans demonstrate how carefully designed bonus 
                  systems can drive both engagement and monetization. These games use a combination of 
                  scheduled rewards, achievement bonuses, and special events to maintain player interest.
                </p>
                
                <h3>Loyalty Programs</h3>
                <p>
                  Programs like airline frequent flyer miles and credit card rewards demonstrate how bonus 
                  game principles can be applied outside traditional gaming contexts. These systems use 
                  tiered rewards, special promotions, and status benefits to drive customer loyalty.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            When implementing bonus game mechanics, consider these best practices:
          </p>
          
          <h3>Design Principles</h3>
          <ul>
            <li><strong>Clear Rules:</strong> Ensure players understand how to trigger and interact with bonus features</li>
            <li><strong>Meaningful Choices:</strong> When appropriate, give players decisions that affect outcomes</li>
            <li><strong>Appropriate Difficulty:</strong> Balance challenge to create engagement without frustration</li>
            <li><strong>Varied Experiences:</strong> Include different types of bonus features to maintain interest</li>
            <li><strong>Thematic Integration:</strong> Connect bonus mechanics to the overall theme and narrative</li>
          </ul>
          
          <h3>Technical Considerations</h3>
          <ul>
            <li><strong>Robust Random Number Generation:</strong> Use high-quality RNG systems for fair outcomes</li>
            <li><strong>State Management:</strong> Carefully track and persist bonus game states to prevent issues</li>
            <li><strong>Performance Optimization:</strong> Ensure bonus features run smoothly on target platforms</li>
            <li><strong>Analytics Integration:</strong> Implement tracking to measure effectiveness and player behavior</li>
            <li><strong>Accessibility:</strong> Design bonus features to be accessible to players with different abilities</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Further Learning</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            To deepen your understanding of bonus game mechanics, consider exploring these related fields:
          </p>
          
          <ul>
            <li>
              <strong>Behavioral Economics:</strong> Study how people make decisions and respond to incentives, 
              which directly informs effective bonus game design.
            </li>
            <li>
              <strong>Game Theory:</strong> Understand strategic decision-making and how it applies to 
              designing engaging choice-based bonus features.
            </li>
            <li>
              <strong>UX Design:</strong> Learn principles of user experience design to create bonus 
              features that are intuitive and satisfying to interact with.
            </li>
            <li>
              <strong>Probability and Statistics:</strong> Develop a strong foundation in the mathematical 
              principles that underlie random-based bonus systems.
            </li>
            <li>
              <strong>Narrative Design:</strong> Explore how to integrate bonus features into compelling 
              stories and thematic elements.
            </li>
          </ul>
          
          <p>
            By combining insights from these fields with the specific resources listed above, you can 
            develop a comprehensive understanding of bonus game mechanics and their effective implementation.
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
