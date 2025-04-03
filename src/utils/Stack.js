class Stack {
  constructor(size = 0) {
    this.capacity = size;
    this.top = 0;
    this.arr = new Array(this.capacity);
  }

  push(value) {
    if (!this.isFull()) {
      this.arr[this.top++] = value;
    } else {
      console.log("Stack Overflow!");
    }
  }

  pop() {
    if (!this.isEmpty()) {
      return this.arr[--this.top];
    } else {
      console.log("Stack Underflow!");
      return null;
    }
  }

  isEmpty() {
    return this.top <= 0;
  }

  isFull() {
    return this.top === this.capacity;
  }

  peek() {
    if (!this.isEmpty()) {
      return this.arr[this.top - 1];
    }
    console.log("Stack is empty!");
    return null;
  }
}
export default Stack;
