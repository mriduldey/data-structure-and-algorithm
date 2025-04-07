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

function longestSubstringBetterSolution(str, k) {
    let l = 0;
    let r = 0;
    let maxLen = 0;
    const charCountMap = new Map();

    while(r < str.length) {
        const currentCharCount = charCountMap.get(str[r]) ? charCountMap.get(str[r]) : 0;
        charCountMap.set(str[r], currentCharCount + 1);
        
        if(charCountMap.size > k) {
            const windowLeftCharCount = charCountMap.get(str[l]);
            charCountMap.set(str[l], windowLeftCharCount - 1);
            if(charCountMap.get(str[l]) === 0) {
                charCountMap.delete(str[l])
            }
            l++;
        }

        if(charCountMap.size <= k) {
            maxLen = Math.max(maxLen, r - l + 1);
        }

        r++;
    }

    return maxLen;
}

console.log(longestSubstringBetterSolution('abbbbbbc', 2)); // 7
console.log(longestSubstringBetterSolution('abcddefg', 3)); // 4
console.log(longestSubstringBetterSolution('aaaaaaaa', 3)); // 8
console.log(longestSubstringBetterSolution('abcefg', 1)); // 1

