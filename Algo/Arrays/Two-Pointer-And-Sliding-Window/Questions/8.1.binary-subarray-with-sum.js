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

function binarySubArrWithSum(nums, goal) {
    let count = 0;
    for(i = 0; i < nums.length; i++) {
        const bitCount = [0, 0]; // value in index 0 indicates count of 0, same for value in index 1 which denotes count of 1 
        for(j = i; j < nums.length; j++) {
            bitCount[nums[j]] += 1;
            
            if(bitCount[1] === goal) {
                count++;
            }
        }
    }

    return count;
}

console.log(binarySubArrWithSum([1,0,1,0,1], 2)); // 4
console.log(binarySubArrWithSum([0,0,0,0,0], 0)); // 15
