/**
 * Last Stone Weight (LC 1046) — FAANG Explanation
Problem

You are given an array stones, where each value is a stone’s weight.

Each turn:

Pick the two heaviest stones x and y (where x <= y)

Smash them:

If x == y → both destroyed

If x != y → new stone of weight y - x is added

Repeat until 0 or 1 stone remains.

Return the last remaining stone weight, else return 0.

✅ Constraints (LeetCode Official)

1 <= stones.length <= 30

1 <= stones[i] <= 1000
 */

class MaxHeap {
    constructor(arr = []) {
        this.heap = [];
        if (Array.isArray(arr) && arr.length > 0) {
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
        if (this.isEmpty()) return 0;
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

    buildHeap(arr) {
        this.heap = [...arr];
        for (let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
            this._heapifyDown(i);
        }
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
            if (this.heap[parent] > this.heap[i]) {
                break;
            }
            this._swap(i, parent);
            i = parent;
        }
    }

    _heapifyDown(i) {
        const n = this.size();

        while (true) {
            let maximum = i;
            const left = this._left(i);
            const right = this._right(i);

            if (left < n && this.heap[left] > this.heap[maximum]) {
                maximum = left;
            }

            if (right < n && this.heap[right] > this.heap[maximum]) {
                maximum = right;
            }

            if (maximum === i) {
                break;
            }

            this._swap(i, maximum);
            i = maximum;
        }
    }
}

function lastStoneWeight(stones) {
    const heap = new MaxHeap(stones);

    while (heap.size() > 1) {
        const y = heap.extractMax();
        const x = heap.extractMax();

        if (x !== y) {
            heap.insert(y - x);
        }
    }
    return heap.peek();
}

console.log(lastStoneWeight([5, 5, 5, 5]));