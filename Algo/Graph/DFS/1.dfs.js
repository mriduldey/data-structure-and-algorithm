const graph = {
  0: [1, 9],
  1: [0, 8],
  2: [3],
  3: [2, 4, 5, 7],
  4: [3],
  5: [3, 6],
  6: [5, 7],
  7: [3, 6, 10],
  8: [1, 9, 10],
  9: [0, 8],
  10: [7, 8],
};

const n = Object.keys(graph).length; // Number of the nodes of the graph
const visited = Array.from({ length: n }, () => false); // Array of false of length n

function dfs(at) {
  if (visited[at]) {
    return;
  }

  visited[at] = true;
  console.log(at, "Visited");
  const neighbours = graph[at];

  for (const next of neighbours) {
    dfs(next);
  }
}

const start_node = 0;

dfs(start_node);
