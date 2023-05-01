class World {
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
        new StatusText(550, 45, 640, 50, 'Points', 660, 45, 0, 'yellow'),
        new StatusText(240, 52, 640, 50, 'Boss Health', 435, 52, 100, 'white'),
    ];
    throwableObjects = [];
    tileCollisions2D = [];
    audio = true;
    background_Sound_Outside = new Audio('audio/background/backgroundSoundEffectOutside.mp3');
    background_Sound_EnemyBase = new Audio('audio/background/backgroundSoundEffectEnemieBase.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.worldGeneration();
        this.update();
        this.setWorld();

        this.characterInteractions();



    }

    update() {
        this.draw();

        this.checkforBlockCollisionsCharacter();

        this.checkforBlockCollisionsEnemies();

        this.playBackgroundEffects();

        // update wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.update();

        });

    }
    checkforBlockCollisionsCharacter() {
        this.character.updateHitbox();
        this.checkforHorizontalCollisions();
        this.character.applyGravity();
        this.character.updateHitbox();
        this.checkforVerticalCollisions();
    }


    playBackgroundEffects() {
        if (this.audio) {
            if (this.character.x > 3288) {
                this.background_Sound_EnemyBase.play();
            } else {
                this.background_Sound_Outside.play();
            }

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
        this.enemies.forEach(enemie => {
            enemie.world = this;
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



        // this.collisionBlocks.forEach(collisionBlock => {
        //     this.ctx.beginPath();
        //     collisionBlock.drawCollisionBlocks(this.ctx)
        //     this.ctx.stroke();
        // })

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

    characterInteractions() {
        setInterval(() => {
            this.checkCollisions();
        }, 10);
    }


    checkCollisions() {
        this.level.enemies.forEach(enemy => {
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


        this.throwableObjects.forEach((throwableObject) => {
            if (this.level.enemies[18].isCollidingHitbox(this.level.enemies[18].hitbox, throwableObject) && this.level.enemies[18].energy > 0 && !throwableObject.hit) {
                this.level.enemies[18].hit();
                throwableObject.hit = true;
            }

        });

        this.collectibles.forEach((collectible) => {

            if (this.character.isCollidingHitbox(this.character.hitbox, collectible)) {
                collectible.collect();
                throwableObject.hit = true;
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
                if (throwableObject.isCollidingHitbox(throwableObject, collisionBlock) && !throwableObject.hit) {
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
