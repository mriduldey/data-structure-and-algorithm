/**
 * LC543 — Diameter of Binary Tree
1. Problem Description

LC543 — Diameter of Binary Tree is a very common FAANG interview problem. It tests DFS, recursion, postorder traversal, and using global state.

Problem

Given the root of a binary tree, return the diameter of the tree.

Diameter = number of edges on the longest path between any two nodes.

The path may or may not pass through the root.

Common Constraints
Number of nodes: 0 ≤ n ≤ 10^4
Node values are irrelevant
Expected complexity:
Time: O(n)
Space: O(h) recursion stack (h = tree height)
Balanced tree → O(log n)
Skewed tree → O(n)
Example
        1
       / \
      2   3
     / \
    4   5

Longest path:

4 → 2 → 1 → 3

or

5 → 2 → 1 → 3

Contains 3 edges.

Output:

3
2. Intuition

At every node:

diameter through node =
left subtree height + right subtree height

Example:

      1
     / \
    2   3

Suppose:

left height = 2
right height = 1

Then:

diameter passing through 1 = 2 + 1 = 3

During postorder traversal:

Find left height.
Find right height.
Update global maximum diameter.
Return current node's height:
1 + max(leftHeight, rightHeight)

Thus height computation and diameter computation happen simultaneously.

3. Edge Cases (Questions to Ask Interviewer)
1. Empty tree?
root = null

Output:

0
2. Single node?
1

Diameter = 0 edges.

Output:

0
3. Is diameter measured in nodes or edges?

LC543 uses edges, not nodes.

4. Can longest path avoid root?

Yes.

Example:

        1
       /
      2
     / \
    3   4

Longest path:

3 → 2 → 4

Root isn't part of the diameter.

5. Tree can be skewed?

Yes.

Need O(n) solution.
 */

function getDiameterOfBT(root) {
  if (!root) return 0;
  let diameter = 0;
  function height(node) {
    if (!node) return 0;

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    diameter = Math.max(diameter, leftHeight + rightHeight);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);

  return diameter;
}

const tree1 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};

const tree2 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: {
        val: 4,
        left: null,
        right: null,
      },
      right: null,
    },
    right: null,
  },
  right: null,
};

const tree3 = {
  val: 1,
  left: null,
  right: null,
};

const tree4 = null;

console.log(getDiameterOfBT(tree1)); // 3
console.log(getDiameterOfBT(tree2)); // 3
console.log(getDiameterOfBT(tree3)); // 0
console.log(getDiameterOfBT(tree4)); // 0
