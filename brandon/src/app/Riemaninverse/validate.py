#!/usr/bin/env python3
"""
Möbius-Invariant Identity Validation

This script provides comprehensive validation of the theorem:
    I(p) = Σ μ(d)/d for d|p-1

where:
- I(p) is the structural invariant of prime p
- μ(d) is the Möbius function
- The sum is taken over all divisors d of p-1

The script performs:
1. Validation across different prime ranges
2. Special case testing (Mersenne, Fermat, etc.)
3. Statistical analysis of errors
4. High-precision validation for selected primes

Author: Research Team
Date: April 2023
"""

import numpy as np
import matplotlib.pyplot as plt
import mpmath as mp
from fractions import Fraction
import sympy as sp
from sympy.ntheory import mobius
import os
import sys
from collections import defaultdict
import time
import math
import pandas as pd
from concurrent.futures import ProcessPoolExecutor
import random

# Set mpmath precision for high-precision calculations
mp.mp.dps = 100

# Ensure the parent directory is in the Python path for importing from our modules
script_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(os.path.dirname(script_dir))
sys.path.append(
    os.path.join(
        parent_dir, "brainstorms", "floor_prime_discovery", "brainstorm", "code"
    )
)

# Try to import our primality functions, with a fallback implementation
try:
    from optimized_primality_test import (
        is_prime_optimized,
        prime_factors,
        compute_structural_invariant,
    )
except ImportError:
    print(
        "Could not import from optimized_primality_test, using fallback implementation."
    )

    def is_prime(n):
        """Check if a number is prime."""
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

    def prime_factors(n):
        """Get the prime factorization of a number."""
        factors = []
        d = 2
        while d * d <= n:
            while n % d == 0:
                if not factors or factors[-1][0] != d:
                    factors.append([d, 1])
                else:
                    factors[-1][1] += 1
                n //= d
            d += 1
        if n > 1:
            factors.append([n, 1])
        return [(p, e) for p, e in factors]

    def is_prime_optimized(n):
        """Simple wrapper for the is_prime function to match the expected interface."""
        result = is_prime(n)
        # Return a tuple to match the expected interface
        return result, 0.0, {"pattern": "fallback implementation"}

    def compute_structural_invariant(p):
        """Compute the structural invariant for a prime number."""
        if p <= 1:
            return 0.0

        if p == 2:
            return 1.0

        # Get factorization of p-1
        factors = prime_factors(p - 1)

        # Compute the product formula
        invariant = 1.0
        for q, _ in factors:
            invariant *= 1 - 1 / q

        return invariant


