/**
 * LC226 — Invert Binary Tree
1. Problem description

Invert Binary Tree is a fundamental and frequently asked FAANG-style tree problem. It is often used as a warm-up to test recursion, traversal, mutation, and tree reasoning. Exact company frequency varies, but the underlying mirror-tree pattern is highly important.

Given the root of a binary tree, swap every node’s left and right subtrees and return the root.

Common constraints

Number of nodes: 0–100
Node values may be negative or duplicated.
Input is a valid binary tree.

Expected complexity

Time: O(n) — every node is processed once.
Recursive space: O(h) — recursion stack, where h is tree height.
Balanced tree: O(log n)
Skewed tree: O(n)
Iterative BFS space: O(w) — maximum tree width.
Example
Input:  [4,2,7,1,3,6,9]

        4
      /   \
     2     7
    / \   / \
   1   3 6   9

Output: [4,7,2,9,6,3,1]

        4
      /   \
     7     2
    / \   / \
   9   6 3   1

At every node:

left subtree ↔ right subtree
2. Intuition

A binary tree is inverted when every node becomes the mirror image of itself.

For each node:

Swap node.left and node.right.
Invert the new left subtree.
Invert the new right subtree.

The order may also be:

Recursively invert both subtrees.
Swap them.

Both approaches are correct because every node is eventually processed exactly once.

3. Relevant edge cases to ask the interviewer
Should the original tree be mutated, or should I create a new tree?
LeetCode expects in-place mutation, but returning a new tree may be a follow-up.
Can the root be null?
Return null.
Can the tree be highly skewed or very large?
If yes, prefer iterative traversal to avoid recursion-stack overflow.
Should the function return the root after inversion?
Usually yes.

Duplicate or negative values do not affect the algorithm because inversion depends only on structure.
 */

function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];

  return root;
}

// 1. Definition for a Binary Tree Node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// -------------------------------------------------------------
// 2. Create Example Trees
// -------------------------------------------------------------

// Tree 1: Standard Balanced Tree (4 -> [2, 7])
const tree1 = new TreeNode(
  4,
  new TreeNode(2, new TreeNode(1), new TreeNode(3)),
  new TreeNode(7, new TreeNode(6), new TreeNode(9))
);

// Tree 2: Single Node / Root Only
const tree2 = new TreeNode(10);

// Tree 3: Left-Skewed Tree (1 -> 2 -> 3)
const tree3 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

// Tree 4: Asymmetric Unbalanced Tree
const tree4 = new TreeNode(
  1,
  new TreeNode(2, null, new TreeNode(4)),
  new TreeNode(3, new TreeNode(5))
);

// Tree 5: Empty Tree (null)
const tree5 = null;

// -------------------------------------------------------------
// 3. Console Logs with Expected Outputs
// -------------------------------------------------------------

// --- TREE 1 ---
console.log("--- TREE 1 ---");
console.log("Expected Output:", JSON.stringify({
  val: 4,
  left: { val: 7, left: { val: 9, left: null, right: null }, right: { val: 6, left: null, right: null } },
  right: { val: 2, left: { val: 3, left: null, right: null }, right: { val: 1, left: null, right: null } }
}, null, 2));
console.log("Actual Output:  ", JSON.stringify(invertTree(tree1), null, 2));


// --- TREE 2 ---
console.log("\n--- TREE 2 ---");
console.log("Expected Output:", JSON.stringify({ val: 10, left: null, right: null }, null, 2));
console.log("Actual Output:  ", JSON.stringify(invertTree(tree2), null, 2));


// --- TREE 3 ---
console.log("\n--- TREE 3 ---");
console.log("Expected Output:", JSON.stringify({
  val: 1,
  left: null,
  right: { val: 2, left: null, right: { val: 3, left: null, right: null } }
}, null, 2));
console.log("Actual Output:  ", JSON.stringify(invertTree(tree3), null, 2));


// --- TREE 4 ---
console.log("\n--- TREE 4 ---");
console.log("Expected Output:", JSON.stringify({
  val: 1,
  left: { val: 3, left: null, right: { val: 5, left: null, right: null } },
  right: { val: 2, left: { val: 4, left: null, right: null }, right: null }
}, null, 2));
console.log("Actual Output:  ", JSON.stringify(invertTree(tree4), null, 2));


// --- TREE 5 ---
console.log("\n--- TREE 5 ---");
console.log("Expected Output:", null);
console.log("Actual Output:  ", JSON.stringify(invertTree(tree5), null, 2));