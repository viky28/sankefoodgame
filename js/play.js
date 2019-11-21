function demoX(x,y){
	ctx.fillStyle = "red";
    ctx.fillRect(x * snakeW, y * snakeH, canvas.width, snakeH);
}
for(var i=0;i<=50;i++){
	i++
	demoX(0,i)
}
function demoY(x,y){
	ctx.fillStyle = "red";
    ctx.fillRect(x * snakeW, y * snakeH, 10,canvas.height);
}
for(var i=0;i<=50;i++){
	i++
	demoY(i,0)
}