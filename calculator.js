export default class Calculator {
  constructor() {
    this.calculator = document.querySelector(".calculator");
    this.keys = this.calculator.querySelector(".calculator__keys");
    this.display = this.calculator.querySelector(".calculator__display");
  }

  build() {
    // add an event listener to the calculator element
    this.keys.addEventListener("click", (e) => {
      if (e.target.matches("button")) {
        // a calculator button was clicked. Perform action
        this.buttonClicked(e.target);
      }
    });
  }

  buttonClicked(target) {
    // get the button clicked
    const key = target;

    // get the data-action value of the button (if there is one: clear / divide / multiply / subtract / add / calculate)
    const action = key.dataset.action;

    // get the value of the button clicked
    const keyContent = key.textContent;

    // get the value of the display element
    const displayedNum = this.display.textContent;

    // get the type of the previous button clicked
    const previousKeyType = this.calculator.dataset.previousKeyType;

    // perform action if button clicked is a numeral 0 - 9
    if (!action) {
      this.numberInput(keyContent, displayedNum, previousKeyType);
    }

    // perform action negative / positive toggle if clicked
    if (action === "negative") {
      // if displayed number is negative, change to positive
      if (displayedNum < 0) {
        this.display.textContent = Math.abs(displayedNum);
      } else {
        // if displayed number is positive, change to negative
        this.display.textContent = -Math.abs(displayedNum);
      }
    }

    // change number to percentage if percentage button is clicked
    if (action === "percentage") {
      this.display.textContent = displayedNum * 0.01;
    }

    // perform action if button clicked is a decimal point
    if (action === "decimal") {
      this.decimalInput(displayedNum, previousKeyType);
    }

    // perform action if button clicked is an operator (plus / minus / multiply / divide)
    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      this.operatorInput(displayedNum, previousKeyType, action);
    }

    // perform action if button clicked is clear
    if (action === "clear") {
      this.clearInput(key);
    }

    // if button clicked was not clear, change "AC" to "CE" ("clear all to clear current")
    if (action !== "clear") {
      const clearButton = this.calculator.querySelector("[data-action=clear]");
      clearButton.textContent = "CE";
    }

    // perform calculation if button clicked is equals
    if (action === "calculate") {
      this.equalsInput(displayedNum, previousKeyType);
    }
  }

  // function that deals with the click of a number button
  numberInput(keyContent, displayedNum, previousKeyType) {
    if (
      displayedNum === "0" ||
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      // display button value directly on screen if it is the first number (i.e. display is zero)
      // or the previous button clicked was an operator or equals
      this.display.textContent = keyContent;
    } else {
      // concatenate the button value onto the displayed number string if previous button clicked was also a number
      this.display.textContent = displayedNum + keyContent;
    }
    this.calculator.dataset.previousKeyType = "number";
  }

  // function that deals with the click of the decimal button
  decimalInput(displayedNum, previousKeyType) {
    if (!displayedNum.includes(".")) {
      // only add a decimal point to the display string if it hasn't been added already
      this.display.textContent = displayedNum + ".";
    } else if (
      previousKeyType === "operator" ||
      previousKeyType === "calculate"
    ) {
      // display "0." if the previous button clicked wasn't a number (e.g. operator button)
      this.display.textContent = "0.";
    }
    this.calculator.dataset.previousKeyType = "decimal";
  }

  // function that deals with the click of an operator button (+/-/x/÷).
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
      // perform a calculation if a previous value ("value one") and operator have already been pressed & stored,
      // and if the previous button clicked ("value two") wasn't already an operator or equals button
      const calcValue = this.calculate(firstValue, operator, secondValue);

      // display the calculation result
      this.display.textContent = calcValue;

      // set "value one" to the calculation result
      this.calculator.dataset.firstValue = calcValue;
    } else {
      // first value ("value one") does not exist yet. Save the displayed value into "value one" holder.
      this.calculator.dataset.firstValue = displayedNum;
    }

    this.calculator.dataset.previousKeyType = "operator";
    // store the operator type into the "operator" holder
    this.calculator.dataset.operator = action;
  }

  // function that deals with the click of the clear (AC / CE) button
  clearInput(key) {
    if (key.textContent === "AC") {
      // "AC" was clicked, clear all stored values
      this.calculator.dataset.firstValue = "";
      this.calculator.dataset.operator = "";
      this.calculator.dataset.previousKeyType = "";
    } else {
      // change "CE" (clear current) to "AC" (clear all stored)
      key.textContent = "AC";
    }
    // clear the current display ("CE")
    this.display.textContent = 0;
    this.calculator.dataset.previousKeyType = "clear";
  }

  // function that deals with the click of the equals (=) button
  equalsInput(displayedNum, previousKeyType) {
    let firstValue = this.calculator.dataset.firstValue;
    const operator = this.calculator.dataset.operator;
    let secondValue = displayedNum;

    // check to see if first value ("value one") exists.
    // get first value from the first value store and second value from the screen
    // get operator type from the operator store

    if (firstValue) {
      // only perform a calculation if previous button pressed wasn't already an equals button

      if (previousKeyType !== "calculate") {
        this.display.textContent = this.calculate(
          firstValue,
          operator,
          secondValue
        );
      }
    }
    this.calculator.dataset.previousKeyType = "calculate";
  }

  // function to perform calculation, takes two values & operator as input and returns the calculated value
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
      // throw new Error("Invalid operator");
    }
  }
}
