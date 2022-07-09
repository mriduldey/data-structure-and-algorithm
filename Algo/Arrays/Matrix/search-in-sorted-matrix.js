/**
 * Search in a sorted 2D matrix
Problem Statement: Given an m*n 2D matrix and an integer, 
write a program to find if the given integer exists in the matrix.

Given matrix has the following properties:

Integers in each row are sorted from left to right.
The first integer of each row is greater than the last integer of the previous row
Example 1:

Input: matrix = 
[[1,3,5,7],
 [10,11,16,20],
 [23,30,34,60]], 

target = 3

Output: true

Explanation: As the given integer(target) exists in the given 2D matrix, 
the function has returned true.
Example 2:

Input: matrix = 
[[1,3,5,7],
 [10,11,16,20],
 [23,30,34,60]], 

target = 13

Output: false

Explanation: As the given integer(target) does not exist in the given 2D matrix,
 the function has returned false.
 */

function searchMatrix(matrix, target) {
  let start = 0;
  const colLength = matrix[0].length;
  let end = matrix.length * colLength - 1;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    const midPos = {
      row: Math.floor(mid / colLength), // returns row position of mid item
      col: mid % colLength, // returns column position of mid item
    };

    if (matrix[midPos.row][midPos.col] === target) {
      return true;
    }

    if (matrix[midPos.row][midPos.col] > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return false;
}

console.log(
  searchMatrix(
    [
      [1, 2, 3, 4, 5],
      [7, 8, 9, 12, 34],
      [232, 235, 238, 239, 242],
    ],
    4
  )
);
