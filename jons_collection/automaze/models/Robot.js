function Robot(x, y, size, speed, color, game){
    this.x = x;
    this.y = y;
    this.cellX = x;
    this.cellY = y;
    this.startCell = {
        'x': x,
        'y': y
    };
    this.dx = 1;
    this.dy = 1;
    this.color = color;
    this.game = game;
    this.stack = [];
    this.grid = [];
    for (let row = 0; row < game.maze.cells.length; row++){
        let newRow = [];
        for (let col = 0; col < game.maze.cells[0].length; col++){
            let newCell = Cell.copy(game.maze.cells[row][col]);
            newRow.push(newCell);
        }
        this.grid.push(newRow);
    }
    this.resetGrid();
    this.current = this.grid[x][y];

    // overridden by addPlayer fn in game class
    this.size = 20;

}
Robot.prototype.updatePos = function(){

    /*
        gets next move based on
        - what's possible
        - what's been visited
        - randomization
    */
    let next = this.getNextCell();

    if (next) {
        next.visited = true;
        this.stack.push(this.current);
        this.current = next;
    } else if (this.stack.length > 0) {
        this.current = this.stack.pop();
    } else {
        this.resetGrid();
    }

    // paranoia check that cell exists
    let simX = this.current.row;
    let simY = this.current.col;
    if (!this.grid[simX] || !this.grid[simX][simY])
        return;

    // send robot to next cell
    this.cellX = simX;
    this.cellY = simY;
};

Robot.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    let grid = this.game.maze.cells;
    let cell = grid[this.cellX][this.cellY];
    this.x = cell.middle.x;
    this.y = cell.middle.y;
    let equationX = this.x + game.camera.view.x;
    let equationY = this.y + game.camera.view.y;
    ellipse(equationX, equationY, this.size, this.size);
};

Robot.prototype.resetGrid = function(){
    let grid = this.grid;
    for (let row = 0; row < grid.length; row++){
        for (let col = 0; col < grid[row].length; col++){
            grid[row][col].visited = false;
        }
    }
};


/*
    gets next move based on
    - what's possible
    - what's been visited
    - randomization
*/
Robot.prototype.getNextCell = function(){
    let cells = this.grid;
    let neighbors = [];
    let i = this.cellX;
    let j = this.cellY;

    let top;
    let right;
    let bottom;
    let left;
    if (cells[i] && cells[i][j - 1])
        top = cells[i][j - 1];
    if (cells[i + 1] && cells[i + 1][j])
        right = cells[i + 1][j];
    if (cells[i] && cells[i][j + 1])
        bottom = cells[i][j + 1];
    if (cells[i - 1] && cells[i - 1][j])
        left = cells[i - 1][j];

    let walls = this.grid[this.cellX][this.cellY].walls;
    top = (walls[0]) ? null:top;
    right = (walls[1]) ? null:right;
    bottom = (walls[2]) ? null:bottom;
    left = (walls[3]) ? null:left;

    if(top && !top.visited) {
        neighbors.push(top);
    }
    if(right && !right.visited) {
        neighbors.push(right);
    }
    if(bottom && !bottom.visited) {
        neighbors.push(bottom);
    }
    if(left && !left.visited) {
        neighbors.push(left);
    }
    if (neighbors.length > 0) {
        let r = floor(random(0, neighbors.length));
        return neighbors[r];
    } else {
        return undefined;
    }
};