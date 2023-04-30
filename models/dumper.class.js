class Dumper extends Enemies {
    imgScale = 1.3;
    y = 275;
    energy = 40;
    velocityX = 0.6;
    offsetCenterIMG = 18;


    offset = {
        x: 30,
        y: 65,
        width: 60,
        height: 60,
    }


    chicken_sound = new Audio('audio/chicken.mp3');

    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite('img/04_enemies/Dumper/Idle.png', 4, 30);
        this.loadImages(this.GHOST_IMAGES);
        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        // this.walk();
        // this.velocityX = this.velocityX + Math.random() * 0.25
        this.animate();
        this.otherDirection = otherDirection;
    }

    walk() {
        let intervalWalk;
        setInterval(() => {
            clearInterval(intervalWalk);
            let random = Math.random();
            if (random < 0.35) {
                this.otherDirection = false;
                this.switchSprite('img/04_enemies/Dumper/Walk.png', 6, 30);
                intervalWalk = setInterval(() => {
                    this.x += this.velocityX;
                }, 1000 / 120);
                clearInterval(this.intervalAnimation);
                this.animate();
            } else if (random > 0.65) {
                this.otherDirection = true;
                this.switchSprite('img/04_enemies/Dumper/Walk.png', 6, 30);
                intervalWalk = setInterval(() => {
                    this.x -= this.velocityX;
                }, 1000 / 120);
                clearInterval(this.intervalAnimation);
                this.animate();
            } else if (random < 0.65 && random > 0.35) {
                this.switchSprite('img/04_enemies/Dumper/Idle.png', 4, 30);
                clearInterval(this.intervalAnimation);
            }
            // this.chicken_sound.play();
        }, 100);
    }

    animate() {
        this.intervalAnimation = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.GHOST_IMAGES);
                this.frameRate = 1;
                clearInterval(this.intervalWalk);
                this.offsetCenterIMG = -30;
                this.y = 240;
                    if (this.currentImage > 18) {
                        clearInterval(this.intervalAnimation);
                        delete world.level.enemies[this.enemieID];
                    }
            } else {
                this.switchSprite('img/04_enemies/Dumper/Idle.png', 4, 30);
            }
        }, 100);
    }
}