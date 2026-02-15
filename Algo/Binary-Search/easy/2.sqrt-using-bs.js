/**
 * 3. Sqrt(x)
📌 Problem Description

Given a non-negative integer x, compute and return the integer square root of x.

The returned result must be the floor of the true square root.

You cannot use built-in exponent functions like Math.sqrt() or x ** 0.5.

🔎 Examples
Example 1
Input: x = 4
Output: 2


Explanation:
√4 = 2 → exact integer

Example 2
Input: x = 8
Output: 2


Explanation:
√8 ≈ 2.828...
We return the floor → 2

Example 3
Input: x = 1
Output: 1

⚙️ Constraints

0 <= x <= 2^31 - 1

Must run in O(log n) time for FAANG-level expectation.
 */

function sqrt(num) {
    if(num < 2) return num;

    let left = 1;
    let right = Math.floor(num / 2);
    let ans = 0;

    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if(mid <= Math.floor(num / mid)) {
            ans = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return ans;
}
console.log(0, sqrt(0));
console.log(1, sqrt(1));
console.log(2, sqrt(2));
console.log(3, sqrt(3));
console.log(4, sqrt(4));
console.log(8, sqrt(8));
console.log(9, sqrt(9));
console.log(100, sqrt(100));
console.log(121, sqrt(121));
