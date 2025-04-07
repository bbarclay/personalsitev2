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
          Explore these resources to deepen your understanding of statistical analysis, 
          from foundational concepts to advanced techniques and practical applications.
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
              <h3 className="text-xl font-semibold mb-4">Introductory Books</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Statistics in Plain English</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Timothy C. Urdan</p>
                    <p className="mt-1">A beginner-friendly introduction to statistics that explains complex concepts in accessible language without sacrificing accuracy.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Naked Statistics: Stripping the Dread from the Data</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Charles Wheelan</p>
                    <p className="mt-1">An engaging introduction to statistics that focuses on real-world applications and demystifies statistical concepts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">OpenIntro Statistics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">David M. Diez, Christopher D. Barr, and Mine Çetinkaya-Rundel</p>
                    <p className="mt-1">A free, open-source textbook that covers introductory statistics with a focus on applications and modern data analysis.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Advanced Books</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Elements of Statistical Learning</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Trevor Hastie, Robert Tibshirani, and Jerome Friedman</p>
                    <p className="mt-1">A comprehensive resource on statistical learning methods, covering both classical and modern techniques.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Statistical Rethinking: A Bayesian Course with Examples in R and Stan</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Richard McElreath</p>
                    <p className="mt-1">An accessible introduction to Bayesian statistics with practical examples and code.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Mostly Harmless Econometrics: An Empiricist's Companion</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Joshua D. Angrist and Jörn-Steffen Pischke</p>
                    <p className="mt-1">A guide to econometric tools for causal inference, with a focus on practical applications.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Articles and Papers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.nature.com/articles/nmeth.3368" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Points of Significance: Statistical Power and Sample Size - Nature Methods <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A clear explanation of statistical power and sample size considerations in experimental design.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The ASA Statement on p-Values: Context, Process, and Purpose - The American Statistician <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An important statement on the proper interpretation and use of p-values in statistical analysis.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Why Most Published Research Findings Are False - PLOS Medicine <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A thought-provoking paper on the challenges of statistical significance and reproducibility in research.</p>
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
                      <a href="https://www.coursera.org/specializations/statistics" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Statistics with R Specialization - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Duke University</p>
                    <p className="mt-1">A comprehensive introduction to statistics using R, covering probability, inference, regression, and Bayesian statistics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.edx.org/course/statistical-learning" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Statistical Learning - edX <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Stanford University</p>
                    <p className="mt-1">An introduction to statistical learning methods with applications in R, based on the popular textbook by Hastie and Tibshirani.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.datacamp.com/tracks/statistics-fundamentals-with-python" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Statistics Fundamentals with Python - DataCamp <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A hands-on course that teaches statistical concepts using Python, with a focus on practical data analysis.</p>
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
                      <a href="https://www.youtube.com/c/statquest" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        StatQuest with Josh Starmer - YouTube <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Clear, concise explanations of statistical concepts and machine learning algorithms with helpful visualizations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.khanacademy.org/math/statistics-probability" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Statistics and Probability - Khan Academy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Free, comprehensive video lessons on statistics and probability, from basic concepts to more advanced topics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Statistics Fundamentals - Brandon Foltz <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive playlist covering statistical concepts with clear explanations and examples.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Learning</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://seeing-theory.brown.edu/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Seeing Theory - Brown University <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A beautiful, interactive visualization of statistical concepts, designed to make statistics more accessible.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://rpsychologist.com/viz" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        R Psychologist Visualizations <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Interactive visualizations of statistical concepts like effect size, confidence intervals, and p-values.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Statistical Software</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.r-project.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        R <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A free, open-source programming language and environment for statistical computing and graphics, widely used in academia and research.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.python.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Python with NumPy, Pandas, and SciPy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Python libraries for numerical computing, data manipulation, and scientific computing, popular in data science and machine learning.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.stata.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Stata <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive statistical software package widely used in social sciences, economics, and biostatistics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ibm.com/products/spss-statistics" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        SPSS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A user-friendly statistical software package with a graphical interface, commonly used in social sciences and market research.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Tools and Calculators</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.socscistatistics.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Social Science Statistics <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Free online statistical calculators for common tests like t-tests, chi-square, and correlation.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.graphpad.com/quickcalcs/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        GraphPad QuickCalcs <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Free web calculators for common statistical analyses, particularly useful for biomedical research.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.danielsoper.com/statcalc/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Statistical Calculators - Daniel Soper <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A collection of free statistical calculators for various tests and analyses.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Data Visualization Tools</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://matplotlib.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Matplotlib <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive library for creating static, animated, and interactive visualizations in Python.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://ggplot2.tidyverse.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        ggplot2 <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A powerful data visualization package for R based on the grammar of graphics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.tableau.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Tableau <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A user-friendly data visualization tool that allows for interactive exploration of data.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://d3js.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        D3.js <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A JavaScript library for producing dynamic, interactive data visualizations in web browsers.</p>
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
                    <p className="mt-1">Calculate probabilities for various distributions and scenarios.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/regression-analyzer" className="flex items-center">
                        Regression Analyzer
                      </Link>
                    </p>
                    <p className="mt-1">Perform and visualize regression analysis on your data.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/hypothesis-tester" className="flex items-center">
                        Hypothesis Testing Tool
                      </Link>
                    </p>
                    <p className="mt-1">Conduct various statistical hypothesis tests and interpret the results.</p>
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
                    <p className="mt-1">The mathematical foundation of statistics, dealing with the analysis of random phenomena.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Linear Algebra</p>
                    <p className="mt-1">Essential for understanding multivariate statistics, principal component analysis, and many machine learning algorithms.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Calculus</p>
                    <p className="mt-1">Important for understanding optimization in statistical modeling and the derivation of many statistical methods.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Graph Theory</p>
                    <p className="mt-1">Relevant for network analysis, causal inference, and certain types of statistical modeling.</p>
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
                      <a href="https://www.amstat.org/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        American Statistical Association (ASA) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">The world's largest community of statisticians, offering resources, publications, and professional development opportunities.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.rss.org.uk/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Royal Statistical Society (RSS) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A UK-based professional body for statisticians and data analysts, providing resources and promoting the importance of statistics.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://stats.stackexchange.com/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Cross Validated (Stack Exchange) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A question and answer site for statisticians, data analysts, data miners, and data visualization experts.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.reddit.com/r/statistics/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        r/statistics (Reddit) <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An online community for discussing statistical concepts, methods, and applications.</p>
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
