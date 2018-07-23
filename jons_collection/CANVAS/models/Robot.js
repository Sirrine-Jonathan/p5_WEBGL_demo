function Robot(x, y, size, speed, color, game){
    this.x = x;
    this.y = y;
    this.dx = Math.floor(Math.random() * 2) ? speed:-speed;
    this.dy = Math.floor(Math.random() * 2) ? speed:-speed;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.game = game;
    this.hits = 0;
    this.delay = 0;
    this.startDelay = false;
    this.hasSplit = false;
}
Robot.prototype.updatePos = function(){
    this.x += this.dx;
    this.y += this.dy;
    if ((this.x + this.size) > this.game.width || this.x < 0){
        this.dx = -this.dx;
        this.hits++;
    }
    if (this.y + this.size > this.game.height || this.y < 0){
        this.dy = -this.dy;
        this.hits++;
    }
    if (this.hits >= 3 && !this.hasSplit){
        //this.duplicate();
        this.hasSplit = true;
    }
};

Robot.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    rect(this.x, this.y, this.size, this.size);
};

Robot.prototype.duplicate = function(){
    let robot = new Robot(this.x, this.y, this.size, this.speed, 50, Game);
    this.game.baddies.push(robot);
};