#!/usr/bin/env python3
"""
Test the structural invariant approach with large primes and special prime numbers.
"""

import sympy
import numpy as np
import math
from tabulate import tabulate
import time
from algebraic_structure_test import (
    euler_totient,
    galois_group_structure,
    structural_invariant,
)


def is_mersenne_prime(p):
    """Check if 2^p - 1 is prime."""
    mersenne = 2**p - 1
    return sympy.isprime(mersenne)


def generate_test_set():
    """Generate a set of interesting numbers to test."""
    test_numbers = []

    # Some large primes
    large_primes = [997, 1009, 1013, 1019, 10007, 10009, 10037]
    test_numbers.extend(large_primes)

    # Special primes

    # Twin primes (p and p+2 are both prime)
    twin_primes = [101, 103, 821, 823]
    test_numbers.extend(twin_primes)

    # Sophie Germain primes (p and 2p+1 are both prime)
    sg_primes = [11, 23, 83, 191]
    test_numbers.extend(sg_primes)

    # Mersenne exponents (p where 2^p - 1 is prime)
    # First few Mersenne prime exponents
    mersenne_exponents = [2, 3, 5, 7, 13, 17, 19, 31]
    test_numbers.extend(mersenne_exponents)

    # Add an actual Mersenne prime
    mersenne_prime = 2**7 - 1  # M7 = 127
    test_numbers.append(mersenne_prime)

    # Repunit primes (primes consisting of all 1's in decimal)
    repunit_primes = [11, 1111111111111111111]  # R2 and R19
    # Only include R2 for performance
    test_numbers.append(repunit_primes[0])

    # Some composites for comparison
    composites = [1001, 1024, 10001, 10100, 12345]
    test_numbers.extend(composites)

    # Sort and remove duplicates
    test_numbers = sorted(list(set(test_numbers)))

    return test_numbers


def run_tests(numbers):
    """Run structural invariant tests on the given numbers."""
    results = []

    print(f"Testing {len(numbers)} special numbers...")

    for i, n in enumerate(numbers):
        print(f"[{i+1}/{len(numbers)}] Testing n={n}...")

        start_time = time.time()

        try:
            # Compute primality
            is_prime = sympy.isprime(n)

            # Skip very large numbers for performance
            if n > 100000:
                print(f"  Skipping detailed analysis for large number {n}")
                results.append(
                    {
                        "n": n,
                        "is_prime": is_prime,
                        "skip_reason": "too large",
                        "time": time.time() - start_time,
                    }
                )
                continue

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
        except Exception as e:
            print(f"  Error processing {n}: {str(e)}")
            results.append({"n": n, "error": str(e), "time": time.time() - start_time})

        print()

    return results


def analyze_special_results(results):
    """Analyze results for special numbers."""
    # Filter out errors
    valid_results = [r for r in results if "error" not in r and "skip_reason" not in r]
    error_results = [r for r in results if "error" in r or "skip_reason" in r]

    primes = [r for r in valid_results if r["is_prime"]]
    composites = [r for r in valid_results if not r["is_prime"]]

    print("\nSUMMARY OF SPECIAL NUMBER ANALYSIS")
    print("==================================")

    # Prepare table data
    table_data = []
    for r in valid_results:
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

    # Report errors
    if error_results:
        print("\nERRORS OR SKIPPED:")
        for r in error_results:
            if "error" in r:
                print(f"  n={r['n']}: {r['error']}")
            else:
                print(f"  n={r['n']}: Skipped ({r['skip_reason']})")

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
    if valid_results:
        accuracy = (correct_primes + correct_composites) / len(valid_results)
        print(f"\nOverall accuracy: {accuracy:.2%}")

        if accuracy > 0.95:
            print(
                "\nCONCLUSION: The structural invariant STRONGLY correlates with primality for special numbers"
            )
        elif accuracy > 0.8:
            print(
                "\nCONCLUSION: The structural invariant MODERATELY correlates with primality for special numbers"
            )
        else:
            print(
                "\nCONCLUSION: The structural invariant shows WEAK correlation with primality for special numbers"
            )


if __name__ == "__main__":
    print("Testing Structural Invariant with Special Numbers")
    print("==============================================")

    test_set = generate_test_set()
    results = run_tests(test_set)
    analyze_special_results(results)
