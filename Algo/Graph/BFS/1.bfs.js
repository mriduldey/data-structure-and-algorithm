/**
 * Note: the purpose of reconstruct path is no clear
 */

const graph = {
  0: [7, 9, 11],
  1: [10, 8],
  2: [3, 12],
  3: [2, 7],
  4: [],
  5: [6],
  6: [5, 7],
  7: [0, 3, 11, 6],
  8: [1, 9, 12],
  9: [0, 10, 8],
  10: [9, 1],
  11: [0, 7],
  12: [2, 8],
};

// Number of the nodes of the graph
const n = Object.keys(graph).length;

function bfs(s, e) {
  const prev = solve(s);
  console.log("Prev", prev);

  return reconstructPath(s, e, prev);
}

function solve(s) {
  const q = [];
  q.push(s);

  // For tracking visited nodes
  const visited = Array.from({ length: n });
  visited[s] = true;

  const prev = Array.from({ length: n });

  while (q.length !== 0) {
    const node = q.shift();
    const neighbours = graph[node];

    // Insert next level nodes in a queue and mark their prev node in a array(named prev)
    for (const next of neighbours) {
      if (!visited[next]) {
        q.push(next);
        visited[next] = true;
        prev[next] = node;
      }
    }
  }

  return prev;
}

function reconstructPath(s, e, prev) {
  // Reconstruct path going backwards from e
  const path = [];
  for (let at = e; at !== undefined; at = prev[at]) {
    path.push(at);
  }

  path.reverse();

  // If s and e not connected return empty array which shows no path exist ( because it is disconnected graph)
  if (path[0] !== s) {
    return [];
  }

  return path;
}

const path = bfs(0, 12);

console.log("Path", path);
