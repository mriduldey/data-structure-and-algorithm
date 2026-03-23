/**
 * LC 268 — Missing Number
1. Description (with example)

Given an array nums containing n distinct numbers in range [0, n], return the only number missing from the array.

Example 1:

Input: nums = [3,0,1]
n = 3 → expected range = [0,1,2,3]

Missing number = 2

Example 2:

Input: nums = [0,1]
n = 2 → expected range = [0,1,2]

Missing number = 2

Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
n = 9 → expected range = [0..9]

Missing number = 8
2. Intuition

Core idea: one number is missing from a complete sequence

Optimal Approaches:
Sum Formula
Expected sum = n * (n + 1) / 2
Missing = expected − actual
XOR (Best for interviews)
a ^ a = 0, a ^ 0 = a
XOR all indices + nums → remaining = missing
Index marking / cyclic sort (in-place)
3. Edge Cases (ask interviewer)
Empty array → return 0
Single element [0] → return 1
Single element [1] → return 0
Missing number is:
0
n
Large n → check integer overflow (prefer XOR)
Input guarantee: distinct? (important)
 */

function missingNumberBasic(nums) {
  if (!nums) return null;

  const n = nums.length;
  if (n === 0) return 0;

  const expectedSum = (n * (n + 1)) / 2;

  let actualSum = 0;
  for (const num of nums) {
    actualSum += num;
  }

  return expectedSum - actualSum;
}

console.log(missingNumberBasic([])); // 0
console.log(missingNumberBasic([0])); // 1
console.log(missingNumberBasic([1])); // 0
console.log(missingNumberBasic([0, 1])); // 2
console.log(missingNumberBasic([0, 3, 2])); // 1
