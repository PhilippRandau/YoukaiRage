class Character extends MovableObject {
    x = -462;
    y = 288;
    charges = 100;
    points = 0;
    velocityX = 0;
    offsetCenterIMG = 8;
    modifiedHitboxHeight = 55;
    lastCall;
    enemieHit;
    previousCharacterInteraction = false;
    characterInteraction = false;


    dying_sound = new Audio('audio/youkai/dying.mp3');
    hurt_sound = new Audio('audio/youkai/hurt.mp3');
    jump_sound = new Audio('audio/youkai/jump.mp3');
    scream_ghost = new Audio('audio/youkai/scream_ghost.mp3');
    charge_shoot = new Audio('audio/youkai/charge.mp3');

    GHOST_BOTTLE = [
        'img/05_Effects/ghost_bottle/ghost_bottle1.png',
        'img/05_Effects/ghost_bottle/ghost_bottle2.png',
        'img/05_Effects/ghost_bottle/ghost_bottle3.png',
        'img/05_Effects/ghost_bottle/ghost_bottle4.png',
    ]

    constructor() {
        super().loadImage('img/05_Effects/ghost_bottle/ghost_bottle1.png');
        this.loadImages(this.GHOST_BOTTLE);
        this.introAnimation();

        setTimeout(() => {
            this.characterInteraction = true;
            this.y = 280;
            this.x = -456;//-456
            this.offsetCenterIMG = 2;
            this.modifiedHitboxHeight = 70;
            this.velocityX = 4;
            this.switchSprite('img/03_character_youkai/Scream.png', 4, 15);

        }, 1500);//1500
    }

    update() {
        this.introAnimation();
        if (this.characterInteraction) {
            this.setCameraFocus();
            this.interactions();
            this.animate();
            this.resetJumpSound();
            
        }
        if (this.characterInteraction != this.previousCharacterInteraction) {
            this.playSound(this.scream_ghost);
        }
        this.previousCharacterInteraction = this.characterInteraction;
    }

    resetJumpSound() {
        if (this.velocityY == -4) {
            this.jump_sound.currentTime = 0;
        }
    }

    introAnimation() {
        if (!this.characterInteraction) {
            this.playAnimation(this.GHOST_BOTTLE, 55);
            this.frameRate = 1;
        }
    }




    animate() {
        if (this.isDead()) {
            this.switchSprite('img/03_character_youkai/Dead.png', 4, 15);
            this.playSound(this.dying_sound);
        } else if (this.isHurt()) {
            // this.playSound(this.hurt_sound);
            this.switchSprite('img/03_character_youkai/Hurt.png', 3, 15);
            this.lastCall = new Date().getTime();
        } else if (this.world.keyboard.CHARGE && this.charges > 0) {
            this.switchSprite('img/03_character_youkai/Attack_3.png', 7, 15);
            this.lastCall = new Date().getTime();
        } else if (this.isFalling() || this.jumping) {
            this.playSound(this.jump_sound);
            this.switchSprite('img/03_character_youkai/Scream.png', 4, 15);
            this.lastCall = new Date().getTime();
        } else if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && (!this.jumping && !this.isFalling())) {
            this.switchSprite('img/03_character_youkai/Walk.png', 5, 15);
            this.lastCall = new Date().getTime();
        } else if (this.isBored()) {
            this.switchSprite('img/03_character_youkai/Idle.png', 5, 15);
        } else {
            // this.switchSprite('img/03_character_youkai/Idle.png', 5, 15);
            this.pauseSounds()
        }
    }

    pauseSounds() {
        // this.walking_sound.pause();
        // this.running_sound.pause();
        // this.idle_sound.pause();
        this.dying_sound.pause();
        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
        this.jump_sound.pause();
        this.jump_sound.currentTime = 0;

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
        this.jump();
    }

    walk() {
        if (!this.isDead()) {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x_right) {
                this.walkRight();
            } else if (this.world.keyboard.LEFT && this.x > this.world.level.level_end_x_left) {
                this.walkLeft();
            }
        }
    }


    setCameraFocus() {
        this.world.camera_x = -this.x + 50;
    }

    walkRight() {
        this.velocityX = 1.5;
        this.x += this.velocityX;
        this.otherDirection = false;
        // this.walking_sound.play();
    }

    walkLeft() {
        this.velocityX = -1.5;
        this.x += this.velocityX;
        this.otherDirection = true;
        // this.walking_sound.play();
    }

    jump() {
        if ((this.world.keyboard.UP && this.isOnGround() && !this.jumping && !this.isDead()) || this.enemieHit) {
            this.velocityY = -4;
            this.enemieHit = false;
            this.jumping = true;
        }
        if (this.jumping && this.isFalling()) {
            this.jumping = false;
        }
    }

    isTimePassed(time, lastCall) {
        if (this.lastCharge === undefined) {
            return true;
        } else {
            let timepassed = new Date().getTime() - lastCall;
            return timepassed > time;
        }
    }

    charge() {
        if (this.world.keyboard.CHARGE && this.charges > 0 && !this.isDead() && this.isTimePassed(200, this.lastCharge)) {
            let charges = new ThrowableObject(this.x + 80, this.y + 70, this.otherDirection);
            this.world.throwableObjects.push(charges);
            this.charges -= 20;
            this.world.statusText[1].setPercentage(this.charges);
            this.lastCharge = new Date().getTime();
        }
    }


    updateHitbox() {
        this.hitbox.x = this.x + 52;
        this.hitbox.y = this.y + 55;
        this.hitbox.width = 20;
        this.hitbox.height = this.modifiedHitboxHeight;
    }




}