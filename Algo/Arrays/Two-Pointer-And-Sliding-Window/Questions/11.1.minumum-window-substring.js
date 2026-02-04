/**
 * Leetcode 76. Minimum Window Substring
 * 
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
 

Follow up: Could you find an algorithm that runs in O(m + n) time?
 */

function minWindowSubstring(s, t) {

    let sIndex = -1;
    let minLen = Number.POSITIVE_INFINITY;

    for(let i = 0; i < s.length; i++) {
        const charFreqMap = new Map();
        for(const char of t) {
            const charFreq = charFreqMap.get(char) ? charFreqMap.get(char) : 0      ;
            charFreqMap.set(char, charFreq + 1);
        }
        let count = 0;

        for(let j = i; j < s.length; j++) {
            const charFreq = charFreqMap.get(s[j]) ? charFreqMap.get(s[j]) : 0;
            if(charFreq > 0) {
                count++;
            }
            charFreqMap.set(s[j], charFreq - 1);
            if(count === t.length) {
                if(minLen > j - i + 1) {
                    minLen = j - i + 1;
                    sIndex = i;
                    break;
                }
            }
        }
    }

    return s.substr(sIndex, minLen);
}

console.log(minWindowSubstring('ADOBECODEBANC', 'ABC')) // 'BANC'
console.log(minWindowSubstring('a', 't')) // 'a'
console.log(minWindowSubstring('a', 'aa')) // ''
