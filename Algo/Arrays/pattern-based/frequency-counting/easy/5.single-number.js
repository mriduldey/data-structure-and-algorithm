/**
 * LC 136 — Single Number
1️⃣ Problem Description

Given a non-empty array of integers nums, every element appears twice except for one.
Find that single one.

Example
Input:  [2,2,1]
Output: 1

Why?

2 appears twice → cancels out

1 appears once → remains

Another:

Input:  [4,1,2,1,2]
Output: 4

All elements except 4 appear exactly twice.

Constraints:

Time complexity must be O(n)

Space complexity must be O(1) (important for FAANG)

2️⃣ Intuition
🔥 Core Insight: XOR

XOR properties:

a ^ a = 0
a ^ 0 = a
XOR is commutative and associative

If we XOR all numbers:

2 ^ 2 ^ 1
= (2 ^ 2) ^ 1
= 0 ^ 1
= 1

All duplicate pairs cancel out → only the single number remains.

That’s why XOR is optimal.

3️⃣ Edge Cases to Clarify with Interviewer

Ask these:

Is array guaranteed non-empty?

Is there always exactly one single number?

Can numbers be negative?

Can numbers be 0?

Can array size be 1?

Are elements guaranteed to appear exactly twice except one?

Edge cases:

[1] → return 1

[0,1,0] → return 1

[-1,-1,-2] → return -2

Large input size (performance check)
 */

function singleNumber(nums) {
    if(!Array.isArray(nums) || nums.length === 0) return null;
    if(nums.length === 1) return nums[0];

    let result = 0;

    for(const num of nums) {
        result ^= num; // use XOR here
    }

    return result;
}