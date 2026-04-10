/**
 * LC 73 — Set Matrix Zeroes
1. Problem Description (FAANG Context)

Set Matrix Zeroes is a very frequent FAANG interview problem that tests:

In-place matrix manipulation
Space optimization (key evaluation criteria)
Use of matrix as a hash structure
Problem

Given an m x n matrix, if an element is 0, set its entire row and column to 0.

Constraints
1 ≤ m, n ≤ 200
Values: -2^31 to 2^31 - 1
Expected Complexity
Optimal Time: O(m * n)
Optimal Space: O(1) (important — FAANG expects this)
Example
Input:
[
 [1,1,1],
 [1,0,1],
 [1,1,1]
]

Step:
Zero found at (1,1)
→ entire row 1 and column 1 → 0

Output:
[
 [1,0,1],
 [0,0,0],
 [1,0,1]
]
2. Intuition
❌ Brute Force (Wrong Approach)
When you see 0, immediately update row & column
Problem: cascading zeros (incorrect propagation)
✅ Better Approach (Hashing)
Store rows & cols to zero
Use two sets → O(m+n) space
✅ Optimal Approach (FAANG Expected)

Use first row & first column as markers

Key Idea:
Use matrix[i][0] → mark row
Use matrix[0][j] → mark column
Separate variable for first column (col0)
Why?

Avoid extra space → reuse matrix itself

3. Edge Cases (Ask Interviewer)
Matrix has no zero
Matrix is all zero
Single row / single column
Zero present in:
First row
First column (important for marker conflict)
Large matrix (performance)
 */

function setMatrixZeros(matrix) {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return null;

  const m = matrix.length; // row
  const n = matrix[0].length; // col

  let firstRowHasZero = false;
  let firstColHasZero = false;

  for (let r = 0; r < m; r++) {
    if (matrix[r][0] === 0) {
      firstColHasZero = true;
    }
  }

  for (let c = 0; c < n; c++) {
    if (matrix[0][c] === 0) {
      firstRowHasZero = true;
    }
  }

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }

  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) {
        matrix[r][c] = 0;
      }
    }
  }

  if (firstColHasZero) {
    for (let r = 0; r < m; r++) matrix[r][0] = 0;
  }

  if (firstRowHasZero) {
    for (let c = 0; c < n; c++) matrix[0][c] = 0;
  }

  return matrix;
}

console.log(
  setMatrixZeros([
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
  ]),
);
