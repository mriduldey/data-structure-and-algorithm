/**
 * LC 414 — Third Maximum Number

FAANG relevance: Low–Medium frequency, but important for Arrays + Hashing fundamentals, especially testing set handling, distinct elements, top-k tracking, O(1) space optimization. Commonly used as follow-up for top-k / streaming problems.

1. Description

Given integer array nums, return the 3rd distinct maximum number.
If third distinct max does not exist → return maximum element.

Common constraints
1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31-1

Expected interview complexities:

Approach	Time	Space
Sort + Set	O(n log n)	O(n)
Top 3 tracking (optimal)	O(n)	O(1)
Example
nums = [3,2,1]

Distinct values:
3,2,1

1st max = 3
2nd max = 2
3rd max = 1

Output = 1

Example 2:

nums = [1,2]

Distinct:
2,1

Only 2 unique values

Output = 2

Example 3:

nums=[2,2,3,1]

Distinct:
3,2,1

3rd max =1
2. Intuition

Need distinct maximums, duplicates ignored.

Keep:

first
second
third

While traversing:

num > first → shift all
num > second → shift second/third
num > third → update third

Skip duplicates.

Example:

[2,2,3,1]

2:
f=2

2:
skip duplicate

3:
f=3
s=2

1:
t=1

answer=1
3. Edge cases (ask interviewer)
1. Duplicates allowed?
   [2,2,3] → distinct?

2. Less than 3 unique numbers?
   Return max or error?

3. Negative numbers?

4. Integer overflow possible?
   Use Number.MIN_SAFE_INTEGER? null?

5. Empty array possible?

Relevant edge cases:

[1] → 1

[1,1] →1

[1,2] →2

[2,2,2] →2

[-1,-2,-3] →-3

[1,2,2,5,3,5] →2
 */

function thirdLargest(nums) {
  const arr = [...new Set(nums)];
  arr.sort((a, b) => a - b);

  return arr.length >= 3 ? arr[2] : arr[arr.length - 1];
}

console.log(thirdLargest([1, 2, 3, 4, 4, 5, 7]));
