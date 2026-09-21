/**
 * 1. LC 2460 — Apply Operations to an Array

FAANG importance: ⭐⭐☆☆☆ Low–Medium
Not a canonical FAANG problem, but useful for testing array simulation + two pointers/in-place compaction. The underlying pattern is more important than this exact problem.

Given nums, process adjacent elements from left to right:

If nums[i] === nums[i + 1]
nums[i] *= 2
nums[i + 1] = 0
After all operations, move all 0s to the end while preserving the relative order of non-zero elements.

Common constraints

2 <= nums.length <= 2000
0 <= nums[i] <= 1000

Expected: O(n) time, ideally O(1) auxiliary space.

Example:

nums = [1,2,2,1,1,0]

Operations:
i=0 → 1 != 2
i=1 → 2 == 2 → [1,4,0,1,1,0]
i=2 → 0 != 1
i=3 → 1 == 1 → [1,4,0,2,0,0]

Move zeros:
[1,4,2,0,0,0]
2. Intuition

Do it in two passes.

Pass 1 → Apply adjacent merge operations.
Pass 2 → Compact all non-zero values toward the left.

For compaction, maintain a write pointer indicating where the next non-zero value belongs.

[1,4,0,2,0,0]
     ↑ read

write = 2

copy 2 → index 2

[1,4,2,0,0,0]

The important detail is that operations must be applied sequentially from left to right. A value modified during an operation affects later comparisons.

3. Edge Cases to Ask the Interviewer

Relevant questions:

Should operations be processed strictly left-to-right?
Yes.
Can input already contain zeros?
Yes.
Should non-zero relative order remain unchanged after moving zeros?
Yes.
Should I modify the input array in place?
Preferably yes; O(1) auxiliary space is achievable.
 */

function applyOperations(nums) {
  if (nums.length === 0) return nums;

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) {
      nums[i] *= 2;
      nums[i + 1] = 0;
    }
  }

  let write = 0;

  for (let left = 0; left < nums.length; left++) {
    if (nums[left] !== 0) {
      nums[write] = nums[left];
      write++;
    }
  }

  while (write < nums.length) {
    nums[write] = 0;
    write++;
  }

  return nums;
}

console.log(applyOperations([1, 2, 2, 1])); // [1,4,1,0]
console.log(applyOperations([0, 0, 1])); // [1,0,0]
console.log(applyOperations([2, 2, 2])); // [4,2,0]
console.log(applyOperations([1, 1, 1, 1])); // [2,2,0,0]
console.log(applyOperations([3, 3, 0, 3])); // [6,3,0,0]
console.log(applyOperations([5, 5, 5, 0])); // [10,5,0,0]
console.log(applyOperations([10, 10, 20, 20])); // [20,40,0,0]
console.log(applyOperations([4, 0, 4, 4])); // [8,4,0,0]
console.log(applyOperations([7, 7, 7, 7, 7])); // [14,14,7,0,0]
console.log(applyOperations([1, 2, 3, 4])); // [1,2,3,4]
