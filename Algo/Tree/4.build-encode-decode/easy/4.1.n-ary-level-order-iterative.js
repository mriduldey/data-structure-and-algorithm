/**
 * LC 429 — N-ary Tree Level Order Traversal
1. Problem Description

LeetCode 429 — N-ary Tree Level Order Traversal is a medium-importance, moderately frequent FAANG tree problem. It tests whether you can generalize BFS/level-order traversal from a binary tree to a node containing an arbitrary number of children.

Given the root of an N-ary tree, return its node values level by level, from left to right.

Node {
    val: number
    children: Node[]
}
Common Constraints
0 <= number of nodes <= 10⁴
0 <= children.length
-10⁴ <= Node.val <= 10⁴
Tree depth is usually bounded by about 1000
Expected Complexity
Time: O(n) — every node is processed once.
Auxiliary space: O(w) — queue stores at most the maximum tree width.
Output space: O(n).
Example
        1
      / | \
     3  2  4
    / \
   5   6
Input:  root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]

Explanation:

Level 0: [1]
Level 1: [3,2,4]
Level 2: [5,6]
2. Intuition

Level-order traversal means processing nodes according to their distance from the root.

Use BFS with a queue:

Add the root to the queue.
Before processing a level, record the current queue size.
Process exactly that many nodes.
Add each node’s children to the queue.
Store the processed values as one level.

The queue may receive nodes from the next level while the current level is being processed, so the captured levelSize is essential.

3. Edge Cases to Ask the Interviewer
Can the root be null?
Return [].
Is the tree guaranteed to be valid and acyclic?
Normally yes for LeetCode; otherwise a visited set may be required.
Can children be missing or null?
LeetCode normally provides an array, but production code can safely handle missing children.
Must children be processed in their existing order?
Usually yes.
Should the output contain values or node references?
Usually values.
Can the tree be extremely wide or deep?
This affects iterative-versus-recursive implementation choice.
 */

function levelOrder(root) {
  const result = [];

  function dfs(node, depth) {
    if (!node) return;

    if (result.length === depth) {
      result.push([]);
    }

    result[depth].push(node.val);

    for (const child of node.children ?? []) {
      child && dfs(child, depth + 1);
    }
  }

  dfs(root, 0);

  return result;
}
