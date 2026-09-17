/**
 * 1. LC 283 — Move Zeroes

Importance: High
FAANG frequency: Frequently used as an easy screening / two-pointer problem. It tests in-place array modification, stable ordering, pointer invariants, and minimizing writes.

Given an integer array nums, move all 0s to the end while maintaining the relative order of non-zero elements.

Common constraints: 1 <= nums.length <= 10^4, values may be negative, positive, or zero.

Expected complexity:
Time: O(n)
Extra space: O(1)
The array must be modified in-place.

Example

Input:
[0,1,0,3,12]

Output:
[1,3,12,0,0]

How:

[0,1,0,3,12]
    ↓ collect non-zero values
[1,3,12,_,_]
         ↓ fill remaining positions with 0
[1,3,12,0,0]

Relative order 1 → 3 → 12 remains unchanged.

2. Intuition

Use a slow pointer write representing:

the next position where a non-zero element should be placed.

Scan with read.

read → scans every element
write → points to next non-zero destination

Example:

nums = [0,1,0,3,12]

read=0 → 0     ignore
read=1 → 1     nums[0] = 1
read=2 → 0     ignore
read=3 → 3     nums[1] = 3
read=4 → 12    nums[2] = 12

array logically becomes:

[1,3,12,_,_]

fill remaining positions with 0

[1,3,12,0,0]

Core invariant:

nums[0 ... write-1]

always contains the processed non-zero elements in their original order.

3. Relevant interviewer edge cases

Ask only if the specification is unclear:

Should the relative order of non-zero elements remain unchanged? → Yes.
Must modification happen in-place? → Yes.
Is O(1) extra space expected? → Yes.
Can numbers be negative? → Yes; only numeric 0 matters.
Should the function return the array or modify it only? → LeetCode expects in-place modification; return value is irrelevant.

Important test cases:

[0,0,0]       → [0,0,0]
[1,2,3]       → [1,2,3]
[0,1]         → [1,0]
[1,0]         → [1,0]
[0]           → [0]
[5,0,-2,0,3]  → [5,-2,3,0,0]
 */

function moveZeros(nums) {
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== 0) {
      nums[write] = nums[read];
      write++;
    }
  }

  while (write < nums.length) {
    nums[write++] = 0;
  }
}

// 1. Standard mixed array
let arr1 = [0, 1, 0, 3, 12];
moveZeros(arr1);
console.log(arr1); // [1, 3, 12, 0, 0]

// 2. Zeros at the beginning
let arr2 = [0, 0, 0, 4, 5];
moveZeros(arr2);
console.log(arr2); // [4, 5, 0, 0, 0]

// 3. Zeros already at the end
let arr3 = [7, 8, 9, 0, 0];
moveZeros(arr3);
console.log(arr3); // [7, 8, 9, 0, 0]

// 4. Alternating zeros and non-zeros
let arr4 = [1, 0, 2, 0, 3, 0];
moveZeros(arr4);
console.log(arr4); // [1, 2, 3, 0, 0, 0]

// 5. All zeros
let arr5 = [0, 0, 0, 0];
moveZeros(arr5);
console.log(arr5); // [0, 0, 0, 0]

// 6. No zeros
let arr6 = [1, 2, 3, 4, 5];
moveZeros(arr6);
console.log(arr6); // [1, 2, 3, 4, 5]

// 7. Single element (zero)
let arr7 = [0];
moveZeros(arr7);
console.log(arr7); // [0]

// 8. Single element (non-zero)
let arr8 = [9];
moveZeros(arr8);
console.log(arr8); // [9]

// 9. Negative numbers and zeros
let arr9 = [-1, 0, -3, 0, 5, -2];
moveZeros(arr9);
console.log(arr9); // [-1, -3, 5, -2, 0, 0]

// 10. Empty array
let arr10 = [];
moveZeros(arr10);
console.log(arr10); // []
