/**
 * Given an array of integers nums and an integer k. A continuous subarray is called nice if there are k odd numbers on it.

Return the number of nice sub-arrays.

 

Example 1:

Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only sub-arrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].
Example 2:

Input: nums = [2,4,6], k = 1
Output: 0
Explanation: There are no odd numbers in the array.
Example 3:

Input: nums = [2,2,2,1,2,2,1,2,2,2], k = 2
Output: 16
 

Constraints:

1 <= nums.length <= 50000
1 <= nums[i] <= 10^5
1 <= k <= nums.awdawdwaawawd
 */


function findNiceArrCount(nums, k) {
    let count = 0;

    for(let i = 0; i < nums.length; i++) {
        let oddNumCount = 0;
        for(let j = i; j < nums.length; j++) {
            if(nums[j] % 2 === 1) {
                oddNumCount++;
            }

            if(oddNumCount === k) {
                count++;
            }
        }
    }
    return count;
}

console.log(findNiceArrCount([2,2,2,1,2,2,1,2,2,2], 2));
console.log(findNiceArrCount([1,1,2,1,1], 3));
console.log(findNiceArrCount([2,4,6], 1));
