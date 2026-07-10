/**
 * LC515 — Find Largest Value in Each Tree Row
1. Problem Description

LC515 — Find Largest Value in Each Tree Row is a medium-frequency FAANG tree problem. It tests level-order traversal, queue management, negative-value handling, and per-level aggregation.

Given the root of a binary tree, return an array containing the maximum node value at every depth/row.

Common constraints

Nodes: 0 to approximately 10⁴
Node values may be negative and usually fit within a 32-bit signed integer
Empty tree should return []

Expected complexity

Time: O(n) — every node is processed once
Space: O(w) for BFS, where w is the maximum tree width
DFS alternative: O(h) recursion stack, excluding output
Example
          1
        /   \
       3     2
      / \     \
     5   3     9
Output: [1, 3, 9]

Explanation:

Row 0: [1]       → maximum = 1
Row 1: [3, 2]    → maximum = 3
Row 2: [5, 3, 9] → maximum = 9
2. Intuition

The problem asks for one answer per tree level, so BFS is the most natural solution.

For every level:

Record the current queue size.
Process exactly that many nodes.
Track the maximum value seen.
Add children to the queue for the next level.
Store the level maximum.

Initialize the maximum with -Infinity, not 0, because every node in a row may be negative.

3. Relevant Questions to Ask the Interviewer
Can the tree be empty?
Can node values be negative?
Do node values fit within JavaScript’s safe integer range?
Is a recursive DFS solution acceptable, or is iterative traversal preferred?
Is modifying the input tree prohibited?
 */

function getLevelMax(root) {
  if (!root) return [];

  const queue = [root];
  let head = 0;

  const result = [];

  const memoryReset = null;

  while (head < queue.length) {
    const levelSize = queue.length - head;

    let max = -Infinity;

    for (let i = 1; i <= levelSize; i++) {
      const node = queue[head];
      queue[head++] = memoryReset;

      max = Math.max(max, node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    result.push(max);
  }

  return result;
}

// TreeNode Definition
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Example 1: Empty Tree
const tree1 = null;

// Example 2: Single Node
const tree2 = new TreeNode(1);

// Example 3: Balanced Tree (from problem description)
const tree3 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7)),
);

// Example 4: Left-Skewed Tree
const tree4 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3, new TreeNode(4))),
);

// Example 5: Right-Skewed Tree
const tree5 = new TreeNode(
  1,
  null,
  new TreeNode(2, null, new TreeNode(3, null, new TreeNode(4))),
);

// Console Logs
console.log(getLevelMax(tree1)); // 0
console.log(getLevelMax(tree2)); // 1
console.log(getLevelMax(tree3)); // 2
console.log(getLevelMax(tree4)); // 4
console.log(getLevelMax(tree5)); // 4
