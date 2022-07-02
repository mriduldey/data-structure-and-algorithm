/**
 * Problem Statement: Given a matrix if an element in the matrix is 0,
 * you will have to set its entire column and row to 0 and then return the matrix.

Examples 1:

Input: matrix=
[[1,1,1],
 [1,0,1],
 [1,1,1]]

Output: 
[[1,0,1],
 [0,0,0],
 [1,0,1]]

Explanation: Since matrix[2][2]=0.Therfore the 2nd column and 2nd row will be set to 0.
 
Input: matrix=
[[0,1,2,0],
 [3,4,5,2],
 [1,3,1,5]]

Output:
[[0,0,0,0],
 [0,4,5,0],
 [0,3,1,0]]

Explanation:Since matrix[0][0]=0 and matrix[0][3]=0. Therefore 1st row, 1st 
column and 4th column will be set to 0

 */

function setMatrixZero(matrix) {
  const firstItem = matrix[0][0];
  const rows = matrix.length - 1,
    cols = matrix[0].length - 1;

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (matrix[row][col] === 0) {
        matrix[row][0] = matrix[0][col] = 0;
      }
    }
  }

  for (let row = rows; row >= 0; row--) {
    for (let col = cols; col > 0; col--) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
    if (firstItem === 0) {
      matrix[row][0] = 0;
    }
  }

  return matrix;
}

const matrix = [
  [2, 1, 1],
  [3, 3, 6],
  [5, 7, 0],
];
console.log(matrix);
console.log('output \n', setMatrixZero(matrix));
