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

function minWindowSubstringBetter(s, t) {
    let l = 0;
    let r = 0;
    let count = 0;
    let sIndex = -1;
    let minLen = Number.POSITIVE_INFINITY;

    // Take count of t-string characters' frequencies
    const tStringFreq = new Map();
    for (const char of t) {
        const charFreq = tStringFreq.get(char) ? tStringFreq.get(char) + 1 : 1;
        tStringFreq.set(char, charFreq);
    }

    while (r < s.length) {
        // count if any of the substring from s-string is a match with t-string. 
        // increase count to find how many match has been found 
        if (tStringFreq.has(s[r])) {
            if (tStringFreq.get(s[r]) > 0) {
                count++;
            }
            tStringFreq.set(s[r], tStringFreq.get(s[r]) - 1);
        }


        while (count === t.length) {
            if (r - l + 1 < minLen) {
                minLen = r - l + 1;
                sIndex = l;
            }
            // reverse count for shrinking.
            // update tStringFreq as well reversly as we are removing character from 'l' position
            if (tStringFreq.has(s[l])) {
                tStringFreq.set(s[l], tStringFreq.get(s[l]) + 1);
                if (tStringFreq.get(s[l]) > 0) {
                    count--;
                }   
            }
            l++;
        }

        r++;
    }

    return s.substr(sIndex, minLen);
}

console.log(minWindowSubstringBetter('ADOBECODEBANC', 'ABC')) // 'BANC'
console.log(minWindowSubstringBetter('a', 't')) // 'a'
console.log(minWindowSubstringBetter('a', 'aa')) // ''
