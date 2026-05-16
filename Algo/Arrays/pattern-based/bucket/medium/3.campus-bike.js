/**
 * LC 1057 — Campus Bikes

LeetCode Premium | Medium
Very important FAANG-level greedy + sorting + bucket-sort style assignment problem. Frequently asked to test:

Manhattan distance handling
Greedy assignment
Tie-breaking rules
Sorting optimization
Bucket sort optimization

Common constraints:

workers.length <= 1000
bikes.length <= 1000
Coordinates <= 1000

Expected complexities:

Brute force sorting:
Time → O(W * B log(W*B))
Space → O(W * B)
Optimized bucket sort (best interview solution):
Time → O(W * B + MAX_DISTANCE)
Space → O(W * B)
1. Problem Description

You are given:

workers[i] = [x, y]
bikes[j] = [x, y]

Assign exactly one bike to each worker.

Rules:

Choose pair with minimum Manhattan distance.
If tie → smaller worker index.
If still tie → smaller bike index.

Return assigned bike index for every worker.

Manhattan distance:

∣x
1
	​

−x
2
	​

∣+∣y
1
	​

−y
2
	​

∣

Example:

workers = [[0,0],[2,1]]
bikes   = [[1,2],[3,3]]

Distances:

worker0-bike0 = 3
worker0-bike1 = 6
worker1-bike0 = 2
worker1-bike1 = 3

Sorted by:

(2,w1,b0)
(3,w0,b0)
(3,w1,b1)
(6,w0,b1)

Take greedily:

worker1 gets bike0
worker0 gets bike1

Output:

[1,0]
2. Intuition

Core observation:

Constraints are small enough to compute all worker-bike pairs.
Entire problem depends on:
distance
worker index
bike index

So:

Generate all pairs
Sort by rules
Greedily assign if both unused

This is basically:

Greedy matching
Global priority ordering

Important interview insight:

Since Manhattan distance max is only 2000,
bucket sort becomes possible and preferred.

Maximum distance:

∣1000−0∣+∣1000−0∣=2000

3. Edge Cases (Important Interview Clarifications)

Ask interviewer:

Relevant Clarifications
Can workers and bikes count differ?
Usually bikes >= workers
Can multiple distances be same?
Yes → tie-breaking critical
Can coordinates be negative?
Usually no, but code should still work
Is every worker guaranteed assignment?
Usually yes
Can worker and bike share same coordinates?
Yes → distance 0
 */

function assignBikes(workers, bikes) {
  const buckets = Array.from({ length: 2001 }, () => []);

  for (let i = 0; i < workers.length; i++) {
    for (let j = 0; j < bikes.length; j++) {
      const dist =
        Math.abs(workers[i][0] - bikes[j][0]) +
        Math.abs(workers[i][1] - bikes[j][1]);
      buckets[dist].push([i, j]);
    }
  }

  const result = Array(workers.length).fill(-1);
  const usedWorkers = Array(workers.length).fill(false);
  const usedBikes = Array(bikes.length).fill(false);

  let assigned = 0;

  for (let dist = 0; dist <= 2000 && assigned <= workers.length; dist++) {
    for (const [w, b] of buckets[dist]) {
      if (usedWorkers[w] || usedBikes[b]) {
        continue;
      }

      result[w] = b;
      usedWorkers[w] = true;
      usedBikes[b] = true;

      assigned++;
    }
  }

  return result;
}

console.log(
  assignBikes(
    [
      [0, 0],
      [2, 1],
      [400, 400]
    ],
    [
      [1, 2],
      [3, 3],
      [390, 395]
    ],
  ),
);
