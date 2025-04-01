export interface Term {
    coefficient: number;
    exponent: number;
}

export interface ComplexNumber {
    real: number;
    imaginary: number;
}

export class Polynomial {
    terms: Term[];

    constructor(terms: Term[] = []) {
        this.terms = this.normalize(terms);
    }

    private normalize(terms: Term[]): Term[] {
        // Combine like terms and sort by descending exponent
        const termMap = new Map<number, number>();
        terms.forEach(term => {
            const current = termMap.get(term.exponent) || 0;
            termMap.set(term.exponent, current + term.coefficient);
        });

        return Array.from(termMap.entries())
            .filter(([_, coeff]) => coeff !== 0)
            .map(([exp, coeff]) => ({ coefficient: coeff, exponent: exp }))
            .sort((a, b) => b.exponent - a.exponent);
    }

    toString(): string {
        if (this.terms.length === 0) return "0";
        
        return this.terms.map((term, i) => {
            let str = '';
            if (i > 0 && term.coefficient > 0) str += '+';
            if (term.coefficient === -1 && term.exponent > 0) str += '-';
            else if (term.coefficient !== 1 || term.exponent === 0) str += term.coefficient;
            if (term.exponent > 0) str += 'x';
            if (term.exponent > 1) str += `^${term.exponent}`;
            return str;
        }).join('');
    }

    evaluate(x: number): number {
        return this.terms.reduce((sum, term) => 
            sum + term.coefficient * Math.pow(x, term.exponent), 0);
    }

    degree(): number {
        return this.terms.length > 0 ? this.terms[0].exponent : 0;
    }
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
