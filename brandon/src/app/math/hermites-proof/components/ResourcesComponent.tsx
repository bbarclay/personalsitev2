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
  Microscope,
  History
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
      title: "Sur la fonction exponentielle",
      description: "Hermite's original 1873 paper (in French) where he proves the transcendence of e.",
      link: "https://archive.org/details/surlafonctioneexpherm",
      type: "paper",
      tags: ["original", "historical", "transcendence"],
      difficulty: "advanced"
    },
    {
      title: "Transcendental Numbers",
      description: "Comprehensive survey paper on transcendental numbers, including Hermite's proof and its extensions.",
      link: "https://www.ams.org/journals/bull/1971-77-02/S0002-9904-1971-12639-9/",
      type: "paper",
      tags: ["survey", "mathematics", "number theory"],
      difficulty: "advanced"
    },
    {
      title: "Hermite's Proof of the Transcendence of e: A Historical Perspective",
      description: "Paper examining the historical context and significance of Hermite's proof.",
      link: "https://www.jstor.org/stable/2589433",
      type: "paper",
      tags: ["history", "mathematics", "analysis"],
      difficulty: "intermediate"
    },
    
    // Books
    {
      title: "Transcendental Number Theory",
      description: "Classic textbook by Alan Baker covering Hermite's proof and its extensions to other transcendental numbers.",
      link: "https://www.cambridge.org/core/books/transcendental-number-theory/4E807428256EB068D33B0F0B9A58E406",
      type: "book",
      tags: ["textbook", "comprehensive", "number theory"],
      difficulty: "advanced"
    },
    {
      title: "e: The Story of a Number",
      description: "Accessible book by Eli Maor exploring the history and significance of e, including Hermite's proof.",
      link: "https://press.princeton.edu/books/paperback/9780691168487/e-the-story-of-a-number",
      type: "book",
      tags: ["popular", "history", "accessible"],
      difficulty: "beginner"
    },
    {
      title: "An Introduction to the Theory of Numbers",
      description: "Classic number theory textbook by Hardy and Wright with a section on transcendental numbers.",
      link: "https://global.oup.com/academic/product/an-introduction-to-the-theory-of-numbers-9780199219865",
      type: "book",
      tags: ["textbook", "number theory", "comprehensive"],
      difficulty: "intermediate"
    },
    
    // Videos
    {
      title: "The Transcendence of e - A Simplified Explanation",
      description: "Video explaining Hermite's proof of the transcendence of e in accessible terms.",
      link: "https://www.youtube.com/watch?v=Wuj_ohOQfVc",
      type: "video",
      tags: ["explanation", "accessible", "mathematics"],
      difficulty: "intermediate"
    },
    {
      title: "Transcendental Numbers and the Impossibility of Squaring the Circle",
      description: "Video connecting transcendence proofs to classical geometric problems.",
      link: "https://www.youtube.com/watch?v=mPn2AdMH7UQ",
      type: "video",
      tags: ["applications", "geometry", "history"],
      difficulty: "beginner"
    },
    {
      title: "Advanced Number Theory: Transcendental Numbers",
      description: "Lecture series covering Hermite's proof and its extensions in detail.",
      link: "https://www.youtube.com/watch?v=HvnGaRYYqfA",
      type: "video",
      tags: ["lecture", "advanced", "number theory"],
      difficulty: "advanced"
    },
    
    // Articles
    {
      title: "How Hermite Proved that e is Transcendental",
      description: "Accessible article explaining the key ideas in Hermite's proof.",
      link: "https://www.quantamagazine.org/how-mathematicians-proved-that-e-is-transcendental-20220330/",
      type: "article",
      tags: ["explanation", "accessible", "history"],
      difficulty: "intermediate"
    },
    {
      title: "The Number e and Its Transcendence",
      description: "Article exploring the significance of e's transcendence in mathematics and applications.",
      link: "https://plus.maths.org/content/os/issue43/features/transcendental/index",
      type: "article",
      tags: ["applications", "significance", "accessible"],
      difficulty: "beginner"
    },
    {
      title: "From Hermite to Lindemann: The Transcendence of π",
      description: "Article explaining how Hermite's methods were extended to prove the transcendence of π.",
      link: "https://www.ams.org/notices/201506/rnoti-p706.pdf",
      type: "article",
      tags: ["extensions", "history", "pi"],
      difficulty: "intermediate"
    },
    
    // Code Repositories
    {
      title: "Transcendental Number Verification",
      description: "GitHub repository with implementations of algorithms for verifying properties of transcendental numbers.",
      link: "https://github.com/topics/transcendental-numbers",
      type: "code",
      tags: ["verification", "algorithms", "implementation"],
      difficulty: "intermediate"
    },
    {
      title: "Hermite's Proof Formalization",
      description: "Formal verification of Hermite's proof using the Lean theorem prover.",
      link: "https://github.com/leanprover-community/mathlib/blob/master/src/number_theory/transcendental.lean",
      type: "code",
      tags: ["formal verification", "proof assistant", "mathematics"],
      difficulty: "advanced"
    },
    {
      title: "Numerical Transcendence Tests",
      description: "Collection of numerical algorithms for testing whether a number is likely to be transcendental.",
      link: "https://github.com/sympy/sympy/blob/master/sympy/core/numbers.py",
      type: "code",
      tags: ["numerical", "algorithms", "testing"],
      difficulty: "intermediate"
    },
    
    // Courses
    {
      title: "Transcendental Number Theory",
      description: "Graduate-level course covering Hermite's proof and its extensions in detail.",
      link: "https://ocw.mit.edu/courses/mathematics/18-785-number-theory-i-fall-2019/",
      type: "course",
      tags: ["graduate", "number theory", "comprehensive"],
      difficulty: "advanced"
    },
    {
      title: "History of Mathematics",
      description: "Course exploring the historical development of mathematical ideas, including transcendence proofs.",
      link: "https://www.coursera.org/learn/history-of-mathematics",
      type: "course",
      tags: ["history", "context", "accessible"],
      difficulty: "intermediate"
    },
    {
      title: "Introduction to Number Theory",
      description: "Undergraduate course covering the basics of number theory, including an introduction to transcendental numbers.",
      link: "https://www.edx.org/course/introduction-to-number-theory",
      type: "course",
      tags: ["undergraduate", "foundations", "accessible"],
      difficulty: "intermediate"
    },
    
    // Tools
    {
      title: "Transcendental Number Explorer",
      description: "Interactive web tool for exploring properties of transcendental numbers like e and π.",
      link: "https://www.wolframalpha.com/input?i=is+e+transcendental",
      type: "tool",
      tags: ["interactive", "exploration", "visualization"],
      difficulty: "beginner"
    },
    {
      title: "Hermite Approximation Calculator",
      description: "Tool for computing Hermite approximations to transcendental functions.",
      link: "https://www.desmos.com/calculator/hl7jyxl7mg",
      type: "tool",
      tags: ["calculator", "approximation", "interactive"],
      difficulty: "intermediate"
    },
    
    // Podcasts
    {
      title: "The Transcendence of e - My Favorite Theorem",
      description: "Podcast episode discussing Hermite's proof and its significance.",
      link: "https://kpknudson.com/my-favorite-theorem/",
      type: "podcast",
      tags: ["discussion", "mathematics", "accessible"],
      difficulty: "intermediate"
    },
    {
      title: "Transcendental Numbers - A History of Mathematics",
      description: "Podcast exploring the historical development of transcendental number theory.",
      link: "https://historyofmathematics.org/podcasts/",
      type: "podcast",
      tags: ["history", "context", "accessible"],
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
          <CardTitle className="text-3xl font-bold">Resources for Hermite's Proof</CardTitle>
          <CardDescription className="text-lg">
            Materials to help you understand and explore Hermite's proof of the transcendence of e
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
          <TabsTrigger value="historical" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Historical</span>
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

        <TabsContent value="learning">
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
              <h3 className="text-xl font-semibold mb-4">Interactive Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tools.map((resource, index) => (
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

        <TabsContent value="historical">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Original Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.filter(r => r.tags.includes('original') || r.tags.includes('historical')).map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Historical Context</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.filter(r => r.tags.includes('history') || r.tags.includes('context')).map((resource, index) => (
                  <ResourceCard key={index} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Learning Path</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            If you're interested in learning about Hermite's proof, here's a suggested learning path:
          </p>
          
          <h3>For Beginners</h3>
          <ol>
            <li>Start with "e: The Story of a Number" by Eli Maor to understand the historical context and significance of e.</li>
            <li>Watch "Transcendental Numbers and the Impossibility of Squaring the Circle" to see the broader implications.</li>
            <li>Read "The Number e and Its Transcendence" article for an accessible introduction to the concept of transcendence.</li>
            <li>Explore the "Transcendental Number Explorer" tool to build intuition about transcendental numbers.</li>
          </ol>
          
          <h3>For Intermediate Learners</h3>
          <ol>
            <li>Read "How Hermite Proved that e is Transcendental" to understand the key ideas in the proof.</li>
            <li>Watch "The Transcendence of e - A Simplified Explanation" for a visual presentation of the proof.</li>
            <li>Take the "Introduction to Number Theory" course to build the necessary mathematical background.</li>
            <li>Explore the "Hermite Approximation Calculator" to see how the approximation techniques work in practice.</li>
          </ol>
          
          <h3>For Advanced Learners</h3>
          <ol>
            <li>Read Hermite's original paper "Sur la fonction exponentielle" (with translation if needed).</li>
            <li>Study "Transcendental Number Theory" by Alan Baker for a comprehensive treatment.</li>
            <li>Take the graduate-level "Transcendental Number Theory" course for in-depth understanding.</li>
            <li>Explore the "Hermite's Proof Formalization" code repository to see how the proof can be formalized in a theorem prover.</li>
          </ol>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Further Exploration</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            After understanding Hermite's proof, you might want to explore these related topics:
          </p>
          
          <ul>
            <li>
              <strong>Lindemann's Proof of the Transcendence of π:</strong> This proof, which built on Hermite's methods, 
              resolved the ancient problem of squaring the circle.
            </li>
            <li>
              <strong>The Lindemann-Weierstrass Theorem:</strong> A generalization of Hermite's and Lindemann's results 
              that provides a criterion for the transcendence of exponential values.
            </li>
            <li>
              <strong>The Gelfond-Schneider Theorem:</strong> This result on the transcendence of α<sup>β</sup> (where α and β 
              are algebraic with certain conditions) was one of Hilbert's problems.
            </li>
            <li>
              <strong>Baker's Theorem:</strong> Alan Baker's work on linear forms in logarithms, which extended the methods 
              of transcendence theory and earned him the Fields Medal.
            </li>
            <li>
              <strong>Schanuel's Conjecture:</strong> A far-reaching conjecture in transcendental number theory that would 
              imply many known results if proven true.
            </li>
          </ul>
          
          <p>
            These topics represent the continuing development of the ideas that Hermite pioneered in his groundbreaking proof.
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
