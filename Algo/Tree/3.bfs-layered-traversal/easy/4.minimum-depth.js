/**
 * 1. Problem Description

LC111 — Minimum Depth of Binary Tree is a basic but important FAANG-style binary tree BFS/DFS problem. It is frequently used to test whether you understand the difference between minimum depth and just taking min(leftHeight, rightHeight) blindly.

Given the root of a binary tree, return its minimum depth.

Minimum depth = number of nodes along the shortest path from the root node down to the nearest leaf node.

A leaf is a node with no left and no right child.

Common Constraints
Number of nodes: 0 to 10^5
Node value: any integer
Expected Complexity

Best interview solution:

Time: O(n)
Space: O(w) for BFS queue, where w = max width of tree

DFS solution:

Time: O(n)
Space: O(h) recursion stack

Where:

n = number of nodes
h = height of tree
Example
Input:
        3
       / \
      9   20
          / \
         15  7

Output: 2

Explanation:

Shortest root-to-leaf path is: 3 -> 9
Depth = 2

Important: 9 is a leaf because it has no children.

2. Intuition

For minimum depth, the first leaf we reach in level order traversal gives the answer.

That makes BFS the most natural solution.

Why?

BFS visits nodes level by level.
The first leaf found is guaranteed to be the nearest leaf.

For DFS, be careful:

Math.min(leftDepth, rightDepth) + 1

is wrong when one child is missing.

Example:

    1
   /
  2

Wrong logic gives:

min(1, 0) + 1 = 1

But correct answer is:

2

Because node 1 is not a leaf.

3. Edge Cases to Ask Interviewer

Ask only these:

Can the tree be empty?
Return 0.
Is a leaf defined as node with both children null?
Yes.
For a node with only one child, should missing child count as depth 0?
No. We must continue through the existing child.
Can the tree be very skewed?
Yes. Recursive DFS may hit call stack limits in JavaScript, so BFS is safer.
 */

function minimumDepth(root) {
  if (!root) return 0;

  const queue = [[root, 1]];

  let head = 0;

  while (head < queue.length) {
    const [node, depth] = queue[head++];

    if (!node.left && !node.right) {
      return depth;
    }

    node.left && queue.push([node.left, depth + 1]);
    node.right && queue.push([node.right, depth + 1]);
  }
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
const tree3 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

// Example 4: Left-Skewed Tree
const tree4 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4))),
);

// Example 5: Right-Skewed Tree
const tree5 = new TreeNode(
  1,
  null,
  new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4))),
);

// Console Logs
console.log(minimumDepth(tree1)); // 0
console.log(minimumDepth(tree2)); // 1
console.log(minimumDepth(tree3)); // 2
console.log(minimumDepth(tree4)); // 4
console.log(minimumDepth(tree5)); // 4
