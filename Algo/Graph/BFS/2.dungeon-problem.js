const m = [
  ['S', 0, 0, "#", "#", 0, 0, 0, 0],
  [0, "#", 0, 0, "#", 0, 0, 0, 0],
  [0, "#", 0, 0, 0, 0, 0, "#", 0],
  [0, 0, 0, 0, "#", "#", "E", 0, 0],
];

const R = m.length,
  C = m[0].length; // All row has same columns

const sr = 0,
  sc = 0; // Starting row and column

const rq = [],
  cq = []; // Empty row-queue and column-queue

// Variables used to track the numbers of steps taken
let moveCount = 0;
let nodesLeftInLayer = 1;
let nodesInNextLayer = 0;

// Variables used to track whether the E character ever gets reached during search
let reachedEnd = false;

// R * C matrix of false values used to track whether the node at position(i, j) has been visited
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => false)
);

// North, South, East, West direction vectors
// North(up) -> row index = row index - 1; South -> rowIndex = rowIndex + 1 etc.
const dr = [-1, 1, 0, 0];
const dc = [0, 0, 1, -1];

function solve() {
  rq.push(sr);
  cq.push(sc);

  visited[sr][sc] = true;

  while (rq.length !== 0) {
    // Or cq.length
    const r = rq.shift();
    const c = cq.shift();

    if (m[r][c] === "E") {
      reachedEnd = true;
      break;
    }
    exploreNeighbours(r, c);
    nodesLeftInLayer--;
    if (nodesLeftInLayer === 0) {
      nodesLeftInLayer = nodesInNextLayer;
      nodesInNextLayer = 0;
      moveCount++;
    }
  }

  if (!reachedEnd) {
    return -1;
  }

  return moveCount;
}

function exploreNeighbours(r, c) {
  for (let i = 0; i < 4; i++) {
    const rr = r + dr[i];
    const cc = c + dc[i];

    // Skip out of bound locations
    if (rr < 0 || cc < 0 || rr >= R || cc >= C) {
      continue;
    }

    // Skip visited locations or blocked locations
    if (visited[rr][cc] || m[rr][cc] === "#") {
      continue;
    }

    rq.push(rr);
    cq.push(cc);
    visited[rr][cc] = true;
    nodesInNextLayer++;
  }
}

console.log(solve());
