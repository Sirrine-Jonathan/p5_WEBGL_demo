let game;

function setup() {
    game = new Game();

	createCanvas(game.canvas.width, game.canvas.height);
	loadImage("../assets/burried_modified.png", function(img){
        game.backgroundImage = img;
    });

	// add the client player
    let playerColor = "#4271f4";
    let newPlayer = new Player(0, 0, 5, playerColor, game);
    game.addPlayer(newPlayer, "client");

    // build two enemy robot
    let color = "#f44141";
    let row = game.maze.cells.length - 1;
    let col = game.maze.cells[0].length - 1;
    game.exit = {
        'cellX': row,
        'cellY': col
    };
    let robot = new Robot(row, col, 20, 5, color, game);
    let robotTwo = new Robot(row, col, 20, 5, color, game);
    //game.addRobot(robotTwo);
    game.addRobot(robot);

    // set up coins to get
    let coin1 = new Coin(game.maze.cells.length - 1, 0, game);
    let coin2 = new Coin(0, game.maze.cells[0].length - 1, game);
    game.addCoin(coin1);
    game.addCoin(coin2);

    game.camera.follow = game.origin;
    frameRate(20);

}

function draw() {
    background(game.backgroundColor); // to clear the canvas
    game.camera.capture();
    game.maze.draw();

    // move through players
    for (p in game.players){
        game.players[p].updatePos();
        game.players[p].draw();
        for (let c = 0; c < game.coins.length; c++){
            if (isSameCell(game.coins[c], game.players[p])){
                game.coins.splice(c, 1);
                break;
            }
        };

        if (isSameCell(game.exit, game.players[p]) &&
            game.coins.length == 0){
            game.reset();
        }
    }

    game.coins.forEach((each) => {
        each.draw();
    });

    // move through baddies
    game.baddies.forEach((each) => {
        each.updatePos();
        each.draw();
        for (p in game.players){
            if (isSameCell(each, game.players[p]) && !game.win){
                game.players[p].return();
            }
        }
    });

    stroke(0);
    fill(255);
    if (!game.win)
        game.time++;
    else {
        game.displayWin();
    }

    game.maze.cells[game.exit.cellX][game.exit.cellY].drawBorder();
    //displayTime();

}

function isSameCell(obj1, obj2){
    if (obj1.cellX == obj2.cellX && obj1.cellY === obj2.cellY)
        return true;
    else
        return false;
}


function keyPressed(){

    // move player about
    let client = game.players['client'];
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        if (keyCode === LEFT_ARROW) {
            client.dx = -1;
            client.dy = 0;
            client.direction = 4;
        } else if (keyCode === RIGHT_ARROW) {
            client.dx = 1;
            client.dy = 0;
            client.direction = 2;
        }
    } else {
        if (keyCode === UP_ARROW){
            client.dy = -1;
            client.dx = 0;
            client.direction = 1;
        } else if (keyCode === DOWN_ARROW) {
            client.dy = 1;
            client.dx = 0;
            client.direction = 3;
        }
    }

    // move camera about
    let cs = 10;
    if (keyCode === 65){         //a
        game.camera.pan.dx = cs;
    } else if (keyCode === 68){  //d
        game.camera.pan.dx = -cs
    } else if (keyCode === 87){  //w
        game.camera.pan.dy = cs;
    } else if (keyCode === 83){  //s
        game.camera.pan.dy = -cs;
    }

}

function keyReleased(){

	let client = game.players['client'];

    // stop player motion
    if (keyCode === LEFT_ARROW){
        client.dx = 0;
    } else if (keyCode === RIGHT_ARROW){
        client.dx = 0;
    } else if (keyCode === UP_ARROW){
        client.dy = 0;
    } else if (keyCode === DOWN_ARROW){
        client.dy = 0;
    }

    if (keyCode === 65){         //a
        game.camera.pan.dx = 0;
    } else if (keyCode === 68){  //d
        game.camera.pan.dx = 0
    } else if (keyCode === 87){  //w
        game.camera.pan.dy = 0;
    } else if (keyCode === 83){  //s
        game.camera.pan.dy = 0;
    }
}

let fToggle = 0;
function keyTyped() {
    if (key === 'f') {
        fToggle = (fToggle + 1) % 3;
        if (fToggle === 0){
            game.camera.follow = game.players['client'];
        } else if (fToggle === 1){
            game.camera.follow = game.baddies[0];
        } else {
            game.camera.follow = game.origin;
        }
        game.camera.resetPan();
    }
}