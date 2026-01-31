/**
 * Quick sort algorithm
 */

function quickSort(arr, low, high) {
    if (low >= high) {
        return;
    }

    const pivotIndex = partition(arr, low, high);

    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}

function partition(arr, low, high) {
    const pivot = arr[low];
    let left = low + 1, right = high;

    while (right >= left) {
        while (left <= right && arr[left] < pivot) {
            left++;
        }

        while (left <= right && arr[right] > pivot) {
            right--;
        }
        if (right >= left) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }

    }

    [arr[low], arr[right]] = [arr[right], arr[low]];

    return right; // partitioning point
}

const arr = [1, 3, 2, 67, 23];
quickSort(arr, 0, arr.length - 1)
console.log(arr);