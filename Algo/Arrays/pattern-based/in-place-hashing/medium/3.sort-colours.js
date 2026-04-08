/**
 * LC 75 — Sort Colors (Dutch National Flag Problem)
1. Description (FAANG Importance + Constraints)

Problem:
Given an array nums containing only 0, 1, and 2, sort it in-place so that:

0 → red
1 → white
2 → blue

Why important (FAANG):

Very frequent in interviews (Google, Amazon, Meta)
Tests:
Two-pointer mastery
In-place partitioning
Foundation for QuickSort partition logic
Constraints
1 ≤ n ≤ 10^5
nums[i] ∈ {0,1,2}
Expected Complexity
Time: O(n) (single pass)
Space: O(1) (in-place)
Example
Input:  [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

How:

Move all 0s to left
Move all 2s to right
1s automatically settle in middle
2. Intuition (Core Insight)

This is a 3-way partition problem.

Maintain 3 regions:

[0...low-1]     → 0s
[low...mid-1]   → 1s
[mid...high]    → unknown
[high+1...n-1]  → 2s
Pointer Roles
low → next position for 0
mid → current element
high → next position for 2
Processing Rules
nums[mid]	Action
0	swap(low, mid), low++, mid++
1	mid++
2	swap(mid, high), high--

⚠️ Important: When swapping with high, do NOT increment mid (unknown element comes)

3. Edge Cases (Ask Interviewer)

Ask these explicitly:

Can array be empty?
Only one type? [0,0,0], [2,2]
Already sorted?
Reverse sorted?
Large input size (performance expectations)
Can we use extra space? (usually NO)
 */

function sortColours(nums) {
  let low = 0,
    mid = 0,
    high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }

  return nums;
}

console.log(sortColours([1, 0, 2, 0, 1]));
