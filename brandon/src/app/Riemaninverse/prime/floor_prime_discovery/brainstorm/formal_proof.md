# Formal Proof of the Structural Invariant Primality Theorem

## Theorem Statement

**Theorem**: A positive integer n > 1 is prime if and only if the multiplicative group (Z/nZ)* contains elements of order n-1, and the count of such elements equals φ(n-1).

To establish this as a global property rather than a conjecture, we must prove both directions of the if and only if statement.

## Preliminaries

Let's establish the necessary background:

- For any integer n > 1, the set (Z/nZ)* consists of equivalence classes [a] where gcd(a,n) = 1
- The order of an element [a] in (Z/nZ)* is the smallest positive integer k such that a^k ≡ 1 (mod n)
- φ(m) denotes Euler's totient function, counting the number of integers from 1 to m that are coprime to m

## Part 1: If n is prime, then (Z/nZ)* contains exactly φ(n-1) elements of order n-1

Let n = p be a prime number.

1. For a prime p, (Z/pZ)* is a cyclic group of order p-1.
   - This is a well-established result in number theory

2. In a cyclic group of order m, for each divisor d of m, there are exactly φ(d) elements of order d.
   - This is a fundamental property of cyclic groups

3. Since (Z/pZ)* is cyclic of order p-1, the number of elements with order exactly p-1 equals φ(p-1).
   - Applying the property from step 2 with m = p-1 and d = p-1

Therefore, if n is prime, then (Z/nZ)* contains exactly φ(n-1) elements of order n-1.

## Part 2: If (Z/nZ)* contains φ(n-1) elements of order n-1, then n is prime

We will prove this by contraposition: If n is not prime, then (Z/nZ)* does not contain φ(n-1) elements of order n-1.

Let n be a composite number, n > 1.

1. Since n is composite, it can be written as n = ab where 1 < a, b < n.

2. For any element [x] in (Z/nZ)*, we will show that its order cannot be n-1.

3. By the Chinese Remainder Theorem, if n = p₁^a₁ × p₂^a₂ × ... × pₖ^aₖ is the prime factorization of n, then:
   (Z/nZ)* ≅ (Z/p₁^a₁Z)* × (Z/p₂^a₂Z)* × ... × (Z/pₖ^aₖZ)*

4. The order of the group (Z/nZ)* equals φ(n) = n × ∏(1-1/p) for all primes p dividing n.
   - This is strictly less than n-1 for any composite n > 4
   - For n = 4, the order is φ(4) = 2, which is less than 4-1 = 3

5. Since the order of any element must divide the order of the group, and φ(n) < n-1 for composite n, no element can have order n-1.

6. Therefore, if (Z/nZ)* contains elements of order n-1, then n must be prime.

## Special Case: Carmichael Numbers

Carmichael numbers deserve special attention as they satisfy a^(n-1) ≡ 1 (mod n) for all a coprime to n.

1. For a Carmichael number n, the order of any element in (Z/nZ)* divides n-1.

2. However, we can prove that no element actually has order exactly n-1:
   - By the Chinese Remainder Theorem, the order of any element is the LCM of its orders in each prime-power component
   - For any Carmichael number, this LCM is always strictly less than n-1

3. Therefore, even Carmichael numbers fail to have elements of order n-1 in (Z/nZ)*.

## Proof by Structural Invariant

We can reformulate this proof in terms of the structural invariant:

1. Define the structural invariant I(n) as:
   - I(n) = φ(n-1)/(n-1) if there exist elements of order n-1 in (Z/nZ)*
   - I(n) = 0 otherwise

2. From Parts 1 and 2, we have established that:
   - If n is prime, then I(n) = φ(n-1)/(n-1) > 0
   - If n is composite, then I(n) = 0

3. Therefore, I(n) > 0 if and only if n is prime.

## Conclusion

We have formally established that a positive integer n > 1 is prime if and only if the multiplicative group (Z/nZ)* contains exactly φ(n-1) elements of order n-1. This is equivalent to saying that the structural invariant I(n) equals φ(n-1)/(n-1) if and only if n is prime.

This proves that the Structural Invariant Primality Theorem is a global property of integers, not merely a conjecture or a property that holds for a limited range of numbers. 