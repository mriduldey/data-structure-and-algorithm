/**
 * LC 1122 — Relative Sort Array
1. Problem Description (FAANG Context)

Relative Sort Array is a medium-level, pattern-based hashing + counting problem. It appears in interviews to test:

Custom sorting logic
Frequency counting
Order preservation using external constraints

Problem:
Given two arrays:

arr1 (to be sorted)
arr2 (defines order, all elements unique, subset of arr1)

Sort arr1 such that:

Elements in arr2 appear first, in the same order as arr2
Remaining elements appear in ascending order

Constraints (typical):

1 ≤ arr1.length, arr2.length ≤ 1000
0 ≤ arr1[i], arr2[i] ≤ 1000
All elements of arr2 are in arr1

Expected Complexity:

Time: O(n + k log k) or O(n + k) (counting sort)
Space: O(n)

Example:

arr1 = [2,3,1,3,2,4,6,7,9,2,19]
arr2 = [2,1,4,3,9,6]

Process:

Order from arr2 → [2,1,4,3,9,6]
Count in arr1:
2 → 3 times
1 → 1 time
4 → 1 time
3 → 2 times
9 → 1 time
6 → 1 time
Remaining → [7,19] → sorted → [7,19]

Output:

[2,2,2,1,4,3,3,9,6,7,19]
2. Intuition

Core idea:

Use frequency map (counting) for arr1
Traverse arr2 → place elements in required order
Remaining elements → collect + sort

Why this works:

Avoids comparator overhead
Ensures stable custom ordering
3. Edge Cases (Ask Interviewer)
Is arr2 guaranteed subset of arr1? (usually yes)
Can elements repeat? (yes)
Can values be large? → affects counting sort feasibility
What about empty arrays?
Negative numbers allowed?
 */

function relativeSortArray(arr1, arr2) {
  const result = [];
  // 1. Initialize buckets (size 1001 based on constraints 0-1000)
  const bucket = new Array(1001).fill(0);

  // 2. Fill the buckets with frequencies from arr1
  for (const num of arr1) {
    bucket[num]++;
  }

  // 3. First pass: Use arr2 to pull from buckets in specific order
  for (const num of arr2) {
    while (bucket[num] > 0) {
      result.push(num);
      bucket[num]--;
    }
  }

  // 4. Second pass: Iterate through the bucket array to get remaining elements
  // Since we start from 0 to 1000, they are naturally in ascending order
  for (let i = 0; i < bucket.length; i++) {
    while (bucket[i] > 0) {
      result.push(i);
      bucket[i]--;
    }
  }

  return result;
}

console.log(
  relativeSortArray([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6]),
); // [2,2,2,1,4,3,3,9,6,7,19]
