/**
 * LC 15 — 3Sum
1️⃣ Problem Description

Given: An integer array nums
Return: All unique triplets [a, b, c] such that:

a + b + c = 0

Triplets must be unique (no duplicate combinations).

Example
Input:  [-1,0,1,2,-1,-4]
Output: [[-1,-1,2], [-1,0,1]]
How output is formed

Sorted array:

[-4, -1, -1, 0, 1, 2]

Now we try fixed element:

Fix -4 → need two numbers = 4 → none.

Fix -1 (index 1):

Need two numbers = 1

-1 + 2 = 1 → triplet [-1,-1,2]

0 + 1 = 1 → triplet [-1,0,1]

Duplicate -1 at index 2 is skipped.

2️⃣ Intuition (FAANG level thinking)

Brute force = O(n³) → unacceptable.

Key observation:

3Sum = Fix one element + solve 2Sum on remaining array.

Optimized approach:

Sort array → helps handle duplicates.

Fix nums[i]

Use two pointers (left, right) for remaining part.

Skip duplicates carefully.

Time complexity:

O(n²)

This is optimal for 3Sum.

3️⃣ Edge Cases to Clarify in Interview

Ask interviewer:

Can input contain duplicates? (Yes)

Can output order vary? (Usually yes)

What about:

Empty array?

Less than 3 elements?

All zeros?

Very large array (performance concerns)?

Large positive/negative numbers?

Critical edge cases:

[]
[1]
[1,2]
[0,0,0,0]
[-2,0,0,2,2]
[1,2,-2,-1]
 */

function threeSum(nums) {
    const result = [];
    const n = nums.length;

    if(n < 3) return result;

    nums.sort((a, b) => a - b);

    for(let i = 0; i < n; i++) {
        if(i > 0 && nums[i] === nums[i - 1]) continue;
        if(nums[i] > 0) break;

        let left = i + 1;
        let right = n - 1;

        while(left < right) {
            const sum = nums[i] + nums[left] + nums[right];

            if(sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);

                while(left < right && nums[left] === nums[left + 1]) left++;
                while(left < right && nums[right] === nums[right - 1]) right--;

                left++;
                right--;
            } else if( sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }

    return result;
}

console.log(threeSum([-1,0,1,2,-1,-4]));