/**
 * LC 36 — Valid Sudoku

FAANG importance: Medium-High frequency (especially Google/Amazon/Meta screening rounds). Tests HashSet usage, matrix traversal, indexing tricks, constraint validation. Usually expected O(1) because board size fixed (9×9).

1. Problem Description

Given a 9×9 Sudoku board, determine if current state is valid.

Rules:

Each row → digits 1-9 only once
Each column → digits 1-9 only once
Each 3×3 box → digits 1-9 only once
. = empty cell → ignore

Constraints

board.length == 9
board[i].length == 9
board[i][j] ∈ {'1'...'9','.'}

Expected:

Time: O(1)     (81 cells fixed)
Space: O(1)

Example:

5 3 . . 7 . . . .
6 . . 1 9 5 . . .
. 9 8 . . . . 6 .
8 . . . 6 . . . 3
4 . . 8 . 3 . . 1
7 . . . 2 . . . 6
. 6 . . . . 2 8 .
. . . 4 1 9 . . 5
. . . . 8 . . 7 9

Output:

true

Why?

No row duplicate
No column duplicate
No box duplicate
2. Intuition

Need to track 3 constraints simultaneously:

Row uniqueness
Column uniqueness
Box uniqueness

For every number:

rowKey = row + digit
colKey = col + digit
boxKey = boxId + digit

Box id:

box = Math.floor(r/3)*3 + Math.floor(c/3)

If any already exists → invalid.

Use:

Set()
3. Edge Cases (Ask interviewer)
Input validity
1. Can board contain invalid chars?
2. Always fixed 9×9?
3. Only validation or solve too?
Functional
1. Empty board
2. Duplicate in row
3. Duplicate in column
4. Duplicate in box
5. Multiple duplicates
6. All '.'
7. Already solved board

Examples:

["5","5"] same row → false

col:
5
.
5

same box:
5 .
. 5
 */

function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const val = board[r][c];

      if (val === ".") continue;

      const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      if (rows[r].has(val) || cols[c].has(val) || boxes[box].has(val)) {
        return false;
      }

      rows[r].add(val);
      cols[c].add(val);
      boxes[box].add(val);
    }
  }

  return true;
}


console.log(isValidSudoku([
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]));

console.log(isValidSudoku([
  ["5","3",".",".","7",".",".",".","5"],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]));

console.log(isValidSudoku([
  ["5","3",".",".","7",".",".",".","."],
  ["6",".","3","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]));