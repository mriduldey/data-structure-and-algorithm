/**
 * LC 974 — Subarray Sums Divisible by K
1. Problem Description

Given an integer array nums and integer k, return number of subarrays whose sum is divisible by k.

A subarray is contiguous.

Example
nums = [4,5,0,-2,-3,1]
k = 5

All subarrays whose sum % 5 == 0

[4,5,0,-2,-3,1]
  ^
[5] → 5 % 5 = 0

[5,0] → 5 % 5 = 0

[5,0,-2,-3] → 0 % 5 = 0

[0] → 0 % 5 = 0

[0,-2,-3] → -5 % 5 = 0

[-2,-3] → -5 % 5 = 0

Total = 7

Output

7
2. Intuition
Key Mathematical Observation

If

(prefixSum[j] - prefixSum[i]) % k == 0

then

prefixSum[j] % k == prefixSum[i] % k

So the problem becomes:

Count pairs of prefix sums having same remainder when divided by k

Example Walkthrough
nums = [4,5,0,-2,-3,1]
k = 5

Prefix sums

0
4
9
9
7
4
5

Remainders

0
4
4
4
2
4
0

Count frequency of each remainder

0 → 2
4 → 4
2 → 1

If remainder appears n times → subarrays =

nC2 = n*(n-1)/2
0 → 1
4 → 6
2 → 0

Total

1 + 6 = 7

But we compute it on the fly using hashmap.

3. Edge Cases (Ask Interviewer)

Negative numbers allowed?

If yes → handle negative modulo.

k = 1

Every subarray valid.

k > array sum

Large array (10⁵)

O(n²) unacceptable.

nums contains zeros

k negative?

Usually assume positive.

overflow possibility

Use long if required.
 */

function subarrayDivByK(nums, k) {
  const map = new Map();
  map.set(0, 1);

  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;

    const mod = ((prefix % k) + k) % k;

    if (map.has(mod)) {
      count += map.get(mod);
    }

    map.set(mod, (map.get(mod) || 0) + 1);
  }

  return count;
}

console.log(subarrayDivByK([], 1));
console.log(subarrayDivByK([0], 1));
console.log(subarrayDivByK([1,0,1,0,1], 1)); // 15
console.log(subarrayDivByK([1, 1], 1));

