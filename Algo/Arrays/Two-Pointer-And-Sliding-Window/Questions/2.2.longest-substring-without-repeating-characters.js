/**
 * Leetcode Problem 3. Longest Substring Without Repeating Characters
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/    
 * 
 * Given a string s, find the length of the longest substring without duplicate characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
Example 2:

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 

Constraints:

0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
 */
function longestSubStringGoodSolution(arr) {
    let l = 0;
    let r = 0;
    let maxLength = 0;
    const charSet = new Set();
    while(r < arr.length) {
        if(!charSet.has(arr[r])) {
            charSet.add(arr[r]);
            maxLength = Math.max(maxLength, r - l + 1);
            r++;
        } else {
            charSet.delete(arr[l]);
            l++;
        }
    }
    return maxLength;
}

console.log(longestSubStringGoodSolution("abcabcbb")); // 3
console.log(longestSubStringGoodSolution("bbbb")); // 1
console.log(longestSubStringGoodSolution("pwwkew")); // 3
console.log(longestSubStringGoodSolution("")); // 0
console.log(longestSubStringGoodSolution("a")); // 1
console.log(longestSubStringGoodSolution("ab")); // 2
console.log(longestSubStringGoodSolution("abc")); // 3
console.log(longestSubStringGoodSolution("abbcd")); // 3