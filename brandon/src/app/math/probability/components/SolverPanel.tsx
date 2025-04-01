import React, { useState } from 'react';

type ProbabilityType = 'coin' | 'dice' | 'cards' | 'custom';

export default function SolverPanel() {
  const [probabilityType, setProbabilityType] = useState<ProbabilityType>('coin');
  const [numCoins, setNumCoins] = useState('1');
  const [numHeads, setNumHeads] = useState('1');
  const [numDice, setNumDice] = useState('1');
  const [diceValue, setDiceValue] = useState('6');
  const [diceTarget, setDiceTarget] = useState('6');
  const [cardSuit, setCardSuit] = useState('hearts');
  const [customTotal, setCustomTotal] = useState('52');
  const [customFavorable, setCustomFavorable] = useState('13');
  
  const [result, setResult] = useState<{ probability: number; explanation: string } | null>(null);

  // Function to calculate coin flip probability
  const calculateCoinProbability = () => {
    const n = parseInt(numCoins);
    const k = parseInt(numHeads);
    
    if (isNaN(n) || isNaN(k) || n < 0 || k < 0 || k > n) {
      return { 
        probability: 0, 
        explanation: 'Invalid input. Please ensure the number of heads is not greater than the number of coins.' 
      };
    }
    
    // Calculate combination nCk (binomial coefficient)
    const combinations = calculateCombination(n, k);
    
    // Probability of exactly k heads in n flips = nCk * (1/2)^n
    const probability = combinations * Math.pow(0.5, n);
    
    return {
      probability,
      explanation: `For ${n} coin flip(s), the probability of getting exactly ${k} head(s) is ${combinations} × (1/2)^${n} = ${probability.toFixed(6)}`
    };
  };

  // Function to calculate dice roll probability
  const calculateDiceProbability = () => {
    const n = parseInt(numDice);
    const sides = parseInt(diceValue);
    const target = parseInt(diceTarget);
    
    if (isNaN(n) || isNaN(sides) || isNaN(target) || n <= 0 || sides <= 0 || target <= 0) {
      return { 
        probability: 0, 
        explanation: 'Invalid input. Please ensure all values are positive.' 
      };
    }
    
    if (target > sides) {
      return { 
        probability: 0, 
        explanation: `A ${sides}-sided die cannot roll a ${target}.` 
      };
    }
    
    // Probability of rolling a specific number on one die = 1/sides
    // Probability of rolling the number on all n dice = (1/sides)^n
    const probabilityOfOne = 1 / sides;
    const probability = Math.pow(probabilityOfOne, n);
    
    return {
      probability,
      explanation: `For ${n} ${sides}-sided dice, the probability of rolling ${target} on all dice is (1/${sides})^${n} = ${probability.toFixed(6)}`
    };
  };

  // Function to calculate card drawing probability
  const calculateCardProbability = () => {
    // Standard deck has 52 cards, 13 cards per suit
    const totalCards = 52;
    const cardsInSuit = 13;
    
    const probability = cardsInSuit / totalCards;
    
    return {
      probability,
      explanation: `In a standard 52-card deck, the probability of drawing a ${cardSuit} card is ${cardsInSuit}/${totalCards} = ${probability.toFixed(6)}`
    };
  };

  // Function to calculate custom probability
  const calculateCustomProbability = () => {
    const total = parseInt(customTotal);
    const favorable = parseInt(customFavorable);
    
    if (isNaN(total) || isNaN(favorable) || total <= 0 || favorable < 0) {
      return { 
        probability: 0, 
        explanation: 'Invalid input. Please ensure all values are valid.' 
      };
    }
    
    if (favorable > total) {
      return { 
        probability: 0, 
        explanation: 'The number of favorable outcomes cannot be greater than the total number of outcomes.' 
      };
    }
    
    const probability = favorable / total;
    
    return {
      probability,
      explanation: `With ${favorable} favorable outcomes out of ${total} total outcomes, the probability is ${favorable}/${total} = ${probability.toFixed(6)}`
    };
  };

  // Helper function to calculate nCk (binomial coefficient)
  const calculateCombination = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    
    // Calculate factorial
    const factorial = (num: number): number => {
      let result = 1;
      for (let i = 2; i <= num; i++) {
        result *= i;
      }
      return result;
    };
    
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const calculateProbability = () => {
    let result;
    
    switch (probabilityType) {
      case 'coin':
        result = calculateCoinProbability();
        break;
      case 'dice':
        result = calculateDiceProbability();
        break;
      case 'cards':
        result = calculateCardProbability();
        break;
      case 'custom':
        result = calculateCustomProbability();
        break;
      default:
        result = { probability: 0, explanation: 'Unknown calculation type.' };
    }
    
    setResult(result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateProbability();
  };

  return (
    <div className="space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h2>Probability Calculator</h2>
        <p>
          Calculate the probability of different events using common probability scenarios.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="probabilityType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Calculation Type
          </label>
          <select
            id="probabilityType"
            value={probabilityType}
            onChange={(e) => setProbabilityType(e.target.value as ProbabilityType)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="coin">Coin Flip</option>
            <option value="dice">Dice Roll</option>
            <option value="cards">Card Drawing</option>
            <option value="custom">Custom Probability</option>
          </select>
        </div>

        {probabilityType === 'coin' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coin Flip Probability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="numCoins" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number of Coins
                </label>
                <input
                  type="number"
                  id="numCoins"
                  value={numCoins}
                  onChange={(e) => setNumCoins(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="numHeads" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number of Heads
                </label>
                <input
                  type="number"
                  id="numHeads"
                  value={numHeads}
                  onChange={(e) => setNumHeads(e.target.value)}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {probabilityType === 'dice' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dice Roll Probability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="numDice" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number of Dice
                </label>
                <input
                  type="number"
                  id="numDice"
                  value={numDice}
                  onChange={(e) => setNumDice(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="diceValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Number of Sides
                </label>
                <input
                  type="number"
                  id="diceValue"
                  value={diceValue}
                  onChange={(e) => setDiceValue(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="diceTarget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target Number
                </label>
                <input
                  type="number"
                  id="diceTarget"
                  value={diceTarget}
                  onChange={(e) => setDiceTarget(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {probabilityType === 'cards' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Card Drawing Probability</h3>
            <div>
              <label htmlFor="cardSuit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Card Suit
              </label>
              <select
                id="cardSuit"
                value={cardSuit}
                onChange={(e) => setCardSuit(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="hearts">Hearts</option>
                <option value="diamonds">Diamonds</option>
                <option value="clubs">Clubs</option>
                <option value="spades">Spades</option>
              </select>
            </div>
          </div>
        )}

        {probabilityType === 'custom' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Custom Probability</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customTotal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Total Outcomes
                </label>
                <input
                  type="number"
                  id="customTotal"
                  value={customTotal}
                  onChange={(e) => setCustomTotal(e.target.value)}
                  min="1"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="customFavorable" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Favorable Outcomes
                </label>
                <input
                  type="number"
                  id="customFavorable"
                  value={customFavorable}
                  onChange={(e) => setCustomFavorable(e.target.value)}
                  min="0"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Calculate Probability
        </button>
      </form>

      {result && (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Result</h3>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-md shadow">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <p className="text-gray-700 dark:text-gray-300">{result.explanation}</p>
              <div className="mt-2 sm:mt-0 text-xl font-bold text-blue-600 dark:text-blue-400">
                {(result.probability * 100).toFixed(2)}%
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" 
                style={{ width: `${result.probability * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 