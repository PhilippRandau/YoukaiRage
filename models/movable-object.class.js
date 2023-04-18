class MovableObject extends DrawableObject {
    // speed = 0.2;
    otherDirection = false;
    direction = '';
    velocityX = 0;
    velocityY = 1;
    gravity = 0.02;
    energy = 100;
    lastHit = 0;
    previousImg;

    hitbox = {
        x: this.x,
        y: this.y,
        width: 20,
        height: 20,
    }

    offset = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }

    world;

    applyGravity() {
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        if (this.y + this.height + this.velocityY < canvas.height) {
            this.velocityY += this.gravity;

        } else {
            this.velocityY = 0;
        }
    }


    isAboveGround() {
        return this.velocityY !== 0;
    }


    moveLeft() {
        setInterval(() => {
            this.x -= this.velocityX;
            if (this.x < -740 * 2) {
                this.x = 740 * 6;
            }
        }, 1000 / 60);
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    isColliding(mo) {
        return this.y + this.height >= mo.y &&
            this.y <= mo.y + mo.height &&
            this.x <= mo.x + mo.width &&
            (this.x + this.width) >= mo.x;
    }

    isCollidingHitbox(object1, object2) {
        return object1.y + object1.height >= object2.y &&
            object1.y <= object2.y + object2.height &&
            object1.x <= object2.x + object2.width &&
            (object1.x + object1.width) >= object2.x;
    }


    // //   // Wenn der Charakter auf einer Plattform steht, bewege ihn mit der Plattform
    // //   if (character.isOnPlatform) {
    // //     character.y += platform.speedY;
    // //   }
    // }

    hit() {
        if (this.energy > 0) {
            this.lastHit = new Date().getTime();
        }
        this.energy -= 20;
        if (this instanceof Character) {
            world.statusBar[0].setPercentage(this.energy);
        } else if (this instanceof Endboss) {
            world.statusBar[4].setPercentage(this.energy);
            world.statusText[0].setPercentage(this.energy);
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }

    isDead() {
        return this.energy === 0;
    }

    switchSprite(img, frameRate, frameBuffer) {
        if (img !== this.previousImg) {
            this.currentFrame = 0;
        }
        this.loadImage(img);
        this.frameRate = frameRate;
        this.frameBuffer = frameBuffer;
        this.previousImg = img;
    }


    updateHitbox() {
        // if (this.otherDirection) {
        //     this.hitbox.x = this.x + (this.width / 2) + (this.width / 2) - this.offset.x - this.hitbox.width;
        // } else {
        this.hitbox.x = this.x + this.offset.x;
        // }
        this.hitbox.y = this.y + this.offset.y;
        this.hitbox.width = this.offset.width;
        this.hitbox.height = this.offset.height;
    }


}
