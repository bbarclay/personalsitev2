#!/usr/bin/env python3
"""
Structural Invariant Primality Test

This module implements the Structural Invariant Primality Test which determines
primality based on a key property of the multiplicative group structure.

Theorem: A positive integer n > 1 is prime if and only if its Galois structure
invariant equals φ(n-1)/(n-1), where φ is Euler's totient function.

For a prime p, this invariant measures the proportion of elements in (Z/pZ)*
that have order exactly p-1.
"""

import math
import time
from fractions import Fraction
from typing import Tuple, List, Dict, Optional


def gcd(a: int, b: int) -> int:
    """Calculate the greatest common divisor of a and b."""
    while b:
        a, b = b, a % b
    return a


def totient(n: int) -> int:
    """
    Calculate Euler's totient function φ(n).

    This function counts the number of integers from 1 to n that are
    relatively prime to n.
    """
    if n <= 0:
        return 0
    if n == 1:
        return 1

    result = n  # Initialize result as n

    # Find prime factors and apply the formula
    p = 2
    while p * p <= n:
        if n % p == 0:
            # p is a prime factor
            while n % p == 0:
                n //= p  # Divide n by p
            result -= result // p  # Apply φ(n) = n * (1 - 1/p)
        p += 1

    # If n > 1, then n is a prime factor
    if n > 1:
        result -= result // n

    return result


def multiplicative_order(a: int, n: int) -> int:
    """
    Calculate the multiplicative order of a modulo n.

    The multiplicative order is the smallest positive integer k
    such that a^k ≡ 1 (mod n).

    Returns 0 if a and n are not coprime.
    """
    if gcd(a, n) != 1:
        return 0  # Not in the multiplicative group

    k = 1
    current = a % n

    while current != 1:
        current = (current * a) % n
        k += 1
        # Safety check to prevent infinite loop
        if k > n:
            return 0

    return k


def compute_structural_invariant(n: int, verbose: bool = False) -> float:
    """
    Compute the structural invariant for number n.

    For a prime p, this equals φ(p-1)/(p-1).
    For a composite n, this equals 0 (as no element has order n-1).

    Args:
        n: The number to test
        verbose: Whether to print detailed information

    Returns:
        The structural invariant value
    """
    if n <= 1:
        return 0.0

    if verbose:
        print(f"Computing structural invariant for {n}...")
        print(f"Analyzing multiplicative group (Z/{n}Z)*...")

    # Identify elements in the multiplicative group (Z/nZ)*
    group = []
    for i in range(1, n):
        if gcd(i, n) == 1:
            group.append(i)

    group_size = len(group)

    if verbose:
        print(f"Multiplicative group has {group_size} elements")

    # Check if any element has order n-1
    max_order = 0
    max_order_elements = []

    for a in group:
        order = multiplicative_order(a, n)
        if order == n - 1:
            max_order_elements.append(a)
        max_order = max(max_order, order)

    if verbose:
        print(f"Maximum order found: {max_order}")
        print(f"Elements with maximum order {n-1}: {max_order_elements}")

    # Calculate the structural invariant
    if max_order == n - 1:
        # If elements of order n-1 exist, return φ(n-1)/(n-1)
        phi_n_minus_1 = totient(n - 1)
        expected = phi_n_minus_1 / (n - 1)

        # Verify the count matches φ(n-1)
        if verbose and len(max_order_elements) != phi_n_minus_1:
            print(
                f"Warning: Found {len(max_order_elements)} elements with order {n-1}, "
                f"but φ({n-1}) = {phi_n_minus_1}"
            )

        return expected
    else:
        # If no element has order n-1, return 0
        return 0.0


def is_prime_structural(
    n: int, verbose: bool = False
) -> Tuple[bool, float, float, float]:
    """
    Test if a number is prime using the Structural Invariant test.

    Args:
        n: The number to test
        verbose: Whether to print detailed information

    Returns:
        A tuple containing:
        - Whether n is prime
        - The calculated structural invariant
        - The expected value (φ(n-1)/(n-1))
        - The time taken in seconds
    """
    if n <= 1:
        return False, 0.0, 0.0, 0.0

    if n == 2:
        return True, 1.0, 1.0, 0.0

    start_time = time.time()

    # Compute the structural invariant
    invariant = compute_structural_invariant(n, verbose)

    # Calculate expected value for comparison
    phi_n_minus_1 = totient(n - 1)
    expected = phi_n_minus_1 / (n - 1)

    # For primality test, invariant should be non-zero (equal to expected)
    is_prime = invariant > 0.0

    end_time = time.time()

    if verbose:
        print(f"Number: {n}")
        print(f"Structural invariant: {invariant:.6f}")
        print(f"Expected value φ({n-1})/({n-1}): {expected:.6f}")
        print(f"Is prime: {is_prime}")

    return is_prime, invariant, expected, end_time - start_time


