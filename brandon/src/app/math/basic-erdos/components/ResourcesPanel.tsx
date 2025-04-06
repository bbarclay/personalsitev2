import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink } from 'lucide-react';

const ResourcesPanel = () => {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Resources for the Erdős Discrepancy Problem</h2>
        
        <p>
          Explore these resources to deepen your understanding of the Erdős Discrepancy Problem
          and related topics in mathematics and computer science.
        </p>
      </div>

      <Tabs defaultValue="articles">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="articles">Articles & Papers</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Academic Papers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://arxiv.org/abs/1509.05363" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Erdős discrepancy problem <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Terence Tao (2015)</p>
                    <p className="mt-1">The original paper where Terence Tao proves the Erdős Discrepancy Conjecture.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://arxiv.org/abs/1402.2184" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Multiplicative functions in short intervals <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Kaisa Matomäki, Maksym Radziwiłł (2014)</p>
                    <p className="mt-1">A paper that provided key insights used in Tao's proof.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://arxiv.org/abs/1402.6174" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Erdős Discrepancy Problem: Computational Experiments <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Boris Konev, Alexei Lisitsa (2014)</p>
                    <p className="mt-1">Computational verification that the discrepancy must be at least 2 for sequences of length 1161 and above.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Blog Posts & Expository Articles</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://terrytao.wordpress.com/2015/09/18/the-erdos-discrepancy-problem/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Erdős discrepancy problem - Terence Tao's Blog <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Terence Tao</p>
                    <p className="mt-1">Tao's own explanation of his proof, written for a mathematical audience.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.quantamagazine.org/terence-taos-answer-to-the-erdos-discrepancy-problem-20151001/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Terence Tao's Answer to the Erdős Discrepancy Problem - Quanta Magazine <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Erica Klarreich</p>
                    <p className="mt-1">An accessible explanation of the problem and Tao's solution.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://gowers.wordpress.com/2015/09/20/erdoss-discrepancy-problem-has-been-solved-by-terence-tao/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Erdős's discrepancy problem has been solved by Terence Tao - Gowers's Weblog <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Timothy Gowers</p>
                    <p className="mt-1">Another mathematician's perspective on the significance of the solution.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Lectures & Presentations</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=OuEHcJ7CCog" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Erdős Discrepancy Problem - Terence Tao <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">UCLA</p>
                    <p className="mt-1">Tao explains his solution in a lecture at UCLA.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=OU-W7rC9Kdo" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Numberphile: Discrepancy <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Numberphile</p>
                    <p className="mt-1">An accessible explanation of the Erdős Discrepancy Problem for a general audience.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=cWNEl4HE2OE" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Polymath Project and the Erdős Discrepancy Problem <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Institute for Advanced Study</p>
                    <p className="mt-1">Discussion of how the collaborative Polymath Project contributed to solving the problem.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Books on Related Topics</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Discrepancy Method: Randomness and Complexity</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Bernard Chazelle (2000)</p>
                    <p className="mt-1">A comprehensive introduction to discrepancy theory and its applications in computer science.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Geometric Discrepancy: An Illustrated Guide</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Jiří Matoušek (1999)</p>
                    <p className="mt-1">An accessible introduction to discrepancy theory with many illustrations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Ramsey Theory</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ronald L. Graham, Bruce L. Rothschild, Joel H. Spencer (1990)</p>
                    <p className="mt-1">A classic text on Ramsey theory, which is closely related to the Erdős Discrepancy Problem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Probabilistic Method</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Noga Alon, Joel H. Spencer (2000)</p>
                    <p className="mt-1">Covers probabilistic techniques that are relevant to discrepancy theory.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Interactive Resources</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://polymathprojects.org/2010/09/01/polymath5-the-erdos-discrepancy-problem/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Polymath5: The Erdős Discrepancy Problem <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Polymath Project</p>
                    <p className="mt-1">The collaborative mathematics project that worked on the problem.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://demonstrations.wolfram.com/DiscrepancyOfASequence/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Discrepancy of a Sequence - Wolfram Demonstrations <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Wolfram Demonstrations Project</p>
                    <p className="mt-1">An interactive demonstration of sequence discrepancy.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://github.com/supakeen/erdos-discrepancy" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Erdős Discrepancy Calculator <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">GitHub Repository</p>
                    <p className="mt-1">A tool for calculating discrepancy in custom sequences.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesPanel;
