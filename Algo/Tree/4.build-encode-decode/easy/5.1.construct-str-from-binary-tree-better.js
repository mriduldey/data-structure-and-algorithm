/**
 * LC606 — Construct String from Binary Tree
1. Problem Description

LC606 — Construct String from Binary Tree is a medium-frequency FAANG tree traversal problem. It tests preorder traversal, recursive string construction, and careful handling of missing children.

Given the root of a binary tree, construct a string using:

Preorder traversal: root → left → right
Parentheses around every non-root subtree
Omit unnecessary empty parentheses
Preserve one empty pair () when a node has a right child but no left child
Common constraints
1 <= number of nodes <= 10⁴
-1000 <= Node.val <= 1000
Expected time: O(n)
Expected auxiliary space: O(h) recursion stack
Output space: O(n)

Where:

n = number of nodes
h = tree height
Example
Input tree:

        1
       / \
      2   3
     /
    4

Preorder traversal is:

1 → 2 → 4 → 3

Output:

"1(2(4))(3)"

Explanation:

Start with 1
Left subtree becomes (2(4))
Right subtree becomes (3)
Combined result: 1(2(4))(3)
Important missing-left example
    1
     \
      2

Output:

"1()(2)"

The empty () is mandatory; otherwise "1(2)" would incorrectly represent 2 as the left child.

2. Intuition

Use preorder DFS.

For every node:

Add the node value.
If a left child exists, append its representation inside parentheses.
If no left child exists but a right child exists, append ().
If a right child exists, append its representation inside parentheses.

The core rule is:

Add left parentheses when:
- left child exists, or
- right child exists

This preserves the tree structure while removing unnecessary parentheses.

3. Edge Cases to Ask the Interviewer
Can the root be null?
LeetCode guarantees a non-null root, but production code can support null.
Can node values be negative or multi-digit?
Yes; convert values using String(node.val).
Should empty parentheses be retained when only the right child exists?
Yes: node()(right).
Should trailing empty children be omitted?
Yes. A leaf is represented only by its value.
Can the tree be highly skewed?
Yes. Recursive DFS may reach O(n) call-stack depth.
Is an iterative solution required to avoid stack overflow?
Clarify when the tree can be extremely deep.
 */

function constructStrFromBtree(root) {
  if (!root) return "";

  const left =
    root.left || root.right ? `(${constructStrFromBtree(root.left)})` : "";
  const right = root.right ? `(${constructStrFromBtree(root.right)})` : "";

  return `${root.val}${left}${right}`;
}

// Binary tree node definition
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// -----------------------------------------------------------------------------
// Tree 1: Empty Tree
// -----------------------------------------------------------------------------
const tree1 = null;

// -----------------------------------------------------------------------------
// Tree 2: Single Node
//
//     42
// -----------------------------------------------------------------------------
const tree2 = new TreeNode(42);

// -----------------------------------------------------------------------------
// Tree 3: Both children, with a left grandchild
//
//         1
//        / \
//       2   3
//      /
//     4
// -----------------------------------------------------------------------------
const tree3 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  new TreeNode(3),
);

// -----------------------------------------------------------------------------
// Tree 4: Missing left child
//
//     1
//      \
//       2
// -----------------------------------------------------------------------------
const tree4 = new TreeNode(1, null, new TreeNode(2));

// -----------------------------------------------------------------------------
// Tree 5: Deep left-skewed tree
//
//       100
//       /
//     200
//     /
//   300
//   /
// 400
// -----------------------------------------------------------------------------
const tree5 = new TreeNode(
  100,
  new TreeNode(200, new TreeNode(300, new TreeNode(400))),
);

// -----------------------------------------------------------------------------
// Tree 6: Asymmetric binary tree
//
//             1
//           /   \
//          2     3
//         / \     \
//        4   5     6
//           /     /
//          7     8
// -----------------------------------------------------------------------------
const tree6 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5, new TreeNode(7))),
  new TreeNode(3, null, new TreeNode(6, new TreeNode(8))),
);

// -----------------------------------------------------------------------------
// Execution
// -----------------------------------------------------------------------------
console.log("Tree 1 (Empty):", constructStrFromBtree(tree1));
// ""

console.log("Tree 2 (Single Node):", constructStrFromBtree(tree2));
// "42"

console.log("Tree 3 (Standard):", constructStrFromBtree(tree3));
// "1(2(4))(3)"

console.log("Tree 4 (Only Right Child):", constructStrFromBtree(tree4));
// "1()(2)"

console.log("Tree 5 (Left Skewed):", constructStrFromBtree(tree5));
// "100(200(300(400)))"

console.log("Tree 6 (Asymmetric):", constructStrFromBtree(tree6));
// "1(2(4)(5(7)))(3()(6(8)))"
