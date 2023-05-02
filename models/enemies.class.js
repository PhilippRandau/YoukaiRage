class Enemies extends MovableObject {

    intervalAnimation;
    intervalWalk;
    // world;
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

    
    walk() {
        setInterval(() => {
            clearInterval(this.intervalWalk);
            if (!this.isDead()) {
                if (this.isHurt()) {
                    if (this instanceof MechWorker || this instanceof Dumper) {
                        this.switchSprite(this.hurt_images, this.amountHurtImages, 30);
                    }
                }else if (this.inRangeXRight(this.idleRangeX) || this.inRangeXLeft(this.idleRangeX)) {
                    this.enemyIdle();
                } else if (this.inRangeXRight(this.attackRangeX)) {
                    this.enemyAttackOtherDirection(false);
                } else if (this.inRangeXLeft(this.attackRangeX)) {
                    this.enemyAttackOtherDirection(true);
                } else if (this.inRangeXRight(this.walkRangeX)) {
                    this.enemyWalkOtherDirection(false);
                } else if (this.inRangeXLeft(this.walkRangeX)) {
                    this.enemyWalkOtherDirection(true);
                } else {
                    this.enemyIdle();
                }
                clearInterval(this.intervalAnimation);
                this.animationDead();
            }
        }, 100);
    }


    enemyIdle() {
        this.switchSprite(this.idle_images, this.amountIdleImages, 25);
        this.pauseSounds();
    }


    enemyAttackOtherDirection(otherDirection) {
        otherDirection ? this.velocityX = -this.velocityRunX : this.velocityX = this.velocityRunX;
        this.otherDirection = otherDirection;
        this.switchSprite(this.attack_images, this.amountAttackImages, 15);
        this.intervalWalk = setInterval(() => {
            this.x += this.velocityX;
            this.pauseSounds();
            this.playSound(this.running_sound);
        }, 1000 / 120);
    }


    enemyWalkOtherDirection(otherDirection) {
        otherDirection ? this.velocityX = -this.velocityWalkX : this.velocityX = this.velocityWalkX;
        this.otherDirection = otherDirection;
        this.switchSprite(this.walk_images, this.amountWalkImages, 25);
        this.intervalWalk = setInterval(() => {
            this.x += this.velocityX;
            this.pauseSounds();
            this.playSound(this.walking_sound);
        }, 1000 / 120);
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
                if (this.currentImage > 18) {
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