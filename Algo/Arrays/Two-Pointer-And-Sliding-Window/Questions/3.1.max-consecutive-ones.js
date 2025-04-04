/**
 * Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.
Leetcode 1004
 

Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
0 <= k <= nums.length
 */

// Finding the longest subarray with K Zeros


function longestOnes(nums, k) {
    let maxLen = 0;

    for (let i = 0; i < nums.length; i++) {
         let zeros = 0;
        for(let j = i; j < nums.length; j++) {
            if(nums[j] === 0) {
                zeros++;
            }

            if(zeros <= k) {
                maxLen = Math.max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }

    return maxLen;
}

console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // 6
console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3)); // 10
console.log(longestOnes([1,0,1,0,1,0,1], 2)); // 5
console.log(longestOnes([0,0,0,0,0], 2)); // 2
console.log(longestOnes([1,1,1,1,1], 2)); // 5
console.log(longestOnes([1,1,1,1,0], 2)); // 5
console.log(longestOnes([1,1,1,0,0], 2)); // 5
console.log(longestOnes([1,0,0,0,0], 2)); // 3
console.log(longestOnes([0,1,1,1,1], 2)); // 5
console.log(longestOnes([0,0,0,1,1], 2)); // 4
console.log(longestOnes([0,1,0,1,1], 2)); // 5