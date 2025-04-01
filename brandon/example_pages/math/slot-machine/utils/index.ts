// Symbol-related exports
export { symbols, getSymbolName, getSymbolById } from './symbols';

// Weight-related exports
export {
  defaultSymbolWeights,
  volatilityPresets,
  getVolatilityPreset,
  validateSymbolWeights,
  calculateWeightTotal,
  adjustSymbolWeight
} from './weights';

// Payline-related exports
export {
  paylines,
  getPaylineSymbols,
  countConsecutiveMatches,
  getPaylines,
  getPaylinePositions
} from './paylines';

// Randomization-related exports
export {
  getRandomSymbol,
  generateRandomReel,
  generateRandomReels,
  calculateScatterProbability,
  suggestWeightAdjustments
} from './randomization';

// Payout-related exports
export {
  defaultPayouts,
  calculateLinePayout,
  calculateScatterPayout,
  calculateFreeSpins,
  isJackpotWin,
  calculateTheoreticalRTP
} from './payouts';

// Spin calculation exports
export {
  calculateSpinResult,
  validateSpinResult
} from './spinCalculator';
