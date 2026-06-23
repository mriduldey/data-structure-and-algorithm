/**
 * LC366 — Find Leaves of Binary Tree

Importance: Medium frequency in FAANG interviews (Google, Meta, Amazon). Tests postorder DFS, bottom-up thinking, grouping nodes by height.
Expected solution: O(n) time, O(n) space.

1. Problem Description

Given the root of a binary tree, repeatedly:

Collect all leaf nodes.
Remove them.
Continue until the tree becomes empty.

Return the leaves removed at each round.

Example
        1
      /   \
     2     3
    / \
   4   5

Round 1:

Leaves = [4,5,3]

Remaining:

      1
     /
    2

Round 2:

Leaves = [2]

Remaining:

1

Round 3:

Leaves = [1]

Output:

[[4,5,3],[2],[1]]
Common Constraints
0 <= n <= 10^4 ~ 10^5
Node values may repeat

Expected:

Time: O(n)
Space: O(n)
2. Intuition

Instead of physically removing leaves multiple times (O(n²)):

Observe:

Leaves have height = 0.
Parent of leaves has height = 1.
Root has maximum height.

Nodes having the same height disappear together.

Therefore:

Postorder traversal.
Compute height of every node.
Put nodes with same height into same array.

Example:

        1
      /   \
     2     3
    / \
   4   5

Heights:

4 -> 0
5 -> 0
3 -> 0

2 -> 1

1 -> 2

Result:

[
 [4,5,3],
 [2],
 [1]
]
3. Edge Cases (Questions to Ask Interviewer)
Empty tree?
root = null

Output:

[]
Duplicate values?

Nodes are different even if values are same.

    1
   / \
  2   2

Output:

[[2,2],[1]]
Single node?
1

Output:

[[1]]
Tree skewed like linked list?

Need O(n), not O(n²).

Very deep tree?

Recursive DFS may overflow stack.

Ask whether iterative solution is preferred.
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function collectLeaves(root) {
  const leafBucket = [];

  function collectLeaves(node) {
    if (!node) return -1;
    const leftHeight = collectLeaves(node.left);
    const rightHeight = collectLeaves(node.right);
    const height = Math.max(leftHeight, rightHeight) + 1;

    if (!Array.isArray(leafBucket[height])) {
      leafBucket[height] = [];
    }
    leafBucket[height].push(node.val);

    return height;
  }

  collectLeaves(root);

  return leafBucket;
}

const example1 = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3)
);

const example2 = new TreeNode(
  1,
  new TreeNode(2),
  new TreeNode(3)
);

const example3 = new TreeNode(7);

console.log('Example 1:', collectLeaves(example1));
console.log('Example 2:', collectLeaves(example2));
console.log('Example 3:', collectLeaves(example3));
