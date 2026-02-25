/**
 * LC 18 — 4Sum
1️⃣ Problem Description

Given an integer array nums and an integer target, return all unique quadruplets [a, b, c, d] such that:

a + b + c + d = target

Constraints:

No duplicate quadruplets

Order inside quadruplet doesn’t matter

Output can be in any order

Example
nums = [1,0,-1,0,-2,2]
target = 0

After sorting:

[-2, -1, 0, 0, 1, 2]

Valid quadruplets:

[-2, -1, 1, 2]  → sum = 0
[-2, 0, 0, 2]   → sum = 0
[-1, 0, 0, 1]   → sum = 0

Output:

[
  [-2,-1,1,2],
  [-2,0,0,2],
  [-1,0,0,1]
]
2️⃣ Intuition

This is a natural extension of:

2Sum → HashMap / two pointers

3Sum → Fix one + 2Sum

4Sum → Fix two + 2Sum

Optimal Strategy

Sort array

Fix first element i

Fix second element j

Use two pointers left and right to find remaining two

Time Complexity:

O(n^3)

Why optimal?

Because:

4 nested loops = O(n⁴) (brute force)

Sorting + 2 loops + two pointers = O(n³)

You cannot do better for general 4Sum without additional constraints.

3️⃣ Edge Cases to Clarify in Interview

Ask interviewer:

Can numbers be negative?

Can there be duplicates?

Return unique quadruplets only?

Can target overflow 32-bit int?

Is input sorted?

What if length < 4?

Are we allowed O(n³)?

Important edge cases:

nums.length < 4

All elements same

Large positive/negative values

Potential integer overflow

Many duplicates

Target very large or very small
 */

function fourSum(nums, target) {
    const result = [];
    const n = nums.length;

    if(n < 4) return result;

    nums.sort((a, b) => a - b);

    for(let i = 0; i < n; i++) {
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        if(nums[i] > target) break;
        if(nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target) break;
        if(nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target) continue;

        for(let j = i + 1; j < n; j++) {
            if(j > 0 && nums[j] === nums[j - 1]) continue;
            if(nums[j] > target) break;

            let left = j + 1;
            let right = n - 1;

            while(left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if(sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);
                    
                    while(left < right && nums[left] === nums[left + 1]) left++;
                    while(left < right && nums[right] === nums[right - 1]) right--;

                    left++;
                    right--;
                } else if(sum < target) {
                    left++
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

console.log(fourSum([1,0,-1,0,-2,2], 0))