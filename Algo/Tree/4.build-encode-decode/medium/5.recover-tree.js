/**
 * LC 1028 — Recover a Tree From Preorder Traversal
1. Problem Description

LC 1028 — Recover a Tree From Preorder Traversal — Medium FAANG importance / Medium frequency. Good interview problem for testing tree construction, preorder traversal, parsing strings, stack/recursion, and depth tracking.

You are given a preorder traversal encoded as a string:

Node value appears normally.
Number of - before a value represents its depth.
Root has depth 0.
A node at depth D has D dashes before it.
If a node has only one child, that child is guaranteed to be the left child.

Example:

traversal = "1-2--3--4-5--6--7"

Represents:

        1
       / \
      2   5
     / \ / \
    3  4 6  7

Why?

1       depth 0
-2      depth 1
--3     depth 2
--4     depth 2
-5      depth 1
--6     depth 2
--7     depth 2

Output is the reconstructed root node.

Common constraints
1 <= traversal.length <= 1000
1 <= Node.val <= 10^9   // conceptually values may be multi-digit

Important: values can contain multiple digits, so parsing character-by-character as a single digit is incorrect.

Expected complexity
Time: O(n) where n = traversal.length
Space: O(h) stack, worst case O(n)
Tree itself takes O(number of nodes) space.
2. Intuition

The string already tells us two things for every node:

value + depth

Example:

"1-2--3--4-5--6--7"


=> [1,0], [2,1], [3,2], [4,2], [5,1], [6,2], [7,2]

Because this is preorder:

root → left subtree → right subtree

When processing a node with depth d, its parent must be the most recently seen node at:

depth d - 1

A stack naturally maintains the current root-to-node path.

Core rule

Before inserting a node:

while (stack.length > depth)
    stack.pop();

Now:

stack[stack.length - 1]

is its parent.

Attach:

if parent.left is empty
    parent.left = node
else
    parent.right = node

Then push the node.

Example stack movement

For:

1-2--3--4-5

Process 1, depth 0:

stack = [1]

Process 2, depth 1:

parent = 1
1.left = 2


stack = [1,2]

Process 3, depth 2:

parent = 2
2.left = 3


stack = [1,2,3]

Process 4, depth 2:

pop 3


stack = [1,2]


parent = 2
2.right = 4


stack = [1,2,4]

Process 5, depth 1:

pop 4
pop 2


stack = [1]


parent = 1
1.right = 5
3. Edge Cases to Ask Interviewer

Only useful clarification questions:

Can node values contain multiple digits?
Yes — parser must consume the complete number.
Can node values be negative?
Normally no, because - is already being used to encode depth.
If a node has exactly one child, is it always the left child?
Yes. This is essential because otherwise the encoding can be ambiguous.
Is the traversal guaranteed to represent a valid tree?
LeetCode guarantees valid input. In production code, malformed depth jumps could be validated.
Can the input be empty?
LeetCode constraints normally make it non-empty, but handling "" defensively is trivial.
 */

function recoverFromPreorder(preorder) {
  if (preorder === "") return null;

  let index = 0;
  const stack = [];

  while (index < preorder.length) {
    let depth = 0;

    while (index < preorder.length && preorder[index] === "-") {
      depth++;
      index++;
    }

    let val = 0;

    while (index < preorder.length && preorder[index] !== "-") {
      val = val * 10 + Number(preorder[index]);
      index++;
    }

    const node = new TreeNode(val);

    while (stack.length > depth) {
      stack.pop();
    }

    if (stack.length > 0) {
      const parent = stack[stack.length - 1];

      if (!parent.left) {
        parent.left = node;
      } else {
        parent.right = node;
      }
    }

    stack.push(node);
  }
  return stack[0];
}

// Helper definition for local testing
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// -------------------------------------------------------------
// Test Case 1: Standard Balanced Tree
// String: "1-2--3--4-5--6--7"
// Expected Tree:
//        1
//      /   \
//     2     5
//    / \   / \
//   3   4 6   7
// -------------------------------------------------------------
const test1 = recoverFromPreorder("1-2--3--4-5--6--7");
console.log("Test 1 Result:", test1);
/*
  Expected output node structure:
  TreeNode {
    val: 1,
    left: TreeNode {
      val: 2,
      left: TreeNode { val: 3, left: null, right: null },
      right: TreeNode { val: 4, left: null, right: null }
    },
    right: TreeNode {
      val: 5,
      left: TreeNode { val: 6, left: null, right: null },
      right: TreeNode { val: 7, left: null, right: null }
    }
  }
*/

// -------------------------------------------------------------
// Test Case 2: Deep Left-Skewed Subtree with Backtracking
// String: "1-2--3---4-5"
// Expected Tree:
//        1
//      /   \
//     2     5
//    /
//   3
//  /
// 4
// -------------------------------------------------------------
const test2 = recoverFromPreorder("1-2--3---4-5");
console.log("Test 2 Result:", test2);
/*
  Expected output node structure:
  TreeNode {
    val: 1,
    left: TreeNode {
      val: 2,
      left: TreeNode {
        val: 3,
        left: TreeNode { val: 4, left: null, right: null },
        right: null
      },
      right: null
    },
    right: TreeNode { val: 5, left: null, right: null }
  }
*/

// -------------------------------------------------------------
// Test Case 3: Unbalanced Tree with Only Right Children
// String: "1-2--3---4-5--6"
// Expected Tree:
//        1
//      /   \
//     2     5
//    /     /
//   3     6
//  /
// 4
// -------------------------------------------------------------
const test3 = recoverFromPreorder("1-2--3---4-5--6");
console.log("Test 3 Result:", test3);
/*
  Expected output node structure:
  TreeNode {
    val: 1,
    left: TreeNode {
      val: 2,
      left: TreeNode {
        val: 3,
        left: TreeNode { val: 4, left: null, right: null },
        right: null
      },
      right: null
    },
    right: TreeNode {
      val: 5,
      left: TreeNode { val: 6, left: null, right: null },
      right: null
    }
  }
*/

// -------------------------------------------------------------
// Edge Case 4: Single Node Tree (No dashes)
// String: "102"
// Expected Tree:
//       102
// -------------------------------------------------------------
const test4 = recoverFromPreorder("102");
console.log("Test 4 Result:", test4);
/*
  Expected output node structure:
  TreeNode { val: 102, left: null, right: null }
*/

// -------------------------------------------------------------
// Edge Case 5: Large Multi-Digit Numbers & Single-Line Skewed Path
// String: "10--20---3000"
// Expected Tree:
//       10
//      /
//     20
//    /
//  3000
// -------------------------------------------------------------
const test5 = recoverFromPreorder("10--20---3000");
console.log("Test 5 Result:", test5);
/*
  Expected output node structure:
  TreeNode {
    val: 10,
    left: TreeNode {
      val: 20,
      left: TreeNode { val: 3000, left: null, right: null },
      right: null
    },
    right: null
  }
*/
