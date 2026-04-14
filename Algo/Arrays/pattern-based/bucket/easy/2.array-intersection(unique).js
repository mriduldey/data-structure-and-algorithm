/**
 * LC 349 — Intersection of Two Arrays
1. Problem Description (FAANG Context)

LC 349 — Intersection of Two Arrays is a very common FAANG interview problem used to test:

Hashing fundamentals
Set operations
Ability to remove duplicates efficiently
Problem Statement

Given two integer arrays nums1 and nums2, return an array of their intersection.
Each element in the result must be unique, and you may return the result in any order.

Constraints
1 <= nums1.length, nums2.length <= 1000 (can be larger in FAANG variants)
0 <= nums[i] <= 1000 (sometimes extended to large ranges)
Expected Complexity
Time: O(n + m)
Space: O(n)
Example
nums1 = [1,2,2,1]
nums2 = [2,2]

Output: [2]
How output is formed
Unique elements:
nums1 → {1,2}
nums2 → {2}
Intersection → {2}
2. Intuition

Core idea:
👉 Use set for deduplication + O(1) lookup

Steps:

Convert one array into a set
Traverse the second array
Check membership in set
Store result in another set (to ensure uniqueness)

Why set?

Eliminates duplicates automatically
Constant time lookup
3. Edge Cases (Ask Interviewer)

Only relevant ones:

❓ Are duplicates allowed in output? (No → unique only)
❓ Can arrays be empty?
❓ Are numbers sorted? (affects approach)
❓ Can numbers be negative / large range?
❓ Memory constraints? (forces two-pointer approach)
 */

function arrayIntersection(nums1, nums2) {
  if (!nums1 || !nums2) return null;
  if (nums1.length === 0 || nums2.length === 0) return [];

  const bucket = new Array(1001).fill(0);
  const result = [];

  for (const num of nums1) {
    bucket[num] = 1;
  }

  for (const num of nums2) {
    if (bucket[num] === 1) {
      result.push(num);
      bucket[num] = 0;
    }
  }

  return result;
}

console.log(arrayIntersection([2, 3, 2, 3], [2, 2]));