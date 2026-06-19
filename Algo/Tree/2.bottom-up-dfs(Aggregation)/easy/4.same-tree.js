/**
 * LC100 — Same Tree

Importance: Very common and fundamental binary tree problem. Frequently asked in FAANG interviews (Google, Amazon, Meta, Microsoft). Tests recursion, tree traversal, and base case handling.

1. Problem Description

Given two binary trees p and q, determine whether they are identical.

Two trees are considered the same if:

They have the same structure.
Corresponding nodes contain the same values.
Common Constraints
Number of nodes: 0 ≤ n ≤ 1000 (sometimes up to 10^4)
Node values: -10^4 ≤ val ≤ 10^4
Expected Complexity
Approach	Time	Space
DFS Recursive	O(n)	O(h)
DFS Iterative	O(n)	O(h)
BFS	O(n)	O(w)

where:

n = number of nodes
h = tree height
w = maximum width
Example
p =      1
        / \
       2   3

q =      1
        / \
       2   3

Output:

true

Because:

1 == 1
2 == 2
3 == 3
same structure

Example 2:

p =      1
        /
       2

q =      1
          \
           2

Output:

false

Different structure.

2. Intuition

For every pair of nodes:

Case 1: Both nodes are null
null null

Trees are identical at this point.

Return:

true
Case 2: One node is null
null 2

Structure differs.

Return:

false
Case 3: Values differ
3 5

Return:

false
Case 4: Values match

Need both subtrees to be same:

left subtree same
AND
right subtree same

Thus:

sameTree(node1,node2)
=
(node1.val==node2.val)
&&
sameTree(left1,left2)
&&
sameTree(right1,right2)
3. Relevant Edge Cases (Ask Interviewer)
1. Can both trees be empty?
null
null

Answer:

true
2. Can duplicate values exist?

Yes.

Structure must still match.

3. Maximum tree size?

Useful for deciding recursion vs iterative solution.

4. Is recursion depth a concern?

If very deep tree:

1
 \
  2
   \
    3

Iterative solution may be safer.
 */

function sameTree(root1, root2) {
  if (!root1 && !root2) return true;

  if (!root1 || !root2) return false;

  if (root1.val !== root2.val) return false;

  return sameTree(root1.left, root2.left) && sameTree(root1.right, root2.right);
}

const tree1 = {
        val: 1,
        left: {
                val: 2,
                left: null,
                right: null,
        },
        right: {
                val: 3,
                left: null,
                right: null,
        },
};

const tree2 = {
        val: 1,
        left: {
                val: 2,
                left: null,
                right: null,
        },
        right: {
                val: 3,
                left: null,
                right: null,
        },
};

const tree3 = {
        val: 1,
        left: {
                val: 2,
                left: null,
                right: null,
        },
        right: {
                val: 4,
                left: null,
                right: null,
        },
};

const tree4 = {
        val: 1,
        left: {
                val: 2,
                left: null,
                right: null,
        },
        right: null,
};

console.log(sameTree(tree1, tree2)); // true
console.log(sameTree(tree1, tree3)); // false
console.log(sameTree(tree1, tree4)); // false
console.log(sameTree(null, null)); // true
