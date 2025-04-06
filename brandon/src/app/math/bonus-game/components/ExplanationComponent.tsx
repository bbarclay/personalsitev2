import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Dice, 
  Trophy, 
  Lightbulb, 
  BarChart3, 
  Coins,
  Calculator
} from 'lucide-react';

const ExplanationComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Understanding Bonus Games</CardTitle>
          <CardDescription className="text-lg">
            The mathematics and mechanics behind bonus games in gaming
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="mechanics" className="flex items-center gap-2">
            <Dice className="h-4 w-4" />
            <span>Mechanics</span>
          </TabsTrigger>
          <TabsTrigger value="mathematics" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Mathematics</span>
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            <span>Strategy</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>What are Bonus Games?</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Bonus games are special features in various gaming contexts that offer players additional opportunities 
                to win rewards beyond the base game. They typically serve as exciting intermissions that break up 
                regular gameplay and provide enhanced entertainment value.
              </p>
              
              <h3>Types of Bonus Games</h3>
              <p>
                Bonus games come in many forms across different gaming platforms:
              </p>
              <ul>
                <li><strong>Casino Games:</strong> Free spins, pick-and-win features, wheel spins, and mini-games in slot machines</li>
                <li><strong>Video Games:</strong> Hidden levels, time-limited challenges, and special event modes</li>
                <li><strong>Board Games:</strong> Special rules that trigger under certain conditions</li>
                <li><strong>Mobile Games:</strong> Daily rewards, special events, and gacha mechanics</li>
              </ul>
              
              <h3>Purpose and Appeal</h3>
              <p>
                Bonus games serve several important functions in game design:
              </p>
              <ul>
                <li>Breaking up gameplay patterns to prevent monotony</li>
                <li>Creating moments of heightened excitement and anticipation</li>
                <li>Offering larger rewards than the base game</li>
                <li>Providing a sense of progression and achievement</li>
                <li>Encouraging continued play through intermittent reinforcement</li>
              </ul>
              
              <p>
                The psychological appeal of bonus games is significant—they create memorable moments of excitement 
                and reward that stand out from regular gameplay, encouraging players to continue engaging with the game.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Historical Development</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                The concept of bonus games has evolved significantly over time:
              </p>
              
              <h3>Early Implementations</h3>
              <p>
                The earliest bonus games appeared in mechanical slot machines in the mid-20th century, 
                with simple features like hold and nudge functions. Arcade games in the 1980s introduced 
                bonus stages as rewards for skilled play, such as the fruit bonus rounds in Pac-Man.
              </p>
              
              <h3>Digital Evolution</h3>
              <p>
                The transition to digital platforms in the 1990s and 2000s allowed for much more complex 
                and engaging bonus features:
              </p>
              <ul>
                <li>Video slots introduced elaborate themed mini-games</li>
                <li>Console games developed rich bonus levels with unique gameplay</li>
                <li>Online gaming platforms created cross-game bonus systems and loyalty rewards</li>
              </ul>
              
              <h3>Modern Innovations</h3>
              <p>
                Today's bonus games incorporate advanced technologies and design principles:
              </p>
              <ul>
                <li>Skill-based elements that blend chance with player ability</li>
                <li>Narrative integration that ties bonus features to game storylines</li>
                <li>Social elements that allow players to share or compete in bonus rounds</li>
                <li>Personalized bonus experiences based on player behavior and preferences</li>
                <li>Cross-platform bonus systems that span multiple games or applications</li>
              </ul>
              
              <p>
                This evolution reflects broader trends in game design toward more engaging, 
                varied, and psychologically rewarding experiences.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mechanics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Triggering Mechanisms</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Bonus games can be triggered through various mechanisms, each with different mathematical properties:
              </p>
              
              <h3>Random Triggers</h3>
              <p>
                Many bonus games are triggered randomly, with a predefined probability on each play:
              </p>
              <ul>
                <li><strong>Fixed Probability:</strong> Each play has the same chance of triggering the bonus</li>
                <li><strong>Variable Probability:</strong> The chance increases or decreases based on certain conditions</li>
                <li><strong>Pseudo-Random Number Generators (PRNGs):</strong> Algorithms that create the appearance of randomness</li>
              </ul>
              
              <h3>Symbol-Based Triggers</h3>
              <p>
                In many games, especially slot machines, bonus features are triggered by specific combinations of symbols:
              </p>
              <ul>
                <li><strong>Scatter Symbols:</strong> Special symbols that trigger bonuses regardless of their position</li>
                <li><strong>Combination Requirements:</strong> Specific patterns or sequences needed to activate the bonus</li>
                <li><strong>Progressive Triggers:</strong> Systems where symbols accumulate over multiple plays</li>
              </ul>
              
              <h3>Achievement-Based Triggers</h3>
              <p>
                Some bonus games are unlocked through player accomplishments:
              </p>
              <ul>
                <li><strong>Score Thresholds:</strong> Reaching certain point totals</li>
                <li><strong>Time-Based Achievements:</strong> Completing tasks within time limits</li>
                <li><strong>Collection Mechanics:</strong> Gathering specific items or resources</li>
                <li><strong>Skill Demonstrations:</strong> Performing specific actions or combinations</li>
              </ul>
              
              <p>
                The choice of triggering mechanism significantly impacts player experience and engagement patterns.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Reward Structures</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Fixed Rewards</h3>
              <p>
                Some bonus games offer predetermined rewards:
              </p>
              <ul>
                <li><strong>Flat Bonuses:</strong> Fixed amounts awarded regardless of other factors</li>
                <li><strong>Tiered Rewards:</strong> Predetermined levels of prizes based on performance</li>
                <li><strong>Item Rewards:</strong> Specific in-game items or resources</li>
              </ul>
              
              <h3>Variable Rewards</h3>
              <p>
                Many bonus games incorporate elements of chance in their reward structure:
              </p>
              <ul>
                <li><strong>Random Prize Selection:</strong> Rewards chosen from a predefined pool</li>
                <li><strong>Weighted Distributions:</strong> Some rewards have higher probabilities than others</li>
                <li><strong>Range-Based Rewards:</strong> Prizes determined within minimum and maximum boundaries</li>
              </ul>
              
              <h3>Multiplier Systems</h3>
              <p>
                Multipliers are common in bonus games to scale rewards:
              </p>
              <ul>
                <li><strong>Fixed Multipliers:</strong> Predetermined values that multiply base rewards</li>
                <li><strong>Progressive Multipliers:</strong> Values that increase through gameplay</li>
                <li><strong>Cascading Multipliers:</strong> Systems where successive wins increase the multiplier</li>
              </ul>
              
              <h3>Special Reward Types</h3>
              <p>
                Beyond direct value rewards, bonus games often offer special incentives:
              </p>
              <ul>
                <li><strong>Free Plays:</strong> Additional chances to play without cost</li>
                <li><strong>Feature Unlocks:</strong> Access to new game elements or modes</li>
                <li><strong>Time Extensions:</strong> Additional gameplay time</li>
                <li><strong>Meta-Rewards:</strong> Benefits that extend beyond the current game session</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Game Flow Integration</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Interruption vs. Integration</h3>
              <p>
                Bonus games can be implemented in different ways relative to the main gameplay:
              </p>
              <ul>
                <li><strong>Interruptive Bonuses:</strong> Completely pause the main game for a separate experience</li>
                <li><strong>Integrated Bonuses:</strong> Occur within the flow of the main game</li>
                <li><strong>Layered Bonuses:</strong> Add elements on top of the base game without stopping it</li>
              </ul>
              
              <h3>Transition Mechanics</h3>
              <p>
                The way games transition into and out of bonus features affects player experience:
              </p>
              <ul>
                <li><strong>Anticipation Sequences:</strong> Build-up animations that create excitement</li>
                <li><strong>Seamless Transitions:</strong> Smooth movement between base and bonus gameplay</li>
                <li><strong>Celebratory Transitions:</strong> Emphasize the achievement of triggering the bonus</li>
              </ul>
              
              <h3>Duration and Pacing</h3>
              <p>
                The length and rhythm of bonus games are carefully designed:
              </p>
              <ul>
                <li><strong>Short Bursts:</strong> Brief, high-intensity bonus experiences</li>
                <li><strong>Extended Play:</strong> Longer bonus sessions with their own progression</li>
                <li><strong>Variable Duration:</strong> Length determined by player performance or random factors</li>
                <li><strong>Nested Bonuses:</strong> Bonus features that can trigger additional bonus levels</li>
              </ul>
              
              <p>
                These design choices significantly impact player engagement, retention, and satisfaction.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mathematics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Probability and Expected Value</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Trigger Probability</h3>
              <p>
                The mathematical foundation of bonus games begins with the probability of triggering the feature:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                <p className="font-mono">
                  P(trigger) = Number of triggering outcomes / Total possible outcomes
                </p>
              </div>
              
              <p>
                For symbol-based triggers in a slot machine with independent reels, the probability is:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                <p className="font-mono">
                  P(trigger) = P(symbol on reel 1) × P(symbol on reel 2) × ... × P(symbol on reel n)
                </p>
              </div>
              
              <h3>Expected Value Calculation</h3>
              <p>
                The expected value (EV) of a bonus game is calculated as:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                <p className="font-mono">
                  EV(bonus) = P(trigger) × Average bonus payout
                </p>
              </div>
              
              <p>
                For a bonus game with multiple possible outcomes, the average payout is:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                <p className="font-mono">
                  Average bonus payout = Σ [P(outcome_i) × Payout(outcome_i)]
                </p>
              </div>
              
              <p>
                This calculation is essential for game designers to ensure the bonus game contributes 
                appropriately to the overall game mathematics.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Variance and Volatility</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Understanding Variance</h3>
              <p>
                Variance measures how widely payouts are distributed around the expected value:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                <p className="font-mono">
                  Variance = Σ [P(outcome_i) × (Payout(outcome_i) - Expected Value)²]
                </p>
              </div>
              
              <p>
                High variance bonus games have a wide range of possible outcomes, from very small to very large payouts.
                Low variance bonus games provide more consistent, predictable rewards.
              </p>
              
              <h3>Volatility Design</h3>
              <p>
                Game designers carefully consider volatility when creating bonus features:
              </p>
              <ul>
                <li><strong>High Volatility Bonuses:</strong> Rare triggers with potentially large payouts</li>
                <li><strong>Medium Volatility Bonuses:</strong> Balanced approach with moderate frequency and rewards</li>
                <li><strong>Low Volatility Bonuses:</strong> Frequent triggers with smaller, more consistent payouts</li>
              </ul>
              
              <p>
                The choice of volatility significantly impacts player experience and engagement patterns:
              </p>
              <ul>
                <li>High volatility appeals to risk-takers seeking big wins</li>
                <li>Low volatility appeals to players who prefer longer play sessions with steady rewards</li>
                <li>Mixed volatility designs can appeal to broader player demographics</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Return-to-Player Considerations</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>RTP Contribution</h3>
              <p>
                In gambling games, the Return-to-Player (RTP) percentage indicates the long-term expected 
                return of wagers. Bonus games often contribute significantly to the overall RTP:
              </p>
              
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md my-4">
                <p className="font-mono">
                  Total RTP = Base Game RTP + Bonus Game RTP
                </p>
              </div>
              
              <p>
                For example, a slot machine might have:
              </p>
              <ul>
                <li>Base Game RTP: 75%</li>
                <li>Bonus Game RTP: 15%</li>
                <li>Total RTP: 90%</li>
              </ul>
              
              <h3>RTP Distribution</h3>
              <p>
                Game designers must decide how to distribute RTP between the base game and bonus features:
              </p>
              <ul>
                <li><strong>Base-Heavy Distribution:</strong> More RTP in the base game for consistent small wins</li>
                <li><strong>Bonus-Heavy Distribution:</strong> More RTP in bonus features for exciting big win potential</li>
                <li><strong>Balanced Distribution:</strong> Even split between base game and bonus features</li>
              </ul>
              
              <h3>Mathematical Balance</h3>
              <p>
                Creating mathematically sound bonus games requires careful balancing:
              </p>
              <ul>
                <li>Ensuring the overall game mathematics remain within required parameters</li>
                <li>Maintaining appropriate hit frequency for bonus features</li>
                <li>Creating engaging variance profiles that appeal to target players</li>
                <li>Designing systems that remain fair while creating exciting moments</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Player Decision Making</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Types of Player Decisions</h3>
              <p>
                Bonus games can incorporate various levels of player agency:
              </p>
              <ul>
                <li><strong>Pure Chance:</strong> No decisions, outcomes determined entirely by random factors</li>
                <li><strong>Pseudo-Choice:</strong> Decisions that create an illusion of control but don't affect outcomes</li>
                <li><strong>Meaningful Choice:</strong> Decisions that genuinely impact results based on skill or strategy</li>
                <li><strong>Risk Management:</strong> Decisions about whether to risk current rewards for potentially greater ones</li>
              </ul>
              
              <h3>Decision Complexity</h3>
              <p>
                The complexity of decisions in bonus games varies widely:
              </p>
              <ul>
                <li><strong>Simple Binary Choices:</strong> Basic yes/no or this/that decisions</li>
                <li><strong>Multiple Options:</strong> Selecting from several possible choices</li>
                <li><strong>Sequential Decisions:</strong> Series of choices where earlier decisions affect later options</li>
                <li><strong>Strategic Planning:</strong> Complex decision-making requiring foresight and planning</li>
              </ul>
              
              <h3>Information Availability</h3>
              <p>
                The information provided to players affects decision quality:
              </p>
              <ul>
                <li><strong>Perfect Information:</strong> All relevant factors are known to the player</li>
                <li><strong>Partial Information:</strong> Some factors are known, others hidden</li>
                <li><strong>Hidden Information:</strong> Critical factors are concealed from the player</li>
                <li><strong>Misleading Information:</strong> Information that may intentionally or unintentionally lead to suboptimal decisions</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Optimal Strategies</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Strategy Development</h3>
              <p>
                For skill-based bonus games, players can develop strategies to maximize outcomes:
              </p>
              <ul>
                <li><strong>Mathematical Analysis:</strong> Calculating expected values of different choices</li>
                <li><strong>Pattern Recognition:</strong> Identifying recurring patterns that can be exploited</li>
                <li><strong>Risk Assessment:</strong> Evaluating the risk-reward profile of different options</li>
                <li><strong>Experimentation:</strong> Testing different approaches to discover optimal strategies</li>
              </ul>
              
              <h3>Common Strategic Approaches</h3>
              <p>
                Several strategic frameworks are applicable to many bonus games:
              </p>
              <ul>
                <li><strong>Maximizing Expected Value:</strong> Always choosing the option with the highest average return</li>
                <li><strong>Risk Minimization:</strong> Prioritizing consistent smaller rewards over volatile larger ones</li>
                <li><strong>Threshold Strategy:</strong> Taking risks only when potential rewards exceed certain thresholds</li>
                <li><strong>Adaptive Strategy:</strong> Changing approach based on current game state or previous outcomes</li>
              </ul>
              
              <h3>Strategy Limitations</h3>
              <p>
                Even with optimal strategy, players should understand the inherent limitations:
              </p>
              <ul>
                <li><strong>House Edge:</strong> In gambling games, the mathematical advantage always favors the house long-term</li>
                <li><strong>Variance Impact:</strong> Short-term results can deviate significantly from expected values</li>
                <li><strong>Skill Ceiling:</strong> The maximum advantage possible through skill is typically capped by design</li>
                <li><strong>Information Gaps:</strong> Incomplete information may prevent truly optimal decision-making</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Psychological Factors</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <h3>Cognitive Biases</h3>
              <p>
                Several psychological factors influence player decision-making in bonus games:
              </p>
              <ul>
                <li><strong>Gambler's Fallacy:</strong> Believing that past outcomes affect future random events</li>
                <li><strong>Hot Hand Fallacy:</strong> Perceiving streaks of luck when outcomes are actually independent</li>
                <li><strong>Loss Aversion:</strong> Tendency to prefer avoiding losses over acquiring equivalent gains</li>
                <li><strong>Confirmation Bias:</strong> Noticing evidence that confirms existing beliefs while ignoring contradictory information</li>
              </ul>
              
              <h3>Emotional Influences</h3>
              <p>
                Emotions significantly impact decision quality in bonus games:
              </p>
              <ul>
                <li><strong>Excitement:</strong> Can lead to riskier choices than a player would normally make</li>
                <li><strong>Frustration:</strong> May cause abandonment of optimal strategies in favor of "gut feelings"</li>
                <li><strong>Overconfidence:</strong> Can result in overestimating skill level and making poor choices</li>
                <li><strong>Regret Avoidance:</strong> Making decisions to minimize potential regret rather than maximize value</li>
              </ul>
              
              <h3>Strategic Self-Awareness</h3>
              <p>
                Developing awareness of these factors can improve decision quality:
              </p>
              <ul>
                <li>Recognizing when emotions are influencing decisions</li>
                <li>Understanding personal risk preferences and biases</li>
                <li>Maintaining perspective on the role of chance versus skill</li>
                <li>Developing pre-commitment strategies for high-pressure situations</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplanationComponent;
