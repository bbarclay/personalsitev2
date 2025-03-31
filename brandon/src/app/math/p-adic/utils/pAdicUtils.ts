export function calculatePAdicExpansion(number: string, p: number, precision: number): number[] {
  // Handle different number formats
  if (number.includes('/')) {
    return handleFractionExpansion(number, p, precision);
  }

  if (number.includes('O')) {
    return handleSeriesExpansionCoefficients(number, p, precision);
  }

  return handleIntegerExpansion(number, p, precision);
}

export function calculateNorm(number: string, prime: number, precision: number): number {
  // Validate prime input
  if (!isPrime(prime)) {
    throw new Error('p must be a prime number');
  }

  // Handle different number formats
  if (number.includes('/')) {
    return handleFraction(number, prime);
  }

  if (number.includes('O')) {
    return handleSeriesExpansion(number, prime, precision);
  }

  return handleInteger(number, prime);
}

function isPrime(n: number): boolean {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function handleFraction(fraction: string, prime: number): number {
  const [numerator, denominator] = fraction.split('/').map(Number);
  const numeratorVal = valuation(numerator, prime);
  const denominatorVal = valuation(denominator, prime);
  return Math.pow(prime, denominatorVal - numeratorVal);
}

// Helper functions for expansion calculations
function handleFractionExpansion(fraction: string, prime: number, precision: number): number[] {
  const [numerator, denominator] = fraction.split('/').map(Number);
  const val = valuation(denominator, prime) - valuation(numerator, prime);
  const inverse = modInverse(numerator, Math.pow(prime, precision));
  return Array(precision).fill(0).map((_, i) => (inverse * denominator * i) % prime);
}

function handleSeriesExpansionCoefficients(series: string, prime: number, precision: number): number[] {
  const match = series.match(/(\d+)\s*\+\s*O\((\d+)\^(\d+)\)/);
  if (!match) throw new Error('Invalid series format');
  
  const [_, a0, base, exp] = match;
  if (parseInt(base) !== prime) throw new Error('Base mismatch with prime');
  
  // Return sample coefficients for demonstration
  return Array.from({length: precision}, (_, i) => i === 0 ? parseInt(a0) : 0);
}

function handleSeriesExpansion(series: string, prime: number, precision: number): number {
  const coefficients = handleSeriesExpansionCoefficients(series, prime, precision);
  return Math.pow(prime, -coefficients.length);
}

function handleIntegerExpansion(number: string, prime: number, precision: number): number[] {
  let n = parseInt(number);
  const expansion: number[] = [];
  
  for (let i = 0; i < precision; i++) {
    const coeff = n % prime;
    expansion.push(coeff);
    n = (n - coeff) / prime;
  }
  return expansion;
}

function modInverse(a: number, m: number): number {
  a = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  throw new Error('No modular inverse exists');
}

function handleInteger(number: string, prime: number): number {
  const n = parseInt(number);
  const val = valuation(n, prime);
  return Math.pow(prime, -val);
}

function valuation(n: number, p: number): number {
  if (n === 0) return Infinity;
  let count = 0;
  while (n % p === 0) {
    count++;
    n /= p;
  }
  return count;
}
