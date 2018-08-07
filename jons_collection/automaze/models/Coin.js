class Coin {
    constructor(x, y, game) {
        this.game = game;
        this.cellX = x;
        this.cellY = y;
        this.size;
        this.obtained = false;
        this.color = "#d2af00";
    }

    draw(){
        stroke(0);
        fill(this.color);
        let grid = this.game.maze.cells;
        let cell = grid[this.cellX][this.cellY];
        this.x = cell.middle.x;
        this.y = cell.middle.y;
        let equationX = this.x - game.camera.view.x;
        let equationY = this.y - game.camera.view.y;
        ellipse(equationX, equationY, this.size, this.size);
    }
}