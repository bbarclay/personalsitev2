#!/usr/bin/env python3
"""
Visualization of Structural Invariants

This script provides visualizations of the structural invariant patterns
for prime and composite numbers, demonstrating the theorem graphically.
"""

import sys
import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
from fractions import Fraction
import pandas as pd
from collections import Counter

# Add parent directory to path so we can import from the main module
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(parent_dir)
from structural_invariant_test import (
    is_prime_standard,
    is_prime_structural,
    totient,
    analyze_invariant_distribution,
)


def plot_invariant_distribution(start: int, end: int, output_file: str = None):
    """
    Create a plot showing the distribution of structural invariant values.

    Args:
        start: Start of the range
        end: End of the range
        output_file: Optional file to save the plot
    """
    # Collect data
    numbers = list(range(start, end + 1))
    invariants = []
    prime_status = []

    for n in numbers:
        is_prime, invariant, _, _ = is_prime_structural(n)
        invariants.append(invariant)
        prime_status.append("Prime" if is_prime_standard(n) else "Composite")

    # Create DataFrame for easier handling
    df = pd.DataFrame(
        {"Number": numbers, "Invariant": invariants, "Status": prime_status}
    )

    # Create figure with multiple subplots
    fig = plt.figure(figsize=(20, 15))
    fig.suptitle(f"Structural Invariant Analysis (Range: {start}-{end})", fontsize=16)

    # 1. Scatter plot of invariants vs number, colored by primality
    ax1 = fig.add_subplot(2, 2, 1)
    prime_df = df[df["Status"] == "Prime"]
    composite_df = df[df["Status"] == "Composite"]

    ax1.scatter(
        prime_df["Number"],
        prime_df["Invariant"],
        color="blue",
        label="Primes",
        alpha=0.7,
        s=30,
    )
    ax1.scatter(
        composite_df["Number"],
        composite_df["Invariant"],
        color="red",
        label="Composites",
        alpha=0.7,
        s=30,
    )

    ax1.set_title("Structural Invariant vs Number")
    ax1.set_xlabel("Number")
    ax1.set_ylabel("Invariant Value")
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    # 2. Histogram of prime invariant values
    ax2 = fig.add_subplot(2, 2, 2)
    ax2.hist(prime_df["Invariant"], bins=30, color="blue", alpha=0.7)
    ax2.set_title("Distribution of Prime Invariants")
    ax2.set_xlabel("Invariant Value")
    ax2.set_ylabel("Frequency")
    ax2.grid(True, alpha=0.3)

    # 3. Plot showing φ(n)/n for consecutive numbers
    ax3 = fig.add_subplot(2, 2, 3)
    totient_ratio = [totient(n) / n for n in numbers]
    ax3.plot(numbers, totient_ratio, "g-", alpha=0.7)
    ax3.set_title("φ(n)/n for Consecutive Numbers")
    ax3.set_xlabel("Number")
    ax3.set_ylabel("φ(n)/n")
    ax3.grid(True, alpha=0.3)

    # 4. Bar chart of most common invariant fractions
    ax4 = fig.add_subplot(2, 2, 4)

    # Convert invariants to fractions
    def to_fraction_str(decimal):
        try:
            if decimal == 0:
                return "0"
            f = Fraction(decimal).limit_denominator(100)
            return f"{f.numerator}/{f.denominator}"
        except:
            return f"{decimal:.4f}"

    prime_fractions = [to_fraction_str(inv) for inv in prime_df["Invariant"]]
    fraction_counts = Counter(prime_fractions)

    # Plot top 10 most common fractions
    top_fractions = dict(fraction_counts.most_common(10))
    ax4.bar(top_fractions.keys(), top_fractions.values(), color="purple", alpha=0.7)
    ax4.set_title("Most Common Invariant Fractions (Primes)")
    ax4.set_xlabel("Fraction")
    ax4.set_ylabel("Count")
    ax4.tick_params(axis="x", rotation=45)
    ax4.grid(True, alpha=0.3)

    plt.tight_layout(rect=[0, 0, 1, 0.96])  # Adjust for the suptitle

    if output_file:
        plt.savefig(output_file, dpi=300)
    else:
        plt.show()


