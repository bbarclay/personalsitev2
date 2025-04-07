import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

export default function ApplicationsPanel() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert max-w-none">
        <h2 className="text-3xl font-bold mb-6">Applications of Slot Machine Mathematics</h2>
        
        <p>
          The mathematical principles behind slot machines extend far beyond casino floors. These concepts 
          have applications in various fields, from game design and behavioral economics to risk management 
          and educational tools.
        </p>
      </div>

      <Tabs defaultValue="gaming">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="gaming">Game Design</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>

        <TabsContent value="gaming" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Game Design and Development</h3>
              
              <h4 className="text-lg font-medium mb-3">Video Games and Mobile Apps</h4>
              <p className="mb-4">
                The reward mechanisms and probability systems used in slot machines have been widely adopted in modern gaming:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Loot Boxes and Gacha Systems:</strong> Random reward mechanisms in games that use similar probability distributions to slot machines
                </li>
                <li>
                  <strong>Free-to-Play Monetization:</strong> Games that use variable reward schedules to encourage in-app purchases
                </li>
                <li>
                  <strong>Progression Systems:</strong> Carefully balanced reward structures that maintain player engagement
                </li>
                <li>
                  <strong>Achievement Systems:</strong> Unlockable rewards with varying rarity levels based on probability mathematics
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Reward Distribution Models</h5>
                  <p className="mb-2">
                    Game designers use various probability distributions to create engaging reward systems:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Fixed Ratio:</strong> Rewards after a set number of actions</li>
                    <li><strong>Variable Ratio:</strong> Rewards after an unpredictable number of actions</li>
                    <li><strong>Fixed Interval:</strong> Rewards after a set time period</li>
                    <li><strong>Variable Interval:</strong> Rewards after an unpredictable time period</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Player Engagement Metrics</h5>
                  <p className="mb-2">
                    Concepts from slot machine design help optimize:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Session Length:</strong> How long players engage in a single sitting</li>
                    <li><strong>Retention Rate:</strong> Percentage of players who return</li>
                    <li><strong>Conversion Rate:</strong> Percentage of players who make purchases</li>
                    <li><strong>Engagement Curve:</strong> Pattern of player interest over time</li>
                    <li><strong>Churn Prediction:</strong> Identifying when players are likely to quit</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Balancing Game Economies</h4>
              <p className="mb-4">
                The mathematics of slot machines helps game designers create balanced virtual economies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Resource Distribution:</strong> Controlling the flow of in-game currency and items
                </li>
                <li>
                  <strong>Rarity Tiers:</strong> Creating hierarchies of items with appropriate drop rates
                </li>
                <li>
                  <strong>Pity Systems:</strong> Mechanisms that increase odds after consecutive failures
                </li>
                <li>
                  <strong>Dynamic Difficulty Adjustment:</strong> Systems that modify challenge levels based on player performance
                </li>
                <li>
                  <strong>Anti-Grinding Mechanics:</strong> Features that prevent exploitation of game systems
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Educational Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Teaching Probability and Statistics</h4>
              <p className="mb-4">
                Slot machines provide an engaging context for teaching mathematical concepts:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Basic Probability:</strong> Calculating odds of specific outcomes
                </li>
                <li>
                  <strong>Expected Value:</strong> Understanding long-term averages and returns
                </li>
                <li>
                  <strong>Variance and Standard Deviation:</strong> Measuring the spread of possible outcomes
                </li>
                <li>
                  <strong>Random Number Generation:</strong> Exploring how computers simulate randomness
                </li>
                <li>
                  <strong>Combinatorics:</strong> Calculating the number of possible combinations
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Classroom Activities</h5>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Slot Machine Simulator:</strong> Students can design simple slot machines with different parameters and analyze the results
                  </li>
                  <li>
                    <strong>Probability Experiments:</strong> Running simulations to compare theoretical probabilities with experimental results
                  </li>
                  <li>
                    <strong>Game Design Challenge:</strong> Creating balanced reward systems using probability concepts
                  </li>
                  <li>
                    <strong>Data Analysis Projects:</strong> Collecting and analyzing data from simulated gambling activities
                  </li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Financial Literacy Education</h4>
              <p className="mb-4">
                Slot machine mathematics can help teach important financial concepts:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Risk Assessment:</strong> Understanding the relationship between risk and reward
                </li>
                <li>
                  <strong>House Edge:</strong> Demonstrating why gambling is not a viable financial strategy
                </li>
                <li>
                  <strong>Budgeting:</strong> Learning to set and stick to financial limits
                </li>
                <li>
                  <strong>Cognitive Biases:</strong> Recognizing psychological factors that influence financial decisions
                </li>
                <li>
                  <strong>Long-term vs. Short-term Thinking:</strong> Understanding the importance of considering long-term outcomes
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Business and Marketing Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Customer Engagement Strategies</h4>
              <p className="mb-4">
                The psychological and mathematical principles of slot machines inform various business practices:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Loyalty Programs:</strong> Variable reward schedules to encourage repeat business
                </li>
                <li>
                  <strong>Gamification:</strong> Adding game-like elements to non-game contexts
                </li>
                <li>
                  <strong>Limited-Time Offers:</strong> Creating urgency through time-limited opportunities
                </li>
                <li>
                  <strong>Surprise Rewards:</strong> Unexpected bonuses that create positive associations
                </li>
                <li>
                  <strong>Progress Tracking:</strong> Visual representations of advancement toward goals
                </li>
              </ul>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">E-commerce Applications</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Mystery Boxes:</strong> Products with unknown contents based on probability distributions</li>
                    <li><strong>Flash Sales:</strong> Limited-time discounts that create urgency</li>
                    <li><strong>Reward Tiers:</strong> Structured benefits that encourage increased spending</li>
                    <li><strong>Personalized Recommendations:</strong> Algorithms that suggest products based on user behavior</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Social Media Engagement</h5>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Variable Content Feeds:</strong> Algorithms that deliver unpredictable but engaging content</li>
                    <li><strong>Notification Systems:</strong> Alerts that create dopamine-driven feedback loops</li>
                    <li><strong>Like/Comment Systems:</strong> Social validation mechanisms with variable reinforcement</li>
                    <li><strong>Content Creation Incentives:</strong> Reward structures that encourage user-generated content</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Risk Management and Financial Models</h4>
              <p className="mb-4">
                The probability mathematics used in slot machines has applications in business risk assessment:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Portfolio Diversification:</strong> Balancing investments to manage risk and return
                </li>
                <li>
                  <strong>Insurance Pricing:</strong> Calculating premiums based on probability of claims
                </li>
                <li>
                  <strong>Revenue Forecasting:</strong> Predicting future income with probability distributions
                </li>
                <li>
                  <strong>Project Risk Assessment:</strong> Evaluating the likelihood of various outcomes
                </li>
                <li>
                  <strong>Monte Carlo Simulations:</strong> Using random sampling to model complex systems
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Research and Scientific Applications</h3>
              
              <h4 className="text-lg font-medium mb-3">Behavioral Psychology</h4>
              <p className="mb-4">
                Slot machine mechanics provide valuable insights for behavioral research:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Reinforcement Schedules:</strong> Studying how different reward patterns affect behavior
                </li>
                <li>
                  <strong>Decision Making Under Uncertainty:</strong> Examining how people evaluate risk and reward
                </li>
                <li>
                  <strong>Cognitive Biases:</strong> Investigating systematic errors in human reasoning
                </li>
                <li>
                  <strong>Addiction Mechanisms:</strong> Understanding the neurological basis of addictive behaviors
                </li>
                <li>
                  <strong>Attention and Perception:</strong> Studying how sensory stimuli influence engagement
                </li>
              </ul>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
                <h5 className="font-medium mb-2">Research Methodologies</h5>
                <p className="mb-2">
                  Slot machine-inspired experimental designs help researchers study:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Risk Tolerance:</strong> How individuals evaluate and respond to uncertain outcomes</li>
                  <li><strong>Reward Processing:</strong> Neural mechanisms involved in anticipating and receiving rewards</li>
                  <li><strong>Near-Miss Effects:</strong> Psychological impact of almost winning</li>
                  <li><strong>Loss Chasing:</strong> Tendency to continue after losses to recover previous investments</li>
                  <li><strong>Temporal Discounting:</strong> How people value immediate vs. delayed rewards</li>
                </ul>
              </div>
              
              <h4 className="text-lg font-medium mb-3">Computer Science and AI</h4>
              <p className="mb-4">
                The algorithms and systems used in slot machines have applications in computing:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>
                  <strong>Random Number Generation:</strong> Creating high-quality pseudorandom sequences
                </li>
                <li>
                  <strong>Reinforcement Learning:</strong> Training AI systems through reward-based feedback
                </li>
                <li>
                  <strong>Recommendation Systems:</strong> Algorithms that suggest content based on user preferences
                </li>
                <li>
                  <strong>Procedural Content Generation:</strong> Creating varied content through controlled randomness
                </li>
                <li>
                  <strong>Fairness in Algorithms:</strong> Ensuring equitable outcomes in automated systems
                </li>
              </ul>
              
              <h4 className="text-lg font-medium mb-3">Public Health and Policy</h4>
              <p className="mb-4">
                Understanding slot machine mathematics informs public health approaches:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Responsible Gambling Policies:</strong> Developing evidence-based regulations
                </li>
                <li>
                  <strong>Addiction Prevention:</strong> Creating interventions based on behavioral science
                </li>
                <li>
                  <strong>Consumer Protection:</strong> Ensuring transparency in probability-based products
                </li>
                <li>
                  <strong>Digital Wellbeing:</strong> Designing technology that promotes healthy usage patterns
                </li>
                <li>
                  <strong>Educational Campaigns:</strong> Helping the public understand probability and risk
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
