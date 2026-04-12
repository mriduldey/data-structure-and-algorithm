/**
 * LC 189 — Rotate Array
1. Problem Description (FAANG relevance: ⭐⭐⭐⭐ frequent)

Rotate an array nums to the right by k steps, where k ≥ 0.

Right rotation → elements shift right, last elements wrap to front
In-place preferred (very common FAANG constraint)
Constraints
1 ≤ nums.length ≤ 10^5
-2^31 ≤ nums[i] ≤ 2^31 - 1
0 ≤ k ≤ 10^5
Expected Complexity
Time: O(n)
Space: O(1) (optimal FAANG expectation)
Example
Input:  nums = [1,2,3,4,5,6,7], k = 3

Step-wise:
[1,2,3,4,5,6,7]
→ [5,6,7,1,2,3,4]

Output: [5,6,7,1,2,3,4]
2. Intuition

Key idea:
👉 Rotation = reversal operations

Break into 3 steps:

Reverse entire array
Reverse first k elements
Reverse remaining n-k elements
Original:  [1,2,3,4,5,6,7]
Reverse:   [7,6,5,4,3,2,1]
First k:   [5,6,7,4,3,2,1]
Rest:      [5,6,7,1,2,3,4]

Why works:

Reversal reorders chunks efficiently without extra space
3. Edge Cases (Ask interviewer)
k > n → should we mod? (k = k % n)
k == 0 → no change
n == 1
Negative numbers? (irrelevant to logic)
Empty array? (usually not given but confirm)
 */

function reverseArray(arr, k) {
  const n = arr.length;
  if (k > n) k = k % n;
  if (n === 1) return arr;

  // reverse whole array
  reverse(arr, 0, n - 1);

  // reverse only first k
  reverse(arr, 0, k - 1);

  // reverse only remaining
  reverse(arr, k, n - 1);

  return arr;
}

function reverse(arr, start, end) {
  if (start === end) return;
  const mid = start + Math.floor((end - start) / 2);
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++;
    end--;
  }
}

console.log(reverseArray([1], 5));
console.log(reverseArray([1, 2, 3], 5));
console.log(reverseArray([1, 2, 3, 4, 5, 6, 7], 3));
