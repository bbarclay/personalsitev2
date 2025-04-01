export interface Step {
  equation: string;
  explanation: string;
}

export interface Solution {
  steps: Step[];
  result: number | null;
}

export interface ParsedEquation {
  leftSide: { coefficient: number; constant: number };
  rightSide: { coefficient: number; constant: number };
}

// Helper to simplify fractions
function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  
  if (denominator === 0) return [numerator, denominator];
  
  const divisor = Math.abs(gcd(numerator, denominator));
  return [numerator / divisor, denominator / divisor];
}

// Parse a linear equation string into a structured format
export function parseEquation(equation: string): ParsedEquation {
  // Remove all spaces from the equation
  equation = equation.replace(/\s+/g, '');
  
  // Split equation into left and right sides
  const sides = equation.split('=');
  if (sides.length !== 2) {
    throw new Error('Equation must contain exactly one equals sign');
  }
  
  const [leftStr, rightStr] = sides;
  
  // Function to parse one side of the equation
  const parseSide = (sideStr: string) => {
    let coefficient = 0;
    let constant = 0;
    
    // Add a + sign at the beginning if the string doesn't start with a sign
    if (sideStr[0] !== '+' && sideStr[0] !== '-') {
      sideStr = '+' + sideStr;
    }
    
    // Find all terms (including their signs)
    const termRegex = /[+\-][^+\-]*/g;
    const terms = sideStr.match(termRegex) || [];
    
    for (const term of terms) {
      const sign = term[0] === '-' ? -1 : 1;
      const value = term.substring(1);
      
      if (value.includes('x')) {
        // This is a term with x
        const parts = value.split('x');
        const coef = parts[0] === '' ? 1 : Number(parts[0]);
        coefficient += sign * coef;
        
        // Check if there's anything after x (which would make it not a linear equation)
        if (parts[1] && parts[1] !== '') {
          throw new Error('Equation must be linear (degree 1)');
        }
      } else {
        // This is a constant term
        constant += sign * Number(value);
      }
    }
    
    return { coefficient, constant };
  };
  
  try {
    const leftSide = parseSide(leftStr);
    const rightSide = parseSide(rightStr);
    
    return { leftSide, rightSide };
  } catch (error) {
    throw new Error(`Failed to parse equation: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Solve a linear equation step by step
export function solveLinearEquation(parsedEq: ParsedEquation): Solution {
  const steps: Step[] = [];
  let { leftSide, rightSide } = parsedEq;
  
  // First, format the original equation
  const formatEquation = (left: typeof leftSide, right: typeof rightSide) => {
    let leftStr = '';
    let rightStr = '';
    
    // Format left side
    if (left.coefficient !== 0) {
      leftStr += left.coefficient === 1 ? 'x' : 
                 left.coefficient === -1 ? '-x' : 
                 `${left.coefficient}x`;
    }
    
    if (left.constant !== 0) {
      const sign = left.constant > 0 && leftStr !== '' ? '+' : '';
      leftStr += `${sign}${left.constant}`;
    }
    
    if (leftStr === '') leftStr = '0';
    
    // Format right side
    if (right.coefficient !== 0) {
      rightStr += right.coefficient === 1 ? 'x' : 
                  right.coefficient === -1 ? '-x' : 
                  `${right.coefficient}x`;
    }
    
    if (right.constant !== 0) {
      const sign = right.constant > 0 && rightStr !== '' ? '+' : '';
      rightStr += `${sign}${right.constant}`;
    }
    
    if (rightStr === '') rightStr = '0';
    
    return `${leftStr} = ${rightStr}`;
  };
  
  // Add initial equation
  steps.push({
    equation: formatEquation(leftSide, rightSide),
    explanation: 'Original equation'
  });
  
  // Step 1: Move all terms with x to the left side
  if (rightSide.coefficient !== 0) {
    leftSide.coefficient -= rightSide.coefficient;
    rightSide.coefficient = 0;
    
    steps.push({
      equation: formatEquation(leftSide, rightSide),
      explanation: `Move all terms with x to the left side`
    });
  }
  
  // Step 2: Move all constant terms to the right side
  if (leftSide.constant !== 0) {
    rightSide.constant -= leftSide.constant;
    leftSide.constant = 0;
    
    steps.push({
      equation: formatEquation(leftSide, rightSide),
      explanation: 'Move all constant terms to the right side'
    });
  }
  
  // Step 3: Solve for x by dividing both sides by the coefficient of x
  let result: number | null = null;
  
  if (leftSide.coefficient === 0) {
    // If coefficient of x is 0, then we have 0 = constant
    if (rightSide.constant === 0) {
      // 0 = 0, infinite solutions
      steps.push({
        equation: 'x = any real number',
        explanation: 'Equation is true for any value of x (infinite solutions)'
      });
      result = null;
    } else {
      // 0 = non-zero, no solution
      steps.push({
        equation: 'No solution',
        explanation: 'Equation has no solution (contradiction)'
      });
      result = null;
    }
  } else {
    // Normal case: coefficient of x is non-zero
    result = rightSide.constant / leftSide.coefficient;
    
    // Check if the result is a simple fraction
    if (result !== Math.floor(result)) {
      const [numerator, denominator] = simplifyFraction(rightSide.constant, leftSide.coefficient);
      const sign = (numerator < 0 && denominator < 0) || (numerator > 0 && denominator < 0) ? '-' : '';
      const absNum = Math.abs(numerator);
      const absDen = Math.abs(denominator);
      
      steps.push({
        equation: absDen === 1 ? 
                 `x = ${sign}${absNum}` : 
                 `x = ${sign}${absNum}/${absDen}`,
        explanation: `Divide both sides by the coefficient of x (${leftSide.coefficient})`
      });
      
      // Add decimal approximation as a final step if not an integer
      if (absDen !== 1) {
        steps.push({
          equation: `x = ${result.toFixed(4)}`,
          explanation: 'Decimal approximation of the solution'
        });
      }
    } else {
      // Integer result
      steps.push({
        equation: `x = ${result}`,
        explanation: `Divide both sides by the coefficient of x (${leftSide.coefficient})`
      });
    }
  }
  
  return { steps, result };
} 