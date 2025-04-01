"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

type ApplicationCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  delay?: number;
};

const ApplicationCard = ({ 
  title, 
  description, 
  icon,
  examples,
  delay = 0 
}: ApplicationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="p-6 h-full">
        <div className="flex items-start space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            {icon}
          </div>
          <div className="space-y-3 w-full">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            <div className="bg-muted/50 rounded-lg p-3">
              <h4 className="text-sm font-medium mb-2">Real-World Examples:</h4>
              <ul className="list-disc pl-4 text-sm space-y-1">
                {examples.map((example, i) => (
                  <li key={i} className="text-muted-foreground">{example}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

const applications = {
  construction: [
    {
      title: "Architecture & Construction",
      description: "Angle calculations are essential in designing and constructing buildings, ensuring structural integrity and aesthetic appeal.",
      icon: <span className="text-xl">🏛️</span>,
      examples: [
        "Roof pitch calculations for proper drainage",
        "Staircase angle design for safety and comfort",
        "Wall intersection angles for room layout",
        "Foundation alignment and leveling"
      ]
    },
    {
      title: "Interior Design",
      description: "Angles play a crucial role in space planning and furniture arrangement.",
      icon: <span className="text-xl">🪑</span>,
      examples: [
        "Optimal furniture placement angles",
        "Lighting fixture positioning",
        "Wall art and mirror hanging",
        "Floor pattern design"
      ]
    }
  ],
  science: [
    {
      title: "Astronomy",
      description: "Astronomers use angular measurements to study celestial objects and phenomena.",
      icon: <span className="text-xl">🔭</span>,
      examples: [
        "Telescope positioning and tracking",
        "Celestial object position mapping",
        "Solar panel alignment optimization",
        "Satellite dish orientation"
      ]
    },
    {
      title: "Physics",
      description: "Angular measurements are fundamental in various physics applications.",
      icon: <span className="text-xl">⚛️</span>,
      examples: [
        "Projectile motion calculations",
        "Light refraction analysis",
        "Force vector decomposition",
        "Pendulum motion studies"
      ]
    }
  ],
  engineering: [
    {
      title: "Mechanical Engineering",
      description: "Angles are crucial in designing and analyzing mechanical systems.",
      icon: <span className="text-xl">⚙️</span>,
      examples: [
        "Gear tooth angle design",
        "Cam mechanism profiles",
        "Robot arm movement planning",
        "Machine tool alignment"
      ]
    },
    {
      title: "Civil Engineering",
      description: "Angular measurements ensure structural stability and efficient design.",
      icon: <span className="text-xl">🌉</span>,
      examples: [
        "Bridge support angle optimization",
        "Road gradient calculations",
        "Retaining wall design",
        "Survey alignment measurements"
      ]
    }
  ],
  navigation: [
    {
      title: "Navigation & Surveying",
      description: "Precise angle measurements are essential for navigation and mapping.",
      icon: <span className="text-xl">🧭</span>,
      examples: [
        "GPS triangulation",
        "Marine navigation bearings",
        "Land survey measurements",
        "Flight path calculations"
      ]
    },
    {
      title: "Sports & Recreation",
      description: "Angles affect performance and strategy in many sports.",
      icon: <span className="text-xl">⛳</span>,
      examples: [
        "Golf swing optimization",
        "Basketball shot trajectories",
        "Ski slope navigation",
        "Rock climbing route planning"
      ]
    }
  ]
};

export default function ApplicationsPanel() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Real-World Applications</h2>
      
      <Tabs defaultValue="construction">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="science">Science</TabsTrigger>
          <TabsTrigger value="engineering">Engineering</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        {Object.entries(applications).map(([category, apps]) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apps.map((app, index) => (
                <ApplicationCard
                  key={index}
                  title={app.title}
                  description={app.description}
                  icon={app.icon}
                  examples={app.examples}
                  delay={index * 0.1}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="p-6 mt-6 bg-muted/50">
        <h3 className="text-lg font-medium mb-3">Why Are Angles Important?</h3>
        <p className="text-muted-foreground mb-4">
          Angles are fundamental mathematical concepts that help us understand and describe the world around us. They are essential in:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Measuring and describing rotations and orientations</li>
          <li>Calculating distances and positions indirectly</li>
          <li>Designing and constructing stable structures</li>
          <li>Planning and optimizing movement paths</li>
          <li>Understanding natural phenomena and physical laws</li>
        </ul>
      </Card>
    </div>
  );
}
