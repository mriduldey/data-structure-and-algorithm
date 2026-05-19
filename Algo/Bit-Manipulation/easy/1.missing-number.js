/**
 * LC 268 — Missing Number

Importance (FAANG): High frequency Easy problem. Very common in Arrays + Hashing + Bit Manipulation rounds. Tests understanding of index-value relation, math trick, XOR, and in-place marking/cyclic sort.

1. Problem Description

Given an array nums containing n distinct numbers from range [0, n], exactly one number is missing.

Return that missing number.

Common Constraints
1 <= n <= 10^4 / 10^5
nums.length == n
0 <= nums[i] <= n
All numbers unique
Expected Complexity (FAANG)
Approach	Time	Space	Preferred
Sum Formula	O(n)	O(1)	Yes
XOR	O(n)	O(1)	Very preferred
Hash Set	O(n)	O(n)	Acceptable
Cyclic Sort	O(n)	O(1)	Follow-up
Example
nums = [3,0,1]

Range should be:

0 1 2 3

Present:

3 0 1

Missing:

2

Output:

2
2. Intuition
Method 1: Sum Formula

Expected sum:

0 + 1 + 2 + ... + n

Actual sum:

sum(nums)

Missing:

expected - actual
Method 2: XOR (Most interview-loved)

Property:

a ^ a = 0
a ^ 0 = a

XOR all indices and values:

0^1^2^3 ... n

Existing values cancel out.

Remaining = missing number.

Method 3: Cyclic Sort Idea

Number should sit at index:

value → index
0 → 0
1 → 1
2 → 2

Place correctly.

First mismatch index = answer.

3. Relevant Edge Cases (Ask Interviewer)
Is array always unique?
Standard LC → YES
Can missing number be 0?
[1,2,3]

Missing = 0

Can missing number be n?
[0,1,2]

Missing = 3


---

4. Empty array possible?

Usually NO.

---

5. Need O(1) space?

Usually follow-up.

---
 */

function missingNumber(nums) {
  let xor = nums.length;

  for (let i = 0; i < nums.length; i++) {
    // nums range 0...n, nums index range 0...n-1, x ^ x = 0; x ^ 0 = x; 
    xor = xor ^ i ^ nums[i]; 
  }

  return xor;
}


console.log(missingNumber([0, 1, 2, 4]))