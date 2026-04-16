/**
 * Relative Ranks (LeetCode 506)
Problem Statement

You’re given an integer array score where score[i] is the score of the i-th athlete.
Your task is to return an array answer of the same length such that:

The highest score → "Gold Medal"

The second highest → "Silver Medal"

The third highest → "Bronze Medal"

All others → their rank number as a string ("4", "5", …)

⚠️ Important:
The output must be in the original order of athletes.

Key Insight

This is a ranking + position mapping problem.

You must:

Rank athletes by score (descending)

Assign medals/ranks

Place results back into original indices

Example 1
Input
score = [5, 4, 3, 2, 1]

Step-by-step
Score	Rank	Output
5	1	Gold Medal
4	2	Silver Medal
3	3	Bronze Medal
2	4	"4"
1	5	"5"
Output
["Gold Medal", "Silver Medal", "Bronze Medal", "4", "5"]

Example 2 (Unsorted Scores)
Input
score = [10, 3, 8, 9, 4]

Step 1: Attach original indices
[(10,0), (3,1), (8,2), (9,3), (4,4)]

Step 2: Sort by score (descending)
[(10,0), (9,3), (8,2), (4,4), (3,1)]

Step 3: Assign ranks
Sorted Pos	Score	Original Index	Rank
0	10	0	Gold Medal
1	9	3	Silver Medal
2	8	2	Bronze Medal
3	4	4	"4"
4	3	1	"5"
Step 4: Restore original order
Index:  0        1   2           3            4
Output: Gold   "5" Bronze    Silver         "4"

Final Output
["Gold Medal", "5", "Bronze Medal", "Silver Medal", "4"]

 */

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.heap[0];
  }

  insert(val) {
    this.heap.push(val);
    this._heapifyUp(this.size() - 1);
  }

  extractMax() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    return max;
  }

  // internal methods

  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _left(i) {
    return i * 2 + 1;
  }

  _right(i) {
    return i * 2 + 2;
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _heapifyUp(i) {
    while (i > 0) {
      const parent = this._parent(i);
      if (this.heap[i][0] < this.heap[parent][0]) {
        break;
      }

      this._swap(i, parent);
      i = parent;
    }
  }

  _heapifyDown(i) {
    const n = this.size();
    while (true) {
      let max = i;
      const left = this._left(i);
      const right = this._right(i);

      if (left < n && this.heap[left][0] > this.heap[max][0]) {
        max = left;
      }

      if (right < n && this.heap[right][0] > this.heap[max][0]) {
        max = right;
      }

      if (max === i) {
        break;
      }

      this._swap(i, max);
      i = max;
    }
  }
}

function findRelativeRank(score) {
  const n = score.length;
  const MEDALS = { 1: "Gold", 2: "Silver", 3: "Bronze" };
  const result = new Array(n);
  const heap = new MaxHeap();
  for (let i = 0; i < n; i++) {
    heap.insert([score[i], i]);
  }

  let rank = 1;
  while (heap.size() > 0) {
    const [_, index] = heap.extractMax();
    result[index] = rank <= 3 ? MEDALS[rank] : rank;
    rank++;
  }

  return result;
}

console.log(findRelativeRank([5, 4, 3, 98, 99]));