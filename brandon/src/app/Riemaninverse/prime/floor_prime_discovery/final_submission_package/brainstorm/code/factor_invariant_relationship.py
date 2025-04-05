#!/usr/bin/env python3
"""
Factor-Invariant Relationship Analysis for Floor Prime Discovery

This script explores the deep relationship between prime factorization patterns of (p-1)
and the structural invariant values of primes. It focuses on understanding why certain
invariant values (like 1/3, 2/5, 1/2) appear frequently across different primes.
"""

import sys
import os
import math
import numpy as np
import matplotlib.pyplot as plt
from collections import defaultdict
from tqdm import tqdm
import pandas as pd
import seaborn as sns
from fractions import Fraction
from itertools import combinations
import sympy

# Add parent directory to Python path for imports
parent_dir = os.path.dirname(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
)
sys.path.append(parent_dir)

# Import core functions or use fallback
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

    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

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


def is_prime(n):
    """Simple primality test for small numbers."""
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


def factor_signature(factors):
    """Convert a list of prime factors to a readable signature."""
    if not factors:
        return "1"
    return " × ".join([f"{p}^{e}" if e > 1 else str(p) for p, e in factors])


def analyze_common_invariants(max_n=2000):
    """
    Analyze primes that share the same structural invariant value to
    identify common patterns in their (p-1) factorizations.
    """
    print(f"Analyzing common invariant values up to {max_n}...")

    # Find primes up to max_n
    primes = []
    for n in range(2, max_n + 1):
        if is_prime(n):
            primes.append(n)

    # Calculate invariants and factorize (p-1) for each prime
    results = []
    for p in tqdm(primes, desc="Processing primes"):
        _, inv, _, _ = is_prime_structural(p)

        # Calculate and store data
        factors_p_minus_1 = prime_factors(p - 1)

        # Convert to fraction with limited denominator for grouping
        fraction = Fraction(inv).limit_denominator(100)

        # Create a readable factor signature
        signature = factor_signature(factors_p_minus_1)

        results.append(
            {
                "prime": p,
                "invariant": inv,
                "fraction": fraction,
                "factors_p_minus_1": factors_p_minus_1,
                "signature": signature,
                "num_distinct_factors": len(factors_p_minus_1),
                "largest_factor": (
                    max([f for f, _ in factors_p_minus_1]) if factors_p_minus_1 else 1
                ),
                "smallest_factor": (
                    min([f for f, _ in factors_p_minus_1]) if factors_p_minus_1 else 1
                ),
                "totient_p_minus_1": euler_totient(p - 1),
            }
        )

    # Group results by invariant fraction
    grouped_by_fraction = defaultdict(list)
    for r in results:
        grouped_by_fraction[str(r["fraction"])].append(r)

    # Sort by popularity (number of primes with this invariant)
    sorted_fractions = sorted(
        grouped_by_fraction.items(), key=lambda x: len(x[1]), reverse=True
    )

    # Analyze factor patterns for common invariants
    invariant_patterns = []

    print("\nAnalyzing most common invariant values:")
    for fraction, group in sorted_fractions[:10]:
        print(f"\nInvariant value: {fraction} (appears in {len(group)} primes)")
        print(f"Example primes: {[r['prime'] for r in group[:5]]}")

        # Count and analyze factor signatures
        signature_counts = defaultdict(list)
        for r in group:
            signature_counts[r["signature"]].append(r["prime"])

        print("Factor signatures for (p-1):")
        for signature, primes in sorted(
            signature_counts.items(), key=lambda x: len(x[1]), reverse=True
        )[:5]:
            print(f"  {signature}: {len(primes)} primes - {primes[:3]}")

        # Look for common patterns in the factorizations
        factor_sets = [set(p for p, _ in r["factors_p_minus_1"]) for r in group]
        if factor_sets:
            common_factors = (
                set.intersection(*factor_sets)
                if len(factor_sets) > 1
                else factor_sets[0]
            )
            print(f"Common prime factors across all (p-1) values: {common_factors}")

        # Calculate average number of distinct factors
        avg_distinct_factors = np.mean([r["num_distinct_factors"] for r in group])
        print(f"Average number of distinct prime factors: {avg_distinct_factors:.2f}")

        invariant_patterns.append(
            {
                "fraction": fraction,
                "count": len(group),
                "primes": [r["prime"] for r in group],
                "signatures": signature_counts,
                "common_factors": (
                    common_factors if "common_factors" in locals() else set()
                ),
                "avg_distinct_factors": avg_distinct_factors,
            }
        )

    # Create theoretical formula for each common invariant
    print("\nDeriving theoretical formulas for common invariants:")
    for pattern in invariant_patterns[:5]:
        fraction = pattern["fraction"]
        common_factors = pattern["common_factors"]

        print(f"\nInvariant = {fraction}")

        # Try to explain invariant in terms of factor patterns
        if pattern["signatures"]:
            most_common_sig = max(
                pattern["signatures"].items(), key=lambda x: len(x[1])
            )
            print(f"Most common factor pattern: {most_common_sig[0]}")

            # Parse this signature to understand the pattern
            if "×" in most_common_sig[0]:
                print("This suggests a product structure in (p-1)")

                # For example, if p-1 = 2q where q is prime, the invariant is (1-1/2)(1-1/q)/(2q) = 1/2 * (q-1)/q = (q-1)/(2q)
                if "2 ×" in most_common_sig[0] and "^" not in most_common_sig[0]:
                    print("Pattern suggests p-1 = 2q where q is prime or semiprime")
                    print(
                        "This gives invariant = φ(2q)/(2q) = φ(2)φ(q)/(2q) = 1/2 * φ(q)/q"
                    )
            else:
                if "^" in most_common_sig[0]:
                    base, exp = most_common_sig[0].split("^")
                    print(f"Pattern suggests p-1 = {base}^{exp}")
                    print(
                        f"This gives invariant = φ({base}^{exp})/({base}^{exp}) = ({base}^{exp} - {base}^{int(exp)-1})/({base}^{exp})"
                    )
                else:
                    print(
                        f"Pattern suggests p-1 is a power or product of {most_common_sig[0]}"
                    )

        # Calculate theoretical structural invariants for specific factor patterns
        print("Theoretical invariant values for common factor patterns:")
        print("  For p-1 = 2q where q is prime: (q-1)/(2q) = 1/2 - 1/(2q)")
        print("  For p-1 = 3q where q is prime: (2q-2)/(3q) = 2/3 - 2/(3q)")
        print("  For p-1 = 4q where q is prime: (2q-2)/(4q) = 1/2 - 1/(2q)")
        print(
            "  For p-1 = q₁q₂ (product of distinct primes): ((q₁-1)(q₂-1))/(q₁q₂) = (1-1/q₁)(1-1/q₂)"
        )

    return results, invariant_patterns


