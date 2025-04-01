'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { useGameState } from './GameState';

interface StatProps {
  label: string;
  value: string | number;
  tooltip?: string;
}

const StatItem: React.FC<StatProps> = ({ label, value, tooltip }) => (
  <div
    className="bg-gray-800 p-4 rounded-lg"
    title={tooltip}
  >
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-xl font-bold text-white">{value}</p>
  </div>
);

export const Statistics: React.FC = () => {
  const {
    stats,
    totalSpins,
    totalWins,
    balance,
    betAmount,
    totalPayout,
  } = useGameState();

  // Calculate casino metrics
  const totalCoinIn = totalSpins * betAmount;
  const totalCoinOut = totalPayout;
  const holdPercentage = totalCoinIn > 0
    ? ((totalCoinIn - totalCoinOut) / totalCoinIn) * 100
    : 0;
  const rtp = totalCoinIn > 0
    ? (totalCoinOut / totalCoinIn) * 100
    : 0;
  const houseEdge = 100 - rtp;
  const hitFrequency = totalSpins > 0
    ? (totalWins / totalSpins) * 100
    : 0;

  // Calculate volatility index
  const winAmounts = stats
    .filter(stat => stat.totalPayout > 0)
    .map(stat => stat.totalPayout);
  const mean = winAmounts.length > 0
    ? winAmounts.reduce((a, b) => a + b) / winAmounts.length
    : 0;
  const variance = winAmounts.length > 0
    ? winAmounts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / winAmounts.length
    : 0;
  const volatilityIndex = Math.sqrt(variance) / mean || 0;

  // Format numbers for display
  const formatNumber = (num: number): string => num.toFixed(2);
  const formatPercentage = (num: number): string => `${num.toFixed(2)}%`;
  const formatCurrency = (num: number): string => `$${num.toFixed(2)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Casino Analytics Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatItem
            label="Total Coin In"
            value={formatCurrency(totalCoinIn)}
            tooltip="Total amount wagered by players"
          />
          <StatItem
            label="Total Coin Out"
            value={formatCurrency(totalCoinOut)}
            tooltip="Total amount paid out to players"
          />
          <StatItem
            label="Hold Amount"
            value={formatCurrency(totalCoinIn - totalCoinOut)}
            tooltip="Amount retained by the house"
          />
          <StatItem
            label="Hold Percentage"
            value={formatPercentage(holdPercentage)}
            tooltip="Percentage of wagers retained by the house"
          />

          <StatItem
            label="Return to Player (RTP)"
            value={formatPercentage(rtp)}
            tooltip="Percentage of wagers returned to players over time"
          />
          <StatItem
            label="House Edge"
            value={formatPercentage(houseEdge)}
            tooltip="Casino's statistical advantage"
          />
          <StatItem
            label="Hit Frequency"
            value={formatPercentage(hitFrequency)}
            tooltip="Percentage of spins resulting in a win"
          />
          <StatItem
            label="Volatility Index"
            value={formatNumber(volatilityIndex)}
            tooltip="Measure of risk and reward variation"
          />

          <StatItem
            label="Total Spins"
            value={totalSpins}
            tooltip="Total number of games played"
          />
          <StatItem
            label="Winning Spins"
            value={totalWins}
            tooltip="Number of winning outcomes"
          />
          <StatItem
            label="Average Bet"
            value={formatCurrency(betAmount)}
            tooltip="Average wager per spin"
          />
          <StatItem
            label="Current Balance"
            value={formatCurrency(balance)}
            tooltip="Current player balance"
          />
        </div>
      </CardContent>
    </Card>
  );
};
