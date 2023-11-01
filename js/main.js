class Calculator{
    constructor(prebiousOperandTextElement, currentOperandTextElement) {
        this.prebiousOperandTextElement = prebiousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.cumputeOperandTextElement = cumputeOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.cumputeOperand = ''
        this.operation = ''
    }
    
    delete() {
        if (this.operation === null && this.currentOperand === null) return
        this.previousOperand = this.previousOperand.toString().slice(0, -1)
        
        if (this.currentOperand === null || this.currentOperand === '')return this.operation = this.operation.toString().slice(0, -1)
        
        this.currentOperand = this.currentOperand.toString().slice(0, -1)

        this.cumputeOperand = this.cumputeOperand.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.'))return
        this.currentOperand =  this.currentOperand.toString() + number.toString()
        
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !=='') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
        
    }
    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current) ) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.cumputeOperand = computation
        this.operation = undefined
        this.previousOperand = ''
        this.currentOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
        
    }
    updateDisplay() {
        this.cumputeOperandTextElement.innerHTML = this.getDisplayNumber(this.cumputeOperand)
        if (this.operation != null) {
            this.prebiousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)}${this.operation}`
            this.currentOperandTextElement.innerText =this.getDisplayNumber(this.currentOperand)
        }
    }

}


const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prebiousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const cumputeOperandTextElement = document.querySelector('[data-cumpute-operand]')

const calculator = new Calculator(prebiousOperandTextElement, currentOperandTextElement, cumputeOperandTextElement)

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation (button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})