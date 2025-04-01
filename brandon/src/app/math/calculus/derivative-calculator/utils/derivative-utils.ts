export interface Step {
  expression: string;
  explanation: string;
}

export interface DerivativeResult {
  steps: Step[];
  result: string;
  error?: string;
}

export type FunctionType = 
  | 'polynomial' 
  | 'trigonometric' 
  | 'exponential' 
  | 'logarithmic'
  | 'composite';

export interface PolynomialTerm {
  coefficient: number;
  exponent: number;
}

// Parse a polynomial expression into terms
export function parsePolynomial(expression: string): PolynomialTerm[] {
  // Clean the input expression
  const cleanedExpression = expression.replace(/\s+/g, '');
  
  // Regular expression to match polynomial terms
  // Matches terms like: 2x^3, -5x^2, x, -x, 7, etc.
  const termRegex = /([+\-]?)(\d*)(x?)(?:\^(\d+))?/g;
  
  const terms: PolynomialTerm[] = [];
  let match: RegExpExecArray | null;
  
  // Find all terms in the expression
  while ((match = termRegex.exec(cleanedExpression)) !== null) {
    // Skip if the match is empty
    if (match[0] === '') continue;
    
    // Extract components of the term
    const sign = match[1] === '-' ? -1 : 1;
    const coefficientStr = match[2];
    const hasX = match[3] === 'x';
    const exponentStr = match[4];
    
    // Parse coefficient
    let coefficient = 1;
    if (coefficientStr !== '') {
      coefficient = parseInt(coefficientStr);
    } else if (!hasX) {
      // If no coefficient and no x, it's a constant term
      coefficient = 0;
    }
    
    coefficient *= sign;
    
    // Parse exponent
    let exponent = hasX ? (exponentStr ? parseInt(exponentStr) : 1) : 0;
    
    // Add the term
    terms.push({ coefficient, exponent });
  }
  
  return terms;
}

// Format a polynomial term as a string
export function formatTerm(coefficient: number, exponent: number): string {
  if (coefficient === 0) return '';
  
  let result = '';
  
  // Handle the coefficient
  if (exponent === 0) {
    // Constant term
    return coefficient.toString();
  } else if (coefficient === 1) {
    // Coefficient of 1 doesn't need to be shown except for constant terms
    result = '';
  } else if (coefficient === -1) {
    // Coefficient of -1 just needs a negative sign
    result = '-';
  } else {
    // Other coefficients
    result = coefficient.toString();
  }
  
  // Add the variable and exponent
  result += 'x';
  if (exponent !== 1) {
    result += `^${exponent}`;
  }
  
  return result;
}

// Format a polynomial as a string
export function formatPolynomial(terms: PolynomialTerm[]): string {
  if (terms.length === 0) return '0';
  
  let result = '';
  
  terms.sort((a, b) => b.exponent - a.exponent);
  
  for (let i = 0; i < terms.length; i++) {
    const { coefficient, exponent } = terms[i];
    
    if (coefficient === 0) continue;
    
    const termStr = formatTerm(coefficient, exponent);
    
    if (i === 0) {
      // First term
      result += termStr;
    } else {
      // Subsequent terms
      if (coefficient > 0) {
        result += ` + ${termStr}`;
      } else {
        result += ` - ${formatTerm(Math.abs(coefficient), exponent)}`;
      }
    }
  }
  
  return result || '0';
}

// Calculate the derivative of a polynomial
export function differentiatePolynomial(expression: string): DerivativeResult {
  const steps: Step[] = [];
  
  steps.push({
    expression,
    explanation: 'Original expression'
  });
  
  try {
    const terms = parsePolynomial(expression);
    
    steps.push({
      expression: formatPolynomial(terms),
      explanation: 'Parse the expression into terms'
    });
    
    // Apply the power rule to each term
    const derivativeTerms: PolynomialTerm[] = [];
    
    for (const term of terms) {
      const { coefficient, exponent } = term;
      
      if (exponent === 0) {
        // Derivative of a constant is 0
        steps.push({
          expression: `d/dx(${coefficient}) = 0`,
          explanation: 'The derivative of a constant is 0'
        });
      } else {
        // Apply the power rule: d/dx(a*x^n) = a*n*x^(n-1)
        const newCoefficient = coefficient * exponent;
        const newExponent = exponent - 1;
        
        steps.push({
          expression: `d/dx(${formatTerm(coefficient, exponent)}) = ${formatTerm(newCoefficient, newExponent)}`,
          explanation: `Apply the power rule: d/dx(x^n) = n·x^(n-1)`
        });
        
        derivativeTerms.push({
          coefficient: newCoefficient,
          exponent: newExponent
        });
      }
    }
    
    const result = formatPolynomial(derivativeTerms);
    
    steps.push({
      expression: result,
      explanation: 'Combine all terms to get the final result'
    });
    
    return {
      steps,
      result
    };
  } catch (error) {
    return {
      steps,
      result: 'Error',
      error: error instanceof Error ? error.message : String(error)
    };
  }
}

