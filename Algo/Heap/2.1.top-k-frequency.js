/**
 * Top K Frequent Elements (LC 347) — Explanation (FAANG Standard)
Problem

Given an array nums, return the first k elements that appear most frequently.

Example:

nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    insert(val) {
        this.heap.push(val);
        this._heapifyUp(this.size() - 1);
    }

    extractMin() {
        if(this.isEmpty()) return null;
        if(this.size() === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);

        return min;
    }

    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    // internal methods

    _parent(i) {
        return Math.floor((i - 1) / 2);
    }

    _left(i) {
        return (i * 2) + 1;
    }

    _right(i) {
        return (i * 2) + 2;
    }

    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    _heapifyUp(i) {
        while(i > 0) {
            const parent = this._parent(i);
            if(this.heap[parent][0] <= this.heap[i][0]) {
                break;
            }

            this._swap(i, parent);
            i = parent;
        }
    }

    _heapifyDown(i) {
        const n = this.size();

        while(true) {
            let min = i;
            const left = this._left(i);
            const right = this._right(i);

            if(left < n && this.heap[left][0] < this.heap[min][0]) {
                min = left;
            }

            if(right < n && this.heap[right][0] < this.heap[min][0]) {
                min = right;
            }

            if(min === i) {
                break;
            }

            this._swap(min, i);
            i = min;
        }
    }
}

function findTopKfrequency(nums, k) {
    if (nums.length === 0) {
        return null; 
    }
    const freq = new Map();
    for(const num of nums) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    const heap = new MinHeap();
    for(const [num, count] of freq.entries()) {
        heap.insert([count, num]);
        if(heap.size() > k) {
            heap.extractMin();
        }
    }

    const result = [];
    while(heap.size() > 0) {
        result.push(heap.extractMin()[1]);
    }

    return result;
}

console.log(findTopKfrequency([1, 1, 1, 1, 4, 4, 4, 4, 4, 4], 1));