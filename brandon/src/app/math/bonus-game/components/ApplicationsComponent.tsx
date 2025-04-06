import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gamepad2, 
  Coins, 
  BrainCircuit, 
  Lightbulb, 
  GraduationCap,
  BarChart3,
  Users,
  HeartPulse
} from 'lucide-react';

const ApplicationsComponent: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card className="border-none shadow-none">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-3xl font-bold">Applications of Bonus Game Mechanics</CardTitle>
          <CardDescription className="text-lg">
            How bonus game principles are applied across different fields
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="gaming" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="gaming" className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            <span>Gaming Industry</span>
          </TabsTrigger>
          <TabsTrigger value="business" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span>Business</span>
          </TabsTrigger>
          <TabsTrigger value="education" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Education</span>
          </TabsTrigger>
          <TabsTrigger value="psychology" className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4" />
            <span>Psychology</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gaming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-blue-600" />
                  <CardTitle>Casino Gaming</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus games are a cornerstone of modern casino gaming:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Slot machines with multi-stage bonus features</li>
                  <li>• Video poker with multiplier rounds</li>
                  <li>• Table games with side bets and bonus payouts</li>
                  <li>• Progressive jackpot systems as meta-bonus games</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These features significantly increase player engagement and session length.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-purple-600" />
                  <CardTitle>Video Games</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Video games implement bonus mechanics in various ways:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Hidden levels and secret areas</li>
                  <li>• Time-limited special events and seasonal content</li>
                  <li>• Achievement systems with milestone rewards</li>
                  <li>• Loot boxes and gacha mechanics</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These systems create additional value and extend the lifespan of games.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <CardTitle>Social Gaming</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Social and mobile games leverage bonus mechanics extensively:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Daily login rewards and streak bonuses</li>
                  <li>• Friend referral systems with mutual benefits</li>
                  <li>• Limited-time collaborative events</li>
                  <li>• Energy refill bonuses and special item drops</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These features encourage regular engagement and social interaction.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Game Design Metrics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus games significantly impact key performance indicators:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Increased player retention and session length</li>
                  <li>• Higher monetization rates in free-to-play models</li>
                  <li>• Improved player satisfaction and engagement metrics</li>
                  <li>• Enhanced viral sharing and community building</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Game developers carefully track these metrics to optimize bonus features.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-blue-600" />
                  <CardTitle>Loyalty Programs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Businesses apply bonus game principles to customer loyalty:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Points systems with tiered rewards</li>
                  <li>• Surprise bonuses and limited-time offers</li>
                  <li>• Achievement-based rewards for specific behaviors</li>
                  <li>• Gamified challenges and competitions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These programs significantly increase customer retention and lifetime value.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  <CardTitle>Marketing Campaigns</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Marketing strategies incorporate bonus mechanics:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Scratch cards and instant win promotions</li>
                  <li>• Referral bonuses and viral sharing incentives</li>
                  <li>• Limited-time flash sales and doorbusters</li>
                  <li>• Gamified advertising with interactive elements</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These techniques drive engagement and conversion rates.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-green-600" />
                  <CardTitle>Employee Incentives</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Workplace motivation systems use bonus game principles:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Performance-based bonus structures</li>
                  <li>• Recognition programs with tiered rewards</li>
                  <li>• Team competitions and challenges</li>
                  <li>• Gamified training and skill development</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These systems can significantly improve productivity and job satisfaction.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Financial Products</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Financial institutions implement bonus-like features:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Credit card cashback and rewards programs</li>
                  <li>• Prize-linked savings accounts</li>
                  <li>• Investment platforms with gamified elements</li>
                  <li>• Insurance policies with no-claims bonuses</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These features make financial products more engaging and competitive.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="education" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  <CardTitle>Gamified Learning</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Educational platforms incorporate bonus game mechanics:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Achievement badges and progress tracking</li>
                  <li>• Streak rewards for consistent learning</li>
                  <li>• Bonus content unlocked through performance</li>
                  <li>• Competitive and collaborative learning challenges</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These features significantly increase student engagement and retention.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-purple-600" />
                  <CardTitle>Educational Game Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Educational games use bonus mechanics to enhance learning:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Knowledge reinforcement through bonus challenges</li>
                  <li>• Exploration-based discovery of educational content</li>
                  <li>• Adaptive difficulty with reward scaling</li>
                  <li>• Cross-subject integration through bonus activities</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These approaches make learning more engaging and effective.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-green-600" />
                  <CardTitle>Skill Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus mechanics enhance skill acquisition:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Progressive challenge systems with milestone rewards</li>
                  <li>• Spaced repetition with bonus incentives</li>
                  <li>• Mastery demonstrations with special recognition</li>
                  <li>• Peer teaching opportunities as advanced bonuses</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These systems accelerate skill development and mastery.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                  <CardTitle>Educational Assessment</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Assessment systems incorporate bonus elements:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Bonus questions for extra credit</li>
                  <li>• Multi-stage assessments with progressive rewards</li>
                  <li>• Performance-based access to advanced materials</li>
                  <li>• Formative assessments with immediate feedback loops</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These approaches make assessment more motivating and informative.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600" />
                  <CardTitle>Behavioral Psychology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus games leverage fundamental psychological principles:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Variable reward schedules creating dopamine responses</li>
                  <li>• Operant conditioning through intermittent reinforcement</li>
                  <li>• Near-miss effects triggering continued engagement</li>
                  <li>• Achievement-oriented motivation systems</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These principles explain why bonus games are so engaging.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-purple-100 dark:border-purple-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-5 w-5 text-purple-600" />
                  <CardTitle>Therapeutic Applications</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus game mechanics are used in therapeutic contexts:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Rehabilitation exercises with reward systems</li>
                  <li>• Cognitive behavioral therapy gamification</li>
                  <li>• Mental health apps with achievement tracking</li>
                  <li>• Therapeutic games for specific conditions</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These applications improve treatment adherence and outcomes.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-green-100 dark:border-green-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  <CardTitle>Habit Formation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus mechanics facilitate habit development:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Streak systems rewarding consistent behavior</li>
                  <li>• Milestone celebrations reinforcing progress</li>
                  <li>• Variable rewards maintaining long-term engagement</li>
                  <li>• Social accountability through shared achievements</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These techniques are used in habit-building apps and programs.
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-amber-100 dark:border-amber-900">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-amber-600" />
                  <CardTitle>Social Psychology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  Bonus games leverage social psychological principles:
                </p>
                <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Social comparison through leaderboards and achievements</li>
                  <li>• Group identity reinforcement through team bonuses</li>
                  <li>• Status signaling through exclusive rewards</li>
                  <li>• Reciprocity through mutual benefit systems</li>
                </ul>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                These social elements significantly enhance engagement.
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Ethical Considerations</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The application of bonus game mechanics across different domains raises important ethical considerations:
          </p>
          
          <ul>
            <li>
              <strong>Transparency:</strong> Users should understand the rules and probabilities governing bonus systems, 
              especially in contexts involving real money or valuable rewards.
            </li>
            <li>
              <strong>Exploitation Prevention:</strong> Bonus mechanics should be designed to avoid exploiting psychological 
              vulnerabilities, particularly for vulnerable populations.
            </li>
            <li>
              <strong>Value Alignment:</strong> The behaviors incentivized by bonus systems should align with genuine 
              value creation rather than artificial engagement metrics.
            </li>
            <li>
              <strong>Inclusivity:</strong> Bonus systems should be accessible to users with different abilities, 
              preferences, and resources.
            </li>
          </ul>
          
          <p>
            Responsible implementation of bonus mechanics requires ongoing evaluation of these ethical dimensions 
            and a commitment to user well-being alongside engagement goals.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Future Directions</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            The application of bonus game mechanics continues to evolve in several promising directions:
          </p>
          
          <ul>
            <li>
              <strong>Personalization:</strong> AI-driven systems that adapt bonus experiences to individual preferences, 
              behaviors, and motivational profiles.
            </li>
            <li>
              <strong>Cross-Platform Integration:</strong> Bonus systems that span multiple applications, services, 
              or contexts, creating unified reward ecosystems.
            </li>
            <li>
              <strong>Mixed Reality:</strong> Bonus experiences that blend digital and physical elements through 
              augmented reality and location-based technologies.
            </li>
            <li>
              <strong>Blockchain and NFTs:</strong> Decentralized bonus systems with transferable, verifiable rewards 
              that have value across different platforms and contexts.
            </li>
          </ul>
          
          <p>
            These innovations promise to make bonus mechanics even more engaging, meaningful, and integrated 
            into diverse aspects of human experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsComponent;
