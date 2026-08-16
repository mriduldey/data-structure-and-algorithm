/**
 * 1. LC889 — Construct Binary Tree from Preorder and Postorder Traversal

FAANG importance: High-medium. Frequency: Moderate. Less common than LC105/LC106, but very useful because it tests whether you understand traversal boundaries rather than just memorizing construction.

Given:

preorder: root → left → right
postorder: left → right → root

Construct any binary tree matching both traversals.

Important interview point

Unlike preorder + inorder or inorder + postorder, preorder + postorder does not always uniquely determine a general binary tree.

Example:

preorder  = [1,2]
postorder = [2,1]

Both are valid:

    1          1
   /            \
  2              2

LeetCode accepts any valid tree.

Common constraints
1 <= n <= 30
preorder.length === postorder.length
All values are unique.
preorder and postorder contain the same values.

Expected:

Time:  O(n)
Space: O(n)

O(n) auxiliary space comes from the postorder index map + recursion/tree height.

Example
preorder  = [1,2,4,5,3,6,7]
postorder = [4,5,2,6,7,3,1]

Tree:

        1
      /   \
     2     3
    / \   / \
   4   5 6   7

Why?

preorder:
1 | 2 4 5 | 3 6 7
    left     right


postorder:
4 5 2 | 6 7 3 | 1
 left    right   root

The key observation is that after the root, preorder[preStart + 1] must be the root of the left subtree. Find that value in postorder to determine the left subtree size.

2. Intuition

For a subtree:

preorder:
[root, LEFT..., RIGHT...]


postorder:
[LEFT..., RIGHT..., root]

Suppose:

root = preorder[preStart];
leftRoot = preorder[preStart + 1];

Find leftRoot inside postorder.

If:

postorder[leftRootIndex] = leftRoot

then:

left subtree size =
leftRootIndex - postStart + 1

Therefore:

Left:
preorder:
preStart + 1
→ preStart + leftSize


postorder:
postStart
→ leftRootIndex


Right:
preorder:
preStart + leftSize + 1
→ preEnd


postorder:
leftRootIndex + 1
→ postEnd - 1
Mental model
preorder gives:
WHO starts the subtree


postorder gives:
WHERE that subtree ends

Use preorder to identify the next child root and postorder to calculate its subtree boundary.

3. Edge Cases / Questions to Ask Interviewer

Only relevant questions:

Are node values unique?
Required for the simple value → postorder-index map.
Should I return any valid tree when multiple trees are possible?
LC889 says yes.
Can the tree contain nodes with only one child?
Important because this causes reconstruction ambiguity.
Can the input be empty?
LeetCode constraints say no, but production code can handle it.
Are both traversals guaranteed to describe the same valid tree?
Usually yes.

Most important thing to mention:

Preorder + postorder cannot uniquely reconstruct an arbitrary binary tree unless additional restrictions, such as the tree being full, are given.
 */

