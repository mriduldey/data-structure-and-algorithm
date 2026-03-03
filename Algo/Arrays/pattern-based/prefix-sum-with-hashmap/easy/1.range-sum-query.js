/**
 * LC 303 — Range Sum Query (Immutable)
1️⃣ Problem Description

You are given an integer array nums.

Implement a class:

NumArray(nums)
sumRange(left, right)

sumRange(left, right) returns the sum of elements from index left to right (inclusive).

Example
Input:
nums = [-2, 0, 3, -5, 2, -1]

sumRange(0,2) → (-2 + 0 + 3) = 1
sumRange(2,5) → (3 + -5 + 2 + -1) = -1
sumRange(0,5) → (-2 + 0 + 3 + -5 + 2 + -1) = -3

If we compute directly each time → O(n) per query.
But the problem expects multiple queries, so we must optimize.
 */

class NumArray {
  constructor(nums) {
    if (!Array.isArray(nums)) {
      throw Error("Not array.");
    }

    this.n = nums.length;
    this.prefix = new Array(this.n + 1).fill(0);

    for (let i = 0; i < this.n; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  sumRange(left, right) {
    if (
      left < 0 ||
      right < 0 ||
      left >= this.n ||
      right >= this.n ||
      left > right
    ) {
      throw Error("Wrong query index.");
    }
    const sum = this.prefix[right + 1] - this.prefix[left];
    return sum;
  }
}

const numArr = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArr.sumRange(0, 1));
console.log(numArr.sumRange(0, 2));
console.log(numArr.sumRange(0, 3));
console.log(numArr.sumRange(3, 5));
