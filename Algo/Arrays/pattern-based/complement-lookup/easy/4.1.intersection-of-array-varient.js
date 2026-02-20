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




 * 🏆 FAANG Interview Discussion
Follow-up 1:

What if arrays are sorted?

You can use two pointers (O(1) extra space).

Follow-up 2:

What if memory is limited?

Sort both arrays → use two-pointer technique.
 */

/**
 * 
 * @param {*} nums1 sorted
 * @param {*} nums2 sorted
 * @returns 
 */
function intersectionOfArray(nums1, nums2) {
    if (!nums1 || !nums2 || nums1.length === 0 || nums2 === 0) {
        return [];
    }

    const results = new Set();

    for (let i = 0, j = 0; i < nums1.length, j < nums2.length;) {
        if (nums1[i] === nums2[j]) {
            results.add(nums1[i]);
            i++;
            j++;
        } else if (nums1[i] < nums2[j]) {
            i++;
        } else {
            j++;
        }
    }

    return Array.from(results);
}

console.log(intersectionOfArray([4, 5, 9], [4, 4, 8, 9, 9]));
