const homePage = document.querySelector('.home-page');
const gamePage = document.querySelector('.game-page');
const btnPlay = document.querySelector('.play__btn');
const outCalk = document.querySelector('.input-calk'); // экран

btnPlay.addEventListener('click', appearsGame);

function appearsGame() {
    homePage.style.display = 'none';
    gamePage.style.display = 'block';
    // createCircle();
    outCalk.focus();
}

// КАЛЬКУЛЯТОР

// const outCalk = document.querySelector('.input-calk'); // экран
const clearCalk = document.querySelector('.clear');
const deleteCalk = document.querySelector('.delete');
const numberCalk = document.querySelectorAll('.number');



const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']   // будем проверять что нажато
let a = '';

// кнопка Clear
function clearAll() {
    a = '';   // первое число
    outCalk.value = '';
}
clearCalk.addEventListener('click', clearAll);

// кнопка Delete
function deleteLastNum() {
    a = a.slice(0, -1);
    outCalk.value = a
}
deleteCalk.addEventListener('click', deleteLastNum);

//цифры прописываем
numberCalk.forEach(function (number) {
    number.onclick = (event) => {
        outCalk.textContent = '';
        const key = event.target.textContent;
        if (digit.includes(key)) {
            a += key;
            outCalk.value = a
        }
    }
})

// прописываем цифры с клавиатуры
outCalk.addEventListener('keypress', function (event) {
    outCalk.textContent = event.key;
})




//рандомная капля
const pageGame = document.querySelector('.game-page');

function createCircle() {
    const circle = document.createElement("div");
    circle.innerHTML = getRandomNumber() + getRandomSign() + getRandomNumber2();
    circle.classList.add("circle");
    console.log(circle)

    pageGame.append(circle);
}








