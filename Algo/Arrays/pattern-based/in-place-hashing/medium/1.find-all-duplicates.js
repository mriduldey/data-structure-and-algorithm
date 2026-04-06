/**
 * LC 442 — Find All Duplicates in an Array
1. Problem Description (FAANG Importance ⭐⭐⭐⭐)

Very frequently asked in FAANG for array + in-place marking + cycle/index mapping patterns.

Problem:
Given an integer array nums of size n, where:

1 ≤ nums[i] ≤ n
Each number appears once or twice

Return all elements that appear twice.

Constraints
1 ≤ n ≤ 10^5
Values in range [1, n]
Each element appears 1 or 2 times only
Expected Complexity
Time: O(n)
Space: O(1) (excluding output)
Example
Input:  nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
How output is formed
2 appears twice → include
3 appears twice → include
→ Result: [2,3]
2. Intuition (Core FAANG Insight)
🔑 Key Observation:
Values are in range [1, n] → can map each value to an index:
value v → index v-1
💡 Trick: Sign Marking (In-place hashing)
Traverse array
For each number x:
Check index abs(x) - 1
If already negative → duplicate found
Else → mark it negative
Why it works:
First visit → mark visited
Second visit → detect duplicate
3. Edge Cases (Ask Interviewer)

Only relevant ones:

Can numbers appear more than twice?
→ (Important: solution breaks if >2)
Can we modify the array?
→ Required for O(1) space
Is output order important?
→ Usually no
What about empty array?
→ Return []
 */

//  --> Only works when duplicate constarins are only 1 or 2. If more below logic will not work
function findAllDuplicates(nums) {
  if (!nums || nums.length <= 1) return [];

  const result = [];

  for (const num of nums) {
    const index = Math.abs(num) - 1;
    if (nums[index] < 0) {
      result.push(Math.abs(num));
    } else {
      nums[index] = -num;
    }
  }

  return result;
}

console.log(findAllDuplicates([1, , 2, 3, 4, 1, 4, 5, 6, 8, 2]));
