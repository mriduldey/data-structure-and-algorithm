/**
 * LC110 — Balanced Binary Tree ⭐⭐⭐⭐⭐ (Very Frequent FAANG)

Checks whether a binary tree is height-balanced.
A tree is balanced if for every node:

|height(left) - height(right)| <= 1

Very common DFS/Postorder interview problem.

Common Constraints
Nodes: 0 ≤ n ≤ 10^4 ~ 10^5
Values are irrelevant.
Expected:
Time: O(n)
Space: O(h) recursion stack (h = tree height)
Interviewers expect single traversal solution.
Example
        3
       / \
      9  20
         / \
        15  7

Heights:

9  ->1
15 ->1
7  ->1
20 ->2
3  ->3

Every node has height difference ≤1.

Output:

true

Example 2

        1
       /
      2
     /
    3

Heights:

3 ->1
2 ->2
1 ->3

At node 1:

left height = 2
right height = 0

|2-0| = 2 > 1

Output:

false
2. Intuition

Brute force:

For every node:

Find left subtree height.
Find right subtree height.
Compare difference.

This repeatedly computes heights → O(n²).

Better:

Use postorder DFS.

left height
right height
check balance
return height

If a subtree is already unbalanced, return -1 as a signal and propagate upward.

Thus each node is visited once.

Balanced subtree:
return height

Unbalanced subtree:
return -1

Time becomes O(n).

3. Edge Cases (Ask Interviewer)
1. Empty tree?
[]

Usually considered balanced.

Returns:

true
2. Single node?
1

Balanced.

3. Skewed tree?
1
 \
  2
   \
    3

Unbalanced.

4. Large tree?

Need O(n) solution.

Questions to Ask
Is an empty tree considered balanced? (usually yes)
Expected complexity? (O(n) expected)
Can I use recursion?
Maximum number of nodes? (stack overflow concern)
 */

function balancedBinaryTree(root) {
  function getHeight(node) {
    if (!node) return 0;

    const leftHeight = getHeight(node.left);
    if (leftHeight === -1) return -1;

    const rightHeight = getHeight(node.right);
    if (rightHeight === -1) return -1;

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return -1;
    }

    return Math.max(leftHeight, rightHeight) + 1;
  }

  return getHeight(root) !== -1;
}

const tree1 = {
  val: 3,
  left: {
    val: 9,
    left: null,
    right: null,
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    },
  },
};

const tree2 = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 3,
      left: null,
      right: null,
    },
    right: null,
  },
  right: null,
};

const tree3 = {
  val: 1,
  left: null,
  right: null,
};

const tree4 = null;

console.log(balancedBinaryTree(tree1));
console.log(balancedBinaryTree(tree2));
console.log(balancedBinaryTree(tree3));
console.log(balancedBinaryTree(tree4));
