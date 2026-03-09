/**
 * LC 560 — Subarray Sum Equals K
1. Problem Description

Given an integer array nums and an integer k, return the number of continuous subarrays whose sum equals k.

Subarray must be contiguous

Elements can be positive, negative, or zero

Example
nums = [1,1,1]
k = 2

Subarrays:

[1,1] (index 0-1) → sum = 2
[1,1] (index 1-2) → sum = 2

Answer:

2
Example 2
nums = [1,2,3]
k = 3

Subarrays:

[1,2] → 3
[3]   → 3

Answer:

2
2. Intuition

Brute force would check all subarrays.

sum(i,j) = nums[i] + nums[i+1] + ... + nums[j]

This is O(n²).

Key Prefix Sum Idea

Let

prefix[i] = sum of elements from 0 → i

Subarray sum formula:

sum(i..j) = prefix[j] - prefix[i-1]

We want:

prefix[j] - prefix[i-1] = k

Rearrange:

prefix[i-1] = prefix[j] - k

Meaning:

If previous prefix sum = currentPrefix - k, then a valid subarray exists.

So we store prefix sums frequency in a hashmap.

Algorithm

For each element:

prefix += nums[i]

if map contains (prefix - k)
    count += frequency

store prefix in map
Important Initialization
map[0] = 1

This handles subarrays starting from index 0.

Example:

nums = [3]
k = 3

prefix = 3

3 - 3 = 0

We already have 0 in map → valid.

3. Edge Cases (Ask Interviewer)

Important FAANG clarification questions:

Can numbers be negative?

Yes → sliding window won't work.

Can array contain zero?

Can k be zero?

Is empty array possible?

Return count or actual subarrays?

Array size limit?

n ≤ 10^5

This confirms O(n) solution required.

Edge Cases
[] , k = 0 → 0
[0,0,0], k=0

Answer = 6

Subarrays:

[0]
[0]
[0]
[0,0]
[0,0]
[0,0,0]
[1], k=1 → 1
[-1,-1,1], k=0

Subarray:

[-1,-1,1]

Answer = 1
 */

function subarraySumEqualsK(nums, k) {
  if(nums.length === 0) {
    return 0;
  }

  const prefixFreq = new Map();
  prefixFreq.set(0, 1);

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;

    if (prefixFreq.has(prefix - k)) {
      count += prefixFreq.get(prefix - k);
    }

    prefixFreq.set(prefix, (prefixFreq.get(prefix) || 0) + 1);
  }

  return count;
}

console.log(subarraySumEqualsK([], 0)) // 0
console.log(subarraySumEqualsK([1], 1)) // 1
console.log(subarraySumEqualsK([1, 1, 1], 1)) // 3
console.log(subarraySumEqualsK([1, 1, 1], 2)) // 2 
console.log(subarraySumEqualsK([1, 1, 1], 3)) // 1
console.log(subarraySumEqualsK([0,0,0], 0)) // 6
