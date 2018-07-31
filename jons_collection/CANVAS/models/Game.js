function Game(){
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
    }
}
