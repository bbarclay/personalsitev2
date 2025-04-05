#!/usr/bin/env python3
"""
Structural Invariant Primality Test Implementation

This module implements the Structural Invariant Primality Theorem which establishes that:
A positive integer n > 1 is prime if and only if the multiplicative group (Z/nZ)*
contains elements of order n-1, and the count of such elements equals φ(n-1).

The structural invariant I(n) is defined as:
- I(n) = φ(n-1)/(n-1) if (Z/nZ)* contains elements of order n-1
- I(n) = 0 otherwise

This theorem provides a group-theoretic characterization of primality.
"""

import math
import time
from fractions import Fraction
from typing import Tuple, List, Dict, Set, Optional
import matplotlib.pyplot as plt
import numpy as np


def gcd(a: int, b: int) -> int:
    """Calculate the greatest common divisor of a and b."""
    while b:
        a, b = b, a % b
    return a


def lcm(a: int, b: int) -> int:
    """Calculate the least common multiple of a and b."""
    return a * b // gcd(a, b)


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


def find_elements_of_order(n: int, target_order: int) -> List[int]:
    """
    Find all elements in (Z/nZ)* that have the specified order.

    Args:
        n: The modulus
        target_order: The order to search for

    Returns:
        List of elements with the specified order
    """
    elements = []

    for a in range(1, n):
        if gcd(a, n) == 1:  # Check if a is in (Z/nZ)*
            order = multiplicative_order(a, n)
            if order == target_order:
                elements.append(a)

    return elements


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
        if max_order == n - 1:
            print(f"Elements with order {n-1}: {max_order_elements}")

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

    # Prepare result statistics
    results = {
        "primes_count": len(primes),
        "composites_count": len(composites),
        "prime_avg_invariant": (
            sum(prime_invariants) / len(prime_invariants) if prime_invariants else 0
        ),
        "composite_avg_invariant": (
            sum(composite_invariants) / len(composite_invariants)
            if composite_invariants
            else 0
        ),
        "most_common_fractions": sorted_fractions[:10],
        "prime_distribution": fraction_counts,
    }

    return results


def test_carmichael_numbers() -> Dict:
    """Test the structural invariant on known Carmichael numbers."""
    # First few Carmichael numbers
    carmichael_numbers = [561, 1105, 1729, 2465, 2821, 6601, 8911]
    results = {}

    for n in carmichael_numbers:
        is_prime, invariant, expected, time_taken = is_prime_structural(n)
        max_order = max(
            multiplicative_order(a, n) for a in range(1, n) if gcd(a, n) == 1
        )

        results[n] = {
            "is_prime_structural": is_prime,
            "is_prime_standard": is_prime_standard(n),
            "invariant": invariant,
            "expected": expected,
            "max_order": max_order,
            "n-1": n - 1,
            "factors": get_factors(n),
        }

    return results


def get_factors(n: int) -> List[int]:
    """Get the prime factorization of n."""
    factors = []
    d = 2

    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1

    if n > 1:
        factors.append(n)

    return factors


