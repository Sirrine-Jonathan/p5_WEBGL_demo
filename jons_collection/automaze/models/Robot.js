function Robot(x, y, size, speed, color, game){
    this.x = x;
    this.y = y;
    this.dx = Math.floor(Math.random() * 2) ? speed:-speed;
    this.dy = Math.floor(Math.random() * 2) ? speed:-speed;
    this.color = color;
    this.game = game;

    // overridden by addPlayer fn in game class
    this.size = 20;
    this.speedX;
    this.speedY;
}
Robot.prototype.updatePos = function(){

};

Robot.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    let equationX = this.x + game.camera.view.x;
    let equationY = this.y + game.camera.view.y;
    ellipse(equationX, equationY, this.size, this.size);
};