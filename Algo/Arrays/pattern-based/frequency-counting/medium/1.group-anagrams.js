/**
 * LC 49 — Group Anagrams
1️⃣ Problem Description

Given an array of strings strs, group the anagrams together.

Two strings are anagrams if:

They contain the same characters

With the same frequency

Order does not matter

Example
Input:
["eat","tea","tan","ate","nat","bat"]

Output:
[
  ["eat","tea","ate"],
  ["tan","nat"],
  ["bat"]
]
Why output is coming?

"eat", "tea", "ate" → same character frequency → grouped

"tan", "nat" → same frequency → grouped

"bat" → unique → alone

2️⃣ Intuition

Anagrams share identical character distribution.

Two major approaches:

Approach A — Sort as key

Sort each string

Use sorted string as hashmap key

Example:

"eat" → "aet"
"tea" → "aet"

Same key → same group

Time complexity:
O(n * k log k)
n = number of strings
k = max string length

Approach B — Character frequency count (FAANG preferred)

Instead of sorting:

Count 26 letters

Convert count array to string key

Example:

eat → [1,0,0,0,1,...,1] → "1#0#0#..."

Time complexity:
O(n * k)
Better than sorting

3️⃣ Edge Cases (Ask Interviewer)

Is input empty?

Can strings be empty?

Only lowercase letters?

Unicode allowed?

Large input size constraints?

Case-sensitive?

Can we return groups in any order?
 */

function groupAnagrams(strs) {
  if (!strs || !Array.isArray(strs) || strs.length === 0) return [];

  const map = new Map();

  for (const str of strs) {
    const count = new Array(26).fill(0);
    for (const char of str) {
      const index = char.charCodeAt(0) - 97;
      count[index]++;
    }

    const key = count.join("#");
    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(str);
  }

  return Array.from(map.values());
}

console.log(groupAnagrams(["tab", "eat", "tea", "tan", "ate", "nat", "bat"]));
