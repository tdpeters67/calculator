let operator = ''
let previousValue = ''
let currentValue = ''

document.addEventListener("DOMContentLoaded", function(){

    let clear = document.querySelector('#clrBtn');
    let equal = document.querySelector('.equal')
    let decimal = document.querySelector('.decimal')

    let numbers = document.querySelectorAll('.number')
    let operators = document.querySelectorAll('.operator')

    let previous = document.querySelector('.previous')
    let current = document.querySelector('.current')

    numbers.forEach((number) => number.addEventListener('click', function(e){
        
        findNumber(e.target.textContent)
        current.textContent = currentValue
    }))

    operators.forEach((op)=> op.addEventListener('click', function(e){
        
        findOperator(e.target.textContent)
        previous.textContent = previousValue + " " + operator
        current.textContent = currentValue
    }))
    clear.addEventListener('click', function(){
        previousValue = ''
        currentValue = ''
        operator = ''
        previous.textContent = previousValue
        current.textContent = currentValue
    })
    equal.addEventListener('click', function(){
        calculate()
        previous.textContent = ''
        current.textContent = previousValue
    })
    decimal.addEventListener('click', function(){
        findDecimal()
    })
})

function findNumber(num){
    currentValue += num;
}

function findOperator(op){
    operator = op
    previousValue = currentValue
    currentValue = ''
}

function calculate(){
    previousValue = Number(previousValue)
    currentValue = Number(currentValue)

    if(operator === "+"){
        previousValue += currentValue
       currentValue = previousValue
    }else if(operator === "-"){
        previousValue -= currentValue
        currentValue = previousValue
    }else if(operator === "x"){
        previousValue *= currentValue
        currentValue = previousValue
    }else if(operator === "/"){
        previousValue /= currentValue
        currentValue = previousValue
    }

    previousValue = roundNumber(previousValue)
 
}

function roundNumber(num){
    return Math.round(num * 100000) / 100000
}

function findDecimal(){
    if(!currentValue.includes('.')){
        currentValue += '.'
    }
}