/**
 * LC 1481 — Least Number of Unique Integers After K Removals
1. Problem Description (FAANG Context)

LC 1481 — Least Number of Unique Integers After K Removals is a frequent FAANG-level greedy + hashing problem. It tests:

Frequency counting (HashMap)
Greedy optimization
Sorting / Heap decision making
Problem

Given an integer array arr and integer k, remove exactly k elements such that the number of unique integers remaining is minimized.

Constraints (typical)
1 ≤ arr.length ≤ 10^5
1 ≤ arr[i] ≤ 10^9
0 ≤ k ≤ arr.length
Expected Complexity
Time: O(n log n) (sorting freq) OR O(n log n) (heap)
Space: O(n) (frequency map)
Example
arr = [5,5,4], k = 1

Step 1: Frequency Map

5 → 2
4 → 1

Step 2: Remove smallest frequency first

Remove 4 (freq = 1, uses k=1)

Remaining unique = 1 (only 5)

Output = 1

2. Intuition (Core Insight)

This is a pure greedy problem:

To minimize unique integers → remove numbers with smallest frequency first

Why?

Removing 1 occurrence of a unique element (freq=1) eliminates 1 unique integer
Removing part of a large freq element doesn’t reduce uniqueness until fully removed
Strategy
Count frequencies
Sort frequencies (ascending)
Remove from smallest until k exhausted
3. Edge Cases (Ask Interviewer)

Only ask meaningful clarifications:

Can k == 0? → return original unique count
Can k >= arr.length? → return 0
Are negative numbers allowed? (doesn’t affect logic)
Is array guaranteed non-empty?
Do we need to return remaining elements or just count?
 */

function leastUniqueInts(arr, k) {
  const freq = new Map();
  for (const n of arr) {
    freq.set(n, (freq.get(n) || 0) + 1);
  }

  const bucket = new Array(arr.length + 1).fill(0);

  for(const f of freq.values()) {
    bucket[f]++;
  }

  let unique = freq.size;

  for(let i = 1; i < arr.length; i++) {
    while(bucket[i] > 0 && k >= i) {
        k -= i;
        bucket[i]--;
        unique--;
    }
  }

  return unique;
}


console.log(leastUniqueInts([5, 5, 4, 4, 8, 8, 5], 4));
