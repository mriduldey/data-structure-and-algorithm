/**
 * LC103 — Binary Tree Zigzag Level Order Traversal
1. Problem Description

LC103 — Binary Tree Zigzag Level Order Traversal is a medium-frequency, high-value FAANG tree problem. It tests BFS level processing, queue handling, direction control, and avoiding inefficient array operations.

Given a binary tree, return its node values level by level, alternating direction:

Level 0: left → right
Level 1: right → left
Level 2: left → right
Continue alternating
Common Constraints
0 <= number of nodes <= 2000
-100 <= Node.val <= 100
Node values may be duplicated or negative.
Expected Complexity
Time: O(n)
Auxiliary space: O(w), where w is the maximum tree width.
Returned output: O(n)
Example
Tree:

        3
       / \
      9   20
         /  \
        15   7

Output: [[3], [20, 9], [15, 7]]

Explanation:

Level 0: [3]       left → right
Level 1: [20, 9]   right → left
Level 2: [15, 7]   left → right
2. Intuition

Use BFS because the result is organized by levels.

For every level:

Record the current queue size.
Process exactly that many nodes.
Create a fixed-size level array.
Place each value at:
index i for left-to-right traversal
index levelSize - 1 - i for right-to-left traversal
Toggle the direction.

Using calculated indexes is preferable to unshift() because repeated unshift() operations can make a level take O(k²) time.

3. Relevant Questions to Ask the Interviewer
Should an empty tree return []?
Should the first level always be traversed left to right?
Should the result contain separate arrays for each level?
Can node values be duplicated or negative?
Are there constraints large enough that recursion depth should be avoided?
Can I modify the tree, or must it remain unchanged?
Is the expected solution O(n) time?

Most LeetCode assumptions are:

Empty tree → []
First level → left to right
Tree must not be modified
Duplicate and negative values are allowed
 */

function zigzagTraversal(root) {
  if (!root) return [];

  const result = [];

  const queue = [root];
  let head = 0;
  let leftToRight = true;

  const memoryReset = null;

  while (head < queue.length) {
    const levelSize = queue.length - head;
    const levelNodes = [];

    for (let i = 1; i <= levelSize; i++) {
      const node = queue[head];
      queue[head++] = memoryReset; // memory optimization; Not related to function

      const index = leftToRight ? i - 1 : levelSize - i;

      levelNodes[index] = node.val;

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    result.push(levelNodes);
    leftToRight = !leftToRight;
  }

  return result;
}

// 1. TreeNode Class Definition
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// ==========================================
// 3. Constructing 5 Example Trees
// ==========================================

// --- Tree 1: Standard Balanced Tree (LC Example) ---
//       3
//      / \
//     9  20
//       /  \
//      15   7
const tree1 = new TreeNode(3);
tree1.left = new TreeNode(9);
tree1.right = new TreeNode(20);
tree1.right.left = new TreeNode(15);
tree1.right.right = new TreeNode(7);

// --- Tree 2: Empty Tree (Edge Case) ---
const tree2 = null;

// --- Tree 3: Single Root Node (Edge Case) ---
const tree3 = new TreeNode(1);

// --- Tree 4: Strictly Left-Skewed Tree (Line) ---
//     1
//    /
//   2
//  /
// 3
const tree4 = new TreeNode(1);
tree4.left = new TreeNode(2);
tree4.left.left = new TreeNode(3);

// --- Tree 5: Full 3-Level Perfect Tree ---
//         1
//       /   \
//      2     3
//     / \   / \
//    4   5 6   7
const tree5 = new TreeNode(1);
tree5.left = new TreeNode(2);
tree5.right = new TreeNode(3);
tree5.left.left = new TreeNode(4);
tree5.left.right = new TreeNode(5);
tree5.right.left = new TreeNode(6);
tree5.right.right = new TreeNode(7);

// ==========================================
// 4. Execution and Console Verification
// ==========================================

console.log("--- TEST CASE 1: Standard Balanced Tree ---");
console.log("Expected: [[3], [20, 9], [15, 7]]");
console.log("Actual:  ", JSON.stringify(zigzagTraversal(tree1)));
console.log("\n");

console.log("--- TEST CASE 2: Empty Tree ---");
console.log("Expected: []");
console.log("Actual:  ", JSON.stringify(zigzagTraversal(tree2)));
console.log("\n");

console.log("--- TEST CASE 3: Single Root Node ---");
console.log("Expected: [[1]]");
console.log("Actual:  ", JSON.stringify(zigzagTraversal(tree3)));
console.log("\n");

console.log("--- TEST CASE 4: Left-Skewed Tree ---");
console.log("Expected: [[1], [2], [3]]");
console.log("Actual:  ", JSON.stringify(zigzagTraversal(tree4)));
console.log("\n");

console.log("--- TEST CASE 5: Full 3-Level Perfect Tree ---");
console.log("Expected: [[1], [3, 2], [4, 5, 6, 7]]");
console.log("Actual:  ", JSON.stringify(zigzagTraversal(tree5)));
