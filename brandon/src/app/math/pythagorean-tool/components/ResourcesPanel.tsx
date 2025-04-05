import React from 'react';

const ResourcesPanel = () => {
  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold">Resources</h2>
        <p>
          Explore these resources to deepen your understanding of the Pythagorean theorem and its applications.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-3">Educational Videos</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="text-blue-500 mr-2">📹</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Khan Academy: The Pythagorean theorem
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clear explanation of the theorem with interactive examples.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-blue-500 mr-2">📹</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  3Blue1Brown: Pythagorean theorem visualization
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Beautiful visual proof of the Pythagorean theorem.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-blue-500 mr-2">📹</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Numberphile: Different proofs of the Pythagorean theorem
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Exploring some of the hundreds of different ways to prove the theorem.
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-3">Recommended Books</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="text-purple-500 mr-2">📚</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  "The Pythagorean Theorem: A 4,000-Year History" by Eli Maor
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Traces the theorem's rich history from ancient Babylon to the present.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-purple-500 mr-2">📚</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  "The Joy of x: A Guided Tour of Math, from One to Infinity" by Steven Strogatz
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Includes an excellent chapter on the Pythagorean theorem and its applications.
                </p>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium mb-3">Interactive Websites</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="text-green-500 mr-2">🌐</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Desmos: Interactive Pythagorean Theorem Explorer
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Manipulate triangle sides and see the theorem in action.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-green-500 mr-2">🌐</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  GeoGebra: Pythagorean Theorem Visualizations
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Interactive geometry tool to explore various proofs of the theorem.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-green-500 mr-2">🌐</div>
              <div>
                <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                  Math is Fun: Pythagorean Theorem
                </a>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clear explanations and interactive examples for beginners.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPanel; 