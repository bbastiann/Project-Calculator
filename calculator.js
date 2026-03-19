const state = {
    current: "",
    previous: "",
    operator: ""
};

let calculator = document.createElement("div");
calculator.setAttribute("class", "calculator");

let screenContainer = document.createElement("div");
screenContainer.setAttribute("class", "screen-container");

let screenText = document.createElement("div");
screenText.setAttribute("class", "screen-text");
screenText.textContent = "0";

screenContainer.appendChild(screenText);

let numbersContainer = document.createElement("div");
numbersContainer.setAttribute("class", "numbers-container");

let operatorsContainer = document.createElement("div");
operatorsContainer.setAttribute("class", "operators-container");

let actionsContainer = document.createElement("div");
actionsContainer.setAttribute("class", "actions-container");

calculator.appendChild(screenContainer);
calculator.appendChild(numbersContainer);
calculator.appendChild(operatorsContainer);
calculator.appendChild(actionsContainer);

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
const operators = ["+", "-", "/", "*"];
const actions = ["=", "C", "CE"];

document.body.appendChild(calculator);

function createButtons(container, arrayB) {
    const containerClass = container.className;

    arrayB.forEach(dato => {
        let button = document.createElement("button");
        button.textContent = dato;
        switch (containerClass) {
            case "numbers-container":
                button.addEventListener('click', getNumber);
                break;
            case "operators-container":
                button.addEventListener('click', saveOperator);
                break;
            case "actions-container":
                button.addEventListener('click', clearEntry);
                break;
        }
        container.appendChild(button);
    });
}

function getNumber(eventBtn) {
    const numberText = eventBtn.target.textContent;

    if (numberText === "." && state.current === "") state.current = "0";
    if (numberText === "." && state.current.includes(".")) return;

    state.current = state.current + numberText;
    screenText.textContent = state.current;
}

function saveOperator(eventBtn) {
    if (state.current === "") return;

    state.operator = eventBtn.target.textContent;
    state.previous = state.current;
    state.current = "";
}

function clearEntry(eventBtn) {
    const entryText = eventBtn.target.textContent;
    switch (entryText) {
        case "C":
            state.current = "";
            state.previous = "";
            state.operator = "";
            screenText.textContent = "0";
            break;
        case "CE":
            state.current = "";
            screenText.textContent = "0";
            break;
        case "=":
            calculate();
            break;
    }
}

function calculate() {
    if (state.previous === "" || state.current === "" || state.operator === "") return;

    let result = 0;
    const prev = parseFloat(state.previous);
    const current = parseFloat(state.current);

    switch (state.operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if(current != 0){
                result = prev / current;
            }else{
                result = "Cannot divide by zero";
            }
            
            break;
    }

    screenText.textContent = result.toString();
    state.current = result.toString();  
    state.previous = "";
    state.operator = "";
}

createButtons(numbersContainer, numberArray);
createButtons(operatorsContainer, operators);
createButtons(actionsContainer, actions);