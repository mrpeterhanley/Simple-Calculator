import Calculator from "./calculator.js";

describe("Test calculate function", function () {
  let myCalculator;

  beforeAll(function () {
    let calculator = document.createElement("div");
    let display = document.createElement("div");
    let keys = document.createElement("div");
    myCalculator = new Calculator(calculator, keys, display);
  });

  it("should be able to handle numbers as strings", function () {
    expect(myCalculator.calculate("1", "add", "1")).toBeTruthy();
  });

  it("should be able to add two positive integers", function () {
    expect(myCalculator.calculate(1, "add", 1)).toBe(2);
  });

  it("should be able to add two positive floating point numbers", function () {
    expect(myCalculator.calculate(0.2, "add", 0.2)).toBe(0.4);
  });

  it("should be able to add two negative integers", function () {
    expect(myCalculator.calculate(-3, "add", -3)).toBe(-6);
  });

  it("should be able to add two negative floating point numbers", function () {
    expect(myCalculator.calculate(-0.3, "add", -0.3)).toBe(-0.6);
  });

  it("should be able to subtract two positive integers for a positive result", function () {
    expect(myCalculator.calculate(5, "subtract", 2)).toBe(3);
  });

  it("should be able to subtract two positive integers for a negative result", function () {
    expect(myCalculator.calculate(2, "subtract", 5)).toBe(-3);
  });

  it("should be able to subtract two positive floating point for a positive result", function () {
    expect(myCalculator.calculate(0.5, "subtract", 0.2)).toBe(0.3);
  });

  it("should be able to subtract two positive floating point for a negative result", function () {
    expect(myCalculator.calculate(0.2, "subtract", 0.5)).toBe(-0.3);
  });

  it("should be able to multipy two positive integers", function () {
    expect(myCalculator.calculate(4, "multiply", 4)).toBe(16);
  });

  it("should be able to multipy two negative integers", function () {
    expect(myCalculator.calculate(-4, "multiply", -4)).toBe(16);
  });

  it("should be able to multipy two positive floating point numbers", function () {
    expect(myCalculator.calculate(0.3, "multiply", 0.3)).toBe(0.09);
  });

  it("should be able to multipy two negative floating point numbers", function () {
    expect(myCalculator.calculate(-0.3, "multiply", -0.3)).toBe(0.09);
  });

  it("should be able to divide two positive integers", function () {
    expect(myCalculator.calculate(4, "divide", 2)).toBe(2);
  });

  it("should be able to divide two positive floating point numbers", function () {
    expect(myCalculator.calculate(0.8, "divide", 0.2)).toBe(4);
  });

  // it("should console log an error if operator is not valid", function () {
  //   expect(myCalculator.calculate("1", "hello", "1")).toThrowError();
  // });
});

describe("Test number input", function () {
  let myCalculator;

  beforeEach(function () {
    let calculator = document.createElement("div");
    let display = document.createElement("div");
    let keys = document.createElement("div");
    myCalculator = new Calculator(calculator, keys, display);
  });

  it("should update the display value with the number pressed when the current number displayed is zero, & set previous key type to number", function () {
    myCalculator.calculator.dataset.previousKeyType = "operator";
    // numberInput(keyContent, displayedNum, previousKeyType)
    myCalculator.numberInput(
      "5",
      "0",
      myCalculator.calculator.dataset.previousKeyType
    );
    expect(myCalculator.display.textContent).toBe("5");
    expect(myCalculator.calculator.dataset.previousKeyType).toBe("number");
  });

  it("should add onto the display value with a number pressed when the current number displayed is not zero and previous key type was a number", function () {
    myCalculator.calculator.dataset.previousKeyType = "number";
    // numberInput(keyContent, displayedNum, previousKeyType)
    myCalculator.numberInput(
      "5",
      "5",
      myCalculator.calculator.dataset.previousKeyType
    );
    expect(myCalculator.display.textContent).toBe("55");
    expect(myCalculator.calculator.dataset.previousKeyType).toBe("number");
  });

  it("should replace display value with a number pressed when the current number displayed is not zero but the previous key type was not number", function () {
    myCalculator.calculator.dataset.previousKeyType = "operator";
    // numberInput(keyContent, displayedNum, previousKeyType)
    myCalculator.numberInput(
      "2",
      "2",
      myCalculator.calculator.dataset.previousKeyType
    );
    expect(myCalculator.display.textContent).toBe("2");
    expect(myCalculator.calculator.dataset.previousKeyType).toBe("number");
  });
});

