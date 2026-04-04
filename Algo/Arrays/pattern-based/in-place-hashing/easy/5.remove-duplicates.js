/**
 * LC 26 — Remove Duplicates from Sorted Array
1. Problem Description (FAANG Context)

High-frequency FAANG problem (Google, Amazon, Meta). Tests two-pointer technique + in-place array manipulation.

Problem

Given a sorted array nums, remove duplicates in-place such that each element appears only once and return the new length k.

First k elements must be unique
Order must be preserved
No extra space allowed
Constraints
1 <= nums.length <= 3 * 10^4
-100 <= nums[i] <= 100
Sorted in non-decreasing order
Expected Complexity
Time: O(n)
Space: O(1)
Example
Input:  [1,1,2,2,3]
Process:
i=1 → skip duplicate
i=2 → place at index 1 → [1,2,...]
i=4 → place at index 2 → [1,2,3,...]

Output:
k = 3
nums = [1,2,3,_,_]
2. Intuition
Since array is sorted, duplicates are adjacent
Maintain a slow pointer (write index)
Iterate with a fast pointer:
If nums[fast] != nums[slow-1], write it at slow
Move slow++

👉 Core idea:
"Only copy when encountering a new unique element"

3. Edge Cases (Ask Interviewer)
Empty array? (usually not, but confirm)
Single element array
All elements same → [2,2,2]
No duplicates → [1,2,3]
Negative values? (allowed)
Return length only or also modified array?
 * 
 */

function removeDuplicates(nums) {
  if (!nums || nums.length === 0) return null;

  let uniquePos = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[uniquePos - 1]) {
      nums[uniquePos++] = nums[i];
    }
  }
  
  return uniquePos;
}

console.log(removeDuplicates([1, 1, 2, 2, 2, 3, 4, 5, 6, 6, 7, 8]));
