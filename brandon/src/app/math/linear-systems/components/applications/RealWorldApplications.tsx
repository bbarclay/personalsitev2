import React from 'react';
import { Card } from '@/components/ui/card';

export function RealWorldApplications() {
  const applications = [
    {
      title: "Economics",
      description: "Supply and demand equilibrium, market clearing prices",
      example: "Finding the price and quantity where supply equals demand"
    },
    {
      title: "Engineering",
      description: "Circuit analysis, force distribution",
      example: "Calculating currents in electrical circuits using Kirchhoff's laws"
    },
    {
      title: "Chemistry",
      description: "Chemical reaction balancing, mixture problems",
      example: "Determining the composition of chemical solutions"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Real World Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications.map((app, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-lg font-semibold mb-2">{app.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{app.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Example: {app.example}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}