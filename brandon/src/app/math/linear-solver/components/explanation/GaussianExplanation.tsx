import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const GaussianExplanation: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Understanding Gaussian Elimination</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Gaussian elimination is a method for solving systems of linear equations. The algorithm transforms 
              the augmented matrix [A|b] into row echelon form through a sequence of elementary row operations:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-4">
              <li>Swapping two rows</li>
              <li>Multiplying a row by a non-zero scalar</li>
              <li>Adding a multiple of one row to another row</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300">
              Once in row echelon form, back substitution is used to find the values of the variables.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
                {`
[a₁₁ a₁₂ a₁₃ | b₁]    [1  a'₁₂ a'₁₃ | b'₁]
[a₂₁ a₂₂ a₂₃ | b₂] →  [0  1    a'₂₃ | b'₂]
[a₃₁ a₃₂ a₃₃ | b₃]    [0  0    1    | b'₃]
                `}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GaussianExplanation; 