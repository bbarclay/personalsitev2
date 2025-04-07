import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { MathJax } from '@/components/ui/mathjax';

export default function ExplanationPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Understanding Slot Machines</h2>
        
        <p>
          Slot machines are fascinating devices that combine entertainment with complex probability mathematics. 
          This interactive tool allows you to explore the mechanics and mathematics behind slot machines, 
          helping you understand how they work and the odds involved.
        </p>
      </div>

      <Tabs defaultValue="basics">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="basics">Basic Mechanics</TabsTrigger>
          <TabsTrigger value="probability">Probability</TabsTrigger>
          <TabsTrigger value="payouts">Payouts & RTP</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">How Slot Machines Work</h3>
              <p className="mb-4">
                Modern slot machines are sophisticated devices that use random number generators (RNGs) to determine outcomes. 
                Here's a breakdown of the basic components and mechanics:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Key Components</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Reels:</strong> Virtual or physical spinning columns displaying symbols</li>
                    <li><strong>Symbols:</strong> Images that appear on the reels</li>
                    <li><strong>Paylines:</strong> Lines across the reels where matching symbols create winning combinations</li>
                    <li><strong>Random Number Generator (RNG):</strong> Software algorithm that ensures random outcomes</li>
                    <li><strong>Paytable:</strong> Chart showing winning combinations and their corresponding payouts</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Types of Slot Machines</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Classic Slots:</strong> Typically 3 reels with limited paylines</li>
                    <li><strong>Video Slots:</strong> 5+ reels with multiple paylines and bonus features</li>
                    <li><strong>Progressive Slots:</strong> Jackpots that increase over time until won</li>
                    <li><strong>Multiplier Slots:</strong> Payouts increase based on the number of coins played</li>
                    <li><strong>Multi-Payline Slots:</strong> Offering dozens or hundreds of ways to win</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">The Gameplay Process</h4>
              <ol className="list-decimal pl-6 space-y-2 mb-6">
                <li><strong>Placing a Bet:</strong> Player selects bet amount and number of paylines to play</li>
                <li><strong>Spinning the Reels:</strong> Player initiates the spin, activating the RNG</li>
                <li><strong>RNG Calculation:</strong> The RNG determines the position where each reel will stop</li>
                <li><strong>Outcome Display:</strong> Reels stop to display the randomly determined symbols</li>
                <li><strong>Win Evaluation:</strong> Machine checks for winning combinations on active paylines</li>
                <li><strong>Payout:</strong> Any winnings are added to the player's balance</li>
              </ol>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Modern Innovations</h5>
                <p className="mb-2">
                  Today's slot machines incorporate numerous features beyond the basic mechanics:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Bonus Rounds:</strong> Special games within the main game that offer additional ways to win</li>
                  <li><strong>Free Spins:</strong> Opportunities to spin without placing additional bets</li>
                  <li><strong>Wild Symbols:</strong> Symbols that substitute for others to create winning combinations</li>
                  <li><strong>Scatter Symbols:</strong> Special symbols that can trigger bonuses regardless of their position</li>
                  <li><strong>Cascading Reels:</strong> Winning symbols disappear, allowing new symbols to fall into place</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="probability" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Probability Mathematics</h3>
              
              <h4 className="text-lg font-medium mb-3">Random Number Generators</h4>
              <p className="mb-4">
                At the heart of every modern slot machine is a Random Number Generator (RNG):
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Continuous Operation:</strong> The RNG generates hundreds or thousands of random numbers per second, even when the machine is not being played
                </li>
                <li>
                  <strong>Mapping to Reel Positions:</strong> Each random number corresponds to a specific position on each reel
                </li>
                <li>
                  <strong>Independence:</strong> Each spin is completely independent of previous or future spins
                </li>
                <li>
                  <strong>Testing and Certification:</strong> RNGs are rigorously tested by independent laboratories to ensure fairness
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Calculating Probabilities</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Basic Probability Calculation</h5>
                <p className="mb-2">
                  For a simple 3-reel slot machine with 10 symbols per reel:
                </p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Total possible combinations: 10 × 10 × 10 = 1,000</li>
                  <li>If there is only one winning combination (e.g., three 7s), the probability of hitting it is 1/1,000 or 0.1%</li>
                </ul>
                <div className="my-2 flex justify-center">
                  <MathJax>
                    {`P(\\text{winning}) = \\frac{\\text{Number of winning combinations}}{\\text{Total possible combinations}}`}
                  </MathJax>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Virtual Reels and Weighted Probabilities</h4>
              <p className="mb-4">
                Modern slot machines often use "virtual reels" that create an uneven distribution of symbols:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Physical vs. Virtual:</strong> While a physical reel might have 22 positions, its virtual counterpart could have 64 or more
                </li>
                <li>
                  <strong>Symbol Weighting:</strong> High-paying symbols are assigned to fewer virtual positions than low-paying symbols
                </li>
                <li>
                  <strong>Near Misses:</strong> High-paying symbols are often programmed to appear just above or below the payline more frequently
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Example: Symbol Weighting</h5>
                <p className="mb-2">
                  On a virtual reel with 64 positions, symbols might be distributed as follows:
                </p>
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mb-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Symbol</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Virtual Positions</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Probability</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">Jackpot Symbol</td>
                      <td className="px-4 py-2 whitespace-nowrap">1</td>
                      <td className="px-4 py-2 whitespace-nowrap">1/64 (1.56%)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">High-Paying Symbol</td>
                      <td className="px-4 py-2 whitespace-nowrap">3</td>
                      <td className="px-4 py-2 whitespace-nowrap">3/64 (4.69%)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">Medium-Paying Symbol</td>
                      <td className="px-4 py-2 whitespace-nowrap">8</td>
                      <td className="px-4 py-2 whitespace-nowrap">8/64 (12.5%)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">Low-Paying Symbol</td>
                      <td className="px-4 py-2 whitespace-nowrap">20</td>
                      <td className="px-4 py-2 whitespace-nowrap">20/64 (31.25%)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 whitespace-nowrap">Blank</td>
                      <td className="px-4 py-2 whitespace-nowrap">32</td>
                      <td className="px-4 py-2 whitespace-nowrap">32/64 (50%)</td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This weighting makes jackpot combinations much rarer than they would appear on the physical reels.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Payouts and Return to Player</h3>
              
              <h4 className="text-lg font-medium mb-3">Return to Player (RTP)</h4>
              <p className="mb-4">
                Return to Player (RTP) is a key concept in understanding slot machine economics:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Definition:</strong> The percentage of all wagered money that a slot machine will pay back to players over time
                </li>
                <li>
                  <strong>Typical Range:</strong> Most slot machines have an RTP between 85% and 98%
                </li>
                <li>
                  <strong>Long-Term Average:</strong> RTP is calculated over millions of spins, not individual playing sessions
                </li>
                <li>
                  <strong>House Edge:</strong> The casino's advantage is 100% minus the RTP (e.g., a 95% RTP means a 5% house edge)
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">RTP Calculation</h5>
                <div className="my-2 flex justify-center">
                  <MathJax>
                    {`\\text{RTP} = \\frac{\\text{Total amount returned to players}}{\\text{Total amount wagered}} \\times 100\\%`}
                  </MathJax>
                </div>
                <p className="mb-2 mt-4">
                  Example calculation for a simple slot machine:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Total possible combinations: 1,000</li>
                  <li>Cost per spin: $1</li>
                  <li>Total amount wagered over all possible combinations: $1,000</li>
                  <li>Total payouts across all combinations: $950</li>
                  <li>RTP = $950 ÷ $1,000 × 100% = 95%</li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Volatility and Variance</h4>
              <p className="mb-4">
                Beyond RTP, slot machines are characterized by their volatility or variance:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Low Volatility Slots</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Frequent small wins</li>
                    <li>Longer playing sessions</li>
                    <li>Lower risk</li>
                    <li>Smaller jackpots</li>
                    <li>More predictable outcomes</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">High Volatility Slots</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Less frequent but larger wins</li>
                    <li>Potentially shorter sessions</li>
                    <li>Higher risk</li>
                    <li>Larger jackpots</li>
                    <li>More unpredictable outcomes</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Payout Structures</h4>
              <p className="mb-4">
                Slot machines use various payout structures to balance player experience and profitability:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Linear Payouts:</strong> Winnings increase proportionally with bet size
                </li>
                <li>
                  <strong>Multiplier Payouts:</strong> Winnings are multiplied based on the number of coins played
                </li>
                <li>
                  <strong>Bonus-Heavy Payouts:</strong> A significant portion of the RTP comes from bonus features
                </li>
                <li>
                  <strong>Top-Heavy Payouts:</strong> Most of the RTP is concentrated in rare, large wins
                </li>
                <li>
                  <strong>Progressive Jackpots:</strong> A small percentage of each bet contributes to an increasing jackpot
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">The Psychology of Slot Machines</h3>
              
              <h4 className="text-lg font-medium mb-3">Design Elements</h4>
              <p className="mb-4">
                Slot machines incorporate numerous psychological elements designed to enhance player engagement:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Sensory Stimulation:</strong> Bright lights, engaging sounds, and animations that celebrate wins
                </li>
                <li>
                  <strong>Near Misses:</strong> Outcomes that appear close to winning, encouraging continued play
                </li>
                <li>
                  <strong>Loss Disguised as Win (LDW):</strong> Celebrating with sounds and animations when a player wins an amount less than their bet
                </li>
                <li>
                  <strong>Variable Reward Schedules:</strong> Unpredictable reward timing creates stronger engagement
                </li>
                <li>
                  <strong>Illusion of Control:</strong> Features that make players feel they can influence outcomes
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">The Near Miss Effect</h5>
                <p className="mb-4">
                  Research has shown that near misses (e.g., two jackpot symbols and a third just off the payline) activate similar brain regions as actual wins. This creates an urge to continue playing despite the loss.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Source: Clark, L., Lawrence, A. J., Astley-Jones, F., & Gray, N. (2009). Gambling near-misses enhance motivation to gamble and recruit win-related brain circuitry. Neuron, 61(3), 481-490.
                </p>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Cognitive Biases</h4>
              <p className="mb-4">
                Several cognitive biases influence how players perceive slot machines:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Gambler's Fallacy:</strong> The belief that past outcomes influence future results (e.g., "This machine is due for a win")
                </li>
                <li>
                  <strong>Availability Heuristic:</strong> Overestimating the frequency of wins because they are more memorable than losses
                </li>
                <li>
                  <strong>Confirmation Bias:</strong> Remembering wins that confirm a strategy while forgetting losses
                </li>
                <li>
                  <strong>Sunk Cost Fallacy:</strong> Continuing to play to recover previous losses
                </li>
                <li>
                  <strong>Illusion of Pattern:</strong> Perceiving patterns in what are actually random outcomes
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Responsible Gaming Considerations</h4>
              <p className="mb-4">
                Understanding the psychological aspects of slot machines is important for responsible gaming:
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Responsible Gaming Strategies</h5>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Set Time and Money Limits:</strong> Decide in advance how much time and money to spend</li>
                  <li><strong>Understand the Odds:</strong> Recognize that slots are designed for entertainment, not as a way to make money</li>
                  <li><strong>Take Regular Breaks:</strong> Step away periodically to maintain perspective</li>
                  <li><strong>Avoid Chasing Losses:</strong> Accept that losses are part of the experience</li>
                  <li><strong>Be Aware of Cognitive Biases:</strong> Recognize when fallacies might be influencing decisions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
