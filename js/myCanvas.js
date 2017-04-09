//定义画布的宽高 和 生成点的个数
var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 35;

var canvas = document.getElementById('Mycanvas');
canvas.width = WIDTH,
canvas.height = HEIGHT;
var context = canvas.getContext('2d');
context.strokeStyle = 'rgba(0,0,0,0.02)',
context.strokeWidth = 1,
context.fillStyle = 'rgba(0,0,0,0.5)';
var circleArr = [];

//线条: 开始以xy坐标，结束以xy坐标，线条透明度
function Line(x, y, _x, _y, o){
    this.beginX = x,
    this.beginY = y,
    this.closeX = _x,
    this.closeY = _y,
    this.o = o;
}

//点：圆心xy坐标，半径，每帧移动xy的距离
function Circle(x, y, r, moveX, moveY){
    this.x = x,
    this.y = y,
    this.r = r,
    this.moveX = moveX,
    this.moveY = moveY;
}

//生成max 和 min 的随机数
function num(max, min){
    var min = arguments[1] || 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//绘制原点
function drawCircle(cxt, x, y, r, moveX, moveY){
    // var circle = new Circle(x, y, r, moveX, moveY);
    var circle = {x:x, y:y, r:r, moveX:moveX, moveY:moveY};
    cxt.beginPath();
    cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
    cxt.closePath();
    cxt.fill();
    return circle;
}

//绘制线条
function drawLine(cxt, x, y, _x, _y, o) {
    // var line = new Line(x, y, _x, _y, o);
    var line = {beginX:x, beginY:y, closeX:_x, closeY:_y, o:o};
    cxt.beginPath()
    cxt.strokeStyle = 'rgba(0,0,0,'+ o +')'
    cxt.moveTo(line.beginX, line.beginY)
    cxt.lineTo(line.closeX, line.closeY)
    cxt.closePath()
    cxt.stroke();
}

//初始化 生成原点
function init() {
    circleArr = [];
    for(var i=0; i<POINT; i++){
        circleArr.push(drawCircle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
    }
    draw();
}

//每帧绘制
function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    // 将上帧复原
    for (var i = 0; i < POINT; i++) {
        drawCircle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
    }
    for(var i=0; i<POINT; i++){
        for(var j=0; j<POINT; j++){
            if(i + j < POINT){
                var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
                    B = Math.abs(circleArr[i+j].y - circleArr[i].y);

                var lineLength = Math.sqrt(A*A + B*B);
                // 越远透明度越低
                var C = 1/lineLength*7-0.009;
                var lineOpacity = C > 0.03 ? 0.03 : C;
                if (lineOpacity > 0) {
                    drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
                }
            }
        }
    }
}
window.onload = function (){
    init();
    setInterval(function(){
        for (var i = 0; i < POINT; i++) {
            var cir = circleArr[i];
            cir.x += cir.moveX;
            cir.y += cir.moveY;
            if (cir.x > WIDTH) cir.x = 0;
            else if (cir.x < 0) cir.x = WIDTH;
            if (cir.y > HEIGHT) cir.y = 0;
            else if (cir.y < 0) cir.y = HEIGHT;
        }

        draw();
    },15)
}
