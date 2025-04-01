export type Method = 'elimination' | 'substitution' | 'matrices';

export interface Point {
  x: number;
  y: number;
}

export interface GraphData {
  equations: string[];
  point: Point | null;
}

export interface Step {
  explanation: string;
  equations: string;
  graphData?: GraphData;
}

export interface Solution {
  steps: Step[];
  result: string | null;
}

export interface ParsedEquation {
  leftCoefficients: Record<string, number>;
  rightConstant: number;
  original: string;
}

export interface ParsedSystem {
  equations: ParsedEquation[];
  variables: string[];
}

/**
 * Parse a system of linear equations
 */
export function parseSystem(systemString: string): ParsedSystem {
  const lines = systemString.trim().split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    throw new Error('No equations provided');
  }
  
  // Basic implementation for 2-variable systems (x and y)
  const variables = ['x', 'y'];
  const parsedEquations: ParsedEquation[] = [];
  
  for (const line of lines) {
    const equation = parseEquation(line, variables);
    parsedEquations.push(equation);
  }
  
  return {
    equations: parsedEquations,
    variables
  };
}

/**
 * Parse a single equation into coefficients and constant
 */
function parseEquation(equationString: string, variables: string[]): ParsedEquation {
  // Replace spaces and split by equals sign
  const cleanedString = equationString.replace(/\s+/g, '');
  const sides = cleanedString.split('=');
  
  if (sides.length !== 2) {
    throw new Error(`Invalid equation format: ${equationString}`);
  }
  
  const [leftSide, rightSide] = sides;
  
  // Initialize coefficients array
  const leftCoefficients: Record<string, number> = {};
  let rightConstant = 0;
  
  // Process terms on the left side (positive)
  parseTerms(leftSide, variables, leftCoefficients, rightConstant, 1);
  
  // Process terms on the right side (negative)
  parseTerms(rightSide, variables, leftCoefficients, rightConstant, -1);
  
  return {
    leftCoefficients,
    rightConstant,
    original: equationString
  };
}

/**
 * Parse the terms of an equation side
 */
function parseTerms(
  side: string,
  variables: string[],
  coefficients: Record<string, number>,
  constant: number,
  sign: number
): void {
  // Add + to beginning if side doesn't start with + or -
  if (!['+', '-'].includes(side[0])) {
    side = '+' + side;
  }
  
  // Regular expression to match terms like +3x, -2y, +5, -7
  const termRegex = /[+\-][^+\-]*/g;
  const terms = side.match(termRegex) || [];
  
  for (const term of terms) {
    const termSign = term[0] === '+' ? sign : -sign;
    const termContent = term.substring(1);
    
    // Check if term contains a variable
    let foundVariable = false;
    
    for (let i = 0; i < variables.length; i++) {
      const variable = variables[i];
      if (termContent.includes(variable)) {
        foundVariable = true;
        // Extract coefficient
        const coefficientStr = termContent.replace(variable, '') || '1';
        let coefficient = parseFloat(coefficientStr);
        if (isNaN(coefficient)) coefficient = 1;
        
        coefficients[variable] -= termSign * coefficient;
      }
    }
    
    // If no variable found, term is a constant
    if (!foundVariable) {
      constant += termSign * parseFloat(termContent);
    }
  }
}

/**
 * Format a system of equations for display
 */
function formatSystem(system: ParsedSystem): string {
  return system.equations.map(eq => formatEquation(eq, system.variables)).join('\n');
}

/**
 * Format a single equation for display
 */
function formatEquation(equation: ParsedEquation, variables: string[]): string {
  let result = '';
  
  for (let i = 0; i < variables.length; i++) {
    const coef = equation.leftCoefficients[variables[i]] || 0;
    
    if (coef === 0) continue;
    
    if (result && coef > 0) {
      result += ' + ';
    } else if (result && coef < 0) {
      result += ' - ';
    } else if (coef < 0) {
      result += '-';
    }
    
    const absCoef = Math.abs(coef);
    if (absCoef !== 1) {
      result += absCoef;
    }
    
    result += variables[i];
  }
  
  result += ' = ' + equation.rightConstant;
  
  return result;
}

/**
 * Solve a system of linear equations
 */
