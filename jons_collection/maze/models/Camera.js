class Camera{
    constructor(game) {
        this.follow = game.origin;
        this.view = {
            x: game.origin.x - this.follow.x,
            y: game.origin.y - this.follow.y
        }
    }
}

Camera.prototype.capture = function(){

    this.setView();

    if (game.backgroundImage) {
        image(game.backgroundImage,
            // destination x, y, w, h
            0,
            0,
            game.canvas.width,
            game.canvas.height,

            // source x, y, w, h
            this.follow.x - game.origin.x,
            this.follow.y - game.origin.y,
            game.canvas.width,
            game.canvas.height
        );
    } else {
        // do something if the background image hasn't loaded.
    }
};

Camera.prototype.setView = function(){
    this.view.x = game.origin.x - this.follow.x;
    this.view.y = game.origin.y - this.follow.y;
};
