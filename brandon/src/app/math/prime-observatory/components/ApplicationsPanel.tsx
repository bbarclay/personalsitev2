import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of Prime Numbers</h2>
        
        <p>
          Prime numbers are not just mathematical curiosities. They play a crucial role in various fields, 
          from modern cryptography to computer science, and even appear in nature. This section explores 
          the practical applications and real-world significance of prime numbers.
        </p>
      </div>

      <Tabs defaultValue="cryptography">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="cryptography">Cryptography</TabsTrigger>
          <TabsTrigger value="computing">Computing</TabsTrigger>
          <TabsTrigger value="science">Science & Nature</TabsTrigger>
          <TabsTrigger value="arts">Arts & Culture</TabsTrigger>
        </TabsList>

        <TabsContent value="cryptography" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Cryptography and Security</h3>
              
              <h4 className="text-lg font-medium mb-3">Public Key Cryptography</h4>
              <p className="mb-4">
                Prime numbers form the foundation of modern public key cryptography, which secures much of our digital communication:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>RSA Encryption:</strong> One of the most widely used encryption algorithms, based on the difficulty of factoring the product of two large prime numbers
                </li>
                <li>
                  <strong>Diffie-Hellman Key Exchange:</strong> A method for securely exchanging cryptographic keys over a public channel, using properties of prime numbers
                </li>
                <li>
                  <strong>ElGamal Encryption:</strong> A public-key cryptosystem based on the difficulty of computing discrete logarithms in a finite field with a prime modulus
                </li>
                <li>
                  <strong>Digital Signatures:</strong> Methods for verifying the authenticity of digital messages or documents, often based on prime number cryptography
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">How RSA Works with Primes</h5>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Choose two large prime numbers, p and q (typically hundreds of digits long)</li>
                  <li>Compute n = p × q</li>
                  <li>Calculate φ(n) = (p-1) × (q-1)</li>
                  <li>Choose an integer e such that 1 < e < φ(n) and e is coprime to φ(n)</li>
                  <li>Compute d such that (d × e) mod φ(n) = 1</li>
                  <li>The public key is (n, e) and the private key is (n, d)</li>
                </ol>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  The security of RSA relies on the fact that while multiplying two large primes is easy, factoring their product is computationally infeasible with current technology.
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Cryptographic Challenges</h4>
              <p className="mb-4">
                The security of prime-based cryptography faces several challenges:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Quantum Computing:</strong> Shor's algorithm, running on a sufficiently powerful quantum computer, could efficiently factor large numbers, potentially breaking RSA encryption
                </li>
                <li>
                  <strong>Advances in Factorization:</strong> Improvements in classical factorization algorithms could weaken current cryptographic systems
                </li>
                <li>
                  <strong>Post-Quantum Cryptography:</strong> Development of new cryptographic methods that would remain secure against quantum attacks
                </li>
                <li>
                  <strong>Prime Number Generation:</strong> Ensuring that the primes used in cryptographic applications are truly random and not vulnerable to predictive attacks
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="computing" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Computer Science and Engineering</h3>
              
              <h4 className="text-lg font-medium mb-3">Hash Functions and Data Structures</h4>
              <p className="mb-4">
                Prime numbers play important roles in various computing applications:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Hash Tables:</strong> Prime number sizes for hash tables help minimize collisions and improve performance
                </li>
                <li>
                  <strong>Pseudorandom Number Generation:</strong> Prime numbers are used in various algorithms for generating sequences of pseudorandom numbers
                </li>
                <li>
                  <strong>Error Detection and Correction:</strong> Prime number based checksums and codes help detect and correct errors in data transmission
                </li>
                <li>
                  <strong>Primality Testing Algorithms:</strong> Efficient algorithms for determining whether a number is prime are crucial for many applications
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Hash Table Sizing</h5>
                  <p className="mb-2">
                    Using prime numbers for hash table sizes helps distribute keys more evenly:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Reduces clustering of hash values</li>
                    <li>Minimizes collisions when using modulo arithmetic</li>
                    <li>Common practice is to use a prime number slightly larger than the expected number of elements</li>
                    <li>Example: Java's HashMap implementation uses powers of 2, but many other implementations use primes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Linear Congruential Generators</h5>
                  <p className="mb-2">
                    Prime numbers are used in parameters for pseudorandom number generators:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Formula: X<sub>n+1</sub> = (aX<sub>n</sub> + c) mod m</li>
                    <li>When m is prime, the generator can achieve its maximum period</li>
                    <li>Carefully chosen prime multipliers (a) improve statistical properties</li>
                    <li>Used in many programming languages and simulation systems</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Computational Challenges</h4>
              <p className="mb-4">
                Prime numbers present interesting computational challenges:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Primality Testing:</strong> Determining whether a large number is prime efficiently
                </li>
                <li>
                  <strong>Prime Factorization:</strong> Finding the prime factors of a large composite number
                </li>
                <li>
                  <strong>Prime Number Generation:</strong> Efficiently generating large prime numbers for cryptographic applications
                </li>
                <li>
                  <strong>Distributed Computing Projects:</strong> Collaborative efforts to find ever-larger prime numbers, such as the Great Internet Mersenne Prime Search (GIMPS)
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="science" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Science and Natural Phenomena</h3>
              
              <h4 className="text-lg font-medium mb-3">Physics and Quantum Mechanics</h4>
              <p className="mb-4">
                Prime numbers appear in various physical and natural systems:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Quantum Chaos:</strong> The distribution of energy levels in quantum systems shows connections to the distribution of prime numbers
                </li>
                <li>
                  <strong>Quantum Computing:</strong> Prime factorization algorithms like Shor's algorithm are key benchmarks for quantum computing capabilities
                </li>
                <li>
                  <strong>Periodic Orbits:</strong> Prime number patterns appear in the periodic orbits of chaotic dynamical systems
                </li>
                <li>
                  <strong>Wave Functions:</strong> Prime number theory has applications in understanding certain wave functions and resonance phenomena
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">The Riemann Zeta Function and Physics</h5>
                <p className="mb-4">
                  The Riemann zeta function, which is deeply connected to the distribution of prime numbers, appears in various physical contexts:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Statistical mechanics of ideal gases</li>
                  <li>Quantum field theory and renormalization</li>
                  <li>Critical phenomena and phase transitions</li>
                  <li>Random matrix theory and nuclear energy levels</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  This unexpected connection between prime numbers and physics suggests deeper mathematical structures underlying both fields.
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Biology and Natural Patterns</h4>
              <p className="mb-4">
                Prime numbers appear in biological systems and natural patterns:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Cicada Life Cycles:</strong> Certain species of cicadas have prime-numbered life cycles (13 or 17 years), which may help minimize interactions with predators having periodic life cycles
                </li>
                <li>
                  <strong>Phyllotaxis:</strong> The arrangement of leaves, seeds, and petals in some plants follows patterns related to Fibonacci numbers, which have connections to prime number theory
                </li>
                <li>
                  <strong>Evolutionary Strategies:</strong> Prime number based behaviors may offer evolutionary advantages in certain ecological niches
                </li>
                <li>
                  <strong>Population Dynamics:</strong> Prime number cycles can help species avoid synchronization with predators or competitors
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="arts" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Arts, Culture, and Education</h3>
              
              <h4 className="text-lg font-medium mb-3">Music and Rhythm</h4>
              <p className="mb-4">
                Prime numbers have influenced musical composition and rhythm:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Time Signatures:</strong> Prime number time signatures (like 7/8 or 11/8) create complex, asymmetrical rhythms used in various musical traditions
                </li>
                <li>
                  <strong>Compositional Techniques:</strong> Some composers use prime number sequences to determine note durations, pitches, or structural elements
                </li>
                <li>
                  <strong>Polyrhythms:</strong> Combining rhythmic patterns with prime number relationships creates complex, interlocking structures
                </li>
                <li>
                  <strong>Tuning Systems:</strong> Prime number frequency ratios play a role in certain microtonal tuning systems
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Visual Arts and Design</h5>
                  <p className="mb-2">
                    Prime numbers inspire visual artists and designers:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Patterns based on prime number distributions</li>
                    <li>Ulam spirals and other prime visualizations as artistic elements</li>
                    <li>Architectural proportions based on prime numbers</li>
                    <li>Generative art algorithms using prime number sequences</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Literature and Narrative</h5>
                  <p className="mb-2">
                    Prime numbers appear in literature and storytelling:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>"The Curious Incident of the Dog in the Night-Time" features a protagonist who loves prime numbers</li>
                    <li>"Contact" by Carl Sagan uses prime numbers as a basis for alien communication</li>
                    <li>Puzzle novels and mystery stories often incorporate prime number codes</li>
                    <li>Narrative structures based on prime number chapter divisions</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Educational Applications</h4>
              <p className="mb-4">
                Prime numbers serve as powerful educational tools:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Mathematical Reasoning:</strong> Teaching factorization, division, and number properties
                </li>
                <li>
                  <strong>Computational Thinking:</strong> Algorithms for finding primes introduce concepts like iteration, efficiency, and optimization
                </li>
                <li>
                  <strong>Interdisciplinary Connections:</strong> Linking mathematics to cryptography, computer science, and other fields
                </li>
                <li>
                  <strong>Mathematical Recreation:</strong> Prime number puzzles and games that engage students with number theory
                </li>
                <li>
                  <strong>History of Mathematics:</strong> Exploring how prime numbers have fascinated mathematicians throughout history
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Recreational Mathematics</h3>
              
              <h4 className="text-lg font-medium mb-3">Prime Number Puzzles and Games</h4>
              <p className="mb-4">
                Prime numbers feature in various recreational mathematical activities:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Prime Number Sieves:</strong> Visual and interactive implementations of the Sieve of Eratosthenes
                </li>
                <li>
                  <strong>Prime Factorization Puzzles:</strong> Challenges involving finding the prime factorization of numbers
                </li>
                <li>
                  <strong>Prime Number Patterns:</strong> Exploring visual representations like the Ulam spiral
                </li>
                <li>
                  <strong>Mathematical Competitions:</strong> Problems involving prime numbers are common in mathematics olympiads and competitions
                </li>
                <li>
                  <strong>Citizen Science:</strong> Distributed computing projects that allow anyone to participate in the search for new prime numbers
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
