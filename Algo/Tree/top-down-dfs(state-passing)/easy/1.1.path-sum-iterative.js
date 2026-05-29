/**
 * /**
 * LC112 — Path Sum
1. Problem Description
Importance in FAANG
Frequency: Very High
Difficulty: Easy
Patterns: DFS, Tree Traversal, Root-to-Leaf Path
Often asked as a foundation before harder problems like LC113, LC437, LC124.
Problem

Given the root of a binary tree and an integer targetSum, determine whether the tree has a root-to-leaf path such that adding all node values along the path equals targetSum.

A leaf node is a node with no left and right children.

Common Constraints
Number of nodes: 0 to 5000
Node values: -1000 to 1000
targetSum: -1000 to 1000
Expected Complexity
Approach	Time	Space
DFS Recursive	O(N)	O(H)
DFS Iterative	O(N)	O(H)
N = Number of nodes
H = Height of tree
Example
        5
       / \
      4   8
     /   / \
    11  13  4
   / \
  7   2

targetSum = 22

Path:

5 → 4 → 11 → 2

5 + 4 + 11 + 2 = 22

Output:

true

Why?

Because a valid root-to-leaf path exists.

2. Intuition

At every node:

targetSum -= currentNode.val

When we reach a leaf:

remainingSum === leaf.val

or after subtraction:

remainingSum === 0

then path found.

Think:

Can my left subtree complete the remaining sum?
OR
Can my right subtree complete the remaining sum?

Recursive relation:

hasPath(left, remaining)
||
hasPath(right, remaining)

This is pure DFS.

3. Edge Cases To Ask Interviewer
Empty Tree
root = null

Return:

false
Single Node Tree
  5

target = 5

Return:

true
Single Node Not Matching
  5

target = 10

Return:

false
Negative Values
   1
  /
-2

Must support negatives.

Root-to-Leaf Only
    1
   /
  2

target = 1

Return:

false

Because root alone is NOT leaf.
 */

function hasPathSumIterative(root, targetSum) {
  if (!root) return false;

  const stack = [[root, root.val]];

  while (stack.length) {
    const [node, sum] = stack.pop();

    if (!node.left && !node.right && sum === targetSum) {
      return true;
    }

    if (node.right) {
      stack.push([node.right, sum + node.right.val]);
    }

    if (node.left) {
      stack.push([node.left, sum + node.left.val]);
    }
  }

  return false;
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

const example2 = new TreeNode(1, new TreeNode(2), null);

const example3 = new TreeNode(5);

console.log("Example 1:", hasPathSumIterative(example1, 22)); // true
console.log("Example 2:", hasPathSumIterative(example2, 1)); // false
console.log("Example 3:", hasPathSumIterative(example3, 5)); // true
