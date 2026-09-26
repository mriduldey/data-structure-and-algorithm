/**
 * LC 75 — Sort Colors
1. Problem Description
LC 75 — Sort Colors is a high-value Two Pointers / Dutch National Flag problem. It is a common FAANG-style interview problem because the optimal solution tests in-place partitioning, pointer invariants, and careful index movement.
Given an array containing only 0, 1, and 2:
- 0 = red
- 1 = white
- 2 = blue
Sort it in-place so all 0s come first, then 1s, then 2s.
Common constraints
- 1 <= nums.length <= 300
- nums[i] ∈ {0,1,2}
- Do not use library sorting for the intended solution.
Expected optimal complexity: O(n) time, O(1) extra space.
Example
Input:  [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Why?
0 occurs twice
1 occurs twice
2 occurs twice

So → [0,0] + [1,1] + [2,2]

The stronger interview requirement is usually: Can you do it in one pass with constant extra space?
2. Intuition
Use the Dutch National Flag algorithm with three pointers:
low  = boundary where next 0 belongs
mid  = current element being examined
high = boundary where next 2 belongs

Maintain this invariant:
[0 ........ low-1]   → all 0
[low ...... mid-1]   → all 1
[mid ...... high]    → unknown
[high+1 .... n-1]    → all 2

Now inspect nums[mid]:
nums[mid] === 0
→ swap(nums[mid], nums[low])
→ low++
→ mid++

nums[mid] === 1
→ already correctly positioned
→ mid++

nums[mid] === 2
→ swap(nums[mid], nums[high])
→ high--
→ DO NOT mid++

Why don't we increment mid after swapping with high?
Because the element coming from high has not been examined yet.
Example:
[1,2,0]
   ↑ ↑
  mid high

swap 2 with 0

[1,0,2]
   ↑
  mid

The new nums[mid] = 0 still needs processing.
This is the most important implementation detail.
3. Edge Cases to Ask Interviewer
Only useful clarifications:
1. Is the input guaranteed to contain only 0, 1, and 2?
2. Must the operation be in-place with O(1) extra space?
3. Is a single-pass solution required, or is two-pass counting acceptable?
4. Can I modify the original array?
5. Can the input be empty? (LeetCode says no, but generic interview versions may allow it.)
Cases your implementation naturally handles:
[]
[0]
[1]
[2]

[0,0,0]
[1,1,1]
[2,2,2]

[0,1,2]       // already sorted
[2,1,0]       // reverse order
[2,0,2,1,1,0]
 */

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function sortColours(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      swap(nums, low, mid);
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      swap(nums, mid, high);
      high--;
    }
  }

  return nums;
}

console.log(sortColours([2, 0, 2, 1, 1, 0])); // [0, 0, 1, 1, 2, 2]

console.log(sortColours([2, 0, 1])); // [0, 1, 2]

console.log(sortColours([0])); // [0]

console.log(sortColours([1])); // [1]

console.log(sortColours([2])); // [2]

console.log(sortColours([1, 0])); // [0, 1]

console.log(sortColours([2, 1, 0])); // [0, 1, 2]

console.log(sortColours([0, 0, 0, 0])); // [0, 0, 0, 0]

console.log(sortColours([2, 2, 2, 2])); // [2, 2, 2, 2]

console.log(sortColours([1, 2, 0, 1, 2, 0, 1, 2, 0])); // [0, 0, 0, 1, 1, 1, 2, 2, 2]
