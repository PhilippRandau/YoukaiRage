class MechWorker extends Enemies {
    imgScale = 1.3;
    energy = 40;
    offsetCenterIMG = 25;

    offset = {
        x: 45,
        y: 55,
        width: 35,
        height: 70,
    }

    velocityRunX = 0.8;
    velocityWalkX = 0.4;

    walkRangeX = 200;
    attackRangeX = 100;
    idleRangeX = 15;

    idle_images = 'img/04_enemies/MechWorker/Special.png';
    attack_images = 'img/04_enemies/MechWorker/Attack2.png';
    walk_images = 'img/04_enemies/MechWorker/Walk.png';
    special_images = 'img/04_enemies/MechWorker/Special.png';
    hurt_images = 'img/04_enemies/MechWorker/Hurt.png';

    amountIdleImages = 4;
    amountAttackImages = 6;
    amountWalkImages = 6;
    amountHurtImages = 2;

    walking_sound = new Audio('audio/walking_enemies/walk.mp3');
    running_sound = new Audio('audio/walking_enemies/run.mp3');


    constructor(enemieID, x, y, otherDirection) {
        super().switchSprite(this.idle_images, this.amountIdleImages, 25);

        this.loadImages(this.GHOST_IMAGES);

        this.enemieID = enemieID;
        this.x = x;
        this.y = y;
        this.otherDirection = otherDirection;

        setTimeout(() => {
            this.walk();
        }, 1000);
    }

    // walk() {
    //     let intervalWalk;
    //     setInterval(() => {
    //         clearInterval(intervalWalk);
    //         let random = Math.random();
    //         if (random < 0.35) {
    //             this.otherDirection = false;
    //             this.loadImage('img/04_enemies/MechWorker/Walk.png');
    //             this.frameRate = 6;
    //             intervalWalk = setInterval(() => {
    //                 this.x += this.velocityX;
    //             }, 1000 / 120);
    //             clearInterval(this.intervalAnimation);
    //             // this.animate();
    //         } else if (random > 0.65) {
    //             this.otherDirection = true;
    //             this.loadImage('img/04_enemies/MechWorker/Walk.png');
    //             this.frameRate = 6;
    //             intervalWalk = setInterval(() => {
    //                 this.x -= this.velocityX;
    //             }, 1000 / 120);
    //             clearInterval(this.intervalAnimation);
    //             // this.animate();
    //         } else if (random < 0.65 && random > 0.35) {
    //             this.loadImage('img/04_enemies/MechWorker/Idle.png');
    //             this.frameRate = 4;
    //             clearInterval(this.intervalAnimation);
    //         }
    //         // this.chicken_sound.play();
    //     }, 2000);
    // }

    // animate() {
    //     let ghostY = this.y - 35;
    //     this.intervalAnimation = setInterval(() => {
    //         if (this.isDead()) {
    //             this.playAnimation(this.GHOST_IMAGES);
    //             this.frameRate = 1;
    //             clearInterval(this.intervalWalk);
    //             this.offsetCenterIMG = -30;
    //             this.y = ghostY;
    //                 if (this.currentImage > 18) {
    //                     clearInterval(this.intervalAnimation);
    //                     delete world.level.enemies[this.enemieID];
    //                 }
    //         }else if (this.isHurt()) {
    //             this.switchSprite('img/04_enemies/MechWorker/Hurt.png', 2, 30);

    //         } else {
    //             this.switchSprite('img/04_enemies/MechWorker/Idle.png', 4, 30);
    //         }
    //     }, 100);
    // }

}