/**
 * LC 27 — Remove Element
1. Problem Description (FAANG Context)

Remove Element is a very common FAANG warm-up problem used to test:

In-place array manipulation
Two-pointer techniques
Understanding of constraints vs return semantics

Problem:
Given an integer array nums and an integer val, remove all occurrences of val in-place.
Return the new length k such that first k elements are valid (order may change).

Constraints (typical):

0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
Do in-place, O(1) extra space

Expected Complexity:

Time: O(n)
Space: O(1)
Example
nums = [3,2,2,3], val = 3

After removal → [2,2,_ ,_]
Return k = 2
nums = [0,1,2,2,3,0,4,2], val = 2

After removal → [0,1,3,0,4,_ ,_ ,_]
Return k = 5
2. Intuition

Core idea: Overwrite unwanted elements

Two main approaches:

✅ Approach 1 (Stable - Preserve Order)
Use pointer k
Traverse array
If nums[i] != val, assign nums[k++] = nums[i]

👉 Keeps order, simple

✅ Approach 2 (Optimal Swapping - Faster when many removals)
Use two pointers:
i from start
n from end
If nums[i] == val, swap with last element and reduce size

👉 Does NOT preserve order but minimizes writes

3. Edge Cases (Ask Interviewer)
Empty array → []
All elements equal to val
No elements equal to val
Single element array
Large input (performance check)
Order preservation required or not?
 */

function removeElementBetter(nums, val) {
  if (!nums || nums.length === 0) return null;

  let l = 0;
  let r = nums.length;

  while (l < r) {
    if (nums[l] === val) {
      nums[l] = nums[r - 1];
      r--;
    } else {
      l++;
    }
  }

  return r;
}


console.log(removeElementBetter([], 1)); // null
console.log(removeElementBetter([1], 1)); // 0
console.log(removeElementBetter([1, 1], 1)); // 0
console.log(removeElementBetter([1, 2], 1)); // 1
console.log(removeElementBetter([1, 2, 3], 1)); // 2
console.log(removeElementBetter([2, 3], 2)); // 1
console.log(removeElementBetter([2, 3, 7], 7)); // 2
console.log(removeElementBetter([2, 3, 2, 7], 2)); //
