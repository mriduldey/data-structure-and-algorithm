/**
 * LC 217 — Contains Duplicate

A very common and foundational LeetCode array + hashing problem frequently asked in FAANG interviews.
Tests:

HashSet understanding
Time vs space tradeoff
Duplicate detection patterns
Basic optimization thinking

Typical expectation:

Optimal Time: O(n)
Optimal Space: O(n)
1. Problem Description

Given an integer array nums, return:

true → if any value appears at least twice
false → if all elements are unique
Common Constraints
1 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9
Example
Input:
nums = [1,2,3,1]

Output:
true
Why?
1 appears twice
Therefore duplicate exists
Example 2
Input:
nums = [1,2,3,4]

Output:
false
Why?
Every element appears once only
2. Intuition

Main observation:

If we already saw a number before, then duplicate exists.

Best structure for fast lookup:

HashSet

Because:

Insert → O(1)
Search → O(1)

Algorithm:

Create empty set
Traverse array
If current number already exists in set:
return true
Else insert into set
End → return false
3. Relevant Edge Cases (Important Interview Questions)

Ask interviewer:

1. Can array be empty?

Usually no in LC constraints, but good to ask.

2. Can numbers be negative?

Yes.

Example:

[-1,-2,-1]
3. Should duplicate count be exactly 2 or >=2?

Any repeated occurrence counts.

4. Is modifying input array allowed?

Important because sorting approach modifies array.

5. Expected optimized complexity?

Usually interviewer expects:

Time: O(n)
Space: O(n)
 */

function containsDuplicate(nums) {
  const seen = new Set(nums);

  return seen.size === nums.length;
}


console.log(containsDuplicate([1, 2, 3, 6, 4, 5]))