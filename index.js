import Calculator from "./calculator.js";

const calculator = document.querySelector(".calculator");
const keys = this.calculator.querySelector(".calculator__keys");
const display = this.calculator.querySelector(".calculator__display");

let myCalculator = new Calculator(calculator, keys, display);
myCalculator.turnOn();
