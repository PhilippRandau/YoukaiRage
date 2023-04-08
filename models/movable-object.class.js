class MovableObject extends DrawableObject {
    // speed = 0.2;
    otherDirection = false;
    direction = '';
    velocityX = 0;
    velocityY = 1;
    gravity = 0.1;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }

    world;

    applyGravity() {
        
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        // if (this.y + this.height + this.velocityY < canvas.height) {
        //     this.velocityY += this.gravity;
            
        // }else{
        //     this.velocityY = 0;
        // }

        // setInterval(() => {
        // this.y -= this.velocityY;
        // this.velocityY -= this.acceleration;
        // if (this.isAboveGround() || this.speedY > 0) {
        //     this.y -= this.speedY;
        //     this.speedY -= this.acceleration;
        // }
        // if (this.speedY < 0 && this.isAboveGround()) {
        //     this.direction = 'down';
        // }
        // }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 180;
        }

    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.velocityX;
            if (this.x < -360) {
                this.x = 740;
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
            this.x + this.width >= mo.x;

        //     (this.x + this.width - this.offset.right) >= mo.x &&
        // this.x + this.offset.left <= (mo.x + mo.width) &&
        // (this.y + this.height - this.offset.bottom) >= mo.y &&
        // (this.y + this.offset.top) <= (mo.y + mo.height);
        // &&
        // mo.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.


    }



    // onCollisionCourse(platform) {
    //     if (this.speedY < 0 && 
    //         (this.x + this.width - this.offset.right) >= platform.x &&
    //         this.x + this.offset.left <= (platform.x + platform.width) &&
    //         (this.y + this.height - this.offset.bottom) >= platform.y &&
    //         (this.y + this.offset.top) <= (platform.y + platform.height)) {
    //       // Charakter steht auf der Plattform
    //       this.speedY = 0;
    //       this.y = platform.y - this.height;
    //       // Setze eine Variable, um zu überprüfen, ob der Charakter auf einer Plattform steht
    //       this.isOnPlatform = true;

    //     //   break;
    //     }
    //     else if(){
    //         this.isOnPlatform = false;
    //     }
    //     // if (!this.isOnPlatform) {
    //     //     player.speedY += gravity;
    //     //     player.y += player.velocityY;
    //     //   }


    // //   // Wenn der Charakter auf einer Plattform steht, bewege ihn mit der Plattform
    // //   if (character.isOnPlatform) {
    // //     character.y += platform.speedY;
    // //   }
    // }

    hit() {
        if (this.energy > 0) {
            this.lastHit = new Date().getTime();
        }
        this.energy -= 10;
        if (this instanceof Character) {
            this.world.statusBar[0].setPercentage(this.energy);
        } else if (this instanceof Endboss) {
            this.world.statusBar[3].setPercentage(this.energy);
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        return timepassed < 1000;
    }

    isDead() {
        return this.energy == 0;
    }

}