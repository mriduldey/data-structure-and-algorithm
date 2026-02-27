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

// Using Boyer Moore -- use this in interview - O(1) space unlike 2.majority-element.js where hasmap is used
function majorityElementBetter(nums) {
    if(!nums || nums.length === 0) return null;

    let candidate = null;
    let count = 0;

    for(const num of nums) {
        if(count === 0) {
            candidate = num;
        }

        count += num === candidate ? 1 : -1
        console.log('->', candidate, count);
    }

    // // verification pass when majority not guranteed
    // count = 0;
    // for (let num of nums) {
    //     if (num === candidate) count++;
    // }

    // return count > Math.floor(nums.length / 2) ? candidate : null;

    return candidate;
} 

console.log(
  majorityElementBetter([
    1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 6, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9,
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 3, 4, 5, 1, 1, 1, 9, 9, 9, 9,
  ]),
);