/**
 * 🟢 LC 35 — Search Insert Position (MUST)

Category: Binary Search
Difficulty: Easy (but foundational for FAANG interviews)
Core Concept: Lower Bound Binary Search

📌 Problem Statement

Given a sorted array of distinct integers and a target value:

If target exists → return its index

If not → return the index where it would be inserted

Must run in O(log n) time

🔎 Example 1
nums = [1, 3, 5, 6]
target = 5


Binary Search:

left	right	mid	nums[mid]
0	3	1	3
2	3	2	5

Target found at index 2

✅ Output: 2

🔎 Example 2 (Insert Case)
nums = [1, 3, 5, 6]
target = 2

left	right	mid	nums[mid]
0	3	1	3
0	0	0	1

Now:

left = 1

right = 0 → loop stops

Return left

Why?

Because left always represents the first index where value ≥ target

So:

Array becomes: [1, (2), 3, 5, 6]

Insert at index 1

✅ Output: 1

🔎 Example 3 (Insert at End)
nums = [1, 3, 5, 6]
target = 7


Eventually:

left = 4
right = 3


Return left = 4

Insert at end.
 */

function searchInsertPosition(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while(left <= right) {
        const mid = left + Math.floor((right - left) / 2);

        if(arr[mid] === target) return mid;

        if(arr[mid] > target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return left;
}

console.log(searchInsertPosition([1, 3, 5, 6], 2));

/**
 * const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
};

hasPath(graph, 0, 3) → true
hasPath(graph, 2, 3) → true
hasPath(graph, 3, 2) → true
hasPath(graph, 1, 4) → false
 */


function hasPath(graph, src, dest) {
    const nextNodes = graph[src];
    
    for(const node of nextNodes) {
        if(node === dest) {
            return true;
        }
        hasPath(graph, node, dest);
    }
}
const graph = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1]
};
console.log(hasPath(graph, 1, 4));