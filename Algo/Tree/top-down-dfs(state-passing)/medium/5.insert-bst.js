/**
 * LC701 — Insert into Binary Search Tree

Importance: Medium frequency. Very common warm-up BST problem asked in FAANG and product companies. Interviewers mainly check BST properties and recursive vs iterative thinking.

1. Problem Description

Given the root of a BST and a value val, insert the value into the tree while preserving BST properties and return the root.

BST Property
Left subtree < node
Right subtree > node
Common Constraints
Nodes: 0 ≤ n ≤ 10^4
Values: -10^8 ≤ val ≤ 10^8
Usually values are unique.
Expected Complexity
Approach	Time	Space
Recursive	O(h)	O(h)
Iterative	O(h)	O(1)

h = tree height

Balanced BST → O(log n)
Skewed BST → O(n)
Example

Input

      4
    /   \
   2     7
  / \
 1   3

val = 5

Insertion path:

5 > 4 → go right
5 < 7 → go left
left of 7 is null
Insert there

Output

      4
    /   \
   2     7
  / \   /
 1   3 5
2. Intuition

Insertion follows exactly the BST search path.

Compare with current node.
Smaller → move left.
Larger → move right.
When null is reached, create new node there.

Only one path from root to leaf is visited.

3. Relevant Edge Cases To Ask Interviewer
1. Can root be null?
root = null
val = 5

Output:
5
2. Are duplicates possible?

Two possibilities:

No duplicates (LC701)
Duplicates allowed

If duplicates:

equal value → always insert left

or

equal value → always insert right

Need clarification.

3. Can values be negative?

Yes.

4. Can tree be highly skewed?

Yes.

Recursive solution may use O(n) stack.
 */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function insertBST(root, val) {
  if (root === null) return new TreeNode(val);

  if (val < root.val) {
    root.left = insertBST(root.left, val);
  } else {
    root.right = insertBST(root.right, val);
  }

  return root;
}

// Input Tree: null
// Value to insert: 10
console.log(insertBST(null, 10));

/* Output Structure:
TreeNode {
  val: 10,
  left: null,
  right: null
}
*/

// Input Tree:
//      15
//     /  \
//   10    20
const tree2 = new TreeNode(15, new TreeNode(10), new TreeNode(20));

// Value to insert: 12 (Goes Left of 15, then Right of 10)
console.log(insertBST(tree2, 12));

/* Output Structure:
TreeNode {
  val: 15,
  left: TreeNode { 
    val: 10, 
    left: null, 
    right: TreeNode { val: 12, left: null, right: null } 
  },
  right: TreeNode { val: 20, left: null, right: null }
}
*/

// Input Tree:
//    8
//   /
//  4
const tree3 = new TreeNode(8, new TreeNode(4), null);

// Value to insert: 8 (Duplicate value)
console.log(insertBST(tree3, 8));

/* Output Structure:
TreeNode {
  val: 8,
  left: TreeNode { val: 4, left: null, right: null },
  right: TreeNode { val: 8, left: null, right: null }  <-- Duplicate placed on the right
}
*/

// Input Tree:
//  2
//   \
//    4
//     \
//      6
const tree4 = new TreeNode(2, null, new TreeNode(4, null, new TreeNode(6)));

// Value to insert: 8
console.log(insertBST(tree4, 8));

/* Output Structure:
TreeNode {
  val: 2,
  left: null,
  right: TreeNode {
    val: 4,
    left: null,
    right: TreeNode {
      val: 6,
      left: null,
      right: TreeNode { val: 8, left: null, right: null }
    }
  }
}
*/

// Input Tree:
//        50
//       /
//     20
//       \
//        30
const tree5 = new TreeNode(50, new TreeNode(20, null, new TreeNode(30)), null);

// Value to insert: 35 (Less than 50 -> Left; Greater than 20 -> Right; Greater than 30 -> Right)
console.log(insertBST(tree5, 35));

/* Output Structure:
TreeNode {
  val: 50,
  left: TreeNode {
    val: 20,
    left: null,
    right: TreeNode {
      val: 30,
      left: null,
      right: TreeNode { val: 35, left: null, right: null }
    }
  },
  right: null
}
*/
