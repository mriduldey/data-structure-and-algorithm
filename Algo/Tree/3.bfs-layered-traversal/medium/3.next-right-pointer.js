/**
 * LC116 — Populating Next Right Pointers in Each Node
1. Problem Description

LC116 — Populating Next Right Pointers in Each Node is a high-value tree traversal problem frequently used in FAANG interviews to test:

Level-order traversal
Perfect binary tree properties
Pointer manipulation
O(1) auxiliary-space optimization

You are given a perfect binary tree where:

Every internal node has exactly two children.
All leaves are at the same depth.
Each node contains an additional next pointer.

Populate every next pointer so it points to the node immediately to its right on the same level. The rightmost node of every level must point to null.

Common constraints
0 <= number of nodes <= 2^12 - 1
-1000 <= Node.val <= 1000
The tree is a perfect binary tree.
Initially, every next pointer is null.
Expected complexity

For the optimized solution:

Time: O(n)
Auxiliary space: O(1)

Recursive implementations use O(h) call-stack space.

Example
Input:

        1
      /   \
     2     3
    / \   / \
   4   5 6   7

After connecting:

        1 → null
      /   \
     2  →  3 → null
    / \   / \
   4 → 5 → 6 → 7 → null

Output representation:

[1, #, 2, 3, #, 4, 5, 6, 7, #]

# indicates the end of a level.

2. Intuition

Because the tree is perfect, every node has both left and right children.

For each node:

node.left.next = node.right

This connects siblings under the same parent.

To connect nodes across different parents:

node.right.next = node.next.left

This works only when node.next exists.

The already-connected current level acts like a linked list, allowing us to traverse it without a queue and connect the next level.

3. Relevant Edge Cases to Ask the Interviewer
Can the root be null?
Return null.
Is the tree guaranteed to be perfect?
Critical because the O(1) logic relies on every internal node having two children.
Should the rightmost node of every level point to null?
Usually yes.
Are existing next pointers guaranteed to be null?
Usually yes, but the algorithm still overwrites all necessary pointers.
Should the original root be returned?
LeetCode expects the root after mutation.
 */

function populateNextRight(root) {
  if (!root) return null;

  let levelStart = root;

  while (levelStart.left) {
    let currentNode = levelStart;

    while (currentNode) {
      currentNode.left.next = currentNode.right;

      if (currentNode.next) {
        currentNode.right.next = currentNode.next.left;
      }

      currentNode = currentNode.next;
    }

    levelStart = levelStart.left;
  }
}

// 1. Create treeNode with a next pointer
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.next = null;
  }
}

// 2. Create trees

// Tree 1: Null/Empty Tree
const tree1 = null;

// Tree 2: Single Node
const tree2 = new TreeNode(1);

// Tree 3: 3 Nodes
const tree3 = new TreeNode(1);
tree3.left = new TreeNode(2);
tree3.right = new TreeNode(3);

// Tree 4: 7 Nodes
const tree4 = new TreeNode(1);
tree4.left = new TreeNode(2);
tree4.right = new TreeNode(3);
tree4.left.left = new TreeNode(4);
tree4.left.right = new TreeNode(5);
tree4.right.left = new TreeNode(6);
tree4.right.right = new TreeNode(7);

// Tree 5: 15 Nodes
const tree5 = new TreeNode(1);
tree5.left = new TreeNode(2);
tree5.right = new TreeNode(3);
tree5.left.left = new TreeNode(4);
tree5.left.right = new TreeNode(5);
tree5.right.left = new TreeNode(6);
tree5.right.right = new TreeNode(7);
tree5.left.left.left = new TreeNode(8);
tree5.left.left.right = new TreeNode(9);
tree5.left.right.left = new TreeNode(10);
tree5.left.right.right = new TreeNode(11);
tree5.right.left.left = new TreeNode(12);
tree5.right.left.right = new TreeNode(13);
tree5.right.right.left = new TreeNode(14);
tree5.right.right.right = new TreeNode(15);

// Run the function on the trees
populateNextRight(tree1);
populateNextRight(tree2);
populateNextRight(tree3);
populateNextRight(tree4);
populateNextRight(tree5);

// 3. consol.log output tree along with expected
console.log("Tree 1 Expected: null");
console.log("Tree 1 Actual:  ", tree1);

console.log("\nTree 2 Expected: 1 -> null");
console.log("Tree 2 Actual:  ", tree2.val, "->", tree2.next);

console.log("\nTree 3 Expected: 1 -> null, 2 -> 3 -> null");
console.log("Tree 3 Actual:  ", 
  tree3.val, "->", tree3.next, "|",
  tree3.left.val, "->", tree3.left.next.val, "->", tree3.left.next.next
);

console.log("\nTree 4 Expected: L1: 1->null | L2: 2->3->null | L3: 4->5->6->7->null");
console.log("Tree 4 Actual:  ",
  "L1:", tree4.val, "->", tree4.next, "|",
  "L2:", tree4.left.val, "->", tree4.left.next.val, "->", tree4.left.next.next, "|",
  "L3:", tree4.left.left.val, "->", tree4.left.left.next.val, "->", tree4.left.left.next.next.val, "->", tree4.left.left.next.next.next.val, "->", tree4.left.left.next.next.next.next
);

console.log("\nTree 5 Expected: L1: 1->null | L2: 2->3->null | L3: 4->5->6->7->null | L4: 8->9->10->11->12->13->14->15->null");
console.log("Tree 5 Actual:  ",
  "L1:", tree5.val, "->", tree5.next, "|",
  "L2:", tree5.left.val, "->", tree5.left.next.val, "->", tree5.left.next.next, "|",
  "L3:", tree5.left.left.val, "->", tree5.left.left.next.val, "->", tree5.left.left.next.next.val, "->", tree5.left.left.next.next.next.val, "->", tree5.left.left.next.next.next.next, "|",
  "L4:", tree5.left.left.left.val, "->", tree5.left.left.left.next.val, "->", tree5.left.left.left.next.next.val, "->", tree5.left.left.left.next.next.next.val, "->", tree5.left.left.left.next.next.next.next.val, "->", tree5.left.left.left.next.next.next.next.next.val, "->", tree5.left.left.left.next.next.next.next.next.next.val, "->", tree5.left.left.left.next.next.next.next.next.next.next.val, "->", tree5.left.left.left.next.next.next.next.next.next.next.next
);