def plot_invariant_vs_factorization(start: int, end: int, output_file: str = None):
    """
    Plot showing the relationship between structural invariant and factorization patterns.

    Args:
        start: Start of the range
        end: End of the range
        output_file: Optional file to save the plot
    """
    # Only analyze primes in this range
    primes = [n for n in range(start, end + 1) if is_prime_standard(n)]

    # Get structural invariant and φ(n-1)/(n-1) for each prime
    data = []
    for p in primes:
        _, invariant, expected, _ = is_prime_structural(p)
        # Get factorization of p-1
        factors = []
        n = p - 1
        for i in range(2, int(n**0.5) + 1):
            while n % i == 0:
                factors.append(i)
                n //= i
        if n > 1:
            factors.append(n)

        # Count distinct prime factors
        distinct_factors = len(set(factors))
        # Count total prime factors
        total_factors = len(factors)

        data.append(
            {
                "prime": p,
                "invariant": invariant,
                "distinct_factors": distinct_factors,
                "total_factors": total_factors,
                "factorization": factors,
            }
        )

    # Convert to DataFrame
    df = pd.DataFrame(data)

    # Create plot
    fig = plt.figure(figsize=(18, 12))
    fig.suptitle(
        "Relationship Between Structural Invariant and Factorization Patterns",
        fontsize=16,
    )

    # 1. Scatter plot: Invariant vs Number of Distinct Prime Factors in p-1
    ax1 = fig.add_subplot(2, 2, 1)
    scatter = ax1.scatter(
        df["distinct_factors"],
        df["invariant"],
        c=df["prime"],
        cmap="viridis",
        alpha=0.7,
        s=50,
    )
    ax1.set_title("Invariant vs Distinct Prime Factors in p-1")
    ax1.set_xlabel("Number of Distinct Prime Factors in p-1")
    ax1.set_ylabel("Invariant Value")
    ax1.grid(True, alpha=0.3)
    ax1.xaxis.set_major_locator(MaxNLocator(integer=True))
    fig.colorbar(scatter, ax=ax1, label="Prime Number")

    # 2. Scatter plot: Invariant vs Total Prime Factors in p-1
    ax2 = fig.add_subplot(2, 2, 2)
    scatter = ax2.scatter(
        df["total_factors"],
        df["invariant"],
        c=df["prime"],
        cmap="plasma",
        alpha=0.7,
        s=50,
    )
    ax2.set_title("Invariant vs Total Prime Factors in p-1")
    ax2.set_xlabel("Total Number of Prime Factors in p-1")
    ax2.set_ylabel("Invariant Value")
    ax2.grid(True, alpha=0.3)
    ax2.xaxis.set_major_locator(MaxNLocator(integer=True))
    fig.colorbar(scatter, ax=ax2, label="Prime Number")

    # 3. Box plot showing distribution of invariants grouped by number of distinct factors
    ax3 = fig.add_subplot(2, 2, 3)
    df.boxplot(column="invariant", by="distinct_factors", ax=ax3)
    ax3.set_title("Distribution of Invariants by Distinct Factors in p-1")
    ax3.set_xlabel("Number of Distinct Prime Factors in p-1")
    ax3.set_ylabel("Invariant Value")
    ax3.grid(True, alpha=0.3)

    # 4. Special patterns: Sophie Germain primes and safe primes
    ax4 = fig.add_subplot(2, 2, 4)

    # Find Sophie Germain primes (p where 2p+1 is also prime)
    sophie_germain = []
    safe_primes = []

    for p in primes:
        if 2 * p + 1 <= end and is_prime_standard(2 * p + 1):
            sophie_germain.append(p)
            safe_primes.append(2 * p + 1)

    # Get invariants for these special primes
    sg_invariants = []
    safe_invariants = []

    for p in sophie_germain:
        _, invariant, _, _ = is_prime_structural(p)
        sg_invariants.append(invariant)

    for p in safe_primes:
        _, invariant, _, _ = is_prime_structural(p)
        safe_invariants.append(invariant)

    # Plot invariants for these special primes
    ax4.scatter(
        sophie_germain,
        sg_invariants,
        color="green",
        label="Sophie Germain Primes",
        alpha=0.7,
        s=50,
    )
    ax4.scatter(
        safe_primes,
        safe_invariants,
        color="orange",
        label="Safe Primes",
        alpha=0.7,
        s=50,
    )
    ax4.set_title("Invariants for Sophie Germain and Safe Primes")
    ax4.set_xlabel("Prime Number")
    ax4.set_ylabel("Invariant Value")
    ax4.legend()
    ax4.grid(True, alpha=0.3)

    plt.tight_layout(rect=[0, 0, 1, 0.96])  # Adjust for the suptitle

    if output_file:
        plt.savefig(output_file, dpi=300)
    else:
        plt.show()


def main():
    """Main function to run the visualizations."""
    print("Generating visualizations of structural invariants...")

    # Set the range for analysis
    start = 2
    end = 200  # Limit for reasonable computation time

    # Create and save the plots
    output_dir = os.path.dirname(os.path.abspath(__file__))

    # Basic distribution visualization
    print(f"Plotting invariant distribution for range {start}-{end}...")
    output_file = os.path.join(output_dir, "invariant_distribution.png")
    plot_invariant_distribution(start, end, output_file)
    print(f"Saved distribution plot to {output_file}")

    # Factorization pattern visualization
    print(f"Plotting invariant vs factorization patterns for range {start}-{end}...")
    output_file = os.path.join(output_dir, "invariant_factorization.png")
    plot_invariant_vs_factorization(start, end, output_file)
    print(f"Saved factorization plot to {output_file}")

    print("Visualization complete!")


if __name__ == "__main__":
    main()
