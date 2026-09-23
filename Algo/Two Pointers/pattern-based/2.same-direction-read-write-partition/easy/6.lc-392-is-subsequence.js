/**
 * 1. LC 392 — Is Subsequence

FAANG importance: ★★★★☆ — common Two Pointers / String screening problem. The base problem is easy, but the multiple-query follow-up is much more interview-relevant.

Given strings s and t, return true if s is a subsequence of t.

A subsequence keeps the relative order of characters but may delete some characters.

Common constraints

0 <= s.length <= 100
0 <= t.length <= 10^4
Lowercase English letters in the original problem.

Expected

Time: O(|t|) or O(|s| + |t|)
Extra space: O(1)
Example
s = "abc"
t = "ahbgdc"

a h b g d c
↑   ↑     ↑
a   b     c

Output: true

All characters of "abc" appear in "ahbgdc" in the same order.

s = "axc"
t = "ahbgdc"

'a' matches
'x' never appears after it

Output: false
2. Intuition

Use two pointers:

i → s
j → t

Scan t.

If s[i] === t[j], we matched the next required character → increment i.
Always increment j.
If i === s.length, every character of s was matched.

Important idea:

We never move backward because a subsequence must preserve relative order.

s = "abc"
t = "ahbgdc"

i
a b c

j
a h b g d c
↑ match → i++

  ↑ skip

    ↑ match → i++

        ...

          ↑ match → i == 3
3. Edge Cases to Ask the Interviewer

Only useful clarifications:

Can s be empty?
Yes → empty string is a subsequence of every string.
Can t be empty?
Yes → only empty s returns true.
Are characters case-sensitive?
Original LC problem: lowercase English characters.
Can characters repeat?
s = "aaa"
t = "baaac"

Yes → each occurrence must be matched separately.

Is this one query or millions of subsequence queries against the same t?
Very important follow-up because it changes the optimal design.
 */

function isSubsequence(s, t) {
  if (s.length === 0) return true;
  if (s.length > t.length) return false;

  let sIndex = 0;

  for (let tIndex = 0; tIndex < t.length; tIndex++) {
    if (t[tIndex] === s[sIndex]) {
      sIndex++;
    }

    if (sIndex === s.length) {
      return true;
    }
  }

  return false;
}

console.log(isSubsequence("abc", "ahbgdc")); // true
console.log(isSubsequence("axc", "ahbgdc")); // false
console.log(isSubsequence("", "ahbgdc")); // true
console.log(isSubsequence("abc", "abc")); // true
console.log(isSubsequence("abc", "acb")); // false
