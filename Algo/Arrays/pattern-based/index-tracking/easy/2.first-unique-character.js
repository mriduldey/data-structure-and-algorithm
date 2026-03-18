/**
 * 1. Problem description

Given a string s, return the index of the first non-repeating character.
If every character repeats, return -1.

Example 1

s = "leetcode"

Character frequencies:

l -> 1

e -> 3

t -> 1

c -> 1

o -> 1

d -> 1

Now scan from left to right:

index 0, char = l, freq = 1

So answer = 0.

Example 2

s = "loveleetcode"

Frequencies:

l -> 2

o -> 2

v -> 1

e -> 4

t -> 1

c -> 1

d -> 1

Scan left to right:

index 0, l, freq 2 → not unique

index 1, o, freq 2 → not unique

index 2, v, freq 1 → first unique

So answer = 2.

Example 3

s = "aabb"

All characters repeat:

a -> 2

b -> 2

No unique character, so answer = -1.

2. Intuition

The main idea:

First, count frequency of every character.

Then, scan the string again from left to right.

The first character whose frequency is 1 is the answer.

Why 2 passes?

In first pass, we collect full frequency info.

In second pass, we preserve original order and find the first unique one.

This is the cleanest FAANG-level solution.

3. Edge cases to ask interviewer

Ask these before coding:

Can string be empty?

Can string contain only lowercase English letters, or any ASCII / Unicode characters?

Should I return index or character itself?

If no unique character exists, should I return -1?

Can string be very large?

Is case-sensitive comparison required? (A and a different?)

Can spaces / symbols appear?

Do you want optimized for lowercase-only alphabet or generic characters?

Important edge cases:

"" → -1

"a" → 0

"aa" → -1

"ab" → 0

"aabbc" → 4

"aabb" → -1

"z" → 0
 */

function firstUniqueChar(s) {
  if (s.length === 0) return -1;
  if (s.length === 1) return 0;

  const freq = new Map();

  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }

  return -1;
}

console.log(firstUniqueChar(""));
console.log(firstUniqueChar("r"));
console.log(firstUniqueChar("aabbccxgffgbfgb"));

