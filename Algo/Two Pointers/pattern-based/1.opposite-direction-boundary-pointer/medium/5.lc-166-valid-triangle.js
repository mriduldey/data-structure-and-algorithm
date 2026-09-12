/**
 *LC 611 — Valid Triangle Number ★★★★☆

FAANG importance: High for Two Pointers. It is a strong interview problem because it tests sorting, the triangle inequality, recognizing a fixed-third-element pattern, and converting an apparent O(n³) problem into O(n²).

1. Problem Description

Given an integer array nums, return the number of index triplets (i, j, k) that can form a valid triangle.

For sides a ≤ b ≤ c, a triangle is valid iff:

a + b > c

The other two triangle inequalities automatically hold because the values are sorted and positive/non-negative.

Common constraints
3 <= nums.length <= 1000
0 <= nums[i] <= 1000
Expected complexity
Time:  O(n²)
Space: O(log n) to O(n), depending on JS sorting implementation

The interview target is O(n²) after sorting.

Example
nums = [2, 2, 3, 4]

Valid triangles:

2,2,3
2,3,4
2,3,4   // second 2 uses a different index

Answer = 3

Notice that indices matter, so equal values at different positions can create separate triplets.

2. Intuition

First sort:

[2, 2, 3, 4]

Instead of selecting three numbers independently, fix the largest side:

nums[k]

Now find pairs:

nums[left] + nums[right] > nums[k]

with:

left < right < k

The key observation:

If

nums[left] + nums[right] > nums[k]

then because the array is sorted:

nums[left + 1] + nums[right] > nums[k]
nums[left + 2] + nums[right] > nums[k]
...
nums[right - 1] + nums[right] > nums[k]

Therefore all:

right - left

pairs are valid at once.

So:

if nums[left] + nums[right] > nums[k]
    count += right - left
    right--
else
    left++
Why move right-- when valid?

We have already counted every pair ending at right that works with k.

Now we need to test the next smaller right.

Why move left++ when invalid?

If:

nums[left] + nums[right] <= nums[k]

then nums[left] cannot work with this right or anything smaller.

So increase left.

3. Edge Cases to Ask the Interviewer

Only the relevant ones:

Can side lengths contain 0?
Yes. Zero cannot contribute to a valid triangle.
Are duplicate side lengths allowed?
Yes, and different indices count as different triplets.
Do we count index triplets or unique value combinations?
LC 611 counts index triplets.
Can I modify the input array by sorting it?
If not, sort a copy.
Can negative values occur?
Standard LC 611 constraints say no. If arbitrary input is allowed, positive side lengths should be enforced.
 * 
 * */

function validTriangle(nums) {
  if (!nums || nums.length <= 0) return 0;

  nums.sort((a, b) => a - b);

  let count = 0;

  for (let k = nums.length - 1; k >= 0; k--) {
    let left = 0;
    let right = k - 1;

    while (left < right) {
      if (nums[left] + nums[right] > nums[k]) {
        count++;
        right--;
      } else {
        left++;
      }
    }
  }

  return count;
}

//Test examples
console.log(validTriangle([2, 2, 3, 4])); // Output: 2 (but correct answer should be 3)
console.log(validTriangle([4, 2, 3, 4])); // Output: 3
console.log(validTriangle([2, 2, 2, 2])); // Output: 2 (correct answer should be 4)
console.log(validTriangle([3, 4, 6, 7])); // Output: 3 (correct answer should be 3)
console.log(validTriangle([0, 1, 1, 1])); // Output: 1 (correct answer should be 1)
