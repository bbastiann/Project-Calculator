
let currentValue = "";
let previousValue = "";
let operator = "";

let calculator = document.createElement("div");
calculator.setAttribute("class", "calculator");

let screenContainer = document.createElement("div");
screenContainer.setAttribute("class", "screen-container");

let screenText = document.createElement("div");
screenText.setAttribute("class", "screen-text");
screenText.textContent = "0";

screenContainer.appendChild(screenText);

let  numbersContainer= document.createElement("div");
numbersContainer.setAttribute("class", "numbers-container");

let operatorsContainer = document.createElement("div");
operatorsContainer.setAttribute("class", "operators-container");

let actionsContainer = document.createElement("div");
actionsContainer.setAttribute("class", "actions-container");


calculator.appendChild(screenContainer);
calculator.appendChild(numbersContainer);
calculator.appendChild(operatorsContainer);
calculator.appendChild(actionsContainer);


const numberArray = [1,2,3,4,5,6,7,8,9,0];
const operators = ["+","-","/","*"];
const actions = ["=","C","CE"]

document.body.appendChild(calculator);

function createButtons(container, arrayB) {

    const containerClass = container.className;

     arrayB.forEach(dato => {
        let button = document.createElement("button");
        button.textContent = dato;
            switch(containerClass) {
            case "numbers-container":
            button.addEventListener('click', GetNumber)
            break;
            case "operators-container":
            button.addEventListener('click', SaveOperator)
            break;
            case "actions-container":
            button.addEventListener('click', ClearEntry)
            break;
            }
        container.appendChild(button);
        });
    
}

function GetNumber(eventBtn){
    const numberText = eventBtn.target.textContent;
    currentValue = currentValue+numberText;
    screenText.textContent = currentValue;
    return currentValue;
} 

function SaveOperator(eventBtn){
    if (currentValue === "") return;
    
    operator = eventBtn.target.textContent;
    previousValue = currentValue;
    currentValue = "";
}

function ClearEntry(eventBtn){
    const entryText = eventBtn.target.textContent; 
    switch(entryText) {
    case "C":
        // Borra TODO
        currentValue = "";
        previousValue = "";
        operator = "";
        screenText.textContent = "0";
        break;
    case "CE":
        // Borra el currentValue 
        currentValue = "";
        screenText.textContent = "0";
        break;
    case "=":
        //Calcula el Resultado
        Calculate();
        break;
    }
}

function Calculate(){

    let result = 0;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    switch(operator){
        case "+":
            //SUMA
            result = prev + current;
            break;
        case "-":
            //RESTA
            result = prev - current;
            break;
        case "*":
            //Multiplicacion
            result = prev * current;
            break;
        case "/":
            //Division
            result = prev / current;
            break;
            
    }
    screenText.textContent = result.toString();
}

createButtons(numbersContainer, numberArray);
createButtons(operatorsContainer, operators);
createButtons(actionsContainer, actions);


