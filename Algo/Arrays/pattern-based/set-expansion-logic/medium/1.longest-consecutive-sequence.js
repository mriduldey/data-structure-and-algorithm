/**
 * LC 128 — Longest Consecutive Sequence

Very high-frequency FAANG problem (Google, Amazon, Meta, Microsoft). Tests HashSet optimization + sequence detection. Important because brute force and sorting exist, but interview expectation is usually O(n).

1. Problem Description

Given unsorted integer array nums, return length of longest consecutive elements sequence.

Consecutive means difference = 1.

Example:

nums = [100,4,200,1,3,2]

Sequence:
1 → 2 → 3 → 4

Length = 4
Output = 4

Example 2:

nums = [0,3,7,2,5,8,4,6,0,1]

Sequence:
0→1→2→3→4→5→6→7→8

Length = 9

Common constraints:

0 <= nums.length <= 10^5
-10^9 <= nums[i] <= 10^9

Expected interview complexity:

Time: O(n)
Space: O(n)

Sorting solution O(n log n) usually rejected if interviewer explicitly asks optimal.

2. Intuition

Naive:

For every element:
check x+1,x+2,x+3...

Worst:

1,2,3,4,5...

becomes:

O(n²)

Optimization:

Store all numbers in HashSet.

Start sequence ONLY when:

num-1 NOT exists

Meaning sequence start found.

Example:

[100,4,200,1,3,2]

1 → no previous → start

Expand:
1→2→3→4

2 skipped because 1 exists
3 skipped because 2 exists
4 skipped because 3 exists

Each element visited once → O(n).

3. Relevant Edge Cases (ask interviewer)
Empty array
[]
Output = 0
Duplicates
[1,2,2,3]

Sequence:
1,2,3

Output = 3

Need set.

Single element
[5]

Output = 1
Negative values
[-3,-2,-1,0]

Output = 4
Entire array consecutive
[1,2,3,4]

Output = 4

Ask:

1. Can duplicates exist?
2. Negative numbers allowed?
3. Need O(n) optimal?
4. Return sequence length only or actual sequence?
5. Input size constraints?
 */

function longestConsecutiveSeq(nums) {
  if (nums.length <= 1) return nums.length;

  let maxLen = 0;
  const set = new Set(nums);

  for (const num of nums) {
    // Sequence start
    if (!set.has(num - 1)) {
      let current = num;
      let length = 1;

      while (set.has(current + 1)) {
        current++;
        length++;
      }

      maxLen = Math.max(maxLen, length);
    }
  }

  return maxLen;
}

console.log(longestConsecutiveSeq([])); // 0
console.log(longestConsecutiveSeq([2])); // 1
console.log(longestConsecutiveSeq([1, 2, 3, 6])); // 3
console.log(longestConsecutiveSeq([2, 6, 7, 8, 9, 19, 23])); // 4
console.log(longestConsecutiveSeq([4, 5, 3, 2])); // 4
