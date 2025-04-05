#!/usr/bin/env python3
"""
Pattern Discovery for Floor Prime Discordance

This script focuses on discovering new patterns in the Floor Prime Discordance theory
by conducting targeted experiments to find correlations between structural invariants
and other number-theoretic properties. The goal is to potentially uncover new mathematical
connections that could lead to deeper insights or applications.
"""

import sys
import os
import time
import math
import random
import multiprocessing
from functools import lru_cache
import numpy as np
import matplotlib.pyplot as plt
from collections import defaultdict
import sympy
from tqdm import tqdm
import pandas as pd
import seaborn as sns

# Add parent directory to Python path for imports
parent_dir = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
sys.path.append(parent_dir)

# Import core functionality from existing files
try:
    from implementation_reference import (
        euler_totient,
        compute_structural_invariant,
        is_prime_structural,
    )
except ImportError:
    print(
        "Warning: Could not import from implementation_reference.py. Using fallback implementations."
    )

    @lru_cache(maxsize=1024)
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    @lru_cache(maxsize=1024)
    def euler_totient(n):
        if n <= 0:
            return 0
        if n == 1:
            return 1
        result = n
        p = 2
        while p * p <= n:
            if n % p == 0:
                while n % p == 0:
                    n //= p
                result -= result // p
            p += 1
        if n > 1:
            result -= result // n
        return result

    def compute_structural_invariant(n):
        if n <= 1:
            return 0.0
        if n == 2:
            return 1.0
        # Quick compositeness check
        for i in range(2, min(int(math.sqrt(n)) + 1, 1000)):
            if n % i == 0:
                return 0.0
        # For primes, the invariant equals φ(n-1)/(n-1)
        return euler_totient(n - 1) / (n - 1)

    def is_prime_structural(n, verbose=False):
        if n <= 1:
            return False, 0.0, 0.0, True
        if n == 2:
            return True, 1.0, 1.0, True

        invariant = compute_structural_invariant(n)
        expected = euler_totient(n - 1) / (n - 1)
        match = abs(invariant - expected) < 1e-9
        is_prime = match and invariant > 0

        return is_prime, invariant, expected, match


# Utility functions


def prime_factors(n):
    """Get the prime factorization of a number as a list of (prime, exponent) tuples."""
    if n <= 1:
        return []

    factors = []
    p = 2
    while p * p <= n:
        if n % p == 0:
            exp = 0
            while n % p == 0:
                n //= p
                exp += 1
            factors.append((p, exp))
        p += 1

    if n > 1:
        factors.append((n, 1))

    return factors


def is_prime(n):
    """Simple primality test."""
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


def mobius(n):
    """Calculate the Möbius function μ(n)."""
    if n == 1:
        return 1

    # Count the number of prime factors
    factors = prime_factors(n)

    # If any prime factor appears more than once, μ(n) = 0
    for _, exp in factors:
        if exp > 1:
            return 0

    # Otherwise, μ(n) = (-1)^k where k is the number of prime factors
    return (-1) ** len(factors)


def liouville(n):
    """Calculate the Liouville lambda function λ(n)."""
    factors = prime_factors(n)
    total_exponents = sum(exp for _, exp in factors)
    return (-1) ** total_exponents


def jacobi_symbol(a, n):
    """Calculate the Jacobi symbol (a/n)."""
    if n <= 0 or n % 2 == 0:
        raise ValueError("n must be a positive odd number")

    a %= n
    result = 1

    while a != 0:
        while a % 2 == 0:
            a //= 2
            if n % 8 in (3, 5):
                result = -result

        a, n = n, a
        if a % 4 == 3 and n % 4 == 3:
            result = -result
        a %= n

    return result if n == 1 else 0


# Pattern Discovery Experiments


