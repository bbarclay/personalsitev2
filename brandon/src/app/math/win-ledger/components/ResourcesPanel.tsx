import React from 'react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export default function ResourcesPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Learning Resources</h2>
        
        <p>
          Explore these resources to deepen your understanding of win probability ledgers, 
          their mathematical foundations, and applications across various fields.
        </p>
      </div>

      <Tabs defaultValue="books">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="books">Books & Articles</TabsTrigger>
          <TabsTrigger value="courses">Courses & Videos</TabsTrigger>
          <TabsTrigger value="tools">Tools & Software</TabsTrigger>
          <TabsTrigger value="related">Related Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Books</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Success Equation: Untangling Skill and Luck in Business, Sports, and Investing</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Michael J. Mauboussin (2012)</p>
                    <p className="mt-1">Explores how to recognize the role of skill and luck in outcomes, with extensive discussion of probability models in sports and business.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Mathletics: How Gamblers, Managers, and Sports Enthusiasts Use Mathematics in Baseball, Basketball, and Football</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wayne L. Winston (2012)</p>
                    <p className="mt-1">A comprehensive guide to sports analytics, including detailed explanations of win probability models in various sports.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Theory of Poker</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">David Sklansky (1999)</p>
                    <p className="mt-1">A classic text on poker strategy that explains fundamental concepts of probability and expected value in gambling contexts.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Academic Papers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.jstor.org/stable/2685731" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        A New Method for Estimating Win Probabilities in the NBA <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Journal of Quantitative Analysis in Sports</p>
                    <p className="mt-1">Presents a mathematical model for calculating win probabilities in basketball games based on score, time remaining, and possession.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.tandfonline.com/doi/abs/10.1080/02664763.2018.1473342" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Dynamic Probability Models for Sports Outcome Prediction <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Journal of Applied Statistics</p>
                    <p className="mt-1">Explores various statistical approaches to modeling win probabilities in real-time during sporting events.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sciencedirect.com/science/article/abs/pii/S0377221718304764" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Probability Models for Strategic Decision Making <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">European Journal of Operational Research</p>
                    <p className="mt-1">Discusses the application of probability models in business strategy and decision-making processes.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Articles and Blogs</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://fivethirtyeight.com/features/how-our-nfl-predictions-work/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        How Our NFL Predictions Work - FiveThirtyEight <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Detailed explanation of FiveThirtyEight's NFL prediction model, including their approach to win probability calculations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://towardsdatascience.com/building-a-win-probability-model-part-1-5f23e8b01b2c" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Building a Win Probability Model - Towards Data Science <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Step-by-step guide to creating a win probability model using machine learning techniques.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.advancedfootballanalytics.com/index.php/home/stats/stats-explained/win-probability" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Win Probability Explained - Advanced Football Analytics <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive explanation of win probability models in American football, including methodology and applications.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Courses</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.coursera.org/learn/sports-analytics" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Sports Analytics - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">University of Michigan</p>
                    <p className="mt-1">Covers various aspects of sports analytics, including win probability models and their applications in different sports.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.edx.org/course/probability-the-science-of-uncertainty-and-data" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Probability: The Science of Uncertainty and Data - edX <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">MIT</p>
                    <p className="mt-1">Provides a strong foundation in probability theory, which is essential for understanding win probability models.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.udemy.com/course/bayesian-machine-learning-in-python-ab-testing/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Bayesian Machine Learning in Python: A/B Testing - Udemy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Explores Bayesian methods for updating probabilities, which are directly applicable to win probability ledgers.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Video Lectures and Tutorials</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=6UlWVH9GZbM" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Introduction to Sports Analytics - MIT Sloan Sports Analytics Conference <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Overview of sports analytics, including win probability models and their applications in professional sports.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=8idr1WZ1A7Q" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Bayesian Statistics and Probability Models - StatQuest <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Clear explanation of Bayesian statistics, which forms the foundation of many win probability models.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=TuTGq3yx_c4" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Building Win Probability Models with Python - PyData <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Practical tutorial on implementing win probability models using Python and machine learning libraries.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Webinars and Conferences</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sloansportsconference.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        MIT Sloan Sports Analytics Conference <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Annual conference featuring presentations on sports analytics, including win probability models and applications.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.kaggle.com/competitions" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Kaggle Competitions - Sports Prediction Challenges <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Participate in data science competitions focused on predicting sports outcomes and developing win probability models.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Software and Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Python with NumPy, Pandas, and Scikit-learn <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Essential programming tools for building and analyzing win probability models.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.r-project.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        R Statistical Software <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Powerful statistical programming language widely used for probability modeling and analysis.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.tableau.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Tableau <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Data visualization tool that can be used to create interactive win probability charts and dashboards.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://pymc.io/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        PyMC3 <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Python library for Bayesian statistical modeling and probabilistic machine learning.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Data Sources</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sports-reference.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Sports Reference <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive database of sports statistics for various sports, useful for building win probability models.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.kaggle.com/datasets" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Kaggle Datasets <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Collection of datasets for various domains, including sports, gambling, and business, which can be used for win probability analysis.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.nba.com/stats" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        NBA Stats <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Official NBA statistics, including advanced metrics that can be used in basketball win probability models.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Calculators and Simulators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.fangraphs.com/livewins.aspx" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        FanGraphs Win Probability Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Interactive tool for calculating and visualizing win probability in baseball games.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.advancedfootballanalytics.com/index.php/home/tools/live-wp-graph" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Advanced Football Analytics Win Probability Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Tool for calculating win probability in football games based on score, time, and other factors.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.cardplayer.com/poker-tools/odds-calculator/texas-holdem" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Poker Odds Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Calculator for determining win probabilities in poker hands, useful for understanding gambling probability concepts.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Tools on This Site</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/statistics-analyzer" className="flex items-center">
                        Statistics Analyzer
                      </Link>
                    </p>
                    <p className="mt-1">Tool for analyzing statistical data, which is essential for building win probability models.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/slot-machine" className="flex items-center">
                        Slot Machine Simulator
                      </Link>
                    </p>
                    <p className="mt-1">Interactive tool for understanding probability concepts in gambling contexts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/bonus-game" className="flex items-center">
                        Bonus Game Simulator
                      </Link>
                    </p>
                    <p className="mt-1">Tool for exploring probability concepts in game scenarios with variable outcomes.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Mathematical Concepts</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Bayesian Statistics</p>
                    <p className="mt-1">Mathematical framework for updating probabilities based on new evidence, which is fundamental to win probability ledgers.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Markov Processes</p>
                    <p className="mt-1">Mathematical systems where future states depend only on the current state, not on the sequence of events that preceded it.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Expected Value Theory</p>
                    <p className="mt-1">Mathematical concept that calculates the average outcome of a random variable, essential for decision-making in probabilistic contexts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Monte Carlo Simulation</p>
                    <p className="mt-1">Computational technique that uses repeated random sampling to obtain numerical results and probability distributions.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Professional Organizations and Communities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.informs.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        INFORMS (Institute for Operations Research and the Management Sciences) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Professional society for operations research and analytics, with resources on probability modeling and decision analysis.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.amstat.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        American Statistical Association <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Professional organization for statisticians, with resources on probability theory and statistical modeling.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sabr.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Society for American Baseball Research (SABR) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Organization dedicated to baseball research, including statistical analysis and win probability modeling in baseball.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
