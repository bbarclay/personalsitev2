#!/usr/bin/env python3
"""
Floor Prime Discovery Toolkit

A comprehensive toolkit for exploring, analyzing, and utilizing the
Structural Invariant Primality Test (Floor Prime Discovery method).

This toolkit combines the key components from our research:
- Optimized primality testing
- Pattern analysis and discovery
- Visualization tools
- Educational components

Author: Research Team
Date: April 2023
"""

import sys
import os
import argparse
import importlib.util
import time
import math
from fractions import Fraction

# Ensure the code directory is in the Python path
script_dir = os.path.dirname(os.path.abspath(__file__))
code_dir = os.path.join(script_dir, "brainstorm", "code")
sys.path.append(code_dir)


# Try to import the modules
def import_module_from_path(module_name, file_path):
    """Import a module from a file path."""
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    if spec is None:
        print(f"Could not find module {module_name} at {file_path}")
        return None
    module = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module


# Import our modules
try:
    optimized_primality = import_module_from_path(
        "optimized_primality_test",
        os.path.join(code_dir, "optimized_primality_test.py"),
    )

    invariant_visualizer = import_module_from_path(
        "invariant_visualizer", os.path.join(code_dir, "invariant_visualizer.py")
    )

    factor_invariant = import_module_from_path(
        "factor_invariant_relationship",
        os.path.join(code_dir, "factor_invariant_relationship.py"),
    )

    pattern_discovery = import_module_from_path(
        "pattern_discovery", os.path.join(code_dir, "pattern_discovery.py")
    )
except Exception as e:
    print(f"Error loading modules: {e}")
    print("Please ensure all required files are in the correct locations.")
    sys.exit(1)


# Banner and UI elements
def print_banner():
    """Print the toolkit banner."""
    banner = """
    ╔═══════════════════════════════════════════════════════════════════╗
    ║                     FLOOR PRIME DISCOVERY TOOLKIT                 ║
    ║                                                                   ║
    ║  A comprehensive suite of tools for exploring the mathematical    ║
    ║  properties of prime numbers through structural invariants.       ║
    ║                                                                   ║
    ║  Based on Barclay's Algorithm for Recursive Continued            ║
    ║  Logarithmic Algebraic Yields (BARCLAY) research.                ║
    ╚═══════════════════════════════════════════════════════════════════╝
    """
    print(banner)


def print_section(title):
    """Print a section header."""
    print(f"\n{'=' * 70}")
    print(f"  {title}")
    print(f"{'=' * 70}\n")


# Main functions for the toolkit
def test_primality(args):
    """Test if a number is prime using the optimized structural invariant method."""
    print_section("STRUCTURAL INVARIANT PRIMALITY TEST")

    try:
        number = int(args.number)
        is_prime, invariant, details = optimized_primality.is_prime_optimized(
            number, verbose=True
        )

        print(f"\nConclusion: {number} is {'PRIME' if is_prime else 'COMPOSITE'}")

        if is_prime:
            pattern = details["pattern"]
            print(f"\nAdditional Details:")
            print(f"  - Structural Invariant: {invariant}")
            print(f"  - (n-1) Pattern: {pattern}")

            # Calculate the invariant as a fraction
            fraction = Fraction(invariant).limit_denominator(100)
            print(
                f"  - Invariant as fraction: {fraction.numerator}/{fraction.denominator}"
            )

            # Verify the theoretical formula
            factors = optimized_primality.prime_factors(number - 1)
            product = 1.0
            for p, _ in factors:
                product *= 1 - 1 / p

            print(f"  - Verified using product formula: {product}")
            error = abs(invariant - product)
            print(f"  - Error: {error:.10f} (should be near zero)")

    except ValueError:
        print(f"Error: {args.number} is not a valid integer.")


def analyze_patterns(args):
    """Analyze patterns in prime structural invariants."""
    print_section("PRIME PATTERN ANALYSIS")

    max_n = int(args.max_n) if args.max_n else 1000
    print(f"Analyzing prime patterns up to {max_n}...")

    # Use pattern_discovery module
    try:
        # Redirect stdout to capture output (if needed)
        # original_stdout = sys.stdout
        # sys.stdout = StringIO()

        # Run the analysis functions
        if hasattr(pattern_discovery, "analyze_invariant_distribution"):
            pattern_discovery.analyze_invariant_distribution(max_n=max_n)

        if hasattr(pattern_discovery, "analyze_digits_patterns"):
            pattern_discovery.analyze_digits_patterns(max_n=max_n)

        if hasattr(pattern_discovery, "analyze_prime_consecutive_patterns"):
            pattern_discovery.analyze_prime_consecutive_patterns(max_n=max_n)

        # Reset stdout
        # sys.stdout = original_stdout

        print(f"\nAnalysis complete. Results saved to visualizations directory.")

    except Exception as e:
        print(f"Error in pattern analysis: {e}")