export function solveSystem(system: ParsedSystem, method: Method): Solution {
  if (system.equations.length === 0) {
    throw new Error('No equations to solve');
  }
  
  if (system.variables.length !== 2) {
    throw new Error('Only 2-variable systems are supported');
  }
  
  // Default to elimination if method is invalid
  if (!['elimination', 'substitution', 'matrices'].includes(method)) {
    method = 'elimination';
  }
  
  // Dispatch to appropriate solution method
  switch (method) {
    case 'elimination':
      return solveByElimination(system);
    case 'substitution':
      return solveBySubstitution(system);
    case 'matrices':
      return solveByMatrices(system);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

/**
 * Solve using the elimination method
 */
function solveByElimination(system: ParsedSystem): Solution {
  const steps: Step[] = [];
  
  // Start with a description of the system
  const initialSystem = formatSystem(system);
  steps.push({
    explanation: 'Starting linear system',
    equations: initialSystem,
    graphData: {
      equations: system.equations.map(eq => formatEquation(eq, system.variables)),
      point: null
    }
  });
  
  const [eq1, eq2] = system.equations;
  
  // Get coefficients and constants
  const a1 = eq1.leftCoefficients[system.variables[0]] || 0;
  const b1 = eq1.leftCoefficients[system.variables[1]] || 0;
  const c1 = eq1.rightConstant;
  
  const a2 = eq2.leftCoefficients[system.variables[0]] || 0;
  const b2 = eq2.leftCoefficients[system.variables[1]] || 0; 
  const c2 = eq2.rightConstant;
  
  // Check determinant to see if system has a unique solution
  const determinant = a1 * b2 - a2 * b1;
  
  if (determinant === 0) {
    // Check if system has no solution or infinitely many solutions
    if (a1 / a2 !== b1 / b2 || a1 / a2 !== c1 / c2) {
      steps.push({
        explanation: 'The system has no solutions (inconsistent)',
        equations: 'No solution exists'
      });
      return { steps, result: null };
    } else {
      steps.push({
        explanation: 'The system has infinitely many solutions (dependent)',
        equations: 'Infinitely many solutions'
      });
      return { steps, result: 'Infinitely many solutions' };
    }
  }
  
  // Multiply first equation to eliminate x-term
  const lcm = findLCM(a1, a2);
  const factor1 = lcm / Math.abs(a1);
  const factor2 = lcm / Math.abs(a2);
  
  const sign1 = a1 > 0 ? 1 : -1;
  const sign2 = a2 > 0 ? -1 : 1;
  
  const newA1 = a1 * factor1 * sign1;
  const newB1 = b1 * factor1 * sign1;
  const newC1 = c1 * factor1 * sign1;
  
  const newA2 = a2 * factor2 * sign2;
  const newB2 = b2 * factor2 * sign2;
  const newC2 = c2 * factor2 * sign2;
  
  // Scale equations
  const scaledEq1 = `${factor1 * sign1}(${formatEquation(eq1, system.variables)})`;
  const scaledEq2 = `${factor2 * sign2}(${formatEquation(eq2, system.variables)})`;
  
  const scaledEq1Result = `${Math.abs(newA1)}x ${newB1 >= 0 ? '+' : ''} ${newB1}y = ${newC1}`;
  const scaledEq2Result = `${Math.abs(newA2)}x ${newB2 >= 0 ? '+' : ''} ${newB2}y = ${newC2}`;
  
  steps.push({
    explanation: 'Scale equations to prepare for elimination',
    equations: `${scaledEq1} → ${scaledEq1Result}\n${scaledEq2} → ${scaledEq2Result}`
  });
  
  // Add equations to eliminate x-term
  const sumB = newB1 + newB2;
  const sumC = newC1 + newC2;
  
  steps.push({
    explanation: 'Add equations to eliminate x term',
    equations: `${scaledEq1Result}\n+ ${scaledEq2Result}\n-----------------\n${sumB}y = ${sumC}`
  });
  
  // Solve for y
  const y = sumC / sumB;
  
  steps.push({
    explanation: 'Solve for y',
    equations: `${sumB}y = ${sumC}\ny = ${sumC} / ${sumB}\ny = ${y.toFixed(4)}`
  });
  
  // Back-substitute to find x
  const x = (c1 - b1 * y) / a1;
  
  steps.push({
    explanation: 'Back-substitute to find x',
    equations: `${a1}x + ${b1}y = ${c1}\n${a1}x = ${c1} - ${b1} × ${y.toFixed(4)}\n${a1}x = ${c1 - b1 * y}\nx = ${(c1 - b1 * y).toFixed(4)} / ${a1}\nx = ${x.toFixed(4)}`
  });
  
  // Final solution
  steps.push({
    explanation: 'Solution found',
    equations: `x = ${x.toFixed(4)}\ny = ${y.toFixed(4)}`,
    graphData: {
      equations: system.equations.map(eq => formatEquation(eq, system.variables)),
      point: { x, y }
    }
  });
  
  return {
    steps,
    result: `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`
  };
}

/**
 * Solve using the substitution method
 */
function solveBySubstitution(system: ParsedSystem): Solution {
  const steps: Step[] = [];
  
  // Start with a description of the system
  const initialSystem = formatSystem(system);
  steps.push({
    explanation: 'Starting linear system',
    equations: initialSystem,
    graphData: {
      equations: system.equations.map(eq => formatEquation(eq, system.variables)),
      point: null
    }
  });
  
  const [eq1, eq2] = system.equations;
  
  // Get coefficients and constants
  const a1 = eq1.leftCoefficients[system.variables[0]] || 0;
  const b1 = eq1.leftCoefficients[system.variables[1]] || 0;
  const c1 = eq1.rightConstant;
  
  const a2 = eq2.leftCoefficients[system.variables[0]] || 0;
  const b2 = eq2.leftCoefficients[system.variables[1]] || 0; 
  const c2 = eq2.rightConstant;
  
  // Check determinant to see if system has a unique solution
  const determinant = a1 * b2 - a2 * b1;
  
  if (determinant === 0) {
    // Check if system has no solution or infinitely many solutions
    if (a1 / a2 !== b1 / b2 || a1 / a2 !== c1 / c2) {
      steps.push({
        explanation: 'The system has no solutions (inconsistent)',
        equations: 'No solution exists'
      });
      return { steps, result: null };
    } else {
      steps.push({
        explanation: 'The system has infinitely many solutions (dependent)',
        equations: 'Infinitely many solutions'
      });
      return { steps, result: 'Infinitely many solutions' };
    }
  }
  
  // Choose equation with simpler coefficients for x to solve for x in terms of y
  const solveFromFirst = Math.abs(a1) <= Math.abs(a2);
  
  let xCoef, yCoef, constant;
  if (solveFromFirst) {
    xCoef = a1;
    yCoef = b1;
    constant = c1;
  } else {
    xCoef = a2;
    yCoef = b2;
    constant = c2;
  }
  
  // Express x in terms of y
  const xTerm = xCoef === 1 ? 'x' : `${xCoef}x`;
  const yTerm = yCoef === 0 ? '' : yCoef === 1 ? 'y' : `${yCoef}y`;
  const ySign = yCoef >= 0 ? ' + ' : ' - ';
  
  const isolateStep = yCoef === 0 
    ? `${xTerm} = ${constant}`
    : `${xTerm}${ySign}${Math.abs(yCoef)}y = ${constant}`;
  
  const xInTermsOfY = yCoef === 0
    ? `x = ${constant / xCoef}`
    : `x = (${constant} ${yCoef >= 0 ? '-' : '+'} ${Math.abs(yCoef)}y) / ${xCoef}`;
  
  const simplifiedXInTermsOfY = yCoef === 0
    ? `x = ${constant / xCoef}`
    : `x = ${constant / xCoef} ${yCoef >= 0 ? '-' : '+'} ${Math.abs(yCoef) / Math.abs(xCoef)}y`;
  
  steps.push({
    explanation: 'Express x in terms of y',
    equations: `${isolateStep}\n${xInTermsOfY}\n${simplifiedXInTermsOfY}`
  });
  
  // Substitute into the other equation
  const otherEq = solveFromFirst ? eq2 : eq1;
  const otherA = otherEq.leftCoefficients[system.variables[0]] || 0;
  const otherB = otherEq.leftCoefficients[system.variables[1]] || 0;
  const otherC = otherEq.rightConstant;
  
  const substitutedEq = `${otherA} × (${constant / xCoef} ${yCoef >= 0 ? '-' : '+'} ${Math.abs(yCoef) / Math.abs(xCoef)}y) + ${otherB}y = ${otherC}`;
  
  steps.push({
    explanation: 'Substitute into the other equation',
    equations: substitutedEq
  });
  
  // Expand the substitution
  const expandedEq = `${otherA * constant / xCoef} ${yCoef >= 0 ? '-' : '+'} ${otherA * Math.abs(yCoef) / Math.abs(xCoef)}y + ${otherB}y = ${otherC}`;
  
  steps.push({
    explanation: 'Expand the substitution',
    equations: expandedEq
  });
  
  // Collect y terms
  const substitutedYCoef = -(otherA * Math.abs(yCoef) * (yCoef >= 0 ? 1 : -1) / Math.abs(xCoef)) + otherB;
  const substitutedConstant = otherA * constant / xCoef;
  
  const collectedEq = `${substitutedConstant} ${substitutedYCoef >= 0 ? '+' : ''} ${substitutedYCoef}y = ${otherC}`;
  const isolatedYEq = `${substitutedYCoef}y = ${otherC} - ${substitutedConstant}`;
  
  steps.push({
    explanation: 'Collect y terms',
    equations: `${collectedEq}\n${isolatedYEq}`
  });
  
  // Solve for y
  const y = (otherC - substitutedConstant) / substitutedYCoef;
  
  steps.push({
    explanation: 'Solve for y',
    equations: `y = (${otherC} - ${substitutedConstant}) / ${substitutedYCoef}\ny = ${y.toFixed(4)}`
  });
  
  // Back-substitute to find x
  const x = constant / xCoef - (yCoef / xCoef) * y;
  
  steps.push({
    explanation: 'Back-substitute to find x',
    equations: `x = ${constant / xCoef} ${yCoef >= 0 ? '-' : '+'} ${Math.abs(yCoef) / Math.abs(xCoef)} × ${y.toFixed(4)}\nx = ${x.toFixed(4)}`
  });
  
  // Final solution
  steps.push({
    explanation: 'Solution found',
    equations: `x = ${x.toFixed(4)}\ny = ${y.toFixed(4)}`,
    graphData: {
      equations: system.equations.map(eq => formatEquation(eq, system.variables)),
      point: { x, y }
    }
  });
  
  return {
    steps,
    result: `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`
  };
}

/**
 * Solve using matrix method (Cramer's rule)
 */
function solveByMatrices(system: ParsedSystem): Solution {
  const steps: Step[] = [];
  
  // Start with a description of the system
  const initialSystem = formatSystem(system);
  steps.push({
    explanation: 'Starting linear system',
    equations: initialSystem,
    graphData: {
      equations: system.equations.map(eq => formatEquation(eq, system.variables)),
      point: null
    }
  });
  
  const [eq1, eq2] = system.equations;
  
  // Get coefficients and constants
  const a1 = eq1.leftCoefficients[system.variables[0]] || 0;
  const b1 = eq1.leftCoefficients[system.variables[1]] || 0;
  const c1 = eq1.rightConstant;
  
  const a2 = eq2.leftCoefficients[system.variables[0]] || 0;
  const b2 = eq2.leftCoefficients[system.variables[1]] || 0; 
  const c2 = eq2.rightConstant;
  
  // Write the system in matrix form
  const matrixA = `| ${a1} ${b1} |\n| ${a2} ${b2} |`;
  const matrixB = `| ${c1} |\n| ${c2} |`;
  const matrixForm = `A = ${matrixA}\nB = ${matrixB}\nA ⋅ X = B`;
  
  steps.push({
    explanation: 'Write the system in matrix form',
    equations: matrixForm
  });
  
  // Calculate determinant
  const detA = a1 * b2 - a2 * b1;
  
  steps.push({
    explanation: 'Calculate determinant of coefficient matrix',
    equations: `det(A) = ${a1} × ${b2} - ${a2} × ${b1} = ${detA}`
  });
  
  // Check if determinant is zero
  if (detA === 0) {
    // Check if system has no solution or infinitely many solutions
    if (a1 / a2 !== b1 / b2 || a1 / a2 !== c1 / c2) {
      steps.push({
        explanation: 'The system has no solutions (inconsistent)',
        equations: 'No solution exists'
      });
      return { steps, result: null };
    } else {
      steps.push({
        explanation: 'The system has infinitely many solutions (dependent)',
        equations: 'Infinitely many solutions'
      });
      return { steps, result: 'Infinitely many solutions' };
    }
  }
  
  // Calculate determinants for x and y using Cramer's rule
  const detX = `| ${c1} ${b1} |\n| ${c2} ${b2} |`;
  const valDetX = c1 * b2 - c2 * b1;
  
  steps.push({
    explanation: "Calculate determinant for x using Cramer's rule",
    equations: `det(A_x) = ${detX} = ${c1} × ${b2} - ${c2} × ${b1} = ${valDetX}`
  });
  
  const detY = `| ${a1} ${c1} |\n| ${a2} ${c2} |`;
  const valDetY = a1 * c2 - a2 * c1;
  
  steps.push({
    explanation: "Calculate determinant for y using Cramer's rule",
    equations: `det(A_y) = ${detY} = ${a1} × ${c2} - ${a2} × ${c1} = ${valDetY}`
  });
  
  // Calculate x and y values
  const x = valDetX / detA;
  const y = valDetY / detA;
  
  steps.push({
    explanation: "Apply Cramer's rule to find x and y",
    equations: `x = det(A_x) / det(A) = ${valDetX} / ${detA} = ${x.toFixed(4)}\ny = det(A_y) / det(A) = ${valDetY} / ${detA} = ${y.toFixed(4)}`
  });
  
  // Final solution
  steps.push({
    explanation: 'Solution found',
    equations: `x = ${x.toFixed(4)}\ny = ${y.toFixed(4)}`,
    graphData: {
      equations: system.equations.map(eq => formatEquation(eq, system.variables)),
      point: { x, y }
    }
  });
  
  return {
    steps,
    result: `x = ${x.toFixed(4)}, y = ${y.toFixed(4)}`
  };
}

/**
 * Find greatest common divisor of two numbers
 */
function findGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  
  return a;
}

/**
 * Find least common multiple of two numbers
 */
function findLCM(a: number, b: number): number {
  return (Math.abs(a) * Math.abs(b)) / findGCD(a, b);
} 