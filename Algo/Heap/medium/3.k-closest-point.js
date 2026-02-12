/**
 * 🧩 K Closest Points to Origin — LC 973 (Medium)

Category: Heap / Priority Queue
Core concept: Maintain the K smallest elements by distance

📌 Problem Statement

You are given:

An array points, where each point is represented as [x, y]

An integer k

Your task:

Return the k points that are closest to the origin (0,0).

📐 Distance Metric

The Euclidean distance from origin to a point (x, y) is:

𝑥
2
+
𝑦
2
x
2
+y
2
	​


However, since square root is monotonically increasing, comparing distances does not require the square root.

Instead, we compare:

𝑥
2
+
𝑦
2
x
2
+y
2

This avoids unnecessary computation and floating-point precision issues.

🎯 What Is the Goal?

Given:

points = [[x1,y1], [x2,y2], ...]
k


Return any k points with the smallest values of:

x² + y²


⚠️ Order of output does not matter.

✅ Example 1
Input
points = [[1,3], [-2,2]]
k = 1

Step 1: Compute squared distances
Point	x² + y²
(1,3)	1² + 3² = 1 + 9 = 10
(-2,2)	(-2)² + 2² = 4 + 4 = 8
Step 2: Sort by distance

Smallest distance → 8

Output
[[-2,2]]

✅ Example 2
Input
points = [[3,3],[5,-1],[-2,4]]
k = 2

Step 1: Compute squared distances
Point	x² + y²
(3,3)	9 + 9 = 18
(5,-1)	25 + 1 = 26
(-2,4)	4 + 16 = 20
Step 2: Sort by distance

Sorted order:

(3,3) → 18

(-2,4) → 20

(5,-1) → 26

Step 3: Pick first k = 2
Output
[[3,3], [-2,4]]


(Any order between these two is acceptable.)

💡 Important Observations

We do not need actual distance — squared distance is enough.

Order of result does not matter.

Brute force sorting works, but not optimal.

This is a classic Top-K smallest elements problem.
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
        if(this.isEmpty()) return null;
        return this.heap[0];
    }

    insert(val) {
        this.heap.push(val);
        this._heapifyUp(this.size() - 1);
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
        return i * 2 + 1;
    }

    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    _heapifyUp(i) {
        while(i > 0) {
            const parent = this._parent(i);
            if(this.heap[parent][0] > this.heap[i][0]) {
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

            if(left < n && this.heap[left][0] > this.heap[max][0]) {
                max = left;
            }

            if(right < n && this.heap[right][0] > this.heap[max][0]) {
                max = right;
            }

            if(max === i) {
                break;
            }

            this._swap(i, max);
            i = max;
        }
    }
}

function kClosest(points, k) {
    const heap = new MaxHeap();

    for(const [x, y] of points) {
        const distance = x ** 2 + y ** 2;
        heap.insert([distance, [x, y]]);

        if(heap.size() > k) {
            heap.extractMax();
        }
    }

    const result = [];
    while(heap.size() > 0) {
        result.push(heap.extractMax()[1]);
    }

    return result;
}


console.log(kClosest([[1,3], [-2,2]], 1));

console.log(kClosest([[3,3],[5,-1],[-2,4]], 2))
