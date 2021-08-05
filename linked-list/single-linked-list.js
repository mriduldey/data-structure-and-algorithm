class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // add a new element to the last position
  add(data) {
    const node = new Node(data);

    // check if the head is empty
    if (!this.head) {
      // if yes assign the new node to head
      this.head = node;
    } else {
      // else run a loop upto the last node in the list which is not empty and assign the
      // new node to its next pointer

      let current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    // increase the size
    this.size++;
  }

  // 0 based index. So, if size = 5, last item position is 4
  insertAt(data, position) {
    if (position >= 0 && position <= this.size) {
      const node = new Node(data);

      let current = this.head;

      if (position === 0) {
        node.next = current;
        this.head = node;
      } else {
        for (let i = 0; i < position - 1; i++) {
          current = current.next;
        }
        node.next = current.next;
        current.next = node;
      }

      this.size++;
    }
  }

  removeFrom(position) {
    if (position >= 0 && position < this.size) {
      let current = this.head;
      if (position === 0) {
        this.head = current.next;
      } else {
        for (let i = 0; i < position - 1; i++) {
          current = current.next;
        }
        current.next = current.next.next;
      }
      this.size--;
    }
  }

  getList() {
    let numList = [];
    let current = this.head;

    while (current) {
      numList.push(current.data);
      current = current.next;
    }

    return numList;
  }
}

module.exports = { List, Node };
