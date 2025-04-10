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

function stringCountBetter(str) {
    let count = 0;
    // key -> characters in str, value -> respective position of the characters in lastSeen array
    // in lastSeen value in index 0 denotes 'a''s position, 1 denotes 'b's position and so on
    const positionMap = {
        'a': 0,
        'b': 1,
        'c': 2
    }
    const lastSeen = [-1, -1, -1];

    for(let i = 0; i < str.length; i++) {
        lastSeen[positionMap[str[i]]] = i;
        
        if(lastSeen[0] !== -1 && lastSeen[1] !== -1 && lastSeen[2] !== -1) {
            count += 1 + Math.min(lastSeen[0], lastSeen[1], lastSeen[2]);
        }
    }
    return count;
}

console.log(stringCountBetter('abcabc'));
console.log(stringCountBetter('aaacb'));
console.log(stringCountBetter('abc'));
console.log(stringCountBetter('ab'));
