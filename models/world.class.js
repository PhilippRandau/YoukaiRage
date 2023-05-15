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
    canvas;
    ctx;
    keyboard;
    camera_x = 506.01;
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



    throwableObjects = [];
    tileCollisions2D = [];

    background_Sound_Outside = new Audio('audio/background/backgroundSoundEffectOutside.mp3');
    background_Sound_EnemyBase = new Audio('audio/background/backgroundSoundEffectEnemieBase.mp3');

    frameCount = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.gameStarted = true;
        this.worldGeneration();
        this.setWorld();
        this.update();
        this.updateDraw();
        this.updateCheckforBlockCollisionsEnemies();

    }

    reset() {
        let audioElements = document.getElementsByTagName("audio");
        for (let i = 0; i < audioElements.length; i++) {
            audioElements[i].stop();
        }


        this.collectibles.splice(0,this.collectibles.length);
        this.enemies.splice(0,this.enemies.length);
        this.collisionBlocks.splice(0,this.collisionBlocks.length);


        this.camera_x = 506.01;
        delete this.character;
        this.character = new Character();


        this.enemies.push(
            new Worker(0, -538, 250, false),
            new Worker(1, -386, 250, true),
            new Worker(2, 15, 250, true),
            new Worker(3, 210, 250, false),
            new Worker(4, 260, 250, true),
            new Worker(5, 487, 250, true),
            new Worker(6, 722, 250, true),
            new Worker(7, 2800, 250, false),
            new Worker(8, 2850, 250, true),
            new Worker(9, 5421, 230, true),
            new Dumper(10, -161, 250, true),
            new Dumper(11, 980, 250, true),
            new Dumper(12, 1657, 250, true),
            new Dumper(13, 2696, 250, true),
            new MechWorker(14, 1962, 125, true),
            new MechWorker(15, 3429, 250, true),
            new MechWorker(16, 4080, 250, true),
            new MechWorker(17, 4658, 250, true),
            new Endboss(18, 6800, 250, true),
        );


        this.collectibles.push(
            new Collectible(0, -150, 60),
            new Collectible(1, -120, 60),
            new Collectible(2, -90, 60),
            new Collectible(3, -60, 60),
            new Collectible(4, 130, 120),
            new Collectible(5, 160, 120),
            new Collectible(6, 870, 120),
            new Collectible(7, 900, 120),
            new Collectible(8, 930, 120),
            new Collectible(9, 2785, 90),
            new Collectible(10, 2755, 90),
            new Collectible(11, 2725, 90),
            new Collectible(12, 2950, 90),
            new Collectible(13, 3140, 90),
            new Collectible(14, 3300, 180),
            new Collectible(15, 5925, 280),
            new Collectible(16, 5955, 280),
            new Collectible(17, 6660, 160),
            new Collectible(18, 6725, 160),
            new Collectible(19, 7110, 420),
            new Collectible(20, 7140, 420),
            new Collectible(21, 7170, 420),
        );
    }

    update() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastUpdateTime;

        this.checkforBlockCollisionsCharacter();

        this.character.update();

        this.playBackgroundEffects();



        this.lastUpdateTime = currentTime;

        if (this.gameStarted) {
            setTimeout(() => {
                this.update();
            }, this.UPDATE_INTERVAL - elapsedTime);
        }
    }

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



    updateCheckforBlockCollisionsEnemies() {
        const currentTime = Date.now();
        const elapsedTime = currentTime - this.lastUpdateCollisions;

        this.checkforBlockCollisionsEnemies();

        this.checkCollisions();

        this.lastUpdateCollisions = currentTime;


        if (this.gameStarted) {
            setTimeout(() => {
                this.updateCheckforBlockCollisionsEnemies();
            }, this.UPDATE_INTERVAL_DRAW - elapsedTime);
        }
    }


    checkforBlockCollisionsCharacter() {
        this.character.updateHitbox();
        this.checkforHorizontalCollisions();
        this.character.applyGravity();
        this.character.updateHitbox();
        this.checkforVerticalCollisions();
    }


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

    worldGeneration() {
        this.generateCollisionBlocks();
    }

    generateCollisionBlocks() {
        for (let i = 0; i < tileCollisions.length; i += 300) {
            this.tileCollisions2D.push(tileCollisions.slice(i, i + 300))
        }

        this.tileCollisions2D.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol >= 1) {
                    this.collisionBlocks.push(new CollisionBlock(x * 32, y * 32))
                }
            })
        })
    }

    setWorld() {
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.collectibles.forEach(collectible => {
            collectible.world = this;
        });

    }



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

    addStatusTexts(objects) {
        objects.forEach(object => {
            this.addStatusText(object);
        });
    }

    addStatusText(object) {
        object.drawText(this.ctx);
    }


    addEachToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }


    addToMap(mo) {
        if (mo.otherDirection == true) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);


        if (mo.otherDirection == true) {
            this.flipImageBack(mo);
        }
        // mo.drawFrameHitbox(this.ctx);
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }



    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            enemy.update();
            if (this.character.isCollidingHitbox(this.character.hitbox, enemy.hitbox) && !this.character.isJumping() && !this.character.isDead() && this.character.isFalling() && enemy.energy > 0) {
                this.character.enemieHit = true;
                enemy.hit();
                this.character.lastHitTime = Date.now();
            } else if (this.character.isCollidingHitbox(this.character.hitbox, enemy.hitbox) && this.character.energy > 0 && enemy.energy > 0) {
                if (this.character.lastHitTime === undefined || this.isTimePassed(500)) {
                    this.character.hit();
                    this.character.lastHitTime = Date.now();
                }
            }
        });


        if (this.enemies[18]) {
            let endboss = this.enemies[18];
            if (endboss.isCollidingHitbox(endboss.hitboxAttack, this.character.hitbox) && this.character.energy > 0 && endboss.energy > 0 && endboss.isAttacking) {
                if (this.character.lastHitTime === undefined || this.isTimePassed(500)) {
                    this.character.hit();
                    this.character.lastHitTime = Date.now();
                }
            }
        }

        this.throwableObjects.forEach((throwableObject) => {
            throwableObject.update();
            throwableObject.world = this;
            if (this.level.enemies[18].isCollidingHitbox(this.level.enemies[18].hitbox, throwableObject.hitbox) && this.level.enemies[18].energy > 0 && !throwableObject.hit) {
                this.level.enemies[18].hit();
                throwableObject.hit = true;
            }

        });

        this.collectibles.forEach((collectible) => {
            if (this.character.isCollidingHitbox(this.character.hitbox, collectible)) {
                collectible.collect();
            }
        })





    }


    isTimePassed(time) {
        return Date.now() - this.character.lastHitTime > time;
    }


    checkforHorizontalCollisions() {
        this.collisionBlocks.forEach(collisionBlock => {
            if (this.character.isCollidingHitbox(this.character.hitbox, collisionBlock)) {
                if (this.character.velocityX > 0) {
                    this.character.velocityX = 0;
                    const offset = this.character.hitbox.x - this.character.x + this.character.hitbox.width;
                    this.character.x = collisionBlock.x - offset - 0.01;
                }
                if (this.character.velocityX < 0) {
                    this.character.velocityX = 0;
                    const offset = this.character.hitbox.x - this.character.x;
                    this.character.x = collisionBlock.x + collisionBlock.width - offset + 0.01;
                }
            }

            this.throwableObjects.forEach(throwableObject => {
                if (throwableObject.isCollidingHitbox(throwableObject.hitbox, collisionBlock) && !throwableObject.hit) {
                    throwableObject.hit = true;
                }
            })

        });
    }

    checkforVerticalCollisions() {
        this.collisionBlocks.forEach(collisionBlock => {
            if (this.character.isCollidingHitbox(this.character.hitbox, collisionBlock)) {
                if (this.character.velocityY > 0) {
                    this.character.velocityY = 0;
                    const offset = this.character.hitbox.y - this.character.y + this.character.hitbox.height;
                    this.character.y = collisionBlock.y - offset - 0.01;
                }
                if (this.character.velocityY < 0) {
                    this.character.velocityY = 0;
                    const offset = this.character.y - this.character.hitbox.y;
                    this.character.y = collisionBlock.y + collisionBlock.height + offset + 0.01;
                }
            }
        });

    }


    checkforBlockCollisionsEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.updateHitbox();
        });
        this.level.enemies.forEach(enemy => {
            this.collisionBlocks.forEach(collisionBlock => {
                this.checkforHorizontalBlockCollisionsEnemies(enemy, collisionBlock);
            });
        });
        this.level.enemies.forEach(enemy => {
            enemy.applyGravity();
        });
        this.level.enemies.forEach(enemy => {
            enemy.updateHitbox();
        });
        this.level.enemies.forEach(enemy => {
            this.collisionBlocks.forEach(collisionBlock => {
                this.checkforVerticalBlockCollisionsEnemies(enemy, collisionBlock);
            });
        });
    }



    checkforHorizontalBlockCollisionsEnemies(enemy, collisionBlock) {
        if (enemy.isCollidingHitbox(enemy.hitbox, collisionBlock)) {
            if (enemy.velocityX > 0) {
                enemy.velocityX = 0;
                const offset = enemy.hitbox.x - enemy.x + enemy.hitbox.width;
                enemy.x = collisionBlock.x - offset - 0.01;
            }
            if (enemy.velocityX < 0) {
                enemy.velocityX = 0;
                const offset = enemy.hitbox.x - enemy.x;
                enemy.x = collisionBlock.x + collisionBlock.width - offset + 0.01;
            }
        }
    }


    checkforVerticalBlockCollisionsEnemies(enemy, collisionBlock) {
        if (enemy.isCollidingHitbox(enemy.hitbox, collisionBlock)) {
            if (enemy.velocityY > 0) {
                enemy.velocityY = 0;
                const offset = enemy.hitbox.y - enemy.y + enemy.hitbox.height;
                enemy.y = collisionBlock.y - offset - 0.01;
            }
            if (enemy.velocityY < 0) {
                enemy.velocityY = 0;
                const offset = enemy.y - enemy.hitbox.y;
                enemy.y = collisionBlock.y + collisionBlock.height + offset + 0.01;
            }

        }
    }
}
