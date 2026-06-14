/**
 * LC872 — Leaf-Similar Trees
1. Problem Description

LC872 — Leaf-Similar Trees is an easy-level DFS/Binary Tree traversal problem. It is not among the most frequently asked FAANG tree questions, but it is a good test of tree traversal, recursion, and sequence comparison.

Problem

Given two binary trees, determine whether their leaf value sequence is the same.

A leaf node = node with no left and no right child.

Two trees are leaf-similar if the sequence of leaf values from left to right is identical.

Common Constraints
Number of nodes: 1 to 200
Node value: 0 to 200
Expected Complexity
Approach	Time	Space
DFS + Store Leaves	O(N + M)	O(L1 + L2)
DFS + Generator/Iterator	O(N + M)	O(H1 + H2)

Where:

N = nodes in Tree1
M = nodes in Tree2
L = number of leaves
H = tree height
Example
Tree1:

      3
     / \
    5   1
   / \ / \
  6  2 9  8
    / \
   7   4

Leaf Sequence:
[6,7,4,9,8]


Tree2:

      3
     / \
    5   1
   /   / \
  6   7   4

Leaf Sequence:
[6,7,4]

Output: false

Because:

[6,7,4,9,8] ≠ [6,7,4]
2. Intuition

Leaf nodes are the only nodes that matter.

Observation

If we traverse:

Left subtree
Right subtree

and record every leaf encountered, we naturally obtain the leaf sequence from left to right.

Steps:

1. Collect leaves of Tree1.
2. Collect leaves of Tree2.
3. Compare both sequences.
3. Edge Cases To Ask Interviewer
Relevant Questions
Can either root be null?
null vs null => true
null vs non-null => false
Can node values repeat?
Yes
Must compare sequence, not set.
Is tree guaranteed binary?
Usually yes.
Can there be only one node?
Single node itself is a leaf.
Important Edge Cases
root1 = [1]
root2 = [1]

Output = true
root1 = [1]
root2 = [2]

Output = false
Different structures
Same leaf sequence

Output = true
Same leaves
Different order

Output = false
 */

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function similarLeafTreesIterative(root1, root2) {
  if (!root1 && !root2) return true;
  if (root1 === null || root2 === null) return false;

  const leaves1 = [];
  const leaves2 = [];

  getLeafs(root1, leaves1);
  getLeafs(root2, leaves2);
  
  return (
    leaves1.length === leaves2.length &&
    leaves1.every((val, index) => val === leaves2[index])
  );
}

function getLeafs(root, leaves = []) {
  if (!root) return;

  const stack = [root];

  while (stack.length) {
    const node = stack.pop();
    if (!node.left && !node.right) {
      leaves.push(node.val);
    }

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
}

const example1 = new TreeNode(
  3,
  new TreeNode(
    5,
    new TreeNode(6),
    new TreeNode(2, new TreeNode(7), new TreeNode(4)),
  ),
  new TreeNode(1, new TreeNode(9), new TreeNode(8)),
);

const example2 = new TreeNode(
  3,
  new TreeNode(5, new TreeNode(6)),
  new TreeNode(1, new TreeNode(7), new TreeNode(4)),
);

const example3 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

const example4 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

const example5 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), null),
);

const example6 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, null, new TreeNode(7)),
);

console.log("Example 1:", similarLeafTreesIterative(example1, example2)); // false
console.log("Example 2:", similarLeafTreesIterative(example3, example4)); // true
console.log("Example 3:", similarLeafTreesIterative(example5, example6)); // false
console.log("Example 4:", similarLeafTreesIterative(example1, example3)); // false
