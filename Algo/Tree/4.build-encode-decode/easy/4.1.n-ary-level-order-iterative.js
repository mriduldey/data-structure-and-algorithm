/**
 * LC 429 — N-ary Tree Level Order Traversal
1. Problem Description

LeetCode 429 — N-ary Tree Level Order Traversal is a medium-importance, moderately frequent FAANG tree problem. It tests whether you can generalize BFS/level-order traversal from a binary tree to a node containing an arbitrary number of children.

Given the root of an N-ary tree, return its node values level by level, from left to right.

Node {
    val: number
    children: Node[]
}
Common Constraints
0 <= number of nodes <= 10⁴
0 <= children.length
-10⁴ <= Node.val <= 10⁴
Tree depth is usually bounded by about 1000
Expected Complexity
Time: O(n) — every node is processed once.
Auxiliary space: O(w) — queue stores at most the maximum tree width.
Output space: O(n).
Example
        1
      / | \
     3  2  4
    / \
   5   6
Input:  root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]

Explanation:

Level 0: [1]
Level 1: [3,2,4]
Level 2: [5,6]
2. Intuition

Level-order traversal means processing nodes according to their distance from the root.

Use BFS with a queue:

Add the root to the queue.
Before processing a level, record the current queue size.
Process exactly that many nodes.
Add each node’s children to the queue.
Store the processed values as one level.

The queue may receive nodes from the next level while the current level is being processed, so the captured levelSize is essential.

3. Edge Cases to Ask the Interviewer
Can the root be null?
Return [].
Is the tree guaranteed to be valid and acyclic?
Normally yes for LeetCode; otherwise a visited set may be required.
Can children be missing or null?
LeetCode normally provides an array, but production code can safely handle missing children.
Must children be processed in their existing order?
Usually yes.
Should the output contain values or node references?
Usually values.
Can the tree be extremely wide or deep?
This affects iterative-versus-recursive implementation choice.
 */

function levelOrder(root) {
  if (!root) return [];

  const result = [];

  const queue = [root];
  let front = 0;

  while (front < queue.length) {
    const lavelSize = queue.length - front;

    const currentLevel = [];

    for (let i = 0; i < lavelSize; i++) {
      const node = queue[front++];

      currentLevel.push(node.val);

      for (const child of node.children ?? []) {
        child && queue.push(child);
      }
    }

    result.push(currentLevel);
  }

  return result;
}

// Node definition
function Node(val, children) {
  this.val = val === undefined ? 0 : val;
  this.children = children === undefined ? [] : children;
}

// -----------------------------------------------------------------------------
// Tree 1: Empty Tree
// -----------------------------------------------------------------------------
const tree1 = null;

// -----------------------------------------------------------------------------
// Tree 2: Single Node Tree
//      42
// -----------------------------------------------------------------------------
const tree2 = new Node(42);

// -----------------------------------------------------------------------------
// Tree 3: Classic N-ary Tree (Standard 3-Level)
//        1
//      / | \
//     3  2  4
//    / \
//   5   6
// -----------------------------------------------------------------------------
const tree3 = new Node(1, [
  new Node(3, [new Node(5), new Node(6)]),
  new Node(2),
  new Node(4)
]);

// -----------------------------------------------------------------------------
// Tree 4: Deep Linear Tree (Single Child Path)
//   100
//    |
//   200
//    |
//   300
//    |
//   400
// -----------------------------------------------------------------------------
const tree4 = new Node(100, [
  new Node(200, [
    new Node(300, [
      new Node(400)
    ])
  ])
]);

// -----------------------------------------------------------------------------
// Tree 5: Wide "Star" Tree (Shallow with high fan-out)
//          10
//     /  /  |  \  \
//    1  2   3   4  5
// -----------------------------------------------------------------------------
const tree5 = new Node(10, [
  new Node(1),
  new Node(2),
  new Node(3),
  new Node(4),
  new Node(5)
]);

// -----------------------------------------------------------------------------
// Tree 6: Asymmetric Deep Multi-Branch Tree
//              1
//         /    |    \
//        2     3     4
//       / \    |   / | \
//      5   6   7  8  9  10
//              |
//             11
// -----------------------------------------------------------------------------
const tree6 = new Node(1, [
  new Node(2, [new Node(5), new Node(6)]),
  new Node(3, [new Node(7, [new Node(11)])]),
  new Node(4, [new Node(8), new Node(9), new Node(10)])
]);

// -----------------------------------------------------------------------------
// Executing levelOrder on all examples
// -----------------------------------------------------------------------------
console.log("Tree 1 (Empty):", levelOrder(tree1));
// Output: []

console.log("Tree 2 (Single Node):", levelOrder(tree2));
// Output: [[42]]

console.log("Tree 3 (Standard):", levelOrder(tree3));
// Output: [[1], [3, 2, 4], [5, 6]]

console.log("Tree 4 (Linear):", levelOrder(tree4));
// Output: [[100], [200], [300], [400]]

console.log("Tree 5 (Star):", levelOrder(tree5));
// Output: [[10], [1, 2, 3, 4, 5]]

console.log("Tree 6 (Asymmetric):", levelOrder(tree6));
// Output: [[1], [2, 3, 4], [5, 6, 7, 8, 9, 10], [11]]