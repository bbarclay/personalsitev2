"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const FractionResources = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-yellow-600">
          Fraction Learning Resources
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore these helpful resources to deepen your understanding of fractions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ResourceCard 
          title="Khan Academy: Fractions"
          description="Free interactive lessons and practice exercises covering all aspects of fractions."
          link="https://www.khanacademy.org/math/arithmetic/fraction-arithmetic"
          tags={["Interactive", "Video Lessons", "Practice"]}
          category="learning"
        />
        
        <ResourceCard 
          title="Mathway Fraction Calculator"
          description="Advanced online calculator for fraction operations with step-by-step solutions."
          link="https://www.mathway.com/Fractions"
          tags={["Calculator", "Problem-Solving", "Step-by-Step"]}
          category="tool"
        />
        
        <ResourceCard 
          title="Math Antics: Fractions Video Series"
          description="Engaging and clear video explanations of fraction concepts for visual learners."
          link="https://mathantics.com/section/lesson-video/fractions"
          tags={["Videos", "Visual Learning", "Beginner-Friendly"]}
          category="video"
        />
        
        <ResourceCard 
          title="Fraction Games for Kids"
          description="Fun games that help children practice fraction concepts through play."
          link="https://www.education.com/games/fractions/"
          tags={["Games", "Elementary", "Interactive"]}
          category="game"
        />
        
        <ResourceCard 
          title="Purplemath: Fraction Tutorials"
          description="Comprehensive written tutorials with worked examples for middle and high school students."
          link="https://www.purplemath.com/modules/fraction.htm"
          tags={["Tutorials", "Examples", "Intermediate"]}
          category="learning"
        />
        
        <ResourceCard 
          title="Desmos Fraction Visualizer"
          description="Interactive tool to visualize fractions and their operations."
          link="https://www.desmos.com/calculator"
          tags={["Visualization", "Interactive", "Graphing"]}
          category="tool"
        />
        
        <ResourceCard 
          title="Fractions in Everyday Life"
          description="Article explaining practical applications of fractions in daily situations."
          link="https://www.splashlearn.com/math-vocabulary/fractions/fractions-in-everyday-life"
          tags={["Real-world", "Applications", "Examples"]}
          category="article"
        />
        
        <ResourceCard 
          title="NCTM Illuminations: Fraction Activities"
          description="High-quality fraction activities developed by the National Council of Teachers of Mathematics."
          link="https://illuminations.nctm.org/Search.aspx?view=search&kw=fractions"
          tags={["Activities", "Standards-Based", "Education"]}
          category="activity"
        />
        
        <ResourceCard 
          title="PBS Learning Media: Fraction Resources"
          description="Educational videos and interactive lessons from PBS for classroom or home learning."
          link="https://www.pbslearningmedia.org/search/?q=fractions"
          tags={["Videos", "Interactive", "Educational"]}
          category="learning"
        />
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Fraction Books Worth Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BookCard
            title="Fractions, Decimals, and Percents"
            author="David A. Adler"
            description="A clear introduction to fractions and their relationship to decimals and percentages."
            audience="Elementary School"
            level="Beginner"
          />
          
          <BookCard
            title="Fraction Fun"
            author="David A. Adler"
            description="Uses colorful illustrations to introduce fraction concepts in a fun and accessible way."
            audience="Elementary School"
            level="Beginner"
          />
          
          <BookCard
            title="Math Doesn't Suck"
            author="Danica McKellar"
            description="Includes a thorough section on fractions with real-world examples aimed at middle school girls."
            audience="Middle School"
            level="Intermediate"
          />
        </div>
      </div>
      
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <h2 className="text-xl font-bold mb-3">Mastering Fraction Skills: A Progressive Approach</h2>
          <p className="mb-4">
            For most effective learning, approach fractions in this recommended sequence:
          </p>
          <ol className="space-y-2 list-decimal list-inside mb-4">
            <li>Understanding the concept of parts of a whole</li>
            <li>Recognizing and writing fractions</li>
            <li>Equivalent fractions and simplifying</li>
            <li>Comparing fractions</li>
            <li>Adding and subtracting with like denominators</li>
            <li>Finding common denominators</li>
            <li>Adding and subtracting with unlike denominators</li>
            <li>Multiplying fractions</li>
            <li>Dividing fractions</li>
            <li>Mixed numbers and improper fractions</li>
            <li>Applications and word problems</li>
          </ol>
          <p>
            Work through these concepts in order, making sure you're comfortable with each one before moving on.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

// Resource Card Component
const ResourceCard = ({ 
  title, 
  description, 
  link, 
  tags, 
  category 
}: {
  title: string;
  description: string;
  link: string;
  tags: string[];
  category: 'learning' | 'tool' | 'video' | 'game' | 'article' | 'activity';
}) => {
  const getCategoryColor = (cat: string) => {
    switch(cat) {
      case 'learning': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
      case 'tool': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300';
      case 'video': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      case 'game': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'article': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'activity': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="mb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{description}</p>
        
        <div className="space-x-2 space-y-2 mb-4">
          {tags.map((tag, i) => (
            <span key={i} className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full px-2 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        <Button asChild variant="outline" className="w-full mt-auto">
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            Visit Resource <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

// Book Card Component
const BookCard = ({
  title,
  author,
  description,
  audience,
  level
}: {
  title: string;
  author: string;
  description: string;
  audience: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}) => {
  const getLevelColor = (lvl: string) => {
    switch(lvl) {
      case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
      case 'Advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <Card className="h-full border-t-4 border-t-orange-500">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">by {author}</p>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">{audience}</span>
          <span className={`px-2 py-0.5 rounded ${getLevelColor(level)}`}>{level}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FractionResources;