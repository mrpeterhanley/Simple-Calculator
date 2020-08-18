import Calculator from "./calculator.js";

describe("Test calculate function", function () {
  let myCalculator;
  let operator;

  beforeAll(function () {
    myCalculator = new Calculator();
  });

  it("should be able to handle numbers as strings", function () {
    expect(myCalculator.calculate("1", "add", "1")).toBeTruthy();
  });

  it("should be able to add two positive integers", function () {
    operator = "add";
    expect(myCalculator.calculate(1, operator, 1)).toBe(2);
  });

  it("should be able to add two positive floating point numbers", function () {
    operator = "add";
    expect(myCalculator.calculate(0.2, operator, 0.2)).toBe(0.4);
  });

  it("should be able to add two negative integers", function () {
    operator = "add";
    expect(myCalculator.calculate(-3, operator, -3)).toBe(-6);
  });

  it("should be able to add two negative floating point numbers", function () {
    operator = "add";
    expect(myCalculator.calculate(-0.3, operator, -0.3)).toBe(-0.6);
  });

  it("should be able to subtract two positive integers for a positive result", function () {
    operator = "subtract";
    expect(myCalculator.calculate(5, operator, 2)).toBe(3);
  });

  it("should be able to subtract two positive integers for a negative result", function () {
    operator = "subtract";
    expect(myCalculator.calculate(2, operator, 5)).toBe(-3);
  });

  it("should be able to subtract two positive floating point for a positive result", function () {
    operator = "subtract";
    expect(myCalculator.calculate(0.5, operator, 0.2)).toBe(0.3);
  });

  it("should be able to subtract two positive floating point for a negative result", function () {
    operator = "subtract";
    expect(myCalculator.calculate(0.2, operator, 0.5)).toBe(-0.3);
  });

  it("should be able to multipy two positive integers", function () {
    operator = "multiply";
    expect(myCalculator.calculate(4, operator, 4)).toBe(16);
  });

  it("should be able to multipy two negative integers", function () {
    operator = "multiply";
    expect(myCalculator.calculate(-4, operator, -4)).toBe(16);
  });

  it("should be able to multipy two positive floating point numbers", function () {
    operator = "multiply";
    expect(myCalculator.calculate(0.3, operator, 0.3)).toBe(0.09);
  });

  it("should be able to multipy two negative floating point numbers", function () {
    operator = "multiply";
    expect(myCalculator.calculate(-0.3, operator, -0.3)).toBe(0.09);
  });

  it("should be able to divide two positive integers", function () {
    operator = "divide";
    expect(myCalculator.calculate(4, operator, 2)).toBe(2);
  });

  it("should be able to divide two positive floating point numbers", function () {
    operator = "divide";
    expect(myCalculator.calculate(0.8, operator, 0.2)).toBe(4);
  });

  // it("should console log an error if operator is not valid", function () {
  //   expect(myCalculator.calculate("1", "hello", "1")).toThrowError();
  // });
});
