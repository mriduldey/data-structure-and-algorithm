/**
 * LC700 — Search in a Binary Search Tree (BST)

Interview Frequency: Very High (Easy)
Commonly asked as a foundational BST question at FAANG and product companies. Often appears directly or as a building block for insertion, deletion, predecessor/successor, floor/ceil, range queries, etc.

1. Problem Description

Given the root of a Binary Search Tree (BST) and an integer val, find the node whose value equals val and return the subtree rooted at that node.

If the value does not exist, return null.

BST Property
Left subtree < Root
Right subtree > Root
Common Constraints
Nodes: 1 to 5000
-10^7 <= Node.val <= 10^7
Node values are unique
Expected Complexity
Approach	Time	Space
Iterative BST Search	O(H)	O(1)
Recursive BST Search	O(H)	O(H)

H = Height of tree

Balanced BST → O(log N)

Skewed BST → O(N)

Example
        4
      /   \
     2     7
    / \
   1   3

val = 2

Search path:

4 > 2 → go left
2 == 2 → found

Return:

    2
   / \
  1   3
2. Intuition

A normal Binary Tree search requires visiting almost every node.

BST gives ordering information:

Current > target → search left

Current < target → search right

Current == target → return node

At each step we discard half of the tree.

This is exactly the same idea as Binary Search on arrays.

3. Edge Cases (Ask Interviewer)
Relevant Clarifications

Can tree be empty?

root = null

Are values unique?

Standard BST → Yes

Return node or value?

LC700 returns subtree root node

Can target be absent?

Yes → return null

Is recursion acceptable?

Usually yes
 */

function searchBSTIterative(root, target) {
  if (!root) return null;

  let node = root;

  while (node !== null) {
    if (node.val === target) {
      return node;
    }

    if (target < node.val) {
      node = node.left;
    } else {
      node = node.right;
    }
  }
  return null;
}

// Helper TreeNode constructor
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  if (!root) return null;
  return {
    val: root.val,
    left: serialize(root.left),
    right: serialize(root.right),
  };
}

function runExamples() {
  const ex1 = new TreeNode(
    4,
    new TreeNode(2, new TreeNode(1), new TreeNode(3)),
    new TreeNode(7),
  );
  const ex2 = new TreeNode(5);
  const ex3 = new TreeNode(
    5,
    new TreeNode(4, new TreeNode(3, new TreeNode(2))),
  );
  const ex4 = new TreeNode(
    6,
    new TreeNode(4, new TreeNode(3), new TreeNode(5)),
    new TreeNode(8, new TreeNode(7), new TreeNode(9)),
  );
  const ex5 = new TreeNode(
    15,
    new TreeNode(10, new TreeNode(8), new TreeNode(12)),
    new TreeNode(20, new TreeNode(17), new TreeNode(25)),
  );

  const examples = [
    { tree: ex1, target: 2, expected: "subtree rooted at 2" },
    { tree: ex2, target: 5, expected: "node 5" },
    { tree: ex3, target: 3, expected: "subtree rooted at 3" },
    { tree: ex4, target: 10, expected: "null (absent)" },
    { tree: ex5, target: 12, expected: "subtree rooted at 12" },
  ];

  examples.forEach((ex, idx) => {
    const r = searchBSTIterative(ex.tree, ex.target);
    console.log(`Example ${idx + 1}: target=${ex.target} expected=${ex.expected}`);
    console.log("  iterative ->", JSON.stringify(serialize(r)));
  });
}

runExamples();
