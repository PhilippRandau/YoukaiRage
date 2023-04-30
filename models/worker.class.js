class Worker extends Enemies {
    imgScale = 1.3;
    y = 100;
    energy = 20;
    velocityX = 0;
    velocityY = 1;
    offsetCenterIMG = 33;
    actionRangeX = 200;

    offset = {
        x: 53,
        y: 65,
        width: 20,
        height: 60,
    }



    chicken_sound = new Audio('audio/chicken.mp3');

    constructor(enemieID, x, y, otherDirection) {
        super().loadImage('img/04_enemies/Worker/Idle.png');
        this.frameRate = 4;
        this.loadImages(this.GHOST_IMAGES);
        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        setTimeout(() => {
            this.walk();
        }, 1000);
        
        // this.velocityX = this.velocityX + Math.random() * 0.25
        // this.animate();
        this.otherDirection = otherDirection;

    }

    walk() {
        // let intervalWalk;
        setInterval(() => {
            clearInterval(this.intervalWalk);

            // this.switchSprite('img/04_enemies/Worker/Attack7.png', 6, 15);
            if (!this.isDead()) {
                if (this.inRangeXRight(20) || this.inRangeXLeft(20)) {
                    this.switchSprite('img/04_enemies/Worker/Idle.png', 4, 30);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                } else if (this.inRangeXRight(100)) {
                    this.otherDirection = false;
                    this.switchSprite('img/04_enemies/Worker/Attack8.png', 6, 30);
                    this.velocityX = 0.8;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                } else if (this.inRangeXLeft(100)) {
                    this.otherDirection = true;
                    this.switchSprite('img/04_enemies/Worker/Attack8.png', 6, 30);
                    this.velocityX = -0.8;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                } else if (this.inRangeXRight(200)) {
                    this.otherDirection = false;
                    this.switchSprite('img/04_enemies/Worker/Walk.png', 6, 30);
                    this.velocityX = 0.6;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                } else if (this.inRangeXLeft(200)) {
                    this.otherDirection = true;
                    this.switchSprite('img/04_enemies/Worker/Walk.png', 6, 30);
                    this.velocityX = -0.6;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                }
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
                this.switchSprite('img/04_enemies/Worker/Idle.png', 4, 30);
            }
        }, 100);
    }

    inRangeXLeft(actionRangeX) {
        return this.world.character.x > this.x - actionRangeX && this.world.character.x < this.x;
    }

    inRangeXRight(actionRangeX) {
        return this.world.character.x > this.x && this.world.character.x < this.x + actionRangeX;
    }

}