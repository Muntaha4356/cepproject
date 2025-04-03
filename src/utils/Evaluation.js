import Stack from "./Stack";

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
export { evaluatePostfix };
