/**
 * LC 589 — N-ary Tree Preorder Traversal
1. Problem Description

LC 589 — N-ary Tree Preorder Traversal is an easy but foundational tree-traversal problem. It is not usually asked alone in senior FAANG interviews, but its traversal pattern frequently appears inside harder problems involving file systems, organization hierarchies, DOM trees, tries, and dependency trees.

Given the root of an N-ary tree, return the node values in preorder:

Visit node
→ Traverse child 1
→ Traverse child 2
→ ...
→ Traverse child N
Node structure
class Node {
    constructor(val, children = []) {
        this.val = val;
        this.children = children;
    }
}
Common constraints
0 <= number of nodes <= 10⁴
0 <= Node.val <= 10⁴
children.length may vary for every node
Expected complexity
Time:  O(n)
Space: O(h) recursive, O(n) worst case
n = number of nodes.
h = tree height.
The returned result itself requires O(n) space.
Example
Tree:

        1
      / | \
     3  2  4
    / \
   5   6

Output: [1, 3, 5, 6, 2, 4]
How the output is produced
Visit 1
Visit subtree rooted at 3 → 3, 5, 6
Visit 2
Visit 4

Therefore:

[1, 3, 5, 6, 2, 4]
2. Intuition

Preorder means:

Process the current node before its children.

For every node:

Add its value to the result.
Traverse each child from left to right.
Repeat the same process recursively.

The iterative version uses a stack. Since a stack is LIFO, children must be pushed right to left so that the leftmost child is processed first.

3. Relevant Edge Cases to Ask the Interviewer
Can the root be null?
Return an empty array.
Is the order of children significant?
Usually yes; process children from left to right.
Can children be missing or null?
LeetCode normally provides an array, but production code may guard against it.
Can the tree be extremely deep?
If yes, prefer iterative traversal to avoid call-stack overflow.
Can the structure contain cycles or shared nodes?
A valid tree cannot. If arbitrary graph-like input is possible, a visited set is required.
 */

function preorder(root) {
  const result = [];

  const dfs = (node) => {
    if (!node) return;

    result.push(node.val);

    for (const child of node.children) {
      dfs(child);
    }
  };

  dfs(root);

  return result;
}

// Node definition for N-ary Tree
class Node {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

// -----------------------------------------------------------------------------
// 5 Example Trees
// -----------------------------------------------------------------------------

// Example 1: Standard Balanced 3-Level Tree
//        1
//     /  |  \
//    2   3   4
//   / \
//  5   6
const tree1 = new Node(1, [
  new Node(2, [new Node(5), new Node(6)]),
  new Node(3),
  new Node(4)
]);

// Example 2: Single-Line / Skewed Tree (Deep)
//  1 -> 2 -> 3 -> 4
const tree2 = new Node(1, [
  new Node(2, [
    new Node(3, [
      new Node(4)
    ])
  ])
]);

// Example 3: Wide/Flat Tree (Single Parent, Many Leaves)
//       10
//   / / | \ \
//  1 2  3  4 5
const tree3 = new Node(10, [
  new Node(1),
  new Node(2),
  new Node(3),
  new Node(4),
  new Node(5)
]);

// Example 4: Single Node Tree
const tree4 = new Node(42);

// Example 5: Complex Asymmetric Tree
//         100
//       /     \
//      20      30
//     /  \      |
//    200 300   400
//   /
//  500
const tree5 = new Node(100, [
  new Node(20, [
    new Node(200, [new Node(500)]),
    new Node(300)
  ]),
  new Node(30, [
    new Node(400)
  ])
]);

// -----------------------------------------------------------------------------
// Executing and Logging Results
// -----------------------------------------------------------------------------

console.log("Tree 1 Preorder:", preorder(tree1));
// Expected: [1, 2, 5, 6, 3, 4]

console.log("Tree 2 Preorder:", preorder(tree2));
// Expected: [1, 2, 3, 4]

console.log("Tree 3 Preorder:", preorder(tree3));
// Expected: [10, 1, 2, 3, 4, 5]

console.log("Tree 4 Preorder:", preorder(tree4));
// Expected: [42]

console.log("Tree 5 Preorder:", preorder(tree5));
// Expected: [100, 20, 200, 500, 300, 30, 400]