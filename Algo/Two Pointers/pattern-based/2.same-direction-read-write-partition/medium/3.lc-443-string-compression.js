/**
 * LC 443 — String Compression
1. Problem Description
String Compression — LC 443 | Medium | Two Pointers / In-place Array
FAANG importance: ★★★★☆
A strong interview problem because it tests read/write pointers, run-length encoding, in-place mutation, multi-digit counts, and O(1) auxiliary space. The core pattern is more important than memorizing this exact problem.
Given an array of characters chars, compress consecutive repeated characters in-place:
- A group of length 1 → write only the character.
- A group of length > 1 → write the character followed by the decimal digits of its count.
- Return the length of the compressed prefix.
Typical constraints:
- 1 <= chars.length <= 2000
- chars[i] is a letter, digit, or symbol.
- Must modify chars in-place.
- Expected: O(n) time, O(1) auxiliary space.
Example
Input:
["a","a","b","b","c","c","c"]

Groups:
aa → a2
bb → b2
ccc → c3

Compressed:
["a","2","b","2","c","3"]

Return: 6

Multi-digit counts matter:
["a","a", ... 12 times]

→ ["a","1","2"]

The count 12 must be written as two characters, "1" and "2".
2. Intuition
Use two pointers:
read  → scans groups in the original array
write → position where compressed output is written

For every group:
1. Remember groupStart = read
2. Move read until the character changes
3. count = read - groupStart
4. Write the character at chars[write]
5. If count > 1:
      convert count to digits
      write every digit separately

Example:
chars = [a,a,a,b,b,c]

read/write progression:

aaa → write a3
bb  → write b2
c   → write c

Result prefix:
[a,3,b,2,c]

return 5

Why overwriting is safe
write never gets ahead of the portion already consumed by read.
A group containing k characters produces at most:
1 character + digits(k)

which never requires more positions than the original group for k >= 2.
So we can safely overwrite the same array.
3. Edge Cases to Ask the Interviewer
Relevant clarifications:
1. Should compression be in-place?
   Yes, LC 443 requires in-place modification with O(1) auxiliary space.
2. Should a single character get "1" appended?
   No. "a" stays "a", not "a1".
3. Can counts have multiple digits?
   Yes. 12 → "1","2".
4. Are only consecutive duplicates grouped?
   Yes. ["a","a","b","a"] → ["a","2","b","a"].
5. Do I need to remove unused elements after the compressed prefix?
   No. Return the valid compressed length; only chars[0...length-1] matters.
 */

function stringCompression(arr) {
  let read = 0;
  let write = 0;

  while (read < arr.length) {
    const char = arr[read];
    const groupStart = read;

    while (read < arr.length && arr[read] === char) {
      read++;
    }

    const count = read - groupStart;

    arr[write++] = char;

    if (count > 1) {
      const countStr = String(count);
      for (const char of countStr) {
        arr[write++] = char;
      }
    }
  }

  return write;
}

console.log(stringCompression(["a"]));
// Expected output: 1
// Array becomes: ["a"]

console.log(stringCompression(["a", "a"]));
// Expected output: 2
// Array becomes: ["a", "2"]

console.log(stringCompression(["a", "a", "b"]));
// Expected output: 3
// Array becomes: ["a", "2", "b"]

console.log(stringCompression(["a", "b", "c"]));
// Expected output: 3
// Array becomes: ["a", "b", "c"]

console.log(stringCompression(["a", "a", "a"]));
// Expected output: 2
// Array becomes: ["a", "3"]

console.log(stringCompression(["a", "a", "b", "b", "c", "c", "c"]));
// Expected output: 6
// Array becomes: ["a", "2", "b", "2", "c", "3"]

console.log(stringCompression(["x", "x", "x", "x", "x"]));
// Expected output: 2
// Array becomes: ["x", "5"]

console.log(
  stringCompression([
    "a", "a", "a",
    "b", "b",
    "c"
  ])
);
// Expected output: 5
// Array becomes: ["a", "3", "b", "2", "c"]

console.log(
  stringCompression([
    "a","a","a","a","a",
    "a","a","a","a","a",
    "a","a"
  ])
);
// Expected output: 3
// Array becomes: ["a", "1", "2"]

console.log(
  stringCompression([
    "z", "z",
    "y",
    "x", "x", "x",
    "w", "w"
  ])
);
// Expected output: 7
// Array becomes: ["z", "2", "y", "x", "3", "w", "2"]