def invariant_value_distribution(max_n=1000):
    """
    Analyze the distribution of structural invariant values for prime numbers.
    Look for clustering, common values, and mathematical patterns.
    """
    print(f"Analyzing invariant value distribution up to {max_n}...")

    results = []
    invariant_values = defaultdict(list)

    # Find all primes up to max_n
    primes = [n for n in range(2, max_n + 1) if is_prime(n)]

    for p in tqdm(primes, desc="Processing primes"):
        _, inv, _, _ = is_prime_structural(p)

        # Round to 6 decimal places for grouping
        rounded_inv = round(inv, 6)
        invariant_values[rounded_inv].append(p)

        # Calculate prime factorization of p-1
        factors = prime_factors(p - 1)

        # Calculate number theoretic functions
        totient_p_minus_1 = euler_totient(p - 1)
        mobius_p_minus_1 = mobius(p - 1)
        liouville_p_minus_1 = liouville(p - 1)

        # Calculate "prime density" around p
        primes_within_100 = sum(
            1 for n in range(max(2, p - 100), p + 101) if is_prime(n)
        )

        results.append(
            {
                "prime": p,
                "invariant": inv,
                "rounded_inv": rounded_inv,
                "factors_p_minus_1": factors,
                "num_distinct_factors": len(factors),
                "totient_p_minus_1": totient_p_minus_1,
                "mobius_p_minus_1": mobius_p_minus_1,
                "liouville_p_minus_1": liouville_p_minus_1,
                "primes_within_100": primes_within_100,
            }
        )

    # Find common invariant values
    common_values = {
        val: primes for val, primes in invariant_values.items() if len(primes) > 1
    }
    sorted_common = sorted(common_values.items(), key=lambda x: len(x[1]), reverse=True)

    print("\nMost common invariant values:")
    for val, primes in sorted_common[:10]:
        print(f"  {val:.6f}: {len(primes)} occurrences - Example primes: {primes[:5]}")

    # Create visualization
    plt.figure(figsize=(12, 8))

    # Plot histogram of invariant values
    plt.subplot(2, 1, 1)
    inv_values = [r["invariant"] for r in results]
    plt.hist(inv_values, bins=50, alpha=0.7)
    plt.xlabel("Structural Invariant Value")
    plt.ylabel("Frequency")
    plt.title("Distribution of Structural Invariant Values for Primes")
    plt.grid(True, alpha=0.3)

    # Plot scatter of invariant vs. prime
    plt.subplot(2, 1, 2)
    plt.scatter(
        [r["prime"] for r in results],
        [r["invariant"] for r in results],
        c=[r["num_distinct_factors"] for r in results],
        cmap="viridis",
        alpha=0.7,
        s=20,
    )
    plt.colorbar(label="Number of distinct prime factors in p-1")
    plt.xlabel("Prime Number")
    plt.ylabel("Structural Invariant Value")
    plt.title("Structural Invariant vs. Prime Number")
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig("invariant_distribution_pattern.png")

    # Analyze correlation with other number-theoretic functions
    df = pd.DataFrame(results)
    corr_columns = [
        "invariant",
        "num_distinct_factors",
        "primes_within_100",
        "mobius_p_minus_1",
        "liouville_p_minus_1",
    ]
    correlation = df[corr_columns].corr()

    plt.figure(figsize=(10, 8))
    sns.heatmap(correlation, annot=True, cmap="coolwarm")
    plt.title("Correlation Between Invariant and Other Number-Theoretic Properties")
    plt.tight_layout()
    plt.savefig("invariant_correlations_pattern.png")

    return results, common_values


