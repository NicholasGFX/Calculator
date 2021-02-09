const add = (a, b) => {
    return a + b;
}
const subtract = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    return a * b;
}
const divide = (a, b) => {
    return (b === 0 ? 'Infinity' : a / b);
}
const operate = (a, operator, b) => {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}
const output = document.getElementById('output');
const clear = document.getElementById('clear');
const addition = document.getElementById('addition');
const subtraction = document.getElementById('subtraction');
const multiplication = document.getElementById('multiplication');
const division = document.getElementById('division');
const equals = document.getElementById('equals');
const decimal = document.getElementById('decimal');
const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
let aValue = '';
let bValue = '';
let operator = null;
let displayValue = null;
let calculatedValue = null;
let equalsUsed = false;

const setButtonValue = (value) => {
    if (equalsUsed) {
        output.textContent = '';
        aValue = '';
        bValue = '';
        operator = null;
        equalsUsed = false;
    }!operator ? aValue += value : bValue += value;
    output.textContent += value;
}
decimal.addEventListener('click', () => {
    if (!operator) {
        if (aValue.includes('.')) {
            return;
        } else {
            aValue += '.'
            output.textContent += '.';
        }
    } else {
        if (bValue.includes('.')) {
            return;
        } else {
            bValue += '.'
            output.textContent += '.';
        }
    }
});
zero.addEventListener('click', () => {
    setButtonValue('0');
});
one.addEventListener('click', () => {
    setButtonValue('1');
});
two.addEventListener('click', () => {
    setButtonValue('2');
});
three.addEventListener('click', () => {
    setButtonValue('3');
});
four.addEventListener('click', () => {
    setButtonValue('4');
});
five.addEventListener('click', () => {
    setButtonValue('5');
});
six.addEventListener('click', () => {
    setButtonValue('6');
});
seven.addEventListener('click', () => {
    setButtonValue('7');
});
eight.addEventListener('click', () => {
    setButtonValue('8');
});
nine.addEventListener('click', () => {
    setButtonValue('9');
});
clear.addEventListener('click', () => {
    aValue = '';
    bValue = '';
    operator = null;
    output.textContent = '';
});

const doArithmetic = () => {
    output.textContent = operate(Number(aValue), operator, Number(bValue));
    if (output.textContent === 'NaN') output.textContent = 'Error';
    aValue = output.textContent;
    bValue = ''
}

operationButton = function (mathSymbol, displayedSymbol = mathSymbol) {
    if (output.textContent === 'Error' || output.textContent === 'Infinity') {
        aValue = '';
        bValue = '';
        operator = null;
        output.textContent = ''
    }

    if (equalsUsed) {
        bValue = '';
        operator = mathSymbol;
        equalsUsed = false;
    }

    if (bValue && operator !== mathSymbol) { //if there's a bValue and operator isn't the same, do arithmetic with the previous operator
        doArithmetic();
        operator = mathSymbol;
        output.textContent += ` ${displayedSymbol} `;
    }

    if (!output.textContent) { //set default aValue to '0' if there isn't any output
        aValue = '0';
        output.textContent = aValue;
        output.textContent = output.textContent + ` ${displayedSymbol} `; //add operator to output
        operator = mathSymbol;

    } else { //if there is textContent, set the aValue and assign the operator.
        output.textContent = aValue;
        output.textContent = output.textContent + ` ${displayedSymbol} `; //add operator to output
        operator = mathSymbol; //set an operator
    }

    if (operator !== mathSymbol && !bValue) { //overwrite non subtraction operator if no bValue.
        output.textContent = output.textContent.slice(0, output.textContent.length - 3); //cut out current displayed operator
        output.textContent += ` ${displayedSymbol} `; //write in new operator
        operator = mathSymbol;
    }

    if (bValue) { //if there's a bValue, do the arithmetic.
        operator = mathSymbol;
        doArithmetic();
        operator = mathSymbol;
        output.textContent = output.textContent + ` ${displayedSymbol} `;
    }
}

addition.addEventListener('click', () => operationButton('+'));
subtraction.addEventListener('click', () => operationButton('-'));
multiplication.addEventListener('click', () => operationButton('*', '×'));
division.addEventListener('click', () => operationButton('/', '÷'));
equals.addEventListener('click', () => {
    if (!bValue) {
        return;
    } else {
        doArithmetic();
    }
    equalsUsed = true;
});