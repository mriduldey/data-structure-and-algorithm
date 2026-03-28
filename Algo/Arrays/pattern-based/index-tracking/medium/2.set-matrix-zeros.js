/**
 * 1. Problem Description

Given an m x n matrix, if any cell is 0, set its entire row and column to 0.
The modification must be done in-place.

Example
Input:
[
 [1,1,1],
 [1,0,1],
 [1,1,1]
]

Step:
- Found 0 at (1,1)
- Set row 1 and column 1 to 0

Output:
[
 [1,0,1],
 [0,0,0],
 [1,0,1]
]
2. Intuition
❌ Naive idea (wrong)
Immediately update rows/columns when you see 0
Problem: cascading effect → newly set zeros affect future decisions
✅ Correct idea
First mark which rows and columns need to be zeroed
Then update matrix in second pass
🔥 Optimal FAANG insight

Use first row and first column as markers instead of extra space

3. Edge Cases (Ask Interviewer)
Empty matrix ([])
Single row / single column
All elements already 0
No zero present
Multiple zeros in same row/column
First row or first column contains zero (critical for optimal solution)
 */

function setMatrixZeros(matrix) {
  if (!matrix || matrix.length === 0) return null;

  const m = matrix.length;
  const n = matrix[0].length;

  let firstRowHasZero = false;
  let firstColHasZero = false;

  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
    }
  }

  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  for (let i = 0; i < m; i++) {
    if (firstColHasZero) {
      matrix[i][0] = 0;
    }
  }

  for (let j = 0; j < n; j++) {
    if (firstRowHasZero) {
      matrix[0][j] = true;
    }
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
