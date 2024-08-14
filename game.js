const homePage = document.querySelector('.home-page');
const gamePage = document.querySelector('.game-page');
const btnPlay = document.querySelector('.play__btn');
const outCalk = document.querySelector('.input-calk'); // экран
const audioSea = document.querySelector('.audio-sea');
const audioKap = document.querySelector('.audio-kap');
const audioMistake = document.querySelector('.audio-mistake');
const audioWaveUp = document.querySelector('.audio-vawe-up');




btnPlay.addEventListener('click', appearsGame);


function appearsGame() {
    homePage.style.display = 'none';
    gamePage.style.display = 'block';
    createCircle();
    // playMusicSea()
    audioSea.play();
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

//функция рандомный знак + , -
function getRandomSign(min, max) {
    const number = Math.floor(Math.random() * (max - min) + min);

    if (number === 1) {
        return '+'
    }
    if (number === 2) {
        return '-'
    }
    if (number === 3) {
        return '*'
    }
    if (number === 4) {
        return '/'
    }
}

//рандомная капля
const pageGame = document.querySelector('.left-side');

const currentTask = {
    number1: '',
    sign: '',
    number2: '',
}

let count = 0;
function createCircle() {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    if (score.textContent < 30) {
        currentTask.sign = getRandomSign(1, 3)
    } else {
        currentTask.sign = getRandomSign(1, 5);
    }
    if (count > 20) {
        circle.style.animation = 'kaply 15s ease infinite'
    }
    if (count > 40) {
        circle.style.animation = 'kaply 8s ease infinite';
    }

    // создаем 1-ое и 2-ое число
    currentTask.number1 = getRandomInt(1, 11);
    currentTask.number2 = getRandomInt(1, 11);

    if ((currentTask.sign === '-' || currentTask.sign === '/') && currentTask.number2 > currentTask.number1) {
        while (currentTask.number2 % currentTask.number1 !== 0) {
            currentTask.number1--;
        }
        circle.innerHTML = currentTask.number2 + currentTask.sign + currentTask.number1;
    } else {
        while (currentTask.number1 % currentTask.number2 !== 0) {
            currentTask.number2--;
        }
        circle.innerHTML = currentTask.number1 + currentTask.sign + currentTask.number2;
    }

    const randomX = getRandomInt(0, 90);
    circle.style.left = randomX + "%";

    pageGame.append(circle);
}



const score = document.querySelector('.score');      // счетчик
console.log(score);
const enterCalk = document.querySelector('.enter');  // кнопка enter
console.log(enterCalk);

// функция проверяет введенное значение
// let count = 0;
let trueResultCount = 0;   // счетчик на правильные ответы
let trueResult = 0;
let wrongResultCount = 0;  // счетчик на неправильные ответы

function checkResult() {

    let trueResult = 0;
    if (currentTask.sign === '+') {
        trueResult = currentTask.number1 + currentTask.number2
    }

    if (currentTask.sign === '-') {
        if (currentTask.number2 > currentTask.number1) {
            trueResult = currentTask.number2 - currentTask.number1
        } else {
            trueResult = currentTask.number1 - currentTask.number2
        }
    }

    if (currentTask.sign === '*') {
        trueResult = currentTask.number1 * currentTask.number2
    }

    if (currentTask.sign === '/') {
        if (currentTask.number2 > currentTask.number1) {
            trueResult = currentTask.number2 / currentTask.number1
        } else {
            trueResult = currentTask.number1 / currentTask.number2
        }
    }


    console.log(trueResult)
    console.log(outCalk.value)
    if (outCalk.value == trueResult) {
        audioKap.play()
        const circle = document.querySelector('.circle');
        circle.remove();
        score.textContent = +score.textContent + 10 + count;
        count++;
        trueResultCount++;
        console.log(trueResultCount)
        clearAll()
        createCircle()
        outCalk.focus();
        console.log(count);
    } else {
        if (+score.textContent - 10 - count > 0) {
            score.textContent = +score.textContent - 10 - count;
        } else {
            score.textContent = 0
        }
        wrongResultCount++;
        outCalk.focus();
        audioMistake.play();
        clearAll()
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
function waterUp() {
    const circle = document.querySelector('.circle');

    if (circle) {
        const positionCircle = circle.getBoundingClientRect();
        const positionWave = wave1.getBoundingClientRect();

        // console.log(positionCircle)
        // console.log(positionWave)
        if (positionCircle.y + positionCircle.height >= positionWave.y) {
            waves.style.height = positionWave.height + 40 + 'px';
            wave1.style.height = positionWave.height + 40 + 'px';
            circle.remove();
            createCircle()
            audioWaveUp.play()
        }
        if (waves.style.height == '230px') {
            gameOver()

        }
    }
}

// вызывается ф-ия waterUp каждые 100млсек, (которая смотрит позицию капли, и если низ капли коснулся волны - капля исчезает)
// const intervalKey = setInterval(waterUp, 100);
const intervalPosition = setInterval(waterUp, 100);

const gameOverGame = document.querySelector('.game-over-page');
const rightAnswer = document.querySelector('.right-answer');
const wrongAnswer = document.querySelector('.wrong-answer');
const scoreGame = document.querySelector('.game-score');
console.log(gameOverGame)

function gameOver() {
    // clearInterval(intervalPosition); - очищает ф-ию setInterval(waterUp, 100); - чтобы она 
    // не проверяла позицию капли и волны + чтобы отключился звук(когда волна поднимается)
    clearInterval(intervalPosition);
    gamePage.style.display = 'none';
    gameOverGame.style.display = 'flex';
    rightAnswer.textContent = rightAnswer.textContent + trueResultCount;
    wrongAnswer.textContent = wrongAnswer.textContent + wrongResultCount;
    scoreGame.textContent += score.textContent;
    audioSea.pause();

}

