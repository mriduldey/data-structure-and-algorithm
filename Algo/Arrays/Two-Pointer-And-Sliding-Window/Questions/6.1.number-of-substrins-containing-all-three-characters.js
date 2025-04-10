/**
 * Number of substrings containing all three array
 * --------------------------------------
 * Leetcode 1358
 * 
 * 
 * Given a string s consisting only of characters a, b and c.

Return the number of substrings containing at least one occurrence of all these characters a, b and c.

 

Example 1:

Input: s = "abcabc"
Output: 10
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again). 
Example 2:

Input: s = "aaacb"
Output: 3
Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb". 
Example 3:

Input: s = "abc"
Output: 1
 

Constraints:

3 <= s.length <= 5 x 10^4
s only consists of a, b or c characters.
 */

function stringCount(str) {
    let count = 0;

    for(let i = 0; i < str.length; i++) {
        const abcSet = new Set();
        for(let j = i; j < str.length; j++) {
            abcSet.add(str[j]);

            if(abcSet.size === 3) {
                count++;
            }
        }
    }

    return count;
}

console.log(stringCount('abcabc'));
console.log(stringCount('aaacb'));
console.log(stringCount('abc'));
console.log(stringCount('ab'));

function stringCountOptimizedBruteforce(str) {
    let count = 0;

    for(let i = 0; i < str.length; i++) {
        const abcSet = new Set();
        for(let j = i; j < str.length; j++) {
            abcSet.add(str[j]);
            if(abcSet.size === 3) {
                count += str.length - j;
                break;
            }
        }
    }

    return count;
}

console.log(stringCountOptimizedBruteforce('abcabc'));
console.log(stringCountOptimizedBruteforce('aaacb'));
console.log(stringCountOptimizedBruteforce('abc'));
console.log(stringCountOptimizedBruteforce('ab'));