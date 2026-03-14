/**
 * LC 523 — Continuous Subarray Sum
1. Problem Description

Given:

integer array nums

integer k

Return true if there exists a subarray of size ≥ 2 whose sum is a multiple of k.

Meaning:

𝑠
𝑢
𝑚
(
𝑖
.
.
𝑗
)
 
m
o
d
 
𝑘
=
0
sum(i..j)modk=0

where j - i + 1 ≥ 2.

Example
nums = [23,2,4,6,7]
k = 6

Subarray:

[2,4]
sum = 6
6 % 6 = 0

Return:

true
Another Example
nums = [23,2,6,4,7]
k = 6

Prefix sums:

23
25
31
35
42

Modulo 6:

23 % 6 = 5
25 % 6 = 1
31 % 6 = 1

Same modulo 1 appears twice.

Subarray between them:

[6]

But we must ensure length ≥ 2.

Actual valid subarray:

[2,6,4]
sum = 12
12 % 6 = 0

Return:

true
2. Intuition

Key identity:

If

prefix[j] % k == prefix[i] % k

then

(prefix[j] - prefix[i]) % k == 0

Meaning:

subarray(i+1 ... j) sum is divisible by k

So the problem becomes:

Find two prefix sums with the same modulo k.

But we must ensure:

j - i >= 2

Therefore:

Instead of storing frequency, store first index where mod appeared.

Why first index?

To ensure longest distance → ensures length ≥ 2.

Algorithm
map = {0 : -1}
prefix = 0

for i:

   prefix += nums[i]

   mod = prefix % k

   if mod already seen:
        if i - map[mod] >= 2
             return true

   else
        store index

Time:

O(n)

Space:

O(min(n,k))
3. Edge Cases (Important in Interviews)

Ask interviewer:

1. k = 0 ?

Special case.

We need:

subarray sum == 0

Meaning:

two consecutive zeros

Example

[0,0]

Return true.

2. negative numbers?

If allowed:

mod = ((prefix % k) + k) % k
3. array length < 2

Return false.

4. large values (overflow)

Use prefix sum carefully.

5. k = 1

Always true if length >=2.

6. all zeros
[0,0,0]
 */

function subarraySumDivisible(nums, k) {
  const map = new Map();
  map.set(0, -1);

  let prefix = 0;
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];

    let mod;
    if (k === 0) {
      mod = prefix;
    } else {
      mod = ((prefix % k) + k) % k;
    }

    if (map.has(mod)) {
      if (i - map.get(mod) >= 2) {
        return true;
      }
    } else {
      map.set(mod, i);
    }
  }

  return false;
}

console.log(subarraySumDivisible([], 1));
console.log(subarraySumDivisible([0], 1));
console.log(subarraySumDivisible([1, 0, 1, 0, 1], 1)); // 15
console.log(subarraySumDivisible([1, 1], 1));
console.log(subarraySumDivisible([1, 1], 0));
console.log(subarraySumDivisible([0, 0], 0));


