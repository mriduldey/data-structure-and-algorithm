class MinHeap {
    constructor(arr = []) {
        this.heap = [];

        if (Array.isArray(arr) && arr.length > 0) {
            this.buildHeap(arr);
        }
    }

    /* ====================== Public APIs ====================== */
    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    insert(value) {
        this.heap.push(value);
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

    buildHeap(array) {
        this.heap = [...array];

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
        return Math.floor(i * 2 + 1)
    }

    _right(i) {
        return Math.floor(i * 2 + 2);
    }

    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    _heapifyUp(index) {
        let i = index;

        while(i > 0) {
            const parentIndex = this._parent(i);
            if(this.heap(parentIndex) <= this.heap(i)) {
                break;
            }
            this._swap(i, parentIndex);
            i = parentIndex;
        }
    }

    _heapifyDown(index) {
        let i = index;
        const n = this.size();

        while(true) {
            let smallest = i;
            const left = this._left(i);
            const right = this._right(i);

            if(left < n && this.heap[left] <= this.heap[smallest]) {
                smallest = left;
            }

            if(right < n && this.heap[right] <= this.heap[smallest]) {
                smallest = right;
            }

            if(smallest === i) {
                break;
            }

            this._swap(i, smallest);
            i = smallest;
        }
    }
}

const h = new MinHeap([1, 78, 23, 45, 100, 23, 567, 234, 56, 123, 999]);

console.log(h);

console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
console.log(h.extractMin());
