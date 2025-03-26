/* Constant Window Array Problem
 * Example: Find the maximum sum of any subarray of size `k`.
-------------------------------------------------------------
 * Given an array of positive and negative numbers and a number k, find the maximum sum of any subarray of size k.
 * example 1:
 * input: [2, 1, 5, 1, 3, 2], k = 3 
 * output: 9
 * 
 * example 2:
 * input: [-2, 3, 4, -1, 8, -9], k = 2
 * output: 7   
 */

/**
 * TEMPLATE1
 * -----------------
 // max = loop and find max sum for first k elements
 // l => left side pointer of window 
 // r => right side pointer of window
 // then run a while loop like below and update required variables(here max and maxSum)

// while(r < n - 1) {
//     sum = sum - sum[l];
//     l++;
//     r++;
//     sum = sum + arr[r];
//
//     maxSum = Math.max(maxSum, sum);
// }
*/
//-----------------------------------------------------------------------------------------------------------------------------------------------

