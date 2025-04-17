/**
 *Leetcode 992: subarray-with-k-different-integers.js

 * Given an integer array nums and an integer k, return the number of good subarrays of nums.

A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
Example 2:

Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 

Constraints:

1 <= nums.length <= 2 * 104
1 <= nums[i], k <= nums.length

 */

function subArrWithNumLessOrEqK(nums, k) {
    let l = 0;
    let r = 0;
    const numCountMap = new Map();
    let count = 0;
    while (r < nums.length) {
        const numCount = numCountMap.has(nums[r]);
        if (numCount) {
            numCountMap.set(nums[r], numCount + 1)
        } else {
            numCountMap.set(nums[r], 0);
        }
        while (numCountMap.size > k) {
            const numCount = numCountMap.get(nums[l]);
            if (numCount) {
                numCountMap.set(nums[l], numCount - 1);
            }
            if (numCountMap.get(nums[l]) === 0) {
                numCountMap.delete(nums[l]);
            }
            l++;
        }
        count += r - l + 1;
        r++;
    }

    return count;
}

function subArrWithKDistinctDigit(nums, k) {
    return subArrWithNumLessOrEqK(nums, k) - subArrWithNumLessOrEqK(nums, k - 1);
}

console.log(subArrWithKDistinctDigit([1, 2, 1, 2, 3], 2)); // 7
console.log(subArrWithKDistinctDigit([1, 2, 1, 3, 4], 3)); // 3
console.log(subArrWithKDistinctDigit([1, 1, 1, 1, 1], 2)); // 0
