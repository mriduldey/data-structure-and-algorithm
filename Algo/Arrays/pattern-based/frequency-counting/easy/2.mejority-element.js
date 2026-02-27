/**
 * LC 169 — Majority Element
1️⃣ Problem Description

Given an integer array nums of size n, return the majority element.

A majority element is the element that appears more than ⌊n/2⌋ times.

You may assume that the majority element always exists.

Example 1
Input:  nums = [3,2,3]
Output: 3

n = 3 → ⌊3/2⌋ = 1
3 appears 2 times > 1 → majority = 3

Example 2
Input: nums = [2,2,1,1,1,2,2]
Output: 2

n = 7 → ⌊7/2⌋ = 3
2 appears 4 times > 3 → majority = 2
 */

function mejorityElement(nums) {
  const n = nums.length;
  if (n === 0) return null;
  if (n === 1) return nums[0];

  const map = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (const [num, count] of map) {
    if (count > Math.floor(n / 2)) {
      return num;
    }
  }

  return null;
}

console.log(
  mejorityElement([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 6, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 3, 4, 5, 1, 1, 1, 9, 9, 9, 9,
  ]),
);
