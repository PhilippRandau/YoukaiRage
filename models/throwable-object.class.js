class ThrowableObject extends MovableObject {
    otherDirectionCharge;
    startPositionX;
    yAnimationOffset;
    hit;
    chargeShoot;
    world;
    charge_fly = new Audio('audio/youkai/charge_fly.mp3');
    charge_explosion = new Audio('audio/youkai/charge_explosion.mp3');

    offset = {
        x: 7,
        y: 7,
        width: 10,
        height: 10,
    }
    constructor(x, y, otherDirectionCharge) {
        super().loadImage('img/03_character_youkai/Charge_2.png');
        this.frameRate = 4;
        this.otherDirectionCharge = otherDirectionCharge;
        this.chargeMovement();
        this.locChargeStart(x, y);
        this.animate();
        this.startPositionX = this.x;
        this.yAnimationOffset = this.y - 25;
    }


    /**
    * Updates the hitbox of the object.
    */
    update() {
        this.updateHitbox();
    }


    /**
    * Sets the location of the charge start.
    * @param {number} x - The x-coordinate.
    * @param {number} y - The y-coordinate.
    */
    locChargeStart(x, y) {
        if (this.otherDirectionCharge) {
            this.x = x - 70;
        } else {
            this.x = x;
        }
        this.y = y;
    }


    /**
    * Moves the charge in a charging movement.
    */
    chargeMovement() {
        this.chargeShoot = setInterval(() => {
            if (this.otherDirectionCharge) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }


    /**
    * Animates the charge object.
    */
    animate() {
        let intervalAnimation = setInterval(() => {
            let distance = this.x - this.startPositionX;
            this.playSound(this.charge_fly);
            if (this.chargesMaxTraveledDistance(distance) || this.hit) {
                this.adjustPositionChargeHit();
                clearInterval(this.chargeShoot);
                this.switchSprite('img/05_Effects/Magic/4_2.png', 4, 15);
                this.playSound(this.charge_explosion);
                if (this.explosionAnimationEnd()) {
                    this.charge_fly.pause();
                    clearInterval(intervalAnimation);
                    this.deleteThrowableObject();
                }
            }
        }, 1000 / 60);
    }


    /**
    * Checks if the charge has traveled the maximum distance.
    * @param {number} distance - The distance traveled by the charge.
    * @returns {boolean} - True if the charge has traveled the maximum distance, false otherwise.
    */
    chargesMaxTraveledDistance(distance) {
        return distance > 800;
    }


    /**
    * Adjusts the position and hitbox of the charge when hit.
    */
    adjustPositionChargeHit() {
        this.offsetCenterIMG = -30;
        this.y = this.yAnimationOffset;
    }


    /**
    * Checks if the explosion animation of the charge has ended.
    * @returns {boolean} - True if the explosion animation has ended, false otherwise.
    */
    explosionAnimationEnd() {
        return this.currentFrame == 3;
    }


    /**
    * Deletes the throwable object from the world after a delay.
    */
    deleteThrowableObject() {
        setTimeout(() => {
            this.world.throwableObjects.splice(this.world.throwableObjects.indexOf(this), 1);
        }, 50);
    }
}