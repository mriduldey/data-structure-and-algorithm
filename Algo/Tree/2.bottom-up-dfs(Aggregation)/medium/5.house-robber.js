/**LC337 — House Robber III
1. Problem Description

House Robber III is a medium difficulty tree DP problem and is fairly common in FAANG interviews (especially Google, Amazon, Meta). It tests:

Tree DFS
Dynamic Programming on Trees
Bottom-up recursion
State compression

Unlike House Robber I & II, houses are arranged as a binary tree.

Problem

Given the root of a binary tree where each node contains money.

You cannot rob two directly connected houses (parent & child).

Return the maximum amount of money you can rob.

Common Constraints
Number of nodes: 1 to 10^4
0 <= Node.val <= 10^4
Expected Complexity
Time	Space
O(N)	O(H) recursion stack (O(N) worst case)
Example
        3
       / \
      2   3
       \    \
        3    1

Rob:

3(root) + 3 + 1 = 7

Don't rob:

2 + 3 = 5

Answer:

7
2. Intuition

At every node there are only 2 possible decisions.

Case 1 — Rob current node

If current node is robbed

children CANNOT be robbed

Money becomes

current.val
+ left.notRob
+ right.notRob
Case 2 — Don't rob current node

Then every child independently chooses its best.

max(left.rob, left.notRob)
+
max(right.rob, right.notRob)

Instead of computing repeatedly, every DFS call returns

[
 robCurrent,
 notRobCurrent
]

This is classic Tree DP with 2 states. 
*/

function maxRob(root) {
  function traverse(node) {
    if (!node) return [0, 0];

    const [leftNoRob, leftRob] = traverse(node.left);
    const [rightNoRob, rightRob] = traverse(node.right);

    const noRob = Math.max(leftNoRob, leftRob) + Math.max(rightNoRob, rightRob);
    const rob = node.val + leftNoRob + rightNoRob;

    return [noRob, rob];
  }

  const [robRoot, skipRoot] = traverse(root);

  return Math.max(robRoot, skipRoot);
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const example1 = new TreeNode(
  3,
  new TreeNode(2, null, new TreeNode(3)),
  new TreeNode(3, null, new TreeNode(1)),
);

const example2 = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3),
);

const example3 = new TreeNode(
  4,
  new TreeNode(1, new TreeNode(2), new TreeNode(3)),
  new TreeNode(5),
);

const example4 = new TreeNode(
  2,
  new TreeNode(1),
  new TreeNode(4, new TreeNode(5), new TreeNode(1)),
);

const example5 = new TreeNode(5);

console.log("Example 1:", maxRob(example1)); // 7
console.log("Example 2:", maxRob(example2)); // 5
console.log("Example 3:", maxRob(example3)); // 10
console.log("Example 4:", maxRob(example4)); // 8
console.log("Example 5:", maxRob(example5)); // 5
