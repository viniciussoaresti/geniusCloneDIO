let order = [];
let clickedOrder = [];
let score = 0;

/*
0 - green
1 - red
2 - yellow
3 - blue
*/

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

let shuffleOrder = () => {//creates random order 
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i + 1))
    }
}

let lightColor = (element, number) => { //lights up next color
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 1000);
}

let checkOrder = () => { //checks if the clicked buttons are the same as the generated order
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        win();
    }
};

let win = () => {
    alert(`Score: ${score}\nYou won!\nStarting next game...`);
    nextLevel();
}

let click = (color) => {//function to register user's clicks
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

let createColorElement = (color) => {//returns the color code
    switch (color) {
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
        default:
            return null;
    }
}

let nextLevel = () => { //advances the game level
    score++;
    shuffleOrder();
}

let gameOver = () => { //ends the game
    alert(`Score: ${score}\nYou lost!\nClick OK to start next game...`);
    order = [];
    clickedOrder = [];
    playGame();
}

let playGame = () => { //starts the game
    alert(`Welcome to genius web!\nStarting new game...`);
    score = 0;
    nextLevel();
}

green.onclick = () => click(0); //clickEvents
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame(); //first game start