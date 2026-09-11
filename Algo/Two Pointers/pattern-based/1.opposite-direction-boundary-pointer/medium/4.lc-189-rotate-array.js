/**
 * 1. LC 189 — Rotate Array

Importance: ★★★★★
FAANG frequency: High. Very useful for testing array manipulation, modular arithmetic, in-place reversal, and O(1) space optimization.

Given an integer array nums, rotate it to the right by k positions.

Common constraints
1 <= nums.length <= 10^5
-2^31 <= nums[i] <= 2^31 - 1
0 <= k <= 10^5
Expected complexity
Time: O(n)
Extra Space: O(1) for the optimal solution
Example
nums = [1,2,3,4,5,6,7]
k = 3

Output:
[5,6,7,1,2,3,4]

Because the last 3 elements:

[5,6,7]

move to the front.

2. Intuition

A straightforward solution uses another array:

newIndex = (i + k) % n

But that requires O(n) extra space.

For the optimal in-place solution, use the 3-reversal technique.

For:

[1,2,3,4,5,6,7]
k = 3

Reverse the whole array:

[7,6,5,4,3,2,1]

Reverse first k elements:

[5,6,7,4,3,2,1]

Reverse remaining elements:

[5,6,7,1,2,3,4]
Why it works

Think of the array as:

A B

where B contains the last k elements.

We want:

B A

Reversals transform:

A B
↓
reverse(B) reverse(A)
↓
B A

The critical normalization is:

k %= nums.length;

because rotating by n, 2n, 3n, etc. leaves the array unchanged.

3. Edge Cases to Ask the Interviewer

Only relevant questions:

Can k be greater than the array length?
Yes → normalize using:
k %= nums.length;
Can k = 0?
Yes → array remains unchanged.
Should rotation be in-place?
LC 189 strongly prefers O(1) extra space.
Can the array contain duplicates or negative numbers?
Yes; they do not affect the algorithm.
Can the array be empty?
LeetCode guarantees at least one element, but production code may guard against it.
 */

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function rotateArray(nums, k) {
  const n = nums.length;

  if (n === 0) return [];

  nums.reverse();

  k %= n;

  let left = 0;
  let right = k - 1;

  while (left < right) {
    swap(nums, left, right);
    left++;
    right--;
  }

  left = k;
  right = n - 1;

  while (left < right) {
    swap(nums, left, right);
    left++;
    right--;
  }

  return nums;
}

// Example 1
console.log(rotateArray([1, 2, 3, 4, 5, 6, 7], 3));
// [5,6,7,1,2,3,4]

// Example 2
console.log(rotateArray([1, 2], 5));
// [2,1]

// Example 3
console.log(rotateArray([10, 20, 30, 40, 50], 2));
// [40,50,10,20,30]

// Example 4
console.log(rotateArray([0, 0, 0], 1));
// [0,0,0]

// Example 5
console.log(rotateArray([9], 100));
// [9]

// Example 6
console.log(rotateArray([1, 2, 3, 4], 0));
// [1,2,3,4]

// Example 7
console.log(rotateArray([1, 2, 3, 4], 4));
// [1,2,3,4]

// Example 8
console.log(rotateArray([11, 22, 33, 44, 55, 66], 1));
// [66,11,22,33,44,55]

// Example 9
console.log(rotateArray([5, 10, 15, 20, 25], 3));
// [15,20,25,5,10]

// Example 10
console.log(rotateArray([100, 200, 300, 400, 500, 600, 700, 800], 6));
// [300,400,500,600,700,800,100,200]
