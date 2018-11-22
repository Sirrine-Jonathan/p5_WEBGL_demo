class Game{
    constructor() {
        // STANDARD SETTING
        // this.width = 1024;
        // this.height = 576;
        // this.canvas = {
        //     width: 924,
        //     height: 476
        // };
        let screenWidth = screen.width;
        let screenHeight = screenWidth * (9/16);
        this.width = windowWidth;
        this.height = windowHeight;
        this.canvas = {
            width: windowWidth,
            height: windowHeight
        };
        this.mazeComplexity = 10;
        this.backgroundColor = "#000000";
        this.backgroundImage = null;
        this.players = {};
        this.baddies = [];
        this.coins = [];
        this.origin = {
            x: this.canvas.width / 2,
            y: this.canvas.height / 2
        };
        this.camera = new Camera(this);

        // these variables will be set by the maze constructor
        this.middle = {};
        this.cellWidth = 10;
        this.cellHeight = 10;
        this.maze = new Maze(this);

        this.time = 0;
        this.win = false;
        this.wins = 0;
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
        robot.x = this.width - robot.size;
        robot.y = this.height - robot.size;
        this.baddies.push(robot);
    }

    addCoin(coin){
        let pathSize = (this.cellWidth > this.cellHeight) ? this.cellWidth:this.cellHeight;
        coin.size = pathSize / 2;
        coin.x = this.width - coin.size;
        coin.y = this.height - coin.size;
        this.coins.push(coin);
    }

    static displayWin(){
        textSize(100);
        fill("#00a11c");
        text("YOU WIN!!", game.canvas.width / 4, game.canvas.height / 4);
    }

    displayTime(){
        textSize(12);
        fill(255);
        let time = new Date(game.time).getTime();
        str = "Time: " + time;
        text(str, 0, 10);
    }

    reset(){
        this.win = false;
        this.wins++;
        this.mazeComplexity += 2;
        this.maze = new Maze(game);
        this.baddies.forEach((each) => {
            each.resetMaze();
        });


        let coin1 = new Coin(game.maze.cells.length - 1, 0, game);
        let coin2 = new Coin(0, game.maze.cells[0].length - 1, game);
        game.addCoin(coin1);
        game.addCoin(coin2);

        let row = game.maze.cells.length - 1;
        let col = game.maze.cells[0].length - 1;
        if (this.wins % 2 === 0) {
            game.exit = {
                'cellX': row,
                'cellY': col
            };
            game.players['client'].cellX = 0;
            game.players['client'].cellY = 0;
        } else {
            game.exit = {
                'cellX': 0,
                'cellY': 0
            }
            game.players['client'].cellX = row;
            game.players['client'].cellY = col;
        }
    }
}
