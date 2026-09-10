/**
 * LC 11 — Container With Most Water ⭐⭐⭐⭐⭐
1. Problem Description

Importance in FAANG: Very High
Frequency: Frequently asked / classic Two Pointers interview problem.
Difficulty: Medium
Pattern: Opposite-direction Two Pointers

You are given an array height, where height[i] represents a vertical line at index i.

Choose two lines such that together with the x-axis they form a container holding the maximum possible water.

For indices left and right:

width  = right - left
height = min(height[left], height[right])

area = width × min(height[left], height[right])
Common Constraints
2 <= height.length <= 10^5
0 <= height[i] <= 10^4
Expected Complexity
Time:  O(n)
Space: O(1)

Brute force checking every pair is O(n²) and is normally not acceptable.

Example
height = [1,8,6,2,5,4,8,3,7]

Output: 49

Best lines:

index 1 → height 8
index 8 → height 7

width = 8 - 1 = 7
height = min(8, 7) = 7

area = 7 × 7 = 49
2. Intuition

Start with the widest possible container:

left = 0
right = n - 1

Calculate:

area = (right - left) *
       min(height[left], height[right])

Now we need to reduce the width.

The critical observation:

The shorter line is the bottleneck.

Suppose:

height[left] < height[right]

Moving right inward cannot help:

width decreases
container height <= height[left]

So the area cannot become larger while keeping that same short left line.

Therefore, discard the shorter line:

if leftHeight < rightHeight
    left++
else
    right--

This eliminates one impossible candidate every iteration, giving O(n).

Why not move the taller pointer?

Example:

left height  = 3
right height = 10

Current container height:

min(3, 10) = 3

If we move the 10, width becomes smaller while height is still limited by 3.

The only chance of increasing area is finding a line higher than 3, so move left.

3. Edge Cases to Ask Interviewer

Only a few questions are useful here:

Are there always at least two lines?
LeetCode guarantees yes.
Can heights contain 0?
Yes.
Are all heights non-negative?
Yes.
Do you need only the maximum area, or also the indices forming it?
Standard LC 11 requires only the area.
Can the input array be modified?
No modification is required.

Important examples:

[1,1]           → 1
[0,0]           → 0
[1,2,3,4,5]     → increasing
[5,4,3,2,1]     → decreasing
[5,5,5,5]       → equal heights
 */

function containerWithMostWater(heights) {
  if (heights.length === 0) return 0;

  let left = 0;
  let right = heights.length - 1;

  let maxArea = 0;

  while (left < right) {
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);

    maxArea = Math.max(maxArea, width * height);

    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}

// Example 1
console.log(containerWithMostWater([1,8,6,2,5,4,8,3,7])); // 49

// Example 2
console.log(containerWithMostWater([1,1])); // 1

// Example 3
console.log(containerWithMostWater([4,3,2,1,4])); // 16

// Example 4
console.log(containerWithMostWater([1,2,1])); // 2

// Example 5
console.log(containerWithMostWater([2,3,4,5,18,17,6])); // 17

// Example 6
console.log(containerWithMostWater([1,2,3,4,5,25,24,3,4])); // 24

// Example 7
console.log(containerWithMostWater([1,1000,1000,1])); // 1000

// Example 8
console.log(containerWithMostWater([10,9,8,7,6,5,4,3,2,1])); // 25

// Example 9
console.log(containerWithMostWater([1,2,4,3])); // 4

// Example 10
console.log(containerWithMostWater([2,2,2,2])); // 6
