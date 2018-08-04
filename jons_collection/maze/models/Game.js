class Game{
    constructor() {
        this.width = 1024;
        this.height = 576;
        this.canvas = {
            width: 924,
            height: 476
        };
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
        this.pathSize; // set inside maze constructor;
    }

    addPlayer(player, id) {
        player.size = this.pathSize / 2;
        player.speed = player.size / 2;
        player.x = player.size;
        player.y = player.size;
        this.players[id] = player;
    }
}
