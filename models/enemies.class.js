class Enemies extends MovableObject {
    intervalAnimation;
    startAnimations = false;
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

    walking_sound = new Audio('audio/enemies/dumper/walk.mp3');
    running_sound = new Audio('audio/enemies/dumper/attack.mp3');
    idle_sound = new Audio('audio/enemies/dumper/attack.mp3');
    ghost_sound = new Audio('audio/enemies/ghost.mp3');

    walkRangeX = 250;
    attackRangeX = 150;
    idleRangeX = 15;
    soundRangeX = 400;

    bufferAttackImages = 5;
    bufferWalkImages = 7;
    bufferIdleImages = 7;
    bufferHurtImages = 10;

    amountDeathImages = 16;


    /**
    * Updates the enemy's state and performs the corresponding actions based on the character's position and other conditions.
    */
    update() {
        if (this.startAnimations) {
            this.walk();
        }
    }


    /**
     * Controls the enemy's movement and actions based on the character's position and other conditions.
     */
    walk() {
        if (!this.isDead()) {
            if (this.isHurt() && (this instanceof MechWorker || this instanceof Dumper)) {
                this.switchSprite(this.hurt_images, this.amountHurtImages, this.bufferHurtImages);
            } else if (this.inRangeXRight(this.idleRangeX) || this.inRangeXLeft(this.idleRangeX)) {
                this.enemyIdle();
                this.playSound(this.idle_sound);
            } else if (this.inRangeXRight(this.attackRangeX)) {
                this.enemyMove(false, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);
            } else if (this.inRangeXLeft(this.attackRangeX)) {
                this.enemyMove(true, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);
            } else if (this.inRangeXRight(this.walkRangeX)) {
                this.enemyMove(false, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages, this.walking_sound);
            } else if (this.inRangeXLeft(this.walkRangeX)) {
                this.enemyMove(true, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages, this.walking_sound);
            } else if (this.inRangeXLeft(this.soundRangeX) || this.inRangeXRight(this.soundRangeX)) {
                this.enemyIdle();
                this.playSound(this.idle_sound);
            } else {
                this.enemyIdle();
                this.pauseSounds();
            }

        } else {
            this.animationDead();
            this.playSound(this.ghost_sound);
        }
    }


    /**
     * Sets the enemy's sprite and animation to idle state.
     */
    enemyIdle() {
        this.switchSprite(this.idle_images, this.amountIdleImages, this.bufferIdleImages);
        this.pauseSounds();
    }


    /**
     * Moves the enemy and plays the corresponding animation and sound.
     * @param {boolean} otherDirection - Whether the enemy is moving in the opposite direction.
     * @param {number} velocityX - The velocity at which the enemy moves.
     * @param {array} images - The images to be used for the animation.
     * @param {number} amountImages - The total number of images in the animation.
     * @param {number} bufferImages - The buffer for frame rate control.
     * @param {Audio} sound - The sound to be played.
     */
    enemyMove(otherDirection, velocityX, images, amountImages, bufferImages, sound) {
        otherDirection ? this.velocityX = -velocityX : this.velocityX = velocityX;
        this.otherDirection = otherDirection;
        this.switchSprite(images, amountImages, bufferImages);
        this.x += this.velocityX;
        this.pauseSounds();
        this.playSound(sound);
    }


    /**
     * Pauses the sounds of the enemy.
     */
    pauseSounds() {
        this.walking_sound.pause();
        this.running_sound.pause();
        this.idle_sound.pause();
    }


    /**
     * Handles the animation and actions when the enemy is dead.
     */
    animationDead() {
        if (this.isDead()) {
            this.playAnimation(this.GHOST_IMAGES, 3);
            this.frameRate = 1;
            this.offsetCenterIMG = -30;
            if (this.currentImage > this.amountDeathImages) {
                this.pauseSounds();
                delete this.world.level.enemies[this.enemieID];
            }
        }

    }


    /**
     * Checks if the character's position is within the specified action range to the left of the enemy.
     * @param {number} actionRangeX - The range in which the action occurs.
     * @returns {boolean} - True if the character is within the action range to the left, false otherwise.
     */
    inRangeXLeft(actionRangeX) {
        return this.world.character.x > this.x - actionRangeX && this.world.character.x < this.x;
    }


    /**
     * Checks if the character's position is within the specified action range to the right of the enemy.
     * @param {number} actionRangeX - The range in which the action occurs.
     * @returns {boolean} - True if the character is within the action range to the right, false otherwise.
     */
    inRangeXRight(actionRangeX) {
        return this.world.character.x > this.x && this.world.character.x < this.x + actionRangeX;
    }


}