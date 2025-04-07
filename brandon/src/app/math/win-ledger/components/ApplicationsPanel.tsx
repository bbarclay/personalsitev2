import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of Win Probability Ledgers</h2>
        
        <p>
          Win probability ledgers have diverse applications across multiple fields, from sports analytics and 
          gambling to business strategy and financial markets. These tools provide valuable insights for 
          decision-making, risk assessment, and performance analysis.
        </p>
      </div>

      <Tabs defaultValue="sports">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="sports">Sports</TabsTrigger>
          <TabsTrigger value="gambling">Gambling</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="sports" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Sports Analytics</h3>
              
              <h4 className="text-lg font-medium mb-3">In-Game Decision Making</h4>
              <p className="mb-4">
                Win probability models help coaches and teams make strategic decisions during games:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Fourth Down Decisions in Football:</strong> Analyzing whether to punt, kick a field goal, or go for it
                </li>
                <li>
                  <strong>Pitching Changes in Baseball:</strong> Determining the optimal time to replace a pitcher
                </li>
                <li>
                  <strong>Shot Selection in Basketball:</strong> Evaluating the expected value of different shot types
                </li>
                <li>
                  <strong>Late-Game Strategy:</strong> Making optimal decisions in end-game scenarios
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Team Performance Analysis</h5>
                  <p className="mb-2">
                    Win probability ledgers help teams analyze performance beyond traditional statistics:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Identifying key moments that significantly impacted game outcomes</li>
                    <li>Measuring individual player contributions to win probability</li>
                    <li>Evaluating coaching decisions based on win probability impact</li>
                    <li>Analyzing patterns in how teams perform in high-leverage situations</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Fan Engagement</h5>
                  <p className="mb-2">
                    Win probability models enhance the viewing experience for sports fans:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Live win probability trackers during broadcasts</li>
                    <li>Highlighting dramatic swings in win probability</li>
                    <li>Creating narratives around comeback probabilities</li>
                    <li>Providing context for the significance of specific plays</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Player Evaluation and Recruitment</h4>
              <p className="mb-4">
                Teams use win probability metrics to evaluate player performance:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Win Probability Added (WPA):</strong> Measuring how much a player's actions increase team win probability
                </li>
                <li>
                  <strong>Clutch Performance Analysis:</strong> Evaluating how players perform in high-leverage situations
                </li>
                <li>
                  <strong>Draft and Free Agent Analysis:</strong> Projecting how potential acquisitions might impact team win probability
                </li>
                <li>
                  <strong>Contract Valuation:</strong> Determining player value based on win probability contributions
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gambling" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Gambling and Casino Games</h3>
              
              <h4 className="text-lg font-medium mb-3">Sports Betting</h4>
              <p className="mb-4">
                Win probability ledgers are essential tools for both bookmakers and bettors:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">For Bookmakers</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Setting initial odds based on win probability models</li>
                    <li>Adjusting live betting lines as events unfold</li>
                    <li>Managing risk by balancing betting action</li>
                    <li>Identifying profitable market inefficiencies</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">For Bettors</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Identifying value bets where bookmaker odds differ from calculated win probabilities</li>
                    <li>Making informed in-play betting decisions</li>
                    <li>Developing systematic betting strategies</li>
                    <li>Managing betting bankroll based on probability and expected value</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Casino Games and Poker</h4>
              <p className="mb-4">
                Win probability calculations are fundamental to casino games:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Blackjack Strategy:</strong> Basic strategy charts are based on win probability calculations for every possible hand
                </li>
                <li>
                  <strong>Poker Decision Making:</strong> Calculating pot odds, implied odds, and equity in different situations
                </li>
                <li>
                  <strong>Advantage Play:</strong> Card counting and other advantage techniques track changing win probabilities
                </li>
                <li>
                  <strong>Game Design:</strong> Casino games are designed with specific house edges based on win probability mathematics
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Risk Management for Gambling Operators</h4>
              <p className="mb-4">
                Casinos and betting operators use win probability ledgers for risk management:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Calculating theoretical hold percentages across different games</li>
                <li>Setting betting limits based on risk exposure</li>
                <li>Identifying potential advantage players</li>
                <li>Optimizing game mix to achieve target profitability</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Business Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Sales and Marketing</h4>
              <p className="mb-4">
                Win probability ledgers help optimize sales processes and marketing campaigns:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Sales Pipeline Management:</strong> Tracking the probability of closing deals at different stages
                </li>
                <li>
                  <strong>Lead Scoring:</strong> Assigning probability values to potential customers based on behavior and characteristics
                </li>
                <li>
                  <strong>Campaign Optimization:</strong> Allocating resources to marketing activities with the highest probability of success
                </li>
                <li>
                  <strong>Customer Retention:</strong> Identifying at-risk customers based on churn probability models
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Project Management</h4>
              <p className="mb-4">
                Win probability ledgers help track project success likelihood:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Key Applications in Project Management</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Risk Assessment:</strong> Quantifying the probability of meeting project objectives
                  </li>
                  <li>
                    <strong>Resource Allocation:</strong> Directing resources to areas that most significantly impact success probability
                  </li>
                  <li>
                    <strong>Milestone Tracking:</strong> Updating success probabilities as project milestones are reached
                  </li>
                  <li>
                    <strong>Contingency Planning:</strong> Developing backup plans based on probability thresholds
                  </li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Strategic Decision Making</h4>
              <p className="mb-4">
                Executives use win probability models for high-level decision making:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Merger & Acquisition Analysis:</strong> Evaluating the probability of successful integration and value creation
                </li>
                <li>
                  <strong>Market Entry Decisions:</strong> Assessing the likelihood of successful entry into new markets
                </li>
                <li>
                  <strong>Product Launch Planning:</strong> Calculating success probabilities for new product introductions
                </li>
                <li>
                  <strong>Competitive Strategy:</strong> Analyzing probable outcomes of different competitive moves
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Technology Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Artificial Intelligence and Machine Learning</h4>
              <p className="mb-4">
                Win probability models are integral to many AI systems:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Reinforcement Learning:</strong> AI agents learn to maximize win probability in various environments
                </li>
                <li>
                  <strong>Game-Playing AI:</strong> Systems like AlphaGo use win probability estimates to evaluate positions
                </li>
                <li>
                  <strong>Recommendation Systems:</strong> Calculating the probability of user engagement with recommended content
                </li>
                <li>
                  <strong>Predictive Maintenance:</strong> Estimating the probability of equipment failure
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Cybersecurity</h4>
              <p className="mb-4">
                Win probability concepts help in security risk assessment:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Security Applications</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Threat Detection:</strong> Calculating the probability that observed behavior indicates an attack
                  </li>
                  <li>
                    <strong>Vulnerability Management:</strong> Prioritizing patches based on exploitation probability
                  </li>
                  <li>
                    <strong>Authentication Systems:</strong> Evaluating the probability that a login attempt is legitimate
                  </li>
                  <li>
                    <strong>Security Investment:</strong> Allocating resources based on attack probability and potential impact
                  </li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Healthcare Technology</h4>
              <p className="mb-4">
                Win probability ledgers have important applications in healthcare:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Treatment Success Prediction:</strong> Estimating the probability of positive outcomes for different treatments
                </li>
                <li>
                  <strong>Disease Progression Models:</strong> Tracking the probability of different disease trajectories
                </li>
                <li>
                  <strong>Resource Allocation:</strong> Optimizing hospital resources based on patient outcome probabilities
                </li>
                <li>
                  <strong>Drug Development:</strong> Calculating the probability of successful clinical trials at different phases
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Emerging Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Financial Technology</h4>
              <p className="mb-4">
                Win probability models are increasingly used in fintech:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Algorithmic Trading:</strong> Calculating the probability of profitable trades
                </li>
                <li>
                  <strong>Credit Scoring:</strong> Estimating the probability of loan repayment
                </li>
                <li>
                  <strong>Fraud Detection:</strong> Identifying suspicious transactions based on probability models
                </li>
                <li>
                  <strong>Robo-Advisors:</strong> Optimizing investment portfolios based on success probabilities
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Climate Technology</h4>
              <p className="mb-4">
                Win probability concepts are applied to climate challenges:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Renewable Energy Planning:</strong> Calculating the probability of meeting energy production targets
                </li>
                <li>
                  <strong>Climate Adaptation:</strong> Assessing the likelihood of success for different adaptation strategies
                </li>
                <li>
                  <strong>Carbon Reduction:</strong> Evaluating the probability of meeting emissions targets with different approaches
                </li>
                <li>
                  <strong>Disaster Response:</strong> Optimizing resource deployment based on impact probability models
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
