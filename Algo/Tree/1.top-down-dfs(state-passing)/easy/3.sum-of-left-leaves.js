/**
 * LC404 — Sum of Left Leaves
1. Problem Description
Importance in FAANG Interviews
Frequency: Medium
Difficulty: Easy
Very common as a Tree DFS/BFS traversal question.
Tests:
Tree traversal fundamentals
Parent-child relationship tracking
Recursive thinking
BFS vs DFS understanding
Problem Statement

Given the root of a binary tree, return the sum of all left leaves.

A left leaf is:

Left child of its parent
Has no children
Common Constraints
Number of nodes: 1 to 1000
-1000 <= Node.val <= 1000
Expected Complexity
Approach	Time	Space
DFS Recursive	O(N)	O(H)
DFS Iterative	O(N)	O(H)
BFS	O(N)	O(W)

Where:

N = number of nodes
H = tree height
W = maximum width
Example
        3
       / \
      9   20
         /  \
        15   7

Left leaves:

9
15

Sum:

9 + 15 = 24

Output:

24
2. Intuition
Key Observation

For every node:

if node.left exists
AND node.left has no children

=> node.left is a left leaf
=> add its value

Otherwise:

continue traversal

We only need to identify:

Left Child + Leaf

not merely leaf.

Thinking Process
Visit node

Check left child:

    Is it leaf?
        YES -> add value
        NO  -> continue traversal

Visit left subtree
Visit right subtree

This naturally becomes DFS.

3. Edge Cases (Ask Interviewer)
1. Empty Tree
root = null

Output:

0
2. Single Node
    5

No left leaf.

Output:

0
3. Only Right Children
1
 \
  2
   \
    3

Output:

0
4. Root's Left Child Is Leaf
  1
 /
2

Output:

2
5. Negative Values
   1
  /
-5

Output:

-5
 */

function sumOfLeftLeaves(root) {
  if (!root) return null;

  let sum = 0;

  const leftNode = root.left;

  if (leftNode && !leftNode.left && !leftNode.right) {
    sum += leftNode.val;
  }

  sum += sumOfLeftLeaves(root.left);
  sum += sumOfLeftLeaves(root.right);

  return sum;
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

console.log("Example 1:", sumOfLeftLeaves(example1, 22)); // true
console.log("Example 2:", sumOfLeftLeaves(example2, 1)); // false
console.log("Example 3:", sumOfLeftLeaves(example3, 5)); // true
