/**
 * LC 525 — Contiguous Array
1. Problem Description

You are given a binary array nums containing only 0 and 1.

Return the maximum length of a contiguous subarray with equal number of 0s and 1s.

Example 1
Input: nums = [0,1]
Output: 2

Explanation

[0,1]
0 count = 1
1 count = 1

Equal → length = 2

Example 2
Input: nums = [0,1,0]
Output: 2

Possible subarrays:

[0,1] -> valid -> length 2
[1,0] -> valid -> length 2
[0,1,0] -> 0s=2,1s=1 -> invalid

Maximum = 2

Example 3
Input: [0,0,1,0,0,0,1,1]
Output: 6

Valid longest:

[1,0,0,0,1,1]

0s = 3
1s = 3
length = 6
2. Intuition (Important for FAANG)

This problem becomes easier if we convert it to a prefix sum problem.

Key Trick

Convert

0 -> -1
1 -> +1

Why?

Because now:

equal 0 and 1  => sum = 0

Example

nums = [0,1,0]

convert

[-1, +1, -1]

Prefix sums

index:   0   1   2
value:  -1   0  -1

Observation:

Same prefix sum appearing again means:

subarray sum = 0

Example

prefix -1 occurs at index 0 and index 2

subarray (1..2) -> sum = 0

So we store the first occurrence of each prefix sum in a hashmap.

Whenever we see the same prefix again, we found a valid subarray.

3. Edge Cases to Ask Interviewer

Important in FAANG interviews.

Empty array

[]
return 0

All zeros

[0,0,0]
no equal ones
return 0

All ones

[1,1,1]
return 0

Entire array valid

[0,1,0,1]
return 4

Single element

[0]
return 0

Large input

n up to 10^5

So O(n²) is unacceptable.
 */

function contiguousArray(nums) {
  if (nums.length < 2) return 0;

  const map = new Map();
  map.set(0, -1); // consider -1 as the first index

  let prefixSum = 0;
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    // convert 0 to -1
    prefixSum += nums[i] === 0 ? -1 : nums[i];

    if (map.has(prefixSum)) {
      maxLen = Math.max(maxLen, i - map.get(prefixSum));
    } else {
      map.set(prefixSum, i);
    }
  }

  return maxLen;
}

console.log(contiguousArray([0, 1, 0])) // 2

/**
 * [ 0, 0, 1, 0, 0, 0, 1,1]     // i/p
 * [-1,-1, 1,-1,-1,-1, 1,1]
 * 
 * prefix
 * index -> [ 0, 1, 2, 3, 4, 5, 6, 7]
 * sum   -> [-1,-2,-1,-2,-3,-4,-3,-2]
 * 
 * equal 0 and 1 sub arrays [1... 2]; [1... 3]; [4... 6]; [1... 7]
 * thus, maxLen -> 6
 */
console.log(contiguousArray([0,0,1,0,0,0,1,1])) // 6
