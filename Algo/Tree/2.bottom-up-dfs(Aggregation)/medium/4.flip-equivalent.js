/**
 * LC951 — Flip Equivalent Binary Trees
1. Problem Description

LeetCode 951 — Flip Equivalent Binary Trees is a medium-level Tree/DFS problem. It is not one of the most frequently asked FAANG questions, but it is an excellent interview problem for testing recursive thinking, tree comparison, structural recursion, and backtracking decisions.

Problem

Two binary trees are flip equivalent if they are equal after performing any number of flip operations.

A flip operation swaps the left and right child of any node.

Return true if the two trees are flip equivalent, otherwise false.

Common Constraints
Number of nodes: 0 ~ 100
Node values are unique
-100 <= Node.val <= 100
Expected Complexity
Time	Space
O(N)	O(H) recursion stack

where

N = number of nodes
H = tree height
Example
Tree1

        1
      /   \
     2     3
    /       \
   4         5


Tree2

        1
      /   \
     3     2
    /     /
   5     4

Flip at root

        1
      /   \
     3     2
    /     /
   5     4

Both trees become identical.

Output

true
2. Intuition

At every node there are only two possibilities:

Case 1 — No Flip
left ↔ left
right ↔ right
Case 2 — Flip
left ↔ right
right ↔ left

If either case succeeds, trees are flip equivalent.

Recursive definition:

Trees are equivalent if

Normal Matching
OR
Flipped Matching

Formula

(root1.val == root2.val)

AND

(
(left-left && right-right)

OR

(left-right && right-left)
)
3. Edge Cases (Ask Interviewer)
Can both trees be empty?
Are node values unique? (LC assumes yes.)
Can tree contain duplicate values? (Solution may need optimization changes.)
Maximum tree height? (Recursion depth concern.)
Should we optimize for skewed trees?
Can nodes contain negative values?
 */

function flipEquivalent(root1, root2) {
  if (!root1 && !root2) return true;

  if (!root1 || !root2) return false;

  if (root1.val !== root2.val) {
    return false;
  }

  const noFlip =
    flipEquivalent(root1.left, root2.left) &&
    flipEquivalent(root1.right, root2.right);

  const flip =
    flipEquivalent(root1.left, root2.right) &&
    flipEquivalent(root1.right, root2.left);

  return noFlip || flip;
}

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const example1A = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  new TreeNode(3, null, new TreeNode(5))
);

const example1B = new TreeNode(
  1,
  new TreeNode(3, null, new TreeNode(5)),
  new TreeNode(2, new TreeNode(4))
);

const example2A = new TreeNode(1, new TreeNode(2), new TreeNode(3));
const example2B = new TreeNode(1, new TreeNode(2), new TreeNode(3));

const example3A = new TreeNode(1);
const example3B = new TreeNode(1);

const example4A = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4)),
  new TreeNode(3)
);

const example4B = new TreeNode(
  1,
  new TreeNode(3),
  new TreeNode(2, null, new TreeNode(4))
);

const example5A = new TreeNode(
  10,
  new TreeNode(5, new TreeNode(2), new TreeNode(6)),
  new TreeNode(15, null, new TreeNode(20))
);

const example5B = new TreeNode(
  10,
  new TreeNode(15, null, new TreeNode(20)),
  new TreeNode(5, new TreeNode(6), new TreeNode(2))
);

const example6A = new TreeNode(1, new TreeNode(2), new TreeNode(2));
const example6B = new TreeNode(1, new TreeNode(2), new TreeNode(3));

console.log(flipEquivalent(example1A, example1B)); // true
console.log(flipEquivalent(example2A, example2B)); // true
console.log(flipEquivalent(example3A, example3B)); // true
console.log(flipEquivalent(example4A, example4B)); // true
console.log(flipEquivalent(example5A, example5B)); // true
console.log(flipEquivalent(example6A, example6B)); // false
