/**
 * LC 73 — Set Matrix Zeroes (Very common FAANG matrix problem; asked by Google, Amazon, Meta, Microsoft. Tests in-place marking, matrix traversal, space optimization. Main interview expectation: O(m×n) time + O(1) space solution.)
1. Problem Description

Given m × n matrix.

If any element = 0, make its entire row and column = 0.

Must modify in-place.

Common Constraints
1 <= m,n <= 200
-231 <= matrix[i][j] <= 231-1
Expected Complexity (FAANG)
Time: O(m × n)
Space: O(1)
Example
Input:
[
 [1,1,1],
 [1,0,1],
 [1,1,1]
]

0 found at (1,1)

Row 1 → zero
Col 1 → zero

Output:
[
 [1,0,1],
 [0,0,0],
 [1,0,1]
]

Example 2:

Input:
[
 [0,1,2,0],
 [3,4,5,2],
 [1,3,1,5]
]

Zeros at:
(0,0)
(0,3)

Output:
[
 [0,0,0,0],
 [0,4,5,0],
 [0,3,1,0]
]
2. Intuition

Brute force fails because while setting zeros we may create new zeros causing incorrect propagation.

Need to remember original zero positions first.

FAANG optimal trick:

Use:

First row → column markers
First column → row markers

Example:

[
 [1,0,3],
 [4,5,6],
 [7,8,0]
]

Mark:

matrix[0][1]=0
matrix[2][0]=0

Becomes:

[
 [1,0,0],
 [4,5,6],
 [0,8,0]
]

Now use markers to zero remaining cells.

Need extra flags:

firstRowZero
firstColZero

because first row/column already used as markers.

3. Edge Cases (Ask Interviewer)
EC1: Empty matrix?
[]

(LC guarantees valid matrix usually)

EC2: Single cell
[[0]]
[[5]]
EC3: Entire row already zero
[
 [0,0,0],
 [1,2,3]
]
EC4: First row contains zero
[
 [1,0],
 [3,4]
]

Need separate handling.

EC5: First column contains zero
[
 [1,2],
 [0,4]
]
EC6: Multiple zeros overlap
[
 [1,0,3],
 [0,5,6]
]

Questions:

1. Must solve in-place?
2. Expected extra space?
3. Matrix always non-empty?
 */


// Time -> O(m * n); Space -> O(m + n); Not optimal as Space O(1) is possible
function SetMatrixZero(matrix) {
  const rowLen = matrix.length;
  const colLen = matrix[0].length;
  const rows = new Set();
  const cols = new Set();

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (matrix[r][c] === 0) {
        rows.add(r);
        cols.add(c);
      }
    }
  }

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (rows.has(r) || cols.has(c)) {
        matrix[r][c] = 0;
      }
    }
  }

  return matrix;
}

console.log();
