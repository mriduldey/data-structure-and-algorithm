/**
 * Code Ninja
 * Longest Substring with At Most K Distinct Characters

Problem statement
-----------------
You are given a string 'str' and an integer ‘K’. Your task is to find the length of the largest substring with at most ‘K’ distinct characters.

For example:
You are given ‘str’ = ‘abbbbbbc’ and ‘K’ = 2, then the substrings that can be formed are [‘abbbbbb’, ‘bbbbbbc’]. Hence the answer is 7.
Detailed explanation ( Input/output format, Notes, Images )
Constraints:
1 <= T <= 10
1 <= K <= 26
1 <= |str| <= 10^6

The string str will contain only lowercase alphabets.    

Time Limit: 1 sec
Note:
You do not need to print anything. It has already been taken care of. Just implement the function.
Sample Input 1:
2
2
abbbbbbc
3
abcddefg
Sample Output 1:
7
4
Explanation:
For the first test case, ‘str’ = ‘abbbbbbc’ and ‘K’ = 2, then the substrings that can be formed are [‘abbbbbb’, ‘bbbbbbc’]. Hence the answer is 7.

For the second test case, ‘str’ = ‘abcddefg’ and ‘K’ = 3, then the substrings that can be formed is [‘cdde’, ‘ddef’]. Hence the answer is 4.
Sample Input 2:
2
3
aaaaaaaa
1
abcefg
Sample Output 2:
8   
1   


Hints:
1. Try to think of a brute force approach.
2. Try to think of a two-pointer solution.
 */

// Longest substring with max K unique characters

function longestSubstring(str, k) {
    let maxLen = 0;
    for( let i = 0; i < str.length; i++) {
        const charSet = new Set();
        for(let j = i; j < str.length; j++) {
            charSet.add(str[j]);

            if(charSet.size <= k) {   
                maxLen = Math.max(maxLen, j - i + 1);
            } else {
                break;
            }
        }
    }

    return maxLen;
}

console.log(longestSubstring('abbbbbbc', 2)); // 7
console.log(longestSubstring('abcddefg', 3)); // 4
console.log(longestSubstring('aaaaaaaa', 3)); // 8
console.log(longestSubstring('abcefg', 1)); // 1

