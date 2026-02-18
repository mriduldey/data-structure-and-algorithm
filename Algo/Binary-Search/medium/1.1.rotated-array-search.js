/**
 * LC 33 — Search in Rotated Sorted Array (MUST)
📌 Problem Description

You are given:

An integer array nums sorted in ascending order

The array is rotated at an unknown pivot

No duplicate elements

An integer target

Return the index of target if found, otherwise return -1.

You must achieve O(log n) time complexity.

This is a modified binary search problem.

🔎 Example 1
Input:  nums = [4,5,6,7,0,1,2], target = 0
Output: 4


The array was originally:

[0,1,2,4,5,6,7]


Rotated at index 3 →

[4,5,6,7,0,1,2]


Target 0 is at index 4.

🔎 Example 2
Input:  nums = [4,5,6,7,0,1,2], target = 3
Output: -1


3 does not exist.

🔎 Example 3
Input: nums = [1], target = 0
Output: -1

🧠 Intuition (FAANG-Level Understanding)
Key Observation

Even though the array is rotated:

👉 At least one half of the array is always sorted.

In every binary search iteration:

[left ... mid] OR [mid ... right]


One of them must be properly sorted.

Core Strategy

Compute mid

Check if nums[mid] == target

Determine which half is sorted

Check if target lies inside that sorted half

Narrow search space accordingly

How do we detect sorted half?

If:

nums[left] <= nums[mid]


→ Left half is sorted.

Else:
→ Right half is sorted.

Why This Works

Because rotation only breaks the array at one pivot point, so at least one half must remain monotonic increasing.

This guarantees logarithmic reduction every iteration.
 */



function binarySearchRotated (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while(left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if(nums[mid] === target) return mid;

    if(nums[left] <= nums[mid]) {
      // Left half sorted
      if(nums[left] <= target && target <= nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half sorted
      if(nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

console.log(binarySearchRotated([1, 3, 1, 1, 1], 3));