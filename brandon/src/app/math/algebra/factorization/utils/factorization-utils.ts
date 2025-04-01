export interface Step {
  expression: string;
  explanation: string;
  visualizationType?: 'difference-of-squares' | 'quadratic-formula' | 'perfect-square';
  visualizationData?: any;
}

export interface Factorization {
  steps: Step[];
  result: string;
}

export interface Term {
  coefficient: number;
  exponent: number;
}

export interface Polynomial {
  terms: Term[];
}

// Parse a polynomial string into a structured format
export function parsePolynomial(input: string): Polynomial {
  // Remove all spaces from the input
  input = input.replace(/\s+/g, '');
  
  // Add a + sign before terms if there isn't a sign already
  input = input.replace(/([0-9x\^])([-])/g, '$1+$2');
  if (input[0] !== '+' && input[0] !== '-') {
    input = '+' + input;
  }
  
  const terms: Term[] = [];
  // Regex to match terms: sign, coefficient, x^exponent or x or constant
  const termRegex = /([+\-])([0-9]*)(x(\^([0-9]+))?)?/g;
  
  let match;
  while ((match = termRegex.exec(input)) !== null) {
    const sign = match[1] === '-' ? -1 : 1;
    let coefficient = match[2] === '' ? 1 : Number(match[2]);
    coefficient *= sign;
    
    // Determine exponent: if x is present but no exponent, it's 1; if no x, it's 0
    let exponent = 0;
    if (match[3]) { // x is present
      exponent = match[5] ? Number(match[5]) : 1;
    }
    
    // Add or update term
    const existingTermIndex = terms.findIndex(t => t.exponent === exponent);
    if (existingTermIndex >= 0) {
      terms[existingTermIndex].coefficient += coefficient;
    } else {
      terms.push({ coefficient, exponent });
    }
  }
  
  // Sort terms by descending exponent
  terms.sort((a, b) => b.exponent - a.exponent);
  
  // Remove terms with zero coefficient
  return { terms: terms.filter(t => t.coefficient !== 0) };
}

// Format a polynomial into a readable string
function formatPolynomial(polynomial: Polynomial): string {
  if (polynomial.terms.length === 0) {
    return '0';
  }
  
  return polynomial.terms.map((term, index) => {
    let termStr = '';
    
    // Add sign for all terms except the first
    if (index > 0) {
      termStr += term.coefficient > 0 ? ' + ' : ' - ';
    } else {
      // For the first term, only add sign if negative
      if (term.coefficient < 0) {
        termStr += '-';
      }
    }
    
    // Add coefficient (unless it's 1 or -1 with a variable)
    const absCoef = Math.abs(term.coefficient);
    if (term.exponent === 0 || absCoef !== 1) {
      termStr += absCoef;
    }
    
    // Add variable and exponent
    if (term.exponent > 0) {
      termStr += 'x';
      if (term.exponent > 1) {
        termStr += `^${term.exponent}`;
      }
    }
    
    return termStr;
  }).join('');
}

// Format a factorized expression
function formatFactorizedExpression(factors: string[]): string {
  return factors.join(' × ');
}

// Check if a number is a perfect square
function isPerfectSquare(num: number): boolean {
  const sqrt = Math.sqrt(num);
  return sqrt === Math.floor(sqrt);
}

// Find common factors for a set of coefficients
function findGCD(...numbers: number[]): number {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
  };
  
  return numbers.reduce((result, num) => gcd(result, num), numbers[0]);
}

