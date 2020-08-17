describe("Calculate", function () {
  let myCalculator;
  let operator;

  beforeEach(function () {
    myCalculator = new Calculator();
  });

  it("should be able to add two numbers", function () {
    operator = "add";
    expect(myCalculator.calculate(1, operator, 1)).toBe(2);
  });

  it("should be able to subtract two numbers", function () {
    operator = "subtract";
    expect(myCalculator.calculate(5, operator, 2)).toBe(3);
  });

  it("should be able to multipy two numbers", function () {
    operator = "multiply";
    expect(myCalculator.calculate(4, operator, 4)).toBe(16);
  });

  it("should be able to divide two numbers", function () {
    operator = "divide";
    expect(myCalculator.calculate(4, operator, 2)).toBe(2);
  });
});
