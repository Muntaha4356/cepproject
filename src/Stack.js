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

function definePrecedence(operand) {
  if (operand === "/" || operand === "*") {
    return 2;
  } else if (operand === "+" || operand === "-") {
    return 1;
  }
  return -1;
}

function isAlphaNumeric(ch) {
  return /[a-z0-9]/i.test(ch);
}

function convertToPostfix(expression) {
  let s = new Stack(expression.length);
  let postfixExpression = "";
  let length = expression.length;

  for (let i = 0; i < length; i++) {
    if (isAlphaNumeric(expression[i])) {
      while (i < length && isAlphaNumeric(expression[i])) {
        postfixExpression += expression[i];
        i++;
      }
      postfixExpression += ":";
      i--;
    } else if (expression[i] === "(") {
      s.push("(");
    } else if (expression[i] === ")") {
      while (s.peek() !== "(") {
        postfixExpression += s.pop();
      }
      s.pop();
    } else {
      if (
        s.isEmpty() ||
        definePrecedence(s.peek()) < definePrecedence(expression[i])
      ) {
        s.push(expression[i]);
      } else {
        while (
          !s.isEmpty() &&
          definePrecedence(s.peek()) >= definePrecedence(expression[i])
        ) {
          postfixExpression += s.pop();
        }
        s.push(expression[i]);
      }
    }
  }

  while (!s.isEmpty()) {
    postfixExpression += s.pop();
  }

  console.log(postfixExpression);
  return postfixExpression;
}

function evaluatePostfix(expression) {
  let s = new Stack(expression.length);
  let constExpression = "";

  for (let i = 0; i < expression.length; i++) {
    if (/[a-z]/i.test(expression[i])) {
      let num = prompt(`Please enter value of the variable ${expression[i]}`);
      constExpression += num;
    } else {
      constExpression += expression[i];
    }
  }

  console.log("This is the constant expression:");
  console.log(constExpression);

  for (let i = 0; i < constExpression.length; i++) {
    if (/\d/.test(constExpression[i])) {
      let num = "";
      while (constExpression[i] !== ":" && /\d/.test(constExpression[i])) {
        num += constExpression[i];
        i++;
      }
      s.push(parseInt(num));
    } else {
      let B = s.pop();
      let A = s.pop();
      let op = constExpression[i];
      let num;

      switch (op) {
        case "+":
          num = A + B;
          break;
        case "-":
          num = A - B;
          break;
        case "*":
          num = A * B;
          break;
        case "/":
          num = A / B;
          break;
      }

      s.push(num);
    }
  }

  return s.pop();
}

// Example usage
let result = evaluatePostfix(convertToPostfix("6+8-2"));
console.log("Final Result:", result);
