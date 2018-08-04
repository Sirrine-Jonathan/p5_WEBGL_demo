function Player(x, y, speed, color, game){
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.color = color;
    this.game = game;

    // overridden by addPlayer fn in game class
    this.size = 20;
    this.speedX;
    this.speedY;
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
    let equationX = this.x + game.camera.view.x;
    let equationY = this.y + game.camera.view.y;
    ellipse(equationX, equationY, this.size, this.size);

    /*
    let str;
    str = "view_x: " + game.camera.view.x;
    text(str, 0, 10);
    str = "view_y: " + game.camera.view.y;
    text(str, 0, 20);
    str = "player_x: " + this.x;
    text(str, 0, 30);
    str = "player_y: " + this.y;
    text(str, 0, 40);
    str = "actual_x: " + equationX;
    text(str, 0, 50);
    str = "actual_y: " + equationY;
    text(str, 0, 60);
    */
};

