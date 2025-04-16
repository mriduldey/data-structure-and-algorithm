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


function findOddLessOrEqToK(nums, k) {
    let l = 0;
    let r = 0;
    let count = 0;
    let oddCount = 0;

    while(r < nums.length) {
        if(nums[r] % 2 === 1) {
            oddCount++        
        }
        
        while(oddCount > k) {
            if(nums[l] % 2 === 1) {
                oddCount--;
            }
            l++;
        }
        count += r - l + 1;
        r++;
    }
    return count;
}

function findNiceArrCountBetter(nums, k) {
    return findOddLessOrEqToK(nums, k) - findOddLessOrEqToK(nums, k - 1); 
}

console.log(findNiceArrCountBetter([2,2,2,1,2,2,1,2,2,2], 2));
console.log(findNiceArrCountBetter([1,1,2,1,1], 3));
console.log(findNiceArrCountBetter([2,4,6], 1));
