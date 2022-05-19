// max item is concedered as pivot
function findPivot(arr, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);

    // max item found when next element is smaller
    if (arr[mid] > arr[mid + 1]) {
      return mid;
    }

    // min item is found when previous item is greater |
    // previous is the max item
    if (arr[mid] < arr[mid - 1]) {
      return mid - 1;
    }

    if (arr[start] >= arr[mid]) {
      return findPivot(arr, start, mid - 1);
    }

    return findPivot(arr, mid + 1, end);
  } else {
    return -1;
  }
}

function binarySearch(arr, start, end, target) {
  console.log('start', start, 'end', end);
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    console.log('mid', mid, 'value', arr[mid]);
    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] > target) {
      end = mid - 1;
      continue;
    }

    start = mid + 1;
  }

  return -1;
}

function findTarget(arr, target) {
  const start = 0,
    end = arr.length - 1;

  const pivotIndex = findPivot(arr, start, end);

  if (pivotIndex !== -1) {
    console.log('pivot index', pivotIndex);
    if (target > arr[start]) {
      return binarySearch(arr, start, pivotIndex, target);
    }
    return binarySearch(arr, pivotIndex + 1, end, target);
  }
}

console.log(findTarget([4, 5, 6, 7, 89, 1, 2], 6));
