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
          Explore these resources to deepen your understanding of the Riemann zeta function,
          the Riemann Hypothesis, and their connections to various fields of mathematics and physics.
        </p>
      </div>

      <Tabs defaultValue="books">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="books">Books & Articles</TabsTrigger>
          <TabsTrigger value="videos">Videos & Lectures</TabsTrigger>
          <TabsTrigger value="tools">Interactive Tools</TabsTrigger>
          <TabsTrigger value="courses">Courses & Tutorials</TabsTrigger>
        </TabsList>

        <TabsContent value="books" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Books</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">Prime Obsession: Bernhard Riemann and the Greatest Unsolved Problem in Mathematics</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">John Derbyshire (2003)</p>
                    <p className="mt-1">An accessible introduction to the Riemann Hypothesis for general readers, combining mathematical exposition with historical narrative.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Riemann Hypothesis: A Resource for the Afficionado and Virtuoso Alike</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Peter Borwein, Stephen Choi, Brendan Rooney, Andrea Weirathmueller (2008)</p>
                    <p className="mt-1">A comprehensive collection of papers and resources on the Riemann Hypothesis, suitable for advanced undergraduate and graduate students.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">The Theory of the Riemann Zeta-Function</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">E.C. Titchmarsh, revised by D.R. Heath-Brown (1986)</p>
                    <p className="mt-1">A classic and authoritative mathematical treatment of the Riemann zeta function, suitable for graduate students and researchers.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Articles & Papers</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.claymath.org/millennium-problems/riemann-hypothesis" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Hypothesis - Clay Mathematics Institute <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Official description of the Riemann Hypothesis as one of the seven Millennium Prize Problems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.ams.org/notices/200303/fea-conrey-web.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Hypothesis - Notices of the AMS <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">J. Brian Conrey (2003)</p>
                    <p className="mt-1">An excellent survey article on the Riemann Hypothesis, accessible to undergraduate mathematics students.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://en.wikipedia.org/wiki/Riemann_zeta_function" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Riemann zeta function - Wikipedia <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive encyclopedia article with numerous references and connections to other topics.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Video Lectures & Documentaries</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=d6c6uIyieoo" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Riemann Hypothesis - Numberphile <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An accessible introduction to the Riemann Hypothesis by mathematician Edward Frenkel.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=rGo2hsoJSbo" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Hypothesis, Explained - 3Blue1Brown <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A visually engaging explanation of the Riemann zeta function and the Riemann Hypothesis.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.youtube.com/watch?v=sD0NjbwqlYw" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Hypothesis - MSRI Public Lecture <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Peter Sarnak</p>
                    <p className="mt-1">A more advanced lecture on the Riemann Hypothesis and its connections to other areas of mathematics.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Related Tools on This Site</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/p-adic" className="flex items-center">
                        P-adic Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Explore p-adic numbers, which have connections to the Riemann zeta function through adelic formulations.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/polynomial" className="flex items-center">
                        Polynomial Calculator
                      </Link>
                    </p>
                    <p className="mt-1">Work with polynomials, which share many properties with the Riemann zeta function in terms of their zeros and factorization.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <Link href="/math/prime-observatory" className="flex items-center">
                        Prime Observatory
                      </Link>
                    </p>
                    <p className="mt-1">Visualize and explore prime numbers, whose distribution is intimately connected to the Riemann zeta function.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">External Interactive Resources</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.desmos.com/calculator/sw5cuvtnge" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Riemann Zeta Function Visualizer - Desmos <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An interactive graph of the Riemann zeta function for real inputs.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://demonstrations.wolfram.com/TheRiemannZetaFunction/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Zeta Function - Wolfram Demonstrations <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Interactive demonstrations of various aspects of the Riemann zeta function.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.geogebra.org/m/nbjfjtpv" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Riemann Zeta Function Explorer - GeoGebra <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A GeoGebra applet for exploring the behavior of the Riemann zeta function.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Online Courses & Tutorials</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.coursera.org/learn/analytic-number-theory" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Introduction to Analytic Number Theory - Coursera <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A course covering the foundations of analytic number theory, including the Riemann zeta function.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://ocw.mit.edu/courses/mathematics/18-104-seminar-in-analysis-applications-to-number-theory-fall-2006/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Seminar in Analysis: Applications to Number Theory - MIT OpenCourseWare <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">An undergraduate seminar that covers the Riemann zeta function and its applications.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://www.math.leidenuniv.nl/~hwl/PUBLICATIONS/1995-zeta/index.html" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        The Riemann Zeta Function: An Introduction - H.W. Lenstra <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A comprehensive tutorial on the Riemann zeta function with detailed explanations and proofs.</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Research Groups & Communities</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://aimath.org/rh/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        American Institute of Mathematics: Riemann Hypothesis <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Resources and workshops related to the Riemann Hypothesis and related problems.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://math.stackexchange.com/questions/tagged/riemann-zeta" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Mathematics Stack Exchange: Riemann Zeta Function <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">A collection of questions and answers about the Riemann zeta function from the mathematics community.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
                      <a href="https://terrytao.wordpress.com/tag/riemann-zeta-function/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Terence Tao's Blog: Posts on the Riemann Zeta Function <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </p>
                    <p className="mt-1">Blog posts by Fields Medalist Terence Tao on topics related to the Riemann zeta function.</p>
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