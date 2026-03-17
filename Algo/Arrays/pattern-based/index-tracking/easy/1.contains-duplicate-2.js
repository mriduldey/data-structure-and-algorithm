/**LC 219 — Contains Duplicate II
1. Problem Description

Given an integer array nums and integer k.

Return true if there exist two different indices i and j such that:

nums[i] == nums[j]
and
|i - j| <= k

Otherwise return false.

Example
nums = [1,2,3,1]
k = 3

Indices:

0 → 1
1 → 2
2 → 3
3 → 1

Check duplicate 1

|3 - 0| = 3 <= k

So answer = true

Example 2
nums = [1,0,1,1]
k = 1

Indices

2 → 1
3 → 1

Distance

|3 - 2| = 1 <= k

Output:

true
Example 3
nums = [1,2,3,1,2,3]
k = 2

Duplicates exist but

|3 - 0| = 3 > 2
|4 - 1| = 3 > 2
|5 - 2| = 3 > 2

Output:

false
2. Intuition

Brute force approach:

For each element check next k elements.

O(n*k)

Not efficient.

Key Observation

We only care about duplicate values within k distance.

So maintain a sliding window of size k.

Inside the window we keep elements in a HashSet.

If we see an element already present → duplicate within distance k.

Core Idea
window size = k

If window exceeds k, remove the element leaving the window.

index difference automatically <= k
Why HashSet?

Because we only need to check:

Does value already exist in last k elements?

Lookup → O(1)

Total complexity

Time  : O(n)
Space : O(k)
3. Edge Cases (Ask Interviewer)

Important clarifications:

1️⃣ k = 0
nums = [1,1]
k = 0

Distance

|1-0| = 1 > 0

Return false

2️⃣ Empty array
nums = []

Return false

3️⃣ Single element
nums = [5]

Return false

4️⃣ Negative numbers
nums = [-1,-1]
k = 1

Should work.

5️⃣ Very large k
k >= nums.length

Entire array becomes window.

6️⃣ Large duplicate clusters
[1,1,1,1,1]
*/

function containsDuplicate2(nums, k) {
  if (nums.length <= 1 || k <= 0) return false;

  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }

  return false;
}

console.log(containsDuplicate2([1, 1, 0, 1], 1))

function containsDuplicate2Alternate(nums, k) {
  if (nums.length <= 1 || k <= 0) return false;

  const set = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {
      return true;
    }

    set.add(nums[i]);

    // If size becomes more than k delete from set
    if(set.size > k) { 
        set.delete(nums[i - k]);
    }
  }

  return false;
}

console.log(containsDuplicate2Alternate([1, 1, 0, 1], 1))