def get_divisors(n):
    """
    Get all divisors of n.

    Args:
        n: Positive integer

    Returns:
        List of divisors
    """
    divisors = []
    for i in range(1, int(math.sqrt(n)) + 1):
        if n % i == 0:
            divisors.append(i)
            if i != n // i:
                divisors.append(n // i)
    return sorted(divisors)


def generate_primes(n):
    """
    Generate all primes up to n using the Sieve of Eratosthenes.

    Args:
        n: Upper limit

    Returns:
        List of primes <= n
    """
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False

    p = 2
    while p * p <= n:
        if sieve[p]:
            for i in range(p * p, n + 1, p):
                sieve[i] = False
        p += 1

    return [p for p in range(2, n + 1) if sieve[p]]


def compute_mobius_weighted_sum(p):
    """
    Compute the weighted Möbius sum for a prime p.

    This is the sum Σ μ(d)/d for d|(p-1).

    Args:
        p: Prime number

    Returns:
        The weighted Möbius sum
    """
    if p <= 1:
        return 0.0

    divisors = get_divisors(p - 1)
    return sum(mobius(d) / d for d in divisors)


def compute_mobius_weighted_sum_high_precision(p):
    """
    Compute the weighted Möbius sum with higher precision for a prime p.

    Args:
        p: Prime number

    Returns:
        The weighted Möbius sum with high precision
    """
    if p <= 1:
        return mp.mpf(0)

    divisors = get_divisors(p - 1)
    result = mp.mpf(0)

    for d in divisors:
        result += mp.mpf(mobius(d)) / mp.mpf(d)

    return result


def compute_structural_invariant_high_precision(p):
    """
    Compute the structural invariant with higher precision for a prime p.

    Args:
        p: Prime number

    Returns:
        The structural invariant with high precision
    """
    if p <= 1:
        return mp.mpf(0)

    if p == 2:
        return mp.mpf(1)

    factors = prime_factors(p - 1)

    invariant = mp.mpf(1)
    for q, _ in factors:
        invariant *= 1 - 1 / mp.mpf(q)

    return invariant


def get_mersenne_primes(max_exponent=50):
    """
    Get Mersenne primes (primes of form 2^p - 1) up to max_exponent.

    Args:
        max_exponent: Maximum exponent to check

    Returns:
        List of Mersenne primes
    """
    mersenne_primes = []

    # Known Mersenne prime exponents up to 50
    mersenne_exponents = [2, 3, 5, 7, 13, 17, 19, 31, 61, 89, 107, 127]

    for exp in mersenne_exponents:
        if exp <= max_exponent:
            p = 2**exp - 1
            mersenne_primes.append(p)

    return mersenne_primes


def get_fermat_primes(max_n=5):
    """
    Get Fermat primes (primes of form 2^(2^n) + 1) up to max_n.

    Args:
        max_n: Maximum n to check

    Returns:
        List of Fermat primes
    """
    # Known Fermat primes: F0 = 3, F1 = 5, F2 = 17, F3 = 257, F4 = 65537
    fermat_primes = []

    for n in range(max_n + 1):
        p = 2 ** (2**n) + 1
        if is_prime(p):
            fermat_primes.append(p)

    return fermat_primes


def validate_theorem(min_prime=3, max_prime=1000):
    """
    Validate the theorem for primes in the given range.

    Args:
        min_prime: Minimum prime to check
        max_prime: Maximum prime to check

    Returns:
        List of results
    """
    results = []

    for p in range(min_prime, max_prime + 1):
        if is_prime(p):
            # Calculate structural invariant using product formula
            invariant = compute_structural_invariant(p)

            # Calculate Möbius weighted sum
            mobius_sum = compute_mobius_weighted_sum(p)

            # Calculate error
            error = abs(invariant - mobius_sum)

            # Calculate invariant as fraction for better display
            frac = str(Fraction(invariant).limit_denominator(1000))

            results.append(
                {
                    "prime": p,
                    "invariant": invariant,
                    "invariant_fraction": frac,
                    "mobius_sum": mobius_sum,
                    "error": error,
                }
            )

    return results


def validate_special_primes():
    """
    Validate the theorem for special prime categories.

    Returns:
        Dictionary with results for each category
    """
    special_results = {
        "mersenne": [],
        "fermat": [],
        "twin_primes": [],
        "safe_primes": [],
    }

    # Mersenne primes
    mersenne_primes = get_mersenne_primes()
    for p in mersenne_primes:
        invariant = compute_structural_invariant(p)
        mobius_sum = compute_mobius_weighted_sum(p)
        error = abs(invariant - mobius_sum)

        special_results["mersenne"].append(
            {
                "prime": p,
                "invariant": invariant,
                "invariant_fraction": str(Fraction(invariant).limit_denominator(1000)),
                "mobius_sum": mobius_sum,
                "error": error,
            }
        )

    # Fermat primes
    fermat_primes = get_fermat_primes()
    for p in fermat_primes:
        invariant = compute_structural_invariant(p)
        mobius_sum = compute_mobius_weighted_sum(p)
        error = abs(invariant - mobius_sum)

        special_results["fermat"].append(
            {
                "prime": p,
                "invariant": invariant,
                "invariant_fraction": str(Fraction(invariant).limit_denominator(1000)),
                "mobius_sum": mobius_sum,
                "error": error,
            }
        )

    # Twin primes (p and p+2 are both prime)
    primes = generate_primes(10000)
    twin_primes = []

    for i in range(len(primes) - 1):
        if primes[i + 1] - primes[i] == 2:
            twin_primes.append(primes[i])
            twin_primes.append(primes[i + 1])

    twin_primes = list(set(twin_primes))[:20]  # Keep a manageable number

    for p in twin_primes:
        invariant = compute_structural_invariant(p)
        mobius_sum = compute_mobius_weighted_sum(p)
        error = abs(invariant - mobius_sum)

        special_results["twin_primes"].append(
            {
                "prime": p,
                "invariant": invariant,
                "invariant_fraction": str(Fraction(invariant).limit_denominator(1000)),
                "mobius_sum": mobius_sum,
                "error": error,
            }
        )

    # Safe primes (p = 2q + 1 where q is prime)
    primes_set = set(primes)
    safe_primes = [p for p in primes if p > 5 and (p - 1) // 2 in primes_set][:20]

    for p in safe_primes:
        invariant = compute_structural_invariant(p)
        mobius_sum = compute_mobius_weighted_sum(p)
        error = abs(invariant - mobius_sum)

        special_results["safe_primes"].append(
            {
                "prime": p,
                "invariant": invariant,
                "invariant_fraction": str(Fraction(invariant).limit_denominator(1000)),
                "mobius_sum": mobius_sum,
                "error": error,
            }
        )

    return special_results


def validate_high_precision(sample_primes=None, num_samples=10, max_prime=10000):
    """
    Validate the theorem with high precision for sample primes.

    Args:
        sample_primes: List of specific primes to validate, or None for random sampling
        num_samples: Number of random samples to take if sample_primes is None
        max_prime: Maximum prime to consider for random sampling

    Returns:
        List of high-precision results
    """
    high_precision_results = []

    if sample_primes is None:
        # Generate or load primes for sampling
        all_primes = generate_primes(max_prime)

        # Ensure diversity by stratified sampling across the range
        strata = np.array_split(all_primes, min(10, len(all_primes)))
        sample_primes = []

        for stratum in strata:
            if len(stratum) > 0:
                samples = random.sample(
                    list(stratum), min(num_samples // 10 + 1, len(stratum))
                )
                sample_primes.extend(samples)

    for p in sample_primes:
        # Calculate with high precision
        invariant_hp = compute_structural_invariant_high_precision(p)
        mobius_sum_hp = compute_mobius_weighted_sum_high_precision(p)
        error_hp = abs(invariant_hp - mobius_sum_hp)

        # Convert to standard precision for comparison
        invariant_std = float(invariant_hp)
        mobius_sum_std = float(mobius_sum_hp)
        error_std = abs(invariant_std - mobius_sum_std)

        high_precision_results.append(
            {
                "prime": p,
                "invariant_hp": str(invariant_hp),
                "mobius_sum_hp": str(mobius_sum_hp),
                "error_hp": float(error_hp),
                "invariant_std": invariant_std,
                "mobius_sum_std": mobius_sum_std,
                "error_std": error_std,
                "precision_improvement": (
                    float(error_std) / float(error_hp)
                    if float(error_hp) > 0
                    else float("inf")
                ),
            }
        )

    return high_precision_results


def run_parallel_validation(ranges):
    """
    Run validation across multiple prime ranges in parallel.

    Args:
        ranges: List of (min_prime, max_prime) tuples

    Returns:
        Combined results dictionary
    """
    all_results = []

    with ProcessPoolExecutor() as executor:
        futures = [
            executor.submit(validate_theorem, min_p, max_p) for min_p, max_p in ranges
        ]

        for future in futures:
            all_results.extend(future.result())

    return all_results


def analyze_and_visualize_results(
    standard_results,
    special_results,
    high_precision_results,
    output_dir="./validation_results",
):
    """
    Analyze and visualize validation results.

    Args:
        standard_results: Results from standard validation
        special_results: Results from special prime validation
        high_precision_results: Results from high precision validation
        output_dir: Directory to save results and visualizations
    """
    os.makedirs(output_dir, exist_ok=True)

    # Create a DataFrame for standard results
    df_standard = pd.DataFrame(standard_results)

    # Summary statistics - ensure values are converted to native float
    errors = np.array([float(r["error"]) for r in standard_results], dtype=np.float64)
    avg_error = np.mean(errors)
    max_error = np.max(errors)
    min_error = np.min(errors)
    std_error = np.std(errors)

    # Save results to CSV
    df_standard.to_csv(
        os.path.join(output_dir, "standard_validation_results.csv"), index=False
    )

    # Generate summary report
    with open(os.path.join(output_dir, "validation_summary.txt"), "w") as f:
        f.write("Möbius-Invariant Identity Validation Summary\n")
        f.write("===========================================\n\n")

        f.write("Standard Validation:\n")
        f.write(f"  Total primes validated: {len(standard_results)}\n")
        f.write(f"  Average error: {avg_error:.6e}\n")
        f.write(f"  Maximum error: {max_error:.6e}\n")
        f.write(f"  Minimum error: {min_error:.6e}\n")
        f.write(f"  Standard deviation: {std_error:.6e}\n\n")

        f.write("Special Prime Validation:\n")
        for category, results in special_results.items():
            if results:
                cat_errors = [float(r["error"]) for r in results]
                cat_avg_error = sum(cat_errors) / len(cat_errors)
                cat_max_error = max(cat_errors)

                f.write(f"  {category.replace('_', ' ').title()}:\n")
                f.write(f"    Count: {len(results)}\n")
                f.write(f"    Average error: {cat_avg_error:.6e}\n")
                f.write(f"    Maximum error: {cat_max_error:.6e}\n")

        f.write("\nHigh Precision Validation:\n")
        if high_precision_results:
            hp_errors = [float(r["error_hp"]) for r in high_precision_results]
            hp_avg_error = sum(hp_errors) / len(hp_errors)
            hp_max_error = max(hp_errors)

            f.write(f"  Count: {len(high_precision_results)}\n")
            f.write(f"  Average error (high precision): {hp_avg_error:.6e}\n")
            f.write(f"  Maximum error (high precision): {hp_max_error:.6e}\n")

            avg_improvement = sum(
                r["precision_improvement"] for r in high_precision_results
            ) / len(high_precision_results)
            f.write(f"  Average precision improvement: {avg_improvement:.2f}x\n\n")

        f.write("CONCLUSION: ")
        if max_error < 1e-10:
            f.write(
                "VALIDATION PASSED. The Möbius-Invariant Identity is validated to within expected floating-point precision.\n"
            )
        else:
            f.write(
                "VALIDATION REQUIRES FURTHER INVESTIGATION. Errors exceed expected floating-point precision.\n"
            )

    # Create visualizations

    # 1. Error distribution
    plt.figure(figsize=(12, 8))
    plt.hist(np.log10(errors + 1e-20), bins=30, alpha=0.7)
    plt.xlabel("Log10(Error)")
    plt.ylabel("Frequency")
    plt.title("Distribution of Validation Errors (Log Scale)")
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig(
        os.path.join(output_dir, "error_distribution.png"), dpi=300, bbox_inches="tight"
    )
    plt.close()

    # 2. Error vs Prime Size
    plt.figure(figsize=(12, 8))
    plt.scatter(df_standard["prime"], errors, alpha=0.5)
    plt.xlabel("Prime")
    plt.ylabel("Error")
    plt.title("Validation Error vs Prime Size")
    plt.yscale("log")
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig(
        os.path.join(output_dir, "error_vs_prime.png"), dpi=300, bbox_inches="tight"
    )
    plt.close()

    # 3. Special primes comparison
    plt.figure(figsize=(12, 8))
    categories = []
    error_means = []
    error_stds = []

    for category, results in special_results.items():
        if results:
            categories.append(category.replace("_", " ").title())
            cat_errors = np.array(
                [float(r["error"]) for r in results], dtype=np.float64
            )
            error_means.append(np.mean(cat_errors))
            error_stds.append(np.std(cat_errors))

    x_pos = np.arange(len(categories))
    plt.bar(x_pos, error_means, yerr=error_stds, align="center", alpha=0.7, capsize=10)
    plt.xticks(x_pos, categories)
    plt.ylabel("Average Error")
    plt.title("Validation Error by Special Prime Category")
    plt.yscale("log")
    plt.grid(alpha=0.3)
    plt.tight_layout()
    plt.savefig(
        os.path.join(output_dir, "special_primes_comparison.png"),
        dpi=300,
        bbox_inches="tight",
    )
    plt.close()

    # 4. High precision vs standard precision
    if high_precision_results:
        plt.figure(figsize=(12, 8))

        primes = [r["prime"] for r in high_precision_results]
        std_errors = [float(r["error_std"]) for r in high_precision_results]
        hp_errors = [float(r["error_hp"]) for r in high_precision_results]

        x = np.arange(len(primes))
        width = 0.35

        plt.bar(x - width / 2, std_errors, width, label="Standard Precision")
        plt.bar(x + width / 2, hp_errors, width, label="High Precision")

        plt.xlabel("Prime Index")
        plt.ylabel("Error (log scale)")
        plt.title("Standard vs High Precision Validation")
        plt.xticks(x, [str(p) for p in primes], rotation=90)
        plt.yscale("log")
        plt.legend()
        plt.grid(alpha=0.3)
        plt.tight_layout()
        plt.savefig(
            os.path.join(output_dir, "precision_comparison.png"),
            dpi=300,
            bbox_inches="tight",
        )
        plt.close()


def main():
    """Main function to run the validation."""
    print("Möbius-Invariant Identity Validation")
    print("====================================")

    output_dir = os.path.join(script_dir, "validation_results")
    os.makedirs(output_dir, exist_ok=True)

    # Define validation ranges for parallel processing
    validation_ranges = [
        (3, 1000),
        (1001, 2000),
        (2001, 3000),
        (3001, 4000),
        (4001, 5000),
    ]

    print("\nRunning standard validation across multiple ranges...")
    standard_results = run_parallel_validation(validation_ranges)

    print("\nValidating special prime categories...")
    special_results = validate_special_primes()

    # Sample specific primes for high precision validation
    sample_primes = [3, 5, 7, 11, 13, 17, 19, 31, 61, 89, 107, 127, 257, 65537]
    print("\nRunning high precision validation...")
    high_precision_results = validate_high_precision(sample_primes)

    print("\nAnalyzing and visualizing results...")
    analyze_and_visualize_results(
        standard_results, special_results, high_precision_results, output_dir
    )

    # Calculate summary statistics for console output - ensure float conversion
    errors = [float(r["error"]) for r in standard_results]
    avg_error = sum(errors) / len(errors)
    max_error = max(errors)

    print(f"\nValidation complete for {len(standard_results)} primes")
    print(f"  Average error: {avg_error:.6e}")
    print(f"  Maximum error: {max_error:.6e}")

    if max_error < 1e-10:
        print("\nVALIDATION PASSED: Errors within expected floating-point precision")
    else:
        print(
            "\nVALIDATION REQUIRES FURTHER INVESTIGATION: Errors exceed expected floating-point precision"
        )

    print(f"\nResults and visualizations saved to {output_dir}")


if __name__ == "__main__":
    start_time = time.time()
    main()
    elapsed_time = time.time() - start_time
    print(f"\nExecution completed in {elapsed_time:.2f} seconds.")
