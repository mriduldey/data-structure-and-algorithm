/**
 * 1. LC 633 — Sum of Square Numbers

FAANG importance: Medium.
A useful two-pointer + math problem. It is less common than LC 167 / LC 15 / LC 11, but interviewers may use it to test whether you can derive a tighter search range and avoid brute force.

Problem: Given a non-negative integer c, return true if there exist integers a and b such that:

a² + b² = c

Otherwise return false.

Common constraints

0 <= c <= 2^31 - 1

Expected optimal complexity

Time:  O(√c)
Space: O(1)

Example

Input: c = 5
Output: true

1² + 2²
= 1 + 4
= 5

Another:

Input: c = 3
Output: false

Possible squares <= 3:
0, 1

0² + 1² = 1
1² + 1² = 2

No combination gives 3.
2. Intuition

Since:

a² + b² = c

neither a nor b can be greater than:

√c

So use two pointers:

left  = 0
right = floor(√c)

Calculate:

sum = left² + right²

Then:

sum === c → found answer

sum < c
→ need a larger sum
→ left++

sum > c
→ need a smaller sum
→ right--

Why does this work?

For fixed right, increasing left increases the sum.

For fixed left, decreasing right decreases the sum.

So we eliminate impossible combinations without checking every pair.

3. Edge Cases to Ask Interviewer

Relevant questions only:

Can c be 0?
Yes → 0² + 0² = 0.
Are a and b required to be distinct?
Usually no.
c = 2
1² + 1² = 2
Are negative values allowed for a or b?
Irrelevant because:
(-a)² = a²

so we only need non-negative values.

Can I use Math.sqrt()?
Usually yes.
Do we only need boolean output or the actual pair?
Original problem requires boolean only.
 */

function getIsSumOfSqareExist(c) {
  if (c === 0) return 0;

  let a = 0;
  let b = Math.ceil(Math.sqrt(c));

  while (a <= b) {
    const sum = a * a + b * b;

    if (sum === c) {
      return true;
    }

    if (sum < c) {
      a++;
    } else {
      b--;
    }
  }

  return false;
}

console.log(getIsSumOfSqareExist(0));   // 0
console.log(getIsSumOfSqareExist(1));   // true   (0^2 + 1^2)
console.log(getIsSumOfSqareExist(2));   // true   (1^2 + 1^2)
console.log(getIsSumOfSqareExist(3));   // false
console.log(getIsSumOfSqareExist(4));   // true   (0^2 + 2^2)
console.log(getIsSumOfSqareExist(5));   // true   (1^2 + 2^2)
console.log(getIsSumOfSqareExist(8));   // true   (2^2 + 2^2)
console.log(getIsSumOfSqareExist(10));  // true   (1^2 + 3^2)
console.log(getIsSumOfSqareExist(50));  // true   (1^2 + 7^2)
console.log(getIsSumOfSqareExist(7));   // false
