/**
 * 🔹 Two Sum
🧩 Problem Description

Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target.

Constraints:

Exactly one valid solution exists.

You may not use the same element twice.

Return indices in any order.

📘 Example
Input:  nums = [2,7,11,15], target = 9
Output: [0,1]

Explanation:
nums[0] + nums[1] = 2 + 7 = 9


Another:

Input: nums = [3,2,4], target = 6
Output: [1,2]
 */

function twoSum(nums, target) {
    const hash = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (hash.has(target - nums[i])) {
            return [hash.get(target - nums[i]), i];
        }

        hash.set(nums[i], i);
    }

    return [];
}

console.log(twoSum( [2,7,11,15], 9))