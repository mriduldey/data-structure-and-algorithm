/**
 * LC 202 — Happy Number (Cycle Detection via Set)
1️⃣ Problem Description

Given an integer n, determine whether it is a happy number.

A number is happy if:

Replace the number by the sum of the squares of its digits.

Repeat the process.

If it eventually becomes 1 → return true.

If it enters a cycle that does not include 1 → return false.

Example 1
Input: n = 19

Process:

19  →  1² + 9²  = 1 + 81 = 82
82  →  8² + 2²  = 64 + 4 = 68
68  →  6² + 8²  = 36 + 64 = 100
100 →  1² + 0² + 0² = 1

Since it reaches 1, output:

true
Example 2
Input: n = 2

Sequence:

2 → 4 → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 ...

It cycles at 4, never reaching 1.

Output:

false
2️⃣ Intuition

This is a cycle detection problem on a deterministic transformation.

Each number produces exactly one next number.

Two possibilities:

It reaches 1

It enters a cycle

Since values eventually shrink to ≤ 243 (max for 3-digit sum of squares), infinite growth is impossible → must cycle.

We detect cycle using:

HashSet (explicit cycle detection)
OR

Floyd’s Cycle Detection (slow & fast pointers)

Time Complexity: O(log n) per iteration
Space: O(log n) for set approach

3️⃣ Edge Cases to Clarify in Interview

Ask interviewer:

Can input be negative?

Can input be 0?

Max integer range? (32-bit safe?)

Should we optimize space?

Can we mutate input?

Is recursion allowed?

Edge cases to handle:

n = 1

n = 0

Negative numbers

Very large number

Repeated cycles
 */

function isHappyNumber(n) {
    if (n <= 0) return false;

    const seen = new Set();

    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = nextNum(n);
    }

    return n === 1;
}

function nextNum(n) {
    let sum = 0;
    while (n > 0) {
        const digit = n % 10;
        sum += digit * digit;
        n = Math.floor(n / 10);
    }

    return sum;
}

console.log(isHappyNumber(4));



