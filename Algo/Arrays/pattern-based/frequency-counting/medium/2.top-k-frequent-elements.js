/**
 * LC 347 — Top K Frequent Elements
1️⃣ Problem Description

Given an integer array nums and an integer k, return the k most frequent elements.

Constraints

1 ≤ nums.length ≤ 10⁵

1 ≤ k ≤ number of unique elements

Must be better than O(n log n)

Example
Input:  nums = [1,1,1,2,2,3], k = 2

Frequency map:

Element	Count
1	3
2	2
3	1

Top 2 frequent → [1,2]

Output: [1,2]

Order does not matter.

2️⃣ Intuition

This is a frequency counting + selection problem.

Core pattern:

Count frequency → HashMap

Extract top k elements efficiently

Three major approaches:

Min Heap (Priority Queue) → O(n log k) ✅ FAANG preferred

Bucket Sort → O(n) optimal

Quick Select → Average O(n)

Sorting entire array (O(n log n)) is NOT acceptable for interview follow-up.

3️⃣ Edge Cases to Clarify with Interviewer

Ask:

Can numbers be negative? ✅ yes

Is k always valid? (k ≤ unique elements?)

If k == unique elements → return all?

What if nums.length == 1?

Can multiple answers exist? (Yes — order doesn't matter)

Need sorted output? (Usually no)

Special cases:

nums = [1]
k = 1
nums = [1,2,3,4]
k = 4
nums = [1,1,2,2,3,3]
k = 2   // tie case
 */

class MinHeap {
  constructor(arr) {
    this.heap = [];
    if (Array.isArray(arr) && arr.length === 0) {
      this.buildHeap(arr);
    }
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

  buildHeap(arr) {
    this.heap = [...arr];
    for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
      this._heapifyDown(i);
    }
  }

  extractMin() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);

    return min;
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
      if (this.heap[i][0] > this.heap[parent][0]) {
        break;
      }
      this._swap(i, parent);
      i = parent;
    }
  }

  _heapifyDown(i) {
    const n = this.size();
    while (true) {
      let min = i;
      const left = this._left(i);
      const right = this._right(i);

      if (left < n && this.heap[min][0] > this.heap[left][0]) {
        min = left;
      }

      if (right < n && this.heap[min][0] > this.heap[right][0]) {
        min = right;
      }

      if (i === min) {
        break;
      }

      this._swap(i, min);
      i = min;
    }
  }
}

function topKfrequent(nums, k) {
  if (!nums || !Array.isArray(nums) || nums.length === 0) return [];

  const map = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const heap = new MinHeap();
  for (const [num, count] of map.entries()) {
    heap.insert([count, num]);
    if (heap.size() > k) {
      heap.extractMin();
    }
  }

  const result = [];
  while (heap.size() > 0) {
    result.push(heap.extractMin()[1]);
  }

  return result;
}

console.log(topKfrequent([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4], 2));
