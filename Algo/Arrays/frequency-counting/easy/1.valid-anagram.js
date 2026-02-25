/**
 * LC 242 — Valid Anagram
1️⃣ Problem Description

Given two strings s and t, return true if t is an anagram of s, otherwise return false.

An anagram means:

Same characters

Same frequency of each character

Order does NOT matter

Example 1
Input:  s = "anagram"
        t = "nagaram"

Output: true

Why?
Character frequency:

Character	s count	t count
a	3	3
n	1	1
g	1	1
r	1	1
m	1	1

All match → true.

Example 2
Input:  s = "rat"
        t = "car"

Output: false

r,a,t ≠ c,a,r → mismatch → false.

Constraints (LeetCode)

1 <= s.length, t.length <= 5 * 10^4

lowercase English letters

2️⃣ Intuition

Core idea:

Two strings are anagrams iff

Lengths are equal

Character frequencies are identical

Optimal Strategy (FAANG expected)

Use frequency counting (HashMap / Array of size 26)

Why not sort?

Sorting → O(n log n)

Counting → O(n)

FAANG expects linear solution

3️⃣ Edge Cases (Ask Interviewer)

You MUST clarify:

Are strings guaranteed lowercase English?

Can strings contain Unicode?

Is case-sensitive comparison required?

Can input contain spaces or punctuation?

What about empty strings?

Very large input size? (streaming?)

Edge case scenarios:

Different lengths → immediately false

Empty strings → true

Same string → true

Unicode characters

Case sensitivity issues
 */

function validAnagram(s, t) {
  if (s.length !== t.length) return false;
  if (s.length === 0 && t.length === 0) return true;
  if (s === t) return true;

  const map = new Map();

  for (const char of s) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const char of t) {
    if (!map.has(char)) return false;

    map.set(char, map.get(char) - 1);
    if (map.get(char) === 0) map.delete(char);
  }

  return map.size === 0;
}

console.log(validAnagram('cattaccattac', 'taccatcattac'))
