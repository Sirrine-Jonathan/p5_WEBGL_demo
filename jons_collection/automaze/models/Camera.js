class Camera{
    constructor(game) {
        this.follow = game.origin;
        this.view = {
            x: game.origin.x - this.follow.x,
            y: game.origin.y - this.follow.y
        };
        this.pan = {
            x: 0,
            y: 0,
            dx: 0,
            dy: 0,
        };
    }
}

Camera.prototype.capture = function(){

    this.panUpdate();
    this.setView();

    if (game.backgroundImage) {
        image(game.backgroundImage,
            // destination x, y, w, h
            0,
            0,
            game.canvas.width,
            game.canvas.height,

            // source x, y, w, h
            this.view.x,
            this.view.y,
            game.canvas.width,
            game.canvas.height
        );
    } else {
        // do something if the background image hasn't loaded.
    }
};

Camera.prototype.setView = function(){
    this.view.x = this.follow.x - (game.origin.x + this.pan.x);
    this.view.y = this.follow.y - (game.origin.y + this.pan.y);
};

Camera.prototype.panUpdate = function(){
    this.pan.x += this.pan.dx;
    this.pan.y += this.pan.dy;
};

Camera.prototype.resetPan = function(){
    this.pan.x = 0;
    this.pan.y = 0;
};
