function Robot(x, y, size, speed, color, game){
    this.x = x;
    this.y = y;
    this.dx = Math.floor(Math.random() * 2) ? speed:-speed;
    this.dy = Math.floor(Math.random() * 2) ? speed:-speed;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.game = game;
}
Robot.prototype.updatePos = function(){
    this.x += this.dx;
    this.y += this.dy;
    if ((this.x + this.size) > this.game.width || this.x < 0){
        this.dx = -this.dx;
    }
    if (this.y + this.size > this.game.height || this.y < 0) {
        this.dy = -this.dy;
    }
};

Robot.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
};