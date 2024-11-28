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

function clearscreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function draw(){
    clearscreen();
    
    bst.draw();

    //n.drawNode(100, 500, 40);

    /*ctx.beginPath();
    ctx.arc(300, 300, 100, 0, 2 * Math.PI, false);
    //ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "blue";
    ctx.stroke();*/
}

setInterval(draw, 16);