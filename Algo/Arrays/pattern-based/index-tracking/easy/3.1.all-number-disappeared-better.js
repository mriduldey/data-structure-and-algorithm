/**
 * /**
 * LC 448 — Find All Numbers Disappeared in an Array
 * 1. Problem description with example

Given an array nums of length n where each value is supposed to be in range [1, n], some numbers appear twice and some appear once. Return all numbers in [1, n] that do not appear in nums.

Example

nums = [4,3,2,7,8,2,3,1]

n = 8, so expected numbers should be:

[1,2,3,4,5,6,7,8]

Present in array:

1 present

2 present

3 present

4 present

7 present

8 present

Missing:

5

6

So output is:

[5,6]

Why this works

Each number tells us which index should be marked:

number 1 → index 0

number 2 → index 1

number 3 → index 2

...

number n → index n-1

If after processing, some index is still unmarked, then that number was missing.

2. Intuition

This is a classic index marking / cyclic placement / in-place hashing problem.

Since values are constrained to [1, n], every number has a “correct mapped index”:
num -> num - 1

Main idea:

Visit each number

Mark the index corresponding to that number as seen

At the end, indices not marked correspond to missing numbers

Best FAANG intuition

Instead of using extra hash set space, use the input array itself as bookkeeping.

For marking:

take val = Math.abs(nums[i])

mark nums[val - 1] as negative if it is positive

Why Math.abs?
Because a number may already have been negated earlier, but we still need its original value.

After marking:

positive index i means number i + 1 never appeared

negative index i means number i + 1 appeared at least once

Time: O(n)
Extra space: O(1) excluding output

3. Edge cases to ask interviewers

Ask these before coding:

Is every number guaranteed to be in range [1, n]?

Can the array be empty?

Can duplicates appear more than twice?

Do I need to preserve the input array?

Should I optimize for O(1) extra space?

Is output order expected to be ascending?
For this problem, natural scan gives ascending order.

Can there be no missing numbers?

Can all numbers be missing except duplicates of a few values?

Should I return array or list?

What should happen if invalid input exists outside constraints?
Usually not needed in LeetCode, but good for production code discussion.

Important edge cases

nums = [1,1] → output [2]

nums = [2,2] → output [1]

nums = [1,2,3,4] → output []

nums = [2,2,2,2] with n=4 → output [1,3,4]

nums = [1] → output []

nums = [ ] → output [] if empty allowed
 */

function numberDisappeared(nums) {
  if (!nums || nums.length === 0) return [];

  const result = [];

  for (let i = 0; i < nums.length; i++) {
    const num = Math.abs(nums[i]);
    const index = num - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }

  return result;
}

console.log(numberDisappeared([]));
console.log(numberDisappeared([1, 2, 3, 4]));
console.log(numberDisappeared([2, 2, 2, 2]));
console.log(numberDisappeared([4, 3, 2, 7, 8, 2, 3, 1]));
