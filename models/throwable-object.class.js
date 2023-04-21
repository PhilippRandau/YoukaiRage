class ThrowableObject extends MovableObject {
    otherDirectionCharge;
    startPositionX;
    hit;
    chargeShoot;
    constructor(x, y, otherDirectionCharge) {
        super().loadImage('img/03_character_youkai/Charge_2.png');
        this.frameRate = 4;
        this.otherDirectionCharge = otherDirectionCharge;
        this.chargeMovement();
        this.locChargeStart(x, y);
        this.animate();
        this.startPositionX = this.x;
        
    }


    locChargeStart(x, y) {
        if (this.otherDirectionCharge) {
            this.x = x - 70;
        } else {
            this.x = x;
        }
        this.y = y;
    }

    chargeMovement() {
        this.chargeShoot = setInterval(() => {
            if (this.otherDirectionCharge) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
    }

    animate() {
        let intervalAnimation = setInterval(() => {
            let distance = this.x - this.startPositionX;
            if (distance > 800 ||this.hit) {
                this.offsetCenterIMG = -30;
                this.y = this.y - 10;
                clearInterval(this.chargeShoot);
                this.switchSprite('img/05_Effects/Magic/4_2.png', 4, 15);
                
                if (this.currentFrame == 3) {
                    clearInterval(intervalAnimation);
                    setTimeout(() => {
                        world.throwableObjects.splice(world.throwableObjects.indexOf(this), 1);
                    }, 500);
                }
            }
        }, 100);
    }
}