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
          Explore these resources to deepen your understanding of slot machines, probability mathematics, 
          game design principles, and the psychology of variable reward systems.
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
              <h3 className="text-xl font-semibold mb-4">Books on Probability and Game Design</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Addiction by Design: Machine Gambling in Las Vegas</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Natasha Dow Schüll</p>
                    <p className="mt-1">An anthropological study of slot machine design and its relationship to gambling addiction, exploring how mathematical and psychological principles are applied in modern machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Hooked: How to Build Habit-Forming Products</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Nir Eyal</p>
                    <p className="mt-1">Explores how companies create products that form habits, including the variable reward mechanisms similar to those used in slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Mathematics of Games and Gambling</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Edward Packel</p>
                    <p className="mt-1">A comprehensive introduction to the mathematics behind various games of chance, including detailed explanations of probability concepts relevant to slot machines.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Academic Papers and Research</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sciencedirect.com/science/article/abs/pii/S0306452209003169" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Gambling Near-Misses Enhance Motivation to Gamble and Recruit Win-Related Brain Circuitry <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Clark et al., Neuron (2009)</p>
                    <p className="mt-1">Research on how near-miss outcomes in gambling affect brain activity and motivation to continue playing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.sciencedirect.com/science/article/abs/pii/S0747563214001289" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Psychology of Microtransactions in Video Games <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Hamari et al., Computers in Human Behavior (2014)</p>
                    <p className="mt-1">Examines how game design elements similar to slot machines are used in free-to-play games to encourage purchases.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.tandfonline.com/doi/abs/10.1080/14459795.2014.994220" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Structural Characteristics of Electronic Gaming Machines and Satisfaction of Play <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Parke & Griffiths, International Journal of Mental Health and Addiction (2015)</p>
                    <p className="mt-1">Analysis of how specific design elements in slot machines affect player experience and behavior.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Articles and Guides</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.gamedeveloper.com/design/the-psychology-of-rewards-in-game-design" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Psychology of Rewards in Game Design - Game Developer <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Comprehensive guide to implementing effective reward systems in games, drawing on principles from slot machine design.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.casinoguardian.co.uk/articles/mathematics-behind-slot-machines/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Mathematics Behind Slot Machines - Casino Guardian <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Detailed explanation of the probability calculations, RNG systems, and payout structures in modern slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.behavioraleconomics.com/resources/mini-encyclopedia-of-be/variable-rewards/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Variable Rewards - Behavioral Economics <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Overview of variable reward schedules and their applications in behavioral economics and product design.</p>
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
                      <a href="https://www.coursera.org/learn/game-design-and-development" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Game Design and Development - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Michigan State University</p>
                    <p className="mt-1">Covers game design principles including reward systems and player engagement mechanics similar to those used in slot machines.</p>
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
                    <p className="mt-1">Comprehensive introduction to probability theory, which forms the mathematical foundation of slot machine design.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.udemy.com/course/behavioral-economics-psychology-of-decision-making/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Behavioral Economics: The Psychology of Decision Making - Udemy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Explores cognitive biases and decision-making processes relevant to understanding gambling behavior and game design.</p>
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
                      <a href="https://www.youtube.com/watch?v=7u0ij9D5S4Y" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Mathematics of Gambling - Numberphile <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Clear explanation of the probability concepts behind various gambling games, including slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=tWtvrPTbQ_c" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Game Reward Systems - Extra Credits <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Analysis of how different reward structures affect player behavior and engagement in video games.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=axrHVDvjVw8" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Science of Addiction: Gambling, Gaming, and Technology - SciShow Psych <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Explores the psychological and neurological mechanisms behind addictive behaviors related to gambling and gaming.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Conferences and Webinars</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.gdconf.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Game Developers Conference (GDC) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Annual conference featuring talks on game design, including sessions on reward systems and player psychology.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.igamingnext.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        iGaming Next <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Conference focused on the online gambling industry, with presentations on game design, player engagement, and responsible gaming.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Software and Development Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://unity.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Unity Game Engine <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Popular game development platform that can be used to create slot machine simulations and games with similar mechanics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.unrealengine.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Unreal Engine <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Powerful game engine with visual scripting capabilities, suitable for creating interactive simulations with complex probability systems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Python with NumPy and Matplotlib <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Programming language and libraries ideal for simulating and visualizing probability distributions and random processes.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Simulation and Calculation Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.wolframalpha.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Wolfram Alpha <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Computational knowledge engine that can perform complex probability calculations and visualize distributions.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.geogebra.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        GeoGebra <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Interactive mathematics software that can be used to create visual demonstrations of probability concepts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.desmos.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Desmos Graphing Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Online graphing calculator that can visualize probability distributions and expected value calculations.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Game Design Resources</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://machinations.io/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Machinations <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Game economy and system design tool that can model and simulate reward systems similar to those in slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.gamasutra.com/category/design/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Gamasutra Design Articles <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Collection of articles on game design principles, including reward systems and player psychology.</p>
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
                      <Link href="/math/probability-calculator" className="flex items-center">
                        Probability Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Calculate probabilities for various distributions and scenarios, useful for understanding the mathematics behind slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/win-ledger" className="flex items-center">
                        Win Probability Ledger
                      </Link>
                    </p>
                    <p className="mt-1">Track and analyze win probabilities in various scenarios, similar to how slot machine outcomes are calculated.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/bonus-game" className="flex items-center">
                        Bonus Game Simulator
                      </Link>
                    </p>
                    <p className="mt-1">Explore the mechanics of bonus games similar to those found in modern slot machines.</p>
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
                    <p className="font-medium">Probability Theory</p>
                    <p className="mt-1">The mathematical study of random phenomena, which forms the foundation of slot machine design and analysis.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Expected Value</p>
                    <p className="mt-1">The average outcome of a random variable, used to calculate the long-term return of slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Variance and Standard Deviation</p>
                    <p className="mt-1">Measures of dispersion that quantify the volatility of slot machine outcomes.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Combinatorics</p>
                    <p className="mt-1">The study of counting, arrangement, and combination, used to calculate the number of possible outcomes in slot machines.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Random Number Generation</p>
                    <p className="mt-1">Algorithms and methods for producing sequences of numbers that appear random, essential for fair slot machine operation.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Fields of Study</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Behavioral Economics</p>
                    <p className="mt-1">The study of psychological, social, cognitive, and emotional factors that influence economic decisions, relevant to understanding gambling behavior.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Game Design</p>
                    <p className="mt-1">The art and science of creating engaging interactive experiences, which draws on many principles used in slot machine design.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">User Experience (UX) Design</p>
                    <p className="mt-1">The process of enhancing user satisfaction by improving the usability, accessibility, and pleasure provided in the interaction with a product.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Addiction Studies</p>
                    <p className="mt-1">Research into the psychological and neurological mechanisms of addictive behaviors, including gambling addiction.</p>
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
