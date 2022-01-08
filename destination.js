class Destination {

    constructor(game, originX, originY, neighbors, stoppable) {
        Object.assign(this, {game, originX, originY, neighbors, stoppable});
    };

    update() {};

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = this.stoppable ? "Red" : "Brown";
        ctx.beginPath();
        ctx.moveTo(this.originX - this.game.camera.x, this.originY - this.game.camera.y);
        ctx.lineTo(this.originX - this.game.camera.x + this.neighbors.prev.x * (100 - 2 * PARAMS.SCALE), this.originY - this.game.camera.y + this.neighbors.prev.y * (100 - 2 * PARAMS.SCALE));
        ctx.stroke();
        ctx.strokeRect(this.originX - 1 * PARAMS.SCALE - this.game.camera.x, this.originY - 1 * PARAMS.SCALE - this.game.camera.y, 2 * PARAMS.SCALE, 2 * PARAMS.SCALE);
        ctx.fillRect(this.originX - 1 * PARAMS.SCALE - this.game.camera.x, this.originY - 1 * PARAMS.SCALE - this.game.camera.y, 2 * PARAMS.SCALE, 2 * PARAMS.SCALE);
    };
};