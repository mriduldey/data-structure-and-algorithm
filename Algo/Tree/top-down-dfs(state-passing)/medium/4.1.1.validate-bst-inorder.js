/**
 * LC98 — Validate Binary Search Tree (BST)
1. Problem Description

LC98 — Validate Binary Search Tree is one of the most important and very frequently asked Tree problems in FAANG interviews because it tests:

DFS traversal
Tree recursion
BST properties
Range validation
Inorder traversal understanding
BST Definition

For every node:

All values in left subtree < current node value
All values in right subtree > current node value
Both left and right subtrees must also be BSTs
Common Constraints
Number of nodes: 1 to 10^4
-2^31 <= Node.val <= 2^31 - 1
Expected Complexity
Approach	Time	Space
DFS Range Validation	O(n)	O(h)
Inorder Traversal	O(n)	O(h)
Iterative Inorder	O(n)	O(h)

where:

n = number of nodes
h = tree height
Example
      2
     / \
    1   3

Inorder:

1 → 2 → 3

Strictly increasing.

Output:

true
Invalid BST Example
        5
       / \
      1   4
         / \
        3   6

Node 3 is inside right subtree of 5.

But:

3 < 5

Violation.

Output:

false
2. Intuition

Most candidates make the mistake:

node.left.val < node.val
node.right.val > node.val

This is NOT enough.

Example:

       10
      /  \
     5   15
        /
       6

Local checks pass:

6 < 15

But:

6 should be > 10

So we must carry valid ranges.

For every node:

(min, max)

Rules:

left subtree:
(min, node.val)

right subtree:
(node.val, max)

If node violates range:

return false
3. Edge Cases (Ask Interviewer)
1. Are duplicates allowed?

Most BST definitions:

NO

Must be:

left < root < right

not

left <= root <= right
2. Can values be INT_MIN / INT_MAX?

Yes.

Use:

-Infinity
Infinity

instead of integer boundaries.

3. Empty tree?
Usually valid BST.

Return:

true
4. Highly skewed tree?
Need O(h) recursion stack.
5. Large tree?

Need:

O(n)
 */

function validateBstInorder(root) {
  if (!root) return true;

  let prev = -Infinity;

  function inOrder(node) {
    if (!node) return true;

    if (!inOrder(node.left)) return false;

    if (node.val <= prev) return false;

    prev = node.val;

    return inOrder(node.right);
  }

  return inOrder(root);
}

// 1. Definition of a Binary Tree Node
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// ==========================================
// TEST CASES
// ==========================================

// Tree 1: Perfectly Valid BST (Height 3)
//        10
//       /  \
//      5    15
//     / \
//    2   7
const validTree = new TreeNode(
  10,
  new TreeNode(5, new TreeNode(2), new TreeNode(7)),
  new TreeNode(15),
);

// Tree 2: Invalid BST (Immediate Child Violation)
//        10
//       /  \
//      12    15  <-- 12 is greater than the root 10 on the left side!
const invalidImmediate = new TreeNode(10, new TreeNode(12), new TreeNode(15));

// Tree 3: Invalid BST (Deep / Hidden Violation)
//        10
//       /  \
//      5    15
//          /  \
//         6    20 <-- 6 is smaller than the root 10 on the right side!
const invalidDeep = new TreeNode(
  10,
  new TreeNode(5),
  new TreeNode(15, new TreeNode(6), new TreeNode(20)),
);

// ==========================================
// OUTPUT VERIFICATION
// ==========================================

console.log("--- Running BST Validation Tests ---");

console.log(
  "Test 1 (Valid Tree): Expected true ->",
  validateBstInorder(validTree),
);

console.log(
  "Test 2 (Immediate Violation): Expected false ->",
  validateBstInorder(invalidImmediate),
);

console.log(
  "Test 3 (Deep Violation): Expected false ->",
  validateBstInorder(invalidDeep),
);

console.log(
  "Test 4 (Empty Tree / Null): Expected true ->",
  validateBstInorder(null),
);
