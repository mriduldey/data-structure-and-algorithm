/**
 * 1. LC590 — N-ary Tree Postorder Traversal

Interview importance: Medium. The exact problem is less frequent than binary-tree traversals, but it tests recursion, iterative traversal, stack ordering, and generalization from binary to N-ary trees.

Given the root of an N-ary tree, return its nodes in postorder:

Visit every child from left to right, then visit the current node.

Common constraints
0 <= number of nodes <= 10⁴
Node values are generally within [-10⁴, 10⁴]

Each node contains:

{
  val: number,
  children: Node[]
}
Expected complexity
Time: O(n)
Space:
Recursive: O(h) call stack, excluding output
Iterative: O(n) worst case
n = number of nodes, h = tree height
Example
        1
      / | \
     3  2  4
    / \
   5   6
Input:  root = [1,null,3,2,4,null,5,6]
Output: [5,6,3,2,4,1]

Explanation:

Process children of 3: 5, 6
Then process 3
Process 2, then 4
Finally process root 1
2. Intuition

Postorder means:

children first → current node last

For every node:

Recursively process all children from left to right.
Add the node value after all children are processed.

The recursive solution directly follows the definition.

For an iterative solution, use a modified preorder:

node → children from right to left

Append nodes in that order, then reverse the result to obtain:

children from left to right → node
3. Relevant Edge Cases to Ask the Interviewer
Can root be null?
Is the children array always present, or can it be null/undefined?
Must children be processed strictly from left to right?
Can the tree be extremely deep, making recursion unsafe?
Are repeated values allowed?
Usually yes; traversal depends on nodes, not unique values.
Should the input tree remain unchanged?
Usually yes.
 */

function postOrder(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    const children = node.children ?? [];
    for (const child of children) {
      child && dfs(child);
    }
    result.push(node.val);
  }

  dfs(root);
  return result;
}

// 1. TreeNode Class Definition
class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

// ==========================================
// 3. Test Cases & Edge Cases Setup
// ==========================================

// Example 1: Standard N-ary Tree
//        1
//      / | \
//     3  2  4
//    / \
//   5   6
const ex1 = new TreeNode(1, [
  new TreeNode(3, [new TreeNode(5), new TreeNode(6)]),
  new TreeNode(2),
  new TreeNode(4),
]);

// Example 2: Skewed Tree (Linked List structure)
// 1 -> 2 -> 3 -> 4
const ex2 = new TreeNode(1, [
  new TreeNode(2, [
    new TreeNode(3, [
      new TreeNode(4),
    ]),
  ]),
]);

// Example 3: Edge Case — Single Node Tree
const ex3 = new TreeNode(42);

// Example 4: Edge Case — Empty Tree
const ex4 = null;

// Example 5: Wide Tree with Varying Subtree Depths
//          10
//      /   |   \
//     20   30   40
//     |        /  \
//     50      60  70
const ex5 = new TreeNode(10, [
  new TreeNode(20, [new TreeNode(50)]),
  new TreeNode(30),
  new TreeNode(40, [new TreeNode(60), new TreeNode(70)]),
]);

// ==========================================
// 4. Execution & Console Logs
// ==========================================

console.log("Ex 1 (Standard Tree):", postOrder(ex1));
// Output: [ 5, 6, 3, 2, 4, 1 ]

console.log("Ex 2 (Skewed Tree):  ", postOrder(ex2));
// Output: [ 4, 3, 2, 1 ]

console.log("Ex 3 (Single Node):  ", postOrder(ex3));
// Output: [ 42 ]

console.log("Ex 4 (Empty Tree):   ", postOrder(ex4));
// Output: []

console.log("Ex 5 (Wide/Deep):    ", postOrder(ex5));
// Output: [ 50, 20, 30, 60, 70, 40, 10 ]