/**
 * LC 1248 — Count Number of Nice Subarrays
1. Problem Description

A nice subarray is a contiguous subarray that contains exactly k odd numbers.

Given:

nums → integer array

k → required number of odd numbers

Return number of subarrays with exactly k odd numbers.

Example

Input

nums = [1,1,2,1,1]
k = 3

Step-by-step

Convert numbers → odd indicator

1 → 1
1 → 1
2 → 0
1 → 1
1 → 1

Array becomes:

[1,1,0,1,1]

Now find subarrays with sum = 3

Valid subarrays:

[1,1,2,1]     → odds = 3
[1,2,1,1]     → odds = 3

Output

2
2. Core Intuition

Key observation:

We only care about odd numbers

Convert array to:

odd → 1
even → 0

Now the problem becomes:

Count subarrays with sum = k

This is exactly the Prefix Sum + HashMap frequency pattern.

Idea

Let

prefixOdd = number of odds seen so far

For current index:

needed prefix = prefixOdd - k

If this value exists in map:

that many subarrays end here with k odds
Why?

Because

prefixOdd(i) - prefixOdd(j) = k

Which means:

subarray (j+1 → i) has k odd numbers
Complexity
Time  : O(n)
Space : O(n)
3. Edge Cases (Ask Interviewer)

Important FAANG clarifications:

k = 0

Does problem allow?

subarrays with zero odd numbers

Example

[2,4,6]
No odd numbers in array
nums = [2,4,6]
k = 1

Answer → 0

k > number of odds

Example

[1,2,3]
k = 5

Answer → 0

Single element
[1], k = 1

Answer → 1

[2], k = 1

Answer → 0

Large input

Constraints:

n ≤ 50,000

Brute force O(n²) fails.
 */

function niceSubarrayCount(nums, k) {
  if (nums.length === 0 || k === 0) return 0;

  const map = new Map();
  map.set(0, 1);

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    if (num % 2 !== 0) {
      prefix += num;
    }

    if (map.has(prefix - k)) {
      count += map.get(prefix - k);
    }

    map.set(prefix, (map.get(prefix) || 0) + 1);
  }

  return count;
}

console.log(niceSubarrayCount([], 1));
console.log(niceSubarrayCount([2, 1, 4], 0));
console.log(niceSubarrayCount([2,4,6], 1));
console.log(niceSubarrayCount([1,1,2,1,1], 3));
