/**
 * LC 383 — Ransom Note
1. Problem Description

Problem:
Given two strings ransomNote and magazine, return true if ransomNote can be constructed using letters from magazine.

Each letter in magazine can only be used once.

All characters are lowercase English letters.

Example 1
ransomNote = "a"
magazine   = "b"

Magazine does not contain 'a' → ❌ false

Example 2
ransomNote = "aa"
magazine   = "ab"

Magazine has only one 'a', ransom needs two → ❌ false

Example 3
ransomNote = "aa"
magazine   = "aab"

Magazine has two 'a' → ✅ true

2. Intuition

This is a frequency counting (hashing) problem.

Core idea:

Count frequency of characters in magazine

Decrement counts while scanning ransomNote

If any count becomes negative → impossible

This is a classic HashMap / Array counting problem.

Time complexity target: O(n + m)
Space complexity: O(1) (since alphabet size = 26)

3. Edge Cases (Ask Interviewer)

Can strings be empty?

ransomNote = "" → always true

Are characters only lowercase?

Can characters be Unicode?

Maximum string length?

Are we allowed to modify input?

Is case-sensitive comparison required?
 */

function ransomNote(ransomNote, magazine) {
  if (ransomNote === "") return true;
  if (ransomNote.length > magazine.length) return false;

  const map = new Map();
  for (const char of ransomNote) {
    map.set(char, (map.get(char) || 0) + 1);
  }

  for (const char of magazine) {
    if (map.has(char)) {
      map.set(char, map.get(char) - 1);
      if (map.get(char) === 0) map.delete(char);
    } else {
      return false;
    }
  }

  return map.size === 0;
}

console.log(ransomNote("abbbbbbbfdgfddgdfgdfgdf", "abbbbbbbfdgfddgdfgdfgdf"));
