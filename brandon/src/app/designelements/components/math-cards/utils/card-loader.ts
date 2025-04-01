import path from 'path';

// Define card metadata statically instead of reading from filesystem
export type CardMetadata = {
    id: string;
    title: string;
    description: string;
    color: string;
    icon: string;
    category: string;
    enabled: boolean;
    lastUpdated: string;
}

// Static list of available cards
export const availableCards: CardMetadata[] = [
    {
        id: 'collatz',
        title: 'Collatz Conjecture',
        description: 'The Mathematical Pinball',
        color: 'from-red-900 to-orange-700',
        icon: '3n+1',
        category: 'General',
        enabled: true,
        lastUpdated: new Date().toISOString().split('T')[0]
    },
    {
        id: 'riemann',
        title: 'Riemann Hypothesis',
        description: 'The Music of Primes',
        color: 'from-purple-900 to-indigo-700',
        icon: 'ζ(s)',
        category: 'General',
        enabled: true,
        lastUpdated: new Date().toISOString().split('T')[0]
    },
    {
        id: 'p-adic',
        title: 'P-adic Numbers',
        description: 'Space-Folding Numbers',
        color: 'from-teal-900 to-green-700',
        icon: '|·|p',
        category: 'General',
        enabled: true,
        lastUpdated: new Date().toISOString().split('T')[0]
    }
];

// Function to get card by ID
export function getCardById(id: string): CardMetadata | undefined {
    return availableCards.find(card => card.id === id);
}

// Get all available cards
export function getAllCards(): CardMetadata[] {
    return availableCards;
}
