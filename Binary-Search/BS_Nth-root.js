// find nth root of a integer

/**
 *
 * @param {*} n 5 to the power 2 --> n = 5
 * @param {*} pow 5 to the power 2 --> pow = 2
 */
function pow(n, pow) {
  let ans = 1;
  for (let i = 1; i <= pow; i++) {
    ans *= n;
  }
  return ans;
}

/**
 *
 * @param {integer} n - root of which is needed to calculate | 5 root 2 - here n = 5
 * @param {integer} pow - 5 root 2 - here pow = 2
 */
function findNthRoot1(n, root) {
  let start = 1,
    end = n,
    mid = parseInt((start + end) / 2, 10);

  const epsilon = 1e-6;

  while (Math.abs(pow(mid, root) - n) >= epsilon) {
    if (pow(mid, root) <= n) {
      start = mid;
    } else {
      end = mid;
    }
    mid = (start + end) / 2;
  }

  return parseFloat(mid).toFixed(6);
}

console.log(1 + '    ', findNthRoot1(100, 2));

///////////////////////////
////////////////
///////
//

function findNthRoot2(n, root) {
  let start = 1,
    end = n;

  const epsilon = 1e-6;

  while (end - start > epsilon) {
    const mid = (start + end) / 2;
    if (pow(mid, root) < n) {
      start = mid;
    } else {
      end = mid;
    }
  }
  return parseInt(end, 10).toFixed(6); // upto 6 decimal
}

console.log(2 + '    ', findNthRoot2(100, 2));
