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
        this.switchCharacterForm();

    }


    /**
    * Switches the character form with a delay and updates the character's properties.
    */
    switchCharacterForm() {
        setTimeout(() => {
            this.characterInteraction = true;
            this.y = 280;
            this.x = -456;//-456
            this.offsetCenterIMG = 2;
            this.modifiedHitboxHeight = 70;
            this.velocityX = 4;
            this.switchSprite('img/03_character_youkai/Scream.png', 4, 7);
        }, 1500);
    }


    /**
     * Updates the character's state in each game loop iteration.
     */
    update() {
        this.introAnimation();
        if (this.characterInteraction) {
            this.setCameraFocus();
            this.interactions();
            this.animate();
            this.resetJumpSound();
        }
        this.escapedBottleSound();
    }


    /**
    * Plays the intro animation if the character interaction is false.
    */
    introAnimation() {
        if (!this.characterInteraction) {
            this.playAnimation(this.GHOST_BOTTLE, 55);
            this.frameRate = 1;
        }
    }


    /**
     * Sets the camera focus based on the character's position.
     */
    setCameraFocus() {
        this.world.camera_x = -this.x + 50;
    }

    /**
     * Calls character interactions such as walking, charging, and jumping.
     */
    interactions() {
        this.walk();
        this.charge();
        this.jump();
    }


    /**
    * Handles the character's movement to the right or left based on the keyboard input.
    */
    walk() {
        if (!this.isDead()) {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x_right) {
                this.walkRight();
            } else if (this.world.keyboard.LEFT && this.x > this.world.level.level_end_x_left) {
                this.walkLeft();
            }
        }
    }


    /**
    * Moves the character to the right.
    */
    walkRight() {
        this.velocityX = 2.5;
        this.x += this.velocityX;
        this.otherDirection = false;
    }

    /**
    * Moves the character to the left.
    */
    walkLeft() {
        this.velocityX = -2.5;
        this.x += this.velocityX;
        this.otherDirection = true;
    }


    /**
    * Handles the character's charging action and throws a throwable object.
    */
    charge() {
        if (this.world.keyboard.CHARGE && this.charges > 0 && !this.isDead() && this.isTimePassed(200, this.lastCharge)) {
            let charges = new ThrowableObject(this.x + 80, this.y + 70, this.otherDirection);
            this.world.throwableObjects.push(charges);
            this.charges -= 20;
            this.world.statusText[1].setPercentage(this.charges);
            this.lastCharge = new Date().getTime();
        }
    }


    /**
     * Handles the character's jump action.
     */
    jump() {
        if ((this.world.keyboard.UP && this.isOnGround() && !this.jumping && !this.isDead()) || this.enemieHit) {
            this.velocityY = -4;//-4
            this.enemieHit = false;
            this.jumping = true;
        }
        if (this.jumping && this.isFalling()) {
            this.jumping = false;
        }
    }


    /**
     * Updates the character's animation based on its current state.
     */
    animate() {
        if (this.isDead()) {
            this.switchSprite('img/03_character_youkai/Dead.png', 4, 7);
            this.playSound(this.dying_sound);
            this.showGameOverScreen();
            this.world.gameStarted = false;
        } else if (this.isHurt()) {
            this.switchSprite('img/03_character_youkai/Hurt.png', 3, 7);
            this.getTimeLastCall();
        } else if (this.world.keyboard.CHARGE && this.charges > 0) {
            this.switchSprite('img/03_character_youkai/Attack_3.png', 7, 7);
            this.getTimeLastCall();
        } else if (this.isFalling() || this.jumping) {
            this.playSound(this.jump_sound);
            this.switchSprite('img/03_character_youkai/Scream.png', 4, 7);
            this.getTimeLastCall();
        } else if (this.isWalking() && (!this.jumping && !this.isFalling())) {
            this.switchSprite('img/03_character_youkai/Walk.png', 5, 7);
            this.getTimeLastCall();
        } else if (this.isBored()) {
            this.switchSprite('img/03_character_youkai/Idle.png', 5, 7);
        } else {
            this.pauseSounds()
        }
    }


    /**
    * Gets the timestamp of the last method call.
    * @returns {number} The timestamp of the last call in milliseconds.
    */
    getTimeLastCall(){
        return this.lastCall = new Date().getTime();
    }


    /**
     * Checks if the character is currently walking.
     * @returns {boolean} Returns true if the character is walking, false otherwise.
     */
    isWalking() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
    }


    /**
    * Checks if the character is in a bored state.
    * @returns {boolean} Returns true if the character is in a bored state, false otherwise.
    */
    isBored() {
        let timepassed = new Date().getTime() - this.lastCall;
        return timepassed > 800;
    }


    /**
     * Checks if the character is currently jumping.
     * @returns {boolean} Returns true if the character is jumping, false otherwise.
     */
    isJumping() {
        return this.velocityY < 0;
    }


    /**
     * Checks if the character is currently falling.
     * @returns {boolean} Returns true if the character is falling, false otherwise.
     */
    isFalling() {
        return this.velocityY > 0.04;
    }


    /**
    * Resets the jump sound if the character is standing on the ground.
    */
    resetJumpSound() {
        if (this.velocityY == -4) {
            this.jump_sound.currentTime = 0;
        }
    }


    /**
    * Plays the escaped bottle sound if the character interaction state has changed.
    */
    escapedBottleSound() {
        if (this.characterInteraction != this.previousCharacterInteraction) {
            this.playSound(this.scream_ghost);
        }
        this.previousCharacterInteraction = this.characterInteraction;
    }


    /**
     * Pauses all the sounds related to the character.
     */
    pauseSounds() {
        this.dying_sound.pause();
        this.hurt_sound.pause();
        this.hurt_sound.currentTime = 0;
        this.jump_sound.pause();
        this.jump_sound.currentTime = 0;
    }


    /**
     * Checks if a certain amount of time has passed since the last call.
     * @param {number} time - The time threshold in milliseconds.
     * @param {number} lastCall - The timestamp of the last call.
     * @returns {boolean} Returns true if the specified time has passed since the last call, false otherwise.
     */
    isTimePassed(time, lastCall) {
        if (this.lastCharge === undefined) {
            return true;
        } else {
            let timepassed = new Date().getTime() - lastCall;
            return timepassed > time;
        }
    }


    /**
     * Updates the hitbox position and dimensions based on the character's current position and modified hitbox height.
     */
    updateHitbox() {
        this.hitbox.x = this.x + 52;
        this.hitbox.y = this.y + 55;
        this.hitbox.width = 20;
        this.hitbox.height = this.modifiedHitboxHeight;
    }
}