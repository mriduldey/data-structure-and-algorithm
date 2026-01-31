/**
 * Merge Sorting algorithm
 */

function mergeSort(arr, low, high) {
    if(low >= high) {
        return;
    }

    const mid = Math.floor((low + high) / 2);
    mergeSort(arr, low, mid);
    mergeSort(arr, mid + 1, high);

    merge(arr, low, mid, high);
}

function merge(arr, low, mid, high) {
    const mergedArr = [];
    let left = low, right = mid + 1;

    while(left <= mid && right <= high) {
        if(arr[left] <= arr[right]) {
            mergedArr.push(arr[left++]);
        } else {
            mergedArr.push(arr[right++]);
        }
    }

    while(left <= mid) {
        mergedArr.push(arr[left++]);
    }

    while(right <= high) {
        mergedArr.push(arr[right++]);
    }

    for(let i = low; i <= high; i++) {
        arr[i] = mergedArr[i - low];
    }
}

const arr = [1, 3, 2, 67, 23];
mergeSort(arr, 0, arr.length - 1)
console.log(arr);