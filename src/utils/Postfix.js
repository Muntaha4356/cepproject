import Stack from "./Stack";
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
export { convertToPostfix };
