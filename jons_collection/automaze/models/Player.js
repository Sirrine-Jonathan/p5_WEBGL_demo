function Player(x, y, speed, color, game){
    this.cellX = x;
    this.cellY = y;
    this.dx = 0;
    this.dy = 0;
    this.color = color;
    this.game = game;
    this.speed = 1;
    this.x;
    this.y;

    // overridden by addPlayer fn in game class
    this.size = 20;
}

Player.prototype.updatePos = function(){
    let simX = this.cellX + this.dx;
    let simY = this.cellY + this.dy;
    let grid = this.game.maze.cells;
    if (grid[simX] && grid[simX][simY]){
        this.cellX += this.dx;
        this.cellY += this.dy;
    }
    /*
    // check against maze lines
    let vertCount = 0;
    let horzCount = 0;
    let vertices = game.maze.graph.AdjList.keys();
    for (let vert of vertices){
        let edges = game.maze.graph.AdjList.get(vert);
        for (let edge of edges){
            if (vert.x === edge.x){
                vertCount++;
            } else {
                horzCount++;
            }
        }
    }

        let str;
        stroke(0);
        fill(255);
        str = "vertical lines: " + vertCount;
        text(str, 0, 10);
        str = "horizontal lines: " + horzCount;
        text(str, 0, 20);
        str = "game complexity: " + game.mazeComplexity;
        text(str, 0, 30);
        str = "number of vertices: " + game.maze.graph.noOfVertices;
        text(str, 0, 40);
    */


};

Player.prototype.draw = function(){
    stroke(0);
    fill(this.color);
    let grid = this.game.maze.cells;
    let cell = grid[this.cellX][this.cellY];
    this.x = cell.middle.x;
    this.y = cell.middle.y;
    let equationX = this.x + game.camera.view.x;
    let equationY = this.y + game.camera.view.y;
    ellipse(equationX, equationY, this.size, this.size);


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
};

