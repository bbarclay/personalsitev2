"use client";

// Updated component to fix module not found error
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const FractionApplications = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
          Real-World Applications of Fractions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover how fractions are used in everyday life, science, and various professions
        </p>
      </div>

      <Tabs defaultValue="everyday" className="w-full">
        <TabsList className="grid w-full sm:grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="everyday">Everyday Life</TabsTrigger>
          <TabsTrigger value="cooking">Cooking & Recipes</TabsTrigger>
          <TabsTrigger value="business">Business & Finance</TabsTrigger>
          <TabsTrigger value="science">Science & Engineering</TabsTrigger>
        </TabsList>

        <TabsContent value="everyday" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Fractions in Everyday Life</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <motion.div
                    className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Time Management</h3>
                    <ul className="space-y-2">
                      <li>1/4 hour (15 minutes)</li>
                      <li>1/2 hour (30 minutes)</li>
                      <li>3/4 day to complete a task</li>
                      <li>Working 1/3 of the day</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Shopping & Discounts</h3>
                    <ul className="space-y-2">
                      <li>1/2 price sale</li>
                      <li>25% off (1/4 of the price)</li>
                      <li>Buy 2, get 1 free (paying for 2/3 of items)</li>
                      <li>Sales tax as a fraction of price</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-xl font-bold mb-3">Health & Fitness</h3>
                    <ul className="space-y-2">
                      <li>1/2 mile or 1/4 mile distances</li>
                      <li>Body fat percentage (fraction of body mass)</li>
                      <li>Daily water intake (fraction of body weight)</li>
                      <li>Partial sets in workouts (1/2 or 3/4 complete)</li>
                    </ul>
                  </motion.div>
                </div>

                <h3>Sharing and Division</h3>
                <p>
                  Fractions are essential when sharing items equally among people. Whether it's dividing a pizza,
                  splitting a bill at a restaurant, or sharing the cost of a gift, fractions help ensure fairness.
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md my-6">
                  <h4 className="font-medium mb-3">Example: Sharing a Pizza</h4>
                  <p>
                    If 3 people share a pizza equally, each person gets 1/3 of the pizza.<br />
                    If some slices are larger than others, you might need to think in terms of fractions of the whole
                    rather than counting slices.
                  </p>
                </div>

                <h3>Digital Media & Communications</h3>
                <p>
                  Even in our digital world, fractions play an important role:
                </p>
                <ul>
                  <li>Screen aspect ratios (4:3, 16:9)</li>
                  <li>Storage capacity (fraction of total space used)</li>
                  <li>Download progress (fraction completed)</li>
                  <li>Video playback position (fraction of total duration)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cooking" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Fractions in Cooking & Recipes</h2>

                <p>
                  Cooking and baking rely heavily on fractions for precise measurements and proportions.
                  Understanding how to work with fractions is essential for successful cooking.
                </p>

                <div className="my-6">
                  <h3>Common Cooking Measurements</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-blue-100 dark:bg-blue-900/40">
                          <th className="border p-2 text-left">Measurement</th>
                          <th className="border p-2 text-left">Equivalent</th>
                          <th className="border p-2 text-left">Used For</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border p-2">1/4 teaspoon</td>
                          <td className="border p-2">1.25 ml</td>
                          <td className="border p-2">Spices, extracts</td>
                        </tr>
                        <tr>
                          <td className="border p-2">1/2 teaspoon</td>
                          <td className="border p-2">2.5 ml</td>
                          <td className="border p-2">Salt, baking powder</td>
                        </tr>
                        <tr>
                          <td className="border p-2">1/4 cup</td>
                          <td className="border p-2">59 ml</td>
                          <td className="border p-2">Liquids, chopped ingredients</td>
                        </tr>
                        <tr>
                          <td className="border p-2">1/3 cup</td>
                          <td className="border p-2">79 ml</td>
                          <td className="border p-2">Flour, sugar</td>
                        </tr>
                        <tr>
                          <td className="border p-2">1/2 cup</td>
                          <td className="border p-2">118 ml</td>
                          <td className="border p-2">Butter, rice</td>
                        </tr>
                        <tr>
                          <td className="border p-2">2/3 cup</td>
                          <td className="border p-2">158 ml</td>
                          <td className="border p-2">Nuts, chocolate chips</td>
                        </tr>
                        <tr>
                          <td className="border p-2">3/4 cup</td>
                          <td className="border p-2">177 ml</td>
                          <td className="border p-2">Grated cheese, fruits</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <h3>Recipe Scaling</h3>
                <p>
                  Fractions are crucial when scaling recipes up or down to serve different numbers of people.
                </p>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md my-6">
                  <h4 className="font-medium mb-3">Example: Halving a Recipe</h4>
                  <p>Original recipe (serves 4):</p>
                  <ul>
                    <li>2 cups flour</li>
                    <li>3/4 cup sugar</li>
                    <li>1/2 cup butter</li>
                    <li>2/3 cup milk</li>
                  </ul>

                  <p className="mt-4">Halved recipe (serves 2):</p>
                  <ul>
                    <li>1 cup flour</li>
                    <li>3/8 cup sugar (or 6 tablespoons)</li>
                    <li>1/4 cup butter</li>
                    <li>1/3 cup milk</li>
                  </ul>
                </div>

                <h3>Nutritional Information</h3>
                <p>
                  Food labels use fractions to represent nutritional content as a fraction of daily recommended values.
                  When tracking macronutrients or calories, you often need to calculate fractions of serving sizes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Fractions in Business & Finance</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Interest Rates</h3>
                    <p>
                      Interest rates are often expressed as fractions or percentages. For example, a mortgage
                      interest rate of 4.75% can be written as 4 3/4% or 0.0475 as a decimal.
                    </p>
                    <p className="mt-2">
                      When calculating interest payments, these fractions are used in formulas like:
                      <br /><span className="font-medium">Interest = Principal × Rate × Time</span>
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-3">Market Share</h3>
                    <p>
                      Companies often express their market position as a fraction of the total market. For example,
                      a company might have a 1/3 market share, meaning they control one-third of all sales in their industry.
                    </p>
                    <p className="mt-2">
                      This helps businesses understand their competitive position and growth opportunities.
                    </p>
                  </div>
                </div>

                <h3>Stock Trading & Investments</h3>
                <p>
                  In the world of investments, fractions appear in various forms:
                </p>
                <ul>
                  <li>
                    <strong>Stock Prices:</strong> Historically quoted in fractions (e.g., 24 1/8), though most markets
                    now use decimals
                  </li>
                  <li>
                    <strong>Fractional Shares:</strong> Owning a portion of a share of stock (e.g., 0.5 shares of a company)
                  </li>
                  <li>
                    <strong>Asset Allocation:</strong> Dividing investments among different assets (e.g., 3/5 in stocks, 1/5 in bonds, 1/5 in cash)
                  </li>
                  <li>
                    <strong>Debt-to-Equity Ratio:</strong> A financial ratio that compares a company's debt to its equity
                  </li>
                </ul>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md my-6">
                  <h4 className="font-medium mb-3">Example: Profit Sharing</h4>
                  <p>
                    A company makes $300,000 in profit and decides to share 1/6 of it among 20 employees equally.
                  </p>
                  <p className="mt-2">
                    Amount to share = $300,000 × 1/6 = $50,000<br />
                    Each employee receives = $50,000 ÷ 20 = $2,500
                  </p>
                </div>

                <h3>Tax Rates and Calculations</h3>
                <p>
                  Tax brackets, rates, and deductions often involve fractional calculations:
                </p>
                <ul>
                  <li>Income tax rates (e.g., 1/4 of income above a certain threshold)</li>
                  <li>Sales tax calculations</li>
                  <li>Property tax as a fraction of assessed value</li>
                  <li>Tax deductions (e.g., deducting 1/2 of self-employment tax)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="science" className="p-4">
          <Card>
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Fractions in Science & Engineering</h2>

                <h3>Physics</h3>
                <p>
                  Fractions are fundamental to many physical laws and principles:
                </p>
                <ul>
                  <li>
                    <strong>Newton's Second Law:</strong> Force = Mass × Acceleration<br />
                    When rearranged: Acceleration = Force ÷ Mass (a fraction)
                  </li>
                  <li>
                    <strong>Density:</strong> Mass ÷ Volume (a fraction)
                  </li>
                  <li>
                    <strong>Wave Properties:</strong> Frequency = 1 ÷ Period (a fraction)
                  </li>
                  <li>
                    <strong>Efficiency:</strong> Output ÷ Input (a fraction, often expressed as a percentage)
                  </li>
                </ul>

                <h3>Chemistry</h3>
                <p>
                  Chemistry relies extensively on proportions and ratios:
                </p>
                <ul>
                  <li>
                    <strong>Concentration:</strong> Solute ÷ Solution (a fraction)
                  </li>
                  <li>
                    <strong>Stoichiometry:</strong> The study of proportional relationships between reactants and products
                  </li>
                  <li>
                    <strong>Molarity:</strong> Moles of solute ÷ Liters of solution
                  </li>
                  <li>
                    <strong>Chemical Formulas:</strong> H₂O means 2 hydrogen atoms for every 1 oxygen atom (a 2:1 ratio)
                  </li>
                </ul>

                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-md my-6">
                  <h4 className="font-medium mb-3">Example: Chemical Dilution</h4>
                  <p>
                    A chemist needs to dilute a 3/4 molar solution to a 1/4 molar solution.
                  </p>
                  <p className="mt-2">
                    Using the dilution equation: C₁V₁ = C₂V₂<br />
                    If the chemist has 200 ml of the initial solution:<br />
                    (3/4 M)(200 ml) = (1/4 M)(V₂)<br />
                    V₂ = (3/4 × 200) ÷ (1/4) = 600 ml
                  </p>
                </div>

                <h3>Engineering & Construction</h3>
                <p>
                  Engineers and architects work with fractions daily:
                </p>
                <ul>
                  <li>
                    <strong>Measurements:</strong> Precise fractional measurements (e.g., 3/16 inch tolerance)
                  </li>
                  <li>
                    <strong>Scale Drawings:</strong> Using ratios like 1:10 or 1:100
                  </li>
                  <li>
                    <strong>Material Properties:</strong> Poisson's ratio, friction coefficients, etc.
                  </li>
                  <li>
                    <strong>Safety Factors:</strong> Designing structures to withstand 1.5× or 2× expected loads
                  </li>
                </ul>

                <h3>Medicine & Pharmacology</h3>
                <p>
                  Medical professionals rely on fractions for:
                </p>
                <ul>
                  <li>
                    <strong>Dosing Medications:</strong> Calculating doses based on patient weight (mg/kg)
                  </li>
                  <li>
                    <strong>IV Drip Rates:</strong> Drops per minute, concentration adjustments
                  </li>
                  <li>
                    <strong>Lab Values:</strong> Many reference ranges for blood tests are expressed as ratios
                  </li>
                  <li>
                    <strong>Vital Statistics:</strong> Heart rate, respiratory rate, blood pressure all involve fractional measurements
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FractionApplications;