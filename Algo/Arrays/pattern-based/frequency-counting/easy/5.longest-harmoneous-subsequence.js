/**
 * /**
 * LC 594 — Longest Harmonious Subsequence
1️⃣ Problem Description

A harmonious subsequence is a subsequence where:

max(subsequence) - min(subsequence) = 1

We must return the length of the longest harmonious subsequence (LHS).

Example
Input:  [1,3,2,2,5,2,3,7]

Frequency:

1 → 1
2 → 3
3 → 2
5 → 1
7 → 1

Valid harmonious pairs:

(1,2) → 1 + 3 = 4

(2,3) → 3 + 2 = 5 ✅

(5,7) → invalid (diff = 2)

Output:

5

Because subsequence [2,2,2,3,3] has:

max = 3
min = 2
diff = 1
length = 5
2️⃣ Intuition

Key observations:

Order does NOT matter (subsequence).

We only care about frequency counts.

For any number x, check if x + 1 exists.

If yes → candidate length = freq[x] + freq[x+1]

Take maximum.

So this becomes a frequency map problem.

Time Complexity target: O(n)
Space Complexity: O(n)

3️⃣ Edge Cases (Ask Interviewer)

Can array contain negative numbers?

Can array contain duplicates? (Yes)

What if no harmonious subsequence exists? (Return 0)

Can array be empty?

Are values within 32-bit integer range?

Do we need actual subsequence or only length? (Only length)
 */

function longestHarmoneousSeq(nums) {
    if(!nums || nums.length === 0) return null;

    const freq = new Map();
    for(const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    maxLen = 0;

    for(let [num, count] of freq.entries()) {
        if(freq.has(num + 1)) {
            maxLen = Math.max(maxLen, count + freq.get(num + 1));
        }
    }

    return maxLen;
}