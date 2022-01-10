class MapTile {
    constructor(game, x, y, spritePath, spriteX, spriteY, collideable) {
        Object.assign(this, {game, x, y, spritePath, spriteX, spriteY, collideable});
        
        this.animator = new AnimationGroup(ASSET_MANAGER.getAsset(this.spritePath), 
                                           spriteX, spriteY, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH, 1, 1, false, true);
        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH * PARAMS.SCALE,
                                  PARAMS.BLOCKWIDTH * PARAMS.SCALE);                      
    };

    update() {};

    drawMmap(ctx) {
        let paint = false;
        if (this.spritesheet === "./sprites/level/floor.png") {
            paint = true;
            ctx.strokeStyle = rgb(97, 112, 114);
            ctx.fillStyle = rgb(97, 112, 114);
        } else if (this.collideable) {
            paint = true;
            ctx.strokeStyle = rgb(48, 48, 48);
            ctx.fillStyle = rgb(48, 48, 48);
        }
        if (paint) {
            ctx.strokeRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
                           this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
                           8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
            ctx.fillRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
                         this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
                         8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
        }
    };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.SCALE);
        if (this.collideable && PARAMS.DEBUG) {
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class PropTile {
    constructor(game, x, y, spritePath, spriteX, spriteY, offsetX, offsetY, width, height, collideable) {
        Object.assign(this, {game, x, y, spritePath, spriteX, spriteY, offsetX, offsetY, width, height, collideable});
        
        this.animator = new AnimationGroup(ASSET_MANAGER.getAsset(this.spritePath), 
                                           spriteX, spriteY, width, height, 1, 1, false, true);
        this.BB = new BoundingBox(this.x + this.offsetX * PARAMS.SCALE, this.y + this.offsetY * PARAMS.SCALE, 
                                  this.width * PARAMS.SCALE, this.height * PARAMS.SCALE);       
    };

    update() {};

    // drawMmap(ctx) {
    //     let paint = false;
    //     if (this.spritesheet === "./sprites/level/floor.png") {
    //         paint = true;
    //         ctx.strokeStyle = rgb(97, 112, 114);
    //         ctx.fillStyle = rgb(97, 112, 114);
    //     } else if (this.collideable) {
    //         paint = true;
    //         ctx.strokeStyle = rgb(48, 48, 48);
    //         ctx.fillStyle = rgb(48, 48, 48);
    //     }
    //     if (paint) {
    //         ctx.strokeRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
    //                        this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
    //                        8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
    //         ctx.fillRect(this.x / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmX, 
    //                      this.y / (PARAMS.SCALE / PARAMS.MMAP_SCALE) - this.game.camera.mmY, 
    //                      8 * PARAMS.MMAP_SCALE, 8 * PARAMS.MMAP_SCALE);
    //     }
    // };

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x + this.offsetX * PARAMS.SCALE, 
                                                          this.y - this.game.camera.y + this.offsetY * PARAMS.SCALE, PARAMS.SCALE);
        if (this.collideable && PARAMS.DEBUG) {
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

