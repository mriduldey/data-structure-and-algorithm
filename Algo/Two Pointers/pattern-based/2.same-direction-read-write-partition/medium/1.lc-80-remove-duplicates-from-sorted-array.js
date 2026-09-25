/**
 * 1. LC 80 — Remove Duplicates from Sorted Array II

FAANG importance: ★★★★☆ — Medium–High
Very useful for testing two pointers, in-place array modification, invariants, and generalization of LC 26.

Given a sorted integer array nums, modify it in-place so that each unique value appears at most twice.

Return k, where the first k elements of nums contain the valid result.

Common constraints

1 <= nums.length <= 3 * 10^4
-10^4 <= nums[i] <= 10^4
nums is sorted in non-decreasing order.

Expected

Time: O(n)
Extra Space: O(1)
Example
nums = [0,0,1,1,1,1,2,3,3]

Output: k = 7

First 7 elements:
[0,0,1,1,2,3,3]

Why?

0 → keep twice
1 → keep twice, discard remaining two
2 → keep once
3 → keep twice

Anything after index k - 1 does not matter.

2. Intuition

Use a write pointer k representing where the next accepted element should go.

The first 2 elements can always be kept.

For every later element nums[i], compare it with:

nums[k - 2]

If:

nums[i] !== nums[k - 2]

then adding nums[i] will not create three identical consecutive values, so keep it.

Example:

nums = [1,1,1,2,2,3]

k = 2

i = 2
nums[i] = 1
nums[k - 2] = nums[0] = 1
same → skip

i = 3
nums[i] = 2
nums[k - 2] = nums[0] = 1
different → keep

[1,1,2,...]
      ↑
      k
Core invariant

Before every iteration:

nums[0 ... k-1]

already satisfies:

each number appears at most twice
3. Relevant interviewer edge cases

Ask only these:

Is the input guaranteed to be sorted?
The O(n), O(1) solution depends on sorted order.
Should modification be strictly in-place?
Usually yes, with O(1) extra space.
Do elements after the returned k matter?
No.
Is the maximum allowed frequency exactly 2?
Useful because the solution generalizes naturally to any m.
Can the array contain negative values?
Yes; the algorithm is unaffected.

Important cases:

[1]             → k = 1
[1,1]           → k = 2
[1,1,1]         → [1,1]
[1,1,1,1]       → [1,1]
[1,2,3]         → unchanged
[1,1,2,2,3,3]   → unchanged
 */

function removeDuplicate(nums) {
  if (nums.length <= 2) {
    return nums.length;
  }

  let k = 2;
  for (let i = 2; i < nums.length; i++) {
    if (nums[i] !== nums[k - 2]) {
      nums[k] = nums[i];
      k++;
    }
  }

  return k;
}

console.log(removeDuplicate([1, 1, 1, 2, 2, 3])); 
// Expected: 5

console.log(removeDuplicate([0, 0, 1, 1, 1, 1, 2, 3, 3]));
// Expected: 7

console.log(removeDuplicate([1, 1]));
// Expected: 2

console.log(removeDuplicate([1]));
// Expected: 1

console.log(removeDuplicate([]));
// Expected: 0

console.log(removeDuplicate([1, 1, 1, 1, 1]));
// Expected: 2

console.log(removeDuplicate([1, 2, 3, 4, 5]));
// Expected: 5

console.log(removeDuplicate([1, 1, 2, 2, 3, 3]));
// Expected: 6

console.log(removeDuplicate([2, 2, 2, 2, 3, 3, 3, 4, 4, 4]));
// Expected: 6

console.log(removeDuplicate([1, 1, 1, 2, 2, 2, 3, 3, 3]));
// Expected: 6