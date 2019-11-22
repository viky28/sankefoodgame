var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gameData = {};
gameData.flag = true;
// var gameData.snakeW = 10;
// var gameData.snakeH = 10;

// let flag = true;
var intervalVar;
gameData.newHead;
let foodInitalized = false;
gameData.dir = "right";
// var len = 4;
// var snake = [];
function initFood() {
    gameData.food = {
        x: Math.round(Math.random() * (canvas.width / gameData.snakeW - 1) + 1),
        y: Math.round(Math.random() * (canvas.height / gameData.snakeH - 1) + 1)
    }
    foodInitalized = true;
}


function init() {
    gameData.snake = []
    gameData.len = 4;
    gameData.snakeH = 10;
    gameData.snakeW = 10;
}

function drawSnake(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * gameData.snakeW, y * gameData.snakeH, gameData.snakeW, gameData.snakeH);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x * gameData.snakeW, y * gameData.snakeH, gameData.snakeW, gameData.snakeH)
}

//Direction and controls
document.addEventListener("keydown", dirControl)

function dirControl(e) {
    console.log(e.key)
    if (e.which == 32) {
        if (gameData.flag) {
            console.log("Start the game")
            intervalVar = setInterval(drawDefaultSnake, 150);
            gameData.flag = false;
        } else {
            console.log("Pause the game")
            clearInterval(intervalVar);
            gameData.flag = true;
        }
    }
    if (e.which == 13) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameData.flag = true;
    }
    if (e.key == "ArrowRight" && gameData.dir != "left") {
        gameData.dir = "right";
    } else if (e.key === "ArrowLeft" && gameData.dir != "right") {
        gameData.dir = "left"
    } else if (e.key === "ArrowUp" && gameData.dir != "down") {
        gameData.dir = "up"
    } else if (e.key === "ArrowDown" && gameData.dir != "up") {
        gameData.dir = "down"
    }
}

//Draw food

function drawFood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * gameData.snakeW, y * gameData.snakeH, gameData.snakeW, gameData.snakeH);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x * gameData.snakeW, y * gameData.snakeH, gameData.snakeW, gameData.snakeH)
}

function drawDefaultSnake() {
    init();
    if(foodInitalized){
        // console.log("Food Initialized already")
    } else {
        initFood();
    }
    console.log("gameData ",gameData)
    for (let i = gameData.len - 1; i >= 0; i--) {
        gameData.snake.push({ x: i, y: 0 })
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < gameData.snake.length; i++) {
        var X = gameData.snake[i].x;
        var Y = gameData.snake[i].y;
        drawSnake(X, Y)
    }
    //Snake Head
    drawFood(gameData.food.x, gameData.food.y)
    var snakeX = gameData.snake[0].x;
    var snakeY = gameData.snake[0].y;
    // console.log(snakeX,snakeY)

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width / gameData.snakeW || snakeY >= canvas.height / gameData.snakeH) {
        // alert("game over!")
        ctx.font = "40px arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"
        ctx.fillText("Game Over", 250, 250)
        ctx.font = "14px arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center"
        ctx.fillText("press enter to restart", 250, 280)
        clearInterval(intervalVar);
    }

    if (gameData.dir === "right") {
        console.log('')
        snakeX++
    } else if (gameData.dir === "left") {
        snakeX--
    } else if (gameData.dir === "up") {
        snakeY--
    } else if (gameData.dir === "down") {
        snakeY++
    }
    if (snakeX == gameData.food.x && snakeY == gameData.food.y) {
        gameData.food = {
            x: Math.round(Math.random() * (canvas.width / gameData.snakeW - 1) + 1),
            y: Math.round(Math.random() * (canvas.height / gameData.snakeH - 1) + 1)
        }
        gameData.newHead = {
            x: snakeX,
            y: snakeY
        }
    } else {
        gameData.snake.pop();
        gameData.newHead = {
            x: snakeX,
            y: snakeY
        }
    }
    for (let i = gameData.snake.length - 2; i >= 0; --i) {
        if (gameData.snake[i].x == gameData.newHead.x && gameData.snake[i].y == gameData.newHead.y) {
            // alert("collide!")
            console.log("collide self body")
            ctx.font = "40px arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center"
            ctx.fillText("Game Over", 250, 250)
            ctx.font = "14px arial";
            ctx.fillStyle = "white";
            ctx.textAlign = "center"
            ctx.fillText("press enter to restart", 250, 280)
            clearInterval(intervalVar);

        }
    }
    gameData.snake.unshift(gameData.newHead);
}