def visualize_invariant_distribution(start: int, end: int, output_file: str = None):
    """
    Visualize the distribution of structural invariant values.

    Args:
        start: Start of the range
        end: End of the range
        output_file: Optional file to save the plot
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

    # Create a figure with two subplots
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

    # Plot histogram of prime invariants
    ax1.hist(prime_invariants, bins=30, alpha=0.7, color="blue")
    ax1.set_title("Distribution of Invariants for Primes")
    ax1.set_xlabel("Invariant Value")
    ax1.set_ylabel("Frequency")

    # Plot scatter of invariants vs number
    ax2.scatter(primes, prime_invariants, s=10, alpha=0.7, color="blue", label="Primes")
    ax2.scatter(
        composites,
        composite_invariants,
        s=10,
        alpha=0.7,
        color="red",
        label="Composites",
    )
    ax2.set_title("Invariants vs. Number")
    ax2.set_xlabel("Number")
    ax2.set_ylabel("Invariant Value")
    ax2.legend()

    plt.tight_layout()

    if output_file:
        plt.savefig(output_file, dpi=300)
    else:
        plt.show()


def verify_theorem(start: int, end: int) -> Dict:
    """
    Verify the Structural Invariant Primality Theorem over a range of numbers.

    Returns statistics about the verification.
    """
    total_count = 0
    prime_count = 0
    composite_count = 0
    correct_count = 0
    incorrect_count = 0

    for n in range(start, end + 1):
        total_count += 1

        # Standard primality test
        standard_result = is_prime_standard(n)

        # Structural invariant test
        structural_result, invariant, expected, _ = is_prime_structural(n)

        if standard_result:
            prime_count += 1
        else:
            composite_count += 1

        if structural_result == standard_result:
            correct_count += 1
        else:
            incorrect_count += 1
            print(
                f"Discrepancy for n={n}: standard={standard_result}, structural={structural_result}"
            )

    accuracy = correct_count / total_count * 100

    results = {
        "range": (start, end),
        "total_tested": total_count,
        "primes_found": prime_count,
        "composites_found": composite_count,
        "correct_classifications": correct_count,
        "incorrect_classifications": incorrect_count,
        "accuracy": accuracy,
    }

    return results


def analyze_special_cases() -> Dict:
    """Analyze special classes of numbers to verify the theorem."""
    results = {}

    # Fermat numbers
    fermat_numbers = [3, 5, 17, 257, 65537]  # F0 to F4
    fermat_results = {}

    for n in fermat_numbers:
        is_prime, invariant, expected, _ = is_prime_structural(n)
        fermat_results[n] = {
            "is_prime_structural": is_prime,
            "is_prime_standard": is_prime_standard(n),
            "invariant": invariant,
        }

    results["fermat_numbers"] = fermat_results

    # Perfect powers
    perfect_powers = [4, 8, 9, 16, 25, 27, 32, 36, 49, 64, 81, 100]
    power_results = {}

    for n in perfect_powers:
        is_prime, invariant, expected, _ = is_prime_structural(n)
        power_results[n] = {
            "is_prime_structural": is_prime,
            "is_prime_standard": is_prime_standard(n),
            "invariant": invariant,
        }

    results["perfect_powers"] = power_results

    # Near-powers (a^b ± 1)
    near_powers = [3, 7, 15, 17, 24, 26, 31, 63, 127, 255, 257, 1023, 2047, 4095, 4097]
    near_power_results = {}

    for n in near_powers:
        is_prime, invariant, expected, _ = is_prime_structural(n)
        near_power_results[n] = {
            "is_prime_structural": is_prime,
            "is_prime_standard": is_prime_standard(n),
            "invariant": invariant,
        }

    results["near_powers"] = near_power_results

    return results


def main():
    """Main function to demonstrate the Structural Invariant Primality Test."""
    print("Structural Invariant Primality Test")
    print("-----------------------------------")

    # Basic tests
    test_numbers = [2, 3, 4, 5, 7, 11, 13, 15, 17, 19, 21, 23, 561]

    print("\nTesting individual numbers:")
    for n in test_numbers:
        is_prime, invariant, expected, time_taken = is_prime_structural(
            n, verbose=False
        )
        print(
            f"n = {n}: {'Prime' if is_prime else 'Composite'}, Invariant = {invariant:.6f}, Time = {time_taken:.6f}s"
        )

    # Verify the theorem over a range
    print("\nVerifying theorem over range 2-100:")
    verification = verify_theorem(2, 100)
    print(f"Tested {verification['total_tested']} numbers")
    print(
        f"Found {verification['primes_found']} primes and {verification['composites_found']} composites"
    )
    print(f"Accuracy: {verification['accuracy']:.2f}%")

    # Analyze invariant distribution
    print("\nAnalyzing invariant distribution for numbers 2-100:")
    analysis = analyze_invariant_distribution(2, 100)
    print(
        f"Primes: {analysis['primes_count']}, Composites: {analysis['composites_count']}"
    )
    print(f"Average invariant for primes: {analysis['prime_avg_invariant']:.6f}")
    print(f"Most common invariant fractions among primes:")
    for fraction, count in analysis["most_common_fractions"]:
        print(f"  {fraction}: {count} occurrences")

    # Test Carmichael numbers
    print("\nTesting Carmichael numbers:")
    carmichael_results = test_carmichael_numbers()
    for n, results in carmichael_results.items():
        print(f"Carmichael number {n}:")
        print(f"  Structural invariant: {results['invariant']:.6f}")
        print(
            f"  Maximum order found: {results['max_order']} (vs. n-1 = {results['n-1']})"
        )
        print(f"  Factorization: {results['factors']}")
        print(
            f"  Correctly classified as composite: {'Yes' if not results['is_prime_structural'] else 'No'}"
        )

    # Analyze special cases
    print("\nAnalyzing special cases:")
    special_cases = analyze_special_cases()

    print("  Fermat numbers (F0 to F4):")
    for n, results in special_cases["fermat_numbers"].items():
        print(
            f"    {n}: {'Prime' if results['is_prime_structural'] else 'Composite'}, Invariant = {results['invariant']:.6f}"
        )

    print("  Perfect powers:")
    for n, results in special_cases["perfect_powers"].items():
        print(
            f"    {n}: {'Prime' if results['is_prime_structural'] else 'Composite'}, Invariant = {results['invariant']:.6f}"
        )

    # Detailed analysis of select numbers
    print("\nDetailed analysis of selected numbers:")
    for n in [7, 4, 561]:  # prime, small composite, Carmichael number
        is_prime, invariant, expected, _ = is_prime_structural(n, verbose=True)
        print(
            f"\nStructural test result for {n}: {'Prime' if is_prime else 'Composite'}"
        )
        print(
            f"Standard test result for {n}: {'Prime' if is_prime_standard(n) else 'Composite'}"
        )
        print("-" * 40)


if __name__ == "__main__":
    main()
