/**
 * LC 125 — Valid Palindrome

FAANG importance: ★★★★★ | Frequency: High | Core pattern: Opposite-direction Two Pointers

1. Problem Description

Given a string s, determine whether it is a palindrome after:

converting uppercase letters to lowercase
ignoring all non-alphanumeric characters
considering both letters and digits

A palindrome reads the same from left-to-right and right-to-left.

Common constraints

1 <= s.length <= 2 * 10^5
Input may contain letters, digits, spaces, punctuation, symbols.
Usually ASCII characters are assumed unless interviewer says Unicode.

Expected optimal complexity

Time: O(n)
Space: O(1) — important interviewer expectation; avoid creating a cleaned copy if asked for optimal space.

Example

Input:
s = "A man, a plan, a canal: Panama"


Compare only alphanumeric characters:


a m a n a p l a n a c a n a l p a n a m a
↑                                             ↑
L                                             R

All corresponding characters match.

Output: true

Another example:

s = "race a car"


r != c at some symmetric position
→ false
2. Intuition

Use two pointers:

left  →                         ← right

At every step:

Move left forward while s[left] is not alphanumeric.
Move right backward while s[right] is not alphanumeric.
Compare the valid characters case-insensitively.
If they differ → immediately return false.
Otherwise move both pointers inward.
If pointers meet/cross → palindrome.

Why it works:

A palindrome only requires symmetric characters to match. Since punctuation does not matter, skip it directly instead of preprocessing the whole string.

3. Interviewer Edge Cases to Ask

Only useful clarification questions:

Should punctuation and spaces be ignored?
Are digits considered valid palindrome characters?
Is comparison case-insensitive?
Should an empty/effectively-empty string count as a palindrome?
Usually yes.
Are we handling ASCII only, or arbitrary Unicode letters/digits?
Important because /[a-z0-9]/i is ASCII-oriented.

Cases your implementation should handle:

""                          → true
"."                         → true
" "                         → true
"a"                         → true
"0P"                        → false
"Aa"                        → true
"race a car"                → false
"A man, a plan..."          → true
 */

function isAlphaNumeric(char) {
  const code = char.charCodeAt(0);

  return (
    (code >= 48 && code <= 57) ||
    (code >= 65 && code <= 90) ||
    (code >= 97 && code <= 122)
  );
}

function isValidPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNumeric(s[left])) {
      left++;
    }

    while (left < right && !isAlphaNumeric(s[right])) {
      right--;
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

// Array of 10 test cases with input and expected output
const testCases = [
  { input: "A man, a plan, a canal: Panama", expected: true },
  { input: "race a car", expected: false },
  { input: " ", expected: true },
  { input: "Was it a car or a cat I saw?", expected: true },
  { input: "No 'x' in Nixon", expected: true },
  { input: "12321", expected: true },
  { input: "123321a", expected: false },
  { input: "a.", expected: true },
  {
    input:
      "Doc, Note: I Dissent. A Fast Never Prevents A Fatness. I Diet On Cod.",
    expected: true,
  },
  { input: "Hello, World!", expected: false },
];

// Execute, validate against expected, and log results
testCases.forEach(({ input, expected }, index) => {
  const result = isValidPalindrome(input);
  const passed = result === expected ? "PASSED" : "FAILED";

  console.log(`Test ${index + 1}: [${passed}]`);
  console.log(`  Input:    "${input}"`);
  console.log(`  Result:   ${result}`);
  console.log(`  Expected: ${expected}\n`);
});
