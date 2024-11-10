class Node {
    constructor(value, id){
        this.value = value;
        this.id = id;
    }

    drawNode(x, y, radius){
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.fillStyle = "white";
        var fontSize = "";
        fontSize += radius;
        fontSize += "px Arial";
        ctx.font = fontSize;
        ctx.fillText(this.value, x - (radius / 4), y + (radius / 3), radius);
    }
}