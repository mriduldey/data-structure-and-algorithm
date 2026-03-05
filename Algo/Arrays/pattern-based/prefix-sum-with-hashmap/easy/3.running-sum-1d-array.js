/**
 * LC 1480 — Running Sum of 1D Array
1. Problem Description

Given an array nums, return the running sum of the array.

The running sum at index i is defined as:

𝑟
𝑢
𝑛
𝑛
𝑖
𝑛
𝑔
𝑆
𝑢
𝑚
[
𝑖
]
=
𝑛
𝑢
𝑚
𝑠
[
0
]
+
𝑛
𝑢
𝑚
𝑠
[
1
]
+
.
.
.
+
𝑛
𝑢
𝑚
𝑠
[
𝑖
]
runningSum[i]=nums[0]+nums[1]+...+nums[i]
Example

Input

nums = [1,2,3,4]

Computation

i	Calculation	Running Sum
0	1	1
1	1 + 2	3
2	1 + 2 + 3	6
3	1 + 2 + 3 + 4	10

Output

[1,3,6,10]

Example 2

nums = [3,1,2,10,1]

Running computation

[3,
 3+1=4,
 4+2=6,
 6+10=16,
 16+1=17]

Output

[3,4,6,16,17]
2. Intuition

This problem is essentially prefix sum construction.

Key observation:

runningSum[i] = runningSum[i-1] + nums[i]

So while traversing the array:

Maintain cumulative sum

Add current element

Store result

This pattern appears in many FAANG questions involving:

range queries

subarray problems

cumulative metrics

Time Complexity

O(n)

Space Complexity

O(1) if modifying input
O(n) if separate array
3. Edge Cases to Ask Interviewer

Important clarifications in interview:

Empty array

nums = []

Expected → []

Single element

nums = [5]

Output

[5]

Negative numbers

nums = [-1,2,-3,4]

Running sum works normally.

Large values (overflow concern)

If language has integer overflow (Java/C++).

Modify input allowed?

If yes → in-place solution.

Streaming data?

Running sum while receiving elements.
 */


function runningSum(nums) {
    if(nums.length === 0) return [];
    
    for(let i = 1; i < nums.lenghth; i++) {
       nums[i] = nums[i - 1] + nums[i];
    }

    return nums;
}