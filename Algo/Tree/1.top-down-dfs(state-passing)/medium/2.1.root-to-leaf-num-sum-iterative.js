/**
 * LC129 — Sum Root to Leaf Numbers
1. Problem Description

LC129 - Sum Root to Leaf Numbers is a medium-level binary tree DFS problem frequently asked in FAANG interviews because it tests:

Tree Traversal (DFS)
Backtracking concepts
Path accumulation
Recursive state passing
Problem

Given a binary tree where each node contains a digit 0-9, every root-to-leaf path forms a number.

Return the sum of all root-to-leaf numbers.

Common Constraints
Number of nodes: 1 <= n <= 1000
Node value: 0 <= val <= 9
Expected Complexity
Approach	Time	Space
DFS Recursive	O(n)	O(h)
DFS Iterative	O(n)	O(h)

h = tree height

Example
      1
     / \
    2   3

Paths:

1 → 2 = 12
1 → 3 = 13

Answer:

12 + 13 = 25
Example 2
         4
       /   \
      9     0
     / \
    5   1

Paths:

4→9→5 = 495
4→9→1 = 491
4→0   = 40

Answer:

495 + 491 + 40 = 1026
2. Intuition

For every node:

currentNumber = parentNumber * 10 + node.val

As we move down:

1 → 2 → 3

1
12
123

When reaching a leaf:

Add currentNumber into answer

DFS naturally explores every root-to-leaf path exactly once.

3. Edge Cases (Ask Interviewer)
1. Empty Tree
root = null

Return:

0
2. Single Node
5

Answer:

5
3. Contains Zero
1
 \
  0

Number:

10
4. Skewed Tree
1
 \
  2
   \
    3

Produces:

123
5. Large Height

Need:

O(h) space

 */

function rootToLeafNumSumIterative(root) {
  if (!root) return null;

  let total = 0;
  const stack = [root];

  let num = 0;

  while (stack.length) {
    const node = stack.pop();
    num = num * 10 + node.val;

    if (!node.left && !node.right) {
      total += num;
      num = Math.floor(num / 10);
    }

    if (node.left) {
      stack.push(node.left);
    }

    if (node.right) {
      stack.push(node.right);
    }
  }

  return total;
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}
``;

function runTests() {
  console.log("--- STARTING BINARY TREE TESTS ---\n");

  // TEST CASE 1: Standard Tree
  //      1
  //     / \
  //    2   3
  // Paths: 12 + 13 = 25
  console.log("Test Case 1: Simple Balanced Tree");
  const tree1 = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const result1 = rootToLeafNumSumIterative(tree1);
  console.log(
    `Result: ${result1} | Expected: 25 | ${result1 === 25 ? "PASSED ✅" : "FAILED ❌"}\n`,
  );

  // TEST CASE 2: Single Node Tree
  //      7
  // Path: 7
  console.log("Test Case 2: Only Root Node");
  const tree2 = new TreeNode(7);
  const result2 = rootToLeafNumSumIterative(tree2);
  console.log(
    `Result: ${result2} | Expected: 7 | ${result2 === 7 ? "PASSED ✅" : "FAILED ❌"}\n`,
  );

  // TEST CASE 3: Multi-level Deep Tree
  //       4
  //      / \
  //     9   0
  //    /
  //   5
  // Paths: 495 + 40 = 535
  console.log("Test Case 3: Deep Left-Heavy Tree");
  const tree3 = new TreeNode(
    4,
    new TreeNode(9, new TreeNode(5), null),
    new TreeNode(0),
  );
  const result3 = rootToLeafNumSumIterative(tree3);
  console.log(
    `Result: ${result3} | Expected: 535 | ${result3 === 535 ? "PASSED ✅" : "FAILED ❌"}\n`,
  );

  const bugTree = new TreeNode(1, new TreeNode(2), new TreeNode(3));
  const bugResult = rootToLeafNumSumIterative(bugTree);
  console.log(
    `Result: ${bugResult} | Expected: 25 | ${bugResult === 25 ? "PASSED ✅" : "FAILED ❌"}\n`,
  );

  console.log("--- TESTS COMPLETE ---");
}

// Run the test suite
runTests();
