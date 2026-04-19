/**
 * LC 347 — Top K Frequent Elements
1. Problem Description (FAANG relevance: VERY HIGH 🔥)

Given an integer array nums and an integer k, return the k most frequent elements.

Order does not matter
Must be better than O(n log n) (sorting is not optimal)
Constraints
1 ≤ nums.length ≤ 10^5
-10^4 ≤ nums[i] ≤ 10^4
k is valid (1 ≤ k ≤ unique elements)
Expected Complexity
Time: O(n) (ideal) or O(n log k)
Space: O(n)
Example
nums = [1,1,1,2,2,3], k = 2

Step-by-step

Frequency map:

1 → 3
2 → 2
3 → 1
Top 2 frequent → [1,2]
2. Intuition

Core idea = frequency + efficient extraction of top k

Approach Options
Min Heap (Top K pattern) → O(n log k)
Bucket Sort (Optimal) → O(n) ✅ (most expected in FAANG)
Quick Select → advanced, O(n) average

3. Edge Cases (ask interviewer)
k == number of unique elements
All elements same
Negative numbers present
Large input (10^5) → performance constraint
Multiple elements with same frequency
Output order requirement? (important)
 */

function topKFreq(nums, k) {
  if (!nums || nums.length === 0) return [];
  if (k === 0) return [];
  if (k <= 0) return null;

  const freq = new Map();
  for (const num of nums) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const buckets = new Array(nums.length + 1).fill([]).map(() => []);
  for (const [num, count] of freq.entries()) {
    buckets[count].push(num);
  }

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length <= k; i--) {
    for (const num of buckets[i]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }

  return result;
}

console.log(
  topKFreq([5, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 3], 2),
);
