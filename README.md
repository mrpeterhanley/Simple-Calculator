# ✨ Simple-Calculator ✨

👉 I built this Simple-Calculator based on the tutorial by Zell Liew on freeCodeCamp:
https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/

✅ How It Works:
The Simple Calculator is based on the calculate(n1, operator, n2) function that takes in two numbers and an operator and returns the result which is displayed on the screen. 

✅ The calculator temporarily stores these values as “dataset” attributes in the calculator DOM element: 
1.	firstValue: the first value (n1) to be calculated
2.	operator: the operator to be used in the calculation (plus / minus / multiply / divide)
3.	previousKeyType: the type of button previously pressed (number / operator / calculate / equals / clear). 

✅ When a button is pressed, the calculator will then run a function based on the value and type of button and what previous stored values already exist:
1.	numberInput(): displays the number pressed on the screen
2.	decimalInput(): displays a decimal on the screen only if it does not exist already
3.	operatorInput(): stores the operator, and performs a calculation and displays it if two previous values (n1 and n2) and an operator already exist (for chained calculations)
4.	equalsInput(): performs a calculation and displays it only if two previous values (n1 and n2) and an operator already exist