def analyze_p_minus_one_structure(max_n=2000):
    """
    Analyze the relationship between the structure of (p-1) and
    the resulting structural invariant value.
    """
    print(f"\nAnalyzing (p-1) structures up to {max_n}...")

    # Common (p-1) structure patterns to test
    patterns = [
        {
            "name": "2q (q prime)",
            "test": lambda factors: len(factors) == 2 and factors[0] == (2, 1),
        },
        {
            "name": "3q (q prime)",
            "test": lambda factors: len(factors) == 2 and factors[0] == (3, 1),
        },
        {
            "name": "4q (q prime)",
            "test": lambda factors: len(factors) == 2
            and factors[0][0] == 2
            and factors[0][1] == 2,
        },
        {
            "name": "2ᵏ (power of 2)",
            "test": lambda factors: len(factors) == 1 and factors[0][0] == 2,
        },
        {
            "name": "q₁q₂ (product of two distinct primes)",
            "test": lambda factors: len(factors) == 2
            and all(e == 1 for _, e in factors),
        },
        {"name": "qᵏ (prime power)", "test": lambda factors: len(factors) == 1},
    ]

    # Find primes and categorize by (p-1) structure
    results = []
    pattern_groups = {pattern["name"]: [] for pattern in patterns}

    for n in tqdm(range(3, max_n + 1, 2), desc="Analyzing primes"):
        if is_prime(n):
            _, inv, _, _ = is_prime_structural(n)

            factors_p_minus_1 = prime_factors(n - 1)
            sig = factor_signature(factors_p_minus_1)

            # Determine which patterns match
            matching_patterns = []
            for pattern in patterns:
                if pattern["test"](factors_p_minus_1):
                    matching_patterns.append(pattern["name"])
                    pattern_groups[pattern["name"]].append((n, inv, factors_p_minus_1))

            results.append(
                {
                    "prime": n,
                    "invariant": inv,
                    "factors_p_minus_1": factors_p_minus_1,
                    "signature": sig,
                    "patterns": matching_patterns,
                }
            )

    # Analyze and print results for each pattern
    print("\nResults by (p-1) structure pattern:")

    for pattern_name, group in pattern_groups.items():
        if group:
            invariants = [inv for _, inv, _ in group]

            # Calculate statistics
            mean_inv = np.mean(invariants)
            median_inv = np.median(invariants)
            std_dev = np.std(invariants)

            print(f"\nPattern: {pattern_name}")
            print(f"  Count: {len(group)}")
            print(f"  Mean invariant: {mean_inv:.6f}")
            print(f"  Median invariant: {median_inv:.6f}")
            print(f"  Std Dev: {std_dev:.6f}")

            # For specific patterns, analyze theoretically
            if pattern_name == "2q (q prime)":
                print("  Theoretical formula: invariant = (q-1)/(2q) = 1/2 - 1/(2q)")
                print("  As q increases, this approaches 1/2 from below")

                # Calculate theoretical values for comparison
                q_values = [factors[1][0] for _, _, factors in group]
                theoretical = [(q - 1) / (2 * q) for q in q_values]

                # Verify the formula matches actual values
                errors = [
                    abs(inv - theo) for (_, inv, _), theo in zip(group, theoretical)
                ]
                max_error = max(errors)
                print(
                    f"  Maximum error between theoretical and actual: {max_error:.12f}"
                )

                if max_error < 1e-9:
                    print("  Theoretical formula VERIFIED ✓")

            elif pattern_name == "3q (q prime)":
                print("  Theoretical formula: invariant = 2(q-1)/(3q) = 2/3 - 2/(3q)")
                print("  As q increases, this approaches 2/3 from below")

                # Calculate theoretical values for comparison
                q_values = [factors[1][0] for _, _, factors in group]
                theoretical = [2 * (q - 1) / (3 * q) for q in q_values]

                # Verify the formula matches actual values
                errors = [
                    abs(inv - theo) for (_, inv, _), theo in zip(group, theoretical)
                ]
                max_error = max(errors)
                print(
                    f"  Maximum error between theoretical and actual: {max_error:.12f}"
                )

                if max_error < 1e-9:
                    print("  Theoretical formula VERIFIED ✓")

    # Plot invariant values by pattern
    plt.figure(figsize=(14, 10))

    # Create separate plots for each pattern
    for i, (pattern_name, group) in enumerate(pattern_groups.items()):
        if len(group) > 1:
            primes, invariants, _ = zip(*group)

            plt.subplot(2, 3, i + 1)
            plt.scatter(primes, invariants, alpha=0.7, s=20)

            # Add theoretical curve for specific patterns
            if pattern_name == "2q (q prime)":
                x = np.linspace(min(primes), max(primes), 1000)
                # For p = 2q+1, we need to solve for q in terms of p
                q_values = [(p - 1) / 2 for p in x]
                y = [(q - 1) / (2 * q) for q in q_values]
                plt.plot(x, y, "r-", linewidth=1, label="1/2 - 1/(2q)")

            elif pattern_name == "3q (q prime)":
                x = np.linspace(min(primes), max(primes), 1000)
                # For p = 3q+1, we need to solve for q in terms of p
                q_values = [(p - 1) / 3 for p in x]
                y = [2 * (q - 1) / (3 * q) for q in q_values]
                plt.plot(x, y, "r-", linewidth=1, label="2/3 - 2/(3q)")

            plt.xlabel("Prime p")
            plt.ylabel("Structural Invariant")
            plt.title(f"Invariants for p-1 = {pattern_name}")
            plt.grid(True, alpha=0.3)
            if i == 0 or i == 3:
                plt.legend()

    plt.tight_layout()
    plt.savefig("p_minus_one_structure_analysis.png")

    return results, pattern_groups


