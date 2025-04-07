import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

export default function ExplanationPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Win Probability Ledgers</h2>
        
        <p>
          Win probability ledgers are mathematical tools used to track, analyze, and predict the likelihood of 
          winning in various scenarios, particularly in games, sports, and gambling contexts. They provide a 
          structured way to understand how different events and decisions affect overall outcomes.
        </p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basics">Basic Concepts</TabsTrigger>
          <TabsTrigger value="mathematics">Mathematical Foundation</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Methods</TabsTrigger>
          <TabsTrigger value="examples">Practical Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">What is a Win Probability Ledger?</h3>
              <p className="mb-4">
                A win probability ledger is a systematic record of probabilities associated with winning outcomes 
                in a sequence of events or decisions. It tracks how these probabilities change over time based on 
                new information, actions taken, or external factors.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Key Components</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Initial Probabilities:</strong> Starting likelihood of winning</li>
                    <li><strong>Events/Actions:</strong> Occurrences that affect probabilities</li>
                    <li><strong>Probability Updates:</strong> Recalculations after each event</li>
                    <li><strong>Final Outcome:</strong> The ultimate result (win or loss)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Common Applications</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Sports Analytics:</strong> In-game win probability models</li>
                    <li><strong>Gambling:</strong> Betting odds calculations</li>
                    <li><strong>Game Theory:</strong> Strategic decision analysis</li>
                    <li><strong>Financial Markets:</strong> Trading success probability</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Visualization Methods</h4>
              <p className="mb-4">
                Win probability ledgers are often visualized through:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Win Probability Charts:</strong> Graphs showing probability changes over time</li>
                <li><strong>Heat Maps:</strong> Visual representations of probability distributions</li>
                <li><strong>Decision Trees:</strong> Branching diagrams showing different possible outcomes</li>
                <li><strong>Tabular Ledgers:</strong> Spreadsheet-like records of probability changes</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Mathematical Foundation</h3>
              
              <h4 className="text-lg font-medium mb-3">Probability Theory Basics</h4>
              <p className="mb-4">
                Win probability ledgers are built on fundamental concepts from probability theory:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Key Probability Concepts</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Sample Space (Ω):</strong> The set of all possible outcomes</li>
                  <li><strong>Events:</strong> Subsets of the sample space</li>
                  <li><strong>Probability Measure (P):</strong> A function assigning a probability to each event</li>
                  <li><strong>Conditional Probability:</strong> The probability of an event given that another event has occurred</li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Bayes' Theorem and Updates</h4>
              <p className="mb-4">
                Win probability ledgers often use Bayes' theorem to update probabilities as new information becomes available:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`P(A|B) = \\frac{P(B|A) \\times P(A)}{P(B)}`}
                </MathJax>
              </div>
              <p className="mb-6">
                Where:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>P(A|B) is the probability of event A given that B has occurred</li>
                <li>P(B|A) is the probability of event B given that A has occurred</li>
                <li>P(A) is the prior probability of event A</li>
                <li>P(B) is the probability of event B</li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Markov Processes</h4>
              <p className="mb-4">
                Many win probability models use Markov processes, where the probability of future states depends only on the current state:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`P(X_{n+1} = x | X_1 = x_1, X_2 = x_2, ..., X_n = x_n) = P(X_{n+1} = x | X_n = x_n)`}
                </MathJax>
              </div>
              <p>
                This property allows for efficient calculation of win probabilities in sequential events.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Expected Value and Utility</h3>
              
              <p className="mb-4">
                Win probability ledgers often incorporate expected value calculations to evaluate decisions:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`E[X] = \\sum_{i=1}^{n} x_i \\times P(x_i)`}
                </MathJax>
              </div>
              <p className="mb-6">
                Where:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>E[X] is the expected value</li>
                <li>x<sub>i</sub> are the possible outcomes</li>
                <li>P(x<sub>i</sub>) is the probability of each outcome</li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Risk Assessment</h4>
              <p className="mb-4">
                Beyond simple win probabilities, ledgers often include variance and other risk measures:
              </p>
              <div className="my-6 flex justify-center">
                <MathJax>
                  {`Var(X) = E[(X - E[X])^2] = \\sum_{i=1}^{n} (x_i - E[X])^2 \\times P(x_i)`}
                </MathJax>
              </div>
              <p>
                These measures help quantify the uncertainty associated with different strategies and decisions.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Analysis Methods</h3>
              
              <h4 className="text-lg font-medium mb-3">Statistical Modeling</h4>
              <p className="mb-4">
                Win probability ledgers often employ various statistical models to analyze and predict outcomes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Regression Models:</strong> Used to identify factors that influence win probabilities
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Example: Logistic regression to predict binary win/loss outcomes based on multiple variables
                  </p>
                </li>
                <li>
                  <strong>Time Series Analysis:</strong> Examines how win probabilities change over time
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Example: ARIMA models to forecast future win probabilities based on historical patterns
                  </p>
                </li>
                <li>
                  <strong>Monte Carlo Simulations:</strong> Runs thousands of random simulations to estimate probabilities
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Example: Simulating the remainder of a game 10,000 times to estimate win probability
                  </p>
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Sensitivity Analysis</h4>
              <p className="mb-4">
                Understanding how changes in different factors affect win probabilities:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Key Questions in Sensitivity Analysis</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>How much does the win probability change if factor X increases by 10%?</li>
                  <li>Which factors have the greatest impact on the final outcome?</li>
                  <li>Are there threshold values where win probability changes dramatically?</li>
                  <li>How robust is the model to unexpected events or outliers?</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Advanced Analysis Techniques</h3>
              
              <h4 className="text-lg font-medium mb-3">Machine Learning Approaches</h4>
              <p className="mb-4">
                Modern win probability ledgers increasingly use machine learning techniques:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Neural Networks:</strong> Can capture complex, non-linear relationships in data
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Example: Deep learning models that process multiple data streams simultaneously
                  </p>
                </li>
                <li>
                  <strong>Ensemble Methods:</strong> Combine multiple models for improved accuracy
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Example: Random forests or gradient boosting to aggregate predictions
                  </p>
                </li>
                <li>
                  <strong>Reinforcement Learning:</strong> Models that learn optimal strategies through trial and error
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Example: RL agents that learn to maximize win probability in complex environments
                  </p>
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Real-time Analysis</h4>
              <p className="mb-4">
                Modern win probability ledgers often operate in real-time, updating with each new piece of information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Stream Processing:</strong> Continuously updating probabilities as events occur</li>
                <li><strong>Adaptive Models:</strong> Systems that adjust their parameters based on recent performance</li>
                <li><strong>Anomaly Detection:</strong> Identifying unusual patterns that may significantly impact win probability</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Practical Examples</h3>
              
              <h4 className="text-lg font-medium mb-3">Sports Analytics</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Basketball Win Probability Example</h5>
                <p className="mb-2">
                  Consider a basketball game where Team A has a 65% win probability at the start of the 4th quarter with a 6-point lead:
                </p>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-2">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score Diff</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Win Prob.</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">12:00</td>
                      <td className="px-3 py-2 whitespace-nowrap">Start of 4th</td>
                      <td className="px-3 py-2 whitespace-nowrap">+6</td>
                      <td className="px-3 py-2 whitespace-nowrap">65%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">10:24</td>
                      <td className="px-3 py-2 whitespace-nowrap">Team B 3-pointer</td>
                      <td className="px-3 py-2 whitespace-nowrap">+3</td>
                      <td className="px-3 py-2 whitespace-nowrap">58%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">8:15</td>
                      <td className="px-3 py-2 whitespace-nowrap">Team A turnover</td>
                      <td className="px-3 py-2 whitespace-nowrap">+3</td>
                      <td className="px-3 py-2 whitespace-nowrap">55%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">6:30</td>
                      <td className="px-3 py-2 whitespace-nowrap">Team A 2-pointer</td>
                      <td className="px-3 py-2 whitespace-nowrap">+5</td>
                      <td className="px-3 py-2 whitespace-nowrap">62%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">2:15</td>
                      <td className="px-3 py-2 whitespace-nowrap">Team B 3-pointer</td>
                      <td className="px-3 py-2 whitespace-nowrap">+2</td>
                      <td className="px-3 py-2 whitespace-nowrap">53%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">0:45</td>
                      <td className="px-3 py-2 whitespace-nowrap">Team A free throws</td>
                      <td className="px-3 py-2 whitespace-nowrap">+4</td>
                      <td className="px-3 py-2 whitespace-nowrap">78%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">0:00</td>
                      <td className="px-3 py-2 whitespace-nowrap">Game End</td>
                      <td className="px-3 py-2 whitespace-nowrap">+4</td>
                      <td className="px-3 py-2 whitespace-nowrap">100%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This ledger tracks how each event affects the win probability throughout the game.
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Gambling and Casino Games</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Blackjack Win Probability Example</h5>
                <p className="mb-2">
                  A blackjack player's win probability changes with each card dealt:
                </p>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-2">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Player Hand</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Dealer Shows</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Win Prob.</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Initial Deal</td>
                      <td className="px-3 py-2 whitespace-nowrap">10, 6</td>
                      <td className="px-3 py-2 whitespace-nowrap">9</td>
                      <td className="px-3 py-2 whitespace-nowrap">43%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Player Hits</td>
                      <td className="px-3 py-2 whitespace-nowrap">10, 6, 3</td>
                      <td className="px-3 py-2 whitespace-nowrap">9</td>
                      <td className="px-3 py-2 whitespace-nowrap">39%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Player Stands</td>
                      <td className="px-3 py-2 whitespace-nowrap">10, 6, 3</td>
                      <td className="px-3 py-2 whitespace-nowrap">9</td>
                      <td className="px-3 py-2 whitespace-nowrap">39%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Dealer Reveals</td>
                      <td className="px-3 py-2 whitespace-nowrap">10, 6, 3</td>
                      <td className="px-3 py-2 whitespace-nowrap">9, 8</td>
                      <td className="px-3 py-2 whitespace-nowrap">100%</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The dealer busts with 17, giving the player a win with 19.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Business and Financial Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Project Success Probability</h4>
              <p className="mb-4">
                Win probability ledgers can track the likelihood of project success:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Software Development Project Example</h5>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-2">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Milestone</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Event</th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Success Prob.</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Project Start</td>
                      <td className="px-3 py-2 whitespace-nowrap">Initial planning</td>
                      <td className="px-3 py-2 whitespace-nowrap">65%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Week 2</td>
                      <td className="px-3 py-2 whitespace-nowrap">Key developer quits</td>
                      <td className="px-3 py-2 whitespace-nowrap">48%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Week 4</td>
                      <td className="px-3 py-2 whitespace-nowrap">New hire onboarded</td>
                      <td className="px-3 py-2 whitespace-nowrap">52%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Week 8</td>
                      <td className="px-3 py-2 whitespace-nowrap">Prototype completed early</td>
                      <td className="px-3 py-2 whitespace-nowrap">71%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Week 12</td>
                      <td className="px-3 py-2 whitespace-nowrap">Testing reveals major bug</td>
                      <td className="px-3 py-2 whitespace-nowrap">58%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Week 14</td>
                      <td className="px-3 py-2 whitespace-nowrap">Bug fixed, final testing</td>
                      <td className="px-3 py-2 whitespace-nowrap">85%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 whitespace-nowrap">Week 16</td>
                      <td className="px-3 py-2 whitespace-nowrap">Project delivered</td>
                      <td className="px-3 py-2 whitespace-nowrap">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Investment Decision Making</h4>
              <p>
                Win probability ledgers can help track investment success probabilities based on changing market conditions, 
                company announcements, economic indicators, and other relevant factors. These tools allow investors to make 
                more informed decisions by quantifying the likelihood of various outcomes and how these probabilities evolve 
                over time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
