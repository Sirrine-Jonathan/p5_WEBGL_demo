let game = {};
let camera = {};

function setup() {
    game = new Game();

	createCanvas(game.canvas.width, game.canvas.height);
	loadImage("../assets/burried_modified.png", function(img){
        game.backgroundImage = img;
    });

	// add the client player
    game.players['client'] = new Player(game.origin.x, game.origin.y, 20, 5, 200, game);

    // build an enemy robot
    let robot = new Robot(160, 160, 20, 5, 100, game);
    game.baddies.push(robot);

    camera = new Game.Camera();
    camera.follow = game.players['client'];
}

function draw() {
    background(game.backgroundColor); // to clear the canvas
    camera.capture();

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

    // move camera about
    let cs = s;
    if (keyCode === 65){         //a
        camera.pan.dx = cs;
    } else if (keyCode === 68){  //d
        camera.pan.dx = -cs
    } else if (keyCode === 87){  //w
        camera.pan.dy = cs;
    } else if (keyCode === 83){  //s
        camera.pan.dy = -cs;
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

    let cs = camera.pan.speed;
    if (keyCode === 65){         //a
        camera.pan.dx = 0;
    } else if (keyCode === 68){  //d
        camera.pan.dx = 0
    } else if (keyCode === 87){  //w
        camera.pan.dy = 0;
    } else if (keyCode === 83){  //s
        camera.pan.dy = 0;
    }

}
let fToggle = 0;
function keyTyped() {
    if (key === 'f') {
        fToggle = (fToggle + 1) % 3;
        if (fToggle === 0){
            camera.follow = game.players['client'];
        } else if (fToggle === 1){
            camera.follow = game.baddies[0];
        } else {
            camera.follow = game.origin;
        }
        camera.resetPan();
    }
}