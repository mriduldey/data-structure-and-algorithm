const graph = {
  0: [10, 11],
  1: [2, 8, 13],
  2: [1, 8, 9, 13],
  3: [4],
  4: [3, 5, 7],
  5: [4, 6],
  6: [5, 7],
  7: [4, 6],
  8: [1, 2, 9, 13],
  9: [2, 8, 13],
  10: [0, 11],
  11: [0, 10],
  12: [],
  13: [1, 2, 8, 9],
};

// Number of the nodes of the graph
const n = Object.keys(graph).length;

// Array of false of length n
const visited = Array.from({ length: n }, () => false);

let count = 0;
const components = Array.from({ length: n });

function findComponents() {
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      count++;
      dfs(i);
    }
  }
  return components;
}

function dfs(at) {
  if (visited[at]) {
    return;
  }

  visited[at] = true;

  // mark node from which connected graph(count)
  components[at] = count;
  const neighbours = graph[at];

  for (const next of neighbours) {
    dfs(next);
  }
}

findComponents();
console.log(components);