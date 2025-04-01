// Utility functions for complex number operations

export type ComplexNumber = {
    real: number;
    imaginary: number;
};

// Create a complex number
export const complex = (real: number, imaginary: number): ComplexNumber => {
    return { real, imaginary };
};

// Add two complex numbers
export const add = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
    return {
        real: a.real + b.real,
        imaginary: a.imaginary + b.imaginary
    };
};

// Subtract two complex numbers
export const subtract = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
    return {
        real: a.real - b.real,
        imaginary: a.imaginary - b.imaginary
    };
};

// Multiply two complex numbers
export const multiply = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
    return {
        real: a.real * b.real - a.imaginary * b.imaginary,
        imaginary: a.real * b.imaginary + a.imaginary * b.real
    };
};

// Divide two complex numbers
export const divide = (a: ComplexNumber, b: ComplexNumber): ComplexNumber => {
    const denominator = b.real * b.real + b.imaginary * b.imaginary;
    return {
        real: (a.real * b.real + a.imaginary * b.imaginary) / denominator,
        imaginary: (a.imaginary * b.real - a.real * b.imaginary) / denominator
    };
};

// Calculate the absolute value (modulus) of a complex number
export const abs = (z: ComplexNumber): number => {
    return Math.sqrt(z.real * z.real + z.imaginary * z.imaginary);
};

// Calculate the argument (phase) of a complex number in radians
export const arg = (z: ComplexNumber): number => {
    return Math.atan2(z.imaginary, z.real);
};

// Calculate e^z for a complex number z
export const exp = (z: ComplexNumber): ComplexNumber => {
    const factor = Math.exp(z.real);
    return {
        real: factor * Math.cos(z.imaginary),
        imaginary: factor * Math.sin(z.imaginary)
    };
};

// Calculate the natural logarithm of a complex number
export const log = (z: ComplexNumber): ComplexNumber => {
    return {
        real: Math.log(abs(z)),
        imaginary: arg(z)
    };
};

// Calculate z^n for a complex number z and a real exponent n
export const pow = (z: ComplexNumber, n: number): ComplexNumber => {
    const r = Math.pow(abs(z), n);
    const theta = n * arg(z);
    return {
        real: r * Math.cos(theta),
        imaginary: r * Math.sin(theta)
    };
};

// Format a complex number as a string
export const toString = (z: ComplexNumber, precision: number = 4): string => {
    const realPart = z.real.toFixed(precision);
    const imagPart = Math.abs(z.imaginary).toFixed(precision);
    const sign = z.imaginary >= 0 ? '+' : '-';

    return `${realPart} ${sign} ${imagPart}i`;
};
