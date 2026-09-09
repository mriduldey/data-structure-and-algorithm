/**
 * LC 917 — Reverse Only Letters

FAANG importance: ⭐⭐⭐☆☆ (Moderate)
Not one of the most frequently asked standalone FAANG questions, but it is a very useful Two Pointers + Character Classification problem. Variants involving skipping invalid characters appear frequently in palindrome/string interview problems.

1. Problem Description

Given a string s, reverse only the English letters while keeping every non-letter character at its original index.

Example
Input:
"a-bC-dEf-ghIj"

Output:
"j-Ih-gfE-dCba"

Letters are:

a b C d E f g h I j

Reverse them:

j I h g f E d C b a

The - characters remain at the same positions.

Common Constraints
1 <= s.length <= 100
s contains ASCII characters with codes 33 to 122
s does not contain `\` or `"`
Expected Complexity
Time:  O(n)
Space: O(n)

JavaScript strings are immutable, so converting to an array requires O(n) auxiliary space.

2. Intuition

Use two pointers:

left  → start
right → end

Move them toward each other.

If s[left] is not a letter → left++
If s[right] is not a letter → right--
If both are letters → swap them and move both pointers

The key invariant:

Non-letter positions are never modified.

Example:

a-bC-d
^     ^
L     R

Both a and d are letters:

d-bC-a

Then continue inward.

3. Edge Cases to Ask the Interviewer

Only the relevant clarifications:

Are both uppercase and lowercase English letters considered letters?
Yes: A-Z and a-z.
Should digits and punctuation remain at exactly the same indices?
Yes.
Are letters ASCII-only or should Unicode letters also count?
LeetCode 917 assumes English ASCII letters.
Can the string contain no letters?
Yes → return unchanged.
Can there be only one letter?
Yes → unchanged.

Useful edge inputs:

"123-45"   → "123-45"
"a"        → "a"
"ab"       → "ba"
"a-1-b"    → "b-1-a"
"-ab-"     → "-ba-"
 */

function isLetter(char) {
  const charCode = char.charCodeAt(0);

  return (
    (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
  );
}

function reverseOnlyLetter(s) {
  if (s.length === 0) return "";

  const arr = s.split("");

  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    while (left < right && !isLetter(arr[left])) {
      left++;
    }

    while (left < right && !isLetter(arr[right])) {
      right--;
    }

    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]];
      left++;
      right--;
    }
  }

  return arr.join("");
}

console.log(reverseOnlyLetter("a-bC-dEf-ghIj")); // "j-Ih-gfE-dCba"
console.log(reverseOnlyLetter("Test1ng-Leet=code-Q!")); // "Qedo1ct-eeLg=ntse-T!"
console.log(reverseOnlyLetter("Ab,c,de!$")); // "ed,c,bA!$"
console.log(reverseOnlyLetter("123-abc-XYZ")); // "123-ZYX-cba"
console.log(reverseOnlyLetter("No-change!")); // "egnahc-oN!"
console.log(reverseOnlyLetter("")); // ""
console.log(reverseOnlyLetter("OnlyLettersHere")); // "ereHsrettLylnO"
console.log(reverseOnlyLetter("Mix3d-CASEs")); // "sECA-dxiM3"
console.log(reverseOnlyLetter("Symbols#@$Stay")); // "yatSslo#@$bmyS"
console.log(reverseOnlyLetter("Palindrome?racecar!")); // "racecaremo?rdnilaP!"
