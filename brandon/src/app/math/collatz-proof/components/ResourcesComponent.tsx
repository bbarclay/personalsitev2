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
  Podcast,
  Microscope
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
      title: "Computational Approaches to the Collatz Conjecture",
      description: "Paper discussing various computational methods used to investigate the Collatz conjecture.",
      link: "https://arxiv.org/abs/math/0608208",
      type: "paper",
      tags: ["computational", "algorithms", "verification"],
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
    {
      title: "On the Structure of the 3n+1 Problem",
      description: "Paper by Günther J. Wirsching exploring structural aspects of the Collatz problem.",
      link: "https://www.sciencedirect.com/science/article/pii/0022314X9390025C",
      type: "paper",
      tags: ["structure", "mathematics", "analysis"],
      difficulty: "advanced"
    },
    
    // Books
    {
      title: "The Ultimate Challenge: The 3x+1 Problem",
      description: "Edited collection of research papers on the Collatz conjecture, covering various proof approaches.",
      link: "https://www.springer.com/gp/book/9780821849408",
      type: "book",
      tags: ["research collection", "comprehensive", "mathematics"],
      difficulty: "advanced"
    },
    {
      title: "Proofs and Confirmations: The Story of the Alternating Sign Matrix Conjecture",
      description: "Book by David Bressoud that discusses how mathematical conjectures are approached and eventually proved.",
      link: "https://www.cambridge.org/core/books/proofs-and-confirmations/E703A5A1595F95C7E8A7C03C7F0E3DAA",
      type: "book",
      tags: ["proof techniques", "mathematical history", "methodology"],
      difficulty: "intermediate"
    },
    {
      title: "How to Prove It: A Structured Approach",
      description: "Book by Daniel J. Velleman teaching systematic approaches to mathematical proofs.",
      link: "https://www.cambridge.org/core/books/how-to-prove-it/6D2965D625C6836CD4A785A2C3E2C269",
      type: "book",
      tags: ["proof techniques", "logic", "methodology"],
      difficulty: "intermediate"
    },
    
    // Videos
    {
      title: "The Simplest Math Problem No One Can Solve - Collatz Conjecture",
      description: "Engaging Veritasium video explaining the Collatz conjecture and proof challenges.",
      link: "https://www.youtube.com/watch?v=094y1Z2wpJg",
      type: "video",
      tags: ["introduction", "visualization", "popular science"],
      difficulty: "beginner"
    },
    {
      title: "Terry Tao, Ph.D. Small and Large Scale Approaches to the 3x+1 Problem",
      description: "Lecture by Fields Medalist Terence Tao on his approach to the Collatz conjecture.",
      link: "https://www.youtube.com/watch?v=MqMkRGSg5zQ",
      type: "video",
      tags: ["advanced", "research", "Terence Tao"],
      difficulty: "advanced"
    },
    {
      title: "The Collatz Conjecture - Numberphile",
      description: "Numberphile video explaining the Collatz conjecture and why it's difficult to prove.",
      link: "https://www.youtube.com/watch?v=5mFpVDpKX70",
      type: "video",
      tags: ["introduction", "numberphile", "accessible"],
      difficulty: "beginner"
    },
    
    // Articles
    {
      title: "Why Mathematicians Can't Find the Hay in a Haystack",
      description: "Quanta Magazine article discussing the challenges of proving the Collatz conjecture.",
      link: "https://www.quantamagazine.org/why-mathematicians-cant-find-the-hay-in-a-haystack-20180917/",
      type: "article",
      tags: ["popular science", "proof challenges", "mathematics"],
      difficulty: "beginner"
    },
    {
      title: "Mathematician Proves Huge Result on 'Dangerous' Problem",
      description: "Quanta Magazine article about Terence Tao's breakthrough on the Collatz conjecture.",
      link: "https://www.quantamagazine.org/mathematician-terence-tao-and-the-collatz-conjecture-20191211/",
      type: "article",
      tags: ["popular science", "Terence Tao", "breakthrough"],
      difficulty: "beginner"
    },
    {
      title: "The Collatz Conjecture: A Case Study in Mathematical Problem Solving",
      description: "Article exploring different proof strategies that have been applied to the Collatz conjecture.",
      link: "https://plus.maths.org/content/mathematical-mysteries-collatz-conjecture",
      type: "article",
      tags: ["proof techniques", "problem solving", "mathematics"],
      difficulty: "intermediate"
    },
    
    // Code Repositories
    {
      title: "Collatz Conjecture Verification Tools",
      description: "GitHub repository with high-performance tools for verifying the Collatz conjecture for large ranges of numbers.",
      link: "https://github.com/xbarin02/collatz",
      type: "code",
      tags: ["verification", "high performance", "C++"],
      difficulty: "intermediate"
    },
    {
      title: "Collatz Proof Approaches",
      description: "Repository implementing various mathematical approaches to proving the Collatz conjecture.",
      link: "https://github.com/mnielsen/3x-plus-1",
      type: "code",
      tags: ["proof techniques", "algorithms", "mathematics"],
      difficulty: "advanced"
    },
    {
      title: "Collatz Visualization and Analysis Tools",
      description: "Collection of tools for visualizing and analyzing patterns in Collatz sequences.",
      link: "https://github.com/topics/collatz-conjecture",
      type: "code",
      tags: ["visualization", "analysis", "patterns"],
      difficulty: "intermediate"
    },
    
    // Courses
    {
      title: "Introduction to Mathematical Thinking",
      description: "Course teaching the kind of mathematical thinking needed for advanced mathematics, including proof techniques.",
      link: "https://www.coursera.org/learn/mathematical-thinking",
      type: "course",
      tags: ["proof techniques", "mathematical thinking", "foundations"],
      difficulty: "intermediate"
    },
    {
      title: "Number Theory and Cryptography",
      description: "Course covering number theory concepts relevant to understanding the Collatz conjecture.",
      link: "https://www.coursera.org/learn/number-theory-cryptography",
      type: "course",
      tags: ["number theory", "mathematics", "foundations"],
      difficulty: "intermediate"
    },
    {
      title: "Discrete Mathematics",
      description: "Course covering discrete mathematics topics essential for understanding proof techniques.",
      link: "https://www.edx.org/course/discrete-mathematics",
      type: "course",
      tags: ["discrete mathematics", "foundations", "logic"],
      difficulty: "intermediate"
    },
    
    // Tools
    {
      title: "Collatz Explorer",
      description: "Interactive web tool for exploring and visualizing Collatz sequences and proof approaches.",
      link: "https://www.jasondavies.com/collatz-graph/",
      type: "tool",
      tags: ["interactive", "visualization", "exploration"],
      difficulty: "beginner"
    },
    {
      title: "Wolfram Demonstrations Project: Collatz Conjecture",
      description: "Interactive demonstrations of various aspects of the Collatz conjecture.",
      link: "https://demonstrations.wolfram.com/CollatzProblem/",
      type: "tool",
      tags: ["interactive", "wolfram", "visualization"],
      difficulty: "intermediate"
    },
    
    // Podcasts
    {
      title: "The Collatz Conjecture - My Favorite Theorem",
      description: "Podcast episode discussing proof approaches to the Collatz conjecture.",
      link: "https://kpknudson.com/my-favorite-theorem/2018/3/15/episode-21-ben-orlin",
      type: "podcast",
      tags: ["discussion", "mathematics", "proof techniques"],
      difficulty: "intermediate"
    },
    {
      title: "The Collatz Conjecture - Numberphile Podcast",
      description: "In-depth discussion with mathematicians about approaches to proving the Collatz conjecture.",
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

  const papers = resources.filter(r => r.type === 'paper');
  const books = resources.filter(r => r.type === 'book');
  const videos = resources.filter(r => r.type === 'video');
  const articles = resources.filter(r => r.type === 'article');
  const code = resources.filter(r => r.type === 'code');
  const courses = resources.filter(r => r.type === 'course');
  const tools = resources.filter(r => r.type === 'tool');
  const podcasts = resources.filter(r => r.type === 'podcast');

  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Resources for Proof Techniques</CardTitle>
          <CardDescription className="text-lg">
            Materials to help you understand and explore proof approaches to the Collatz conjecture
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
            <Microscope className="h-4 w-4" />
            <span>Academic</span>
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Learning</span>
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
          </div>
        </TabsContent>

        <TabsContent value="learning">
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

        <TabsContent value="tools">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Interactive Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((resource, index) => (
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
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Proof Techniques in Mathematics</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Understanding various proof techniques is essential for approaching the Collatz conjecture:
          </p>
          
          <ul>
            <li>
              <strong>Direct Proof:</strong> Showing directly that a statement is true by starting with known facts and using logical deduction.
            </li>
            <li>
              <strong>Proof by Contradiction:</strong> Assuming the opposite of what you want to prove and showing that this leads to a contradiction.
            </li>
            <li>
              <strong>Proof by Induction:</strong> Proving a statement for a base case and then showing that if it's true for one case, it's true for the next.
            </li>
            <li>
              <strong>Probabilistic Proof:</strong> Showing that a statement is true with probability 1, even if specific counterexamples can't be ruled out.
            </li>
            <li>
              <strong>Computer-Assisted Proof:</strong> Using computational methods to verify parts of a proof that would be infeasible to check by hand.
            </li>
          </ul>
          
          <p>
            Each of these techniques has been applied to the Collatz conjecture, though none has yet yielded a complete proof.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Research Community</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The Collatz conjecture has attracted a diverse community of researchers:
          </p>
          
          <ul>
            <li>
              <strong>Academic Mathematicians:</strong> Professional researchers in number theory, dynamical systems, and related fields.
            </li>
            <li>
              <strong>Computer Scientists:</strong> Researchers interested in computational aspects of the problem and algorithm design.
            </li>
            <li>
              <strong>Amateur Mathematicians:</strong> Enthusiasts who contribute to verification efforts and explore new approaches.
            </li>
            <li>
              <strong>Educators:</strong> Teachers and professors who use the conjecture as a teaching tool.
            </li>
          </ul>
          
          <p>
            This diverse community brings a wide range of perspectives and approaches to the problem, contributing to our collective understanding.
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
