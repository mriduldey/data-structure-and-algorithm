/**
 * LC107 — Binary Tree Level Order Traversal II (Bottom-Up)
1. Problem Description

Importance: ⭐⭐⭐⭐☆ (Medium Frequency FAANG Interview)

Given the root of a binary tree, return the level order traversal from bottom to top.

Unlike LC102, where levels are returned from root to leaves, here the answer starts from the deepest level and ends at the root.

Common Constraints
Number of nodes: 0 <= n <= 2000
-1000 <= Node.val <= 1000
Expected Complexity
Time: O(n)
Space: O(n)
Example
        3
      /   \
     9     20
          /  \
         15   7

Normal Level Order (LC102)

[
 [3],
 [9,20],
 [15,7]
]

Bottom-Up Output

[
 [15,7],
 [9,20],
 [3]
]

How output is formed

Level 0 -> [3]
Level 1 -> [9,20]
Level 2 -> [15,7]

Reverse levels

[
 [15,7],
 [9,20],
 [3]
]
2. Intuition

This is simply LC102 + reverse.

During BFS,

Visit one level at a time.
Store each level.
After traversal, reverse the entire answer.

Alternative approach:

Insert each level at the beginning using unshift().
However, unshift() is O(k) each time, making total complexity potentially O(n²).

Therefore:

Best FAANG solution = BFS + reverse once.

3. Edge Cases (Ask Interviewer)
Can tree be empty?
Is a single node valid?
Can values repeat?
Can tree be skewed?
Expected DFS or BFS?
Is reversing at the end acceptable?
 */

function bottomUpLevelOrder(root) {
  if (!root) return [];

  const queue = [root];
  let front = 0;
  const memoryReset = null;

  const result = [];

  while (queue.length > front) {
    const levelSize = queue.length - front;

    const nextLevel = [];

    for (let i = 1; i <= levelSize; i++) {
      const node = queue[front];
      queue[front++] = memoryReset;

      nextLevel.push(node.val);

      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }

    result.push(nextLevel);
  }

  return result.reverse();
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const exampleTree1 = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);

const exampleTree2 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  new TreeNode(3)
);

const exampleTree3 = new TreeNode(1);

const exampleTree4 = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3, new TreeNode(4), new TreeNode(5))
);

const exampleTree5 = new TreeNode(
  10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15, null, new TreeNode(20))
);

console.log('Example 1:', bottomUpLevelOrder(exampleTree1));
// Output: [ [ 15, 7 ], [ 9, 20 ], [ 3 ] ]
console.log('Example 2:', bottomUpLevelOrder(exampleTree2));
// Output: [ [ 4 ], [ 2, 3 ], [ 1 ] ]
console.log('Example 3:', bottomUpLevelOrder(exampleTree3));
// Output: [ [ 1 ] ]
console.log('Example 4:', bottomUpLevelOrder(exampleTree4));
// Output: [ [ 4, 5 ], [ 2, 3 ], [ 1 ] ]
console.log('Example 5:', bottomUpLevelOrder(exampleTree5));
// Output: [ [ 2, 7, 20 ], [ 5, 15 ], [ 10 ] ]
