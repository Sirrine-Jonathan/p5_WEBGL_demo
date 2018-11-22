function Player(x, y, speed, color, game){
    this.cellX = x;
    this.cellY = y;
    this.dx = 0;
    this.dy = 0;
    this.color = color;
    this.game = game;
    this.speed = 1;
    this.direction = 0;
    this.x;
    this.y;

    // overridden by addPlayer fn in game class
    this.size = 15;
    this.image = loadImage("../assets/trump.png");  // Load the image
}

Player.prototype.updatePos = function(){
    let simX = this.cellX + this.dx;
    let simY = this.cellY + this.dy;
    let grid = this.game.maze.cells;
    if (!grid[simX] || !grid[simX][simY])
        return;

    let wallInd;
    if (this.dx !== 0){
        if (this.dx === 1){
            wallInd = 1;
        } else {
            wallInd = 3;
        }

    } else if (this.dy != 0) {
        if (this.dy === 1) {
            wallInd = 2;
        } else {
            wallInd = 0;
        }
    } else {
        return;
    }

    if (grid[this.cellX][this.cellY].walls[wallInd])
        return;

    this.cellX += this.dx;
    this.cellY += this.dy;
};

Player.prototype.draw = function(){
    let grid = this.game.maze.cells;
    let cell = grid[this.cellX][this.cellY];
    image(
        this.image,
        cell.middle.x - (this.game.cellWidth / 2),
        cell.middle.y - (this.game.cellHeight / 2),
        this.game.cellWidth,
        this.game.cellHeight
    );
    /*
    stroke(0);
    fill(this.color);
    let grid = this.game.maze.cells;
    let cell = grid[this.cellX][this.cellY];
    this.x = cell.middle.x;
    this.y = cell.middle.y;
    let equationX = this.x - game.camera.view.x;
    let equationY = this.y - game.camera.view.y;
    ellipse(equationX, equationY, this.size, this.size);
    */
    /*
        fill(255);
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

Player.prototype.return = function(){
    let mazeWidth = this.game.maze.cells.length;
    let mazeHeight = this.game.maze.cells[0].length;
    if (this.game.wins % 2 !== 0) {
        this.cellX = mazeWidth - 1;
        this.cellY = mazeHeight - 1;
    } else {
        this.cellX = 0;
        this.cellY = 0;
    }
};

