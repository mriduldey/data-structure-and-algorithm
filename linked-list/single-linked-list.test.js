const { List, Node } = require("./single-linked-list");

describe("Node class", () => {
  let node = new Node(5);
  it("should have the data value equal to the value passed through Node", () => {
    expect(node.data).toBe(5);
  });

  it("should have null value by default as next parameter", () => {
    expect(node.next).toBeNull();
  });
});




