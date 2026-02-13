function binarySearchRotated (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while(left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if(nums[mid] === target) return mid;

    if(nums[left] <= nums[mid]) {
      // Left half sorted
      if(nums[left] <= target && target <= nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half sorted
      if(nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

console.log(binarySearchRotated([0, 2, 4, 7, 8, 10, 23], 23));