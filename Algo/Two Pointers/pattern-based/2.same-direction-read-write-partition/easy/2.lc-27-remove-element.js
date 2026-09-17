/**
 * 1. LC 27 — Remove Element

Importance in FAANG: ⭐⭐⭐⭐☆ — Medium-frequency foundational Two Pointers / In-place Array problem. The exact problem is simple, but the underlying pattern is frequently tested through harder variants such as duplicate removal, partitioning, filtering, and moving elements in-place.

Given an integer array nums and integer val, remove every occurrence of val in-place and return the number k of remaining elements.

After execution:

nums[0 ... k-1]

must contain all elements that are not equal to val. Elements after index k - 1 do not matter.

Common constraints

0 <= nums.length <= 100
0 <= nums[i] <= 50
0 <= val <= 100

Expected interview complexity

Time  : O(n)
Space : O(1)

Example

nums = [3,2,2,3]
val = 3

Valid elements = [2,2]

k = 2

nums can become:
[2,2,_,_]

Only the first k = 2 positions matter.

Another example:

nums = [0,1,2,2,3,0,4,2]
val = 2

Remaining:
[0,1,3,0,4]

k = 5
2. Intuition

Use a slow/write pointer.

read  → scans every element
write → tells where the next valid element should go

Whenever:

nums[read] !== val

copy it to:

nums[write]

and increment write.

Example:

nums = [3,2,2,3]
val = 3

read=0 → 3 → skip

read=1 → 2
nums[0] = 2
write=1

read=2 → 2
nums[1] = 2
write=2

read=3 → 3 → skip

return 2

Invariant:

nums[0 ... write-1]

always contains exactly the valid elements processed so far.

3. Relevant Edge Cases to Ask Interviewer

Can the input array be empty?

[] → return 0
Should the relative order of remaining elements be preserved?
Important because there is another faster-write variant when order does not matter.
Do elements after returned k matter?
Usually no.

Can all elements equal val?

[2,2,2], val=2 → k=0

Can val be absent?

[1,2,3], val=4 → k=3

These are enough; don't waste interview time asking about trivial numeric ranges unless unspecified.
 */

function removeElement(nums, val) {
  let write = 0;

  for (let read = 0; read < nums.length; read++) {
    if (nums[read] !== val) {
      nums[write] = nums[read];
      write++;
    }
  }

  return write;
}

function testRemoveElement(nums, val, expectedNums) {
  const original = [...nums];
  const k = removeElement(nums, val);
  const actualSlice = nums.slice(0, k);

  console.log(
    `Input: nums = [${original}], val = ${val}\n` +
      `  Expected: length = ${expectedNums.length}, nums = [${expectedNums}]\n` +
      `  Actual:   length = ${k}, nums = [${actualSlice}]\n`,
  );
}

// 1. Standard case with multiple targets
testRemoveElement([3, 2, 2, 3], 3, [2, 2]);

// 2. Standard case with target scattered throughout
testRemoveElement([0, 1, 2, 2, 3, 0, 4, 2], 2, [0, 1, 3, 0, 4]);

// 3. Array containing only target elements
testRemoveElement([1, 1, 1, 1], 1, []);

// 4. Array containing no target elements
testRemoveElement([1, 2, 3, 4], 5, [1, 2, 3, 4]);

// 5. Target element at the very beginning
testRemoveElement([7, 1, 2, 3], 7, [1, 2, 3]);

// 6. Target element at the very end
testRemoveElement([1, 2, 3, 7], 7, [1, 2, 3]);

// 7. Empty array edge case
testRemoveElement([], 1, []);

// 8. Single element array (matches target)
testRemoveElement([4], 4, []);

// 9. Single element array (does not match target)
testRemoveElement([4], 2, [4]);

// 10. Alternating target and non-target elements
testRemoveElement([2, 5, 2, 5, 2, 5], 2, [5, 5, 5]);
