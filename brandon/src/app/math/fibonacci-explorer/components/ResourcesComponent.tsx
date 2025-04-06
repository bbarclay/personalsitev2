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
  Calculator,
  Presentation
} from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  link: string;
  type: 'article' | 'video' | 'paper' | 'book' | 'code' | 'course' | 'tool' | 'interactive';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const ResourcesComponent: React.FC = () => {
  const resources: Resource[] = [
    // Academic Papers
    {
      title: "Fibonacci Numbers and the Golden Section",
      description: "Comprehensive academic paper exploring the mathematical properties of Fibonacci numbers and their relationship to the golden ratio.",
      link: "https://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fib.html",
      type: "paper",
      tags: ["mathematics", "golden ratio", "number theory"],
      difficulty: "intermediate"
    },
    {
      title: "Applications of Fibonacci Numbers in Nature",
      description: "Research paper examining how and why Fibonacci patterns appear in biological systems.",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0096300306015098",
      type: "paper",
      tags: ["biology", "phyllotaxis", "natural patterns"],
      difficulty: "advanced"
    },
    {
      title: "Fibonacci Numbers in Computer Algorithms",
      description: "Technical paper on the use of Fibonacci numbers in algorithm design and analysis.",
      link: "https://www.sciencedirect.com/science/article/abs/pii/S0166218X14005843",
      type: "paper",
      tags: ["algorithms", "computer science", "complexity analysis"],
      difficulty: "advanced"
    },
    
    // Books
    {
      title: "Fibonacci Numbers",
      description: "Classic book by Nikolai N. Vorob'ev covering the mathematical theory of Fibonacci numbers and their applications.",
      link: "https://www.amazon.com/Fibonacci-Numbers-Dover-Books-Mathematics/dp/0486696308",
      type: "book",
      tags: ["mathematics", "number theory", "comprehensive"],
      difficulty: "intermediate"
    },
    {
      title: "The Golden Ratio: The Story of Phi, the World's Most Astonishing Number",
      description: "Accessible book by Mario Livio exploring the history and applications of the golden ratio.",
      link: "https://www.amazon.com/Golden-Ratio-Worlds-Astonishing-Number/dp/0767908163",
      type: "book",
      tags: ["history", "popular science", "accessible"],
      difficulty: "beginner"
    },
    {
      title: "Fibonacci and Lucas Numbers with Applications",
      description: "Comprehensive reference by Thomas Koshy covering advanced properties and applications of Fibonacci numbers.",
      link: "https://www.wiley.com/en-us/Fibonacci+and+Lucas+Numbers+with+Applications%2C+Volume+1%2C+2nd+Edition-p-9781118742136",
      type: "book",
      tags: ["mathematics", "applications", "advanced theory"],
      difficulty: "advanced"
    },
    
    // Videos
    {
      title: "The Magic of Fibonacci Numbers",
      description: "TED Talk by Arthur Benjamin explaining the fascinating properties of Fibonacci numbers and their appearance in nature.",
      link: "https://www.youtube.com/watch?v=SjSHVDfXHQ4",
      type: "video",
      tags: ["introduction", "accessible", "TED Talk"],
      difficulty: "beginner"
    },
    {
      title: "Fibonacci Sequence: Nature's Code",
      description: "Documentary exploring how Fibonacci numbers appear throughout the natural world.",
      link: "https://www.youtube.com/watch?v=nt2OlMAJj6o",
      type: "video",
      tags: ["nature", "patterns", "documentary"],
      difficulty: "beginner"
    },
    {
      title: "The Golden Ratio (Why It's So Irrational)",
      description: "Numberphile video explaining the mathematics behind the golden ratio and its connection to Fibonacci numbers.",
      link: "https://www.youtube.com/watch?v=sj8Sg8qnjOg",
      type: "video",
      tags: ["mathematics", "numberphile", "golden ratio"],
      difficulty: "intermediate"
    },
    
    // Articles
    {
      title: "The Fibonacci Sequence: Nature's Code",
      description: "Accessible article explaining how Fibonacci numbers appear in nature and why they're so prevalent.",
      link: "https://www.livescience.com/37470-fibonacci-sequence.html",
      type: "article",
      tags: ["nature", "introduction", "accessible"],
      difficulty: "beginner"
    },
    {
      title: "Fibonacci in Trading: Using the Golden Ratio",
      description: "Article explaining how Fibonacci retracement levels are used in financial market analysis.",
      link: "https://www.investopedia.com/articles/technical/04/033104.asp",
      type: "article",
      tags: ["finance", "trading", "technical analysis"],
      difficulty: "intermediate"
    },
    {
      title: "The Mathematics of Fibonacci Numbers",
      description: "In-depth article exploring the mathematical properties and proofs related to Fibonacci numbers.",
      link: "https://plus.maths.org/content/fibonacci-sequence-golden-ratio-and-continued-fractions",
      type: "article",
      tags: ["mathematics", "proofs", "number theory"],
      difficulty: "intermediate"
    },
    
    // Code Repositories
    {
      title: "Fibonacci Algorithms Collection",
      description: "GitHub repository with implementations of various algorithms related to Fibonacci numbers in multiple programming languages.",
      link: "https://github.com/TheAlgorithms/Python/tree/master/maths/fibonacci",
      type: "code",
      tags: ["algorithms", "implementation", "multiple languages"],
      difficulty: "intermediate"
    },
    {
      title: "Fibonacci Visualization Tools",
      description: "Collection of code for visualizing Fibonacci patterns, spirals, and relationships.",
      link: "https://github.com/topics/fibonacci-visualization",
      type: "code",
      tags: ["visualization", "graphics", "interactive"],
      difficulty: "intermediate"
    },
    {
      title: "Advanced Fibonacci Number Library",
      description: "High-performance library for computing and working with Fibonacci numbers, including large values and special properties.",
      link: "https://github.com/danaj/Math-Fibonacci",
      type: "code",
      tags: ["library", "high-performance", "advanced"],
      difficulty: "advanced"
    },
    
    // Courses
    {
      title: "Fibonacci Numbers and the Golden Ratio",
      description: "Online course covering the mathematics, history, and applications of Fibonacci numbers.",
      link: "https://www.coursera.org/learn/fibonacci",
      type: "course",
      tags: ["comprehensive", "mathematics", "applications"],
      difficulty: "intermediate"
    },
    {
      title: "The Mathematics of Nature's Patterns",
      description: "Course exploring mathematical patterns in nature, with significant focus on Fibonacci sequences and related phenomena.",
      link: "https://www.edx.org/course/natures-patterns",
      type: "course",
      tags: ["nature", "patterns", "interdisciplinary"],
      difficulty: "intermediate"
    },
    {
      title: "Number Theory and the Fibonacci Sequence",
      description: "Advanced mathematics course covering number theory with special emphasis on Fibonacci numbers and their properties.",
      link: "https://ocw.mit.edu/courses/mathematics/18-781-theory-of-numbers-spring-2012/",
      type: "course",
      tags: ["number theory", "advanced mathematics", "proofs"],
      difficulty: "advanced"
    },
    
    // Interactive Tools
    {
      title: "Fibonacci Spiral Generator",
      description: "Interactive tool for creating and exploring Fibonacci spirals with customizable parameters.",
      link: "https://www.geogebra.org/m/nburffsd",
      type: "interactive",
      tags: ["visualization", "spiral", "customizable"],
      difficulty: "beginner"
    },
    {
      title: "Golden Ratio Visualizer",
      description: "Interactive web application for exploring the relationship between Fibonacci numbers and the golden ratio.",
      link: "https://www.mathsisfun.com/numbers/golden-ratio-calculator.html",
      type: "interactive",
      tags: ["golden ratio", "calculator", "visualization"],
      difficulty: "beginner"
    },
    {
      title: "Fibonacci in Nature Explorer",
      description: "Interactive tool demonstrating how Fibonacci patterns appear in various natural phenomena.",
      link: "https://www.wolframalpha.com/input/?i=fibonacci+spiral",
      type: "interactive",
      tags: ["nature", "patterns", "exploration"],
      difficulty: "intermediate"
    },
    {
      title: "Fibonacci Calculator and Analyzer",
      description: "Advanced tool for calculating Fibonacci numbers, analyzing their properties, and exploring related sequences.",
      link: "https://www.numberempire.com/fibonaccinumbers.php",
      type: "tool",
      tags: ["calculator", "analysis", "advanced features"],
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
        return <Calculator className="h-5 w-5" />;
      case 'interactive':
        return <Presentation className="h-5 w-5" />;
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
      case 'interactive':
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
  const interactive = resources.filter(r => r.type === 'interactive' || r.type === 'tool');

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Fibonacci Resources</CardTitle>
          <CardDescription className="text-lg">
            Materials to help you explore and understand Fibonacci numbers and their applications
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Library className="h-4 w-4" />
            <span>All Resources</span>
          </TabsTrigger>
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Learning</span>
          </TabsTrigger>
          <TabsTrigger value="academic" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Academic</span>
          </TabsTrigger>
          <TabsTrigger value="tools" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            <span>Tools & Code</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <ResourceCard key={index} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learn">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Books</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {books.map((resource, index) => (
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
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {articles.map((resource, index) => (
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
            
            <Card>
              <CardHeader>
                <CardTitle>Key Mathematical Results</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  The study of Fibonacci numbers has led to numerous important mathematical results:
                </p>
                
                <h3>Binet's Formula</h3>
                <p>
                  The explicit formula for the nth Fibonacci number:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                  <p className="font-mono">F(n) = (φⁿ - (1-φ)ⁿ)/√5</p>
                </div>
                <p>
                  Where φ is the golden ratio (1+√5)/2.
                </p>
                
                <h3>Relation to the Golden Ratio</h3>
                <p>
                  The limit of the ratio of consecutive Fibonacci numbers:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                  <p className="font-mono">lim(n→∞) F(n+1)/F(n) = φ</p>
                </div>
                
                <h3>Cassini's Identity</h3>
                <p>
                  For any integer n:
                </p>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                  <p className="font-mono">F(n-1) × F(n+1) - F(n)² = (-1)ⁿ</p>
                </div>
                
                <h3>Zeckendorf's Theorem</h3>
                <p>
                  Every positive integer can be represented uniquely as the sum of one or more distinct Fibonacci numbers 
                  in such a way that the sum does not include any two consecutive Fibonacci numbers.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Interactive Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {interactive.map((resource, index) => (
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
            
            <Card>
              <CardHeader>
                <CardTitle>Implementing Fibonacci Algorithms</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  There are several approaches to computing Fibonacci numbers, each with different performance characteristics:
                </p>
                
                <h3>Recursive Implementation</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2">
                  <pre className="text-sm">
{`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n-1) + fibonacci(n-2);
}`}
                  </pre>
                </div>
                <p>
                  Simple but inefficient for large n (exponential time complexity).
                </p>
                
                <h3>Dynamic Programming Approach</h3>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2">
                  <pre className="text-sm">
{`function fibonacci(n) {
  let fib = [0, 1];
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i-1] + fib[i-2];
  }
  return fib[n];
}`}
                  </pre>
                </div>
                <p>
                  Much more efficient (linear time complexity).
                </p>
                
                <h3>Matrix Exponentiation</h3>
                <p>
                  For very large n, matrix exponentiation can compute F(n) in O(log n) time.
                </p>
                
                <h3>Binet's Formula</h3>
                <p>
                  Direct computation using the formula, but subject to floating-point precision issues for large n.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            If you're interested in exploring Fibonacci numbers, here's a suggested learning path:
          </p>
          
          <h3>For Beginners</h3>
          <ol>
            <li>Start with "The Magic of Fibonacci Numbers" TED Talk for an engaging introduction</li>
            <li>Read "The Fibonacci Sequence: Nature's Code" article to understand real-world examples</li>
            <li>Explore the "Fibonacci Spiral Generator" interactive tool to visualize the patterns</li>
            <li>Watch "Fibonacci Sequence: Nature's Code" documentary to deepen your understanding</li>
          </ol>
          
          <h3>For Intermediate Learners</h3>
          <ol>
            <li>Read "The Golden Ratio" book by Mario Livio for historical and cultural context</li>
            <li>Take the "Fibonacci Numbers and the Golden Ratio" online course</li>
            <li>Experiment with the "Fibonacci Algorithms Collection" code repository</li>
            <li>Study "The Mathematics of Fibonacci Numbers" article for more formal understanding</li>
          </ol>
          
          <h3>For Advanced Learners</h3>
          <ol>
            <li>Read "Fibonacci and Lucas Numbers with Applications" for comprehensive coverage</li>
            <li>Study the academic papers, particularly "Applications of Fibonacci Numbers in Nature"</li>
            <li>Take the "Number Theory and the Fibonacci Sequence" advanced course</li>
            <li>Contribute to or build upon the "Advanced Fibonacci Number Library"</li>
          </ol>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Further Exploration</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Beyond the resources listed above, consider exploring these related topics:
          </p>
          
          <ul>
            <li>
              <strong>Lucas Numbers:</strong> A related sequence with the same recurrence relation but different initial values.
            </li>
            <li>
              <strong>Tribonacci and k-bonacci Sequences:</strong> Generalizations where each term is the sum of the k preceding terms.
            </li>
            <li>
              <strong>Fibonacci Polynomials:</strong> A polynomial generalization of the Fibonacci sequence.
            </li>
            <li>
              <strong>Pisano Periods:</strong> The study of Fibonacci numbers modulo n, which form periodic sequences.
            </li>
            <li>
              <strong>Continued Fractions:</strong> The golden ratio has the simplest possible continued fraction expansion.
            </li>
            <li>
              <strong>Fibonacci Quasicrystals:</strong> Physical structures with Fibonacci-based ordering.
            </li>
          </ul>
          
          <p>
            These topics represent active areas of research and application, demonstrating the ongoing 
            relevance of this ancient sequence in modern mathematics and science.
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
