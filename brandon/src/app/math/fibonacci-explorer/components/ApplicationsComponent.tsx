import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, 
  Cpu, 
  BrainCircuit, 
  Lightbulb, 
  BookOpen, 
  GraduationCap,
  Network,
  Flower,
  BarChart3,
  Palette,
  Building,
  Music
} from 'lucide-react';

const ApplicationsComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Applications of Fibonacci Numbers</CardTitle>
          <CardDescription className="text-lg">
            How Fibonacci numbers and the golden ratio are applied across different fields
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="computer-science" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="computer-science" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Computer Science</span>
          </TabsTrigger>
          <TabsTrigger value="art-design" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span>Art & Design</span>
          </TabsTrigger>
          <TabsTrigger value="nature" className="flex items-center gap-2">
            <Flower className="h-4 w-4" />
            <span>Nature</span>
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Finance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="computer-science" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-600" />
                  <CardTitle>Algorithms and Data Structures</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci numbers play a significant role in algorithm design and analysis:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Fibonacci heaps for efficient priority queue operations</li>
                  <li>• Analysis of recursive algorithms and time complexity</li>
                  <li>• Fibonacci search technique for sorted arrays</li>
                  <li>• Fibonacci coding for data compression</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These applications demonstrate the sequence's utility in optimizing computational processes.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  <CardTitle>Network Routing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci principles are applied in network optimization:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Fibonacci-based backoff algorithms for network congestion</li>
                  <li>• Load balancing using Fibonacci distribution</li>
                  <li>• Fibonacci counter-based broadcast protocols</li>
                  <li>• Path redundancy in Fibonacci-structured networks</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These techniques help create more efficient and resilient network systems.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-green-600" />
                  <CardTitle>Pseudorandom Number Generation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci sequences can be used in random number generation:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Fibonacci linear feedback shift registers</li>
                  <li>• Lagged Fibonacci generators</li>
                  <li>• Additive lagged-Fibonacci generators</li>
                  <li>• Multiplicative lagged-Fibonacci generators</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These generators produce sequences with good statistical properties for many applications.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-amber-600" />
                  <CardTitle>Artificial Intelligence</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci patterns appear in AI and machine learning:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Neural network architectures with Fibonacci-based layers</li>
                  <li>• Genetic algorithms using Fibonacci crossover points</li>
                  <li>• Optimization algorithms with golden ratio search intervals</li>
                  <li>• Pattern recognition in Fibonacci-structured data</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These applications leverage the sequence's inherent efficiency and natural patterns.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="art-design" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-blue-600" />
                  <CardTitle>Visual Arts</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The golden ratio derived from Fibonacci numbers guides artistic composition:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Rule of thirds approximates the golden ratio in photography</li>
                  <li>• Golden rectangle proportions in painting composition</li>
                  <li>• Spiral compositions based on the golden spiral</li>
                  <li>• Dynamic symmetry using Fibonacci-based grids</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These principles create visually pleasing and balanced compositions.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-purple-600" />
                  <CardTitle>Architecture</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Architectural design often incorporates Fibonacci proportions:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• The Parthenon's façade follows golden ratio proportions</li>
                  <li>• Le Corbusier's Modulor system based on Fibonacci numbers</li>
                  <li>• Sacred geometry in religious buildings</li>
                  <li>• Modern architectural design using golden section principles</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These applications create harmonious and aesthetically pleasing structures.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-green-600" />
                  <CardTitle>Music</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Musical composition and instrument design use Fibonacci principles:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Western scales with 8 notes (octave) and 13 chromatic tones</li>
                  <li>• Stradivarius violins with golden ratio proportions</li>
                  <li>• Musical form structured around Fibonacci numbers</li>
                  <li>• Rhythmic patterns based on Fibonacci sequences</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These applications create harmonious sounds and musical structures.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <CardTitle>Product Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Consumer products often incorporate golden ratio aesthetics:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Logo design using golden ratio proportions</li>
                  <li>• User interface layouts based on Fibonacci grids</li>
                  <li>• Product packaging with golden rectangle dimensions</li>
                  <li>• Furniture design incorporating Fibonacci proportions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These design principles create products that are visually appealing and user-friendly.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="nature" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Flower className="h-5 w-5 text-blue-600" />
                  <CardTitle>Botany</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Plants exhibit Fibonacci patterns in their growth:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Phyllotaxis (leaf arrangement) following Fibonacci spirals</li>
                  <li>• Flower petals in Fibonacci numbers (3, 5, 8, 13, 21, etc.)</li>
                  <li>• Seed heads arranged in Fibonacci spirals</li>
                  <li>• Pinecones with Fibonacci spiral patterns</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These patterns optimize sunlight exposure, seed packing, and structural stability.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  <CardTitle>Evolutionary Biology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci patterns appear in evolutionary processes:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Family tree branching in some species</li>
                  <li>• Population growth models following Fibonacci-like sequences</li>
                  <li>• Genetic code patterns with golden ratio properties</li>
                  <li>• Spiral patterns in DNA structure</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These patterns reflect efficient growth and adaptation strategies in nature.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-green-600" />
                  <CardTitle>Human Anatomy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  The human body exhibits numerous Fibonacci relationships:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Hand bone proportions following Fibonacci ratios</li>
                  <li>• Facial feature arrangements approximating golden ratios</li>
                  <li>• Spiral patterns in fingerprints</li>
                  <li>• DNA molecule dimensions related to Fibonacci numbers</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These proportions contribute to structural efficiency and functionality.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                  <CardTitle>Physics and Astronomy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci patterns appear in physical and astronomical systems:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Spiral galaxy formations resembling golden spirals</li>
                  <li>• Weather patterns with Fibonacci-like structures</li>
                  <li>• Wave interference patterns with Fibonacci properties</li>
                  <li>• Planetary orbital resonances with Fibonacci relationships</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These patterns reflect fundamental physical principles and energy minimization.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <CardTitle>Technical Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci retracement is widely used in market analysis:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Fibonacci retracement levels (23.6%, 38.2%, 61.8%)</li>
                  <li>• Fibonacci extension levels for price targets</li>
                  <li>• Fibonacci time zones for timing market moves</li>
                  <li>• Fibonacci fan lines for trend analysis</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These tools help traders identify potential support and resistance levels.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Network className="h-5 w-5 text-purple-600" />
                  <CardTitle>Elliott Wave Theory</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  This market analysis theory incorporates Fibonacci relationships:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Five-wave impulse and three-wave corrective patterns</li>
                  <li>• Wave relationships based on Fibonacci ratios</li>
                  <li>• Time relationships between waves using Fibonacci numbers</li>
                  <li>• Nested wave patterns following Fibonacci sequences</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                This theory suggests markets move in predictable patterns influenced by natural laws.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-green-600" />
                  <CardTitle>Algorithmic Trading</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Trading algorithms often incorporate Fibonacci principles:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Automated Fibonacci retracement trading systems</li>
                  <li>• Pattern recognition algorithms based on Fibonacci ratios</li>
                  <li>• Time-based trading systems using Fibonacci sequences</li>
                  <li>• Risk management models with Fibonacci-based position sizing</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These algorithms attempt to capitalize on recurring market patterns.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-amber-600" />
                  <CardTitle>Portfolio Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Fibonacci principles are applied in portfolio construction:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Asset allocation models using golden ratio proportions</li>
                  <li>• Risk diversification based on Fibonacci number relationships</li>
                  <li>• Rebalancing schedules following Fibonacci time intervals</li>
                  <li>• Position sizing using Fibonacci-based risk models</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These approaches aim to optimize risk-adjusted returns through natural balance principles.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Interdisciplinary Applications</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The Fibonacci sequence and golden ratio bridge multiple disciplines in fascinating ways:
          </p>
          
          <ul>
            <li>
              <strong>Biomimicry:</strong> Engineers and designers study Fibonacci patterns in nature to create 
              more efficient and sustainable technologies, from solar panels arranged in Fibonacci spirals to 
              architectural structures that mimic natural forms.
            </li>
            <li>
              <strong>Cognitive Science:</strong> Research suggests humans have an innate preference for golden 
              ratio proportions, possibly due to their prevalence in nature. This affects perception, aesthetics, 
              and even memory formation.
            </li>
            <li>
              <strong>Digital Media:</strong> Modern digital design, from websites to video games, incorporates 
              Fibonacci-based layouts and proportions to create visually appealing and intuitive user experiences.
            </li>
            <li>
              <strong>Education:</strong> The Fibonacci sequence serves as an excellent teaching tool that connects 
              mathematics to real-world applications, making abstract concepts more concrete and engaging.
            </li>
          </ul>
          
          <p>
            These cross-disciplinary applications demonstrate how a simple mathematical sequence can have 
            far-reaching implications across human knowledge and creativity.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Emerging Applications</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            New applications of Fibonacci principles continue to emerge in cutting-edge fields:
          </p>
          
          <ul>
            <li>
              <strong>Quantum Computing:</strong> Researchers are exploring Fibonacci-based algorithms for quantum 
              computers, with potential applications in optimization problems and cryptography.
            </li>
            <li>
              <strong>Nanotechnology:</strong> Fibonacci patterns are being used to design nanostructures with 
              enhanced properties, from more efficient solar cells to stronger lightweight materials.
            </li>
            <li>
              <strong>Artificial Intelligence:</strong> Neural network architectures inspired by Fibonacci patterns 
              show promise for more efficient deep learning models with fewer parameters.
            </li>
            <li>
              <strong>Sustainable Design:</strong> Architects and urban planners are applying Fibonacci principles 
              to create more energy-efficient buildings and cities that work in harmony with natural systems.
            </li>
          </ul>
          
          <p>
            As our understanding of complex systems grows, the fundamental efficiency of Fibonacci patterns 
            continues to inspire innovation across science, technology, and design.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsComponent;
