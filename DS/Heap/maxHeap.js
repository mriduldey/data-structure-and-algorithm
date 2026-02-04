class MaxHeap {
    constructor(arr = []) {
        this.heap = [];
        if (Array.isArray(arr) && arr.length > 0) {
            this.buildHeap(arr)
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    peek() {
        return this.isEmpty() ? null : this.heap[0];
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

    clear() {
        this.heap.length = 0;
    }

    /* ====================== Internal Helpers ====================== */

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
            if (this.heap[parent] >= this.heap[i]) {
                break;
            }
            this._swap(i, parent);
            i = parent;
        }
    }

    _heapifyDown(i) {
        const n = this.size();

        while(true) {
            let largest = i;
            const left = this._left(i);
            const right = this._right(i);

            if(left < n && this.heap[largest] < this.heap[left]) {
                largest = left;
            }

            if(right < n && this.heap[largest] < this.heap[right]) {
                largest = right;
            }

            if(largest === i) {
                break;
            }

            this._swap(i, largest);
            i = largest;
        }
    }
}

const mH = new MaxHeap([1, 78, 23, 45, 100, 23, 567, 234, 56, 123, 999]);

console.log(mH);

console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());
console.log(mH.extractMax());