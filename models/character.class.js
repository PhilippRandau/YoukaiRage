class Character extends MovableObject {
    y = 280;
    charges = 100;
    coins = 0;
    velocityX = 4;
    offsetCenterIMG = 2;
    lastCall;
    enemieHit;
    walking_sound = new Audio('audio/walk.mp3');
    world;
    constructor() {
        super().switchSprite('img/03_character_youkai/Idle.png', 5, 30);
        this.animate();

        this.interactions();
    }

    animate() {
        setInterval(() => {
            if (this.isDead()) {
                this.switchSprite('img/03_character_youkai/Dead.png', 4, 30);
            } else if (this.isHurt()) {
                this.switchSprite('img/03_character_youkai/Hurt.png', 3, 30);
                this.lastCall = new Date().getTime();
            } else if (this.world.keyboard.CHARGE && this.charges > 0) {
                this.switchSprite('img/03_character_youkai/Attack_3.png', 7, 30);
                this.lastCall = new Date().getTime();
            } else if (this.isFalling()) {
                this.switchSprite('img/03_character_youkai/Scream.png', 4, 30);
                this.lastCall = new Date().getTime();
            } else if (this.isJumping()) {
                this.switchSprite('img/03_character_youkai/Scream.png', 4, 30);
            } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && (!this.isJumping() && !this.isFalling())) {
                this.switchSprite('img/03_character_youkai/Walk.png', 5, 30);
                this.lastCall = new Date().getTime();
            } else if (this.isBored()) {
                this.switchSprite('img/03_character_youkai/Idle.png', 5, 30);
            }

        }, 100);
    }

    isBored() {
        let timepassed = new Date().getTime() - this.lastCall;
        return timepassed > 800;
    }

    isJumping() {
        return this.velocityY < 0;
    }

    isFalling() {
        return this.velocityY > 0.04;
    }

    interactions() {
        this.walk();
        this.charge();
        setInterval(() => {
            this.jump();
        }, 1000 / 144);
    }

    walk() {
        setInterval(() => {
            if (!this.isDead()) {
                this.walking_sound.pause();
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.walkRight();
                } else if (this.world.keyboard.LEFT && this.x > -370) {
                    this.walkLeft();
                }
                this.world.camera_x = -this.x + 50;
            }
        }, 1000 / 144);
    }

    walkRight() {
        this.velocityX = 1;
        this.x += this.velocityX;
        this.otherDirection = false;
        // this.direction = 'right';
        this.walking_sound.play();
    }

    walkLeft() {
        this.velocityX = -1;
        this.x += this.velocityX;
        this.otherDirection = true;
        // this.direction = 'left';
        this.walking_sound.play();
    }

    jump() {
        if ((this.world.keyboard.UP && !this.isAboveGround() && !this.isDead()) || this.enemieHit) {
            this.velocityY = -4;
            this.enemieHit = false;
        }

    }

    charge() {
        setInterval(() => {
            if (this.world.keyboard.CHARGE && this.charges > 0 && !this.isDead()) {
                setTimeout(() => {
                    let charges = new ThrowableObject(this.x + 80, this.y + 70, this.otherDirection);
                    this.world.throwableObjects.push(charges);
                    // this.world.statusBar[1].setPercentage(this.charges);
                    this.world.statusText[1].setPercentage(this.charges);
                }, 300);
                this.charges -= 5;//20
            }
        }, 100);
    }



    updateHitbox() {
        this.hitbox.x = this.x + 52;
        this.hitbox.y = this.y + 55;
        this.hitbox.width = 20;
        this.hitbox.height = 70;
    }




}