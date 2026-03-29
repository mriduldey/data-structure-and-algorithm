/**
 * LC 380 — Insert Delete GetRandom O(1)
1. Problem Description

Design a data structure that supports:

insert(val) → Inserts item if not present. Returns true if inserted, false otherwise.
remove(val) → Removes item if present. Returns true if removed, false otherwise.
getRandom() → Returns a random element with equal probability.

👉 All operations must run in average O(1) time.

Example
Input:
insert(1) → true
remove(2) → false
insert(2) → true
getRandom() → either 1 or 2
remove(1) → true
insert(2) → false
getRandom() → always 2
2. Intuition

Core challenge:

Array → O(1) random access
HashMap → O(1) insert/delete

👉 Combine both:

Data Structures

array (list) → store elements
map → val → index in array
Key Trick (IMPORTANT)

To delete in O(1):

Swap element with last element
Pop last
Update map
[10, 20, 30, 40]
remove(20)

swap with last:
[10, 40, 30, 20]
pop → [10, 40, 30]
3. Edge Cases (Ask Interviewer)
Duplicate inserts? → (Not allowed in LC 380)
Remove non-existing element?
getRandom on empty? (undefined / exception)
Large number of operations? memory constraints?
Random distribution strictly uniform?
 */

class RandomizedSet {
  constructor() {
    this.map = new Map();
    this.list = [];
  }

  size() {
    return this.list.length;
  }

  insert(val) {
    if (this.map.has(val)) return false;

    this.list.push(val);
    this.map.set(val, this.size() - 1);
    return true;
  }

  remove(val) {
    if (!this.map.has(val)) return false;

    const index = this.map.get(val);
    const lastVal = this.list[this.size() - 1];

    //swap
    this.list[index] = lastVal;
    this.map.set(lastVal, index);

    // Remove last
    this.list.pop();
    this.map.delete(val);

    return true;
  }

  getRandom() {
    const randIndex = Math.floor(Math.random() * this.size());
    return this.list[randIndex];
  }
}

const nums = new RandomizedSet();

nums.insert(1);
console.log(nums.list);

nums.insert(3);
console.log(nums.list);

nums.insert(4);
console.log(nums.list);

nums.remove(5);
console.log(nums.list);

nums.remove(3);
console.log(nums.list);
console.log(nums.getRandom());