def visualize_invariants(args):
    """Create visualizations of prime structural invariants."""
    print_section("INVARIANT VISUALIZATION")

    max_n = int(args.max_n) if args.max_n else 1000
    save_dir = args.output_dir if args.output_dir else "./visualizations"

    print(f"Creating visualizations for primes up to {max_n}...")
    print(f"Output directory: {save_dir}")

    try:
        os.makedirs(save_dir, exist_ok=True)
        invariant_visualizer.create_all_visualizations(max_n=max_n, save_dir=save_dir)

        print(f"\nVisualizations created successfully.")
        print(f"Files saved to: {save_dir}")
        for file in os.listdir(save_dir):
            if file.endswith(".png"):
                print(f"  - {file}")

    except Exception as e:
        print(f"Error creating visualizations: {e}")


def find_special_primes(args):
    """Find primes with specific invariant values."""
    print_section("FINDING SPECIAL PRIMES")

    target = args.target
    count = int(args.count) if args.count else 5

    print(f"Searching for primes with invariant value: {target}")
    print(f"Generating up to {count} examples...\n")

    try:
        primes = optimized_primality.generate_primes_with_invariant(
            target_fraction=target, count=count, max_search=50000
        )

        if primes:
            print(f"Found {len(primes)} primes with invariant ≈ {target}:")
            for p, inv in primes:
                fraction = Fraction(inv).limit_denominator(100)
                print(f"  Prime: {p}, Invariant: {inv:.9f} ≈ {fraction}")

                # Show the factorization of (p-1)
                factors = optimized_primality.prime_factors(p - 1)
                factor_str = " × ".join(
                    [f"{p}^{e}" if e > 1 else str(p) for p, e in factors]
                )
                print(f"  (p-1) = {p-1} = {factor_str}")
                print()
        else:
            print(f"No primes found with invariant ≈ {target} within search range.")

    except Exception as e:
        print(f"Error finding special primes: {e}")


def run_benchmark(args):
    """Run benchmarks comparing primality testing methods."""
    print_section("PRIMALITY TESTING BENCHMARK")

    max_n = int(args.max_n) if args.max_n else 100000

    print(f"Running benchmark for primality testing up to {max_n}...")

    try:
        optimized_primality.benchmark()
    except Exception as e:
        print(f"Error running benchmark: {e}")


def show_educational_content(args):
    """Display educational content about the Floor Prime Discovery method."""
    print_section("EDUCATIONAL CONTENT")

    # Show the key insights
    insights_file = os.path.join(
        script_dir, "brainstorm", "floor_prime_discovery_insights.md"
    )

    try:
        with open(insights_file, "r") as f:
            content = f.read()
            print(content)
    except FileNotFoundError:
        print("Educational content file not found.")
        print(f"Expected location: {insights_file}")
    except Exception as e:
        print(f"Error reading educational content: {e}")


def main():
    """Main function to parse arguments and run the appropriate tool."""
    parser = argparse.ArgumentParser(
        description="Floor Prime Discovery Toolkit - A comprehensive suite for "
        "exploring prime number properties through structural invariants."
    )

    subparsers = parser.add_subparsers(
        title="commands",
        description="Available commands",
        help="Choose a command to run",
        dest="command",
    )

    # Test primality command
    test_parser = subparsers.add_parser(
        "test", help="Test if a number is prime using the structural invariant method"
    )
    test_parser.add_argument("number", help="The number to test for primality")

    # Analyze patterns command
    analyze_parser = subparsers.add_parser(
        "patterns", help="Analyze patterns in prime structural invariants"
    )
    analyze_parser.add_argument(
        "--max-n", help="Maximum number to analyze up to (default: 1000)"
    )

    # Visualize invariants command
    visualize_parser = subparsers.add_parser(
        "visualize", help="Create visualizations of prime structural invariants"
    )
    visualize_parser.add_argument(
        "--max-n", help="Maximum number to visualize up to (default: 1000)"
    )
    visualize_parser.add_argument(
        "--output-dir",
        help="Directory to save visualizations (default: ./visualizations)",
    )

    # Find special primes command
    special_parser = subparsers.add_parser(
        "find", help="Find primes with specific invariant values"
    )
    special_parser.add_argument(
        "target", help="Target invariant value (e.g. '1/2', '1/3', '2/5')"
    )
    special_parser.add_argument("--count", help="Number of primes to find (default: 5)")

    # Benchmark command
    benchmark_parser = subparsers.add_parser(
        "benchmark", help="Run benchmarks comparing primality testing methods"
    )
    benchmark_parser.add_argument(
        "--max-n", help="Maximum number to use in benchmark (default: 100000)"
    )

    # Educational content command
    educational_parser = subparsers.add_parser(
        "learn",
        help="Display educational content about the Floor Prime Discovery method",
    )

    args = parser.parse_args()

    # Print the banner
    print_banner()

    # If no command is provided, show help
    if not args.command:
        parser.print_help()
        return

    # Execute the appropriate function based on the command
    if args.command == "test":
        test_primality(args)
    elif args.command == "patterns":
        analyze_patterns(args)
    elif args.command == "visualize":
        visualize_invariants(args)
    elif args.command == "find":
        find_special_primes(args)
    elif args.command == "benchmark":
        run_benchmark(args)
    elif args.command == "learn":
        show_educational_content(args)


if __name__ == "__main__":
    main()
