/**6️⃣ Valid Perfect Square — LeetCode 367
🔹 Problem Statement

Given a positive integer num, determine whether it is a perfect square.

You must not use any built-in library function such as Math.sqrt().

Return:

true → if num is a perfect square

false → otherwise

🔹 What is a Perfect Square?

A number is a perfect square if it can be written as:

𝑥
×
𝑥
=
𝑛
𝑢
𝑚
x×x=num

Example perfect squares:

1  (1 × 1)
4  (2 × 2)
9  (3 × 3)
16 (4 × 4)
25 (5 × 5)

🔹 Example 1
Input: 16
Output: true


Because:

4 × 4 = 16

🔹 Example 2
Input: 14
Output: false


Because:

3 × 3 = 9
4 × 4 = 16


14 lies between 9 and 16 → not a perfect square. */

function validPerfectSquare(n) {
    if(n < 2) {
        return true;
    }

    let left = 1;
    let right = Math.floor(n / 2);

    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if(mid * mid === n) {
            return true;
        } else if (mid * mid < n) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

console.log(validPerfectSquare(1));