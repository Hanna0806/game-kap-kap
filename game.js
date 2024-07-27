const homePage = document.querySelector('.home-page');
const gamePage = document.querySelector('.game-page');
const btnPlay = document.querySelector('.play__btn');
const outCalk = document.querySelector('.input-calk'); // экран

btnPlay.addEventListener('click', appearsGame);

function appearsGame() {
    homePage.style.display = 'none';
    gamePage.style.display = 'block';
    createCircle();
    outCalk.focus();
}

// КАЛЬКУЛЯТОР

const clearCalk = document.querySelector('.clear');
const deleteCalk = document.querySelector('.delete');
const numberCalk = document.querySelectorAll('.number');



const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']   // будем проверять что нажато

// кнопка Clear
function clearAll() {
    outCalk.value = '';
    outCalk.focus();
}
clearCalk.addEventListener('click', clearAll);

// кнопка Delete
function deleteLastNum() {
    outCalk.value = outCalk.value.slice(0, -1);
    outCalk.focus();
}
deleteCalk.addEventListener('click', deleteLastNum);

//цифры прописываем
numberCalk.forEach(function (number) {
    number.onclick = (event) => {
        const key = event.target.textContent;
        if (digit.includes(key)) {
            outCalk.value += key
            outCalk.focus();
        }
    }
})


//функция рандом
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // Максимум не включается, минимум включается
}

function getRandomNumber() {
    return number1 = getRandomInt(1, 11)
}

//функция рандомный знак + , -
function getRandomSign(min = 1, max = 3) {
    const sign = Math.floor(Math.random() * (max - min) + min);
    return sign === 1 ? '+' : '-'
}

//функция рандомное число2

function getRandomNumber2() {
    return number2 = getRandomInt(1, 11)
}

//рандомная капля
const pageGame = document.querySelector('.left-side');

const currentTask = {
    number1: '',
    sign: '',
    number2: '',
}

function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    currentTask.number1 = getRandomNumber();
    currentTask.sign = getRandomSign();
    currentTask.number2 = getRandomNumber2();
    circle.innerHTML = currentTask.number1 + currentTask.sign + currentTask.number2;
    const randomX = getRandomInt(0, 90);
    circle.style.left = randomX + "%";

    pageGame.append(circle);
}



const score = document.querySelector('.score');      // счетчик
console.log(score);
const enterCalk = document.querySelector('.enter');  // кнопка enter
console.log(enterCalk);

// функция проверяет введенное значение
// outCalk.addEventListener('input', function () {
// });

let count = 0;
function checkResult() {
    const trueResult = currentTask.sign === '-' ? currentTask.number1 - currentTask.number2 : currentTask.number1 + currentTask.number2;
    console.log(trueResult)
    console.log(outCalk.value)
    if (outCalk.value == trueResult) {
        const circle = document.querySelector('.circle');
        circle.remove();
        count++;
        score.textContent = +score.textContent + 10 + count;
        clearAll()
        createCircle()
        outCalk.focus();
        console.log(count);
    } else {
        score.textContent = +score.textContent - 10;
        outCalk.focus();
    }
}

enterCalk.addEventListener('click', checkResult)

// нажатие enter с клавиатуры 
outCalk.addEventListener("keyup", function (e) {
    let key = e.keyCode;
    if (key === 13) {
        checkResult()
    }
})

const waves = document.querySelector('.waves')
const wave1 = document.querySelector('.wave1')
// вода поднимается
// count2 = 0;

function waterUp() {
    const circle = document.querySelector('.circle');

    if (circle) {        
        const positionCircle = circle.getBoundingClientRect();
        const positionWave = wave1.getBoundingClientRect();

        console.log(positionCircle)
        console.log(positionWave)
        if (positionCircle.y + positionCircle.height >= positionWave.y) {
            waves.style.height = positionWave.height + 40 + 'px';
            wave1.style.height = positionWave.height + 40 + 'px';
            circle.remove();
            createCircle()
        }
    }
}

setInterval(waterUp, 100);


