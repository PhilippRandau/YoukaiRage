class Enemies extends MovableObject {

    intervalAnimation;
    intervalWalk;
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

    walkRangeX = 250;
    attackRangeX = 150;
    idleRangeX = 15;

    bufferAttackImages = 10;
    bufferWalkImages = 15;
    bufferIdleImages = 15;
    bufferHurtImages = 20;

    amountDeathImages = 18;

    update() {
        if (this.startAnimations) {
            this.walk();
        }
    }


    walk() {
        clearInterval(this.intervalWalk);
        if (!this.isDead()) {
            if (this.isHurt() && (this instanceof MechWorker || this instanceof Dumper)) {
                this.switchSprite(this.hurt_images, this.amountHurtImages, this.bufferHurtImages);
            } else if (this.inRangeXRight(this.idleRangeX) || this.inRangeXLeft(this.idleRangeX)) {
                this.enemyIdle();
            } else if (this.inRangeXRight(this.attackRangeX)) {
                this.enemyMove(false, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages, this.running_sound);
            } else if (this.inRangeXLeft(this.attackRangeX)) {
                this.enemyMove(true, this.velocityRunX, this.attack_images, this.amountAttackImages, this.bufferAttackImages,this.running_sound);
            } else if (this.inRangeXRight(this.walkRangeX)) {
                this.enemyMove(false, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages,this.walking_sound);
            } else if (this.inRangeXLeft(this.walkRangeX)) {
                this.enemyMove(true, this.velocityWalkX, this.walk_images, this.amountWalkImages, this.bufferWalkImages,this.walking_sound);
            } else {
                this.enemyIdle();
            }
            clearInterval(this.intervalAnimation);
            this.animationDead();
        }
    }


    enemyIdle() {
        this.switchSprite(this.idle_images, this.amountIdleImages, this.bufferIdleImages);
        this.pauseSounds();
    }



    enemyMove(otherDirection, velocityX, images, amountImages, bufferImages, sound) {
        otherDirection ? this.velocityX = -velocityX : this.velocityX = velocityX;
        this.otherDirection = otherDirection;
        this.switchSprite(images, amountImages, bufferImages);
        // this.intervalWalk = setInterval(() => {
            this.x += this.velocityX;
            this.pauseSounds();
            this.playSound(sound);
        // }, 1000 / 120);
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


    animationDead() {
        this.intervalAnimation = setInterval(() => {
            if (this.isDead()) {
                this.pauseSounds();
                this.playAnimation(this.GHOST_IMAGES);
                this.frameRate = 1;
                clearInterval(this.intervalWalk);
                this.offsetCenterIMG = -30;
                this.offset.height = 90;
                if (this.currentImage > this.amountDeathImages) {
                    clearInterval(this.intervalAnimation);
                    delete this.world.level.enemies[this.enemieID];
                }
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