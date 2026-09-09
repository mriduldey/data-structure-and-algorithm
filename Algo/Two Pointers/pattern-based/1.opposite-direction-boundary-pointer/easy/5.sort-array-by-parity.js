/**LC 905 — Sort Array By Parity
1. Problem Description

LC 905 — Sort Array By Parity — ★★★☆☆ FAANG importance

A basic but useful two-pointer partitioning problem. The exact problem is not extremely frequent at senior FAANG level, but the underlying in-place partition pattern appears often in array manipulation, QuickSort partitioning, Move Zeroes, color partitioning, and predicate-based rearrangement.

Given an integer array nums, rearrange it so that:

all even numbers come first
all odd numbers come afterward
order within either group does not matter
Common constraints
1 <= nums.length <= 5000
0 <= nums[i] <= 5000
Expected complexity
Time:  O(n)
Space: O(1) auxiliary

For an interview, prefer the in-place two-pointer solution rather than creating another array.

Example
Input:
[3,1,2,4]

Possible Output:
[4,2,1,3]

Why?

Even → 4,2
Odd  → 1,3

[4,2 | 1,3]

[2,4,3,1] would also be valid because relative ordering is not required.

2. Intuition

This is essentially partitioning an array around a predicate:

even → left side
odd  → right side

Use two pointers:

left  → starts from beginning
right → starts from end

Move:

left forward while nums[left] is even
right backward while nums[right] is odd

If:

nums[left]  = odd
nums[right] = even

they are both on the wrong side, so swap them.

[3,1,2,4]
 L     ...R

3 odd
4 even
→ swap

[4,1,2,3]

   L R

1 odd
2 even
→ swap

[4,2,1,3]
Pattern
Opposite-direction two pointers
        +
In-place partitioning
3. Edge Cases to Ask the Interviewer

Only a few questions are actually relevant.

Does relative order need to be preserved?
[3,1,2,4]

Can output be:
[4,2,1,3]?

For LC 905: Yes. Order does not matter.

This is the most important clarification because stable ordering changes the implementation/space tradeoff.

Should the input array be modified in place?

For the optimal solution:

Yes → O(1) auxiliary space
Can the array contain negative integers?

LeetCode does not, but a generalized interviewer version might.

The solution still works because:

x % 2 === 0

correctly identifies negative even integers too.

Algorithm handles automatically
[]
[2]
[1]
[2,4,6]
[1,3,5]
[1,2]
[2,1]
duplicate values
0

No special-case code is required. */

function isEven(num) {
  return num % 2 === 0;
}

function sortArrayByParity(nums) {
  if (nums.length === 0) return [];

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    while (left < right && isEven(nums[left])) {
      left++;
    }

    while (left < right && !isEven(nums[right])) {
      right--;
    }

    if (left < right) {
      [nums[left], nums[right]] = [nums[right], nums[left]];
      left++;
      right--;
    }
  }

  return nums;
}

console.log(sortArrayByParity([3, 1, 2, 4]));
// Possible: [4, 2, 1, 3]

console.log(sortArrayByParity([2, 4, 6, 8]));
// [2, 4, 6, 8]

console.log(sortArrayByParity([1, 3, 5, 7]));
// [1, 3, 5, 7]

console.log(sortArrayByParity([0, 5, 2, 7, 4, 1]));
// Possible: [0, 4, 2, 7, 5, 1]

console.log(sortArrayByParity([11, 2, 9, 4, 7, 6]));
// Possible: [6, 2, 4, 9, 7, 11]