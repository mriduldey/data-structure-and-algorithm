/**
 * LC106 — Construct Binary Tree from Inorder and Postorder Traversal
1. Problem Description

LeetCode 106 — Construct Binary Tree from Inorder and Postorder Traversal
FAANG importance: ★★★★★ | Frequency: High — classic tree-recursion/divide-and-conquer question. Tests whether you understand traversal properties, subtree boundaries, recursion, and O(n) optimization with hashing.

Given two arrays:

inorder = Left → Root → Right
postorder = Left → Right → Root

Construct and return the original binary tree.

Common constraints
1 <= n <= 3000
inorder.length === postorder.length
Node values are unique
Both traversals contain the same values.
Inputs represent a valid binary tree.
Expected complexity
Approach	Time	Extra Space
Search root in inorder each recursion	O(n²) worst-case	O(h)
HashMap + indices	O(n)	O(n)
HashMap + global postorder pointer	O(n)	O(n)

Recursion stack = O(h), worst-case O(n) for a skewed tree.

Example
inorder   = [9,3,15,20,7]
postorder = [9,15,7,20,3]

Postorder's last element is always the subtree root:

root = 3

Find 3 in inorder:

             3
inorder: [9] | [15,20,7]
          L        R

For the right subtree:

postorder = [15,7,20]
root = 20

Result:

        3
       / \
      9   20
         /  \
        15   7

Output conceptually:

[3,9,20,null,null,15,7]
2. Intuition

Two key observations:

Inorder   = Left → Root → Right
Postorder = Left → Right → Root

Therefore:

Last element of postorder = root.
Locate root inside inorder.
Everything left of root in inorder belongs to the left subtree.
Everything right belongs to the right subtree.
Recursively repeat.
Critical interview detail

If consuming postorder backwards:

Postorder forward  = Left → Right → Root
Postorder backward = Root → Right → Left

Therefore after constructing the root, you must construct the right subtree before the left subtree.

root
 ↓
right
 ↓
left

This is the most common LC106 bug.

3. Edge Cases / Questions to Ask Interviewer

Only relevant clarifications:

Are node values unique?
Important because the value → inorderIndex HashMap assumes uniqueness.
Can the tree be empty?
If yes, [] + [] → null.
Are inorder and postorder guaranteed to represent the same valid tree?
LC106 says yes; otherwise validation would be needed.
Can the tree be highly skewed?
Important because recursive stack depth may become O(n).
Do I need to preserve the input arrays?
Avoid postorder.pop() if mutation is prohibited; use an index pointer instead.
 */

// Definition for a binary tree node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(postorder, inorder) {
  if (postorder.length !== inorder.length || postorder.length === 0) {
    return null;
  }

  const inorderIndex = new Map();

  for (let i = 0; i < inorder.length; i++) {
    inorderIndex.set(inorder[i], i);
  }

  let postorderIndex = postorder.length - 1;

  function build(left, right) {
    if (left > right) return null;

    const rootVal = postorder[postorderIndex--];
    const root = new TreeNode(rootVal);

    const mid = inorderIndex.get(rootVal);

    root.right = build(mid + 1, right);
    root.left = build(left, mid - 1);

    return root;
  }

  return build(0, inorder.length - 1);
}

// Helper to format tree as JSON string for clear console visualization
const formatTree = (node) => JSON.stringify(node, null, 2);

// ==========================================
// EDGE CASES & EXECUTIONS
// ==========================================

// Case 1: Empty input arrays
const post1 = [];
const in1 = [];
console.log("Edge Case 1 (Empty Arrays):", formatTree(buildTree(post1, in1)));
/* Output Tree:
null
*/

// Case 2: Single node tree
const post2 = [42];
const in2 = [42];
console.log("Edge Case 2 (Single Node):", formatTree(buildTree(post2, in2)));
/* Output Tree:
{
  "val": 42,
  "left": null,
  "right": null
}
*/

// Case 3: Left-skewed tree (Linked List to the left)
// Postorder: Left -> Right -> Root => [1, 2, 3]
const post3 = [1, 2, 3];
const in3 = [1, 2, 3];
console.log("Edge Case 3 (Left-Skewed):", formatTree(buildTree(post3, in3)));
/* Output Tree:
{
  "val": 3,
  "left": {
    "val": 2,
    "left": {
      "val": 1,
      "left": null,
      "right": null
    },
    "right": null
  },
  "right": null
}
*/

// Case 4: Right-skewed tree (Linked List to the right)
// Postorder: Left -> Right -> Root => [3, 2, 1]
const post4 = [3, 2, 1];
const in4 = [1, 2, 3];
console.log("Edge Case 4 (Right-Skewed):", formatTree(buildTree(post4, in4)));
/* Output Tree:
{
  "val": 1,
  "left": null,
  "right": {
    "val": 2,
    "left": null,
    "right": {
      "val": 3,
      "left": null,
      "right": null
    }
  }
}
*/

// Case 5: Mismatched array lengths / Invalid input
const post5 = [1, 2];
const in5 = [1];
console.log(
  "Edge Case 5 (Mismatched Lengths):",
  formatTree(buildTree(post5, in5))
);
/* Output Tree:
null
*/
