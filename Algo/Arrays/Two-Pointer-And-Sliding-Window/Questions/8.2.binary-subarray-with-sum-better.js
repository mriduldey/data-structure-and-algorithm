/**
 * Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.
930: Binary Subarrays With Sum

A subarray is a contiguous part of the array.

 

Example 1:

Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
Example 2:

Input: nums = [0,0,0,0,0], goal = 0
Output: 15
 

Constraints:

1 <= nums.length <= 3 * 104
nums[i] is either 0 or 1.
0 <= goal <= nums.length
 */

function binarySubArrWithLessThanEqualToSum(nums, goal) {
    if(goal < 0) {
        return 0;
    }
    let l = 0;
    let r = 0;
    let count = 0;
    let sum = 0;

    while (r < nums.length) {
        sum += nums[r];

        while (sum > goal) {
            sum -= nums[l];
            l++;
        }

        count += r - l + 1;
        r++;
    }
    return count;
}

function binarySubArrWithSum(nums, goal) {
    return binarySubArrWithLessThanEqualToSum(nums, goal) - binarySubArrWithLessThanEqualToSum(nums, goal - 1);
}

console.log(binarySubArrWithSum([1, 0, 1, 0, 1], 2)); // 4
console.log(binarySubArrWithSum([0, 0, 0, 0, 0], 0)); // 15
