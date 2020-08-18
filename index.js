import Calculator from "./calculator.js";

const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

let myCalculator = new Calculator(calculator, keys, display);
myCalculator.turnOn();
