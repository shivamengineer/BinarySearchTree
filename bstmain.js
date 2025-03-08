const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var n = new Node(2, 0);
var bst = new BinarySearchTree();
bst.insert(5);
bst.insert(10);
bst.insert(2);
bst.insert(20);
bst.insert(12);
bst.insert(1);
bst.insert(4);

var canRotate;
var lastX;

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clearscreen();
    bst.draw();
}

function mouseDown(e){
    var x = e.clientX;
    var y = e.clientY;
    lastX = x;
    canRotate = bst.collidesWithNode(x, y);
    //console.log(bst.collidesWithNode(x, y));
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
    //console.log(bst.collidesWithNode(x, y));
    mousedown = false;
}

function keyboard(e){
    switch(e.keyCode){
        //case ...:
    }
}

window.addEventListener("mousedown", mouseDown, true);
window.addEventListener("mouseup", mouseUp, true);
window.addEventListener("keydown", keyboard, true);
setInterval(draw, 16);