def is_prime_standard(n: int) -> bool:
    """Standard primality test for comparison."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False

    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6

    return True


def analyze_invariant_distribution(start: int, end: int) -> Dict:
    """
    Analyze the distribution of structural invariant values for a range of numbers.

    Returns a dictionary with statistics and frequency information.
    """
    primes = []
    composites = []
    prime_invariants = []
    composite_invariants = []

    for n in range(start, end + 1):
        is_prime, invariant, expected, _ = is_prime_structural(n)

        if is_prime_standard(n):
            primes.append(n)
            prime_invariants.append(invariant)
        else:
            composites.append(n)
            composite_invariants.append(invariant)

    # Convert invariants to fractions where possible for clearer pattern recognition
    def to_fraction(decimal):
        try:
            f = Fraction(decimal).limit_denominator(100)
            return f"{f.numerator}/{f.denominator}"
        except:
            return f"{decimal:.6f}"

    prime_fractions = [to_fraction(inv) for inv in prime_invariants]

    # Count frequency of each fraction
    fraction_counts = {}
    for f in prime_fractions:
        fraction_counts[f] = fraction_counts.get(f, 0) + 1

    # Sort by frequency
    sorted_fractions = sorted(fraction_counts.items(), key=lambda x: x[1], reverse=True)

    return {
        "primes_count": len(primes),
        "composites_count": len(composites),
        "prime_invariants_mean": (
            sum(prime_invariants) / len(prime_invariants) if prime_invariants else 0
        ),
        "composite_invariants_mean": (
            sum(composite_invariants) / len(composite_invariants)
            if composite_invariants
            else 0
        ),
        "most_common_fractions": sorted_fractions[:10],
    }


def print_detailed_analysis(n: int) -> None:
    """Print a detailed analysis of a specific number."""
    is_prime, invariant, expected, time_taken = is_prime_structural(n, verbose=True)

    print("\nDetailed Analysis:")
    print(f"Number: {n}")
    print(f"Is prime (structural test): {is_prime}")
    print(f"Is prime (standard test): {is_prime_standard(n)}")
    print(f"Structural invariant: {invariant:.10f}")
    print(f"Expected value φ({n-1})/({n-1}): {expected:.10f}")

    if is_prime:
        # For primes, show the factorization of p-1 to explain the invariant value
        factors = prime_factorization(n - 1)
        fact_str = " × ".join(
            [f"{p}^{e}" if e > 1 else f"{p}" for p, e in factors.items()]
        )
        print(f"Factorization of {n-1}: {fact_str}")

        # Estimate the decimal equivalent of the fraction
        try:
            f = Fraction(invariant).limit_denominator(100)
            print(f"Approximate fraction: {f.numerator}/{f.denominator}")
        except:
            pass

    print(f"Time taken: {time_taken:.6f} seconds")


def prime_factorization(n: int) -> Dict[int, int]:
    """Return the prime factorization of n as a dictionary {prime: exponent}."""
    factors = {}

    # Handle 2 separately
    while n % 2 == 0:
        factors[2] = factors.get(2, 0) + 1
        n //= 2

    # Check odd numbers
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors[i] = factors.get(i, 0) + 1
            n //= i
        i += 2

    # If n is a prime greater than 2
    if n > 2:
        factors[n] = factors.get(n, 0) + 1

    return factors


def test_number_range(start: int, end: int) -> None:
    """Test a range of numbers and verify the structural invariant test's accuracy."""
    print(f"Testing numbers from {start} to {end}:")

    correct = 0
    incorrect = []

    for n in range(start, end + 1):
        is_prime_struct, _, _, _ = is_prime_structural(n)
        is_prime_std = is_prime_standard(n)

        if is_prime_struct == is_prime_std:
            correct += 1
        else:
            incorrect.append(n)

    print(f"Accuracy: {correct/(end-start+1)*100:.2f}%")

    if incorrect:
        print(f"Incorrect classifications: {incorrect}")
        print("Detailed analysis of first incorrect number:")
        print_detailed_analysis(incorrect[0])


if __name__ == "__main__":
    # Test individual numbers
    test_numbers = [
        2,
        3,
        5,
        7,
        11,
        13,
        17,
        19,
        23,
        4,
        6,
        8,
        9,
        10,
        12,
        15,
        561,
        1105,
        1729,
    ]  # Include Carmichael numbers

    print("=== Testing individual numbers ===")
    for n in test_numbers:
        is_prime, invariant, expected, _ = is_prime_structural(n)
        actual_prime = is_prime_standard(n)
        match = "✓" if is_prime == actual_prime else "✗"

        print(
            f"Number: {n:4d}, Prime: {is_prime}, Invariant: {invariant:.6f}, Expected: {expected:.6f} {match}"
        )

    # Test a range of numbers
    print("\n=== Testing number range ===")
    test_number_range(2, 100)

    # Analyze invariant distribution
    print("\n=== Analyzing invariant distribution ===")
    analysis = analyze_invariant_distribution(2, 200)

    print(f"Primes count: {analysis['primes_count']}")
    print(f"Composites count: {analysis['composites_count']}")
    print(f"Average invariant for primes: {analysis['prime_invariants_mean']:.6f}")
    print(
        f"Average invariant for composites: {analysis['composite_invariants_mean']:.6f}"
    )

    print("\nMost common invariant fractions among primes:")
    for fraction, count in analysis["most_common_fractions"]:
        percent = count / analysis["primes_count"] * 100
        print(f"{fraction}: {count} occurrences ({percent:.2f}%)")

    # Detailed analysis of specific numbers
    print("\n=== Detailed analysis of selected numbers ===")
    print_detailed_analysis(7)  # Prime with invariant 1/3
    print_detailed_analysis(4)  # Composite
    print_detailed_analysis(561)  # Carmichael number
