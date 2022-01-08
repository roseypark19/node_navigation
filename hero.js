class TinyHero {
    constructor(game, x, y, destinations) {
        Object.assign(this, { game, x, y, destinations });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/hero.png");
        this.facing = [0, 0]; // down, up, right, left
                              // 0, 1, 0, 1 
        this.state = 0; // idle, walking, shooting, charged, dead
                        // 0, 1, 2, 3, 4
        this.velocityConstant = 2;
        this.velocity = { x : 0, y : 0 };
        this.animations = [];
        this.scale = PARAMS.SCALE / 2;
        this.targetIndex = 0;
        this.prevTargetIndex = 0;
        this.x = this.destinations[this.targetIndex].originX - 16 * this.scale;
        this.y = this.destinations[this.targetIndex].originY - 16 * this.scale;
        this.target = this.destinations[this.targetIndex];
        this.updateBB();
        this.loadAnimations();
    };

    loadAnimations() {
        this.animations[0] = new AnimationGroup(this.spritesheet, 0, 0, 32, 32, 16, 0.25, false, true);
        this.animations[1] = new AnimationGroup(this.spritesheet, 64 * 32, 0, 32, 32, 4, 0.1, false, true);
    };
    
    update() {
        let newVelX = 0;
        let newVelY = 0;
        let prevState = this.state;
        this.facing[0] = 0;
        
        if (this.game.right) {
            newVelX += this.velocityConstant;
        }
        if (this.game.left) {
            newVelX -= this.velocityConstant;
        }
        if (this.game.up) {
            newVelY -= this.velocityConstant;
        }
        if (this.game.down) {
            newVelY += this.velocityConstant;
        }

        if (newVelX !== 0) {
            if (distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0) {
                if (Math.sign(newVelX) === Math.sign(this.target.neighbors.prev.x) && this.targetIndex > 0) {
                    this.targetIndex--;
                } else if (Math.sign(newVelX) === Math.sign(this.target.neighbors.next.x) && this.targetIndex < this.destinations.length - 1) {
                    this.targetIndex++;
                }
            } else {
                let sign = this.prevTargetIndex < this.targetIndex ? Math.sign(this.target.neighbors.prev.x) : Math.sign(this.target.neighbors.next.x);
                if (sign === Math.sign(newVelX)) {
                    let temp = this.targetIndex;
                    this.targetIndex = this.prevTargetIndex;
                    this.prevTargetIndex = temp;
                }
            }
        }

        if (newVelY !== 0) {
            if (distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0) {
                if (Math.sign(newVelY) === Math.sign(this.target.neighbors.prev.y) && this.targetIndex > 0) {
                    this.targetIndex--;
                } else if (Math.sign(newVelY) === Math.sign(this.target.neighbors.next.y) && this.targetIndex < this.destinations.length - 1) {
                    this.targetIndex++;
                }
            } else {
                let sign = this.prevTargetIndex < this.targetIndex ? Math.sign(this.target.neighbors.prev.y) : Math.sign(this.target.neighbors.next.y);
                if (sign === Math.sign(newVelY)) {
                    let temp = this.targetIndex;
                    this.targetIndex = this.prevTargetIndex;
                    this.prevTargetIndex = temp;
                }
            }
        }

        this.target = this.destinations[this.targetIndex];

        let unitVect = { x: 0, y: 0 }; 

        if (distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) !== 0) {
            unitVect = unitVector({ x: this.target.originX - this.BB.center.x, y: this.target.originY - this.BB.center.y });
        }

        this.velocity.x = unitVect.x * Math.min(this.velocityConstant, Math.abs(this.BB.center.x - this.target.originX));
        this.velocity.y = unitVect.y * Math.min(this.velocityConstant, Math.abs(this.BB.center.y - this.target.originY));
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.updateBB();

        if (distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0) {
            this.prevTargetIndex = this.targetIndex; 
        }

        if (!this.target.stoppable && distance(this.BB.center, {x: this.target.originX, y: this.target.originY}) === 0 &&
            this.targetIndex > 0 && this.targetIndex < this.destinations.length - 1) {
            if (this.velocity.x !== 0) {
                this.targetIndex = Math.sign(this.target.neighbors.next.x) === -Math.sign(this.velocity.x) ? this.targetIndex - 1 : this.targetIndex + 1;
            } else if (this.velocity.y != 0) {
                this.targetIndex = Math.sign(this.target.neighbors.next.y) === -Math.sign(this.velocity.y) ? this.targetIndex - 1 : this.targetIndex + 1;
            }
            this.target = this.destinations[this.targetIndex];
        }

        this.state = magnitude(this.velocity) > 0 ? 1 : 0;
        this.facing[0] = this.velocity.y >= 0 ? 0 : 1;
        if (this.state === 1 && this.velocity.x !== 0) {
            this.facing[1] = this.velocity.x < 0 ? 1 : 0;
        } else if (this.state === 0) {
            this.facing[1] = 0;
        }

        if (this.state !== prevState) {
            this.animations[prevState].reset();
        }
    };

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 32 * this.scale, 32 * this.scale);
    };
    
    draw(ctx) {
        this.animations[this.state]
            .drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale, this.facing[0], this.facing[1]);

        if (PARAMS.DEBUG) {
            ctx.lineWidth = PARAMS.DEBUG_WIDTH;
            ctx.strokeStyle = PARAMS.DEBUG_COLOR;
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

