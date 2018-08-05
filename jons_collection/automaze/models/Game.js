class Game{
    constructor() {
        this.width = 1024;
        this.height = 576;
        this.canvas = {
            width: 924,
            height: 476
        };
        this.mazeComplexity = 24;
        this.backgroundColor = "#000000";
        this.backgroundImage = null;
        this.players = {};
        this.baddies = [];
        this.origin = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.camera = new Camera(this);
        this.maze = new Maze(this);
        this.cellWidth;
        this.cellHeight;
    }

    addPlayer(player, id) {
        let pathSize = (this.cellWidth > this.cellHeight) ? this.cellWidth:this.cellHeight;
        player.size = pathSize / 2;
        player.x = 0;
        player.y = 0;
        this.players[id] = player;
    }

    addRobot(robot){
        let pathSize = (this.cellWidth > this.cellHeight) ? this.cellWidth:this.cellHeight;
        robot.size = pathSize / 2;
        robot.speedX = this.cellWidth;
        robot.speedY = this.cellHeight;
        robot.x = this.width - robot.size;
        robot.y = this.height - robot.size;
        this.baddies.push(robot);
    }
}
