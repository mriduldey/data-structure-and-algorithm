/**
 *  Very very important concept
 * Longest subarray with sum <= k
 * arr = [2, 5, 1, 7, 10] k = 14
 * 
 * 
 * Template 1: Bruteforce
 * ----------------------
 * Generate all subarrays
 * 
 * maxLen = 0
 * for(i = 0 --> n - 1) {
 *  sum = 0
 *  for(j = i --> n - 1) {
 *     sum += arr[j]
 *    if(sum <= k) {
 *      maxLen = max(maxLen, j - i + 1)
 *    } elseif(sum > k) { // .......optimization...........
 *      break
 *   }  
 *  }
 * }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */