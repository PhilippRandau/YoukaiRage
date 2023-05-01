class Worker extends Enemies {
    imgScale = 1.3;
    energy = 20;
    offsetCenterIMG = 33;
    actionRangeX = 200;

    offset = {
        x: 53,
        y: 65,
        width: 20,
        height: 60,
    }

    idle_images = 'img/04_enemies/Worker/Idle.png'
    attack_images = 'img/04_enemies/Worker/Attack8.png'
    walk_images = 'img/04_enemies/Worker/Walk.png'

    walking_sound = new Audio('audio/walking_enemies/walk.mp3');
    running_sound = new Audio('audio/walking_enemies/run.mp3');

    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite(this.idle_images, 4, 25);

        this.loadImages(this.GHOST_IMAGES);

        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;

        setTimeout(() => {
            this.walk();
        }, 1000);
    }

    walk() {
        // let intervalWalk;
        setInterval(() => {
            clearInterval(this.intervalWalk);

            if (!this.isDead()) {
                if (this.inRangeXRight(20) || this.inRangeXLeft(20)) {
                    this.switchSprite(this.idle_images, 4, 25);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                    this.pauseSounds();
                } else if (this.inRangeXRight(100)) {
                    this.otherDirection = false;
                    this.switchSprite(this.attack_images, 6, 15);
                    this.velocityX = 0.8;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                        this.pauseSounds();
                        this.playSound(this.running_sound);
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();

                } else if (this.inRangeXLeft(100)) {
                    this.otherDirection = true;
                    this.switchSprite(this.attack_images, 6, 15);
                    this.velocityX = -0.8;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                        this.pauseSounds();
                        this.playSound(this.running_sound);
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                } else if (this.inRangeXRight(200)) {
                    this.otherDirection = false;
                    this.switchSprite(this.walk_images, 6, 25);
                    this.velocityX = 0.4;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                        this.pauseSounds();
                        this.playSound(this.walking_sound);
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                } else if (this.inRangeXLeft(200)) {
                    this.otherDirection = true;
                    this.switchSprite(this.walk_images, 6, 25);
                    this.velocityX = -0.4;
                    this.intervalWalk = setInterval(() => {
                        this.x += this.velocityX;
                        this.pauseSounds();
                        this.playSound(this.walking_sound);
                    }, 1000 / 120);
                    clearInterval(this.intervalAnimation);
                    this.animate();
                }
            }
        }, 100);
    }


    pauseSounds() {
        this.walking_sound.pause();
        this.running_sound.pause();
    }

    playSound(sound) {
        if (this.world.audio) {
            sound.play();
        }
        
    }
    animate() {
        this.intervalAnimation = setInterval(() => {
            if (this.isDead()) {
                this.walking_sound.pause();
                this.playAnimation(this.GHOST_IMAGES);
                this.frameRate = 1;
                clearInterval(this.intervalWalk);
                this.offsetCenterIMG = -30;
                this.offset.height = 90;
                if (this.currentImage > 18) {
                    clearInterval(this.intervalAnimation);
                    delete this.world.level.enemies[this.enemieID];
                }
            } else {
                this.switchSprite(this.idle_images, 4, 25);
                this.walking_sound.pause();
                this.running_sound.pause();
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