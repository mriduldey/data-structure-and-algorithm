/**
 * 1. LC 26 — Remove Duplicates from Sorted Array

Importance: ⭐⭐⭐⭐☆
FAANG frequency: Medium–High. Very common foundational two-pointer / in-place array problem. Often used as a warm-up or extended through follow-ups such as LC 80.

You are given a sorted integer array nums. Remove duplicates in-place so every unique value appears exactly once.

Return k = number of unique elements.

After execution:

nums[0 ... k-1]

must contain the unique elements in sorted order.

The values after index k - 1 do not matter.

Common constraints
1 <= nums.length <= 3 * 10^4
-100 <= nums[i] <= 100
nums is sorted in non-decreasing order
Expected complexity
Time:  O(n)
Space: O(1)
Example
nums = [0,0,1,1,1,2,2,3,3,4]

Output:
k = 5

nums becomes:
[0,1,2,3,4,_,_,_,_,_]

Why?

Unique values = 0, 1, 2, 3, 4
Count = 5
2. Intuition

Because the array is sorted, duplicates always appear next to each other.

Use two pointers:

read  → scans every element
write → position where next unique element should be written

Initially:

write = 1

The first element is automatically unique.

For every read:

if nums[read] !== nums[write - 1]
    nums[write] = nums[read]
    write++

Example:

[1,1,2,2,3]

 write
   ↓
[1,1,2,2,3]
   ↑
 read

First duplicate 1 → ignore.

Then 2:

[1,2,2,2,3]
     ↑
    write

Then 3:

[1,2,3,2,3]

k = 3
Core invariant

At any moment:

nums[0 ... write-1]

contains all unique elements discovered so far.

3. Relevant Interview Edge Cases

Only clarify these if the interviewer has not already specified them.

Is the input guaranteed to be sorted?
Critical. This solution depends on sorting.
Must modification be in-place?
LC26 expects O(1) extra space.
Should relative/sorted order remain unchanged?
Yes.
What should I return?
Number of unique elements k, not the modified array.
Do elements after k matter?
No.

Useful cases to mentally test:

[1]             → k = 1
[1,1,1]         → k = 1
[1,2,3]         → k = 3
[-1,-1,0,0,1]   → k = 3
 */

function removeDuplicatesFromArr(nums) {
  if (nums.length === 0) return 0;

  let write = 1;

  for (let read = 1; read < nums.length; read++) {
    if (nums[read] !== nums[write - 1]) {
      nums[write] = nums[read];
      write++;
    }
  }

  return write;
}

// Example 1
console.log(removeDuplicatesFromArr([1,1,2,2,3])); 
// 3 → unique elements are [1,2,3]

// Example 2
console.log(removeDuplicatesFromArr([0,0,0,0])); 
// 1 → unique element is [0]

// Example 3
console.log(removeDuplicatesFromArr([1,2,3,4,5])); 
// 5 → already unique

// Example 4
console.log(removeDuplicatesFromArr([5,5,5,6,6,7])); 
// 3 → unique elements are [5,6,7]

// Example 5
console.log(removeDuplicatesFromArr([])); 
// 0 → empty array

// Example 6
console.log(removeDuplicatesFromArr([9])); 
// 1 → single element

// Example 7
console.log(removeDuplicatesFromArr([1,1,1,2,2,3,3,3,4])); 
// 4 → unique elements are [1,2,3,4]

// Example 8
console.log(removeDuplicatesFromArr([10,20,20,30,30,30,40])); 
// 4 → unique elements are [10,20,30,40]

// Example 9
console.log(removeDuplicatesFromArr([2,2,2,2,2,2,2])); 
// 1 → only [2]

// Example 10
console.log(removeDuplicatesFromArr([1,2,2,3,4,4,5,5,5,6])); 
// 6 → unique elements are [1,2,3,4,5,6]

