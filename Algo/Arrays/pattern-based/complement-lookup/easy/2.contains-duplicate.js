/**
 * Contains Duplicate (LC 217)
1️⃣ Problem Description

Given an integer array nums, return:

true → if any value appears at least twice

false → if every element is distinct

This is a classic Hashing / Set membership problem.

2️⃣ Example
Example 1
Input:  nums = [1,2,3,1]
Output: true


Because 1 appears twice.

Example 2
Input:  nums = [1,2,3,4]
Output: false


All elements are unique.

Example 3
Input:  nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
 */

function containsDuplicate(nums) {
    const seenNums = new Set();

    for (const num of nums) {
        if (seenNums.has(num)) {
            return true;
        } else {
            seenNums.add(num);
        }
    }

    return false;
}

console.log(containsDuplicate([1, 2, 3, 6, 4, 5]))