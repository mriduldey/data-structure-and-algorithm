/**
 * LC 219 — Contains Duplicate II
1️⃣ Problem Description

Given an integer array nums and an integer k, return true if there exist two distinct indices i and j such that:

nums[i] === nums[j]

|i - j| <= k

Otherwise, return false.

2️⃣ Example
Example 1
Input: nums = [1,2,3,1], k = 3
Output: true


Why?

nums[0] = 1

nums[3] = 1

Distance = |0 - 3| = 3

3 <= k, so return true

Example 2
Input: nums = [1,0,1,1], k = 1
Output: true


Indices 2 and 3 both have value 1
Distance = 1 → valid

Example 3
Input: nums = [1,2,3,1,2,3], k = 2
Output: false


Duplicates exist, but distance is always greater than 2.

3️⃣ Constraints (Important for FAANG)

1 <= nums.length <= 10^5

-10^9 <= nums[i] <= 10^9

0 <= k <= 10^5

This eliminates brute force O(n²).
 */

function containsDuplicate2(nums, k) {
    if(k <= 0) return false;

    const lastSeen = new Map();

    for(let i = 0; i < nums.length; i++) {
        const prevIndex = lastSeen.get(nums[i]);
        if(prevIndex !== undefined && (i - prevIndex <= k)) {
            return true;
        }

        lastSeen.set(nums[i], i);
    }

    return false;
}

console.log(containsDuplicate2([1, 1, 0, 1], 1))