describe("Test decimal input", function () {
  let myCalculator;

  beforeEach(function () {
    let calculator = document.createElement("div");
    let display = document.createElement("div");
    let keys = document.createElement("div");
    myCalculator = new Calculator(calculator, keys, display);
  });

  it("adds a decimal point to the current number displayed", function () {
    myCalculator.display.textContent = "5";
    // decimalInput(displayedNum, previousKeyType)
    myCalculator.decimalInput(myCalculator.display.textContent, "");
    expect(myCalculator.display.textContent).toBe("5.");
  });

  it("does not add a decimal point if the current number displayed already contains one", function () {
    myCalculator.display.textContent = "5.2";
    // decimalInput(displayedNum, previousKeyType)
    myCalculator.decimalInput(myCalculator.display.textContent, "");
    expect(myCalculator.display.textContent).toBe("5.2");
  });

  it(`replaces the displayed number with "0." if the previous button pressed was an operator`, function () {
    myCalculator.display.textContent = "5.2";
    // decimalInput(displayedNum, previousKeyType)
    myCalculator.decimalInput(myCalculator.display.textContent, "operator");
    expect(myCalculator.display.textContent).toBe("0.");
  });

  it(`replaces the displayed number with "0." if the previous button pressed was equals`, function () {
    myCalculator.display.textContent = "5.2";
    // decimalInput(displayedNum, previousKeyType)
    myCalculator.decimalInput(myCalculator.display.textContent, "calculate");
    expect(myCalculator.display.textContent).toBe("0.");
  });
});

describe("Test equals (calculate) input", function () {
  let myCalculator;

  beforeEach(function () {
    let calculator = document.createElement("div");
    let display = document.createElement("div");
    let keys = document.createElement("div");
    myCalculator = new Calculator(calculator, keys, display);
  });

  it("performs an addition and displays it correctly", function () {
    myCalculator.calculator.dataset.firstValue = "5";
    myCalculator.calculator.dataset.operator = "add";
    myCalculator.display.textContent = "5";
    // equalsInput(displayedNum, previousKeyType)
    myCalculator.equalsInput(myCalculator.display.textContent, "");
    expect(myCalculator.display.textContent).toBe("10");
  });

  it("performs a subtraction and displays it correctly", function () {
    myCalculator.calculator.dataset.firstValue = "20";
    myCalculator.calculator.dataset.operator = "subtract";
    myCalculator.display.textContent = "5";
    // equalsInput(displayedNum, previousKeyType)
    myCalculator.equalsInput(myCalculator.display.textContent, "");
    expect(myCalculator.display.textContent).toBe("15");
  });

  it("performs a multiplication and displays it correctly", function () {
    myCalculator.calculator.dataset.firstValue = "20";
    myCalculator.calculator.dataset.operator = "multiply";
    myCalculator.display.textContent = "5";
    // equalsInput(displayedNum, previousKeyType)
    myCalculator.equalsInput(myCalculator.display.textContent, "");
    expect(myCalculator.display.textContent).toBe("100");
  });

  it("performs a division and displays it correctly", function () {
    myCalculator.calculator.dataset.firstValue = "20";
    myCalculator.calculator.dataset.operator = "divide";
    myCalculator.display.textContent = "5";
    // equalsInput(displayedNum, previousKeyType)
    myCalculator.equalsInput(myCalculator.display.textContent, "");
    expect(myCalculator.display.textContent).toBe("4");
  });
});

describe("Test clear input", function () {
  let myCalculator;

  beforeEach(function () {
    let calculator = document.createElement("div");
    let display = document.createElement("div");
    let keys = document.createElement("div");
    myCalculator = new Calculator(calculator, keys, display);
  });

  it(`clears display and all stored values, set previous key to "clear" if "AC" is pressed`, function () {
    let key = document.createElement("button");
    key.textContent = "AC";

    myCalculator.calculator.dataset.firstValue = "10";
    myCalculator.calculator.dataset.operator = "multiply";
    myCalculator.calculator.dataset.previousKeyType = "number";

    // clearInput(key)
    myCalculator.clearInput(key);
    expect(myCalculator.display.textContent).toBe("0");
    expect(myCalculator.calculator.dataset.firstValue).toBe("");
    expect(myCalculator.calculator.dataset.operator).toBe("");
    expect(myCalculator.calculator.dataset.previousKeyType).toBe("clear");
  });

  it(`clears display but keeps all stored values, set previous key type to "clear", changes clear button label to "AC" if "CE" is pressed`, function () {
    let key = document.createElement("button");
    key.textContent = "CE";

    myCalculator.display.textContent = "55";
    myCalculator.calculator.dataset.firstValue = "10";
    myCalculator.calculator.dataset.operator = "multiply";
    myCalculator.calculator.dataset.previousKeyType = "number";

    // clearInput(key)
    myCalculator.clearInput(key);
    expect(myCalculator.display.textContent).toBe("0");
    expect(myCalculator.calculator.dataset.firstValue).toBe("10");
    expect(myCalculator.calculator.dataset.operator).toBe("multiply");
    expect(myCalculator.calculator.dataset.previousKeyType).toBe("clear");
  });
});
