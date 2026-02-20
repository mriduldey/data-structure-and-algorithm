/**
 * LC 349 — Intersection of Two Arrays
🔎 Problem Statement

Given two integer arrays nums1 and nums2, return an array of their intersection.

Each element in the result must be unique.

The result can be returned in any order.

📌 Example 1
Input:  nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Explanation:

Common element = 2

Even though 2 appears multiple times, result must contain it once.

📌 Example 2
Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]   (order may vary)

Common unique elements = {4, 9}
 */

function arrayIntersection(nums1, nums2) {
    if (nums1.length === 0 || nums2.length === 0) {
        return [];
    }

    const result = [];
    
    const nums1Set = new Set(nums1);

    for (const num of nums2) {
        if (nums1Set.has(num)) {
            result.push(num);
        }
    }

    return Array.from(new Set(result));
}

console.log(arrayIntersection([4, 9, 5], [9, 4, 9, 8, 4]));