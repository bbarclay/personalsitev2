/**
 * A deterministic pseudo-random number generator to solve hydration issues
 * Uses a seeded approach to ensure server and client render the same values
 */

// Simple seeded random function based on a linear congruential generator
export function createSeededRandom(seed = 42) {
    let value = seed;

    return () => {
        value = (value * 9301 + 49297) % 233280;
        return value / 233280;
    };
}

// Create a shared instance for common use cases
export const seededRandom = createSeededRandom();

// Generate a random number within a range
export function randomInRange(min: number, max: number, randomFn = seededRandom) {
    return min + randomFn() * (max - min);
}

// For arrays or collections that need consistent randomization
export function shuffleArray<T>(array: T[], randomFn = seededRandom): T[] {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(randomFn() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Create deterministic IDs for keying elements
export function deterministicId(prefix: string, index: number): string {
    return `${prefix}-${index}`;
}
