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
function longestSubString(arr) {
    let maxLength = 0;
    for(let i = 0; i < arr.length; i++) {
        const set = new Set();
        for(let j = i; j < arr.length; j++) {
            if(set.has(arr[j])) {
                break;
            } else {
                set.add(arr[j]);
                maxLength = Math.max(maxLength, j - i + 1);
            }
        }
    }
    return maxLength;
}

console.log(longestSubString("abcabcbb")); // 3
console.log(longestSubString("bbbb")); // 1
console.log(longestSubString("pwwkew")); // 3
console.log(longestSubString("")); // 0
console.log(longestSubString("a")); // 1
console.log(longestSubString("ab")); // 2
console.log(longestSubString("abc")); // 3
console.log(longestSubString("abbcd")); // 3
