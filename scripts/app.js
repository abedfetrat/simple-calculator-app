class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        this.updateDisplay();
    }

    equals() {
        if (!this.operation || !this.previousOperand || !this.currentOperand) return;
        this._calculate();
    }

    handleNumber(number) {
        if (number.toString() === '.' && this.currentOperand.includes('.')) return;

        if (this.currentOperand === '0') {
            this.currentOperand = number;
        } else {
            this.currentOperand += number;
        }
        this.updateDisplay();
    }

    handleOperator(operator) {
        if (this.currentOperand === '') return;
        if (this.operation) {
            this._calculate();
        }
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    handlePlusMinus() {
        if (this.currentOperand === '') return;

        if (this.currentOperand[0] === '-') {
            this.currentOperand = this.currentOperand.slice(1);
        } else if (this.currentOperand[0] != '-') {
            this.currentOperand = `-${this.currentOperand}`;
        }
        this.updateDisplay();
    }

    _calculate() {
        const operation = this.operation.dataset.operator;
        const a = parseFloat(this.previousOperand);
        const b = parseFloat(this.currentOperand);
        let result = undefined;
        switch (operation) {
            case 'add':
                result = a + b;
                break;
            case 'subtract':
                result = a - b;
                break;
            case 'multiply':
                result = a * b;
                break;
            case 'divide':
                result = a / b;
                break;
            case 'percent':
                result = (a / 100) * b;
                break;
            default:
                result = 0;
        }
        this.operation = undefined;
        this.previousOperand = '';
        this.currentOperand = result.toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.previousOperandTextElement.innerHTML = `${this.previousOperand} ${this.operation ? this.operation.innerHTML : ''}`;
        this.currentOperandTextElement.innerHTML = this.currentOperand;
    }
}

// Display text elements
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Number keys
const numbers = document.querySelectorAll('[data-number]');
numbers.forEach(number => number.addEventListener('click', () => calculator.handleNumber(number.innerText)));
// Operator keys
const operators = document.querySelectorAll('[data-operator]');
operators.forEach(operator => operator.addEventListener('click', () => calculator.handleOperator(operator)));
// Plus Minus key
document.querySelector('[data-plus-minus]').addEventListener('click', () => calculator.handlePlusMinus());
// Function keys
document.querySelector('[data-all-clear]').addEventListener('click', () => calculator.clear());
document.querySelector('[data-delete]').addEventListener('click', () => calculator.delete());
document.querySelector('[data-equals]').addEventListener('click', () => calculator.equals());