let displayValue = "";
let calculatorDisplay = document.querySelector(".display");
let buttons = document.querySelectorAll(".btn--number, .btn--operation");
let equalButton = document.querySelector(".btn--equal");
let clearButton = document.querySelector(".btn--clear");

function add(x, y) {
  return x + y;
}
function substract(x, y) {
  return x - y;
}
function multiply(x, y) {
  return x * y;
}
function divide(x, y) {
  return x / y;
}

buttons.forEach((button) => {
  button.addEventListener("click", addToDisplayValue);
});

equalButton.addEventListener("click", () => {
  calculate();
});

clearButton.addEventListener("click", () => {
  displayValue = "";
  changeDisplay(displayValue);
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      displayValue += e.key;
      changeDisplay(displayValue);
      break;
    case "-":
    case "+":
    case "*":
    case "%":
      displayValue = displayValue + " " + e.key;
      changeDisplay(displayValue);
      break;

    case "=":
      calculate();
      break;
  }
});

function changeDisplay(str) {
  calculatorDisplay.innerHTML = str;
}

function addToDisplayValue(e) {
  if (
    e.target.classList.contains("btn--operation") &&
    (displayValue.slice(-2, -1) === "+" ||
      displayValue.slice(-2, -1) === "-" ||
      displayValue.slice(-2, -1) === "×" ||
      displayValue.slice(-2, -1) === "÷")
  ) {
    displayValue = displayValue.slice(0, -2) + " " + e.target.innerText + " ";
  } else if (e.target.classList.contains("btn--operation")) {
    displayValue = displayValue + " " + e.target.innerText + " ";
  } else {
    displayValue = displayValue + e.target.innerText;
  }

  changeDisplay(displayValue);
}

function calculate() {
  let splitedValue = displayValue.split(" ");

  // Multiplication and Division Pass
  for (let i = 1; i <= splitedValue.length - 2; i++) {
    if (splitedValue[i] === "×" || splitedValue[i] === "÷") {
      let valuesBefore = splitedValue.slice(0, i - 1);
      let valuesAfter = splitedValue.slice(i + 2);

      let result = [];
      if (splitedValue[i] === "×") {
        result[0] = multiply(
          parseInt(splitedValue[i - 1]),
          parseInt(splitedValue[i + 1])
        );
        console.log(result);
      } else if (splitedValue[i] === "÷") {
        result[0] = divide(
          parseInt(splitedValue[i - 1]),
          parseInt(splitedValue[i + 1])
        );
        console.log(result);
      }

      splitedValue = [...valuesBefore, ...result, ...valuesAfter];
      console.log(splitedValue);
      i = i - 2;
    }
  }

  // Addition and Substraction Pass
  for (let i = 1; i <= splitedValue.length - 2; i++) {
    if (splitedValue[i] === "+" || splitedValue[i] === "-") {
      let valuesBefore = splitedValue.slice(0, i - 1);
      let valuesAfter = splitedValue.slice(i + 2);

      let result = [];
      if (splitedValue[i] === "+") {
        result[0] = add(
          parseInt(splitedValue[i - 1]),
          parseInt(splitedValue[i + 1])
        );
        console.log(result);
      } else if (splitedValue[i] === "-") {
        result[0] = substract(
          parseInt(splitedValue[i - 1]),
          parseInt(splitedValue[i + 1])
        );
        console.log(result);
      }

      splitedValue = [...valuesBefore, ...result, ...valuesAfter];
      console.log(splitedValue);
      i = i - 2;
    }
  }
  displayValue = "";
  changeDisplay(splitedValue[0]);
}
