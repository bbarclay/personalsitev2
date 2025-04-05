#!/usr/bin/env python3
"""
Comprehensive Verification Suite for Structural-Spectral Theory
This script runs a complete verification of all aspects of our discoveries.
"""

import numpy as np
from mpmath import mp, zetazero
import matplotlib.pyplot as plt
from typing import Dict, List, Tuple
import time
import os

# Set high precision
mp.dps = 100

class StructuralSpectralVerification:
    """Verification suite for structural-spectral theory."""
    
    def __init__(self):
        self.results = {
            'primality': {},
            'spectral': {},
            'correlation': {},
            'timing': {}
        }
    
    def verify_structural_invariant(self, n: int) -> float:
        """Compute structural invariant for number n."""
        if n <= 1:
            return 0.0
        
        # Find elements of maximal order
        max_order = 0
        max_order_count = 0
        
        for a in range(1, n):
            if np.gcd(a, n) == 1:
                order = 1
                value = a % n
                while value != 1:
                    value = (value * a) % n
                    order += 1
                    if order > n:
                        break
                if order == n - 1:
                    max_order_count += 1
                max_order = max(max_order, order)
        
        if max_order == n - 1:
            phi_n_minus_1 = sum(1 for i in range(1, n) if np.gcd(i, n-1) == 1)
            if max_order_count == phi_n_minus_1:
                return float(phi_n_minus_1) / (n - 1)
        return 0.0
    
    def compute_spectral_correlation(self, max_n: int, num_zeros: int) -> float:
        """Compute correlation between structural and zeta spectra."""
        # Compute structural invariants
        invariants = [self.verify_structural_invariant(n) for n in range(2, max_n + 1)]
        
        # Compute zeta zeros
        zeros = []
        for n in range(1, num_zeros + 1):
            z = complex(mp.im(zetazero(n)))
            zeros.append(float(z.real))
        
        # Compute spectra
        inv_spectrum = np.abs(np.fft.fft(invariants))
        zero_spectrum = np.abs(np.fft.fft(np.diff(zeros)))
        
        # Normalize and correlate
        min_len = min(len(inv_spectrum), len(zero_spectrum))
        inv_spectrum = inv_spectrum[:min_len] / np.max(inv_spectrum)
        zero_spectrum = zero_spectrum[:min_len] / np.max(zero_spectrum)
        
        return float(np.corrcoef(inv_spectrum, zero_spectrum)[0,1])
    
    def verify_special_numbers(self, numbers: List[int]) -> Dict:
        """Verify structural invariants for special numbers."""
        results = {}
        for n in numbers:
            invariant = self.verify_structural_invariant(n)
            is_prime = all(n % i != 0 for i in range(2, int(n**0.5) + 1))
            results[n] = {
                'invariant': invariant,
                'is_prime': is_prime,
                'correct': (invariant > 0) == is_prime
            }
        return results
    
    def run_comprehensive_verification(self, max_n: int = 1000):
        """Run complete verification suite."""
        start_time = time.time()
        
        print("Starting comprehensive verification...")
        
        # 1. Verify primality testing
        print("\nTesting primality characterization...")
        special_numbers = [
            2, 3, 4, 5, 7,  # Small numbers
            561, 1105, 1729,  # Carmichael numbers
            65537, 257, 17,  # Fermat primes
            100, 1000  # Composites
        ]
        self.results['primality'] = self.verify_special_numbers(special_numbers)
        
        # 2. Verify spectral correlation
        print("\nComputing spectral correlations...")
        correlation = self.compute_spectral_correlation(max_n, min(max_n//5, 100))
        self.results['spectral']['correlation'] = correlation
        
        # 3. Verify scaling properties
        print("\nTesting scaling properties...")
        scales = [50, 100, 200, 500, 1000]
        correlations = []
        for n in scales:
            if n <= max_n:
                corr = self.compute_spectral_correlation(n, min(n//5, 100))
                correlations.append(corr)
        self.results['correlation']['scaling'] = dict(zip(scales, correlations))
        
        # 4. Generate visualization
        print("\nGenerating visualizations...")
        self.plot_results()
        
        self.results['timing']['total'] = time.time() - start_time
        
        return self.results
    
    def plot_results(self):
        """Generate comprehensive result plots."""
        plt.figure(figsize=(15, 10))
        
        # Plot correlation scaling
        scales = list(self.results['correlation']['scaling'].keys())
        corrs = list(self.results['correlation']['scaling'].values())
        
        plt.subplot(2, 1, 1)
        plt.plot(scales, corrs, 'b-')
        plt.title('Correlation vs Sample Size')
        plt.xlabel('Sample Size')
        plt.ylabel('Correlation')
        plt.grid(True)
        
        # Plot special number results
        numbers = list(self.results['primality'].keys())
        invariants = [self.results['primality'][n]['invariant'] for n in numbers]
        
        plt.subplot(2, 1, 2)
        plt.bar(range(len(numbers)), invariants)
        plt.xticks(range(len(numbers)), numbers, rotation=45)
        plt.title('Structural Invariants for Special Numbers')
        plt.xlabel('Number')
        plt.ylabel('Invariant Value')
        plt.grid(True)
        
        plt.tight_layout()
        plt.savefig('prime/floor_prime_discovery/visualizations/verification_summary.png')
        plt.close()
    
    def print_summary(self):
        """Print comprehensive verification summary."""
        print("\nVerification Summary")
        print("=" * 50)
        
        print("\n1. Primality Testing")
        print("-" * 30)
        correct = sum(1 for r in self.results['primality'].values() if r['correct'])
        total = len(self.results['primality'])
        print(f"Accuracy: {correct}/{total} ({100*correct/total:.2f}%)")
        
        print("\n2. Spectral Correlation")
        print("-" * 30)
        print(f"Base correlation: {self.results['spectral']['correlation']:.6f}")
        
        print("\n3. Scaling Properties")
        print("-" * 30)
        for n, corr in self.results['correlation']['scaling'].items():
            print(f"n={n}: {corr:.6f}")
        
        print("\n4. Performance")
        print("-" * 30)
        print(f"Total verification time: {self.results['timing']['total']:.2f} seconds")
        
        print("\nVisualization saved as 'verification_summary.png'")

def main():
    """Run complete verification suite."""
    verifier = StructuralSpectralVerification()
    verifier.run_comprehensive_verification()
    verifier.print_summary()

if __name__ == "__main__":
    main()
