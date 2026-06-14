/**
 * LC257 — Binary Tree Paths
1. Problem Description

Binary Tree Paths is a common Easy-level DFS/Backtracking tree problem frequently used by FAANG companies to test:

Tree traversal fundamentals
DFS recursion
Backtracking
Path construction
Root-to-leaf pattern recognition
Problem

Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf node is a node with no children.

Common Constraints
Number of nodes: 1 to 100
Node value: -100 to 100
Expected Complexity
Approach	Time	Space
DFS + Backtracking	O(N)	O(H)
DFS + String Passing	O(N)	O(H)

Where:

N = total nodes
H = tree height
Example
        1
       / \
      2   3
       \
        5

Output:

["1->2->5", "1->3"]
How Output Comes

Path 1:

1 → 2 → 5

String:

"1->2->5"

Path 2:

1 → 3

String:

"1->3"

Result:

["1->2->5", "1->3"]
2. Intuition

Whenever you see:

Root to Leaf
Return all paths

Think:

DFS + Backtracking

Pattern:

Visit node
Add node to current path

If leaf:
    Store path

Go left
Go right

Remove node from path
Visualization
        1
       / \
      2   3
       \
        5

Current Path:

[]
[1]
[1,2]
[1,2,5]

Leaf found:

"1->2->5"

Backtrack:

[1,2]
[1]

Continue right subtree.

3. Edge Cases To Ask Interviewer
1. Empty Tree
root = null

Output:

[]
2. Single Node
1

Output:

["1"]
3. Negative Values
-1
 /
-2

Output:

["-1->-2"]
4. Skewed Tree
1
 \
  2
   \
    3

Output:

["1->2->3"]
Interview Questions
Can tree be empty?
Can node values be negative?
Do we only need root-to-leaf paths?
Can output order be arbitrary?
 */

function binaryTreePaths(root) {
  if (!root) return [];
  const result = [];
  dfs(root, [], result);
  return result;
}

function dfs(root, path = [], result) {
  if (!root) return;

  path.push(root.val);

  if (!root.left && !root.right) {
    result.push(path.join("->"));
  } else {
    dfs(root.left, path, result);
    dfs(root.right, path, result);
  }

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

const example2 = new TreeNode(1, new TreeNode(2), null);

const example3 = new TreeNode(5);

console.log("Example 1:", binaryTreePaths(example1, 22)); // true
console.log("Example 2:", binaryTreePaths(example2, 1)); // false
console.log("Example 3:", binaryTreePaths(example3, 5)); // true
