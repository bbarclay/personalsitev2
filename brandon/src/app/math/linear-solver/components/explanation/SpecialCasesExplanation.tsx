import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const SpecialCasesExplanation: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Special Cases</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Unique Solution</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When the rank of the coefficient matrix equals the number of variables, the system has a unique solution.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
              <pre className="text-sm">
                {`
[1 0 0 | 3]  →  x = 3
[0 1 0 | 1]  →  y = 1
[0 0 1 | 2]  →  z = 2
                `}
              </pre>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-2">Infinite Solutions</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              When the rank of the augmented matrix equals the rank of the coefficient matrix but less than the number of variables.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg mb-4">
              <pre className="text-sm">
                {`
[1 2 0 | 5]  →  x = 5 - 2y
[0 0 1 | 3]  →  z = 3
[0 0 0 | 0]     y is a free variable
                `}
              </pre>
            </div>
            <h4 className="font-medium mb-2">No Solution</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              When the rank of the augmented matrix is greater than the rank of the coefficient matrix.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <pre className="text-sm">
                {`
[1 2 | 3]
[2 4 | 7]  →  [0 0 | 1]  (contradiction)
                `}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpecialCasesExplanation; 