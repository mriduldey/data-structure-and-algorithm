// Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [-1,0,3,5,9,12], target = 9
// Output: 4
// Explanation: 9 exists in nums and its index is 4
// Example 2:

// Input: nums = [-1,0,3,5,9,12], target = 2
// Output: -1
// Explanation: 2 does not exist in nums so return -1

// Constraints:

// 1 <= nums.length <= 104
// -104 < nums[i], target < 104
// All the integers in nums are unique.
// nums is sorted in ascending order.

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const binarySearch = (nums, start, end, target) => {
    if (start <= end) {
      const mid = start + Math.floor((end - start) / 2);

      if (nums[mid] === target) {
        return mid;
      }

      if (nums[mid] > target) {
        return binarySearch(nums, start, mid - 1, target);
      }

      return binarySearch(nums, mid + 1, end, target);
    }

    return -1;
  };
  const len = nums.length;
  return binarySearch(nums, 0, len - 1, target);
};

/**
 * We are playing the Guess Game. The game is as follows:

I pick a number from 1 to n. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
0: your guess is equal to the number I picked (i.e. num == pick).
Return the number that I picked.

Example 1:

Input: n = 10, pick = 6
Output: 6
Example 2:

Input: n = 1, pick = 1
Output: 1
Example 3:

Input: n = 2, pick = 1
Output: 1

Constraints:

1 <= n <= 231 - 1
1 <= pick <= n
*/

/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
var guessNumber = function (n) {
  const guessedNum = (start, end) => {
    if (start <= end) {
      const mid = Math.floor((start + end) / 2);

      if (guess(mid) === 0) {
        return mid;
      }

      if (guess(mid) === -1) {
        return guessedNum(start, mid - 1);
      }

      return guessedNum(mid + 1, end);
    }

    return -1;
  };

  return guessedNum(1, n);
};
