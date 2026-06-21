/**
 * LC572 — Subtree of Another Tree

Importance: Medium frequency in FAANG interviews (Google, Amazon, Meta). Very common when testing tree recursion and tree comparison patterns.

1. Problem Description

Given two binary trees root and subRoot, determine whether subRoot exists as a subtree inside root.

Two trees are identical if:

Same structure.
Same node values.
Common Constraints
1 ≤ nodes ≤ 2000~10^4
-10^4 ≤ Node.val ≤ 10^4
Expected Complexity
Approach	Time	Space
Brute Force DFS + Same Tree	O(m × n)	O(h)
Serialization + String Match	O(m+n)	O(m+n)
Tree Hashing	O(m+n)	O(h)

m = nodes in root, n = nodes in subRoot

Example
root:

        3
       / \
      4   5
     / \
    1   2

subRoot:

      4
     / \
    1   2

Output:

true

Because the subtree rooted at node 4 is exactly identical to subRoot.

2. Intuition

This problem is:

Traverse every node in root

At each node:

Assume current node is the subtree root.
Compare the entire tree with subRoot.
If identical → return true.
Otherwise continue searching.

Thus it combines:

LC572 = DFS Traversal + LC100 Same Tree
for every node:
    if SameTree(node, subRoot)
         return true
3. Relevant Edge Cases (Ask Interviewer)
1. Can subRoot be null?

Usually:

subRoot = null

Return:

true

(empty tree is subtree of every tree)

2. Can root be null?
root = null
subRoot ≠ null

Return:

false
3. Duplicate values?

Yes.

Cannot compare values only.

Need structure + values.

4. Negative values?

Yes.

Algorithm unaffected.

5. Very large trees?

May discuss O(m+n) hashing solution.
 */

function isSubtreeIterative(root, subRoot) {
  if (!subRoot) return true;
  if (!root) return false;

  const stack = [root];

  while (stack.length) {
    const node = stack.pop();

    if (isSame(node, subRoot)) {
      return true;
    }

    node.left && stack.push(node.left);
    node.right && stack.push(node.right);
  }

  return false;
}

function isSame(root1, root2) {
  const stack = [[root1, root2]];

  while (stack.length) {
    const [node1, node2] = stack.pop();

    if (!node1 && !node2) continue;

    if (!node1 || !node2) return false;

    if (node1.val !== node2.val) {
      return false;
    }

    (node1.left || node2.left) && stack.push([node1.left, node2.left]);
    (node1.right || node2.right) && stack.push([node1.right, node2.right]);
  }

  return true;
}

const root1 = {
  val: 3,
  left: {
    val: 4,
    left: {
      val: 1,
      left: null,
      right: null,
    },
    right: {
      val: 2,
      left: null,
      right: null,
    },
  },
  right: {
    val: 5,
    left: null,
    right: null,
  },
};

const subRoot1 = {
  val: 4,
  left: {
    val: 1,
    left: null,
    right: null,
  },
  right: {
    val: 2,
    left: null,
    right: null,
  },
};

const subRoot2 = {
  val: 4,
  left: {
    val: 1,
    left: null,
    right: null,
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};

console.log(isSubtreeIterative(root1, subRoot1)); // true
console.log(isSubtreeIterative(root1, subRoot2)); // false
console.log(isSubtreeIterative(null, null)); // true
