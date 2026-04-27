/**
 * LC 692 — Top K Frequent Words
1. Problem Description

LC 692 — Top K Frequent Words is a very common FAANG interview problem that tests:

Hashing (frequency counting)
Heap / sorting
Custom comparator (critical part)
Problem

Given an array of strings words and an integer k, return the k most frequent words.

Rules:

Higher frequency → higher priority
If frequencies are same → lexicographically smaller word comes first
Constraints
1 ≤ words.length ≤ 5 * 10^4
1 ≤ words[i].length ≤ 10
k ≤ number of unique words
Expected Complexity
Time: O(n log k) (heap optimal) OR O(n log n) (sorting)
Space: O(n)
Example
Input:
words = ["i","love","leetcode","i","love","coding"], k = 2

Step 1: Frequency Map
i → 2
love → 2
leetcode → 1
coding → 1

Step 2: Sort by:
1. Frequency DESC
2. Lexicographical ASC

Sorted:
["i", "love", "coding", "leetcode"]

Output:
["i", "love"]
2. Intuition

Core idea:

Step 1 — Count frequency

Use HashMap:

word → count
Step 2 — Ordering logic (IMPORTANT)

Custom ordering:

if freq different → higher freq first
if freq same → lexicographically smaller first
Step 3 — Extract Top K

Two approaches:

✅ Approach 1 (Sorting)
Convert map → array
Sort using comparator
✅ Approach 2 (Min Heap) — Optimal
Maintain heap of size k
Keep lowest priority at top
Pop when size > k
3. Edge Cases (Ask Interviewer)

Only relevant ones:

k == unique words
All words same
All frequencies same → check lexicographic sorting
Large input (performance check)
Case sensitivity? ("Word" vs "word")
Unicode / special characters?
 */

class MinHeap1 {
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

  extractMin() {
    if (this.isEmpty()) return null;
    if (this.size() === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._heapifyDown(0);
    return min;
  }

  // ------- internal methods

  _parent(i) {
    return Math.floor((i - 1) / 2);
  }

  _left(i) {
    return i * 2 + 1;
  }

  _right(i) { // Fixed: added 'i' parameter
    return i * 2 + 2;
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  _compare(a, b) {
    // Priority based on index-[1](freq). If equal, alphabetical on index-[0](word)
    if (a[1] === b[1]) {
      return b[0].localeCompare(a[0]); // Descending order
    }
    return a[1] - b[1];
  }

  _heapifyUp(i) {
    while (i > 0) {
      const parent = this._parent(i);
      
      if (this._compare(this.heap[i], this.heap[parent]) >= 0) {
        return;
      }

      this._swap(i, parent);
      i = parent;
    }
  }

  _heapifyDown(i) {
    const n = this.size();
    while (true) {
      let smallest = i;
      const left = this._left(i);
      const right = this._right(i);

      if (left < n && this._compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }

      if (right < n && this._compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === i) {
        return;
      }

      this._swap(i, smallest);
      i = smallest;
    }
  }
}

function topKFreqWords(words, k) {
  const freq = new Map();

  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }

  const heap = new MinHeap1();
  for (const entry of freq.entries()) {
    heap.insert(entry);
    if (heap.size() > k) {
      heap.extractMin();
    }
  }

  const result = [];
  while (heap.size()) {
    result.push(heap.extractMin()[0]);
  }

  return result.reverse();
}

console.log(topKFreqWords(["i","love","leetcode","i","love","you", "you","coding"], 4))