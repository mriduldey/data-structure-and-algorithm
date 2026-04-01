/**
 * LC 268 — Missing Number (Very High Frequency in FAANG Interviews)
1. Problem Description

Given an array nums containing n distinct numbers in the range [0, n], return the only number missing from the array.

Why important
Classic array + hashing + math optimization problem
Tests multiple approaches: hashing, sorting, XOR, math
Very frequently asked in FAANG (especially as warm-up or optimization follow-up)
Constraints
n == nums.length
1 <= n <= 10^5
0 <= nums[i] <= n
All elements are unique
Expected Complexity (FAANG level)
Time: O(n)
Space: O(1) (optimal solution expected)
Example
Input: nums = [3, 0, 1]
Range should be: [0,1,2,3]

Missing = 2
Input: nums = [0,1]
Range: [0,1,2]

Missing = 2
2. Intuition

There are 4 main approaches, but FAANG expects optimization:

Brute (Sorting)
Sort and check mismatch
❌ O(n log n)
Hash Set
Store all elements, check missing
❌ O(n) space
Optimal 1: Sum Formula
Expected sum = n * (n + 1) / 2
Actual sum = sum(nums)
Missing = difference
Optimal 2 (Best): XOR

Key property:

a ^ a = 0
a ^ 0 = a

XOR all indices and numbers → remaining = missing number

3. Edge Cases (Ask Interviewer)
Empty array? (usually not given)
Missing = 0? → [1,2,3]
Missing = n? → [0,1,2]
Large n → overflow concern in sum formula?
Input guaranteed distinct? (important)
Negative numbers? (should not exist)
 */

function missingNumber(nums) {
  const n = nums.length;

  if (!nums || n === 0) return null;

  if (n === 0) return 0;

  const expectedSum = (n * (n - 1)) / 2;

  let actualSum = 0;

  for (const num of nums) {
    actualSum += num;
  }

  return expectedSum - actualSum;
}

console.log(missingNumber([])); // 0
console.log(missingNumber([0])); // 1
console.log(missingNumber([1])); // 0
console.log(missingNumber([0, 1])); // 2
console.log(missingNumber([0, 3, 2])); // 1
