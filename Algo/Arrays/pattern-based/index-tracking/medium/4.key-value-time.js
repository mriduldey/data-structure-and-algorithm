class TimeMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value, timestamp) {
    const currentValues = this.map.has(key) ? this.map.get(key) : [];
    currentValues.push([timestamp, value]);
    this.map.set(key, currentValues);
  }

  get(key, timestamp) {
    if (!this.map.has(key)) return "";

    const arr = this.map.get(key);
    let left = 0;
    let right = arr.length - 1;
    let res = "";

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);

      if (arr[mid][0] <= timestamp) {
        res = arr[mid][1];
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return res;
  }
}

const tm = new TimeMap();

tm.set("a", "a-val-1", 1);
tm.set("a", "a-val-2", 2);
tm.set("a", "a-val-5", 5);
console.log(tm);
tm.set("b", "b-val-7", 7);
tm.set("b", "b-val-9", 9);
tm.set("b", "b-val-10", 10);
console.log(tm);

console.log(tm.get("a", 2));
console.log(tm.get("a", 10));
console.log(tm.get("b", 11));
console.log(tm.get("b", 12));
