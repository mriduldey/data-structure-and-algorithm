/**
 * LC 283 — Move Zeroes
1. Description

Move Zeroes is a very high-frequency FAANG problem (Google, Amazon, Meta). It tests two-pointer optimization + in-place array transformation.

Problem:
Given an integer array nums, move all 0s to the end while maintaining the relative order of non-zero elements. Do it in-place.

Constraints (typical):

1 ≤ n ≤ 10^5
-2^31 ≤ nums[i] ≤ 2^31 - 1

Expected Complexity:

Time: O(n)
Space: O(1) (strictly in-place)

Example:
Input: [0,1,0,3,12]
Output: [1,3,12,0,0]

How output comes:

Extract non-zero in order → [1,3,12]
Fill remaining with zero → [1,3,12,0,0]
2. Intuition

Core idea: stable compaction

Maintain a pointer insertPos → where next non-zero should go
Iterate array:
If element ≠ 0 → place it at insertPos, increment pointer
After traversal → fill remaining indices with 0

👉 Equivalent view:

Left side → compacted non-zero region
Right side → zeros

This is essentially in-place stable partitioning

3. Edge Cases (ask interviewer)
All elements are 0 → [0,0,0]
No zero present → [1,2,3]
Single element → [0], [5]
Already optimal → [1,2,0,0]
Negative numbers → valid (non-zero)
Large input (performance check)
 */

function moveZero(nums) {
  if (!nums || nums.length === 0) return [];

  let insertPos = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos++] = nums[i];
    }
  }

  while (insertPos < nums.length) {
    nums[insertPos++] = 0;
  }

  return nums;
}

console.log(moveZero([]));
console.log(moveZero([0, 1, 0, 3, 12, -4, 1, 0]));
console.log(moveZero([1, 2, 0, 0]));
console.log(moveZero([0, 1, 0, 3, 12]));
