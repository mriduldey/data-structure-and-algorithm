/**
 * LC 287 — Find the Duplicate Number
1. Problem Description (FAANG Importance: ⭐⭐⭐⭐ Frequent)

Given an array nums of size n + 1 containing integers in range [1, n], only one number is duplicated but it may appear multiple times.

👉 You must find the duplicate number without modifying the array and using constant extra space.

Constraints
1 ≤ n ≤ 10^5
nums.length = n + 1
Values in range [1, n]
Only one duplicate exists
Must solve in:
Time: O(n)
Space: O(1)
Example
Input: nums = [1,3,4,2,2]
Output: 2
How output comes
Numbers are in range [1,4], but 5 elements → pigeonhole principle
2 repeats → duplicate
2. Intuition
🔥 Core Insight: Cycle Detection (Linked List Mapping)

Treat array as:

index → value → next index

Example:

nums = [1,3,4,2,2]

0 → 1 → 3 → 2 → 4 → 2 (cycle)

👉 Duplicate = cycle entry point

So use Floyd’s Tortoise & Hare Algorithm

Why it works
Since numbers are in [1,n], mapping forms a cycle
Duplicate node causes cycle
3. Edge Cases (Ask Interviewer)
Is there guaranteed exactly one duplicate?
Can duplicate appear more than twice?
Can I modify array? (important for alt solutions)
Is O(1) space strictly required?
Can numbers start from 0 instead of 1?
 */

function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}

console.log(findDuplicate([1, 3, 5, 2, 6, 3, 4]));
