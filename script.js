// Set up some starting values

let result = 0;
let operator;
let isNum1 = false;
let isNum2 = false;
let num1;
let num2;
let hasOperator = false;
let hasResult = false;
let hasSign = false;
let pressed = false;
let float = false;
let inf = false;
let equalsPressed = false;
const screen = document.querySelector('.screen');
const history = document.querySelector('.history');

// Reset flags function

function resetFlags() {
    result = 0;
    num1 = '';
    num2 = '';
    isNum1 = false;
    isNum2 = false;
    hasOperator = false;
    hasResult = false;
    hasSign = false;
    pressed = false;
    float = false;
    inf = false;
    equalsPressed = false;
    history.textContent = '';
}

// Define the  math functions

function add(num1, num2) {
    result = num1 + num2;
    history

}

function substract(num1, num2) {
    result = num1 - num2;
}

function multiply(num1, num2) {
    result = num1 * num2;
}

function divide(num1, num2) {
    result = num1 / num2;
}


// Choose and call the appropriate math function

function operate(num1, num2, operator) {

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    screen.textContent = '';

    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            substract(num1, num2);
            break;
        case '×':
            multiply(num1, num2);
            break;
        case '÷':
            divide(num1, num2);
            break;
    }

    if (result == 'Infinity') {
        screen.textContent = 'Go away!';
        resetFlags();
        inf = true;

    } else {
        hasResult = true;
        equalCheck = false;
        addToScreen(result);
        history.textContent = `  ${num1} ${operator} ${num2} = ${result}`;
    }
}


// Listen to buttons

const btnNum = document.querySelectorAll('.btn');

for (let btn of btnNum) {
    btn.addEventListener('click', function () {
        switch (btn.textContent) {
            case '=':
                if (hasSign) {
                    storeNumber();
                    if (!pressed) {
                        if (num1 && num2) {
                            operate(num1, num2, operator);
                            num1 = result;
                        }
                    }
                }
                equalsPressed = true;
                pressed = true;
                break;
            case '×':
                equalCheck = true;
                if (!hasSign) {
                    operator = '×';
                    checkNumbers();
                    pressed = true;
                } else {
                    checkNumbers();
                    operator = '×';
                    pressed = true;
                }
                break;
            case '+':
                equalCheck = true;
                if (!hasSign) {
                    operator = '+';
                    checkNumbers();
                    pressed = true;
                } else {
                    checkNumbers();
                    operator = '+';
                    pressed = true;
                }
                break;
            case '-':
                equalCheck = true;
                if (!hasSign) {
                    operator = '-';
                    checkNumbers();
                    pressed = true;
                } else {
                    checkNumbers();
                    operator = '-';
                    pressed = true;
                }
                break;
            case '÷':
                equalCheck = true;
                if (!hasSign) {
                    operator = '÷';
                    checkNumbers();
                    pressed = true;
                } else {
                    checkNumbers();
                    operator = '÷';
                    pressed = true;
                }
                break;
            case '%':
                screen.textContent = screen.textContent / 100;
                break;
            case '.':
                if (!float) {
                    addToScreen('.');
                    float = true;
                }
                break;
            case '+/-':
                if (screen.textContent.includes('-')) {
                    screen.textContent = screen.textContent.replace('-', '');
                } else {
                    screen.textContent = '-' + screen.textContent;
                }
                break;
            case '→':
                screen.textContent = screen.textContent.slice(0, -1);
                break;


            default: // Number presses
                addToScreen(btn.textContent);

        }
    })
}

// Left Edge buttons - Off / Ce / ON-AC

const btnOn = document.querySelector('.on-button');
btnOn.addEventListener('click', function () {
    screen.textContent = '';
    resetFlags();
})

const btnCe = document.querySelector('.ce-button');
btnCe.addEventListener('click', function () {
    screen.textContent = '';
})

const btnOff = document.querySelector('.off-button');
btnOff.addEventListener('click', function () {
    screen.textContent = '';
    resetFlags();
})

// Write to the screen

function addToScreen(input) {
    if (screen.textContent.length <= 12) {
        if (inf) {
            screen.textContent = '';
            resetFlags();
        }

        if (equalsPressed && num1 && num2) {
            screen.textContent = '';
            equalsPressed = false;
            if (!equalCheck) { isNum1 = false }
            isNum2 = false;
        }

        if (hasResult) {
            screen.textContent = '';
            screen.textContent = screen.textContent + input;
            hasResult = false;
            isNum2 = false;
            float = false;
        } else if (isNum1 && hasOperator) {
            screen.textContent = '';
            screen.textContent = screen.textContent + input;
            hasOperator = false;
            pressed = false;
            float = false;
        } else {
            screen.textContent = screen.textContent + input;
            pressed = false;
        }
    } else {
        screen.textContent = 'Screen limit';
        resetFlags();
        inf = true;
    }
}


// Store and check numbers

function storeNumber() {
    if (!isNum1) {
        num1 = screen.textContent;
        isNum1 = true;
    } else if (isNum1 && !isNum2 && !pressed) {
        num2 = screen.textContent;
        isNum2 = true;
    }

}

function checkNumbers() {
    hasSign = true;
    hasOperator = true;
    storeNumber();


    if (!pressed) {
        if (isNum1 && isNum2) {
            operate(num1, num2, operator);
            num1 = result;

        }
    }
}

