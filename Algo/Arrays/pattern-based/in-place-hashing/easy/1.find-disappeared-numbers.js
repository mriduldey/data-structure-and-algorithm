/**
 * LC 448 — Find All Numbers Disappeared in an Array
1. Problem Description (FAANG Importance: ⭐⭐⭐⭐☆ — frequently used as a concept test)

Given an array nums of size n, where:

1 ≤ nums[i] ≤ n
Some numbers may appear twice, others once

Return all numbers in range [1, n] that are missing.

Example
Input:  nums = [4,3,2,7,8,2,3,1]
Range:  [1..8]

Present numbers: 1,2,3,4,7,8
Missing numbers: 5,6

Output: [5,6]

👉 Core signal tested in FAANG:

Index mapping / in-place hashing
Space optimization (O(1) extra space)
2. Intuition

Key constraint:
👉 Values are in range [1, n] → can use index as hash

Idea:
For each number x, mark index x-1 as visited
Use negative marking to avoid extra space
Steps:
Iterate array
→ mark nums[abs(x) - 1] as negative
Second pass
→ indices with positive values = missing numbers
Why it works:
Each index represents a number
If index not marked → number never appeared
3. Edge Cases (ask interviewer)
Empty array? → return []
All numbers present? → return []
All numbers same? → return [missing numbers]
Already sorted / reverse sorted? → no change
Duplicate-heavy input (e.g., [1,1,1,1])
Can we modify input array? (important clarification)
 */

function findDisappearedNums(nums) {
  if (!nums || nums.length === 0) return [];

  const result = [];
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    const num = Math.abs(nums[i]);
    const index = num - 1;
    if (nums[index] > 0) {
      nums[index] = -nums[index];
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] > 0) {
      result.push(i + 1);
    }
  }

  return result;
}


console.log(findDisappearedNums([])) // []
console.log(findDisappearedNums([1])) // []
console.log(findDisappearedNums([1, 1])) // [2]
console.log(findDisappearedNums([2, 2, 2])) // [1, 3]

