let game;

function setup() {
    game = new Game();

	createCanvas(game.canvas.width, game.canvas.height);
	loadImage("../assets/burried_modified.png", function(img){
        game.backgroundImage = img;
    });

	// add the client player
    let newPlayer = new Player(game.origin.x, game.origin.y, 5, 200, game);
    game.addPlayer(newPlayer, "client");

    // build an enemy robot
    let robot = new Robot(160, 160, 20, 5, 100, game);
    game.addRobot(robot);
    game.camera.follow = newPlayer;
    frameRate(15);

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
    let sx = client.speedX;
    let sy = client.speedY;
    if (keyCode === LEFT_ARROW){
        client.dx = -sx;
    } else if (keyCode === RIGHT_ARROW){
        client.dx = sx;
    } else if (keyCode === UP_ARROW){
        client.dy = -sy;
    } else if (keyCode === DOWN_ARROW){
        client.dy = sy;
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

function keyTyped() {
    if (key === 'f') {
        if (game.camera.follow === game.baddies[0]){
            game.camera.follow = game.players['client'];
        } else {
            game.camera.follow = game.baddies[0];
        }
    }
}