#!/usr/bin/env python3
"""
Structural Invariant Visualizer

This script creates visualizations to help understand the relationships
between prime numbers, their structural invariants, and the factorization
patterns of (p-1).

The visualizations include:
1. Interactive scatter plot of primes by their invariant values
2. Heatmap showing the relationship between (p-1) factors and invariant values
3. Network graph showing the connections between related invariant values
4. Comparison of computational methods for primality testing
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from matplotlib.patches import Patch
import matplotlib.ticker as ticker
from functools import lru_cache
import math
import time
from fractions import Fraction
import networkx as nx
from concurrent.futures import ProcessPoolExecutor
import pandas as pd
from collections import defaultdict, Counter
import seaborn as sns

# Import optimized primality testing functions
from optimized_primality_test import (
    is_prime_optimized,
    is_small_prime,
    prime_factors,
    structural_invariant_product_formula,
    recognize_pattern,
)


def find_primes_up_to(n):
    """Find all primes up to n using the Sieve of Eratosthenes."""
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False

    for i in range(2, int(math.sqrt(n)) + 1):
        if sieve[i]:
            for j in range(i * i, n + 1, i):
                sieve[j] = False

    return [i for i in range(2, n + 1) if sieve[i]]


def get_prime_data(max_n=1000, n_processes=4):
    """
    Get data about primes up to max_n, including:
    - Prime number
    - Structural invariant
    - Factorization pattern of (p-1)
    - Invariant as a fraction
    - Computational time

    Returns a pandas DataFrame with the data.
    """
    primes = find_primes_up_to(max_n)

    # Prepare data structure
    data = []

    # Parallel computation for larger datasets
    if max_n > 1000:
        with ProcessPoolExecutor(max_workers=n_processes) as executor:
            results = list(executor.map(is_prime_optimized, primes))

        for p, (is_prime, invariant, details) in zip(primes, results):
            pattern = details["pattern"]
            invariant_fraction = str(Fraction(invariant).limit_denominator(100))
            calc_time = details.get("calculation_time_ms", 0)

            # Get factorization of p-1
            factors = prime_factors(p - 1)
            factor_signature = (
                " × ".join([f"{p}^{e}" if e > 1 else str(p) for p, e in factors])
                if factors
                else "None"
            )

            # Handle empty factors list (for p=2, p-1=1)
            factor_primes = [p for p, _ in factors] if factors else [0]

            data.append(
                {
                    "prime": p,
                    "invariant": invariant,
                    "pattern": pattern,
                    "fraction": invariant_fraction,
                    "calculation_time": calc_time,
                    "factorization": factor_signature,
                    "num_factors": len(factors),
                    "max_factor": max(factor_primes) if factor_primes else 0,
                    "min_factor": min(factor_primes) if factor_primes else 0,
                    "has_2": any(p == 2 for p, _ in factors),
                    "has_3": any(p == 3 for p, _ in factors),
                    "has_5": any(p == 5 for p, _ in factors),
                    "has_power_of_2": any(p == 2 and e > 1 for p, e in factors),
                }
            )
    else:
        for p in primes:
            _, invariant, details = is_prime_optimized(p)
            pattern = details["pattern"]
            invariant_fraction = str(Fraction(invariant).limit_denominator(100))
            calc_time = details.get("calculation_time_ms", 0)

            # Get factorization of p-1
            factors = prime_factors(p - 1)
            factor_signature = (
                " × ".join([f"{p}^{e}" if e > 1 else str(p) for p, e in factors])
                if factors
                else "None"
            )

            # Handle empty factors list (for p=2, p-1=1)
            factor_primes = [p for p, _ in factors] if factors else [0]

            data.append(
                {
                    "prime": p,
                    "invariant": invariant,
                    "pattern": pattern,
                    "fraction": invariant_fraction,
                    "calculation_time": calc_time,
                    "factorization": factor_signature,
                    "num_factors": len(factors),
                    "max_factor": max(factor_primes) if factor_primes else 0,
                    "min_factor": min(factor_primes) if factor_primes else 0,
                    "has_2": any(p == 2 for p, _ in factors),
                    "has_3": any(p == 3 for p, _ in factors),
                    "has_5": any(p == 5 for p, _ in factors),
                    "has_power_of_2": any(p == 2 and e > 1 for p, e in factors),
                }
            )

    return pd.DataFrame(data)


def plot_invariant_scatter(df, save_path=None):
    """
    Create a scatter plot of primes by their invariant values,
    color-coded by the factorization pattern.
    """
    plt.figure(figsize=(12, 8))

    # Get the most common patterns for coloring
    top_patterns = df["pattern"].value_counts().nlargest(8).index.tolist()
    other_pattern = "Other"

    # Create a color map
    colors = cm.Set2(np.linspace(0, 1, len(top_patterns) + 1))
    color_dict = {pattern: colors[i] for i, pattern in enumerate(top_patterns)}
    color_dict[other_pattern] = colors[-1]

    # Create the scatter plot
    for pattern in top_patterns:
        subset = df[df["pattern"] == pattern]
        plt.scatter(
            subset["prime"],
            subset["invariant"],
            label=pattern,
            color=color_dict[pattern],
            alpha=0.7,
        )

    # Plot other patterns
    other_subset = df[~df["pattern"].isin(top_patterns)]
    if not other_subset.empty:
        plt.scatter(
            other_subset["prime"],
            other_subset["invariant"],
            label=other_pattern,
            color=color_dict[other_pattern],
            alpha=0.5,
        )

    # Add common fraction lines
    common_fractions = [(1, 2), (1, 3), (2, 5), (4, 15), (2, 7)]
    for num, denom in common_fractions:
        frac_value = num / denom
        plt.axhline(y=frac_value, color="gray", linestyle="--", alpha=0.5)
        plt.text(
            df["prime"].max() * 1.01,
            frac_value,
            f"{num}/{denom}",
            va="center",
            color="gray",
        )

    plt.title("Prime Numbers and their Structural Invariants", fontsize=16)
    plt.xlabel("Prime Number", fontsize=14)
    plt.ylabel("Structural Invariant Value", fontsize=14)
    plt.legend(
        title="Factorization Pattern of (p-1)",
        bbox_to_anchor=(1.05, 1),
        loc="upper left",
    )
    plt.grid(alpha=0.3)
    plt.tight_layout()

    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches="tight")

    return plt.gcf()


def plot_factor_heatmap(df, save_path=None):
    """
    Create a heatmap showing the relationship between common factors
    in (p-1) and the resulting invariant values.
    """
    # Prepare data for the heatmap
    factor_columns = ["has_2", "has_3", "has_5", "has_power_of_2"]

    # Get the most common invariant fractions
    top_fractions = df["fraction"].value_counts().nlargest(10).index.tolist()

    # Filter the DataFrame to include only the top fractions
    subset = df[df["fraction"].isin(top_fractions)]

    # Create a new DataFrame for the heatmap - explicitly use float dtype
    heatmap_data = pd.DataFrame(
        index=top_fractions, columns=factor_columns, dtype=float
    )
    # Initialize with zeros
    for col in factor_columns:
        heatmap_data[col] = 0.0

    # Fill the heatmap data
    for fraction in top_fractions:
        fraction_subset = subset[subset["fraction"] == fraction]
        total_count = len(fraction_subset)
        if total_count > 0:
            for factor in factor_columns:
                factor_count = fraction_subset[factor].sum()
                heatmap_data.loc[fraction, factor] = float(factor_count) / float(
                    total_count
                )

    # Rename columns for better display
    heatmap_data.columns = [
        "Contains 2",
        "Contains 3",
        "Contains 5",
        "Contains 2^k (k>1)",
    ]

    # Create the heatmap
    plt.figure(figsize=(12, 8))
    sns.heatmap(
        heatmap_data, annot=True, cmap="viridis", cbar_kws={"label": "Frequency"}
    )
    plt.title("Relationship Between Factors in (p-1) and Invariant Values", fontsize=16)
    plt.ylabel("Invariant Value (as Fraction)", fontsize=14)
    plt.tight_layout()

    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches="tight")

    return plt.gcf()


def plot_invariant_network(df, save_path=None):
    """
    Create a network graph showing the relationships between different
    invariant values based on their common factor patterns.
    """
    # Get the most common invariant fractions
    top_fractions = df["fraction"].value_counts().nlargest(15).index.tolist()

    # Filter the DataFrame to include only the top fractions
    subset = df[df["fraction"].isin(top_fractions)]

    # Create a graph
    G = nx.Graph()

    # Add nodes for each fraction
    for fraction in top_fractions:
        count = len(subset[subset["fraction"] == fraction])
        G.add_node(fraction, count=count)

    # Add edges between fractions that share common factor patterns
    for i, frac1 in enumerate(top_fractions):
        for frac2 in top_fractions[i + 1 :]:
            patterns1 = set(
                subset[subset["fraction"] == frac1]["factorization"].tolist()
            )
            patterns2 = set(
                subset[subset["fraction"] == frac2]["factorization"].tolist()
            )

            # If they share any patterns, add an edge
            common_patterns = patterns1.intersection(patterns2)
            if common_patterns:
                weight = len(common_patterns)
                G.add_edge(
                    frac1,
                    frac2,
                    weight=weight,
                    common_patterns=", ".join(common_patterns),
                )

    # Create the visualization
    plt.figure(figsize=(14, 10))

    # Calculate node sizes based on count (scaled for visibility)
    node_sizes = [G.nodes[f]["count"] * 100 for f in G.nodes()]

    # Calculate edge widths based on weight
    edge_widths = [G[u][v]["weight"] * 0.5 for u, v in G.edges()]

    # Calculate node colors based on the fraction value
    node_values = [float(Fraction(f)) for f in G.nodes()]
    node_colors = plt.cm.plasma(
        [
            (val - min(node_values)) / (max(node_values) - min(node_values))
            for val in node_values
        ]
    )

    # Use a spring layout for the graph
    pos = nx.spring_layout(G, seed=42, k=0.3)

    # Draw the graph
    nx.draw_networkx_nodes(
        G, pos, node_size=node_sizes, node_color=node_colors, alpha=0.8
    )
    nx.draw_networkx_edges(G, pos, width=edge_widths, alpha=0.4, edge_color="gray")
    nx.draw_networkx_labels(G, pos, font_size=10, font_weight="bold")

    # Add a colorbar - fixed to use the correct axes
    plt.subplots_adjust(right=0.85)
    cax = plt.axes([0.87, 0.15, 0.03, 0.7])
    sm = plt.cm.ScalarMappable(
        cmap=plt.cm.plasma, norm=plt.Normalize(min(node_values), max(node_values))
    )
    sm.set_array([])
    plt.colorbar(sm, cax=cax, label="Invariant Value")

    plt.title("Network of Related Invariant Values", fontsize=16)
    plt.axis("off")
    plt.tight_layout(rect=[0, 0, 0.85, 1])  # Adjust layout to accommodate colorbar

    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches="tight")

    return plt.gcf()


def plot_performance_comparison(max_n=1000, num_samples=50, save_path=None):
    """
    Create a plot comparing the performance of different primality testing methods.
    """
    # Generate random numbers for testing
    np.random.seed(42)
    test_numbers = np.random.randint(100, max_n, size=num_samples)

    # Define the methods to compare
    methods = {
        "Structural Invariant": lambda n: is_prime_optimized(n)[0],
        "Trial Division": is_small_prime,
        # Adding a baseline method
        "Simple Check (2, 3 only)": lambda n: n > 1
        and (n == 2 or n == 3 or (n % 2 != 0 and n % 3 != 0)),
    }

    # Measure execution times
    times = {name: [] for name in methods}
    accuracies = {name: 0 for name in methods}

    # Reference result (using trial division as the reference)
    reference_results = [is_small_prime(n) for n in test_numbers]

    for name, method in methods.items():
        for n in test_numbers:
            start_time = time.time()
            result = method(n)
            times[name].append((time.time() - start_time) * 1000)  # ms

        # Calculate accuracy
        results = [method(n) for n in test_numbers]
        accuracies[name] = sum(
            1 for ref, res in zip(reference_results, results) if ref == res
        ) / len(test_numbers)

    # Create the plot
    plt.figure(figsize=(14, 8))

    # Bar chart for average execution time
    avg_times = {name: np.mean(t) for name, t in times.items()}

    # Sort methods by average time
    sorted_methods = sorted(avg_times.items(), key=lambda x: x[1])
    method_names = [m[0] for m in sorted_methods]
    method_times = [m[1] for m in sorted_methods]

    # Plot average times
    ax1 = plt.subplot(1, 2, 1)
    bars = ax1.bar(method_names, method_times, color=["#2ca02c", "#1f77b4", "#d62728"])

    # Add accuracy percentages above the bars
    for i, bar in enumerate(bars):
        height = bar.get_height()
        ax1.text(
            bar.get_x() + bar.get_width() / 2.0,
            height + 0.1,
            f"{accuracies[method_names[i]]:.1%}",
            ha="center",
            va="bottom",
            rotation=0,
        )

    ax1.set_title("Average Execution Time by Method", fontsize=14)
    ax1.set_ylabel("Time (ms)", fontsize=12)
    ax1.set_yscale("log")  # Log scale for better visualization

    # Add a note about accuracy
    ax1.text(
        0.5,
        -0.15,
        "Note: Percentage values show accuracy compared to trial division.",
        ha="center",
        va="center",
        transform=ax1.transAxes,
        fontsize=10,
    )

    # Box plot for execution time distribution
    ax2 = plt.subplot(1, 2, 2)

    # Prepare data for box plot
    box_data = [times[name] for name in method_names]
    ax2.boxplot(
        box_data,
        labels=method_names,
        patch_artist=True,
        boxprops=dict(facecolor="lightblue", color="blue"),
        medianprops=dict(color="red"),
    )

    ax2.set_title("Execution Time Distribution by Method", fontsize=14)
    ax2.set_ylabel("Time (ms)", fontsize=12)
    ax2.set_yscale("log")  # Log scale for better visualization

    plt.suptitle("Performance Comparison of Primality Testing Methods", fontsize=16)
    plt.tight_layout(rect=[0, 0, 1, 0.95])  # Adjust for the suptitle

    if save_path:
        plt.savefig(save_path, dpi=300, bbox_inches="tight")

    return plt.gcf()


def create_all_visualizations(max_n=2000, save_dir="./visualizations"):
    """Create all visualizations and save them to files."""
    # Ensure the save directory exists
    import os

    os.makedirs(save_dir, exist_ok=True)

    # Get the prime data
    print(f"Collecting data for primes up to {max_n}...")
    df = get_prime_data(max_n)

    print(f"Creating scatter plot...")
    plot_invariant_scatter(df, save_path=f"{save_dir}/invariant_scatter.png")

    print(f"Creating factor heatmap...")
    plot_factor_heatmap(df, save_path=f"{save_dir}/factor_heatmap.png")

    print(f"Creating invariant network...")
    plot_invariant_network(df, save_path=f"{save_dir}/invariant_network.png")

    print(f"Creating performance comparison...")
    plot_performance_comparison(
        max_n, save_path=f"{save_dir}/performance_comparison.png"
    )

    print(f"All visualizations saved to {save_dir}/")


if __name__ == "__main__":
    # Create the visualizations
    create_all_visualizations(max_n=2000, save_dir="./visualizations")

    # Show the plots (if running interactively)
    plt.show()
