/**
 * LC199 — Binary Tree Right Side View
1. Problem Description

LC199 — Binary Tree Right Side View is a high-value, frequently asked FAANG tree problem. It tests level-order traversal, DFS traversal order, depth tracking, and the ability to identify one representative node per level.

Given the root of a binary tree, imagine standing on its right side. Return the values of the nodes visible from top to bottom.

Common constraints
0 <= number of nodes <= 100
-100 <= Node.val <= 100
Values may be duplicated.
The tree may be skewed.
Expected complexity
Time: O(n) — every node is visited once.
Space:
BFS: O(w), where w is maximum tree width.
DFS: O(h), where h is tree height.
Example
Input:
        1
       / \
      2   3
       \   \
        5   4

Output: [1, 3, 4]

Explanation:

Level 0: 1 is visible.
Level 1: 3 is the rightmost node.
Level 2: 4 is the rightmost node.

The answer is not simply the right-child chain. If a right child is missing, a node from the left subtree may still be visible.

2. Intuition

Perform level-order traversal using BFS.

For each level:

Record the number of nodes currently in the queue.
Process exactly those nodes.
The last node processed at that level is the rightmost visible node.
Level 0: [1]       → take 1
Level 1: [2, 3]    → take 3
Level 2: [5, 4]    → take 4

A DFS solution is also possible:

Traverse right before left.
The first node reached at each depth is the visible node for that level.
3. Relevant Questions to Ask the Interviewer
Should an empty tree return an empty array?
Normally, yes: [].
Should the result contain node values or node references?
LeetCode expects values.
Can node values be duplicated?
Yes; visibility depends on position, not uniqueness.
Can the tree be extremely deep?
This determines whether iterative BFS is safer than recursive DFS.
Is this the standard right-side projection, where a left-subtree node may be visible when no node blocks it from the right?
Normally, yes.
 */

function rightSideView(root) {
  if (!root) return [];

  const result = [];

  const queue = [root];
  let head = 0;

  const memoryReset = null;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    for (let i = 1; i <= levelSize; i++) {
      const node = queue[head];
      queue[head++] = memoryReset;

      if (i === levelSize) {
        result.push(node.val);
      }

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
  }

  return result;
}

// 1. Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 3. Creating 5 Example Trees

// Example 1: Standard Balanced Tree
//       1
//      / \
//     2   3
//    / \   \
//   4   5   6
const tree1 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6)),
);

// Example 2: Left-Skewed Deep Tree (Right side sees the left nodes at deeper levels)
//     1
//    /
//   2
//  /
// 3
const tree2 = new TreeNode(1, new TreeNode(2, new TreeNode(3)));

// Example 3: Right-Skewed Tree
//   1
//    \
//     2
//      \
//       3
const tree3 = new TreeNode(1, null, new TreeNode(2, null, new TreeNode(3)));

// Example 4: Empty Tree
const tree4 = null;

// Example 5: Overhanging Left Branch
//        1
//       / \
//      2   3
//     /
//    4
//   /
//  5
const tree5 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4, new TreeNode(5))),
  new TreeNode(3),
);

// 4. Console Logs (Output vs Expected)

console.log("--- Test Case 1: Standard Balanced ---");
console.log("Expected:", [1, 3, 6]);
console.log("Output:  ", rightSideView(tree1));

console.log("\n--- Test Case 2: Left-Skewed Deep ---");
console.log("Expected:", [1, 2, 3]);
console.log("Output:  ", rightSideView(tree2));

console.log("\n--- Test Case 3: Right-Skewed ---");
console.log("Expected:", [1, 2, 3]);
console.log("Output:  ", rightSideView(tree3));

console.log("\n--- Test Case 4: Empty Tree ---");
console.log("Expected:", []);
console.log("Output:  ", rightSideView(tree4));

console.log("\n--- Test Case 5: Overhanging Left Branch ---");
console.log("Expected:", [1, 3, 4, 5]);
console.log("Output:  ", rightSideView(tree5));