def generate_primes_with_target_invariant(target_fraction, count=10, max_search=10000):
    """
    Generate primes with a specific target invariant value by constructing
    numbers with the appropriate (p-1) structure.
    """
    print(f"\nGenerating primes with target invariant = {target_fraction}")

    # Parse the target fraction
    if isinstance(target_fraction, str):
        if "/" in target_fraction:
            num, denom = map(int, target_fraction.split("/"))
            target = num / denom
        else:
            target = float(target_fraction)
    else:
        target = float(target_fraction)

    # Determine the structure of (p-1) that would give this invariant
    if abs(target - 1 / 3) < 1e-9:
        print("Target 1/3 can come from p-1 = 3 (p = 4, not prime) or p-1 = 2q")
        # For p-1 = 2q, we need (q-1)/(2q) = 1/3, which gives q = 3/2, not an integer
        # For p-1 = 3q, we need 2(q-1)/(3q) = 1/3, which gives q = 6, so p-1 = 18, p = 19
        # For p-1 = q₁q₂, we need (1-1/q₁)(1-1/q₂) = 1/3, which doesn't have nice integer solutions

        # Try p-1 = 3 × prime
        candidates = []
        for q in range(2, max_search):
            if is_prime(q):
                p = 3 * q + 1
                if is_prime(p):
                    _, inv, _, _ = is_prime_structural(p)
                    error = abs(inv - target)
                    if error < 1e-9:
                        candidates.append((p, inv, error))
                        if len(candidates) >= count:
                            break

        print(
            f"Found {len(candidates)} primes with invariant ≈ 1/3 using pattern p-1 = 3q:"
        )
        for p, inv, error in candidates[:count]:
            print(f"  p = {p}, invariant = {inv:.9f}, error = {error:.12f}")

    elif abs(target - 0.5) < 1e-9:
        print("Target 1/2 can come from p-1 = 2 (p = 3) or p-1 = power of 2")

        # Try p-1 = 2ᵏ (power of 2)
        candidates = []
        for k in range(1, 20):  # Test powers of 2 up to 2^20
            p = 2**k + 1
            if is_prime(p):
                _, inv, _, _ = is_prime_structural(p)
                error = abs(inv - target)
                if error < 1e-9:
                    candidates.append((p, inv, error, k))
                    if len(candidates) >= count:
                        break

        print(f"Found {len(candidates)} Fermat primes with invariant = 1/2:")
        for p, inv, error, k in candidates:
            print(f"  p = {p} = 2^{k}+1, invariant = {inv:.9f}, error = {error:.12f}")

    elif abs(target - 0.4) < 1e-9:
        print("Target 2/5 can come from p-1 = 5q with specific constraints")

        # Try p-1 = 5q
        candidates = []
        for q in range(2, max_search):
            if is_prime(q):
                p = 5 * q + 1
                if is_prime(p):
                    _, inv, _, _ = is_prime_structural(p)
                    error = abs(inv - target)
                    if error < 1e-9:
                        candidates.append((p, inv, error))
                        if len(candidates) >= count:
                            break

        print(
            f"Found {len(candidates)} primes with invariant ≈ 2/5 using pattern p-1 = 5q:"
        )
        for p, inv, error in candidates[:count]:
            print(f"  p = {p}, invariant = {inv:.9f}, error = {error:.12f}")

    return candidates


