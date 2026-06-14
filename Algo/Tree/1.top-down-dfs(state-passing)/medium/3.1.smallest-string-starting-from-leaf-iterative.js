/**LC988 — Smallest String Starting From Leaf
1. Problem Description

LeetCode 988 — Smallest String Starting From Leaf is a medium-level Binary Tree DFS problem that appears occasionally in FAANG interviews. It tests:

Tree traversal (DFS)
Backtracking
Lexicographical string comparison
Root-to-leaf path processing
Problem

Given a binary tree where:

0 → 'a'
1 → 'b'
...
25 → 'z'

For every leaf node, form a string from leaf → root.

Return the lexicographically smallest string among all leaf-to-root strings.

Common Constraints
1 <= Number of Nodes <= 8500
0 <= Node.val <= 25
Expected Complexity
Approach	Time	Space
DFS + Backtracking	O(N × H)	O(H)

Where:

N = number of nodes
H = tree height
Example
        0(a)
       /    \
    1(b)   2(c)

Paths:

Leaf b → Root a = "ba"
Leaf c → Root a = "ca"

Compare:

"ba" < "ca"

Output:

"ba"
Example 2
        25(z)
        /
      0(a)
     /
   1(b)

Leaf → Root:

b → a → z

"baz"

Output:

"baz"
2. Intuition

The tree naturally suggests DFS.

At every node:

Convert value into character.
Add character to current path.
When reaching a leaf:
Build string from leaf → root.
Compare with global answer.
Backtrack.

Key observation:

Root → Leaf path is easy to build.

But answer requires Leaf → Root.

So reverse path when leaf is reached.
3. Edge Cases To Ask Interviewer
1. Empty Tree
root = null

Expected?

Usually return:

""
2. Single Node Tree
0(a)

Answer:

"a"
3. Multiple Identical Strings
Several leaf paths generate same string

Return either (same result).

4. Highly Skewed Tree
Height = N

Check recursion depth discussion.

5. Maximum Nodes (8500)

Need efficient backtracking instead of creating excessive strings. */

function smallestStrFromLeaf(root) {
  if (!root) return "";

  let smallestStr = "";

  const stack = [[root, ""]];

  while (stack.length) {
    let [node, currentStr] = stack.pop();

    currentStr = String.fromCharCode(97 + node.val) + currentStr;
    if (!node.left && !node.right) {
      if (smallestStr === "" || currentStr < smallestStr) {
        smallestStr = currentStr;
      }
    }

    node.right && stack.push([node.right, currentStr]);
    node.left && stack.push([node.left, currentStr]);
  }

  return smallestStr;
}

// Basic Tree Node definition
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Tree Creation
const tree1 = new TreeNode(0);
tree1.left = new TreeNode(1);
tree1.right = new TreeNode(2);

// Execution
console.log(smallestStrFromLeaf(tree1));
// Output: "ba"

// Tree Creation
const tree2 = new TreeNode(19);
tree2.left = new TreeNode(14);
tree2.right = new TreeNode(15);
tree2.left.left = new TreeNode(1);

// Execution
console.log(smallestStrFromLeaf(tree2));
// Output: "bot"
