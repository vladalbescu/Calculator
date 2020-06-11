// DOM Selection
let displayValue = "";
let calculatorDisplay = document.querySelector(".display");
let buttons = document.querySelectorAll(".btn--number, .btn--operation");
let equalButton = document.querySelector(".btn--equal");
let clearButton = document.querySelector(".btn--clear");

// Adding Event Listeners

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    addToDisplayValue(e.target.innerText);
  });
});

equalButton.addEventListener("click", () => {
  calculate();
});

clearButton.addEventListener("click", () => {
  clearDisplay();
});

document.addEventListener("keydown", (e) => {
  let pressedKey = e.key;

  if (pressedKey === "*") {
    pressedKey = "×";
  }
  if (pressedKey === "/") {
    pressedKey = "÷";
  }

  if (pressedKey === "=" || pressedKey === "Enter") {
    calculate();
  } else if (pressedKey === "Backspace" || pressedKey.toLowerCase() == "c") {
    clearDisplay();
  } else if (isOperator(pressedKey) || isNumber(pressedKey)) {
    addToDisplayValue(pressedKey);
  }
});

// Functions

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

function operate(operation, x, y) {
  switch (operation) {
    case "×":
      return multiply(x, y);
    case "÷":
      return divide(x, y);
    case "+":
      return add(x, y);
    case "-":
      return substract(x, y);
  }
}

function changeDisplay(str) {
  calculatorDisplay.innerHTML = str;
}

function addToDisplayValue(str) {
  if (
    isOperator(str) &&
    (displayValue.slice(-2, -1) === "+" ||
      displayValue.slice(-2, -1) === "-" ||
      displayValue.slice(-2, -1) === "×" ||
      displayValue.slice(-2, -1) === "÷")
  ) {
    displayValue = displayValue.slice(0, -2) + addSpacesAround(str);
  } else if (isOperator(str)) {
    displayValue = displayValue + addSpacesAround(str);
  } else {
    displayValue = displayValue + str;
  }

  changeDisplay(displayValue);
}

function calculate() {
  let splitedValue = displayValue.split(" ");
  splitedValue = turnStringNumbersToInts(splitedValue);

  // Multiplication and Division Pass
  splitedValue = calculatePass("×", "÷", splitedValue);

  // Addition and Substraction Pass
  splitedValue = calculatePass("+", "-", splitedValue);

  displayValue = splitedValue[0].toString();
  changeDisplay(splitedValue[0]);
}

function calculatePass(operation1, operation2, arr) {
  for (let i = 1; i <= arr.length - 2; i++) {
    if (arr[i] === operation1 || arr[i] === operation2) {
      let valuesBefore = arr.slice(0, i - 1);
      let valuesAfter = arr.slice(i + 2);

      let result = [];
      if (arr[i] === operation1) {
        result[0] = operate(operation1, arr[i - 1], arr[i + 1]);
      } else if (arr[i] === operation2) {
        result[0] = operate(operation2, arr[i - 1], arr[i + 1]);
      }

      arr = [...valuesBefore, ...result, ...valuesAfter];
      i = i - 2;
    }
  }
  return arr;
}

function turnStringNumbersToInts(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (!isOperator(arr[i])) {
      arr[i] = parseFloat(arr[i]);
    }
  }
  return arr;
}

function addSpacesAround(str) {
  return " " + str + " ";
}

function isOperator(str) {
  return str === "×" || str === "÷" || str === "+" || str === "-";
}

function isNumber(str) {
  return str >= "0" && str <= "9";
}

function clearDisplay() {
  displayValue = "";
  changeDisplay(displayValue);
}