// Rules for derivatives of common trigonometric functions
const trigRules: Record<string, { derivative: string, explanation: string }> = {
  'sin': { derivative: 'cos(x)', explanation: 'd/dx(sin(x)) = cos(x)' },
  'cos': { derivative: '-sin(x)', explanation: 'd/dx(cos(x)) = -sin(x)' },
  'tan': { derivative: 'sec^2(x)', explanation: 'd/dx(tan(x)) = sec^2(x)' },
  'cot': { derivative: '-csc^2(x)', explanation: 'd/dx(cot(x)) = -csc^2(x)' },
  'sec': { derivative: 'sec(x)tan(x)', explanation: 'd/dx(sec(x)) = sec(x)tan(x)' },
  'csc': { derivative: '-csc(x)cot(x)', explanation: 'd/dx(csc(x)) = -csc(x)cot(x)' }
};

// Calculate derivative of trigonometric functions
export function differentiateTrigonometric(expression: string): DerivativeResult {
  const steps: Step[] = [];
  
  steps.push({
    expression,
    explanation: 'Original expression'
  });
  
  // Simple pattern matching for basic trig functions
  const trigFuncRegex = /^(sin|cos|tan|cot|sec|csc)\(x\)$/;
  const match = expression.match(trigFuncRegex);
  
  if (!match) {
    return {
      steps,
      result: 'Error',
      error: 'Expression must be in the form of trig(x), e.g., sin(x), cos(x)'
    };
  }
  
  const funcName = match[1];
  const rule = trigRules[funcName];
  
  if (!rule) {
    return {
      steps,
      result: 'Error',
      error: `Derivative rule for ${funcName} is not implemented`
    };
  }
  
  steps.push({
    expression: `d/dx(${expression}) = ${rule.derivative}`,
    explanation: rule.explanation
  });
  
  return {
    steps,
    result: rule.derivative
  };
}

// Calculate derivative of exponential functions
export function differentiateExponential(expression: string): DerivativeResult {
  const steps: Step[] = [];
  
  steps.push({
    expression,
    explanation: 'Original expression'
  });
  
  // Pattern matching for e^x or a^x
  const expRegex = /^e\^x$|^(\d+)\^x$/;
  const match = expression.match(expRegex);
  
  if (!match) {
    return {
      steps,
      result: 'Error',
      error: 'Expression must be in the form of e^x or a^x'
    };
  }
  
  let result: string;
  
  if (match[0] === 'e^x') {
    // d/dx(e^x) = e^x
    steps.push({
      expression: 'd/dx(e^x) = e^x',
      explanation: 'The derivative of e^x is e^x'
    });
    
    result = 'e^x';
  } else {
    // d/dx(a^x) = a^x * ln(a)
    const base = match[1];
    
    steps.push({
      expression: `d/dx(${base}^x) = ${base}^x * ln(${base})`,
      explanation: `The derivative of a^x is a^x * ln(a)`
    });
    
    result = `${base}^x * ln(${base})`;
  }
  
  return {
    steps,
    result
  };
}

// Calculate derivative of logarithmic functions
export function differentiateLogarithmic(expression: string): DerivativeResult {
  const steps: Step[] = [];
  
  steps.push({
    expression,
    explanation: 'Original expression'
  });
  
  // Pattern matching for ln(x) or log_a(x)
  const logRegex = /^ln\(x\)$|^log_(\d+)\(x\)$/;
  const match = expression.match(logRegex);
  
  if (!match) {
    return {
      steps,
      result: 'Error',
      error: 'Expression must be in the form of ln(x) or log_a(x)'
    };
  }
  
  let result: string;
  
  if (match[0] === 'ln(x)') {
    // d/dx(ln(x)) = 1/x
    steps.push({
      expression: 'd/dx(ln(x)) = 1/x',
      explanation: 'The derivative of ln(x) is 1/x'
    });
    
    result = '1/x';
  } else {
    // d/dx(log_a(x)) = 1/(x*ln(a))
    const base = match[1];
    
    steps.push({
      expression: `d/dx(log_${base}(x)) = 1/(x*ln(${base}))`,
      explanation: `The derivative of log_a(x) is 1/(x*ln(a))`
    });
    
    result = `1/(x*ln(${base}))`;
  }
  
  return {
    steps,
    result
  };
}

// Main function to calculate derivatives
export function calculateDerivative(expression: string, functionType: FunctionType): DerivativeResult {
  switch (functionType) {
    case 'polynomial':
      return differentiatePolynomial(expression);
    case 'trigonometric':
      return differentiateTrigonometric(expression);
    case 'exponential':
      return differentiateExponential(expression);
    case 'logarithmic':
      return differentiateLogarithmic(expression);
    default:
      return {
        steps: [],
        result: 'Error',
        error: 'Unsupported function type'
      };
  }
} 