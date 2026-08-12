/**
 * LC105 — Construct Binary Tree from Preorder and Inorder Traversal
1. Problem Description

LC105 — Construct Binary Tree from Preorder and Inorder Traversal is a high-importance tree reconstruction problem frequently used in FAANG interviews to test recursion, divide-and-conquer, hash-map optimization, and traversal properties.

Given:

preorder: nodes visited as Root → Left → Right
inorder: nodes visited as Left → Root → Right

Construct and return the unique binary tree.

Common constraints
1 <= preorder.length <= 3000
inorder.length === preorder.length
Node values are unique.
Both arrays contain the same values.
The traversals represent a valid binary tree.
Expected complexity
Time: O(n)
Space: O(n)
O(n) hash map
Up to O(n) recursion stack for a skewed tree
Example
preorder = [3, 9, 20, 15, 7]
inorder  = [9, 3, 15, 20, 7]

Output tree:

       3
      / \
     9   20
        /  \
       15   7

How:

First preorder value 3 is the root.
In inorder, values left of 3 belong to the left subtree: [9].
Values right of 3 belong to the right subtree: [15, 20, 7].
Repeat recursively for each subtree.
2. Intuition

The two traversals provide complementary information:

Preorder identifies the next root.
Inorder identifies the left/right subtree boundary.

Maintain a global preorderIndex.

For each recursive call:

Take preorder[preorderIndex] as the root.
Find its position in inorder using a hash map.
Recursively build:
Left subtree from the inorder left range.
Right subtree from the inorder right range.
Critical ordering

Build the left subtree before the right subtree because preorder visits:

Root → Left → Right
Why use a map?

Searching for every root in inorder using indexOf() makes the solution O(n²) in skewed trees.

A value-to-index map reduces each lookup to O(1).

3. Edge Cases to Ask the Interviewer
Are all node values unique?
Standard LC105 guarantees uniqueness. Without it, traversals may not uniquely identify the tree.
Can the input arrays be empty?
LeetCode constraints usually contain at least one node, but production code can support empty arrays.
Are both arrays guaranteed to have equal lengths and identical values?
Are the traversals guaranteed to represent a valid binary tree?
Can the tree be highly skewed?
A skewed tree may create O(n) recursion depth and cause stack overflow for very large inputs.
Should invalid input throw an error or return null?
LeetCode assumes valid input; interview production code may require validation.
 */

// Definition for a binary tree node
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(preorder, inorder) {
  if (preorder.length !== inorder.length || preorder.length === 0) {
    return null;
  }

  const inorderIndex = new Map();

  for (let i = 0; i < inorder.length; i++) {
    inorderIndex.set(inorder[i], i);
  }

  let preorderIndex = 0;

  function build(left, right) {
    if (left > right) return null;

    const rootVal = preorder[preorderIndex++];
    const root = new TreeNode(rootVal);

    const mid = inorderIndex.get(rootVal);

    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);

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
const pre1 = [];
const in1 = [];
console.log("Edge Case 1 (Empty Arrays):", formatTree(buildTree(pre1, in1)));
/* Output Tree:
null
*/

// Case 2: Single node tree
const pre2 = [42];
const in2 = [42];
console.log("Edge Case 2 (Single Node):", formatTree(buildTree(pre2, in2)));
/* Output Tree:
{
  "val": 42,
  "left": null,
  "right": null
}
*/

// Case 3: Left-skewed tree (Linked List to the left)
const pre3 = [3, 2, 1];
const in3 = [1, 2, 3];
console.log("Edge Case 3 (Left-Skewed):", formatTree(buildTree(pre3, in3)));
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
const pre4 = [1, 2, 3];
const in4 = [1, 2, 3];
console.log("Edge Case 4 (Right-Skewed):", formatTree(buildTree(pre4, in4)));
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
const pre5 = [1, 2];
const in5 = [1];
console.log(
  "Edge Case 5 (Mismatched Lengths):",
  formatTree(buildTree(pre5, in5)),
);
/* Output Tree:
null
*/
