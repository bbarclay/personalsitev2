import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  History, 
  BookOpen, 
  Code, 
  Lightbulb, 
  Sigma, 
  BrainCircuit,
  Flower
} from 'lucide-react';

const ExplanationComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Understanding the Fibonacci Sequence</CardTitle>
          <CardDescription className="text-lg">
            Exploring one of mathematics' most fascinating number sequences
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            <Sigma className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="patterns" className="flex items-center gap-2">
            <Flower className="h-4 w-4" />
            <span>Patterns</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What is the Fibonacci Sequence?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, 
                usually starting with 0 and 1. The sequence begins:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
                </p>
              </div>
              
              <p>
                Mathematically, the Fibonacci sequence F(n) is defined by the recurrence relation:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  F(n) = F(n-1) + F(n-2)
                </p>
              </div>
              
              <p>
                With the initial conditions:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  F(0) = 0, F(1) = 1
                </p>
              </div>
              
              <p>
                This simple rule creates a sequence with fascinating properties that appear throughout nature, 
                art, architecture, and various fields of mathematics.
              </p>
              
              <h3>Key Properties</h3>
              <ul>
                <li>Each number is the sum of the two preceding ones</li>
                <li>The ratio of consecutive Fibonacci numbers approaches the golden ratio (approximately 1.618...)</li>
                <li>Fibonacci numbers appear in many biological settings, such as the arrangement of leaves on stems</li>
                <li>The sequence has connections to the golden spiral and the golden rectangle</li>
                <li>Fibonacci numbers have numerous mathematical properties and relationships</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Significance and Applications</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The Fibonacci sequence is far more than a mathematical curiosity. Its significance spans multiple disciplines:
              </p>
              
              <h3>In Nature</h3>
              <p>
                The Fibonacci sequence appears throughout the natural world:
              </p>
              <ul>
                <li><strong>Phyllotaxis:</strong> The arrangement of leaves on plant stems often follows Fibonacci patterns</li>
                <li><strong>Flower Petals:</strong> Many flowers have a Fibonacci number of petals</li>
                <li><strong>Seed Heads:</strong> Sunflower seeds arrange in spirals following Fibonacci numbers</li>
                <li><strong>Pinecones:</strong> The spirals in pinecones often come in Fibonacci pairs</li>
                <li><strong>Shell Growth:</strong> The nautilus shell grows in a logarithmic spiral related to the golden ratio</li>
              </ul>
              
              <h3>In Art and Architecture</h3>
              <p>
                Artists and architects have long used the golden ratio (derived from Fibonacci numbers) for aesthetic appeal:
              </p>
              <ul>
                <li>The Parthenon in Athens incorporates the golden ratio in its dimensions</li>
                <li>Renaissance artists like Leonardo da Vinci used the golden ratio in their compositions</li>
                <li>Modern architecture often incorporates Fibonacci proportions for visual harmony</li>
                <li>Musical compositions sometimes use Fibonacci numbers to structure rhythms and forms</li>
              </ul>
              
              <h3>In Computer Science</h3>
              <p>
                The sequence has practical applications in computing:
              </p>
              <ul>
                <li>Used in the analysis of algorithms and data structures</li>
                <li>Applied in optimization problems and search techniques</li>
                <li>Serves as a benchmark for testing recursive algorithms</li>
                <li>Used in pseudorandom number generation and hashing functions</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historical Origins</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Leonardo Fibonacci</h3>
              <p>
                The sequence is named after Leonardo of Pisa, known as Fibonacci, an Italian mathematician who lived 
                from around 1170 to 1250. However, he did not discover the sequence itself—he introduced it to the 
                Western world through his book "Liber Abaci" (Book of Calculation) published in 1202.
              </p>
              
              <h3>The Rabbit Problem</h3>
              <p>
                In "Liber Abaci," Fibonacci posed the following problem:
              </p>
              <blockquote>
                "How many pairs of rabbits will be produced in a year, beginning with a single pair, if in every month 
                each pair bears a new pair which becomes productive from the second month on?"
              </blockquote>
              <p>
                The solution to this problem yields the Fibonacci sequence. Assuming:
              </p>
              <ul>
                <li>We begin with 1 pair of rabbits</li>
                <li>Each pair produces a new pair every month once they are mature</li>
                <li>Rabbits become mature after one month</li>
                <li>Rabbits never die</li>
              </ul>
              <p>
                The number of pairs after n months follows the Fibonacci sequence.
              </p>
              
              <h3>Earlier Appearances</h3>
              <p>
                While Fibonacci popularized the sequence in Europe, it was known earlier in Indian mathematics:
              </p>
              <ul>
                <li>
                  <strong>Sanskrit Prosody:</strong> Indian mathematicians used Fibonacci numbers in the study of 
                  poetic meters as early as 450 BCE.
                </li>
                <li>
                  <strong>Pingala's Work:</strong> The Indian mathematician Pingala (c. 300-200 BCE) described 
                  patterns equivalent to the Fibonacci sequence.
                </li>
                <li>
                  <strong>Virahanka:</strong> The 6th-century mathematician Virahanka explicitly described the 
                  Fibonacci sequence.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modern Development</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Rediscovery and Naming</h3>
              <p>
                The sequence remained relatively obscure until the 19th century:
              </p>
              <ul>
                <li>
                  <strong>Édouard Lucas:</strong> The French mathematician studied the sequence in the 1870s and 
                  named it after Fibonacci.
                </li>
                <li>
                  <strong>Formal Definition:</strong> Lucas formalized the definition and extended the study of 
                  Fibonacci numbers and related sequences.
                </li>
              </ul>
              
              <h3>Golden Ratio Connection</h3>
              <p>
                The relationship between Fibonacci numbers and the golden ratio was explored by mathematicians 
                over centuries:
              </p>
              <ul>
                <li>
                  <strong>Johannes Kepler:</strong> In the early 17th century, Kepler noted that the ratio of 
                  consecutive Fibonacci numbers approaches the golden ratio.
                </li>
                <li>
                  <strong>Robert Simson:</strong> In 1753, Simson discovered the formula connecting Fibonacci 
                  numbers to the golden ratio.
                </li>
                <li>
                  <strong>Jacques Binet:</strong> In 1843, Binet derived the explicit formula for Fibonacci numbers 
                  using the golden ratio.
                </li>
              </ul>
              
              <h3>Fibonacci Association</h3>
              <p>
                Interest in Fibonacci numbers grew significantly in the 20th century:
              </p>
              <ul>
                <li>
                  <strong>The Fibonacci Quarterly:</strong> A journal dedicated to the study of Fibonacci numbers 
                  and related mathematics, first published in 1963.
                </li>
                <li>
                  <strong>The Fibonacci Association:</strong> Founded in 1963, this organization promotes the study 
                  of Fibonacci numbers and related topics.
                </li>
                <li>
                  <strong>Expanding Applications:</strong> The latter half of the 20th century saw Fibonacci numbers 
                  applied to computer science, financial markets, and other fields.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cultural Impact</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>In Literature and Film</h3>
              <p>
                The Fibonacci sequence has captured the imagination of writers and filmmakers:
              </p>
              <ul>
                <li>
                  <strong>"The Da Vinci Code":</strong> Dan Brown's bestselling novel features the Fibonacci sequence 
                  and golden ratio as plot elements.
                </li>
                <li>
                  <strong>"Pi":</strong> Darren Aronofsky's film references Fibonacci numbers in its exploration of 
                  mathematical patterns.
                </li>
                <li>
                  <strong>"Contact":</strong> Carl Sagan's novel and the subsequent film include references to the 
                  Fibonacci sequence as a potential universal language.
                </li>
              </ul>
              
              <h3>In Poetry</h3>
              <p>
                The sequence has inspired poetic forms:
              </p>
              <ul>
                <li>
                  <strong>Fibonacci Poem:</strong> A form where the number of syllables in each line follows the 
                  Fibonacci sequence (1, 1, 2, 3, 5, 8, etc.).
                </li>
                <li>
                  <strong>Structural Use:</strong> Some poets have used Fibonacci numbers to structure stanzas or 
                  entire collections.
                </li>
              </ul>
              
              <h3>In Popular Science</h3>
              <p>
                The Fibonacci sequence has become a popular topic in science communication:
              </p>
              <ul>
                <li>
                  <strong>Educational Videos:</strong> Numerous documentaries and online videos explore Fibonacci 
                  patterns in nature.
                </li>
                <li>
                  <strong>Popular Books:</strong> Books like "The Golden Ratio" by Mario Livio have brought Fibonacci 
                  numbers to a wider audience.
                </li>
                <li>
                  <strong>Museum Exhibits:</strong> Interactive exhibits on Fibonacci numbers appear in science and 
                  mathematics museums worldwide.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mathematical Properties</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Basic Identities</h3>
              <p>
                Fibonacci numbers satisfy numerous identities:
              </p>
              <ul>
                <li>
                  <strong>Sum of First n Fibonacci Numbers:</strong> 
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                    <p className="font-mono">F(1) + F(2) + ... + F(n) = F(n+2) - 1</p>
                  </div>
                </li>
                <li>
                  <strong>Sum of Squares:</strong> 
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                    <p className="font-mono">F(1)² + F(2)² + ... + F(n)² = F(n) × F(n+1)</p>
                  </div>
                </li>
                <li>
                  <strong>Cassini's Identity:</strong> 
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                    <p className="font-mono">F(n-1) × F(n+1) - F(n)² = (-1)ⁿ</p>
                  </div>
                </li>
                <li>
                  <strong>Addition Formula:</strong> 
                  <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md my-2 text-center">
                    <p className="font-mono">F(m+n) = F(m-1) × F(n) + F(m) × F(n+1)</p>
                  </div>
                </li>
              </ul>
              
              <h3>Binet's Formula</h3>
              <p>
                The explicit formula for the nth Fibonacci number:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  F(n) = (φⁿ - (1-φ)ⁿ)/√5
                </p>
              </div>
              <p>
                Where φ (phi) is the golden ratio, approximately 1.61803398875...
              </p>
              
              <h3>Divisibility Properties</h3>
              <p>
                Fibonacci numbers exhibit interesting divisibility patterns:
              </p>
              <ul>
                <li>F(n) is divisible by F(m) if and only if n is divisible by m</li>
                <li>Every 3rd Fibonacci number is divisible by 2</li>
                <li>Every 4th Fibonacci number is divisible by 3</li>
                <li>Every 5th Fibonacci number is divisible by 5</li>
                <li>In general, every F(k)th Fibonacci number is divisible by F(k)</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>The Golden Ratio Connection</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Convergence to Phi</h3>
              <p>
                The ratio of consecutive Fibonacci numbers converges to the golden ratio:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  lim(n→∞) F(n+1)/F(n) = φ ≈ 1.61803398875...
                </p>
              </div>
              <p>
                The golden ratio φ is the positive solution to the quadratic equation:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  x² - x - 1 = 0
                </p>
              </div>
              <p>
                Which gives:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  φ = (1 + √5)/2 ≈ 1.61803398875...
                </p>
              </div>
              
              <h3>Golden Rectangle and Spiral</h3>
              <p>
                The golden ratio defines the golden rectangle, which has sides in the ratio 1:φ. When squares are 
                constructed inside a golden rectangle, their sizes follow the Fibonacci sequence, and a logarithmic 
                spiral (the golden spiral) can be drawn through them.
              </p>
              
              <h3>Continued Fraction Representation</h3>
              <p>
                The golden ratio has the simplest possible continued fraction expansion:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  φ = 1 + 1/(1 + 1/(1 + 1/(1 + ...)))
                </p>
              </div>
              <p>
                This is often written as [1; 1, 1, 1, ...], and the convergents of this continued fraction are 
                ratios of consecutive Fibonacci numbers.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Extensions and Generalizations</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Negative Indices</h3>
              <p>
                The Fibonacci sequence can be extended to negative indices:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  F(-n) = (-1)ⁿ⁺¹ × F(n)
                </p>
              </div>
              <p>
                This gives the sequence: ..., 8, -5, 3, -2, 1, -1, 0, 1, 1, 2, 3, 5, 8, ...
              </p>
              
              <h3>Lucas Numbers</h3>
              <p>
                Lucas numbers are a related sequence with the same recurrence relation but different initial values:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  L(0) = 2, L(1) = 1
                </p>
                <p className="font-mono text-lg">
                  L(n) = L(n-1) + L(n-2) for n > 1
                </p>
              </div>
              <p>
                This gives the sequence: 2, 1, 3, 4, 7, 11, 18, 29, 47, ...
              </p>
              
              <h3>Fibonacci Polynomials</h3>
              <p>
                Fibonacci polynomials are a generalization where:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  F₀(x) = 0, F₁(x) = 1
                </p>
                <p className="font-mono text-lg">
                  Fₙ(x) = x·Fₙ₋₁(x) + Fₙ₋₂(x) for n > 1
                </p>
              </div>
              <p>
                When x = 1, these reduce to the standard Fibonacci numbers.
              </p>
              
              <h3>Tribonacci and k-bonacci Numbers</h3>
              <p>
                Tribonacci numbers use the sum of the three preceding numbers:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <p className="font-mono text-lg">
                  T(0) = 0, T(1) = 1, T(2) = 1
                </p>
                <p className="font-mono text-lg">
                  T(n) = T(n-1) + T(n-2) + T(n-3) for n > 2
                </p>
              </div>
              <p>
                This gives: 0, 1, 1, 2, 4, 7, 13, 24, 44, ...
              </p>
              <p>
                This can be generalized to k-bonacci numbers, which use the sum of the k preceding numbers.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patterns in Nature</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Phyllotaxis</h3>
              <p>
                Phyllotaxis refers to the arrangement of leaves on a plant stem. Many plants exhibit Fibonacci patterns 
                in their leaf arrangements, with leaves positioned at angles that are related to the golden ratio. This 
                arrangement maximizes exposure to sunlight and rain while minimizing overlap.
              </p>
              <p>
                Common phyllotactic ratios include:
              </p>
              <ul>
                <li>1/2 (alternate arrangement, 180° angle between leaves)</li>
                <li>1/3 (120° angle between leaves)</li>
                <li>2/5 (144° angle between leaves)</li>
                <li>3/8 (135° angle between leaves)</li>
                <li>5/13 (138.5° angle between leaves)</li>
              </ul>
              <p>
                These fractions are ratios of consecutive Fibonacci numbers.
              </p>
              
              <h3>Flower Petals</h3>
              <p>
                Many flowers have a Fibonacci number of petals:
              </p>
              <ul>
                <li>3 petals: lily, iris</li>
                <li>5 petals: buttercup, wild rose, larkspur</li>
                <li>8 petals: delphiniums</li>
                <li>13 petals: ragwort, corn marigold</li>
                <li>21 petals: aster</li>
                <li>34 petals: pyrethrum</li>
                <li>55, 89 petals: asteraceae family (daisies, sunflowers)</li>
              </ul>
              
              <h3>Seed Heads</h3>
              <p>
                In many plants, seeds are arranged in spirals. The number of spirals in each direction are often 
                consecutive Fibonacci numbers:
              </p>
              <ul>
                <li>Sunflowers typically have 34 spirals in one direction and 55 in the other</li>
                <li>Larger sunflowers may have 55 and 89, or even 89 and 144</li>
                <li>Pinecones often have 8 spirals in one direction and 13 in the other</li>
                <li>Pineapples typically have 8 spirals in one direction, 13 in another, and 21 in the third</li>
              </ul>
              <p>
                This arrangement allows for the most efficient packing of seeds.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Patterns in Art and Design</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>The Golden Rectangle</h3>
              <p>
                A golden rectangle has sides in the ratio 1:φ (approximately 1:1.618). When a square is removed from 
                a golden rectangle, the remaining rectangle is also a golden rectangle. This property allows for the 
                creation of a nested sequence of golden rectangles, which form the basis of the golden spiral.
              </p>
              <p>
                The golden rectangle has been used in art and architecture for its aesthetic appeal:
              </p>
              <ul>
                <li>The Parthenon in Athens</li>
                <li>Leonardo da Vinci's "Vitruvian Man" and "The Last Supper"</li>
                <li>Mondrian's compositions</li>
                <li>Le Corbusier's Modulor system of architectural proportion</li>
              </ul>
              
              <h3>The Golden Spiral</h3>
              <p>
                The golden spiral is a logarithmic spiral that grows by a factor of the golden ratio for every quarter 
                turn it makes. It can be constructed by drawing arcs connecting the opposite corners of squares in the 
                Fibonacci tiling of a golden rectangle.
              </p>
              <p>
                This spiral appears in:
              </p>
              <ul>
                <li>Nautilus shells (though not exactly)</li>
                <li>Hurricane formations</li>
                <li>Spiral galaxies</li>
                <li>Artistic compositions and photography (rule of thirds approximates the golden ratio)</li>
              </ul>
              
              <h3>Musical Patterns</h3>
              <p>
                Fibonacci numbers and the golden ratio appear in music:
              </p>
              <ul>
                <li>The octave in the western music scale is divided into 13 notes (8 white keys and 5 black keys on a piano)</li>
                <li>Many composers have used Fibonacci numbers to structure their compositions</li>
                <li>Béla Bartók and Claude Debussy incorporated the golden ratio in their music</li>
                <li>The climax of many classical pieces often occurs approximately 61.8% of the way through (the golden ratio point)</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Patterns in Mathematics</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Pascal's Triangle</h3>
              <p>
                Fibonacci numbers appear in Pascal's triangle when summing along specific diagonals:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4 text-center">
                <pre className="font-mono">
                  1<br />
                  1 1<br />
                  1 2 1<br />
                  1 3 3 1<br />
                  1 4 6 4 1<br />
                  1 5 10 10 5 1<br />
                </pre>
              </div>
              <p>
                Summing the numbers along the "shallow diagonals" gives the Fibonacci sequence:
              </p>
              <ul>
                <li>1 = F(2)</li>
                <li>1 + 1 = 2 = F(3)</li>
                <li>1 + 2 + 1 = 4 = F(4)</li>
                <li>1 + 3 + 3 + 1 = 8 = F(5)</li>
                <li>And so on...</li>
              </ul>
              
              <h3>Fibonacci Primes</h3>
              <p>
                Some Fibonacci numbers are prime numbers. The first few Fibonacci primes are:
              </p>
              <p>
                2, 3, 5, 13, 89, 233, 1597, 28657, 514229, ...
              </p>
              <p>
                It is not known whether there are infinitely many Fibonacci primes.
              </p>
              
              <h3>Zeckendorf's Theorem</h3>
              <p>
                Zeckendorf's theorem states that every positive integer can be represented uniquely as the sum of 
                one or more distinct Fibonacci numbers in such a way that the sum does not include any two consecutive 
                Fibonacci numbers.
              </p>
              <p>
                For example:
              </p>
              <ul>
                <li>6 = 5 + 1</li>
                <li>8 = 8</li>
                <li>9 = 8 + 1</li>
                <li>10 = 8 + 2</li>
                <li>11 = 8 + 3</li>
                <li>12 = 8 + 3 + 1</li>
              </ul>
              <p>
                This representation is called the Zeckendorf representation.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplanationComponent;
