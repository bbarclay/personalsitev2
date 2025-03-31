export interface Term {
    coefficient: number;
    exponent: number;
}

export class Polynomial {
    terms: Term[];

    constructor(terms: Term[] = []) {
        this.terms = terms.sort((a, b) => b.exponent - a.exponent);
    }

    // Basic polynomial operations can be implemented here
    // ...
}

export type PolynomialOperation =
    | 'addition'
    | 'subtraction'
    | 'multiplication'
    | 'division'
    | 'derivative'
    | 'integral'
    | 'factor'
    | 'simplify';