def digit_pattern_analysis(max_n=1000):
    """
    Analyze patterns in the decimal representation of invariant values.
    Look for recurring digit patterns, periodicity, or interesting mathematical properties.
    """
    print(f"Analyzing digit patterns in invariant values up to {max_n}...")

    results = []

    # Find all primes up to max_n
    primes = [n for n in range(2, max_n + 1) if is_prime(n)]

    for p in tqdm(primes, desc="Processing primes"):
        _, inv, _, _ = is_prime_structural(p)

        # Convert to string for digit analysis
        inv_str = f"{inv:.12f}"

        # Extract decimal portion
        decimal_part = inv_str.split(".")[1]

        # Analyze digit frequency
        digit_counts = {str(d): decimal_part.count(str(d)) for d in range(10)}

        # Check for repeating patterns
        repeating_pattern = None
        for pattern_length in range(1, min(6, len(decimal_part) // 2)):
            pattern = decimal_part[:pattern_length]
            if decimal_part[pattern_length : 2 * pattern_length] == pattern:
                repeating_pattern = pattern
                break

        results.append(
            {
                "prime": p,
                "invariant": inv,
                "inv_str": inv_str,
                "decimal_part": decimal_part,
                "digit_counts": digit_counts,
                "repeating_pattern": repeating_pattern,
            }
        )

    # Analyze results
    digit_distributions = {d: [] for d in range(10)}
    for r in results:
        for d in range(10):
            digit_distributions[d].append(r["digit_counts"][str(d)])

    # Plot digit frequency distributions
    plt.figure(figsize=(14, 8))

    # Boxplot of digit distributions
    plt.subplot(2, 2, 1)
    data = [digit_distributions[d] for d in range(10)]
    plt.boxplot(data, labels=range(10))
    plt.xlabel("Digit")
    plt.ylabel("Frequency in Decimal Expansion")
    plt.title("Distribution of Digit Frequencies in Invariant Values")
    plt.grid(True, alpha=0.3)

    # Scatter plot of invariant vs. most frequent digit
    plt.subplot(2, 2, 2)
    most_freq_digits = [
        max(range(10), key=lambda d: r["digit_counts"][str(d)]) for r in results
    ]
    plt.scatter(
        [r["prime"] for r in results],
        [r["invariant"] for r in results],
        c=most_freq_digits,
        cmap="tab10",
        alpha=0.7,
        s=30,
    )
    plt.colorbar(label="Most frequent digit in decimal expansion")
    plt.xlabel("Prime Number")
    plt.ylabel("Structural Invariant Value")
    plt.title("Invariant Values Colored by Most Frequent Digit")
    plt.grid(True, alpha=0.3)

    # Histogram of repeating pattern lengths
    plt.subplot(2, 2, 3)
    pattern_lengths = [
        len(r["repeating_pattern"]) if r["repeating_pattern"] else 0 for r in results
    ]
    plt.hist(pattern_lengths, bins=range(max(pattern_lengths) + 2), alpha=0.7)
    plt.xlabel("Length of Repeating Pattern")
    plt.ylabel("Frequency")
    plt.title("Distribution of Repeating Pattern Lengths")
    plt.grid(True, alpha=0.3)

    # Scatter plot of invariant vs. pattern length
    plt.subplot(2, 2, 4)
    plt.scatter([r["prime"] for r in results], pattern_lengths, alpha=0.7, s=20)
    plt.xlabel("Prime Number")
    plt.ylabel("Repeating Pattern Length")
    plt.title("Repeating Pattern Length vs. Prime Number")
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig("invariant_digit_patterns.png")

    return results


def fractional_representation_analysis(max_n=500):
    """
    Attempt to represent invariant values as simple fractions to find mathematical patterns.
    This might reveal deeper connections to number theory.
    """
    print(f"Analyzing fractional representations of invariants up to {max_n}...")

    from fractions import Fraction

    results = []

    # Find all primes up to max_n
    primes = [n for n in range(2, max_n + 1) if is_prime(n)]

    for p in tqdm(primes, desc="Processing primes"):
        _, inv, _, _ = is_prime_structural(p)

        # Convert to fraction with limited denominator
        fraction = Fraction(inv).limit_denominator(1000)

        # Calculate error between original value and fraction
        error = abs(inv - float(fraction))

        # Calculate proportion of totient values
        actual_totient_ratio = euler_totient(p - 1) / (p - 1)

        results.append(
            {
                "prime": p,
                "invariant": inv,
                "fraction": fraction,
                "numerator": fraction.numerator,
                "denominator": fraction.denominator,
                "error": error,
                "actual_totient_ratio": actual_totient_ratio,
            }
        )

    # Group by common fractions
    fraction_groups = defaultdict(list)
    for r in results:
        fraction_groups[str(r["fraction"])].append(r["prime"])

    # Print most common fractions
    print("\nMost common fractional representations:")
    for fraction, primes in sorted(
        fraction_groups.items(), key=lambda x: len(x[1]), reverse=True
    )[:10]:
        print(f"  {fraction}: {len(primes)} occurrences - Example primes: {primes[:5]}")

    # Calculate properties of primes with same fractions
    fraction_properties = []
    for fraction, primes in fraction_groups.items():
        if len(primes) > 1:
            # Get prime factorizations of p-1 for each prime in the group
            factorizations = [prime_factors(p - 1) for p in primes]

            # Find common factors across all p-1 values
            if factorizations:
                first_factors = {p for p, _ in factorizations[0]}
                common_factors = first_factors.intersection(
                    *[{p for p, _ in factors} for factors in factorizations[1:]]
                )
            else:
                common_factors = set()

            fraction_properties.append(
                {
                    "fraction": fraction,
                    "primes": primes,
                    "count": len(primes),
                    "common_factors": common_factors,
                    "avg_prime": sum(primes) / len(primes),
                }
            )

    # Plot results
    plt.figure(figsize=(14, 10))

    # Plot distribution of denominators
    plt.subplot(2, 2, 1)
    denominators = [r["denominator"] for r in results]
    plt.hist(denominators, bins=range(1, 21), alpha=0.7)
    plt.xlabel("Denominator")
    plt.ylabel("Frequency")
    plt.title("Distribution of Fraction Denominators")
    plt.grid(True, alpha=0.3)

    # Plot scatter of denominators vs. prime
    plt.subplot(2, 2, 2)
    plt.scatter(
        [r["prime"] for r in results],
        [r["denominator"] for r in results],
        alpha=0.7,
        s=20,
    )
    plt.xlabel("Prime Number")
    plt.ylabel("Fraction Denominator")
    plt.title("Fraction Denominator vs. Prime Number")
    plt.grid(True, alpha=0.3)

    # Plot approximation error
    plt.subplot(2, 2, 3)
    plt.scatter(
        [r["prime"] for r in results], [r["error"] for r in results], alpha=0.7, s=20
    )
    plt.xlabel("Prime Number")
    plt.ylabel("Approximation Error")
    plt.title("Fraction Approximation Error vs. Prime Number")
    plt.yscale("log")
    plt.grid(True, alpha=0.3)

    # Plot invariants vs. actual totient ratio
    plt.subplot(2, 2, 4)
    plt.scatter(
        [r["invariant"] for r in results],
        [r["actual_totient_ratio"] for r in results],
        alpha=0.7,
        s=20,
    )
    plt.plot([0, 1], [0, 1], "r--")  # Diagonal line for reference
    plt.xlabel("Computed Invariant")
    plt.ylabel("Actual φ(p-1)/(p-1)")
    plt.title("Computed Invariant vs. Actual Totient Ratio")
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig("invariant_fractions_analysis.png")

    return results, fraction_groups, fraction_properties


def consecutive_prime_pattern_analysis(max_n=1000):
    """
    Analyze patterns in consecutive primes and their invariants.
    Look for relationships, sequences, or unexpected correlations.
    """
    print(f"Analyzing patterns in consecutive primes up to {max_n}...")

    # Find all primes up to max_n
    primes = [n for n in range(2, max_n + 1) if is_prime(n)]

    # Calculate invariants for all primes
    invariants = []
    for p in tqdm(primes, desc="Calculating invariants"):
        _, inv, _, _ = is_prime_structural(p)
        invariants.append(inv)

    # Calculate differences between consecutive primes and their invariants
    prime_gaps = [primes[i + 1] - primes[i] for i in range(len(primes) - 1)]
    invariant_diffs = [
        invariants[i + 1] - invariants[i] for i in range(len(invariants) - 1)
    ]
    invariant_ratios = [
        invariants[i + 1] / invariants[i] if invariants[i] != 0 else float("inf")
        for i in range(len(invariants) - 1)
    ]

    # Combine data
    results = []
    for i in range(len(primes) - 1):
        results.append(
            {
                "prime1": primes[i],
                "prime2": primes[i + 1],
                "inv1": invariants[i],
                "inv2": invariants[i + 1],
                "prime_gap": prime_gaps[i],
                "inv_diff": invariant_diffs[i],
                "inv_ratio": invariant_ratios[i],
            }
        )

    # Look for patterns in the gap sequences
    gap_sequences = defaultdict(list)
    for i in range(len(results) - 2):
        seq = (
            results[i]["prime_gap"],
            results[i + 1]["prime_gap"],
            results[i + 2]["prime_gap"],
        )
        gap_sequences[seq].append(i)

    # Find the most common gap patterns
    common_gaps = sorted(gap_sequences.items(), key=lambda x: len(x[1]), reverse=True)

    print("\nMost common prime gap patterns (three consecutive gaps):")
    for seq, positions in common_gaps[:5]:
        print(f"  Gaps {seq}: {len(positions)} occurrences")

        # Check if there's a pattern in the invariant differences for these sequences
        inv_diffs = [
            (
                results[pos]["inv_diff"],
                results[pos + 1]["inv_diff"],
                results[pos + 2]["inv_diff"],
            )
            for pos in positions
        ]

        # Simplistic pattern detection: check mean and standard deviation
        if inv_diffs:
            mean_diffs = np.mean(inv_diffs, axis=0)
            std_diffs = np.std(inv_diffs, axis=0)
            print(f"    Mean invariant diffs: {tuple(mean_diffs)}")
            print(f"    Std dev: {tuple(std_diffs)}")

    # Plot results
    plt.figure(figsize=(14, 10))

    # Plot prime gaps
    plt.subplot(2, 2, 1)
    plt.scatter(
        [r["prime1"] for r in results],
        [r["prime_gap"] for r in results],
        alpha=0.7,
        s=20,
    )
    plt.xlabel("Prime")
    plt.ylabel("Gap to Next Prime")
    plt.title("Prime Gaps vs. Prime Number")
    plt.grid(True, alpha=0.3)

    # Plot invariant differences vs. prime
    plt.subplot(2, 2, 2)
    plt.scatter(
        [r["prime1"] for r in results],
        [r["inv_diff"] for r in results],
        alpha=0.7,
        s=20,
    )
    plt.xlabel("Prime")
    plt.ylabel("Difference to Next Invariant")
    plt.title("Invariant Differences vs. Prime Number")
    plt.grid(True, alpha=0.3)

    # Plot invariant ratios vs. prime
    plt.subplot(2, 2, 3)
    valid_ratios = [
        (r["prime1"], r["inv_ratio"]) for r in results if not math.isinf(r["inv_ratio"])
    ]
    if valid_ratios:
        plt.scatter(
            [p for p, _ in valid_ratios], [r for _, r in valid_ratios], alpha=0.7, s=20
        )
        plt.xlabel("Prime")
        plt.ylabel("Ratio to Next Invariant")
        plt.title("Invariant Ratios vs. Prime Number")
        plt.grid(True, alpha=0.3)

    # Plot prime gaps vs. invariant differences
    plt.subplot(2, 2, 4)
    plt.scatter(
        [r["prime_gap"] for r in results],
        [r["inv_diff"] for r in results],
        alpha=0.7,
        s=20,
    )
    plt.xlabel("Prime Gap")
    plt.ylabel("Invariant Difference")
    plt.title("Invariant Differences vs. Prime Gaps")
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig("consecutive_prime_patterns.png")

    return results, common_gaps


def modular_structural_invariants(modulus=7, max_n=1000):
    """
    Analyze how structural invariants are distributed modulo m.
    This might reveal patterns related to congruence classes.
    """
    print(f"Analyzing invariants modulo {modulus} up to {max_n}...")

    # Find all primes up to max_n
    primes = [n for n in range(2, max_n + 1) if is_prime(n)]

    # Group primes by remainder modulo the given modulus
    remainders = defaultdict(list)
    for p in primes:
        remainders[p % modulus].append(p)

    # Calculate invariants for each group
    results = []
    group_stats = {}

    for remainder, group_primes in remainders.items():
        group_invariants = []

        for p in tqdm(group_primes, desc=f"Processing remainder {remainder}"):
            _, inv, _, _ = is_prime_structural(p)

            results.append({"prime": p, "invariant": inv, "remainder": remainder})

            group_invariants.append(inv)

        # Calculate statistics for this group
        if group_invariants:
            group_stats[remainder] = {
                "count": len(group_invariants),
                "mean": np.mean(group_invariants),
                "median": np.median(group_invariants),
                "std_dev": np.std(group_invariants),
                "min": min(group_invariants),
                "max": max(group_invariants),
            }

    # Print statistics for each group
    print("\nStatistics by remainder modulo", modulus)
    for remainder, stats in sorted(group_stats.items()):
        print(f"  Remainder {remainder}:")
        print(f"    Count: {stats['count']}")
        print(f"    Mean invariant: {stats['mean']:.6f}")
        print(f"    Median invariant: {stats['median']:.6f}")
        print(f"    Std Dev: {stats['std_dev']:.6f}")
        print(f"    Range: [{stats['min']:.6f}, {stats['max']:.6f}]")

    # Plot results
    plt.figure(figsize=(14, 10))

    # Plot scatter by remainder class
    plt.subplot(2, 2, 1)
    for remainder in range(modulus):
        group_data = [
            (r["prime"], r["invariant"]) for r in results if r["remainder"] == remainder
        ]
        if group_data:
            plt.scatter(
                [p for p, _ in group_data],
                [inv for _, inv in group_data],
                label=f"≡ {remainder} (mod {modulus})",
                alpha=0.7,
            )

    plt.xlabel("Prime Number")
    plt.ylabel("Structural Invariant")
    plt.title(f"Invariants by Remainder Modulo {modulus}")
    plt.legend()
    plt.grid(True, alpha=0.3)

    # Plot boxplot of invariants by remainder
    plt.subplot(2, 2, 2)
    boxplot_data = [
        [r["invariant"] for r in results if r["remainder"] == remainder]
        for remainder in range(modulus)
    ]
    plt.boxplot(boxplot_data, labels=range(modulus))
    plt.xlabel(f"Remainder Modulo {modulus}")
    plt.ylabel("Structural Invariant")
    plt.title(f"Distribution of Invariants by Remainder Modulo {modulus}")
    plt.grid(True, alpha=0.3)

    # Plot count of primes in each remainder class
    plt.subplot(2, 2, 3)
    counts = [len(remainders[r]) for r in range(modulus)]
    plt.bar(range(modulus), counts)
    plt.xlabel(f"Remainder Modulo {modulus}")
    plt.ylabel("Count of Primes")
    plt.title(f"Prime Distribution by Remainder Modulo {modulus}")
    plt.grid(True, alpha=0.3)

    # Plot mean invariant by remainder
    plt.subplot(2, 2, 4)
    means = [group_stats.get(r, {}).get("mean", 0) for r in range(modulus)]
    plt.bar(range(modulus), means)
    plt.xlabel(f"Remainder Modulo {modulus}")
    plt.ylabel("Mean Invariant Value")
    plt.title(f"Mean Invariant by Remainder Modulo {modulus}")
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig(f"invariants_modulo_{modulus}.png")

    return results, group_stats


def main():
    """Run all pattern discovery experiments."""
    print("Starting Floor Prime Discovery Pattern Analysis")
    print("==============================================")

    # Create results directory if it doesn't exist
    if not os.path.exists("results"):
        os.makedirs("results")

    # Set lower numbers for initial tests, these can be increased for more thorough analysis
    invariant_max = 500
    digit_pattern_max = 300
    fractional_max = 200
    consecutive_max = 300
    modular_max = 500

    print("\n1. Analyzing Invariant Value Distribution...")
    distribution_results, common_values = invariant_value_distribution(
        max_n=invariant_max
    )

    print("\n2. Analyzing Digit Patterns in Invariants...")
    digit_results = digit_pattern_analysis(max_n=digit_pattern_max)

    print("\n3. Analyzing Fractional Representations...")
    fraction_results, fraction_groups, fraction_properties = (
        fractional_representation_analysis(max_n=fractional_max)
    )

    print("\n4. Analyzing Consecutive Prime Patterns...")
    consecutive_results, common_gaps = consecutive_prime_pattern_analysis(
        max_n=consecutive_max
    )

    print("\n5. Analyzing Modular Structural Invariants...")
    modular_results_mod7, group_stats_mod7 = modular_structural_invariants(
        modulus=7, max_n=modular_max
    )
    modular_results_mod10, group_stats_mod10 = modular_structural_invariants(
        modulus=10, max_n=modular_max
    )

    print(
        "\nAll pattern discovery experiments completed. Results saved to the results directory."
    )
    print("\nSummary of Key Findings:")
    print("----------------------")

    # Summarize common invariant values
    print(f"\nFound {len(common_values)} invariant values shared by multiple primes")

    # Summarize fraction patterns
    most_common_fraction = max(
        fraction_groups.items(), key=lambda x: len(x[1]), default=("None", [])
    )
    print(
        f"Most common fraction representation: {most_common_fraction[0]} (appears in {len(most_common_fraction[1])} primes)"
    )

    # Summarize consecutive prime patterns
    if common_gaps:
        most_common_gap = common_gaps[0]
        print(
            f"Most common consecutive gap pattern: {most_common_gap[0]} (appears {len(most_common_gap[1])} times)"
        )

    # Summarize modular findings
    print(f"\nInvariant distribution by remainder modulo 7:")
    for remainder, stats in sorted(group_stats_mod7.items()):
        print(
            f"  Remainder {remainder}: Mean={stats['mean']:.6f}, StdDev={stats['std_dev']:.6f}"
        )

    print(
        "\nPattern discovery complete. Check the generated PNG files for visualizations."
    )


if __name__ == "__main__":
    main()
