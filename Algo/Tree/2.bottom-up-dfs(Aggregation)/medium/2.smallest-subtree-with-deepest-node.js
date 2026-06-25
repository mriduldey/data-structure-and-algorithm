/**
 * LC865 — Smallest Subtree with Deepest Nodes
1. Problem Description

LeetCode 865 — Smallest Subtree with all the Deepest Nodes
FAANG Frequency: High-Medium (Google, Meta, Amazon, Microsoft)

Given the root of a binary tree, return the smallest subtree that contains all the deepest nodes.

A subtree consists of a node and all of its descendants.

Common Constraints
Number of nodes: 1 <= n <= 500
Node values: 0 <= Node.val <= 500
Expected Complexity
Time: O(N)
Space: O(H)      // recursion stack

where:

N = number of nodes
H = tree height
Example
        3
      /   \
     5     1
    / \   / \
   6   2 0   8
      / \
     7   4

Deepest nodes:

7, 4

Smallest subtree containing both:

      2
     / \
    7   4

Output:

Node 2
Why?
Deepest nodes = {7,4}

LCA(7,4) = 2

Subtree rooted at 2 contains all deepest nodes.

No smaller subtree can contain both.
2. Intuition

This problem is essentially:

Find the LCA of all deepest nodes.
Key Observation

For every node:

leftDepth  = deepest depth in left subtree
rightDepth = deepest depth in right subtree

Cases:

Case 1
leftDepth > rightDepth

Deepest nodes exist only in left subtree.

Answer must come from left.

Case 2
rightDepth > leftDepth

Deepest nodes exist only in right subtree.

Answer must come from right.

Case 3
leftDepth == rightDepth

Deepest nodes appear in both sides.

Current node becomes the answer.

What should DFS return?

For every node return:

(depth, subtreeRoot)

where:

depth       = max depth below node
subtreeRoot = answer for this subtree

Single DFS solves everything.

3. Edge Cases To Ask Interviewer
1. Empty Tree?
root = null

Expected:

return null
2. Single Node Tree?
    1

Answer:

1
3. Deepest Node Only One Node?
   1
  /
 2
/
3

Answer:

3
4. Multiple Deepest Nodes Different Branches?
      1
     / \
    2   3
   /     \
  4       5

Answer:

1
5. Tree Balanced or Skewed?

Needed for recursion depth discussion.
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function subtreeWithAllDeepest(root) {
  let maxDepth = -1;
  let resultNode = null;

  function getDepth(node, currentDepth) {
    if (!node) return currentDepth - 1;

    const leftMaxDepth = getDepth(node.left, currentDepth + 1);
    const rightMaxDepth = getDepth(node.right, currentDepth + 1);

    maxDepth = Math.max(maxDepth, currentDepth);

    if (leftMaxDepth === maxDepth && rightMaxDepth === maxDepth) {
      resultNode = node;
    }

    return Math.max(leftMaxDepth, rightMaxDepth);
  }

  getDepth(root, 0);
  return resultNode;
}

const tree1 = new TreeNode(
  3,
  new TreeNode(5, new TreeNode(6), new TreeNode(2, new TreeNode(7), new TreeNode(4))),
  new TreeNode(1, new TreeNode(0), new TreeNode(8))
);

const tree2 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  new TreeNode(3, null, new TreeNode(5))
);

console.log(subtreeWithAllDeepest(tree1)); // ans: 2
console.log(subtreeWithAllDeepest(tree2)); // ans: 1
