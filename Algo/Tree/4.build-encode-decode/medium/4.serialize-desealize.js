/**
 * LC449 — Serialize and Deserialize BST

FAANG importance: High (8/10) | Frequency: Medium–High. This is an important tree-design problem because the interviewer expects you to exploit the BST invariant rather than simply copy the generic binary-tree serialization approach from LC297.

1. Problem Description

Given the root of a Binary Search Tree, implement:

serialize(root)
deserialize(data)

such that:

BST → String → Same BST

For every node:

left subtree values < node.val
right subtree values > node.val
Typical constraints
0 <= number of nodes <= 10^4
0 <= Node.val <= 10^4
BST values are normally unique.

If duplicates are possible, clarify the duplicate placement rule with the interviewer.

Expected complexity
Operation	Time	Extra Space
Serialize	O(n)	O(h) recursion
Deserialize	O(n)	O(h) recursion
Serialized data	O(n)	—

h = tree height.

Worst case:

h = n     skewed BST
h = log n balanced BST
Example
       8
      / \
     5   10
    / \    \
   1   7    12

Preorder:

8,5,1,7,10,12

Serialized:

"8,5,1,7,10,12"

Why can we reconstruct without null markers?

Start with 8.

values < 8  → left subtree
values > 8  → right subtree

During recursive reconstruction, maintain valid BST bounds.

Result:

       8
      / \
     5   10
    / \    \
   1   7    12
2. Intuition

For a normal binary tree, preorder alone is insufficient:

1,2,3

could represent several different trees.

But in a BST, ordering gives additional structural information.

Key idea

Serialize using:

Preorder = Root → Left → Right

Then deserialize using:

(minBound, maxBound)

Example:

8,5,1,7,10,12

Initially:

(-∞, +∞)

Take:

8

Left subtree must satisfy:

(-∞, 8)

Right subtree:

(8, +∞)

For 5:

5 ∈ (-∞, 8)

so create it.

For 1:

1 ∈ (-∞, 5)

so create it.

Eventually a value violating the current bounds belongs to an ancestor's subtree, so do not consume it yet.

This makes deserialization O(n).

3. Edge Cases to Ask Interviewer

Only relevant clarification questions:

Can the tree be empty?

Usually yes → serialize(null) = ""

Are BST values unique?

Important because duplicate placement changes reconstruction rules.

If duplicates exist, where are they placed?

duplicates left?
duplicates right?
count stored inside node?

Can values be negative?

Bounds implementation should support them.

Are node values valid JavaScript Numbers?

Usually yes.

No need to ask about tree balance—the algorithm handles both balanced and skewed BSTs.
 */

function sealize(root) {
  const preorder = [];

  function buildPreorder(node) {
    if (!node) return;

    preorder.push(node.val);

    buildPreorder(node.left);
    buildPreorder(node.right);
  }

  buildPreorder(root);

  return preorder.join(",");
}

function deSirialize(preorderStr) {
  // Handle empty input string
  if (!preorderStr) return null;

  const preorder = preorderStr.split(",").map(Number);

  let index = 0;

  function buildTree(lower, upper) {
    if (index >= preorder.length) return null;

    const rootVal = preorder[index];

    if (rootVal <= lower || rootVal >= upper) {
      return null;
    }

    index++;

    const root = new TreeNode(rootVal);

    root.left = buildTree(lower, rootVal);
    root.right = buildTree(rootVal, upper);

    return root;
  }

  return buildTree(-Infinity, Infinity);
}


// TreeNode definition
function TreeNode(val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
}

// -------------------------------------------------------------
// 5 Example Trees & Execution
// -------------------------------------------------------------

// 1. Single Node Tree
const tree1 = new TreeNode(42);

// 2. Left-Skewed Tree
const tree2 = new TreeNode(5, new TreeNode(3, new TreeNode(1)));

// 3. Right-Skewed Tree
const tree3 = new TreeNode(10, null, new TreeNode(20, null, new TreeNode(30)));

// 4. Tree with Negative & Decimal Values
const tree4 = new TreeNode(0, new TreeNode(-10, new TreeNode(-20)), new TreeNode(10.5));

// 5. Empty Tree
const tree5 = null;

const testCases = [tree1, tree2, tree3, tree4, tree5];

testCases.forEach((root) => {
  const serializedOutput = sealize(root);
  console.log("Serialized String:", JSON.stringify(serializedOutput));

  const deserializedTree = deSirialize(serializedOutput);
  console.log("Deserialized Tree:", JSON.stringify(deserializedTree));
});

/**
 * Serialized String: "42"
Deserialized Tree: {"val":42,"left":null,"right":null}

Serialized String: "5,3,1"
Deserialized Tree: {"val":5,"left":{"val":3,"left":{"val":1,"left":null,"right":null},"right":null},"right":null}

Serialized String: "10,20,30"
Deserialized Tree: {"val":10,"left":null,"right":{"val":20,"left":null,"right":{"val":30,"left":null,"right":null}}}

Serialized String: "0,-10,-20,10.5"
Deserialized Tree: {"val":0,"left":{"val":-10,"left":{"val":-20,"left":null,"right":null},"right":null},"right":{"val":10.5,"left":null,"right":null}}

Serialized String: ""
Deserialized Tree: null
 */