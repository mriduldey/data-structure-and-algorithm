/**
 * LC 350 — Intersection of Two Arrays II
1. Problem Description (FAANG Context)

LC 350 — Intersection of Two Arrays II is a very common FAANG-level problem under Arrays + Hashing / Two Pointers. It tests frequency counting, memory optimization, and handling duplicates.

Problem Statement

Given two integer arrays nums1 and nums2, return an array of their intersection such that:

Each element appears as many times as it shows in both arrays
Order of result does not matter
Constraints (Typical)
===============================================================================================================================
1 <= nums1.length, nums2.length <= 10^5
-10^9 <= nums[i] <= 10^9 // as this is bucket we will assume range is much smaller and only positive ( 1 to 1000)
===============================================================================================================================
Expected Complexity
Time: O(n + m) (hash map approach)
Space: O(min(n, m))
Example
nums1 = [1,2,2,1]
nums2 = [2,2]

Output = [2,2]
How output is formed
2 appears twice in both → include twice
1 appears once in nums1 but not in nums2 → ignore
2. Intuition

Core idea: match frequencies, not just presence

Approach 1 — HashMap (Best for unsorted arrays)
Count frequency of smaller array
Traverse second array
Reduce count when match found
Approach 2 — Two Pointers (Sorted arrays)
Sort both arrays
Use pointer comparison like merge step
3. Edge Cases (Ask Interviewer)

Only ask relevant ones:

Are arrays sorted or unsorted?
Can we modify input arrays?
Can result be returned in any order?
What if one array is extremely large and stored on disk?
What about duplicate-heavy inputs?
Negative numbers allowed?
 */

function arrayIntersectionNonQunique(nums1, nums2) {
  if (!nums1 || !nums2) return null;
  if (nums1.length === 0 || nums2.length === 0) return [];

  const bucket = new Uint8Array(1001);
  const result = [];

  for (const num of nums1) {
    bucket[num] = 1;
  }

  for (const num of nums2) {
    if (bucket[num] === 1) {
      result.push(num);
    }
  }

  return result;
}

console.log(arrayIntersectionNonQunique([2, 3, 2, 3, 4, 5], [2, 4, 2]));
