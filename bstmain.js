const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var inputNum = 0;
var initialWidth = 50;
var inputBox = {height: 60, width: initialWidth, x: 20, y: 20, color: "white", text: 0};
var input = false;
var changeSize = false;

var n = new Node(2, 0);
var bst = new BinarySearchTree();
/*bst.insert(5);
bst.insert(10);
bst.insert(2);
bst.insert(20);
bst.insert(12);
bst.insert(1);
bst.insert(4);*/

var canRotate = false;
var lastX;

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRect(rect){
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.font = "50px Arial";
    ctx.strokeText(rect.text, rect.x + 10, rect.y + (3 * rect.height / 4));
}

function draw(){
    clearscreen();
    bst.draw();
    drawRect(inputBox);
}

function mouseCollides(x, y, rect){
    return (x >= rect.x &&
        x <= rect.x + rect.width &&
        y >= rect.y &&
        y <= rect.y + rect.height)
}

function mouseDown(e){
    var x = e.clientX;
    var y = e.clientY;
    lastX = x;
    input = false;
    if(mouseCollides(x, y, inputBox)){
        input = true;
    }

    if(bst.height > 0)
        canRotate = bst.collidesWithNode(x, y);
    mousedown = true;
}

function mouseUp(e){
    var x = e.clientX;
    if(canRotate != -999){
        if(x > lastX + 50){
            bst.rotateRight(canRotate);
        } else if(x < lastX - 50){
            bst.rotateLeft(canRotate);
        }
    }
    mousedown = false;
}

function keyboard(e){
    if(e.keyCode >= 48 && e.keyCode <= 57){
        inputBox.text *= 10;
        inputBox.text += e.keyCode - 48;
        if(changeSize && inputBox.text != 0){
            inputBox.width += 30;
        } else {
            changeSize = true;
        }
    }
    switch(e.keyCode){
        case 13:
            bst.insert(inputBox.text);
            inputBox.text = 0;
            inputBox.width = initialWidth;
            changeSize = false;
            break;
        case 8:
            if(inputBox.text >= 10){ inputBox.width -= 30; }
            inputBox.text = Math.floor(inputBox.text / 10);
            break;
    }
}

window.addEventListener("mousedown", mouseDown, true);
window.addEventListener("mouseup", mouseUp, true);
window.addEventListener("keydown", keyboard, true);
setInterval(draw, 16);