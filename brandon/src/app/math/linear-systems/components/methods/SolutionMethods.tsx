import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function SolutionMethods() {
  const methods = [
    {
      id: "elimination",
      name: "Elimination Method",
      description: "Add or subtract equations to eliminate variables",
      steps: [
        "Align like terms in the equations",
        "Multiply equations if needed to get coefficients that will cancel",
        "Add or subtract equations",
        "Solve for the remaining variable",
        "Back-substitute to find other variables"
      ]
    },
    {
      id: "substitution",
      name: "Substitution Method",
      description: "Solve for one variable and substitute into other equations",
      steps: [
        "Solve one equation for a variable",
        "Substitute that expression into other equations",
        "Solve the resulting equation",
        "Back-substitute to find other variables"
      ]
    },
    {
      id: "matrices",
      name: "Matrix Method",
      description: "Use matrix operations to solve the system",
      steps: [
        "Write the system in matrix form Ax = b",
        "Find the inverse of A",
        "Multiply both sides by A⁻¹",
        "Solve for x = A⁻¹b"
      ]
    }
  ];

  return (
    <Tabs defaultValue="elimination" className="w-full">
      <TabsList className="w-full justify-start">
        {methods.map(method => (
          <TabsTrigger key={method.id} value={method.id}>
            {method.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {methods.map(method => (
        <TabsContent key={method.id} value={method.id}>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">{method.name}</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">{method.description}</p>
            <div className="space-y-2">
              <h4 className="font-medium">Steps:</h4>
              <ol className="list-decimal list-inside space-y-2">
                {method.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}