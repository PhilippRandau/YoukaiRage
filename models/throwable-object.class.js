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

    update() {
        this.updateHitbox();
        
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
            this.playSound(this.charge_fly);
            if (distance > 800 || this.hit) {
                this.offsetCenterIMG = -30;
                this.y = this.yAnimationOffset;
                clearInterval(this.chargeShoot);
                this.switchSprite('img/05_Effects/Magic/4_2.png', 4, 15);
                if (this.currentFrame == 3) {
                    this.playSound(this.charge_explosion);
                    this.charge_fly.pause();
                    clearInterval(intervalAnimation);
                    setTimeout(() => {
                        this.world.throwableObjects.splice(this.world.throwableObjects.indexOf(this), 1);
                    }, 50);
                }
            }
        }, 10);
    }
}