/**
 * LC 724 — Find Pivot Index
1. Problem Description

Given an integer array nums, return the pivot index.

A pivot index is an index where:

sum of elements on the left == sum of elements on the right

Left side excludes the pivot element.

Right side excludes the pivot element.

If multiple pivots exist → return the leftmost.

If none exist → return -1.

Example
Input:
nums = [1,7,3,6,5,6]

Index:   0 1 2 3 4 5
Array:  [1,7,3,6,5,6]

Check index 3

Left sum

1 + 7 + 3 = 11

Right sum

5 + 6 = 11

Both equal → pivot index = 3

Output

3
Example 2
nums = [1,2,3]

Check each index

i=0 → left=0 right=5
i=1 → left=1 right=3
i=2 → left=3 right=0

No match

Output

-1
2. Intuition

Brute force idea:

For every index

leftSum = sum(nums[0..i-1])
rightSum = sum(nums[i+1..n-1])

Time complexity

O(n²)

Not acceptable for FAANG.

Key Observation

Let

totalSum = sum(nums)

At index i

leftSum = sum(nums[0..i-1])

rightSum = totalSum - leftSum - nums[i]

Pivot condition

leftSum = rightSum

Substitute

leftSum = totalSum - leftSum - nums[i]

2 * leftSum + nums[i] = totalSum

We can track leftSum while iterating once.

Time complexity

O(n)

Space complexity

O(1)
3. Edge Cases (Ask Interviewer)

Important FAANG clarifications:

Single element array

[5]
pivot = 0

Because both sides sum to 0.

Empty array

[]
return -1

Multiple pivot indexes

Return leftmost.

Negative numbers

[-1,-1,-1,0,1,1]

Still valid.

Large numbers

Check for overflow in languages like Java/C++.

All zeros

[0,0,0,0]
pivot = 0

Pivot at edges

[2,1,-1]

pivot = 0

Left = 0
Right = 0
 */

function pivotIndex(nums) {
    if(!nums || nums.length === 0) return -1

    let totalSum = 0;
    for(const num of nums) {
        totalSum += num;
    }

    let leftSum = 0;
    for(let i = 0; i < nums.length; i++) {
        rightSum = totalSum - leftSum - nums[i];

        if(leftSum === rightSum) {
            return i;
        }

        leftSum += nums[i];
    }

    return -1;
}

console.log(pivotIndex([1,7,3,6,5,6])); // 3
console.log(pivotIndex([2, 1, -1])); // 0
console.log(pivotIndex([5])); // 0
console.log(pivotIndex([])); // -1
console.log(pivotIndex([-1,-1,-1,0,1,1])); // 0
console.log(pivotIndex([0, 0, 0, 0])); // 0
