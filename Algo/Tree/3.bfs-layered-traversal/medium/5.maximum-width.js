/**
 * LC662 — Maximum Width of Binary Tree
1. Problem description

FAANG importance: High | Direct frequency: Moderate | Pattern value: Very high

This is an important binary-tree problem because it tests:

Level-order traversal.
Complete-binary-tree positional indexing.
Correct handling of missing nodes.
Integer overflow and JavaScript precision.
BFS versus DFS trade-offs.

Given a binary tree, return the maximum width among all levels. Width is not simply the number of nodes at that level. It includes null positions between the leftmost and rightmost non-null nodes, as if the tree were embedded in a complete binary tree. LeetCode classifies it as Medium with Tree, BFS, DFS, and Binary Tree topics.

Common constraints
1 <= number of nodes <= 3000
-100 <= Node.val <= 100
Answer fits in a signed 32-bit integer.
Expected complexity
Time: O(n)
Space: O(w) using BFS, where w is the maximum number of real nodes stored at one level.
DFS alternative: O(n) time and O(h) space.
Example
Input: [1,3,2,5,3,null,9]

              1
            /   \
           3     2
          / \     \
         5   3     9

Complete-tree positions:

Level 0: 1                     width = 1
Level 1: 3, 2                  width = 2
Level 2: 5, 3, null, 9         width = 4

At level 2:

leftmost index  = 0
rightmost index = 3

width = 3 - 0 + 1 = 4

Therefore:

Output: 4

The missing position between 3 and 9 is included.

2. Intuition

Assign every node the index it would have in a complete binary tree.

Using zero-based indexes:

node index = i

left child  = 2 * i
right child = 2 * i + 1

For each level:

width = rightmostIndex - leftmostIndex + 1

The index difference automatically includes missing nodes.

Critical overflow protection

Indexes can grow exponentially with tree depth even when very few nodes exist.

Therefore:

Subtract the first index of every level from all indexes in that level.
Use BigInt in JavaScript for complete numerical safety.

Example:

Original indexes:   100000, 100003
Normalized indexes:      0,      3

The width remains:

3 - 0 + 1 = 4
3. Relevant edge cases to ask the interviewer
Does width include null positions between nodes?
Yes; otherwise the problem becomes maximum node count at a level.
Can the root be null?
Official constraints provide at least one node, but production code should safely return 0.
Can the tree be extremely deep?
This determines whether positional indexes require normalization or arbitrary-precision integers.
Is the answer guaranteed to fit in a normal integer?
The official problem guarantees a signed 32-bit result.
Should I return only the width or also the level/end nodes?
Useful because returning the level is a common follow-up.
Are recursion-depth limitations relevant?
If yes, prefer iterative BFS over recursive DFS.

Important test cases:

null                          => 0
[1]                           => 1
[1,2]                         => 1
[1,2,3]                       => 2
[1,2,3,4,null,null,7]         => 4
Deep left-skewed tree         => 1
Deep sparse left/right tree   => potentially very large width
 */

function maxWidth(root) {
  if (!root) return 0;

  let maxWidth = 0;

  let currentLevel = [[root, 0]];

  while (currentLevel.length > 0) {
    const firstIndex = currentLevel[0][1];
    const lastIndex = currentLevel[currentLevel.length - 1][1];

    const nextLevel = [];

    for (let i = 0; i < currentLevel.length; i++) {
      const [node, index] = currentLevel[i];

      // Normalize relative to level start to prevent large numbers
      const normalizedIndex = index - firstIndex;

      node.left && nextLevel.push([node.left, 2 * normalizedIndex + 1]);
      node.right && nextLevel.push([node.right, 2 * normalizedIndex + 2]);
    }

    maxWidth = Math.max(maxWidth, lastIndex - firstIndex + 1);

    currentLevel = nextLevel;
  }

  return maxWidth;
}

// TreeNode Definition
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// Example 1: Full Binary Tree (Width = 4)
//       1
//     /   \
//    2     3
//   / \   / \
//  4   5 6   7
const tree1 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, new TreeNode(6), new TreeNode(7)),
);

// Example 2: Skewed Tree with Missing Middle Nodes (Width = 4)
//       1
//      / \
//     3   2
//    /     \
//   5       9
const tree2 = new TreeNode(
  1,
  new TreeNode(3, new TreeNode(5)),
  new TreeNode(2, null, new TreeNode(9)),
);

// Example 3: Left-Skewed Deep Tree (Width = 1)
//     1
//    /
//   2
//  /
// 3
const tree3 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

// Example 4: Asymmetric Tree with Gap (Width = 2)
//     1
//    / \
//   3   2
//  /
// 5
const tree4 = new TreeNode(
  1,
  new TreeNode(3, new TreeNode(5)),
  new TreeNode(2),
);

// Example 5: Single Node Tree (Width = 1)
// 1
const tree5 = new TreeNode(1);

// Console Logs
console.log("Tree 1 Max Width:", maxWidth(tree1)); // Expected: 4
console.log("Tree 2 Max Width:", maxWidth(tree2)); // Expected: 4
console.log("Tree 3 Max Width:", maxWidth(tree3)); // Expected: 1
console.log("Tree 4 Max Width:", maxWidth(tree4)); // Expected: 2
console.log("Tree 5 Max Width:", maxWidth(tree5)); // Expected: 1
