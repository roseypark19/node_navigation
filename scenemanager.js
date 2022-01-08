class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        let destinations = [new Destination(this.game, 0, 0, {prev: {x: 0, y: 0}, next: {x: 1, y: 0}}, true), 
                            new Destination(this.game, 100, 0, {prev: {x: -1, y: 0}, next: {x: 0, y: 1}}, false), 
                            new Destination(this.game, 100, 100, {prev: {x: 0, y: -1}, next: {x: -1, y: 0}}, false), 
                            new Destination(this.game, 0, 100, {prev: {x: 1, y: 0}, next: {x: 0, y: 1}}, true), 
                            new Destination(this.game, 0, 200, {prev: {x: 0, y: -1}, next: {x: 1, y: 0}}, false), 
                            new Destination(this.game, 100, 200, {prev: {x: -1, y: 0}, next: {x: 1, y: 0}}, true),
                            new Destination(this.game, 200, 200, {prev: {x: -1, y: 0}, next: {x: 0, y: 1}}, false),
                            new Destination(this.game, 200, 300, {prev: {x: 0, y: -1}, next: {x: -1, y: 0}}, false),
                            new Destination(this.game, 100, 300, {prev: {x: 1, y: 0}, next: {x: 0, y: 1}}, true),
                            new Destination(this.game, 100, 400, {prev: {x: 0, y: -1}, next: {x: 1, y: 0}}, false),
                            new Destination(this.game, 200, 400, {prev: {x: -1, y: 0}, next: {x: 1, y: 0}}, false),
                            new Destination(this.game, 300, 400, {prev: {x: -1, y: 0}, next: {x: 0, y: -1}}, true),
                            new Destination(this.game, 300, 300, {prev: {x: 0, y: 1}, next: {x: 0, y: 0}}, false)];

        for (let i = 0; i < destinations.length; i++) {
            this.game.addEntity(destinations[i]);
        }
        this.hero = new TinyHero(this.game, 0, 0, destinations);
        this.game.addEntity(this.hero);
    };


    update() {
        PARAMS.DEBUG = document.getElementById("debug").checked;
        let midpoint = { x : PARAMS.CANVAS_DIMENSION / 2, y : PARAMS.CANVAS_DIMENSION / 2 };
        this.x = this.hero.BB.center.x - midpoint.x;
        this.y = this.hero.BB.center.y - midpoint.y;
    };

    updateAudio() {

    };

    draw(ctx) { 

    };
};