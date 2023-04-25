class Endboss extends MovableObject {
    // height = 320;
    // width = 320;
    imgScale = 1.5;
    y = 255;
    x = 6662;
    intervalAnimation;
    offsetCenterIMG = 27;
    chicken_sound = new Audio('audio/chicken.mp3');
    intervalWalk;
    hitbox = {
        x: this.x,
        y: this.y,
        width: 50,
        height: 80,
    }

    offset = {
        x: 47,
        y: 32,
        width: 50,
        height: 80,
    }


    constructor(enemieID) {
        super().loadImage('img/04_enemies/Endboss/Idle.png');
        this.frameRate = 4;
        // this.x = 300 + Math.random() * 500;
        // this.walk();
        this.enemieID = enemieID;
        this.velocityX = 0.8;
        this.animate();
        this.otherDirection = true;
    }

    walk() {
        setInterval(() => {
            clearInterval(this.intervalWalk);
            if (!this.isDead()) {
                let random = Math.random();
                if (random < 0.35) {
                    this.otherDirection = false;
                    this.loadImage('img/04_enemies/Endboss/Walk.png');
                    this.frameRate = 4;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                    }, 1000 / 120);
                    // clearInterval(this.intervalAnimation);
                    // this.animate();
                } else if (random > 0.65) {
                    this.otherDirection = true;
                    this.loadImage('img/04_enemies/Endboss/Walk.png');
                    this.frameRate = 4;
                    this.intervalWalk = setInterval(() => {
                        this.x -= this.velocityX;
                    }, 1000 / 120);
                    // clearInterval(this.intervalAnimation);
                    // this.animate();
                } else if (random < 0.65 && random > 0.35) {
                    this.loadImage('img/04_enemies/Endboss/Idle.png');
                    this.frameRate = 4;
                    // clearInterval(this.intervalAnimation);
                }
            }
            // this.chicken_sound.play();
        }, 2000);
    }

    animate() {
        this.intervalAnimation = setInterval(() => {
            if (this.isDead()) {
                this.switchSprite('img/04_enemies/Endboss/Death.png', 6, 30);
                // this.velocityX = 0;
                // clearInterval(this.intervalWalk);
                if (this.currentFrame >= 4) {
                    clearInterval(this.intervalAnimation);
                    this.switchSprite('img/04_enemies/Endboss/Death.png', 0, 30);
                }
            } else if (this.isHurt()) {
                this.switchSprite('img/04_enemies/Endboss/Hurt.png', 2, 30);

            } else {
                this.switchSprite('img/04_enemies/Endboss/Idle.png', 4, 30);
            }
        }, 150);
    }

    // updateHitbox(){
    //     this.hitbox.x = this.x + 20;
    //     this.hitbox.y = this.y + 32;
    //     this.hitbox.width = 50;
    //     this.hitbox.height = 80;
    // }


}
