/**
 * LC 349 — Intersection of Two Arrays

Very common Arrays + Hashing problem in FAANG interviews. Tests set usage, deduplication, intersection operations, optimization discussion. Usually asked as Easy, but follow-ups increase difficulty.

1. Problem Description

Given two integer arrays nums1 and nums2, return unique common elements present in both arrays.

Result order does not matter.

Common constraints
1 <= nums1.length, nums2.length <= 1000+
0 <= nums[i] <= 1000+
Duplicates may exist
Output must contain UNIQUE values only
Expected complexity

Optimal:

Time: O(n + m)
Space: O(n)

where:

n = nums1.length
m = nums2.length
Example
nums1 = [1,2,2,1]
nums2 = [2,2]

Processing:

Set(nums1) = {1,2}

Check nums2:

2 → present → add to result set

Final = [2]

Output:

[2]

Example 2:

nums1=[4,9,5]
nums2=[9,4,9,8,4]

Intersection:
4 common
9 common

Output:
[4,9]
2. Intuition

Duplicates do not matter.

Need:

existence checking + uniqueness

HashSet gives:

lookup → O(1)
unique storage → automatic

Flow:

Build set from smaller array
↓

Traverse other array
↓

If found → insert into result set
3. Edge Cases (Ask Interviewer)
1. Empty arrays?
nums1=[]
nums2=[1]

Return:

[]
2. Duplicates?
[1,1,1]
[1]

Expected:

[1]

NOT:

[1,1,1]
3. Order important?

Usually:

NO
4. Large memory constraints?

May require:

sorting + two pointers
binary search
stream processing
 */

function intersectionOfArray(nums1, nums2) {
  if (nums1.length === 0 || nums2.length === 0) return [];

  // Optimise memory for set creation
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const set1 = new Set(nums1);

  const commonSet = new Set();

  for (const num of nums2) {
    if (set1.has(num)) {
      commonSet.add(num);
    }
  }

  return Array.from(commonSet);
}

console.log(intersectionOfArray([1, 2, 3, 2, 6], [2, 4, 3, 6, 7]));
