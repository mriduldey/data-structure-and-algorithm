/**
 * LC102 — Binary Tree Level Order Traversal
1. Problem Description

LC102 — Binary Tree Level Order Traversal is one of the most frequently asked Binary Tree problems in FAANG interviews (Google, Amazon, Meta, Microsoft, Apple). It tests Breadth First Search (BFS) using a queue.

Given the root of a binary tree, return the values of nodes level by level from left to right.

Common Constraints
Number of nodes: 0 ≤ n ≤ 2000 (sometimes 10^4)
Node values can be negative.
Tree is not necessarily balanced.
Expected Complexity
Time: O(n)
Space: O(n) (queue + output)
Example
        3
      /   \
     9     20
          /  \
         15   7

Output:

[
  [3],
  [9,20],
  [15,7]
]

Explanation

Level 0 -> [3]

Level 1 -> [9,20]

Level 2 -> [15,7]
2. Intuition

The tree naturally consists of levels.

Instead of DFS, use BFS.

Idea:

Put root into queue.
Queue always contains one complete level.
Before processing a level, record queue size.
Process exactly those many nodes.
Push their children into queue.
Store current level.
Repeat.

The important observation is:

Queue size before processing = number of nodes in current level.

3. Edge Cases (Ask Interviewer)
Can tree be empty?
Can node values repeat?
Can values be negative?
Maximum number of nodes?
Is left-to-right order mandatory? (Usually yes.)
 */

function levelOrderTraversal(root) {
  if (!root) return [];

  const result = [];

  const queue = [root];

  let front = 0;

  const memoryReset = null;

  while (front < queue.length) {
    const levelSize = queue.length - front;
    const nextLevel = [];

    for (let i = 1; i <= levelSize; i++) {
      const node = queue[front];
      queue[front++] = memoryReset; // reset memory in case the tree is very big

      nextLevel.push(node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    result.push(nextLevel);
  }

  return result;
}

// TreeNode Definition
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Example 1: Empty Tree
const tree1 = null;

// Example 2: Single Node
const tree2 = new TreeNode(1);

// Example 3: Balanced Tree (from problem description)
const tree3 = new TreeNode(3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

// Example 4: Left-Skewed Tree
const tree4 = new TreeNode(1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4)))
);

// Example 5: Right-Skewed Tree
const tree5 = new TreeNode(1,
  null,
  new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4)))
);

// Console Logs
console.log(levelOrderTraversal(tree1)); // []
console.log(levelOrderTraversal(tree2)); // [[1]]
console.log(levelOrderTraversal(tree3)); // [[3], [9, 20], [15, 7]]
console.log(levelOrderTraversal(tree4)); // [[1], [2], [3], [4]]
console.log(levelOrderTraversal(tree5)); // [[1], [2], [3], [4]]
