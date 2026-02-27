/**
 * LC 387 — First Unique Character in a String
1️⃣ Problem Description

Given a string s, return the index of the first non-repeating character.
If no such character exists, return -1.

Example 1
Input: s = "leetcode"
Output: 0

Explanation:

l → appears once → index 0 ✅ (first unique)

Example 2
Input: s = "loveleetcode"
Output: 2

Frequency:

l → 2

o → 2

v → 1

e → 4

t → 1

c → 1

d → 1

Traversal:

l ❌

o ❌

v ✅ → index 2 (first unique)

Example 3
Input: s = "aabb"
Output: -1

All characters repeat → return -1.

2️⃣ Intuition

This is a frequency counting + first occurrence detection problem.

Key observation:

We need frequency of each character.

Then we must preserve original order to find first unique.

Optimal approach:

First pass → build frequency map.

Second pass → return first index where freq = 1.

Time Complexity:

O(n)
Space Complexity:

O(1) if limited to lowercase letters

O(n) if full Unicode

3️⃣ Edge Cases (Ask Interviewer)

You should clarify:

Is string guaranteed non-empty?

Character set?

Only lowercase?

ASCII?

Unicode?

Case sensitivity? (A vs a)

Maximum length?

Can we modify input?

Expected space constraints?

Important edge cases:

"" → return -1

"a" → return 0

"aa" → return -1

Large input (10^5+)

Unicode multi-byte chars

Mixed case

4️⃣ FAANG-Level JavaScript Implem
 */

function firstUniqueChar(str) {
  if (typeof str !== "string" || str.length === 0) return -1;

  const freq = new Map();
  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  for (let i = 0; i < str.length; i++) {
    if (freq.get(str[i]) === 1) {
      return i;
    }
  }

  return -1;
}

console.log(firstUniqueChar('abac'));
