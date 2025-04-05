#!/usr/bin/env python3
"""
Test the structural invariant approach with random higher values
and targeted edge cases.
"""

import sympy
import numpy as np
import math
import random
from tabulate import tabulate
import time
from algebraic_structure_test import (
    euler_totient,
    galois_group_structure,
    structural_invariant,
)


def test_random_values(count=10, min_val=50, max_val=1000):
    """Test the structural invariant with random higher values."""
    results = []

    # Generate random numbers with a mix of primes and composites
    numbers = []

    # Include some known primes
    prime_candidates = [53, 97, 101, 211, 307, 401, 503, 601, 701, 809, 907, 997]
    numbers.extend(random.sample(prime_candidates, min(5, len(prime_candidates))))

    # Include some Carmichael numbers (compositee that can fool primality tests)
    carmichael_numbers = [561, 1105, 1729, 2465, 2821, 6601]
    numbers.extend(random.sample(carmichael_numbers, min(3, len(carmichael_numbers))))

    # Add some random numbers
    while len(numbers) < count:
        n = random.randint(min_val, max_val)
        if n not in numbers:
            numbers.append(n)

    # Sort the numbers for clarity
    numbers.sort()

    print(f"Testing {len(numbers)} values between {min_val} and {max_val}...")

    for i, n in enumerate(numbers):
        start_time = time.time()

        # Compute primality
        is_prime = sympy.isprime(n)

        # Get Galois group structure
        group = galois_group_structure(n)

        # Compute structural invariant
        invariant = structural_invariant(n)

        # Record time
        elapsed_time = time.time() - start_time

        result = {
            "n": n,
            "is_prime": is_prime,
            "phi_n": euler_totient(n),
            "group_structure": group,
            "structural_invariant": invariant,
            "time": elapsed_time,
        }

        results.append(result)

        # Print progress
        print(f"[{i+1}/{len(numbers)}] Testing n={n}...")
        print(f"  Prime: {is_prime}")
        print(f"  Group: {group['type']}, Order: {group['order']}")
        if invariant:
            print(f"  Invariant: {invariant['invariant']:.6f}")
            print(
                f"  Prediction: {invariant['prediction']:.6f}"
                if "prediction" in invariant
                else ""
            )
        print(f"  Time: {elapsed_time:.2f} seconds")
        print()

    return results


def analyze_higher_results(results):
    """Analyze the results for higher values."""
    primes = [r for r in results if r["is_prime"]]
    composites = [r for r in results if not r["is_prime"]]

    print("\nSUMMARY OF HIGHER VALUE ANALYSIS")
    print("===============================")

    # Prepare table data
    table_data = []
    for r in results:
        invariant = r["structural_invariant"]
        if invariant:
            inv_val = (
                f"{invariant['invariant']:.6f}" if "invariant" in invariant else "N/A"
            )
            pred_val = (
                f"{invariant['prediction']:.6f}" if "prediction" in invariant else "N/A"
            )
        else:
            inv_val = "N/A"
            pred_val = "N/A"

        row = [
            r["n"],
            "Yes" if r["is_prime"] else "No",
            r["group_structure"]["type"],
            inv_val,
            pred_val,
            f"{r['time']:.2f}s",
        ]
        table_data.append(row)

    # Print table
    headers = ["n", "Prime?", "Group Type", "Invariant", "Prediction", "Time"]
    print(tabulate(table_data, headers=headers, tablefmt="grid"))

    # Calculate accuracy
    if primes:
        correct_primes = sum(
            1
            for r in primes
            if r["structural_invariant"]
            and "invariant" in r["structural_invariant"]
            and "prediction" in r["structural_invariant"]
            and abs(
                r["structural_invariant"]["invariant"]
                - r["structural_invariant"]["prediction"]
            )
            < 0.001
        )
        print(f"\nCorrectly identified {correct_primes}/{len(primes)} primes")

    if composites:
        correct_composites = sum(
            1
            for r in composites
            if r["structural_invariant"]
            and r["structural_invariant"]["type"] == "composite"
        )
        print(f"Correctly identified {correct_composites}/{len(composites)} composites")

    # Overall conclusion
    accuracy = (correct_primes + correct_composites) / len(results)
    print(f"\nOverall accuracy: {accuracy:.2%}")

    # Check performance
    avg_time = sum(r["time"] for r in results) / len(results)
    max_time = max(r["time"] for r in results)
    print(f"Average processing time: {avg_time:.2f} seconds")
    print(f"Maximum processing time: {max_time:.2f} seconds")

    if accuracy > 0.95:
        print(
            "\nCONCLUSION: The structural invariant STRONGLY correlates with primality for higher values"
        )
    elif accuracy > 0.8:
        print(
            "\nCONCLUSION: The structural invariant MODERATELY correlates with primality for higher values"
        )
    else:
        print(
            "\nCONCLUSION: The structural invariant shows WEAK correlation with primality for higher values"
        )


if __name__ == "__main__":
    print("Testing Structural Invariant with Higher Values")
    print("=============================================")

    random.seed(42)  # For reproducibility

    # Test with higher random values
    results = test_random_values(count=15, min_val=50, max_val=1000)

    analyze_higher_results(results)
