var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var snakeW = 10;
var snakeH = 10;
var dir = "right";
let flag = true;
var intervalVar;
var newHead;
var len = 4;
var snake = [];
var food = {
    x: Math.round(Math.random() * (canvas.width / snakeW - 1) + 1),
    y: Math.round(Math.random() * (canvas.height / snakeH - 1) + 1)
}

function drawSnake(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x * snakeW, y * snakeH, snakeW, snakeH);
    ctx.fillStyle = 'black';
    ctx.strokeRect(x * snakeW, y * snakeH, snakeW, snakeH)
}
//CreateSanke
for (let i = len - 1; i >= 0; i--) {
    snake.push({ x: i, y: 0 })
}

//Direction and controls
document.addEventListener("keydown", dirControl)

function dirControl(e) {
    console.log(e.key)
    if (e.which == 32) {
        if (flag) {
            console.log("Start the game")
            intervalVar = setInterval(drawDefaultSnake, 150);
            flag = false;
        } else {
            console.log("Pause the game")
            clearInterval(intervalVar);
            flag = true;
        }
    }
    if (e.which == 13){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        flag = true;
    }
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
    // console.log(snakeX,snakeY)

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width / snakeW || snakeY >= canvas.height / snakeH) {
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
            x: Math.round(Math.random() * (canvas.width / snakeW - 1) + 1),
            y: Math.round(Math.random() * (canvas.height / snakeH - 1) + 1)
        }
        newHead = {
            x: snakeX,
            y: snakeY
        }
    } else {
        snake.pop();
        newHead = {
            x: snakeX,
            y: snakeY
        }
    }
    for (let i = snake.length - 2; i >= 0; --i) {
        if (snake[i].x == newHead.x && snake[i].y == newHead.y) {
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
    snake.unshift(newHead);
}


// function demoX(x,y){
// 	ctx.fillStyle = "red";
//     ctx.fillRect(x * snakeW, y * snakeH, canvas.width, snakeH);
// }
// for(var i=0;i<=50;i++){
// 	i++
// 	demoX(0,i)
// }
// function demoY(x,y){
// 	ctx.fillStyle = "red";
//     ctx.fillRect(x * snakeW, y * snakeH, 10,canvas.height);
// }
// for(var i=0;i<=50;i++){
// 	i++
// 	demoY(i,0)
// }