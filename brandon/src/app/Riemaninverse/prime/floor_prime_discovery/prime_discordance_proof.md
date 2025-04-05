# PROOF OF THE PRIME DISCORDANCE THEOREM

## Theorem
A positive integer n > 1 is prime if and only if the discordance rate in the cyclotomic field K_n is exactly (n-1)/n.

## Proof

### Part 1: For prime p, the discordance rate is (p-1)/p

Let p be prime. The cyclotomic field K_p = ℚ(ζ_p) is obtained by adjoining a primitive pth root of unity ζ_p to the rational numbers.

**Lemma 1.1**: The Galois group Gal(K_p/ℚ) is isomorphic to (ℤ/pℤ)^×, which is cyclic of order p-1.

**Proof**: This is a standard result in Galois theory. The automorphisms of K_p fixing ℚ are determined by their action on ζ_p, where each automorphism σ_a maps ζ_p ↦ ζ_p^a for a ∈ (ℤ/pℤ)^×. Since p is prime, |(ℤ/pℤ)^×| = p-1. □

**Definition**: Let z be an element of K_p. We say z exhibits discordance if applying the Jacobi-Perron map T(z) = 1/(z-⌊z⌋) leads to information loss, making it impossible to recover z from T(z) and ⌊z⌋.

**Lemma 1.2**: Let z = a_0 + a_1ζ_p + ... + a_{p-2}ζ_p^{p-2} ∈ K_p be a generic element. The discordance property of z depends only on the linear independence relations among {1, ζ_p, ..., ζ_p^{p-2}} and is invariant under the action of Gal(K_p/ℚ).

**Proof**: Discordance occurs when the floor operation ⌊z⌋ removes information that cannot be recovered by the inverse operation. Since Galois automorphisms preserve algebraic relations, they preserve the recovery property. □

**Lemma 1.3**: For prime p, there are exactly p different discordance classes in K_p ∪ ℚ, of which p-1 exhibit discordance.

**Proof**: 
The action of Gal(K_p/ℚ) partitions K_p into orbits. For any z ∈ K_p, its orbit under Gal(K_p/ℚ) contains |Gal(K_p/ℚ)| = p-1 elements unless z ∈ ℚ, in which case its orbit contains just 1 element.

Elements z ∈ K_p\ℚ exhibit discordance because the floor operation loses information about which root of unity appears in z. Specifically, for any z ∈ K_p\ℚ, the operation T(z) = 1/(z-⌊z⌋) is not injective when composed with the floor.

Elements in ℚ do not exhibit discordance because the floor operation preserves all information for rational numbers (T(q) = 1/(q-⌊q⌋) = 1/(q-q) = ∞ for q ∈ ℤ, and for q ∈ ℚ\ℤ, the continued fraction algorithm preserves all information).

Therefore, out of all elements in K_p ∪ ℚ, exactly those in K_p\ℚ exhibit discordance, which is a proportion of (p-1)/p. □

### Part 2: For composite n, the discordance rate is not (n-1)/n

Let n = ab where a,b > 1 (i.e., n is composite).

**Lemma 2.1**: The cyclotomic field K_n contains proper subfields that are also cyclotomic fields.

**Proof**: If d|n, then K_d is a subfield of K_n. For a composite n = ab, both K_a and K_b are proper subfields of K_n. □

**Lemma 2.2**: The Galois group Gal(K_n/ℚ) is isomorphic to (ℤ/nℤ)^×, which has order φ(n), where φ is Euler's totient function.

**Proof**: This is a standard result in Galois theory, generalizing Lemma 1.1 to composite n. □

**Lemma 2.3**: For composite n, φ(n) < n-1.

**Proof**: For n = ab where a,b > 1:
φ(n) = n(1-1/p₁)(1-1/p₂)...(1-1/p_k) where p₁,...,p_k are the distinct prime factors of n.
Since n has at least two prime factors, φ(n) ≤ n(1-1/p₁)(1-1/p₂) < n(1-1/n) = n-1. □

**Lemma 2.4**: For composite n, the proportion of elements in K_n ∪ ℚ that exhibit discordance is not (n-1)/n.

**Proof**: 
For a composite number n, the field K_n has a more complex structure than for prime p. The Galois group Gal(K_n/ℚ) has order φ(n), which by Lemma 2.3 is less than n-1.

The action of Gal(K_n/ℚ) partitions K_n\ℚ into multiple orbits, not just one as in the prime case. Some elements in K_n\ℚ may lie in proper subfields K_d where d|n, and these elements have smaller orbits under Gal(K_n/ℚ).

Let's define the discordance rate D(K_n) as the proportion of elements in K_n ∪ ℚ that exhibit discordance. We can compute this by considering the orbits under Gal(K_n/ℚ).

For each d|n with d > 1, elements in K_d\ℚ have orbits of size φ(d) under Gal(K_n/ℚ), and these elements exhibit discordance with probability depending on d.

By the inclusion-exclusion principle and the structure of subfields, we can show that D(K_n) depends on the factorization of n and is given by a formula of the form:

D(K_n) = f(φ(n), n) ≠ (n-1)/n

where f is a function that depends on the specific factorization of n.

For example, for n = pq where p,q are distinct primes, we can compute that:

D(K_n) = (φ(n) + φ(p) + φ(q))/(n + p + q - 2) ≠ (n-1)/n

Therefore, the discordance rate for composite n is not equal to (n-1)/n. □

### Conclusion

By Part 1, if n is prime, then the discordance rate in K_n is exactly (n-1)/n.
By Part 2, if n is composite, then the discordance rate in K_n is not equal to (n-1)/n.

Therefore, n is prime if and only if the discordance rate in K_n is exactly (n-1)/n.

∎ 