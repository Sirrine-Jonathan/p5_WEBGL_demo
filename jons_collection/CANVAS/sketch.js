let Game = {
    width: 800,
    height: 600,
    background: "#91ff7c",
    players: {},
    baddies: []
};

function setup() {
	createCanvas(Game.width, Game.height);

	// add the client player
    let firstPlayer = new Player(80, 80, 20, 5, 200, Game);
    Game.players['client'] = firstPlayer;

    // build an enemy robot
    let robot = new Robot(160, 160, 20, 5, 100, Game);
    Game.baddies.push(robot);

}

function draw() {
    background(Game.background); // to clear the canvas

    // move through players
    for (p in Game.players){
        Game.players[p].updatePos();
        Game.players[p].draw();
    }

    // move through baddies
    Game.baddies.forEach((each) => {
        each.updatePos();
        each.draw();
    })

}


function keyPressed(){

    // move player about
    let client = Game.players['client'];
    let s = client.speed;
    if (keyCode === LEFT_ARROW){
        client.dx = -s;
    } else if (keyCode === RIGHT_ARROW){
        client.dx = s;
    } else if (keyCode === UP_ARROW){
        client.dy = -s;
    } else if (keyCode === DOWN_ARROW){
        client.dy = s;
    }

}

function keyReleased(){

	let client = Game.players['client'];

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