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

    // build an enemy robot
    let color = "#f44141";
    let robot = new Robot(160, 160, 20, 5, color, game);
    game.addRobot(robot);
    game.camera.follow = newPlayer;
    frameRate(25);

}

function draw() {
    background(game.backgroundColor); // to clear the canvas
    game.camera.capture();
    game.maze.draw();

    // move through players
    for (p in game.players){
        game.players[p].updatePos();
        game.players[p].draw();
    }

    // move through baddies
    game.baddies.forEach((each) => {
        each.updatePos();
        each.draw();
    })

}


function keyPressed(){

    // move player about
    let client = game.players['client'];
    if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
        if (keyCode === LEFT_ARROW) {
            client.dx = -1;
            client.direction = 4;
        } else if (keyCode === RIGHT_ARROW) {
            client.dx = 1;
            client.direction = 2;
        }
    } else {
        if (keyCode === UP_ARROW){
            client.dy = -1;
            client.direction = 1;
        } else if (keyCode === DOWN_ARROW) {
            client.dy = 1;
            client.direction = 3;
        }
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
    }
}