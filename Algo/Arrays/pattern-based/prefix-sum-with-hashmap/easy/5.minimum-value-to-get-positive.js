/**
 * LC 1413 — Minimum Value to Get Positive Step-by-Step Sum
1. Problem Description

Given an integer array nums, you start with an initial value startValue.

You iterate through the array and compute a running sum:

currentSum = startValue
currentSum += nums[i]

At every step, currentSum must always remain ≥ 1.

Your task is to find the minimum startValue such that the running sum never becomes less than 1.

Example
nums = [-3, 2, -3, 4, 2]

Compute prefix sum:

Step	Value	Running Sum
start	-	startValue
1	-3	startValue - 3
2	+2	startValue - 1
3	-3	startValue - 4
4	+4	startValue 0
5	+2	startValue + 2

Minimum running value occurs at:

startValue - 4

We require:

startValue - 4 ≥ 1
startValue ≥ 5
Output
5
2. Intuition

Key idea:

startValue + minimum_prefix_sum ≥ 1

Rearranging:

startValue ≥ 1 - minimum_prefix_sum

So algorithm:

Compute running prefix sum.

Track minimum prefix sum encountered.

Calculate required start value.

startValue = max(1, 1 - minPrefixSum)

Why max(1, …)?

If all numbers are positive, minimum prefix sum is positive → startValue can still be 1.

3. Edge Cases to Ask Interviewer

Important FAANG discussion points:

All positive numbers

[2,3,4]
answer = 1

All negative numbers

[-1,-2,-3]
prefix = -1,-3,-6
answer = 7

Single element

[-5] → 6
[5] → 1

Prefix sum hits exactly 0

[-1,1]
startValue must be 2

Empty array

Usually constraints guarantee length ≥1 but clarify.

Large negative prefix

Ensure no overflow.

Zeros in array

[0,0,0] → 1
 */

function minValueToPositive(nums) {
    let prefixSum = 0;
    let minPrefixSum = 0;
    for(const num of nums) {
        prefixSum += num;
        minPrefixSum = Math.min(minPrefixSum, prefixSum);
    }

    const minStartValue = Math.max(1, 1 - minPrefixSum)
    return minStartValue;
}

console.log(minValueToPositive([-1,-2,-3])); // 7
console.log(minValueToPositive([1])); // 
console.log(minValueToPositive([-1])); // 
console.log(minValueToPositive([1, 1, 1]));
console.log(minValueToPositive([-3, 2, -3, 4, 2]));