// Factorize a polynomial
export function factorizePolynomial(polynomial: Polynomial): Factorization {
  const steps: Step[] = [];
  let factors: string[] = [];
  
  // Check if the polynomial is empty
  if (polynomial.terms.length === 0) {
    return { steps: [{ expression: '0', explanation: 'The polynomial is zero' }], result: '0' };
  }
  
  // Add initial step
  steps.push({
    expression: formatPolynomial(polynomial),
    explanation: 'Original polynomial'
  });
  
  // Check for common factors
  if (polynomial.terms.length > 1) {
    const coefficients = polynomial.terms.map(term => term.coefficient);
    const commonFactor = findGCD(...coefficients);
    
    if (commonFactor > 1) {
      // Factor out the common factor
      const simplifiedTerms = polynomial.terms.map(term => ({
        coefficient: term.coefficient / commonFactor,
        exponent: term.exponent
      }));
      
      const simplifiedPolynomial = { terms: simplifiedTerms };
      const formattedSimplified = formatPolynomial(simplifiedPolynomial);
      
      steps.push({
        expression: `${commonFactor}(${formattedSimplified})`,
        explanation: `Factor out the common factor ${commonFactor}`
      });
      
      factors.push(commonFactor.toString());
      
      // Continue factorizing the simplified polynomial
      const remainingFactorization = factorizePolynomial(simplifiedPolynomial);
      
      // Add remaining steps (skipping the first step which is just the simplified polynomial)
      steps.push(...remainingFactorization.steps.slice(1));
      
      // Add remaining factors
      const remainingFactors = remainingFactorization.result.split(' × ');
      factors.push(...remainingFactors);
      
      return { steps, result: formatFactorizedExpression(factors) };
    }
  }
  
  // Check for common variable factors
  if (polynomial.terms.every(term => term.exponent > 0)) {
    const minExponent = Math.min(...polynomial.terms.map(term => term.exponent));
    
    if (minExponent > 0) {
      // Factor out x^minExponent
      const simplifiedTerms = polynomial.terms.map(term => ({
        coefficient: term.coefficient,
        exponent: term.exponent - minExponent
      }));
      
      const simplifiedPolynomial = { terms: simplifiedTerms };
      const formattedSimplified = formatPolynomial(simplifiedPolynomial);
      
      steps.push({
        expression: `x^${minExponent}(${formattedSimplified})`,
        explanation: `Factor out the common variable x^${minExponent}`
      });
      
      factors.push(`x^${minExponent}`);
      
      // Continue factorizing the simplified polynomial
      const remainingFactorization = factorizePolynomial(simplifiedPolynomial);
      
      // Add remaining steps (skipping the first step which is just the simplified polynomial)
      steps.push(...remainingFactorization.steps.slice(1));
      
      // Add remaining factors
      const remainingFactors = remainingFactorization.result.split(' × ');
      factors.push(...remainingFactors);
      
      return { steps, result: formatFactorizedExpression(factors) };
    }
  }
  
  // Special case: Quadratic polynomial (ax^2 + bx + c)
  if (polynomial.terms.length <= 3 && 
      polynomial.terms.every(term => term.exponent <= 2) &&
      polynomial.terms.some(term => term.exponent === 2)) {
    
    // Extract coefficients
    let a = 0, b = 0, c = 0;
    for (const term of polynomial.terms) {
      if (term.exponent === 2) a = term.coefficient;
      else if (term.exponent === 1) b = term.coefficient;
      else if (term.exponent === 0) c = term.coefficient;
    }
    
    // Check for difference of squares: a^2 - b^2 = (a+b)(a-b)
    if (b === 0 && c < 0 && a > 0) {
      const cAbs = Math.abs(c);
      
      if (isPerfectSquare(a) && isPerfectSquare(cAbs)) {
        const sqrtA = Math.sqrt(a);
        const sqrtC = Math.sqrt(cAbs);
        
        steps.push({
          expression: `(${sqrtA}x + ${sqrtC})(${sqrtA}x - ${sqrtC})`,
          explanation: `Factored as difference of squares: ${a}x^2 - ${cAbs} = (${sqrtA}x)^2 - (${sqrtC})^2`,
          visualizationType: 'difference-of-squares',
          visualizationData: { a: sqrtA, b: sqrtC }
        });
        
        factors.push(`(${sqrtA}x + ${sqrtC})`, `(${sqrtA}x - ${sqrtC})`);
        return { steps, result: formatFactorizedExpression(factors) };
      }
    }
    
    // Check for perfect square trinomial: a^2 + 2ab + b^2 = (a+b)^2
    if (a > 0 && c > 0) {
      const sqrtA = Math.sqrt(a);
      const sqrtC = Math.sqrt(c);
      
      if (isPerfectSquare(a) && isPerfectSquare(c) && b === 2 * sqrtA * sqrtC) {
        steps.push({
          expression: `(${sqrtA}x + ${sqrtC})^2`,
          explanation: `Factored as perfect square trinomial: ${a}x^2 + ${b}x + ${c} = (${sqrtA}x + ${sqrtC})^2`,
          visualizationType: 'perfect-square',
          visualizationData: { a: sqrtA, b: sqrtC }
        });
        
        factors.push(`(${sqrtA}x + ${sqrtC})^2`);
        return { steps, result: formatFactorizedExpression(factors) };
      }
      
      // Check for negative perfect square trinomial: a^2 - 2ab + b^2 = (a-b)^2
      if (isPerfectSquare(a) && isPerfectSquare(c) && b === -2 * sqrtA * sqrtC) {
        steps.push({
          expression: `(${sqrtA}x - ${sqrtC})^2`,
          explanation: `Factored as perfect square trinomial: ${a}x^2 ${b}x + ${c} = (${sqrtA}x - ${sqrtC})^2`,
          visualizationType: 'perfect-square',
          visualizationData: { a: sqrtA, b: sqrtC }
        });
        
        factors.push(`(${sqrtA}x - ${sqrtC})^2`);
        return { steps, result: formatFactorizedExpression(factors) };
      }
    }
    
    // Try factoring by finding roots using the quadratic formula
    const discriminant = b * b - 4 * a * c;
    
    if (discriminant >= 0) {
      steps.push({
        expression: `${a}x^2 + ${b}x + ${c}`,
        explanation: `Using the quadratic formula: x = (-b ± √(b^2 - 4ac)) / 2a`,
        visualizationType: 'quadratic-formula',
        visualizationData: { a, b, c }
      });
      
      steps.push({
        expression: `${a}x^2 + ${b}x + ${c}`,
        explanation: `Calculate the discriminant: b^2 - 4ac = ${b}^2 - 4(${a})(${c}) = ${discriminant}`
      });
      
      if (discriminant === 0) {
        // One repeated root
        const root = -b / (2 * a);
        steps.push({
          expression: `${a}(x - ${root})^2`,
          explanation: `The discriminant is 0, so there is one repeated root: x = ${root}`
        });
        
        if (a === 1) {
          factors.push(`(x - ${root})^2`);
        } else {
          factors.push(`${a}`, `(x - ${root})^2`);
        }
      } else {
        // Two distinct roots
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        
        // Check if roots are integers or simple fractions for cleaner representation
        const root1Display = Number.isInteger(root1) ? root1 : root1.toFixed(2);
        const root2Display = Number.isInteger(root2) ? root2 : root2.toFixed(2);
        
        steps.push({
          expression: a === 1 ? 
            `(x - ${root1Display})(x - ${root2Display})` : 
            `${a}(x - ${root1Display})(x - ${root2Display})`,
          explanation: `The discriminant is positive, so there are two roots: x = ${root1Display} and x = ${root2Display}`
        });
        
        if (a === 1) {
          factors.push(`(x - ${root1Display})`, `(x - ${root2Display})`);
        } else {
          factors.push(`${a}`, `(x - ${root1Display})`, `(x - ${root2Display})`);
        }
      }
      
      return { steps, result: formatFactorizedExpression(factors) };
    } else {
      // Complex roots, not factorizable over real numbers
      steps.push({
        expression: formatPolynomial(polynomial),
        explanation: `The discriminant is negative, so this polynomial cannot be factored using real numbers`
      });
      
      return { steps, result: formatPolynomial(polynomial) };
    }
  }
  
  // If we can't factorize further
  if (steps.length === 1) {
    steps.push({
      expression: formatPolynomial(polynomial),
      explanation: "This polynomial cannot be factored further using elementary methods"
    });
    
    return { steps, result: formatPolynomial(polynomial) };
  }
  
  return { steps, result: formatFactorizedExpression(factors) };
} 