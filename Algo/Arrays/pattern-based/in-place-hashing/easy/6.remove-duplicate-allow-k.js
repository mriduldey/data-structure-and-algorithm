// Allowing k of the duplicates remove remaining duplicates ( for description check 5)

function removeDuplicates(nums, k) {
  const n = nums.length;

  if (k === 0) return 0;
  if (k <= 0) return null;
  if (n <= k) return n;

  insertPos = k;

  for (let i = 0; i < n; i++) {
    if (nums[i] !== nums[insertPos - k]) {
      nums[insertPos++] = nums[i];
    }
  }
  
  return insertPos;
}

console.log(
  removeDuplicates(
    [1, 1, 2, 2, 2, 2, 3, 3, 4, 5, 6, 7, 7, 7, 7, 7, 7, 7, 8],
    0,
  ),
);
