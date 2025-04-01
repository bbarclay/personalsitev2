'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  BookOpen, 
  Video, 
  Calculator, 
  Download, 
  FileText, 
  GraduationCap,
  Code,
  Brain,
  PlayCircle
} from 'lucide-react';

const ResourceCard = ({ resource, index }: { resource: any; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
  >
    <div className="p-4">
      <div className="flex items-start">
        <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
          {resource.icon}
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="font-medium">{resource.title}</h3>
            <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
              {resource.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {resource.description}
          </p>
          {resource.features && (
            <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {resource.features.map((feature: string, i: number) => (
                <li key={i} className="flex items-center">
                  <span className="text-xs mr-2">•</span> {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-3 text-right">
        <Button
          variant="ghost"
          size="sm"
          className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
          asChild
        >
          <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
            Visit Resource <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </Button>
      </div>
    </div>
  </motion.div>
);

const ResourcesPanel: React.FC = () => {
  const learningResources = [
    {
      title: 'Khan Academy: Angles',
      description: 'Comprehensive course on angle concepts and applications',
      url: 'https://www.khanacademy.org/math/basic-geo/basic-geo-angle',
      icon: <GraduationCap className="h-5 w-5" />,
      type: 'Course',
      features: [
        'Video lectures',
        'Interactive exercises',
        'Progress tracking',
        'Practice quizzes'
      ]
    },
    {
      title: 'Brilliant: Geometry Fundamentals',
      description: 'Interactive course focusing on geometric principles',
      url: 'https://brilliant.org/courses/geometry-fundamentals/',
      icon: <Brain className="h-5 w-5" />,
      type: 'Interactive Course',
      features: [
        'Problem-based learning',
        'Visual explanations',
        'Hands-on exercises',
        'Real-world applications'
      ]
    }
  ];

  const interactiveTools = [
    {
      title: 'GeoGebra: Angle Explorer',
      description: 'Interactive tool for exploring angle relationships',
      url: 'https://www.geogebra.org/m/yEnhxvJ2',
      icon: <Calculator className="h-5 w-5" />,
      type: 'Interactive Tool',
      features: [
        'Dynamic angle manipulation',
        'Visual demonstrations',
        'Measurement tools',
        'Save and share constructions'
      ]
    },
    {
      title: 'Desmos Geometry',
      description: 'Digital platform for geometric constructions',
      url: 'https://www.desmos.com/geometry',
      icon: <Code className="h-5 w-5" />,
      type: 'Web Tool',
      features: [
        'Custom constructions',
        'Angle measurements',
        'Shape transformations',
        'Collaborative features'
      ]
    }
  ];

  const practiceResources = [
    {
      title: 'IXL Math: Angle Practice',
      description: 'Comprehensive practice problems with instant feedback',
      url: 'https://www.ixl.com/math/geometry/angle-measures',
      icon: <PlayCircle className="h-5 w-5" />,
      type: 'Practice',
      features: [
        'Adaptive questions',
        'Detailed explanations',
        'Skill tracking',
        'Performance reports'
      ]
    },
    {
      title: 'Math is Fun: Angle Problems',
      description: 'Collection of angle-related problems and solutions',
      url: 'https://www.mathsisfun.com/geometry/angles.html',
      icon: <Calculator className="h-5 w-5" />,
      type: 'Problems',
      features: [
        'Step-by-step solutions',
        'Different difficulty levels',
        'Visual aids',
        'Practice worksheets'
      ]
    }
  ];

  const books = [
    {
      title: 'Geometry: A Comprehensive Course',
      author: 'Daniel Pedoe',
      description: 'Classic text covering all aspects of geometry, including detailed angle concepts',
      level: 'Advanced'
    },
    {
      title: 'Basic Geometry for College Students',
      author: 'Alan S. Tussy',
      description: 'Clear explanations of fundamental geometry concepts',
      level: 'Beginner'
    },
    {
      title: 'Elements of Geometry',
      author: 'Euclid',
      description: 'The foundational text of geometry, including angle theorems',
      level: 'Advanced'
    }
  ];

  return (
    <Card className="border-t-4 border-t-purple-500">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Learning Resources</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Explore these carefully curated resources to master angles and their applications in geometry.
        </p>

        <Tabs defaultValue="learn">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="learn">Learning</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interactive">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interactiveTools.map((resource, index) => (
                <ResourceCard key={index} resource={resource} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {practiceResources.map((resource, index) => (
                <ResourceCard key={index} resource={resource} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="books">
            <div className="grid grid-cols-1 gap-4">
              {books.map((book, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border rounded-lg"
                >
                  <div className="flex items-start">
                    <BookOpen className="h-5 w-5 mr-3 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">by {book.author}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{book.description}</p>
                      <span className="mt-2 inline-block text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        Level: {book.level}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <h3 className="font-medium mb-3">Quick Tips for Learning Angles</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
              Start with basic angle types and work your way up to more complex concepts
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
              Practice drawing and measuring angles to build intuition
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
              Connect angles to real-world examples to better understand their applications
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 dark:text-purple-400 mr-2">•</span>
              Use interactive tools to visualize angle relationships
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourcesPanel;
