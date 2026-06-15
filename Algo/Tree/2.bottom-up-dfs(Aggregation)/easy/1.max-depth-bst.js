/**
 * LC104 — Maximum Depth of Binary Tree

Importance: ⭐⭐⭐⭐⭐ Extremely common and one of the first tree problems asked in FAANG interviews.

1. Problem Description

Given the root of a binary tree, return its maximum depth (height).

Depth = number of nodes along the longest path from root to leaf.
Empty tree depth = 0.
Common Constraints
Number of nodes: 0 ≤ n ≤ 10^4
-100 ≤ Node.val ≤ 100
Expected Complexity
Approach	Time	Space
DFS Recursive	O(n)	O(h)
DFS Iterative	O(n)	O(h)
BFS Level Order	O(n)	O(w)

h = tree height, w = maximum width

Example
        3
       / \
      9   20
         /  \
        15   7

Longest path:

3 → 20 → 15

(or 3 → 20 → 7)

Number of nodes = 3

Output:

3
2. Intuition

For every node:

depth(node)
=
1 + max(depth(left), depth(right))

Base case:

null → 0

Therefore:

Find depth of left subtree.
Find depth of right subtree.
Take the larger one.
Add current node.

This is a classic Postorder DFS problem.

3. Edge Cases (Questions to Ask Interviewer)
1. Can tree be empty?
[]
Output: 0
2. Can there be only one node?
[1]

Output: 1
3. Is depth measured by nodes or edges?

LeetCode uses nodes.

4. Maximum number of nodes?

Useful for deciding recursive vs iterative solution (stack overflow concerns).
 */

function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const example1 = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(8, new TreeNode(13), new TreeNode(4)),
);

const example2 = new TreeNode(1, new TreeNode(2), null);

const example3 = new TreeNode(5);

console.log("Example 1:", maxDepth(example1));
console.log("Example 2:", maxDepth(example2));
console.log("Example 3:", maxDepth(example3));
