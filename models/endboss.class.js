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
        height: 90,
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

    velocityRunX = 0.8;
    velocityWalkX = 0.4;

    walkRangeX = 350;
    attackRangeX = 125;
    idleRangeX = 15;

    idle_images = 'img/04_enemies/Endboss/Idle.png';
    attack_images = 'img/04_enemies/Endboss/Attack1.png';
    walk_images = 'img/04_enemies/Endboss/Walk.png';
    hurt_images = 'img/04_enemies/Endboss/Hurt.png';

    amountIdleImages = 4;
    amountAttackImages = 4;
    amountWalkImages = 4;
    amountHurtImages = 2;
    amountDeathImages = 4;

    bufferAttackImages = 15;

    walking_sound = new Audio('audio/enemies/walk_run/walk.mp3');
    running_sound = new Audio('audio/enemies/walk_run/run.mp3');


    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite(this.idle_images, this.amountIdleImages, this.bufferIdleImages);

        this.loadImages(this.GHOST_IMAGES);

        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;

        setTimeout(() => {
            this.startAnimations = true;
        }, 1000);
    }



    walk() {
        clearInterval(this.intervalWalk);
        if (!this.isDead()) {
            if (this.isHurt()) {
                this.switchSprite(this.hurt_images, this.amountHurtImages, this.bufferHurtImages);
                this.isAttacking = false;

            } else if (this.inRangeXRight(this.idleRangeX) || this.inRangeXLeft(this.idleRangeX)) {
                this.isAttacking = false;
                this.enemyIdle();
            } else if (this.inRangeXRight(this.attackRangeX)) {
                this.isAttacking = true;
                this.enemyMove(false, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);

            } else if (this.inRangeXLeft(this.attackRangeX)) {
                this.isAttacking = true;
                this.enemyMove(true, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);
            } else if (this.inRangeXRight(this.walkRangeX)) {
                this.isAttacking = false;
                this.enemyMove(false, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages, this.walking_sound);
            } else if (this.inRangeXLeft(this.walkRangeX)) {
                this.isAttacking = false;
                this.enemyMove(true, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages, this.walking_sound);
            } else {
                this.isAttacking = false;
                this.enemyIdle();
            }
            clearInterval(this.intervalAnimation);
            this.animationDead();
        }

    }


}
