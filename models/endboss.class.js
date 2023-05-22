class Endboss extends Enemies {
    imgScale = 1.5;
    offsetCenterIMG = 27;
    isAttacking = false;

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
        height: 110,
    }

    hitboxAttack = {
        x: this.x,
        y: this.y,
        width: 0,
        height: 0,
    }

    offsetAttack = {
        x: -28,
        y: 95,
        width: 75,
        height: 12,
    }

    velocityRunX = 1.8;
    velocityWalkX = 1.3;


    walkRangeX = 350;
    attackRangeX = 125;
    idleRangeX = 15;

    idle_images = 'img/04_enemies/Endboss/Idle.png';
    attack_images = 'img/04_enemies/Endboss/Attack1.png';
    walk_images = 'img/04_enemies/Endboss/Walk.png';
    hurt_images = 'img/04_enemies/Endboss/Hurt.png';
    death_images = 'img/04_enemies/Endboss/Death.png'

    amountIdleImages = 4;
    amountAttackImages = 4;
    amountWalkImages = 4;
    amountHurtImages = 2;
    amountDeathImages = 6;

    bufferAttackImages = 15;
    bufferDeathImages = 15;

    walking_sound = new Audio('audio/enemies/endboss/walk_range.mp3');
    idle_sound = new Audio('audio/enemies/endboss/idle_sounds.mp3');
    running_sound = new Audio('audio/enemies/endboss/laser-zap-90575.mp3');
    hurt_sound = new Audio('audio/enemies/endboss/hurt.mp3');
    death_sound = new Audio('audio/enemies/endboss/dead.mp3');

    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite(this.idle_images, this.amountIdleImages, this.bufferIdleImages);

        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;

        setTimeout(() => {
            this.startAnimations = true;
        }, 1000);
    }


    /**
     * Controls the character's behavior while walking.
     * If the character is not dead, the corresponding behavior is executed based on its state and range.
     * If the character is hurt, the corresponding sprite and behavior are used.
     * If the character is within attack range, the attack behavior is triggered.
     * If the character is within walking range, the walking behavior is triggered.
     * If the character is within sound range, the idle behavior is triggered.
     * Otherwise, the character defaults to the idle behavior.
     * The function also checks if the character is within audible range.
     */
    walk() {
        if (!this.isDead() && !this.Dead) {
            this.isAttacking = false;
            if (this.outOfRangeY() && !this.outOfMaxRangeY() && (this.inRangeXRight(this.attackRangeX) || this.inRangeXLeft(this.attackRangeX)) && !this.isHurt()) {
                this.outRange();
            } else {
                this.inRange();
            }
        } else {
            this.playSound(this.death_sound);
            this.animationDead();
        }
    }

    inRange(){
        if (this.isHurt()) {
            this.switchSprite(this.hurt_images, this.amountHurtImages, this.bufferHurtImages);
        } else if (this.inRangeXRight(this.idleRangeX) || this.inRangeXLeft(this.idleRangeX)) {
            this.enemyIdle();
        } else if (this.inRangeXRight(this.attackRangeX)) {
            this.isAttacking = true;
            this.enemyMove(false, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);
        } else if (this.inRangeXLeft(this.attackRangeX)) {
            this.isAttacking = true;
            this.enemyMove(true, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);
        } else if (this.inRangeXRight(this.walkRangeX)) {
            this.resetSound();
            this.enemyMove(false, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages, this.walking_sound);
        } else if (this.inRangeXLeft(this.walkRangeX)) {
            this.resetSound();
            this.enemyMove(true, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages, this.walking_sound);
        } else if (this.inRangeXLeft(this.soundRangeX) || this.inRangeXRight(this.soundRangeX)) {
            this.enemyIdle();
            this.resetSound();
        } else {
            this.enemyIdle();
        }
        this.isInHearableRange();
    }


    /**
     * Reset's the walking sound.
     */
    resetSound() {
        this.walking_sound.currentTime = 0;
    }

    /**
     * Checks if the character is within the audible range and plays the walking sound.
     */
    isInHearableRange() {
        if (this.inRangeXLeft(this.soundRangeX) || this.inRangeXRight(this.soundRangeX)) {
            this.playSound(this.walking_sound);
        }
    }


    /**
    * Performs the death animation and updates the character's state.
    */
    animationDead() {
        this.switchSprite(this.death_images, this.amountDeathImages, this.bufferDeathImages);
        setTimeout(() => {
            this.death_sound.pause();
            delete this.world.level.enemies[this.enemieID];
        }, 1000);
        this.showGameOverScreen();
        this.Dead = true;
    }
}
