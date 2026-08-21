/**
 * LC 344 — Reverse String
1. Problem Description

LC 344 — Reverse String is a fundamental two-pointer problem.
FAANG importance: ★★★★☆ — the exact problem is usually too easy for experienced/SDE3 candidates, but the in-place opposite-direction pointer pattern is extremely common as a building block for harder problems.

You are given an array of characters s. Reverse it in-place.

Common constraints
1 <= s.length <= 10^5
s[i] is a printable ASCII character.
Must modify the original array.
Do not allocate another array proportional to n.
Expected
Time: O(n)
Extra Space: O(1)
Example
Input:
s = ["h","e","l","l","o"]


Output:
["o","l","l","e","h"]

How:

["h","e","l","l","o"]
  L               R
swap h ↔ o


["o","e","l","l","h"]
      L       R
swap e ↔ l


["o","l","l","e","h"]
          L/R
done
2. Intuition

Use two pointers from opposite ends:

left  = 0
right = n - 1

While:

left < right

swap:

s[left] ↔ s[right]

then move inward:

left++
right--

Each swap places two characters into their final positions.

Invariant

Before every iteration:

s[0 ... left-1]
and
s[right+1 ... n-1]

are already correctly reversed.

3. Edge Cases to Ask Interviewer

Only meaningful questions:

Must the reversal happen in-place?
→ For LC 344, yes.
Can the input be empty?
→ LeetCode constraints say non-empty, but production code can naturally handle it.
Are characters represented as an array or immutable string?
→ Important in JavaScript because strings are immutable.
Should Unicode grapheme clusters such as emojis be treated as one character?
→ Usually no for LC 344; worth clarifying in a real-world version.

No special handling is required for:

one character
repeated characters
even/odd lengths

The same algorithm handles all of them.
 */

function reverseStr(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }

  return arr;
}

// 1. Array of characters (odd length)
console.log(reverseStr(["h", "e", "l", "l", "o"]));
// Output: ['o', 'l', 'l', 'e', 'h']

// 2. Array of numbers (even length)
console.log(reverseStr([1, 2, 3, 4]));
// Output: [4, 3, 2, 1]

// 3. Array of full string words
console.log(reverseStr(["apple", "banana", "cherry"]));
// Output: ['cherry', 'banana', 'apple']

// 4. Single element array (edge case)
console.log(reverseStr(["a"]));
// Output: ['a']

// 5. Empty array (edge case)
console.log(reverseStr([]));
// Output: []
