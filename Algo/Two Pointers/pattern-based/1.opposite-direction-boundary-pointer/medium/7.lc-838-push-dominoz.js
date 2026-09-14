/**
 * 1. LC 838 — Push Dominoes

FAANG importance: Medium
Frequency: Low–Medium, but it is a strong interview problem for two pointers, simulation, interval reasoning, and string transformation.

You are given a string dominoes where:

L → domino is pushed left
R → domino is pushed right
. → domino is initially standing

All pushes happen simultaneously every second. Return the final state.

Common constraints
1 <= dominoes.length <= 10^5
dominoes[i] is 'L', 'R', or '.'
Expected complexity
Time  : O(n)
Space : O(n)   // because strings are immutable in JavaScript
Example
Input:
".L.R...LR..L.."

Output:
"LL.RR.LLRRLL.."

Key transformations:

.L     -> LL

R...L  -> RR.LL
          ^ middle domino stays upright

R..L   -> RRLL

L...R  -> L...R

The important observation is that each group of . depends only on the nearest non-dot domino on its left and right.

2. Intuition

Instead of simulating every second, process the string between consecutive forces.

Add virtual boundary forces:

L + dominoes + R

Why?

Original:   ....R....
Virtual:  L ....R.... R

Now every dot segment has a force on both sides.

Suppose two forces are:

leftForce .... rightForce

There are only 4 cases:

L ... L   -> all L

R ... R   -> all R

L ... R   -> dots remain standing

R ... L   -> forces move toward each other
             RR...LL

For R ... L:

fill from both ends
if odd number of dots, one middle domino remains .

Example:

R....L

4 dots:

RRRLLL

Example:

R...L

3 dots:

RR.LL

This lets us solve everything in one linear scan.

3. Edge Cases to Ask Interviewer

Only relevant clarification questions:

Do all pushes happen simultaneously?
Yes. This is critical; sequential processing would give incorrect results.

Can the input contain only .?

"...." -> "...."

Can the string begin/end with standing dominoes?

"...L" -> "LLLL"
"R..." -> "RRRR"

When equal forces meet at the same domino, does it remain upright?

"R.L" -> "R.L"
Should the original string be modified?
JavaScript strings are immutable, so normally return a new string.
 */

function pushDominoz(dominozStr) {
  const dominoz = ("L" + dominozStr + "R").split("");

  let left = 0;

  for (let right = 1; right < dominoz.length; right++) {
    if (dominoz[right] === ".") continue;

    if (right - left > 1) {
      const leftForce = dominoz[left];
      const rightForce = dominoz[right];

      if (leftForce === rightForce) {
        for (let i = left + 1; i < right; i++) {
          dominoz[i] = leftForce;
        }
      } else if (leftForce === "R" && rightForce === "L") {
        let l = left + 1;
        let r = right - 1;

        // Take care of the dominoz except when l == r, it remains '.'
        while (l < r) {
          dominoz[l++] = "R";
          dominoz[r--] = "L";
        }
      }

      // L .. R requires no handling
    }

    left = right;
  }

  return dominoz.slice(1, -1).join("");
}


console.log(pushDominoz("RR.L"));        // "RR.L"
console.log(pushDominoz(".L.R...LR..L..")); // "LL.RR.LLRRLL.."
console.log(pushDominoz("R...L"));       // "RR.LL"
console.log(pushDominoz("L...R"));       // "L...R"
console.log(pushDominoz("R.R.L"));       // "RRR.L"
console.log(pushDominoz("..."));         // "..."
console.log(pushDominoz("R"));           // "R"
console.log(pushDominoz("L"));           // "L"
console.log(pushDominoz("RL"));          // "RL"
console.log(pushDominoz("R....L"));      // "RRRLLL"
