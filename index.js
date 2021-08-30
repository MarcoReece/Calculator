class Calculator {
  constructor(previousOutputTextElement, currentOutputTextElement, currentOperation) {
    this.previousOutputTextElement = previousOutputTextElement;
    this.currentOutputTextElement = currentOutputTextElement;
    this.currentOperation = currentOperation;
    this.clear();
  }

  clear() {
    this.currentOutput = '';
    this.previousOutput = '';
    this.operation = undefined;
    this.currentOperation.innerText = '';
  }

  delete() {
    this.currentOutput = this.currentOutput.toString().slice(0, -1);
  }

  addNumber(number) {
    if (number === '.' && this.currentOutput.includes('.')) return;
    this.currentOutput = this.currentOutput.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOutput === '') return;
    if (this.previousOutput !== '') {
      this.compute();
    }
    this.currentOperation.innerText = operation;
    this.operation = operation;
    this.previousOutput = this.currentOutput;
    this.currentOutput = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOutput);
    const current = parseFloat(this.currentOutput);
    if (Number.isNaN(prev) || Number.isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOutput = computation;
    this.operation = undefined;
    this.previousOutput = '';
  }

  updateDisplay() {
    this.currentOutputTextElement.innerText = this.currentOutput;
    this.previousOutputTextElement.innerText = this.previousOutput;
  }
}

const currentOperation = document.querySelector('[data-currentOperation]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOutputTextElement = document.querySelector(
  '[data-previous-output]',
);
const currentOutputTextElement = document.querySelector(
  '[data-current-output]',
);

const calculator = new Calculator(
  previousOutputTextElement,
  currentOutputTextElement,
  currentOperation,
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.addNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
