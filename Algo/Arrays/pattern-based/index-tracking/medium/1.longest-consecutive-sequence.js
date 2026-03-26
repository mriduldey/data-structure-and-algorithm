/**
 * 1. LC 128 — Longest Consecutive Sequence

Problem:
Given an unsorted array nums, return the length of the longest consecutive elements sequence.
Must run in O(n) time.

Example:

Input:  nums = [100,4,200,1,3,2]
Sorted: [1,2,3,4,100,200]

Longest consecutive sequence: [1,2,3,4]
Output: 4
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Sequence: [0,1,2,3,4,5,6,7,8]
Output: 9
2. Intuition (Core FAANG Insight)

Key observation:

We don’t need sorting (would be O(n log n))
Use HashSet for O(1) lookup

Trick:

Only start counting when num - 1 is NOT present
→ ensures we start from the beginning of a sequence

Why this works:

Each sequence is traversed once
Avoid redundant scans → guarantees O(n)
3. Edge Cases (Ask Interviewer)
Empty array → return 0
Single element → return 1
Duplicates present?
Negative numbers?
Large range values?
Can numbers repeat many times?
Input size constraints?
 */

function longestConsecutive(nums) {
  if (!nums || nums.length === 0) return 0;

  const set = new Set(nums);
  let maxLen = 0;

  for (const num of nums) {
    // Only for begenning of the sequence
    if (!set.has(num - 1)) {
      let currentNum = num;

      while (set.has(currentNum + 1)) {
        currentNum++;
      }

      maxLen = Math.max(maxLen, currentNum - num + 1);
    }
  }

  return maxLen;
}


console.log(longestConsecutive([])); // 0
console.log(longestConsecutive([1])); // 1
console.log(longestConsecutive([0])); // 1
console.log(longestConsecutive([0, 1])); // 2
console.log(longestConsecutive([0, 1, 3, 2])); // 4
console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); // 9
console.log(longestConsecutive([100,4,200,1,3,2])); // 4