def generalized_pattern_formula(max_n=500):
    """
    Develop a generalized formula for structural invariants based on (p-1) factorization.
    Test and verify this formula across different prime structures.
    """
    print("\nDeveloping generalized formula for structural invariants...")

    # Find primes up to max_n
    primes = []
    for n in range(2, max_n + 1):
        if is_prime(n):
            primes.append(n)

    # Calculate invariants and verify formula
    results = []
    for p in tqdm(primes, desc="Testing formula"):
        _, inv, _, _ = is_prime_structural(p)

        factors_p_minus_1 = prime_factors(p - 1)

        # Apply the general formula: φ(n)/n = ∏(1-1/p) for each prime p in n
        # For p-1, the invariant should equal φ(p-1)/(p-1)
        theoretical = 1.0
        for prime, exp in factors_p_minus_1:
            theoretical *= 1 - 1 / prime

        error = abs(inv - theoretical)

        results.append(
            {
                "prime": p,
                "invariant": inv,
                "theoretical": theoretical,
                "error": error,
                "factors_p_minus_1": factors_p_minus_1,
            }
        )

    # Check if formula works
    max_error = max(r["error"] for r in results)
    print(f"Maximum error between formula and actual: {max_error:.12f}")

    if max_error < 1e-9:
        print(
            "✓ VERIFIED: The general formula φ(p-1)/(p-1) = ∏(1-1/q) for each prime q in p-1 is correct"
        )
    else:
        print("✗ Formula has significant errors - check implementation")

    # Plot results
    plt.figure(figsize=(12, 6))

    plt.subplot(1, 2, 1)
    plt.scatter(
        [r["prime"] for r in results],
        [r["invariant"] for r in results],
        label="Actual",
        alpha=0.7,
        s=30,
    )
    plt.scatter(
        [r["prime"] for r in results],
        [r["theoretical"] for r in results],
        label="Theoretical",
        alpha=0.5,
        s=20,
        marker="x",
    )
    plt.xlabel("Prime p")
    plt.ylabel("Structural Invariant")
    plt.title("Actual vs. Theoretical Invariant Values")
    plt.legend()
    plt.grid(True, alpha=0.3)

    plt.subplot(1, 2, 2)
    plt.scatter(
        [r["prime"] for r in results], [r["error"] for r in results], alpha=0.7, s=30
    )
    plt.xlabel("Prime p")
    plt.ylabel("Error")
    plt.title("Error Between Actual and Theoretical Values")
    plt.yscale("log")
    plt.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.savefig("general_formula_verification.png")

    # Explain the formula
    print("\nGeneral formula explanation:")
    print("For any prime p, the structural invariant equals φ(p-1)/(p-1)")
    print("Since φ(n)/n = ∏(1-1/q) for each prime q dividing n, we have:")
    print("  For p-1 = q₁ᵏ¹ × q₂ᵏ² × ... × qₘᵏᵐ (prime factorization)")
    print("  Invariant = φ(p-1)/(p-1) = (1-1/q₁) × (1-1/q₂) × ... × (1-1/qₘ)")
    print("\nThis explains all the pattern-specific formulas:")
    print("* For p-1 = 2q: Invariant = (1-1/2)(1-1/q) = (1/2)(q-1)/q = (q-1)/(2q)")
    print("* For p-1 = 3q: Invariant = (1-1/3)(1-1/q) = (2/3)(q-1)/q = 2(q-1)/(3q)")
    print("* For p-1 = 2ᵏ: Invariant = (1-1/2) = 1/2")

    return results


def main():
    """Run all factor-invariant relationship analysis."""
    print("Analyzing Factor-Invariant Relationship")
    print("======================================")

    # Create results directory if it doesn't exist
    if not os.path.exists("results"):
        os.makedirs("results")

    # Run analyses
    print("\n1. Analyzing Common Invariant Values...")
    results, invariant_patterns = analyze_common_invariants(max_n=1000)

    print("\n2. Analyzing (p-1) Structure Patterns...")
    structure_results, pattern_groups = analyze_p_minus_one_structure(max_n=1000)

    print("\n3. Generating Primes with Specific Invariants...")
    generate_primes_with_target_invariant("1/3", count=5)
    generate_primes_with_target_invariant("1/2", count=5)
    generate_primes_with_target_invariant("2/5", count=5)

    print("\n4. Verifying Generalized Formula...")
    formula_results = generalized_pattern_formula(max_n=500)

    print("\nAnalysis complete. Check the generated PNG files for visualizations.")


if __name__ == "__main__":
    main()
