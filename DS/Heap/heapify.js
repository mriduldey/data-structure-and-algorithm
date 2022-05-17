function heapify(a, len, index) {
  let largest = index;
  const left = index * 2 + 1;
  const right = left + 1;

  if (left < len && a[left] > a[largest]) {
    largest = left;
  }

  if (right < len && a[right] > a[largest]) {
    largest = right;
  }

  if (largest !== index) {
    [a[largest], a[index]] = [a[index], a[largest]];
    heapify(a, len, largest);
  }
}

function buildHeap(a) {
  const len = a.length;

  for (let i = Math.floor((len - 1) / 2); i >= 0; i--) {
    heapify(a, len, i);
  }
}

const arr1 = [90000, 299, 32, 677, 0, 0, 235, 5678, 78, 100000];
buildHeap(arr1);
console.log(arr1);
