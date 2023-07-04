
class Display {
    constructor(previousValueDisplay, currentValueDisplay) {
        this.previousValueDisplay = previousValueDisplay;
        this.currentValueDisplay = currentValueDisplay;
        this.calculator = new Calculator();
        this.operator = undefined;
        this.currentValue = '';
        this.previousValue = '';
        this.operators = {
            add: '+',
            subtract: '-',
            multiply: '×',
            divide: '÷',
        };
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
        this.updateDisplay();
    }

    clearAll() {
        this.currentValue = '';
        this.previousValue = '';
        this.operator = undefined;
        this.updateDisplay();
    }

    compute(operator) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
        this.updateDisplay();
    }

    addNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue += number;
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentValueDisplay.textContent = this.currentValue;
        if (this.operator != null) {
            this.previousValueDisplay.textContent = `${this.previousValue} ${this.operators[this.operator] || ''}`;
        } else {
            this.previousValueDisplay.textContent = '';
        }
    }
    

    calculate() {
        const previous = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(previous) || isNaN(current)) return;

        let computation;
        switch (this.operator) {
            case 'add':
                computation = this.calculator.add(previous, current);
                break;
            case 'subtract':
                computation = this.calculator.subtract(previous, current);
                break;
            case 'multiply':
                computation = this.calculator.multiply(previous, current);
                break;
            case 'divide':
                computation = this.calculator.divide(previous, current);
                break;
            default:
                return;
        }

        this.currentValue = computation;
        this.operator = undefined;
        this.previousValue = '';
    }
}
