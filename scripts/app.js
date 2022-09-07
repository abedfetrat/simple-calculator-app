import { showToast } from './toast.js';

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
        number = number.toString();
        // Prevents multiple decimal characters
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Limits number to 15 digits
        if (this.currentOperand.length === 15) {
            showToast("Can't enter more than 15 digits");
            return;
        }
        // Limits decimals to 10 digits
        if (this.currentOperand.includes('.')) {
            const decimals = this.currentOperand.split('.')[1];
            if (decimals.length === 10) {
                showToast("Can't enter more than 10 digits after decimal point");
                return;
            }
        }
        // Replace inital zero number with input
        if (number != '.' && this.currentOperand === '0') {
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
        // Fixes dcimal precision erros such as when adding 0.2 + 0.1
        result = parseFloat(result.toFixed(10));
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

// Respond to keyboard input
document.addEventListener('keydown', e => {
    switch (e.key) {
        case '0':
            calculator.handleNumber(0);
            break;
        case '1':
            calculator.handleNumber(1);
            break;
        case '2':
            calculator.handleNumber(2);
            break;
        case '3':
            calculator.handleNumber(3);
            break;
        case '4':
            calculator.handleNumber(4);
            break;
        case '5':
            calculator.handleNumber(5);
            break;
        case '6':
            calculator.handleNumber(6);
            break;
        case '7':
            calculator.handleNumber(7);
            break;
        case '8':
            calculator.handleNumber(8);
            break;
        case '9':
            calculator.handleNumber(9);
            break;
        case '.':
            calculator.handleNumber('.');
            break;
        case '+':
            calculator.handleOperator(document.querySelector('[data-operator="add"]'));
            break;
        case '-':
            calculator.handleOperator(document.querySelector('[data-operator="subtract"]'));
            break;
        case '*':
            calculator.handleOperator(document.querySelector('[data-operator="multiply"]'));
            break;
        case '/':
            calculator.handleOperator(document.querySelector('[data-operator="divide"]'));
            break;
        case '%':
            calculator.handleOperator(document.querySelector('[data-operator="percent"]'));
            break;
        case 'Escape':
            calculator.clear();
            break;
        case 'Backspace':
            calculator.delete();
            break;
        case 'Enter':
            calculator.equals();
            break;
    }
});


/* Registration of the Service Worker for offline capabilities */
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            await navigator.serviceWorker.register('sw.js');
            console.log('Service worker registered!');
        } catch (error) {
            console.warn('Error registering service worker:');
            console.warn(error);
        }
    }
}
registerServiceWorker();