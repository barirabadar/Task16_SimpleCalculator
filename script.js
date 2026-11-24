const currentOperandElement = document.getElementById("current-operand");
const previousOperandElement = document.getElementById("previous-operand");
let currentOperand = "0";
let previousOperand = "";
let operator = null;
let shouldResetScreen = false;
function updateDisplay() {
    currentOperandElement.textContent = currentOperand;
    previousOperandElement.textContent =
        previousOperand + (operator ? " " + operator : "");
}
function appendNumber(number) {
    if (currentOperand === "Error") {
        currentOperand = "0";
    }
    if (shouldResetScreen) {
        currentOperand = "";
        shouldResetScreen = false;
    }
    if (number === "." && currentOperand.includes(".")) {
        return;
    }
    if (number === "." && currentOperand === "") {
        currentOperand = "0";
    }
    if (currentOperand === "0" && number !== ".") {
        currentOperand = number;
    } else {
        currentOperand += number;
    }
    updateDisplay();
}
function chooseOperator(selectedOperator) {
    if (currentOperand === "Error") {
        clearCalculator();
        return;
    }
    if (operator !== null && !shouldResetScreen) {
        calculate();
    }
    previousOperand = currentOperand;
    operator = selectedOperator;
    shouldResetScreen = true;
    updateDisplay();
}
function calculate() {
    if (operator === null || shouldResetScreen) {
        return;
    }
    const firstNumber = parseFloat(previousOperand);
    const secondNumber = parseFloat(currentOperand);
    let result;
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                currentOperand = "Error";
                previousOperand = "Cannot divide by zero";
                operator = null;
                shouldResetScreen = true;
                updateDisplay();
                return;
            }
            result = firstNumber / secondNumber;
            break;
        case "%":
            result = firstNumber % secondNumber;
            break;
        default:
            return;
    }
    currentOperand = String(
        parseFloat(result.toFixed(10))
    );
    previousOperand = "";
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}
function clearCalculator() {
    currentOperand = "0";
    previousOperand = "";
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}
function deleteNumber() {
    if (currentOperand === "Error") {
        clearCalculator();
        return;
    }
    if (shouldResetScreen) {
        return;
    }
    if (currentOperand.length > 1) {
        currentOperand = currentOperand.slice(0, -1);
    } else {
        currentOperand = "0";
    }
    updateDisplay();
}
document.addEventListener("keydown", function(event) {
    if (event.key >= "0" && event.key <= "9") {
        appendNumber(event.key);
    }
    if (event.key === ".") {
        appendNumber(".");
    }
    if (event.key === "+") {
        chooseOperator("+");
    }
    if (event.key === "-") {
        chooseOperator("-");
    }
    if (event.key === "*") {
        chooseOperator("*");
    }
    if (event.key === "/") {
        event.preventDefault();
        chooseOperator("/");
    }
    if (event.key === "Enter" || event.key === "=") {
        calculate();
    }
    if (event.key === "Backspace") {
        deleteNumber();
    }
    if (event.key === "Escape") {
        clearCalculator();
    }
});
updateDisplay();