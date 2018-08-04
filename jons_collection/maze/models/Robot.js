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
    let buf = this.size / 2;
    if ((this.x + buf) > this.game.width ||
        (this.x - buf) < 0) {
        this.dx = -this.dx;
    }
    if ((this.y + buf) > this.game.height ||
        (this.y - buf) < 0){
        this.dy = -this.dy;
    }
};

Robot.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    let equationX = this.x + game.camera.view.x;
    let equationY = this.y + game.camera.view.y;
    ellipse(equationX, equationY, this.size, this.size);
};