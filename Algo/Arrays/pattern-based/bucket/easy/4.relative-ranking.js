/**
 * LC 506 — Relative Ranks
1. Problem Description (FAANG Context)

Relative Ranks is a classic array + sorting / hashing problem frequently used in interviews to test:

ranking logic
mapping values to positions
handling ordering with constraints

Problem:
Given an array score[], assign ranks:

Highest score → "Gold Medal"
2nd → "Silver Medal"
3rd → "Bronze Medal"
Rest → their rank number (as string)

Return result in original order.

Constraints
1 <= n <= 10^4
0 <= score[i] <= 10^6
All scores are unique
Expected Complexity
Time: O(n log n) (sorting)
Space: O(n)
Example
Input:  [10, 3, 8, 9, 4]

Sorted: [10, 9, 8, 4, 3]

Ranks:
10 → Gold
9  → Silver
8  → Bronze
4  → 4
3  → 5

Output: ["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"]
2. Intuition

Core idea:

Ranking requires ordering → sorting
But output needs original index → mapping

So:

Store (value, index)
Sort descending
Assign rank
Place result back using index

👉 Pattern: Sort + Index Mapping

3. Edge Cases (Ask Interviewer)

Only relevant high-signal ones:

n = 1 → only "Gold Medal"
Already sorted input
Reverse sorted input
Large values (ensure no overflow assumptions)
Guarantee of uniqueness? (important → simplifies logic)
 */

function relativeRanking(score) {
  const n = score.length;
  const MEDALS = ["Gold", "Silver", "Bronze"];

  const arrayWithIndex = score.map((num, i) => [num, i]);

  arrayWithIndex.sort((a, b) => b[0] - a[0]);

  const res = new Array(n);
  for (let i = 0; i < n; i++) {
    const index = arrayWithIndex[i][1];
    res[index] = i < 3 ? MEDALS[i] : (i + 1).toString();
  }

  return res;
}

console.log(relativeRanking([5, 4, 3, 98, 99]));
