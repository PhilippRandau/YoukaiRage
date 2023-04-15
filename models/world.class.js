class World {
    backgroundObjects = level1.backgroundObjects;
    character = new Character();
    enemies = level1.enemies;
    clouds = level1.clouds;
    tiles = level1.tiles;
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = [
        new StatusBar(
            [
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
            ], 20, 0, 100),
        new StatusBar(
            [
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
                'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
            ], 20, 40, 100),
        new StatusBar(
            [
                'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
                'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
                'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
                'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
                'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
                'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
            ], 20, 80, 0),

        new StatusBar(
            [
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
                'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
            ], 510, 0, 100),

        new StatusBar(
            [
                'img/7_statusbars/3_icons/icon_health_endboss.png'
            ], 503, 8, 0)
    ];
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.update();
        this.setWorld();
        this.characterInteractions();
        this.updateAllHitboxes();
    }

    update() {
        this.draw();

        this.character.updateHitbox();
        this.checkforHorizontalCollisions();
        this.character.applyGravity();
        this.character.updateHitbox();
        this.checkforVerticalCollisions();

        // update wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.update();

        });

    }

    updateAllHitboxes() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                enemy.updateHitbox();
            });
        }, 100);
    }

    setWorld() {
        this.character.world = this;
        this.level.enemies[3].world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.translate(this.camera_x / 20, 0);

        this.addEachToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x / 20, 0);

        this.ctx.translate(this.camera_x, 0);

        this.addEachToMap(this.level.clouds);

        this.addEachToMap(this.level.enemies);

        this.addEachToMap(this.level.tiles);

        this.addToMap(this.character);

        this.addEachToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);


        this.addEachToMap(this.statusBar);

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
        mo.drawFrame(this.ctx);


        if (mo.otherDirection == true) {
            this.flipImageBack(mo);
        }
        mo.drawFrameHitbox(this.ctx);
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
        // setInterval(() => {
        //     this.addChargeObject();
        // }, 100);
        setInterval(() => {
            this.checkCollisions();
        }, 50);
    }

    // addChargeObject() {
    //     if (this.keyboard.CHARGE && this.character.charges > 0) {
    //         setTimeout(() => {
    //             let charges = new ThrowableObject(this.character.x + 80, this.character.y + 70, this.character.otherDirection);
    //             this.throwableObjects.push(charges);
    //             this.statusBar[1].setPercentage(this.character.charges);
    //         }, 240);
    //         this.character.charges -= 5;//20
    //     }
    // }

    checkChargeObject() {
        this.throwableObjects.forEach((throwableObject, index) => {
            console.log(throwableObject);
            if (throwableObject.y > 1000) {
                this.throwableObjects.splice(index, 1);
            }
        })
    }

    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCollidingHitbox(this.character.hitbox, enemy.hitbox) && this.character.energy > 0) {
                this.character.hit();
            }
        });

        this.throwableObjects.forEach(throwableObject => {
            if (this.level.enemies[6].isCollidingHitbox(this.level.enemies[6].hitbox, throwableObject) && this.level.enemies[6].energy > 0) {
                this.level.enemies[6].hit();
            }
        });


    }

    checkforHorizontalCollisions() {
        this.level.tiles.forEach(tile => {
            if (this.character.isCollidingHitbox(this.character.hitbox, tile)) {
                if (this.character.velocityX > 0) {
                    this.character.velocityX = 0;
                    const offset = this.character.hitbox.x - this.character.x + this.character.hitbox.width;
                    this.character.x = tile.x - offset - 0.01;
                }
                if (this.character.velocityX < 0) {
                    this.character.velocityX = 0;
                    const offset = this.character.hitbox.x - this.character.x;
                    this.character.x = tile.x + tile.width - offset + 0.01;
                }
            }
        });
    }

    checkforVerticalCollisions() {
        this.level.tiles.forEach(tile => {
            if (this.character.isCollidingHitbox(this.character.hitbox, tile)) {
                if (this.character.velocityY > 0) {
                    this.character.velocityY = 0;
                    const offset = this.character.hitbox.y - this.character.y + this.character.hitbox.height;
                    this.character.y = tile.y - offset - 0.01;
                }
                if (this.character.velocityY < 0) {
                    this.character.velocityY = 0;
                    const offset = this.character.y - this.character.hitbox.y;
                    this.character.y = tile.y + tile.height + offset + 0.01;
                }
            }
        });
    }




}
