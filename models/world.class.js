class World {
    gameStarted = false;
    UPDATE_INTERVAL = 1000 / 30;
    UPDATE_INTERVAL_DRAW = 1000 / 30;
    lastUpdateTime = Date.now();
    lastUpdateTimeDraw = Date.now();
    lastUpdateCollisions = Date.now();
    backgroundObjects = level1.backgroundObjects;
    character = new Character();
    enemies = level1.enemies;
    asteroids = level1.asteroids;
    tiles = level1.tiles;
    creatures = level1.creatures;
    fallingAsteroids = level1.fallingAsteroids;
    collisionBlocks = level1.collisionBlocks;
    collectibles = level1.collectibles;
    level = level1;
    throwableObjects = [];
    collisionHandler = new CollisionHandler(this.character, this.collisionBlocks, this.throwableObjects, this.collectibles, this.enemies);
    canvas;
    ctx;
    keyboard;
    camera_x = 506;
    statusBar = [
        new StatusBar(
            [
                'img/07_statusbars/Bar 1/LoadingBar_1_Background.png'
            ], 210, 8, 320, 30, 0, 'static'),
        new StatusBar(
            [
                'img/07_statusbars/Bar 1/LoadingBar_1_Fill_Red.png'
            ], 218, 15, 305, 16, 100, 'adjustable')
    ];
    statusText = [
        new StatusText(30, 35, 50, 50, 'Health', 100, 35, 100, 'lightgreen'),
        new StatusText(30, 65, 640, 50, 'Charge', 100, 65, 100, 'red'),
        new StatusText(550, 45, 640, 50, 'Points', 640, 45, 0, 'yellow'),
        new StatusText(240, 52, 640, 50, 'Boss Health', 435, 52, 100, 'white'),
    ];

    background_Sound_Outside = new Audio('audio/background/backgroundSoundEffectOutside.mp3');
    background_Sound_EnemyBase = new Audio('audio/background/backgroundSoundEffectEnemieBase.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameStarted = true;
        this.setWorld();
        this.updateAll();
    }


    /**
    * Resets the world.
    */
    reset() {
        new ResetWorld(this);
    }


    /**
    * Updates all components of the game.
    */
    updateAll() {
        this.updateCharacter();
        this.updateDraw();
        this.updateCheckforBlockCollisionsEnemies();
    }


    /**
    * Updates the character.
    */
    updateCharacter() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastUpdateTime;

        this.collisionHandler.checkforBlockCollisionsCharacter();
        this.character.update();
        this.playBackgroundEffects();

        this.lastUpdateTime = currentTime;
        if (this.gameStarted) {
            setTimeout(() => {
                this.updateCharacter();
            }, this.UPDATE_INTERVAL - elapsedTime);
        }
    }


    /**
    * Updates the draw.
    */
    updateDraw() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastUpdateTimeDraw;

        this.draw();

        this.lastUpdateTimeDraw = currentTime;
        if (this.gameStarted) {
            setTimeout(() => {
                this.updateDraw();
            }, this.UPDATE_INTERVAL_DRAW - elapsedTime);
        }

    }


    /**
    * Updates the block collisions with enemies.
    */
    updateCheckforBlockCollisionsEnemies() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastUpdateCollisions;

        this.collisionHandler.checkforBlockCollisionsEnemies();
        this.collisionHandler.checkCollisions();

        this.lastUpdateCollisions = currentTime;
        if (this.gameStarted) {
            setTimeout(() => {
                this.updateCheckforBlockCollisionsEnemies();
            }, this.UPDATE_INTERVAL_DRAW - elapsedTime);
        }
    }





    /**
    * Plays background effects based on character's position.
    */
    playBackgroundEffects() {
        if (audio) {
            if (this.character.x > 3288) {
                this.background_Sound_EnemyBase.play();
            } else {
                this.background_Sound_Outside.play();
            }
        } else {
            this.background_Sound_Outside.pause();
            this.background_Sound_EnemyBase.pause();
        }
    }



    /**
    * Sets the world for the character, enemies, and collectibles.
    */
    setWorld() {
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.collectibles.forEach(collectible => {
            collectible.world = this;
        });
    }


    /**
     * Clears the canvas and draws all objects in the world.
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x / 20, 0);

        this.addEachToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x / 20, 0);

        this.ctx.translate(this.camera_x, 0);

        this.addEachToMap(this.asteroids);

        this.addEachToMap(this.fallingAsteroids);

        this.addEachToMap(this.level.tiles);

        this.addEachToMap(this.level.enemies);

        this.addEachToMap(this.collectibles);

        this.addToMap(this.character);

        this.addEachToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        this.addStatusTexts(this.statusText);

        this.addEachToMap(this.statusBar);

    }


    /**
    * Adds status texts by calling `addStatusText()` for each object in the array.
    * @param {Array} objects - The array of status text objects.
    */
    addStatusTexts(objects) {
        objects.forEach(object => {
            this.addStatusText(object);
        });
    }


    /**
    * Draws the status text object on the canvas.
    * @param {Object} object - The status text object to be drawn.
    */
    addStatusText(object) {
        object.drawText(this.ctx);
    }


    /**
    * Iterates over the objects array and calls `addToMap()` for each object.
    * @param {Array} objects - The array of objects to be added to the map.
    */
    addEachToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    /**
    * Draws the object on the canvas and handles flipping if necessary.
    * @param {Object} mo - The object to be drawn.
    */
    addToMap(mo) {
        if (mo.otherDirection == true) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

        if (mo.otherDirection == true) {
            this.flipImageBack(mo);
        }
        mo.drawFrameHitbox(this.ctx);
    }


    /**
    * Flips the image horizontally.
    * @param {Object} mo - The object whose image will be flipped.
    */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Reverts the image back to its original orientation.
     * @param {Object} mo - The object whose image will be reverted.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

}
