let bg;

let players = {};
function Player(x, y, size, speed, color){
	this.x = x;
	this.y = y;
	this.dx = 0;
	this.dy = 0;
	this.size = size;
	this.speed = speed;
	this.color = color;
}

Player.prototype.updatePos = function(){
	this.x += this.dx;
	this.y += this.dy;
};
Player.prototype.draw = function(){
	stroke(0);
	fill(this.color);
	/*
    beginShape();
    vertex(this.x - this.size, this.y - this.size);
    vertex(this.x + this.size, this.y - this.size);
    vertex(this.x + this.size, this.y + this.size);
    vertex(this.x - this.size, this.y + this.size);
    endShape(CLOSE);
    */
	translate(this.x, this.y, 0);
	box(this.size, this.size, this.size);
	translate(-this.x, -this.y, 0);

};

let CAM;
function Camera(x, y, z, centerX, centerY, centerZ, upX, upY, upZ){
	this.x = x;
	this.y = y;
	this.z = z;
	this.centerX = centerX;
	this.centerY = centerY;
	this.centerZ = centerZ;
	this.upX = upX;
	this.upY = upY;
	this.upZ = upZ;

	this.incr = 5;
	this.dx = 0;
	this.dy = 0;
	this.dz = 0;
	this.centerDX = 0;
	this.centerDY = 0;
	this.centerDZ = 0;
}
Camera.prototype.updatePos = function(){
	this.x += this.dx;
	this.y += this.dy;
	this.z += this.dz;
	this.centerX += this.centerDX;
	this.centerY += this.centerDY;
	this.centerZ += this.centerDZ;
	let display = document.querySelector("#display");
	display.innerHTMl = JSON.stringify(this);
};

function setup() {
	bg = loadImage("../assets/burried.png");
	createCanvas(windowWidth, windowHeight, WEBGL);
	//createCanvas(512, 288, WEBGL);
	let firstPlayer = new Player(80, 80, 20, 5, 200);
	players['first'] = firstPlayer;
	let initY = (height/2.0) / tan(PI*30.0 / 180.0);
	CAM = new Camera(0, 0, initY, 0, 0, 0, 0, 1, 0);
}

function draw() {

	// BACKGROUND
	background(255);

	// CAMERA
	CAM.updatePos();
	camera(CAM.x, CAM.y, CAM.z, players['first'].x, players['first'].y, CAM.centerZ, CAM.upX, CAM.upY, CAM.upZ);
    //camera(CAM.x, CAM.y, CAM.z, CAM.centerX, CAM.centerY, CAM.centerZ, CAM.upX, CAM.upY, CAM.upZ);
	// PLAYERS
	for (p in players){
		players[p].updatePos();
		players[p].draw();
	}
	sphere(10);

}

function keyPressed(){

	// move player about
	let s = players['first'].speed;
	if (keyCode === LEFT_ARROW){
		players['first'].dx = -s;
	} else if (keyCode === RIGHT_ARROW){
        players['first'].dx = s;
	} else if (keyCode === UP_ARROW){
        players['first'].dy = -s;
	} else if (keyCode === DOWN_ARROW){
        players['first'].dy = s;
	}

	// increase camera values
	let i = CAM.incr;
	if (keyCode === 81){            // q
        CAM.dx = i
	} else if (keyCode === 87) {    // w
		CAM.dy = i
    } else if (keyCode === 69){     // e
		CAM.dz = i;
    } else if (keyCode === 82){     // r
		CAM.centerDX = i;
    } else if (keyCode === 84){     // t
		CAM.centerDY = i;
    } else if (keyCode === 89){     // y
		CAM.centerDZ = i;
    } else if (keyCode === 85){     // u

    } else if (keyCode === 73){     // i

    } else if (keyCode === 79){     // o

    }

    // decrease camera values
    if (keyCode === 65){
        // a
		CAM.dx = -i;
    } else if (keyCode === 83) {
        // s
		CAM.dy = -i;
    } else if (keyCode === 68){
        // d
		CAM.dz = -i;
    } else if (keyCode === 70){
        // f
		CAM.centerDX = -i;
    } else if (keyCode === 71){
        // g
		CAM.centerDY = -i;
    } else if (keyCode === 72){
        // h
		CAM.centerDZ = -i;
    } else if (keyCode === 74){
        // j

    } else if (keyCode === 75){
        // k

    } else if (keyCode === 76){
        // l

    }


}

function keyReleased(){

	// stop player motion
    if (keyCode === LEFT_ARROW){
        players['first'].dx = 0;
    } else if (keyCode === RIGHT_ARROW){
        players['first'].dx = 0;
    } else if (keyCode === UP_ARROW){
        players['first'].dy = 0;
    } else if (keyCode === DOWN_ARROW){
        players['first'].dy = 0;
    }

    // stop camera motion
    if (keyCode === 81){
        // q
        CAM.dx = 0
    } else if (keyCode === 87) {
        // w
        CAM.dy = 0
    } else if (keyCode === 69){
        // e
        CAM.dz = 0;
    } else if (keyCode === 82){
        // r
		CAM.centerDX = 0;
    } else if (keyCode === 84){
        // t
		CAM.centerDY = 0;
    } else if (keyCode === 89){
        // y
		CAM.centerDZ = 0;
    } else if (keyCode === 85){
        // u

    } else if (keyCode === 73){
        // i

    } else if (keyCode === 79){
        // o

    }

    // decrease camera values
    if (keyCode === 65){
        // a
        CAM.dx = 0;
    } else if (keyCode === 83) {
        // s
        CAM.dy = 0;
    } else if (keyCode === 68){
        // d
        CAM.dz = 0;
    } else if (keyCode === 70){
        // f
		CAM.centerDX = 0;
    } else if (keyCode === 71){
        // g
		CAM.centerDY = 0;
    } else if (keyCode === 72){
        // h
		CAM.centerDZ = 0;
    } else if (keyCode === 74){
        // j

    } else if (keyCode === 75){
        // k

    } else if (keyCode === 76){
        // l

    }
}
