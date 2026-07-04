/**
 * 1. Problem Description

LC637 — Average of Levels in Binary Tree is an easy but very common FAANG-style BFS tree problem. It tests whether you can process a binary tree level by level, which is a core pattern used in many tree interview questions.

Given the root of a binary tree, return an array where each element is the average value of all nodes at that level.

Common constraints

Number of nodes: 0 to 10^4
Node value: -2^31 to 2^31 - 1
Answer accepted with small floating-point error

Expected complexity

Time: O(n)     // visit every node once
Space: O(w)    // queue stores max width of tree

Where:

n = total nodes
w = maximum number of nodes at any level

Example

Input:
        3
       / \
      9   20
          / \
         15  7

Output: [3, 14.5, 11]

How output comes

Level 0: [3]        average = 3 / 1 = 3
Level 1: [9,20]     average = 29 / 2 = 14.5
Level 2: [15,7]     average = 22 / 2 = 11
2. Intuition

Use BFS level-order traversal.

For every level:

Take current queue size.
Process exactly that many nodes.
Add their values to sum.
Push their children for the next level.
Store sum / levelSize.

This works because BFS naturally processes nodes level by level.

3. Edge Cases to Ask Interviewer

Ask only relevant ones:

1. Can root be null?
   -> Yes, return [].

2. Can node values be negative?
   -> Yes, average should handle negative sums.

3. Can node values be very large?
   -> In JS, Number is safe for this constraint, but mention possible overflow in Java/C++.

4. Should result be floating-point?
   -> Yes, return decimal averages.

5. Is the tree guaranteed to be a valid binary tree?
   -> Usually yes.
 */

function avgOfLevels(root) {
  if (!root) return [];

  const queue = [root];
  let front = 0;

  const memoryResetVal = null;

  const result = [];

  while (queue.length > front) {
    const levelSize = queue.length - front;

    let sum = 0;

    for (let i = 1; i <= levelSize; i++) {
      const node = queue[front];
      queue[front++] = memoryResetVal;

      sum += node.val;

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    result.push(sum / levelSize);
  }

  return result;
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Example 1: Balanced Tree (from problem description)
const exampleTree1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

// Example 2: Left-Skewed Tree
const exampleTree2 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  null
);

// Example 3: Single Node
const exampleTree3 = new TreeNode(1);

// Example 4: Mixed Tree
const exampleTree4 = new TreeNode(
  10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15, null, new TreeNode(20))
);

console.log('Example 1:', avgOfLevels(exampleTree1));
// Output: [3, 14.5, 11]
console.log('Example 2:', avgOfLevels(exampleTree2));
// Output: [1, 2, 4]
console.log('Example 3:', avgOfLevels(exampleTree3));
// Output: [1]
console.log('Example 4:', avgOfLevels(exampleTree4));
// Output: [10, 10, 9.666666666666666]
