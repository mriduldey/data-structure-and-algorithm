/**
 * 🔎 LeetCode 81 — Search in Rotated Sorted Array II
📌 Problem Statement

You are given a rotated sorted array nums that may contain duplicates, and an integer target.

Return true if target exists in nums, otherwise return false.

The array was originally sorted in non-decreasing order.

It was rotated at some pivot.

Duplicates are allowed.

🧠 Example
Input:  nums = [2,5,6,0,0,1,2], target = 0
Output: true

Input:  nums = [2,5,6,0,0,1,2], target = 3
Output: false

🧠 Intuition (FAANG-level Thinking)

This is the duplicate version of LC 33 (Search in Rotated Sorted Array).

Without duplicates:

At least one half is always strictly sorted.

We can confidently choose the correct half.

With duplicates:

When nums[left] == nums[mid] == nums[right]
→ We cannot determine which side is sorted.
→ The structure becomes ambiguous.
 */

function rotatedSortedArr2(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while(left <= right) {
        const mid = left + Math.floor((right- left) / 2);

        if(arr[mid] === target) {
            return mid;
        }

        if(arr[left] === arr[mid] === arr[right]) {
            left++;
            right--;
        }

        if(arr[left <= arr[mid]]) {
            // Left side sorted
            if(arr[left] <= target && target <= arr[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            // Right side sorted
            if(arr[mid] <= target && target <= arr[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1;
}


console.log(rotatedSortedArr2([2,5,6,0,0,1,2], 5));