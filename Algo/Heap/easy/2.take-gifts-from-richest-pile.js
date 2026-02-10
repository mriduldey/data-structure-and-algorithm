/**
 * 🧩 Problem Statement (Rewritten Clearly)

You are given:

An integer array gifts[], where gifts[i] represents the number of gifts in the i-th pile
An integer k — the number of operations you must perform

Operation (repeat exactly k times):
Pick the pile with the maximum number of gifts
From that pile, remove ⌊√x⌋ gifts, where x is the current number of gifts in that pile
Update the pile with the remaining gifts

After performing k operations, return the total number of gifts left across all piles.

📌 Important Observations

At every step, you must know the current maximum pile

After removing gifts, that pile changes value, so the “richest” pile may change

Order of piles does not matter

🔢 Example 1
Input
gifts = [25, 64, 9, 4, 100]
k = 4

Step-by-Step Execution
Step	Max Pile	√x (floor)	Remaining	Updated Piles
1	      100	       10	       90	  [25, 64, 9, 4, 90]
2	      90	       9	       81	  [25, 64, 9, 4, 81]
3	      81	       9	       72	  [25, 64, 9, 4, 72]
4	      72	       8	       64	  [25, 64, 9, 4, 64]
Final Sum
25 + 64 + 9 + 4 + 64 = 166

Output
166

🔢 Example 2
Input
gifts = [1, 1, 1]
k = 3

Execution

Max pile is always 1

√1 = 1 → pile becomes 0

After 3 operations:

[0, 0, 0]

Output
0

 */

class MaxHeap {
    constructor(arr = []) {
        this.heap = [];
        if(Array.isArray(arr) && arr.length > 0) {
            this.buildHeap(arr);
        }
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

    buildHeap(arr) {
        this.heap = [...arr];
        for(let i = Math.floor(this.size() / 2) - 1; i >= 0; i--) {
            this._heapifyDown(i);
        }
    }

    extractMax() {
        if(this.isEmpty()) return null;
        if(this.size() === 1) return this.heap.pop();

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
        while(i > 0) {
            const parent = this._parent(i);
            if(this.heap[parent] > this.heap[i]) {
                break;
            }

            this._swap(i, parent);
            i = parent;
        }
    }

    _heapifyDown(i) {
        const n = this.size();

        while(true) {
            let max = i;
            const left = this._left(i);
            const right = this._right(i);

            if(left < n && this.heap[left] > this.heap[max]) {
                max = left;
            }

            if(right < n && this.heap[right] > this.heap[max]) {
                max = right;
            }

            if(max === i) {
                return;
            }

            this._swap(i, max);
            i = max;
        }
    }
}

function giftFromRichestPile(gifts, k) {
    const heap = new MaxHeap(gifts);

    let totalCount = 0;

    for(let i = 1; i <= k; i++) {
        const count = heap.extractMax();
        heap.insert(count - Math.floor(Math.sqrt(count)));
    }

    for(const count of heap.heap) {
        totalCount += count;
    }

    return totalCount;
}

console.log(giftFromRichestPile([25, 64, 9, 4, 100], 4))

console.log(giftFromRichestPile([1, 1, 1], 4))
