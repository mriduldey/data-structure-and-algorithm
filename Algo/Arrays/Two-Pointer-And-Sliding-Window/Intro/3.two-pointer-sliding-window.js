/**
 * V. V Important
 * 
 * Longest subarrasy with sum <= K ( same as 2) with sliding window method
 * input arr = [2, 5, 1, 7, 10]; k = 14
 * 
 * Template 2: Sliding Window
 * 
 * expand -> from r(increasing r)
 * srink -> from r (increasing l)
 * 
 * length of window = r - l + 1
 * 
 * l = 0;
 * r = 0;
 * sum = 0; 
 * ( only the above<sum> is variable in the 
 * initialization as based on question, 
 * what we are looking for can be different)
 * 
 * maxLen = 0 
 * 
 * while(r < n) {
 *  sum = saum + arr[r] // based on condition, this part can change
 *  while(sum > k) {
 *    sum = sum - arr[l];
 *    l++;
 *  }
 *  if(sum <= k) {
 *    maxLen = max(maxLen, r - l + 1)
 *  }
 *  r++;
 * }
 * 
 * 
 * Optimization
 * ------------
 * 
 * l = 0;
 * r = 0;
 * sum = 0; 
 * ( only the above<sum> is variable in the 
 * initialization as based on question, 
 * what we are looking for can be different)
 * 
 * maxLen = 0 
 * 
 * while(r < n) {
 *   sum = saum + arr[r] // based on condition, this part can change
 * 
 *   optimization -- > we only need to shrink once.
 *   Because we don't want to reduce window len less than maxLen. 
 *   if (sum > k) {
 *     sum = sum - arr[l];
 *     l++;
 *    }
 *   if(sum <= k) {
 *    maxLen = max(maxLen, r - l + 1)
 *   }
 *   r++;
 * }
 * 
 */ 