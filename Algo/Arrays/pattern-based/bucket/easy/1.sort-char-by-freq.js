/**
 * LC 451 — Sort Characters by Frequency
1. Problem Description (FAANG Context)

Sort Characters by Frequency is a very common HashMap + Bucket Sort / Heap problem asked in FAANG (Amazon, Google, Meta).

Problem

Given a string s, sort it in descending order based on frequency of characters.

Constraints
1 <= s.length <= 5 * 10^5
Characters can be:
lowercase / uppercase letters
digits
symbols
Expected Complexity
Optimal: O(n) → Bucket Sort
Alternative: O(n log k) → Heap (k = unique chars)
Space: O(n)
Example
Input:  s = "tree"
Step1: freq map → {t:1, r:1, e:2}
Step2: sort by freq → e(2), t(1), r(1)

Output: "eert" or "eetr"
2. Intuition
Core Idea:
Count frequencies → HashMap
Then sort by frequency
3 Approaches:
Bucket Sort (Best / FAANG expected)
Max frequency ≤ n → create buckets
Place chars in index = freq
Max Heap
Push (freq, char)
Pop highest freq first
Sorting
Convert map → array → sort
3. Edge Cases (Ask Interviewer)
Empty string? (usually no)
Case sensitivity? (A != a)
Multiple valid outputs allowed? (YES)
Large input? (forces O(n))
Unicode / ASCII? (clarify)
 */

function sortCharByFreq(str) {
  if (!str) return null;
  if (str.length <= 1) return str;

  const charMap = new Map();

  for (const char of str) {
    charMap.set(char, (charMap.get(char) || 0) + 1);
  }

  const buckets = new Array(str.length + 1).fill().map(() => []);

  for (const [char, count] of charMap) {
    buckets[count].push(char);
  }

  let result = "";

  for (let i = buckets.length - 1; i >= 0; i--) {
    for (const char of buckets[i]) {
      result += char.repeat(i);
    }
  }

  return result;
}

console.log(sortCharByFreq("xxyyyzzzzaaaabbbbbccccccc"));