function buildFromPrePost(preorder, postorder) {
  const postIndexMap = new Map(postorder.map((val, i) => [val, i]));

  function build(preS, preE, postS, postE) {
    if (preS > preE) return null;

    const root = new TreeNode(preorder[preS]);

    if (preS === preE) return root;

    const leftRoot = preorder[preS + 1];
    const leftEnd = postIndexMap.get(leftRoot);
    const leftSize = leftEnd - postS + 1;

    root.left = build(preS + 1, preS + leftSize, postS, leftEnd);
    root.right = build(preS + leftSize + 1, preE, leftEnd + 1, postE - 1);

    return root;
  }

  return build(0, preorder.length - 1, 0, postorder.length - 1);
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// ==========================================
// EXAMPLE 1: Single Node Tree (Base Case)
// Structure:
//   1
// Expected JSON Output:
// { "val": 1, "left": null, "right": null }
// ==========================================
console.log("--- Example 1: Single Node Tree ---");
const pre1 = [1];
const post1 = [1];
console.log(JSON.stringify(buildFromPrePost(pre1, post1), null, 2));

// ==========================================
// EXAMPLE 2: Left-Skewed Tree (Chain)
// Structure:
//     1
//    /
//   2
//  /
// 3
// Expected JSON Output:
// {
//   "val": 1,
//   "left": {
//     "val": 2,
//     "left": { "val": 3, "left": null, "right": null },
//     "right": null
//   },
//   "right": null
// }
// ==========================================
console.log("--- Example 2: Left-Skewed Tree ---");
const pre2 = [1, 2, 3];
const post2 = [3, 2, 1];
console.log(JSON.stringify(buildFromPrePost(pre2, post2), null, 2));

// ==========================================
// EXAMPLE 3: Right-Skewed / Ambiguous Tree
// Note: Single right children default to left subtree in pre+post recovery.
// Structure generated:
//     1
//    /
//   2
//  /
// 3
// Expected JSON Output:
// {
//   "val": 1,
//   "left": {
//     "val": 2,
//     "left": { "val": 3, "left": null, "right": null },
//     "right": null
//   },
//   "right": null
// }
// ==========================================
console.log("--- Example 3: Right-Skewed Tree ---");
const pre3 = [1, 2, 3];
const post3 = [3, 2, 1];
console.log(JSON.stringify(buildFromPrePost(pre3, post3), null, 2));

// ==========================================
// EXAMPLE 4: Complete Perfect Binary Tree
// Structure:
//      1
//    /   \
//   2     3
//  / \   / \
// 4   5 6   7
// Expected JSON Output:
// {
//   "val": 1,
//   "left": {
//     "val": 2,
//     "left": { "val": 4, "left": null, "right": null },
//     "right": { "val": 5, "left": null, "right": null }
//   },
//   "right": {
//     "val": 3,
//     "left": { "val": 6, "left": null, "right": null },
//     "right": { "val": 7, "left": null, "right": null }
//   }
// }
// ==========================================
console.log("--- Example 4: Perfect Full Binary Tree ---");
const pre4 = [1, 2, 4, 5, 3, 6, 7];
const post4 = [4, 5, 2, 6, 7, 3, 1];
console.log(JSON.stringify(buildFromPrePost(pre4, post4), null, 2));

// ==========================================
// EXAMPLE 5: Unbalanced Asymmetric Tree
// Structure:
//        1
//       / \
//      2   3
//     /     \
//    4       5
//   /
//  6
// Expected JSON Output:
// {
//   "val": 1,
//   "left": {
//     "val": 2,
//     "left": {
//       "val": 4,
//       "left": { "val": 6, "left": null, "right": null },
//       "right": null
//     },
//     "right": null
//   },
//   "right": {
//     "val": 3,
//     "left": { "val": 5, "left": null, "right": null },
//     "right": null
//   }
// }
// ==========================================
console.log("--- Example 5: Unbalanced Asymmetric Tree ---");
const pre5 = [1, 2, 4, 6, 3, 5];
const post5 = [6, 4, 2, 5, 3, 1];
console.log(JSON.stringify(buildFromPrePost(pre5, post5), null, 2));

// ==========================================
// EXAMPLE 6: Alternating Zig-Zag Tree
// Structure generated:
//       1
//      /
//     2
//    /
//   3
//  /
// 4
// Expected JSON Output:
// {
//   "val": 1,
//   "left": {
//     "val": 2,
//     "left": {
//       "val": 3,
//       "left": { "val": 4, "left": null, "right": null },
//       "right": null
//     },
//     "right": null
//   },
//   "right": null
// }
// ==========================================
console.log("--- Example 6: Alternating Zig-Zag Tree ---");
const pre6 = [1, 2, 3, 4];
const post6 = [4, 3, 2, 1];
console.log(JSON.stringify(buildFromPrePost(pre6, post6), null, 2));