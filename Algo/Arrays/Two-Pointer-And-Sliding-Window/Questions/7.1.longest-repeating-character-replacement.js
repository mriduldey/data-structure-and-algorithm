/**
 * You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

424: Longest Repeating Character Replacement

Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.
Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.
 

Constraints:

1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length
 */

// Find longest substring which has k or less replacable characters
// AA
function longestRepeatingCharacterReplacement(str, k) {
    let maxLen = 0;

    for (let i = 0; i < str.length; i++) {
        const charCount = {};
        for (j = i; j < str.length; j++) {
            if (charCount[str[j]]) {
                charCount[str[j]] += 1;
            } else {
                charCount[str[j]] = 1;
            }

            const maxFreq = Math.max(...Object.values(charCount));
            const subStrLen = j - i + 1;
            const replacableCharCount = subStrLen - maxFreq;
            if (replacableCharCount <= k) {
                maxLen = Math.max(maxLen, subStrLen);
            }
        }
    }

    return maxLen;
}

console.log(longestRepeatingCharacterReplacement('abcaa', 2)); // 5
console.log(longestRepeatingCharacterReplacement('AABABBA', 1)); // 4
console.log(longestRepeatingCharacterReplacement('ABAB', 2)); // 4
console.log(longestRepeatingCharacterReplacement('ABABB', 0)); // 2


