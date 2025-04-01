import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const EchelonFormExplanation: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-xl font-semibold mb-4">Row Echelon Form</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              A matrix is in row echelon form when:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>All rows consisting of only zeros are at the bottom</li>
              <li>The first non-zero entry in each non-zero row is a 1 (leading 1)</li>
              <li>The leading 1 in each row appears to the right of the leading 1 in the row above</li>
            </ul>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-center font-medium mb-2">Row Echelon Form</p>
              <pre className="text-sm">
                {`
[1 * * * | *]
[0 1 * * | *]
[0 0 1 * | *]
[0 0 0 0 | 0]
                `}
              </pre>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-center font-medium mb-2">Reduced Row Echelon Form</p>
              <pre className="text-sm">
                {`
[1 0 0 * | *]
[0 1 0 * | *]
[0 0 1 * | *]
[0 0 0 0 | 0]
                `}
              </pre>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EchelonFormExplanation; 