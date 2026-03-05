/**
 * LC 1991 — Find the Middle Index in Array
1. Problem Description

Given an integer array nums, return the leftmost index i such that:

sum(nums[0..i-1])
=
sum(nums[i+1..n-1])
sum(nums[0..i-1])=sum(nums[i+1..n-1])

If no such index exists → return -1.

Example
Input: nums = [2,3,-1,8,4]

Index:   0  1  2  3  4
Value:   2  3 -1  8  4

Check index 3:

Left sum

2 + 3 + (-1) = 4

Right sum

4

Both equal → 3 is middle index

Output: 3
Example 2
Input: nums = [1,-1,4]

Index:   0  1  2
Value:   1 -1  4

Index 2

Left sum

1 + (-1) = 0

Right sum

0
Output: 2
Example 3
Input: [2,5]
Output: -1

No index satisfies condition.

2. Intuition

Brute force would recompute sums for each index → O(n²).

Observation:

leftSum + nums[i] + rightSum = totalSum

So

rightSum = totalSum - leftSum - nums[i]

Condition becomes

leftSum == totalSum - leftSum - nums[i]

Algorithm:

Compute totalSum

Iterate array

Maintain leftSum

For each index compute rightSum

If equal → return index

Complexity

Time  : O(n)
Space : O(1)

This is the FAANG expected solution.

3. Edge Cases (Ask Interviewer)

Important clarifications:

Empty array

[]
→ return -1

Single element

[5]
→ index 0 (left=0, right=0)

Negative numbers allowed?

Multiple answers

return first index?

Large values
possible integer overflow?

All zeros

[0,0,0]
→ answer = 0

Large array size
ensure O(n) solution.

4. FAANG Level Implem
 */


function arrayMiddleIndex(nums) {
    if(nums.length === 0) return -1;
    if(nums.length === 1) return 0;

    let total = 0;
    for(const num of nums) {
        total += num;
    }

    let leftSum = 0;
    for(let i = 0; i < nums.length; i++) {
        const rightSum = total - leftSum - nums[i];

        if(leftSum === rightSum) {
            return i;
        }

        leftSum += nums[i];
    }
}

console.log(arrayMiddleIndex([2,3,-1,8,4])); // 3
console.log(arrayMiddleIndex([1, 1, 1])); // 1
console.log(arrayMiddleIndex([])); // -1
console.log(arrayMiddleIndex([10])); // 0
