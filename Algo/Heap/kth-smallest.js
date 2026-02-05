class MaxHeap {
    constructor() {
        this.heap = [];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size === 0;
    }

    peek() {
        return this.isEmpty() ? null : this.heap[0];
    }

    insert(val) {
        this.heap.push(val);
        this._heapifyUp(this.size() - 1);
    }

    extractMin() {
        if (this.isEmpty()) return null;
        if (this.size() === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);
        return max;
    }

    // Internal methods
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

    _heapifyDown(i) {
        const n = this.size();

        while (true) {
            let largest = i;
            const left = this._left(i);
            const right = this._right(i);

            if (left < n && this.heap[left] > this.heap[largest]) {
                largest = left;
            }

            if (right < n && this.heap > this.heap[largest]) {
                largest = right;
            }

            if (largest === i) {
                break;
            }

            this._swap(largest, i);
            i = largest;
        }
    }

    _heapifyUp(i) {
        while(i > 0) {
            const parent = this._parent(i);
            if(this.heap[parent] >= this.heap[i]) {
                break;
            }

            this._swap(parent, i);
            i = parent;
        }
    }
}

function findKthSmallest(nums, k) {
    const heap = new MaxHeap();

    for(const num of nums) {
        heap.insert(num);
        if(heap.size() > k) {
            heap.extractMax();
        }
    }

    return heap.peek();
}


console.log(findKthSmallest([1, 78, 23, 45, 100, 23, 567, 234, 56, 123, 999], 11));