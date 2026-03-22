/**
 * LC 136 — Single Number
1. Description (with example)

Given a non-empty integer array nums, every element appears twice except one. Find that single one.

Example:
Input: nums = [4,1,2,1,2]
Output: 4
How output is derived:
1 appears twice → cancels
2 appears twice → cancels
Only 4 remains → answer = 4
2. Intuition

👉 Key idea: XOR properties

a ^ a = 0 (same numbers cancel out)
a ^ 0 = a
XOR is commutative & associative

So:

4 ^ 1 ^ 2 ^ 1 ^ 2
= (1 ^ 1) ^ (2 ^ 2) ^ 4
= 0 ^ 0 ^ 4
= 4

👉 Hence, XOR all elements → result is the single number

3. Edge Cases (ask interviewer)
Minimum input: nums = [1]
Negative numbers: [-1, -1, -2]
Large array size (performance constraint)
Integer overflow concerns? (No issue with XOR)
Is it guaranteed exactly one unique element exists?
Can duplicates appear more than twice? (changes problem)
 */

function singleNumber(nums) {
  const n = nums.length;
  if (!nums || n === 0) return null;
  if (n === 1) return nums[0];

  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}

console.log(singleNumber([])); // null
console.log(singleNumber([1])); // 1
console.log(singleNumber([1, 2, 3, 4, 2, 3, 4, 1, 5, 6, 5])); // 6
