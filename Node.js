class Node {
    constructor(value, id){
        this.value = value;
        this.id = id;
    }

    setNodeDrawingAttributes(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    collides(mouseX, mouseY){
        return (((mouseX - this.x) ** 2) + ((mouseY - this.y) ** 2) < (this.radius ** 2));
    }

    drawNode(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#FF2400';
        ctx.stroke();
        ctx.fillStyle = "#FF2400";
        var fontSize = "";
        fontSize += this.radius;
        fontSize += "px Arial";
        ctx.font = fontSize;
        ctx.fillText(this.value, this.x - (this.radius / 4), this.y + (this.radius / 3), this.radius);
    }

    fillNode(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "grey";
        ctx.fill();
    }
}