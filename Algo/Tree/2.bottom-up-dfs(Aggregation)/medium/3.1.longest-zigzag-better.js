/**
 * LC1372 — Longest ZigZag Path in a Binary Tree

FAANG Importance: ⭐⭐⭐⭐☆ (Medium-High)

Frequently asked because it tests Tree DFS + State Passing + Dynamic Programming on Trees. Common at Google, Meta, Amazon, Microsoft and similar companies.

1. Problem Description

Given a binary tree, find the length of the longest ZigZag path.

A ZigZag path means:

choose any node as starting point
first move can be either left or right
every next move must alternate direction
path length = number of edges, NOT nodes
Common Constraints
1 <= Number of Nodes <= 5 * 10^4

-1000 <= Node.val <= 1000

Expected Complexity

Time : O(n)
Space: O(h)

h = tree height
Worst case = O(n)
Balanced tree = O(log n)

Example

        1
       /
      2
       \
        3
       /
      4
       \
        5

Longest path

1
↓ Left
2
↓ Right
3
↓ Left
4
↓ Right
5

Directions

L → R → L → R

Edges

1→2
2→3
3→4
4→5

Answer = 4
2. Intuition

At every node we need two different states.

Longest ZigZag if previous move was LEFT

Longest ZigZag if previous move was RIGHT

Suppose we're at node.

If we go

LEFT

next move must be

RIGHT

If we continue in same direction

LEFT
LEFT

ZigZag breaks.

Therefore each recursive call needs

current node
last direction
current length

Whenever direction alternates

length + 1

Otherwise

restart from 1

Maintain a global maximum.

3. Edge Cases (Ask Interviewer)
Is answer measured in edges or nodes? (Edges)
Can tree be empty?
Single node?
Completely skewed tree?
Can ZigZag start from any node? (Yes)
Duplicate values? (Doesn't matter)
Recursive solution acceptable?
 */

function longestZigzag(root) {
  let maxLen = 0;

  function dfs(node) {
    if (!node) return [-1, -1];

    const [leftL, leftR] = dfs(node.left);
    const [rightL, rightR] = dfs(node.right);

    const goLeft = leftR + 1;
    const goRight = rightL + 1;

    maxLen = Math.max(maxLen, goLeft, goRight);

    return [goLeft, goRight];
  }

  dfs(root);

  return maxLen;
}

/**
 * @typedef {Object} TreeNode
 * @property {number} val
 * @property {TreeNode|null} left
 * @property {TreeNode|null} right
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const exampleRoot = new TreeNode(
  1,
  new TreeNode(
    2,
    null,
    new TreeNode(3, new TreeNode(4, null, new TreeNode(5))),
  ),
);

// Example returning 3
const exampleZ3 = new TreeNode(
  1,
  null,
  new TreeNode(2, new TreeNode(3, null, new TreeNode(4)), null),
);

// Another example returning 4
const exampleZ4 = new TreeNode(
  1,
  new TreeNode(
    2,
    null,
    new TreeNode(3, new TreeNode(4, null, new TreeNode(5))),
  ),
  null,
);

// Fourth distinct example returning 2
const exampleZ2 = new TreeNode(1, new TreeNode(2, null, new TreeNode(3)), null);

console.log(longestZigzag(exampleRoot)); // 4
console.log(longestZigzag(exampleZ3)); // 3
console.log(longestZigzag(exampleZ4)); // 4
console.log(longestZigzag(exampleZ2)); // 2
