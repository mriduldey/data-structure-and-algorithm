/**
 * 1. LC 1089 — Duplicate Zeros

FAANG importance: Medium | Frequency: Low–Medium

Good interview problem for testing in-place array modification, two pointers, backward traversal, boundary handling, and avoiding overwrite bugs.

Given a fixed-length integer array arr, duplicate every 0, shifting the remaining elements to the right. Elements pushed beyond the original array length are discarded.

Common constraints

1 <= arr.length <= 10^4
0 <= arr[i] <= 9

Expected

Time: O(n)
Extra Space: O(1)
Modify the array in-place

Example:

Input:
[1,0,2,3,0,4,5,0]

Conceptually after duplicating:
[1,0,0,2,3,0,0,4,5,0,0]

But original length = 8

Output:
[1,0,0,2,3,0,0,4]
2. Intuition

We cannot safely process left → right because inserting a duplicated zero immediately overwrites values we have not processed yet.

Instead:

1. Count how many zeros exist.
2. Imagine the array temporarily has length:

   n + zeroCount

3. Use two pointers from right to left:

   i = original index
   j = virtual expanded index

4. Copy arr[i] → arr[j] only when j < n.

5. If arr[i] === 0:
      decrement j again
      write another 0 if j < n.

Why backward traversal works:

Original:
[1,0,2,3,0,4,5,0]

Virtual:
[1,0,0,2,3,0,0,4,5,0,0]

We simulate this expanded array without actually allocating it.

3. Edge Cases to Ask Interviewer

Relevant questions:

Is the array length fixed?
Yes. Elements falling outside the original length are discarded.
Must the modification be in-place?
Usually yes, expected O(1) extra space.
Can the array contain all zeros?
Yes.
Can there be no zeros?
Yes; array remains unchanged.
What happens if duplicating the last zero exceeds the boundary?
The extra duplicated zero is discarded.

Important examples:

[1,2,3]
→ [1,2,3]

[0,0,0]
→ [0,0,0]

[1,2,3,0]
→ [1,2,3,0]

[1,0,2]
→ [1,0,0]

[0,1,2]
→ [0,0,1]
 */

function duplicateZero(nums) {
  const n = nums.length;

  let zeroCount = 0;

  for (const num of nums) {
    if (num === 0) {
      zeroCount++;
    }
  }

  let i = n - 1;
  let j = n + zeroCount - 1;

  while (i >= 0) {
    if (j < n) {
      nums[j] = nums[i];
    }

    if (nums[i] === 0) {
      j--;
      if (j < n) {
        nums[j] = 0;
      }
    }

    i--;
    j--;
  }
}


// Example 1: Standard LeetCode test case with zeroes in middle
let arr1 = [1, 0, 2, 3, 0, 4, 5, 0];
duplicateZero(arr1);
console.log("Example 1:", arr1); // [1, 0, 0, 2, 3, 0, 0, 4]

// Example 2: No zeroes present in the array
let arr2 = [1, 2, 3, 4, 5];
duplicateZero(arr2);
console.log("Example 2:", arr2); // [1, 2, 3, 4, 5]

// Example 3: All elements are zeroes
let arr3 = [0, 0, 0, 0];
duplicateZero(arr3);
console.log("Example 3:", arr3); // [0, 0, 0, 0]

// Example 4: Single zero element
let arr4 = [0];
duplicateZero(arr4);
console.log("Example 4:", arr4); // [0]

// Example 5: Single non-zero element
let arr5 = [5];
duplicateZero(arr5);
console.log("Example 5:", arr5); // [5]

// Example 6: Zero at the very start of array
let arr6 = [0, 1, 2, 3];
duplicateZero(arr6);
console.log("Example 6:", arr6); // [0, 0, 1, 2]

// Example 7: Zero at the very end of array (gets shifted out of bounds)
let arr7 = [1, 2, 3, 0];
duplicateZero(arr7);
console.log("Example 7:", arr7); // [1, 2, 3, 0]

// Example 8: Zero whose duplicate gets cut off by the boundary edge
let arr8 = [8, 4, 5, 0, 0, 0, 0, 7];
duplicateZero(arr8);
console.log("Example 8:", arr8); // [8, 4, 5, 0, 0, 0, 0, 0]

// Example 9: Alternating zeroes and non-zeroes
let arr9 = [1, 0, 2, 0];
duplicateZero(arr9);
console.log("Example 9:", arr9); // [1, 0, 0, 2]

// Example 10: Two adjacent zeroes at the start
let arr10 = [0, 0, 1, 2, 3];
duplicateZero(arr10);
console.log("Example 10:", arr10); // [0, 0, 0, 0, 1]