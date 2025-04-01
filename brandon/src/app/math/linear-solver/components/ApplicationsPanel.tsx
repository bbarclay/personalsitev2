'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const ApplicationCard = ({ 
  title, 
  description, 
  icon,
  delay = 0 
}: { 
  title: string; 
  description: string; 
  icon: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex flex-col h-full"
  >
    <Card className="h-full p-6">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </Card>
  </motion.div>
);

export default function ApplicationsPanel() {
  const applications = [
    {
      title: "Circuit Analysis",
      description: "Solving for currents and voltages in electrical circuits with multiple components using Kirchhoff's laws.",
      icon: "⚡"
    },
    {
      title: "Computer Graphics",
      description: "Transformations, projections, and rendering in 2D and 3D graphics rely heavily on linear systems.",
      icon: "🖥️"
    },
    {
      title: "Economics",
      description: "Input-output models, optimization problems, and market equilibrium calculations.",
      icon: "📊"
    },
    {
      title: "Engineering",
      description: "Structural analysis, control systems, and signal processing use linear systems extensively.",
      icon: "🏗️"
    },
    {
      title: "Machine Learning",
      description: "Linear regression, principal component analysis, and many other algorithms solve linear systems.",
      icon: "🤖"
    },
    {
      title: "Physics",
      description: "Mechanics, electromagnetics, quantum mechanics, and many physical models use linear equations.",
      icon: "🔭"
    },
    {
      title: "Traffic Flow",
      description: "Modeling and optimizing traffic networks for cities and transportation systems.",
      icon: "🚦"
    },
    {
      title: "Chemistry",
      description: "Balancing chemical equations and analyzing reaction networks.",
      icon: "🧪"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Applications of Linear Equations</h2>
        <p>Linear equations have applications in various fields:</p>
        <ul>
          <li>Economics and Finance</li>
          <li>Physics and Engineering</li>
          <li>Computer Science</li>
          <li>Business and Management</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {applications.map((app, index) => (
          <ApplicationCard
            key={app.title}
            title={app.title}
            description={app.description}
            icon={app.icon}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
} 