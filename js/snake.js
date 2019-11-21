var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var snakeW = 10;
var snakeH = 10;
var dir = "right";

function drawSnake(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH)
}
//CreateSanke
var len = 4;

var snake = [];

for (let i = len - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 })
}
//control direction
document.addEventListener("keydown", dirControl)

function dirControl(e) {
    console.log(e.key)
    if (e.key == "ArrowRight" && dir != "left") {
        dir = "right";
    } else if (e.key === "ArrowLeft" && dir != "right") {
        dir = "left"
    } else if (e.key === "ArrowUp" && dir != "down") {
        dir = "up"
    } else if (e.key === "ArrowDown" && dir != "up") {
        dir = "down"
    }
}
var food = {
    x: Math.round(Math.random() * (canvas.width / snakeW-1) + 1),
    y: Math.round(Math.random() * (canvas.height / snakeH-1) + 1)
}

//Draw food

function drawFood(x, y) {
    ctx.fillStyle = "red";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH)
}

function drawDefaultSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < snake.length; i++) {
        var X = snake[i].x;
        var Y = snake[i].y;
        drawSnake(X, Y)
    }
    //Snake Head
    drawFood(food.x, food.y)
    var snakeX = snake[0].x;
    var snakeY = snake[0].y;

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width / snakeW || snakeY >= canvas.height / snakeH) {
        alert("game over!")
    }

    if (dir === "right") {
        snakeX++
    } else if (dir === "left") {
        snakeX--
    } else if (dir === "up") {
        snakeY--
    } else if (dir === "down") {
        snakeY++
    }

    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.round(Math.random() * (canvas.width / snakeW-1) + 1),
            y: Math.round(Math.random() * (canvas.height / snakeH-1) + 1)
        }
        var newHead = {
            x: snakeX,
            y: snakeY
        }
    } else {
        snake.pop();
        var newHead = {
            x: snakeX,
            y: snakeY
        }
    }

    snake.unshift(newHead);
}
setInterval(drawDefaultSnake, 100);