class Destination {

    constructor(game, originX, originY, neighbors, stoppable) {
        Object.assign(this, {game, originX, originY, neighbors, stoppable});
    };

    update() {};

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "Black";
        ctx.fillStyle = this.stoppable ? "Red" : "Brown";
        ctx.strokeRect(this.originX - 1 * PARAMS.SCALE - this.game.camera.x, this.originY - 1 * PARAMS.SCALE - this.game.camera.y, 2 * PARAMS.SCALE, 2 * PARAMS.SCALE);
        ctx.fillRect(this.originX - 1 * PARAMS.SCALE - this.game.camera.x, this.originY - 1 * PARAMS.SCALE - this.game.camera.y, 2 * PARAMS.SCALE, 2 * PARAMS.SCALE);
    };
};