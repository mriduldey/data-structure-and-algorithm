/**
 * 1. LC 881 — Boats to Save People

Importance for FAANG: ★★★★☆ — important Two Pointers + Greedy problem. The exact problem is moderately frequent, but the greedy reasoning pattern—pair the heaviest person with the lightest feasible person—is very interview-relevant.

You are given:

people[i] = weight of the ith person
limit = maximum weight a boat can carry

Each boat can carry at most 2 people, and their combined weight must be <= limit.

Return the minimum number of boats required to carry everyone.

Common constraints
1 <= people.length <= 5 * 10^4
1 <= people[i] <= limit <= 3 * 10^4
Expected complexity
Time:  O(n log n)   // sorting dominates
Space: O(log n) / O(n) depending on JS sorting implementation

The actual two-pointer scan is O(n).

Example
people = [3,2,2,1]
limit = 3

Sort:

[1,2,2,3]

Pairing:

3 → cannot pair with 1 → boat 1
2 + 1 = 3            → boat 2
2                    → boat 3

Answer:

3
2. Intuition

After sorting:

lightest                     heaviest
   ↓                            ↓
[1, 2, 2, 3]
 L        R

Focus on the heaviest remaining person.

That person must leave on the next boat.

There are only two possibilities:

people[left] + people[right] <= limit

Then pair the heaviest with the lightest person.

Why?

If the heaviest cannot pair with the lightest person, they cannot pair with anyone else either because everyone else is heavier.

So:

if lightest + heaviest <= limit
    take both
else
    heaviest goes alone

In both cases:

right--
boats++

And when pairing succeeds:

left++
Greedy invariant

Always process the heaviest unassigned person.

Can pair with lightest?
        /      \
      yes       no
      /          \
pair them      alone

This guarantees the minimum number of boats.

3. Edge Cases to Ask the Interviewer

Only the relevant clarifications:

Does every person's weight satisfy weight <= limit?
LeetCode guarantees yes.
Can a boat carry more than two people?
No. Maximum is exactly 2 people.
Can a person ride alone?
Yes.
Do we only need the minimum number of boats, or also the actual pairings?
LC 881 asks only for the count.
May I reorder/sort the input?
Sorting is expected. If mutation matters, clarify whether the input should be preserved.

Useful test cases:

One person
Everyone requires separate boats
Every possible pair fits
Duplicate weights
Person exactly equal to limit
Pair exactly equal to limit
 */

function getNumOfBoats(people, limit) {
  if (people.length === 0) return 0;

  people.sort((a, b) => a - b);

  let left = 0;
  let right = people.length - 1;
  let boatNum = 0;

  while (left <= right) {
    // When pair possible
    if (people[left] + people[right] <= limit) {
      left++;
    }


    boatNum++;
    right--;
  }

  return boatNum;
}


// ✅ 10 Examples

console.log(getNumOfBoats([1, 2], 3));          
// 1 → (1+2 fits in one boat)

console.log(getNumOfBoats([3, 2, 2, 1], 3));   
// 3 → (1+2), (2), (3)

console.log(getNumOfBoats([3, 5, 3, 4], 5));   
// 4 → (1 boat each, no valid pair except 1+4)

console.log(getNumOfBoats([2, 2, 2, 2], 3));   
// 4 → (each 2 needs its own boat, since 2+2=4 > 3)

console.log(getNumOfBoats([2, 2, 2, 2], 4));   
// 2 → (pair each 2+2)

console.log(getNumOfBoats([1, 2, 3, 4, 5], 5)); 
// 3 → (1+4), (2+3), (5)

console.log(getNumOfBoats([5, 1, 4, 2], 6));   
// 2 → (1+5), (2+4)

console.log(getNumOfBoats([3, 8, 7, 1, 4], 9)); 
// 3 → (1+8), (3+7 too big), so (3+4), (7), (8)

console.log(getNumOfBoats([10, 2, 2, 3], 6));  
// 3 → (2+3), (2), (10)

console.log(getNumOfBoats([1, 1, 1, 1, 1], 2)); 
// 3 → (1+1), (1+1), (1)
