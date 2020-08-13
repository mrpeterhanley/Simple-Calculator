class Calculator {
  constructor() {
    this.calculator = document.querySelector(".calculator");
    this.keys = this.calculator.querySelector(".calculator__keys");
    this.display = this.calculator.querySelector(".calculator__display");
  }

  build() {
    // add an event listener to the calculator element
    this.keys.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        //calculator button clicked. Perform action
        this.buttonClicked(e.target);
      }
    });
  }

  clearInput(key) {
    if (key.textContent === "AC") {
      // reset all stored values
      this.calculator.dataset.firstValue = "";
      this.calculator.dataset.modValue = "";
      this.calculator.dataset.operator = "";
      this.calculator.dataset.previousKeyType = "";
    } else {
      // change "CE" (clear current) to "AC" (clear all stored)
      key.textContent = "AC";
    }

    this.display.textContent = 0;
    this.calculator.dataset.previousKeyType = "clear";
  }

  buttonClicked(target) {
    // get the button clicked
    const key = target;

    // remove all "depressed" class from button elements
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    // get the data-action value of the button (if there is one)
    const action = key.dataset.action;

    // get the value of the button clicked
    const keyContent = key.textContent;

    // get the value of the display element
    const displayedNum = this.display.textContent;

    // get the type of the previous button clicked
    const previousKeyType = this.calculator.dataset.previousKeyType;

    // if button clicked is a numeral 0 - 9
    if (!action) {
      this.numberInput(keyContent, displayedNum, previousKeyType);
    }

    // if button clicked is a decimal point
    if (action === "decimal") {
      this.decimalInput(displayedNum, previousKeyType);
    }

    // if button clicked is an operator (plus / minus / multiply / divide)
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      this.operatorInput(displayedNum, previousKeyType, action);

      key.classList.add("is-depressed");
    }

    // if button clicked is clear
    if (action === "clear") {
      this.clearInput(key);
    }

    // if button clicked is not clear, change "AC" to "CE"
    if (action !== "clear") {
      const clearButton = this.calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    // if button clicked is equals, perform calculation
    if (action === "calculate") {
      this.equalsInput(displayedNum, previousKeyType);
    }
  }

  numberInput(keyContent, displayedNum, previousKeyType) {
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      // display button value directly if it is the first number (i.e. display is zero)
      // or the previous button clicked was an operator or equals
      this.display.textContent = keyContent;
    } else {
      // concatenate the button value onto the displayed number string
      this.display.textContent = displayedNum + keyContent;
    }
    this.calculator.dataset.previousKeyType = "number";
  }

  decimalInput(displayedNum, previousKeyType) {
    if (!displayedNum.includes(".")) {
      // only add a decimal point to the display string if it hasn't been added already
      this.display.textContent = displayedNum + ".";
    } else if (
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      // display "0." if the previous button clicked wasn't a number
      this.display.textContent = "0.";
    }
    this.calculator.dataset.previousKeyType = "decimal";
  }

  operatorInput(displayedNum, previousKeyType, action) {
    const firstValue = this.calculator.dataset.firstValue;
    const operator = this.calculator.dataset.operator;
    const secondValue = displayedNum;

    if (
      firstValue &&
      operator &&
      previousKeyType !== "operator" &&
      previousKeyType !== "calculate"
    ) {
      // perform a calculation if a previous value and operator exist
      const calcValue = this.calculate(firstValue, operator, secondValue);

      // display the calculation result
      this.display.textContent = calcValue;

      // set the previous value to the calculation result
      this.calculator.dataset.firstValue = calcValue;
    } else {
      this.calculator.dataset.firstValue = displayedNum;
    }

    this.calculator.dataset.previousKeyType = "operator";
    this.calculator.dataset.operator = action;
  }

  equalsInput(displayedNum, previousKeyType) {
    let firstValue = this.calculator.dataset.firstValue;
    const operator = this.calculator.dataset.operator;
    let secondValue = displayedNum;

    if (firstValue) {
      if (previousKeyType === "calculate") {
        firstValue = displayedNum;
        secondValue = this.calculator.dataset.modValue;
      }

      this.display.textContent = this.calculate(
        firstValue,
        operator,
        secondValue
      );
    }

    // Set modValue attribute
    this.calculator.dataset.modValue = secondValue;
    this.calculator.dataset.previousKeyType = "calculate";
  }

  calculate(n1, operator, n2) {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);

    switch (operator) {
      case "add":
        return firstNum + secondNum;
      case "subtract":
        return firstNum - secondNum;
      case "multiply":
        return firstNum * secondNum;
      case "divide":
        return firstNum / secondNum;
      default:
        console.log("Calculate failed");
    }
  }
}

myCalculator = new Calculator();

myCalculator.build();
