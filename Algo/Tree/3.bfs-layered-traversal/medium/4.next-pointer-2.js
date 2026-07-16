/**
 * LC117 — Populating Next Right Pointers in Each Node II
1. Problem Description

Interview importance: High | FAANG frequency: Medium

LC117 is a common follow-up to LC116. It tests:

Level-order traversal without a queue
Pointer manipulation
Handling sparse/non-perfect binary trees
Maintaining traversal invariants
Achieving O(1) auxiliary space

Given an arbitrary binary tree, populate every node’s next pointer so that it points to the next node on the same level. The rightmost node of every level must point to null.

Common constraints
0 <= number of nodes <= 6000
-100 <= Node.val <= 100
The tree is not necessarily complete, balanced, or perfect.
LeetCode guarantees that all next pointers initially contain null.
Expected complexity
Time: O(n)
Auxiliary space: O(1) for the expected optimized solution

The recursion stack or BFS queue is considered extra space.

Example
Input:

        1
      /   \
     2     3
    / \     \
   4   5     7

After connecting:

1 → null
2 → 3 → null
4 → 5 → 7 → null

Serialized output:

[1, #, 2, 3, #, 4, 5, 7, #]

5.next becomes 7, even though their parents are separated by a missing child.

2. Intuition

Use the already-created next pointers to traverse the current level.

While traversing that level:

Maintain a dummy node representing the beginning of the next level.
Maintain a tail pointer representing the last connected node on the next level.
Append every non-null left and right child to tail.
After finishing the current level, move to dummy.next.
Core invariant

Before processing a level:

All nodes on the current level are connected using next.
levelStart points to the first node on that level.

While processing:

tail always points to the last connected child on the next level.
Current level:
node → node → node → null

Build next level:
dummy → child → child → child → null

Each node is visited once, and only a constant number of pointers are maintained.

3. Relevant Questions to Ask the Interviewer
Can the tree be sparse or skewed?
Yes, assume an arbitrary binary tree.
Are all existing next pointers initially null?
LeetCode guarantees this, but production input may not.
Is constant auxiliary space required?
This determines whether BFS with a queue is acceptable.
Should the function mutate the tree and return the original root?
Usually yes.
Should the rightmost node of every level explicitly point to null?
Yes.
Can the root itself be null?
Yes.
 */

function nextPointer2(root) {
  if (!root) return null;

  root.next = null;
  let levelStart = root;

  while (levelStart) {
    const dummy = { next: null };
    let tail = dummy;

    for (let node = levelStart; node !== null; node = node.next) {
      if (node.left) {
        tail.next = node.left;
        tail = node.left;
      }

      if (node.right) {
        tail.next = node.right;
        tail = node.right;
      }
    }

    if (tail !== dummy) {
      tail.next = null;
    }

    levelStart = dummy.next;
  }
  return root;
}

// 1. Definition for a Node
class Node {
  constructor(val, left = null, right = null, next = null) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.next = next;
  }
}

// --- TREE 1: Perfect Binary Tree (Fully Balanced) ---
//       1
//      / \
//     2   3
//    / \ / \
//   4  5 6  7
const tree1 = new Node(
  1,
  new Node(2, new Node(4), new Node(5)),
  new Node(3, new Node(6), new Node(7)),
);

// --- TREE 2: Left-Skewed Tree (Only left children) ---
//     1
//    /
//   2
//  /
// 3
const tree2 = new Node(1, new Node(2, new Node(3)));

// --- TREE 3: Incomplete Tree with Gaps ---
//       1
//      / \
//     2   3
//    /     \
//   4       5
const tree3 = new Node(
  1,
  new Node(2, new Node(4), null),
  new Node(3, null, new Node(5)),
);

// --- TREE 4: Single Node (Edge case) ---
//   1
const tree4 = new Node(1);

// --- TREE 5: Right-Skewed Tree (Only right children) ---
//   1
//    \
//     2
//      \
//       3
const tree5 = new Node(1, null, new Node(2, null, new Node(3)));

// --- RUNNING THE SAMPLES ---

console.log("=== TREE 1 (Perfect Tree) ===");
console.log(nextPointer2(tree1));

console.log("=== TREE 2 (Left-Skewed) ===");
console.log(nextPointer2(tree2));

console.log("=== TREE 3 (With Gaps) ===");
console.log(nextPointer2(tree3));

console.log("=== TREE 4 (Single Node) ===");
console.log(nextPointer2(tree4));

console.log("=== TREE 5 (Right-Skewed) ===");
console.log(nextPointer2(tree5));
