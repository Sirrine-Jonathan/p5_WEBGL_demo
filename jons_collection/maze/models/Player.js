function Player(x, y, size, speed, color, game){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.game = game;
}

Player.prototype.updatePos = function(){
    let simX = this.x + this.dx;
    let simY = this.y + this.dy;
    let buf = this.size / 2;
    if ((simX + buf) > this.game.width ||
        (simX - buf) < 0)
        return;
    if ((simY + buf) > this.game.height ||
        (simY - buf) < 0)
        return;
    this.x += this.dx;
    this.y += this.dy;
};
Player.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    ellipse(this.x, this.y, this.size, this.size);
};