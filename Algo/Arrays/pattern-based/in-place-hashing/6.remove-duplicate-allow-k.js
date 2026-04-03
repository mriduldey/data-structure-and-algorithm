// Allowing k of the duplicates remove remaining duplicates ( for description check 5)

function removeDuplicates(nums, k) {
  const n = nums.length;

  if (n <= k) return n;

  insertPos = k;

  for (let i = 0; i < n; i++) {
    if (nums[i] !== nums[insertPos - k]) {
      nums[insertPos++] = nums[i];
    }
  }
  console.log(nums);
  return insertPos;
}

console.log(
  removeDuplicates([1, 1, 2, 2, 2, 2, 3, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 8], 2),
);
