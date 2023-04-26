class Dumper extends MovableObject {
    imgScale = 1.3;
    y = 275;
    intervalAnimation;
    energy = 40;
    velocityX = 0.6;
    offsetCenterIMG = 33;


    offset = {
        x: 53,
        y: 65,
        width: 20,
        height: 60,
    }

    GHOST_IMAGES = [
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost1.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost2.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost3.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost4.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost5.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost6.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost7.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost8.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost9.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost10.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost11.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost12.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost13.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost14.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost15.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost16.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost17.png',
        'img/05_Effects/Smoke/Smoke_ghost/Smoke_ghost18.png',
    ];

    chicken_sound = new Audio('audio/chicken.mp3');

    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite('img/04_enemies/Dumper/Idle.png', 4, 30);
        // this.frameRate = 4;
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
        }, 2000);
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