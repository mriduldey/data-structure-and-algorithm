/**
 * LC113 — Path Sum II
1. Problem Description

Path Sum II is a medium-level binary tree DFS/backtracking problem and is a very common variation of path-based tree questions asked in FAANG interviews.

Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of node values equals targetSum.

Common Constraints
0 <= Number of Nodes <= 5000
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000
Expected Complexity
Approach	Time	Space
DFS + Backtracking	O(N)	O(H)
DFS + Path Copying	O(N²) worst	O(N²)

Where:

N = number of nodes
H = tree height
Example
        5
       / \
      4   8
     /   / \
    11 13  4
   / \     / \
  7   2   5   1

targetSum = 22

Valid paths:

5 → 4 → 11 → 2 = 22
5 → 8 → 4 → 5 = 22

Output:

[
 [5,4,11,2],
 [5,8,4,5]
]
How Output Is Coming
DFS explores every root-to-leaf path.

Path 1:
5+4+11+7 = 27 ❌

Path 2:
5+4+11+2 = 22 ✅

Path 3:
5+8+13 = 26 ❌

Path 4:
5+8+4+5 = 22 ✅

Path 5:
5+8+4+1 = 18 ❌

Result:

[
 [5,4,11,2],
 [5,8,4,5]
]
2. Intuition

This is a classic DFS + Backtracking problem.

At each node:

Add current node to path.
Subtract node value from remaining target.
If leaf node and remaining target becomes 0:
Store current path.
Explore left and right children.
Remove current node before returning (backtracking).

Think:

Try path
↓
Explore
↓
Undo
↓
Try next path
3. Edge Cases To Ask Interviewer
Empty Tree
root = null

Output = []
Single Node Equals Target
root = [5]
target = 5

Output = [[5]]
Single Node Not Equal Target
root = [5]
target = 10

Output = []
Negative Values Present
     1
    /
  -2

target = -1

Need full traversal.

Cannot prune.

Multiple Valid Paths
Return all paths.

Not first path only.

Very Skewed Tree
Height = N

Recursion depth may become O(N).
 * 
 */

function pathSum2(root, targetSum) {
  if (!root) return null;

  const result = [];
  findSumPath(root, result, targetSum);

  return result;
}

function findSumPath(root, result, remaining, path = []) {
  if (!root) return root;

  path.push(root.val);

  remaining -= root.val; 

  if (!root.left && !root.right && remaining === 0) {
    result.push([...path]);
  }

  findSumPath(root.left, result, remaining, path);
  findSumPath(root.right, result, remaining, path);

  path.pop();
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const example1 = new TreeNode(
  5,
  new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))),
  new TreeNode(8, new TreeNode(13), new TreeNode(4)),
);

const example2 = new TreeNode(
  1,
  new TreeNode(
    2,
    new TreeNode(2, new TreeNode(1), null),
    new TreeNode(2, new TreeNode(1), null),
  ),
  new TreeNode(5),
);

const example3 = new TreeNode(5);

console.log("Example 1:", pathSum2(example1, 22)); // true
console.log("Example 2:", pathSum2(example2, 6)); // false
console.log("Example 3:", pathSum2(example3, 5)); // true
