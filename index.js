let currentNumber = ''
let previousNumber = ''
let operator = ''

const currentDisplayNumber = document.querySelector('.current')
const previousDisplayNumber = document.querySelector('.previous')

window.addEventListener('keydown', findKeyPress)

const equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
    if (currentNumber != "" && previousNumber != ""){
        calculate()
    }
})
const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    findDecimal();
  });

const clear = document.querySelector(".clear");
clear.addEventListener("click", allClear);

const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

numberButtons.forEach(button => {
    button.addEventListener('click', (e) =>{
        findNumber(e.target.textContent)
    })
})

function findNumber(number){
    currentNumber += number
    currentDisplayNumber.textContent = currentNumber
}

operators.forEach((button) => {
    button.addEventListener('click', (e) => {
        findOperator(e.target.textContent)
    })
})

function findOperator(op){
  if (previousNumber === ""){
    previousNumber = currentNumber
    operatorCheck(op);
  }  else if (currentNumber === ""){
    operatorCheck(op)
  }else{
    calculate()
    operator = op
    currentDisplayNumber.textContent = "";
    previousDisplayNumber.textContent = previousNumber + " " + operator;

}}

function calculate(){
    previousNumber = Number(previousNumber)
    currentNumber = Number(currentNumber)

    if (operator === "+") {
        previousNumber += currentNumber;
      } else if (operator === "-") {
        previousNumber -= currentNumber;
      } else if (operator === "x") {
        previousNumber *= currentNumber;
      } else if (operator === "/") {
        if (currentNumber <= 0) {
          previousNumber = "Error";
          displayResults();
          return;
        }else {previousNumber /= currentNumber;
      }}
      previousNumber = roundNumber(previousNumber);
      previousNumber = previousNumber.toString();
      displayResults();
    }

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
}
      
function displayResults() {
    if (previousNumber.length <= 11) {
        currentDisplayNumber.textContent = previousNumber;
    } else {
        currentDisplayNumber.textContent = previousNumber.slice(0, 11) + "...";
        }
    previousDisplayNumber.textContent = "";
    operator = "";
    currentNumber = "";
}

function findDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
        currentDisplayNumber.textContent = currentNumber;
    }
}
      
function allClear(){
    currentNumber = ''
    previousNumber = ''
    operator = ''
    currentDisplayNumber.textContent = "0"
    previousDisplayNumber.textContent = ""
}

    

function findKeyPress(e) {
e.preventDefault();
 if (e.key >= 0 && e.key <= 9) {
    findNumber(e.key);
 }
 if ( e.key === "Enter" ||
    ( e.key === "=" && currentNumber != "" && previousNumber != "")) {
      calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/") {
      findOperator(e.key);
    }
    if (e.key === "*") {
      findOperator("x");
    }
    if (e.key === ".") {
      findDecimal();
    }
    if (e.key === "Backspace") {
      findDelete();
    }
  }
  

function findDelete() {
  if (currentNumber !== "") {
    currentNumber = currentNumber.slice(0, -1);
    currentDisplayNumber.textContent = currentNumber;
    if (currentNumber === "") {
      currentDisplayNumber.textContent = "0";
    }
  }
  if (currentNumber === "" && previousNumber !== "" && operator === "") {
    previousNumber = previousNumber.slice(0, -1);
    currentDisplayNumber.textContent = previousNumber;
  }
}

function operatorCheck(text) {
    operator = text;
    previousDisplayNumber.textContent = previousNumber + " " + operator;
    currentDisplayNumber.textContent = "";
    currentNumber = "";
  }