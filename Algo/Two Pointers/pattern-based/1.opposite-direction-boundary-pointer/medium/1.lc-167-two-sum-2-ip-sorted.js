/**
 * 1. LC 167 — Two Sum II: Input Array Is Sorted ⭐⭐⭐⭐⭐

FAANG importance: Very High
A fundamental two-pointer interview problem. It tests whether you recognize that the sorted property lets you eliminate candidates without hashing. Common either directly or as a building block for 3Sum, 4Sum, pair-sum, closest-sum, and k-sum problems.

Problem: Given a 1-indexed, non-decreasing sorted array numbers and a target, find two distinct numbers whose sum equals target.

Return their 1-based indices:

[index1, index2]

where:

index1 < index2

LeetCode guarantees exactly one solution.

Common constraints

2 <= numbers.length <= 3 * 10^4
-1000 <= numbers[i] <= 1000
numbers is sorted in non-decreasing order
-1000 <= target <= 1000
Exactly one solution exists

Expected complexity

Time  : O(n)
Space : O(1)
Example
numbers = [2, 7, 11, 15]
target = 9

Start:

left = 0  → 2
right = 3 → 15

2 + 15 = 17 > 9

Move right left:

2 + 11 = 13 > 9

Move right left again:

2 + 7 = 9

Answer uses 1-based indexing:

[1, 2]
2. Intuition

Because the array is sorted:

[left ................. right]

Calculate:

sum = numbers[left] + numbers[right];

Three possibilities:

sum === target
→ found the pair

sum < target
→ need a larger sum
→ move left++

sum > target
→ need a smaller sum
→ move right--

Why is this safe?

Suppose:

numbers[left] + numbers[right] < target

numbers[left] is currently the smallest available value.

Pairing it with anything before right would produce an equal or smaller sum.

Therefore numbers[left] cannot participate in the answer.

So eliminate it:

left++;

Similarly:

sum > target

means numbers[right] is too large even when paired with the smallest available number, so:

right--;

This gives the core invariant:

Every movement permanently eliminates one impossible candidate.
3. Edge Cases to Ask the Interviewer

Only relevant clarifications:

Is the array guaranteed to be sorted?
Is exactly one valid pair guaranteed?
Should the returned indices be 0-based or 1-based?
Can the array contain duplicate values?
Can numbers and target be negative?
Must we use constant extra space?

For LC 167:

Sorted            → Yes
Exactly one pair  → Yes
Indices           → 1-based
Duplicates        → Allowed
Negative numbers  → Allowed
Extra space       → Prefer O(1)
 */

function findSumPair(nums, target) {
  if (nums.length === 0) return [];

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [];
}

console.log(findSumPair([2, 7, 11, 15], 9)); // [1, 2]
console.log(findSumPair([1, 2, 3, 4, 6], 6)); // [2, 4]
console.log(findSumPair([3, 3], 6)); // [1, 2]
console.log(findSumPair([1, 5, 9, 13], 14)); // [1, 4]
console.log(findSumPair([1, 2, 4, 7, 10], 11)); // [1, 5]
console.log(findSumPair([2, 4, 6, 8, 10], 12)); // [1, 5]
console.log(findSumPair([5, 10, 15, 20], 25)); // [1, 4]
console.log(findSumPair([1, 2, 3, 9], 8)); // []
console.log(findSumPair([1, 2, 3, 4, 5], 10)); // []
console.log(findSumPair([1, 2, 3, 4, 5, 6], 11)); // [5, 6]
