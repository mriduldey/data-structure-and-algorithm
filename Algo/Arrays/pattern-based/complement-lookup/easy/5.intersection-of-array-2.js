/**
 * LC 350 — Intersection of Two Arrays II
1️⃣ Problem Description

Given two integer arrays nums1 and nums2, return their intersection, including duplicates.

Each element in the result must appear as many times as it shows in both arrays.

Order of result does not matter.

Example 1
nums1 = [1,2,2,1]
nums2 = [2,2]

Output: [2,2]

Why?

2 appears twice in both arrays.

Minimum frequency = 2 → include 2 twice.

Example 2
nums1 = [4,9,5]
nums2 = [9,4,9,8,4]

Output: [4,9] (or [9,4])

Why?

4 appears once in nums1 and twice in nums2 → min = 1

9 appears once in nums1 and twice in nums2 → min = 1

5 not in nums2 → ignore
 */

function intersectionOfArray2(nums1, nums2) {
    if (!nums1 || !nums2 || !nums1.length || !nums2.length) {
        return []
    }


    if (nums1.length > nums2.length) {
        intersectionOfArray2(nums2, nums1);
    }

    let map = new Map();
    for (const num of nums1) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    const result = [];
    for (const num of nums2) {
        if (map.has(num) && map.get(num) > 0) {
            result.push(num);
            map.set(num, map.get(num) - 1);
        }
    }

    return result;
}

console.log(intersectionOfArray2([2], [2, 2]));